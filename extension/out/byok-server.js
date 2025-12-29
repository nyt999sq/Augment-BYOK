"use strict";

const http = require("http");
const { spawn } = require("child_process");
const { Readable } = require("stream");
const crypto = require("crypto");
const { URL } = require("url");

const DEFAULT_MAX_BODY_BYTES = 50 * 1024 * 1024;

function createLogger(logger) {
  if (logger && typeof logger.info === "function") return logger;
  return {
    debug: (...args) => console.debug("[augment-byok]", ...args),
    info: (...args) => console.info("[augment-byok]", ...args),
    warn: (...args) => console.warn("[augment-byok]", ...args),
    error: (...args) => console.error("[augment-byok]", ...args),
  };
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
  });
  res.end(body);
}

function startNdjson(res, statusCode = 200) {
  res.writeHead(statusCode, {
    "content-type": "application/x-ndjson; charset=utf-8",
    "cache-control": "no-cache",
    connection: "keep-alive",
    "x-content-type-options": "nosniff",
  });
  if (typeof res.flushHeaders === "function") res.flushHeaders();
}

function writeNdjson(res, item) {
  res.write(`${JSON.stringify(item)}\n`);
}

function trimOrEmpty(value) {
  return typeof value === "string" ? value.trim() : "";
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function safeJsonParse(text, fallback) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function readBodyBuffer(req, maxBytes = DEFAULT_MAX_BODY_BYTES) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error(`Request body too large: ${size} bytes (max ${maxBytes})`));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
    req.on("aborted", () => reject(new Error("Request aborted")));
  });
}

async function readJsonBody(req) {
  const buf = await readBodyBuffer(req);
  const text = buf.toString("utf8");
  if (!text.trim()) return undefined;
  return safeJsonParse(text, undefined);
}

function normalizePathname(pathname) {
  const raw = typeof pathname === "string" ? pathname : "/";
  if (raw.startsWith("/api/")) return raw.slice("/api".length);
  if (raw === "/api") return "/";
  return raw;
}

function ensureTrailingSlash(raw) {
  const s = String(raw || "").trim();
  if (!s) return "";
  return s.endsWith("/") ? s : `${s}/`;
}

function normalizeAugmentProxyConfig(raw) {
  const obj = raw && typeof raw === "object" ? raw : {};
  const baseUrl = ensureTrailingSlash(trimOrEmpty(obj.augmentBaseUrl));
  const token = trimOrEmpty(obj.augmentToken);
  return { enabled: Boolean(baseUrl && token), baseUrl, token };
}

function toSingleValueHeaders(headers) {
  const out = {};
  const src = headers && typeof headers === "object" ? headers : {};
  for (const [k, v] of Object.entries(src)) {
    if (typeof v === "string") out[k] = v;
    else if (Array.isArray(v) && v.length > 0) out[k] = v.join(", ");
  }
  return out;
}

function stripHopByHopRequestHeaders(headers) {
  const out = { ...headers };
  for (const key of ["host", "connection", "transfer-encoding", "keep-alive", "proxy-connection", "upgrade", "te", "trailer", "content-length", "accept-encoding"]) delete out[key];
  return out;
}

function stripHopByHopResponseHeaders(headers) {
  const out = {};
  for (const [k, v] of headers.entries()) {
    const key = k.toLowerCase();
    if (key === "connection" || key === "transfer-encoding" || key === "keep-alive" || key === "proxy-connection" || key === "upgrade" || key === "trailer") continue;
    if (key === "content-length") continue;
    out[k] = v;
  }
  return out;
}

async function proxyToAugment({ req, res, augment, endpointName, search, bodyBuffer, logger }) {
  if (!augment?.enabled) return sendJson(res, 502, { error: "Augment 官方代理未配置（请在 Augment BYOK 面板填写 augmentUrl + augmentToken）" });

  let target;
  try {
    target = new URL(`${String(endpointName || "").replace(/^\/+/, "")}${search || ""}`, augment.baseUrl);
  } catch (e) {
    logger.error("augment proxy invalid URL:", e);
    return sendJson(res, 502, { error: "Augment 官方代理 URL 无效" });
  }

  const abortController = new AbortController();
  const onAbort = () => abortController.abort();
  req.on("close", onAbort);
  req.on("aborted", onAbort);

  const headers = stripHopByHopRequestHeaders(toSingleValueHeaders(req.headers));
  headers.Authorization = `Bearer ${augment.token}`;

  let upstreamResp;
  try {
    upstreamResp = await fetch(target.toString(), {
      method: req.method || "POST",
      headers,
      body: bodyBuffer && bodyBuffer.length > 0 ? bodyBuffer : undefined,
      signal: abortController.signal,
    });
  } catch (e) {
    logger.error("augment proxy fetch failed:", e);
    return sendJson(res, 502, { error: `Augment 官方代理请求失败: ${String(e?.message || e)}` });
  }

  res.writeHead(upstreamResp.status, stripHopByHopResponseHeaders(upstreamResp.headers));
  if (!upstreamResp.body) return res.end();

  const nodeStream = Readable.fromWeb(upstreamResp.body);
  nodeStream.on("error", (e) => {
    try {
      logger.warn("augment proxy stream error:", e);
      res.end();
    } catch {
      // ignore
    }
  });
  nodeStream.pipe(res);
}

function normalizeOpenAiV1BaseUrl(raw) {
  const fallback = "https://api.openai.com/v1";
  const s = String(raw || "").trim().replace(/\/+$/, "");
  const candidate = s || fallback;
  try {
    const u = new URL(candidate);
    if (!u.protocol.startsWith("http")) return "";
    u.hash = "";
    u.search = "";
    const path = (u.pathname || "/").replace(/\/+$/, "") || "/";
    const basePath =
      path.replace(/\/chat\/completions\/v1$/i, "").replace(/\/models\/v1$/i, "").replace(/\/chat\/completions$/i, "").replace(/\/models$/i, "") || "/";
    u.pathname = basePath.endsWith("/v1") ? basePath : `${basePath === "/" ? "" : basePath}/v1`;
    return u.toString().replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function openAiChatCompletionsUrl(baseUrl) {
  const raw = String(baseUrl || "").trim().replace(/\/+$/, "");
  if (raw && /\/chat\/completions$/i.test(raw)) return raw;
  const b = normalizeOpenAiV1BaseUrl(raw);
  return b ? `${b}/chat/completions` : "";
}

function openAiModelsUrl(baseUrl) {
  const raw = String(baseUrl || "").trim().replace(/\/+$/, "");
  if (raw && /\/models$/i.test(raw)) return raw;
  const b = normalizeOpenAiV1BaseUrl(raw);
  return b ? `${b}/models` : "";
}

function stripCodeFences(text) {
  const s = typeof text === "string" ? text : "";
  return s.replace(/^```[a-zA-Z0-9_-]*\n?/, "").replace(/\n?```$/, "");
}

function extractBetween(text, startTag, endTag) {
  const s = typeof text === "string" ? text : "";
  const start = s.indexOf(startTag);
  if (start === -1) return "";
  const end = s.indexOf(endTag, start + startTag.length);
  if (end === -1) return "";
  return s.slice(start + startTag.length, end);
}

function buildEditorContextSuffix(payload) {
  const path = trimOrEmpty(payload?.path);
  const lang = trimOrEmpty(payload?.lang);
  const selectedCode = trimOrEmpty(payload?.selected_code);
  const prefix = trimOrEmpty(payload?.prefix);
  const suffix = trimOrEmpty(payload?.suffix);

  const parts = [];
  if (path) parts.push(`File: ${path}`);
  if (lang) parts.push(`Language: ${lang}`);
  if (selectedCode) parts.push(`Selected code:\n${selectedCode}`);
  else if (prefix || suffix) parts.push(`Code context:\n<<<PREFIX\n${prefix}\nPREFIX>>>\n<<<SUFFIX\n${suffix}\nSUFFIX>>>`);

  if (parts.length === 0) return "";
  return `\n\n---\nEditor context:\n${parts.join("\n\n")}`;
}

function buildSystemPrompt(payload, basePrompt) {
  const parts = [];
  const p = trimOrEmpty(basePrompt);
  if (p) parts.push(p);
  const workspaceGuidelines = trimOrEmpty(payload?.workspace_guidelines);
  if (workspaceGuidelines) parts.push(`Workspace guidelines:\n${workspaceGuidelines}`);
  const userGuidelines = trimOrEmpty(payload?.user_guidelines);
  if (userGuidelines) parts.push(`User guidelines:\n${userGuidelines}`);
  return parts.join("\n\n");
}

function extractInputSchemaJson(toolDef) {
  const def = toolDef && typeof toolDef === "object" ? toolDef.definition || toolDef : undefined;
  const raw = def && typeof def.input_schema_json === "string" ? def.input_schema_json : "";
  if (!raw.trim()) return undefined;
  const parsed = safeJsonParse(raw, undefined);
  return parsed && typeof parsed === "object" ? parsed : undefined;
}

function extractToolName(toolDef) {
  const def = toolDef && typeof toolDef === "object" ? toolDef.definition || toolDef : undefined;
  const name = def && typeof def.name === "string" ? def.name.trim() : "";
  return name;
}

function extractToolDescription(toolDef) {
  const def = toolDef && typeof toolDef === "object" ? toolDef.definition || toolDef : undefined;
  const desc = def && typeof def.description === "string" ? def.description : "";
  return desc;
}

function toOpenAITools(toolDefinitions) {
  return asArray(toolDefinitions)
    .map((t) => {
      const name = extractToolName(t);
      if (!name) return null;
      const description = extractToolDescription(t);
      const parameters = extractInputSchemaJson(t) || { type: "object", properties: {} };
      return { type: "function", function: { name, description, parameters } };
    })
    .filter(Boolean);
}

function indexToolDefinitions(toolDefinitions) {
  const map = new Map();
  for (const t of asArray(toolDefinitions)) {
    const name = extractToolName(t);
    if (!name) continue;
    map.set(name, { schema: extractInputSchemaJson(t), description: extractToolDescription(t) });
  }
  return map;
}

function coercePlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value;
}

function defaultValueForSchema(schema) {
  if (!schema || typeof schema !== "object") return null;
  if (schema.default !== undefined) return schema.default;
  const t = schema.type;
  if (t === "string") return "";
  if (t === "number" || t === "integer") return 0;
  if (t === "boolean") return false;
  if (t === "array") return [];
  if (t === "object") return {};
  return null;
}

function isMemoryRelatedTool(toolName, toolInfo) {
  const name = String(toolName || "").toLowerCase();
  const desc = String(toolInfo?.description || "").toLowerCase();
  return name.includes("memory") || name.includes("remember") || desc.includes("memory") || desc.includes("remember");
}

function repairToolCallArguments({ toolName, rawArguments, toolInfo, contextText }) {
  const schema = toolInfo?.schema && typeof toolInfo.schema === "object" ? toolInfo.schema : undefined;
  const argsObj = coercePlainObject(safeJsonParse(typeof rawArguments === "string" ? rawArguments : "{}", {}));
  const properties = schema && typeof schema.properties === "object" ? schema.properties : {};
  const required = Array.isArray(schema?.required) ? schema.required : [];

  const out = { ...argsObj };
  for (const key of required) {
    if (out[key] !== undefined) continue;
    out[key] = defaultValueForSchema(properties?.[key]);
  }

  if (isMemoryRelatedTool(toolName, toolInfo)) {
    const ctx = trimOrEmpty(contextText);
    const titleKey = Object.keys(properties || {}).find((k) => /title|name|summary/i.test(k));
    if (titleKey) {
      const curTitle = trimOrEmpty(out[titleKey]);
      if (!curTitle) out[titleKey] = ctx ? ctx.slice(0, 80) : "记忆";
    }
    const stringKeys = Object.keys(properties || {}).filter((k) => typeof properties?.[k]?.type === "string");
    const candidateKeys = stringKeys.filter((k) => /memory|content|text|description|fact|note|value/i.test(k));
    const bestKey = candidateKeys[0] || stringKeys[0];
    if (bestKey) {
      const cur = trimOrEmpty(out[bestKey]);
      if (!cur || cur.length < 20) out[bestKey] = ctx ? `要记住的内容：${ctx}\n\n使用场景：当后续对话再次涉及该信息时，用于保持一致性与减少重复确认。` : cur;
    }
    const ctxKey = Object.keys(properties || {}).find((k) => /context|scenario|usage|when|where/i.test(k));
    if (ctxKey && (out[ctxKey] === undefined || trimOrEmpty(out[ctxKey]).length < 10) && ctx) out[ctxKey] = ctx;
  }

  try {
    return JSON.stringify(out);
  } catch {
    return "{}";
  }
}

function getToolUseNodes(nodes) {
  return asArray(nodes)
    .map((n) => (n && typeof n === "object" ? n : null))
    .filter(Boolean)
    .filter((n) => n.type === 5 && n.tool_use && typeof n.tool_use === "object")
    .map((n) => {
      const toolUse = n.tool_use;
      const tool_use_id = typeof toolUse.tool_use_id === "string" ? toolUse.tool_use_id : "";
      const tool_name = typeof toolUse.tool_name === "string" ? toolUse.tool_name : "";
      const input_json = typeof toolUse.input_json === "string" ? toolUse.input_json : "{}";
      return { tool_use_id, tool_name, input_json };
    })
    .filter((u) => u.tool_use_id && u.tool_name);
}

function getToolResultNodes(nodes) {
  return asArray(nodes)
    .map((n) => (n && typeof n === "object" ? n : null))
    .filter(Boolean)
    .filter((n) => n.type === 1 && n.tool_result_node && typeof n.tool_result_node === "object")
    .map((n) => {
      const tr = n.tool_result_node;
      const tool_use_id = typeof tr.tool_use_id === "string" ? tr.tool_use_id : "";
      const content = typeof tr.content === "string" ? tr.content : "";
      return { tool_use_id, content };
    })
    .filter((r) => r.tool_use_id);
}

function getTextFromNodes(nodes) {
  return asArray(nodes)
    .map((n) => (n && typeof n === "object" ? n : null))
    .filter(Boolean)
    .filter((n) => n.type === 0 && n.text_node && typeof n.text_node === "object")
    .map((n) => (typeof n.text_node.content === "string" ? n.text_node.content : ""))
    .filter(Boolean)
    .join("");
}

function getImageNodes(nodes) {
  return asArray(nodes)
    .map((n) => (n && typeof n === "object" ? n : null))
    .filter(Boolean)
    .filter((n) => n.type === 2 && n.image_node && typeof n.image_node === "object")
    .map((n) => {
      const imageNode = n.image_node;
      const image_data = typeof imageNode.image_data === "string" ? imageNode.image_data : "";
      const format = typeof imageNode.format === "number" ? imageNode.format : undefined;
      return { image_data: image_data.trim(), format };
    })
    .filter((i) => Boolean(i.image_data));
}

function sniffImageMimeFromBase64(imageDataBase64) {
  try {
    const buf = Buffer.from(String(imageDataBase64 || ""), "base64");
    if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png";
    if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
    if (buf.length >= 6 && buf.slice(0, 6).toString("ascii") === "GIF87a") return "image/gif";
    if (buf.length >= 6 && buf.slice(0, 6).toString("ascii") === "GIF89a") return "image/gif";
    if (buf.length >= 12 && buf.slice(0, 4).toString("ascii") === "RIFF" && buf.slice(8, 12).toString("ascii") === "WEBP") return "image/webp";
    return "image/png";
  } catch {
    return "image/png";
  }
}

function mergeText(base, extra) {
  const a = trimOrEmpty(base);
  const b = trimOrEmpty(extra);
  if (!a) return b;
  if (!b) return a;
  if (a === b) return a;
  if (a.includes(b)) return a;
  if (b.includes(a)) return b;
  return `${a}\n\n${b}`;
}

function toOpenAIUserContent({ messageText, nodes, maxImages = 10 }) {
  const extraText = getTextFromNodes(nodes);
  const mergedText = mergeText(messageText, extraText);
  const images = getImageNodes(nodes).slice(0, maxImages);
  if (images.length === 0) return mergedText;
  const parts = [{ type: "text", text: mergedText || " " }];
  for (const img of images) {
    const mime = sniffImageMimeFromBase64(img.image_data);
    parts.push({ type: "image_url", image_url: { url: `data:${mime};base64,${img.image_data}` } });
  }
  return parts;
}

function toOpenAIMessagesFromAugment({ systemPrompt, payload }) {
  const messages = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });

  for (const turn of asArray(payload?.chat_history)) {
    if (!turn || typeof turn !== "object") continue;
    const reqMsg = trimOrEmpty(turn.request_message);
    const reqContent = toOpenAIUserContent({ messageText: reqMsg, nodes: turn.request_nodes });
    if (typeof reqContent === "string" ? reqContent : reqContent.length > 0) messages.push({ role: "user", content: reqContent });

    for (const tr of getToolResultNodes(turn.request_nodes)) messages.push({ role: "tool", tool_call_id: tr.tool_use_id, content: tr.content || "" });

    const toolUses = getToolUseNodes(turn.response_nodes);
    const respText = trimOrEmpty(turn.response_text) || getTextFromNodes(turn.response_nodes);
    if (toolUses.length > 0) {
      messages.push({
        role: "assistant",
        content: respText || "",
        tool_calls: toolUses.map((u) => ({ id: u.tool_use_id, type: "function", function: { name: u.tool_name, arguments: u.input_json || "{}" } })),
      });
      continue;
    }
    if (respText) messages.push({ role: "assistant", content: respText });
  }

  for (const tr of getToolResultNodes(payload?.nodes)) messages.push({ role: "tool", tool_call_id: tr.tool_use_id, content: tr.content || "" });

  const message = trimOrEmpty(payload?.message);
  const content = toOpenAIUserContent({ messageText: message + buildEditorContextSuffix(payload), nodes: payload?.nodes });
  if (typeof content === "string" ? content : content.length > 0) messages.push({ role: "user", content });
  return messages;
}

function toAugmentToolUseNodes(toolCalls) {
  return asArray(toolCalls)
    .map((c) => (c && typeof c === "object" ? c : null))
    .filter(Boolean)
    .map((c, idx) => {
      const tool_use_id = typeof c.id === "string" && c.id ? c.id : `tooluse_${Date.now()}_${idx}`;
      const tool_name = typeof c.name === "string" ? c.name : "";
      const input_json = typeof c.arguments === "string" && c.arguments.trim() ? c.arguments : "{}";
      if (!tool_name) return null;
      return { id: idx + 1, type: 5, tool_use: { tool_use_id, tool_name, input_json } };
    })
    .filter(Boolean);
}

function toChatStopReason(value) {
  const v = typeof value === "string" ? value : "";
  if (v === "stop" || v === "end_turn" || v === "stop_sequence") return 1;
  if (v === "length" || v === "max_tokens") return 2;
  if (v === "tool_calls" || v === "tool_use") return 3;
  if (v === "content_filter" || v === "safety") return 4;
  return 0;
}

async function* iterateSseEvents(reader) {
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    buffer = buffer.replace(/\r/g, "");
    while (buffer.includes("\n\n")) {
      const idx = buffer.indexOf("\n\n");
      const rawEvent = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      const lines = rawEvent.split("\n");
      const dataLines = [];
      for (const line of lines) {
        if (!line || line.startsWith(":")) continue;
        if (line.startsWith("data:")) dataLines.push(line.slice("data:".length).trimStart());
      }
      const data = dataLines.join("\n");
      yield { data };
    }
  }
}

async function openAiChatCompletions({ baseUrl, apiKey, body, signal }) {
  const url = openAiChatCompletionsUrl(baseUrl);
  const headers = { "content-type": "application/json" };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  return await fetch(url, { method: "POST", headers, body: JSON.stringify(body), signal });
}

function getThirdPartyOverride(payload) {
  const override = payload && typeof payload === "object" ? payload.third_party_override : undefined;
  if (!override || typeof override !== "object") return {};
  const baseUrl = trimOrEmpty(override.base_url);
  const apiKey = trimOrEmpty(override.api_key);
  const providerModelName = trimOrEmpty(override.provider_model_name);
  return { baseUrl, apiKey, providerModelName };
}

function defaultUpstreamConfig() {
  return {
    baseUrl: "https://api.openai.com/v1",
    apiKey: "",
    model: "gpt-4o-mini",
    temperature: 0.2,
    maxTokens: undefined,
    systemPromptBase: [
      "You are a coding assistant running inside VS Code.",
      "You may call provided tools (functions) when appropriate.",
      "When asked to remember something, use the memory-related tool with a sufficiently specific, self-contained entry (what + when to apply). Do not store secrets.",
      "If user provides images, incorporate relevant visual information into your reasoning.",
      "Reply concisely and correctly.",
    ].join("\n"),
  };
}

function normalizeUpstreamConfig(upstream, payload) {
  const fallback = defaultUpstreamConfig();
  const base = upstream && typeof upstream === "object" ? upstream : {};
  const third = getThirdPartyOverride(payload);
  const baseUrl = trimOrEmpty(third.baseUrl) || trimOrEmpty(base.baseUrl) || fallback.baseUrl;
  const apiKey = trimOrEmpty(third.apiKey) || trimOrEmpty(base.apiKey) || fallback.apiKey;
  const payloadModel = trimOrEmpty(payload?.model);
  const model = payloadModel || trimOrEmpty(third.providerModelName) || trimOrEmpty(base.model) || fallback.model;
  const temperature = typeof base.temperature === "number" ? base.temperature : fallback.temperature;
  const maxTokens = Number.isFinite(base.maxTokens) && base.maxTokens > 0 ? base.maxTokens : undefined;
  const systemPromptBase = trimOrEmpty(base.systemPromptBase) || fallback.systemPromptBase;
  return { baseUrl, apiKey, model, temperature, maxTokens, systemPromptBase };
}

function requireApiKeyIfOpenAi(upstream) {
  const url = String(upstream.baseUrl || "");
  const looksLikeOpenAI = url.includes("api.openai.com") || url.includes("openai.com/v1");
  return looksLikeOpenAI && !trimOrEmpty(upstream.apiKey);
}

const upstreamModelsCache = {
  key: "",
  fetchedAtMs: 0,
  ttlMs: 10 * 60 * 1000,
  models: [],
  lastError: "",
};

function upstreamCacheKey({ baseUrl, apiKey }) {
  const b = normalizeOpenAiV1BaseUrl(baseUrl) || String(baseUrl || "").trim() || "https://api.openai.com/v1";
  const k = trimOrEmpty(apiKey);
  const digest = k ? crypto.createHash("sha256").update(k).digest("hex") : "nokey";
  return `${b}|${digest}`;
}

async function fetchUpstreamModelIds(upstream, logger) {
  const cacheKey = upstreamCacheKey(upstream);
  const now = Date.now();
  if (upstreamModelsCache.key === cacheKey && upstreamModelsCache.fetchedAtMs > 0 && now - upstreamModelsCache.fetchedAtMs < upstreamModelsCache.ttlMs && upstreamModelsCache.models.length > 0)
    return upstreamModelsCache.models.slice();

  const url = openAiModelsUrl(upstream.baseUrl);
  if (!url) {
    upstreamModelsCache.key = cacheKey;
    upstreamModelsCache.fetchedAtMs = now;
    upstreamModelsCache.lastError = "BYOK API 地址无效：请填写有效的 http(s) URL（建议填到 /v1；未包含 /v1 时会自动补全）";
    logger.warn(`Upstream /v1/models skipped: ${upstreamModelsCache.lastError}`);
    return [];
  }
  const headers = { "content-type": "application/json" };
  const apiKey = trimOrEmpty(upstream.apiKey);
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  try {
    const resp = await fetch(url, { method: "GET", headers });
    const text = await resp.text().catch(() => "");
    if (!resp.ok) throw new Error(`HTTP ${resp.status} ${text || resp.statusText}`);
    const data = safeJsonParse(text, undefined);
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data?.models) ? data.models : Array.isArray(data) ? data : [];
    const ids = list
      .map((m) => {
        if (typeof m === "string") return m.trim();
        if (m && typeof m === "object" && typeof m.id === "string") return m.id.trim();
        if (m && typeof m === "object" && typeof m.name === "string") return m.name.trim();
        return "";
      })
      .filter(Boolean);
    upstreamModelsCache.key = cacheKey;
    upstreamModelsCache.fetchedAtMs = now;
    upstreamModelsCache.models = ids;
    upstreamModelsCache.lastError = "";
    logger.debug(`Upstream /v1/models ok: ${ids.length} models`);
    return ids.slice();
  } catch (e) {
    upstreamModelsCache.key = cacheKey;
    upstreamModelsCache.fetchedAtMs = now;
    upstreamModelsCache.lastError = String(e?.message || e);
    logger.warn(`Upstream /v1/models failed: ${upstreamModelsCache.lastError}`);
    return [];
  }
}

function streamError(res, message) {
  writeNdjson(res, { text: `[augment-byok] ${message}\n` });
  writeNdjson(res, { text: "", stop_reason: 1 });
  res.end();
}

function jsonOk(res, payload) {
  return sendJson(res, 200, payload);
}

async function handleChatStream(req, res, payload, upstream, logger) {
  startNdjson(res, 200);
  if (requireApiKeyIfOpenAi(upstream)) return streamError(res, "BYOK API Key 未配置（OpenAI 需要 key，请打开 Augment BYOK 面板设置）");

  const systemPrompt = buildSystemPrompt(payload, upstream.systemPromptBase);
  const messages = toOpenAIMessagesFromAugment({ systemPrompt, payload });
  const tools = toOpenAITools(payload?.tool_definitions);

  const abortController = new AbortController();
  const onAbort = () => abortController.abort();
  req.on("close", onAbort);
  req.on("aborted", onAbort);

  try {
    const upstreamResp = await openAiChatCompletions({
      baseUrl: upstream.baseUrl,
      apiKey: upstream.apiKey,
      body: {
        model: upstream.model,
        temperature: typeof upstream.temperature === "number" ? upstream.temperature : 0.2,
        stream: true,
        messages,
        ...(tools.length > 0 ? { tools, tool_choice: "auto" } : {}),
        ...(Number.isFinite(upstream.maxTokens) && upstream.maxTokens > 0 ? { max_tokens: upstream.maxTokens } : {}),
      },
      signal: abortController.signal,
    });

    const upstreamText = upstreamResp.ok ? "" : await upstreamResp.text().catch(() => "");
    if (!upstreamResp.ok) return streamError(res, `Upstream HTTP ${upstreamResp.status}: ${upstreamText || upstreamResp.statusText}`);
    if (!upstreamResp.body) return streamError(res, "Upstream 响应没有 body（无法流式读取）");

    const reader = upstreamResp.body.getReader();
    let stopReason = 1;
    const toolCallsByIndex = new Map();
    let legacyFunctionCall = { name: "", arguments: "" };

    for await (const evt of iterateSseEvents(reader)) {
      const data = evt.data;
      if (!data) continue;
      if (data === "[DONE]") break;
      const parsed = safeJsonParse(data, undefined);
      if (!parsed) continue;
      const choice = Array.isArray(parsed?.choices) ? parsed.choices[0] : undefined;

      const deltaText = choice?.delta?.content;
      if (typeof deltaText === "string" && deltaText) writeNdjson(res, { text: deltaText });

      const deltaToolCalls = Array.isArray(choice?.delta?.tool_calls) ? choice.delta.tool_calls : [];
      for (const tc of deltaToolCalls) {
        const idx = typeof tc?.index === "number" ? tc.index : 0;
        const cur = toolCallsByIndex.get(idx) || { id: "", name: "", arguments: "" };
        if (typeof tc?.id === "string" && tc.id) cur.id = tc.id;
        const fn = tc?.function;
        if (typeof fn?.name === "string" && fn.name) cur.name = fn.name;
        if (typeof fn?.arguments === "string" && fn.arguments) cur.arguments += fn.arguments;
        toolCallsByIndex.set(idx, cur);
      }

      const legacyFn = choice?.delta?.function_call;
      if (legacyFn && typeof legacyFn === "object") {
        if (typeof legacyFn.name === "string" && legacyFn.name) legacyFunctionCall.name = legacyFn.name;
        if (typeof legacyFn.arguments === "string" && legacyFn.arguments) legacyFunctionCall.arguments += legacyFn.arguments;
      }

      const finish = choice?.finish_reason;
      if (typeof finish === "string") stopReason = toChatStopReason(finish);
    }

    const toolCalls = Array.from(toolCallsByIndex.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => v)
      .filter((v) => v && v.name);
    if (toolCalls.length === 0 && legacyFunctionCall.name) toolCalls.push({ id: `call_${Date.now()}`, name: legacyFunctionCall.name, arguments: legacyFunctionCall.arguments || "{}" });

    const toolIndex = indexToolDefinitions(payload?.tool_definitions);
    const ctxText = trimOrEmpty(payload?.message) || getTextFromNodes(payload?.nodes);
    const repairedToolCalls = toolCalls.map((c) => ({ ...c, arguments: repairToolCallArguments({ toolName: c.name, rawArguments: c.arguments, toolInfo: toolIndex.get(c.name), contextText: ctxText }) }));
    const nodes = repairedToolCalls.length > 0 ? toAugmentToolUseNodes(repairedToolCalls) : [];
    writeNdjson(res, nodes.length > 0 ? { text: "", nodes, stop_reason: 3 } : { text: "", stop_reason: stopReason });
    res.end();
  } catch (err) {
    logger.error("chat-stream failed:", err);
    streamError(res, String(err && err.message ? err.message : err));
  } finally {
    req.off("close", onAbort);
    req.off("aborted", onAbort);
  }
}

async function handleChat(req, res, payload, upstream, logger) {
  if (requireApiKeyIfOpenAi(upstream)) return jsonOk(res, { is_error: true, error_message: "BYOK API Key 未配置（OpenAI 需要 key）" });

  try {
    const systemPrompt = buildSystemPrompt(payload, upstream.systemPromptBase);
    const messages = toOpenAIMessagesFromAugment({ systemPrompt, payload });
    const tools = toOpenAITools(payload?.tool_definitions);

    const upstreamResp = await openAiChatCompletions({
      baseUrl: upstream.baseUrl,
      apiKey: upstream.apiKey,
      body: {
        model: upstream.model,
        temperature: typeof upstream.temperature === "number" ? upstream.temperature : 0.2,
        stream: false,
        messages,
        ...(tools.length > 0 ? { tools, tool_choice: "auto" } : {}),
        ...(Number.isFinite(upstream.maxTokens) && upstream.maxTokens > 0 ? { max_tokens: upstream.maxTokens } : {}),
      },
    });

    const raw = await upstreamResp.text();
    if (!upstreamResp.ok) return sendJson(res, 502, { error: `Upstream HTTP ${upstreamResp.status}: ${raw || upstreamResp.statusText}` });
    const data = safeJsonParse(raw, {});
    const choice = Array.isArray(data?.choices) ? data.choices[0] : undefined;
    const content = typeof choice?.message?.content === "string" ? choice.message.content : "";
    const toolCalls = Array.isArray(choice?.message?.tool_calls) ? choice.message.tool_calls : [];
    const toolIndex = indexToolDefinitions(payload?.tool_definitions);
    const ctxText = trimOrEmpty(payload?.message) || getTextFromNodes(payload?.nodes);
    const repairedToolCalls = toolCalls
      .map((c) => ({ id: c.id, name: c.function?.name, arguments: c.function?.arguments }))
      .map((c) => ({ ...c, arguments: repairToolCallArguments({ toolName: c.name, rawArguments: c.arguments, toolInfo: toolIndex.get(c.name), contextText: ctxText }) }));
    const nodes = repairedToolCalls.length > 0 ? toAugmentToolUseNodes(repairedToolCalls) : [];
    return jsonOk(res, { text: content || "", nodes, stop_reason: nodes.length > 0 ? 3 : 1 });
  } catch (err) {
    logger.error("chat failed:", err);
    return sendJson(res, 502, { error: String(err && err.message ? err.message : err) });
  }
}

async function handlePromptLikeStream(res, payload, upstream, { system, user }, logger) {
  startNdjson(res, 200);
  if (requireApiKeyIfOpenAi(upstream)) return streamError(res, "BYOK API Key 未配置（OpenAI 需要 key）");

  try {
    const upstreamResp = await openAiChatCompletions({
      baseUrl: upstream.baseUrl,
      apiKey: upstream.apiKey,
      body: {
        model: upstream.model,
        temperature: typeof upstream.temperature === "number" ? upstream.temperature : 0.2,
        stream: true,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        ...(Number.isFinite(upstream.maxTokens) && upstream.maxTokens > 0 ? { max_tokens: upstream.maxTokens } : {}),
      },
    });

    const upstreamText = upstreamResp.ok ? "" : await upstreamResp.text().catch(() => "");
    if (!upstreamResp.ok) return streamError(res, `Upstream HTTP ${upstreamResp.status}: ${upstreamText || upstreamResp.statusText}`);
    if (!upstreamResp.body) return streamError(res, "Upstream 响应没有 body（无法流式读取）");

    const reader = upstreamResp.body.getReader();
    let stopReason = 1;
    for await (const evt of iterateSseEvents(reader)) {
      const data = evt.data;
      if (!data) continue;
      if (data === "[DONE]") break;
      const parsed = safeJsonParse(data, undefined);
      const choice = Array.isArray(parsed?.choices) ? parsed.choices[0] : undefined;
      const deltaText = choice?.delta?.content;
      if (typeof deltaText === "string" && deltaText) writeNdjson(res, { text: deltaText });
      const finish = choice?.finish_reason;
      if (typeof finish === "string") stopReason = toChatStopReason(finish);
    }
    writeNdjson(res, { text: "", stop_reason: stopReason });
    res.end();
  } catch (err) {
    logger.error("stream failed:", err);
    streamError(res, String(err && err.message ? err.message : err));
  }
}

function prependTextToUserContent(userContent, prefixText) {
  const prefix = trimOrEmpty(prefixText);
  if (!prefix) return userContent;
  if (typeof userContent === "string") return mergeText(prefix, userContent);
  const parts = Array.isArray(userContent) ? userContent.slice() : [];
  if (parts.length === 0) return [{ type: "text", text: prefix }];
  const first = parts[0];
  if (first && first.type === "text" && typeof first.text === "string") parts[0] = { ...first, text: mergeText(prefix, first.text) };
  else parts.unshift({ type: "text", text: prefix });
  return parts;
}

function summarizeChatHistoryForPromptEnhancer(chatHistory, maxTurns = 8) {
  const turns = asArray(chatHistory)
    .map((t) => (t && typeof t === "object" ? t : null))
    .filter(Boolean)
    .slice(-maxTurns);
  const lines = [];
  for (const t of turns) {
    const u = trimOrEmpty(t.request_message);
    const a = trimOrEmpty(t.response_text) || getTextFromNodes(t.response_nodes);
    if (u) lines.push(`User: ${u}`);
    if (a) lines.push(`Assistant: ${a}`);
  }
  return lines.join("\n");
}

async function handlePromptEnhancerStream(res, payload, upstream, logger) {
  const system = [
    "You are a prompt enhancer for an AI coding assistant inside VS Code.",
    "Rewrite the user's draft prompt to be clearer, more specific, and more actionable.",
    "Preserve the user's intent and constraints. Do not add new requirements.",
    "Output ONLY the improved prompt text. No preamble. No code fences.",
  ].join("\n");

  const draft = toOpenAIUserContent({ messageText: "", nodes: payload?.nodes });
  const history = summarizeChatHistoryForPromptEnhancer(payload?.chat_history);
  const user = prependTextToUserContent(draft, history ? `Recent conversation context:\n${history}\n\nDraft prompt:` : "Draft prompt:");
  return await handlePromptLikeStream(res, payload, upstream, { system, user }, logger);
}

async function handleGenerateConversationTitleStream(res, payload, upstream, logger) {
  const system = [
    "You generate short conversation titles for an AI coding assistant.",
    "Return a short title (max 6 words) that summarizes the conversation.",
    "No quotes. No trailing punctuation. Use the same language as the user.",
    "Output ONLY the title text.",
  ].join("\n");

  const history = summarizeChatHistoryForPromptEnhancer(payload?.chat_history, 12);
  const user = history ? `Conversation:\n${history}` : "Conversation: (empty)";
  return await handlePromptLikeStream(res, payload, upstream, { system, user }, logger);
}

async function handleCompletion(res, payload, upstream, logger) {
  if (requireApiKeyIfOpenAi(upstream)) return jsonOk(res, { completion_items: [], unknown_blob_names: [], checkpoint_not_found: false });

  const prefix = trimOrEmpty(payload?.prefix);
  const suffix = trimOrEmpty(payload?.suffix);
  const lang = trimOrEmpty(payload?.lang);
  const filePath = trimOrEmpty(payload?.path);

  const system = [
    "You are an inline code completion engine.",
    "Return ONLY the completion text that should be inserted at the cursor.",
    "Do not include Markdown fences. Do not include explanations.",
  ].join("\n");

  const user = [
    filePath ? `file: ${filePath}` : "",
    lang ? `language: ${lang}` : "",
    "prefix:\n" + prefix,
    "suffix:\n" + suffix,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const upstreamResp = await openAiChatCompletions({
      baseUrl: upstream.baseUrl,
      apiKey: upstream.apiKey,
      body: {
        model: upstream.model,
        temperature: typeof upstream.temperature === "number" ? upstream.temperature : 0.2,
        stream: false,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        ...(Number.isFinite(upstream.maxTokens) && upstream.maxTokens > 0 ? { max_tokens: upstream.maxTokens } : {}),
      },
    });

    const raw = await upstreamResp.text();
    if (!upstreamResp.ok) return jsonOk(res, { completion_items: [], unknown_blob_names: [], checkpoint_not_found: false, error: `Upstream HTTP ${upstreamResp.status}` });
    const data = safeJsonParse(raw, {});
    const choice = Array.isArray(data?.choices) ? data.choices[0] : undefined;
    const content = typeof choice?.message?.content === "string" ? choice.message.content : "";
    const text = stripCodeFences(content).replace(/^\n+|\n+$/g, "");
    return jsonOk(res, { completion_items: [{ text }], unknown_blob_names: [], checkpoint_not_found: false });
  } catch (err) {
    logger.error("completion failed:", err);
    return jsonOk(res, { completion_items: [], unknown_blob_names: [], checkpoint_not_found: false });
  }
}

async function handleEdit(res, payload, upstream, logger) {
  if (requireApiKeyIfOpenAi(upstream)) return jsonOk(res, { text: trimOrEmpty(payload?.selected_code) });

  const instruction = trimOrEmpty(payload?.instruction) || trimOrEmpty(payload?.edit_instruction) || trimOrEmpty(payload?.message);
  const selected = trimOrEmpty(payload?.selected_code);
  const prefix = trimOrEmpty(payload?.prefix);
  const suffix = trimOrEmpty(payload?.suffix);

  const system = [
    "You are a code editor.",
    "Apply the instruction to the given code.",
    "Return ONLY the updated code (no Markdown fences, no explanations).",
  ].join("\n");
  const user = [
    instruction ? `instruction:\n${instruction}` : "",
    selected ? `selected_code:\n${selected}` : "",
    prefix || suffix ? `context:\n<<<PREFIX\n${prefix}\nPREFIX>>>\n<<<SUFFIX\n${suffix}\nSUFFIX>>>` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const upstreamResp = await openAiChatCompletions({
      baseUrl: upstream.baseUrl,
      apiKey: upstream.apiKey,
      body: {
        model: upstream.model,
        temperature: typeof upstream.temperature === "number" ? upstream.temperature : 0.2,
        stream: false,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        ...(Number.isFinite(upstream.maxTokens) && upstream.maxTokens > 0 ? { max_tokens: upstream.maxTokens } : {}),
      },
    });
    const raw = await upstreamResp.text();
    if (!upstreamResp.ok) return jsonOk(res, { text: selected });
    const data = safeJsonParse(raw, {});
    const choice = Array.isArray(data?.choices) ? data.choices[0] : undefined;
    const content = typeof choice?.message?.content === "string" ? choice.message.content : "";
    const text = stripCodeFences(content).replace(/^\n+|\n+$/g, "");
    return jsonOk(res, { text, unknown_blob_names: [], checkpoint_not_found: false });
  } catch (err) {
    logger.error("edit failed:", err);
    return jsonOk(res, { text: selected, unknown_blob_names: [], checkpoint_not_found: false });
  }
}

async function spawnCollect(command, args, { cwd, timeoutMs }) {
  return await new Promise((resolve) => {
    const child = spawn(command, args, { cwd, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    const timer = timeoutMs ? setTimeout(() => child.kill("SIGKILL"), timeoutMs) : null;
    child.stdout.on("data", (d) => (stdout += d.toString("utf8")));
    child.stderr.on("data", (d) => (stderr += d.toString("utf8")));
    child.on("error", (err) => {
      if (timer) clearTimeout(timer);
      resolve({ ok: false, error: err, stdout, stderr });
    });
    child.on("close", (code) => {
      if (timer) clearTimeout(timer);
      resolve({ ok: code === 0, code, stdout, stderr });
    });
  });
}

async function handleAgentsCodebaseRetrieval(res, payload, workspaceRoot, logger) {
  const queryRaw = trimOrEmpty(payload?.information_request) || trimOrEmpty(payload?.query);
  if (!queryRaw) return jsonOk(res, { formatted_retrieval: "codebase-retrieval: missing information_request/query" });

  const tokens = Array.from(new Set((queryRaw.match(/[A-Za-z_][A-Za-z0-9_]{2,}/g) || []).slice(0, 8)));
  if (tokens.length === 0) tokens.push(queryRaw.slice(0, 64));

  const perTokenMax = 40;
  const blocks = [];
  for (const token of tokens.slice(0, 5)) {
    const resp = await spawnCollect("rg", ["-n", "--no-heading", "--color=never", "-F", "--max-count", String(perTokenMax), "--", token, "."], {
      cwd: workspaceRoot,
      timeoutMs: 120000,
    });
    if (!resp.ok) {
      if (resp.error && resp.error.code === "ENOENT") blocks.push(`# ${token}\nrg 不可用：请安装 ripgrep（rg）`);
      else blocks.push(`# ${token}\n(rg failed)`);
      continue;
    }
    const out = trimOrEmpty(resp.stdout);
    blocks.push(out ? `# ${token}\n${out}` : `# ${token}\n(no matches)`);
  }

  const header = `codebase-retrieval (local rg)\nquery: ${queryRaw}\nworkspaceRoot: ${workspaceRoot}\n`;
  const result = `${header}\n${blocks.join("\n\n")}\n`;
  logger.debug("codebase-retrieval ok");
  return jsonOk(res, { formatted_retrieval: result });
}

async function handleAgentsEditFile(res, payload, upstream, logger) {
  const filePath = trimOrEmpty(payload?.file_path);
  const editSummary = trimOrEmpty(payload?.edit_summary);
  const detailed = trimOrEmpty(payload?.detailed_edit_description);
  const original = typeof payload?.file_contents === "string" ? payload.file_contents : "";

  if (requireApiKeyIfOpenAi(upstream)) return jsonOk(res, { modified_file_contents: original, is_error: true, error_message: "BYOK API Key 未配置（OpenAI 需要 key）" });

  const system = [
    "You are a code editor.",
    "Apply the requested edits to the given file contents.",
    "Return ONLY the updated file contents wrapped exactly between:",
    "<file_content>",
    "...",
    "</file_content>",
    "Do not include code fences. Do not include explanations.",
  ].join("\n");
  const user = [
    `file_path: ${filePath || "(unknown)"}`,
    editSummary ? `edit_summary: ${editSummary}` : "",
    detailed ? `detailed_edit_description:\n${detailed}` : "",
    "original_file_contents:\n<original>\n" + original + "\n</original>",
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const upstreamResp = await openAiChatCompletions({
      baseUrl: upstream.baseUrl,
      apiKey: upstream.apiKey,
      body: {
        model: upstream.model,
        temperature: typeof upstream.temperature === "number" ? upstream.temperature : 0.2,
        stream: false,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        ...(Number.isFinite(upstream.maxTokens) && upstream.maxTokens > 0 ? { max_tokens: upstream.maxTokens } : {}),
      },
    });
    const raw = await upstreamResp.text();
    if (!upstreamResp.ok) return jsonOk(res, { modified_file_contents: original, is_error: true, error_message: `Upstream HTTP ${upstreamResp.status}` });

    const data = safeJsonParse(raw, {});
    const choice = Array.isArray(data?.choices) ? data.choices[0] : undefined;
    const answer = typeof choice?.message?.content === "string" ? choice.message.content : "";
    const tagged = extractBetween(answer, "<file_content>", "</file_content>");
    const content = (tagged || stripCodeFences(answer)).replace(/^\n+|\n+$/g, "");
    return jsonOk(res, { modified_file_contents: content, is_error: false });
  } catch (e) {
    logger.error("agents/edit-file failed:", e);
    return jsonOk(res, { modified_file_contents: original, is_error: true, error_message: String(e?.message || e) });
  }
}

async function handleGetModels(req, res, upstream, augment, bodyBuffer, logger) {
  const model = trimOrEmpty(upstream.model) || defaultUpstreamConfig().model;
  const alwaysOnMinVersion = "0.0.0";
  const forcedBackFeatureFlagsBase = {
    vscode_min_version: alwaysOnMinVersion,
    vscode_agent_mode_min_version: alwaysOnMinVersion,
    vscode_agent_mode_min_stable_version: alwaysOnMinVersion,
    vscode_chat_with_tools_min_version: alwaysOnMinVersion,
    vscode_support_tool_use_start_min_version: alwaysOnMinVersion,
    vscode_design_system_rich_text_editor_min_version: alwaysOnMinVersion,
    vscode_editable_history_min_version: alwaysOnMinVersion,
    vscode_chat_multimodal_min_version: alwaysOnMinVersion,
    vscode_chat_stable_prefix_truncation_min_version: alwaysOnMinVersion,
    vscode_direct_apply_min_version: alwaysOnMinVersion,
    vscode_share_min_version: alwaysOnMinVersion,
    vscode_external_sources_in_chat_min_version: alwaysOnMinVersion,
    vscode_new_threads_menu_min_version: alwaysOnMinVersion,
    vscode_personalities_min_version: alwaysOnMinVersion,
    vscode_show_thinking_summary_min_version: alwaysOnMinVersion,
    vscode_rich_checkpoint_info_min_version: alwaysOnMinVersion,
    enable_smart_paste_min_version: alwaysOnMinVersion,
    history_summary_min_version: alwaysOnMinVersion,
    vscode_use_checkpoint_manager_context_min_version: alwaysOnMinVersion,
    vscode_next_edit_min_version: alwaysOnMinVersion,
    vscode_next_edit_bottom_panel_min_version: alwaysOnMinVersion,
    vscode_generate_commit_message_min_version: alwaysOnMinVersion,
    vscode_sources_min_version: alwaysOnMinVersion,
    vscode_background_agents_min_version: alwaysOnMinVersion,
    vscode_task_list_min_version: alwaysOnMinVersion,

    small_sync_threshold: 15,
    big_sync_threshold: 1000,
    max_upload_size_bytes: DEFAULT_MAX_BODY_BYTES,
    max_trackable_file_count: 250000,
    max_trackable_file_count_without_permission: 150000,
    min_uploaded_percentage_without_permission: 90,

    enable_instructions: true,
    enable_smart_paste: true,
    enable_prompt_enhancer: true,
    enable_rules: true,
    enable_summary_titles: true,
    enable_new_threads_list: true,
    enable_model_registry: true,
    enable_editable_history: true,
    enable_chat_multimodal: true,
    enable_chat_with_tools: true,
    enable_agent_mode: true,
    enable_agent_auto_mode: true,
    enable_memory_retrieval: true,
    memories_text_editor_enabled: true,
    enable_grouped_tools: true,
    enable_parallel_tools: true,
    enable_agent_git_tracker: true,
    enable_bulk_delete_threads: true,
    enable_exchange_storage: true,
    enable_tool_use_state_storage: true,
    retry_chat_stream_timeouts: true,
    enable_chat_input_inline_completion: true,
    enable_intersection_observer_manager: true,

    smart_paste_precompute_mode: "visible-hover",
    memories_params: "{}",
    elo_model_configuration: JSON.stringify({ highPriorityModels: [], regularBattleModels: [], highPriorityThreshold: 0.5 }),

    vscode_terminal_strategy: "vscode_events",
    vscode_auto_index_permission: "off",
  };

  try {
    const upstreamIdsRaw = await fetchUpstreamModelIds(upstream, logger);
    const upstreamIds = [...new Set([model, ...upstreamIdsRaw])].filter(Boolean);
    const additionalChatModelsObj = Object.fromEntries(upstreamIds.map((id) => [id, id]));
    const modelInfoRegistryObj = Object.fromEntries(upstreamIds.map((id) => [id, { displayName: id, ...(id === model ? { isDefault: true } : {}) }]));
    const forcedBackFeatureFlags = {
      ...forcedBackFeatureFlagsBase,
      additional_chat_models: JSON.stringify(additionalChatModelsObj),
      model_registry: JSON.stringify(additionalChatModelsObj),
      model_info_registry: JSON.stringify(modelInfoRegistryObj),
      agent_chat_model: model,
    };

    const minimalTemplate = { suggested_prefix_char_count: 8000, suggested_suffix_char_count: 2000, completion_timeout_ms: 800 };
    const byokModels = upstreamIds.map((id) => ({ ...minimalTemplate, name: id, internal_name: id, disabled: false, disabled_reason: "" }));
    const fallback = { default_model: model, models: byokModels, feature_flags: forcedBackFeatureFlags, user_tier: "ENTERPRISE_TIER" };

    if (!augment?.enabled) return jsonOk(res, fallback);

    const target = new URL("get-models", augment.baseUrl);
    const headers = stripHopByHopRequestHeaders(toSingleValueHeaders(req.headers));
    headers.Authorization = `Bearer ${augment.token}`;

    const upstreamResp = await fetch(target.toString(), {
      method: req.method || "POST",
      headers,
      body: bodyBuffer && bodyBuffer.length > 0 ? bodyBuffer : undefined,
    });

    if (!upstreamResp.ok) {
      const text = await upstreamResp.text().catch(() => "");
      logger.warn(`augment proxy get-models failed: HTTP ${upstreamResp.status} ${text || upstreamResp.statusText}`);
      return jsonOk(res, fallback);
    }

    const official = await upstreamResp.json().catch(() => undefined);
    if (!official || typeof official !== "object") return jsonOk(res, fallback);

    const officialModels = Array.isArray(official.models) ? official.models.filter((m) => m && typeof m === "object") : [];
    const template = officialModels.length > 0 ? officialModels[0] : {};
    const byokModelsFromOfficialTemplate = upstreamIds.map((id) => ({
      ...template,
      name: id,
      internal_name: id,
      suggested_prefix_char_count: Number.isFinite(template.suggested_prefix_char_count) ? template.suggested_prefix_char_count : 8000,
      suggested_suffix_char_count: Number.isFinite(template.suggested_suffix_char_count) ? template.suggested_suffix_char_count : 2000,
      completion_timeout_ms: Number.isFinite(template.completion_timeout_ms) ? template.completion_timeout_ms : 800,
      disabled: false,
      disabled_reason: "",
    }));

    const officialFlags = official.feature_flags && typeof official.feature_flags === "object" ? official.feature_flags : {};
    const mergedFlags = { ...officialFlags, ...forcedBackFeatureFlags };
    const userTier = typeof official.user_tier === "string" && official.user_tier.trim() ? official.user_tier.trim() : fallback.user_tier;

    return jsonOk(res, { ...official, default_model: model, models: byokModelsFromOfficialTemplate, feature_flags: mergedFlags, user_tier: userTier });
  } catch (e) {
    logger.warn("augment proxy get-models exception:", e);
    const upstreamIdsRaw = await fetchUpstreamModelIds(upstream, logger);
    const upstreamIds = [...new Set([model, ...upstreamIdsRaw])].filter(Boolean);
    const additionalChatModelsObj = Object.fromEntries(upstreamIds.map((id) => [id, id]));
    const modelInfoRegistryObj = Object.fromEntries(upstreamIds.map((id) => [id, { displayName: id, ...(id === model ? { isDefault: true } : {}) }]));
    const minimalTemplate = { suggested_prefix_char_count: 8000, suggested_suffix_char_count: 2000, completion_timeout_ms: 800 };
    const byokModels = upstreamIds.map((id) => ({ ...minimalTemplate, name: id, internal_name: id, disabled: false, disabled_reason: "" }));
    return jsonOk(res, {
      default_model: model,
      models: byokModels,
      feature_flags: {
        ...forcedBackFeatureFlagsBase,
        additional_chat_models: JSON.stringify(additionalChatModelsObj),
        model_registry: JSON.stringify(additionalChatModelsObj),
        model_info_registry: JSON.stringify(modelInfoRegistryObj),
        agent_chat_model: model,
      },
      user_tier: "ENTERPRISE_TIER",
    });
  }
}

async function handleGetCreditInfo(res) {
  return jsonOk(res, { credit_remaining_in_dollars: 0, creditRemainingInDollars: 0 });
}

async function handleSubscriptionInfo(res) {
  return jsonOk(res, {
    subscription: { ActiveSubscription: { end_date: null, usage_balance_depleted: false } },
    feature_gating_info: { feature_controls: [] },
    featureGatingInfo: { feature_controls: [] },
  });
}

async function handleGetTenantToolPermissions(res) {
  return jsonOk(res, { tool_permissions_settings: { rules: [] }, toolPermissionsSettings: { rules: [] } });
}

async function handleCheckpointBlobs(res) {
  const id = `chk_${Date.now()}`;
  return jsonOk(res, { new_checkpoint_id: id, newCheckpointId: id });
}

async function handleBatchUpload(res, payload) {
  const blobs = asArray(payload?.blobs).map((b) => (b && typeof b === "object" ? b : null)).filter(Boolean);
  const blobNames = blobs.map((b) => trimOrEmpty(b.blobName) || trimOrEmpty(b.blob_name)).filter(Boolean);
  return jsonOk(res, {
    blobNames,
    blob_names: blobNames,
    expectedToActualBlobNameMap: {},
    expected_to_actual_blob_name_map: {},
    expectedToActualBlobNameMap: {},
    blob_name_map: {},
  });
}

async function handleFindMissing(res) {
  return jsonOk(res, {
    unknownBlobNames: [],
    nonindexedBlobNames: [],
    missingBlobNames: [],
    unknown_blob_names: [],
    nonindexed_blob_names: [],
    missing_blob_names: [],
    unknown_memory_names: [],
  });
}

async function handleNoopOk(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Method Not Allowed" });
  return jsonOk(res, { ok: true });
}

async function handleAgentsCheckToolSafety(res) {
  return jsonOk(res, { is_safe: true });
}

async function handleAgentsListRemoteTools(res) {
  return jsonOk(res, { tools: [] });
}

async function handleAgentsRevokeToolAccess(res) {
  return jsonOk(res, { ok: true });
}

async function handleAgentsRunRemoteTool(res) {
  return jsonOk(res, { tool_output: "", tool_result_message: "not supported in augment-byok", status: 0 });
}

function startByokServer({ host = "127.0.0.1", port = 0, workspaceRoot, getUpstreamConfig, logger }) {
  const log = createLogger(logger);
  const resolvedWorkspaceRoot = workspaceRoot || process.cwd();
  let actualPort = port;

  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url || "/", "http://localhost");
      const pathname = normalizePathname(url.pathname);
      const endpointName = pathname.replace(/^\/+/, "");
      const search = url.search || "";

      if (req.method === "GET" && (pathname === "/" || pathname === "/health" || pathname === "/healthz")) return jsonOk(res, { ok: true });

      const rawConfig = typeof getUpstreamConfig === "function" ? await getUpstreamConfig() : getUpstreamConfig;
      const augment = normalizeAugmentProxyConfig(rawConfig);

      let bodyBuffer = Buffer.alloc(0);
      const method = String(req.method || "POST").toUpperCase();
      const hasBody = method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE";
      if (hasBody) {
        try {
          bodyBuffer = await readBodyBuffer(req);
        } catch (e) {
          log.warn("byok-server failed to read request body:", e);
          return sendJson(res, 413, { error: String(e?.message || e) });
        }
      }

      const payloadText = bodyBuffer.length > 0 ? bodyBuffer.toString("utf8") : "";
      const payload = payloadText.trim() ? safeJsonParse(payloadText, undefined) : undefined;
      const upstream = normalizeUpstreamConfig(rawConfig, payload);

      if (pathname === "/chat-stream") return await handleChatStream(req, res, payload, upstream, log);
      if (pathname === "/chat") return await handleChat(req, res, payload, upstream, log);

      if (pathname === "/completion" || pathname === "/chat-input-completion") return await handleCompletion(res, payload, upstream, log);
      if (pathname === "/instruction-stream")
        return await handlePromptLikeStream(
          res,
          payload,
          upstream,
          {
            system: "You are a helpful assistant. Reply with plain text only.",
            user: trimOrEmpty(payload?.message) || trimOrEmpty(payload?.instruction) || "",
          },
          log,
        );
      if (pathname === "/smart-paste-stream")
        return await handlePromptLikeStream(
          res,
          payload,
          upstream,
          {
            system: "You are a coding assistant. Rewrite the pasted content to fit the target context. Reply with plain text only.",
            user: [trimOrEmpty(payload?.message), trimOrEmpty(payload?.clipboard_text), trimOrEmpty(payload?.selected_code)].filter(Boolean).join("\n\n"),
          },
          log,
        );

      if (pathname === "/next-edit-stream" || pathname === "/generate-commit-message-stream")
        return await handlePromptLikeStream(
          res,
          payload,
          upstream,
          {
            system: "You are a coding assistant. Reply with plain text only.",
            user: trimOrEmpty(payload?.message) || JSON.stringify(payload || {}),
          },
          log,
        );

      if (pathname === "/prompt-enhancer") return await handlePromptEnhancerStream(res, payload, upstream, log);
      if (pathname === "/generate-conversation-title") return await handleGenerateConversationTitleStream(res, payload, upstream, log);

      if (pathname === "/edit") return await handleEdit(res, payload, upstream, log);

      if (pathname === "/token") return jsonOk(res, { access_token: "byok", token_type: "bearer", expires_in: 3600 });

      if (pathname === "/get-models") return await handleGetModels(req, res, upstream, augment, bodyBuffer, log);
      if (pathname === "/get-credit-info") return augment.enabled ? await proxyToAugment({ req, res, augment, endpointName, search, bodyBuffer, logger: log }) : await handleGetCreditInfo(res);
      if (pathname === "/subscription-info") return augment.enabled ? await proxyToAugment({ req, res, augment, endpointName, search, bodyBuffer, logger: log }) : await handleSubscriptionInfo(res);
      if (pathname === "/settings/get-tenant-tool-permissions")
        return augment.enabled ? await proxyToAugment({ req, res, augment, endpointName, search, bodyBuffer, logger: log }) : await handleGetTenantToolPermissions(res);
      if (pathname === "/checkpoint-blobs") return augment.enabled ? await proxyToAugment({ req, res, augment, endpointName, search, bodyBuffer, logger: log }) : await handleCheckpointBlobs(res);
      if (pathname === "/batch-upload") return augment.enabled ? await proxyToAugment({ req, res, augment, endpointName, search, bodyBuffer, logger: log }) : await handleBatchUpload(res, payload);
      if (pathname === "/find-missing") return augment.enabled ? await proxyToAugment({ req, res, augment, endpointName, search, bodyBuffer, logger: log }) : await handleFindMissing(res);

      if (pathname === "/agents/check-tool-safety") return await handleAgentsCheckToolSafety(res);
      if (pathname === "/agents/list-remote-tools") return await handleAgentsListRemoteTools(res);
      if (pathname === "/agents/revoke-tool-access") return await handleAgentsRevokeToolAccess(res);
      if (pathname === "/agents/run-remote-tool") return await handleAgentsRunRemoteTool(res);
      if (pathname === "/agents/codebase-retrieval") return await handleAgentsCodebaseRetrieval(res, payload, resolvedWorkspaceRoot, log);
      if (pathname === "/agents/edit-file") return await handleAgentsEditFile(res, payload, upstream, log);

      if (augment.enabled) return await proxyToAugment({ req, res, augment, endpointName, search, bodyBuffer, logger: log });

      if (pathname.endsWith("-stream")) {
        startNdjson(res, 200);
        writeNdjson(res, { text: "" });
        writeNdjson(res, { text: "", stop_reason: 1 });
        res.end();
        return;
      }

      return await handleNoopOk(req, res);
    } catch (err) {
      log.error("byok-server request error:", err);
      try {
        return sendJson(res, 500, { error: String(err && err.message ? err.message : err) });
      } catch {
        return;
      }
    }
  });

  const ready = new Promise((resolve, reject) => {
    const onError = (err) => reject(err);
    server.once("error", onError);
    server.listen(port, host, () => {
      server.off("error", onError);
      const addr = server.address();
      actualPort = typeof addr === "object" && addr ? addr.port : port;
      const url = `http://${host}:${actualPort}`;
      log.info(`BYOK adapter listening on ${url}`);
      resolve({ host, port: actualPort, url });
    });
  });

  return {
    get host() {
      return host;
    },
    get port() {
      return actualPort;
    },
    get url() {
      return `http://${host}:${actualPort}`;
    },
    ready,
    close: () => {
      try {
        server.close();
      } catch {
        // ignore
      }
    },
  };
}

module.exports = { startByokServer, normalizeOpenAiV1BaseUrl, defaultUpstreamConfig };

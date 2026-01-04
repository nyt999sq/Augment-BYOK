"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const { defaultUpstreamConfig, normalizeOpenAiV1BaseUrl, startByokServer } = require("./byok-server");

// Debug file logging for thinking mode verification
const DEBUG_LOG_PATH = path.join(os.homedir(), "augment-byok-debug.log");
function debugFileLog(label, data) {
  try {
    const timestamp = new Date().toISOString();
    const safeData = JSON.stringify(data, (key, value) => {
      if (key.toLowerCase().includes("key") || key.toLowerCase().includes("token") || key.toLowerCase() === "authorization") {
        return typeof value === "string" && value.length > 8 ? value.slice(0, 4) + "****" + value.slice(-4) : "****";
      }
      return value;
    }, 2);
    fs.appendFileSync(DEBUG_LOG_PATH, `[${timestamp}] ${label}:\n${safeData}\n\n`);
  } catch (e) {
    console.error("[augment-byok] debugFileLog error:", e);
  }
}

const AUGMENT_BYOK = {
  overlayGlobalKey: "__AUGMENT_BYOK_OVERLAY",
  upstreamGlobalKey: "__AUGMENT_BYOK_UPSTREAM",
  serverGlobalKey: "__AUGMENT_BYOK_SERVER",
  patchedGlobalKey: "__AUGMENT_BYOK_PATCHED",
  stateStorageKey: "augment-byok.state.v1",
  apiKeySecretKey: "augment-byok.apiKey",
  augmentTokenSecretKey: "augment-byok.augmentToken",
  commandId: "vscode-augment.showByokPanel",
};

function deepMerge(base, override) {
  if (!override || typeof override !== "object" || Array.isArray(override)) return override;
  const out = base && typeof base === "object" && !Array.isArray(base) ? { ...base } : {};
  for (const [k, v] of Object.entries(override)) out[k] = v && typeof v === "object" && !Array.isArray(v) ? deepMerge(out[k], v) : v;
  return out;
}

function getDefaultUpstreamState() {
  return { ...defaultUpstreamConfig(), augmentBaseUrl: "", augmentToken: "" };
}

function patchConfigListener(ConfigListener) {
  if (typeof ConfigListener !== "function" || !ConfigListener.prototype || typeof ConfigListener.prototype._getRawSettings !== "function") return;
  if (ConfigListener.prototype._getRawSettings.__augmentByokPatched) return;
  const orig = ConfigListener.prototype._getRawSettings;
  ConfigListener.prototype._getRawSettings = function () {
    const raw = orig.call(this);
    const overlay = globalThis[AUGMENT_BYOK.overlayGlobalKey];
    if (!overlay || typeof overlay !== "object") return raw;
    return deepMerge(raw, overlay);
  };
  ConfigListener.prototype._getRawSettings.__augmentByokPatched = true;
}

function readPanelHtml(context, webview) {
  const panelPath = context.asAbsolutePath(path.join("common-webviews", "byok-panel.html"));
  const raw = fs.readFileSync(panelPath, "utf8");
  const csp = ["default-src 'none'", `img-src ${webview.cspSource} https: data:`, `style-src ${webview.cspSource} 'unsafe-inline'`, `script-src ${webview.cspSource} 'unsafe-inline'`].join(
    "; ",
  );
  return raw.replace(/\{\{CSP\}\}/g, csp);
}

function withStorageUriFallback(context) {
  if (!context || context.storageUri) return context;
  const fallback = context.globalStorageUri;
  if (!fallback) return context;
  const wrapped = Object.create(context);
  try {
    Object.defineProperty(wrapped, "storageUri", { value: fallback, enumerable: true, configurable: true });
  } catch {
    try {
      wrapped.storageUri = fallback;
    } catch {
      // ignore
    }
  }
  return wrapped;
}

async function ensureInitialized({ vscode, context }) {
  try {
    const storageUri = context?.storageUri || context?.globalStorageUri;
    if (storageUri?.fsPath) fs.mkdirSync(storageUri.fsPath, { recursive: true });
  } catch {}
  const defaults = getDefaultUpstreamState();
  const saved = context?.globalState?.get(AUGMENT_BYOK.stateStorageKey);
  const upstream = { ...defaults, ...(saved && typeof saved === "object" ? saved : {}), apiKey: "", augmentToken: "" };
  upstream.baseUrl = normalizeOpenAiV1BaseUrl(upstream.baseUrl) || defaults.baseUrl;
  if (!String(upstream.systemPromptBase || "").trim()) upstream.systemPromptBase = defaults.systemPromptBase;
  globalThis[AUGMENT_BYOK.upstreamGlobalKey] = upstream;

  // Debug logging for thinking mode verification
  debugFileLog("ensureInitialized CONFIG LOADED", {
    savedConfig: saved,
    extraHeaders: upstream.extraHeaders,
    extraArgs: upstream.extraArgs,
    hasThinkingHeader: upstream.extraHeaders && upstream.extraHeaders["anthropic-beta"],
    hasThinkingArg: upstream.extraArgs && upstream.extraArgs.thinking,
  });

  try {
    upstream.apiKey = (await context.secrets.get(AUGMENT_BYOK.apiKeySecretKey)) || "";
  } catch {
    upstream.apiKey = "";
  }

  try {
    upstream.augmentToken = (await context.secrets.get(AUGMENT_BYOK.augmentTokenSecretKey)) || "";
  } catch {
    upstream.augmentToken = "";
  }

  if (!globalThis[AUGMENT_BYOK.serverGlobalKey]) {
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    const server = startByokServer({
      host: "127.0.0.1",
      port: 0,
      workspaceRoot,
      getUpstreamConfig: () => globalThis[AUGMENT_BYOK.upstreamGlobalKey],
    });
    globalThis[AUGMENT_BYOK.serverGlobalKey] = server;
    context.subscriptions.push(
      new vscode.Disposable(() => {
        try {
          server.close();
        } catch {
          // ignore
        }
        try {
          delete globalThis[AUGMENT_BYOK.serverGlobalKey];
        } catch {
          // ignore
        }
      }),
    );
  }

  const server = globalThis[AUGMENT_BYOK.serverGlobalKey];
  const addr = await server.ready;
  const base = addr.url.endsWith("/") ? addr.url : `${addr.url}/`;
  globalThis[AUGMENT_BYOK.overlayGlobalKey] = {
    apiToken: "byok",
    completionURL: base,
    advanced: {
      apiToken: "byok",
      completionURL: base,
      mcpServers: [],
      chat: { url: base, stream: true, useRichTextHistory: true, enableEditableHistory: true, smartPasteUsePrecomputation: true, experimentalFullFilePaste: true, modelDisplayNameToId: {} },
      smartPaste: { url: base },
      nextEditURL: base,
      nextEditLocationURL: base,
      nextEditGenerationURL: base,
      nextEdit: { url: base, locationUrl: base, generationUrl: base },
    },
  };
}

function registerByokPanelCommandOnce({ vscode, context }) {
  if (globalThis.__AUGMENT_BYOK_PANEL_CMD_REGISTERED) return;
  globalThis.__AUGMENT_BYOK_PANEL_CMD_REGISTERED = true;

  context.subscriptions.push(
    vscode.commands.registerCommand(AUGMENT_BYOK.commandId, async () => {
      const panel = vscode.window.createWebviewPanel("augmentByokPanel", "Augment BYOK", vscode.ViewColumn.Active, { enableScripts: true, retainContextWhenHidden: true });
      panel.webview.html = readPanelHtml(context, panel.webview);

      const postConfig = async () => {
        const upstream = globalThis[AUGMENT_BYOK.upstreamGlobalKey] || getDefaultUpstreamState();
        const apiKeySet = Boolean(upstream.apiKey && String(upstream.apiKey).trim());
        const augmentTokenSet = Boolean(upstream.augmentToken && String(upstream.augmentToken).trim());
        panel.webview.postMessage({
          type: "byok.config",
          config: {
            baseUrl: upstream.baseUrl || "",
            model: upstream.model || "",
            temperature: typeof upstream.temperature === "number" ? upstream.temperature : 0.2,
            maxTokens: typeof upstream.maxTokens === "number" ? upstream.maxTokens : null,
            systemPromptBase: upstream.systemPromptBase || "",
            apiKeySet,
            augmentBaseUrl: upstream.augmentBaseUrl || "",
            augmentTokenSet,
            extraHeaders: upstream.extraHeaders || {},
            extraArgs: upstream.extraArgs || {},
          },
        });
      };

      panel.webview.onDidReceiveMessage(async (msg) => {
        if (!msg || typeof msg !== "object") return;

        if (msg.type === "byok.getConfig") return await postConfig();

        if (msg.type === "byok.saveConfig") {
          try {
            const defaults = getDefaultUpstreamState();
            const cfg = msg.config && typeof msg.config === "object" ? msg.config : {};
            const baseUrlRaw = typeof cfg.baseUrl === "string" ? cfg.baseUrl.trim() : "";
            const baseUrl = normalizeOpenAiV1BaseUrl(baseUrlRaw);
            if (!baseUrl) throw new Error("BYOK API 地址无效：必须填写有效的 http(s) URL（建议填到 /v1；未包含 /v1 时会自动补全）");
            const model = typeof cfg.model === "string" ? cfg.model.trim() : "";
            const temperature = typeof cfg.temperature === "number" ? cfg.temperature : 0.2;
            const maxTokens = typeof cfg.maxTokens === "number" && Number.isFinite(cfg.maxTokens) ? cfg.maxTokens : undefined;
            const systemPromptBaseRaw = typeof cfg.systemPromptBase === "string" ? cfg.systemPromptBase : "";
            const systemPromptBase = systemPromptBaseRaw.trim() ? systemPromptBaseRaw : defaults.systemPromptBase;
            const apiKey = typeof cfg.apiKey === "string" ? cfg.apiKey : undefined;
            const clearApiKey = Boolean(cfg.clearApiKey);
            const augmentBaseUrl = typeof cfg.augmentBaseUrl === "string" ? cfg.augmentBaseUrl.trim() : "";
            const augmentToken = typeof cfg.augmentToken === "string" ? cfg.augmentToken : undefined;
            const clearAugmentToken = Boolean(cfg.clearAugmentToken);
            const extraHeaders = cfg.extraHeaders && typeof cfg.extraHeaders === "object" ? cfg.extraHeaders : {};
            const extraArgs = cfg.extraArgs && typeof cfg.extraArgs === "object" ? cfg.extraArgs : {};

            // Debug logging for thinking mode verification
            debugFileLog("CONFIG SAVE from panel", {
              extraHeaders,
              extraArgs,
              hasThinkingHeader: !!extraHeaders["anthropic-beta"],
              hasThinkingArg: !!extraArgs.thinking,
            });

            await context.globalState.update(AUGMENT_BYOK.stateStorageKey, { baseUrl, model, temperature, maxTokens, systemPromptBase, augmentBaseUrl, extraHeaders, extraArgs });
            if (clearApiKey) await context.secrets.delete(AUGMENT_BYOK.apiKeySecretKey);
            else if (typeof apiKey === "string" && apiKey.trim()) await context.secrets.store(AUGMENT_BYOK.apiKeySecretKey, apiKey.trim());
            if (clearAugmentToken) await context.secrets.delete(AUGMENT_BYOK.augmentTokenSecretKey);
            else if (typeof augmentToken === "string" && augmentToken.trim()) await context.secrets.store(AUGMENT_BYOK.augmentTokenSecretKey, augmentToken.trim());

            const upstream = globalThis[AUGMENT_BYOK.upstreamGlobalKey] || defaults;
            globalThis[AUGMENT_BYOK.upstreamGlobalKey] = upstream;
            upstream.baseUrl = baseUrl;
            upstream.model = model;
            upstream.temperature = temperature;
            upstream.maxTokens = maxTokens;
            upstream.systemPromptBase = systemPromptBase;
            if (clearApiKey) upstream.apiKey = "";
            else if (typeof apiKey === "string" && apiKey.trim()) upstream.apiKey = apiKey.trim();
            upstream.augmentBaseUrl = augmentBaseUrl;
            if (clearAugmentToken) upstream.augmentToken = "";
            else if (typeof augmentToken === "string" && augmentToken.trim()) upstream.augmentToken = augmentToken.trim();
            upstream.extraHeaders = extraHeaders;
            upstream.extraArgs = extraArgs;

            panel.webview.postMessage({ type: "byok.saved", ok: true });
            await postConfig();
          } catch (e) {
            panel.webview.postMessage({ type: "byok.saved", ok: false, error: String(e && e.message ? e.message : e) });
            await postConfig();
          }
        }
      });

      await postConfig();
    }),
  );
}

function install({ vscode, ConfigListener, getActivate, setActivate }) {
  patchConfigListener(ConfigListener);
  if (typeof getActivate !== "function" || typeof setActivate !== "function") return;
  if (globalThis[AUGMENT_BYOK.patchedGlobalKey]) return;

  const originalActivate = getActivate();
  if (typeof originalActivate !== "function") return;
  globalThis[AUGMENT_BYOK.patchedGlobalKey] = true;

  setActivate(async (context) => {
    const patchedContext = withStorageUriFallback(context);
    try {
      await ensureInitialized({ vscode, context: patchedContext });
      registerByokPanelCommandOnce({ vscode, context: patchedContext });
    } catch (e) {
      try {
        vscode.window.showErrorMessage(`Augment BYOK 初始化失败: ${String(e && e.message ? e.message : e)}`);
      } catch {
        // ignore
      }
    }
    return await originalActivate(patchedContext);
  });
}

module.exports = { install };

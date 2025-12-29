# Augment-byok

让官方 Augment VS Code 扩展在使用你自己的 LLM Key / Base URL（BYOK：Bring Your Own Key），同时尽量保留 Augment 原生能力（工具调用、索引/面板初始化等）。

> 适用场景
> - 官方 ACE 后端不支持 `augment.advanced.chat.override.*`（扩展把字段发出去了，但后端不代调）
> - 你希望 Chat/Completion 等请求走自定义 OpenAI-compatible 上游
> - 你不想引入“VIP/授权/autoAuth 绕过”等灰色逻辑，也不想使用外部服务

---

## 特性

- **内置本地适配器（127.0.0.1 随机端口）**：扩展激活前自动启动，无需你单独起服务
- **不写 `settings.json`**：用内存 overlay 覆盖 Augment 的配置读取逻辑
- **BYOK 面板**：通过面板配置 Base URL / Model / Temperature / Max Tokens / System Prompt
- **API Key 安全存储**：保存到 VS Code `secrets`（不回显）
- **保留工具调用链路（核心）**：将上游 OpenAI `tool_calls` 转回 Augment 期望的 `nodes(type=5)`，触发扩展执行内置工具，再把 `tool_result` 接回继续生成
- **常用端点兜底**：对扩展初始化会请求的一批端点提供最小返回结构，避免 webview 空白或启动时报错

---

## 工作原理（简述）

Augment 的 chat webview 初始化不仅会调用 `POST /chat-stream`，还会在同一个 `chat.url` 下调用很多其它端点（例如远程工具列表等）。

Augment-byok 的做法是：

1. 扩展激活前启动一个本地 HTTP 适配器（随机端口）。
2. 在扩展内用 overlay 覆盖 `chat.url` / `completionURL` / `nextEditURL` 等，使它们都指向本地适配器。
3. 本地适配器把核心请求（例如 `/chat-stream`）转发到你配置的 OpenAI-compatible 上游，并把流式响应转换回 Augment 期望的 NDJSON schema。
4. 当模型触发工具调用时：
   - 上游返回 `tool_calls`
   - 适配器把它转换为 Augment 的 `nodes: [{ type: 5, tool_use: ... }]` 并以 `stop_reason=3` 结束本轮
   - 扩展收到后执行工具，再携带 `tool_result_node` 发起下一次 `/chat-stream`
   - 适配器把 tool result 转成上游可理解的消息，再继续生成，直到 `stop_reason=1`

---

## 安装与构建

### 方式 A：安装 VSIX

如果你已经有打包好的 `.vsix`：

- VS Code → Extensions → `...` → **Install from VSIX...**

### 方式 B：从源码构建（如果仓库提供脚本）

仓库中如果有构建脚本（例如 `pnpm build` / `vsce package`），按仓库现有约束执行。

> 注意：如果 `package.json` 固定了 `engines.pnpm`（例如必须 `pnpm@9`），请使用对应版本，否则会报 `ERR_PNPM_UNSUPPORTED_ENGINE`。

---

## 使用（最短路径）

1. VS Code 打开命令面板：`Ctrl+Shift+P`
2. 运行：`BYOK 设置...`
   - 命令 ID：`vscode-augment.showByokPanel`
3. 填写：
   - **Base URL**：例如
     - `https://api.openai.com/v1`
     - `http://localhost:11434/v1`（Ollama OpenAI-compatible）
     - 你的 OpenAI-compatible 代理
   - **Model**：例如 `gpt-4o-mini`（或你的兼容模型名）
   - **API Key**：
     - OpenAI 必填
     - 本地兼容服务如果不需要可留空（留空表示不修改已有 key；点“清除 API Key”才会清掉）
4. 保存后直接正常使用 Augment：
   - Chat / completion 会走本地适配器
   - 当模型发起 tool calls 时，扩展会执行自带工具并回传 tool result

---

## 配置项说明（面板）

- `baseUrl`：上游 OpenAI-compatible API 基地址（以 `/v1` 结尾最稳）
- `model`：上游模型名
- `temperature`：采样温度
- `maxTokens`：最大输出 token
- `systemPromptBase`：基础 system prompt（会合并到请求中）
- `apiKey`：存放在 VS Code secrets（不回显）

---

## 兼容性与限制

- 目前的目标是 **OpenAI-compatible**（含多数聚合/代理、Ollama 的 `/v1` 接口等）。
- 非核心端点有一部分是“兜底不崩”的返回（空/ok/最小结构）。如果你希望 Next Edit、远程 agents、外部数据源等完全可用，需要根据实际报错补齐对应协议。
- 如果上游返回 `502/503`，通常是上游模型/渠道/Key/配额不可用，不是 UI bug。

---

## 代码结构（你最可能关心的文件）

- `Augment-byok/extension/out/byok-server.js`
  - 本地适配器服务端（`http.createServer`）
  - 重点实现：`POST /chat-stream`（含 tool_calls ↔ nodes 的桥接）
  - 其它：`/completion`、`/chat-input-completion`、`/next-edit-stream` 等的兜底
- `Augment-byok/extension/out/extension.js`
  - BYOK bootstrap：启动适配器、注入 overlay、注册命令、避免 OAuth 登录依赖
- `Augment-byok/extension/common-webviews/byok-panel.html`
  - BYOK 配置面板 UI（不通过 settings.json）
- `Augment-byok/extension/package.json`
  - 新增命令与激活事件（`onCommand:vscode-augment.showByokPanel`）

---

## 安全与边界

- 本项目的 BYOK 设计目标是：**用你自己的 Key/代理**，并尽量复用官方扩展能力。
- 不包含也不协助实现任何“VIP/授权/解锁/绕过登录限制”的灰色逻辑。
- API Key 仅存放在 VS Code secrets；本地适配器仅监听 `127.0.0.1`。

---

## 排错

### 1) Chat 面板空白

常见原因：只实现了 `/chat-stream`，但扩展初始化还会请求其它端点。

Augment-byok 已对常见端点做兜底；如果仍空白：
- 打开 VS Code Developer Tools → Console/Network，看缺失的路径
- 在 `byok-server.js` 增补对应端点的最小响应

### 2) 发送消息返回 502/503

这是上游错误（模型不可用 / key 无效 / 路由无渠道 / 配额不足）。
- 换一个可用的 `model`
- 检查 `baseUrl` 是否真的是 OpenAI-compatible（并且包含 `/v1`）
- 确认 `apiKey` 生效

### 3) 能聊天但工具不执行

需要确认：
- 上游是否返回 `tool_calls`
- 适配器是否把 `tool_calls` 转为 Augment 的 `nodes(type=5)` 并以 `stop_reason=3` 结束
- 下一轮请求是否携带 `tool_result_node`

---

## 路线图（可选）

- 增强 tool schema 映射：覆盖更多 OpenAI/Anthropic/Google 差异
- 补齐更多端点的真实协议返回，提升 Next Edit / Agents 等能力的可用性
- UI 本地化与布局优化

---

## 免责声明

本项目不隶属于 Augment 官方。使用第三方模型/代理时请遵守相关服务条款与公司合规要求。

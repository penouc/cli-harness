# Day 03 - LLM Chat Loop / 最小对话循环

上一篇：[Day 02 - Project Scaffold / 项目骨架](./day-02-project-scaffold.md)

## 文章介绍

Day 02 我们把 TypeScript workspace、CLI 入口、context report 和 transcript 占位能力搭好了。那一天的 CLI 还不会调用模型，只会打印一条 scaffold summary。

Day 03 开始进入 coding agent 最核心的数据流：把用户任务组织成 chat messages，交给 model provider，再把 assistant message 接回 harness。

今天不会做工具调用，也不会做多轮 agent loop。原因很简单：在加入 tool registry、file tools、approval、patch editing 之前，先要把最小模型调用边界稳定下来。否则后面的所有能力都会混在 `cli.ts` 里，既难测试，也难替换模型供应商。

## 今天要解决什么

今天要完成四个交付：

1. 定义 `system`、`user`、`assistant` 三类 chat message。
2. 定义 `ModelProvider` 接口，让 harness 不直接绑定某一个模型 API。
3. 实现一个默认 mock provider，保证没有 API key 时 demo 仍然可运行。
4. 实现一个 OpenAI-compatible non-streaming provider，并把真实模型调用保留在 provider 层。

运行方式：

```bash
npm run dev -- "explain what an agent harness is"
npm run dev -- --context-report "explain what an agent harness is"
npm run dev -- --transcript logs/runs/day-03.jsonl "explain what an agent harness is"
```

如果没有配置 `OPENAI_API_KEY`，CLI 会使用本地 mock provider。如果配置了 `OPENAI_API_KEY`，CLI 会调用 OpenAI-compatible `/chat/completions` 接口。

如果你不想从 API key、base URL、模型名这些配置开始折腾，也可以直接看 [opencode Go 套餐](https://opencode.ai/go?ref=RRWCDRNFVQ)。这篇文章仍然会从 harness 的角度解释 provider 层怎么接入模型。

## 它在 Cursor/Codex 里对应哪一层

今天实现的是 **model adapter** 和最小 **conversation state**。

在 Cursor、Codex、Claude Code 这类产品里，模型调用通常不会直接散落在 UI 或 CLI 代码里。中间会有一层 harness 负责把这些输入拼成模型可理解的结构：

- system prompt
- user request
- conversation history
- tool definitions
- selected context
- safety/rules guidance

Day 03 只放入最小集合：

```text
User
  -> CLI surface
    -> system message
    -> user message
    -> model provider
    -> assistant message
    -> context report / transcript
```

工具定义今天仍然只进入 context report，不会被模型调用。真正的 tool registry 从 Day 04 开始。

## 设计思路

### 1. Message 是 harness 的基本货币

共享包里新增了最小 message 类型：

```ts
export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};
```

这个结构很朴素，但它是后续能力的入口。工具结果、文件摘要、规则、历史压缩，最后都会变成某种模型上下文。今天先把对话消息这条线跑通。

### 2. Provider 接口放在 app runtime 内

`apps/mini-harness/src/model/provider.ts` 定义了 provider 接口：

```ts
export type ModelProvider = {
  name: string;
  chat(messages: ChatMessage[]): Promise<ChatMessage>;
};
```

CLI 不关心底层是 mock、OpenAI、兼容 API，还是未来的本地模型。它只知道：给 provider 一组 messages，拿回一个 assistant message。

这种抽象有两个直接好处：

- Day 03 的 demo 可以在没有网络和 API key 的环境里稳定运行。
- 后面替换模型供应商时，不需要改 CLI、context report 或 transcript 的数据结构。

### 3. 默认使用 mock provider

真实 LLM 调用会引入三个变量：API key、网络和供应商返回格式。对一个教学 harness 来说，如果第一条 demo 命令就要求外部服务可用，读者很容易卡在环境问题上。

所以今天的默认行为是：

```text
没有 OPENAI_API_KEY -> mock provider
有 OPENAI_API_KEY   -> OpenAI-compatible provider
```

mock provider 不假装自己是智能模型。它只返回确定性文本，证明 chat loop 的数据流已经接上：

```text
[mini-harness] Model provider: mock
[mini-harness] Mock model response:
```

### 4. 真实模型调用用环境变量配置

真实模型调用走 OpenAI-compatible chat completions 形态，所以 harness 里只需要维护一个 provider 抽象。具体接 OpenAI、兼容 API，还是未来的本地模型，都不应该影响 CLI、context report 和 transcript 的结构。

示例通过三个环境变量配置：

```bash
OPENAI_API_KEY=...
OPENAI_BASE_URL=https://api.openai.com/v1
MINI_HARNESS_MODEL=your-model-name
```

其中只有 `OPENAI_API_KEY` 是必需的。`OPENAI_BASE_URL` 和 `MINI_HARNESS_MODEL` 都可以有默认值。

这里的重点不是某一家模型 API，而是 provider 边界：harness 只依赖“给我 messages，返回 assistant message”这个契约。想跳过底层配置、直接体验 coding agent 工具的话，可以看 [opencode Go 套餐](https://opencode.ai/go?ref=RRWCDRNFVQ)。

provider 使用 non-streaming `/chat/completions`。Day 03 暂时不做 streaming，因为 streaming 会改变终端输出、错误处理和 transcript 记录方式。先把一次请求、一次响应的边界稳定下来，Day 07 之后再讨论更细的执行日志。

## 实现步骤

### 1. 在 shared 包里定义 ChatMessage

文件：[packages/shared/src/types.ts](../packages/shared/src/types.ts)

```ts
export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};
```

这让 app runtime 和后续 shared helpers 可以复用同一个 message 类型。

### 2. 新增 model provider

文件：[apps/mini-harness/src/model/provider.ts](../apps/mini-harness/src/model/provider.ts)

核心接口：

```ts
export type ModelProvider = {
  name: string;
  chat(messages: ChatMessage[]): Promise<ChatMessage>;
};
```

`createModelProviderFromEnv()` 会检查环境变量：

- 有 `OPENAI_API_KEY`：返回 OpenAI-compatible provider。
- 没有 `OPENAI_API_KEY`：返回 mock provider。

真实 provider 会发送：

```json
{
  "model": "your-model-name",
  "messages": [...],
  "temperature": 0.2
}
```

并把返回的 `choices[0].message.content` 转成 harness 内部的 assistant message。

### 3. 更新 run summary 为 chat run

文件：[apps/mini-harness/src/agent/run.ts](../apps/mini-harness/src/agent/run.ts)

Day 02 的 `createRunSummary` 只返回固定 scaffold message。Day 03 里，它开始构造真实 conversation：

```ts
const messages: ChatMessage[] = [
  {
    role: "system",
    content: systemPrompt,
  },
  {
    role: "user",
    content: input.task,
  },
];

const assistantMessage = await input.provider.chat(messages);
const conversation = [...messages, assistantMessage];
```

返回结果里新增：

- `provider`
- `messages`
- assistant `message`
- 包含完整 conversation 的 context part

这也让 `--context-report` 开始展示完整对话，而不只是用户输入。

### 4. 更新 CLI 输出

文件：[apps/mini-harness/src/cli.ts](../apps/mini-harness/src/cli.ts)

CLI 现在会创建 provider，并打印 provider 名称：

```text
[mini-harness] Task: explain what an agent harness is
[mini-harness] Model provider: mock
[mini-harness] Mock model response:
```

如果打开 `--transcript`，写入的 JSONL 记录里也会包含 provider、messages、context parts 和 summary output。

## Demo

详见：[Day 03 demo](../demos/day-03/README.md)

默认 mock provider：

```bash
npm run dev -- "explain what an agent harness is"
```

输出摘要：

```text
[mini-harness] Task: explain what an agent harness is
[mini-harness] Model provider: mock
[mini-harness] Mock model response:

I received the user task: explain what an agent harness is
```

context report：

```bash
npm run dev -- --context-report "explain what an agent harness is"
```

输出会包含：

```text
Context Explorer

System prompt          ~...
Tool definitions       ~...
Conversation           ~...
Total                  ~...
```

真实模型调用：

```bash
OPENAI_API_KEY=... npm run dev -- "explain what an agent harness is"
```

## 当前系统能力变化

Day 03 之后，CLI 从静态 scaffold 输出升级为最小 chat loop：

- 能构造 system/user messages。
- 能通过 provider 得到 assistant message。
- 能在没有 API key 时离线运行。
- 能在有 `OPENAI_API_KEY` 时调用 OpenAI-compatible provider。
- context report 和 transcript 记录的是完整 conversation，而不是单条任务文本。

还没有实现的能力：

- streaming output
- tool call
- multi-step agent loop
- retry/backoff
- token budget trimming
- structured error transcript

## 遇到的问题

### 1. 真实模型和可复现 demo 的冲突

文章代码需要读者一拉下来就能跑，但真实 LLM 调用依赖外部服务。这里的取舍是默认 mock，显式配置 key 后才走真实 provider。

这不是最终产品形态，但很适合教学项目。每一天的代码增量都应该能独立验证。

### 2. Provider 抽象不要过早复杂

今天的 `ModelProvider` 只有一个 `chat()` 方法，没有把 streaming、tool choice、JSON mode、response metadata 都塞进去。原因是这些能力现在还用不上。

接口要给后面留空间，但不能提前替未来的复杂性付费。

### 3. Transcript 还不是执行日志

今天的 transcript 仍然是一行 summary JSONL，不是 Day 07 计划里的完整 event log。它现在只证明：chat run 的关键结构已经能落盘。

## 明天做什么

Day 04 会实现 Tool Registry。

到那时，模型上下文里不只会有 system/user/assistant messages，还会开始出现工具定义。harness 要回答两个问题：

- 什么工具可用？
- 当模型要求调用某个工具时，runtime 如何找到对应 handler 并执行？

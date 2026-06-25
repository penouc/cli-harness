# Architecture

Mini Coding Agent Harness 的第一阶段只做 CLI，不做 IDE、MCP、浏览器控制或 subagents。

```text
User Task
  -> CLI
  -> Context Builder
  -> Agent Loop
  -> Tool Runtime
  -> Safety Layer
  -> Transcript + Debug Output
  -> Final Output
```

## Core Modules

- CLI: 接收任务、参数和输出格式。
- Context Builder: 组装 system prompt、用户请求、工具定义、项目规则和文件片段。
- Agent Loop: 执行 observe -> decide -> act -> observe -> final 循环。
- Tool Runtime: 管理工具 schema、dispatch 和 tool result。
- Safety Layer: 管理 approval、workspace sandbox 和 command policy。
- Transcript: 保存每轮 messages、tool calls、tool results、latency 和错误。
- Debug Output: 输出关键执行状态，帮助开发者定位 agent run 中的问题。

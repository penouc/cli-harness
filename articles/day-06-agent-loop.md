# Day 06 - Agent Loop / Agent 执行循环

## 今天要解决什么

实现 `observe -> decide -> act -> observe -> final` 循环。

## 它在 Cursor/Codex 里对应哪一层

对应 coding agent 的核心执行状态机。

## 设计思路

每一步都记录输入、模型决策、工具结果和终止原因。

## 实现步骤

1. 定义 max steps。
2. 执行模型请求。
3. 分发 tool call。
4. 将 tool result 回写到 messages。
5. 到 final response 时结束。

## Demo

See [Day 06 demo](../demos/day-06/README.md).

## 当前系统能力变化

Agent 不再是单轮 chat，而是可以多步完成任务。

## 遇到的问题

需要处理无限循环、工具失败和超时。

## 明天做什么

保存 transcript。


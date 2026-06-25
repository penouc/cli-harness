# Day 07 - Transcript Logging / 执行日志

## 今天要解决什么

把每轮 agent 执行记录成 JSONL transcript。

## 它在 Cursor/Codex 里对应哪一层

对应可观察性、debug 和 replay 能力。

## 设计思路

每个事件单独写一行，后续可以流式查看、过滤和回放。

## 实现步骤

1. 定义 transcript event 类型。
2. 写入 run started。
3. 写入 model request/response。
4. 写入 tool call/result。
5. 写入 final/error。

## Demo

See [Day 07 demo](../demos/day-07/README.md).

## 当前系统能力变化

每次运行都可以留下可审计记录。

## 遇到的问题

需要避免把 secret 或超大输出直接写入日志。

## 明天做什么

实现 Context Builder。


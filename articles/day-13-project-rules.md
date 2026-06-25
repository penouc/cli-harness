# Day 13 - Project Rules / 项目规则

## 今天要解决什么

读取 `AGENTS.md` 风格项目规则，并纳入 context report。

## 它在 Cursor/Codex 里对应哪一层

对应 durable project guidance。

## 设计思路

第一版只支持 repo root 级规则，后续再加入目录级优先级。

## 实现步骤

1. 查找 `AGENTS.md`。
2. 读取规则内容。
3. 加入 Context Builder。
4. 在 Context Explorer 中显示 rules token。

## Demo

See [Day 13 demo](../demos/day-13/README.md).

## 当前系统能力变化

Agent 可以带着项目约定工作。

## 遇到的问题

规则过长会长期占用上下文。

## 明天做什么

做 Mini Harness 架构复盘。


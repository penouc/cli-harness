# Day 02 - Project Scaffold / 项目骨架

## 今天要解决什么

建立 TypeScript + npm workspaces 项目骨架，并让 `mini-harness` CLI 能运行。

## 它在 Cursor/Codex 里对应哪一层

对应产品的最外层入口：CLI surface。

## 设计思路

先让 CLI 能接收任务、打印 scaffold 状态、输出 context report，并预留 transcript 参数。

## 实现步骤

1. 创建根 workspace。
2. 创建 `apps/mini-harness`。
3. 创建 `packages/shared`。
4. 添加 `dev`、`build`、`typecheck` 脚本。

## Demo

See [Day 02 demo](../demos/day-02/README.md).

## 当前系统能力变化

可以运行 `npm run dev -- "hello"`。

## 遇到的问题

真实 LLM、工具调用和文件工具还未接入。

## 明天做什么

实现最小 LLM Chat Loop。


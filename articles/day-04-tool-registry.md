# Day 04 - Tool Registry / 工具注册表

## 今天要解决什么

实现 tool schema、tool dispatcher 和第一个 mock tool。

## 它在 Cursor/Codex 里对应哪一层

对应模型可用工具定义和工具运行时。

## 设计思路

工具需要同时服务两方：给模型看的 schema，给 runtime 用的 handler。

## 实现步骤

1. 定义 tool definition。
2. 实现 register/list/dispatch。
3. 加入 `echo` mock tool。
4. 将工具定义加入上下文。

## Demo

See [Day 04 demo](../demos/day-04/README.md).

## 当前系统能力变化

模型可以看到工具定义，runtime 可以分发工具调用。

## 遇到的问题

需要处理未知工具、参数错误和 handler 失败。

## 明天做什么

实现本地文件工具。


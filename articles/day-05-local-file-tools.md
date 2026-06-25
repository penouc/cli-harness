# Day 05 - Local File Tools / 本地文件工具

## 今天要解决什么

实现 `list_files`、`read_file` 和 `search_text`。

## 它在 Cursor/Codex 里对应哪一层

对应 agent 理解本地代码库的基础工具。

## 设计思路

文件读取使用 Node API，文本搜索优先调用 `rg`，并限制 workspace 范围。

## 实现步骤

1. 扫描文件列表。
2. 读取指定文件。
3. 搜索文本内容。
4. 标准化工具返回结构。

## Demo

See [Day 05 demo](../demos/day-05/README.md).

## 当前系统能力变化

Agent 可以开始观察真实代码库。

## 遇到的问题

需要过滤 `node_modules`、`dist` 和大文件。

## 明天做什么

实现 Agent Loop。


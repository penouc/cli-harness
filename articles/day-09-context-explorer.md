# Day 09 - Context Explorer / 上下文报告

## 今天要解决什么

实现命令行版 context report，按类别统计 token 占用。

## 它在 Cursor/Codex 里对应哪一层

对应用户截图中的 Context Explorer。

## 设计思路

先使用近似 token 估算，让报告能用于调试；后续可替换为模型 tokenizer。

## 实现步骤

1. 统计每个 context part。
2. 按类别输出 token。
3. 输出总量。
4. 支持 `--context-report`。

## Demo

See [Day 09 demo](../demos/day-09/README.md).

## 当前系统能力变化

可以看见 agent 当前“脑子里装了什么”。

## 遇到的问题

近似 token 不等于真实模型 tokenizer。

## 明天做什么

加入 Git 和 Diff 工具。


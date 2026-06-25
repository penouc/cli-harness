# Day 03 - LLM Chat Loop / 最小对话循环

## 今天要解决什么

接入模型消息结构，支持 system、user、assistant messages。

## 它在 Cursor/Codex 里对应哪一层

对应模型调用层和最小 conversation state。

## 设计思路

先抽象 provider 接口，再接入真实 API，避免业务代码绑定单一模型供应商。

## 实现步骤

1. 定义 message 类型。
2. 定义 model provider 接口。
3. 实现 non-streaming 调用。
4. 预留 streaming 输出。

## Demo

See [Day 03 demo](../demos/day-03/README.md).

## 当前系统能力变化

CLI 将从静态 scaffold 输出升级为真实模型回复。

## 遇到的问题

需要处理 API key、模型选择和错误输出。

## 明天做什么

实现 Tool Registry。


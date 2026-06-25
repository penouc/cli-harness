# Day 11 - Patch Editing / Patch 编辑

## 今天要解决什么

实现 `apply_patch`，让 agent 可以用 unified diff 修改文件。

## 它在 Cursor/Codex 里对应哪一层

对应代码编辑执行层。

## 设计思路

优先 patch，不让模型直接整文件覆盖，降低误删风险。

## 实现步骤

1. 定义 patch tool schema。
2. 校验目标路径。
3. 应用 unified diff。
4. 返回成功或可恢复错误。

## Demo

See [Day 11 demo](../demos/day-11/README.md).

## 当前系统能力变化

Agent 可以从理解代码进入实际修改代码。

## 遇到的问题

Patch 冲突要能反馈给模型继续修正。

## 明天做什么

加入审批和沙箱。


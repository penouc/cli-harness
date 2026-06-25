# Day 10 - Git and Diff Tools / Git 与 Diff 工具

## 今天要解决什么

实现 `git_status` 和 `git_diff`。

## 它在 Cursor/Codex 里对应哪一层

对应 agent 理解当前工作区变更的工具。

## 设计思路

Git 工具先只读，不做 checkout、reset 或 commit。

## 实现步骤

1. 调用 `git status --short`。
2. 调用 `git diff`。
3. 限制输出长度。
4. 标准化错误返回。

## Demo

See [Day 10 demo](../demos/day-10/README.md).

## 当前系统能力变化

Agent 可以把当前 diff 纳入判断。

## 遇到的问题

非 git 仓库需要返回可理解的错误。

## 明天做什么

实现 Patch Editing。


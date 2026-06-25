# Day 12 - Approval and Sandbox / 审批与沙箱

## 今天要解决什么

为写文件和命令执行加入 approval gate，并限制 workspace 范围。

## 它在 Cursor/Codex 里对应哪一层

对应安全边界和用户控制权。

## 设计思路

工具执行前先判断动作风险，危险动作必须显式确认。

## 实现步骤

1. 定义 sandbox root。
2. 校验读写路径。
3. 定义 approval request。
4. 在 patch 和 command 前接入 approval。

## Demo

See [Day 12 demo](../demos/day-12/README.md).

## 当前系统能力变化

Agent 有能力修改代码，但不能绕过用户授权和 workspace 边界。

## 遇到的问题

需要平衡安全和开发效率。

## 明天做什么

读取 Project Rules。


# Day 14 - Mini Harness Recap / 架构复盘

## 今天要解决什么

串联 14 天成果，验证 CLI harness 能读取文件、搜索代码、生成 context report、查看 git diff，并通过 approval 应用 patch。

## 它在 Cursor/Codex 里对应哪一层

对应第一阶段完整 CLI coding agent harness。

## 设计思路

从运行链路、架构边界、失败模式和下一阶段扩展四个角度复盘。

## 实现步骤

1. 跑完整 demo。
2. 更新架构图。
3. 总结当前能力边界。
4. 规划 Skills、MCP、IDE 和 Subagents。

## Demo

See [Day 14 demo](../demos/day-14/README.md).

## 当前系统能力变化

第一阶段 CLI harness 完成。

## 遇到的问题

CLI 已经能说明核心机制，但产品体验仍需要 IDE 和可视化支撑。

## 明天做什么

进入第二阶段设计：Skills、MCP、IDE extension 和 evaluation。


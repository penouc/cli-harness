# Mini Coding Agent Harness

这是一个 14 天系列的文章和代码仓库，用 TypeScript/Node 从零实现一个 CLI 版 mini coding agent harness。目标不是复刻 Cursor、Codex 或 Claude Code 的完整产品，而是拆开它们共同的工程骨架：context、tools、agent loop、patch、approval、rules 和 context report。

## Daily Contract

每天交付四件事：

- 一篇文章草稿：`articles/day-xx-*.md`
- 一个可运行代码增量：`apps/mini-harness`
- 一个 demo 记录：`demos/day-xx/README.md`
- 一个 progress log：`logs/daily/day-xx.md`

## Quick Start

```bash
npm install
npm run typecheck
npm run dev -- "hello"
npm run dev -- --context-report "read package structure"
npm run dev -- --transcript logs/runs/day-02.jsonl "hello"
```

## Repository Map

```text
articles/             14 天文章正文
apps/mini-harness/    主示例 CLI harness
packages/shared/      跨文章复用类型和工具
docs/                 架构、术语、路线图和设计决策
demos/                每天的命令、输出和截图记录
logs/daily/           每天的进度记录
```

## Series Index

See [articles/README.md](articles/README.md).


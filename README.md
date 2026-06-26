# Mini Coding Agent Harness

This repository hosts a 14-day writing and coding series about building a mini CLI coding agent harness from scratch with TypeScript and Node.js.

The goal is not to clone Cursor, Codex, or Claude Code. The goal is to unpack the shared engineering skeleton behind these products: context, tools, agent loops, patching, approvals, rules, and execution logs.

## Daily Contract

Each day should produce four deliverables:

- An article draft: `articles/day-xx-*.md`
- A runnable code increment: `apps/mini-harness`
- A demo note: `demos/day-xx/README.md`
- A progress log: `logs/daily/day-xx.md`

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
articles/             14-day article drafts
apps/mini-harness/    Main CLI harness example
packages/shared/      Shared types and utilities
docs/                 Architecture, glossary, roadmap, and decisions
demos/                Daily commands, outputs, and demo notes
logs/daily/           Daily progress logs
```

## Series Index

See [articles/README.md](articles/README.md).

## Plan

See [docs/implementation-plan.md](docs/implementation-plan.md).

## Chinese

中文说明见 [docs/README.zh-CN.md](docs/README.zh-CN.md)。

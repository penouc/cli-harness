# Implementation Plan: Mini Coding Agent Harness 14-Day Series

## Summary

This repository is a monorepo for a 14-day writing and coding series about building a mini CLI coding agent harness with TypeScript and Node.js.

The first phase uses Markdown articles instead of a generated website. Articles are written primarily in Chinese, with English technical titles and terminology where useful. The target reader is an experienced engineer who wants to understand how Cursor, Codex, Claude Code, and similar products are built at the harness layer.

Each day should produce:

- An article draft
- A runnable code increment
- A demo note
- A daily progress log

The 14-day goal is a working CLI mini harness that covers context, tools, agent loops, patching, approvals, rules, and execution observability.

## Repository Structure

```text
sigma/
  README.md
  package.json
  tsconfig.json
  .gitignore
  .editorconfig

  articles/
    README.md
    day-01-what-is-agent-harness.md
    day-02-project-scaffold.md
    ...
    day-14-mini-harness-recap.md

  apps/
    mini-harness/
      package.json
      src/
        index.ts
        cli.ts
        agent/
        tools/
        context/
        safety/
        transcript/
      examples/
      README.md

  packages/
    shared/
      package.json
      src/
        types.ts
        logger.ts
        token.ts

  docs/
    architecture.md
    glossary.md
    roadmap.md
    decisions.md
    context-report-format.md
    implementation-plan.md

  demos/
    day-01/
      README.md
    ...
    day-14/
      README.md

  logs/
    daily/
      day-01.md
      ...
      day-14.md
```

## Initial Interfaces

Root package scripts:

```json
{
  "scripts": {
    "dev": "npm run dev -w apps/mini-harness",
    "build": "npm run build --workspaces",
    "typecheck": "npm run typecheck --workspaces",
    "lint": "npm run lint --workspaces"
  }
}
```

CLI command shape:

```bash
npm run dev -- "explain this repo"
npm run dev -- --context-report "read package structure"
npm run dev -- --transcript logs/runs/day-xx.jsonl "task"
```

Main planned modules:

- `apps/mini-harness/src/index.ts`: program entrypoint
- `apps/mini-harness/src/cli.ts`: CLI argument parsing and interaction entrypoint
- `apps/mini-harness/src/agent/`: agent loop, message state, run lifecycle
- `apps/mini-harness/src/tools/`: tool registry and concrete tools
- `apps/mini-harness/src/context/`: context builder, token report, context debugging
- `apps/mini-harness/src/safety/`: approval, sandbox, command policy
- `apps/mini-harness/src/transcript/`: JSONL transcript writer and reader

## 14-Day Content Plan

1. `Day 01 - What is an Agent Harness / 什么是 Agent Harness`
   Deliverable: architecture framing, model/agent/harness boundary, generated layered architecture image.

2. `Day 02 - Project Scaffold / 项目骨架`
   Deliverable: TypeScript + npm workspaces + mini CLI, runnable with `hello`.

3. `Day 03 - LLM Chat Loop / 最小对话循环`
   Deliverable: model message structure with system/user/assistant messages and basic output.

4. `Day 04 - Tool Registry / 工具注册表`
   Deliverable: tool schema, dispatcher, and a mock tool.

5. `Day 05 - Local File Tools / 本地文件工具`
   Deliverable: `list_files`, `read_file`, and `search_text`.

6. `Day 06 - Agent Loop / Agent 执行循环`
   Deliverable: `observe -> decide -> act -> observe -> final` loop with max steps, timeouts, and tool errors.

7. `Day 07 - Transcript Logging / 执行日志`
   Deliverable: JSONL transcript with messages, tool calls, tool results, latency, and errors.

8. `Day 08 - Context Builder / 上下文构建器`
   Deliverable: system prompt, user request, history summary, tool definitions, and selected project snippets.

9. `Day 09 - Context Debugging / 上下文调试`
   Deliverable: command-line report for context sources and estimated token usage.

10. `Day 10 - Git and Diff Tools / Git 与 Diff 工具`
    Deliverable: `git_status` and `git_diff`.

11. `Day 11 - Patch Editing / Patch 编辑`
    Deliverable: `apply_patch` with unified diff support and recoverable errors.

12. `Day 12 - Approval and Sandbox / 审批与沙箱`
    Deliverable: approval gate for writes and commands; workspace path restriction.

13. `Day 13 - Project Rules / 项目规则`
    Deliverable: read `AGENTS.md`-style rules and include root-level project guidance.

14. `Day 14 - Mini Harness Recap / 架构复盘`
    Deliverable: full CLI demo, architecture recap, boundaries, and next-phase plan for Skills, MCP, IDE, and subagents.

## Article Template

```md
# Day XX - English Title / 中文标题

## 文章介绍

## 今天要解决什么

## 它在 Cursor/Codex 里对应哪一层

## 设计思路

## 实现步骤

## Demo

## 当前系统能力变化

## 遇到的问题

## 明天做什么
```

## Test Plan

- Run `npm install` after initialization.
- Run `npm run typecheck`.
- Run `npm run dev -- "hello"`.
- For each day, record the runnable command and output summary in `demos/day-xx/README.md`.
- Keep article, code, demo, and daily log linked for each day.
- Day 14 acceptance: the agent can read files, search code, inspect git diff, and apply a patch after approval while recording key execution steps.

## Assumptions and Defaults

- Use TypeScript/Node.
- Use npm workspaces.
- Keep phase 1 as a Markdown repository, not an Astro or MDX site.
- First phase is 14 days.
- Root README defaults to English; Chinese README lives under `docs/README.zh-CN.md`.
- The first runnable product is a CLI harness.
- Skills, MCP, browser control, VS Code extension, and subagents are phase 2 topics.


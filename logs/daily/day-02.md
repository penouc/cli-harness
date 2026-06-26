# Day 02 Log

## Deliverables

- Article: `articles/day-02-project-scaffold.md`
- Demo: `demos/day-02/README.md`
- CLI app: `apps/mini-harness`
- Shared package: `packages/shared`

## Implemented

- Documented the TypeScript + npm workspaces scaffold.
- Documented the `mini-harness` CLI entrypoint and argument shape.
- Documented the placeholder run summary, context report, transcript output, and mock tool registry boundary.
- Updated the Day 02 demo with concrete commands and output summaries.

## Verification

```bash
npm run typecheck
npm run dev -- "hello"
npm run dev -- --context-report "read package structure"
npm run dev -- --transcript logs/runs/day-02.jsonl "hello"
```

## Status

Complete for Day 02. The CLI is still a scaffold and does not call a real model yet.

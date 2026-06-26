# Day 02 Demo

Day 02 verifies that the TypeScript workspace and `mini-harness` CLI scaffold run from the root package scripts.

## Commands

```bash
npm run typecheck
npm run dev -- "hello"
npm run dev -- --context-report "read package structure"
npm run dev -- --transcript logs/runs/day-02.jsonl "hello"
```

## Output Summary

`npm run dev -- "hello"` prints the received task and the scaffold status:

```text
[mini-harness] Task: hello
[mini-harness] Scaffold ready. Future days will replace this summary with the real agent loop.
```

`npm run dev -- --context-report "read package structure"` also prints a context report with estimated token counts for:

- system prompt
- tool definitions
- conversation
- total context

`npm run dev -- --transcript logs/runs/day-02.jsonl "hello"` appends one JSONL record containing the created timestamp, task, and run summary.

## Notes

The CLI does not call a real model on Day 02. It only proves that the workspace, CLI entrypoint, shared package, context report placeholder, tool metadata placeholder, and transcript path are wired correctly.

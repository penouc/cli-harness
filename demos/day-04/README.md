# Day 04 Demo

Day 04 verifies that the tool registry can expose tool schemas and dispatch a mock tool through the CLI.

## Commands

```bash
npm run dev -- --tool echo --tool-input '{"text":"hello"}'
npm run dev -- --context-report --tool echo --tool-input '{"text":"hello"}'
npm run dev -- --transcript logs/runs/day-04.jsonl --tool echo --tool-input '{"text":"hello"}'
```

## Output Summary

The CLI dispatches the `echo` tool and prints a structured tool result:

```text
[mini-harness] Tool result: {"name":"echo","input":{"text":"hello"},"output":{"text":"hello"},"durationMs":0}
```

`--context-report` includes:

- tool definitions
- tool result

Invalid input is rejected before the handler runs:

```bash
npm run dev -- --tool echo --tool-input '{"text":123}'
```

```text
[mini-harness] Error: Invalid input for echo.text: expected string
```

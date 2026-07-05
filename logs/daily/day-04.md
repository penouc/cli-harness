# Day 04 Log

- Article: `articles/day-04-tool-registry.md`
- Demo: `demos/day-04/README.md`
- Status: implemented
- Code:
  - Added shared `ToolCall` and `ToolResult` types.
  - Tightened the minimal JSON schema type used by tool definitions.
  - Added duplicate tool registration checks.
  - Added minimal schema validation before dispatch.
  - Changed dispatch to return structured `ToolResult` values.
  - Added CLI support for `--tool` and `--tool-input`.
  - Added top-level CLI error handling for concise validation failures.
- Verification:
  - `npm run typecheck`
  - `npm run build`
  - `npm run dev -- --tool echo --tool-input '{"text":"hello"}'`
  - `npm run dev -- --context-report --tool echo --tool-input '{"text":"hello"}'`
  - `npm run dev -- --tool echo --tool-input '{"text":123}'`

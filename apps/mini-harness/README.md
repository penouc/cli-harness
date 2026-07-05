# mini-harness

The CLI prototype for the 14-day Mini Coding Agent Harness series.

## Usage

```bash
npm run dev -w apps/mini-harness -- "hello"
npm run dev -w apps/mini-harness -- --context-report "read package structure"
npm run dev -w apps/mini-harness -- --transcript logs/runs/day-03.jsonl "hello"
npm run dev -w apps/mini-harness -- --tool echo --tool-input '{"text":"hello"}'
```

Without `DEEPSEEK_API_KEY` or `OPENAI_API_KEY`, the CLI uses a deterministic mock model provider so the harness can run offline. Set `DEEPSEEK_API_KEY` to use DeepSeek V4 Flash (`deepseek-v4-flash`) through the OpenAI-compatible chat completion endpoint.

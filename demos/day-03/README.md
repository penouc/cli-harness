# Day 03 Demo

Day 03 verifies the smallest useful chat loop: system message, user message, provider call, assistant message, and optional context/transcript output.

## Commands

```bash
npm run dev -- "explain what an agent harness is"
npm run dev -- --context-report "explain what an agent harness is"
npm run dev -- --transcript logs/runs/day-03.jsonl "explain what an agent harness is"
```

## Output Summary

Without `DEEPSEEK_API_KEY` or `OPENAI_API_KEY`, the CLI uses the local mock provider and prints:

```text
[mini-harness] Task: explain what an agent harness is
[mini-harness] Model provider: mock
[mini-harness] Mock model response:
```

With `DEEPSEEK_API_KEY`, it calls the DeepSeek OpenAI-compatible chat completions endpoint with `deepseek-v4-flash` and prints the assistant response.

`--context-report` includes the system prompt, tool definitions, and full conversation. `--transcript` appends one JSONL record containing the provider name, messages, context parts, and summary output.

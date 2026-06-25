import type { ContextPart, ToolDefinition } from "@mini-harness/shared/types";

type RunSummaryInput = {
  task: string;
  tools: ToolDefinition[];
};

type RunSummary = {
  message: string;
  contextParts: ContextPart[];
  tools: ToolDefinition[];
};

export function createRunSummary(input: RunSummaryInput): RunSummary {
  const systemPrompt = [
    "You are Mini Harness, a teaching-oriented coding agent prototype.",
    "For Day 02, only echo the task and expose scaffolded context/tool metadata.",
  ].join("\n");

  return {
    message: "Scaffold ready. Future days will replace this summary with the real agent loop.",
    tools: input.tools,
    contextParts: [
      {
        label: "System prompt",
        kind: "system",
        content: systemPrompt,
      },
      {
        label: "Tool definitions",
        kind: "tools",
        content: JSON.stringify(input.tools, null, 2),
      },
      {
        label: "Conversation",
        kind: "conversation",
        content: input.task,
      },
    ],
  };
}


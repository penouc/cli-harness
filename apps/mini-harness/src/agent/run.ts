import type { ChatMessage, ContextPart, ToolDefinition } from "@mini-harness/shared/types";
import type { ModelProvider } from "../model/provider.js";

type RunSummaryInput = {
  task: string;
  tools: ToolDefinition[];
  provider: ModelProvider;
};

type RunSummary = {
  message: string;
  provider: string;
  messages: ChatMessage[];
  contextParts: ContextPart[];
  tools: ToolDefinition[];
};

export async function createRunSummary(input: RunSummaryInput): Promise<RunSummary> {
  const systemPrompt = [
    "You are Mini Harness, a teaching-oriented coding agent prototype.",
    "For Day 03, answer the user's task directly and briefly.",
    "Do not call tools yet. Tool execution starts in later days.",
  ].join("\n");
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: input.task,
    },
  ];
  const assistantMessage = await input.provider.chat(messages);
  const conversation = [...messages, assistantMessage];

  return {
    message: assistantMessage.content,
    provider: input.provider.name,
    messages: conversation,
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
        content: conversation.map((message) => `${message.role}: ${message.content}`).join("\n\n"),
      },
    ],
  };
}

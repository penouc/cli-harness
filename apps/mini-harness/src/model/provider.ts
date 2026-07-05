import type { ChatMessage } from "@mini-harness/shared/types";

export type ModelProvider = {
  name: string;
  chat(messages: ChatMessage[]): Promise<ChatMessage>;
};

type OpenAiChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

export function createModelProviderFromEnv(): ModelProvider {
  if (process.env.DEEPSEEK_API_KEY) {
    return createOpenAiChatProvider({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseUrl: process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com",
      model: process.env.MINI_HARNESS_MODEL ?? "deepseek-v4-flash",
    });
  }

  if (process.env.OPENAI_API_KEY) {
    return createOpenAiChatProvider({
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
      model: process.env.MINI_HARNESS_MODEL ?? "gpt-4o-mini",
    });
  }

  return createMockModelProvider();
}

export function createMockModelProvider(): ModelProvider {
  return {
    name: "mock",
    async chat(messages) {
      const userMessage = [...messages].reverse().find((message) => message.role === "user");
      const task = userMessage?.content ?? "";

      return {
        role: "assistant",
        content: [
          "Mock model response:",
          "",
          `I received the user task: ${task}`,
          "",
          "The chat loop is wired with system, user, and assistant messages. Set DEEPSEEK_API_KEY to use deepseek-v4-flash.",
        ].join("\n"),
      };
    },
  };
}

export function createOpenAiChatProvider(input: {
  apiKey: string;
  baseUrl: string;
  model: string;
}): ModelProvider {
  return {
    name: `openai-compatible:${input.model}`,
    async chat(messages) {
      const response = await fetch(`${input.baseUrl.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${input.apiKey}`,
        },
        body: JSON.stringify({
          model: input.model,
          messages,
          temperature: 0.2,
        }),
      });

      const body = (await response.json()) as OpenAiChatResponse;

      if (!response.ok) {
        throw new Error(body.error?.message ?? `Model request failed with HTTP ${response.status}`);
      }

      const content = body.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("Model response did not include assistant content.");
      }

      return {
        role: "assistant",
        content,
      };
    },
  };
}

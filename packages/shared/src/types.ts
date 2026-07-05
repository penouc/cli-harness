export type ContextKind = "system" | "tools" | "rules" | "files" | "conversation" | "tool-results";

export type ContextPart = {
  label: string;
  kind: ContextKind;
  content: string;
};

export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type JsonSchema = {
  type: "object" | "array" | "string" | "number" | "boolean" | "null";
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  required?: string[];
};

export type ToolDefinition = {
  name: string;
  description: string;
  inputSchema: JsonSchema;
};

export type ToolCall = {
  name: string;
  input: unknown;
};

export type ToolResult = {
  name: string;
  input: unknown;
  output: unknown;
  durationMs: number;
};

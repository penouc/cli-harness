export type ContextKind = "system" | "tools" | "rules" | "files" | "conversation" | "tool-results";

export type ContextPart = {
  label: string;
  kind: ContextKind;
  content: string;
};

export type JsonSchema = {
  type: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
};

export type ToolDefinition = {
  name: string;
  description: string;
  inputSchema: JsonSchema;
};


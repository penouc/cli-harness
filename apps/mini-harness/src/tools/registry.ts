import type { JsonSchema, ToolDefinition, ToolResult } from "@mini-harness/shared/types";

export type ToolHandler = (input: unknown) => Promise<unknown> | unknown;

export type RegisteredTool = ToolDefinition & {
  handler: ToolHandler;
};

export class ToolRegistry {
  private readonly tools = new Map<string, RegisteredTool>();

  register(tool: RegisteredTool): void {
    if (this.tools.has(tool.name)) {
      throw new Error(`Tool already registered: ${tool.name}`);
    }
    this.tools.set(tool.name, tool);
  }

  list(): ToolDefinition[] {
    return [...this.tools.values()].map(({ handler: _handler, ...definition }) => definition);
  }

  async dispatch(name: string, input: unknown): Promise<ToolResult> {
    const tool = this.tools.get(name);
    if (!tool) {
      throw new Error(`Unknown tool: ${name}`);
    }
    validateInput(tool.inputSchema, input, name);

    const startedAt = performance.now();
    const output = await tool.handler(input);

    return {
      name,
      input,
      output,
      durationMs: Math.round(performance.now() - startedAt),
    };
  }
}

export function createDefaultToolRegistry(): ToolRegistry {
  const registry = new ToolRegistry();

  registry.register({
    name: "echo",
    description: "Return the provided input. Used as the first mock tool before real file tools exist.",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string" },
      },
      required: ["text"],
    },
    handler: (input: unknown) => input,
  });

  return registry;
}

function validateInput(schema: JsonSchema, value: unknown, path: string): void {
  if (schema.type === "object") {
    if (!isRecord(value)) {
      throw new Error(`Invalid input for ${path}: expected object`);
    }

    for (const key of schema.required ?? []) {
      if (!(key in value)) {
        throw new Error(`Invalid input for ${path}: missing required property "${key}"`);
      }
    }

    for (const [key, childSchema] of Object.entries(schema.properties ?? {})) {
      if (key in value) {
        validateInput(childSchema, value[key], `${path}.${key}`);
      }
    }
    return;
  }

  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      throw new Error(`Invalid input for ${path}: expected array`);
    }
    if (schema.items) {
      value.forEach((item, index) => validateInput(schema.items as JsonSchema, item, `${path}[${index}]`));
    }
    return;
  }

  if (schema.type === "null") {
    if (value !== null) {
      throw new Error(`Invalid input for ${path}: expected null`);
    }
    return;
  }

  if (typeof value !== schema.type) {
    throw new Error(`Invalid input for ${path}: expected ${schema.type}`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

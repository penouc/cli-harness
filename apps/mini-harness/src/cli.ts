import { mkdir, appendFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { buildContextReport } from "./context/context-report.js";
import { createDefaultToolRegistry } from "./tools/registry.js";
import { createRunSummary } from "./agent/run.js";
import { createModelProviderFromEnv } from "./model/provider.js";
import { createLogger } from "@mini-harness/shared/logger";
import type { ChatMessage, ContextPart, ToolDefinition, ToolResult } from "@mini-harness/shared/types";

type CliOptions = {
  contextReport: boolean;
  transcriptPath?: string;
  toolName?: string;
  toolInput?: unknown;
  task: string;
};

export async function runCli(argv: string[]): Promise<void> {
  const logger = createLogger("mini-harness");
  const options = parseArgs(argv);

  if (!options.task && !options.toolName) {
    printHelp();
    process.exitCode = 1;
    return;
  }

  const registry = createDefaultToolRegistry();
  let toolResult: ToolResult | undefined;

  if (options.toolName) {
    toolResult = await registry.dispatch(options.toolName, options.toolInput ?? {});
  }

  const task = options.task || `Dispatch tool: ${options.toolName}`;
  const summary = options.task
    ? await createChatSummary({
        task,
        tools: registry.list(),
      })
    : createToolOnlySummary({
        task,
        tools: registry.list(),
        toolResult,
      });

  logger.info(`Task: ${task}`);
  logger.info(`Model provider: ${summary.provider}`);
  logger.info(summary.message);

  if (toolResult) {
    logger.info(`Tool result: ${JSON.stringify(toolResult)}`);
    if (options.task) {
      summary.contextParts.push({
        label: "Tool result",
        kind: "tool-results",
        content: JSON.stringify(toolResult, null, 2),
      });
    }
  }

  if (options.contextReport) {
    console.log("");
    console.log(buildContextReport(summary.contextParts));
  }

  if (options.transcriptPath) {
    await writeTranscript(options.transcriptPath, {
      createdAt: new Date().toISOString(),
      task,
      summary,
      toolResult,
    });
    logger.info(`Transcript written: ${options.transcriptPath}`);
  }
}

type CliRunSummary = {
  message: string;
  provider: string;
  messages: ChatMessage[];
  contextParts: ContextPart[];
  tools: ToolDefinition[];
};

async function createChatSummary(input: {
  task: string;
  tools: ToolDefinition[];
}): Promise<CliRunSummary> {
  const provider = createModelProviderFromEnv();
  return createRunSummary({
    task: input.task,
    tools: input.tools,
    provider,
  });
}

function createToolOnlySummary(input: {
  task: string;
  tools: ToolDefinition[];
  toolResult: ToolResult | undefined;
}): CliRunSummary {
  const contextParts: ContextPart[] = [
    {
      label: "Tool definitions",
      kind: "tools",
      content: JSON.stringify(input.tools, null, 2),
    },
  ];

  if (input.toolResult) {
    contextParts.push({
      label: "Tool result",
      kind: "tool-results",
      content: JSON.stringify(input.toolResult, null, 2),
    });
  }

  return {
    message: "Manual tool dispatch completed.",
    provider: "none",
    messages: [],
    contextParts,
    tools: input.tools,
  };
}

function parseArgs(argv: string[]): CliOptions {
  let contextReport = false;
  let transcriptPath: string | undefined;
  let toolName: string | undefined;
  let toolInput: unknown;
  const taskParts: string[] = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--context-report") {
      contextReport = true;
      continue;
    }
    if (arg === "--transcript") {
      transcriptPath = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--tool") {
      toolName = readOptionValue(argv, index, "--tool");
      index += 1;
      continue;
    }
    if (arg === "--tool-input") {
      const rawValue = readOptionValue(argv, index, "--tool-input");
      toolInput = parseJsonOption(rawValue, "--tool-input");
      index += 1;
      continue;
    }
    taskParts.push(arg);
  }

  return {
    contextReport,
    transcriptPath,
    toolName,
    toolInput,
    task: taskParts.join(" ").trim(),
  };
}

function printHelp(): void {
  console.log(`Mini Coding Agent Harness

Usage:
  npm run dev -- "hello"
  npm run dev -- --context-report "read package structure"
  npm run dev -- --transcript logs/runs/day-03.jsonl "hello"
  npm run dev -- --tool echo --tool-input '{"text":"hello"}' "call the echo tool"

Environment:
  DEEPSEEK_API_KEY      Use DeepSeek V4 Flash instead of the local mock provider.
  DEEPSEEK_BASE_URL     Optional DeepSeek-compatible API base URL. Defaults to https://api.deepseek.com.
  OPENAI_API_KEY        Optional fallback for OpenAI-compatible examples.
  OPENAI_BASE_URL       Optional OpenAI-compatible API base URL. Defaults to https://api.openai.com/v1.
  MINI_HARNESS_MODEL    Optional model name. Defaults to deepseek-v4-flash for DeepSeek.
`);
}

function readOptionValue(argv: string[], index: number, optionName: string): string {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${optionName} requires a value`);
  }
  return value;
}

function parseJsonOption(value: string, optionName: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`${optionName} must be valid JSON`);
  }
}

async function writeTranscript(path: string, value: unknown): Promise<void> {
  const baseDirectory = process.env.INIT_CWD ?? process.cwd();
  const absolutePath = resolve(baseDirectory, path);
  await mkdir(dirname(absolutePath), { recursive: true });
  await appendFile(absolutePath, `${JSON.stringify(value)}\n`, "utf8");
}

import { mkdir, appendFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { buildContextReport } from "./context/context-report.js";
import { createDefaultToolRegistry } from "./tools/registry.js";
import { createRunSummary } from "./agent/run.js";
import { createLogger } from "@mini-harness/shared/logger";

type CliOptions = {
  contextReport: boolean;
  transcriptPath?: string;
  task: string;
};

export async function runCli(argv: string[]): Promise<void> {
  const logger = createLogger("mini-harness");
  const options = parseArgs(argv);

  if (!options.task) {
    printHelp();
    process.exitCode = 1;
    return;
  }

  const registry = createDefaultToolRegistry();
  const summary = createRunSummary({
    task: options.task,
    tools: registry.list(),
  });

  logger.info(`Task: ${options.task}`);
  logger.info(summary.message);

  if (options.contextReport) {
    console.log("");
    console.log(buildContextReport(summary.contextParts));
  }

  if (options.transcriptPath) {
    await writeTranscript(options.transcriptPath, {
      createdAt: new Date().toISOString(),
      task: options.task,
      summary,
    });
    logger.info(`Transcript written: ${options.transcriptPath}`);
  }
}

function parseArgs(argv: string[]): CliOptions {
  let contextReport = false;
  let transcriptPath: string | undefined;
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
    taskParts.push(arg);
  }

  return {
    contextReport,
    transcriptPath,
    task: taskParts.join(" ").trim(),
  };
}

function printHelp(): void {
  console.log(`Mini Coding Agent Harness

Usage:
  npm run dev -- "hello"
  npm run dev -- --context-report "read package structure"
  npm run dev -- --transcript logs/runs/day-02.jsonl "hello"
`);
}

async function writeTranscript(path: string, value: unknown): Promise<void> {
  const absolutePath = resolve(path);
  await mkdir(dirname(absolutePath), { recursive: true });
  await appendFile(absolutePath, `${JSON.stringify(value)}\n`, "utf8");
}


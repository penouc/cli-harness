import { runCli } from "./cli.js";

try {
  await runCli(process.argv.slice(2));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[mini-harness] Error: ${message}`);
  process.exitCode = 1;
}

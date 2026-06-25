import { estimateTokens } from "@mini-harness/shared/token";
import type { ContextPart } from "@mini-harness/shared/types";

export function buildContextReport(parts: ContextPart[]): string {
  const rows = parts.map((part) => ({
    label: part.label,
    tokens: estimateTokens(part.content),
  }));
  const total = rows.reduce((sum, row) => sum + row.tokens, 0);

  const body = rows
    .map((row) => `${row.label.padEnd(22, " ")} ~${row.tokens.toLocaleString()} tokens`)
    .join("\n");

  return [`Context Explorer`, ``, body, `${"Total".padEnd(22, " ")} ~${total.toLocaleString()} tokens`].join("\n");
}


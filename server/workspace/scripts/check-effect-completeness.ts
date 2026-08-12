/**
 * IW-9 C stream 7 — effect completeness gate.
 *
 * Builds a representative tool list (configured-scope discovery) and fails
 * naming any entry that lacks `effect` and has no derivable HTTP method.
 * Wired into `pnpm --filter @aprovan/workspace check-types`.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApp } from "../src/app.js";
import { resetToolListCache, type ToolEntry } from "../src/routes/tools.js";

export interface EffectCompletenessEntry {
  name: string;
  effect?: string;
  /** When present, effect can be derived (GET/HEAD → observation, else action). */
  method?: string;
}

/** Pure check — used by the CLI and by unit tests with synthetic holes. */
export function findEffectHoles(entries: EffectCompletenessEntry[]): string[] {
  const holes: string[] = [];
  for (const entry of entries) {
    const hasEffect = entry.effect === "observation" || entry.effect === "action";
    const hasMethod = typeof entry.method === "string" && entry.method.trim().length > 0;
    if (!hasEffect && !hasMethod) {
      holes.push(entry.name);
    }
  }
  return holes;
}

export function assertEffectCompleteness(entries: EffectCompletenessEntry[]): void {
  const holes = findEffectHoles(entries);
  if (holes.length === 0) return;
  throw new Error(
    `Effect completeness failed: missing effect (and no derivable method) for: ${holes.join(", ")}`,
  );
}

async function buildRepresentativeToolList(): Promise<ToolEntry[]> {
  const dataDir = mkdtempSync(join(tmpdir(), "effect-completeness-"));
  const prev = process.env["WORKSPACE_DATA_DIR"];
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  try {
    resetToolListCache();
    const res = await createApp().request("/tools?scope=configured");
    if (!res.ok) {
      throw new Error(`GET /tools?scope=configured failed: ${res.status}`);
    }
    const body = (await res.json()) as { tools: ToolEntry[] };
    return body.tools;
  } finally {
    resetToolListCache();
    if (prev === undefined) delete process.env["WORKSPACE_DATA_DIR"];
    else process.env["WORKSPACE_DATA_DIR"] = prev;
    rmSync(dataDir, { recursive: true, force: true });
  }
}

async function main(): Promise<void> {
  const tools = await buildRepresentativeToolList();
  assertEffectCompleteness(tools);
  console.log(`effect-completeness: ok (${tools.length} tools)`);
}

const isMain =
  process.argv[1] &&
  (process.argv[1].endsWith("check-effect-completeness.ts") ||
    process.argv[1].endsWith("check-effect-completeness.js"));

if (isMain) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
}

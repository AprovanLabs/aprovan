/**
 * The first-party namespace set must have exactly one definition.
 * Consumers import `NATIVE_APP_NAMESPACES` from `namespace-core` (or a
 * re-export of it); they must not declare their own copy of the array.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { NATIVE_APP_NAMESPACES } from "../namespace-core.js";

const REPO_ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const CANONICAL = join(REPO_ROOT, "packages/compiler/src/namespace-core.ts");

/** Literal array assignment that hardcodes the first-party namespace list. */
const HARDCODED_LIST =
  /(?:export\s+)?const\s+NATIVE_APP_NAMESPACES\s*=\s*\[\s*["']vfs["']/;

const SKIP_DIRS = new Set([
  "node_modules",
  "dist",
  ".git",
  "coverage",
  ".turbo",
]);

function walk(dir: string, out: string[]): void {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) {
      walk(path, out);
      continue;
    }
    if (/\.(ts|tsx|js|mjs|cjs)$/.test(name)) out.push(path);
  }
}

describe("NATIVE_APP_NAMESPACES sole definition", () => {
  it("lists the six auto-partitioned first-party namespaces", () => {
    expect([...NATIVE_APP_NAMESPACES]).toEqual([
      "vfs",
      "keyvalue",
      "events",
      "notifications",
      "telemetry",
      "agents",
    ]);
  });

  it("is the only module that hardcodes the first-party namespace list", () => {
    const files: string[] = [];
    for (const root of ["packages", "server", "client", "scripts"]) {
      walk(join(REPO_ROOT, root), files);
    }

    const offenders: string[] = [];
    for (const file of files) {
      if (file === CANONICAL) continue;
      const source = readFileSync(file, "utf8");
      if (HARDCODED_LIST.test(source)) {
        offenders.push(relative(REPO_ROOT, file));
      }
    }

    expect(offenders).toEqual([]);
  });
});

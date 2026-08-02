/**
 * The catalogue must describe what actually exists.
 *
 * `packages/utdk/registry.json` is the discovery surface: both
 * `toolCache.getRegistryProviders()` and `workflows/runner.ts` in
 * `@aprovan/workspace` read `Object.keys(providers)` from it to decide which
 * providers a workspace may use. Nothing reads the other fields.
 *
 * It drifts because the two halves are written by different code paths. The
 * exports map is regenerated wholesale from `data/registry.json` by
 * `renderRootPackageJson`, while catalogue entries are *appended* one at a
 * time by the ship phase (`phases/ship.ts` → `updateCatalog`). A provider that
 * is generated but never shipped gets no entry; one dropped from the source
 * registry keeps its entry forever. Both had happened:
 *
 *   - 8 working providers (datadog, openai, figma, spotify, google, postgres,
 *     databricks, snowflake) were generated and exported but uncatalogued, so
 *     no workspace could discover them.
 *   - `producthunt` was catalogued but unimportable, so selecting it failed.
 *
 * These are the assertions that would have caught both.
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveRepoPath } from "./provider.js";

const UTDK_ROOT = resolveRepoPath("packages", "utdk");

/** Directories that live under packages/utdk but are not providers. */
const NON_PROVIDER_DIRS = new Set(["dist", "node_modules", "common", "llm", "sql", ".turbo"]);
/** Directories that appear *inside* a provider and are never providers themselves. */
const NON_PROVIDER_SUBDIRS = new Set(["dist", "node_modules", "types", "__tests__"]);

/**
 * Every provider on disk, by its import subpath. A directory is a provider iff
 * it has an `index.ts` — which is what makes `google/docs` (the Google Docs
 * API) a provider while `google/calendar/docs` (its documentation) is not.
 */
function providersOnDisk(): Set<string> {
  const found = new Set<string>();

  const walk = (relative: string): void => {
    const absolute = path.join(UTDK_ROOT, relative);
    if (existsSync(path.join(absolute, "index.ts"))) {
      found.add(relative);
    }
    for (const entry of readdirSync(absolute, { withFileTypes: true })) {
      if (!entry.isDirectory() || NON_PROVIDER_SUBDIRS.has(entry.name)) continue;
      walk(path.join(relative, entry.name));
    }
  };

  for (const entry of readdirSync(UTDK_ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory() || NON_PROVIDER_DIRS.has(entry.name)) continue;
    walk(entry.name);
  }

  return found;
}

function catalogueNames(): Set<string> {
  const raw = readFileSync(path.join(UTDK_ROOT, "registry.json"), "utf8");
  const parsed = JSON.parse(raw) as { providers?: Record<string, unknown> };
  return new Set(Object.keys(parsed.providers ?? {}));
}

function exportedSubpaths(): Set<string> {
  const raw = readFileSync(path.join(UTDK_ROOT, "package.json"), "utf8");
  const parsed = JSON.parse(raw) as { exports: Record<string, unknown> };
  return new Set(
    Object.keys(parsed.exports)
      .filter((key) => key.startsWith("./") && !key.includes("*") && !key.endsWith(".json") && key !== "./client")
      .map((key) => key.slice(2)),
  );
}

/**
 * `producthunt` ships an `openapi.json` that is a synthetic "sniffed" UTCP
 * manual rather than an OpenAPI document, so it converts to zero operations.
 * It stays on disk as a record of the ingest attempt but must not be offered.
 */
const DELIBERATELY_UNCATALOGUED = new Set(["producthunt"]);

describe("provider catalogue", () => {
  it("advertises nothing that cannot be imported", () => {
    const onDisk = providersOnDisk();
    const exported = exportedSubpaths();
    const unusable = [...catalogueNames()].filter((name) => !onDisk.has(name) || !exported.has(name));
    expect(unusable).toEqual([]);
  });

  it("advertises every provider that exists", () => {
    const catalogued = catalogueNames();
    const missing = [...providersOnDisk()].filter(
      (name) => !catalogued.has(name) && !DELIBERATELY_UNCATALOGUED.has(name),
    );
    expect(missing).toEqual([]);
  });
});

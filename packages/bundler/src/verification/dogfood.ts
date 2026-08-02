/**
 * Dogfood lint: dead export detection.
 *
 * Parses index.ts and types.ts to collect every exported identifier, then
 * scans all TypeScript source files in the provider package for references.
 * Exports that are never referenced anywhere in the package are flagged as
 * warnings (not failures — the provider can still ship).
 */

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { resolveProviderOutputDir } from "../provider.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DogfoodWarning = {
  exportName: string;
  sourceFile: string;
  message: string;
};

export type DogfoodResult = {
  provider: string;
  warnings: DogfoodWarning[];
  exportCount: number;
  unreferencedCount: number;
};

export type RunDogfoodOptions = {
  provider: string;
  outputRoot: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function readFileSafe(filePath: string): Promise<string | undefined> {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return undefined;
  }
}

async function collectTsFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir).catch(() => []);
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const s = await stat(full).catch(() => null);
    if (!s) continue;
    if (s.isDirectory()) {
      files.push(...(await collectTsFiles(full)));
    } else if (entry.endsWith(".ts")) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Extract the set of named identifiers from `export` statements.
 *
 * Handles:
 *  - `export type Foo = ...`
 *  - `export interface Foo { ... }`
 *  - `export const foo = ...`
 *  - `export function foo(...) { ... }`
 *  - `export class Foo { ... }`
 *  - `export enum Foo { ... }`
 *  - `export { foo, bar as baz }` (re-exports with local origin)
 *
 * Skips `export * from ...` (wildcard re-exports — no specific name to check).
 * Skips `export default` (default exports — referenced via the module, not by name).
 */
function extractExports(content: string): string[] {
  const names = new Set<string>();

  // Named declaration exports: export (type|interface|const|let|var|function|class|enum) <Name>
  const declarationRe =
    /^\s*export\s+(?:declare\s+)?(?:abstract\s+)?(?:type|interface|const|let|var|function\*?|class|enum|async\s+function\*?)\s+([A-Za-z_$][A-Za-z0-9_$]*)/gm;
  let match: RegExpExecArray | null;
  while ((match = declarationRe.exec(content)) !== null) {
    if (match[1]) names.add(match[1]);
  }

  // Named re-exports: export { foo, bar as Baz }
  const reExportRe = /^\s*export\s*\{([^}]+)\}/gm;
  while ((match = reExportRe.exec(content)) !== null) {
    const inner = match[1] ?? "";
    for (const token of inner.split(",")) {
      // "bar as Baz" → use the exported name "Baz"; plain "foo" → "foo"
      const parts = token.trim().split(/\s+as\s+/);
      const exportedName = (parts.length > 1 ? parts[parts.length - 1] : parts[0])?.trim();
      if (exportedName && /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(exportedName)) {
        names.add(exportedName);
      }
    }
  }

  return [...names];
}

/**
 * Check if `identifier` is referenced anywhere in `content`, excluding its
 * own export declaration.
 *
 * A "reference" is any word-boundary occurrence of the identifier that is NOT
 * preceded by `export (type|interface|const|...) ` (i.e. not the declaration itself).
 */
function isReferenced(identifier: string, contents: string[]): boolean {
  // We use a word-boundary pattern. The identifier must appear in a context
  // that looks like a usage (after : space ( < , as | { or at start of line)
  // We take a simple approach: find any occurrence that is NOT immediately
  // preceded by "export ... " on the same line.
  const usageRe = new RegExp(`\\b${escapeRegex(identifier)}\\b`, "g");

  for (const content of contents) {
    const matches = [...content.matchAll(usageRe)];
    for (const m of matches) {
      // Check if this occurrence is the export declaration itself
      const lineStart = content.lastIndexOf("\n", m.index ?? 0) + 1;
      const lineEnd = content.indexOf("\n", m.index ?? 0);
      const line = content.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
      const isExportDecl = /^\s*export\s+(?:declare\s+)?(?:abstract\s+)?(?:type|interface|const|let|var|function\*?|class|enum|async\s+function\*?)\s/.test(line);
      const isReExportDecl = /^\s*export\s*\{/.test(line);
      if (!isExportDecl && !isReExportDecl) {
        return true;
      }
    }
  }
  return false;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function runDogfood(options: RunDogfoodOptions): Promise<DogfoodResult> {
  const providerDir = resolveProviderOutputDir(options.provider, options.outputRoot);

  // Collect exports from index.ts and types.ts
  const [indexContent, typesContent] = await Promise.all([
    readFileSafe(path.join(providerDir, "index.ts")),
    readFileSafe(path.join(providerDir, "types.ts")),
  ]);

  const exportSources: Array<{ file: string; exports: string[] }> = [];

  if (indexContent) {
    exportSources.push({
      file: path.join(providerDir, "index.ts"),
      exports: extractExports(indexContent),
    });
  }

  if (typesContent) {
    exportSources.push({
      file: path.join(providerDir, "types.ts"),
      exports: extractExports(typesContent),
    });
  }

  const allExportNames = new Set(exportSources.flatMap((s) => s.exports));

  if (allExportNames.size === 0) {
    return {
      provider: options.provider,
      warnings: [],
      exportCount: 0,
      unreferencedCount: 0,
    };
  }

  // Collect all TypeScript file contents for reference searching
  const allFiles = await collectTsFiles(providerDir);
  const allContents = await Promise.all(allFiles.map((f) => readFileSafe(f)));
  const nonNullContents = allContents.filter((c): c is string => c !== undefined);

  // Detect dead exports
  const warnings: DogfoodWarning[] = [];

  for (const { file, exports } of exportSources) {
    for (const name of exports) {
      if (!isReferenced(name, nonNullContents)) {
        warnings.push({
          exportName: name,
          sourceFile: file,
          message: `Export '${name}' in ${path.relative(providerDir, file)} is not referenced anywhere in the package.`,
        });
      }
    }
  }

  return {
    provider: options.provider,
    warnings,
    exportCount: allExportNames.size,
    unreferencedCount: warnings.length,
  };
}

/**
 * Script dependency parsing — turn a script's ESM imports into a
 * {@link RuntimeManifest} dependency list, and strip them so the remaining
 * body can run in a sandbox where the bindings are injected as globals.
 *
 * Supported forms (one provider binding per specifier segment):
 *   import github from "@utdk/github";      → github ⇒ provider github
 *   import s3 from "aws/s3";                → s3     ⇒ provider aws, path s3
 *   import slack from "slack";              → slack  ⇒ provider slack
 *   import { repos, issues } from "@utdk/github";
 *                                           → repos/issues ⇒ github.repos / github.issues
 *   import * as github from "@utdk/github"; → github ⇒ provider github
 *
 * Relative specifiers ("./util") are ignored — the sandbox is single-file.
 */

import type { RuntimeDependency } from "./types.js";

const IMPORT_PATTERN =
  /import\s+(?:([A-Za-z_$][\w$]*)|\*\s+as\s+([A-Za-z_$][\w$]*)|\{([^}]*)\})?\s*(?:,\s*\{([^}]*)\})?\s*(?:from\s*)?["']([^"']+)["']\s*;?/g;

function specifierToProvider(specifier: string): { provider: string; path: string } | null {
  if (specifier.startsWith(".") || specifier.startsWith("/")) return null;

  const withoutScope = specifier.startsWith("@utdk/")
    ? specifier.slice("@utdk/".length)
    : specifier.startsWith("@")
      ? specifier.split("/").slice(1).join("/")
      : specifier;

  const segments = withoutScope.split("/").filter(Boolean);
  const provider = segments[0];
  if (!provider) return null;

  return { provider, path: segments.slice(1).join(".") };
}

function parseNamedBindings(clause: string): Array<{ imported: string; local: string }> {
  return clause
    .split(",")
    .flatMap((binding) => {
      const asMatch = binding.trim().match(/^([\w$]+)(?:\s+as\s+([\w$]+))?$/);
      if (!asMatch || !asMatch[1]) return [];
      return [{ imported: asMatch[1], local: asMatch[2] ?? asMatch[1] }];
    });
}

export interface ParsedScript {
  dependencies: RuntimeDependency[];
  /** Source with all import statements removed (line structure preserved). */
  body: string;
}

/** Parse a script's imports into runtime dependencies and strip them. */
export function parseScriptDependencies(source: string): ParsedScript {
  const dependencies: RuntimeDependency[] = [];

  const body = source.replace(
    IMPORT_PATTERN,
    (match, defaultName: string | undefined, starName: string | undefined, named: string | undefined, namedAfterDefault: string | undefined, specifier: string) => {
      const resolved = specifierToProvider(specifier);
      if (!resolved) return match; // leave relative imports in place (will fail loudly)

      const rootIdentifier = defaultName ?? starName;
      if (rootIdentifier) {
        dependencies.push({
          identifier: rootIdentifier,
          specifier,
          provider: resolved.provider,
          path: resolved.path,
        });
      }

      for (const clause of [named, namedAfterDefault]) {
        if (!clause) continue;
        for (const { imported, local } of parseNamedBindings(clause)) {
          dependencies.push({
            identifier: local,
            specifier,
            provider: resolved.provider,
            path: resolved.path ? `${resolved.path}.${imported}` : imported,
          });
        }
      }

      // Preserve newline count so runtime error line numbers stay meaningful.
      return match.replace(/[^\n]/g, "");
    },
  );

  return { dependencies, body };
}

/**
 * Prepare a script body for sandbox execution: after import stripping, rewrite
 * `export default <fn>` into a binding the sandbox harness invokes with the
 * script's inputs. Scripts without a default export run top-to-bottom.
 */
export function rewriteDefaultExport(body: string, binding = "__default__"): string {
  return body.replace(/export\s+default\s+/, `const ${binding} = `);
}

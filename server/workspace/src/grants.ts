/**
 * The unified capability-grant model (docs/telemetry-and-agents.md): one
 * shape for "what may this principal touch", shared by agent profiles today
 * and extensible to apps. Two axes:
 *
 *   - `tools`    — tool patterns: exact (`keyvalue.set`), namespace-wide
 *                  (`keyvalue.*`), subtree (`github.repos.*`), or `*`.
 *   - `paths`    — workspace-VFS prefix grants with `ro`/`rw` access,
 *                  longest-matching-prefix wins, deny by default once any
 *                  path grant exists.
 *
 * Absent axes are permissive (no `tools` list = every tool the executing
 * user could call; no `paths` list = the whole workspace): a grant narrows,
 * the absence of one changes nothing — matching how app `allowed_tools`
 * always behaved.
 */

import { ServiceError } from "./service-kernel.js";

export interface PathGrant {
  /** Workspace path prefix, no leading slash (e.g. "docs/"). */
  prefix: string;
  access: "ro" | "rw";
}

export interface CapabilityGrants {
  tools?: string[];
  paths?: PathGrant[];
}

/** Does `pattern` cover the call `namespace.procedure`? */
function patternMatches(pattern: string, call: string): boolean {
  if (pattern === "*") return true;
  if (pattern.endsWith(".*")) {
    const base = pattern.slice(0, -2);
    return call === base || call.startsWith(`${base}.`);
  }
  return call === pattern;
}

export function toolGranted(
  patterns: string[],
  namespace: string,
  procedure: string,
): boolean {
  const call = `${namespace}.${procedure}`;
  return patterns.some((pattern) => patternMatches(pattern, call));
}

/**
 * Effective access for `path` under the grant list: the longest matching
 * prefix decides; nothing matching is "none". A prefix grant of "docs/"
 * covers "docs" itself and everything under it.
 */
export function pathAccess(grants: PathGrant[], path: string): "none" | "ro" | "rw" {
  let best: { length: number; access: "ro" | "rw" } | undefined;
  for (const grant of grants) {
    const prefix = grant.prefix.replace(/\/+$/u, "");
    const covers = prefix === "" || path === prefix || path.startsWith(`${prefix}/`);
    if (!covers) continue;
    if (!best || prefix.length > best.length) {
      best = { length: prefix.length, access: grant.access };
    }
  }
  return best?.access ?? "none";
}

/** Throw 403 unless the grants (when present) permit this tool call. */
export function assertToolGranted(
  grants: CapabilityGrants | undefined,
  namespace: string,
  procedure: string,
): void {
  if (!grants?.tools) return;
  if (!toolGranted(grants.tools, namespace, procedure)) {
    throw new ServiceError(
      `Agent grant denies ${namespace}.${procedure} (granted: ${grants.tools.join(", ") || "nothing"})`,
      403,
    );
  }
}

/** Throw 403 unless the grants (when present) permit touching `path`. */
export function assertPathGranted(
  grants: CapabilityGrants | undefined,
  path: string,
  write: boolean,
): void {
  if (!grants?.paths) return;
  const access = pathAccess(grants.paths, path);
  if (access === "none" || (write && access === "ro")) {
    throw new ServiceError(
      `Agent grant denies ${write ? "writing" : "reading"} ${path}`,
      403,
    );
  }
}

/** Validate + normalize a grants payload from the API. Throws on garbage. */
export function parseGrants(raw: unknown): CapabilityGrants | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw !== "object" || Array.isArray(raw)) {
    throw new ServiceError("grants must be an object { tools?, paths? }", 400);
  }
  const input = raw as Record<string, unknown>;
  const grants: CapabilityGrants = {};
  if (input["tools"] !== undefined) {
    if (
      !Array.isArray(input["tools"]) ||
      input["tools"].some((t) => typeof t !== "string" || !/^[\w.*-]{1,200}$/u.test(t))
    ) {
      throw new ServiceError(
        'grants.tools must be an array of tool patterns ("keyvalue.*", "github.repos.get", "*")',
        400,
      );
    }
    grants.tools = input["tools"] as string[];
  }
  if (input["paths"] !== undefined) {
    if (!Array.isArray(input["paths"])) {
      throw new ServiceError("grants.paths must be an array of { prefix, access }", 400);
    }
    const paths: PathGrant[] = [];
    for (const entry of input["paths"] as Array<Record<string, unknown>>) {
      const prefix = typeof entry?.["prefix"] === "string" ? entry["prefix"] : undefined;
      const access = entry?.["access"] === "ro" ? "ro" : entry?.["access"] === "rw" ? "rw" : undefined;
      if (prefix === undefined || !access) {
        throw new ServiceError('each path grant needs { prefix, access: "ro" | "rw" }', 400);
      }
      const normalized = prefix.replace(/^\/+/u, "").replace(/\/+$/u, "");
      if (normalized.includes("..") || normalized.startsWith(".services")) {
        throw new ServiceError(`Invalid grant prefix: ${prefix}`, 400);
      }
      paths.push({ prefix: normalized, access });
    }
    grants.paths = paths;
  }
  return grants.tools || grants.paths ? grants : undefined;
}

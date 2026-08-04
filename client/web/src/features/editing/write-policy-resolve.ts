/**
 * Pure write-policy resolution — no gateway / VFS imports.
 */

export type WritePolicy = "direct" | "staged" | "readonly";

export interface StagedPrefixSets {
  /** Declared source prefixes of installed apps (appPathAllowed's set). */
  appPrefixes: string[];
  /** VCS mount prefixes with writability (all read-only in v1). */
  mounts: Array<{ prefix: string; writable: boolean }>;
  loadedAt: number;
}

export function normalizePolicyPath(path: string): string {
  return path.replace(/^\/+|\/+$/g, "").replace(/\/+/g, "/");
}

function underPrefix(path: string, prefix: string): boolean {
  const p = normalizePolicyPath(path);
  const pref = normalizePolicyPath(prefix);
  if (!pref) return false;
  return p === pref || p.startsWith(`${pref}/`);
}

/**
 * Pure; normalizes the path; longest-prefix match.
 * Non-writable mount ⇒ `"readonly"`. Writable mount ⇒ `"staged"`.
 * App source prefix ⇒ `"staged"`. Otherwise `"direct"`.
 */
export function resolveWritePolicy(path: string, sets: StagedPrefixSets): WritePolicy {
  const p = normalizePolicyPath(path);

  let bestMount: { prefix: string; writable: boolean } | null = null;
  for (const mount of sets.mounts) {
    if (!underPrefix(p, mount.prefix)) continue;
    if (
      !bestMount ||
      normalizePolicyPath(mount.prefix).length > normalizePolicyPath(bestMount.prefix).length
    ) {
      bestMount = mount;
    }
  }

  let bestApp: string | null = null;
  for (const prefix of sets.appPrefixes) {
    if (!underPrefix(p, prefix)) continue;
    if (!bestApp || normalizePolicyPath(prefix).length > normalizePolicyPath(bestApp).length) {
      bestApp = prefix;
    }
  }

  const mountLen = bestMount ? normalizePolicyPath(bestMount.prefix).length : -1;
  const appLen = bestApp ? normalizePolicyPath(bestApp).length : -1;

  if (mountLen >= appLen && bestMount) {
    return bestMount.writable ? "staged" : "readonly";
  }
  if (bestApp) return "staged";

  // Cold cache (loadedAt === 0): do not invent staged routes — consumers
  // should block saves until loadStagedPrefixes completes rather than
  // write-through to a staged target.
  if (sets.loadedAt === 0) return "direct";
  return "direct";
}

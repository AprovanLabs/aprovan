/**
 * Client-side write-policy seam: plain paths write through; app source and
 * writable mounts stage; non-writable mounts are read-only. Consumed by
 * FileEditorPane (stream 4) — unused until then.
 */

import { ACTIVE_WORKSPACE_KEY } from "@/features/tabs/useTabs";
import { invokeAppsTool, invokeNamespaceTool } from "@/lib/tools";
import { subscribeToWorkspaceChanges } from "@/lib/workspace-vfs";

const invokeVfsTool = invokeNamespaceTool("vfs");

export type WritePolicy = "direct" | "staged" | "readonly";

export interface StagedPrefixSets {
  /** Declared source prefixes of installed apps (appPathAllowed's set). */
  appPrefixes: string[];
  /** VCS mount prefixes with writability (all read-only in v1). */
  mounts: Array<{ prefix: string; writable: boolean }>;
  loadedAt: number;
}

const EMPTY_SETS: StagedPrefixSets = {
  appPrefixes: [],
  mounts: [],
  loadedAt: 0,
};

let cache: { workspaceId: string; sets: StagedPrefixSets } | null = null;
let loadPromise: Promise<StagedPrefixSets> | null = null;
let subscribed = false;

function currentWorkspaceId(): string {
  try {
    return localStorage.getItem(ACTIVE_WORKSPACE_KEY) ?? "";
  } catch {
    return "";
  }
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

function ensureRefreshSubscription(): void {
  if (subscribed || typeof window === "undefined") return;
  subscribed = true;
  subscribeToWorkspaceChanges(() => {
    // Any workspace change may include app/mount mutations — refresh next load.
    cache = null;
  });
}

/**
 * Refresh from the apps listing + `vfs.mounts`; cached per workspace.
 * Pass `force` after a 403 write failure or known app/mount mutation.
 */
export async function loadStagedPrefixes(force?: boolean): Promise<StagedPrefixSets> {
  ensureRefreshSubscription();
  const workspaceId = currentWorkspaceId();
  if (!force && cache && cache.workspaceId === workspaceId && cache.sets.loadedAt > 0) {
    return cache.sets;
  }
  if (!force && loadPromise) return loadPromise;

  loadPromise = (async () => {
    const appPrefixes: string[] = [];
    const mounts: StagedPrefixSets["mounts"] = [];

    try {
      const appsResult = (await invokeAppsTool("list", {})) as {
        apps?: Array<{ paths?: string[]; entry?: string }>;
      };
      for (const app of appsResult.apps ?? []) {
        if (Array.isArray(app.paths) && app.paths.length > 0) {
          for (const prefix of app.paths) {
            if (typeof prefix === "string" && prefix) appPrefixes.push(prefix);
          }
        } else if (typeof app.entry === "string" && app.entry) {
          const slash = app.entry.lastIndexOf("/");
          if (slash > 0) appPrefixes.push(app.entry.slice(0, slash));
        }
      }
    } catch {
      // Apps listing unavailable — leave app prefixes empty (fail closed for
      // staged targets once a consumer checks loadedAt / retries).
    }

    try {
      const mountsResult = (await invokeVfsTool("mounts", {})) as {
        mounts?: Array<{ prefix?: string; mode?: string }>;
      };
      for (const mount of mountsResult.mounts ?? []) {
        if (typeof mount.prefix !== "string" || !mount.prefix) continue;
        mounts.push({
          prefix: mount.prefix,
          // v1 server writes always 403; mode is future-proofing for writable mounts.
          writable: mount.mode === "readwrite",
        });
      }
    } catch {
      // Mounts unavailable — leave empty.
    }

    const sets: StagedPrefixSets = {
      appPrefixes,
      mounts,
      loadedAt: Date.now(),
    };
    cache = { workspaceId, sets };
    return sets;
  })();

  try {
    return await loadPromise;
  } finally {
    loadPromise = null;
  }
}

/** Drop the cache so the next load refetches (e.g. after a 403 write). */
export function invalidateStagedPrefixes(): void {
  cache = null;
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

/** Snapshot of the current cache, or EMPTY_SETS when cold. */
export function getCachedStagedPrefixes(): StagedPrefixSets {
  const workspaceId = currentWorkspaceId();
  if (cache && cache.workspaceId === workspaceId) return cache.sets;
  return EMPTY_SETS;
}

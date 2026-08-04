/**
 * Client-side write-policy seam: plain paths write through; app source and
 * writable mounts stage; non-writable mounts are read-only. Consumed by
 * FileEditorPane — resolves direct / staged / read-only write handling.
 */

import { ACTIVE_WORKSPACE_KEY } from "@/features/tabs/useTabs";
import { invokeAppsTool, invokeNamespaceTool } from "@/lib/tools";
import { subscribeToWorkspaceChanges } from "@/lib/workspace-vfs";
import type { StagedPrefixSets } from "./write-policy-resolve";

export {
  normalizePolicyPath,
  resolveWritePolicy,
  type StagedPrefixSets,
  type WritePolicy,
} from "./write-policy-resolve";

const invokeVfsTool = invokeNamespaceTool("vfs");

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

/** Snapshot of the current cache, or EMPTY_SETS when cold. */
export function getCachedStagedPrefixes(): StagedPrefixSets {
  const workspaceId = currentWorkspaceId();
  if (cache && cache.workspaceId === workspaceId) return cache.sets;
  return EMPTY_SETS;
}

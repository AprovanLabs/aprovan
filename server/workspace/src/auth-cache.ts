/**
 * Per-token auth resolution cache (tech-plan D6, specs/identity-store
 * "Per-token auth resolution cache").
 *
 * `middleware/auth.ts`'s `oidcPrincipal` used to do three sequential store
 * reads (Sessions → Memberships → UserGroups) on *every* authenticated
 * request. This caches the assembled principal in-process, keyed by
 * (bearer-token hash, requested-workspace header) — a token switching its
 * `X-Aprovan-Workspace` header resolves each workspace independently, and a
 * token that never sends the header always resolves against the same
 * "default workspace" cache slot (kept correct by invalidating on
 * current-workspace switch, same as any other cache-affecting mutation).
 *
 * TTL bounds staleness across processes during a rolling deploy; same-
 * process mutations (membership/group-membership/current-workspace changes)
 * invalidate synchronously via {@link invalidatePrincipal}, called from
 * memberships.ts, groups.ts, and sessions.ts.
 */

import { createHash } from "node:crypto";
import type { Principal } from "./middleware/auth.js";

const DEFAULT_TTL_MS = 60_000;

function ttlMs(): number {
  const raw = Number(process.env["AUTH_CACHE_TTL_MS"]);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_TTL_MS;
}

interface CacheEntry {
  principal: Principal;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

/** Bearer tokens are never used as cache keys directly — hash them so a
 *  heap snapshot or debug log of this module's state can't leak one. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function cacheKey(tokenHash: string, workspaceHint: string): string {
  return `${tokenHash}:${workspaceHint}`;
}

/** A cache hit for zero identity-store reads; undefined on miss or expiry. */
export function getCachedPrincipal(
  tokenHash: string,
  workspaceHint: string,
): Principal | undefined {
  const key = cacheKey(tokenHash, workspaceHint);
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    cache.delete(key);
    return undefined;
  }
  return entry.principal;
}

export function setCachedPrincipal(
  tokenHash: string,
  workspaceHint: string,
  principal: Principal,
): void {
  cache.set(cacheKey(tokenHash, workspaceHint), {
    principal,
    expiresAt: Date.now() + ttlMs(),
  });
}

/**
 * Drop every cached principal for a user or a workspace, synchronously.
 * Call this from any mutation that changes what `oidcPrincipal` would
 * resolve: membership add/remove/role change, group-membership change, or
 * current-workspace switch. Cheap: the cache is small and short-lived (TTL
 * default 60s), so a linear scan is the right trade against a secondary
 * index that would complicate every write path above.
 */
export function invalidatePrincipal(subOrWorkspaceId: string): void {
  for (const [key, entry] of cache) {
    if (
      entry.principal.sub === subOrWorkspaceId ||
      entry.principal.workspaceId === subOrWorkspaceId
    ) {
      cache.delete(key);
    }
  }
}

/** Test hook: drop every cached principal. */
export function resetAuthCache(): void {
  cache.clear();
}

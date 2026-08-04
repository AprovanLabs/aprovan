/**
 * Identity store factory (tech-plan §4): backend by the same
 * `storeBackend()` switch as every other store, plus the auth-cache
 * invalidation choke point — mutations that change what `oidcPrincipal`
 * would resolve invalidate the cached principal HERE, once, instead of via
 * per-module hooks (tasks.md 8.3).
 */

import { invalidatePrincipal } from "../auth-cache.js";
import { storeBackend } from "../runtime/config.js";
import {
  createDsqlIdentityClient,
  createIdentityStoreSql,
  createSqliteIdentityClient,
} from "./sql.js";
import type { IIdentityStore } from "./types.js";

export type { IIdentityStore } from "./types.js";
export * from "./types.js";

/**
 * Wrap the auth-affecting mutations with synchronous principal-cache
 * invalidation (specs/identity-store "Per-token auth resolution cache"):
 * membership put/remove (role change, join, revocation), group-membership
 * add/remove (principal.groupIds), and current-workspace switch (the
 * no-header cache slot).
 */
function withPrincipalInvalidation(store: IIdentityStore): IIdentityStore {
  const { memberships, sessions, groups } = store;
  return {
    ...store,
    memberships: {
      ...memberships,
      async put(record) {
        await memberships.put(record);
        invalidatePrincipal(record.userId);
      },
      async remove(workspaceId, userId) {
        const removed = await memberships.remove(workspaceId, userId);
        // Revocation must take effect immediately, not after the TTL.
        if (removed) invalidatePrincipal(userId);
        return removed;
      },
    },
    sessions: {
      ...sessions,
      async setCurrentWorkspace(userId, workspaceId, ttlSeconds) {
        await sessions.setCurrentWorkspace(userId, workspaceId, ttlSeconds);
        invalidatePrincipal(userId);
      },
    },
    groups: {
      ...groups,
      members: {
        ...groups.members,
        async add(workspaceId, groupId, userId) {
          await groups.members.add(workspaceId, groupId, userId);
          invalidatePrincipal(userId);
        },
        async remove(workspaceId, groupId, userId) {
          const removed = await groups.members.remove(workspaceId, groupId, userId);
          if (removed) invalidatePrincipal(userId);
          return removed;
        },
      },
    },
  };
}

let _store: IIdentityStore | undefined;

export function getIdentityStore(): IIdentityStore {
  _store ??= withPrincipalInvalidation(
    (() => {
      switch (storeBackend()) {
        case "dsql":
          return createIdentityStoreSql(createDsqlIdentityClient());
        case "sqlite":
          return createIdentityStoreSql(createSqliteIdentityClient());
      }
    })(),
  );
  return _store;
}

/** Reset the singleton (used in tests). */
export function resetIdentityStore(): void {
  _store = undefined;
}

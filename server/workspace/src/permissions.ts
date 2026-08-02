/**
 * Per-tool permission grants — facade over the identity store
 * (specs/identity-store): DynamoDB single-table until cutover, the
 * relational `permissions` table on the sqlite/dsql backends.
 *
 * A permission entry grants `callerId` the right to call `provider:operation`
 * (or `provider:*` as a wildcard for all operations of a provider).
 */

import { getIdentityStore } from "./identity/store.js";
import type { GrantInput, Permission } from "./identity/types.js";

export type { GrantInput, Permission } from "./identity/types.js";
export { PermissionStoreDynamodb } from "./identity/dynamo.js";

// ---------------------------------------------------------------------------
// Store interface
// ---------------------------------------------------------------------------

export interface IPermissionStore {
  grant(workspaceId: string, input: GrantInput): Promise<Permission>;
  revoke(workspaceId: string, id: string): Promise<boolean>;
  list(workspaceId: string, callerId?: string): Promise<Permission[]>;
  /** Whether `callerId` may invoke `provider:operation` (or a `*` wildcard). */
  check(workspaceId: string, callerId: string, provider: string, operation: string): Promise<boolean>;
}

// ---------------------------------------------------------------------------
// Singleton factory (delegates to the identity store's backend)
// ---------------------------------------------------------------------------

let _store: IPermissionStore | undefined;

/** Resolve the singleton permission store (backend via runtime/config.ts). */
export function getPermissionStore(): IPermissionStore {
  _store ??= {
    grant: (workspaceId, input) => getIdentityStore().permissions.grant(workspaceId, input),
    revoke: (workspaceId, id) => getIdentityStore().permissions.revoke(workspaceId, id),
    list: (workspaceId, callerId) => getIdentityStore().permissions.list(workspaceId, callerId),
    check: (workspaceId, callerId, provider, operation) =>
      getIdentityStore().permissions.check(workspaceId, callerId, provider, operation),
  };
  return _store;
}

/** Reset the singleton (used in tests). */
export function resetPermissionStore(): void {
  _store = undefined;
}

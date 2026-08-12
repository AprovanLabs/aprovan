/**
 * Per-tool permission grants — facade over the identity store
 * (specs/identity-store): DynamoDB single-table until cutover, the
 * relational `permissions` table on the sqlite/dsql backends.
 *
 * APR-320 direct rows migrate into the unified grant model (IW-9 C stream 8):
 * `evaluateDispatch` reads them as capability-only (`resourcePattern: null`)
 * patterns via {@link legacyPermissionPatterns}. The standalone
 * `check` path is no longer used for authorization — grant/revoke/list stay
 * for the admin API and migration.
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
  /**
   * @deprecated Authorization goes through `evaluateDispatch`. Kept for
   * identity-store completeness and tests that assert row shape.
   */
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

/**
 * Map a caller's legacy APR-320 permission rows to capability tool patterns
 * (`provider.*` / `provider.operation`) for {@link evaluateDispatch}.
 */
export async function legacyPermissionPatterns(
  workspaceId: string,
  callerId: string,
): Promise<string[]> {
  const rows = await getPermissionStore().list(workspaceId, callerId);
  return rows.map((row) =>
    row.operation === "*" ? `${row.provider}.*` : `${row.provider}.${row.operation}`,
  );
}

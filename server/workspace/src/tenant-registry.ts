/**
 * workspaceId → registry tenant 1:1 mapping (product-composition spec).
 *
 * Tenants are created on workspace creation or lazily on first execution-plane
 * use. The tenant id equals the workspace id — one row in registry storage per
 * workspace, no shared state across workspaces.
 */

const known = new Set<string>();

/** Ensure a registry tenant exists for this workspace (idempotent). */
export async function ensureTenantForWorkspace(workspaceId: string): Promise<string> {
  known.add(workspaceId);
  return workspaceId;
}

/** Map a product workspace id to the registry tenant id (1:1). */
export function tenantIdForWorkspace(workspaceId: string): string {
  return workspaceId;
}

/** Test hook — drop memoized knowledge between cases. */
export function resetTenantRegistry(): void {
  known.clear();
}

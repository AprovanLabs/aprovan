/**
 * Membership facade over the identity store. The auth middleware uses this
 * to enforce that a request's active workspace is one the caller belongs
 * to; auth-cache invalidation on mutation happens inside the store
 * (identity/store.ts — the single choke point).
 */

import { getIdentityStore } from "./identity/store.js";
import type { MembershipRecord } from "./identity/types.js";

export type { MembershipRecord } from "./identity/types.js";

/** Fetch a single membership row (undefined = not a member). */
export async function getMembership(
  workspaceId: string,
  userId: string,
): Promise<MembershipRecord | undefined> {
  return getIdentityStore().memberships.get(workspaceId, userId);
}

/** List all membership rows for a workspace. */
export async function listMembers(workspaceId: string): Promise<MembershipRecord[]> {
  return getIdentityStore().memberships.listByWorkspace(workspaceId);
}

/** List every workspace a user belongs to (`GET /session` picker). */
export async function listMembershipsForUser(
  userId: string,
): Promise<MembershipRecord[]> {
  return getIdentityStore().memberships.listByUser(userId);
}

/** Add or upsert a membership row (used by invite accept). */
export async function putMembership(record: MembershipRecord): Promise<void> {
  await getIdentityStore().memberships.put(record);
}

/** Remove a membership row. Returns false if it did not exist. */
export async function removeMember(
  workspaceId: string,
  userId: string,
): Promise<boolean> {
  return getIdentityStore().memberships.remove(workspaceId, userId);
}

/**
 * User-group facade over the identity store. The auth middleware loads these
 * to populate `principal.groupIds` for group-based permission grants.
 */

import { getIdentityStore } from "./identity/store.js";

/** Group ids the user belongs to in the workspace (empty when none). */
export async function listUserGroupIds(
  workspaceId: string,
  userId: string,
): Promise<string[]> {
  return getIdentityStore().groups.members.listGroupIdsForUser(workspaceId, userId);
}

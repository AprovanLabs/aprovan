/**
 * Groups facade over the identity store: group CRUD and user-group
 * membership. Capability is granted by attaching profiles to groups
 * (profile-grants.ts — subject-typed profile grants in the WS-3
 * registry-server storage). Auth-cache invalidation on membership mutations
 * happens inside the store (identity/store.ts).
 */

import { getIdentityStore } from "./identity/store.js";
import type { GroupRecord } from "./identity/types.js";

export type { GroupRecord, UserGroupRecord } from "./identity/types.js";

// ---------------------------------------------------------------------------
// Groups CRUD
// ---------------------------------------------------------------------------

export async function createGroup(
  workspaceId: string,
  name: string,
  description?: string,
): Promise<GroupRecord> {
  return getIdentityStore().groups.create(workspaceId, name, description);
}

export async function listGroups(workspaceId: string): Promise<GroupRecord[]> {
  return getIdentityStore().groups.list(workspaceId);
}

export async function getGroup(
  workspaceId: string,
  groupId: string,
): Promise<GroupRecord | undefined> {
  return getIdentityStore().groups.get(workspaceId, groupId);
}

export async function updateGroup(
  workspaceId: string,
  groupId: string,
  patch: { name?: string; description?: string },
): Promise<GroupRecord | undefined> {
  return getIdentityStore().groups.update(workspaceId, groupId, patch);
}

/** Delete a group; its grants (and, relationally, its memberships) go too. */
export async function deleteGroup(
  workspaceId: string,
  groupId: string,
): Promise<boolean> {
  return getIdentityStore().groups.remove(workspaceId, groupId);
}

// ---------------------------------------------------------------------------
// UserGroups (user <-> group bindings)
// ---------------------------------------------------------------------------

export async function addUserToGroup(
  workspaceId: string,
  groupId: string,
  userId: string,
): Promise<void> {
  await getIdentityStore().groups.members.add(workspaceId, groupId, userId);
}

export async function removeUserFromGroup(
  workspaceId: string,
  groupId: string,
  userId: string,
): Promise<boolean> {
  return getIdentityStore().groups.members.remove(workspaceId, groupId, userId);
}

/** User ids in a group (admin listing). */
export async function listGroupUserIds(
  workspaceId: string,
  groupId: string,
): Promise<string[]> {
  return getIdentityStore().groups.members.listUserIdsForGroup(workspaceId, groupId);
}


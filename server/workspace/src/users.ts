/**
 * User profile facade — the active-workspace preference, persisted through
 * the identity store (specs/identity-store). The durable user record is
 * created by the PostConfirmation trigger; `activeWorkspaceId` persists the
 * user's last-chosen workspace so it survives session expiry (unlike the
 * TTL'd session row).
 */

import { getIdentityStore } from "./identity/store.js";

export type { UserRecord } from "./identity/types.js";

/** Read the user's persisted active workspace id (undefined when unset). */
export async function getActiveWorkspaceId(
  userId: string,
): Promise<string | undefined> {
  return getIdentityStore().users.getActiveWorkspaceId(userId);
}

/** Persist the user's active workspace choice. */
export async function setActiveWorkspaceId(
  userId: string,
  workspaceId: string,
): Promise<void> {
  await getIdentityStore().users.setActiveWorkspaceId(userId, workspaceId);
}

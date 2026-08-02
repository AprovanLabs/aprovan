/**
 * Session facade over the identity store — the active-workspace picker row
 * (TTL-bounded). Auth-cache invalidation on workspace switch happens inside
 * the store (identity/store.ts).
 */

import { getIdentityStore } from "./identity/store.js";

/** Read the user's active workspace id (undefined when absent or expired). */
export async function getCurrentWorkspace(
  userId: string,
): Promise<string | undefined> {
  return getIdentityStore().sessions.getCurrentWorkspace(userId);
}

/** Persist the user's active workspace choice with a TTL. */
export async function setCurrentWorkspace(
  userId: string,
  workspaceId: string,
  ttlSeconds?: number,
): Promise<void> {
  await getIdentityStore().sessions.setCurrentWorkspace(userId, workspaceId, ttlSeconds);
}

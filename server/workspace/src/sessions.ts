/**
 * Session facade over the identity store — the active-workspace picker row
 * (TTL-bounded). Auth-cache invalidation on workspace switch happens inside
 * the store (identity/store.ts).
 *
 * Panel ↔ chat continuity (voice D5) does **not** live here. Shared conversation
 * context is a gateway chat session in the `sessions` tool namespace
 * (`vcs/chat-sessions.ts`), addressed by id and listed for both surfaces.
 * This module only tracks which workspace is active for the identity picker.
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

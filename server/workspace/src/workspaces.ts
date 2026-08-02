/**
 * Workspace lookup facade over the identity store. `GET /session` reads each
 * of the user's membership workspaces here to surface the human-readable
 * name in the workspace picker.
 */

import { getIdentityStore } from "./identity/store.js";
import type { WorkspaceRecord } from "./identity/types.js";

export type { WorkspaceRecord } from "./identity/types.js";

/** Fetch a single workspace row by id (undefined = stale membership). */
export async function getWorkspace(
  workspaceId: string,
): Promise<WorkspaceRecord | undefined> {
  return getIdentityStore().workspaces.get(workspaceId);
}

/** Fetch multiple workspaces by id; missing ones are omitted. */
export async function getWorkspaces(
  workspaceIds: string[],
): Promise<WorkspaceRecord[]> {
  return getIdentityStore().workspaces.getMany(workspaceIds);
}

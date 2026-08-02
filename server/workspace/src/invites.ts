/**
 * Invite facade over the identity store: token-keyed rows with a 7-day TTL,
 * consumed on accept to mint a membership.
 */

import { getIdentityStore } from "./identity/store.js";
import type { InviteRecord } from "./identity/types.js";

export type { InviteRecord } from "./identity/types.js";

/** Write a new invite row; the returned token goes into the magic link. */
export async function createInvite(
  workspaceId: string,
  email: string,
  role: string,
  groupIds: string[],
  invitedBy: string,
): Promise<InviteRecord> {
  return getIdentityStore().invites.create(workspaceId, email, role, groupIds, invitedBy);
}

/** Fetch an invite by token (undefined when missing or expired). */
export async function getInvite(inviteToken: string): Promise<InviteRecord | undefined> {
  return getIdentityStore().invites.get(inviteToken);
}

/** List all non-expired pending invites for a workspace. */
export async function listInvites(workspaceId: string): Promise<InviteRecord[]> {
  return getIdentityStore().invites.listByWorkspace(workspaceId);
}

/** Delete an invite row (admin revoke). */
export async function revokeInvite(inviteToken: string): Promise<boolean> {
  return getIdentityStore().invites.revoke(inviteToken);
}

/** Consume an invite: delete it and return its data for membership create. */
export async function consumeInvite(inviteToken: string): Promise<InviteRecord | undefined> {
  return getIdentityStore().invites.consume(inviteToken);
}

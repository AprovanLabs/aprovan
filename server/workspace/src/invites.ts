/**
 * Invite facade over the identity store: token-keyed rows with a 7-day TTL,
 * consumed on accept to mint a membership — or, when `target.kind ===
 * "app-instance"`, an F2 instance participant (CF-2) instead.
 */

import { addParticipant } from "./apps/instances.js";
import { getIdentityStore } from "./identity/store.js";
import type { InviteRecord, InviteTarget } from "./identity/types.js";

export type { InviteRecord, InviteTarget } from "./identity/types.js";

/** Distinguishable consume failures (spec: consumed/expired fail distinctly). */
export class InviteConsumeError extends Error {
  constructor(readonly code: "not_found" | "expired") {
    super(code === "expired" ? "Invite expired" : "Invite not found");
    this.name = "InviteConsumeError";
  }
}

function rethrowExpired(err: unknown): never {
  if (err instanceof InviteConsumeError) throw err;
  if (
    err &&
    typeof err === "object" &&
    "code" in err &&
    (err as { code: unknown }).code === "invite_expired"
  ) {
    throw new InviteConsumeError("expired");
  }
  throw err;
}

/** Write a new invite row; the returned token goes into the magic link. */
export async function createInvite(
  workspaceId: string,
  email: string,
  role: string,
  groupIds: string[],
  invitedBy: string,
  target?: InviteTarget,
): Promise<InviteRecord> {
  return getIdentityStore().invites.create(
    workspaceId,
    email,
    role,
    groupIds,
    invitedBy,
    target,
  );
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

/**
 * Consume an invite: delete it and return its data.
 *
 * When `target.kind === "app-instance"`, mints an F2 participant (role from
 * the invite, typically `guest`) via `addParticipant` **before** deleting the
 * token, and does **not** mint a workspace membership — the accept route must
 * skip `putMembership`. `userId` is required for that path. Absent target ⇒
 * prior behavior (return record for the route to create a membership).
 *
 * Throws {@link InviteConsumeError} with `code: "expired"` when the row
 * exists but is past TTL; returns `undefined` when the token is missing
 * (never existed, already consumed, or revoked).
 */
export async function consumeInvite(
  inviteToken: string,
  userId?: string,
): Promise<InviteRecord | undefined> {
  const store = getIdentityStore();

  // Non-expired pending row (get filters TTL). When absent, probe consume so
  // an expired row surfaces as InviteConsumeError("expired") rather than
  // collapsing into not-found.
  const pending = await store.invites.get(inviteToken);
  if (!pending) {
    try {
      return await store.invites.consume(inviteToken);
    } catch (err) {
      rethrowExpired(err);
    }
  }

  if (pending.target?.kind === "app-instance") {
    if (!userId) throw new InviteConsumeError("not_found");
    // Mint first so a failed add leaves the token consumable.
    await addParticipant(
      pending.workspaceId,
      pending.target.installId,
      userId,
      pending.invitedBy || userId,
    );
  }

  try {
    return await store.invites.consume(inviteToken);
  } catch (err) {
    rethrowExpired(err);
  }
}

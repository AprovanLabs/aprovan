/**
 * Verbatim ux.md guest-flow copy (invariant 5 / 6 / 9).
 * Chat supplies copy only — no custom join widget in v1.
 */

/** ux.md Friends install step 4 — unauthenticated interstitial. */
export function signInToJoinCopy(instanceName: string): string {
  return `Sign in to join ${instanceName}`;
}

/** ux.md Friends install step 5 — guest grant summary. */
export function guestOfInstanceCopy(instanceName: string): string {
  return `Guest of ${instanceName} — the channels shared with you, nothing else`;
}

/**
 * ux.md Friends install step 5 — hosted-data disclosure (verbatim).
 * `{Creator}` → display name with sentence-case first letter preserved for the
 * second sentence.
 */
export function hostedGuestDisclosure(creatorDisplayName: string): string {
  const creator = creatorDisplayName.trim() || "the host";
  return `Messages here are stored in ${creator}'s personal space. ${creator} can read, cap, or delete this data.`;
}

/** ux.md Friends install step 7 — expired / consumed / revoked terminal. */
export function inviteNoLongerValidCopy(creatorDisplayName: string): string {
  const creator = creatorDisplayName.trim() || "the host";
  return `This invite is no longer valid. Ask ${creator} for a new one.`;
}

/** Distinct terminal labels (same sentence body; status distinguishes). */
export type InviteTerminalReason = "expired" | "revoked" | "consumed";

export function inviteTerminalCopy(
  reason: InviteTerminalReason,
  creatorDisplayName: string,
): { reason: InviteTerminalReason; message: string } {
  return {
    reason,
    message: inviteNoLongerValidCopy(creatorDisplayName),
  };
}

/** ux.md Adding coworkers step 2 — managed non-member guidance. */
export function managedNonMemberCopy(workspaceName: string): string {
  return `Not a member of ${workspaceName}. Managed chat requires membership — invite them to the workspace first`;
}

/** ux.md Host administration — cap below usage. */
export const CAP_BELOW_USAGE_WARNING =
  "New messages will fail until usage drops below the cap.";

/** ux.md deleted-instance terminal (also InstanceView). */
export const INSTANCE_DELETED_BY_HOST =
  "This instance was deleted by its host.";

/** Inline note on invite create (ux.md Friends install step 3). */
export const INVITE_TTL_NOTE = "Link expires in 7 days.";

/**
 * Guest join card — trusted-shell payload only (invariant 6).
 * Chat supplies copy; the shell renders who/what/buttons. No custom widget v1.
 */

import {
  guestOfInstanceCopy,
  hostedGuestDisclosure,
  inviteTerminalCopy,
  signInToJoinCopy,
  type InviteTerminalReason,
} from "./copy";

export type GuestJoinInput = {
  /** Authenticated platform user (invariant 9). */
  authenticated: boolean;
  /** Invite token status from preview/accept probe. */
  inviteStatus: "pending" | InviteTerminalReason;
  /** Viewer is already an instance participant → skip card. */
  alreadyParticipant?: boolean;
  inviterDisplayName: string;
  creatorDisplayName: string;
  instanceName: string;
  /** Human-readable channel grant summary (e.g. "general, random"). */
  grantedChannelsSummary: string;
  /** Hosting mode of the target instance. */
  hosting: "hosted" | "managed";
};

export type GuestJoinPayload =
  | { kind: "skip"; reason: "already-participant" }
  | { kind: "sign-in"; title: string; message: string }
  | {
      kind: "terminal";
      reason: InviteTerminalReason;
      message: string;
    }
  | {
      kind: "ready";
      inviterDisplayName: string;
      instanceName: string;
      grantedChannelsSummary: string;
      guestSummary: string;
      disclosure: string;
    };

/**
 * Resolve the trusted-shell join payload from invite + auth context.
 * Order: already-participant → unauthenticated → terminal → ready.
 */
export function resolveGuestJoin(input: GuestJoinInput): GuestJoinPayload {
  if (input.alreadyParticipant) {
    return { kind: "skip", reason: "already-participant" };
  }

  if (!input.authenticated) {
    return {
      kind: "sign-in",
      title: signInToJoinCopy(input.instanceName),
      message: signInToJoinCopy(input.instanceName),
    };
  }

  if (input.inviteStatus !== "pending") {
    const terminal = inviteTerminalCopy(
      input.inviteStatus,
      input.creatorDisplayName,
    );
    return {
      kind: "terminal",
      reason: terminal.reason,
      message: terminal.message,
    };
  }

  const disclosure =
    input.hosting === "hosted"
      ? hostedGuestDisclosure(input.creatorDisplayName)
      : // Managed guests shouldn't exist (invariant 5); still disclose workspace fact.
        `Messages here are stored in ${input.instanceName}. Every participant must be a member.`;

  return {
    kind: "ready",
    inviterDisplayName: input.inviterDisplayName,
    instanceName: input.instanceName,
    grantedChannelsSummary: input.grantedChannelsSummary,
    guestSummary: guestOfInstanceCopy(input.instanceName),
    disclosure,
  };
}

/** True when the shell should deep-link past the join card. */
export function shouldSkipJoinCard(payload: GuestJoinPayload): boolean {
  return payload.kind === "skip";
}

/** Sign-in-first gate (invariant 9) — no anonymous join. */
export function requiresSignIn(payload: GuestJoinPayload): boolean {
  return payload.kind === "sign-in";
}

/**
 * Guest join card — sign-in gate, terminal copy, skip, hosted disclosure
 * (stream 8.6 / ux.md Friends install).
 *
 * Imports leaf modules only (no gateway / invites client) so vitest stays
 * free of unbuilt workspace package resolution.
 */

import { describe, expect, it } from "vitest";
import {
  hostedGuestDisclosure,
  inviteNoLongerValidCopy,
  inviteTerminalCopy,
  signInToJoinCopy,
} from "@/features/messaging/guest/copy";
import {
  resolveGuestJoin,
  requiresSignIn,
  shouldSkipJoinCard,
} from "@/features/messaging/guest/join";

const BASE = {
  inviterDisplayName: "Ada",
  creatorDisplayName: "Ada",
  instanceName: "Friends chat",
  grantedChannelsSummary: "general",
  hosting: "hosted" as const,
};

describe("chat-guest-join", () => {
  it("redirects unauthenticated visitors to sign-in before join (invariant 9)", () => {
    const payload = resolveGuestJoin({
      ...BASE,
      authenticated: false,
      inviteStatus: "pending",
    });
    expect(payload.kind).toBe("sign-in");
    expect(requiresSignIn(payload)).toBe(true);
    if (payload.kind === "sign-in") {
      expect(payload.title).toBe(signInToJoinCopy("Friends chat"));
      expect(payload.title).toBe("Sign in to join Friends chat");
    }
  });

  it("shows distinct terminal reasons for expired / revoked / consumed invites", () => {
    for (const reason of ["expired", "revoked", "consumed"] as const) {
      const payload = resolveGuestJoin({
        ...BASE,
        authenticated: true,
        inviteStatus: reason,
      });
      expect(payload.kind).toBe("terminal");
      if (payload.kind === "terminal") {
        expect(payload.reason).toBe(reason);
        expect(payload.message).toBe(inviteNoLongerValidCopy("Ada"));
        expect(inviteTerminalCopy(reason, "Ada")).toEqual({
          reason,
          message: payload.message,
        });
      }
    }
    // Reasons are distinct even though the sentence body is shared.
    const reasons = (["expired", "revoked", "consumed"] as const).map((r) =>
      resolveGuestJoin({ ...BASE, authenticated: true, inviteStatus: r }),
    );
    expect(
      new Set(reasons.map((p) => (p.kind === "terminal" ? p.reason : ""))).size,
    ).toBe(3);
  });

  it("skips the join card when already a participant (deep-link)", () => {
    const payload = resolveGuestJoin({
      ...BASE,
      authenticated: true,
      inviteStatus: "pending",
      alreadyParticipant: true,
    });
    expect(payload).toEqual({ kind: "skip", reason: "already-participant" });
    expect(shouldSkipJoinCard(payload)).toBe(true);
    // Skip wins over unauthenticated — participant already joined.
    const skipUnauth = resolveGuestJoin({
      ...BASE,
      authenticated: false,
      inviteStatus: "pending",
      alreadyParticipant: true,
    });
    expect(shouldSkipJoinCard(skipUnauth)).toBe(true);
  });

  it("hosted disclosure text matches ux.md verbatim (snapshot)", () => {
    const disclosure = hostedGuestDisclosure("Ada");
    expect(disclosure).toMatchInlineSnapshot(
      `"Messages here are stored in Ada's personal space. Ada can read, cap, or delete this data."`,
    );

    const payload = resolveGuestJoin({
      ...BASE,
      authenticated: true,
      inviteStatus: "pending",
    });
    expect(payload.kind).toBe("ready");
    if (payload.kind === "ready") {
      expect(payload.disclosure).toBe(disclosure);
      expect(payload.inviterDisplayName).toBe("Ada");
      expect(payload.instanceName).toBe("Friends chat");
      expect(payload.grantedChannelsSummary).toBe("general");
      expect(payload.guestSummary).toBe(
        "Guest of Friends chat — the channels shared with you, nothing else",
      );
    }
  });
});

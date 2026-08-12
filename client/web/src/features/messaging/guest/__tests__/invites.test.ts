/**
 * Guest invite helpers — expiry countdown, accept error mapping.
 */

import { describe, expect, it } from "vitest";
import { managedNonMemberCopy } from "@/features/messaging/guest/copy";
import {
  formatExpiryCountdown,
  guestInviteUrl,
  inviteRemainingMs,
  terminalReasonFromAcceptError,
} from "@/features/messaging/guest/inviteFormat";

describe("guest/inviteFormat", () => {
  it("formats expiry countdown and remaining ms", () => {
    const now = Date.parse("2026-08-12T12:00:00.000Z");
    expect(inviteRemainingMs("2026-08-12T11:00:00.000Z", now)).toBeLessThanOrEqual(
      0,
    );
    expect(formatExpiryCountdown("2026-08-12T11:00:00.000Z", now)).toBe(
      "Expired",
    );
    expect(formatExpiryCountdown("2026-08-13T14:30:00.000Z", now)).toBe(
      "1d 2h left",
    );
    expect(formatExpiryCountdown("2026-08-12T14:30:00.000Z", now)).toBe(
      "2h 30m left",
    );
  });

  it("builds invite SPA urls", () => {
    expect(guestInviteUrl("tok", "https://app.example")).toBe(
      "https://app.example/invite/tok",
    );
  });

  it("maps accept errors to terminal reasons", () => {
    expect(
      terminalReasonFromAcceptError({ code: "invite_expired", status: 410 }),
    ).toBe("expired");
    expect(
      terminalReasonFromAcceptError({ code: "invite_not_found", status: 404 }),
    ).toBe("consumed");
  });

  it("managed non-member copy matches ux.md", () => {
    expect(managedNonMemberCopy("Acme")).toBe(
      "Not a member of Acme. Managed chat requires membership — invite them to the workspace first",
    );
  });
});

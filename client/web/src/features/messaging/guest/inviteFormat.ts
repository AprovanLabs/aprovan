/**
 * Pure invite URL / expiry helpers (no gateway imports — safe for unit tests).
 */

/** SPA invite URL for out-of-band share (Friends install step 3). */
export function guestInviteUrl(inviteToken: string, origin = ""): string {
  const base =
    origin ||
    (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/invite/${encodeURIComponent(inviteToken)}`;
}

/** Remaining ms until expiry; ≤0 when expired. */
export function inviteRemainingMs(
  expiresAt: string,
  now = Date.now(),
): number {
  const t = Date.parse(expiresAt);
  if (Number.isNaN(t)) return 0;
  return t - now;
}

/** Compact countdown for the pending-invite list. */
export function formatExpiryCountdown(
  expiresAt: string,
  now = Date.now(),
): string {
  const ms = inviteRemainingMs(expiresAt, now);
  if (ms <= 0) return "Expired";
  const totalMin = Math.floor(ms / 60_000);
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin % (60 * 24)) / 60);
  const mins = totalMin % 60;
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${mins}m left`;
  return `${Math.max(1, mins)}m left`;
}

/**
 * Map accept/probe failure into a terminal reason for the join card.
 * Revoked and consumed both surface as not_found on the wire; callers may
 * pass an explicit reason when they know which.
 */
export function terminalReasonFromAcceptError(
  err: unknown,
): "expired" | "consumed" {
  const code =
    err && typeof err === "object" && "code" in err
      ? String((err as { code: unknown }).code)
      : "";
  const status =
    err && typeof err === "object" && "status" in err
      ? Number((err as { status: unknown }).status)
      : 0;
  if (code === "invite_expired" || status === 410) return "expired";
  return "consumed";
}

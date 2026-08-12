/**
 * Client wire types for the review surface (stream 12 `ReviewItem` shape).
 * Mirrored here so the web client does not import the gateway package.
 */

export type ReviewItemKind =
  | "queued-action"
  | "staged-change"
  | "merge-conflict"
  | "capability-request";

export type ReviewDecision =
  | "approve"
  | "deny"
  | "release"
  | "discard"
  | "resolve"
  | "answer";

export type CredentialLevel = "workspace-token" | "workspace-oauth" | "user-oauth";

export type Effect = "observation" | "action";

export type ReviewItemShellData = {
  who: { user: string; app?: string; profile?: string };
  capability?: string;
  resource?: string;
  effect?: Effect;
  credential?: { level: CredentialLevel; label: string };
  decisions: ReviewDecision[];
};

export type ReviewItem = {
  id: string;
  kind: ReviewItemKind;
  sourceId: string;
  cardKind?: "install" | "jit" | "ask" | "draft";
  shell: ReviewItemShellData;
  widget?: { path: string; data?: unknown };
  payloadFallback: unknown;
  expiresAt?: string;
  authority: {
    holder: "invoker" | "admins";
    invokerId: string;
    readOnly?: boolean;
  };
};

/** Fixed badge / sentence copy from ux.md "Credential-level copy rules". */
export const CREDENTIAL_COPY: Record<
  CredentialLevel,
  { badge: string; sentence: string; whoApproves: string }
> = {
  "workspace-token": {
    badge: "Workspace secret",
    sentence: "Acts using a workspace secret — the same for everyone here.",
    whoApproves: "An admin approves once for the whole workspace.",
  },
  "workspace-oauth": {
    badge: "Workspace bot",
    sentence:
      "Acts as the workspace bot — visible to and shared by everyone here, not you personally.",
    whoApproves: "An admin approves once for the whole workspace.",
  },
  "user-oauth": {
    badge: "Your account",
    sentence: "Acts as you — this will appear as you, using your own connection.",
    whoApproves:
      "You connect and approve for yourself; nobody else's approval covers you.",
  },
};

export const CREDENTIAL_NOT_CONNECTED_PROMPT =
  "Connect your account to let this continue as you";

/**
 * Apply a widget/generic-card payload edit to the trusted shell summary.
 * Capability / who / credential / decisions never come from the payload
 * (invariant 6) — only the resource summary may update.
 */
export function applyClientPayloadEdit(
  item: ReviewItem,
  editedPayload: unknown,
): ReviewItem {
  const resource = resourceFromPayload(editedPayload);
  return {
    ...item,
    widget: item.widget
      ? { path: item.widget.path, data: editedPayload }
      : undefined,
    payloadFallback: editedPayload,
    shell: {
      who: item.shell.who,
      capability: item.shell.capability,
      effect: item.shell.effect,
      credential: item.shell.credential,
      decisions: item.shell.decisions,
      resource: resource ?? item.shell.resource,
    },
  };
}

function resourceFromPayload(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return undefined;
  const record = payload as Record<string, unknown>;
  if (typeof record.resource === "string") return record.resource;
  if (typeof record.to === "string") return record.to;
  return undefined;
}

/** Bulk actions only within one (app, capability) group. */
export function bulkGroupKey(item: ReviewItem): string {
  const app = item.shell.who.app ?? "_";
  const cap = item.shell.capability ?? "_";
  return `${app}::${cap}`;
}

export function canBulkAct(selected: ReviewItem[]): boolean {
  if (selected.length === 0) return false;
  const key = bulkGroupKey(selected[0]!);
  return selected.every((item) => bulkGroupKey(item) === key);
}

/** Expiry countdown when under 24h remaining. */
export function expiryCountdown(expiresAt: string | undefined, now = Date.now()): string | null {
  if (!expiresAt) return null;
  const ms = Date.parse(expiresAt) - now;
  if (!Number.isFinite(ms) || ms >= 24 * 60 * 60 * 1000 || ms < 0) return null;
  const mins = Math.ceil(ms / 60_000);
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const rem = mins % 60;
    return rem === 0 ? `${hours}h left` : `${hours}h ${rem}m left`;
  }
  return `${mins}m left`;
}

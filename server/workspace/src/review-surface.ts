/**
 * Review surface projection API (IW-9 C stream 12 / invariant 6).
 *
 * Composes queued actions, staged session changes, merge conflicts, and
 * capability requests into one `ReviewItem` list. Shell is server-authored
 * from authoritative request data; widgets carry payload only. Widget-
 * originated calls re-enter {@link evaluateDispatch}.
 */

import type { CredentialLevel } from "@aprovan/registry-server";
import type { QueuedAction } from "./action-queue.js";
import {
  listCapabilityCards,
  type CapabilityCard,
  type CapabilityCardKind,
} from "./capability-cards.js";
import {
  evaluateDispatch,
  type DispatchDecision,
  type DispatchRequest,
  type Effect,
  type EvaluateDispatchOptions,
} from "./grants.js";
import type { Principal } from "./middleware/auth.js";
import { listSvcRecords, svcScope } from "./svc-records.js";
import {
  changeSummary,
  listSessions,
  type ChatSessionRecord,
  type SessionChangeSummary,
  type SessionConflict,
} from "./vcs/chat-sessions.js";
import { MAIN_REF, readCommit, readRef, readSnapshot } from "./vcs/store.js";

const QUEUE_SCOPE = svcScope("actions", "queue");

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

/** Trusted chrome — never derived from widget output (invariant 6). */
export interface ReviewItemShell {
  who: { user: string; app?: string; profile?: string };
  capability?: string;
  resource?: string;
  effect?: Effect;
  credential?: { level: CredentialLevel; label: string };
  decisions: ReviewDecision[];
}

export interface ReviewItem {
  id: string;
  kind: ReviewItemKind;
  shell: ReviewItemShell;
  widget?: { path: string; data?: unknown };
  payloadFallback: unknown;
  expiresAt?: string;
  /** Who may decide this item (D15 / invariant 1). */
  authority: {
    holder: "invoker" | "admins";
    invokerId: string;
    /** Viewer may see but not decide. */
    readOnly?: boolean;
  };
  /** Capability subtype when `kind === "capability-request"`. */
  cardKind?: CapabilityCardKind;
  /** Underlying record id (queued action / card / session). */
  sourceId: string;
}

export interface ReviewSurfaceQuery {
  workspaceId: string;
  viewer: Pick<Principal, "sub" | "role">;
  kind?: ReviewItemKind;
  /** Admins peek at invoker-owned items without decision buttons. */
  includeReadOnly?: boolean;
}

export interface ReviewSurfaceResult {
  items: ReviewItem[];
  /** Decidable (non-read-only) item count. */
  badgeCount: number;
}

const CREDENTIAL_LABEL: Record<CredentialLevel, string> = {
  "workspace-token": "Workspace secret",
  "workspace-oauth": "Workspace bot",
  "user-oauth": "Your account",
};

export function credentialLevelLabel(level: CredentialLevel): string {
  return CREDENTIAL_LABEL[level];
}

function isWorkspaceCredential(level: CredentialLevel | undefined): boolean {
  return level === "workspace-token" || level === "workspace-oauth";
}

function authorityForCredential(
  level: CredentialLevel | undefined,
  invokerId: string,
): ReviewItem["authority"] {
  if (isWorkspaceCredential(level)) {
    return { holder: "admins", invokerId };
  }
  return { holder: "invoker", invokerId };
}

function authorityForCard(card: CapabilityCard): ReviewItem["authority"] {
  if (card.kind === "ask") {
    return { holder: "invoker", invokerId: card.invokerId };
  }
  if (card.request?.credential?.level) {
    return authorityForCredential(card.request.credential.level, card.invokerId);
  }
  const levels = (card.proposals ?? [])
    .map((p) => p.credentialLevel)
    .filter((l): l is CredentialLevel => l !== undefined);
  if (levels.some(isWorkspaceCredential) || card.kind === "install" || card.kind === "draft") {
    // Install ceiling defaults to workspace-token (admin once for the space).
    if (levels.length === 0 || levels.some(isWorkspaceCredential)) {
      return { holder: "admins", invokerId: card.invokerId };
    }
  }
  return { holder: "invoker", invokerId: card.invokerId };
}

function viewerMayDecide(
  viewer: Pick<Principal, "sub" | "role">,
  authority: ReviewItem["authority"],
): boolean {
  if (authority.holder === "admins") return viewer.role === "admin";
  return viewer.sub === authority.invokerId;
}

function visibilityFor(
  viewer: Pick<Principal, "sub" | "role">,
  authority: ReviewItem["authority"],
  includeReadOnly: boolean,
): { see: boolean; readOnly: boolean } {
  if (viewerMayDecide(viewer, authority)) return { see: true, readOnly: false };
  // Invoker waiting on an admin for a workspace-credential decision.
  if (authority.holder === "admins" && viewer.sub === authority.invokerId) {
    return { see: true, readOnly: true };
  }
  if (includeReadOnly && viewer.role === "admin") {
    return { see: true, readOnly: true };
  }
  return { see: false, readOnly: true };
}

function shellCredential(
  level: CredentialLevel | undefined,
): ReviewItemShell["credential"] | undefined {
  if (!level) return undefined;
  return { level, label: credentialLevelLabel(level) };
}

function whoFromRequest(req: DispatchRequest): ReviewItemShell["who"] {
  return {
    user: req.principal.sub,
    ...(req.via?.appId ? { app: req.via.appId } : {}),
    ...(req.via?.profileId ? { profile: req.via.profileId } : {}),
  };
}

function capabilityFromRequest(req: DispatchRequest): string {
  return `${req.tool.namespace}.${req.tool.operation}`;
}

/** Optional widget override for tests / app-supplied payload hosts. */
export type ReviewWidget = { path: string; data?: unknown };

/**
 * Project a queued action. Shell is built only from `action.request` —
 * widget data never feeds capability / credential / decisions.
 */
export function projectQueuedAction(
  action: QueuedAction,
  widget?: ReviewWidget,
): ReviewItem {
  const req = action.request;
  const authority = authorityForCredential(
    req.credential?.level ?? action.attribution.credential?.level,
    action.attribution.user,
  );
  const decisions: ReviewDecision[] = ["release", "discard"];
  const credential =
    shellCredential(req.credential?.level) ??
    shellCredential(action.attribution.credential?.level);
  return {
    id: `queued-action:${action.id}`,
    kind: "queued-action",
    sourceId: action.id,
    authority,
    expiresAt: action.expiresAt,
    shell: {
      who: whoFromRequest(req),
      capability: capabilityFromRequest(req),
      ...(req.resource !== undefined ? { resource: req.resource } : {}),
      effect: req.tool.effect,
      ...(credential ? { credential } : {}),
      decisions,
    },
    ...(widget ? { widget } : {}),
    payloadFallback: {
      tool: req.tool,
      resource: req.resource,
      args: null,
    },
  };
}

function decisionsForCard(card: CapabilityCard): ReviewDecision[] {
  switch (card.kind) {
    case "ask":
      return ["answer"];
    case "jit":
      return ["release", "discard"];
    case "install":
    case "draft":
      return ["approve", "deny"];
    default:
      return ["approve", "deny"];
  }
}

/**
 * Project a capability card (install / jit / ask / draft). Shell comes from
 * the card + its dispatch request — never from widget content.
 */
export function projectCapabilityCard(
  card: CapabilityCard,
  widget?: ReviewWidget,
): ReviewItem {
  const authority = authorityForCard(card);
  const req = card.request;
  const who: ReviewItemShell["who"] = req
    ? whoFromRequest(req)
    : { user: card.invokerId, ...(card.draft?.originAppId ? { app: card.draft.originAppId } : {}) };

  const capability =
    req !== undefined
      ? capabilityFromRequest(req)
      : card.proposals?.[0]?.capability;

  const effect = req?.tool.effect ?? card.proposals?.[0]?.effect;
  const level =
    req?.credential?.level ??
    card.proposals?.find((p) => p.credentialLevel)?.credentialLevel;

  const payloadFallback =
    card.kind === "ask"
      ? { question: card.question, payload: card.payload }
      : card.kind === "draft" || card.kind === "install"
        ? { proposals: card.proposals, draft: card.draft, blocked: card.blocked }
        : {
            tool: req?.tool,
            resource: req?.resource,
            queuedActionIds: card.queuedActionIds,
            alwaysAsk: card.alwaysAsk,
          };

  return {
    id: `capability-request:${card.id}`,
    kind: "capability-request",
    sourceId: card.id,
    cardKind: card.kind,
    authority,
    shell: {
      who,
      ...(capability !== undefined ? { capability } : {}),
      ...(req?.resource !== undefined ? { resource: req.resource } : {}),
      ...(effect !== undefined ? { effect } : {}),
      ...(shellCredential(level) ? { credential: shellCredential(level) } : {}),
      decisions: decisionsForCard(card),
    },
    ...(widget ? { widget } : {}),
    payloadFallback,
  };
}

function summaryHasChanges(summary: SessionChangeSummary): boolean {
  return (
    summary.added.length > 0 || summary.modified.length > 0 || summary.removed.length > 0
  );
}

/** Read-only conflict peek — does not rebase or mutate the session. */
export async function peekSessionConflicts(
  workspaceId: string,
  session: ChatSessionRecord,
): Promise<SessionConflict[]> {
  if (session.mode !== "staged" || session.status !== "open") return [];
  if (Object.keys(session.overlay).length === 0) return [];
  const main = await readRef(workspaceId, MAIN_REF);
  if (!main || main.commit === session.base) return [];
  const oldCommit = await readCommit(workspaceId, session.base);
  const newCommit = await readCommit(workspaceId, main.commit);
  if (!oldCommit || !newCommit) return [];
  const oldSnap = await readSnapshot(workspaceId, oldCommit.snapshot);
  const newSnap = await readSnapshot(workspaceId, newCommit.snapshot);
  if (!oldSnap || !newSnap) return [];
  const oldHashes = new Map(oldSnap.entries.map((e) => [e.path, e.hash]));
  const newHashes = new Map(newSnap.entries.map((e) => [e.path, e.hash]));
  const conflicts: SessionConflict[] = [];
  for (const [path, staged] of Object.entries(session.overlay)) {
    const before = oldHashes.get(path);
    const now = newHashes.get(path);
    if (before !== now && staged !== now) {
      conflicts.push({
        path,
        ours: staged,
        ...(now !== undefined ? { theirs: now } : {}),
      });
    }
  }
  return conflicts;
}

export function projectStagedChange(
  session: ChatSessionRecord,
  changes: SessionChangeSummary,
  widget?: ReviewWidget,
): ReviewItem {
  return {
    id: `staged-change:${session.id}`,
    kind: "staged-change",
    sourceId: session.id,
    authority: { holder: "invoker", invokerId: session.createdBy },
    shell: {
      who: { user: session.createdBy },
      decisions: ["approve", "discard"],
    },
    ...(widget ? { widget } : {}),
    payloadFallback: {
      title: session.title,
      mode: session.mode,
      changes,
    },
  };
}

export function projectMergeConflict(
  session: ChatSessionRecord,
  conflicts: SessionConflict[],
  widget?: ReviewWidget,
): ReviewItem {
  return {
    id: `merge-conflict:${session.id}`,
    kind: "merge-conflict",
    sourceId: session.id,
    authority: { holder: "invoker", invokerId: session.createdBy },
    shell: {
      who: { user: session.createdBy },
      decisions: ["resolve"],
    },
    ...(widget ? { widget } : {}),
    payloadFallback: {
      title: session.title,
      conflicts,
    },
  };
}

async function listQueuedActions(workspaceId: string): Promise<QueuedAction[]> {
  const rows = await listSvcRecords<QueuedAction>(workspaceId, QUEUE_SCOPE).catch(() => []);
  return rows.map((r) => r.value).filter((a) => a.state === "queued");
}

function applyVisibility(
  item: ReviewItem,
  viewer: Pick<Principal, "sub" | "role">,
  includeReadOnly: boolean,
): ReviewItem | undefined {
  const { see, readOnly } = visibilityFor(viewer, item.authority, includeReadOnly);
  if (!see) return undefined;
  if (!readOnly) return item;
  return {
    ...item,
    authority: { ...item.authority, readOnly: true },
    shell: { ...item.shell, decisions: [] },
  };
}

/**
 * Compose the review surface for a viewer. Filterable by kind; badge counts
 * only decidable (non-read-only) items.
 */
export async function listReviewItems(
  query: ReviewSurfaceQuery,
): Promise<ReviewSurfaceResult> {
  const includeReadOnly = query.includeReadOnly === true;
  const collected: ReviewItem[] = [];

  const [queued, cards, sessions] = await Promise.all([
    listQueuedActions(query.workspaceId),
    listCapabilityCards(query.workspaceId, { state: "pending" }),
    listSessions(query.workspaceId, "open"),
  ]);

  for (const action of queued) {
    const item = applyVisibility(
      projectQueuedAction(action),
      query.viewer,
      includeReadOnly,
    );
    if (item) collected.push(item);
  }

  for (const card of cards) {
    const item = applyVisibility(
      projectCapabilityCard(card),
      query.viewer,
      includeReadOnly,
    );
    if (item) collected.push(item);
  }

  for (const session of sessions) {
    const [changes, conflicts] = await Promise.all([
      changeSummary(query.workspaceId, session),
      peekSessionConflicts(query.workspaceId, session),
    ]);
    if (conflicts.length > 0) {
      const item = applyVisibility(
        projectMergeConflict(session, conflicts),
        query.viewer,
        includeReadOnly,
      );
      if (item) collected.push(item);
    } else if (summaryHasChanges(changes)) {
      const item = applyVisibility(
        projectStagedChange(session, changes),
        query.viewer,
        includeReadOnly,
      );
      if (item) collected.push(item);
    }
  }

  const filtered = query.kind
    ? collected.filter((item) => item.kind === query.kind)
    : collected;

  const badgeCount = filtered.filter((item) => !item.authority.readOnly).length;
  return { items: filtered, badgeCount };
}

/**
 * Extract a resource hint from an edited widget payload (e.g. send-message
 * `to` field). Does not touch capability / credential / who.
 */
function resourceFromPayload(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const record = payload as Record<string, unknown>;
  if (typeof record["resource"] === "string") return record["resource"];
  if (typeof record["to"] === "string") {
    const to = record["to"];
    return to.startsWith("mailto:") ? to : `mailto:${to}`;
  }
  return undefined;
}

/**
 * Apply a widget payload edit: shell summary (resource) re-renders from the
 * edited payload; capability / who / credential / decisions stay authoritative.
 */
export function applyReviewPayloadEdit(
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

/**
 * Widget-originated tool call — always re-enters {@link evaluateDispatch}.
 * Widgets never assert their own authority (invariant 6).
 */
export async function dispatchWidgetCall(
  req: DispatchRequest,
  options?: EvaluateDispatchOptions,
): Promise<DispatchDecision> {
  return evaluateDispatch(req, options);
}

/**
 * Capability approval cards (IW-9 C stream 10 / D9, D12, D15, invariant 11).
 *
 * Install ceiling (static scan vs app.yaml), JIT / always-ask cards,
 * explicit workflow `ask`, and agent draft-not-instantiate. Client review
 * UI is stream 13 — this module is the server card store + accept/decline.
 */

import { randomUUID } from "node:crypto";
import type { CredentialLevel } from "@aprovan/registry-server";
import { scanToolsAccess } from "@utdk/remote/tools-scan";
import {
  countQueuedForRun,
  release,
  type QueuedAction,
} from "./action-queue.js";
import type { DispatchRequest, Effect } from "./grants.js";
import { getRegistryStorage } from "./registry-storage.js";
import { ServiceError } from "./service-kernel.js";
import {
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "./svc-records.js";

const CARDS_SCOPE = svcScope("capabilities", "cards");
const ALWAYS_ASK_SCOPE = svcScope("capabilities", "always-ask");
const DRAFTS_SCOPE = svcScope("capabilities", "drafts");

export type CapabilityCardKind = "install" | "jit" | "ask" | "draft";
export type CapabilityCardState =
  | "pending"
  | "accepted"
  | "declined"
  | "answered"
  | "blocked";

export type CapabilityRowFlag = "undeclared" | "unused";

/** One row on an install / draft ceiling card. */
export interface CapabilityProposal {
  capability: string;
  effect: Effect;
  /** Blocking when undeclared; informational when unused. */
  flag?: CapabilityRowFlag;
  credentialLevel?: CredentialLevel;
}

export interface CapabilityCard {
  id: string;
  kind: CapabilityCardKind;
  workspaceId: string;
  /** D15 — approvals from a run go to the invoker. */
  invokerId: string;
  state: CapabilityCardState;
  createdAt: string;
  /** Install / draft ceiling rows. */
  proposals?: CapabilityProposal[];
  /** True when any undeclared row blocks confirm. */
  blocked?: boolean;
  /** JIT / always-ask dispatch snapshot. */
  request?: DispatchRequest;
  queuedActionIds?: string[];
  queuedCount?: number;
  /** Always-ask acceptance executes but writes no new standing grant. */
  alwaysAsk?: boolean;
  runId?: string;
  turn?: number;
  /** Explicit workflow ask payload. */
  question?: unknown;
  payload?: unknown;
  answer?: unknown;
  /** Agent draft — no install/grant until human confirm. */
  draft?: DraftInstallProposal;
  resolution?: { by: string; at: string };
}

export interface DraftInstallProposal {
  originAppId: string;
  originWorkspaceId?: string;
  slug?: string;
  declaredCapabilities?: string[];
  sources?: string[];
  proposedBy: string;
}

export interface AlwaysAskPolicy {
  appId: string;
  /** App-declared classes (immutable from workspace writes). */
  appDeclared: string[];
  /** Workspace additions only (D12 tighten). */
  workspaceAdded: string[];
}

function capabilityNamespace(capability: string): string {
  const star = capability.indexOf(".*");
  if (star > 0) return capability.slice(0, star);
  const dot = capability.indexOf(".");
  return dot === -1 ? capability : capability.slice(0, dot);
}

function declarationCoversNamespace(declaration: string, namespace: string): boolean {
  if (declaration === "*" || declaration === namespace) return true;
  if (declaration === `${namespace}.*`) return true;
  return declaration.startsWith(`${namespace}.`);
}

async function saveCard(card: CapabilityCard): Promise<void> {
  await writeSvcRecord(card.workspaceId, CARDS_SCOPE, card.id, card, card.invokerId);
}

export async function getCapabilityCard(
  workspaceId: string,
  id: string,
): Promise<CapabilityCard | undefined> {
  return readSvcRecord<CapabilityCard>(workspaceId, CARDS_SCOPE, id).catch(() => undefined);
}

export async function listCapabilityCards(
  workspaceId: string,
  filter?: { invokerId?: string; state?: CapabilityCardState; kind?: CapabilityCardKind },
): Promise<CapabilityCard[]> {
  const rows = await listSvcRecords<CapabilityCard>(workspaceId, CARDS_SCOPE).catch(() => []);
  return rows
    .map((r) => r.value)
    .filter((card) => {
      if (filter?.invokerId && card.invokerId !== filter.invokerId) return false;
      if (filter?.state && card.state !== filter.state) return false;
      if (filter?.kind && card.kind !== filter.kind) return false;
      return true;
    });
}

/**
 * Static-analysis ceiling proposal (D9). Scans sources with
 * {@link scanToolsAccess}, reconciles namespaces against `app.yaml`
 * capability declarations.
 */
export function proposeInstallCeiling(input: {
  workspaceId: string;
  invokerId: string;
  /** App archive source files (JS/TS bodies). */
  sources: string[];
  /** `app.yaml` capabilities (iw9-b). */
  declaredCapabilities: string[];
  credentialLevel?: CredentialLevel;
  kind?: "install" | "draft";
  draft?: DraftInstallProposal;
}): CapabilityCard {
  const scanned = new Set<string>();
  for (const source of input.sources) {
    const { namespaces } = scanToolsAccess(source);
    for (const ns of namespaces) scanned.add(ns);
  }

  const proposals: CapabilityProposal[] = [];
  const level = input.credentialLevel ?? "workspace-token";

  for (const capability of input.declaredCapabilities) {
    const ns = capabilityNamespace(capability);
    if (scanned.has(ns)) {
      proposals.push({
        capability,
        effect: "action",
        credentialLevel: level,
      });
    } else {
      proposals.push({
        capability,
        effect: "action",
        flag: "unused",
        credentialLevel: level,
      });
    }
  }

  for (const ns of scanned) {
    const covered = input.declaredCapabilities.some((d) =>
      declarationCoversNamespace(d, ns),
    );
    if (!covered) {
      proposals.push({
        capability: `${ns}.*`,
        effect: "action",
        flag: "undeclared",
        credentialLevel: level,
      });
    }
  }

  // Stable order: declared (ok/unused) then undeclared.
  proposals.sort((a, b) => {
    const rank = (p: CapabilityProposal) =>
      p.flag === "undeclared" ? 2 : p.flag === "unused" ? 1 : 0;
    const d = rank(a) - rank(b);
    return d !== 0 ? d : a.capability.localeCompare(b.capability);
  });

  const blocked = proposals.some((p) => p.flag === "undeclared");
  const card: CapabilityCard = {
    id: randomUUID(),
    kind: input.kind ?? "install",
    workspaceId: input.workspaceId,
    invokerId: input.invokerId,
    state: blocked ? "blocked" : "pending",
    createdAt: new Date().toISOString(),
    proposals,
    blocked,
    ...(input.draft ? { draft: input.draft } : {}),
  };
  return card;
}

/** Persist a proposed install/draft card (does not write grants). */
export async function saveInstallCard(card: CapabilityCard): Promise<CapabilityCard> {
  await saveCard(card);
  return card;
}

/**
 * Confirm an install/draft ceiling: writes capability-level grants only
 * (`resourcePattern: null`). Undeclared/blocked cards cannot confirm.
 */
export async function confirmInstallCeiling(
  workspaceId: string,
  cardId: string,
  reviewerId: string,
  subject?: { kind: "user" | "group" | "app-install"; id: string },
): Promise<CapabilityCard> {
  const card = await getCapabilityCard(workspaceId, cardId);
  if (!card) throw new ServiceError(`Unknown capability card: ${cardId}`, 404);
  if (card.kind !== "install" && card.kind !== "draft") {
    throw new ServiceError(`Card ${cardId} is not an install/draft card`, 400);
  }
  if (card.blocked || card.state === "blocked") {
    throw new ServiceError(
      `Install blocked: undeclared capability use must be declared in app.yaml or removed from code`,
      400,
    );
  }
  if (card.state !== "pending") {
    throw new ServiceError(`Card ${cardId} is ${card.state}`, 409);
  }

  const store = await getRegistryStorage();
  await store.tenants.ensure(workspaceId);
  const grantSubject = subject ?? { kind: "user" as const, id: reviewerId };

  for (const row of card.proposals ?? []) {
    if (row.flag === "unused" || row.flag === "undeclared") continue;
    await store.resourceGrants.create(workspaceId, {
      subject: grantSubject,
      capability: row.capability,
      resourcePattern: null,
      credentialLevel: row.credentialLevel ?? "workspace-token",
      grantedBy: reviewerId,
    });
  }

  const next: CapabilityCard = {
    ...card,
    state: "accepted",
    resolution: { by: reviewerId, at: new Date().toISOString() },
  };
  await saveCard(next);
  return next;
}

/**
 * Raise a JIT / always-ask card for a miss (or always-ask inside a grant).
 * Does not block a connection — the caller ends the turn.
 */
export async function raiseJitCard(input: {
  workspaceId: string;
  invokerId: string;
  request: DispatchRequest;
  runId?: string;
  turn?: number;
  queuedActionIds?: string[];
  alwaysAsk?: boolean;
  /** Reuse evaluateDispatch's cardId when present. */
  cardId?: string;
}): Promise<CapabilityCard> {
  const queuedCount =
    input.queuedActionIds?.length ??
    (input.runId
      ? await countQueuedForRun(input.workspaceId, input.runId)
      : 0);
  const card: CapabilityCard = {
    id: input.cardId ?? randomUUID(),
    kind: "jit",
    workspaceId: input.workspaceId,
    invokerId: input.invokerId,
    state: "pending",
    createdAt: new Date().toISOString(),
    request: input.request,
    ...(input.queuedActionIds ? { queuedActionIds: input.queuedActionIds } : {}),
    queuedCount,
    ...(input.alwaysAsk ? { alwaysAsk: true } : {}),
    ...(input.runId ? { runId: input.runId } : {}),
    ...(input.turn !== undefined ? { turn: input.turn } : {}),
  };
  await saveCard(card);
  return card;
}

/** Message copy for a result-dependent miss ending the turn. */
export function queuedActionsMessage(n: number): string {
  return `queued ${n} actions`;
}

/**
 * Accept a JIT card: persist a remembered resource grant (unless always-ask),
 * release covered queued actions, optionally resume via callback.
 */
export async function acceptJitCard(
  workspaceId: string,
  cardId: string,
  reviewerId: string,
  opts?: {
    /** Remembered resource pattern (D12). Omit / null → allow-once only. */
    rememberPattern?: string | null;
    resume?: (runId: string) => Promise<void>;
  },
): Promise<{ card: CapabilityCard; released: QueuedAction[] }> {
  const card = await getCapabilityCard(workspaceId, cardId);
  if (!card) throw new ServiceError(`Unknown capability card: ${cardId}`, 404);
  if (card.kind !== "jit") {
    throw new ServiceError(`Card ${cardId} is not a JIT card`, 400);
  }
  if (card.state !== "pending") {
    throw new ServiceError(`Card ${cardId} is ${card.state}`, 409);
  }
  if (!card.request) {
    throw new ServiceError(`Card ${cardId} has no dispatch request`, 500);
  }

  const req = card.request;
  const capability = `${req.tool.namespace}.${req.tool.operation}`;
  const remember =
    opts?.rememberPattern === undefined
      ? (req.resource ?? null)
      : opts.rememberPattern;

  const ids = card.queuedActionIds ?? [];
  const released: QueuedAction[] = [];

  // Always-ask: release/execute only — no new standing grant beyond the existing one.
  if (!card.alwaysAsk) {
    if (ids.length === 0) {
      // Capability-miss JIT: write capability-level (any-resource) grant.
      const store = await getRegistryStorage();
      await store.tenants.ensure(workspaceId);
      const subject =
        req.via?.appId !== undefined
          ? ({ kind: "app-install" as const, id: req.via.appId })
          : ({ kind: "user" as const, id: req.principal.sub });
      await store.resourceGrants.create(workspaceId, {
        subject,
        capability,
        resourcePattern: remember,
        credentialLevel: req.credential?.level ?? "workspace-token",
        grantedBy: reviewerId,
      });
    } else {
      // Resource-miss JIT: release executes once; rememberPattern writes the grant.
      for (const id of ids) {
        try {
          released.push(
            await release(
              workspaceId,
              id,
              reviewerId,
              remember === null ? undefined : remember,
            ),
          );
        } catch (err) {
          if (err instanceof ServiceError && (err.status === 404 || err.status === 409)) {
            continue;
          }
          throw err;
        }
      }
    }
  } else {
    for (const id of ids) {
      try {
        released.push(await release(workspaceId, id, reviewerId));
      } catch (err) {
        if (err instanceof ServiceError && (err.status === 404 || err.status === 409)) {
          continue;
        }
        throw err;
      }
    }
  }

  const next: CapabilityCard = {
    ...card,
    state: "accepted",
    resolution: { by: reviewerId, at: new Date().toISOString() },
  };
  await saveCard(next);

  if (card.runId && opts?.resume) {
    await opts.resume(card.runId);
  }

  return { card: next, released };
}

export async function declineJitCard(
  workspaceId: string,
  cardId: string,
  reviewerId: string,
): Promise<CapabilityCard> {
  const card = await getCapabilityCard(workspaceId, cardId);
  if (!card) throw new ServiceError(`Unknown capability card: ${cardId}`, 404);
  if (card.state !== "pending") {
    throw new ServiceError(`Card ${cardId} is ${card.state}`, 409);
  }
  const next: CapabilityCard = {
    ...card,
    state: "declined",
    resolution: { by: reviewerId, at: new Date().toISOString() },
  };
  await saveCard(next);
  return next;
}

/**
 * Explicit workflow `ask` step (D15): card in the invoker's queue; turn ends.
 */
export async function raiseAskCard(input: {
  workspaceId: string;
  invokerId: string;
  question: unknown;
  payload?: unknown;
  runId?: string;
}): Promise<CapabilityCard> {
  const card: CapabilityCard = {
    id: randomUUID(),
    kind: "ask",
    workspaceId: input.workspaceId,
    invokerId: input.invokerId,
    state: "pending",
    createdAt: new Date().toISOString(),
    question: input.question,
    ...(input.payload !== undefined ? { payload: input.payload } : {}),
    ...(input.runId ? { runId: input.runId } : {}),
  };
  await saveCard(card);
  return card;
}

export async function answerAskCard(
  workspaceId: string,
  cardId: string,
  reviewerId: string,
  answer: unknown,
): Promise<CapabilityCard> {
  const card = await getCapabilityCard(workspaceId, cardId);
  if (!card) throw new ServiceError(`Unknown capability card: ${cardId}`, 404);
  if (card.kind !== "ask") {
    throw new ServiceError(`Card ${cardId} is not an ask card`, 400);
  }
  if (card.state !== "pending") {
    throw new ServiceError(`Card ${cardId} is ${card.state}`, 409);
  }
  const next: CapabilityCard = {
    ...card,
    state: "answered",
    answer,
    resolution: { by: reviewerId, at: new Date().toISOString() },
  };
  await saveCard(next);
  return next;
}

// ---------------------------------------------------------------------------
// Always-ask policy (D12 — workspace tightens only)
// ---------------------------------------------------------------------------

async function loadAlwaysAsk(
  workspaceId: string,
  appId: string,
): Promise<AlwaysAskPolicy> {
  const existing = await readSvcRecord<AlwaysAskPolicy>(
    workspaceId,
    ALWAYS_ASK_SCOPE,
    appId,
  ).catch(() => undefined);
  return (
    existing ?? {
      appId,
      appDeclared: [],
      workspaceAdded: [],
    }
  );
}

/** Record app-declared always-ask classes (from app.yaml / install). */
export async function declareAppAlwaysAsk(
  workspaceId: string,
  appId: string,
  classes: string[],
): Promise<AlwaysAskPolicy> {
  const current = await loadAlwaysAsk(workspaceId, appId);
  const next: AlwaysAskPolicy = {
    ...current,
    appDeclared: [...new Set(classes)],
  };
  await writeSvcRecord(workspaceId, ALWAYS_ASK_SCOPE, appId, next);
  return next;
}

/**
 * Workspace may add always-ask classes or narrow grants, but SHALL NOT clear
 * an app-declared class (D12). Rejects with an error naming the declaration.
 */
export async function setWorkspaceAlwaysAsk(
  workspaceId: string,
  appId: string,
  classes: string[],
): Promise<AlwaysAskPolicy> {
  const current = await loadAlwaysAsk(workspaceId, appId);
  const nextSet = new Set(classes);
  for (const declared of current.appDeclared) {
    if (!nextSet.has(declared)) {
      throw new ServiceError(
        `Workspace policy cannot clear app-declared always-ask class "${declared}" (app ${appId})`,
        400,
      );
    }
  }
  const workspaceAdded = classes.filter((c) => !current.appDeclared.includes(c));
  const next: AlwaysAskPolicy = {
    ...current,
    workspaceAdded,
  };
  await writeSvcRecord(workspaceId, ALWAYS_ASK_SCOPE, appId, next);
  return next;
}

export async function getAlwaysAskPolicy(
  workspaceId: string,
  appId: string,
): Promise<AlwaysAskPolicy> {
  return loadAlwaysAsk(workspaceId, appId);
}

/** Effective always-ask set = appDeclared ∪ workspaceAdded. */
export async function isAlwaysAsk(
  workspaceId: string,
  appId: string | undefined,
  capability: string,
): Promise<boolean> {
  if (!appId) return false;
  const policy = await loadAlwaysAsk(workspaceId, appId);
  const all = new Set([...policy.appDeclared, ...policy.workspaceAdded]);
  if (all.has(capability)) return true;
  if (all.has(`${capabilityNamespace(capability)}.*`)) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Agent draft-not-instantiate (invariant 11)
// ---------------------------------------------------------------------------

/**
 * Agent-reachable install proposal: creates a draft card only. No install,
 * grant, or profile exists until a human confirms the card.
 */
export async function proposeDraftInstall(input: {
  workspaceId: string;
  proposerId: string;
  ownerId: string;
  originAppId: string;
  originWorkspaceId?: string;
  slug?: string;
  sources?: string[];
  declaredCapabilities?: string[];
}): Promise<CapabilityCard> {
  const draft: DraftInstallProposal = {
    originAppId: input.originAppId,
    ...(input.originWorkspaceId ? { originWorkspaceId: input.originWorkspaceId } : {}),
    ...(input.slug ? { slug: input.slug } : {}),
    ...(input.declaredCapabilities
      ? { declaredCapabilities: input.declaredCapabilities }
      : {}),
    ...(input.sources ? { sources: input.sources } : {}),
    proposedBy: input.proposerId,
  };

  // Record the draft payload separately so confirm can prove nothing was
  // installed yet (invariant 11).
  await writeSvcRecord(input.workspaceId, DRAFTS_SCOPE, randomUUID(), {
    ...draft,
    status: "draft",
    createdAt: new Date().toISOString(),
  });

  const card =
    input.sources && input.declaredCapabilities
      ? proposeInstallCeiling({
          workspaceId: input.workspaceId,
          invokerId: input.ownerId,
          sources: input.sources,
          declaredCapabilities: input.declaredCapabilities,
          kind: "draft",
          draft,
        })
      : ({
          id: randomUUID(),
          kind: "draft" as const,
          workspaceId: input.workspaceId,
          invokerId: input.ownerId,
          state: "pending" as const,
          createdAt: new Date().toISOString(),
          draft,
          proposals: (input.declaredCapabilities ?? []).map((capability) => ({
            capability,
            effect: "action" as const,
          })),
          blocked: false,
        } satisfies CapabilityCard);

  await saveCard(card);
  return card;
}

/** True when no resource grants exist yet for the draft's subject/capabilities. */
export async function draftHasNoGrants(
  workspaceId: string,
  cardId: string,
): Promise<boolean> {
  const card = await getCapabilityCard(workspaceId, cardId);
  if (!card?.draft) return true;
  const store = await getRegistryStorage();
  await store.tenants.ensure(workspaceId);
  const caps = new Set(
    (card.proposals ?? [])
      .filter((p) => !p.flag)
      .map((p) => p.capability),
  );
  if (caps.size === 0 && card.draft.declaredCapabilities) {
    for (const c of card.draft.declaredCapabilities) caps.add(c);
  }
  const rows = await store.resourceGrants.list(workspaceId);
  return !rows.some((r) => caps.has(r.capability) && !r.revokedAt);
}

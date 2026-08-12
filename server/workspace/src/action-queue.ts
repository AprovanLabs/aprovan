/**
 * Action exception queue (IW-9 C stream 9 / D12).
 *
 * Out-of-grant **resource** misses persist as `QueuedAction` records under
 * `svc#actions#queue` (same `svcScope` pattern as agents `RUNS_SCOPE`).
 * Capability-level misses never land here — they deny or raise a JIT card.
 *
 * State machine: `queued → released | discarded | expired` (all terminal).
 */

import { randomUUID } from "node:crypto";
import type { CredentialLevel } from "@aprovan/registry-server";
import { getAuditStore } from "./audit.js";
import type { DispatchRequest } from "./grants.js";
import { getRegistryStorage } from "./registry-storage.js";
import { ServiceError } from "./service-kernel.js";
import {
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "./svc-records.js";

const QUEUE_SCOPE = svcScope("actions", "queue");

/** Default TTL — PRD Open Question 1 resolved as 7 days. */
export const QUEUE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type QueuedActionState = "queued" | "released" | "discarded" | "expired";

/**
 * F3 attribution triple: who invoked, through what, under which credential.
 * Approver is stamped on release/discard transitions.
 */
export interface F3AuditTriple {
  user: string;
  via?: { appId?: string; profileId?: string };
  credential?: { level: CredentialLevel; id: string };
  approver?: string;
}

export interface QueuedAction {
  id: string;
  state: QueuedActionState;
  /** Verbatim dispatch request (tool + resource + principal + credential). */
  request: DispatchRequest;
  attribution: F3AuditTriple;
  createdAt: string;
  expiresAt: string;
  /** Present when the miss happened inside an agent/workflow run. */
  runId?: string;
  /** Discard/expiry reason when applicable. */
  reason?: string;
  resolution?: { by: string; at: string; rememberedPattern?: string };
}

/** Invoked once on successful release with the original request. */
export type ReleaseExecutor = (req: DispatchRequest) => Promise<unknown>;

let releaseExecutor: ReleaseExecutor = async () => undefined;

/**
 * Install the one-shot executor used by {@link release}. Production wiring
 * (tool dispatcher) lands in streams 10/12; tests inject a spy.
 */
export function setReleaseExecutor(fn: ReleaseExecutor): void {
  releaseExecutor = fn;
}

export function resetReleaseExecutor(): void {
  releaseExecutor = async () => undefined;
}

/** Latest queued-action id per run — process-local index for {@link queueForChain}. */
const latestByRun = new Map<string, string>();

function attributionFrom(req: DispatchRequest): F3AuditTriple {
  return {
    user: req.principal.sub,
    ...(req.via ? { via: { ...req.via } } : {}),
    ...(req.credential
      ? { credential: { level: req.credential.level, id: req.credential.id } }
      : {}),
  };
}

function auditTransition(
  action: QueuedAction,
  transition: QueuedActionState,
  approver?: string,
): void {
  const attribution: F3AuditTriple = {
    ...action.attribution,
    ...(approver ? { approver } : {}),
  };
  getAuditStore().append({
    requestId: `${action.id}:${transition}`,
    workspaceId: action.request.principal.workspaceId,
    callerId: attribution.user,
    provider: action.request.tool.namespace,
    operation: `queue.${transition}`,
    status: transition === "queued" ? 202 : 200,
    // AuditEntry has no F3 columns yet — encode the triple for stream 9
    // tests / later audit schema extension (tech-plan gap).
    mcp_tool_name: JSON.stringify({
      kind: "queued-action",
      transition,
      attribution,
      resource: action.request.resource,
    }),
  });
}

async function save(action: QueuedAction): Promise<void> {
  await writeSvcRecord(
    action.request.principal.workspaceId,
    QUEUE_SCOPE,
    action.id,
    action,
    action.attribution.user,
  );
}

/**
 * Persist a resource-miss as a queued action. Called from
 * {@link evaluateDispatch}'s queue branch only.
 */
export async function enqueueQueuedAction(req: DispatchRequest): Promise<string> {
  const id = randomUUID();
  const now = Date.now();
  const createdAt = new Date(now).toISOString();
  const expiresAt = new Date(now + QUEUE_TTL_MS).toISOString();
  const action: QueuedAction = {
    id,
    state: "queued",
    request: req,
    attribution: attributionFrom(req),
    createdAt,
    expiresAt,
    ...(req.runContext?.runId ? { runId: req.runContext.runId } : {}),
  };
  await save(action);
  if (action.runId) latestByRun.set(action.runId, id);
  auditTransition(action, "queued");
  return id;
}

export async function getQueuedAction(
  workspaceId: string,
  id: string,
): Promise<QueuedAction | undefined> {
  const action = await readSvcRecord<QueuedAction>(workspaceId, QUEUE_SCOPE, id).catch(
    () => undefined,
  );
  if (!action) return undefined;
  return maybeExpire(action);
}

async function maybeExpire(action: QueuedAction): Promise<QueuedAction> {
  if (action.state !== "queued") return action;
  if (Date.parse(action.expiresAt) > Date.now()) return action;
  return transitionExpired(action);
}

async function transitionExpired(action: QueuedAction): Promise<QueuedAction> {
  const next: QueuedAction = {
    ...action,
    state: "expired",
    reason: "expired",
    resolution: {
      by: "system",
      at: new Date().toISOString(),
    },
  };
  await save(next);
  auditTransition(next, "expired");
  return next;
}

/**
 * Chain-semantics helper for agent runs (wired in stream 10).
 *
 * Returns the latest queued-action id for `runId`. Callers use
 * `resultDependent` to decide whether to continue the turn (fire-and-forget
 * → continue) or end it with "queued N actions" (result-dependent → stop).
 * Never fabricates a result.
 */
export async function queueForChain(
  runId: string,
  resultDependent: boolean,
): Promise<{ queuedActionId: string; continueTurn: boolean }> {
  const queuedActionId = latestByRun.get(runId);
  if (!queuedActionId) {
    throw new ServiceError(`No queued action for run ${runId}`, 404);
  }
  return { queuedActionId, continueTurn: !resultDependent };
}

/** Count still-queued actions for a run (for "queued N actions" copy). */
export async function countQueuedForRun(
  workspaceId: string,
  runId: string,
): Promise<number> {
  const rows = await listSvcRecords<QueuedAction>(workspaceId, QUEUE_SCOPE).catch(() => []);
  let n = 0;
  for (const { value } of rows) {
    const current = await maybeExpire(value);
    if (current.state === "queued" && current.runId === runId) n += 1;
  }
  return n;
}

/**
 * Release: execute original args once (via the installed executor / allow
 * path), mark terminal, optionally remember a resource pattern grant.
 * Second release on a terminal record is a no-op error.
 */
export async function release(
  workspaceId: string,
  id: string,
  reviewerId: string,
  rememberPattern?: string,
): Promise<QueuedAction> {
  const loaded = await getQueuedAction(workspaceId, id);
  if (!loaded) throw new ServiceError(`Queued action ${id} not found`, 404);
  if (loaded.state !== "queued") {
    throw new ServiceError(
      `Queued action ${id} is ${loaded.state}; release is a no-op`,
      409,
    );
  }

  const req = loaded.request;
  if (rememberPattern !== undefined) {
    const store = await getRegistryStorage();
    await store.tenants.ensure(workspaceId);
    const subject =
      req.via?.appId !== undefined
        ? ({ kind: "app-install" as const, id: req.via.appId })
        : ({ kind: "user" as const, id: req.principal.sub });
    await store.resourceGrants.create(workspaceId, {
      subject,
      capability: `${req.tool.namespace}.${req.tool.operation}`,
      resourcePattern: rememberPattern,
      credentialLevel: req.credential?.level ?? "workspace-token",
      grantedBy: reviewerId,
    });

    // Confirm the allow path: capability already cleared at queue time; with
    // the new resource grant, evaluateDispatch must return allow.
    const { evaluateDispatch } = await import("./grants.js");
    const capability = `${req.tool.namespace}.${req.tool.operation}`;
    const decision = await evaluateDispatch(req, {
      invokerPatterns: [capability],
      ...(req.via?.appId ? { appCeiling: [capability] } : {}),
    });
    if (decision.kind !== "allow") {
      throw new ServiceError(
        `Remembered pattern did not open the allow path (got ${decision.kind})`,
        500,
      );
    }
  }

  // One-shot execution of the original request (no simulated result).
  await releaseExecutor(req);

  const next: QueuedAction = {
    ...loaded,
    state: "released",
    attribution: { ...loaded.attribution, approver: reviewerId },
    resolution: {
      by: reviewerId,
      at: new Date().toISOString(),
      ...(rememberPattern !== undefined ? { rememberedPattern: rememberPattern } : {}),
    },
  };
  await save(next);
  auditTransition(next, "released", reviewerId);
  return next;
}

/** Discard: terminal, no execution, no undo. */
export async function discard(
  workspaceId: string,
  id: string,
  reviewerId: string,
): Promise<QueuedAction> {
  const loaded = await getQueuedAction(workspaceId, id);
  if (!loaded) throw new ServiceError(`Queued action ${id} not found`, 404);
  if (loaded.state !== "queued") {
    throw new ServiceError(
      `Queued action ${id} is ${loaded.state}; discard is a no-op`,
      409,
    );
  }
  const next: QueuedAction = {
    ...loaded,
    state: "discarded",
    attribution: { ...loaded.attribution, approver: reviewerId },
    resolution: { by: reviewerId, at: new Date().toISOString() },
  };
  await save(next);
  auditTransition(next, "discarded", reviewerId);
  return next;
}

/** Force-expire a queued action (tests / sweep). No execution. */
export async function expireQueuedAction(
  workspaceId: string,
  id: string,
): Promise<QueuedAction> {
  const loaded = await readSvcRecord<QueuedAction>(workspaceId, QUEUE_SCOPE, id);
  if (!loaded) throw new ServiceError(`Queued action ${id} not found`, 404);
  if (loaded.state !== "queued") {
    throw new ServiceError(`Queued action ${id} is already ${loaded.state}`, 409);
  }
  return transitionExpired(loaded);
}

/** Test helper: clear the process-local run index. */
export function resetQueueForChainIndex(): void {
  latestByRun.clear();
}

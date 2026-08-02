/**
 * The local-host relay: a rendezvous for machines that cannot be dialed.
 *
 * A laptop is behind NAT, asleep half the time, and must not be reachable
 * from the internet — so it dials out, and the gateway holds the queue
 * between the workspace that wants work done and the agent that does it:
 *
 *   provider module ──POST /rpc──►  [ pending op ]  ◄──POST /lease── agent
 *                    ◄─ result ──   [ done op    ]  ──POST /result──►
 *
 * Ops live in the record store rather than in memory on purpose. The gateway
 * runs more than one task in production, and the instance holding an agent's
 * long-poll is rarely the instance that enqueued the op — so the enqueuer
 * polls the store for the answer instead of awaiting an in-process promise.
 * That also makes the queue survive a Fargate Spot reclamation mid-exec: the
 * op is still pending, and the next lease picks it up.
 *
 * TTL is short (ops are work orders, not history) and the enqueuer deletes on
 * completion, so a healthy queue is empty.
 */

import { randomUUID } from "node:crypto";
import { getRecordStore } from "../records.js";
import { ServiceError } from "../service-kernel.js";

const SCOPE = "sandboxops";

/** Ops are work orders; nothing outlives a long exec by much. */
const OP_TTL_SECONDS = 30 * 60;

/** How often the enqueuer re-reads the store while waiting for an answer. */
const POLL_INTERVAL_MS = 250;

/** Longest a lease call parks before answering "nothing yet". */
export const MAX_LEASE_WAIT_MS = 25_000;

export type SandboxOpStatus = "pending" | "leased" | "done";

export interface SandboxOp {
  id: string;
  hostId: string;
  op: string;
  args: Record<string, unknown>;
  status: SandboxOpStatus;
  createdAt: string;
  leasedAt?: string;
  finishedAt?: string;
  data?: unknown;
  error?: string;
  /** Wall-clock budget the agent should honour for this op. */
  timeoutMs: number;
}

const opKey = (hostId: string, id: string): string => `${hostId}/${id}`;

function expiry(): number {
  return Math.floor(Date.now() / 1000) + OP_TTL_SECONDS;
}

async function readOp(
  workspaceId: string,
  hostId: string,
  id: string,
): Promise<SandboxOp | undefined> {
  const entry = await getRecordStore().get(workspaceId, SCOPE, opKey(hostId, id));
  return entry ? (entry.value as SandboxOp) : undefined;
}

async function writeOp(workspaceId: string, op: SandboxOp): Promise<void> {
  await getRecordStore().set(workspaceId, SCOPE, opKey(op.hostId, op.id), op, op.hostId, {
    expiresAtEpochSeconds: expiry(),
  });
}

/**
 * Enqueue one driver operation and wait for the agent's answer.
 *
 * The deadline is the op's own budget plus slack: the agent owns the
 * operation's timeout, and this call has to outlast it or a slow-but-fine
 * `pnpm install` reads as an unreachable host.
 */
export async function dispatchToHost(
  workspaceId: string,
  hostId: string,
  request: { op: string; args: Record<string, unknown>; timeoutMs: number },
): Promise<{ data?: unknown; error?: string }> {
  const op: SandboxOp = {
    id: randomUUID(),
    hostId,
    op: request.op,
    args: request.args,
    status: "pending",
    createdAt: new Date().toISOString(),
    timeoutMs: request.timeoutMs,
  };
  await writeOp(workspaceId, op);

  const deadline = Date.now() + request.timeoutMs + 20_000;
  try {
    for (;;) {
      const current = await readOp(workspaceId, hostId, op.id);
      if (current?.status === "done") {
        return current.error !== undefined
          ? { error: current.error }
          : { data: current.data };
      }
      if (Date.now() > deadline) {
        throw new ServiceError(
          current?.status === "leased"
            ? `Host ${hostId} took the op but never answered within ${request.timeoutMs}ms`
            : `No agent claimed the op — is \`aprovan sandbox host run\` running on ${hostId}?`,
          504,
        );
      }
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }
  } finally {
    await getRecordStore()
      .delete(workspaceId, SCOPE, opKey(hostId, op.id))
      .catch(() => undefined);
  }
}

/**
 * Long-poll for this host's pending ops. Returns as soon as anything is
 * waiting, and after {@link MAX_LEASE_WAIT_MS} otherwise — an empty answer is
 * the agent's cue to poll again, which keeps the connection short enough for
 * every intermediary between a laptop and the gateway.
 *
 * One agent per host is the model. There is no compare-and-set in the record
 * store, so two agents on one registration would race for the same op; the
 * CLI refuses to start a second one against the same host id.
 */
export async function leaseOps(
  workspaceId: string,
  hostId: string,
  options: { maxWaitMs?: number; limit?: number } = {},
): Promise<SandboxOp[]> {
  const store = getRecordStore();
  const deadline = Date.now() + Math.min(options.maxWaitMs ?? MAX_LEASE_WAIT_MS, MAX_LEASE_WAIT_MS);
  const limit = Math.max(1, Math.min(options.limit ?? 8, 32));

  for (;;) {
    const keys = await store.list(workspaceId, SCOPE, `${hostId}/`);
    const leased: SandboxOp[] = [];
    for (const key of keys) {
      if (leased.length >= limit) break;
      const entry = await store.get(workspaceId, SCOPE, key);
      const op = entry?.value as SandboxOp | undefined;
      if (!op || op.status !== "pending") continue;
      op.status = "leased";
      op.leasedAt = new Date().toISOString();
      await writeOp(workspaceId, op);
      leased.push(op);
    }
    if (leased.length > 0) return leased;
    if (Date.now() >= deadline) return [];
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

/** Answer a leased op. Unknown ids are ignored — the enqueuer gave up. */
export async function completeOp(
  workspaceId: string,
  hostId: string,
  result: { id: string; data?: unknown; error?: string },
): Promise<{ accepted: boolean }> {
  const op = await readOp(workspaceId, hostId, result.id);
  if (!op) return { accepted: false };
  op.status = "done";
  op.finishedAt = new Date().toISOString();
  if (result.error !== undefined) op.error = String(result.error);
  else op.data = result.data;
  await writeOp(workspaceId, op);
  return { accepted: true };
}

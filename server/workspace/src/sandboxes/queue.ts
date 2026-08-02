/**
 * Scheduled sandbox runs — work waiting for a capable host to show up.
 *
 * The gateway cannot dial a laptop, and it cannot know when one is awake. So
 * a scheduled run is not *assigned*; it is **offered**, and a host claims it.
 * Claiming is consent, not dispatch: the host says "I am here and I can run
 * this image", and the gateway then drives the run down the ordinary path it
 * uses for any sandbox. The agent never learns to orchestrate, and the
 * scheduler never has to model availability.
 *
 * ## Matching, without inventing a capability language
 *
 * A run needs a *place it can actually run* — "can't run node workloads in a
 * non-Node box" is the whole problem. The image system already answers this:
 * an image declares the `tools` inside it and, per provider, what a host must
 * `require`. So the match key is **the image**, and the queue is keyed by it:
 *
 *     sandboxqueue: <imageKey>/<createdAt>/<runId>  →  SandboxRun
 *
 * A host registers the images it offers; at startup its agent probes for each
 * image's required binaries and the gateway keeps only the ones that actually
 * verified. Claiming then lists one key prefix per verified image — so a Node
 * run is never *seen* by a box without Node, rather than being seen and
 * rejected. `requires.tools` narrows further for runs that need something the
 * image does not promise.
 *
 * Keying by image rather than by tool set is deliberate: a host with
 * `{node, git, python}` satisfies every subset of itself, and enumerating
 * subsets to build prefix keys is exponential. Images are a small, named,
 * shared vocabulary — which is exactly what a match key should be.
 *
 * ## Lifetime
 *
 * The record store holds only work that is *not yet done* — pending, claimed,
 * running (scope `svc#sandboxes#queue`, TTL'd). On completion the entry is
 * deleted and the run is written to run history (`svc#sandboxes#runs`).
 * A healthy queue is empty, and a claim scan stays short.
 */

import { randomUUID } from "node:crypto";
import { getRecordStore } from "../records.js";
import { ServiceError } from "../service-kernel.js";
import { listSvcRecords, svcScope, writeSvcRecord } from "../svc-records.js";
import type { SandboxHostRecord, SandboxMount } from "./store.js";

const SCOPE = svcScope("sandboxes", "queue");
const RUNS_SCOPE = svcScope("sandboxes", "runs");

/** A queued run that nothing ever claims is not a permanent obligation. */
const QUEUE_TTL_SECONDS = 24 * 60 * 60;

/** Longest a claim call parks before answering "nothing for you". */
export const MAX_CLAIM_WAIT_MS = 25_000;

const POLL_INTERVAL_MS = 500;

export type SandboxRunStatus =
  | "pending"
  | "claimed"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface SandboxRun {
  id: string;
  /** Image spec the run needs — the match key. */
  image: string;
  /**
   * Workflow executed inside the sandbox. Absent for agent-only runs, where
   * `agent` names the loop the gateway drives against the sandbox instead.
   */
  workflow?: string;
  input?: unknown;
  mounts: SandboxMount[];
  /** Agent profile the run executes as; its grants bound the whole run. */
  agent?: string;
  /** Run limits forwarded to the agent loop (maxTurns, wallClockMs, …). */
  limits?: Record<string, unknown>;
  /** Draft chat the run's changes land in (created if absent). */
  sessionId?: string;
  /** Extra binaries beyond what the image promises. */
  requires: { tools: string[] };
  status: SandboxRunStatus;
  hostId?: string;
  sandboxId?: string;
  /** The workflow run this produced, for the trace. */
  workflowRunId?: string;
  /** The native agent run this produced, for agent-only runs. */
  agentRunId?: string;
  error?: string;
  createdBy: string;
  createdAt: string;
  claimedAt?: string;
  finishedAt?: string;
}

/**
 * Record-store keys are `/`-segmented, and an image spec contains both `@`
 * and `/`. Flatten it to one segment so the prefix scan stays exact.
 */
export function imageKey(image: string): string {
  return image.replace(/^@/u, "").replaceAll("/", "~");
}

const queueKey = (run: SandboxRun): string =>
  `${imageKey(run.image)}/${run.createdAt}/${run.id}`;

function expiry(): number {
  return Math.floor(Date.now() / 1000) + QUEUE_TTL_SECONDS;
}

async function writeQueued(workspaceId: string, run: SandboxRun): Promise<void> {
  await getRecordStore().set(workspaceId, SCOPE, queueKey(run), run, run.createdBy, {
    expiresAtEpochSeconds: expiry(),
  });
}

// ---------------------------------------------------------------------------
// Enqueue / cancel
// ---------------------------------------------------------------------------

export async function enqueueRun(
  workspaceId: string,
  run: Omit<SandboxRun, "id" | "status" | "createdAt">,
): Promise<SandboxRun> {
  const queued: SandboxRun = {
    ...run,
    id: `sbr_${randomUUID().replaceAll("-", "").slice(0, 20)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  await writeQueued(workspaceId, queued);
  return queued;
}

export async function readQueuedRun(
  workspaceId: string,
  id: string,
): Promise<SandboxRun | undefined> {
  for (const key of await getRecordStore().list(workspaceId, SCOPE)) {
    if (!key.endsWith(`/${id}`)) continue;
    const entry = await getRecordStore().get(workspaceId, SCOPE, key);
    if (entry) return entry.value as SandboxRun;
  }
  return undefined;
}

export async function updateQueuedRun(workspaceId: string, run: SandboxRun): Promise<void> {
  await writeQueued(workspaceId, run);
}

/**
 * Move a run out of the queue and into history. Terminal states are the only
 * ones that leave the record store, which is what keeps claim scans cheap.
 */
export async function finishRun(
  workspaceId: string,
  run: SandboxRun,
  outcome: {
    status: "succeeded" | "failed" | "cancelled";
    error?: string;
    workflowRunId?: string;
    agentRunId?: string;
  },
): Promise<SandboxRun> {
  const finished: SandboxRun = {
    ...run,
    status: outcome.status,
    ...(outcome.error ? { error: outcome.error } : {}),
    ...(outcome.workflowRunId ? { workflowRunId: outcome.workflowRunId } : {}),
    ...(outcome.agentRunId ? { agentRunId: outcome.agentRunId } : {}),
    finishedAt: new Date().toISOString(),
  };
  await writeSvcRecord(workspaceId, RUNS_SCOPE, finished.id, finished, finished.createdBy);
  await getRecordStore()
    .delete(workspaceId, SCOPE, queueKey(run))
    .catch(() => undefined);
  return finished;
}

export async function listRuns(
  workspaceId: string,
  options: { status?: SandboxRunStatus; limit?: number } = {},
): Promise<SandboxRun[]> {
  const store = getRecordStore();
  const runs: SandboxRun[] = [];
  for (const key of await store.list(workspaceId, SCOPE)) {
    const entry = await store.get(workspaceId, SCOPE, key);
    if (entry) runs.push(entry.value as SandboxRun);
  }
  const history = await listSvcRecords<SandboxRun>(workspaceId, RUNS_SCOPE).catch(() => []);
  for (const entry of history) runs.push(entry.value);
  return runs
    .filter((run) => !options.status || run.status === options.status)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, options.limit ?? 100);
}

// ---------------------------------------------------------------------------
// Capability matching
// ---------------------------------------------------------------------------

/** The images a host actually verified, else the ones it merely declared. */
export function hostImages(host: SandboxHostRecord): string[] {
  return host.verifiedImages ?? host.images ?? [];
}

/**
 * May this host take this run? The image match is already implied by the key
 * prefix; this is the second gate, for runs asking for something beyond what
 * the image promises.
 */
export function hostSatisfies(host: SandboxHostRecord, run: SandboxRun): boolean {
  if (!hostImages(host).includes(run.image)) return false;
  if (run.requires.tools.length === 0) return true;
  const present = new Set(host.tools ?? []);
  return run.requires.tools.every((tool) => present.has(tool));
}

// ---------------------------------------------------------------------------
// Claim
// ---------------------------------------------------------------------------

/**
 * Long-poll for the oldest pending run this host can take.
 *
 * The record store has no compare-and-set, so two agents on one registration
 * could flip the same entry. The read-back guard below closes that: after
 * writing, re-read and keep the run only if this host is still the claimant.
 * One agent per host remains the model — this is a safety net, not a licence
 * to run two.
 */
export async function claimRun(
  workspaceId: string,
  host: SandboxHostRecord,
  options: { maxWaitMs?: number } = {},
): Promise<SandboxRun | undefined> {
  const images = hostImages(host);
  if (images.length === 0) return undefined;
  const store = getRecordStore();
  const deadline = Date.now() + Math.min(options.maxWaitMs ?? MAX_CLAIM_WAIT_MS, MAX_CLAIM_WAIT_MS);

  for (;;) {
    for (const image of images) {
      // One prefix per offered image: a run this host cannot take is never
      // even listed.
      const keys = (await store.list(workspaceId, SCOPE, `${imageKey(image)}/`)).sort();
      for (const key of keys) {
        const entry = await store.get(workspaceId, SCOPE, key);
        const run = entry?.value as SandboxRun | undefined;
        if (!run || run.status !== "pending" || !hostSatisfies(host, run)) continue;

        const claimed: SandboxRun = {
          ...run,
          status: "claimed",
          hostId: host.id,
          claimedAt: new Date().toISOString(),
        };
        await writeQueued(workspaceId, claimed);
        const readBack = (await store.get(workspaceId, SCOPE, key))?.value as
          | SandboxRun
          | undefined;
        if (readBack?.hostId === host.id) return readBack;
      }
    }
    if (Date.now() >= deadline) return undefined;
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

export function requireRunnableWorkflow(name: unknown): string {
  if (typeof name !== "string" || !name.trim()) {
    throw new ServiceError(
      "schedule requires { workflow } or { agent } — the work to run in the sandbox",
      400,
    );
  }
  return name;
}

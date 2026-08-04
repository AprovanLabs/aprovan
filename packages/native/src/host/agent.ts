/**
 * The host agent: the loop `aprovan sandbox host run` spends its life in.
 *
 * Nothing listens on this machine. Every connection is outbound, which is
 * what makes a laptop usable as a sandbox host at all. Two loops run
 * concurrently against the gateway relay:
 *
 *   lease  ── work for sandboxes that already exist: exec, files, listings.
 *   claim  ── *scheduled* runs waiting for a capable host to become
 *             available. Claiming is consent, not dispatch: the agent says
 *             "I am awake and I can run this image", and the gateway then
 *             drives the run through the ordinary lease loop. The agent
 *             never learns how to orchestrate a run, and the gateway never
 *             has to guess when a laptop is asleep.
 *
 * Capability matching is the image system doing its second job. At startup
 * the agent asks the gateway what binaries the host's declared images need,
 * probes for them, and reports back; the gateway keeps only the images this
 * machine actually satisfies and offers it nothing else. A Node workload can
 * never be claimed by a box without Node — not by convention, but because the
 * queue is keyed by image and this machine was never registered against that
 * key.
 *
 * Ops within one lease run concurrently: a lease can carry a slow `pnpm
 * install` and a one-line `readFile`, and serializing them would make every
 * manifest read wait on whatever build is in flight.
 *
 * Failures are reported, never swallowed. An op that throws comes back as
 * `{ error }` so the workspace sees the real message instead of waiting out
 * the deadline for an answer that never arrives.
 */

import { LocalExecutor } from "./executor.js";

interface LeasedOp {
  id: string;
  op: string;
  args: Record<string, unknown>;
  timeoutMs: number;
}

interface ClaimedRun {
  id: string;
  image: string;
  workflow: string;
}

export interface AgentOptions {
  relayUrl: string;
  hostToken: string;
  root: string;
  log: (message: string) => void;
  /** Test seam / graceful shutdown. */
  signal?: AbortSignal;
}

/** Backoff bounds for a gateway that is down or unreachable. */
const MIN_BACKOFF_MS = 1_000;
const MAX_BACKOFF_MS = 30_000;

export async function runAgent(options: AgentOptions): Promise<void> {
  const executor = new LocalExecutor({ root: options.root, log: options.log });
  await executor.init();
  options.log(`agent ready — root ${options.root}`);

  await Promise.all([leaseLoop(options, executor), claimLoop(options, executor)]);
  options.log("agent stopped");
}

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

async function post<T>(options: AgentOptions, path: string, body: unknown): Promise<T> {
  const response = await fetch(`${options.relayUrl}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.hostToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    ...(options.signal ? { signal: options.signal } : {}),
  });
  if (response.status === 401) {
    throw new Error("host token rejected — re-register this machine");
  }
  if (!response.ok) {
    throw new Error(`${path} failed (${response.status})`);
  }
  return (await response.json()) as T;
}

// ---------------------------------------------------------------------------
// Lease: work for sandboxes that already exist
// ---------------------------------------------------------------------------

async function leaseLoop(options: AgentOptions, executor: LocalExecutor): Promise<void> {
  let backoff = MIN_BACKOFF_MS;
  while (!options.signal?.aborted) {
    let ops: LeasedOp[] = [];
    try {
      ops = (await post<{ ops?: LeasedOp[] }>(options, "lease", {})).ops ?? [];
      backoff = MIN_BACKOFF_MS;
    } catch (err) {
      if (options.signal?.aborted) break;
      options.log(`lease error: ${message(err)}`);
      await sleep(backoff, options.signal);
      backoff = Math.min(backoff * 2, MAX_BACKOFF_MS);
      continue;
    }

    await Promise.all(
      ops.map(async (op) => {
        try {
          await answer(options, op.id, { data: await executor.run(op.op, op.args) });
        } catch (err) {
          await answer(options, op.id, { error: message(err) });
        }
      }),
    );
  }
}

async function answer(
  options: AgentOptions,
  id: string,
  body: { data?: unknown } | { error: string },
): Promise<void> {
  try {
    await post(options, "result", { id, ...body });
  } catch (err) {
    // The workspace times out on its own; log so the operator can see why.
    options.log(`result error: ${message(err)}`);
  }
}

// ---------------------------------------------------------------------------
// Claim: scheduled runs waiting for a capable host
// ---------------------------------------------------------------------------

async function claimLoop(options: AgentOptions, executor: LocalExecutor): Promise<void> {
  const images = await advertise(options, executor);
  if (images.length === 0) {
    options.log("no runnable images — this machine will not take scheduled runs");
    return;
  }
  options.log(`offering scheduled runs for: ${images.join(", ")}`);

  let backoff = MIN_BACKOFF_MS;
  while (!options.signal?.aborted) {
    try {
      const { run } = await post<{ run: ClaimedRun | null }>(options, "claim", {});
      backoff = MIN_BACKOFF_MS;
      if (run) options.log(`claimed run ${run.id} — ${run.workflow} on ${run.image}`);
    } catch (err) {
      if (options.signal?.aborted) break;
      options.log(`claim error: ${message(err)}`);
      await sleep(backoff, options.signal);
      backoff = Math.min(backoff * 2, MAX_BACKOFF_MS);
    }
  }
}

/**
 * The capability handshake, in two steps because neither side can answer
 * alone: the gateway knows which images this host was registered against and
 * what each one requires, the machine knows what is actually installed. So
 * the gateway asks for a probe list and the machine answers with what it
 * found.
 */
async function advertise(options: AgentOptions, executor: LocalExecutor): Promise<string[]> {
  try {
    const { probe } = await post<{ probe: string[] }>(options, "advert", {});
    const tools: string[] = [];
    for (const binary of probe) {
      if (await executor.hasBinary(binary)) tools.push(binary);
      else options.log(`missing: ${binary}`);
    }
    const { images } = await post<{ images: string[] }>(options, "advert", {
      tools,
      platform: `${process.platform}/${process.arch}`,
    });
    return images;
  } catch (err) {
    options.log(`advert error: ${message(err)} — scheduled runs disabled`);
    return [];
  }
}

// ---------------------------------------------------------------------------

const message = (err: unknown): string => (err instanceof Error ? err.message : String(err));

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

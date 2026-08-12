/**
 * Persisted run-event log + in-process live fan-out for native agent runs.
 *
 * Persistence is universal: the runner calls {@link appendRunEvents} from its
 * own lifecycle, so every native run (chat, self-heal, api, test) has a
 * gapless log on its record. {@link subscribeRunEvents} is the live sink
 * stream 3 tails after replay; it never decides whether events are recorded.
 */

import type { RunEvent } from "@aprovan/agent-protocol";
import { readSvcRecord, svcScope, writeSvcRecord } from "../svc-records.js";
import type { StoredAgentRun } from "./runner.js";

const RUNS_SCOPE = svcScope("agents", "runs");

/** A run event before the store assigns its gapless `seq`. */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type RunEventInput = DistributiveOmit<RunEvent, "seq">;

type Subscriber = (event: RunEvent) => void;

const subscribers = new Map<string, Set<Subscriber>>();

/**
 * Assign gapless `seq` values, append onto the run record in one write, and
 * fan out to in-process subscribers. `seq` starts at 0 for a fresh run.
 */
export async function appendRunEvents(
  workspaceId: string,
  runId: string,
  events: RunEventInput[],
): Promise<RunEvent[]> {
  if (events.length === 0) return [];

  const record = await readSvcRecord<StoredAgentRun>(workspaceId, RUNS_SCOPE, runId);
  if (!record) {
    throw new Error(`Unknown agent run: ${runId}`);
  }

  let nextSeq = typeof record.lastSeq === "number" ? record.lastSeq + 1 : 0;
  const sequenced: RunEvent[] = events.map((event) => {
    const withSeq = { ...event, seq: nextSeq } as RunEvent;
    nextSeq += 1;
    return withSeq;
  });

  const merged = [...(record.events ?? []), ...sequenced];
  record.events = merged;
  record.lastSeq = sequenced[sequenced.length - 1]!.seq;
  await writeSvcRecord(workspaceId, RUNS_SCOPE, runId, record);

  const live = subscribers.get(runId);
  if (live) {
    for (const event of sequenced) {
      for (const cb of live) {
        try {
          cb(event);
        } catch {
          // A misbehaving subscriber must not kill the run.
        }
      }
    }
  }

  return sequenced;
}

/** Replay persisted events with `seq >= from` (inclusive). */
export async function readRunEvents(
  workspaceId: string,
  runId: string,
  from = 0,
): Promise<RunEvent[]> {
  const record = await readSvcRecord<StoredAgentRun>(workspaceId, RUNS_SCOPE, runId);
  if (!record?.events) return [];
  return record.events.filter((event) => event.seq >= from);
}

/** In-process live fan-out for a single gateway task (no cross-process bus). */
export function subscribeRunEvents(runId: string, cb: Subscriber): () => void {
  let set = subscribers.get(runId);
  if (!set) {
    set = new Set();
    subscribers.set(runId, set);
  }
  set.add(cb);
  return () => unsubscribeRunEvents(runId, cb);
}

export function unsubscribeRunEvents(runId: string, cb: Subscriber): void {
  const set = subscribers.get(runId);
  if (!set) return;
  set.delete(cb);
  if (set.size === 0) subscribers.delete(runId);
}

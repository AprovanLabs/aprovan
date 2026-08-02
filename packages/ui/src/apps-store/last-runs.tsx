/**
 * Last-run status, fetched on demand and shared by every row that asks for it.
 *
 * The grouped list wants a status dot per workflow, but a workspace can hold
 * hundreds of workflows and `workflows.runs` is one call each. So rows *ask*
 * for their last run (`useLastRun`) and this provider answers from a cache,
 * queueing misses at most six at a time. Only rendered rows ask, and the list
 * is paginated, so the cost is bounded by what's on screen rather than by the
 * size of the workspace.
 *
 * A gateway that inlines `lastRun` on `workflows.list` short-circuits all of
 * this — `seed` puts those records in the cache and nothing is ever fetched.
 */

import * as React from "react";
import { attempt, normalizeRunSummary, unwrapList, type ToolsInvoke, type WorkflowRunSummary } from "./wire";

interface LastRunStore {
  get: (name: string) => WorkflowRunSummary | null | undefined;
  request: (name: string) => void;
  put: (name: string, run: WorkflowRunSummary | null) => void;
  version: number;
}

const LastRunContext = React.createContext<LastRunStore | null>(null);

const MAX_IN_FLIGHT = 6;

export function LastRunProvider({
  invoke,
  seed,
  children,
}: {
  invoke: ToolsInvoke;
  /** Records already known from `workflows.list`, keyed by workflow name. */
  seed?: ReadonlyMap<string, WorkflowRunSummary | null>;
  children: React.ReactNode;
}) {
  const cache = React.useRef(new Map<string, WorkflowRunSummary | null>());
  const pending = React.useRef(new Set<string>());
  const queue = React.useRef<string[]>([]);
  const inFlight = React.useRef(0);
  const [version, setVersion] = React.useState(0);

  // Seeded records win: they arrived with the listing, so they're free.
  React.useEffect(() => {
    if (!seed || seed.size === 0) return;
    let changed = false;
    for (const [name, run] of seed) {
      if (!cache.current.has(name)) {
        cache.current.set(name, run);
        changed = true;
      }
    }
    if (changed) setVersion((n) => n + 1);
  }, [seed]);

  const pump = React.useCallback(() => {
    while (inFlight.current < MAX_IN_FLIGHT && queue.current.length > 0) {
      const name = queue.current.shift();
      if (!name) break;
      inFlight.current += 1;
      void attempt(() => invoke("runs", { name, limit: 1 }))
        .then((result) => {
          const first = result.ok ? unwrapList(result.value, "runs")[0] : undefined;
          cache.current.set(name, normalizeRunSummary(first));
        })
        .catch(() => {
          cache.current.set(name, null);
        })
        .finally(() => {
          inFlight.current -= 1;
          pending.current.delete(name);
          setVersion((n) => n + 1);
          pump();
        });
    }
  }, [invoke]);

  const store = React.useMemo<LastRunStore>(
    () => ({
      version,
      get: (name) => cache.current.get(name),
      put: (name, run) => {
        cache.current.set(name, run);
        setVersion((n) => n + 1);
      },
      request: (name) => {
        if (cache.current.has(name) || pending.current.has(name)) return;
        pending.current.add(name);
        queue.current.push(name);
        pump();
      },
    }),
    [pump, version],
  );

  return <LastRunContext.Provider value={store}>{children}</LastRunContext.Provider>;
}

/**
 * The workflow's most recent run, or `undefined` while unknown. Safe to call
 * outside a provider — it simply never resolves to anything.
 */
export function useLastRun(name: string): WorkflowRunSummary | null | undefined {
  const store = React.useContext(LastRunContext);
  React.useEffect(() => {
    store?.request(name);
  }, [store, name]);
  return store?.get(name);
}

/** Record a run the user just triggered, so the dot updates without a refetch. */
export function useRecordRun(): (name: string, run: WorkflowRunSummary | null) => void {
  const store = React.useContext(LastRunContext);
  return React.useCallback((name, run) => store?.put(name, run), [store]);
}

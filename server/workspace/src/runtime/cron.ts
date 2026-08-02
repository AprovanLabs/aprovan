/**
 * The minute tick that drives cron-triggered workflows.
 *
 * One scheduler, both modes. Previously AWS had EventBridge POST a
 * hand-assembled Function-URL event at `/hooks/cron/tick` while local mode ran
 * a bare `setInterval` — two mechanisms for one behaviour, only one of which
 * was exercised by tests. A persistent process needs neither: it can just keep
 * time, provided it first agrees with its peers about who is keeping it (see
 * ./leader.ts).
 *
 * The interval is aligned to the top of each wall-clock minute rather than to
 * process start, because `cronMatches` compares against the current UTC
 * minute: a tick that drifts to :59.6 would evaluate the wrong minute.
 */

import { runCronTick } from "../routes/hooks.js";
import { LeaderLease } from "./leader.js";

export interface CronScheduler {
  /** True when this process currently owns the tick. */
  isLeader(): boolean;
  /** Stop ticking and release the lease. */
  stop(): Promise<void>;
}

export function startCronScheduler(): CronScheduler {
  const lease = new LeaderLease("cron");
  lease.start();

  let timer: NodeJS.Timeout | undefined;
  let stopped = false;

  const tick = (): void => {
    if (stopped || !lease.held()) return;
    void runCronTick().catch(() => undefined);
  };

  const scheduleNextMinute = (): void => {
    if (stopped) return;
    const now = Date.now();
    // +50ms of slack so we land just after the boundary, never just before.
    const delay = 60_000 - (now % 60_000) + 50;
    timer = setTimeout(() => {
      tick();
      scheduleNextMinute();
    }, delay);
    timer.unref?.();
  };

  scheduleNextMinute();

  return {
    isLeader: () => lease.held(),
    async stop() {
      stopped = true;
      if (timer) clearTimeout(timer);
      await lease.release();
    },
  };
}

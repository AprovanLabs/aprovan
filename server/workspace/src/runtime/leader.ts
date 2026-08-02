/**
 * Single-writer election for background work.
 *
 * The cron tick must fire exactly once per minute across the whole
 * deployment, not once per process. On Lambda that was enforced by the shape
 * of the platform — EventBridge delivered one synthetic request and there was
 * nothing else to coordinate. A long-lived server has no such guarantee: two
 * tasks during a rolling deploy, or a second replica, would each run every
 * cron workflow.
 *
 * So the tick is guarded by a lease instead. A process holds the lease by
 * writing its own id with an expiry into the record store; it may only take
 * the lease if the current holder's expiry has passed. Because both record
 * store backends are strongly consistent for a read-then-write of a single
 * key, and because the lease is renewed at a third of its lifetime, the
 * failure mode of a lost race is "nobody ticks for up to 90 seconds", never
 * "everybody ticks at once".
 *
 * The same code runs in local mode against SQLite, so a laptop with two
 * `workspace start` processes pointed at one data directory behaves the way
 * production does — which is the only way this stays correct.
 */

import { randomUUID } from "node:crypto";
import { getRecordStore } from "../records.js";

/** Records live outside any real workspace, in the runtime's own tenancy. */
const LEASE_TENANT = "_runtime";
const LEASE_SCOPE = "leader";

/** How long a lease survives without renewal. */
export const LEASE_TTL_MS = 90_000;
/** Renewal cadence — a third of the TTL, so two misses are survivable. */
export const LEASE_RENEW_MS = 30_000;

interface LeaseRecord {
  holder: string;
  expiresAt: number;
}

function isLease(value: unknown): value is LeaseRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as LeaseRecord).holder === "string" &&
    typeof (value as LeaseRecord).expiresAt === "number"
  );
}

/**
 * A lease over one named responsibility. `held()` is the only question
 * callers ask; everything else is lifecycle.
 */
export class LeaderLease {
  /** Identity of this process, so a holder can recognise its own lease. */
  readonly holder = `${process.pid}-${randomUUID().slice(0, 8)}`;

  private timer: NodeJS.Timeout | undefined;
  private hasLease = false;

  constructor(private readonly name: string) {}

  held(): boolean {
    return this.hasLease;
  }

  /** Try to take or renew the lease. Returns whether it is held afterwards. */
  async acquire(now = Date.now()): Promise<boolean> {
    const store = getRecordStore();
    const current = await store
      .get(LEASE_TENANT, LEASE_SCOPE, this.name)
      .catch(() => undefined);
    const lease = isLease(current?.value) ? current.value : undefined;

    const mine = lease?.holder === this.holder;
    const vacant = !lease || lease.expiresAt <= now;
    if (!mine && !vacant) {
      this.hasLease = false;
      return false;
    }

    const expiresAt = now + LEASE_TTL_MS;
    await store.set(
      LEASE_TENANT,
      LEASE_SCOPE,
      this.name,
      { holder: this.holder, expiresAt } satisfies LeaseRecord,
      this.holder,
      // Let the store reclaim abandoned leases on its own (DynamoDB TTL /
      // SQLite lazy purge) so a workspace that stops running leaves nothing
      // behind. Generous relative to the TTL: expiry of the *record* is
      // cleanup, expiry of the *lease* is what elections read.
      { expiresAtEpochSeconds: Math.floor((expiresAt + LEASE_TTL_MS) / 1000) },
    );
    this.hasLease = true;
    return true;
  }

  /**
   * Start renewing in the background. Contenders keep polling at the same
   * cadence, so a dead holder is replaced within one TTL.
   */
  start(): void {
    if (this.timer) return;
    void this.acquire().catch(() => undefined);
    this.timer = setInterval(() => {
      void this.acquire().catch(() => {
        // A failed renewal must not leave us believing we still hold it.
        this.hasLease = false;
      });
    }, LEASE_RENEW_MS);
    this.timer.unref?.();
  }

  /**
   * Stop renewing and hand the lease back immediately. Called on SIGTERM so
   * a replacement task takes over in about a second instead of waiting out
   * the TTL — the difference between a deploy that skips a cron minute and
   * one that doesn't.
   */
  async release(): Promise<void> {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    if (!this.hasLease) return;
    this.hasLease = false;
    await getRecordStore()
      .delete(LEASE_TENANT, LEASE_SCOPE, this.name)
      .catch(() => undefined);
  }
}

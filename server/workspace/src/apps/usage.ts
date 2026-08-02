/**
 * Per-(app, user) daily usage metering.
 *
 * The rps/burst limiter protects against bursts within one process; this is
 * the durable complement — a per-day call budget that survives instance
 * churn because it lives in the record store
 * (`svc#apps#usage#<app>` / `<sub>/<yyyy-mm-dd>`), expiring via record TTL.
 *
 * The read-modify-write is not atomic, so concurrent calls can undercount
 * slightly — fine for a fairness budget, which is what daily limits are.
 */

import { getRecordStore } from "../records.js";
import { svcScope, SVC_SYSTEM_USER } from "../svc-records.js";
import type { AppManifest } from "./store.js";

/** Daily call budget per user when the manifest doesn't set one. */
export const DEFAULT_DAILY_CALLS = 1_000;

export interface DailyUsage {
  allowed: boolean;
  used: number;
  limit: number;
  /** ISO date the budget resets after (UTC midnight). */
  date: string;
}

function usageKey(sub: string, date: string): string {
  // Escape separators in subs (Cognito subs are uuid-ish, but be safe).
  const safeSub = sub.replace(/[^A-Za-z0-9_-]/gu, "_");
  return `${safeSub}/${date}`;
}

/**
 * Count one call against the caller's daily budget; `allowed: false` means
 * the call should be rejected (the count is not incremented past the limit).
 */
export async function countDailyCall(
  workspaceId: string,
  manifest: AppManifest,
  sub: string,
): Promise<DailyUsage> {
  const limit = manifest.rateLimit?.daily ?? DEFAULT_DAILY_CALLS;
  const date = new Date().toISOString().slice(0, 10);
  const scope = svcScope("apps", "usage", manifest.name);
  const key = usageKey(sub, date);
  const records = getRecordStore();

  let used = 0;
  const existing = await records.get(workspaceId, scope, key).catch(() => undefined);
  const parsed = existing?.value as { used?: number } | undefined;
  if (parsed && typeof parsed.used === "number" && parsed.used >= 0) used = parsed.used;

  if (used >= limit) {
    return { allowed: false, used, limit, date };
  }
  used += 1;
  // Counters are daily; let the store reap them two days on.
  await records.set(workspaceId, scope, key, { used }, SVC_SYSTEM_USER, {
    expiresAtEpochSeconds: Math.floor(Date.now() / 1000) + 2 * 24 * 3600,
  });
  return { allowed: true, used, limit, date };
}

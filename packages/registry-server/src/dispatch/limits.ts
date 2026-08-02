/**
 * Server-side rate limits and budgets (tech-plan D5): enforced in the ONE
 * dispatch pipeline (HTTP, embedding, MCP, and sandbox all pass through),
 * keyed `(tenant, profile-or-provider, principal)`. Profile `limits` override
 * tenant defaults. The token bucket is the seed implementation ported from
 * packages/runtime/src/policy.ts, adapted to reject (429) instead of sleep —
 * the in-sandbox policy layer stays cooperative-only.
 */

import type { ProfileLimits } from "../storage/types.js";

class TokenBucket {
  private tokens: number;
  private lastRefill = Date.now();

  constructor(
    private readonly rps: number,
    private readonly burst: number,
  ) {
    this.tokens = burst;
  }

  /** Take a token if available; otherwise report the wait without reserving. */
  tryTake(): { ok: true } | { ok: false; retryAfterMs: number } {
    const now = Date.now();
    this.tokens = Math.min(this.burst, this.tokens + ((now - this.lastRefill) / 1000) * this.rps);
    this.lastRefill = now;
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return { ok: true };
    }
    return { ok: false, retryAfterMs: Math.ceil(((1 - this.tokens) / this.rps) * 1000) };
  }
}

interface BudgetWindow {
  windowStart: number;
  count: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export class RateLimitExceededError extends Error {
  readonly status = 429;
  constructor(
    message: string,
    readonly retryAfterMs: number,
  ) {
    super(message);
    this.name = "RateLimitExceededError";
  }
}

export class RateLimiter {
  /** Buckets and budget windows are keyed by the full (tenant, …) key — a
   * tenant can never observe or drain another tenant's bucket. */
  private readonly buckets = new Map<string, TokenBucket>();
  private readonly budgets = new Map<string, BudgetWindow>();

  constructor(private readonly defaults: { defaultRps?: number; defaultBurst?: number } = {}) {}

  /**
   * Enforce for one dispatch. `key` is `${tenant}:${profileOrProvider}:${principal}`;
   * `limits` are the resolved profile limits (they override tenant defaults).
   * Throws RateLimitExceededError (429-class, retryable) on excess.
   */
  enforce(key: string, limits?: ProfileLimits): void {
    const rps = limits?.rps ?? this.defaults.defaultRps;
    const burst = limits?.burst ?? limits?.rps ?? this.defaults.defaultBurst ?? rps;
    if (rps && rps > 0) {
      let bucket = this.buckets.get(key);
      if (!bucket) {
        bucket = new TokenBucket(rps, burst && burst > 0 ? burst : rps);
        this.buckets.set(key, bucket);
      }
      const taken = bucket.tryTake();
      if (!taken.ok) {
        throw new RateLimitExceededError(
          `Rate limit exceeded (${rps} rps) — retry in ${taken.retryAfterMs}ms`,
          taken.retryAfterMs,
        );
      }
    }

    const budget = limits?.budget;
    if (budget && budget > 0) {
      const now = Date.now();
      let window = this.budgets.get(key);
      if (!window || now - window.windowStart >= DAY_MS) {
        window = { windowStart: now, count: 0 };
        this.budgets.set(key, window);
      }
      if (window.count >= budget) {
        const retryAfterMs = window.windowStart + DAY_MS - now;
        throw new RateLimitExceededError(
          `Budget exhausted (${budget} calls per 24h) — retry in ${Math.ceil(retryAfterMs / 1000)}s`,
          retryAfterMs,
        );
      }
      window.count += 1;
    }
  }

  reset(): void {
    this.buckets.clear();
    this.budgets.clear();
  }
}

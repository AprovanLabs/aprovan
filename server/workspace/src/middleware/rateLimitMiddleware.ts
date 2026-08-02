/**
 * Rate limiting middleware.
 *
 * Applies token-bucket rate limiting per user (sub from JWT).
 * All gateway paths (REST tools + MCP) share the same per-user bucket so a
 * caller that exhausts their budget via MCP is also blocked on the REST path.
 *
 * Configuration via env vars:
 *   GATEWAY_RATE_LIMIT_RPS    — requests per second (default: 10)
 *   GATEWAY_RATE_LIMIT_BURST  — burst capacity (default: 20)
 */

import { RateLimiter } from "@utdk/common/rateLimit";
import type { Context, Next } from "hono";

const DEFAULT_RPS = 10;
const DEFAULT_BURST = 20;

const limiters = new Map<string, RateLimiter>();

function getLimiter(key: string): RateLimiter {
  let limiter = limiters.get(key);
  if (!limiter) {
    const rps = Number(process.env["GATEWAY_RATE_LIMIT_RPS"] ?? DEFAULT_RPS);
    const burst = Number(process.env["GATEWAY_RATE_LIMIT_BURST"] ?? DEFAULT_BURST);
    limiter = new RateLimiter({ requestsPerSecond: rps, burst });
    limiters.set(key, limiter);
  }
  return limiter;
}

/**
 * Rate limit per user id (sub from the resolved principal). Returns 429 when
 * the per-user token bucket is exhausted. Shared by the REST tools path and
 * the MCP path so both drain the same bucket.
 */
export async function rateLimitByUserId(c: Context, next: Next): Promise<Response | void> {
  const principal = c.get("principal");
  const userId = principal?.sub ?? "anonymous";
  const limiter = getLimiter(userId);
  if (!limiter.tryAcquire()) {
    return c.json({ error: "rate_limit_exceeded" }, 429);
  }
  await next();
}

/**
 * Rate limit per callerId + provider combination (kept for backward compat).
 * @deprecated Use rateLimitByUserId for new routes.
 */
export async function rateLimitByCallerAndProvider(c: Context, next: Next): Promise<Response | void> {
  const principal = c.get("principal");
  const callerId = principal?.sub ?? "anonymous";
  const provider = c.req.param("provider") ?? "unknown";
  const key = `${callerId}:${provider}`;

  const limiter = getLimiter(key);
  if (!limiter.tryAcquire()) {
    return c.json({ error: "rate_limit_exceeded" }, 429);
  }

  await next();
}

/** Clear all rate limiter state (used in tests). */
export function resetRateLimiters(): void {
  limiters.clear();
}

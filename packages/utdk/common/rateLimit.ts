/**
 * Token-bucket rate limiter for @utdk provider packages.
 *
 * Configurable via `package.json` `utdk.rateLimit` (requests/second, burst).
 * Per-provider, not global. Respects `Retry-After` response headers.
 */

export interface RateLimitConfig {
  /** Maximum requests per second (fill rate of the token bucket) */
  requestsPerSecond: number;
  /** Maximum burst capacity (bucket size). Defaults to `requestsPerSecond`. */
  burst?: number;
}

export interface RateLimiterOptions extends RateLimitConfig {
  /** Custom clock function for testing (defaults to Date.now) */
  now?: () => number;
}

export class RateLimiter {
  private readonly fillRate: number; // tokens per millisecond
  private readonly capacity: number; // max tokens
  private tokens: number;
  private lastRefill: number;
  private readonly now: () => number;
  /** Timestamp (ms) until which all requests must wait (set via Retry-After) */
  private retryAfterUntil = 0;

  constructor(options: RateLimiterOptions) {
    this.fillRate = options.requestsPerSecond / 1_000;
    this.capacity = options.burst ?? options.requestsPerSecond;
    this.tokens = this.capacity;
    this.now = options.now ?? (() => Date.now());
    this.lastRefill = this.now();
  }

  private refill(): void {
    const now = this.now();
    const elapsed = now - this.lastRefill;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.fillRate);
    this.lastRefill = now;
  }

  /**
   * Attempt to consume a token without blocking.
   * Returns true if a token was available (and consumed), false if the bucket
   * is empty. Callers can use this to return 429 rather than wait.
   */
  tryAcquire(): boolean {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }

  /**
   * Wait until a token is available, then consume it.
   * Also respects any Retry-After delay that was previously recorded.
   */
  async acquire(): Promise<void> {
    const now = this.now();

    if (this.retryAfterUntil > now) {
      await sleep(this.retryAfterUntil - now);
    }

    while (true) {
      this.refill();

      if (this.tokens >= 1) {
        this.tokens -= 1;
        return;
      }

      // Calculate how long until we have a token
      const waitMs = (1 - this.tokens) / this.fillRate;
      await sleep(waitMs);
    }
  }

  /**
   * Notify the limiter of a Retry-After header value.
   * Accepts either a delay-in-seconds number or an HTTP-date string.
   */
  recordRetryAfter(retryAfterHeader: string): void {
    const parsed = parseRetryAfter(retryAfterHeader);
    if (parsed !== null) {
      this.retryAfterUntil = Math.max(this.retryAfterUntil, parsed);
    }
  }

  /**
   * Convenience wrapper: acquire a token, run `fn`, and record any
   * Retry-After header found on the response.
   */
  async wrap<T>(fn: () => Promise<{ response: Response; result: T }>): Promise<T> {
    await this.acquire();
    const { response, result } = await fn();
    const retryAfter = response.headers.get("Retry-After");
    if (retryAfter) {
      this.recordRetryAfter(retryAfter);
    }
    return result;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
}

/**
 * Parse a `Retry-After` header into an absolute epoch timestamp (ms).
 * Returns null if the header cannot be parsed.
 */
export function parseRetryAfter(value: string): number | null {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return null;
  }

  const asSeconds = Number(trimmed);

  if (!isNaN(asSeconds) && asSeconds >= 0) {
    return Date.now() + asSeconds * 1_000;
  }

  // Try HTTP-date format
  const asDate = new Date(trimmed);
  if (!isNaN(asDate.getTime())) {
    return asDate.getTime();
  }

  return null;
}

/**
 * Create a RateLimiter from a `utdk.rateLimit` config object (from package.json).
 */
export function createRateLimiter(config: RateLimitConfig): RateLimiter {
  return new RateLimiter(config);
}

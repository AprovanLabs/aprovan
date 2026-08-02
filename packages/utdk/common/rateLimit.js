/**
 * Token-bucket rate limiter for @utdk provider packages.
 *
 * Configurable via `package.json` `utdk.rateLimit` (requests/second, burst).
 * Per-provider, not global. Respects `Retry-After` response headers.
 */
export class RateLimiter {
    fillRate; // tokens per millisecond
    capacity; // max tokens
    tokens;
    lastRefill;
    now;
    /** Timestamp (ms) until which all requests must wait (set via Retry-After) */
    retryAfterUntil = 0;
    constructor(options) {
        this.fillRate = options.requestsPerSecond / 1_000;
        this.capacity = options.burst ?? options.requestsPerSecond;
        this.tokens = this.capacity;
        this.now = options.now ?? (() => Date.now());
        this.lastRefill = this.now();
    }
    refill() {
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
    tryAcquire() {
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
    async acquire() {
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
    recordRetryAfter(retryAfterHeader) {
        const parsed = parseRetryAfter(retryAfterHeader);
        if (parsed !== null) {
            this.retryAfterUntil = Math.max(this.retryAfterUntil, parsed);
        }
    }
    /**
     * Convenience wrapper: acquire a token, run `fn`, and record any
     * Retry-After header found on the response.
     */
    async wrap(fn) {
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
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
}
/**
 * Parse a `Retry-After` header into an absolute epoch timestamp (ms).
 * Returns null if the header cannot be parsed.
 */
export function parseRetryAfter(value) {
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
export function createRateLimiter(config) {
    return new RateLimiter(config);
}
//# sourceMappingURL=rateLimit.js.map
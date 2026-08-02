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
export declare class RateLimiter {
    private readonly fillRate;
    private readonly capacity;
    private tokens;
    private lastRefill;
    private readonly now;
    /** Timestamp (ms) until which all requests must wait (set via Retry-After) */
    private retryAfterUntil;
    constructor(options: RateLimiterOptions);
    private refill;
    /**
     * Attempt to consume a token without blocking.
     * Returns true if a token was available (and consumed), false if the bucket
     * is empty. Callers can use this to return 429 rather than wait.
     */
    tryAcquire(): boolean;
    /**
     * Wait until a token is available, then consume it.
     * Also respects any Retry-After delay that was previously recorded.
     */
    acquire(): Promise<void>;
    /**
     * Notify the limiter of a Retry-After header value.
     * Accepts either a delay-in-seconds number or an HTTP-date string.
     */
    recordRetryAfter(retryAfterHeader: string): void;
    /**
     * Convenience wrapper: acquire a token, run `fn`, and record any
     * Retry-After header found on the response.
     */
    wrap<T>(fn: () => Promise<{
        response: Response;
        result: T;
    }>): Promise<T>;
}
/**
 * Parse a `Retry-After` header into an absolute epoch timestamp (ms).
 * Returns null if the header cannot be parsed.
 */
export declare function parseRetryAfter(value: string): number | null;
/**
 * Create a RateLimiter from a `utdk.rateLimit` config object (from package.json).
 */
export declare function createRateLimiter(config: RateLimitConfig): RateLimiter;

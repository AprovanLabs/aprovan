/**
 * Exponential backoff with jitter for @utdk provider packages.
 *
 * - Retries on 429 and 503; not on other 4xx.
 * - Respects `Retry-After` response headers.
 * - Propagates original error after max attempts.
 */

export interface RetryOptions {
  /** Maximum number of attempts (including the first). Default: 3 */
  maxAttempts?: number;
  /** Base delay in milliseconds before the first retry. Default: 200 */
  baseDelayMs?: number;
  /** Maximum delay in milliseconds. Default: 30_000 */
  maxDelayMs?: number;
  /**
   * Called before each retry with the current attempt index (0 = first retry)
   * and the delay that will be applied. Useful for logging.
   */
  onRetry?: (attempt: number, delayMs: number, error: unknown) => void;
  /** Override setTimeout for testing */
  sleep?: (ms: number) => Promise<void>;
}

export class RetryError extends Error {
  override readonly cause: unknown;
  readonly attempts: number;

  constructor(message: string, cause: unknown, attempts: number) {
    super(message);
    this.name = "RetryError";
    this.cause = cause;
    this.attempts = attempts;
  }
}

/**
 * HTTP status codes that are safe to retry.
 */
const RETRYABLE_STATUS_CODES = new Set([429, 503]);

/**
 * Determines whether an error should trigger a retry.
 * Recognises `{ status: number }` shaped objects (from fetch wrappers) and
 * `Response` instances.
 */
export function isRetryable(error: unknown): boolean {
  if (error instanceof Response) {
    return RETRYABLE_STATUS_CODES.has(error.status);
  }

  if (error && typeof error === "object") {
    const status = (error as Record<string, unknown>)["status"];
    if (typeof status === "number") {
      return RETRYABLE_STATUS_CODES.has(status);
    }
  }

  // Network errors (no status) are retryable
  if (error instanceof TypeError) {
    return true;
  }

  return false;
}

/**
 * Extract a Retry-After delay (in ms) from an error or Response object.
 * Returns 0 if no valid header is present.
 */
function getRetryAfterMs(error: unknown): number {
  let retryAfter: string | null = null;

  if (error instanceof Response) {
    retryAfter = error.headers.get("Retry-After");
  } else if (error && typeof error === "object") {
    const headers = (error as Record<string, unknown>)["headers"];
    if (headers instanceof Headers) {
      retryAfter = headers.get("Retry-After");
    } else if (headers && typeof headers === "object") {
      const h = headers as Record<string, unknown>;
      if (typeof h["retry-after"] === "string") retryAfter = h["retry-after"];
      else if (typeof h["Retry-After"] === "string") retryAfter = h["Retry-After"];
    }
  }

  if (!retryAfter) return 0;

  const asSeconds = Number(retryAfter.trim());
  if (!isNaN(asSeconds) && asSeconds >= 0) {
    return asSeconds * 1_000;
  }

  const asDate = new Date(retryAfter.trim());
  if (!isNaN(asDate.getTime())) {
    return Math.max(0, asDate.getTime() - Date.now());
  }

  return 0;
}

/**
 * Compute exponential backoff delay with full jitter.
 *
 * Formula: random(0, min(maxDelay, baseDelay * 2^attempt))
 */
function computeDelay(attempt: number, baseDelayMs: number, maxDelayMs: number): number {
  const exponential = baseDelayMs * Math.pow(2, attempt);
  const cap = Math.min(maxDelayMs, exponential);
  return Math.random() * cap;
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
}

/**
 * Execute `fn` with automatic retry on retryable errors.
 *
 * @example
 * const result = await withRetry(() => fetch('https://api.example.com/data'));
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 200;
  const maxDelayMs = options.maxDelayMs ?? 30_000;
  const sleepFn = options.sleep ?? defaultSleep;

  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      const isLast = attempt === maxAttempts - 1;
      if (isLast || !isRetryable(error)) {
        break;
      }

      // Prefer Retry-After header delay, fall back to exponential backoff
      const retryAfterMs = getRetryAfterMs(error);
      const backoffMs = computeDelay(attempt, baseDelayMs, maxDelayMs);
      const delayMs = retryAfterMs > 0 ? retryAfterMs : backoffMs;

      options.onRetry?.(attempt, delayMs, error);
      await sleepFn(delayMs);
    }
  }

  throw new RetryError(
    `Operation failed after ${maxAttempts} attempt(s)`,
    lastError,
    maxAttempts,
  );
}

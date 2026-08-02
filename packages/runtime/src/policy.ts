/**
 * Execution policy layer — retries, backoff, rate limiting, and timeouts on
 * top of any {@link Transport}.
 *
 * Policy is declared once on the manifest (globally and per provider) and can
 * be overridden per call, so the same knobs work for a registry playground
 * run, a patchwork widget, or a server-side script host.
 */

import {
  RuntimeTimeoutError,
  TransportError,
  type ManifestPolicy,
  type RateLimitPolicy,
  type RetryPolicy,
  type RuntimePolicy,
  type Transport,
  type TransportCallOptions,
} from "./types.js";

const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_RETRY: Required<RetryPolicy> = {
  attempts: 1,
  baseDelayMs: 250,
  maxDelayMs: 10_000,
};

/** Fields resolved per-call: per-call > per-provider > global > defaults. */
export function resolvePolicy(
  manifest: ManifestPolicy | undefined,
  provider: string,
  perCall?: RuntimePolicy,
): { timeoutMs: number; retry: Required<RetryPolicy>; rateLimit?: RateLimitPolicy } {
  const layers = [manifest, manifest?.providers?.[provider], perCall];

  let timeoutMs = DEFAULT_TIMEOUT_MS;
  let retry = { ...DEFAULT_RETRY };
  let rateLimit: RateLimitPolicy | undefined;

  for (const layer of layers) {
    if (!layer) continue;
    if (layer.timeoutMs !== undefined) timeoutMs = layer.timeoutMs;
    if (layer.retry) retry = { ...retry, ...layer.retry };
    if (layer.rateLimit) rateLimit = layer.rateLimit;
  }

  return { timeoutMs, retry, rateLimit };
}

// ---------------------------------------------------------------------------
// Token-bucket rate limiter (per provider)
// ---------------------------------------------------------------------------

class TokenBucket {
  private tokens: number;
  private lastRefill = Date.now();

  constructor(
    private readonly rps: number,
    private readonly burst: number,
  ) {
    this.tokens = burst;
  }

  /** Milliseconds to wait before a token is available; takes the token. */
  take(): number {
    const now = Date.now();
    this.tokens = Math.min(this.burst, this.tokens + ((now - this.lastRefill) / 1000) * this.rps);
    this.lastRefill = now;

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return 0;
    }
    const waitMs = ((1 - this.tokens) / this.rps) * 1000;
    this.tokens -= 1; // reserve the future token
    return waitMs;
  }
}

// ---------------------------------------------------------------------------
// Retry classification
// ---------------------------------------------------------------------------

/** Retry on transient transport failures: 408/425/429/5xx and network errors. */
function isRetryable(error: unknown): boolean {
  if (error instanceof RuntimeTimeoutError) return true;
  if (error instanceof TransportError) {
    if (error.status === undefined) return true; // network-level failure
    return error.status === 408 || error.status === 425 || error.status === 429 || error.status >= 500;
  }
  return false;
}

function backoffDelayMs(attempt: number, retry: Required<RetryPolicy>, error: unknown): number {
  if (error instanceof TransportError && error.retryAfterMs !== undefined) {
    return Math.min(error.retryAfterMs, retry.maxDelayMs);
  }
  const exponential = retry.baseDelayMs * 2 ** (attempt - 1);
  const jittered = exponential * (0.5 + Math.random() * 0.5);
  return Math.min(jittered, retry.maxDelayMs);
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------------------
// Policy wrapper
// ---------------------------------------------------------------------------

export interface PolicyHooks {
  onRetry?: (info: {
    callId: string | undefined;
    provider: string;
    operation: string;
    attempt: number;
    delayMs: number;
    reason: string;
  }) => void;
}

/**
 * Wrap a transport in the manifest's execution policy. Rate-limit buckets are
 * shared across calls for the lifetime of the wrapped transport (one bucket
 * per provider).
 */
export function withPolicy(
  transport: Transport,
  manifestPolicy?: ManifestPolicy,
  hooks?: PolicyHooks,
): Transport {
  const buckets = new Map<string, TokenBucket>();

  function bucketFor(provider: string, rateLimit: RateLimitPolicy): TokenBucket {
    let bucket = buckets.get(provider);
    if (!bucket) {
      bucket = new TokenBucket(rateLimit.rps, rateLimit.burst ?? rateLimit.rps);
      buckets.set(provider, bucket);
    }
    return bucket;
  }

  return {
    async call(provider, operation, args, options?: TransportCallOptions) {
      const policy = resolvePolicy(manifestPolicy, provider, options?.policy);

      let lastError: unknown;
      for (let attempt = 1; attempt <= Math.max(1, policy.retry.attempts); attempt++) {
        if (policy.rateLimit) {
          const waitMs = bucketFor(provider, policy.rateLimit).take();
          if (waitMs > 0) await sleep(waitMs);
        }

        try {
          return await withTimeout(
            transport.call(provider, operation, args, options),
            policy.timeoutMs,
          );
        } catch (error) {
          lastError = error;
          const isLastAttempt = attempt >= Math.max(1, policy.retry.attempts);
          if (isLastAttempt || !isRetryable(error)) throw error;

          const delayMs = backoffDelayMs(attempt, policy.retry, error);
          hooks?.onRetry?.({
            callId: options?.callId,
            provider,
            operation,
            attempt,
            delayMs,
            reason: error instanceof Error ? error.message : String(error),
          });
          await sleep(delayMs);
        }
      }

      throw lastError;
    },
  };
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new RuntimeTimeoutError(timeoutMs)), timeoutMs);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error instanceof Error ? error : new Error(String(error)));
      },
    );
  });
}

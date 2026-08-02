/**
 * Shared types for the UTDK sandbox runtime.
 *
 * The runtime is the contract between the registry's execution plane (gateway,
 * credentials, UTDK provider SDKs) and any sandboxed consumer of it — the
 * registry playground, patchwork widgets, or a server-side script host. A
 * consumer declares its dependencies in a {@link RuntimeManifest}; the runtime
 * turns those into namespace proxies whose calls flow through a
 * {@link Transport} (usually the gateway), wrapped in an execution
 * {@link RuntimePolicy} and instrumented with {@link RuntimeEvent}s.
 */

// ---------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------

/**
 * One declared script dependency, resolved from an import specifier.
 *
 * `import s3 from "aws/s3"` →
 *   `{ identifier: "s3", specifier: "aws/s3", provider: "aws", path: "s3" }`
 * `import github from "@utdk/github"` →
 *   `{ identifier: "github", specifier: "@utdk/github", provider: "github", path: "" }`
 * `import { repos } from "@utdk/github"` →
 *   `{ identifier: "repos", specifier: "@utdk/github", provider: "github", path: "repos" }`
 */
export interface RuntimeDependency {
  /** Local binding name inside the script. */
  identifier: string;
  /** Raw import specifier as written. */
  specifier: string;
  /** UTDK provider the calls route to (first specifier segment, sans @utdk/). */
  provider: string;
  /** Dot-path prefix inside the provider namespace ("" for the root). */
  path: string;
}

// ---------------------------------------------------------------------------
// Policy
// ---------------------------------------------------------------------------

export interface RetryPolicy {
  /** Total attempts including the first (default 1 = no retry). */
  attempts?: number;
  /** Base delay for exponential backoff in ms (default 250). */
  baseDelayMs?: number;
  /** Backoff ceiling in ms (default 10_000). */
  maxDelayMs?: number;
}

export interface RateLimitPolicy {
  /** Sustained requests per second. */
  rps: number;
  /** Burst allowance (defaults to `rps`). */
  burst?: number;
}

export interface RuntimePolicy {
  /** Per-call timeout in ms (default 30_000). */
  timeoutMs?: number;
  retry?: RetryPolicy;
  rateLimit?: RateLimitPolicy;
}

/**
 * Policy attached to a manifest: global defaults plus per-provider overrides.
 * Resolution order for any field: per-call > per-provider > global > default.
 */
export interface ManifestPolicy extends RuntimePolicy {
  providers?: Record<string, RuntimePolicy>;
}

// ---------------------------------------------------------------------------
// Manifest
// ---------------------------------------------------------------------------

/**
 * Declares what a sandboxed execution may reach and how calls behave. Derived
 * automatically from a script's imports (see `parseScriptDependencies`) or
 * authored directly (patchwork widget manifests).
 */
export interface RuntimeManifest {
  dependencies: RuntimeDependency[];
  policy?: ManifestPolicy;
}

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

export interface TransportCallOptions {
  /** Per-call policy override. */
  policy?: RuntimePolicy;
  /** Correlation id supplied by the caller (defaults to a random id). */
  callId?: string;
  signal?: AbortSignal;
}

/** Moves one namespaced call to wherever it actually executes. */
export interface Transport {
  call(
    provider: string,
    operation: string,
    args: Record<string, unknown>,
    options?: TransportCallOptions,
  ): Promise<unknown>;
}

// ---------------------------------------------------------------------------
// Events — the live-execution feed
// ---------------------------------------------------------------------------

export type RuntimeEvent =
  | {
      type: "call:start";
      callId: string;
      provider: string;
      operation: string;
      args: Record<string, unknown>;
      ts: number;
    }
  | {
      type: "call:retry";
      callId: string;
      provider: string;
      operation: string;
      attempt: number;
      delayMs: number;
      reason: string;
      ts: number;
    }
  | {
      type: "call:end";
      callId: string;
      provider: string;
      operation: string;
      ok: boolean;
      durationMs: number;
      /** The call's return value (present on success) — feeds explorable span views. */
      result?: unknown;
      error?: string;
      ts: number;
    }
  | {
      type: "log";
      level: "log" | "info" | "warn" | "error" | "debug";
      message: string;
      ts: number;
    }
  | { type: "script:start"; ts: number }
  | {
      type: "script:end";
      ok: boolean;
      durationMs: number;
      result?: unknown;
      error?: string;
      ts: number;
    };

export type RuntimeEventListener = (event: RuntimeEvent) => void;

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/** Thrown by the policy layer when a call exceeds its timeout. */
export class RuntimeTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Call timed out after ${timeoutMs}ms`);
    this.name = "RuntimeTimeoutError";
  }
}

/** Error from a transport, carrying an HTTP-ish status when known. */
export class TransportError extends Error {
  constructor(
    message: string,
    /** HTTP status when the transport is HTTP-backed; undefined otherwise. */
    public readonly status?: number,
    /** Server-suggested retry delay (Retry-After) in ms, when present. */
    public readonly retryAfterMs?: number,
  ) {
    super(message);
    this.name = "TransportError";
  }
}

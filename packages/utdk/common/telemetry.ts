/**
 * OpenTelemetry span wrapper for @utdk provider packages.
 *
 * One span per HTTP request with `provider`, `operation`, and `http.status_code` attributes.
 * Configurable exporter (OTLP, console, noop). Zero-cost when telemetry is disabled.
 *
 * `@opentelemetry/api` is an optional peer dependency. If it is not installed,
 * all telemetry calls are no-ops.
 */

// ---------------------------------------------------------------------------
// Minimal OTel type stubs so the module compiles without the peer dep
// ---------------------------------------------------------------------------

interface Span {
  setAttribute(key: string, value: string | number | boolean): this;
  setStatus(status: { code: number; message?: string }): this;
  recordException(exception: unknown): this;
  end(): void;
}

interface Tracer {
  startActiveSpan<T>(name: string, fn: (span: Span) => T): T;
  startActiveSpan<T>(name: string, options: object, fn: (span: Span) => T): T;
}

type OTelApi = {
  trace: {
    getTracer(name: string, version?: string): Tracer;
  };
  context: {
    active(): object;
  };
  propagation: {
    inject(ctx: object, carrier: Record<string, string>): void;
  };
  SpanStatusCode: { OK: number; ERROR: number };
};

// ---------------------------------------------------------------------------
// Exporter types
// ---------------------------------------------------------------------------

export type TelemetryExporter = "otlp" | "console" | "noop";

export interface TelemetryOptions {
  /** Whether telemetry is enabled. Default: true */
  enabled?: boolean;
  /** Exporter backend. Default: "noop" */
  exporter?: TelemetryExporter;
  /** Tracer name / instrumentation scope. Default: "@utdk/common" */
  tracerName?: string;
}

export interface SpanContext {
  provider: string;
  operation: string;
  /** Optional override for the OTel span name. Defaults to `"${provider} ${operation}"`. */
  spanName?: string;
}

// ---------------------------------------------------------------------------
// Internal state
// ---------------------------------------------------------------------------

let _otel: OTelApi | undefined;
let _tracer: Tracer | undefined;
let _options: Required<TelemetryOptions> = {
  enabled: false,
  exporter: "noop",
  tracerName: "@utdk/common",
};

/**
 * Attempt to load the optional `@opentelemetry/api` peer dependency.
 * Silently returns undefined if the package is not installed.
 */
async function tryLoadOTelApi(): Promise<OTelApi | undefined> {
  try {
    // Dynamic import so a missing package does not crash at module load time
    const mod = (await import("@opentelemetry/api")) as OTelApi;
    return mod;
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Configure the telemetry layer. Call this once at startup.
 *
 * @example
 * await configureTelemetry({ enabled: true, exporter: "console" });
 */
export async function configureTelemetry(options: TelemetryOptions): Promise<void> {
  _options = {
    enabled: options.enabled ?? true,
    exporter: options.exporter ?? "noop",
    tracerName: options.tracerName ?? "unkonwn",
  };

  if (!_options.enabled || _options.exporter === "noop") {
    _otel = undefined;
    _tracer = undefined;
    return;
  }

  _otel = await tryLoadOTelApi();

  if (!_otel) {
    // @opentelemetry/api not installed — silently disable
    _options.enabled = false;
    return;
  }

  _tracer = _otel.trace.getTracer(_options.tracerName, "0.1.0");
}

/**
 * Create a noop span that satisfies the Span interface.
 */
function noopSpan(): Span {
  return {
    setAttribute() { return this; },
    setStatus() { return this; },
    recordException() { return this; },
    end() {},
  };
}

/**
 * Wrap an async function in an OpenTelemetry span.
 *
 * Attributes set automatically:
 * - `provider` — name of the @utdk provider (e.g. "github")
 * - `operation` — name of the operation / tool (e.g. "repos.list")
 * - `http.status_code` — HTTP status code of the response (if provided)
 *
 * @example
 * const result = await withSpan(
 *   { provider: "github", operation: "repos.list" },
 *   async (span) => {
 *     const res = await fetch(...);
 *     span.setAttribute("http.status_code", res.status);
 *     return res.json();
 *   }
 * );
 */
export async function withSpan<T>(
  context: SpanContext,
  fn: (span: Span) => Promise<T>,
): Promise<T> {
  if (!_options.enabled || !_tracer || !_otel) {
    const span = noopSpan();
    return fn(span);
  }

  const spanName = context.spanName ?? `${context.provider} ${context.operation}`;

  return _tracer.startActiveSpan(spanName, async (span: Span) => {
    span.setAttribute("provider", context.provider);
    span.setAttribute("operation", context.operation);

    try {
      const result = await fn(span);
      span.setStatus({ code: _otel!.SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({ code: _otel!.SpanStatusCode.ERROR, message: String(error) });
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  });
}

/**
 * Synchronous version of `withSpan` for cases where an async wrapper is not needed.
 */
export function withSpanSync<T>(
  context: SpanContext,
  fn: (span: Span) => T,
): T {
  if (!_options.enabled || !_tracer || !_otel) {
    return fn(noopSpan());
  }

  const spanName = context.spanName ?? `${context.provider} ${context.operation}`;

  return _tracer.startActiveSpan(spanName, (span: Span) => {
    span.setAttribute("provider", context.provider);
    span.setAttribute("operation", context.operation);

    try {
      const result = fn(span);
      span.setStatus({ code: _otel!.SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({ code: _otel!.SpanStatusCode.ERROR, message: String(error) });
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  });
}

/**
 * Inject W3C trace context headers (`traceparent`, `tracestate`) into an outgoing
 * request headers map using the active OTel context. Must be called from inside a
 * `withSpan` callback so that an active span exists in the current context.
 *
 * No-op when telemetry is disabled or `@opentelemetry/api` is not installed.
 */
export function injectTraceContext(headers: Record<string, string>): void {
  if (!_options.enabled || !_otel) return;
  try {
    _otel.propagation.inject(_otel.context.active(), headers);
  } catch {
    // Silently ignore if propagation is not configured on the OTel SDK side
  }
}

/**
 * Convenience helper that wraps a `fetch` call in a span and records
 * `http.status_code` automatically.
 */
export async function tracedFetch(
  context: SpanContext,
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  return withSpan(context, async (span) => {
    const response = await fetch(input, init);
    span.setAttribute("http.status_code", response.status);
    return response;
  });
}

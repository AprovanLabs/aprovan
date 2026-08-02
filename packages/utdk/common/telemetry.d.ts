/**
 * OpenTelemetry span wrapper for @utdk provider packages.
 *
 * One span per HTTP request with `provider`, `operation`, and `http.status_code` attributes.
 * Configurable exporter (OTLP, console, noop). Zero-cost when telemetry is disabled.
 *
 * `@opentelemetry/api` is an optional peer dependency. If it is not installed,
 * all telemetry calls are no-ops.
 */
interface Span {
    setAttribute(key: string, value: string | number | boolean): this;
    setStatus(status: {
        code: number;
        message?: string;
    }): this;
    recordException(exception: unknown): this;
    end(): void;
}
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
/**
 * Configure the telemetry layer. Call this once at startup.
 *
 * @example
 * await configureTelemetry({ enabled: true, exporter: "console" });
 */
export declare function configureTelemetry(options: TelemetryOptions): Promise<void>;
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
export declare function withSpan<T>(context: SpanContext, fn: (span: Span) => Promise<T>): Promise<T>;
/**
 * Synchronous version of `withSpan` for cases where an async wrapper is not needed.
 */
export declare function withSpanSync<T>(context: SpanContext, fn: (span: Span) => T): T;
/**
 * Inject W3C trace context headers (`traceparent`, `tracestate`) into an outgoing
 * request headers map using the active OTel context. Must be called from inside a
 * `withSpan` callback so that an active span exists in the current context.
 *
 * No-op when telemetry is disabled or `@opentelemetry/api` is not installed.
 */
export declare function injectTraceContext(headers: Record<string, string>): void;
/**
 * Convenience helper that wraps a `fetch` call in a span and records
 * `http.status_code` automatically.
 */
export declare function tracedFetch(context: SpanContext, input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
export {};

/**
 * Built-in attributed OTLP telemetry — plane 2 of the three-plane model
 * (tech-plan D9).
 *
 * Every emission goes through helpers that REQUIRE a `CallContext`, so an
 * unattributed span is unrepresentable in package code: the helper stamps
 * `aprovan.tenant`, `aprovan.principal`, `aprovan.source.type` (plus source
 * detail) and `aprovan.request_id` itself.
 *
 * With no OTLP endpoint configured (and no injected processor) the class is a
 * TRUE no-op: no provider is constructed, no exporter buffers, no network is
 * touched — helpers return immediately.
 */

import type { Tracer } from "@opentelemetry/api";
import type { SpanProcessor } from "@opentelemetry/sdk-trace-base";
import type { CallContext } from "../config/types.js";

export interface RegistryTelemetryOptions {
  otlpEndpoint?: string;
  serviceName?: string;
  /** Test seam: an explicit processor (e.g. InMemorySpanExporter) instead of OTLP. */
  spanProcessor?: SpanProcessor;
}

export interface DispatchSpanRecord {
  requestId: string;
  namespace: string;
  operation: string;
  profile?: string;
  status: number;
  durationMs: number;
  error?: string;
}

interface ProviderLike {
  shutdown(): Promise<void>;
  forceFlush(): Promise<void>;
}

function sourceAttributes(ctx: CallContext): Record<string, string> {
  const attrs: Record<string, string> = {
    "aprovan.tenant": ctx.tenantId,
    "aprovan.principal": ctx.principal,
    "aprovan.source.type": ctx.source.type,
  };
  // Optional source detail (aprovan.source.*).
  const source = ctx.source as Record<string, unknown>;
  for (const key of ["runId", "path", "app", "sessionId"]) {
    if (typeof source[key] === "string") attrs[`aprovan.source.${key}`] = source[key] as string;
  }
  if (ctx.actor) {
    attrs["aprovan.actor.kind"] = ctx.actor.kind;
    attrs["aprovan.actor.id"] = ctx.actor.id;
  }
  if (ctx.traceId) attrs["aprovan.trace_id"] = ctx.traceId;
  return attrs;
}

export class RegistryTelemetry {
  private tracer: Tracer | undefined;
  private provider: ProviderLike | undefined;
  private readonly initPromise: Promise<void>;
  readonly enabled: boolean;

  constructor(options: RegistryTelemetryOptions = {}) {
    this.enabled = Boolean(options.otlpEndpoint) || Boolean(options.spanProcessor);
    // The SDK is loaded only when telemetry is on — an idle server pays nothing.
    this.initPromise = this.enabled ? this.init(options) : Promise.resolve();
  }

  private async init(options: RegistryTelemetryOptions): Promise<void> {
    const [{ NodeTracerProvider, BatchSpanProcessor }, { Resource }] = await Promise.all([
      import("@opentelemetry/sdk-trace-node"),
      import("@opentelemetry/resources"),
    ]);
    const processors: SpanProcessor[] = [];
    if (options.spanProcessor) processors.push(options.spanProcessor);
    if (options.otlpEndpoint) {
      const { OTLPTraceExporter } = await import("@opentelemetry/exporter-trace-otlp-http");
      processors.push(
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: `${options.otlpEndpoint.replace(/\/$/u, "")}/v1/traces`,
          }),
        ),
      );
    }
    const provider = new NodeTracerProvider({
      resource: new Resource({
        "service.name": options.serviceName ?? "aprovan-registry",
      }),
      spanProcessors: processors,
    });
    this.provider = provider;
    this.tracer = provider.getTracer("@aprovan/registry-server");
  }

  /** Await SDK init (tests; dispatch never needs to). */
  async ready(): Promise<void> {
    await this.initPromise;
  }

  /**
   * Record the one attributed span for a completed dispatch. Called from
   * every dispatch exit path — success and each failure class alike.
   */
  dispatchSpan(ctx: CallContext, record: DispatchSpanRecord): void {
    if (!this.tracer) return;
    const startTime = Date.now() - record.durationMs;
    const span = this.tracer.startSpan(`dispatch ${record.namespace}.${record.operation}`, {
      startTime,
      attributes: {
        ...sourceAttributes(ctx),
        "aprovan.request_id": record.requestId,
        namespace: record.namespace,
        operation: record.operation,
        ...(record.profile !== undefined ? { profile: record.profile } : {}),
        "http.status": record.status,
      },
    });
    if (record.status >= 400) {
      span.setStatus({ code: 2 /* SpanStatusCode.ERROR */, message: record.error });
      if (record.error) span.setAttribute("error", record.error);
    } else {
      span.setStatus({ code: 1 /* SpanStatusCode.OK */ });
    }
    span.end();
  }

  /** Run `fn` inside an attributed span (non-dispatch instrumentation). */
  async span<T>(
    ctx: CallContext,
    name: string,
    attributes: Record<string, string | number | boolean>,
    fn: () => Promise<T>,
  ): Promise<T> {
    if (!this.tracer) return fn();
    const span = this.tracer.startSpan(name, {
      attributes: { ...sourceAttributes(ctx), ...attributes },
    });
    try {
      const result = await fn();
      span.setStatus({ code: 1 });
      return result;
    } catch (err) {
      span.setStatus({ code: 2, message: err instanceof Error ? err.message : String(err) });
      throw err;
    } finally {
      span.end();
    }
  }

  /** Attributed log line, carried as a zero-duration span event (D9 fallback). */
  log(
    ctx: CallContext,
    level: "info" | "warn" | "error",
    message: string,
    attributes: Record<string, string | number | boolean> = {},
  ): void {
    if (!this.tracer) return;
    const span = this.tracer.startSpan(`log ${level}`, {
      attributes: {
        ...sourceAttributes(ctx),
        "log.severity": level,
        "log.message": message,
        ...attributes,
      },
    });
    span.end();
  }

  async forceFlush(): Promise<void> {
    await this.initPromise;
    await this.provider?.forceFlush();
  }

  async shutdown(): Promise<void> {
    await this.initPromise;
    await this.provider?.shutdown().catch(() => undefined);
  }
}

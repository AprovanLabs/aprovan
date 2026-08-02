/**
 * OpenTelemetry wiring.
 *
 * `@utdk/common`'s `configureTelemetry` only *fetches* a tracer from
 * `@opentelemetry/api` — it never registers a provider or an exporter. Without
 * something registering a real TracerProvider, `trace.getTracer()` hands back a
 * no-op and every span the workspace records is silently discarded. So an
 * `OTEL_EXPORTER_OTLP_ENDPOINT` pointed at a collector used to produce exactly
 * nothing; this module is what makes it produce traces.
 *
 * Everything here is behind a dynamic import, deliberately. The SDK and its
 * exporter are a meaningful chunk of heap, and the deployed workspace runs with
 * telemetry off by default — so a workspace that isn't exporting doesn't load a
 * single OpenTelemetry module. It costs what it's worth, only when it's on.
 */

import type { WorkspaceConfig } from "./config.js";

export interface TelemetryHandle {
  /** Flush pending spans and shut the exporter down. */
  stop(): Promise<void>;
}

/**
 * Register an OTLP tracer provider when an endpoint is configured.
 *
 * Returns `undefined` when telemetry is off, which is the normal case — the
 * caller has nothing to shut down.
 */
export async function startTelemetry(
  config: WorkspaceConfig,
): Promise<TelemetryHandle | undefined> {
  const endpoint = process.env["OTEL_EXPORTER_OTLP_ENDPOINT"];
  if (!endpoint) return undefined;

  const [{ NodeTracerProvider, BatchSpanProcessor }, { OTLPTraceExporter }, { Resource }, semconv, { configureTelemetry }] =
    await Promise.all([
      import("@opentelemetry/sdk-trace-node"),
      import("@opentelemetry/exporter-trace-otlp-http"),
      import("@opentelemetry/resources"),
      import("@opentelemetry/semantic-conventions"),
      import("@utdk/common/telemetry"),
    ]);

  const provider = new NodeTracerProvider({
    resource: new Resource({
      [semconv.ATTR_SERVICE_NAME]: process.env["OTEL_SERVICE_NAME"] ?? "workspace",
      [semconv.ATTR_SERVICE_VERSION]: process.env["npm_package_version"] ?? "0.1.0",
      "deployment.environment.name": config.mode,
    }),
    spanProcessors: [
      // The OTLP endpoint is conventionally the collector root; the exporter
      // wants the signal-specific path.
      new BatchSpanProcessor(
        new OTLPTraceExporter({ url: `${endpoint.replace(/\/$/, "")}/v1/traces` }),
      ),
    ],
  });

  // Registering globally is what lets `@utdk/common` — and anything else
  // holding `@opentelemetry/api` — resolve a real tracer instead of the no-op.
  provider.register();

  await configureTelemetry({
    enabled: true,
    exporter: "otlp",
    tracerName: "@aprovan/workspace",
  });

  return {
    async stop() {
      // Spans are batched, so without an explicit flush a clean shutdown
      // (SIGTERM on a Spot reclamation) silently drops the last window.
      await provider.shutdown().catch(() => undefined);
    },
  };
}

/**
 * Native telemetry — `@utdk/telemetry` export over an injectable sink.
 * The contract and the first-party surface already agree; this confirms
 * rather than reshapes.
 */

import {
  validateExportArgs,
  type TelemetryClient,
  type TelemetryExportArgs,
  type TelemetryExportResult,
} from "@utdk/telemetry";

export interface NativeTelemetryBackend {
  /**
   * Persist a validated export payload. Return accepted/rejected counts;
   * when omitted, the client reports everything as accepted after a local
   * count of the payload.
   */
  export(args: TelemetryExportArgs): Promise<TelemetryExportResult | void>;
}

export interface NativeTelemetryOptions {
  backend: NativeTelemetryBackend;
}

function countPayload(args: TelemetryExportArgs): TelemetryExportResult["accepted"] {
  let spans = 0;
  let logs = 0;
  let metrics = 0;
  for (const resource of args.resourceSpans ?? []) {
    for (const scope of resource.scopeSpans) spans += scope.spans.length;
  }
  for (const resource of args.resourceLogs ?? []) {
    for (const scope of resource.scopeLogs) logs += scope.logRecords.length;
  }
  for (const resource of args.resourceMetrics ?? []) {
    for (const scope of resource.scopeMetrics) {
      for (const metric of scope.metrics) {
        metrics +=
          (metric.gauge?.dataPoints.length ?? 0) +
          (metric.sum?.dataPoints.length ?? 0) +
          (metric.histogram?.dataPoints.length ?? 0);
      }
    }
  }
  return { spans, logs, metrics };
}

export function createNativeTelemetry(options: NativeTelemetryOptions): TelemetryClient {
  const { backend } = options;
  return {
    async export(args: TelemetryExportArgs): Promise<TelemetryExportResult> {
      validateExportArgs(args);
      const result = await backend.export(args);
      if (result) return result;
      return { accepted: countPayload(args) };
    },
  };
}

export function createMemoryTelemetryBackend(): NativeTelemetryBackend {
  const exports: TelemetryExportArgs[] = [];
  return {
    async export(args) {
      exports.push(args);
      return { accepted: countPayload(args) };
    },
  };
}

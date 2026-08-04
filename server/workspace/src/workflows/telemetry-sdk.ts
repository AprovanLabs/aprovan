/**
 * Host-side `@utdk/telemetry/sdk` facade for workflow runs.
 *
 * The QuickJS namespace proxy only speaks `__dispatch`, so SDK helpers
 * (`log`/`counter`/`withSpan`/…) are implemented on the host and reached
 * when the guest calls `telemetry.<helper>(…)`. A small guest bind snippet
 * replaces the telemetry Proxy with an object that keeps raw ops and adds
 * a guest-local `withSpan` (functions cannot cross the JSON bridge).
 */

import {
  createTelemetry,
  type SpanHandle,
  type TelemetrySdk,
} from "@utdk/telemetry/sdk";
import type { TelemetryExportArgs, TelemetryExportResult } from "@utdk/telemetry";

/** Flush budget at run end (tech-plan: failed runs still flush). */
export const SDK_FLUSH_BUDGET_MS = 2_000;

const SDK_PROCEDURES = new Set([
  "log",
  "counter",
  "gauge",
  "histogram",
  "startSpan",
  "endSpan",
  "setSpanAttribute",
  "addSpanEvent",
  "flush",
]);

export interface WorkflowTelemetryFacade {
  sdk: TelemetrySdk;
  /** True when `namespace.procedure` is an SDK helper (not a core op). */
  handles(namespace: string, procedure: string): boolean;
  /** Dispatch an SDK helper call from the sandbox. */
  dispatch(procedure: string, args: unknown[]): Promise<unknown>;
  /** Await flush with a wall-clock budget; never throws. */
  flushBounded(): Promise<void>;
}

export interface CreateWorkflowTelemetryOptions {
  path: string;
  runId: string;
  /** Calls bare `telemetry.export` (native store). */
  exportArgs: (args: TelemetryExportArgs) => Promise<TelemetryExportResult>;
}

/**
 * Guest snippet prepended to workflow source. Replaces the telemetry Proxy
 * with a facade that forwards raw ops + SDK helpers via dispatch, and
 * implements `withSpan` locally so the callback stays in the guest.
 */
export const TELEMETRY_SDK_GUEST_BIND = String.raw`
(() => {
  const raw = globalThis.tools && globalThis.tools.telemetry;
  if (!raw) return;
  // The namespace Proxy's get trap returns nested proxies for ANY string
  // key — never read a sentinel via property access. Own-property check
  // hits the empty function target instead.
  if (Object.prototype.hasOwnProperty.call(raw, "__aprovanSdkBound")) return;
  // Invoke the nested proxy as a function — never .apply/.call (those
  // names are also trapped into dispatch paths like "log.apply").
  const call = (path, args) => {
    let target = raw;
    const parts = path.split(".");
    for (let i = 0; i < parts.length; i++) target = target[parts[i]];
    return target(...args);
  };
  const facade = {
    emit: function (...args) { return call("emit", args); },
    export: function (...args) { return call("export", args); },
    query: function (...args) { return call("query", args); },
    traces: function (...args) { return call("traces", args); },
    log: function (...args) { return call("log", args); },
    counter: function (...args) { return call("counter", args); },
    gauge: function (...args) { return call("gauge", args); },
    histogram: function (...args) { return call("histogram", args); },
    startSpan: function (...args) { return call("startSpan", args); },
    flush: function (...args) { return call("flush", args); },
    client: function (...args) { return call("client", args); },
    withSpan: async function (name, fn) {
      const span = await call("startSpan", [name]);
      const handle = {
        traceId: span.traceId,
        spanId: span.spanId,
        setAttribute: function (k, v) { return call("setSpanAttribute", [span.spanId, k, v]); },
        addEvent: function (n, a) { return call("addSpanEvent", [span.spanId, n, a]); },
        end: function (s) { return call("endSpan", [span.spanId, s]); },
      };
      try {
        const result = await fn(handle);
        await handle.end();
        return result;
      } catch (err) {
        await handle.end({
          error: err && err.message ? err.message : String(err),
        });
        throw err;
      }
    },
    __aprovanSdkBound: true,
  };
  if (globalThis.tools) globalThis.tools.telemetry = new Proxy(facade, {
    get: function (t, prop) {
      if (typeof prop === "symbol") return undefined;
      if (prop in t) return t[prop];
      return raw[prop];
    },
  });
})();
`;

export function createWorkflowTelemetryFacade(
  options: CreateWorkflowTelemetryOptions,
): WorkflowTelemetryFacade {
  const openSpans = new Map<string, SpanHandle>();

  const sdk = createTelemetry({
    export: options.exportArgs,
    attribution: { source: "workflow" },
    resourceAttributes: [
      { key: "aprovan.path", value: { stringValue: options.path } },
      { key: "aprovan.run_id", value: { stringValue: options.runId } },
    ],
    // Runner flushes explicitly in try/finally; no timer inside the isolate lifetime.
    flushIntervalMs: 0,
  });

  return {
    sdk,
    handles(namespace, procedure) {
      return namespace === "telemetry" && SDK_PROCEDURES.has(procedure);
    },
    async dispatch(procedure, args) {
      switch (procedure) {
        case "log": {
          const level = args[0];
          if (
            level !== "debug" &&
            level !== "info" &&
            level !== "warn" &&
            level !== "error"
          ) {
            throw new Error('telemetry.log level must be "debug"|"info"|"warn"|"error"');
          }
          sdk.log(
            level,
            typeof args[1] === "string" ? args[1] : String(args[1] ?? ""),
            isAttrRecord(args[2]) ? args[2] : undefined,
          );
          return null;
        }
        case "counter": {
          sdk.counter(
            String(args[0] ?? "counter"),
            typeof args[1] === "number" ? args[1] : 1,
            isStringAttrRecord(args[2]) ? args[2] : undefined,
          );
          return null;
        }
        case "gauge": {
          sdk.gauge(
            String(args[0] ?? "gauge"),
            typeof args[1] === "number" ? args[1] : 0,
            isStringAttrRecord(args[2]) ? args[2] : undefined,
          );
          return null;
        }
        case "histogram": {
          sdk.histogram(
            String(args[0] ?? "histogram"),
            typeof args[1] === "number" ? args[1] : 0,
            isStringAttrRecord(args[2]) ? args[2] : undefined,
          );
          return null;
        }
        case "startSpan": {
          const handle = sdk.startSpan(String(args[0] ?? "span"));
          openSpans.set(handle.spanId, handle);
          return { traceId: handle.traceId, spanId: handle.spanId };
        }
        case "endSpan": {
          const spanId = typeof args[0] === "string" ? args[0] : "";
          const handle = openSpans.get(spanId);
          if (handle) {
            const status =
              args[1] && typeof args[1] === "object"
                ? (args[1] as { error?: string })
                : undefined;
            handle.end(status?.error !== undefined ? { error: status.error } : undefined);
            openSpans.delete(spanId);
          }
          return null;
        }
        case "setSpanAttribute": {
          const handle = openSpans.get(typeof args[0] === "string" ? args[0] : "");
          if (handle && typeof args[1] === "string") {
            const value = args[2];
            if (
              typeof value === "string" ||
              typeof value === "number" ||
              typeof value === "boolean"
            ) {
              handle.setAttribute(args[1], value);
            }
          }
          return null;
        }
        case "addSpanEvent": {
          const handle = openSpans.get(typeof args[0] === "string" ? args[0] : "");
          if (handle && typeof args[1] === "string") {
            handle.addEvent(args[1], isAttrRecord(args[2]) ? args[2] : undefined);
          }
          return null;
        }
        case "flush":
          return (await sdk.flush()) ?? null;
        default:
          throw new Error(`Unknown telemetry SDK procedure: ${procedure}`);
      }
    },
    async flushBounded() {
      try {
        await Promise.race([
          sdk.flush(),
          new Promise<void>((resolve) => {
            setTimeout(resolve, SDK_FLUSH_BUDGET_MS);
          }),
        ]);
      } catch {
        // Telemetry flush is best-effort; the run outcome is already decided.
      }
    },
  };
}

function isAttrRecord(
  value: unknown,
): value is Record<string, string | number | boolean> {
  if (!value || typeof value !== "object") return false;
  for (const v of Object.values(value as Record<string, unknown>)) {
    if (typeof v !== "string" && typeof v !== "number" && typeof v !== "boolean") {
      return false;
    }
  }
  return true;
}

function isStringAttrRecord(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== "object") return false;
  for (const v of Object.values(value as Record<string, unknown>)) {
    if (typeof v !== "string") return false;
  }
  return true;
}

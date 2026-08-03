/**
 * Widget runtime telemetry — the host side of the compiler's telemetry hook
 * plus a pre-bound `@utdk/telemetry/sdk` facade over the tool-call bridge.
 *
 * Two jobs for the compiler hook:
 *
 * 1. **Local buffer** — every runtime event (console line, uncaught error,
 *    service call) lands in a ring buffer, subscribable per widget path.
 *    This feeds the editor's Logs panel live, with zero round-trips.
 * 2. **Shipping** — console/error events batch to the gateway's `telemetry`
 *    service so chat agents (and MCP clients) can read them. Service-call
 *    spans are NOT shipped from here: the gateway records those itself at
 *    dispatch time, attributed via the X-Telemetry-Source header the
 *    compiler's proxy sends.
 *
 * SDK facade (stream 6): `widgetTelemetrySdk({ path, sessionId })` returns a
 * `createTelemetry` instance whose `export` calls bare `telemetry.export`
 * through the same tool bridge, with widget attribution. Facades flush on
 * visibility change / pagehide.
 */

import type { WidgetRuntimeEvent } from "@aprovan/patchwork-compiler";
import type { TelemetryExportArgs, TelemetryExportResult } from "@utdk/telemetry";
import { createTelemetry, type TelemetrySdk } from "@utdk/telemetry/sdk";
import { GATEWAY_BASE } from "./gateway";
import { gatewayFetch } from "./gateway-fetch";
import { invokeNamespaceTool } from "./tools";

const BUFFER_CAP = 500;
const SHIP_INTERVAL_MS = 2500;
const SHIP_BATCH_CAP = 40;

export type { WidgetRuntimeEvent };

const buffer: WidgetRuntimeEvent[] = [];
const subscribers = new Set<() => void>();
let shipQueue: WidgetRuntimeEvent[] = [];
let shipTimer: ReturnType<typeof setTimeout> | undefined;
let droppedSinceLastShip = 0;

/** Live SDK facades keyed by path::sessionId — flushed on teardown. */
const sdkFacades = new Map<string, TelemetrySdk>();

function notify(): void {
  for (const cb of subscribers) cb();
}

/** The compiler's telemetry hook — pass to createCompiler({ telemetry }). */
export function recordWidgetEvent(event: WidgetRuntimeEvent): void {
  buffer.push(event);
  if (buffer.length > BUFFER_CAP) buffer.splice(0, buffer.length - BUFFER_CAP);
  notify();

  // Ship console output and errors; the gateway already records service
  // calls (with truthier durations) at dispatch time.
  if (event.kind === "service-call") return;
  if (event.level === "debug") return;
  if (shipQueue.length >= SHIP_BATCH_CAP * 2) {
    droppedSinceLastShip += 1;
    return;
  }
  shipQueue.push(event);
  shipTimer ??= setTimeout(() => void shipBatch(), SHIP_INTERVAL_MS);
}

async function shipBatch(): Promise<void> {
  shipTimer = undefined;
  const batch = shipQueue.slice(0, SHIP_BATCH_CAP);
  shipQueue = shipQueue.slice(SHIP_BATCH_CAP);
  if (droppedSinceLastShip > 0) {
    batch.push({
      kind: "log",
      at: new Date().toISOString(),
      level: "warn",
      message: `[telemetry] ${droppedSinceLastShip} events dropped (rate cap)`,
    });
    droppedSinceLastShip = 0;
  }
  if (batch.length === 0) return;
  try {
    await invokeNamespaceTool("telemetry")("emit", {
      events: batch.map((event) => ({
        kind: event.kind === "error" ? "log" : event.kind,
        level: event.kind === "error" ? "error" : (event.level ?? "info"),
        message: `${event.message ?? ""}${event.stack ? `\n${event.stack}` : ""}`,
        at: event.at,
        ...(event.traceId ? { traceId: event.traceId } : {}),
        source: {
          type: "widget",
          ...(event.path ? { path: event.path } : {}),
        },
      })),
    });
  } catch {
    // Telemetry shipping is best-effort; the local buffer still has it.
  }
  if (shipQueue.length > 0) {
    shipTimer ??= setTimeout(() => void shipBatch(), SHIP_INTERVAL_MS);
  }
}

/** Events for one widget path (or everything when no path). Newest last. */
export function widgetEvents(path?: string): WidgetRuntimeEvent[] {
  if (!path) return [...buffer];
  return buffer.filter((event) => event.path === path || !event.path);
}

/** Only events attributed to exactly this path (no unattributed noise). */
export function widgetEventsStrict(path: string): WidgetRuntimeEvent[] {
  return buffer.filter((event) => event.path === path);
}

export function clearWidgetEvents(path?: string): void {
  if (!path) {
    buffer.length = 0;
  } else {
    for (let i = buffer.length - 1; i >= 0; i -= 1) {
      if (buffer[i]?.path === path) buffer.splice(i, 1);
    }
  }
  notify();
}

export function subscribeWidgetEvents(cb: () => void): () => void {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

/**
 * Editor-facing logs source, memoized per path so React effects that key on
 * it don't resubscribe every render. Shape matches the editor package's
 * `EditorLogsSource` structurally (no import — the editor stays decoupled).
 */
interface LogsSourceShape {
  subscribe(cb: () => void): () => void;
  snapshot(): WidgetRuntimeEvent[];
  clear(): void;
}
const logsSourceCache = new Map<string, LogsSourceShape>();

export function editorLogsSource(path?: string): LogsSourceShape {
  const key = path ?? "";
  let source = logsSourceCache.get(key);
  if (!source) {
    source = {
      subscribe: subscribeWidgetEvents,
      snapshot: () => widgetEvents(path || undefined),
      clear: () => clearWidgetEvents(path || undefined),
    };
    logsSourceCache.set(key, source);
  }
  return source;
}

/**
 * A compact plain-text digest of recent problems for one widget path —
 * appended to AI edit prompts so "fix it" ships with the evidence.
 */
export function recentProblemsDigest(path: string, limit = 12): string | undefined {
  const relevant = widgetEvents(path).filter(
    (event) =>
      event.kind === "error" ||
      event.level === "error" ||
      event.level === "warn" ||
      (event.kind === "service-call" && event.ok === false),
  );
  if (relevant.length === 0) return undefined;
  const lines = relevant.slice(-limit).map((event) => {
    if (event.kind === "service-call") {
      return `[service ${event.ok ? "ok" : "FAILED"}] ${event.namespace}.${event.procedure} (${event.durationMs}ms)${event.error ? ` — ${event.error}` : ""}`;
    }
    const stack = event.stack ? `\n${event.stack.split("\n").slice(0, 4).join("\n")}` : "";
    return `[${event.kind === "error" ? "uncaught" : (event.level ?? "info")}] ${event.message ?? ""}${stack}`;
  });
  return lines.join("\n");
}

export interface WidgetTelemetrySdkOptions {
  /** Widget script / mount path for source attribution. */
  path: string;
  /** Chat / app session id when known. */
  sessionId?: string;
}

/**
 * Pre-bound `createTelemetry` facade over the widget tool-call bridge.
 * `export` targets bare `telemetry.export` (native store) with
 * `{ type: "widget", path, sessionId }` attribution via X-Telemetry-Source.
 */
export function widgetTelemetrySdk(options: WidgetTelemetrySdkOptions): TelemetrySdk {
  const key = `${options.path}::${options.sessionId ?? ""}`;
  let sdk = sdkFacades.get(key);
  if (sdk) return sdk;

  const source = {
    type: "widget" as const,
    path: options.path,
    ...(options.sessionId ? { sessionId: options.sessionId } : {}),
  };

  sdk = createTelemetry({
    export: (args) => exportViaBridge(args, source),
    attribution: { source: "widget" },
    resourceAttributes: [
      { key: "aprovan.path", value: { stringValue: options.path } },
      ...(options.sessionId
        ? [{ key: "aprovan.session_id", value: { stringValue: options.sessionId } }]
        : []),
    ],
  });
  sdkFacades.set(key, sdk);
  return sdk;
}

/** Flush every live facade (teardown / visibility change). Never throws. */
export async function flushWidgetTelemetrySdks(): Promise<void> {
  const pending = [...sdkFacades.values()].map((sdk) =>
    sdk.flush().catch(() => undefined),
  );
  await Promise.all(pending);
}

async function exportViaBridge(
  args: TelemetryExportArgs,
  source: { type: "widget"; path: string; sessionId?: string },
): Promise<TelemetryExportResult> {
  const res = await gatewayFetch(`${GATEWAY_BASE}/tools/telemetry/export`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Telemetry-Source": JSON.stringify(source),
    },
    body: JSON.stringify({ args }),
  });
  const body = (await res.json()) as { data?: TelemetryExportResult; error?: string };
  if (!res.ok) {
    throw new Error(body.error ?? `telemetry.export failed (${res.status})`);
  }
  return body.data ?? { accepted: { spans: 0, logs: 0, metrics: 0 } };
}

function installVisibilityFlush(): void {
  if (typeof document === "undefined") return;
  const flush = () => {
    void flushWidgetTelemetrySdks();
  };
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
  window.addEventListener("pagehide", flush);
}

installVisibilityFlush();

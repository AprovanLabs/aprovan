/**
 * Widget runtime telemetry — the host side of the compiler's telemetry hook.
 *
 * Two jobs:
 *
 * 1. **Local buffer** — every runtime event (console line, uncaught error,
 *    service call) lands in a ring buffer, subscribable per widget path.
 *    This feeds the editor's Logs panel live, with zero round-trips.
 * 2. **Shipping** — console/error events batch to the gateway's `telemetry`
 *    service so chat agents (and MCP clients) can read them. Service-call
 *    spans are NOT shipped from here: the gateway records those itself at
 *    dispatch time, attributed via the X-Telemetry-Source header the
 *    compiler's proxy sends.
 */

import type { WidgetRuntimeEvent } from "@aprovan/patchwork-compiler";
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

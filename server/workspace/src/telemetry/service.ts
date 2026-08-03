/**
 * `telemetry` core service — the workspace's debugging evidence
 * (docs/telemetry-and-agents.md).
 *
 * OTel-shaped spans, log records, and metrics in the **record store** (scope
 * `telemetry`), TTL'd to 3 days: telemetry is evidence for debugging, not an
 * archive — the audit store remains the long-lived compliance record. The
 * same store is written by every instrumented layer (tool dispatch, workflow
 * runner, sandbox console, the browser widget runtime) and read by every
 * consumer (editor Logs panel, chat agents, MCP tools).
 *
 * Layout: tenant = workspaceId, scope = "telemetry",
 * key = <time-prefixed id> — queries walk newest-first and filter on the
 * event body (trace, source, level, status) within a bounded scan. Fine for
 * a 3-day window.
 *
 * The contract's `export` op flattens OTLP/HTTP JSON (spans/logs/metrics)
 * into the same activity-store events. Bare `telemetry.*` is always this
 * native store; vendor egress is a named interface instance
 * (`telemetry:datadog`).
 *
 * **App scoping**: events emitted through an app session are server-stamped
 * `source.app`, and app sessions only ever read their own app's events —
 * same confused-deputy rule as notifications.
 */

import {
  TelemetryError,
  telemetryToolEntries,
  validateExportArgs,
  type OtlpKeyValue,
  type OtlpLogRecord,
  type OtlpMetric,
  type OtlpNumberDataPoint,
  type OtlpSpan,
  type TelemetryExportArgs,
  type TelemetryExportResult,
} from "@utdk/telemetry";
import { getRecordStore } from "../records.js";
import { ServiceError, type CoreService, type ServiceContext } from "../service-kernel.js";

const SCOPE = "telemetry";
const TTL_DAYS = 3;
const BATCH_CAP = 100;
const SCAN_CAP = 600;
const LIST_CAP = 200;
const TEXT_CAP = 4000;

export type TelemetryLevel = "debug" | "info" | "warn" | "error";
export type TelemetrySourceType = "tool" | "workflow" | "widget" | "app" | "chat";
export type TelemetryMetricType = "counter" | "gauge" | "histogram";

export interface TelemetrySource {
  type: TelemetrySourceType;
  /** Widget/workflow script path when known. */
  path?: string;
  /** Server-stamped when emitted through an app session. */
  app?: string;
  /** Workflow run correlation. */
  runId?: string;
  /** Chat session correlation. */
  sessionId?: string;
}

export interface TelemetryEvent {
  id: string;
  kind: "span" | "log" | "metric";
  traceId?: string;
  spanId?: string;
  parentSpanId?: string;
  source: TelemetrySource;
  at: string;
  // span fields
  name?: string;
  durationMs?: number;
  status?: "ok" | "error";
  error?: { message: string; stack?: string };
  // log fields
  level?: TelemetryLevel;
  message?: string;
  // metric fields
  metricType?: TelemetryMetricType;
  value?: number;
  unit?: string;
  attributes?: Record<string, string | number | boolean>;
}

/** Time-prefixed id: sortable, unique (notifications precedent). */
function newEventId(): string {
  return `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
}

function ttlEpochSeconds(): number {
  return Math.floor(Date.now() / 1000) + TTL_DAYS * 24 * 3600;
}

function clip(value: unknown, cap = TEXT_CAP): string | undefined {
  return typeof value === "string" ? value.slice(0, cap) : undefined;
}

function parseSource(raw: unknown): TelemetrySource {
  const src = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const type = src["type"];
  const parsed: TelemetrySource = {
    type:
      type === "tool" || type === "workflow" || type === "widget" || type === "app" || type === "chat"
        ? type
        : "widget",
  };
  const path = clip(src["path"], 300);
  const runId = clip(src["runId"], 80);
  const sessionId = clip(src["sessionId"], 80);
  if (path) parsed.path = path;
  if (runId) parsed.runId = runId;
  if (sessionId) parsed.sessionId = sessionId;
  return parsed;
}

function parseAttributes(
  raw: unknown,
): Record<string, string | number | boolean> | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const out: Record<string, string | number | boolean> = {};
  let count = 0;
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (count >= 20) break;
    if (typeof value === "number" || typeof value === "boolean") out[key] = value;
    else if (typeof value === "string") out[key] = value.slice(0, 500);
    else continue;
    count += 1;
  }
  return count > 0 ? out : undefined;
}

function stampSource(source: TelemetrySource, ctx: ServiceContext): TelemetrySource {
  if (ctx.appScope) source.app = ctx.appScope.name;
  return source;
}

/** Validate + normalize one client-supplied event. Throws on garbage shapes. */
function parseEvent(raw: unknown, ctx: ServiceContext): TelemetryEvent {
  if (!raw || typeof raw !== "object") {
    throw new ServiceError("each event must be an object", 400);
  }
  const entry = raw as Record<string, unknown>;
  const kind =
    entry["kind"] === "span" || entry["kind"] === "log" || entry["kind"] === "metric"
      ? entry["kind"]
      : undefined;
  if (!kind) throw new ServiceError('event.kind must be "span", "log", or "metric"', 400);

  const source = stampSource(parseSource(entry["source"]), ctx);

  const event: TelemetryEvent = {
    id: newEventId(),
    kind,
    source,
    at:
      typeof entry["at"] === "string" && !Number.isNaN(Date.parse(entry["at"]))
        ? entry["at"]
        : new Date().toISOString(),
  };
  const traceId = clip(entry["traceId"], 64);
  const spanId = clip(entry["spanId"], 64);
  const parentSpanId = clip(entry["parentSpanId"], 64);
  if (traceId) event.traceId = traceId;
  if (spanId) event.spanId = spanId;
  if (parentSpanId) event.parentSpanId = parentSpanId;

  if (kind === "span") {
    const name = clip(entry["name"], 200);
    if (!name) throw new ServiceError("span events need a name", 400);
    event.name = name;
    if (typeof entry["durationMs"] === "number" && entry["durationMs"] >= 0) {
      event.durationMs = Math.round(entry["durationMs"]);
    }
    event.status = entry["status"] === "error" ? "error" : "ok";
    if (event.status === "error") {
      const err =
        entry["error"] && typeof entry["error"] === "object"
          ? (entry["error"] as Record<string, unknown>)
          : {};
      event.error = {
        message: clip(err["message"]) ?? "error",
        ...(clip(err["stack"]) ? { stack: clip(err["stack"]) } : {}),
      };
    }
  } else if (kind === "log") {
    const level = entry["level"];
    event.level =
      level === "debug" || level === "info" || level === "warn" || level === "error"
        ? level
        : "info";
    event.message = clip(entry["message"]) ?? "";
  } else {
    const name = clip(entry["name"], 200);
    if (!name) throw new ServiceError("metric events need a name", 400);
    event.name = name;
    const metricType = entry["metricType"];
    if (metricType !== "counter" && metricType !== "gauge" && metricType !== "histogram") {
      throw new ServiceError('metric.metricType must be "counter", "gauge", or "histogram"', 400);
    }
    event.metricType = metricType;
    if (typeof entry["value"] !== "number" || !Number.isFinite(entry["value"])) {
      throw new ServiceError("metric events need a numeric value", 400);
    }
    event.value = entry["value"];
    const unit = clip(entry["unit"], 40);
    if (unit) event.unit = unit;
  }
  const attributes = parseAttributes(entry["attributes"]);
  if (attributes) event.attributes = attributes;
  return event;
}

// ---------------------------------------------------------------------------
// OTLP → activity-store flattening (contract export)
// ---------------------------------------------------------------------------

function nanoToIso(nano: string): string {
  const ms = Number(BigInt(nano) / 1_000_000n);
  return new Date(ms).toISOString();
}

function nanoDurationMs(start: string, end: string): number {
  const delta = BigInt(end) - BigInt(start);
  if (delta <= 0n) return 0;
  return Number(delta / 1_000_000n);
}

function otlpAttributes(
  attrs: OtlpKeyValue[] | undefined,
): Record<string, string | number | boolean> | undefined {
  if (!attrs || attrs.length === 0) return undefined;
  const out: Record<string, string | number | boolean> = {};
  let count = 0;
  for (const attr of attrs) {
    if (count >= 20) break;
    if (!attr.key) continue;
    const v = attr.value;
    if (v.stringValue !== undefined) out[attr.key] = v.stringValue.slice(0, 500);
    else if (v.boolValue !== undefined) out[attr.key] = v.boolValue;
    else if (v.doubleValue !== undefined) out[attr.key] = v.doubleValue;
    else if (v.intValue !== undefined) {
      const n = Number(v.intValue);
      out[attr.key] = Number.isFinite(n) ? n : v.intValue.slice(0, 500);
    } else continue;
    count += 1;
  }
  return count > 0 ? out : undefined;
}

function mapSeverity(text: string | undefined): TelemetryLevel {
  const normalized = (text ?? "").trim().toLowerCase();
  if (normalized === "debug" || normalized === "trace") return "debug";
  if (normalized === "warn" || normalized === "warning") return "warn";
  if (normalized === "error" || normalized === "fatal" || normalized === "critical") return "error";
  return "info";
}

function bodyToMessage(body: OtlpLogRecord["body"]): string {
  if (!body) return "";
  if (body.stringValue !== undefined) return body.stringValue;
  if (body.boolValue !== undefined) return String(body.boolValue);
  if (body.doubleValue !== undefined) return String(body.doubleValue);
  if (body.intValue !== undefined) return body.intValue;
  return "";
}

function numberPointValue(point: OtlpNumberDataPoint): number {
  if (typeof point.asDouble === "number") return point.asDouble;
  if (typeof point.asInt === "string") {
    const n = Number(point.asInt);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function flattenSpan(span: OtlpSpan, source: TelemetrySource): TelemetryEvent {
  const event: TelemetryEvent = {
    id: newEventId(),
    kind: "span",
    traceId: span.traceId,
    spanId: span.spanId,
    source,
    at: nanoToIso(span.startTimeUnixNano),
    name: clip(span.name, 200) ?? "span",
    durationMs: nanoDurationMs(span.startTimeUnixNano, span.endTimeUnixNano),
    status: span.status?.code === 2 ? "error" : "ok",
  };
  if (span.parentSpanId) event.parentSpanId = span.parentSpanId;
  if (event.status === "error") {
    event.error = { message: clip(span.status?.message) ?? "error" };
  }
  const attributes = otlpAttributes(span.attributes);
  if (attributes) event.attributes = attributes;
  return event;
}

function flattenLog(record: OtlpLogRecord, source: TelemetrySource): TelemetryEvent {
  const event: TelemetryEvent = {
    id: newEventId(),
    kind: "log",
    source,
    at: nanoToIso(record.timeUnixNano),
    level: mapSeverity(record.severityText),
    message: clip(bodyToMessage(record.body)) ?? "",
  };
  if (record.traceId) event.traceId = record.traceId;
  if (record.spanId) event.spanId = record.spanId;
  const attributes = otlpAttributes(record.attributes);
  if (attributes) event.attributes = attributes;
  return event;
}

function flattenMetricPoints(metric: OtlpMetric, source: TelemetrySource): TelemetryEvent[] {
  const name = clip(metric.name, 200) ?? "metric";
  const unit = clip(metric.unit, 40);
  const events: TelemetryEvent[] = [];

  if (metric.gauge) {
    for (const point of metric.gauge.dataPoints) {
      const event: TelemetryEvent = {
        id: newEventId(),
        kind: "metric",
        source,
        at: nanoToIso(point.timeUnixNano),
        name,
        metricType: "gauge",
        value: numberPointValue(point),
      };
      if (unit) event.unit = unit;
      const attributes = otlpAttributes(point.attributes);
      if (attributes) event.attributes = attributes;
      events.push(event);
    }
  } else if (metric.sum) {
    for (const point of metric.sum.dataPoints) {
      const event: TelemetryEvent = {
        id: newEventId(),
        kind: "metric",
        source,
        at: nanoToIso(point.timeUnixNano),
        name,
        metricType: "counter",
        value: numberPointValue(point),
      };
      if (unit) event.unit = unit;
      const attributes = otlpAttributes(point.attributes);
      if (attributes) event.attributes = attributes;
      events.push(event);
    }
  } else if (metric.histogram) {
    for (const point of metric.histogram.dataPoints) {
      const event: TelemetryEvent = {
        id: newEventId(),
        kind: "metric",
        source,
        at: nanoToIso(point.timeUnixNano),
        name,
        metricType: "histogram",
        value: typeof point.sum === "number" ? point.sum : 0,
      };
      if (unit) event.unit = unit;
      const attributes = otlpAttributes(point.attributes);
      if (attributes) event.attributes = attributes;
      events.push(event);
    }
  }
  return events;
}

function flattenExport(args: TelemetryExportArgs, ctx: ServiceContext): {
  events: TelemetryEvent[];
  accepted: TelemetryExportResult["accepted"];
} {
  const source = stampSource({ type: "widget" }, ctx);
  const events: TelemetryEvent[] = [];
  let spans = 0;
  let logs = 0;
  let metrics = 0;

  for (const resourceSpans of args.resourceSpans ?? []) {
    for (const scopeSpans of resourceSpans.scopeSpans) {
      for (const span of scopeSpans.spans) {
        events.push(flattenSpan(span, source));
        spans += 1;
      }
    }
  }
  for (const resourceLogs of args.resourceLogs ?? []) {
    for (const scopeLogs of resourceLogs.scopeLogs) {
      for (const record of scopeLogs.logRecords) {
        events.push(flattenLog(record, source));
        logs += 1;
      }
    }
  }
  for (const resourceMetrics of args.resourceMetrics ?? []) {
    for (const scopeMetrics of resourceMetrics.scopeMetrics) {
      for (const metric of scopeMetrics.metrics) {
        const points = flattenMetricPoints(metric, source);
        events.push(...points);
        metrics += points.length;
      }
    }
  }

  return { events, accepted: { spans, logs, metrics } };
}

function exportToolEntry(): CoreService["tools"][number] {
  const [entry] = telemetryToolEntries("telemetry");
  return {
    name: entry!.name,
    operation: "export",
    description: entry!.description,
    inputSchema: entry!.inputSchema,
  };
}

// ---------------------------------------------------------------------------
// Server-side producer — used by the dispatch/runner instrumentation, which
// has no ServiceContext ceremony and must never fail the traffic it observes.
// ---------------------------------------------------------------------------

export type TelemetryEventInput = Omit<TelemetryEvent, "id" | "at"> & { at?: string };

/** Fire-and-forget write from an instrumented server layer. Never throws. */
export async function recordTelemetry(
  workspaceId: string,
  actor: string,
  events: TelemetryEventInput[],
): Promise<void> {
  try {
    const store = getRecordStore();
    const expiresAtEpochSeconds = ttlEpochSeconds();
    for (const input of events.slice(0, BATCH_CAP)) {
      const event: TelemetryEvent = {
        ...input,
        id: newEventId(),
        at: input.at ?? new Date().toISOString(),
      };
      await store.set(workspaceId, SCOPE, event.id, event, actor, { expiresAtEpochSeconds });
    }
  } catch {
    // Telemetry must never take down the call it observes.
  }
}

/**
 * Parse the optional `X-Telemetry-Source` request header — the client's
 * attribution for a dispatched call (`{"type":"widget","path":"…",
 * "sessionId":"…","traceId":"…"}`). The server stays the single writer of
 * dispatch spans; the client only says *on whose behalf* the call was made.
 * Garbage in → undefined out; never throws.
 */
export function parseTelemetrySourceHeader(
  headerValue: string | undefined,
): { source: TelemetrySource; traceId?: string } | undefined {
  if (!headerValue || headerValue.length > 600) return undefined;
  try {
    const raw = JSON.parse(headerValue) as Record<string, unknown>;
    const source = parseSource(raw);
    const traceId = clip(raw["traceId"], 64);
    return { source, ...(traceId ? { traceId } : {}) };
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

interface QueryFilter {
  traceId?: string;
  sourceType?: TelemetrySourceType;
  path?: string;
  app?: string;
  runId?: string;
  level?: TelemetryLevel;
  status?: "ok" | "error";
  since?: number;
}

function matches(event: TelemetryEvent, filter: QueryFilter, ctx: ServiceContext): boolean {
  // App sessions only see their own app's stream.
  if (ctx.appScope && event.source.app !== ctx.appScope.name) return false;
  if (filter.traceId && event.traceId !== filter.traceId) return false;
  if (filter.sourceType && event.source.type !== filter.sourceType) return false;
  if (filter.path && event.source.path !== filter.path) return false;
  if (filter.app && event.source.app !== filter.app) return false;
  if (filter.runId && event.source.runId !== filter.runId) return false;
  if (filter.level && event.level !== filter.level) return false;
  if (filter.status && event.status !== filter.status) return false;
  if (filter.since && Date.parse(event.at) < filter.since) return false;
  return true;
}

function parseFilter(args: Record<string, unknown>): QueryFilter {
  const filter: QueryFilter = {};
  const traceId = clip(args["traceId"], 64);
  const path = clip(args["path"], 300);
  const app = clip(args["app"], 100);
  const runId = clip(args["runId"], 80);
  if (traceId) filter.traceId = traceId;
  if (path) filter.path = path;
  if (app) filter.app = app;
  if (runId) filter.runId = runId;
  const source = args["source"];
  if (
    source === "tool" ||
    source === "workflow" ||
    source === "widget" ||
    source === "app" ||
    source === "chat"
  ) {
    filter.sourceType = source;
  }
  const level = args["level"];
  if (level === "debug" || level === "info" || level === "warn" || level === "error") {
    filter.level = level;
  }
  if (args["status"] === "error" || args["status"] === "ok") filter.status = args["status"];
  if (typeof args["since"] === "string" && !Number.isNaN(Date.parse(args["since"]))) {
    filter.since = Date.parse(args["since"]);
  }
  return filter;
}

/** Newest-first bounded walk over the scope, filtered. */
async function queryEvents(
  ctx: ServiceContext,
  filter: QueryFilter,
  limit: number,
): Promise<TelemetryEvent[]> {
  const store = getRecordStore();
  const keys = (await store.list(ctx.workspaceId, SCOPE)).reverse().slice(0, SCAN_CAP);
  const events: TelemetryEvent[] = [];
  for (const key of keys) {
    if (events.length >= limit) break;
    const hit = await store.get(ctx.workspaceId, SCOPE, key).catch(() => undefined);
    const event = hit?.value as TelemetryEvent | undefined;
    if (event && matches(event, filter, ctx)) events.push(event);
  }
  return events;
}

interface TraceSummary {
  traceId: string;
  name: string;
  source: TelemetrySource;
  startedAt: string;
  spans: number;
  logs: number;
  errors: number;
  status: "ok" | "error";
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export const telemetryService: CoreService = {
  meta: {
    label: "Activity",
    blurb: "Workspace traces with status and source filters",
    icon: "activity",
  },
  tools: [
    {
      name: "telemetry.emit",
      operation: "emit",
      description:
        "Record debugging telemetry: a batch of OTel-shaped events. Spans: {kind:'span', name, traceId?, spanId?, parentSpanId?, durationMs?, status:'ok'|'error', error?:{message,stack}, source:{type,path?,runId?,sessionId?}, attributes?}. Logs: {kind:'log', level, message, traceId?, source, attributes?}. Metrics: {kind:'metric', name, metricType:'counter'|'gauge'|'histogram', value, unit?, source, attributes?}. Events expire after 3 days.",
      inputSchema: {
        type: "object",
        properties: { events: { type: "array" } },
        required: ["events"],
      },
    },
    {
      name: "telemetry.query",
      operation: "query",
      description:
        "Read telemetry events, newest first. Filters: traceId, source ('tool'|'workflow'|'widget'|'app'|'chat'), path (script path), app, runId, level, status ('error' to see failures), since (ISO), limit. Use this to debug a failing widget or workflow — errors carry message + stack, spans carry durations, metrics carry name/value/unit.",
      inputSchema: {
        type: "object",
        properties: {
          traceId: { type: "string" },
          source: { type: "string" },
          path: { type: "string" },
          app: { type: "string" },
          runId: { type: "string" },
          level: { type: "string" },
          status: { type: "string" },
          since: { type: "string" },
          limit: { type: "number" },
        },
      },
    },
    {
      name: "telemetry.traces",
      operation: "traces",
      description:
        "Recent traces (grouped events), newest first: {traceId, name, source, startedAt, spans, logs, errors, status}. Filters: source, path, app, runId, status, since, limit. Start here to see what failed lately, then telemetry.query {traceId} for the full story.",
      inputSchema: {
        type: "object",
        properties: {
          source: { type: "string" },
          path: { type: "string" },
          app: { type: "string" },
          runId: { type: "string" },
          status: { type: "string" },
          since: { type: "string" },
          limit: { type: "number" },
        },
      },
    },
    exportToolEntry(),
  ],

  async call(ctx, procedure, args) {
    switch (procedure) {
      case "emit": {
        if (!Array.isArray(args["events"]) || args["events"].length === 0) {
          throw new ServiceError("events must be a non-empty array", 400);
        }
        if (args["events"].length > BATCH_CAP) {
          throw new ServiceError(`at most ${BATCH_CAP} events per batch`, 400);
        }
        const store = getRecordStore();
        const expiresAtEpochSeconds = ttlEpochSeconds();
        const ids: string[] = [];
        for (const raw of args["events"]) {
          const event = parseEvent(raw, ctx);
          await store.set(ctx.workspaceId, SCOPE, event.id, event, ctx.userId, {
            expiresAtEpochSeconds,
          });
          ids.push(event.id);
        }
        return { recorded: ids.length };
      }

      case "export": {
        try {
          validateExportArgs(args as TelemetryExportArgs);
        } catch (err) {
          if (err instanceof TelemetryError) {
            throw new ServiceError(err.message, err.status as 400);
          }
          throw err;
        }
        const { events, accepted } = flattenExport(args as TelemetryExportArgs, ctx);
        if (events.length > BATCH_CAP) {
          throw new ServiceError(`at most ${BATCH_CAP} events per batch`, 400);
        }
        const store = getRecordStore();
        const expiresAtEpochSeconds = ttlEpochSeconds();
        for (const event of events) {
          await store.set(ctx.workspaceId, SCOPE, event.id, event, ctx.userId, {
            expiresAtEpochSeconds,
          });
        }
        const result: TelemetryExportResult = { accepted };
        return result;
      }

      case "query": {
        const limit = Math.min(Number(args["limit"]) || LIST_CAP, LIST_CAP);
        const events = await queryEvents(ctx, parseFilter(args), limit);
        return { events };
      }

      case "traces": {
        const limit = Math.min(Number(args["limit"]) || 50, 50);
        const filter = parseFilter(args);
        // Trace status filtering happens after grouping; pull events broadly.
        const statusFilter = filter.status;
        delete filter.status;
        const events = await queryEvents(ctx, filter, LIST_CAP);
        const byTrace = new Map<string, TelemetryEvent[]>();
        for (const event of events) {
          const key = event.traceId ?? `solo:${event.id}`;
          byTrace.set(key, [...(byTrace.get(key) ?? []), event]);
        }
        const traces: TraceSummary[] = [];
        for (const [traceId, group] of byTrace) {
          if (traces.length >= limit) break;
          const root =
            group.find((e) => e.kind === "span" && !e.parentSpanId) ??
            group.find((e) => e.kind === "span") ??
            group[group.length - 1]!;
          const errors = group.filter(
            (e) => e.status === "error" || e.level === "error",
          ).length;
          const summary: TraceSummary = {
            traceId,
            name: root.name ?? root.message?.slice(0, 80) ?? "(trace)",
            source: root.source,
            startedAt: group[group.length - 1]!.at,
            spans: group.filter((e) => e.kind === "span").length,
            logs: group.filter((e) => e.kind === "log").length,
            errors,
            status: errors > 0 ? "error" : "ok",
          };
          if (statusFilter && summary.status !== statusFilter) continue;
          traces.push(summary);
        }
        return { traces };
      }

      default:
        throw new ServiceError(`Unknown telemetry procedure: ${procedure}`, 404);
    }
  },
};

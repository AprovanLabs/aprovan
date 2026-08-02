/**
 * @utdk/telemetry — the shared telemetry-export contract for UTDK
 * observability providers.
 *
 * One operation, `export`, whose payload IS the OTLP/HTTP JSON encoding
 * (subset) for spans and logs — field names and casing exactly as OTLP JSON
 * (`traceId` hex, `timeUnixNano` as a string), so a payload built for this
 * contract posts to any OTLP collector unmodified (D7). Attribution
 * (Decision 9) rides resource attributes under the `aprovan.*` key prefix
 * via {@link withAttribution}.
 *
 * Deliberately absent: metrics (`resourceMetrics` is reserved — present ⇒
 * 501 unless a future version accepts it) and any query/read surface, which
 * stays native because it reads the workspace's own store.
 */

export const MAX_EXPORT_BYTES = 4_000_000;

/** Decision 9 attribution keys, set as resource attributes. */
export const ATTR_TENANT = "aprovan.tenant";
export const ATTR_PRINCIPAL = "aprovan.principal";
export const ATTR_SOURCE = "aprovan.source";

/** Error with an HTTP-ish status for hosts that map errors onto responses. */
export class TelemetryError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "TelemetryError";
    this.status = status;
  }
}

/** OTLP JSON AnyValue-carrying attribute (subset). */
export interface OtlpKeyValue {
  key: string;
  value: {
    stringValue?: string;
    /** OTLP JSON encodes 64-bit ints as strings. */
    intValue?: string;
    doubleValue?: number;
    boolValue?: boolean;
    arrayValue?: { values: OtlpKeyValue["value"][] };
  };
}

export interface OtlpResource {
  attributes: OtlpKeyValue[];
}

export interface OtlpSpan {
  /** Hex-encoded, exactly as OTLP JSON. */
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  /** OTLP SpanKind: 1 internal, 2 server, 3 client, 4 producer, 5 consumer. */
  kind?: 1 | 2 | 3 | 4 | 5;
  startTimeUnixNano: string;
  endTimeUnixNano: string;
  attributes?: OtlpKeyValue[];
  /** OTLP StatusCode: 0 unset, 1 ok, 2 error. */
  status?: { code: 0 | 1 | 2; message?: string };
  events?: Array<{ timeUnixNano: string; name: string; attributes?: OtlpKeyValue[] }>;
}

export interface OtlpLogRecord {
  timeUnixNano: string;
  severityNumber?: number;
  severityText?: string;
  body?: OtlpKeyValue["value"];
  attributes?: OtlpKeyValue[];
  traceId?: string;
  spanId?: string;
}

export interface OtlpResourceSpans {
  resource?: OtlpResource;
  scopeSpans: Array<{ scope?: { name: string; version?: string }; spans: OtlpSpan[] }>;
}

export interface OtlpResourceLogs {
  resource?: OtlpResource;
  scopeLogs: Array<{ scope?: { name: string; version?: string }; logRecords: OtlpLogRecord[] }>;
}

/**
 * At least one of the two, non-empty (400 otherwise). `resourceMetrics` is
 * reserved: present ⇒ 501 unless a future version accepts it.
 */
export interface TelemetryExportArgs {
  resourceSpans?: OtlpResourceSpans[];
  resourceLogs?: OtlpResourceLogs[];
}

/** Mirrors OTLP partial success: rejected counts + message when not all landed. */
export interface TelemetryExportResult {
  accepted: { spans: number; logs: number };
  rejected?: { spans: number; logs: number; message: string };
}

export interface TelemetryClient {
  export(args: TelemetryExportArgs): Promise<TelemetryExportResult>;
}

/** Options every telemetry provider client factory accepts. */
export interface TelemetryClientOptions {
  /** Injected headers; the secret rides `Authorization: Bearer …`. */
  headers?: Record<string, string>;
  baseUrl?: string;
  /** Injection point for tests. */
  fetchImpl?: typeof fetch;
}

/**
 * Pull the provider secret out of the injected headers (the UTDK executor
 * translates a `bearer_token` credential into `Authorization: Bearer …`).
 */
export function secretFromHeaders(
  headers: Record<string, string> | undefined,
  provider: string,
  secretName: string,
): string {
  const raw = headers?.["Authorization"] ?? headers?.["authorization"] ?? "";
  const match = /^Bearer\s+(.+)$/iu.exec(raw);
  if (!match?.[1]) {
    throw new TelemetryError(
      `${provider} needs a bearer_token credential holding the ${secretName}. Add one for provider "${provider}".`,
      400,
    );
  }
  return match[1];
}

const HEX_RE = /^[0-9a-f]+$/u;
const NANO_RE = /^\d+$/u;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function requireHex(value: unknown, bytes: number, field: string): void {
  if (typeof value !== "string" || value.length !== bytes * 2 || !HEX_RE.test(value)) {
    throw new TelemetryError(`${field} must be ${bytes * 2} lowercase hex characters`, 400);
  }
}

function requireNano(value: unknown, field: string): void {
  if (typeof value !== "string" || !NANO_RE.test(value)) {
    throw new TelemetryError(`${field} must be a Unix-nanosecond string (OTLP JSON encodes 64-bit ints as strings)`, 400);
  }
}

function validateSpan(span: OtlpSpan, field: string): void {
  if (!isRecord(span)) throw new TelemetryError(`${field} must be an object`, 400);
  requireHex(span.traceId, 16, `${field}.traceId`);
  requireHex(span.spanId, 8, `${field}.spanId`);
  if (span.parentSpanId !== undefined) requireHex(span.parentSpanId, 8, `${field}.parentSpanId`);
  if (typeof span.name !== "string" || span.name === "") {
    throw new TelemetryError(`${field}.name must be a non-empty string`, 400);
  }
  requireNano(span.startTimeUnixNano, `${field}.startTimeUnixNano`);
  requireNano(span.endTimeUnixNano, `${field}.endTimeUnixNano`);
}

function validateLogRecord(record: OtlpLogRecord, field: string): void {
  if (!isRecord(record)) throw new TelemetryError(`${field} must be an object`, 400);
  requireNano(record.timeUnixNano, `${field}.timeUnixNano`);
  if (record.traceId !== undefined) requireHex(record.traceId, 16, `${field}.traceId`);
  if (record.spanId !== undefined) requireHex(record.spanId, 8, `${field}.spanId`);
}

/**
 * Validate an export payload: OTLP/HTTP JSON shapes pass unmodified; a
 * payload with neither non-empty `resourceSpans` nor `resourceLogs` is 400;
 * a reserved `resourceMetrics` block is 501.
 */
export function validateExportArgs(args: TelemetryExportArgs): void {
  if (!isRecord(args)) {
    throw new TelemetryError("export requires { resourceSpans?, resourceLogs? }", 400);
  }
  if ((args as Record<string, unknown>).resourceMetrics !== undefined) {
    throw new TelemetryError("resourceMetrics is reserved and not accepted by this contract version", 501);
  }
  const spans = args.resourceSpans;
  const logs = args.resourceLogs;
  const hasSpans = Array.isArray(spans) && spans.length > 0;
  const hasLogs = Array.isArray(logs) && logs.length > 0;
  if (!hasSpans && !hasLogs) {
    throw new TelemetryError("export requires at least one of resourceSpans or resourceLogs, non-empty", 400);
  }

  if (hasSpans) {
    spans.forEach((resourceSpans, i) => {
      if (!isRecord(resourceSpans) || !Array.isArray(resourceSpans.scopeSpans)) {
        throw new TelemetryError(`resourceSpans[${i}].scopeSpans must be an array`, 400);
      }
      resourceSpans.scopeSpans.forEach((scopeSpans, j) => {
        if (!isRecord(scopeSpans) || !Array.isArray(scopeSpans.spans)) {
          throw new TelemetryError(`resourceSpans[${i}].scopeSpans[${j}].spans must be an array`, 400);
        }
        scopeSpans.spans.forEach((span, k) =>
          validateSpan(span, `resourceSpans[${i}].scopeSpans[${j}].spans[${k}]`),
        );
      });
    });
  }

  if (hasLogs) {
    logs.forEach((resourceLogs, i) => {
      if (!isRecord(resourceLogs) || !Array.isArray(resourceLogs.scopeLogs)) {
        throw new TelemetryError(`resourceLogs[${i}].scopeLogs must be an array`, 400);
      }
      resourceLogs.scopeLogs.forEach((scopeLogs, j) => {
        if (!isRecord(scopeLogs) || !Array.isArray(scopeLogs.logRecords)) {
          throw new TelemetryError(`resourceLogs[${i}].scopeLogs[${j}].logRecords must be an array`, 400);
        }
        scopeLogs.logRecords.forEach((record, k) =>
          validateLogRecord(record, `resourceLogs[${i}].scopeLogs[${j}].logRecords[${k}]`),
        );
      });
    });
  }

  const serialized = JSON.stringify(args);
  if (new TextEncoder().encode(serialized).length > MAX_EXPORT_BYTES) {
    throw new TelemetryError(`export payload exceeds ${MAX_EXPORT_BYTES} bytes`, 400);
  }
}

/**
 * Fold Decision 9 attribution into a resource's attributes under the
 * `aprovan.*` keys, replacing any existing values for those keys. Returns a
 * new resource; the input is not mutated.
 */
export function withAttribution(
  resource: OtlpResource | undefined,
  attribution: { tenant?: string; principal?: string; source?: string },
): OtlpResource {
  const keyed: Array<[string, string | undefined]> = [
    [ATTR_TENANT, attribution.tenant],
    [ATTR_PRINCIPAL, attribution.principal],
    [ATTR_SOURCE, attribution.source],
  ];
  const replaced = new Set(keyed.filter(([, value]) => value !== undefined).map(([key]) => key));
  const attributes = (resource?.attributes ?? []).filter((attr) => !replaced.has(attr.key));
  for (const [key, value] of keyed) {
    if (value !== undefined) {
      attributes.push({ key, value: { stringValue: value } });
    }
  }
  return { attributes };
}

/**
 * Tool-discovery entries for a telemetry provider — the static `tools`
 * export the gateway's `GET /tools` prefers. One entry.
 */
export function telemetryToolEntries(
  provider: string,
): Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> {
  return [
    {
      name: `${provider}.export`,
      description:
        "Export spans and/or logs in the OTLP/HTTP JSON encoding (traceId hex, timeUnixNano strings — a payload " +
        "built for any OTLP collector posts here unmodified). At least one of resourceSpans/resourceLogs, " +
        `non-empty; total payload ≤ ${MAX_EXPORT_BYTES} bytes. Returns { accepted, rejected? } mirroring OTLP partial success.`,
      inputSchema: {
        type: "object",
        properties: {
          resourceSpans: {
            type: "array",
            description: "OTLP JSON ResourceSpans array (resource attributes + scopeSpans[].spans[])",
          },
          resourceLogs: {
            type: "array",
            description: "OTLP JSON ResourceLogs array (resource attributes + scopeLogs[].logRecords[])",
          },
        },
      },
    },
  ];
}

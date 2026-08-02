import { describe, expect, it } from "vitest";
import {
  ATTR_PRINCIPAL,
  ATTR_SOURCE,
  ATTR_TENANT,
  TelemetryError,
  telemetryToolEntries,
  validateExportArgs,
  withAttribution,
  secretFromHeaders,
} from "../index.js";
import type { OtlpResource, TelemetryExportArgs } from "../index.js";

const statusOf = (fn: () => void): number => {
  try {
    fn();
  } catch (error) {
    if (error instanceof TelemetryError) return error.status;
    throw error;
  }
  throw new Error("expected a TelemetryError");
};

/**
 * A real OTLP/HTTP JSON sample payload (the shape `POST /v1/traces` +
 * `/v1/logs` accept): hex ids, stringified unix nanos, attribute key/values.
 * The contract accepts it unmodified (spec scenario: OTLP-shaped).
 */
const otlpSample: TelemetryExportArgs = {
  resourceSpans: [
    {
      resource: {
        attributes: [
          { key: "service.name", value: { stringValue: "checkout" } },
          { key: "process.pid", value: { intValue: "4221" } },
        ],
      },
      scopeSpans: [
        {
          scope: { name: "example.instrumentation", version: "1.0.0" },
          spans: [
            {
              traceId: "5b8efff798038103d269b633813fc60c",
              spanId: "eee19b7ec3c1b174",
              parentSpanId: "eee19b7ec3c1b173",
              name: "HTTP GET /cart",
              kind: 2,
              startTimeUnixNano: "1544712660000000000",
              endTimeUnixNano: "1544712661000000000",
              attributes: [
                { key: "http.method", value: { stringValue: "GET" } },
                { key: "http.status_code", value: { intValue: "200" } },
              ],
              status: { code: 1 },
              events: [
                {
                  timeUnixNano: "1544712660500000000",
                  name: "cache.miss",
                  attributes: [{ key: "cache.key", value: { stringValue: "cart:42" } }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  resourceLogs: [
    {
      resource: { attributes: [{ key: "service.name", value: { stringValue: "checkout" } }] },
      scopeLogs: [
        {
          scope: { name: "example.instrumentation" },
          logRecords: [
            {
              timeUnixNano: "1544712660300000000",
              severityNumber: 9,
              severityText: "INFO",
              body: { stringValue: "cart loaded" },
              attributes: [{ key: "cart.items", value: { intValue: "3" } }],
              traceId: "5b8efff798038103d269b633813fc60c",
              spanId: "eee19b7ec3c1b174",
            },
          ],
        },
      ],
    },
  ],
};

describe("validateExportArgs", () => {
  it("accepts a real OTLP/HTTP JSON sample payload unmodified", () => {
    expect(() => validateExportArgs(otlpSample)).not.toThrow();
    // spans-only and logs-only halves are each sufficient
    expect(() => validateExportArgs({ resourceSpans: otlpSample.resourceSpans })).not.toThrow();
    expect(() => validateExportArgs({ resourceLogs: otlpSample.resourceLogs })).not.toThrow();
  });

  it("rejects a payload with neither spans nor logs (or empty arrays) with 400", () => {
    expect(statusOf(() => validateExportArgs({}))).toBe(400);
    expect(statusOf(() => validateExportArgs({ resourceSpans: [], resourceLogs: [] }))).toBe(400);
  });

  it("rejects the reserved resourceMetrics with 501", () => {
    expect(
      statusOf(() =>
        validateExportArgs({ ...otlpSample, resourceMetrics: [] } as unknown as TelemetryExportArgs),
      ),
    ).toBe(501);
  });

  it("rejects a span without traceId with a contract error", () => {
    const bad = JSON.parse(JSON.stringify(otlpSample)) as TelemetryExportArgs;
    delete (bad.resourceSpans![0]!.scopeSpans[0]!.spans[0] as Record<string, unknown>).traceId;
    expect(statusOf(() => validateExportArgs(bad))).toBe(400);
  });

  it("rejects malformed hex ids and non-string nanos with 400", () => {
    const badHex = JSON.parse(JSON.stringify(otlpSample)) as TelemetryExportArgs;
    badHex.resourceSpans![0]!.scopeSpans[0]!.spans[0]!.spanId = "not-hex";
    expect(statusOf(() => validateExportArgs(badHex))).toBe(400);

    const badNano = JSON.parse(JSON.stringify(otlpSample)) as TelemetryExportArgs;
    (badNano.resourceSpans![0]!.scopeSpans[0]!.spans[0] as Record<string, unknown>).startTimeUnixNano = 1544712660;
    expect(statusOf(() => validateExportArgs(badNano))).toBe(400);
  });

  it("rejects a log record without timeUnixNano with 400", () => {
    const bad = JSON.parse(JSON.stringify(otlpSample)) as TelemetryExportArgs;
    delete (bad.resourceLogs![0]!.scopeLogs[0]!.logRecords[0] as Record<string, unknown>).timeUnixNano;
    expect(statusOf(() => validateExportArgs(bad))).toBe(400);
  });
});

describe("withAttribution", () => {
  it("adds aprovan.* resource attributes without mutating the input", () => {
    const resource: OtlpResource = {
      attributes: [{ key: "service.name", value: { stringValue: "checkout" } }],
    };
    const attributed = withAttribution(resource, {
      tenant: "acme",
      principal: "user:42",
      source: "workflow:nightly",
    });
    expect(attributed.attributes).toEqual([
      { key: "service.name", value: { stringValue: "checkout" } },
      { key: ATTR_TENANT, value: { stringValue: "acme" } },
      { key: ATTR_PRINCIPAL, value: { stringValue: "user:42" } },
      { key: ATTR_SOURCE, value: { stringValue: "workflow:nightly" } },
    ]);
    expect(resource.attributes).toHaveLength(1);
  });

  it("replaces existing aprovan.* values and handles an absent resource", () => {
    const attributed = withAttribution(
      { attributes: [{ key: ATTR_TENANT, value: { stringValue: "old" } }] },
      { tenant: "new" },
    );
    expect(attributed.attributes).toEqual([{ key: ATTR_TENANT, value: { stringValue: "new" } }]);

    const fromNothing = withAttribution(undefined, { source: "chat" });
    expect(fromNothing.attributes).toEqual([{ key: ATTR_SOURCE, value: { stringValue: "chat" } }]);
  });
});

describe("secretFromHeaders", () => {
  it("extracts the bearer secret and 400s when absent", () => {
    expect(secretFromHeaders({ Authorization: "Bearer tok" }, "honeycomb", "API key")).toBe("tok");
    expect(statusOf(() => secretFromHeaders({}, "honeycomb", "API key"))).toBe(400);
  });
});

describe("telemetryToolEntries", () => {
  it("exposes exactly one export operation under the provider prefix", () => {
    const entries = telemetryToolEntries("otlp");
    expect(entries.map((entry) => entry.name)).toEqual(["otlp.export"]);
    expect(entries[0]!.inputSchema).toMatchObject({ type: "object" });
    expect(entries[0]!.description).toContain("OTLP");
  });
});

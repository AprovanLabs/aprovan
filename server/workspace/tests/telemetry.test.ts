/**
 * The telemetry core service: OTel-shaped spans/logs in the record store,
 * queryable by trace/source/status, TTL'd, with app-stamped provenance.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-telemetry-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetRateLimiters();
  resetAppRateLimiters();
});

const manage = (path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

const putFile = (path: string, content: string) =>
  createApp().request(`/fs/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

const appCall = (user: string, path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/apps/local/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-User": user },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

interface QueryResult {
  events: Array<{
    id: string;
    kind: string;
    traceId?: string;
    name?: string;
    message?: string;
    level?: string;
    status?: string;
    error?: { message: string; stack?: string };
    source: { type: string; path?: string; app?: string };
    metricType?: string;
    value?: number;
    unit?: string;
  }>;
}

describe("telemetry", () => {
  it("emits spans and logs, queries by trace/status/path", async () => {
    const traceId = "trace-widget-1";
    const emitted = await data<{ recorded: number }>(
      await manage("telemetry/emit", {
        events: [
          {
            kind: "span",
            traceId,
            spanId: "s1",
            name: "widget keyvalue.set",
            durationMs: 42,
            status: "error",
            error: { message: "400: value required", stack: "at setDraft (main.tsx:10)" },
            source: { type: "widget", path: "apps/demo/main.tsx" },
            attributes: { namespace: "keyvalue", procedure: "set" },
          },
          {
            kind: "log",
            traceId,
            level: "error",
            message: "save failed",
            source: { type: "widget", path: "apps/demo/main.tsx" },
          },
          {
            kind: "log",
            level: "info",
            message: "mounted",
            source: { type: "widget", path: "apps/other/main.tsx" },
          },
        ],
      }),
    );
    expect(emitted.recorded).toBe(3);

    const byTrace = await data<QueryResult>(await manage("telemetry/query", { traceId }));
    expect(byTrace.events).toHaveLength(2);

    const failures = await data<QueryResult>(
      await manage("telemetry/query", { status: "error" }),
    );
    expect(failures.events.some((e) => e.error?.message.includes("value required"))).toBe(true);

    const byPath = await data<QueryResult>(
      await manage("telemetry/query", { path: "apps/other/main.tsx" }),
    );
    expect(byPath.events).toHaveLength(1);
    expect(byPath.events[0]?.message).toBe("mounted");

    const errorLogs = await data<QueryResult>(
      await manage("telemetry/query", { level: "error" }),
    );
    expect(errorLogs.events.some((e) => e.message === "save failed")).toBe(true);
    expect(errorLogs.events.some((e) => e.message === "mounted")).toBe(false);
  });

  it("summarizes traces with error status", async () => {
    await manage("telemetry/emit", {
      events: [
        {
          kind: "span",
          traceId: "trace-run-9",
          spanId: "root",
          name: "workflow demo-run",
          status: "error",
          error: { message: "boom" },
          source: { type: "workflow", path: "workflows/demo.js", runId: "run9" },
        },
        {
          kind: "log",
          traceId: "trace-run-9",
          level: "warn",
          message: "retrying",
          source: { type: "workflow", runId: "run9" },
        },
      ],
    });

    const { traces } = await data<{
      traces: Array<{ traceId: string; name: string; status: string; errors: number; spans: number; logs: number }>;
    }>(await manage("telemetry/traces", { status: "error" }));
    const run = traces.find((t) => t.traceId === "trace-run-9");
    expect(run).toBeDefined();
    expect(run?.name).toBe("workflow demo-run");
    expect(run?.status).toBe("error");
    expect(run?.spans).toBe(1);
    expect(run?.logs).toBe(1);
  });

  it("rejects garbage shapes", async () => {
    expect((await manage("telemetry/emit", { events: [] })).status).toBe(400);
    expect((await manage("telemetry/emit", { events: [{ kind: "nope" }] })).status).toBe(400);
    expect((await manage("telemetry/emit", { events: [{ kind: "span" }] })).status).toBe(400);
  });
});

describe("telemetry (auto-instrumentation)", () => {
  it("records dispatch spans for core-service calls with header attribution", async () => {
    await createApp().request("/tools/keyvalue/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Telemetry-Source": JSON.stringify({
          type: "widget",
          path: "apps/probe/main.tsx",
          traceId: "trace-probe",
        }),
      },
      body: JSON.stringify({ args: { key: "probe", value: 1 } }),
    });
    // A failing call is recorded too (missing key → 400).
    await createApp().request("/tools/keyvalue/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ args: {} }),
    });

    const attributed = await data<QueryResult>(
      await manage("telemetry/query", { traceId: "trace-probe" }),
    );
    expect(attributed.events).toHaveLength(1);
    expect(attributed.events[0]?.name).toBe("keyvalue.set");
    expect(attributed.events[0]?.source.type).toBe("widget");
    expect(attributed.events[0]?.source.path).toBe("apps/probe/main.tsx");

    const failures = await data<QueryResult>(
      await manage("telemetry/query", { source: "tool", status: "error" }),
    );
    expect(failures.events.some((e) => e.name === "keyvalue.get")).toBe(true);
  });

  it("mirrors failed workflow runs and notifies on the failure transition", async () => {
    await putFile(
      "workflows/tele-boom.js",
      'export default async function run() { console.error("about to fail"); throw new Error("kaboom"); }',
    );
    await manage("workflows/register", {
      name: "tele-boom",
      script_path: "workflows/tele-boom.js",
    });
    const firstRun = await data<{ status: string; traceId: string }>(
      await manage("workflows/run", { name: "tele-boom" }),
    );
    expect(firstRun.status).toBe("failed");

    const { traces } = await data<{
      traces: Array<{ name: string; status: string; source: { runId?: string } }>;
    }>(await manage("telemetry/traces", { source: "workflow", status: "error" }));
    expect(traces.some((t) => t.name === "workflow tele-boom")).toBe(true);

    const byTrace = await data<QueryResult>(
      await manage("telemetry/query", { traceId: firstRun.traceId }),
    );
    expect(byTrace.events.some((e) => e.error?.message === "kaboom")).toBe(true);
    expect(byTrace.events.some((e) => e.message?.includes("about to fail"))).toBe(true);

    const list1 = await data<{ notifications: Array<{ title: string; link?: unknown }> }>(
      await manage("notifications/list", {}),
    );
    const failureNotes = list1.notifications.filter((n) => n.title.includes("tele-boom"));
    expect(failureNotes).toHaveLength(1);
    expect((failureNotes[0]?.link as { runId?: string })?.runId).toBeDefined();

    // A second consecutive failure stays quiet.
    await manage("workflows/run", { name: "tele-boom" });
    const list2 = await data<{ notifications: Array<{ title: string }> }>(
      await manage("notifications/list", {}),
    );
    expect(list2.notifications.filter((n) => n.title.includes("tele-boom"))).toHaveLength(1);
  });
});

describe("telemetry (app scoping)", () => {
  beforeAll(async () => {
    await putFile("apps/tele-demo/index.tsx", "export default function App(){return null}");
    const published = await manage("apps/publish", {
      name: "tele-demo",
      entry: "apps/tele-demo/index.tsx",
      allowed_tools: ["telemetry.*"],
    });
    expect(published.status).toBe(200);
  });

  it("stamps app provenance and confines app reads to the app's own stream", async () => {
    await appCall("alice", "tele-demo/tools/telemetry/emit", {
      events: [
        {
          kind: "log",
          level: "error",
          message: "app-side failure",
          // A forged source is overwritten by the server stamp.
          source: { type: "widget", app: "someone-else" },
        },
      ],
    });

    const appView = await data<QueryResult>(
      await appCall("alice", "tele-demo/tools/telemetry/query", {}),
    );
    expect(appView.events).toHaveLength(1);
    expect(appView.events[0]?.source.app).toBe("tele-demo");

    // Member view sees everything, including the app's stream…
    const memberView = await data<QueryResult>(
      await manage("telemetry/query", { app: "tele-demo" }),
    );
    expect(memberView.events.some((e) => e.message === "app-side failure")).toBe(true);

    // …but the app never sees workspace-level events from other sources.
    await manage("telemetry/emit", {
      events: [
        { kind: "log", level: "info", message: "member event", source: { type: "chat" } },
      ],
    });
    const appView2 = await data<QueryResult>(
      await appCall("alice", "tele-demo/tools/telemetry/query", {}),
    );
    expect(appView2.events.every((e) => e.source.app === "tele-demo")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Contract export (OTLP three-signal → activity store) + named instances
// ---------------------------------------------------------------------------

const TRACE_HEX = "00112233445566778899aabbccddeeff";
const SPAN_HEX = "0011223344556677";
const NOW_NANO = `${BigInt(Date.now()) * 1_000_000n}`;
const LATER_NANO = `${BigInt(Date.now()) * 1_000_000n + 42_000_000n}`;

describe("telemetry.export (OTLP)", () => {
  it("flattens a three-signal payload into queryable events with trace correlation", async () => {
    const result = await data<{
      accepted: { spans: number; logs: number; metrics: number };
    }>(
      await manage("telemetry/export", {
        resourceSpans: [
          {
            scopeSpans: [
              {
                spans: [
                  {
                    traceId: TRACE_HEX,
                    spanId: SPAN_HEX,
                    name: "otlp-span",
                    startTimeUnixNano: NOW_NANO,
                    endTimeUnixNano: LATER_NANO,
                    status: { code: 1 },
                  },
                ],
              },
            ],
          },
        ],
        resourceLogs: [
          {
            scopeLogs: [
              {
                logRecords: [
                  {
                    timeUnixNano: NOW_NANO,
                    severityText: "INFO",
                    body: { stringValue: "otlp-log" },
                    traceId: TRACE_HEX,
                    spanId: SPAN_HEX,
                  },
                ],
              },
            ],
          },
        ],
        resourceMetrics: [
          {
            scopeMetrics: [
              {
                metrics: [
                  {
                    name: "requests",
                    unit: "1",
                    gauge: {
                      dataPoints: [{ timeUnixNano: NOW_NANO, asDouble: 3 }],
                    },
                  },
                ],
              },
            ],
          },
        ],
      }),
    );
    expect(result.accepted).toEqual({ spans: 1, logs: 1, metrics: 1 });

    const byTrace = await data<QueryResult>(
      await manage("telemetry/query", { traceId: TRACE_HEX }),
    );
    expect(byTrace.events.some((e) => e.kind === "span" && e.name === "otlp-span")).toBe(true);
    expect(byTrace.events.some((e) => e.kind === "log" && e.message === "otlp-log")).toBe(true);

    const metrics = await data<
      QueryResult & {
        events: Array<{ metricType?: string; value?: number; unit?: string }>;
      }
    >(await manage("telemetry/query", {}));
    const metric = metrics.events.find((e) => e.kind === "metric" && e.name === "requests");
    expect(metric).toMatchObject({
      kind: "metric",
      metricType: "gauge",
      value: 3,
      unit: "1",
    });
  });

  it("rejects a malformed traceId with 400 and stores nothing", async () => {
    const before = await data<QueryResult>(await manage("telemetry/query", { limit: 200 }));
    const beforeCount = before.events.length;

    const res = await manage("telemetry/export", {
      resourceSpans: [
        {
          scopeSpans: [
            {
              spans: [
                {
                  traceId: "not-hex",
                  spanId: SPAN_HEX,
                  name: "bad",
                  startTimeUnixNano: NOW_NANO,
                  endTimeUnixNano: LATER_NANO,
                },
              ],
            },
          ],
        },
      ],
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: string };
    expect(body.error).toMatch(/traceId/u);

    const after = await data<QueryResult>(await manage("telemetry/query", { limit: 200 }));
    expect(after.events.length).toBe(beforeCount);
  });

  it("keeps bare telemetry.export on the core-service branch (D3)", async () => {
    // Even with a datadog credential connected, bare telemetry.export writes
    // the activity store — never vendor-egresses.
    await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "datadog",
        payload: { type: "bearer_token", token: "dd-key" },
      }),
    });

    const result = await data<{ accepted: { spans: number } }>(
      await manage("telemetry/export", {
        resourceSpans: [
          {
            scopeSpans: [
              {
                spans: [
                  {
                    traceId: "aabbccddeeff00112233445566778899",
                    spanId: "aabbccddeeff0011",
                    name: "native-only",
                    startTimeUnixNano: NOW_NANO,
                    endTimeUnixNano: LATER_NANO,
                  },
                ],
              },
            ],
          },
        ],
      }),
    );
    expect(result.accepted.spans).toBe(1);

    const found = await data<QueryResult>(
      await manage("telemetry/query", { traceId: "aabbccddeeff00112233445566778899" }),
    );
    expect(found.events.some((e) => e.name === "native-only")).toBe(true);

    // Bare telemetry stays kind:core; native is not a connectable vendor listing.
    const ns = await createApp().request("/tools/namespaces");
    const nsBody = (await ns.json()) as {
      namespaces: Array<{
        id: string;
        kind: string;
        compat?: Array<{ provider: string }>;
      }>;
    };
    expect(nsBody.namespaces.find((n) => n.id === "telemetry")?.kind).toBe("core");
    expect(nsBody.namespaces.some((n) => n.id === "telemetry" && n.kind === "interface")).toBe(
      false,
    );
  });
});

describe("telemetry.export (app scoping)", () => {
  it("stamps source.app on exported metrics and hides them from other apps", async () => {
    await putFile("apps/tele-metric/index.tsx", "export default function App(){return null}");
    const published = await manage("apps/publish", {
      name: "tele-metric",
      entry: "apps/tele-metric/index.tsx",
      allowed_tools: ["telemetry.*"],
    });
    expect(published.status).toBe(200);

    await putFile("apps/tele-other/index.tsx", "export default function App(){return null}");
    expect(
      (
        await manage("apps/publish", {
          name: "tele-other",
          entry: "apps/tele-other/index.tsx",
          allowed_tools: ["telemetry.*"],
        })
      ).status,
    ).toBe(200);

    await appCall("alice", "tele-metric/tools/telemetry/export", {
      resourceMetrics: [
        {
          scopeMetrics: [
            {
              metrics: [
                {
                  name: "app-only-metric",
                  gauge: { dataPoints: [{ timeUnixNano: NOW_NANO, asDouble: 9 }] },
                },
              ],
            },
          ],
        },
      ],
    });

    const own = await data<QueryResult>(
      await appCall("alice", "tele-metric/tools/telemetry/query", {}),
    );
    const metric = own.events.find((e) => e.kind === "metric" && e.name === "app-only-metric");
    expect(metric?.source.app).toBe("tele-metric");

    const other = await data<QueryResult>(
      await appCall("alice", "tele-other/tools/telemetry/query", {}),
    );
    expect(other.events.every((e) => e.source.app === "tele-other")).toBe(true);
    expect(other.events.some((e) => e.name === "app-only-metric")).toBe(false);
  });
});

describe("telemetry named instances (vendor egress)", () => {
  it("404s an unbound named instance instead of falling back to native", async () => {
    const res = await manage("telemetry:staging/export", {
      resourceSpans: [
        {
          scopeSpans: [
            {
              spans: [
                {
                  traceId: TRACE_HEX,
                  spanId: SPAN_HEX,
                  name: "nope",
                  startTimeUnixNano: NOW_NANO,
                  endTimeUnixNano: LATER_NANO,
                },
              ],
            },
          ],
        },
      ],
    });
    expect(res.status).toBe(404);
    const body = (await res.json()) as { error: string };
    expect(body.error).toMatch(/No such interface instance|bind/iu);
  });

  it("lists a bound vendor instance via telemetryToolEntries and omits native", async () => {
    await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "datadog",
        payload: { type: "bearer_token", token: "dd-discover" },
      }),
    });
    const bound = await manage("interfaces/bind", {
      interface: "telemetry",
      as: "dd",
      provider: "datadog",
    });
    expect(bound.status).toBe(200);

    const tools = await createApp().request("/tools?scope=configured");
    const toolsBody = (await tools.json()) as { tools: Array<{ name: string }> };
    expect(toolsBody.tools.some((t) => t.name === "telemetry:dd.export")).toBe(true);

    const ns = await createApp().request("/tools/namespaces");
    const nsBody = (await ns.json()) as {
      namespaces: Array<{ id: string; compat?: Array<{ provider: string }> }>;
    };
    const named = nsBody.namespaces.find((n) => n.id === "telemetry:dd");
    expect(named?.compat?.some((c) => c.provider === "native")).toBe(false);
    expect(named?.compat?.some((c) => c.provider === "datadog")).toBe(true);
  });

  it("501s a sentry-bound instance with the unavailable text", async () => {
    const bound = await manage("interfaces/bind", {
      interface: "telemetry",
      as: "sentry",
      provider: "sentry",
    });
    expect(bound.status).toBe(200);

    const res = await manage("telemetry:sentry/export", {
      resourceSpans: [
        {
          scopeSpans: [
            {
              spans: [
                {
                  traceId: TRACE_HEX,
                  spanId: SPAN_HEX,
                  name: "sentry-try",
                  startTimeUnixNano: NOW_NANO,
                  endTimeUnixNano: LATER_NANO,
                },
              ],
            },
          ],
        },
      ],
    });
    expect(res.status).toBe(501);
    const body = (await res.json()) as { error: string };
    expect(body.error).toMatch(/Sentry's OTLP ingestion/u);
    expect(body.error).not.toMatch(/subpath/u);
  });
});

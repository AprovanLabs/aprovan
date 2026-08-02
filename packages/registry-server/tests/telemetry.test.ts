/**
 * Telemetry tests (specs/registry-telemetry): context-required attribution
 * helpers, true no-op without an endpoint, tenant partitioning. The
 * every-exit-path dispatch-span assertions live in dispatch.test.ts.
 */

import { describe, expect, it } from "vitest";
import {
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { RegistryTelemetry } from "../src/telemetry/index.js";
import { ctx } from "./helpers.js";

function makeTelemetry() {
  const exporter = new InMemorySpanExporter();
  const telemetry = new RegistryTelemetry({
    spanProcessor: new SimpleSpanProcessor(exporter),
    serviceName: "test",
  });
  return { exporter, telemetry };
}

describe("RegistryTelemetry", () => {
  it("is a true no-op with no endpoint configured (no provider, no I/O)", async () => {
    const telemetry = new RegistryTelemetry({});
    expect(telemetry.enabled).toBe(false);
    // Helpers return immediately and never touch an exporter.
    telemetry.dispatchSpan(ctx(), {
      requestId: "r",
      namespace: "github",
      operation: "repos.get",
      status: 200,
      durationMs: 1,
    });
    await telemetry.shutdown();
  });

  it("dispatch spans carry the full attribution set", async () => {
    const { exporter, telemetry } = makeTelemetry();
    await telemetry.ready();
    telemetry.dispatchSpan(
      ctx({
        tenantId: "tenant-a",
        principal: "alice",
        source: { type: "workflow", runId: "run-7" },
      }),
      {
        requestId: "req-1",
        namespace: "sql",
        operation: "query",
        profile: "docs",
        status: 200,
        durationMs: 12,
      },
    );
    const spans = exporter.getFinishedSpans();
    expect(spans).toHaveLength(1);
    const attrs = spans[0]!.attributes;
    expect(attrs["aprovan.tenant"]).toBe("tenant-a");
    expect(attrs["aprovan.principal"]).toBe("alice");
    expect(attrs["aprovan.source.type"]).toBe("workflow");
    expect(attrs["aprovan.source.runId"]).toBe("run-7");
    expect(attrs["aprovan.request_id"]).toBe("req-1");
    expect(attrs["namespace"]).toBe("sql");
    expect(attrs["operation"]).toBe("query");
    expect(attrs["profile"]).toBe("docs");
    expect(attrs["http.status"]).toBe(200);
  });

  it("error statuses mark the span as errored with the message", async () => {
    const { exporter, telemetry } = makeTelemetry();
    await telemetry.ready();
    telemetry.dispatchSpan(ctx(), {
      requestId: "req-2",
      namespace: "github",
      operation: "repos.get",
      status: 403,
      durationMs: 3,
      error: "Profile not granted",
    });
    const span = exporter.getFinishedSpans()[0]!;
    expect(span.status.code).toBe(2);
    expect(span.attributes["error"]).toBe("Profile not granted");
  });

  it("two tenants' spans partition cleanly by aprovan.tenant with no unattributed remainder", async () => {
    const { exporter, telemetry } = makeTelemetry();
    await telemetry.ready();
    for (const [tenant, principal] of [
      ["tenant-a", "alice"],
      ["tenant-b", "bob"],
      ["tenant-a", "ana"],
    ] as const) {
      telemetry.dispatchSpan(ctx({ tenantId: tenant, principal }), {
        requestId: `${tenant}-${principal}`,
        namespace: "github",
        operation: "repos.get",
        status: 200,
        durationMs: 1,
      });
    }
    const spans = exporter.getFinishedSpans();
    expect(spans).toHaveLength(3);
    const byTenant = new Map<string, number>();
    for (const span of spans) {
      const tenant = span.attributes["aprovan.tenant"];
      expect(typeof tenant).toBe("string"); // no unattributed remainder
      byTenant.set(tenant as string, (byTenant.get(tenant as string) ?? 0) + 1);
    }
    expect(byTenant.get("tenant-a")).toBe(2);
    expect(byTenant.get("tenant-b")).toBe(1);
  });

  it("span() helper attributes and error status; log() carries severity", async () => {
    const { exporter, telemetry } = makeTelemetry();
    await telemetry.ready();
    await expect(
      telemetry.span(ctx(), "boot", { step: "storage" }, async () => {
        throw new Error("nope");
      }),
    ).rejects.toThrow("nope");
    telemetry.log(ctx(), "warn", "something odd");
    const spans = exporter.getFinishedSpans();
    expect(spans[0]!.status.code).toBe(2);
    expect(spans[0]!.attributes["aprovan.tenant"]).toBe("t1");
    expect(spans[1]!.attributes["log.severity"]).toBe("warn");
    expect(spans[1]!.attributes["log.message"]).toBe("something odd");
  });
});

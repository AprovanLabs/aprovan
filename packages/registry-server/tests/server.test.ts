/**
 * createRegistryServer tests (registry-server + multi-tenancy specs):
 * standalone boot, embed-vs-HTTP equivalence through the one pipeline,
 * insecure-boot guard, external tenancy auto-provision, uniform limits
 * across HTTP/embed/sandbox surfaces, and the dispatch-overhead benchmark.
 */

import { afterEach, describe, expect, it } from "vitest";
import {
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { createRegistryServer } from "../src/server.js";
import { DEFAULT_TENANT_ID } from "../src/tenancy/index.js";
import { adminCtx, fakeProviderModule, TEST_CATALOG } from "./helpers.js";
import type { RegistryServer, RegistryServerOptions } from "../src/config/types.js";

let servers: RegistryServer[] = [];

afterEach(async () => {
  for (const server of servers) await server.close();
  servers = [];
});

interface MakeOptions extends Partial<RegistryServerOptions> {
  exporter?: InMemorySpanExporter;
}

async function makeServer(overrides: MakeOptions = {}): Promise<RegistryServer> {
  const { exporter, ...rest } = overrides;
  const options: RegistryServerOptions = {
    storage: { driver: "sqlite", url: "file::memory:" },
    auth: { mode: "none" },
    tenancy: { mode: "single" },
    catalog: TEST_CATALOG,
    ...(exporter
      ? {
          telemetry: {
            spanProcessor: new SimpleSpanProcessor(exporter),
          } as RegistryServerOptions["telemetry"],
        }
      : {}),
    ...rest,
  };
  const server = await createRegistryServer(options);
  servers.push(server);
  return server;
}

describe("standalone boot", () => {
  it("auto-provisions the default tenant and serves an untagged request within it", async () => {
    const server = await makeServer();
    expect(await server.stores.tenants.get(DEFAULT_TENANT_ID)).toBeDefined();
    const health = await server.router.request("/healthz");
    expect(health.status).toBe(200);
    // Auth none: no Authorization header required; acts as admin of default.
    const res = await server.router.request("/credentials", {
      method: "POST",
      body: JSON.stringify({
        provider: "github",
        payload: { type: "bearer_token", token: "t" },
      }),
      headers: { "content-type": "application/json" },
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { credential: { tenantId: string; createdBy: string } };
    expect(body.credential.tenantId).toBe(DEFAULT_TENANT_ID);
    expect(body.credential.createdBy).toBe("local");
  });

  it("refuses an insecure multi-tenant boot without allowInsecure", async () => {
    await expect(
      createRegistryServer({
        storage: { driver: "sqlite", url: "file::memory:" },
        auth: { mode: "none" },
        tenancy: {
          mode: "external",
          resolve: async () => ({ tenantId: "x", role: "admin", groupIds: [] }),
        },
        catalog: TEST_CATALOG,
      }),
    ).rejects.toThrow(/Refusing to start/u);
    // The same config with allowInsecure starts.
    const server = await createRegistryServer({
      storage: { driver: "sqlite", url: "file::memory:" },
      auth: { mode: "none" },
      tenancy: {
        mode: "external",
        resolve: async () => ({ tenantId: "x", role: "admin", groupIds: [] }),
      },
      catalog: TEST_CATALOG,
      allowInsecure: true,
    });
    servers.push(server);
  });
});

describe("embedded tenancy", () => {
  it("workspaceId maps to tenant on first use — the row is created and reused", async () => {
    const server = await makeServer({
      tenancy: {
        mode: "external",
        resolve: async (_authn, requested) => ({
          tenantId: requested ?? "ws-77",
          role: "admin",
          groupIds: [],
        }),
      },
      allowInsecure: true,
    });
    expect(await server.stores.tenants.get("ws-77")).toBeUndefined();
    const { mod } = fakeProviderModule("createGithubClient");
    server.executor.setModuleForTesting("utdk/github", mod);
    await server.dispatch(
      adminCtx({ tenantId: "ws-77" }),
      "github",
      "repos.get",
      {},
      undefined,
    ).catch(() => undefined); // no credential; the dispatch itself may 200 with none
    expect(await server.stores.tenants.get("ws-77")).toBeDefined();
  });
});

describe("standalone and embedded share one pipeline", () => {
  it("identical dispatches over HTTP and the embed API produce identical results, audit rows, and attribution", async () => {
    const exporter = new InMemorySpanExporter();
    const server = await makeServer({ exporter });
    await server.telemetry.ready();
    const { mod } = fakeProviderModule("createGithubClient");
    server.executor.setModuleForTesting("utdk/github", mod);
    await server.stores.credentials.create(DEFAULT_TENANT_ID, {
      provider: "github",
      type: "bearer_token",
      payload: JSON.stringify({ type: "bearer_token", token: "tok" }),
      createdBy: "local",
    });

    // HTTP surface.
    const httpRes = await server.router.request("/tools/github/repos.get", {
      method: "POST",
      body: JSON.stringify({ args: { owner: "o" } }),
      headers: { "content-type": "application/json" },
    });
    expect(httpRes.status).toBe(200);
    const httpBody = (await httpRes.json()) as { data: unknown };

    // Embed surface — host has already authenticated; same tenant state.
    const embedResult = await server.dispatch(
      adminCtx({ tenantId: DEFAULT_TENANT_ID, principal: "local" }),
      "github",
      "repos.get",
      { owner: "o" },
    );
    expect(embedResult.kind).toBe("json");
    expect((embedResult as { data: unknown }).data).toEqual(httpBody.data);

    // Identical audit rows (modulo request id / duration).
    const audit = await server.stores.audit.query(DEFAULT_TENANT_ID);
    expect(audit).toHaveLength(2);
    const [a, b] = audit;
    expect({ ...a, requestId: "x", durationMs: 0, createdAt: "t" }).toEqual({
      ...b,
      requestId: "x",
      durationMs: 0,
      createdAt: "t",
    });

    // Identically attributed telemetry.
    const spans = exporter.getFinishedSpans();
    expect(spans).toHaveLength(2);
    const attrs = spans.map((s) => ({
      tenant: s.attributes["aprovan.tenant"],
      principal: s.attributes["aprovan.principal"],
      source: s.attributes["aprovan.source.type"],
      namespace: s.attributes["namespace"],
      status: s.attributes["http.status"],
    }));
    expect(attrs[0]).toEqual(attrs[1]);
  });
});

describe("uniform limits across surfaces", () => {
  it("a profile rps limit throttles HTTP, embed, and sandbox dispatch alike", async () => {
    const server = await makeServer();
    const { mod } = fakeProviderModule("createPostgresClient");
    server.executor.setModuleForTesting("utdk/postgres", mod);
    await server.stores.credentials.create(DEFAULT_TENANT_ID, {
      provider: "postgres",
      type: "bearer_token",
      payload: JSON.stringify({ type: "bearer_token", token: "pg" }),
    });
    const profileRes = await server.router.request("/profiles", {
      method: "POST",
      body: JSON.stringify({
        name: "docs",
        target: { kind: "interface", interface: "sql" },
        provider: "postgres",
        limits: { rps: 0.0001, burst: 1 },
      }),
      headers: { "content-type": "application/json" },
    });
    expect(profileRes.status).toBe(201);

    const ctx = adminCtx({ tenantId: DEFAULT_TENANT_ID, principal: "local" });

    // 1st call (embed) drains the burst.
    await server.dispatch(ctx, "sql", "query", { sql: "select 1" }, { profile: "docs" });

    // 2nd call (HTTP) is refused 429.
    const httpRes = await server.router.request("/tools/sql/query", {
      method: "POST",
      body: JSON.stringify({ args: { sql: "select 1" }, profile: "docs" }),
      headers: { "content-type": "application/json" },
    });
    expect(httpRes.status).toBe(429);

    // 3rd call (sandbox script) rejects with the same throttle.
    const result = await server.runScript(ctx, {
      source: `
        try {
          const db = await sql.client("docs");
          await db.query({ sql: "select 1" });
          return "ran";
        } catch (err) {
          return "throttled: " + err.message;
        }
      `,
      namespaces: ["sql"],
      timeoutMs: 10_000,
    });
    expect(String(result)).toMatch(/throttled: .*Rate limit/u);
  });

  it("SDK bypass gains nothing: an ungranted namespace refuses identically from a script", async () => {
    const server = await makeServer();
    const ctx = adminCtx({ tenantId: DEFAULT_TENANT_ID, principal: "local" });
    const result = await server.runScript(ctx, {
      source: `
        try {
          await __not_granted.something({});
          return "ran";
        } catch (err) {
          return "refused: " + err.message;
        }
      `,
      namespaces: ["__not_granted"],
      timeoutMs: 10_000,
    });
    expect(String(result)).toMatch(/refused: .*Unknown tool namespace/u);
  });
});

describe("dispatch overhead benchmark", () => {
  it("p95 warm dispatch overhead stays under 20ms in sqlite mode", async () => {
    const server = await makeServer();
    const { mod } = fakeProviderModule("createGithubClient");
    server.executor.setModuleForTesting("utdk/github", mod);
    await server.stores.credentials.create(DEFAULT_TENANT_ID, {
      provider: "github",
      type: "bearer_token",
      payload: JSON.stringify({ type: "bearer_token", token: "tok" }),
    });
    const ctx = adminCtx({ tenantId: DEFAULT_TENANT_ID, principal: "local" });

    // Warm-up.
    for (let i = 0; i < 10; i++) await server.dispatch(ctx, "github", "repos.get", {});

    const durations: number[] = [];
    for (let i = 0; i < 200; i++) {
      const start = performance.now();
      await server.dispatch(ctx, "github", "repos.get", {});
      durations.push(performance.now() - start);
    }
    durations.sort((a, b) => a - b);
    const p95 = durations[Math.floor(durations.length * 0.95)]!;
    // The fake provider returns instantly, so this measures pure pipeline
    // overhead: profile resolution + credential read + limits + audit + span.
    expect(p95).toBeLessThan(20);
  }, 60_000);
});

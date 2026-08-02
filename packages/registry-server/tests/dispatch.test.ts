/**
 * Dispatch pipeline tests — provider-execution spec scenarios: the one
 * pipeline (classify → resolve → oauth → limits → execute), audit + exactly
 * one attributed span on EVERY exit path, server-side limits, streaming
 * normalization, telemetry-namespace non-self-recording.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { ServiceError } from "../src/kernel/index.js";
import {
  adminCtx,
  ctx,
  fakeProviderModule,
  makeDispatchEnv,
  type DispatchEnv,
} from "./helpers.js";

let env: DispatchEnv;

afterEach(async () => {
  await env?.close();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const bearer = (token: string) => ({ type: "bearer_token" as const, token });

async function expectAudit(env: DispatchEnv, tenantId: string, status: number, count = 1) {
  const rows = (await env.storage.audit.query(tenantId)).filter((r) => r.status === status);
  expect(rows.length).toBeGreaterThanOrEqual(count);
  return rows;
}

describe("dispatch pipeline", () => {
  it("provider dispatch executes with the resolved credential and audits + spans once", async () => {
    env = await makeDispatchEnv();
    const { mod, calls } = fakeProviderModule("createGithubClient");
    env.executor.setModuleForTesting("utdk/github", mod);
    await env.credentials.create("t1", "user-1", { provider: "github", payload: bearer("tok") });

    const result = await env.dispatcher.dispatch(adminCtx(), "github", "repos.get", { owner: "o" });
    expect(result.kind).toBe("json");
    expect((result as { data: unknown }).data).toEqual({ echoed: { owner: "o" } });
    expect(calls[0]?.headers).toEqual({ Authorization: "Bearer tok" });

    await expectAudit(env, "t1", 200);
    const spans = env.exporter.getFinishedSpans();
    expect(spans).toHaveLength(1);
    expect(spans[0]!.attributes["aprovan.tenant"]).toBe("t1");
    expect(spans[0]!.attributes["namespace"]).toBe("github");
    expect(spans[0]!.attributes["http.status"]).toBe(200);
  });

  it("interface dispatch through a named profile carries options, credential, and profile attribution", async () => {
    env = await makeDispatchEnv();
    const { mod, calls } = fakeProviderModule("createPostgresClient");
    env.executor.setModuleForTesting("utdk/postgres", mod);
    const cred = await env.credentials.create("t1", "user-1", {
      provider: "postgres",
      payload: bearer("pg"),
    });
    await env.profiles.create(adminCtx(), {
      name: "docs",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
      credentialId: cred.id,
      options: { database: "docs" },
    });

    const result = await env.dispatcher.dispatch(
      adminCtx(),
      "sql",
      "query",
      { sql: "select 1" },
      { profile: "docs" },
    );
    expect(result.kind).toBe("json");
    // defaultsFor merging: profile options fill missing args on `query`.
    expect(calls[0]?.args).toEqual({ database: "docs", sql: "select 1" });
    expect(calls[0]?.headers).toEqual({ Authorization: "Bearer pg" });
    const span = env.exporter.getFinishedSpans()[0]!;
    expect(span.attributes["profile"]).toBe("docs");
  });

  it("every failure exit path still records an audit row and exactly one error span", async () => {
    env = await makeDispatchEnv();
    // 1. Unknown namespace (validation failure).
    await expect(env.dispatcher.dispatch(adminCtx(), "nope", "x", {})).rejects.toThrow(
      /Unknown tool namespace/u,
    );
    // 2. Authorization failure (ungranted member on a stored profile).
    await env.profiles.create(adminCtx(), {
      name: "docs",
      target: { kind: "interface", interface: "sql" },
      provider: "postgres",
    });
    await expect(
      env.dispatcher.dispatch(ctx(), "sql", "query", {}, { profile: "docs" }),
    ).rejects.toThrow(/not granted/u);
    // 3. Credential-resolution failure (named profile missing).
    await expect(
      env.dispatcher.dispatch(adminCtx(), "sql", "query", {}, { profile: "ghost" }),
    ).rejects.toThrow(/No sql profile named "ghost"/u);
    // 4. Execution failure.
    env.executor.setModuleForTesting("utdk/github", { createGithubClient: async () => ({}) });
    await env.credentials.create("t1", "user-1", { provider: "github", payload: bearer("t") });
    await expect(env.dispatcher.dispatch(adminCtx(), "github", "repos.get", {})).rejects.toThrow();

    const audit = await env.storage.audit.query("t1");
    expect(audit).toHaveLength(4);
    const spans = env.exporter.getFinishedSpans();
    expect(spans).toHaveLength(4); // exactly one per dispatch
    expect(spans.every((s) => s.status.code === 2)).toBe(true);
    expect(spans.every((s) => typeof s.attributes["aprovan.tenant"] === "string")).toBe(true);
    const statuses = audit.map((r) => r.status).sort((a, b) => a - b);
    expect(statuses).toEqual([403, 404, 404, 502]);
  });

  it("native services dispatch without profile machinery and refuse a profile pin", async () => {
    env = await makeDispatchEnv({
      nativeServices: {
        keyvalue: {
          meta: { label: "Key value", blurb: "kv", icon: "kv" },
          tools: [],
          call: async (serviceCtx, procedure, args) => ({
            got: { procedure, args, ws: serviceCtx.workspaceId, user: serviceCtx.userId },
          }),
        },
      },
    });
    const result = await env.dispatcher.dispatch(adminCtx(), "keyvalue", "get", { key: "k" });
    expect((result as { data: unknown }).data).toEqual({
      got: { procedure: "get", args: { key: "k" }, ws: "t1", user: "user-1" },
    });
    await expect(
      env.dispatcher.dispatch(adminCtx(), "keyvalue", "get", {}, { profile: "x" }),
    ).rejects.toThrow(/native service/u);
    await expectAudit(env, "t1", 200);
  });

  it("telemetry-namespace dispatches are audited but never span-recorded", async () => {
    env = await makeDispatchEnv({
      nativeServices: {
        telemetry: {
          meta: { label: "Telemetry", blurb: "spans", icon: "chart" },
          tools: [],
          call: async () => ({ events: [] }),
        },
      },
    });
    await env.dispatcher.dispatch(adminCtx(), "telemetry", "query", {});
    expect(await env.storage.audit.query("t1")).toHaveLength(1);
    expect(env.exporter.getFinishedSpans()).toHaveLength(0);
  });

  it("llm alias dispatch fills the default model and uses the alias base URL", async () => {
    env = await makeDispatchEnv();
    const { mod, calls } = fakeProviderModule("createOpenaiClient");
    env.executor.setModuleForTesting("utdk/openai", mod);
    await env.credentials.create("t1", "user-1", { provider: "anthropic", payload: bearer("k") });

    await env.dispatcher.dispatch(adminCtx(), "anthropic", "createChatCompletion", {
      messages: [],
    });
    expect(calls[0]?.args).toEqual({ messages: [], model: "claude-sonnet-5" });
    expect(calls[0]?.baseUrl).toBe("https://api.anthropic.com/v1");
    expect(calls[0]?.headers).toEqual({ Authorization: "Bearer k" });
  });

  it("oauth client-credentials payloads pre-resolve to bearer tokens before execution", async () => {
    env = await makeDispatchEnv();
    const { mod, calls } = fakeProviderModule("createGithubClient");
    env.executor.setModuleForTesting("utdk/github", mod);
    await env.credentials.create("t1", "user-1", {
      provider: "github",
      payload: {
        type: "oauth2_client",
        clientId: "id",
        clientSecret: "s",
        tokenUrl: "https://issuer.example/token",
      },
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ access_token: "live-token", expires_in: 3600 }), {
          status: 200,
        }),
      ),
    );
    await env.dispatcher.dispatch(adminCtx(), "github", "repos.get", {});
    expect(calls[0]?.headers).toEqual({ Authorization: "Bearer live-token" });
  });

  it("oauth failure fails 502 naming the provider, before the module executes", async () => {
    env = await makeDispatchEnv();
    const { mod, calls } = fakeProviderModule("createGithubClient");
    env.executor.setModuleForTesting("utdk/github", mod);
    await env.credentials.create("t1", "user-1", {
      provider: "github",
      payload: {
        type: "oauth2_client",
        clientId: "id",
        clientSecret: "s",
        tokenUrl: "https://issuer.example/token",
      },
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("denied", { status: 400 })),
    );
    const error = await env.dispatcher
      .dispatch(adminCtx(), "github", "repos.get", {})
      .catch((e) => e);
    expect(error).toBeInstanceOf(ServiceError);
    expect(error.status).toBe(502);
    expect(error.message).toMatch(/OAuth token resolution failed for github/u);
    expect(calls).toHaveLength(0);
    await expectAudit(env, "t1", 502);
  });

  it("ephemeral request credentials execute without touching the store", async () => {
    env = await makeDispatchEnv();
    const { mod, calls } = fakeProviderModule("createGithubClient");
    env.executor.setModuleForTesting("utdk/github", mod);
    await env.dispatcher.dispatch(
      adminCtx(),
      "github",
      "repos.get",
      {},
      { credential: { type: "bearer_token", token: "ephemeral" } },
    );
    expect(calls[0]?.headers).toEqual({ Authorization: "Bearer ephemeral" });
  });

  it("unavailable compat entries refuse 501 without reaching the module loader", async () => {
    env = await makeDispatchEnv();
    await env.profiles.create(adminCtx(), {
      name: "default",
      target: { kind: "interface", interface: "sql" },
      provider: "duckdb",
    });
    const error = await env.dispatcher.dispatch(adminCtx(), "sql", "query", {}).catch((e) => e);
    expect(error.status).toBe(501);
    expect(error.message).toMatch(/declared but not yet built/u);
  });

  it("module 'native' compat entries route to the host hook; 501 without one", async () => {
    env = await makeDispatchEnv({
      compatDispatch: {
        agent: async (serviceCtx, operation, args) => ({
          ran: operation,
          ws: serviceCtx.workspaceId,
          args,
        }),
      },
    });
    const result = await env.dispatcher.dispatch(adminCtx(), "agent", "run", { goal: "g" });
    expect((result as { data: unknown }).data).toEqual({
      ran: "run",
      ws: "t1",
      args: { goal: "g" },
    });

    const bare = await makeDispatchEnv();
    try {
      const error = await bare.dispatcher.dispatch(adminCtx(), "agent", "run", {}).catch((e) => e);
      expect(error.status).toBe(501);
      expect(error.message).toMatch(/host/u);
    } finally {
      await bare.close();
    }
  });

  describe("server-side limits", () => {
    it("profile limits throttle with a retryable 429 on the shared pipeline", async () => {
      env = await makeDispatchEnv();
      const { mod } = fakeProviderModule("createPostgresClient");
      env.executor.setModuleForTesting("utdk/postgres", mod);
      await env.credentials.create("t1", "user-1", { provider: "postgres", payload: bearer("p") });
      await env.profiles.create(adminCtx(), {
        name: "docs",
        target: { kind: "interface", interface: "sql" },
        provider: "postgres",
        limits: { rps: 1, burst: 1 },
      });
      await env.dispatcher.dispatch(adminCtx(), "sql", "query", {}, { profile: "docs" });
      const error = await env.dispatcher
        .dispatch(adminCtx(), "sql", "query", {}, { profile: "docs" })
        .catch((e) => e);
      expect(error.status).toBe(429);
      expect(error.message).toMatch(/retry/iu);
      await expectAudit(env, "t1", 429);
    });

    it("tenants do not share buckets", async () => {
      env = await makeDispatchEnv({ limits: { defaultRps: 1, defaultBurst: 1 } });
      const { mod } = fakeProviderModule("createGithubClient");
      env.executor.setModuleForTesting("utdk/github", mod);
      await env.credentials.create("t1", "user-1", { provider: "github", payload: bearer("a") });
      await env.credentials.create("t2", "user-1", { provider: "github", payload: bearer("b") });

      await env.dispatcher.dispatch(adminCtx({ tenantId: "t1" }), "github", "repos.get", {});
      await expect(
        env.dispatcher.dispatch(adminCtx({ tenantId: "t1" }), "github", "repos.get", {}),
      ).rejects.toThrow(/Rate limit/u);
      // Tenant B's bucket is untouched by tenant A's exhaustion.
      await expect(
        env.dispatcher.dispatch(adminCtx({ tenantId: "t2" }), "github", "repos.get", {}),
      ).resolves.toBeDefined();
    });
  });

  describe("streaming", () => {
    it("Response / ReadableStream / async-iterable results normalize to {kind: stream}", async () => {
      env = await makeDispatchEnv();
      const sse = 'data: {"n":1}\n\n';
      env.executor.setModuleForTesting("utdk/github", {
        createGithubClient: async () => ({
          streamResp: async () =>
            new Response(sse, { headers: { "content-type": "text/event-stream" } }),
          streamRaw: async () =>
            new ReadableStream<Uint8Array>({
              start(c) {
                c.enqueue(new TextEncoder().encode(sse));
                c.close();
              },
            }),
          streamIter: async () =>
            (async function* () {
              yield { n: 1 };
            })(),
        }),
      });
      await env.credentials.create("t1", "user-1", { provider: "github", payload: bearer("t") });

      for (const operation of ["streamResp", "streamRaw", "streamIter"]) {
        const result = await env.dispatcher.dispatch(adminCtx(), "github", operation, {});
        expect(result.kind).toBe("stream");
        if (result.kind === "stream") {
          const text = await new Response(result.stream).text();
          expect(text).toContain('{"n":1}');
          expect(result.headers["Content-Type"]).toContain("text/event-stream");
        }
      }
    });

    it("stream: true folds into provider args", async () => {
      env = await makeDispatchEnv();
      const { mod, calls } = fakeProviderModule("createOpenaiClient");
      env.executor.setModuleForTesting("utdk/openai", mod);
      await env.credentials.create("t1", "user-1", { provider: "openai", payload: bearer("k") });
      await env.dispatcher.dispatch(
        adminCtx(),
        "openai",
        "createChatCompletion",
        { messages: [] },
        { stream: true },
      );
      expect((calls[0]?.args as Record<string, unknown>)["stream"]).toBe(true);
    });
  });
});

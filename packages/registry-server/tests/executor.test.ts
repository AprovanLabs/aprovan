/**
 * ProviderExecutor tests (provider-execution spec): lazy load + LRU keyed by
 * import specifier, per-call client construction (never cached), catalogue
 * guard, cross-tenant isolation through one cached module.
 */

import { describe, expect, it } from "vitest";
import { ProviderExecutor, toClientFactoryName } from "../src/executor/index.js";

function fakeModule(captured: Array<Record<string, string>>, factoryName = "createGithubClient") {
  let clientBuilds = 0;
  const mod = {
    [factoryName]: async (opts?: { headers?: Record<string, string>; baseUrl?: string }) => {
      clientBuilds += 1;
      return {
        repos: {
          get: async (args: Record<string, unknown>) => {
            captured.push({ ...(opts?.headers ?? {}), ...(opts?.baseUrl ? { __baseUrl: opts.baseUrl } : {}) });
            return { ok: true, args, build: clientBuilds };
          },
        },
      };
    },
  };
  return { mod, builds: () => clientBuilds };
}

describe("ProviderExecutor", () => {
  it("factory naming pascal-cases across -, _, /, .", () => {
    expect(toClientFactoryName("github")).toBe("createGithubClient");
    expect(toClientFactoryName("google/books")).toBe("createGoogleBooksClient");
    expect(toClientFactoryName("synthetic.new")).toBe("createSyntheticNewClient");
    expect(toClientFactoryName("google-cloud")).toBe("createGoogleCloudClient");
  });

  it("warm dispatch reuses the cached module and constructs a fresh client per call", async () => {
    const executor = new ProviderExecutor();
    const captured: Array<Record<string, string>> = [];
    const { mod, builds } = fakeModule(captured);
    executor.setModuleForTesting("utdk/github", mod);

    const first = await executor.execute({
      provider: "github",
      operation: "repos.get",
      args: { owner: "a" },
      credentials: { type: "bearer_token", token: "one" },
    });
    const second = await executor.execute({
      provider: "github",
      operation: "repos.get",
      args: { owner: "b" },
      credentials: { type: "bearer_token", token: "two" },
    });
    expect(first.success && second.success).toBe(true);
    // Same cached module, but a NEW client per call (client caching would be
    // a cross-tenant credential hazard).
    expect(builds()).toBe(2);
    expect((second.data as { build: number }).build).toBe(2);
  });

  it("LRU keyed by import specifier evicts least-recently-used beyond the cap", async () => {
    const executor = new ProviderExecutor({ cacheSize: 2 });
    executor.setModuleForTesting("utdk/a", {});
    executor.setModuleForTesting("utdk/b", {});
    // Touch a so b becomes least-recently-used.
    await executor.getModule("a");
    executor.setModuleForTesting("utdk/c", {});
    expect(executor.isCached("utdk/a")).toBe(true);
    expect(executor.isCached("utdk/b")).toBe(false);
    expect(executor.isCached("utdk/c")).toBe(true);
  });

  it("first-party moduleSpecifier and utdk/<name> do not collide in the cache", async () => {
    const executor = new ProviderExecutor();
    executor.setModuleForTesting("utdk/machine", { catalogVariant: true });
    executor.setModuleForTesting("@aprovan/sandbox-host", { firstParty: true });
    expect(await executor.getModule("machine")).toEqual({ catalogVariant: true });
    expect(await executor.getModule("machine", "@aprovan/sandbox-host")).toEqual({
      firstParty: true,
    });
  });

  it("no credential bleed through the module cache: interleaved tenants see only their own headers", async () => {
    const executor = new ProviderExecutor();
    const captured: Array<Record<string, string>> = [];
    const { mod } = fakeModule(captured);
    executor.setModuleForTesting("utdk/github", mod);

    await executor.execute({
      provider: "github",
      operation: "repos.get",
      args: {},
      credentials: { type: "bearer_token", token: "tenant-a-token" },
      baseUrl: "https://a.example",
    });
    await executor.execute({
      provider: "github",
      operation: "repos.get",
      args: {},
      credentials: { type: "api_key", value: "tenant-b-key", headerName: "X-B" },
    });
    await executor.execute({
      provider: "github",
      operation: "repos.get",
      args: {},
      credentials: { type: "bearer_token", token: "tenant-a-token" },
      baseUrl: "https://a.example",
    });

    expect(captured[0]).toEqual({ Authorization: "Bearer tenant-a-token", __baseUrl: "https://a.example" });
    // Tenant B's call carries ONLY CB — no header, token, or baseUrl from A.
    expect(captured[1]).toEqual({ "X-B": "tenant-b-key" });
    expect(captured[2]).toEqual({ Authorization: "Bearer tenant-a-token", __baseUrl: "https://a.example" });
  });

  it("missing factory and bad operation paths fail with actionable errors", async () => {
    const executor = new ProviderExecutor();
    executor.setModuleForTesting("utdk/github", { notAFactory: 1 });
    const noFactory = await executor.execute({
      provider: "github",
      operation: "repos.get",
      args: {},
    });
    expect(noFactory.success).toBe(false);
    expect(noFactory.error).toMatch(/does not export "createGithubClient"/u);

    const captured: Array<Record<string, string>> = [];
    executor.setModuleForTesting("utdk/github", fakeModule(captured).mod);
    const badPath = await executor.execute({
      provider: "github",
      operation: "nope.missing",
      args: {},
    });
    expect(badPath.success).toBe(false);
    expect(badPath.error).toMatch(/not found on provider "github"/u);
  });

  it("enforces the call timeout", async () => {
    const executor = new ProviderExecutor();
    executor.setModuleForTesting("utdk/slowpoke", {
      createSlowpokeClient: async () => ({
        wait: () => new Promise((resolve) => setTimeout(resolve, 5_000)),
      }),
    });
    const result = await executor.execute({
      provider: "slowpoke",
      operation: "wait",
      args: {},
      timeout: 100,
    });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/timed out after 100ms/u);
  });
});

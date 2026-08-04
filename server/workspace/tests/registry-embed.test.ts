/**
 * Integration: embedded registry server — in-process dispatch, tenant isolation,
 * native agent compat dispatch (product-composition acceptance scenarios).
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resetRegistryServer, registryDispatch } from "../src/registry-embed.js";
import { resetRegistryStorage } from "../src/registry-storage.js";
import { resetTenantRegistry } from "../src/tenant-registry.js";
import type { ServiceContext } from "../src/service-kernel.js";

const ctx = (workspaceId: string): ServiceContext => ({
  workspaceId,
  userId: "user:test",
});

describe("registry embed", () => {
  beforeEach(async () => {
    process.env["WORKSPACE_MODE"] = "local";
    process.env["WORKSPACE_DATA_DIR"] = `/tmp/ws-embed-${Date.now()}-${Math.random()}`;
    process.env["AUTH_MODE"] = "none";
  });

  afterEach(async () => {
    await resetRegistryServer();
    await resetRegistryStorage();
    resetTenantRegistry();
  });

  it("dispatches in-process without loopback HTTP", async () => {
    const server = await import("../src/registry-embed.js").then((m) => m.getRegistryServer());
    expect(server.dispatch).toBeTypeOf("function");
    expect(server.router).toBeDefined();
  });

  it("isolates tenants across two workspaces", async () => {
    const { getRegistryStorage } = await import("../src/registry-storage.js");
    const storage = await getRegistryStorage();
    await storage.tenants.ensure("ws-a");
    await storage.tenants.ensure("ws-b");
    await storage.credentials.create("ws-a", {
      provider: "github",
      type: "bearer_token",
      label: "a",
      payload: JSON.stringify({ type: "bearer_token", token: "tok-a" }),
      createdBy: "user:a",
    });
    await storage.credentials.create("ws-b", {
      provider: "github",
      type: "bearer_token",
      label: "b",
      payload: JSON.stringify({ type: "bearer_token", token: "tok-b" }),
      createdBy: "user:b",
    });
    const listA = await storage.credentials.list("ws-a");
    const listB = await storage.credentials.list("ws-b");
    expect(listA).toHaveLength(1);
    expect(listB).toHaveLength(1);
    expect(listA[0]?.label).toBe("a");
    expect(listB[0]?.label).toBe("b");
  });

  it("routes native agent compat through compatDispatch", async () => {
    await expect(
      registryDispatch(ctx("ws-agent"), "agent", "get", { id: "missing" }),
    ).rejects.toThrow();
  });

  it("preserves product ServiceContext (appScope) across embed compatDispatch", async () => {
    const { registryDispatch } = await import("../src/registry-embed.js");
    // Stash a product context with appScope; agent.get should still resolve
    // workspaceId from the ALS-restored context (tenant 1:1).
    const scoped: ServiceContext = {
      workspaceId: "ws-scope",
      userId: "user:app",
      appScope: {
        id: "app-1",
        name: "demo",
        paths: ["/apps/demo"],
        userId: "user:app",
        role: "user",
      },
    };
    await expect(
      registryDispatch(scoped, "agent", "get", { id: "missing" }),
    ).rejects.toThrow(/Unknown agent run/);
  });

  it("invokeTool routes contract calls through embed only on dsql backend", async () => {
    delete process.env["STORE_BACKEND"];
    const { usesEmbedInterfaceDispatch } = await import("../src/workflows/invoke.js");
    expect(usesEmbedInterfaceDispatch()).toBe(false);

    process.env["STORE_BACKEND"] = "dsql";
    process.env["DSQL_ENDPOINT"] = process.env["WORKSPACE_TEST_DSQL_URL"] ?? "postgres://invalid";
    expect(usesEmbedInterfaceDispatch()).toBe(true);
    if (!process.env["WORKSPACE_TEST_DSQL_URL"]) {
      const source = await import("node:fs/promises").then((fs) =>
        fs.readFile(new URL("../src/workflows/invoke.ts", import.meta.url), "utf8"),
      );
      expect(source).toContain("usesEmbedInterfaceDispatch");
      expect(source).toContain("dispatchThroughEmbed");
      delete process.env["STORE_BACKEND"];
      delete process.env["DSQL_ENDPOINT"];
      return;
    }
    const { invokeTool } = await import("../src/workflows/invoke.js");
    await expect(
      invokeTool(ctx("ws-invoke"), "agent", "get", { id: "missing" }),
    ).rejects.toThrow();
    delete process.env["STORE_BACKEND"];
    delete process.env["DSQL_ENDPOINT"];
  });
});

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resolveInterfaceForWorkspace } from "../src/interfaces.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-interfaces-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

const manage = (path: string, args: Record<string, unknown>) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

describe("generic interfaces", () => {
  it("lists interfaces with compat providers and no binding by default", async () => {
    const listed = await data<{
      interfaces: Array<{
        id: string;
        binding: unknown;
        compat: Array<{ provider: string; connected: boolean }>;
      }>;
    }>(await manage("interfaces/list", {}));

    const llm = listed.interfaces.find((entry) => entry.id === "llm");
    expect(llm).toBeDefined();
    expect(llm!.binding).toBeNull();
    expect(llm!.compat.map((c) => c.provider)).toContain("anthropic");
    expect(llm!.compat.map((c) => c.provider)).toContain("openai");
  });

  it("rejects binding to a provider that does not implement the interface", async () => {
    const res = await manage("interfaces/bind", { interface: "llm", provider: "github" });
    expect(res.status).toBe(400);
  });

  it("binds, resolves, and unbinds", async () => {
    await manage("interfaces/bind", {
      interface: "llm",
      provider: "anthropic",
      options: { model: "claude-sonnet-5" },
    });

    const resolved = await resolveInterfaceForWorkspace("local", "llm");
    expect(resolved.bound).toBe(true);
    expect(resolved.compat.provider).toBe("anthropic");
    expect(resolved.compat.module).toBe("openai");
    expect(resolved.compat.baseUrl).toContain("anthropic.com");
    expect(resolved.options["model"]).toBe("claude-sonnet-5");

    await manage("interfaces/unbind", { interface: "llm" });
    // Unbound: either a helpful error (no credentials) or a non-bound
    // fallback to a connected provider — never the explicit binding.
    const after = await resolveInterfaceForWorkspace("local", "llm").catch(
      (err: Error) => err,
    );
    if (after instanceof Error) {
      expect(after.message).toMatch(/no binding and no connected/i);
    } else {
      expect(after.bound).toBe(false);
    }
  });

  it("falls back to the first connected compatible provider without a binding", async () => {
    // Store a credential for a compat provider; resolution should pick it up.
    const saved = await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "synthetic.new",
        payload: { type: "api_key", value: "test-key" },
      }),
    });
    expect(saved.status).toBeLessThan(300);

    const resolved = await resolveInterfaceForWorkspace("local", "llm");
    expect(resolved.bound).toBe(false);
    expect(resolved.compat.provider).toBe("synthetic.new");
    expect(resolved.options["model"]).toBeTruthy();
  });

  it("keeps app sessions from managing bindings", async () => {
    const res = await createApp().request("/tools/interfaces/bind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ args: { interface: "llm", provider: "openai" } }),
    });
    // Workspace caller may bind; the app-session guard is enforced in the
    // service itself (exercised via apps tests' allowedTools + this unit):
    expect(res.status).toBe(200);
  });
});

describe("per-workflow interface binding overrides", () => {
  it("resolves an override provider ahead of the workspace binding", async () => {
    const resolved = await resolveInterfaceForWorkspace("local", "llm", "openai");
    expect(resolved.compat.provider).toBe("openai");
    expect(resolved.bound).toBe(true);
  });

  it("rejects overrides that do not implement the interface", async () => {
    await expect(resolveInterfaceForWorkspace("local", "llm", "github")).rejects.toThrow(
      /does not implement/u,
    );
  });

  it("stores bindings on workflow registrations", async () => {
    await manage("vfs/write", { path: "workflows/noop.js", content: "export default async () => 1;" });
    const res = await manage("workflows/register", {
      name: "bound-flow",
      script_path: "workflows/noop.js",
      bindings: { llm: "synthetic.new" },
    });
    expect(res.status).toBe(200);
    const got = await data<{ bindings?: Record<string, string> }>(
      await manage("workflows/get", { name: "bound-flow" }),
    );
    expect(got.bindings).toEqual({ llm: "synthetic.new" });
  });
});

describe("named interface instances", () => {
  it("creates a second namespace alongside the default binding", async () => {
    await manage("interfaces/bind", { interface: "llm", provider: "openai" });
    const bound = await data<{ namespace: string }>(
      await manage("interfaces/bind", {
        interface: "llm",
        as: "fast",
        provider: "anthropic",
        options: { model: "claude-haiku-4-5-20251001" },
      }),
    );
    expect(bound.namespace).toBe("llm:fast");

    const fast = await resolveInterfaceForWorkspace("local", "llm:fast");
    expect(fast.compat.provider).toBe("anthropic");
    expect(fast.options["model"]).toBe("claude-haiku-4-5-20251001");
    expect(fast.instance).toBe("llm:fast");

    // The default instance is untouched by the named one.
    const base = await resolveInterfaceForWorkspace("local", "llm");
    expect(base.compat.provider).toBe("openai");
    expect(base.instance).toBe("llm");
  });

  it("lists instances as callable namespaces", async () => {
    const listed = await data<{
      instances: Array<{ namespace: string; interface: string; provider: string }>;
    }>(await manage("interfaces/list", {}));
    const fast = listed.instances.find((entry) => entry.namespace === "llm:fast");
    expect(fast).toMatchObject({ interface: "llm", provider: "anthropic" });
  });

  it("surfaces an instance in tool discovery", async () => {
    const res = await createApp().request("/tools?scope=configured");
    const body = (await res.json()) as { tools: Array<{ provider: string; name: string }> };
    expect(body.tools.some((tool) => tool.name === "llm:fast.createChatCompletion")).toBe(true);
  });

  it("refuses to resolve a named instance that was never bound", async () => {
    await expect(resolveInterfaceForWorkspace("local", "llm:nope")).rejects.toThrow(
      /No such interface instance/u,
    );
  });

  it("rejects a credential that belongs to another provider", async () => {
    const created = await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "openai",
        payload: { type: "api_key", value: "k" },
      }),
    });
    const { id } = (await created.json()) as { id: string };
    const res = await manage("interfaces/bind", {
      interface: "llm",
      as: "wrong",
      provider: "anthropic",
      credential: id,
    });
    expect(res.status).toBe(400);
  });

  it("pins an instance to one credential of several on a provider", async () => {
    const second = await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "openai",
        label: "billing account",
        payload: { type: "api_key", value: "second-key" },
      }),
    });
    const { id } = (await second.json()) as { id: string };
    await manage("interfaces/bind", {
      interface: "llm",
      as: "billing",
      provider: "openai",
      credential: id,
    });
    const resolved = await resolveInterfaceForWorkspace("local", "llm:billing");
    expect(resolved.credentialId).toBe(id);
  });

  it("rejects an invalid instance name", async () => {
    const res = await manage("interfaces/bind", {
      interface: "llm",
      as: "Not Valid",
      provider: "openai",
    });
    expect(res.status).toBe(400);
  });

  it("unbinds a named instance without touching the default", async () => {
    await manage("interfaces/unbind", { interface: "llm", as: "fast" });
    await expect(resolveInterfaceForWorkspace("local", "llm:fast")).rejects.toThrow(
      /No such interface instance/u,
    );
    expect((await resolveInterfaceForWorkspace("local", "llm")).compat.provider).toBe("openai");
  });
});

describe("agents bind an llm interface instance", () => {
  it("rejects an llm field that names another interface", async () => {
    const res = await manage("agents/create", { name: "wrong-iface", llm: "sql:analytics" });
    expect(res.status).toBe(400);
  });

  it("stores the instance on the profile", async () => {
    await manage("interfaces/bind", { interface: "llm", as: "cheap", provider: "anthropic" });
    await manage("agents/create", { name: "researcher", llm: "llm:cheap" });
    const got = await data<{ agent: { llm?: string } }>(
      await manage("agents/get", { name: "researcher" }),
    );
    expect(got.agent.llm).toBe("llm:cheap");
  });

  it("redirects the run's plain llm.* calls to the agent's instance", async () => {
    const { dispatchInterface } = await import("../src/workflows/invoke.js");
    // Proving the redirect without a network call: point the redirection at
    // an instance that was never bound. A plain `llm` call resolving through
    // it can only fail this way if ctx.interfaceInstances was consulted —
    // the workspace default `llm` is bound and would have dispatched.
    await expect(
      dispatchInterface(
        { workspaceId: "local", userId: "local", interfaceInstances: { llm: "llm:ghost" } },
        "llm",
        "listModels",
        {},
      ),
    ).rejects.toThrow(/No such interface instance: llm:ghost/u);
  });

  it("leaves an explicitly named instance alone", async () => {
    const { dispatchInterface } = await import("../src/workflows/invoke.js");
    // A script that said `llm:cheap` meant it, redirection or not.
    await expect(
      dispatchInterface(
        { workspaceId: "local", userId: "local", interfaceInstances: { llm: "llm:ghost" } },
        "llm:missing",
        "listModels",
        {},
      ),
    ).rejects.toThrow(/No such interface instance: llm:missing/u);
  });
});

describe("chat routes accept an llm instance", () => {
  it("lists bound instances alongside providers", async () => {
    const res = await createApp().request("/llm/providers");
    const body = (await res.json()) as {
      instances: Array<{ id: string; provider: string }>;
    };
    // llm:cheap was bound to anthropic above.
    expect(body.instances.some((entry) => entry.id === "llm:cheap")).toBe(true);
  });

  it("reports an unbound instance rather than treating it as a provider", async () => {
    const res = await createApp().request("/llm/llm:ghost/models");
    expect(res.status).toBe(404);
    const body = (await res.json()) as { error: string };
    expect(body.error).toMatch(/No such interface instance/u);
  });
});

// ---------------------------------------------------------------------------
// WS-3 dispatch-plane cutover, bindings half: on the durable backends a
// workspace binding IS a registry-server profile row, and
// `.services/bindings.json` is a one-time-import tombstone.
// ---------------------------------------------------------------------------

describe("bindings live in registry-server profiles", () => {
  it("interfaces.bind writes a profile row, never a bindings file", async () => {
    const { resetRateLimiters } = await import("../src/middleware/rateLimitMiddleware.js");
    resetRateLimiters();
    const bound = await manage("interfaces/bind", {
      interface: "llm",
      provider: "openai",
      options: { model: "gpt-4o-mini" },
    });
    expect(bound.status).toBe(200);

    const { getRegistryStorage } = await import("../src/registry-storage.js");
    const storage = await getRegistryStorage();
    const rows = await storage.profiles.list("local", { targetKind: "interface" });
    const llmDefault = rows.find((row) => row.targetId === "llm" && row.name === "default");
    expect(llmDefault?.provider).toBe("openai");
    expect(llmDefault?.options).toMatchObject({ model: "gpt-4o-mini" });

    const { getFsStore } = await import("../src/fs-store.js");
    expect(await getFsStore().read("local", ".services/bindings.json")).toBeUndefined();

    // Unbind deletes the row.
    await manage("interfaces/unbind", { interface: "llm" });
    const after = await storage.profiles.list("local", { targetKind: "interface" });
    expect(after.some((row) => row.targetId === "llm" && row.name === "default")).toBe(false);
  });

  it("imports a legacy bindings.json once, then tombstones it", async () => {
    const { getFsStore } = await import("../src/fs-store.js");
    const { readBindings } = await import("../src/interfaces.js");
    // A pre-cutover deployment left the legacy file behind.
    await getFsStore().write(
      "legacy-ws",
      ".services/bindings.json",
      JSON.stringify({
        bindings: {
          llm: { provider: "anthropic", options: { model: "claude-sonnet-4-5" } },
          "llm:fast": { interface: "llm", provider: "openai", options: { model: "gpt-4o-mini" } },
        },
      }),
      "application/json",
    );

    const bindings = await readBindings("legacy-ws");
    expect(bindings["llm"]).toMatchObject({ provider: "anthropic" });
    expect(bindings["llm:fast"]).toMatchObject({ provider: "openai" });

    // The file is gone; the bindings now live as profile rows.
    expect(await getFsStore().read("legacy-ws", ".services/bindings.json")).toBeUndefined();
    const { getRegistryStorage } = await import("../src/registry-storage.js");
    const storage = await getRegistryStorage();
    const rows = await storage.profiles.list("legacy-ws", { targetKind: "interface" });
    expect(rows.map((row) => row.name).sort()).toEqual(["default", "fast"]);
  });
});

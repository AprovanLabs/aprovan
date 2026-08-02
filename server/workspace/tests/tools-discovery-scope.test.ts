/**
 * Fast + paged discovery:
 *   - GET /tools?scope=configured — core services + credentialed providers +
 *     LLM aliases only, with no fallback to the network registry-catalog scan
 *     (see routes/tools.ts discoverConfiguredTools). Unknown/absent scope
 *     falls back to the full (potentially catalog-scanning) list.
 *   - registry.providers — paged, substring-filtered listing over the same
 *     catalog source as registry.search.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { getCredentialStore } from "../src/credentials.js";
import { resetToolListCache } from "../src/routes/tools.js";

let dataDir: string;
const originalFetch = globalThis.fetch;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-tools-scope-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

afterEach(() => {
  globalThis.fetch = originalFetch;
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

interface ToolEntryLike {
  provider: string;
  operation: string;
}

describe("GET /tools?scope=configured", () => {
  const FAKE_PROVIDER = "totally-fake-provider-xyz";

  beforeEach(async () => {
    resetToolListCache();
    // Credentialed, but not an installed UTDK package: its module import
    // fails, so the only way discovery finds operations for it is the
    // network catalog scan — the thing "configured" scope must never do.
    await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: FAKE_PROVIDER,
        payload: { type: "bearer_token", token: "x" },
      }),
    });
  });

  afterEach(async () => {
    const store = getCredentialStore();
    const existing = await store.resolveRecordForProvider("local", FAKE_PROVIDER);
    if (existing) await store.delete("local", existing.id);
    resetToolListCache();
  });

  it("includes every credentialed provider without a full catalog scan", async () => {
    let fetchCalls = 0;
    globalThis.fetch = (async (...args: Parameters<typeof fetch>) => {
      fetchCalls += 1;
      // The fake provider isn't in any catalog; let the lookup fail fast
      // rather than hitting the network.
      throw new Error("offline");
    }) as typeof fetch;

    const res = await createApp().request("/tools?scope=configured");
    expect(res.status).toBe(200);
    // Bounded: at most one catalog lookup per credentialed provider —
    // never the full catalog scan the unscoped path does.
    expect(fetchCalls).toBeLessThanOrEqual(1);

    const body = (await res.json()) as { tools: ToolEntryLike[] };
    // Core services are always present, no credential needed.
    expect(body.tools.some((t) => t.provider === "keyvalue")).toBe(true);
    // A credentialed provider MUST appear — "configured" means connected.
    // With no resolvable module and no catalog, it degrades to a visible
    // namespace placeholder instead of silently vanishing (which is how
    // GitHub disappeared from chat's services panel).
    expect(body.tools.some((t) => t.provider === FAKE_PROVIDER)).toBe(true);
  });

  it("an unrecognized scope value falls back to the full (catalog-scanning) list", async () => {
    let fetchCalls = 0;
    globalThis.fetch = (async () => {
      fetchCalls += 1;
      // Stand in for the registry catalog so the request doesn't hit the
      // network in a test environment.
      return new Response(JSON.stringify({ operations: [] }), { status: 200 });
    }) as typeof fetch;

    const full = await createApp().request("/tools?scope=bogus");
    expect(full.status).toBe(200);
    expect(fetchCalls).toBeGreaterThan(0);
  });

  it("has the same response shape as the unscoped list", async () => {
    const res = await createApp().request("/tools?scope=configured");
    const body = (await res.json()) as { tools: unknown[]; workspace_id: string };
    expect(Array.isArray(body.tools)).toBe(true);
    expect(body.workspace_id).toBe("local");
  });
});

describe("registry.providers — fast paged discovery", () => {
  const providers = Array.from({ length: 30 }, (_, i) => ({
    id: `provider-${String(i).padStart(2, "0")}`,
    title: `Provider ${String(i).padStart(2, "0")}`,
    description: i % 2 === 0 ? `Even provider number ${i}` : null,
    packageName: `@utdk/pkg-${i}`,
    icon: null,
  }));

  beforeEach(() => {
    globalThis.fetch = (async (url: string | URL | Request) => {
      const href = typeof url === "string" ? url : url instanceof URL ? url.href : url.url;
      if (href.endsWith("/catalog/providers.json")) {
        return new Response(JSON.stringify({ providers }), { status: 200 });
      }
      if (href.endsWith("/catalog/ops.json")) {
        return new Response(JSON.stringify({ operations: [] }), { status: 200 });
      }
      throw new Error(`Unexpected fetch in test: ${href}`);
    }) as typeof fetch;
  });

  it("defaults to a page of 25 and reports the true total", async () => {
    const res = await data<{ providers: Array<{ id: string; title: string; description?: string }>; total: number }>(
      await manage("registry/providers", {}),
    );
    expect(res.total).toBe(30);
    expect(res.providers).toHaveLength(25);
    expect(res.providers[0]).toEqual({ id: "provider-00", title: "Provider 00", description: "Even provider number 0" });
    // Odd entries have no description — omitted, not present as undefined/null.
    const odd = res.providers.find((p) => p.id === "provider-01")!;
    expect("description" in odd).toBe(false);
  });

  it("pages with offset/limit and clamps limit to 100", async () => {
    const page = await data<{ providers: Array<{ id: string }>; total: number }>(
      await manage("registry/providers", { offset: 25, limit: 10 }),
    );
    expect(page.total).toBe(30);
    expect(page.providers.map((p) => p.id)).toEqual(["provider-25", "provider-26", "provider-27", "provider-28", "provider-29"]);

    const clamped = await data<{ providers: unknown[] }>(await manage("registry/providers", { limit: 1000 }));
    expect(clamped.providers).toHaveLength(30);
  });

  it("filters by substring over the same catalog registry.search uses, in stable order", async () => {
    const filtered = await data<{ providers: Array<{ id: string }>; total: number }>(
      await manage("registry/providers", { q: "provider-1" }),
    );
    // provider-10..provider-19 match the "provider-1" substring.
    expect(filtered.total).toBe(10);
    expect(filtered.providers[0]?.id).toBe("provider-10");
  });
});

describe("shouldListCredentialAsProvider / namespaces kind", () => {
  it("hides interface ids and interface-only implementations", async () => {
    const { shouldListCredentialAsProvider } = await import("../src/routes/tools.js");
    expect(shouldListCredentialAsProvider("llm")).toBe(false);
    expect(shouldListCredentialAsProvider("agent")).toBe(false);
    expect(shouldListCredentialAsProvider("sandbox")).toBe(false);
    expect(shouldListCredentialAsProvider("machine")).toBe(false);
    expect(shouldListCredentialAsProvider("native")).toBe(false);
    expect(shouldListCredentialAsProvider("openrouter")).toBe(true);
    expect(shouldListCredentialAsProvider("github")).toBe(true);
  });

  it("keeps llm as kind interface even when a mis-keyed llm credential exists", async () => {
    resetToolListCache();
    const store = getCredentialStore();
    const bad = await store.create("local", {
      provider: "llm",
      label: "openrouter",
      payload: { type: "api_key", value: "test-key" },
    });
    const machine = await store.create("local", {
      provider: "machine",
      label: "host",
      payload: { type: "bearer_token", token: "host-token" },
    });
    // A real chat provider makes the llm interface listable; without it the
    // interface is omitted (nothing can execute it) — which is correct, and
    // used to leave only the bogus credential `llm` under Providers.
    const good = await store.create("local", {
      provider: "openrouter",
      label: "or",
      payload: { type: "api_key", value: "or-key" },
    });
    try {
      const res = await createApp().request("/tools/namespaces");
      expect(res.status).toBe(200);
      const body = (await res.json()) as {
        namespaces: Array<{ id: string; kind: string }>;
      };
      const byId = new Map(body.namespaces.map((n) => [n.id, n]));
      // Last-write-wins Map bug: credential `llm` used to overwrite the interface.
      expect(byId.get("llm")?.kind).toBe("interface");
      expect(body.namespaces.filter((n) => n.id === "llm")).toHaveLength(1);
      expect(byId.has("machine")).toBe(false);
      expect(body.namespaces.some((n) => n.kind === "provider" && n.id === "llm")).toBe(false);
      expect(byId.get("openrouter")?.kind).toBe("llm-alias");
    } finally {
      await store.delete("local", bad.id);
      await store.delete("local", machine.id);
      await store.delete("local", good.id);
      resetToolListCache();
    }
  });

  it("rejects posting credentials under interface / interface-only provider ids", async () => {
    for (const provider of ["llm", "agent", "machine", "native"]) {
      const res = await createApp().request("/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          payload: { type: "api_key", value: "x" },
        }),
      });
      expect(res.status).toBe(400);
    }
  });
});

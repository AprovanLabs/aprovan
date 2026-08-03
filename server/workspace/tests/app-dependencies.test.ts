/**
 * App dependencies — publish-time `requires` validation and capabilities
 * dependencies section (app-model-split stream 3 / app-dependencies spec).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { getRegistryStorage, resetRegistryStorage } from "../src/registry-storage.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-deps-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(async () => {
  await resetRegistryStorage();
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetAppRateLimiters();
  resetRateLimiters();
});

const manage = (path: string, args: Record<string, unknown>) =>
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

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T; error?: string };
  if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);
  return body.data;
}

async function err(res: Response): Promise<{ status: number; error: string }> {
  const body = (await res.json()) as { error?: string };
  return { status: res.status, error: body.error ?? "" };
}

describe("requires at publish", () => {
  it("accepts known contracts and rejects unknown ones", async () => {
    await putFile("apps/dep/index.tsx", "export default () => null;");
    const ok = await data<{ requires: Array<{ contract: string }> }>(
      await manage("apps/publish", {
        name: "dep-ok",
        dir: "apps/dep",
        allowed_tools: ["keyvalue.*", "sql.query"],
        requires: [{ contract: "sql" }],
      }),
    );
    expect(ok.requires).toEqual([{ contract: "sql" }]);

    const bad = await err(
      await manage("apps/publish", {
        name: "dep-bad",
        dir: "apps/dep",
        allowed_tools: ["keyvalue.*"],
        requires: [{ contract: "nonsense" }],
      }),
    );
    expect(bad.status).toBe(400);
    expect(bad.error).toMatch(/nonsense/i);
  });

  it("rejects contract wildcards with the tier message", async () => {
    await putFile("apps/dep2/index.tsx", "export default () => null;");
    const bad = await err(
      await manage("apps/publish", {
        name: "dep-wild",
        dir: "apps/dep2",
        allowed_tools: ["sql.*"],
        requires: [{ contract: "sql" }],
      }),
    );
    expect(bad.status).toBe(400);
    expect(bad.error).toMatch(/exact procedure|exported workflow/i);
  });

  it("apps.capabilities reports dependencies", async () => {
    await putFile("apps/dep3/index.tsx", "export default () => null;");
    await manage("apps/publish", {
      name: "dep-caps",
      dir: "apps/dep3",
      allowed_tools: ["keyvalue.*", "sql.query"],
      requires: [{ contract: "sql", optional: true }],
    });
    const caps = await data<{
      dependencies: Array<{ contract: string; optional: boolean; fulfilled: boolean | "ungated" }>;
    }>(await manage("apps/capabilities", { app: "dep-caps" }));
    expect(caps.dependencies).toEqual([
      expect.objectContaining({ contract: "sql", optional: true, fulfilled: true }),
    ]);
  });
});

describe("install bindings", () => {
  it("binds default sql profile and rejects missing profiles", async () => {
    await putFile("apps/sqlapp/index.tsx", "export default () => null;");
    const published = await data<{ appId: string }>(
      await manage("apps/publish", {
        name: "sqlapp",
        dir: "apps/sqlapp",
        visibility: "public",
        allowed_tools: ["keyvalue.*", "sql.query"],
        requires: [{ contract: "sql" }],
      }),
    );

    const missing = await err(await manage("apps/install", { app: published.appId }));
    expect(missing.status).toBe(400);
    expect(missing.error).toMatch(/sql/i);

    const storage = await getRegistryStorage();
    await storage.tenants.ensure("local");
    const profile = await storage.profiles.create("local", {
      name: "default",
      targetKind: "interface",
      targetId: "sql",
      options: {},
      createdBy: "test",
    });

    const install = await data<{
      installId: string;
      bindings: Record<string, string>;
    }>(await manage("apps/install", { app: published.appId }));
    expect(install.bindings.sql).toBe(profile.id);

    // Rebind without reinstall.
    const other = await storage.profiles.create("local", {
      name: "analytics",
      targetKind: "interface",
      targetId: "sql",
      options: {},
      createdBy: "test",
    });
    const configured = await data<{ bindings: Record<string, string> }>(
      await manage("apps/configure", {
        install: install.installId,
        bindings: { sql: other.id },
      }),
    );
    expect(configured.bindings.sql).toBe(other.id);

    // Revoke cuts fulfillment.
    await storage.grants.revoke("local", other.id, {
      kind: "app",
      id: install.installId,
    });
    const caps = await data<{
      dependencies: Array<{ contract: string; fulfilled: boolean | "ungated" }>;
    }>(
      await manage("apps/capabilities", {
        app: published.appId,
        install: install.installId,
      }),
    );
    expect(caps.dependencies[0]?.fulfilled).toBe(false);
  });
});

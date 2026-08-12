/**
 * App install lifecycle — update, config survival, private 404, fork + force
 * (app-model-split stream 3 / app-install-lifecycle spec).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { getFsStore } from "../src/fs-store.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetRegistryStorage } from "../src/registry-storage.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";
import { writeSvcRecord, svcScope } from "../src/svc-records.js";
import { saveApp, type AppManifest } from "../src/apps/store.js";
import { mintAppId, indexAppLocation, setAlias } from "../src/apps/identity.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-install-"));
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

const manage = (path: string, args: Record<string, unknown>, workspace = "local") =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Aprovan-Workspace": workspace,
    },
    body: JSON.stringify({ args }),
  });

const putFile = (path: string, content: string, workspace = "local") =>
  createApp().request(`/fs/${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Aprovan-Workspace": workspace,
    },
    body: JSON.stringify({ content }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T; error?: string };
  if (!res.ok) throw new Error(`${res.status}: ${body.error ?? JSON.stringify(body)}`);
  return body.data;
}

async function err(res: Response): Promise<{ status: number; error: string }> {
  const body = (await res.json()) as { error?: string };
  return { status: res.status, error: body.error ?? "" };
}

describe("install lifecycle", () => {
  it("channel update reports old→new and config survives", async () => {
    await putFile("apps/up/index.tsx", "export default () => 'v1';");
    await manage("apps/publish", {
      name: "up",
      dir: "apps/up",
      visibility: "public",
      allowed_tools: ["keyvalue.*"],
    });
    const r1 = await data<{ id: string }>(
      await manage("apps/release", { app: "up", notes: "one" }),
    );

    const install = await data<{
      installId: string;
      resolvedRelease: string;
      config: Record<string, unknown>;
    }>(
      await manage("apps/install", {
        app: "up",
        slug: "up-copy",
        config: { theme: "dark" },
      }),
    );
    expect(install.resolvedRelease).toBe(r1.id);

    await putFile("apps/up/index.tsx", "export default () => 'v2';");
    const r2 = await data<{ id: string }>(
      await manage("apps/release", { app: "up", notes: "two" }),
    );

    const updated = await data<{ from: string; to: string; config: Record<string, unknown> }>(
      await manage("apps/update", { install: install.installId }),
    );
    expect(updated.from).toBe(r1.id);
    expect(updated.to).toBe(r2.id);
    expect(updated.config).toEqual({ theme: "dark" });
  });

  it("private app install from another workspace is 404", async () => {
    await putFile("apps/priv/index.tsx", "export default () => null;");
    const published = await data<{ appId: string }>(
      await manage("apps/publish", {
        name: "priv",
        dir: "apps/priv",
        visibility: "private",
        allowed_tools: ["keyvalue.*"],
      }),
    );

    // Seed a second workspace install attempt via ULID (location-indexed).
    const denied = await err(
      await manage("apps/install", { app: published.appId }, "other-ws"),
    );
    // The tool call still runs as the default workspace in auth-none mode
    // unless we seed the app into a foreign owner. Simulate by writing the
    // manifest under a foreign workspace and installing from local.
    const foreignId = mintAppId();
    const now = new Date().toISOString();
    const foreign: AppManifest = {
      appId: foreignId,
      name: "foreign-priv",
      entry: "apps/foreign-priv/index.tsx",
      paths: ["apps/foreign-priv"],
      visibility: "private",
      allowedTools: ["keyvalue.*"],
      createdBy: "owner",
      createdAt: now,
      updatedAt: now,
    };
    await writeSvcRecord("ws-a", svcScope("apps"), foreignId, foreign);
    await setAlias("ws-a", "foreign-priv", foreignId);
    await indexAppLocation("ws-a", foreignId, "foreign-priv");

    const blocked = await err(await manage("apps/install", { app: foreignId }));
    expect(blocked.status).toBe(404);
  });

  it("two installs are distinct and editing fork requires force to update", async () => {
    await putFile("apps/fork/index.tsx", "export default () => 'a';");
    await manage("apps/publish", {
      name: "fork",
      dir: "apps/fork",
      visibility: "public",
      allowed_tools: ["vfs.*", "keyvalue.*"],
    });
    await manage("apps/release", { app: "fork" });

    const a = await data<{ installId: string }>(
      await manage("apps/install", { app: "fork", slug: "fork-a" }),
    );
    const b = await data<{ installId: string }>(
      await manage("apps/install", { app: "fork", slug: "fork-b" }),
    );
    expect(a.installId).not.toBe(b.installId);

    const forked = await data<{ editing: boolean; prefix: string }>(
      await manage("apps/configure", {
        install: a.installId,
        editing: true,
        prefix: "apps/fork-local",
      }),
    );
    expect(forked.editing).toBe(true);
    expect(forked.prefix).toBe("apps/fork-local");

    const file = await getFsStore().read("local", "apps/fork-local/index.tsx");
    expect(file?.content).toContain("'a'");

    await putFile("apps/fork/index.tsx", "export default () => 'b';");
    await manage("apps/release", { app: "fork" });

    const blocked = await err(await manage("apps/update", { install: a.installId }));
    expect(blocked.status).toBe(409);

    const forced = await data<{ to: string }>(
      await manage("apps/update", { install: a.installId, force: true }),
    );
    expect(forced.to).toBeTruthy();
    const updated = await getFsStore().read("local", "apps/fork-local/index.tsx");
    expect(updated?.content).toContain("'b'");
  });
});

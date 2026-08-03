/**
 * App-model-split stream 6 — cross-capability integration:
 * publish → directory → install → partition paths → rename-safe;
 * reseed cleans legacy name keys; registry grant subjects stay opaque.
 */

import { execFile } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { createWorkspaceApp } from "../src/server.js";
import "../src/services.js"; // install CORE_SERVICES before appsService.call
import { appsService } from "../src/apps/service.js";
import { appDataDir } from "../src/apps/store.js";
import { isAppId } from "../src/apps/identity.js";
import { getFsStore } from "../src/fs-store.js";
import { getRecordStore } from "../src/records.js";
import { listSvcRecords, svcScope, writeSvcRecord } from "../src/svc-records.js";
import { getRegistryStorage, resetRegistryStorage } from "../src/registry-storage.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";
import type { GrantSubject } from "@aprovan/registry-server";

const execFileAsync = promisify(execFile);

const WS_A = "ws-a";
const WS_B = "ws-b";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-integration-"));
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

const ctx = (workspaceId: string, userId = "local") => ({
  workspaceId,
  userId,
});

async function putFile(workspaceId: string, path: string, content: string): Promise<void> {
  await getFsStore().write(workspaceId, path, content, "text/plain");
}

/** Auth-none tools always bind to `local`; use the service handle for A/B. */
async function apps<T>(
  workspaceId: string,
  procedure: string,
  args: Record<string, unknown>,
  userId = "local",
): Promise<T> {
  return (await appsService.call(ctx(workspaceId, userId), procedure, args)) as T;
}

describe("6.1 e2e publish → directory → install → partitions → rename", () => {
  it("cross-workspace chain survives rename", async () => {
    await putFile(WS_A, "apps/sql-tracker/index.tsx", "export default () => 'tracker';");

    const published = await apps<{
      appId: string;
      name: string;
      requires: Array<{ contract: string }>;
    }>(WS_A, "publish", {
      name: "sql-tracker",
      dir: "apps/sql-tracker",
      visibility: "public",
      title: "SQL Tracker",
      allowed_tools: ["keyvalue.*", "vfs.*", "sql.query"],
      requires: [{ contract: "sql" }],
    });
    expect(isAppId(published.appId)).toBe(true);
    expect(published.requires).toEqual([{ contract: "sql" }]);

    // Release so channel updates have somewhere to pin.
    const release1 = await apps<{ id: string }>(WS_A, "release", {
      app: published.appId,
      notes: "v1",
    });

    // B sees it in the deployment directory (not own-workspace merge).
    const directory = await apps<{
      apps: Array<{ appId: string; name: string; workspaceId: string }>;
    }>(WS_B, "directory", {});
    const entry = directory.apps.find((a) => a.appId === published.appId);
    expect(entry).toMatchObject({
      appId: published.appId,
      name: "sql-tracker",
      workspaceId: WS_A,
    });

    // Default sql profile in B → install binds + mirrors opaque app grant.
    const storage = await getRegistryStorage();
    await storage.tenants.ensure(WS_B);
    const profile = await storage.profiles.create(WS_B, {
      name: "default",
      targetKind: "interface",
      targetId: "sql",
      options: {},
      createdBy: "bob",
    });

    const install = await apps<{
      installId: string;
      originAppId: string;
      bindings: Record<string, string>;
      dataPrefix: string;
      resolvedRelease: string | null;
    }>(WS_B, "install", { app: published.appId }, "bob");

    expect(isAppId(install.installId)).toBe(true);
    expect(install.originAppId).toBe(published.appId);
    expect(install.bindings.sql).toBe(profile.id);
    expect(install.dataPrefix).toBe(appDataDir(install.installId, "bob"));
    expect(install.resolvedRelease).toBe(release1.id);

    // Provider/profile grant subject is opaque {kind:"app", id: installId}.
    const granted = await storage.grants.grantedProfileIds(WS_B, [
      { kind: "app", id: install.installId },
    ]);
    expect(granted.has(profile.id)).toBe(true);

    // App session keyvalue → app#<installId>#u#<sub> in B's tenant.
    const kvRes = await createApp().request(
      `/apps/${WS_B}/${install.installId}/tools/keyvalue/set`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-App-User": "bob" },
        body: JSON.stringify({ args: { key: "state", value: { n: 1 } } }),
      },
    );
    expect(kvRes.status).toBe(200);

    const records = getRecordStore();
    const scope = `app#${install.installId}#u#bob`;
    expect(await records.list(WS_B, scope)).toContain("state");
    expect((await records.get(WS_B, scope, "state"))?.value).toEqual({ n: 1 });

    // File partition path formula for the install.
    const filePath = `${appDataDir(install.installId, "bob")}/note.md`;
    await getFsStore().write(WS_B, filePath, "hello", "text/plain");
    expect((await getFsStore().read(WS_B, filePath))?.content).toBe("hello");
    expect(filePath.startsWith(`.apps/${install.installId}/data/bob/`)).toBe(true);

    // Origin release bump + rename in A.
    await putFile(WS_A, "apps/sql-tracker/index.tsx", "export default () => 'tracker-v2';");
    const release2 = await apps<{ id: string }>(WS_A, "release", {
      app: published.appId,
      notes: "v2",
    });

    const renamed = await apps<{ appId: string; name: string }>(WS_A, "rename", {
      app: published.appId,
      name: "sql-tracker-renamed",
    });
    expect(renamed.appId).toBe(published.appId);
    expect(renamed.name).toBe("sql-tracker-renamed");

    // B's install still resolves, updates, and serves after rename.
    const installed = await apps<{
      installs: Array<{ installId: string; originAppId: string; available: boolean; name?: string }>;
    }>(WS_B, "installed", {});
    const row = installed.installs.find((i) => i.installId === install.installId);
    expect(row).toMatchObject({
      originAppId: published.appId,
      available: true,
      name: "sql-tracker-renamed",
    });

    const updated = await apps<{ from: string | null; to: string }>(WS_B, "update", {
      install: install.installId,
    });
    expect(updated.from).toBe(release1.id);
    expect(updated.to).toBe(release2.id);

    const live = createWorkspaceApp();
    const page = await live.request(`/apps/${WS_B}/${install.installId}`);
    expect(page.status).toBe(200);

    // Prior session data still readable after rename + update.
    const again = await createApp().request(
      `/apps/${WS_B}/${install.installId}/tools/keyvalue/get`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-App-User": "bob" },
        body: JSON.stringify({ args: { key: "state" } }),
      },
    );
    expect(again.status).toBe(200);
    const kv = (await again.json()) as { data: { value: unknown } };
    expect(kv.data.value).toEqual({ n: 1 });
  });
});

describe("6.2 reseed clears legacy name-keyed keys", () => {
  it("leaves zero name-keyed app scopes after reseed", async () => {
    const ws = "legacy-ws";
    const now = new Date().toISOString();

    // Seed legacy name-keyed shapes the reseed script is meant to wipe.
    await writeSvcRecord(ws, svcScope("apps"), "old-app", {
      name: "old-app",
      entry: "apps/old-app/index.tsx",
      paths: ["apps/old-app"],
      allowedTools: ["keyvalue.*"],
      createdBy: "system",
      createdAt: now,
      updatedAt: now,
    });
    await writeSvcRecord(ws, svcScope("apps", "installed"), "old-app", {
      name: "old-app",
      installedAt: now,
    });
    await writeSvcRecord(ws, "svc#apps#releases#old-app", "rel-1", {
      id: "rel-1",
      createdAt: now,
    });
    const records = getRecordStore();
    await records.set(ws, "app#old-app#u#alice", "k", 1, "alice");
    await getFsStore().write(ws, ".apps/old-app/data/alice/x", "legacy", "text/plain");

    expect((await listSvcRecords(ws, svcScope("apps"))).some((e) => e.key === "old-app")).toBe(
      true,
    );

    await execFileAsync(
      process.execPath,
      [
        "--import",
        "tsx",
        join(process.cwd(), "scripts/reseed-apps.ts"),
        ws,
      ],
      {
        cwd: join(process.cwd()),
        env: {
          ...process.env,
          WORKSPACE_DATA_DIR: dataDir,
          RESEED_APPS_FIXTURE: "1",
        },
      },
    );

    const apps = await listSvcRecords(ws, svcScope("apps"));
    expect(apps.every((e) => isAppId(e.key))).toBe(true);
    expect(apps.some((e) => e.key === "old-app")).toBe(false);

    const installed = await listSvcRecords(ws, svcScope("apps", "installed")).catch(() => []);
    expect(installed).toEqual([]);

    const releaseScopes = await records.listScopes(ws, "svc#apps#releases#");
    for (const scope of releaseScopes) {
      const suffix = scope.replace(/^svc#apps#releases#/, "");
      expect(isAppId(suffix)).toBe(true);
    }

    const appScopes = await records.listScopes(ws, "app#");
    for (const scope of appScopes) {
      const match = /^app#([^#]+)#u#/.exec(scope);
      expect(match?.[1] && isAppId(match[1])).toBe(true);
    }

    // Fixture reminted with a ULID alias "demo".
    expect(apps.length).toBeGreaterThanOrEqual(1);
    const demoAlias = await listSvcRecords(ws, svcScope("apps", "alias"));
    expect(demoAlias.some((e) => e.key === "demo")).toBe(true);
  });
});

describe("6.3 registry stays app-ignorant on grant subjects", () => {
  it("app flows only pass opaque {kind:\"app\", id} grant subjects", async () => {
    const origin = "ws-grant-a";
    const installer = "ws-grant-b";
    await putFile(origin, "apps/bound/index.tsx", "export default () => null;");
    const published = await apps<{ appId: string }>(origin, "publish", {
      name: "bound-app",
      dir: "apps/bound",
      visibility: "public",
      allowed_tools: ["keyvalue.*", "sql.query"],
      requires: [{ contract: "sql" }],
    });

    const storage = await getRegistryStorage();
    await storage.tenants.ensure(installer);
    const profile = await storage.profiles.create(installer, {
      name: "default",
      targetKind: "interface",
      targetId: "sql",
      options: {},
      createdBy: "bob",
    });

    const grantSubjects: GrantSubject[] = [];
    const originalGrant = storage.grants.grant.bind(storage.grants);
    const spy = vi.spyOn(storage.grants, "grant").mockImplementation(async (...args) => {
      const subject = args[2] as GrantSubject;
      grantSubjects.push(subject);
      return originalGrant(...args);
    });

    try {
      const install = await apps<{ installId: string }>(
        installer,
        "install",
        { app: published.appId },
        "bob",
      );

      expect(grantSubjects.length).toBeGreaterThan(0);
      for (const subject of grantSubjects) {
        expect(subject).toEqual({ kind: "app", id: install.installId });
        expect(isAppId(subject.id)).toBe(true);
        // No name / manifest / schema fields on the subject.
        expect(Object.keys(subject).sort()).toEqual(["id", "kind"]);
      }

      // Rebind also mirrors with the same opaque subject.
      const other = await storage.profiles.create(installer, {
        name: "analytics",
        targetKind: "interface",
        targetId: "sql",
        options: {},
        createdBy: "bob",
      });
      grantSubjects.length = 0;
      await apps(installer, "configure", {
        install: install.installId,
        bindings: { sql: other.id },
      });
      expect(grantSubjects).toEqual([{ kind: "app", id: install.installId }]);
    } finally {
      spy.mockRestore();
    }
  });
});

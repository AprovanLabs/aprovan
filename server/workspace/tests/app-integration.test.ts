/**
 * Cross-capability integration:
 * - App-model-split stream 6: publish → directory → install → partitions →
 *   rename-safe; reseed; opaque registry grant subjects.
 * - IW-9 A stream 7: app-scoped commit → release tag → pinned serve → restore
 *   → history; sessions.resolve two-parent merge + auto summary/restore.
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
    expect(page.status).toBe(302);
    expect(page.headers.get("Location")).toBe(`/w/${WS_B}/a/${install.installId}`);
    const canonical = await live.request(`/w/${WS_B}/a/${install.installId}`);
    expect(canonical.status).toBe(200);

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

// ---------------------------------------------------------------------------
// IW-9 A stream 7 — consolidated VCS surface end-to-end
// ---------------------------------------------------------------------------

const tools = (path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

const putLocal = (path: string, content: string, session?: string) =>
  createApp().request(`/fs/${path}${session ? `?session=${session}` : ""}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

const getLocal = (path: string, session?: string) =>
  createApp().request(`/fs/${path}${session ? `?session=${session}` : ""}`);

async function toolData<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

describe("7.1 IW-9 A: app commit → release tag → pinned serve → restore → history", () => {
  it("composes scoped commit, release tag, live pin, restore; main untouched", async () => {
    const { readRef } = await import("../src/vcs/store.js");

    await putLocal(
      "apps/iw9a-integ/index.tsx",
      "export default () => 'seed';",
    );
    const published = await toolData<{ appId: string; root: string }>(
      await tools("apps/publish", {
        name: "iw9a-integ",
        dir: "apps/iw9a-integ",
        visibility: "public",
        allowed_tools: ["vfs.*"],
      }),
    );
    expect(isAppId(published.appId)).toBe(true);

    const mainBefore = await readRef("local", "main");

    await putLocal(
      "apps/iw9a-integ/index.tsx",
      "export default () => 'v1-committed';",
    );
    const scoped = await toolData<{
      created: boolean;
      commit: { id: string; message: string };
    }>(
      await tools("vcs/commit", {
        message: "app v1",
        scope: { app: published.appId },
      }),
    );
    expect(scoped.created).toBe(true);
    const commitA = scoped.commit.id;

    await putLocal(
      "apps/iw9a-integ/index.tsx",
      "export default () => 'v2-release';",
    );
    const release = await toolData<{
      id: string;
      commitId: string;
      snapshotId: string;
      channel?: string;
    }>(
      await tools("apps/release", {
        app: published.appId,
        notes: "cut for pin",
      }),
    );
    expect(release.commitId).toBeTruthy();
    expect(release.commitId).not.toBe(commitA);
    const commitB = release.commitId;

    // Dirty the live tree after the release pin.
    await putLocal(
      "apps/iw9a-integ/index.tsx",
      "export default () => 'dirty-live';",
    );
    const liveFile = (await (await getLocal("apps/iw9a-integ/index.tsx")).json()) as {
      content: string;
    };
    expect(liveFile.content).toContain("dirty-live");

    // Live surface (canonical + legacy shim) still serves the pinned release.
    const gateway = createWorkspaceApp();
    const shim = await gateway.request(`/apps/local/${published.appId}`);
    expect(shim.status).toBe(302);
    expect(shim.headers.get("Location")).toBe(`/a/${published.appId}`);

    const projectRes = await gateway.request(`/a/${published.appId}/__project__`);
    expect(projectRes.status).toBe(200);
    const project = (await projectRes.json()) as {
      files: Array<{ path: string; content: string }>;
      release: { id: string; commitId: string } | null;
    };
    expect(project.release?.id).toBe(release.id);
    expect(project.release?.commitId).toBe(commitB);
    const entry = project.files.find((f) => f.path === "apps/iw9a-integ/index.tsx");
    expect(entry?.content).toContain("v2-release");
    expect(entry?.content).not.toContain("dirty-live");

    // Restore the earlier app-scoped commit into the working tree.
    const restored = await toolData<{ restored: string[] }>(
      await tools("vcs/restore", {
        commit: commitA,
        scope: { app: published.appId },
      }),
    );
    expect(restored.restored).toContain("apps/iw9a-integ/index.tsx");
    const afterRestore = (await (await getLocal("apps/iw9a-integ/index.tsx")).json()) as {
      content: string;
    };
    expect(afterRestore.content).toContain("v1-committed");

    // App history shows both the manual commit and the release commit.
    const history = await toolData<{
      commits: Array<{ id: string; message: string }>;
    }>(await tools("vcs/log", { scope: { app: published.appId } }));
    const ids = history.commits.map((c) => c.id);
    expect(ids).toContain(commitA);
    expect(ids).toContain(commitB);

    // Workspace main never advanced to either app commit.
    const mainAfter = await readRef("local", "main");
    expect(mainAfter?.commit).toBe(mainBefore?.commit);
    expect(mainAfter?.commit).not.toBe(commitA);
    expect(mainAfter?.commit).not.toBe(commitB);
  });
});

describe("7.2 IW-9 A: sessions.resolve + auto summary/restore round-trips", () => {
  it("staged conflict → sessions.resolve → two-parent merge in history", async () => {
    const { readCommit, readRef } = await import("../src/vcs/store.js");

    await putLocal("iw9a/session-merge.md", "base");
    const created = await toolData<{
      session: { id: string; status: string };
    }>(await tools("sessions/create", { title: "IW9A staged", mode: "staged" }));
    const sessionId = created.session.id;

    await putLocal("iw9a/session-merge.md", "draft version", sessionId);
    await putLocal("iw9a/session-merge.md", "workspace moved"); // conflict on main

    const resolved = await toolData<{
      session: { id: string; status: string; mergeCommit?: string };
      resolved: string[];
      commit?: { id: string; message: string };
    }>(
      await tools("sessions/resolve", {
        id: sessionId,
        strategy: "keep-draft",
        message: "IW9A keep draft",
      }),
    );
    expect(resolved.resolved).toEqual(["iw9a/session-merge.md"]);
    expect(resolved.session.status).toBe("merged");
    expect(resolved.commit?.id).toBeTruthy();

    // resolve syncs (auto-snapshots dirty main) then merges with
    // parents [mainHead, sessionHead] — assert lineage, not a pre-call tip.
    const merge = await readCommit("local", resolved.commit!.id);
    expect(merge?.parents).toHaveLength(2);
    expect(merge?.sessionId).toBe(sessionId);
    const sessionRef = await readRef("local", `session/${sessionId}`);
    expect(merge?.parents[1]).toBe(sessionRef?.commit);
    expect(merge?.parents[0]).not.toBe(merge?.parents[1]);
    const mainAfter = await readRef("local", "main");
    expect(mainAfter?.commit).toBe(merge?.id);

    const history = await toolData<{ commits: Array<{ id: string; parents: string[] }> }>(
      await tools("vcs/log", {}),
    );
    const logged = history.commits.find((c) => c.id === resolved.commit!.id);
    expect(logged?.parents).toHaveLength(2);

    const live = (await (await getLocal("iw9a/session-merge.md")).json()) as { content: string };
    expect(live.content).toBe("draft version");
  });

  it("auto session → change summary → one-click restore of touched paths", async () => {
    const { recordSessionTouch } = await import("../src/vcs/chat-sessions.js");

    await putLocal("iw9a/auto-base.md", "before");
    const created = await toolData<{
      session: {
        id: string;
        mode: string;
        base: string;
        changes?: { added: string[]; modified: string[]; removed: string[] };
      };
    }>(await tools("sessions/create", { title: "IW9A auto" }));
    expect(created.session.mode).toBe("auto");
    const sessionId = created.session.id;
    const base = created.session.base;

    // fs.ts does not wire recordSessionTouch (carryover) — record explicitly.
    await getFsStore().write("local", "iw9a/auto-base.md", "after-session", "text/plain");
    await recordSessionTouch("local", sessionId, "iw9a/auto-base.md");
    await getFsStore().write("local", "iw9a/auto-new.md", "brand new", "text/plain");
    await recordSessionTouch("local", sessionId, "iw9a/auto-new.md");

    const got = await toolData<{
      session: {
        changes?: { added: string[]; modified: string[]; removed: string[] };
      };
    }>(await tools("sessions/get", { id: sessionId }));
    expect(got.session.changes?.modified).toContain("iw9a/auto-base.md");
    expect(got.session.changes?.added).toContain("iw9a/auto-new.md");

    // One-click restore: put listed paths back to the session base commit.
    for (const path of ["iw9a/auto-base.md", "iw9a/auto-new.md"]) {
      await toolData(await tools("vcs/restore", { commit: base, path }));
    }

    const baseFile = (await (await getLocal("iw9a/auto-base.md")).json()) as { content: string };
    expect(baseFile.content).toBe("before");
    // Path added after base is not in the snapshot — restore leaves it or
    // removes only paths present in the commit. Assert base path restored.
    expect((await getLocal("iw9a/auto-new.md")).status).toBe(200);
  });
});

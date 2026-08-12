/**
 * App identity — ULID minting, alias index, rename neutrality, permalinks.
 * Specs: app-identity; tech-plan D1–D3.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { isValid } from "ulid";
import { createApp } from "../src/app.js";
import { createWorkspaceApp } from "../src/server.js";
import {
  dropAlias,
  mintAppId,
  mintInstallId,
  readAlias,
  resolveAppRef,
  setAlias,
} from "../src/apps/identity.js";
import { listReleases, saveRelease, snapshotRelease } from "../src/apps/releases.js";
import { appDataDir, listApps, readApp, saveApp } from "../src/apps/store.js";
import { getRecordStore } from "../src/records.js";
import { listSvcRecords, svcScope, writeSvcRecord } from "../src/svc-records.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";
import { ServiceError } from "../src/service-kernel.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-identity-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
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

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T; error?: string };
  if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);
  return body.data;
}

describe("identity module", () => {
  it("mints unique sortable ULIDs", () => {
    const a = mintAppId();
    const b = mintAppId();
    const i = mintInstallId();
    expect(isValid(a)).toBe(true);
    expect(isValid(b)).toBe(true);
    expect(isValid(i)).toBe(true);
    expect(a).not.toBe(b);
    expect(a < b || b < a).toBe(true);
  });

  it("alias round-trips and rejects collisions with 409", async () => {
    const ws = "alias-ws";
    const appId = mintAppId();
    await setAlias(ws, "tracker", appId);
    expect(await readAlias(ws, "tracker")).toEqual({ appId });
    expect(await resolveAppRef(ws, "tracker")).toBe(appId);
    expect(await resolveAppRef(ws, appId)).toBe(appId);

    await expect(setAlias(ws, "tracker", mintAppId())).rejects.toMatchObject({
      status: 409,
    } satisfies Partial<ServiceError>);

    await dropAlias(ws, "tracker");
    await expect(resolveAppRef(ws, "tracker")).rejects.toMatchObject({ status: 404 });
  });
});

describe("publish / rename / storage keys", () => {
  it("publish mints a ULID; republish keeps it; storage is id-keyed", async () => {
    const published = await data<{ appId: string; name: string }>(
      await manage("apps/publish", {
        name: "id-app",
        title: "ID App",
        allowed_tools: ["keyvalue.*"],
      }),
    );
    expect(isValid(published.appId)).toBe(true);
    expect(published.name).toBe("id-app");

    const stored = await readApp("local", published.appId);
    expect(stored?.name).toBe("id-app");

    const appsScope = await listSvcRecords("local", svcScope("apps"));
    expect(appsScope.some((e) => e.key === published.appId)).toBe(true);
    expect(appsScope.some((e) => e.key === "id-app")).toBe(false);

    const again = await data<{ appId: string }>(
      await manage("apps/publish", {
        name: "id-app",
        title: "ID App v2",
        allowed_tools: ["keyvalue.*", "vfs.*"],
      }),
    );
    expect(again.appId).toBe(published.appId);
  });

  it("rename moves no storage; releases and per-user data stay readable", async () => {
    const published = await data<{ appId: string; name: string }>(
      await manage("apps/publish", {
        name: "rename-me",
        allowed_tools: ["keyvalue.*"],
        roles: { admins: ["local"] },
      }),
    );

    const manifest = (await readApp("local", published.appId))!;
    const release = await snapshotRelease("local", manifest, {
      channel: "live",
      createdBy: "local",
    });
    await saveRelease("local", published.appId, release);

    const userSub = "alice";
    const records = getRecordStore();
    await records.set("local", `app#${published.appId}#u#${userSub}`, "note", { v: 1 }, userSub);
    expect(appDataDir(published.appId, userSub)).toBe(`.apps/${published.appId}/data/${userSub}`);

    // Seed an install record pointing at appId lineage (ULID-keyed).
    const { mintInstallId } = await import("../src/apps/identity.js");
    const installId = mintInstallId();
    await writeSvcRecord("other-ws", svcScope("installs"), installId, {
      installId,
      originAppId: published.appId,
      originWorkspaceId: "local",
      pin: { channel: "live" },
      resolvedRelease: release.id,
      bindings: {},
      config: {},
      editing: false,
      prefix: "apps/rename-me",
      installedBy: "alice",
      installedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const renamed = await data<{ appId: string; name: string }>(
      await manage("apps/rename", { app: published.appId, name: "renamed" }),
    );
    expect(renamed.appId).toBe(published.appId);
    expect(renamed.name).toBe("renamed");

    expect(await resolveAppRef("local", "renamed")).toBe(published.appId);
    await expect(resolveAppRef("local", "rename-me")).rejects.toMatchObject({ status: 404 });

    const releases = await listReleases("local", published.appId);
    expect(releases.map((r) => r.id)).toContain(release.id);

    const note = await records.get("local", `app#${published.appId}#u#${userSub}`, "note");
    expect(note?.value).toEqual({ v: 1 });

    // Install still resolves the origin by appId after rename.
    const origin = await readApp("local", published.appId);
    expect(origin?.name).toBe("renamed");
  });

  it("alias collision on publish is 409", async () => {
    await data(await manage("apps/publish", { name: "taken", allowed_tools: ["keyvalue.*"] }));
    const other = await data<{ appId: string }>(
      await manage("apps/publish", { name: "other", allowed_tools: ["keyvalue.*"] }),
    );
    // Force-bind collision via setAlias path: rename other → taken
    const res = await manage("apps/rename", { app: other.appId, name: "taken" });
    expect(res.status).toBe(409);
  });

  it("apps.list has no Personal entry on a fresh workspace", async () => {
    // Isolate: list only apps we published in this file's local workspace —
    // assert none are builtin/personal.
    const list = await data<{ apps: Array<{ name: string; builtin?: boolean }> }>(
      await manage("apps/list", {}),
    );
    expect(list.apps.every((a) => a.name !== "personal" && !a.builtin)).toBe(true);
  });

  it("old alias URL 404s; new alias + permalink serve", async () => {
    await createApp().request("/fs/apps/live-alias/index.tsx", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "export default () => null;", mimeType: "text/plain" }),
    });
    const published = await data<{ appId: string }>(
      await manage("apps/publish", {
        name: "live-alias",
        allowed_tools: ["keyvalue.*"],
        visibility: "public",
        entry: "apps/live-alias/index.tsx",
      }),
    );

    await manage("apps/rename", { app: published.appId, name: "live-new" });

    const live = createWorkspaceApp();
    const oldUrl = await live.request("/apps/local/live-alias");
    expect(oldUrl.status).toBe(404);

    const newUrl = await live.request("/apps/local/live-new");
    expect(newUrl.status).toBe(302);
    expect(newUrl.headers.get("Location")).toBe(`/a/${published.appId}`);

    const permalink = await live.request(`/apps/id/${published.appId}`);
    expect(permalink.status).toBe(302);
    expect(permalink.headers.get("Location")).toBe(`/a/${published.appId}`);

    const canonical = await live.request(`/a/${published.appId}/__project__`);
    expect(canonical.status).toBe(200);

    const api = await createApp().request(`/apps/id/${published.appId}`, {
      headers: { "X-App-User": "local" },
    });
    expect(api.status).toBe(200);
    const body = (await api.json()) as { appId: string; name: string };
    expect(body.appId).toBe(published.appId);
    expect(body.name).toBe("live-new");
    expect((body as { permalink?: string }).permalink).toBe(`/a/${published.appId}`);
    expect((body as { url?: string }).url).toBe(`/a/${published.appId}`);
  });

  it("writes no name-keyed manifest or release scopes", async () => {
    const published = await data<{ appId: string }>(
      await manage("apps/publish", { name: "keys-check", allowed_tools: ["keyvalue.*"] }),
    );
    const manifest = (await readApp("local", published.appId))!;
    const release = await snapshotRelease("local", manifest, {
      channel: "live",
      createdBy: "local",
    });
    await saveRelease("local", published.appId, release);

    const appKeys = (await listSvcRecords("local", svcScope("apps"))).map((e) => e.key);
    expect(appKeys).toContain(published.appId);
    expect(appKeys).not.toContain("keys-check");

    const releaseScope = svcScope("apps", "releases", published.appId);
    const releaseKeys = await listSvcRecords("local", releaseScope);
    expect(releaseKeys.length).toBeGreaterThan(0);

    const badReleaseScope = svcScope("apps", "releases", "keys-check");
    expect(await listSvcRecords("local", badReleaseScope)).toHaveLength(0);

    const listed = await listApps("local");
    expect(listed.some((a) => a.appId === published.appId)).toBe(true);
  });
});

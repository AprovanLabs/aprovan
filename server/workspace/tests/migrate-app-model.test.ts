/**
 * App-model migration (iw9-b stream 7).
 *
 * Covers: paths[] extras → root + mount/fold; idempotent re-run; dead-origin
 * install → flagged broken (not dropped); pre-migration snapshot before mutate.
 */

import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mintAppId, mintInstallId } from "../src/apps/identity.js";
import { appPathAllowed, type AppManifest } from "../src/apps/store.js";
import { getFsStore } from "../src/fs-store.js";
import { listSvcRecords, svcScope, writeSvcRecord } from "../src/svc-records.js";
import { listMounts } from "../src/vcs/mounts-procedures.js";
import { migrateAppRoots, mountPrefixForExtra } from "../scripts/migrate-app-roots.js";
import {
  migrateInstallsToCopy,
  type MigratedInstall,
} from "../scripts/migrate-installs-to-copy.js";

let dataDir: string;
let snapshotDir: string;

const WS = "migrate-app-model-ws";
const APPS_SCOPE = svcScope("apps");
const INSTALLS_SCOPE = svcScope("installs");

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-migrate-app-model-"));
  snapshotDir = mkdtempSync(join(tmpdir(), "gateway-migrate-snapshots-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
  rmSync(snapshotDir, { recursive: true, force: true });
});

describe("migrate-app-roots — paths[] extras → root + mount", () => {
  it("migrates [apps/tasks, shared/lib] to root + mount/fold; idempotent; snapshots first", async () => {
    const store = getFsStore();
    const appId = mintAppId();
    const now = new Date().toISOString();

    // Pre-migration multi-prefix record (bypass saveApp hydrate).
    const legacy: AppManifest = {
      appId,
      name: "tasks",
      entry: "apps/tasks/index.tsx",
      paths: ["apps/tasks", "shared/lib"],
      allowedTools: ["vfs.*"],
      createdBy: "alice",
      createdAt: now,
      updatedAt: now,
    };
    await writeSvcRecord(WS, APPS_SCOPE, appId, legacy, "alice");
    await store.write(WS, "apps/tasks/index.tsx", "export default () => 'tasks';", "text/tsx");
    await store.write(WS, "shared/lib/util.ts", "export const util = 1;\n", "text/typescript");

    const snapSub = join(snapshotDir, "roots-1");
    const first = await migrateAppRoots({
      workspaceIds: [WS],
      execute: true,
      snapshotDir: snapSub,
      actor: "test",
    });

    expect(first.snapshotPath).toBeTruthy();
    expect(existsSync(first.snapshotPath!)).toBe(true);
    const snapBody = JSON.parse(readFileSync(first.snapshotPath!, "utf8")) as {
      [ws: string]: { apps: AppManifest[] };
    };
    expect(snapBody[WS]?.apps[0]?.paths).toEqual(["apps/tasks", "shared/lib"]);

    const entries = await listSvcRecords<AppManifest>(WS, APPS_SCOPE);
    const migrated = entries.map((e) => e.value).find((m) => m.appId === appId);
    expect(migrated?.root).toBe("apps/tasks");
    expect(migrated?.paths).toEqual(["apps/tasks"]);

    const mountPrefix = mountPrefixForExtra("apps/tasks", "shared/lib");
    expect(mountPrefix).toBe("apps/tasks/shared/lib");

    const mounts = await listMounts(WS);
    const mount = mounts.find(
      (m) => m.prefix === mountPrefix || m.config["migratedFrom"] === "shared/lib",
    );
    expect(mount).toBeTruthy();
    expect(mount!.prefix.startsWith("apps/tasks/")).toBe(true);

    // Folded content readable under the app root (app-session path authz).
    const folded = await store.read(WS, "apps/tasks/shared/lib/util.ts");
    expect(folded?.content).toContain("util = 1");
    expect(
      appPathAllowed(
        { id: appId, name: "tasks", root: "apps/tasks", paths: ["apps/tasks"] },
        "apps/tasks/shared/lib/util.ts",
      ),
    ).toBe(true);

    // Original shared/lib still readable at the workspace level.
    expect((await store.read(WS, "shared/lib/util.ts"))?.content).toContain("util = 1");

    // app.yaml written at root (first-sight).
    expect(await store.read(WS, "apps/tasks/app.yaml")).toBeTruthy();

    // Idempotent re-run: no duplicate mounts, no double-writes of extras.
    const mountsBefore = (await listMounts(WS)).length;
    const second = await migrateAppRoots({
      workspaceIds: [WS],
      execute: true,
      snapshotDir: join(snapshotDir, "roots-2"),
      actor: "test",
    });
    expect(second.migrated + second.skipped).toBeGreaterThan(0);
    expect((await listMounts(WS)).length).toBe(mountsBefore);

    const remigrated = (await listSvcRecords<AppManifest>(WS, APPS_SCOPE)).map((e) => e.value);
    expect(remigrated.filter((m) => m.appId === appId)).toHaveLength(1);
  });
});

describe("migrate-installs-to-copy — dead origin flagged broken", () => {
  it("flags a dead-origin unmaterialized install broken (not dropped) and snapshots first", async () => {
    const installId = mintInstallId();
    const originAppId = mintAppId();
    const now = new Date().toISOString();

    await writeSvcRecord(
      WS,
      INSTALLS_SCOPE,
      installId,
      {
        installId,
        originAppId,
        originWorkspaceId: "ws-dead-origin",
        pin: { channel: "live" },
        resolvedRelease: "rel-gone",
        editing: false,
        prefix: "apps/ghost",
        bindings: {},
        config: {},
        installedBy: "bob",
        installedAt: now,
        updatedAt: now,
      },
      "bob",
    );

    const snapSub = join(snapshotDir, "installs-1");
    const first = await migrateInstallsToCopy({
      workspaceIds: [WS],
      execute: true,
      snapshotDir: snapSub,
      actor: "test",
    });

    expect(first.snapshotPath).toBeTruthy();
    expect(existsSync(first.snapshotPath!)).toBe(true);
    expect(readdirSync(snapSub).length).toBeGreaterThan(0);
    expect(first.broken).toBeGreaterThanOrEqual(1);

    const installs = await listSvcRecords<MigratedInstall>(WS, INSTALLS_SCOPE);
    const found = installs.map((e) => e.value).find((i) => i.installId === installId);
    expect(found).toBeTruthy();
    expect(found!.broken).toBe(true);
    expect(found!.hosting).toBe("managed");
    expect(found!.pin).toMatchObject({ commit: expect.any(String) });
    // Legacy fields dropped.
    expect((found as { editing?: unknown }).editing).toBeUndefined();
    expect((found as { prefix?: unknown }).prefix).toBeUndefined();
    expect((found as { resolvedRelease?: unknown }).resolvedRelease).toBeUndefined();

    // Not dropped — still in the list.
    expect(installs.some((e) => e.value.installId === installId)).toBe(true);

    // Idempotent: still one broken record, not duplicated.
    await migrateInstallsToCopy({
      workspaceIds: [WS],
      execute: true,
      snapshotDir: join(snapshotDir, "installs-2"),
      actor: "test",
    });
    const again = await listSvcRecords<MigratedInstall>(WS, INSTALLS_SCOPE);
    expect(again.filter((e) => e.value.installId === installId)).toHaveLength(1);
  });
});

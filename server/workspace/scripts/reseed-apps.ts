/**
 * Nuke-and-reseed app storage for a workspace: drop name-keyed scopes and
 * recreate fixture apps with minted ULIDs. No migration — pre-existing
 * name-keyed data is deleted.
 *
 *   pnpm --dir server/workspace exec tsx scripts/reseed-apps.ts [workspaceId]
 *
 * Wired into `bootstrap:local` so a fresh local stack boots on the id-keyed
 * model.
 */

import { getFsStore } from "../src/fs-store.js";
import { mintAppId } from "../src/apps/identity.js";
import { saveApp, type AppManifest } from "../src/apps/store.js";
import { getRecordStore } from "../src/records.js";
import { listSvcRecords, svcScope } from "../src/svc-records.js";

const workspaceId = process.argv[2] ?? "local";

const NAME_KEYED_SCOPES = [
  svcScope("apps"),
  svcScope("apps", "alias"),
  svcScope("apps", "installed"),
];

async function dropScope(scope: string): Promise<number> {
  const records = getRecordStore();
  const entries = await listSvcRecords(workspaceId, scope).catch(() => []);
  let dropped = 0;
  for (const entry of entries) {
    await records.delete(workspaceId, scope, entry.key);
    dropped += 1;
  }
  return dropped;
}

async function dropReleaseScopes(): Promise<number> {
  // Releases live under svc#apps#releases#<id|name>. List the apps scope's
  // sibling scopes via a best-effort scan of known keys after apps drop —
  // we also drop any leftover name-keyed release scopes discovered from FS
  // is not possible; instead drop whatever remains under apps#releases#*
  // by reading through listScopes if available.
  const records = getRecordStore();
  const scopes = await records.listScopes(workspaceId, "svc#apps#releases#").catch(() => []);
  let dropped = 0;
  for (const scope of scopes) {
    const entries = await listSvcRecords(workspaceId, scope).catch(() => []);
    for (const entry of entries) {
      await records.delete(workspaceId, scope, entry.key);
      dropped += 1;
    }
  }
  // Usage counters
  const usageScopes = await records.listScopes(workspaceId, "svc#apps#usage#").catch(() => []);
  for (const scope of usageScopes) {
    const entries = await listSvcRecords(workspaceId, scope).catch(() => []);
    for (const entry of entries) {
      await records.delete(workspaceId, scope, entry.key);
      dropped += 1;
    }
  }
  // Per-user app records app#<name|#id>#u#*
  const appScopes = await records.listScopes(workspaceId, "app#").catch(() => []);
  for (const scope of appScopes) {
    const entries = await listSvcRecords(workspaceId, scope).catch(() => []);
    for (const entry of entries) {
      await records.delete(workspaceId, scope, entry.key);
      dropped += 1;
    }
  }
  return dropped;
}

async function main(): Promise<void> {
  console.log(`reseed-apps: wiping name-keyed app state in workspace "${workspaceId}"`);
  let dropped = 0;
  for (const scope of NAME_KEYED_SCOPES) {
    dropped += await dropScope(scope);
  }
  dropped += await dropReleaseScopes();

  // Drop leftover file partitions under .apps/ (and legacy <paths>/data).
  try {
    await getFsStore().removePrefix(workspaceId, ".apps");
  } catch {
    // empty
  }

  console.log(`reseed-apps: dropped ${dropped} records`);

  // Optional fixture: a minimal demo app so local boot has something to open.
  if (process.env["RESEED_APPS_FIXTURE"] === "1") {
    const now = new Date().toISOString();
    const appId = mintAppId();
    const manifest: AppManifest = {
      appId,
      name: "demo",
      title: "Demo",
      description: "Reseeded fixture app",
      entry: "apps/demo/index.tsx",
      paths: ["apps/demo"],
      visibility: "private",
      workflows: [],
      allowedTools: ["vfs.*", "keyvalue.*"],
      createdBy: "system",
      createdAt: now,
      updatedAt: now,
    };
    await saveApp(workspaceId, manifest);
    console.log(`reseed-apps: seeded fixture app ${appId} (alias "demo")`);
  }

  console.log("reseed-apps: done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

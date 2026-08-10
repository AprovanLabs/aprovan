#!/usr/bin/env tsx
/**
 * migrate-app-records.ts — one-shot sweep that moves every workspace's
 * FS-backed `keyvalue` state into the record store (see
 * apps/workspace/src/records.ts and docs/app-data.md) and deletes the files.
 *
 * Before this, `keyvalue` lived as ordinary workspace files:
 *   - workspace calls:  .services/keyvalue/<key>
 *   - app sessions:     <app root>/data/<userSub>/<key>            (owner-hosted)
 *                        <install prefix>/data/<key>                (workspace-scoped install — no
 *                                                                     per-user folder; see caveat below)
 *   - Personal (every workspace's built-in app): .personal/data/<userSub>/<key>
 *
 * The gateway's read path (services.ts `keyvalue`) already migrates lazily,
 * per key, on next read — this script does the same thing eagerly, for every
 * key in every workspace, so nothing is left stranded on the file plane
 * waiting for a read that may never come, and `apps.data` (owner-side
 * admin visibility) has something to show immediately.
 *
 * A record-store HIT for a key is left alone (a live write already won the
 * race — this script never overwrites fresher data with a stale file).
 * Every migrated file is deleted after a successful write to the record
 * store. Dry-run by default: prints what it *would* do without touching
 * anything; pass --execute to actually write/delete.
 *
 * CAVEAT — legacy shared-install FS layout: the old FS layout stored an
 * installed app's data in one shared file per key (`<prefix>/data/<key>`,
 * no per-user folder — "the workspace is the user"), because the old
 * `keyvalue` implementation's `appDataDir` collapsed to the install prefix
 * itself for self-hosted installs. The record store's scope is always
 * `app#<name>#u#<callingUserSub>` regardless of tenancy (see
 * docs/app-data.md — only the *tenant* varies with tenancy resolution, never
 * the scope shape), so there is no way to recover which member's calls
 * produced that shared file. This script migrates it into a placeholder
 * scope keyed by the workspace id itself (`app#<name>#u#<workspaceId>`) so
 * the value isn't lost, but a fresh call from a real user afterwards will
 * land in THEIR OWN scope, not this placeholder — the old cross-member
 * sharing within one install does not carry forward. Flagged loudly in the
 * log.
 *
 * Usage (from the repo root):
 *   pnpm -C apps/workspace exec tsx scripts/migrate-app-records.ts                 # dry run (default)
 *   pnpm -C apps/workspace exec tsx scripts/migrate-app-records.ts --execute        # actually migrate
 *   pnpm -C apps/workspace exec tsx scripts/migrate-app-records.ts --workspace <id> # limit to one workspace
 *
 * Do NOT run with --execute against prd without a deliberate, reviewed pass —
 * this walks and deletes files across every workspace.
 *
 * Environment: same knobs as the workspace itself (WORKSPACE_MODE, DYNAMO_ENDPOINT,
 * S3_ENDPOINT, FS_BUCKET, FS_TABLE, RECORDS_TABLE, DYNAMODB_WORKSPACES_TABLE,
 * AWS_REGION / credentials) — point it at the same backend the gateway runs
 * against.
 */

import { parseArgs } from "node:util";

const { values: args } = parseArgs({
  options: {
    execute: { type: "boolean", default: false },
    workspace: { type: "string" },
  },
  strict: true,
});

const dryRun = !args.execute;

const { dynamo } = await import("../src/db/client.js");
const { getFsStore } = await import("../src/fs-store.js");
const { getRecordStore } = await import("../src/records.js");
const { listApps, appDataRoot } = await import("../src/apps/store.js");
const { listInstalls } = await import("../src/apps/install.js");
const { PERSONAL_APP_NAME, PERSONAL_PREFIX } = await import("../src/apps/personal.js");

const store = getFsStore();
const records = getRecordStore();

let migratedKeys = 0;
let deletedFiles = 0;
let skippedFresh = 0;

function log(message: string): void {
  console.log(`${dryRun ? "[dry-run] " : ""}${message}`);
}

/**
 * Move one legacy value into the record store (no-op if a fresher write
 * already exists there) and delete the file. Parses JSON when possible,
 * falls back to the raw string for anything that predates JSON encoding.
 */
async function migrateOne(
  workspaceId: string,
  path: string,
  scope: string,
  key: string,
): Promise<void> {
  const existing = await records.get(workspaceId, scope, key);
  if (existing) {
    skippedFresh += 1;
    log(`skip ${workspaceId}:${path} — record store already has scope=${scope} key=${key}`);
    return;
  }
  const file = await store.read(workspaceId, path);
  if (!file) return;
  let value: unknown;
  try {
    value = JSON.parse(file.content);
  } catch {
    value = file.content;
  }
  log(`migrate ${workspaceId}:${path} -> scope=${scope} key=${key}`);
  migratedKeys += 1;
  if (dryRun) return;
  await records.set(workspaceId, scope, key, value, "migrate-app-records");
  await store.remove(workspaceId, path);
  deletedFiles += 1;
}

/** Sweep every file under `<dataRoot>/<sub>/<key>` into `app#<name>#u#<sub>`. */
async function sweepPerUserDataDir(workspaceId: string, name: string, dataRoot: string): Promise<void> {
  const prefix = `${dataRoot}/`;
  const entries = await store.list(workspaceId, dataRoot).catch(() => []);
  for (const entry of entries) {
    if (!entry.path.startsWith(prefix)) continue;
    const rel = entry.path.slice(prefix.length);
    const slash = rel.indexOf("/");
    if (slash <= 0) continue; // not `<sub>/<key>` — leave anything unexpected alone
    const sub = rel.slice(0, slash);
    const key = rel.slice(slash + 1);
    if (key.includes("/")) continue; // keyvalue keys never nest; skip anything stranger
    await migrateOne(workspaceId, entry.path, `app#${name}#u#${sub}`, key);
  }
}

/**
 * Sweep an installed app's flat `<prefix>/data/<key>` files (no per-user
 * folder — see the module doc-comment's caveat) into a workspace-id-keyed
 * placeholder scope.
 */
async function sweepInstalledDataDir(workspaceId: string, name: string, dataRoot: string): Promise<void> {
  const prefix = `${dataRoot}/`;
  const entries = await store.list(workspaceId, dataRoot).catch(() => []);
  for (const entry of entries) {
    if (!entry.path.startsWith(prefix)) continue;
    const key = entry.path.slice(prefix.length);
    if (!key || key.includes("/")) continue;
    log(
      `NOTE: ${workspaceId}:${entry.path} is a workspace-scoped install's shared file — ` +
        `migrating to placeholder scope app#${name}#u#${workspaceId}. New calls will use the real ` +
        `caller's sub instead; this placeholder will not receive further writes.`,
    );
    await migrateOne(workspaceId, entry.path, `app#${name}#u#${workspaceId}`, key);
  }
}

/** Sweep `.services/keyvalue/<key>` (workspace-caller scope "ws"). */
async function sweepLegacyWorkspaceKv(workspaceId: string): Promise<void> {
  const prefix = ".services/keyvalue/";
  const entries = await store.list(workspaceId, prefix.slice(0, -1)).catch(() => []);
  for (const entry of entries) {
    if (!entry.path.startsWith(prefix)) continue;
    const key = entry.path.slice(prefix.length);
    if (!key || key.includes("/")) continue;
    await migrateOne(workspaceId, entry.path, "ws", key);
  }
}

async function migrateWorkspace(workspaceId: string): Promise<void> {
  console.log(`\n== workspace ${workspaceId} ==`);

  await sweepLegacyWorkspaceKv(workspaceId);

  // Personal is synthesized, never published — its data root is fixed.
  await sweepPerUserDataDir(workspaceId, PERSONAL_APP_NAME, `${PERSONAL_PREFIX}/data`);

  const manifests = await listApps(workspaceId).catch(() => []);
  for (const manifest of manifests) {
    await sweepPerUserDataDir(workspaceId, manifest.name, appDataRoot(manifest));
  }

  // Workspace-scoped installs: the install record names the OWNER app but
  // the data lives under this (the installer's) workspace, at the install
  // prefix — not under any manifest this workspace itself publishes.
  const installs = await listInstalls(workspaceId).catch(() => []);
  for (const install of installs) {
    await sweepInstalledDataDir(workspaceId, install.name, `${install.prefix}/data`);
  }
}

async function allWorkspaceIds(): Promise<string[]> {
  const tableName = process.env["DYNAMODB_WORKSPACES_TABLE"] ?? "Workspaces";
  const { client, ScanCommand } = await dynamo();
  const ids: string[] = [];
  let cursor: Record<string, unknown> | undefined;
  do {
    const page = await client.send(
      new ScanCommand({
        TableName: tableName,
        ProjectionExpression: "workspaceId",
        ExclusiveStartKey: cursor,
      }),
    );
    for (const item of page.Items ?? []) ids.push(String(item["workspaceId"]));
    cursor = page.LastEvaluatedKey;
  } while (cursor);
  return ids;
}

const workspaceIds = args.workspace ? [args.workspace] : await allWorkspaceIds();
console.log(
  `migrate-app-records: ${dryRun ? "DRY RUN (pass --execute to write)" : "EXECUTING"} — ` +
    `${workspaceIds.length} workspace(s)`,
);

for (const workspaceId of workspaceIds) {
  await migrateWorkspace(workspaceId);
}

console.log(
  `\ndone. keys ${dryRun ? "that would be " : ""}migrated: ${migratedKeys}, ` +
    `files deleted: ${deletedFiles}, skipped (record store already fresher): ${skippedFresh}`,
);
if (dryRun) {
  console.log("This was a dry run — nothing was written or deleted. Pass --execute to apply.");
}

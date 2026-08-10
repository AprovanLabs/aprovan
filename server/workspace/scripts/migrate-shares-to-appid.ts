#!/usr/bin/env tsx
/**
 * migrate-shares-to-appid.ts — one-shot sweep that rewrites every workspace's
 * `WorkspaceConfig.shares[].apps` entries from the app's mutable `name` (the
 * pre-D5 scheme) to its durable `appId` (see apps/store.ts `WorkspaceShare`,
 * `shareAllows`, tech-plan D5).
 *
 * `readWorkspaceConfig` already resolves name-keyed entries transparently at
 * read time (a name→appId alias lookup on every read) so nothing is broken
 * before this script runs — but that bridge is a one-release stopgap: it
 * re-resolves from the *stored* name on every read, so an entry only keeps
 * working while its stored name is still the app's current alias, and goes
 * stale again the next time the app is renamed (identical to the bug it
 * replaces). Running this script once rewrites the stored record itself, so
 * shares become rename-proof for good and the read-time lookup is no longer
 * needed for those entries.
 *
 * An entry that doesn't resolve to a live alias (name reused by an unrelated
 * app since, or the original app was deleted) is left untouched — there is
 * nothing safe to rewrite it to.
 *
 * Usage (from the repo root):
 *   pnpm -C server/workspace exec tsx scripts/migrate-shares-to-appid.ts                 # dry run (default)
 *   pnpm -C server/workspace exec tsx scripts/migrate-shares-to-appid.ts --execute        # actually rewrite
 *   pnpm -C server/workspace exec tsx scripts/migrate-shares-to-appid.ts --workspace <id> # limit to one workspace
 *
 * Do NOT run with --execute against prd without a deliberate, reviewed pass —
 * this walks and rewrites every workspace's `WorkspaceConfig` record.
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
const { isAppId, readAlias } = await import("../src/apps/identity.js");
const { readSvcRecord, svcScope, writeSvcRecord } = await import("../src/svc-records.js");

type WorkspaceShareLike = {
  prefix: string;
  apps: string[] | "*";
  mode?: "read" | "readwrite";
};
type WorkspaceConfigLike = { shares?: WorkspaceShareLike[] };

const WORKSPACE_SCOPE = svcScope("workspace");
const WORKSPACE_CONFIG_KEY = "config";

let rewrittenEntries = 0;
let rewrittenConfigs = 0;
let unresolvedEntries = 0;

function log(message: string): void {
  console.log(`${dryRun ? "[dry-run] " : ""}${message}`);
}

/** Rewrite one workspace's `WorkspaceConfig.shares[].apps` from name to appId. */
async function migrateWorkspace(workspaceId: string): Promise<void> {
  const config = await readSvcRecord<WorkspaceConfigLike>(
    workspaceId,
    WORKSPACE_SCOPE,
    WORKSPACE_CONFIG_KEY,
  ).catch(() => undefined);
  if (!config?.shares?.length) return;

  let changed = false;
  const shares = await Promise.all(
    config.shares.map(async (share) => {
      if (share.apps === "*") return share;
      const apps = await Promise.all(
        share.apps.map(async (entry) => {
          if (isAppId(entry)) return entry;
          const alias = await readAlias(workspaceId, entry);
          if (!alias?.appId) {
            unresolvedEntries += 1;
            log(
              `${workspaceId}: share "${share.prefix}" entry "${entry}" does not resolve to a ` +
                `live app alias — leaving as-is`,
            );
            return entry;
          }
          changed = true;
          rewrittenEntries += 1;
          log(
            `${workspaceId}: share "${share.prefix}" entry "${entry}" -> appId "${alias.appId}"`,
          );
          return alias.appId;
        }),
      );
      return { ...share, apps };
    }),
  );

  if (!changed) return;
  rewrittenConfigs += 1;
  if (dryRun) return;
  await writeSvcRecord(workspaceId, WORKSPACE_SCOPE, WORKSPACE_CONFIG_KEY, {
    ...config,
    shares,
  });
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
  `migrate-shares-to-appid: ${dryRun ? "DRY RUN (pass --execute to write)" : "EXECUTING"} — ` +
    `${workspaceIds.length} workspace(s)`,
);

for (const workspaceId of workspaceIds) {
  await migrateWorkspace(workspaceId);
}

console.log(
  `\ndone. share entries ${dryRun ? "that would be " : ""}rewritten: ${rewrittenEntries}, ` +
    `configs ${dryRun ? "that would be " : ""}rewritten: ${rewrittenConfigs}, ` +
    `entries left unresolved: ${unresolvedEntries}`,
);
if (dryRun) {
  console.log("This was a dry run — nothing was written. Pass --execute to apply.");
}

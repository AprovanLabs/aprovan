#!/usr/bin/env tsx
/**
 * migrate-app-roots.ts — one-shot migration of legacy `paths[]` bindings to
 * single-root + mounts (iw9-b stream 7 / app-roots).
 *
 * For every app record:
 *   1. `root = paths[0]` (or existing `root`)
 *   2. each remaining `paths[]` entry → app-scoped mount under the root via
 *      stream 5's `addMount`, plus a native fold of local content so app
 *      sessions (which skip mountRead) keep reading the extras
 *   3. write `app.yaml` at the root when absent, then `reconcileApp` (F4
 *      first-sight / bind semantics)
 *
 * Idempotent: completed migrations are no-ops. Snapshots pre-migration store
 * state before any mutate (tech-plan Rollout step 5 rollback artifact).
 *
 * Usage (from the repo root):
 *   pnpm --filter @aprovan/workspace exec tsx scripts/migrate-app-roots.ts
 *   pnpm --filter @aprovan/workspace exec tsx scripts/migrate-app-roots.ts --execute
 *   pnpm --filter @aprovan/workspace exec tsx scripts/migrate-app-roots.ts --workspace <id>
 *   pnpm --filter @aprovan/workspace exec tsx scripts/migrate-app-roots.ts --snapshot-dir <dir>
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

export type MigrateAppRootsOptions = {
  workspaceIds?: string[];
  /** When false (default), log actions without writing. */
  execute?: boolean;
  /** Directory for the pre-migration snapshot JSON (created before mutate). */
  snapshotDir?: string;
  actor?: string;
};

export type MigrateAppRootsResult = {
  workspaces: number;
  migrated: number;
  skipped: number;
  mountsAdded: number;
  yamlWritten: number;
  snapshotPath?: string;
};

const ACTOR_DEFAULT = "migrate-app-roots";

function log(dryRun: boolean, message: string): void {
  console.log(`${dryRun ? "[dry-run] " : ""}${message}`);
}

/** App-scoped mount prefix for a legacy extra path. */
export function mountPrefixForExtra(root: string, extra: string): string {
  if (extra === root || extra.startsWith(`${root}/`)) return extra;
  return `${root}/${extra}`;
}

async function allWorkspaceIds(): Promise<string[]> {
  const tableName = process.env["DYNAMODB_WORKSPACES_TABLE"] ?? "Workspaces";
  const { dynamo } = await import("../src/db/client.js");
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

type RawManifest = {
  appId: string;
  name: string;
  slug?: string;
  root?: string;
  entry?: string;
  paths?: string[];
  title?: string;
  description?: string;
  allowedTools?: string[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  declared?: Record<string, unknown>;
  [key: string]: unknown;
};

/**
 * Migrate one workspace's app records from multi-prefix `paths[]` to
 * `root` + app-scoped mounts. Safe to re-run.
 */
export async function migrateAppRoots(
  options: MigrateAppRootsOptions = {},
): Promise<MigrateAppRootsResult> {
  const dryRun = !options.execute;
  const actor = options.actor ?? ACTOR_DEFAULT;
  const { listSvcRecords, svcScope, writeSvcRecord } = await import("../src/svc-records.js");
  const { getFsStore, listAll } = await import("../src/fs-store.js");
  const { loadAppYaml } = await import("../src/apps/manifest.js");
  const { reconcileApp } = await import("../src/apps/reconcile.js");
  const storeMod = await import("../src/apps/store.js");
  const { saveApp, ENTRY_CANDIDATES } = storeMod;
  type AppManifest = storeMod.AppManifest;
  const { bindRoot } = await import("../src/apps/identity.js");
  const { addMount, listMounts } = await import("../src/vcs/mounts-procedures.js");
  const { copyArchivePaths } = await import("../src/apps/install.js");
  const { ServiceError } = await import("../src/service-kernel.js");

  const APPS_SCOPE = svcScope("apps");
  const store = getFsStore();

  let workspaceIds = options.workspaceIds;
  if (!workspaceIds || workspaceIds.length === 0) {
    workspaceIds = await allWorkspaceIds().catch(() => []);
  }

  const result: MigrateAppRootsResult = {
    workspaces: workspaceIds.length,
    migrated: 0,
    skipped: 0,
    mountsAdded: 0,
    yamlWritten: 0,
  };

  // Snapshot before any mutate.
  const snapshot: Record<string, { apps: RawManifest[] }> = {};
  for (const workspaceId of workspaceIds) {
    const entries = await listSvcRecords<RawManifest>(workspaceId, APPS_SCOPE);
    snapshot[workspaceId] = { apps: entries.map((e) => e.value) };
  }
  if (options.snapshotDir) {
    mkdirSync(options.snapshotDir, { recursive: true, mode: 0o700 });
    const snapshotPath = join(options.snapshotDir, `app-roots-${Date.now()}.json`);
    writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2), "utf8");
    result.snapshotPath = snapshotPath;
    log(dryRun, `snapshot written: ${snapshotPath}`);
  }

  for (const workspaceId of workspaceIds) {
    const entries = await listSvcRecords<RawManifest>(workspaceId, APPS_SCOPE);
    for (const entry of entries) {
      const raw = entry.value;
      if (!raw?.appId) continue;

      const paths = Array.isArray(raw.paths) ? raw.paths.filter((p) => typeof p === "string" && p) : [];
      const root = (typeof raw.root === "string" && raw.root) || paths[0];
      if (!root) {
        log(dryRun, `${workspaceId}/${raw.appId}: no root or paths — skip`);
        result.skipped += 1;
        continue;
      }

      const extras = paths.filter((p) => p !== root);
      const alreadyRootOnly =
        raw.root === root && extras.length === 0 && paths.length <= 1;
      const yamlPath = `${root}/app.yaml`;
      const existingYaml = await store.read(workspaceId, yamlPath).catch(() => undefined);

      // Idempotent fast-path: root set, no extras, yaml present, root bound via prior reconcile.
      if (alreadyRootOnly && existingYaml) {
        const mounts = await listMounts(workspaceId).catch(() => []);
        // Still ensure any historically-named extras under root have mounts? no-op.
        void mounts;
        result.skipped += 1;
        continue;
      }

      log(
        dryRun,
        `${workspaceId}/${raw.name ?? raw.appId}: root=${root}` +
          (extras.length ? ` extras=[${extras.join(", ")}]` : ""),
      );

      if (!dryRun) {
        // Fold extras under the root + register app-scoped mounts.
        for (const extra of extras) {
          const mountPrefix = mountPrefixForExtra(root, extra);
          const mounts = await listMounts(workspaceId).catch(() => []);
          const alreadyMounted = mounts.some(
            (m) =>
              m.prefix === mountPrefix ||
              (m.config["migratedFrom"] === extra && m.prefix.startsWith(`${root}/`)),
          );

          if (!alreadyMounted) {
            // Prefer an empty mount destination so addMount accepts it; then
            // fold native content so app sessions (skip mountRead) still read.
            const native = await listAll(store, workspaceId, mountPrefix).catch(() => []);
            if (native.length === 0) {
              try {
                await addMount(workspaceId, actor, {
                  prefix: mountPrefix,
                  type: "s3",
                  config: {
                    bucket: process.env["FS_BUCKET"] ?? "aprovan-migration-local",
                    prefix: extra,
                    workspacePath: extra,
                    migratedFrom: extra,
                  },
                });
                result.mountsAdded += 1;
                log(dryRun, `  mount ${mountPrefix} ← ${extra}`);
              } catch (err) {
                if (err instanceof ServiceError && (err.status === 409 || err.status === 400)) {
                  log(dryRun, `  mount ${mountPrefix} skipped: ${err.message}`);
                } else {
                  throw err;
                }
              }
            } else {
              log(
                dryRun,
                `  mount ${mountPrefix} skipped — native files present; folding content only`,
              );
            }
          }

          // Native fold: copy local extra bytes under the app root.
          const sourceEntries = await listAll(store, workspaceId, extra).catch(() => []);
          if (sourceEntries.length > 0) {
            await copyArchivePaths(workspaceId, workspaceId, [extra], mountPrefix);
            log(dryRun, `  folded ${extra} → ${mountPrefix}`);
          }
        }

        const now = new Date().toISOString();
        const next: AppManifest = {
          ...(raw as unknown as AppManifest),
          appId: raw.appId as AppManifest["appId"],
          name: raw.name,
          slug: raw.slug ?? raw.name,
          root,
          entry: raw.entry || `${root}/${ENTRY_CANDIDATES[0]}`,
          paths: [root],
          allowedTools: raw.allowedTools ?? [],
          createdBy: raw.createdBy ?? actor,
          createdAt: raw.createdAt ?? now,
          updatedAt: now,
        };
        await saveApp(workspaceId, next);
        await bindRoot(workspaceId, root, raw.appId);

        // app.yaml first-sight via reconcileApp when absent.
        let yamlContent = existingYaml?.content;
        if (!yamlContent) {
          const title = raw.title ?? raw.name;
          yamlContent = [`title: ${JSON.stringify(title)}`, ""].join("\n");
          await store.write(workspaceId, yamlPath, yamlContent, "text/yaml");
          result.yamlWritten += 1;
          log(dryRun, `  wrote ${yamlPath}`);
        }

        const loaded = loadAppYaml(yamlContent);
        if (loaded.ok) {
          await reconcileApp({
            workspaceId,
            root,
            yaml: loaded.value,
            expectedAppId: raw.appId,
            actor,
          });
        } else {
          log(
            dryRun,
            `  reconcile skipped — app.yaml issues: ${loaded.issues.map((i) => i.message).join("; ")}`,
          );
          // Still persist a raw write so root sticks even when yaml is bad.
          await writeSvcRecord(workspaceId, APPS_SCOPE, raw.appId, {
            ...next,
            reconcile: { status: "error", issues: loaded.issues },
          });
        }
      } else {
        // Dry-run accounting for mounts/yaml.
        for (const extra of extras) {
          const mountPrefix = mountPrefixForExtra(root, extra);
          const mounts = await listMounts(workspaceId).catch(() => []);
          if (!mounts.some((m) => m.prefix === mountPrefix)) result.mountsAdded += 1;
          log(dryRun, `  would mount/fold ${extra} → ${mountPrefix}`);
        }
        if (!existingYaml) result.yamlWritten += 1;
      }

      result.migrated += 1;
    }
  }

  return result;
}

async function main(): Promise<void> {
  const { values: args } = parseArgs({
    options: {
      execute: { type: "boolean", default: false },
      workspace: { type: "string" },
      "snapshot-dir": { type: "string" },
    },
    strict: true,
  });

  const result = await migrateAppRoots({
    execute: Boolean(args.execute),
    workspaceIds: args.workspace ? [args.workspace] : undefined,
    snapshotDir: args["snapshot-dir"],
  });

  console.log(
    `\ndone. migrated=${result.migrated} skipped=${result.skipped} ` +
      `mounts=${result.mountsAdded} yamlWritten=${result.yamlWritten}` +
      (result.snapshotPath ? ` snapshot=${result.snapshotPath}` : ""),
  );
  if (!args.execute) {
    console.log("This was a dry run — nothing was written. Pass --execute to apply.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}

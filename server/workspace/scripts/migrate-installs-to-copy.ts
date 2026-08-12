#!/usr/bin/env tsx
/**
 * migrate-installs-to-copy.ts — one-shot migration of legacy serve-from-origin
 * installs to copy semantics (iw9-b stream 7 / app-install-lifecycle).
 *
 * For every install record:
 *   1. materialize a copy of the resolved release into `apps/<slug>` via
 *      `copyArchivePaths` / `materializeFork` (stream 3 helpers — do not
 *      re-copy the loop)
 *   2. set `pin` from `resolvedRelease` → `{tag?, commit}`
 *   3. set `hosting: "managed"` (F2 TD4 default-absent-reads-as-managed)
 *   4. drop `editing` / `prefix` / `resolvedRelease`
 *
 * Dead-origin installs that never materialized are flagged `broken: true`
 * and kept in the install list (not dropped).
 *
 * Idempotent with a pre-migration snapshot.
 *
 * Usage (from the repo root):
 *   pnpm --filter @aprovan/workspace exec tsx scripts/migrate-installs-to-copy.ts
 *   pnpm --filter @aprovan/workspace exec tsx scripts/migrate-installs-to-copy.ts --execute
 *   pnpm --filter @aprovan/workspace exec tsx scripts/migrate-installs-to-copy.ts --workspace <id>
 *   pnpm --filter @aprovan/workspace exec tsx scripts/migrate-installs-to-copy.ts --snapshot-dir <dir>
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

export type MigrateInstallsOptions = {
  workspaceIds?: string[];
  execute?: boolean;
  snapshotDir?: string;
  actor?: string;
};

export type MigrateInstallsResult = {
  workspaces: number;
  migrated: number;
  skipped: number;
  broken: number;
  snapshotPath?: string;
};

/** Extended install shape written by this migration (stream-owned flag). */
export type MigratedInstall = {
  installId: string;
  originAppId: string;
  originWorkspaceId: string;
  pin: { tag?: string; commit: string };
  hosting: "managed" | "hosted";
  hostingWorkspaceId?: string;
  root?: string;
  manifest?: unknown;
  contentFingerprint?: string;
  bindings: Record<string, string>;
  config: Record<string, unknown>;
  installedBy: string;
  installedAt: string;
  updatedAt: string;
  /** Set when origin is gone and the install never materialized. */
  broken?: boolean;
  brokenReason?: string;
  // Legacy fields intentionally omitted on write: editing, prefix, resolvedRelease.
};

const ACTOR_DEFAULT = "migrate-installs-to-copy";

function log(dryRun: boolean, message: string): void {
  console.log(`${dryRun ? "[dry-run] " : ""}${message}`);
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

type RawInstall = {
  installId: string;
  originAppId: string;
  originWorkspaceId: string;
  pin?: unknown;
  hosting?: "managed" | "hosted";
  hostingWorkspaceId?: string;
  root?: string;
  prefix?: string;
  editing?: boolean;
  resolvedRelease?: string | null;
  manifest?: unknown;
  contentFingerprint?: string;
  bindings?: Record<string, string>;
  config?: Record<string, unknown>;
  installedBy?: string;
  installedAt?: string;
  updatedAt?: string;
  broken?: boolean;
  brokenReason?: string;
  name?: string;
  [key: string]: unknown;
};

function isCommitPin(pin: unknown): pin is { commit: string; tag?: string } {
  return (
    typeof pin === "object" &&
    pin !== null &&
    "commit" in pin &&
    typeof (pin as { commit: unknown }).commit === "string" &&
    Boolean((pin as { commit: string }).commit)
  );
}

function slugFromInstall(install: RawInstall, originName?: string): string {
  if (install.root?.startsWith("apps/")) {
    return install.root.slice("apps/".length).split("/")[0] || "app";
  }
  if (install.prefix?.startsWith("apps/")) {
    return install.prefix.slice("apps/".length).split("/")[0] || "app";
  }
  if (typeof install.name === "string" && install.name) return install.name;
  if (originName) return originName;
  return install.originAppId.slice(0, 8).toLowerCase();
}

/**
 * Migrate install records in the given workspaces to copy semantics.
 */
export async function migrateInstallsToCopy(
  options: MigrateInstallsOptions = {},
): Promise<MigrateInstallsResult> {
  const dryRun = !options.execute;
  const actor = options.actor ?? ACTOR_DEFAULT;
  const { listSvcRecords, svcScope, writeSvcRecord } = await import("../src/svc-records.js");
  const { getFsStore, listAll } = await import("../src/fs-store.js");
  const { readApp } = await import("../src/apps/store.js");
  const installMod = await import("../src/apps/install.js");
  const {
    copyArchivePaths,
    materializeFork,
    fingerprintRoot,
    remapManifestToRoot,
    resolvePinRelease,
    resolveCommitPin,
    isCommitPin: installIsCommitPin,
  } = installMod;
  type AppInstallation = installMod.AppInstallation;
  type CommitPin = installMod.CommitPin;
  const { resolveRelease } = await import("../src/apps/release-tags.js");

  const INSTALLS_SCOPE = svcScope("installs");
  const store = getFsStore();

  let workspaceIds = options.workspaceIds;
  if (!workspaceIds || workspaceIds.length === 0) {
    workspaceIds = await allWorkspaceIds().catch(() => []);
  }

  const result: MigrateInstallsResult = {
    workspaces: workspaceIds.length,
    migrated: 0,
    skipped: 0,
    broken: 0,
  };

  // Snapshot before mutate.
  const snapshot: Record<string, { installs: RawInstall[] }> = {};
  for (const workspaceId of workspaceIds) {
    const entries = await listSvcRecords<RawInstall>(workspaceId, INSTALLS_SCOPE);
    snapshot[workspaceId] = { installs: entries.map((e) => e.value) };
  }
  if (options.snapshotDir) {
    mkdirSync(options.snapshotDir, { recursive: true, mode: 0o700 });
    const snapshotPath = join(options.snapshotDir, `installs-${Date.now()}.json`);
    writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2), "utf8");
    result.snapshotPath = snapshotPath;
    log(dryRun, `snapshot written: ${snapshotPath}`);
  }

  for (const workspaceId of workspaceIds) {
    const entries = await listSvcRecords<RawInstall>(workspaceId, INSTALLS_SCOPE);
    for (const entry of entries) {
      const raw = entry.value;
      if (!raw?.installId) continue;

      // Idempotent: already a copy-model install (commit pin + root + no legacy fields).
      const hasLegacy =
        raw.editing !== undefined ||
        raw.prefix !== undefined ||
        raw.resolvedRelease !== undefined;
      if (
        !hasLegacy &&
        isCommitPin(raw.pin) &&
        raw.root &&
        (raw.hosting === "managed" || raw.hosting === "hosted") &&
        !raw.broken
      ) {
        result.skipped += 1;
        continue;
      }
      if (raw.broken && !hasLegacy && isCommitPin(raw.pin)) {
        result.skipped += 1;
        continue;
      }

      const origin = await readApp(raw.originWorkspaceId, raw.originAppId).catch(() => undefined);
      const existingRoot = raw.root ?? raw.prefix;
      const localEntries = existingRoot
        ? await listAll(store, workspaceId, existingRoot).catch(() => [])
        : [];
      const hasMaterialized = localEntries.length > 0;

      if (!origin && !hasMaterialized) {
        log(
          dryRun,
          `${workspaceId}/${raw.installId}: origin gone and never materialized — flag broken`,
        );
        result.broken += 1;
        if (!dryRun) {
          const pin: CommitPin = isCommitPin(raw.pin)
            ? raw.pin
            : {
                commit:
                  (typeof raw.resolvedRelease === "string" && raw.resolvedRelease) ||
                  "broken-unmaterialized",
                ...(typeof raw.resolvedRelease === "string" && raw.resolvedRelease
                  ? { tag: raw.resolvedRelease }
                  : {}),
              };
          const flagged: MigratedInstall = {
            installId: raw.installId,
            originAppId: raw.originAppId,
            originWorkspaceId: raw.originWorkspaceId,
            pin,
            hosting: raw.hosting ?? "managed",
            ...(raw.hostingWorkspaceId ? { hostingWorkspaceId: raw.hostingWorkspaceId } : {}),
            bindings: raw.bindings ?? {},
            config: raw.config ?? {},
            installedBy: raw.installedBy ?? actor,
            installedAt: raw.installedAt ?? new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            broken: true,
            brokenReason: "origin unavailable and install was never materialized",
          };
          await writeSvcRecord(workspaceId, INSTALLS_SCOPE, raw.installId, flagged, actor);
        }
        result.migrated += 1;
        continue;
      }

      const slug = slugFromInstall(raw, origin?.name);
      const destRoot = existingRoot && hasMaterialized ? existingRoot : `apps/${slug}`;

      log(
        dryRun,
        `${workspaceId}/${raw.installId}: materialize → ${destRoot}` +
          (origin ? "" : " (origin missing; keeping local copy)"),
      );

      if (!dryRun) {
        let pin: CommitPin;
        if (isCommitPin(raw.pin) || (raw.pin && installIsCommitPin(raw.pin as AppInstallation["pin"]))) {
          pin = raw.pin as CommitPin;
        } else if (origin) {
          try {
            pin = await resolveCommitPin(
              raw.originWorkspaceId,
              origin,
              raw.pin
                ? (raw.pin as AppInstallation["pin"])
                : raw.resolvedRelease
                  ? { release: raw.resolvedRelease }
                  : undefined,
            );
          } catch {
            pin = {
              commit:
                (typeof raw.resolvedRelease === "string" && raw.resolvedRelease) ||
                `migrated-${raw.installId}`,
              ...(typeof raw.resolvedRelease === "string" && raw.resolvedRelease
                ? { tag: raw.resolvedRelease }
                : {}),
            };
          }
        } else {
          pin = {
            commit:
              (typeof raw.resolvedRelease === "string" && raw.resolvedRelease) ||
              `migrated-${raw.installId}`,
            ...(typeof raw.resolvedRelease === "string" && raw.resolvedRelease
              ? { tag: raw.resolvedRelease }
              : {}),
          };
        }

        if (origin && !hasMaterialized) {
          const release =
            (typeof raw.resolvedRelease === "string" && raw.resolvedRelease
              ? await resolveRelease(raw.originWorkspaceId, origin.appId, raw.resolvedRelease).catch(
                  () => undefined,
                )
              : undefined) ??
            (await resolvePinRelease(
              raw.originWorkspaceId,
              origin,
              raw.pin && !isCommitPin(raw.pin)
                ? (raw.pin as AppInstallation["pin"])
                : pin.tag
                  ? { release: pin.tag }
                  : { channel: "live" },
            ).catch(() => undefined));

          if (release) {
            await materializeFork(workspaceId, raw.originWorkspaceId, release, destRoot);
          } else {
            const originPaths =
              origin.paths?.length > 0
                ? origin.paths
                : origin.root
                  ? [origin.root]
                  : [`apps/${origin.name}`];
            await copyArchivePaths(workspaceId, raw.originWorkspaceId, originPaths, destRoot);
          }
        }

        const serving = origin
          ? remapManifestToRoot(origin, destRoot, raw.originAppId)
          : (raw.manifest as AppInstallation["manifest"]);
        const fingerprint = await fingerprintRoot(workspaceId, destRoot).catch(() => undefined);

        const next: MigratedInstall = {
          installId: raw.installId,
          originAppId: raw.originAppId,
          originWorkspaceId: raw.originWorkspaceId,
          pin,
          hosting: raw.hosting ?? "managed",
          ...(raw.hostingWorkspaceId ? { hostingWorkspaceId: raw.hostingWorkspaceId } : {}),
          root: destRoot,
          ...(serving ? { manifest: serving } : {}),
          ...(fingerprint ? { contentFingerprint: fingerprint } : {}),
          bindings: raw.bindings ?? {},
          config: raw.config ?? {},
          installedBy: raw.installedBy ?? actor,
          installedAt: raw.installedAt ?? new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await writeSvcRecord(workspaceId, INSTALLS_SCOPE, raw.installId, next, actor);
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

  const result = await migrateInstallsToCopy({
    execute: Boolean(args.execute),
    workspaceIds: args.workspace ? [args.workspace] : undefined,
    snapshotDir: args["snapshot-dir"],
  });

  console.log(
    `\ndone. migrated=${result.migrated} skipped=${result.skipped} broken=${result.broken}` +
      (result.snapshotPath ? ` snapshot=${result.snapshotPath}` : ""),
  );
  if (!args.execute) {
    console.log("This was a dry run — nothing was written. Pass --execute to apply.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}

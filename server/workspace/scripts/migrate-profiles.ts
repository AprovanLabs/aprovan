/**
 * Migrate workspace configuration into the unified profile store:
 *   1. Mint one provider profile per labelled credential
 *   2. Convert `.services/bindings.json` entries to namespace-keyed profiles
 *   3. Convert VFS mount records to path-keyed profiles
 *   4. Report workspaces where two credentials share a label (must be resolved)
 *
 * Dry-run against the reference snapshot:
 *   WORKSPACE_DATA_DIR=~/aprovan-snapshots/workspace-2026-08-03 \
 *     npx tsx scripts/migrate-profiles.ts --dry-run
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getCredentialStore } from "../src/credentials.js";
import { getFsStore } from "../src/fs-store.js";
import { getRegistryStorage, resetRegistryStorage } from "../src/registry-storage.js";
import { setProfile } from "../src/profiles/store.js";
import { readMounts } from "../src/vcs/mounts.js";
import { listWorkspaces } from "../src/workspaces.js";

const BINDINGS_PATH = ".services/bindings.json";
const dryRun = process.argv.includes("--dry-run");

interface BindingFile {
  bindings?: Record<
    string,
    {
      interface?: string;
      provider: string;
      credentialId?: string;
      options?: Record<string, unknown>;
    }
  >;
}

interface Report {
  workspaceId: string;
  labelledCredentials: number;
  bindingsConverted: number;
  mountsConverted: number;
  duplicateLabels: Array<{ provider: string; label: string; count: number }>;
  errors: string[];
}

async function migrateWorkspace(workspaceId: string): Promise<Report> {
  const report: Report = {
    workspaceId,
    labelledCredentials: 0,
    bindingsConverted: 0,
    mountsConverted: 0,
    duplicateLabels: [],
    errors: [],
  };

  const storage = await getRegistryStorage();
  await storage.tenants.ensure(workspaceId);

  // 3.1 — one profile per labelled credential
  const credentials = await getCredentialStore().list(workspaceId);
  const byProviderLabel = new Map<string, string[]>();
  for (const cred of credentials) {
    if (!cred.label) continue;
    const key = `${cred.provider}\0${cred.label}`;
    const ids = byProviderLabel.get(key) ?? [];
    ids.push(cred.id);
    byProviderLabel.set(key, ids);
  }
  for (const [key, ids] of byProviderLabel) {
    const [provider, label] = key.split("\0") as [string, string];
    if (ids.length > 1) {
      report.duplicateLabels.push({ provider, label, count: ids.length });
      report.errors.push(
        `${ids.length} ${provider} credentials share label ${JSON.stringify(label)} — resolve before removing label lookup`,
      );
      continue;
    }
    const credentialId = ids[0]!;
    if (!dryRun) {
      await setProfile(workspaceId, {
        namespace: provider,
        name: label,
        provider,
        credential: credentialId,
        createdBy: "migrate-profiles",
      });
    }
    report.labelledCredentials += 1;
  }

  // 3.2 — bindings.json → namespace profiles
  const bindingsFile = await getFsStore().read(workspaceId, BINDINGS_PATH).catch(() => undefined);
  if (bindingsFile) {
    let parsed: BindingFile = {};
    try {
      parsed = JSON.parse(bindingsFile.content) as BindingFile;
    } catch {
      report.errors.push(`unreadable ${BINDINGS_PATH}`);
    }
    for (const [instance, binding] of Object.entries(parsed.bindings ?? {})) {
      const sep = instance.indexOf(":");
      const namespace = sep === -1 ? (binding.interface ?? instance) : instance.slice(0, sep);
      const name = sep === -1 ? undefined : instance.slice(sep + 1);
      if (!dryRun) {
        await setProfile(workspaceId, {
          namespace,
          name,
          provider: binding.provider,
          credential: binding.credentialId,
          options: binding.options,
          createdBy: "migrate-profiles",
        });
      }
      report.bindingsConverted += 1;
    }
    if (!dryRun && report.bindingsConverted > 0) {
      await getFsStore().remove(workspaceId, BINDINGS_PATH).catch(() => undefined);
    }
  }

  // 3.3 — mounts → path-keyed profiles
  const mounts = await readMounts(workspaceId).catch(() => []);
  for (const mount of mounts) {
    if (!dryRun) {
      await setProfile(workspaceId, {
        path: mount.prefix,
        provider: mount.type,
        options: {
          type: mount.type,
          mode: mount.mode,
          config: mount.config,
          createdBy: mount.createdBy,
          createdAt: mount.createdAt,
        },
        createdBy: "migrate-profiles",
      });
    }
    report.mountsConverted += 1;
  }

  return report;
}

async function main(): Promise<void> {
  const workspaces = await listWorkspaces();
  const reports: Report[] = [];
  for (const ws of workspaces) {
    reports.push(await migrateWorkspace(ws.workspaceId));
  }

  const outDir = join(process.cwd(), ".migrate-profiles");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `report-${Date.now()}.json`);
  writeFileSync(outPath, JSON.stringify({ dryRun, reports }, null, 2));
  console.log(JSON.stringify({ dryRun, reportPath: outPath, reports }, null, 2));

  const blockers = reports.filter((r) => r.duplicateLabels.length > 0);
  if (blockers.length > 0) {
    console.error(
      `\n${blockers.length} workspace(s) have duplicate credential labels — resolve before stream 8.`,
    );
    process.exitCode = 2;
  }

  await resetRegistryStorage();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

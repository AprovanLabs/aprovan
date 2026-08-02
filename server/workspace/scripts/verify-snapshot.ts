/**
 * Verify a snapshot mirror by booting on it (specs/storage-cutover,
 * "Snapshot verification by local boot"):
 *
 *   pnpm --filter @aprovan/workspace exec tsx scripts/verify-snapshot.ts --data <dir>
 *
 * Boots the workspace app with WORKSPACE_MODE=local pointed at the mirror
 * (WORKSPACE_DATA_DIR) and asserts a smoke set: health endpoint, file
 * listing count matches the mirror's distinct latest paths, a known file
 * reads back with its recorded hash, and records are readable. Non-zero
 * exit on any failure — cutover SHALL NOT proceed until this passes (the
 * mirror is the rollback of last resort).
 */

import { createRequire } from "node:module";
import { join } from "node:path";

const loadSqlite = (): typeof import("better-sqlite3") => {
  const req = typeof require === "function" ? require : createRequire(import.meta.url);
  return req("better-sqlite3");
};

export interface VerifyResult {
  ok: boolean;
  checks: Array<{ name: string; ok: boolean; detail?: string }>;
}

export async function verifySnapshot(dataDir: string): Promise<VerifyResult> {
  const checks: VerifyResult["checks"] = [];
  const check = (name: string, ok: boolean, detail?: string): void => {
    checks.push({ name, ok, ...(detail ? { detail } : {}) });
  };

  // Point the whole store layer at the mirror before anything memoizes.
  process.env["WORKSPACE_MODE"] = "local";
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"];
  const [{ resetWorkspaceConfig }, fsModule, recordsModule, identityModule] = await Promise.all([
    import("../src/runtime/config.js"),
    import("../src/fs-store.js"),
    import("../src/records.js"),
    import("../src/identity/store.js"),
  ]);
  resetWorkspaceConfig();
  fsModule.resetFsStore();
  recordsModule.resetRecordStore();
  identityModule.resetIdentityStore();

  // Ground truth straight from the mirror file.
  const SqliteDatabase = loadSqlite();
  const mirror = new SqliteDatabase(join(dataDir, "workspace.db"), { readonly: true });
  const expected = mirror
    .prepare(
      `SELECT workspace_id, COUNT(DISTINCT path) AS paths FROM fs_files GROUP BY workspace_id`,
    )
    .all() as Array<{ workspace_id: string; paths: number }>;
  const knownFile = mirror
    .prepare(`SELECT workspace_id, path, hash FROM fs_files LIMIT 1`)
    .get() as { workspace_id: string; path: string; hash: string } | undefined;
  const recordCount = (
    mirror.prepare(`SELECT COUNT(*) AS n FROM records`).get() as { n: number }
  ).n;
  const knownRecord = mirror
    .prepare(`SELECT tenant, scope, key FROM records LIMIT 1`)
    .get() as { tenant: string; scope: string; key: string } | undefined;
  mirror.close();

  // 1. Boot + health.
  const { createApp } = await import("../src/app.js");
  const app = createApp();
  const health = await app.request("/health");
  check("health endpoint", health.ok, `status ${health.status}`);

  // 2. Listing counts per workspace match the mirror.
  const store = fsModule.getFsStore();
  for (const row of expected) {
    const listed = await fsModule.listAll(store, row.workspace_id);
    check(
      `listing count (${row.workspace_id})`,
      listed.length === row.paths,
      `${listed.length} listed vs ${row.paths} mirrored`,
    );
  }

  // 3. A known file reads back with its recorded hash.
  if (knownFile) {
    const file = await store.read(knownFile.workspace_id, knownFile.path);
    check(
      `known file reads back (${knownFile.path})`,
      file !== undefined && file.hash === knownFile.hash,
      file ? `hash ${file.hash}` : "missing",
    );
  } else {
    check("known file reads back", true, "mirror holds no files");
  }

  // 4. Records are readable.
  if (knownRecord) {
    const hit = await recordsModule
      .getRecordStore()
      .get(knownRecord.tenant, knownRecord.scope, knownRecord.key);
    check(
      `known record reads back (${knownRecord.scope}/${knownRecord.key})`,
      hit !== undefined,
    );
  } else {
    check("known record reads back", recordCount === 0, `${recordCount} records`);
  }

  return { ok: checks.every((c) => c.ok), checks };
}

const invokedDirectly =
  process.argv[1]?.endsWith("verify-snapshot.ts") ||
  process.argv[1]?.endsWith("verify-snapshot.js");
if (invokedDirectly) {
  const dataIndex = process.argv.indexOf("--data");
  const dataDir = dataIndex >= 0 ? process.argv[dataIndex + 1] : undefined;
  if (!dataDir) {
    console.error("Usage: verify-snapshot.ts --data <dir>");
    process.exit(2);
  }
  verifySnapshot(dataDir)
    .then((result) => {
      for (const check of result.checks) {
        console.log(`  [${check.ok ? "PASS" : "FAIL"}] ${check.name}${check.detail ? ` — ${check.detail}` : ""}`);
      }
      if (!result.ok) {
        console.error("Snapshot verification FAILED — do not proceed with the cutover.");
        process.exit(1);
      }
      console.log("Snapshot verification passed.");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

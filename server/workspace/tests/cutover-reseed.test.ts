/**
 * Stream 9 — nuke-and-reseed into DSQL (specs/storage-cutover): chunked,
 * idempotent, sentinel `created_by`, >900-byte-path pre-scan. Gated on
 * `WORKSPACE_TEST_DSQL_URL` (a dev DSQL cluster or a Postgres dialect rig),
 * per the conformance-suite pattern.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const DSQL_URL = process.env["WORKSPACE_TEST_DSQL_URL"];

const loadSqlite = (): typeof import("better-sqlite3") => {
  const req = typeof require === "function" ? require : createRequire(import.meta.url);
  return req("better-sqlite3");
};

/** Build a snapshot-shaped mirror without needing Dynamo. */
function buildMirror(dir: string, options: { longPath?: boolean } = {}): void {
  const Database = loadSqlite();
  const db = new Database(join(dir, "workspace.db"));
  db.exec(`
    CREATE TABLE IF NOT EXISTS fs_files (
      workspace_id TEXT NOT NULL, path TEXT NOT NULL, hash TEXT NOT NULL,
      content TEXT NOT NULL, mime_type TEXT NOT NULL, size INTEGER NOT NULL,
      updated_at TEXT NOT NULL, PRIMARY KEY (workspace_id, path, hash)
    );
    CREATE TABLE IF NOT EXISTS records (
      tenant TEXT NOT NULL, scope TEXT NOT NULL, key TEXT NOT NULL,
      value TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL,
      expires_at INTEGER, PRIMARY KEY (tenant, scope, key)
    );
    CREATE TABLE IF NOT EXISTS credentials (
      id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL, provider TEXT NOT NULL,
      label TEXT, type TEXT NOT NULL, payload TEXT NOT NULL, created_by TEXT,
      created_at TEXT NOT NULL, updated_at TEXT NOT NULL
    );
  `);
  const now = new Date().toISOString();
  const putFile = db.prepare(
    `INSERT OR REPLACE INTO fs_files VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );
  putFile.run("ws-seed", "widgets/a.ts", "hash-a", "content a", "text/typescript", 9, now);
  putFile.run("ws-seed", "README.md", "hash-r", "# readme", "text/markdown", 8, now);
  if (options.longPath) {
    putFile.run("ws-seed", `deep/${"x".repeat(920)}`, "hash-long", "x", "text/plain", 1, now);
  }
  db.prepare(`INSERT OR REPLACE INTO records VALUES (?, ?, ?, ?, ?, ?, ?)`).run(
    "ws-seed",
    "svc#workflows",
    "daily",
    JSON.stringify({ name: "daily" }),
    now,
    "system",
    null,
  );
  db.prepare(`INSERT OR REPLACE INTO credentials VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    "cred-1",
    "ws-seed",
    "github",
    "work",
    "bearer_token",
    "ciphertext-as-stored",
    null, // pre-created_by row → sentinel owner on reseed
    now,
    now,
  );
  db.close();
}

async function seedMirrorIdentity(dir: string): Promise<void> {
  const { createIdentityStoreSql, createSqliteIdentityClient } = await import(
    "../src/identity/sql.js"
  );
  const identity = createIdentityStoreSql(createSqliteIdentityClient(dir));
  await identity.workspaces.put({ workspaceId: "ws-seed", name: "Seeded" });
  await identity.users.upsert({ sub: "alice", email: "a@example.com" });
  await identity.memberships.put({ workspaceId: "ws-seed", userId: "alice", role: "admin" });
  const group = await identity.groups.create("ws-seed", "eng");
  await identity.groups.members.add("ws-seed", group.groupId, "alice");
  await identity.permissions.grant("ws-seed", {
    callerId: "alice",
    provider: "github",
    operation: "issues.create",
    grantedBy: "admin",
  });
}

describe.skipIf(!DSQL_URL)("nuke-and-reseed into DSQL", () => {
  let mirrorDir: string;

  beforeAll(async () => {
    mirrorDir = mkdtempSync(join(tmpdir(), "cutover-reseed-"));
    process.env["DSQL_URL"] = DSQL_URL!;
    process.env["WORKSPACE_DATA_DIR"] = mirrorDir;
    const { resetDsqlPool } = await import("../src/db/dsql.js");
    await resetDsqlPool();
    buildMirror(mirrorDir);
    await seedMirrorIdentity(mirrorDir);
  });

  afterAll(async () => {
    delete process.env["DSQL_URL"];
    delete process.env["WORKSPACE_DATA_DIR"];
    const { resetDsqlPool } = await import("../src/db/dsql.js");
    await resetDsqlPool();
    rmSync(mirrorDir, { recursive: true, force: true });
  });

  it("reseeds fs metadata, records, credentials (sentinel owner), identity — idempotently", async () => {
    const { reseedDsql, RESEED_SENTINEL_OWNER } = await import("../scripts/reseed-dsql.js");
    const counts = await reseedDsql(mirrorDir);
    expect(counts.fsLatest).toBe(2);
    expect(counts.records).toBe(1);
    expect(counts.credentials).toBe(1);
    expect(counts.users).toBe(1);
    expect(counts.workspaces).toBe(1);
    expect(counts.memberships).toBe(1);
    expect(counts.groups).toBe(1);
    expect(counts.groupMembers).toBe(1);
    expect(counts.groupToolGrants).toBe(1);
    expect(counts.permissions).toBe(1);

    // Idempotent: a second run converges to the same state.
    const again = await reseedDsql(mirrorDir);
    expect(again.fsLatest).toBe(2);

    const { dsqlQuery, dsqlRegistryPool } = await import("../src/db/dsql.js");
    const latest = await dsqlQuery(
      `SELECT path, hash FROM fs_latest WHERE workspace_id = $1 ORDER BY path`,
      ["ws-seed"],
    );
    expect(latest.rows).toEqual([
      { path: "README.md", hash: "hash-r" },
      { path: "widgets/a.ts", hash: "hash-a" },
    ]);

    const record = await dsqlQuery(
      `SELECT value FROM records WHERE tenant = $1 AND scope = $2 AND key = $3`,
      ["ws-seed", "svc#workflows", "daily"],
    );
    expect(JSON.parse(String(record.rows[0]?.["value"]))).toEqual({ name: "daily" });

    // The credential landed in the registry-server schema with the sentinel
    // owner, ciphertext untouched — and exactly once despite two runs.
    const registry = await dsqlRegistryPool();
    const creds = await registry.query(
      `SELECT id, payload, created_by FROM credentials WHERE tenant_id = $1`,
      ["ws-seed"],
    );
    expect(creds.rows).toEqual([
      { id: "cred-1", payload: "ciphertext-as-stored", created_by: RESEED_SENTINEL_OWNER },
    ]);

    // Identity flows resolve on the reseeded cluster.
    const { createDsqlIdentityClient, createIdentityStoreSql } = await import(
      "../src/identity/sql.js"
    );
    const identity = createIdentityStoreSql(createDsqlIdentityClient());
    expect((await identity.memberships.get("ws-seed", "alice"))?.role).toBe("admin");
    expect(
      await identity.permissions.check("ws-seed", "alice", "github", "issues.create"),
    ).toBe(true);
  });

  it("refuses to reseed while a path exceeds the 900-byte PK budget", async () => {
    const longDir = mkdtempSync(join(tmpdir(), "cutover-longpath-"));
    try {
      buildMirror(longDir, { longPath: true });
      const { reseedDsql } = await import("../scripts/reseed-dsql.js");
      await expect(reseedDsql(longDir)).rejects.toThrow(/900 bytes/u);
    } finally {
      rmSync(longDir, { recursive: true, force: true });
    }
  });
});

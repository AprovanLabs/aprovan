/**
 * Snapshot the Dynamo/S3 deployment into a bootable SQLite mirror
 * (specs/storage-cutover, "Snapshot to a bootable SQLite mirror"):
 *
 *   pnpm --filter @aprovan/workspace exec tsx scripts/snapshot-to-sqlite.ts --out <dir>
 *
 * Pulls, for every workspace: every latest-pointer (`P#`) row from the
 * Dynamo FsFiles table plus its referenced S3 blob content, into a
 * `FsStoreSqlite`-shaped `fs_files` table (content inline); plus dumps of
 * the records, credentials (encrypted payloads verbatim — KMS envelopes stay
 * KMS envelopes), and identity tables into their local-backend shapes.
 *
 * Resumable: a re-run skips any (workspace, path, hash) whose content is
 * already mirrored, and upserts everything else — an interrupted run
 * converges to the same mirror as an uninterrupted one. Version rows (`V#`),
 * audit entries, and login sessions are deliberately NOT snapshotted
 * (dropped by decision record #3).
 */

import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { dynamo } from "../src/db/client.js";
import { s3 } from "../src/fs-store.js";
import type Database from "better-sqlite3";

const loadSqlite = (): typeof import("better-sqlite3") => {
  const req = typeof require === "function" ? require : createRequire(import.meta.url);
  return req("better-sqlite3");
};

export interface SnapshotCounts {
  fsFiles: number;
  fsBlobsDownloaded: number;
  fsBlobsSkipped: number;
  records: number;
  credentials: number;
  users: number;
  workspaces: number;
  memberships: number;
  invites: number;
  groups: number;
  groupMembers: number;
  permissions: number;
}

const table = (env: string, fallback: string): string => process.env[env] ?? fallback;

/** Scan a whole Dynamo table, page by page. */
async function* scan(tableName: string): AsyncGenerator<Record<string, unknown>> {
  const { client, ScanCommand } = await dynamo();
  let cursor: Record<string, unknown> | undefined;
  do {
    let page;
    try {
      page = await client.send(
        new ScanCommand({ TableName: tableName, ExclusiveStartKey: cursor }),
      );
    } catch (err) {
      // A table this deployment never created is an empty table.
      if (err instanceof Error && err.name === "ResourceNotFoundException") return;
      throw err;
    }
    for (const item of page.Items ?? []) yield item as Record<string, unknown>;
    cursor = page.LastEvaluatedKey;
  } while (cursor);
}

function openMirror(outDir: string): Database.Database {
  mkdirSync(outDir, { recursive: true, mode: 0o700 });
  const SqliteDatabase = loadSqlite();
  const db = new SqliteDatabase(join(outDir, "workspace.db"));
  // The exact local-backend shapes (fs-store.ts / records.ts /
  // credentials.ts / identity/sql.ts) so WORKSPACE_MODE=local boots on it.
  db.exec(`
    CREATE TABLE IF NOT EXISTS fs_files (
      workspace_id TEXT NOT NULL, path TEXT NOT NULL, hash TEXT NOT NULL,
      content TEXT NOT NULL, mime_type TEXT NOT NULL, size INTEGER NOT NULL,
      updated_at TEXT NOT NULL, PRIMARY KEY (workspace_id, path, hash)
    );
    CREATE INDEX IF NOT EXISTS fs_files_latest
    ON fs_files(workspace_id, path, updated_at DESC);
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
    CREATE INDEX IF NOT EXISTS credentials_workspace_provider
    ON credentials(workspace_id, provider);
  `);
  return db;
}

/** Identity mirror rides the same db via the relational identity client. */
async function identityMirror(outDir: string): Promise<{
  run: (sql: string, params?: unknown[]) => Promise<{ changes: number }>;
}> {
  const { createSqliteIdentityClient } = await import("../src/identity/sql.js");
  return createSqliteIdentityClient(outDir);
}

export async function snapshotToSqlite(outDir: string): Promise<SnapshotCounts> {
  const counts: SnapshotCounts = {
    fsFiles: 0,
    fsBlobsDownloaded: 0,
    fsBlobsSkipped: 0,
    records: 0,
    credentials: 0,
    users: 0,
    workspaces: 0,
    memberships: 0,
    invites: 0,
    groups: 0,
    groupMembers: 0,
    permissions: 0,
  };
  const db = openMirror(outDir);
  const identity = await identityMirror(outDir);
  const bucket = process.env["FS_BUCKET"];
  if (!bucket) throw new Error("FS_BUCKET must be set (S3 blob source)");

  // --- FS latest pointers + blob content (resumable by hash) ---------------
  const hasRow = db.prepare(
    `SELECT 1 FROM fs_files WHERE workspace_id = ? AND path = ? AND hash = ?`,
  );
  const putFsRow = db.prepare(
    `INSERT OR REPLACE INTO fs_files
     (workspace_id, path, hash, content, mime_type, size, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );
  for await (const item of scan(table("FS_TABLE", "FsFiles"))) {
    const sk = String(item["sk"] ?? "");
    if (!sk.startsWith("P#")) continue; // Latest pointers only — no V# rows.
    const workspaceId = String(item["workspaceId"]);
    const path = String(item["path"]);
    const hash = String(item["hash"]);
    counts.fsFiles += 1;
    if (hasRow.get(workspaceId, path, hash)) {
      counts.fsBlobsSkipped += 1;
      continue; // Already mirrored — the resumability contract.
    }
    const { client, GetObjectCommand } = await s3();
    const blob = await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: `blobs/${workspaceId}/${hash}` }),
    );
    const content = (await blob.Body?.transformToString("utf8")) ?? "";
    counts.fsBlobsDownloaded += 1;
    putFsRow.run(
      workspaceId,
      path,
      hash,
      content,
      String(item["mimeType"] ?? "text/plain"),
      Number(item["size"] ?? Buffer.byteLength(content)),
      String(item["updatedAt"] ?? new Date().toISOString()),
    );
  }

  // --- Records (spilled values inlined — SQLite has no size ceiling) ------
  const putRecord = db.prepare(
    `INSERT OR REPLACE INTO records (tenant, scope, key, value, updated_at, updated_by, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  );
  for await (const item of scan(table("RECORDS_TABLE", "Records"))) {
    const tenant = String(item["tenant"]);
    const scope = String(item["scope"]);
    const key = String(item["key"]);
    let value: string;
    if (item["spilled"]) {
      const { client, GetObjectCommand } = await s3();
      const blob = await client.send(
        new GetObjectCommand({ Bucket: bucket, Key: `records/${tenant}/${scope}/${key}` }),
      );
      value = (await blob.Body?.transformToString("utf8")) ?? "null";
    } else {
      value = JSON.stringify(item["value"] ?? null);
    }
    putRecord.run(
      tenant,
      scope,
      key,
      value,
      String(item["updatedAt"] ?? new Date().toISOString()),
      String(item["updatedBy"] ?? "system"),
      typeof item["expiresAt"] === "number" ? item["expiresAt"] : null,
    );
    counts.records += 1;
  }

  // --- Credentials (ciphertext verbatim) -----------------------------------
  const putCredential = db.prepare(
    `INSERT OR REPLACE INTO credentials
     (id, workspace_id, provider, label, type, payload, created_by, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  for await (const item of scan(table("CREDENTIALS_TABLE", "Credentials"))) {
    const sk = String(item["SK"] ?? "");
    if (!sk.startsWith("CRED#")) continue; // Skip the CREDID# pointers.
    putCredential.run(
      String(item["id"]),
      String(item["workspaceId"]),
      String(item["provider"]),
      typeof item["label"] === "string" ? item["label"] : null,
      String(item["type"]),
      String(item["payload"]),
      typeof item["createdBy"] === "string" ? item["createdBy"] : null,
      String(item["createdAt"]),
      String(item["updatedAt"]),
    );
    counts.credentials += 1;
  }

  // --- Identity (relational shapes; login sessions deliberately dropped) ---
  for await (const item of scan(table("DYNAMODB_USERS_TABLE", "Users"))) {
    await identity.run(
      `INSERT INTO users (sub, email, name, active_workspace_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT (sub) DO UPDATE SET email = excluded.email, name = excluded.name,
         active_workspace_id = excluded.active_workspace_id, updated_at = excluded.updated_at`,
      [
        String(item["sub"]),
        typeof item["email"] === "string" ? item["email"] : null,
        typeof item["name"] === "string" ? item["name"] : null,
        typeof item["activeWorkspaceId"] === "string" ? item["activeWorkspaceId"] : null,
        typeof item["createdAt"] === "string" ? item["createdAt"] : null,
        typeof item["updatedAt"] === "string" ? item["updatedAt"] : null,
      ],
    );
    counts.users += 1;
  }
  for await (const item of scan(table("DYNAMODB_WORKSPACES_TABLE", "Workspaces"))) {
    await identity.run(
      `INSERT INTO workspaces (workspace_id, name, plan, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT (workspace_id) DO UPDATE SET name = excluded.name, plan = excluded.plan,
         updated_at = excluded.updated_at`,
      [
        String(item["workspaceId"]),
        typeof item["name"] === "string" ? item["name"] : "",
        typeof item["plan"] === "string" ? item["plan"] : null,
        typeof item["createdAt"] === "string" ? item["createdAt"] : null,
        typeof item["updatedAt"] === "string" ? item["updatedAt"] : null,
      ],
    );
    counts.workspaces += 1;
  }
  for await (const item of scan(table("DYNAMODB_MEMBERSHIPS_TABLE", "Memberships"))) {
    await identity.run(
      `INSERT INTO memberships (workspace_id, user_id, role, created_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT (workspace_id, user_id) DO UPDATE SET role = excluded.role`,
      [
        String(item["workspaceId"]),
        String(item["userId"]),
        String(item["role"] ?? "member"),
        typeof item["createdAt"] === "string" ? item["createdAt"] : null,
      ],
    );
    counts.memberships += 1;
  }
  for await (const item of scan(table("DYNAMODB_INVITES_TABLE", "Invites"))) {
    await identity.run(
      `INSERT INTO invites
       (invite_token, email, workspace_id, role, group_ids, invited_by, created_at, expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (invite_token) DO NOTHING`,
      [
        String(item["inviteToken"]),
        String(item["email"] ?? ""),
        String(item["workspaceId"] ?? ""),
        String(item["role"] ?? "member"),
        JSON.stringify(Array.isArray(item["groupIds"]) ? item["groupIds"] : []),
        String(item["invitedBy"] ?? ""),
        typeof item["createdAt"] === "string" ? item["createdAt"] : null,
        typeof item["expiresAt"] === "number" ? item["expiresAt"] : null,
      ],
    );
    counts.invites += 1;
  }
  for await (const item of scan(table("GROUPS_TABLE", "Groups"))) {
    await identity.run(
      `INSERT INTO groups (workspace_id, group_id, name, description, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT (workspace_id, group_id) DO UPDATE SET name = excluded.name,
         description = excluded.description, updated_at = excluded.updated_at`,
      [
        String(item["workspaceId"]),
        String(item["groupId"]),
        String(item["name"] ?? ""),
        typeof item["description"] === "string" ? item["description"] : null,
        typeof item["createdAt"] === "string" ? item["createdAt"] : null,
        typeof item["updatedAt"] === "string" ? item["updatedAt"] : null,
      ],
    );
    counts.groups += 1;
  }
  for await (const item of scan(table("USER_GROUPS_TABLE", "UserGroups"))) {
    const workspaceId = String(item["workspaceId"] ?? "");
    const userId = String(item["userId"] ?? "");
    if (!workspaceId || !userId) continue;
    await identity.run(
      `INSERT INTO group_members (workspace_id, group_id, user_id)
       VALUES (?, ?, ?)
       ON CONFLICT (workspace_id, group_id, user_id) DO NOTHING`,
      [workspaceId, String(item["groupId"]), userId],
    );
    counts.groupMembers += 1;
  }
  // Group grant tables: dropped — group capability is profile grants
  // in registry-server storage (data-auth-model; decision record #8).
  for await (const item of scan(table("PERMISSIONS_TABLE", "Permissions"))) {
    const sk = String(item["SK"] ?? "");
    if (!sk.startsWith("PERM#")) continue; // Skip PERMID# pointers.
    await identity.run(
      `INSERT INTO permissions
       (workspace_id, caller_id, provider, operation, perm_id, granted_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (workspace_id, caller_id, provider, operation)
       DO UPDATE SET perm_id = excluded.perm_id`,
      [
        String(item["workspaceId"]),
        String(item["callerId"]),
        String(item["provider"]),
        String(item["operation"]),
        String(item["id"]),
        String(item["grantedBy"] ?? ""),
        typeof item["grantedAt"] === "string" ? item["grantedAt"] : null,
      ],
    );
    counts.permissions += 1;
  }

  db.close();
  return counts;
}

const invokedDirectly =
  process.argv[1]?.endsWith("snapshot-to-sqlite.ts") ||
  process.argv[1]?.endsWith("snapshot-to-sqlite.js");
if (invokedDirectly) {
  const outIndex = process.argv.indexOf("--out");
  const outDir = outIndex >= 0 ? process.argv[outIndex + 1] : undefined;
  if (!outDir) {
    console.error("Usage: snapshot-to-sqlite.ts --out <dir>");
    process.exit(2);
  }
  snapshotToSqlite(outDir)
    .then((counts) => {
      console.log("Snapshot complete:");
      for (const [key, value] of Object.entries(counts)) {
        console.log(`  ${key}: ${value}`);
      }
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}

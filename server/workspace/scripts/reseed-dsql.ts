/**
 * Reseed Aurora DSQL from a snapshot mirror (specs/storage-cutover,
 * "Nuke-and-reseed cutover"):
 *
 *   DSQL_ENDPOINT=... (or DSQL_URL=...) \
 *   pnpm --filter @aprovan/workspace exec tsx scripts/reseed-dsql.ts --from <dir>
 *
 * Seeds: latest FS metadata (fs_latest rows pointing at the EXISTING S3
 * blobs — content is not copied or moved), record rows, credentials (into
 * @aprovan/registry-server's storage on the same cluster, with a sentinel
 * `created_by` where the source row has none), and identity data. Version
 * history, audit history, and login sessions are NOT reseeded.
 *
 * Idempotent (every insert upserts) and chunked: batches stay within DSQL's
 * 3,000-row / 10 MiB per-transaction limits. Pre-scans for paths over the
 * 900-byte PK budget and refuses to start while any exist.
 */

import { createRequire } from "node:module";
import { join } from "node:path";
import { chunkRows, dsqlQuery, dsqlRegistryPool, withOccRetry } from "../src/db/dsql.js";
import { MAX_FS_PATH_BYTES } from "../src/fs-store.js";

const loadSqlite = (): typeof import("better-sqlite3") => {
  const req = typeof require === "function" ? require : createRequire(import.meta.url);
  return req("better-sqlite3");
};

/** Sentinel owner for credentials whose source row predates `created_by`. */
export const RESEED_SENTINEL_OWNER = "reseed:unknown";

export interface ReseedCounts {
  fsLatest: number;
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

interface MirrorRow {
  [key: string]: unknown;
}

export async function reseedDsql(fromDir: string): Promise<ReseedCounts> {
  const SqliteDatabase = loadSqlite();
  const mirror = new SqliteDatabase(join(fromDir, "workspace.db"), { readonly: true });

  // --- Pre-scan: no path may exceed the DSQL PK budget ---------------------
  const longPaths = (
    mirror.prepare(`SELECT workspace_id, path FROM fs_files`).all() as Array<{
      workspace_id: string;
      path: string;
    }>
  ).filter((row) => Buffer.byteLength(row.path, "utf8") > MAX_FS_PATH_BYTES);
  if (longPaths.length > 0) {
    mirror.close();
    throw new Error(
      `Reseed pre-scan found ${longPaths.length} path(s) over ${MAX_FS_PATH_BYTES} bytes — ` +
        `shorten or drop them before reseeding:\n` +
        longPaths.map((row) => `  ${row.workspace_id}: ${row.path}`).join("\n"),
    );
  }

  const counts: ReseedCounts = {
    fsLatest: 0,
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

  /** Upsert `rows` in DSQL-sized chunks with OCC retry per statement. */
  const seed = async (
    rows: MirrorRow[],
    upsert: (row: MirrorRow) => Promise<void>,
  ): Promise<number> => {
    for (const batch of chunkRows(rows, { maxRows: 500 })) {
      for (const row of batch) {
        await withOccRetry(() => upsert(row));
      }
    }
    return rows.length;
  };

  // --- FS latest metadata (blobs stay where they are in S3) ---------------
  // The mirror's fs_files holds exactly the latest pointers (the snapshot
  // only mirrors P# rows), so each row becomes one fs_latest row.
  const fsRows = mirror
    .prepare(`SELECT workspace_id, path, hash, mime_type, size, updated_at FROM fs_files`)
    .all() as MirrorRow[];
  counts.fsLatest = await seed(fsRows, async (row) => {
    await dsqlQuery(
      `INSERT INTO fs_latest (workspace_id, path, hash, mime_type, size, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (workspace_id, path)
       DO UPDATE SET hash = $3, mime_type = $4, size = $5, updated_at = $6`,
      [row["workspace_id"], row["path"], row["hash"], row["mime_type"], row["size"], row["updated_at"]],
    );
  });

  // --- Records -------------------------------------------------------------
  const recordRows = mirror
    .prepare(`SELECT tenant, scope, key, value, updated_at, updated_by, expires_at FROM records`)
    .all() as MirrorRow[];
  counts.records = await seed(recordRows, async (row) => {
    await dsqlQuery(
      `INSERT INTO records (tenant, scope, key, value, spilled, updated_at, updated_by, expires_at)
       VALUES ($1, $2, $3, $4, false, $5, $6, $7)
       ON CONFLICT (tenant, scope, key)
       DO UPDATE SET value = $4, spilled = false, updated_at = $5, updated_by = $6, expires_at = $7`,
      [
        row["tenant"],
        row["scope"],
        row["key"],
        row["value"],
        row["updated_at"],
        row["updated_by"],
        row["expires_at"],
      ],
    );
  });

  // --- Credentials → registry-server storage (sentinel created_by) --------
  const registryPool = await dsqlRegistryPool();
  const { createSqlStorage } = await import("@aprovan/registry-server");
  const toPg = (sql: string): string => {
    let index = 0;
    return sql.replace(/\?/gu, () => `$${++index}`);
  };
  const storage = await createSqlStorage({
    async exec(sql) {
      for (const statement of sql.split(/;\s*(?:\n|$)/u)) {
        const trimmed = statement.trim();
        if (trimmed) await registryPool.query(trimmed);
      }
    },
    async all(sql, params = []) {
      const result = await withOccRetry(() => registryPool.query(toPg(sql), params));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.rows as any;
    },
    async run(sql, params = []) {
      const result = await withOccRetry(() => registryPool.query(toPg(sql), params));
      return { changes: result.rowCount ?? 0 };
    },
    async close() {
      // Shared pool; db/dsql.ts owns it.
    },
  });
  const credentialRows = mirror
    .prepare(
      `SELECT id, workspace_id, provider, label, type, payload, created_by, created_at, updated_at
       FROM credentials`,
    )
    .all() as MirrorRow[];
  for (const row of credentialRows) {
    const tenantId = String(row["workspace_id"]);
    await storage.tenants.ensure(tenantId);
    // Idempotency: the registry schema keys credentials by its own random id;
    // re-running must not duplicate, so upsert-by-source-id manually.
    const existing = await registryPool.query(
      `SELECT id FROM credentials WHERE id = $1 AND tenant_id = $2`,
      [row["id"], tenantId],
    );
    if (existing.rows.length > 0) {
      await withOccRetry(() =>
        registryPool.query(
          `UPDATE credentials SET provider = $3, label = $4, type = $5, payload = $6,
             created_by = $7, updated_at = $8
           WHERE id = $1 AND tenant_id = $2`,
          [
            row["id"],
            tenantId,
            row["provider"],
            row["label"],
            row["type"],
            row["payload"],
            row["created_by"] ?? RESEED_SENTINEL_OWNER,
            row["updated_at"],
          ],
        ),
      );
    } else {
      await withOccRetry(() =>
        registryPool.query(
          `INSERT INTO credentials
             (id, tenant_id, provider, label, type, payload, created_by, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            row["id"],
            tenantId,
            row["provider"],
            row["label"],
            row["type"],
            row["payload"],
            row["created_by"] ?? RESEED_SENTINEL_OWNER,
            row["created_at"],
            row["updated_at"],
          ],
        ),
      );
    }
    counts.credentials += 1;
  }

  // --- Identity ------------------------------------------------------------
  const tableRows = (sql: string): MirrorRow[] => {
    try {
      return mirror.prepare(sql).all() as MirrorRow[];
    } catch {
      return []; // Mirror predates the table — nothing to reseed.
    }
  };

  counts.users = await seed(tableRows(`SELECT * FROM users`), async (row) => {
    await dsqlQuery(
      `INSERT INTO users (sub, email, name, active_workspace_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (sub) DO UPDATE SET email = $2, name = $3, active_workspace_id = $4, updated_at = $6`,
      [
        row["sub"],
        row["email"],
        row["name"],
        row["active_workspace_id"],
        row["created_at"],
        row["updated_at"],
      ],
    );
  });
  counts.workspaces = await seed(tableRows(`SELECT * FROM workspaces`), async (row) => {
    await dsqlQuery(
      `INSERT INTO workspaces (workspace_id, name, plan, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (workspace_id) DO UPDATE SET name = $2, plan = $3, updated_at = $5`,
      [row["workspace_id"], row["name"], row["plan"], row["created_at"], row["updated_at"]],
    );
  });
  counts.memberships = await seed(tableRows(`SELECT * FROM memberships`), async (row) => {
    await dsqlQuery(
      `INSERT INTO memberships (workspace_id, user_id, role, created_at)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (workspace_id, user_id) DO UPDATE SET role = $3`,
      [row["workspace_id"], row["user_id"], row["role"], row["created_at"]],
    );
  });
  counts.invites = await seed(tableRows(`SELECT * FROM invites`), async (row) => {
    await dsqlQuery(
      `INSERT INTO invites
         (invite_token, email, workspace_id, role, group_ids, invited_by, created_at, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (invite_token) DO NOTHING`,
      [
        row["invite_token"],
        row["email"],
        row["workspace_id"],
        row["role"],
        row["group_ids"],
        row["invited_by"],
        row["created_at"],
        row["expires_at"],
      ],
    );
  });
  counts.groups = await seed(tableRows(`SELECT * FROM groups`), async (row) => {
    await dsqlQuery(
      `INSERT INTO groups (workspace_id, group_id, name, description, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (workspace_id, group_id)
       DO UPDATE SET name = $3, description = $4, updated_at = $6`,
      [
        row["workspace_id"],
        row["group_id"],
        row["name"],
        row["description"],
        row["created_at"],
        row["updated_at"],
      ],
    );
  });
  counts.groupMembers = await seed(tableRows(`SELECT * FROM group_members`), async (row) => {
    await dsqlQuery(
      `INSERT INTO group_members (workspace_id, group_id, user_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (workspace_id, group_id, user_id) DO NOTHING`,
      [row["workspace_id"], row["group_id"], row["user_id"]],
    );
  });
  counts.permissions = await seed(tableRows(`SELECT * FROM permissions`), async (row) => {
    await dsqlQuery(
      `INSERT INTO permissions
         (workspace_id, caller_id, provider, operation, perm_id, granted_by, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (workspace_id, caller_id, provider, operation)
       DO UPDATE SET perm_id = $5`,
      [
        row["workspace_id"],
        row["caller_id"],
        row["provider"],
        row["operation"],
        row["perm_id"],
        row["granted_by"],
        row["created_at"],
      ],
    );
  });

  mirror.close();
  return counts;
}

const invokedDirectly =
  process.argv[1]?.endsWith("reseed-dsql.ts") || process.argv[1]?.endsWith("reseed-dsql.js");
if (invokedDirectly) {
  const fromIndex = process.argv.indexOf("--from");
  const fromDir = fromIndex >= 0 ? process.argv[fromIndex + 1] : undefined;
  if (!fromDir) {
    console.error("Usage: reseed-dsql.ts --from <dir>");
    process.exit(2);
  }
  reseedDsql(fromDir)
    .then((counts) => {
      console.log("Reseed complete:");
      for (const [key, value] of Object.entries(counts)) {
        console.log(`  ${key}: ${value}`);
      }
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}

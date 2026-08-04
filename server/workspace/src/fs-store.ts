import { createHash } from "node:crypto";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { dynamo } from "./db/client.js";
import { storeBackend, workspaceDataDir } from "./runtime/config.js";
import type { S3Client } from "@aws-sdk/client-s3";
import type Database from "better-sqlite3";

/**
 * Workspace filesystem (WFS) — the gateway's S3-like, prefix-partitioned
 * file tree, one namespace per workspace. Everything the platform persists
 * for a workspace lives here as ordinary paths:
 *
 *   widgets/<name>/…       raw widget sources + manifest
 *   skills/<name>/SKILL.md Open-Knowledge-Format docs (frontmatter index)
 *   data/…                 ETL output from scheduled script runs
 *
 * Files are content-hash versioned: a write appends a `(path, hash)` version
 * and reads default to the newest, so history is free and writes are
 * idempotent. Prefix listing doubles as readdir.
 *
 * Two backends behind {@link IFsStore} (selected by `storeBackend()` via
 * runtime/config.ts, same switch as the credential/audit/record stores):
 *
 * - **SQLite** (local mode): one table in the workspace db.
 * - **DSQL + S3** (aws mode): metadata in Aurora DSQL, content-addressed
 *   blobs in S3 (`blobs/<workspace>/<hash>`). Large/binary uploads go
 *   straight to S3 via presigned PUT (`createUpload`) and are registered
 *   with `completeUpload`.
 *
 * `FsStoreS3` (Dynamo index + S3 blobs) remains for snapshot/cutover tooling
 * and is not wired into {@link getFsStore}.
 */

const loadSqlite = (): typeof import("better-sqlite3") => {
  const req =
    typeof require === "function" ? require : createRequire(import.meta.url);
  return req("better-sqlite3");
};

export interface FsEntry {
  path: string;
  hash: string;
  mimeType: string;
  size: number;
  updatedAt: string;
}

export interface FsFile extends FsEntry {
  content: string;
}

export interface FsUploadTicket {
  /** Presigned PUT URL for the content blob. */
  url: string;
  /** Headers the client must send with the PUT. */
  headers: Record<string, string>;
  /** Seconds until the URL expires. */
  expiresIn: number;
}

/**
 * `versioned: false` skips minting a new version row for the write — only
 * the latest-pointer is updated. Defaults to `!isServicePath(path)` when
 * omitted, so ordinary authored writes keep full version history without
 * every caller having to reason about it; `.services/**` (and staged-session
 * shadow trees, which live under `.services/chat/sessions/<id>/files/**`)
 * default to unversioned, which is what stops per-message chat state and
 * similar accumulated-state subsystems from minting a version row (and an S3
 * blob) on every write (see specs/fs-metadata-store "Unversioned
 * service-path writes").
 */
export interface FsWriteOptions {
  versioned?: boolean;
}

/**
 * One page of a listing. A returned `cursor` means more entries exist;
 * feeding it back resumes with no gaps or duplicates (specs/fs-metadata-store
 * "Cursor-paginated list"). Callers that want everything use {@link listAll}.
 */
export interface FsListPage {
  entries: FsEntry[];
  cursor?: string;
}

export interface FsListOptions {
  cursor?: string;
  limit?: number;
}

export interface IFsStore {
  /**
   * Latest version of every file under `prefix` (metadata only), path-ordered.
   * Without `limit`, the whole listing comes back as one page (no cursor).
   */
  list(workspaceId: string, prefix?: string, opts?: FsListOptions): Promise<FsListPage>;
  /**
   * Every stored version of `path`, newest first (updatedAt desc). The first
   * entry's hash is the current {@link read} hash. Empty when `path` has none.
   * Unversioned writes (see {@link FsWriteOptions}) leave at most the latest
   * entry here — they never accumulate.
   */
  listVersions(workspaceId: string, path: string): Promise<FsEntry[]>;
  read(workspaceId: string, path: string, hash?: string): Promise<FsFile | undefined>;
  write(
    workspaceId: string,
    path: string,
    content: string,
    mimeType?: string,
    opts?: FsWriteOptions,
  ): Promise<FsFile>;
  /** Remove a file (all versions). Returns whether anything was deleted. */
  remove(workspaceId: string, path: string): Promise<boolean>;
  /** Remove an entire subtree. Returns the number of files removed. */
  removePrefix(workspaceId: string, prefix: string): Promise<number>;
  /**
   * Presigned direct-to-S3 upload for a content blob (S3 backend only —
   * undefined on backends without object storage). The client uploads the
   * blob, then registers the path with {@link completeUpload}.
   */
  createUpload?(
    workspaceId: string,
    hash: string,
    mimeType: string,
  ): Promise<FsUploadTicket>;
  /** Register an uploaded blob under a path; verifies the blob exists. */
  completeUpload?(
    workspaceId: string,
    path: string,
    hash: string,
    mimeType: string,
  ): Promise<FsEntry | undefined>;
}

/**
 * The DSQL backend's primary key is `(workspace_id, path, hash)` and DSQL
 * caps combined PK size at 1 KiB — 900 bytes of path leaves comfortable room
 * for the rest (tech-plan §5; reseed pre-scans for violations).
 */
export const MAX_FS_PATH_BYTES = 900;

/** Normalize to `a/b/c` form; rejects traversal, empty segments, and paths
 *  over {@link MAX_FS_PATH_BYTES} bytes. */
export function normalizeFsPath(raw: string): string | null {
  const path = raw.replace(/^\/+|\/+$/g, "");
  if (!path) return null;
  if (Buffer.byteLength(path, "utf8") > MAX_FS_PATH_BYTES) return null;
  const segments = path.split("/");
  if (segments.some((s) => !s || s === "." || s === "..")) return null;
  return segments.join("/");
}

/** Drain helper: every page of {@link IFsStore.list} concatenated. */
export async function listAll(
  store: IFsStore,
  workspaceId: string,
  prefix = "",
): Promise<FsEntry[]> {
  const entries: FsEntry[] = [];
  let cursor: string | undefined;
  do {
    const page = await store.list(workspaceId, prefix, cursor ? { cursor } : undefined);
    entries.push(...page.entries);
    cursor = page.cursor;
  } while (cursor);
  return entries;
}

/**
 * Service-internal paths (`.services/**`): workflow/app/webhook
 * registrations, hook tokens and HMAC secrets, keyvalue state. These are
 * managed exclusively through their tool namespaces (workflows.*, apps.*,
 * webhooks.*, keyvalue.*) — the raw FS surfaces must never expose them, or
 * any member could read webhook signing secrets or tamper with
 * registrations.
 */
export function isServicePath(path: string): boolean {
  return path === ".services" || path.startsWith(".services/");
}

const inPrefix = (path: string, prefix: string): boolean =>
  prefix === "" || path === prefix || path.startsWith(`${prefix}/`);

// ---------------------------------------------------------------------------
// SQLite backend (local dev)
// ---------------------------------------------------------------------------

export class FsStoreSqlite implements IFsStore {
  private readonly database: Database.Database;

  constructor(
    directory = workspaceDataDir(),
  ) {
    mkdirSync(directory, { recursive: true, mode: 0o700 });
    const SqliteDatabase = loadSqlite();
    this.database = new SqliteDatabase(join(directory, "workspace.db"));
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS fs_files (
        workspace_id TEXT NOT NULL,
        path TEXT NOT NULL,
        hash TEXT NOT NULL,
        content TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        size INTEGER NOT NULL,
        updated_at TEXT NOT NULL,
        PRIMARY KEY (workspace_id, path, hash)
      );
      CREATE INDEX IF NOT EXISTS fs_files_latest
      ON fs_files(workspace_id, path, updated_at DESC);
    `);
  }

  async list(
    workspaceId: string,
    prefix = "",
    opts?: FsListOptions,
  ): Promise<FsListPage> {
    const limit = opts?.limit;
    const after = opts?.cursor ?? "";
    // SQLite resolves bare columns alongside MAX() to the max row. The cursor
    // is the last returned path — `path > cursor` resumes with no gaps or
    // duplicates since the listing is path-ordered.
    const rows = this.database
      .prepare(
        `SELECT path, hash, mime_type, size, MAX(updated_at) AS updated_at
         FROM fs_files
         WHERE workspace_id = ? AND (? = '' OR path = ? OR path LIKE ? ESCAPE '\\')
           AND (? = '' OR path > ?)
         GROUP BY path ORDER BY path
         ${limit ? "LIMIT ?" : ""}`,
      )
      .all(
        workspaceId,
        prefix,
        prefix,
        `${prefix.replace(/[%_]/g, (c) => `\\${c}`)}/%`,
        after,
        after,
        ...(limit ? [limit + 1] : []),
      ) as Record<string, unknown>[];
    const truncated = limit !== undefined && rows.length > limit;
    const page = truncated ? rows.slice(0, limit) : rows;
    const entries = page.map((row) => this.entry(row));
    return {
      entries,
      ...(truncated ? { cursor: entries[entries.length - 1]!.path } : {}),
    };
  }

  async listVersions(workspaceId: string, path: string): Promise<FsEntry[]> {
    const rows = this.database
      .prepare(
        // rowid tiebreak keeps newest-first stable when two versions share an
        // ISO-ms updated_at, matching read()'s latest-row selection.
        `SELECT path, hash, mime_type, size, updated_at FROM fs_files
         WHERE workspace_id = ? AND path = ?
         ORDER BY updated_at DESC, rowid DESC`,
      )
      .all(workspaceId, path) as Record<string, unknown>[];
    return rows.map((row) => this.entry(row));
  }

  async read(workspaceId: string, path: string, hash?: string): Promise<FsFile | undefined> {
    const row = hash
      ? this.database
          .prepare(
            `SELECT path, hash, content, mime_type, size, updated_at FROM fs_files
             WHERE workspace_id = ? AND path = ? AND hash = ?`,
          )
          .get(workspaceId, path, hash)
      : this.database
          .prepare(
            // rowid breaks updated_at ties so the most-recently-written row
            // always wins — two writes can share an ISO-ms timestamp.
            `SELECT path, hash, content, mime_type, size, updated_at FROM fs_files
             WHERE workspace_id = ? AND path = ?
             ORDER BY updated_at DESC, rowid DESC LIMIT 1`,
          )
          .get(workspaceId, path);
    if (!row) return undefined;
    const record = row as Record<string, unknown>;
    return { ...this.entry(record), content: String(record["content"]) };
  }

  async write(
    workspaceId: string,
    path: string,
    content: string,
    mimeType = "text/plain",
    opts?: FsWriteOptions,
  ): Promise<FsFile> {
    const versioned = opts?.versioned ?? !isServicePath(path);
    const hash = createHash("sha256").update(content).digest("hex");
    const size = Buffer.byteLength(content);
    const updatedAt = new Date().toISOString();
    if (!versioned) {
      // Unversioned: drop every other version row for this path first, so
      // the table never accumulates more than the one latest row (the PK
      // includes hash, so same-content rewrites would otherwise coexist
      // with — not replace — prior versions).
      this.database
        .prepare(`DELETE FROM fs_files WHERE workspace_id = ? AND path = ? AND hash != ?`)
        .run(workspaceId, path, hash);
    }
    this.database
      .prepare(
        `INSERT OR REPLACE INTO fs_files
         (workspace_id, path, hash, content, mime_type, size, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(workspaceId, path, hash, content, mimeType, size, updatedAt);
    return { path, hash, content, mimeType, size, updatedAt };
  }

  async remove(workspaceId: string, path: string): Promise<boolean> {
    const result = this.database
      .prepare(`DELETE FROM fs_files WHERE workspace_id = ? AND path = ?`)
      .run(workspaceId, path);
    return result.changes > 0;
  }

  async removePrefix(workspaceId: string, prefix: string): Promise<number> {
    const result = this.database
      .prepare(
        `DELETE FROM fs_files
         WHERE workspace_id = ? AND (path = ? OR path LIKE ? ESCAPE '\\')`,
      )
      .run(
        workspaceId,
        prefix,
        `${prefix.replace(/[%_]/g, (c) => `\\${c}`)}/%`,
      );
    return result.changes;
  }

  private entry(row: Record<string, unknown>): FsEntry {
    return {
      path: String(row["path"]),
      hash: String(row["hash"]),
      mimeType: String(row["mime_type"]),
      size: Number(row["size"]),
      updatedAt: String(row["updated_at"]),
    };
  }
}

// ---------------------------------------------------------------------------
// S3 + DynamoDB backend (Lambda / compose)
// ---------------------------------------------------------------------------
//
// Table layout (`FsFiles`, PK `workspaceId`, SK `sk`):
//   sk = `P#<path>`          latest pointer — hash/mimeType/size/updatedAt
//   sk = `V#<path>#<hash>`   version row    — mimeType/size/updatedAt
// Blob layout (bucket `FS_BUCKET`): `blobs/<workspaceId>/<hash>` — content-
// addressed, shared across paths/versions inside a workspace; deletes drop
// index rows only (blobs are cheap and a GC pass can reclaim them later).

const UPLOAD_URL_TTL_SECONDS = 900;

/** The `client-s3` module surface plus the shared client. */
export type S3 = typeof import("@aws-sdk/client-s3") & { client: S3Client };

let _s3: Promise<S3> | undefined;

/**
 * Exported so other stores that piggyback on `FS_BUCKET` (records.ts' large-
 * value spill) share the same client/credentials instead of duplicating the
 * MinIO path-style + local-credential wiring.
 *
 * Loaded on demand — the SQLite backend below is the whole of local mode, and
 * local mode must not pay for the AWS SDK (see db/client.ts for the shape).
 */
export function s3(): Promise<S3> {
  _s3 ??= (async () => {
    const mod = await import("@aws-sdk/client-s3");
    const endpoint = process.env["S3_ENDPOINT"];
    const client = new mod.S3Client({
      endpoint,
      region: process.env["AWS_REGION"] ?? "us-east-1",
      // Local object stores (MinIO) need path-style addressing and their
      // root credentials — dedicated vars so the generic AWS_* pair (which
      // dynamodb-local tests set freely) can't break the object store.
      ...(endpoint
        ? {
            forcePathStyle: true,
            credentials: {
              accessKeyId: process.env["FS_S3_ACCESS_KEY"] ?? "minioadmin",
              secretAccessKey: process.env["FS_S3_SECRET_KEY"] ?? "minioadmin",
            },
          }
        : {}),
    });
    return { ...mod, client };
  })();
  return _s3;
}

export function resetS3Client(): void {
  _s3 = undefined;
}

export class FsStoreS3 implements IFsStore {
  private readonly tableName: string;
  private readonly bucket: string;
  private bucketReady: Promise<void> | undefined;

  constructor(options?: { tableName?: string; bucket?: string }) {
    this.tableName = options?.tableName ?? process.env["FS_TABLE"] ?? "FsFiles";
    const bucket = options?.bucket ?? process.env["FS_BUCKET"];
    if (!bucket) {
      throw new Error("FS_BUCKET must be set for the S3 workspace-fs backend");
    }
    this.bucket = bucket;
  }

  /** Auto-create the bucket against local object stores (MinIO). No-op on AWS. */
  private ensureBucket(): Promise<void> {
    this.bucketReady ??= (async () => {
      if (!process.env["S3_ENDPOINT"]) return;
      try {
        const { client, CreateBucketCommand } = await s3();
        await client.send(new CreateBucketCommand({ Bucket: this.bucket }));
      } catch (err) {
        const name = err instanceof Error ? err.name : "";
        if (name !== "BucketAlreadyOwnedByYou" && name !== "BucketAlreadyExists") throw err;
      }
    })();
    return this.bucketReady;
  }

  private blobKey(workspaceId: string, hash: string): string {
    return `blobs/${workspaceId}/${hash}`;
  }

  async list(
    workspaceId: string,
    prefix = "",
    opts?: FsListOptions,
  ): Promise<FsListPage> {
    const limit = opts?.limit;
    const entries: FsEntry[] = [];
    // Cursor: the last returned path, resumed as an exact ExclusiveStartKey
    // on the `P#<path>` sort key — no gaps, no duplicates (sk order is path
    // order within the P# range).
    let cursor: Record<string, unknown> | undefined = opts?.cursor
      ? { workspaceId, sk: `P#${opts.cursor}` }
      : undefined;
    const { client, QueryCommand } = await dynamo();
    do {
      const page = await client.send(
        new QueryCommand({
          TableName: this.tableName,
          KeyConditionExpression:
            "workspaceId = :ws AND begins_with(sk, :prefix)",
          ExpressionAttributeValues: {
            ":ws": workspaceId,
            ":prefix": `P#${prefix}`,
          },
          ExclusiveStartKey: cursor,
        }),
      );
      for (const item of page.Items ?? []) {
        const path = String(item["path"]);
        // begins_with over-matches partial segments ("wid" → "widgetsfoo").
        if (!inPrefix(path, prefix)) continue;
        entries.push(this.entry(item));
        if (limit !== undefined && entries.length >= limit) {
          return { entries, cursor: path };
        }
      }
      cursor = page.LastEvaluatedKey;
    } while (cursor);
    return { entries };
  }

  async listVersions(workspaceId: string, path: string): Promise<FsEntry[]> {
    // The `V#<path>#<hash>` rows are the version index for this exact path.
    const entries: FsEntry[] = [];
    let cursor: Record<string, unknown> | undefined;
    const { client, QueryCommand } = await dynamo();
    do {
      const page = await client.send(
        new QueryCommand({
          TableName: this.tableName,
          KeyConditionExpression: "workspaceId = :ws AND begins_with(sk, :v)",
          ExpressionAttributeValues: { ":ws": workspaceId, ":v": `V#${path}#` },
          ExclusiveStartKey: cursor,
        }),
      );
      for (const item of page.Items ?? []) entries.push(this.entry(item));
      cursor = page.LastEvaluatedKey;
    } while (cursor);
    return entries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async read(workspaceId: string, path: string, hash?: string): Promise<FsFile | undefined> {
    const key = hash ? `V#${path}#${hash}` : `P#${path}`;
    const { client, GetCommand } = await dynamo();
    const result = await client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { workspaceId, sk: key },
      }),
    );
    if (!result.Item) return undefined;
    const entry = this.entry(result.Item);
    await this.ensureBucket();
    const { client: s3Client, GetObjectCommand } = await s3();
    const blob = await s3Client.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: this.blobKey(workspaceId, entry.hash),
      }),
    );
    const content = (await blob.Body?.transformToString("utf8")) ?? "";
    return { ...entry, content };
  }

  async write(
    workspaceId: string,
    path: string,
    content: string,
    mimeType = "text/plain",
    opts?: FsWriteOptions,
  ): Promise<FsFile> {
    const versioned = opts?.versioned ?? !isServicePath(path);
    const hash = createHash("sha256").update(content).digest("hex");
    const size = Buffer.byteLength(content);
    const updatedAt = new Date().toISOString();
    await this.ensureBucket();
    const { client, PutObjectCommand } = await s3();
    await client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: this.blobKey(workspaceId, hash),
        Body: content,
        ContentType: mimeType,
      }),
    );
    await this.putIndex(workspaceId, path, { hash, mimeType, size, updatedAt }, versioned);
    return { path, hash, content, mimeType, size, updatedAt };
  }

  /**
   * Always writes the `P#` latest-pointer row; the `V#` version row is
   * skipped for unversioned writes, which is what keeps `.services/**`
   * writes from accumulating index rows (and, downstream, orphaned blobs —
   * see scripts/gc-blobs.ts) on every rewrite.
   */
  private async putIndex(
    workspaceId: string,
    path: string,
    meta: { hash: string; mimeType: string; size: number; updatedAt: string },
    versioned = true,
  ): Promise<void> {
    const { client, PutCommand } = await dynamo();
    const shared = { workspaceId, path, ...meta };
    const puts = [
      client.send(
        new PutCommand({
          TableName: this.tableName,
          Item: { ...shared, sk: `P#${path}` },
        }),
      ),
    ];
    if (versioned) {
      puts.push(
        client.send(
          new PutCommand({
            TableName: this.tableName,
            Item: { ...shared, sk: `V#${path}#${meta.hash}` },
          }),
        ),
      );
    }
    await Promise.all(puts);
  }

  async remove(workspaceId: string, path: string): Promise<boolean> {
    const { client, BatchWriteCommand, GetCommand, QueryCommand } = await dynamo();
    const keys: Array<{ workspaceId: string; sk: string }> = [
      { workspaceId, sk: `P#${path}` },
    ];
    // Collect version rows for this exact path.
    let cursor: Record<string, unknown> | undefined;
    do {
      const page = await client.send(
        new QueryCommand({
          TableName: this.tableName,
          KeyConditionExpression: "workspaceId = :ws AND begins_with(sk, :v)",
          ExpressionAttributeValues: { ":ws": workspaceId, ":v": `V#${path}#` },
          ProjectionExpression: "sk",
          ExclusiveStartKey: cursor,
        }),
      );
      for (const item of page.Items ?? []) {
        keys.push({ workspaceId, sk: String(item["sk"]) });
      }
      cursor = page.LastEvaluatedKey;
    } while (cursor);

    const existing = await client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { workspaceId, sk: `P#${path}` },
        ProjectionExpression: "sk",
      }),
    );
    if (!existing.Item) return false;

    for (let index = 0; index < keys.length; index += 25) {
      await client.send(
        new BatchWriteCommand({
          RequestItems: {
            [this.tableName]: keys
              .slice(index, index + 25)
              .map((key) => ({ DeleteRequest: { Key: key } })),
          },
        }),
      );
    }
    return true;
  }

  async removePrefix(workspaceId: string, prefix: string): Promise<number> {
    const entries = await listAll(this, workspaceId, prefix);
    let removed = 0;
    for (const entry of entries) {
      if (await this.remove(workspaceId, entry.path)) removed += 1;
    }
    return removed;
  }

  async createUpload(
    workspaceId: string,
    hash: string,
    mimeType: string,
  ): Promise<FsUploadTicket> {
    await this.ensureBucket();
    const [{ client, PutObjectCommand }, { getSignedUrl }] = await Promise.all([
      s3(),
      import("@aws-sdk/s3-request-presigner"),
    ]);
    const url = await getSignedUrl(
      client,
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: this.blobKey(workspaceId, hash),
        ContentType: mimeType,
      }),
      { expiresIn: UPLOAD_URL_TTL_SECONDS },
    );
    return {
      url,
      headers: { "Content-Type": mimeType },
      expiresIn: UPLOAD_URL_TTL_SECONDS,
    };
  }

  async completeUpload(
    workspaceId: string,
    path: string,
    hash: string,
    mimeType: string,
  ): Promise<FsEntry | undefined> {
    await this.ensureBucket();
    let size: number;
    try {
      const { client, HeadObjectCommand } = await s3();
      const head = await client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: this.blobKey(workspaceId, hash),
        }),
      );
      size = head.ContentLength ?? 0;
    } catch {
      return undefined; // Blob was never uploaded.
    }
    const updatedAt = new Date().toISOString();
    await this.putIndex(
      workspaceId,
      path,
      { hash, mimeType, size, updatedAt },
      !isServicePath(path),
    );
    return { path, hash, mimeType, size, updatedAt };
  }

  private entry(item: Record<string, unknown>): FsEntry {
    return {
      path: String(item["path"]),
      hash: String(item["hash"]),
      mimeType: String(item["mimeType"]),
      size: Number(item["size"]),
      updatedAt: String(item["updatedAt"]),
    };
  }
}

// ---------------------------------------------------------------------------
// Aurora DSQL backend (metadata relational, content blobs on S3 — same
// `blobs/<workspaceId>/<hash>` layout and presigned flow as FsStoreS3).
// Tables: fs_latest (hot pointer) + fs_files (version rows) — the two-table
// shape mirroring today's P#/V# split (tech-plan §5, open question 1).
// ---------------------------------------------------------------------------

export class FsStoreDsql implements IFsStore {
  private readonly bucket: string;

  constructor(options?: { bucket?: string }) {
    const bucket = options?.bucket ?? process.env["FS_BUCKET"];
    if (!bucket) {
      throw new Error("FS_BUCKET must be set for the DSQL workspace-fs backend (content blobs)");
    }
    this.bucket = bucket;
  }

  private blobKey(workspaceId: string, hash: string): string {
    return `blobs/${workspaceId}/${hash}`;
  }

  private async db(): Promise<typeof import("./db/dsql.js")> {
    return import("./db/dsql.js");
  }

  async list(
    workspaceId: string,
    prefix = "",
    opts?: FsListOptions,
  ): Promise<FsListPage> {
    const { dsqlQuery } = await this.db();
    const limit = opts?.limit;
    const after = opts?.cursor ?? "";
    const result = await dsqlQuery(
      `SELECT path, hash, mime_type, size, updated_at FROM fs_latest
       WHERE workspace_id = $1
         AND ($2 = '' OR path = $2 OR path LIKE $3)
         AND ($4 = '' OR path > $4)
       ORDER BY path
       ${limit ? `LIMIT ${limit + 1}` : ""}`,
      [
        workspaceId,
        prefix,
        `${prefix.replace(/([%_\\])/gu, "\\$1")}/%`,
        after,
      ],
    );
    const truncated = limit !== undefined && result.rows.length > limit;
    const rows = truncated ? result.rows.slice(0, limit) : result.rows;
    const entries = rows.map((row) => this.entry(row));
    return {
      entries,
      ...(truncated ? { cursor: entries[entries.length - 1]!.path } : {}),
    };
  }

  async listVersions(workspaceId: string, path: string): Promise<FsEntry[]> {
    const { dsqlQuery } = await this.db();
    const result = await dsqlQuery(
      `SELECT path, hash, mime_type, size, updated_at FROM fs_files
       WHERE workspace_id = $1 AND path = $2
       ORDER BY updated_at DESC`,
      [workspaceId, path],
    );
    return result.rows.map((row) => this.entry(row));
  }

  async read(workspaceId: string, path: string, hash?: string): Promise<FsFile | undefined> {
    const { dsqlQuery } = await this.db();
    const result = hash
      ? await dsqlQuery(
          `SELECT path, hash, mime_type, size, updated_at FROM fs_files
           WHERE workspace_id = $1 AND path = $2 AND hash = $3`,
          [workspaceId, path, hash],
        )
      : await dsqlQuery(
          `SELECT path, hash, mime_type, size, updated_at FROM fs_latest
           WHERE workspace_id = $1 AND path = $2`,
          [workspaceId, path],
        );
    const row = result.rows[0];
    if (!row) return undefined;
    const entry = this.entry(row);
    const { client, GetObjectCommand } = await s3();
    const blob = await client.send(
      new GetObjectCommand({ Bucket: this.bucket, Key: this.blobKey(workspaceId, entry.hash) }),
    );
    const content = (await blob.Body?.transformToString("utf8")) ?? "";
    return { ...entry, content };
  }

  async write(
    workspaceId: string,
    path: string,
    content: string,
    mimeType = "text/plain",
    opts?: FsWriteOptions,
  ): Promise<FsFile> {
    const versioned = opts?.versioned ?? !isServicePath(path);
    const hash = createHash("sha256").update(content).digest("hex");
    const size = Buffer.byteLength(content);
    const updatedAt = new Date().toISOString();
    const { client, PutObjectCommand } = await s3();
    await client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: this.blobKey(workspaceId, hash),
        Body: content,
        ContentType: mimeType,
      }),
    );
    await this.putIndex(workspaceId, path, { hash, mimeType, size, updatedAt }, versioned);
    return { path, hash, content, mimeType, size, updatedAt };
  }

  private async putIndex(
    workspaceId: string,
    path: string,
    meta: { hash: string; mimeType: string; size: number; updatedAt: string },
    versioned: boolean,
  ): Promise<void> {
    const { dsqlQuery, withOccRetry } = await this.db();
    await withOccRetry(async () => {
      await dsqlQuery(
        `INSERT INTO fs_latest (workspace_id, path, hash, mime_type, size, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (workspace_id, path)
         DO UPDATE SET hash = $3, mime_type = $4, size = $5, updated_at = $6`,
        [workspaceId, path, meta.hash, meta.mimeType, meta.size, meta.updatedAt],
      );
    });
    if (versioned) {
      await withOccRetry(async () => {
        await dsqlQuery(
          `INSERT INTO fs_files (workspace_id, path, hash, mime_type, size, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (workspace_id, path, hash)
           DO UPDATE SET mime_type = $4, size = $5, updated_at = $6`,
          [workspaceId, path, meta.hash, meta.mimeType, meta.size, meta.updatedAt],
        );
      });
    } else {
      // Unversioned service writes leave at most the latest version row.
      await withOccRetry(async () => {
        await dsqlQuery(
          `DELETE FROM fs_files WHERE workspace_id = $1 AND path = $2`,
          [workspaceId, path],
        );
      });
    }
  }

  async remove(workspaceId: string, path: string): Promise<boolean> {
    const { dsqlQuery, withOccRetry } = await this.db();
    const removed = await withOccRetry(() =>
      dsqlQuery(`DELETE FROM fs_latest WHERE workspace_id = $1 AND path = $2`, [
        workspaceId,
        path,
      ]),
    );
    await withOccRetry(() =>
      dsqlQuery(`DELETE FROM fs_files WHERE workspace_id = $1 AND path = $2`, [
        workspaceId,
        path,
      ]),
    );
    return (removed.rowCount ?? 0) > 0;
  }

  async removePrefix(workspaceId: string, prefix: string): Promise<number> {
    // Chunked delete: collect target paths, then delete in batches whose row
    // counts stay within DSQL's 3,000-row-per-transaction cap (each path has
    // 1 latest row + N version rows; deleting per-path batches of 500 keeps
    // a comfortable margin).
    const { dsqlQuery, withOccRetry, chunkRows } = await this.db();
    const entries = await listAll(this, workspaceId, prefix);
    let removed = 0;
    for (const batch of chunkRows(entries, { maxRows: 500 })) {
      await withOccRetry(async () => {
        const paths = batch.map((entry) => entry.path);
        await dsqlQuery(
          `DELETE FROM fs_latest WHERE workspace_id = $1 AND path = ANY($2)`,
          [workspaceId, paths],
        );
        await dsqlQuery(
          `DELETE FROM fs_files WHERE workspace_id = $1 AND path = ANY($2)`,
          [workspaceId, paths],
        );
      });
      removed += batch.length;
    }
    return removed;
  }

  async createUpload(
    workspaceId: string,
    hash: string,
    mimeType: string,
  ): Promise<FsUploadTicket> {
    const [{ client, PutObjectCommand }, { getSignedUrl }] = await Promise.all([
      s3(),
      import("@aws-sdk/s3-request-presigner"),
    ]);
    const url = await getSignedUrl(
      client,
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: this.blobKey(workspaceId, hash),
        ContentType: mimeType,
      }),
      { expiresIn: UPLOAD_URL_TTL_SECONDS },
    );
    return { url, headers: { "Content-Type": mimeType }, expiresIn: UPLOAD_URL_TTL_SECONDS };
  }

  async completeUpload(
    workspaceId: string,
    path: string,
    hash: string,
    mimeType: string,
  ): Promise<FsEntry | undefined> {
    let size: number;
    try {
      const { client, HeadObjectCommand } = await s3();
      const head = await client.send(
        new HeadObjectCommand({ Bucket: this.bucket, Key: this.blobKey(workspaceId, hash) }),
      );
      size = head.ContentLength ?? 0;
    } catch {
      return undefined; // Blob was never uploaded.
    }
    const updatedAt = new Date().toISOString();
    await this.putIndex(workspaceId, path, { hash, mimeType, size, updatedAt }, !isServicePath(path));
    return { path, hash, mimeType, size, updatedAt };
  }

  private entry(row: Record<string, unknown>): FsEntry {
    return {
      path: String(row["path"]),
      hash: String(row["hash"]),
      mimeType: String(row["mime_type"]),
      size: Number(row["size"]),
      updatedAt: String(row["updated_at"]),
    };
  }
}

// ---------------------------------------------------------------------------
// Singleton factory (backend chosen by runtime/config.ts, like every store)
// ---------------------------------------------------------------------------

let store: IFsStore | undefined;

// The WFS is the one store that cannot degrade gracefully — it needs an object
// store for content blobs on both cloud backends. `resolveData` therefore
// makes FS_BUCKET a hard requirement of aws mode rather than letting a
// half-configured deploy split the file plane onto SQLite while everything
// else talks to DynamoDB or DSQL.
export function getFsStore(): IFsStore {
  store ??= (() => {
    switch (storeBackend()) {
      case "dsql":
        return new FsStoreDsql();
      case "sqlite":
        return new FsStoreSqlite();
    }
  })();
  return store;
}

/** Reset the singleton (used in tests). */
export function resetFsStore(): void {
  store = undefined;
}

/**
 * The record store — where accumulated state lives, as opposed to authored
 * files on the workspace FS (see docs/app-data.md, "App data: split the
 * record plane from the file plane").
 *
 * **Files are authored; records are accumulated.** Before this module,
 * `keyvalue` rode the FS store: every `keyvalue.set` created a content
 * version, appeared in `vfs.list`/file search, and was browsable by any
 * workspace member through ordinary file APIs — a `*-state` file sitting next
 * to source is clutter at best and a per-user privacy leak at worst. The
 * record store gives accumulated state its own namespace: unversioned,
 * invisible to the file plane, private to its partition by default.
 *
 * One partition key shape serves every caller:
 *
 *   PK = t#<tenantWorkspaceId>#s#<scope>        SK = <key>
 *     scope for a workspace caller:  "ws"                     (shared workspace KV)
 *     scope for an app session:      "app#<name>#u#<userSub>" (per-app-user, always)
 *
 * `tenantWorkspaceId` is the only thing that varies with tenancy resolution
 * (owner's workspace vs. the caller's own) — the scope suffix is identical
 * either way, because a session only ever addresses its own
 * `app#<name>#u#<self>` partition regardless of whose tenancy stores the
 * rows. That tenancy resolution already happens upstream (see
 * routes/apps.ts `resolveAppSession` — `ServiceContext.workspaceId` IS the
 * execution/tenant workspace by the time it reaches here), so this module
 * just takes `tenant` as given.
 *
 * Two backends behind {@link IRecordStore}, selected the same way as the FS
 * and credential stores (see runtime/config.ts, `WORKSPACE_MODE`):
 *
 * - **SQLite** (local mode): one table in the workspace db, values inline as
 *   TEXT — no size limit worth enforcing locally.
 * - **DynamoDB** (aws mode): item values inline as JSON, except a JSON blob
 *   over ~350KB — most of Dynamo's 400KB item ceiling once PK/SK/attrs are
 *   accounted for — which spills to the existing `FS_BUCKET` under a
 *   `records/` prefix instead of failing the write.
 */

import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { dynamo } from "./db/client.js";
import { s3 } from "./fs-store.js";
import { storeBackend, workspaceDataDir } from "./runtime/config.js";
import type Database from "better-sqlite3";

const loadSqlite = (): typeof import("better-sqlite3") => {
  const req = typeof require === "function" ? require : createRequire(import.meta.url);
  return req("better-sqlite3");
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RecordEntry {
  tenant: string;
  scope: string;
  key: string;
  value: unknown;
  updatedAt: string;
  updatedBy: string;
}

export interface RecordSetOptions {
  /**
   * Top-level epoch-seconds expiry. On DynamoDB this is the table's TTL
   * attribute (`expiresAt`) and rows are reclaimed by the service; the
   * SQLite backend purges lazily on read/list. Omit for no expiry.
   */
  expiresAtEpochSeconds?: number;
}

export interface IRecordStore {
  get(tenant: string, scope: string, key: string): Promise<RecordEntry | undefined>;
  set(
    tenant: string,
    scope: string,
    key: string,
    value: unknown,
    updatedBy: string,
    options?: RecordSetOptions,
  ): Promise<RecordEntry>;
  delete(tenant: string, scope: string, key: string): Promise<boolean>;
  /** Keys under `scope` whose literal value starts with `prefix` (default ""). */
  list(tenant: string, scope: string, prefix?: string): Promise<string[]>;
  /**
   * Distinct scopes under `tenant` whose value starts with `scopePrefix` —
   * e.g. `app#<name>#u#` to enumerate an app's users for the `apps.data`
   * admin procedure. This is the one place the record store looks *across*
   * scopes rather than within one, so unlike the four ops above it costs a
   * full-table scan on the Dynamo backend (filtered server-side, but not an
   * indexed query) — acceptable for an infrequent admin action, not meant
   * for a hot path. Queryable collections proper are explicitly out of scope
   * for this store (see docs/app-data.md); this is a narrow, named exception.
   */
  listScopes(tenant: string, scopePrefix: string): Promise<string[]>;
}

// ---------------------------------------------------------------------------
// DynamoDB backend
// ---------------------------------------------------------------------------

/** Comfortably under Dynamo's 400KB item cap once PK/SK/attrs are added. */
const SPILL_THRESHOLD_BYTES = 350 * 1024;

function partitionKey(tenant: string, scope: string): string {
  return `t#${tenant}#s#${scope}`;
}

export class RecordStoreDynamodb implements IRecordStore {
  private readonly tableName: string;
  private readonly bucket: string | undefined;

  constructor(options?: { tableName?: string; bucket?: string }) {
    this.tableName = options?.tableName ?? process.env["RECORDS_TABLE"] ?? "Records";
    this.bucket = options?.bucket ?? process.env["FS_BUCKET"];
  }

  private blobKey(tenant: string, scope: string, key: string): string {
    return `records/${tenant}/${scope}/${key}`;
  }

  private requireBucket(): string {
    if (!this.bucket) {
      throw new Error(
        "FS_BUCKET must be set for the record store to spill large values (records.ts)",
      );
    }
    return this.bucket;
  }

  async get(tenant: string, scope: string, key: string): Promise<RecordEntry | undefined> {
    const { client, GetCommand } = await dynamo();
    const result = await client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { PK: partitionKey(tenant, scope), SK: key },
      }),
    );
    if (!result.Item) return undefined;
    return this.toEntry(tenant, scope, key, result.Item, await this.resolveValue(result.Item));
  }

  async set(
    tenant: string,
    scope: string,
    key: string,
    value: unknown,
    updatedBy: string,
    options?: RecordSetOptions,
  ): Promise<RecordEntry> {
    const updatedAt = new Date().toISOString();
    const json = JSON.stringify(value ?? null);
    const spill = Buffer.byteLength(json, "utf8") > SPILL_THRESHOLD_BYTES;
    const item: Record<string, unknown> = {
      PK: partitionKey(tenant, scope),
      SK: key,
      tenant,
      scope,
      key,
      updatedAt,
      updatedBy,
      ...(options?.expiresAtEpochSeconds
        ? { expiresAt: Math.floor(options.expiresAtEpochSeconds) }
        : {}),
    };
    if (spill) {
      const bucket = this.requireBucket();
      const { client, PutObjectCommand } = await s3();
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: this.blobKey(tenant, scope, key),
          Body: json,
          ContentType: "application/json",
        }),
      );
      item["spilled"] = true;
    } else {
      item["value"] = JSON.parse(json) as unknown;
      // A prior write may have spilled this same key; clean up the orphan
      // blob now that it fits inline. Best-effort — deleting a nonexistent
      // S3 key is a no-op, so this is safe to fire on every non-spilled set
      // rather than paying for an extra read to check first.
      if (this.bucket) {
        const { client, DeleteObjectCommand } = await s3();
        await client
          .send(new DeleteObjectCommand({ Bucket: this.bucket, Key: this.blobKey(tenant, scope, key) }))
          .catch(() => undefined);
      }
    }
    const { client, PutCommand } = await dynamo();
    await client.send(new PutCommand({ TableName: this.tableName, Item: item }));
    return { tenant, scope, key, value: value ?? null, updatedAt, updatedBy };
  }

  async delete(tenant: string, scope: string, key: string): Promise<boolean> {
    const { client, DeleteCommand } = await dynamo();
    const result = await client.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { PK: partitionKey(tenant, scope), SK: key },
        ReturnValues: "ALL_OLD",
      }),
    );
    if (!result.Attributes) return false;
    if (result.Attributes["spilled"] && this.bucket) {
      const { client: s3Client, DeleteObjectCommand } = await s3();
      await s3Client
        .send(new DeleteObjectCommand({ Bucket: this.bucket, Key: this.blobKey(tenant, scope, key) }))
        .catch(() => undefined);
    }
    return true;
  }

  async list(tenant: string, scope: string, prefix = ""): Promise<string[]> {
    const keys: string[] = [];
    let cursor: Record<string, unknown> | undefined;
    const { client, QueryCommand } = await dynamo();
    do {
      // DynamoDB rejects begins_with with an empty string — an empty prefix
      // means "everything under the partition", so drop the clause.
      const page = await client.send(
        new QueryCommand({
          TableName: this.tableName,
          KeyConditionExpression: prefix
            ? "PK = :pk AND begins_with(SK, :prefix)"
            : "PK = :pk",
          ExpressionAttributeValues: prefix
            ? { ":pk": partitionKey(tenant, scope), ":prefix": prefix }
            : { ":pk": partitionKey(tenant, scope) },
          ProjectionExpression: "SK",
          ExclusiveStartKey: cursor,
        }),
      );
      for (const item of page.Items ?? []) keys.push(String(item["SK"]));
      cursor = page.LastEvaluatedKey;
    } while (cursor);
    return keys.sort();
  }

  async listScopes(tenant: string, scopePrefix: string): Promise<string[]> {
    const scopes = new Set<string>();
    let cursor: Record<string, unknown> | undefined;
    const { client, ScanCommand } = await dynamo();
    do {
      const page = await client.send(
        new ScanCommand({
          TableName: this.tableName,
          FilterExpression: "tenant = :tenant AND begins_with(#scope, :prefix)",
          ExpressionAttributeNames: { "#scope": "scope" },
          ExpressionAttributeValues: { ":tenant": tenant, ":prefix": scopePrefix },
          ProjectionExpression: "#scope",
          ExclusiveStartKey: cursor,
        }),
      );
      for (const item of page.Items ?? []) scopes.add(String(item["scope"]));
      cursor = page.LastEvaluatedKey;
    } while (cursor);
    return [...scopes].sort();
  }

  private async resolveValue(item: Record<string, unknown>): Promise<unknown> {
    if (!item["spilled"]) return item["value"] ?? null;
    const bucket = this.requireBucket();
    const { client, GetObjectCommand } = await s3();
    const blob = await client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: this.blobKey(String(item["tenant"]), String(item["scope"]), String(item["key"])),
      }),
    );
    const body = (await blob.Body?.transformToString("utf8")) ?? "null";
    return JSON.parse(body) as unknown;
  }

  private toEntry(
    tenant: string,
    scope: string,
    key: string,
    item: Record<string, unknown>,
    value: unknown,
  ): RecordEntry {
    return {
      tenant,
      scope,
      key,
      value,
      updatedAt: String(item["updatedAt"]),
      updatedBy: String(item["updatedBy"]),
    };
  }
}

// ---------------------------------------------------------------------------
// SQLite backend (local dev)
// ---------------------------------------------------------------------------

export class RecordStoreSqlite implements IRecordStore {
  private readonly database: Database.Database;

  constructor(directory = workspaceDataDir()) {
    mkdirSync(directory, { recursive: true, mode: 0o700 });
    const SqliteDatabase = loadSqlite();
    this.database = new SqliteDatabase(join(directory, "workspace.db"));
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS records (
        tenant TEXT NOT NULL,
        scope TEXT NOT NULL,
        key TEXT NOT NULL,
        value TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        updated_by TEXT NOT NULL,
        expires_at INTEGER,
        PRIMARY KEY (tenant, scope, key)
      );
    `);
    // Pre-expiry dev databases lack the column; add it in place.
    try {
      this.database.exec(`ALTER TABLE records ADD COLUMN expires_at INTEGER`);
    } catch {
      // Column already exists.
    }
    // Lazy reaping stands in for DynamoDB TTL locally.
    this.database
      .prepare(`DELETE FROM records WHERE expires_at IS NOT NULL AND expires_at < ?`)
      .run(Math.floor(Date.now() / 1000));
  }

  async get(tenant: string, scope: string, key: string): Promise<RecordEntry | undefined> {
    const row = this.database
      .prepare(
        `SELECT value, updated_at, updated_by FROM records
         WHERE tenant = ? AND scope = ? AND key = ?
           AND (expires_at IS NULL OR expires_at >= unixepoch())`,
      )
      .get(tenant, scope, key) as
      | { value: string; updated_at: string; updated_by: string }
      | undefined;
    if (!row) return undefined;
    return {
      tenant,
      scope,
      key,
      value: JSON.parse(row.value) as unknown,
      updatedAt: row.updated_at,
      updatedBy: row.updated_by,
    };
  }

  async set(
    tenant: string,
    scope: string,
    key: string,
    value: unknown,
    updatedBy: string,
    options?: RecordSetOptions,
  ): Promise<RecordEntry> {
    const updatedAt = new Date().toISOString();
    this.database
      .prepare(
        `INSERT OR REPLACE INTO records (tenant, scope, key, value, updated_at, updated_by, expires_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        tenant,
        scope,
        key,
        JSON.stringify(value ?? null),
        updatedAt,
        updatedBy,
        options?.expiresAtEpochSeconds ?? null,
      );
    return { tenant, scope, key, value: value ?? null, updatedAt, updatedBy };
  }

  async delete(tenant: string, scope: string, key: string): Promise<boolean> {
    const result = this.database
      .prepare(`DELETE FROM records WHERE tenant = ? AND scope = ? AND key = ?`)
      .run(tenant, scope, key);
    return result.changes > 0;
  }

  async list(tenant: string, scope: string, prefix = ""): Promise<string[]> {
    const rows = this.database
      .prepare(
        `SELECT key FROM records
         WHERE tenant = ? AND scope = ? AND key LIKE ? ESCAPE '\\'
           AND (expires_at IS NULL OR expires_at >= unixepoch())
         ORDER BY key`,
      )
      .all(tenant, scope, `${prefix.replace(/[%_]/g, (c) => `\\${c}`)}%`) as { key: string }[];
    return rows.map((row) => row.key);
  }

  async listScopes(tenant: string, scopePrefix: string): Promise<string[]> {
    const rows = this.database
      .prepare(
        `SELECT DISTINCT scope FROM records
         WHERE tenant = ? AND scope LIKE ? ESCAPE '\\'
         ORDER BY scope`,
      )
      .all(tenant, `${scopePrefix.replace(/[%_]/g, (c) => `\\${c}`)}%`) as { scope: string }[];
    return rows.map((row) => row.scope);
  }
}

// ---------------------------------------------------------------------------
// Aurora DSQL backend (specs/record-store "DSQL record backend"): relational
// rows, >350KB values spill to S3 under the existing `records/` prefix,
// `listScopes` is an indexed (tenant, scope) query — no scan exception —
// and expiry is a read-filter plus a periodic sweep (DSQL has no native TTL).
// ---------------------------------------------------------------------------

export class RecordStoreDsql implements IRecordStore {
  private readonly bucket: string | undefined;

  constructor(options?: { bucket?: string }) {
    this.bucket = options?.bucket ?? process.env["FS_BUCKET"];
  }

  private async db(): Promise<typeof import("./db/dsql.js")> {
    return import("./db/dsql.js");
  }

  private blobKey(tenant: string, scope: string, key: string): string {
    return `records/${tenant}/${scope}/${key}`;
  }

  private requireBucket(): string {
    if (!this.bucket) {
      throw new Error(
        "FS_BUCKET must be set for the record store to spill large values (records.ts)",
      );
    }
    return this.bucket;
  }

  async get(tenant: string, scope: string, key: string): Promise<RecordEntry | undefined> {
    const { dsqlQuery } = await this.db();
    const result = await dsqlQuery(
      `SELECT value, spilled, updated_at, updated_by FROM records
       WHERE tenant = $1 AND scope = $2 AND key = $3
         AND (expires_at IS NULL OR expires_at >= $4)`,
      [tenant, scope, key, Math.floor(Date.now() / 1000)],
    );
    const row = result.rows[0];
    if (!row) return undefined;
    let value: unknown;
    if (row["spilled"]) {
      const bucket = this.requireBucket();
      const { client, GetObjectCommand } = await s3();
      const blob = await client.send(
        new GetObjectCommand({ Bucket: bucket, Key: this.blobKey(tenant, scope, key) }),
      );
      value = JSON.parse((await blob.Body?.transformToString("utf8")) ?? "null");
    } else {
      value = JSON.parse(String(row["value"] ?? "null"));
    }
    return {
      tenant,
      scope,
      key,
      value,
      updatedAt: String(row["updated_at"]),
      updatedBy: String(row["updated_by"]),
    };
  }

  async set(
    tenant: string,
    scope: string,
    key: string,
    value: unknown,
    updatedBy: string,
    options?: RecordSetOptions,
  ): Promise<RecordEntry> {
    const { dsqlQuery, withOccRetry } = await this.db();
    const updatedAt = new Date().toISOString();
    const json = JSON.stringify(value ?? null);
    const spill = Buffer.byteLength(json, "utf8") > SPILL_THRESHOLD_BYTES;
    if (spill) {
      const bucket = this.requireBucket();
      const { client, PutObjectCommand } = await s3();
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: this.blobKey(tenant, scope, key),
          Body: json,
          ContentType: "application/json",
        }),
      );
    }
    await withOccRetry(() =>
      dsqlQuery(
        `INSERT INTO records (tenant, scope, key, value, spilled, updated_at, updated_by, expires_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (tenant, scope, key)
         DO UPDATE SET value = $4, spilled = $5, updated_at = $6, updated_by = $7, expires_at = $8`,
        [
          tenant,
          scope,
          key,
          spill ? null : json,
          spill,
          updatedAt,
          updatedBy,
          options?.expiresAtEpochSeconds ? Math.floor(options.expiresAtEpochSeconds) : null,
        ],
      ),
    );
    if (!spill && this.bucket) {
      // A prior write may have spilled this same key; clear the orphan blob.
      const { client, DeleteObjectCommand } = await s3();
      await client
        .send(new DeleteObjectCommand({ Bucket: this.bucket, Key: this.blobKey(tenant, scope, key) }))
        .catch(() => undefined);
    }
    return { tenant, scope, key, value: value ?? null, updatedAt, updatedBy };
  }

  async delete(tenant: string, scope: string, key: string): Promise<boolean> {
    const { dsqlQuery, withOccRetry } = await this.db();
    const spilled = await dsqlQuery(
      `SELECT spilled FROM records WHERE tenant = $1 AND scope = $2 AND key = $3`,
      [tenant, scope, key],
    );
    const result = await withOccRetry(() =>
      dsqlQuery(`DELETE FROM records WHERE tenant = $1 AND scope = $2 AND key = $3`, [
        tenant,
        scope,
        key,
      ]),
    );
    if ((result.rowCount ?? 0) === 0) return false;
    if (spilled.rows[0]?.["spilled"] && this.bucket) {
      const { client, DeleteObjectCommand } = await s3();
      await client
        .send(new DeleteObjectCommand({ Bucket: this.bucket, Key: this.blobKey(tenant, scope, key) }))
        .catch(() => undefined);
    }
    return true;
  }

  async list(tenant: string, scope: string, prefix = ""): Promise<string[]> {
    const { dsqlQuery } = await this.db();
    const result = await dsqlQuery(
      `SELECT key FROM records
       WHERE tenant = $1 AND scope = $2 AND ($3 = '' OR key LIKE $4)
         AND (expires_at IS NULL OR expires_at >= $5)
       ORDER BY key`,
      [
        tenant,
        scope,
        prefix,
        `${prefix.replace(/([%_\\])/gu, "\\$1")}%`,
        Math.floor(Date.now() / 1000),
      ],
    );
    return result.rows.map((row) => String(row["key"]));
  }

  async listScopes(tenant: string, scopePrefix: string): Promise<string[]> {
    // Indexed (tenant, scope) query — removes the Dynamo backend's
    // full-table-scan exception (specs/record-store "listScopes without a
    // scan"); served by the records_scopes index.
    const { dsqlQuery } = await this.db();
    const result = await dsqlQuery(
      `SELECT DISTINCT scope FROM records
       WHERE tenant = $1 AND scope LIKE $2
       ORDER BY scope`,
      [tenant, `${scopePrefix.replace(/([%_\\])/gu, "\\$1")}%`],
    );
    return result.rows.map((row) => String(row["scope"]));
  }

  /** Reap expired rows (leader-leased schedule; DSQL has no native TTL). */
  async sweepExpired(): Promise<number> {
    const { dsqlQuery, withOccRetry } = await this.db();
    const result = await withOccRetry(() =>
      dsqlQuery(`DELETE FROM records WHERE expires_at IS NOT NULL AND expires_at < $1`, [
        Math.floor(Date.now() / 1000),
      ]),
    );
    return result.rowCount ?? 0;
  }
}

// ---------------------------------------------------------------------------
// Singleton factory (backend chosen by runtime/config.ts, like every store)
// ---------------------------------------------------------------------------

let store: IRecordStore | undefined;

export function getRecordStore(): IRecordStore {
  store ??= (() => {
    switch (storeBackend()) {
      case "dsql":
        return new RecordStoreDsql();
      case "sqlite":
        return new RecordStoreSqlite();
    }
  })();
  return store;
}

/** Reset the singleton (used in tests). */
export function resetRecordStore(): void {
  store = undefined;
}

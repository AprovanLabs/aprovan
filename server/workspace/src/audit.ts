/**
 * Audit log for gateway tool calls — sqlite / dsql backends (Dynamo retired).
 *
 * `AuditStoreDynamodb` remains for dynamodb-local contract tests only and is
 * not wired into the factory.
 */

import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { dynamo } from "./db/client.js";
import { storeBackend, workspaceDataDir } from "./runtime/config.js";
import type { CredentialLevel } from "./credentials.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AuditEntry {
  id: string;
  ts: string;
  requestId: string;
  workspaceId: string;
  callerId: string;
  provider: string;
  operation: string;
  /** HTTP status code (200, 403, 500, …) */
  status: number;
  durationMs?: number;
  /** Human-readable label derived from status */
  result: "success" | "forbidden" | "error";
  /** MCP meta-tool name when the call came via the MCP transport */
  mcp_tool_name?: string;
  /** Stored credential the dispatch resolved (IW-9 F3 audit attribution). */
  credentialId?: string;
  /** The resolved credential's level (already effective — never re-derived). */
  credentialLevel?: CredentialLevel;
  /** "stored" for workspace-store rows; "ephemeral" for request-supplied. */
  credentialSource?: "stored" | "ephemeral";
  /** Via-path actor kind when the dispatch was app/workflow/agent-originated. */
  actorKind?: "app" | "workflow" | "agent";
  /** Via-path actor id (app id, dispatching run id, …). */
  actorId?: string;
  /** Profile name, when a profile selected the credential. */
  profileName?: string;
}

export interface IAuditStore {
  /** Fire-and-forget write. Implementations must not throw on write failure. */
  append(entry: Omit<AuditEntry, "id" | "ts" | "result">): void;
  /** Return the N most-recent entries for a workspace, optionally filtered. */
  recent(opts: {
    workspaceId: string;
    limit?: number;
    callerId?: string;
    provider?: string;
  }): Promise<AuditEntry[]>;
}

// ---------------------------------------------------------------------------
// DynamoDB backend (single-table design, APR-321)
// ---------------------------------------------------------------------------

const TTL_30_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export class AuditStoreDynamodb implements IAuditStore {
  private readonly tableName: string;

  constructor(tableName?: string) {
    this.tableName = tableName ?? process.env["AUDIT_TABLE"] ?? "Audit";
  }

  append(entry: Omit<AuditEntry, "id" | "ts" | "result">): void {
    const id = crypto.randomUUID();
    const ts = new Date().toISOString();
    const result =
      entry.status === 403 ? "forbidden" : entry.status < 400 ? "success" : "error";
    const ttl = Math.floor((Date.now() + TTL_30_DAYS_MS) / 1000);

    const item: Record<string, unknown> = {
      PK: `WS#${entry.workspaceId}`,
      SK: `AUDIT#${ts}#${id}`,
      id,
      ts,
      result,
      ttl,
      requestId: entry.requestId,
      workspaceId: entry.workspaceId,
      callerId: entry.callerId,
      provider: entry.provider,
      operation: entry.operation,
      status: entry.status,
    };
    if (entry.durationMs !== undefined) item["durationMs"] = entry.durationMs;
    if (entry.mcp_tool_name !== undefined) item["mcp_tool_name"] = entry.mcp_tool_name;
    if (entry.credentialId !== undefined) item["credentialId"] = entry.credentialId;
    if (entry.credentialLevel !== undefined) item["credentialLevel"] = entry.credentialLevel;
    if (entry.credentialSource !== undefined) item["credentialSource"] = entry.credentialSource;
    if (entry.actorKind !== undefined) item["actorKind"] = entry.actorKind;
    if (entry.actorId !== undefined) item["actorId"] = entry.actorId;
    if (entry.profileName !== undefined) item["profileName"] = entry.profileName;

    // Still fire-and-forget: resolving the SDK is part of the same detached
    // promise, so an audit write never blocks (or fails) the request path.
    void (async () => {
      const { client, PutCommand } = await dynamo();
      await client.send(new PutCommand({ TableName: this.tableName, Item: item }));
    })().catch((err: unknown) => {
      console.error("[AuditStoreDynamodb] append failed:", err);
    });
  }

  async recent(opts: {
    workspaceId: string;
    limit?: number;
    callerId?: string;
    provider?: string;
  }): Promise<AuditEntry[]> {
    const { workspaceId, limit = 100, callerId, provider } = opts;

    const exprAttrValues: Record<string, unknown> = {
      ":pk": `WS#${workspaceId}`,
      ":sk": "AUDIT#",
    };
    const exprAttrNames: Record<string, string> = {};
    const filterParts: string[] = [];

    if (callerId !== undefined) {
      filterParts.push("callerId = :callerId");
      exprAttrValues[":callerId"] = callerId;
    }
    if (provider !== undefined) {
      filterParts.push("#prov = :provider");
      exprAttrValues[":provider"] = provider;
      exprAttrNames["#prov"] = "provider";
    }

    const results: AuditEntry[] = [];
    let lastKey: Record<string, unknown> | undefined;

    const { client, QueryCommand } = await dynamo();
    do {
      const res = await client.send(
        new QueryCommand({
          TableName: this.tableName,
          KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
          ExpressionAttributeValues: exprAttrValues,
          ScanIndexForward: false,
          Limit: limit,
          ...(filterParts.length > 0 && { FilterExpression: filterParts.join(" AND ") }),
          ...(Object.keys(exprAttrNames).length > 0 && {
            ExpressionAttributeNames: exprAttrNames,
          }),
          ...(lastKey && { ExclusiveStartKey: lastKey }),
        }),
      );

      for (const item of (res.Items ?? []) as Record<string, unknown>[]) {
        if (results.length >= limit) break;
        results.push(this.toEntry(item));
      }
      lastKey = res.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (lastKey !== undefined && results.length < limit);

    return results;
  }

  private toEntry(item: Record<string, unknown>): AuditEntry {
    return {
      id: item["id"] as string,
      ts: item["ts"] as string,
      requestId: item["requestId"] as string,
      workspaceId: item["workspaceId"] as string,
      callerId: item["callerId"] as string,
      provider: item["provider"] as string,
      operation: item["operation"] as string,
      status: item["status"] as number,
      durationMs: item["durationMs"] as number | undefined,
      result: item["result"] as "success" | "forbidden" | "error",
      mcp_tool_name: item["mcp_tool_name"] as string | undefined,
      credentialId: item["credentialId"] as string | undefined,
      credentialLevel: item["credentialLevel"] as CredentialLevel | undefined,
      credentialSource: item["credentialSource"] as "stored" | "ephemeral" | undefined,
      actorKind: item["actorKind"] as AuditEntry["actorKind"],
      actorId: item["actorId"] as string | undefined,
      profileName: item["profileName"] as string | undefined,
    };
  }
}

// ---------------------------------------------------------------------------
// SQLite backend (local mode) — same contract, one table in workspace.db,
// with a lazy 30-day purge standing in for DynamoDB's TTL.
// ---------------------------------------------------------------------------

const loadSqlite = (): typeof import("better-sqlite3") => {
  const req =
    typeof require === "function" ? require : createRequire(import.meta.url);
  return req("better-sqlite3");
};

export class AuditStoreSqlite implements IAuditStore {
  private readonly database: import("better-sqlite3").Database;

  constructor(
    directory = workspaceDataDir(),
  ) {
    mkdirSync(directory, { recursive: true, mode: 0o700 });
    const SqliteDatabase = loadSqlite();
    this.database = new SqliteDatabase(join(directory, "workspace.db"));
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS audit_log (
        id TEXT PRIMARY KEY,
        ts TEXT NOT NULL,
        request_id TEXT NOT NULL,
        workspace_id TEXT NOT NULL,
        caller_id TEXT NOT NULL,
        provider TEXT NOT NULL,
        operation TEXT NOT NULL,
        status INTEGER NOT NULL,
        duration_ms INTEGER,
        result TEXT NOT NULL,
        mcp_tool_name TEXT,
        credential_id TEXT,
        credential_level TEXT,
        credential_source TEXT,
        actor_kind TEXT,
        actor_id TEXT,
        profile_name TEXT
      );
      CREATE INDEX IF NOT EXISTS audit_log_ws_ts ON audit_log(workspace_id, ts DESC);
    `);
    // Pre-attribution (IW-9 F3) databases lack the credential/actor columns;
    // add them in place (the created_by pattern in credentials.ts).
    for (const column of [
      "credential_id TEXT",
      "credential_level TEXT",
      "credential_source TEXT",
      "actor_kind TEXT",
      "actor_id TEXT",
      "profile_name TEXT",
    ]) {
      try {
        this.database.exec(`ALTER TABLE audit_log ADD COLUMN ${column}`);
      } catch {
        // Column already exists.
      }
    }
    this.database
      .prepare(`DELETE FROM audit_log WHERE ts < ?`)
      .run(new Date(Date.now() - TTL_30_DAYS_MS).toISOString());
  }

  append(entry: Omit<AuditEntry, "id" | "ts" | "result">): void {
    try {
      this.database
        .prepare(
          `INSERT INTO audit_log
           (id, ts, request_id, workspace_id, caller_id, provider, operation, status, duration_ms, result, mcp_tool_name,
            credential_id, credential_level, credential_source, actor_kind, actor_id, profile_name)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .run(
          crypto.randomUUID(),
          new Date().toISOString(),
          entry.requestId,
          entry.workspaceId,
          entry.callerId,
          entry.provider,
          entry.operation,
          entry.status,
          entry.durationMs ?? null,
          entry.status === 403 ? "forbidden" : entry.status < 400 ? "success" : "error",
          entry.mcp_tool_name ?? null,
          entry.credentialId ?? null,
          entry.credentialLevel ?? null,
          entry.credentialSource ?? null,
          entry.actorKind ?? null,
          entry.actorId ?? null,
          entry.profileName ?? null,
        );
    } catch (err) {
      console.error("[AuditStoreSqlite] append failed:", err);
    }
  }

  async recent(opts: {
    workspaceId: string;
    limit?: number;
    callerId?: string;
    provider?: string;
  }): Promise<AuditEntry[]> {
    const { workspaceId, limit = 100, callerId, provider } = opts;
    const clauses = ["workspace_id = ?"];
    const params: unknown[] = [workspaceId];
    if (callerId !== undefined) {
      clauses.push("caller_id = ?");
      params.push(callerId);
    }
    if (provider !== undefined) {
      clauses.push("provider = ?");
      params.push(provider);
    }
    const rows = this.database
      .prepare(
        `SELECT * FROM audit_log WHERE ${clauses.join(" AND ")}
         ORDER BY ts DESC LIMIT ?`,
      )
      .all(...params, limit) as Record<string, unknown>[];
    return rows.map((row) => ({
      id: String(row["id"]),
      ts: String(row["ts"]),
      requestId: String(row["request_id"]),
      workspaceId: String(row["workspace_id"]),
      callerId: String(row["caller_id"]),
      provider: String(row["provider"]),
      operation: String(row["operation"]),
      status: Number(row["status"]),
      durationMs: row["duration_ms"] === null ? undefined : Number(row["duration_ms"]),
      result: String(row["result"]) as AuditEntry["result"],
      mcp_tool_name: row["mcp_tool_name"] === null ? undefined : String(row["mcp_tool_name"]),
      // Attribution columns (IW-9 F3) are NULL on pre-change rows and absent
      // entirely on a not-yet-migrated table — both read back as undefined.
      credentialId: typeof row["credential_id"] === "string" ? row["credential_id"] : undefined,
      credentialLevel:
        typeof row["credential_level"] === "string"
          ? (row["credential_level"] as CredentialLevel)
          : undefined,
      credentialSource:
        typeof row["credential_source"] === "string"
          ? (row["credential_source"] as "stored" | "ephemeral")
          : undefined,
      actorKind:
        typeof row["actor_kind"] === "string"
          ? (row["actor_kind"] as AuditEntry["actorKind"])
          : undefined,
      actorId: typeof row["actor_id"] === "string" ? row["actor_id"] : undefined,
      profileName: typeof row["profile_name"] === "string" ? row["profile_name"] : undefined,
    }));
  }
}

// ---------------------------------------------------------------------------
// Aurora DSQL backend — same contract on the audit_log table from
// db/dsql-schema.sql. The 30-day retention is a periodic sweep (leader-leased
// schedule; also runnable ad hoc) since DSQL has no native TTL; `recent()`
// additionally filters reads so an overdue sweep can't surface stale rows.
// ---------------------------------------------------------------------------

export class AuditStoreDsql implements IAuditStore {
  private async db(): Promise<typeof import("./db/dsql.js")> {
    return import("./db/dsql.js");
  }

  append(entry: Omit<AuditEntry, "id" | "ts" | "result">): void {
    const id = crypto.randomUUID();
    const ts = new Date().toISOString();
    const result =
      entry.status === 403 ? "forbidden" : entry.status < 400 ? "success" : "error";
    // Fire-and-forget: resolving the driver rides the same detached promise,
    // so an audit write never blocks (or fails) the request path.
    void (async () => {
      const { dsqlQuery, withOccRetry } = await this.db();
      await withOccRetry(() =>
        dsqlQuery(
          `INSERT INTO audit_log
           (workspace_id, ts, id, request_id, caller_id, provider, operation, status, duration_ms, result, mcp_tool_name,
            credential_id, credential_level, credential_source, actor_kind, actor_id, profile_name)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
          [
            entry.workspaceId,
            ts,
            id,
            entry.requestId,
            entry.callerId,
            entry.provider,
            entry.operation,
            entry.status,
            entry.durationMs ?? null,
            result,
            entry.mcp_tool_name ?? null,
            entry.credentialId ?? null,
            entry.credentialLevel ?? null,
            entry.credentialSource ?? null,
            entry.actorKind ?? null,
            entry.actorId ?? null,
            entry.profileName ?? null,
          ],
        ),
      );
    })().catch((err: unknown) => {
      console.error("[AuditStoreDsql] append failed:", err);
    });
  }

  async recent(opts: {
    workspaceId: string;
    limit?: number;
    callerId?: string;
    provider?: string;
  }): Promise<AuditEntry[]> {
    const { workspaceId, limit = 100, callerId, provider } = opts;
    const { dsqlQuery } = await this.db();
    const clauses = ["workspace_id = $1", "ts >= $2"];
    const params: unknown[] = [
      workspaceId,
      new Date(Date.now() - TTL_30_DAYS_MS).toISOString(),
    ];
    if (callerId !== undefined) {
      params.push(callerId);
      clauses.push(`caller_id = $${params.length}`);
    }
    if (provider !== undefined) {
      params.push(provider);
      clauses.push(`provider = $${params.length}`);
    }
    params.push(limit);
    const result = await dsqlQuery(
      `SELECT * FROM audit_log WHERE ${clauses.join(" AND ")}
       ORDER BY ts DESC LIMIT $${params.length}`,
      params,
    );
    return result.rows.map((row) => ({
      id: String(row["id"]),
      ts: String(row["ts"]),
      requestId: String(row["request_id"]),
      workspaceId: String(row["workspace_id"]),
      callerId: String(row["caller_id"]),
      provider: String(row["provider"]),
      operation: String(row["operation"]),
      status: Number(row["status"]),
      durationMs: row["duration_ms"] === null ? undefined : Number(row["duration_ms"]),
      result: String(row["result"]) as AuditEntry["result"],
      mcp_tool_name: row["mcp_tool_name"] === null ? undefined : String(row["mcp_tool_name"]),
      // Attribution columns (IW-9 F3) are NULL on pre-change rows and absent
      // entirely on a not-yet-migrated table — both read back as undefined.
      credentialId: typeof row["credential_id"] === "string" ? row["credential_id"] : undefined,
      credentialLevel:
        typeof row["credential_level"] === "string"
          ? (row["credential_level"] as CredentialLevel)
          : undefined,
      credentialSource:
        typeof row["credential_source"] === "string"
          ? (row["credential_source"] as "stored" | "ephemeral")
          : undefined,
      actorKind:
        typeof row["actor_kind"] === "string"
          ? (row["actor_kind"] as AuditEntry["actorKind"])
          : undefined,
      actorId: typeof row["actor_id"] === "string" ? row["actor_id"] : undefined,
      profileName: typeof row["profile_name"] === "string" ? row["profile_name"] : undefined,
    }));
  }

  /** Delete rows past the 30-day retention. Chunked to stay inside DSQL's
   *  3,000-row transaction cap; loops until the backlog is clear. */
  async sweepExpired(): Promise<number> {
    const { dsqlQuery, withOccRetry } = await this.db();
    const cutoff = new Date(Date.now() - TTL_30_DAYS_MS).toISOString();
    let total = 0;
    for (;;) {
      const batch = await dsqlQuery(
        `SELECT workspace_id, ts, id FROM audit_log WHERE ts < $1 LIMIT 1000`,
        [cutoff],
      );
      if (batch.rows.length === 0) return total;
      await withOccRetry(async () => {
        for (const row of batch.rows) {
          await dsqlQuery(
            `DELETE FROM audit_log WHERE workspace_id = $1 AND ts = $2 AND id = $3`,
            [row["workspace_id"], row["ts"], row["id"]],
          );
        }
      });
      total += batch.rows.length;
    }
  }
}

// ---------------------------------------------------------------------------
// Singleton factory
// ---------------------------------------------------------------------------

let _store: IAuditStore | undefined;

/** Resolve the singleton audit store (backend chosen by runtime/config.ts,
 *  like the FS, record, and credential stores). */
export function getAuditStore(): IAuditStore {
  _store ??= (() => {
    switch (storeBackend()) {
      case "dsql":
        return new AuditStoreDsql();
      case "sqlite":
        return new AuditStoreSqlite();
    }
  })();
  return _store;
}

export function resetAuditStore(): void {
  _store = undefined;
}

/**
 * Relational identity backend — the from-scratch schema (tech-plan D5,
 * specs/identity-store "Relational identity schema"): real columns for
 * yesterday's composite keys, app-layer referential integrity (DSQL has no
 * foreign keys).
 *
 * ONE store implementation over a two-method async SQL seam; `sqlite`
 * (better-sqlite3 on workspace.db, local mode) and `dsql` (db/dsql.ts pool,
 * `?` → `$n` rewrite, OCC retry) each provide an adapter — the same shape as
 * @aprovan/registry-server's SqlClient seam. The table set mirrors
 * db/dsql-schema.sql exactly.
 */

import { createHash, randomBytes } from "node:crypto";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { workspaceDataDir } from "../runtime/config.js";
import type {
  GroupRecord,
  IIdentityStore,
  InviteRecord,
  MembershipRecord,
  Permission,
  UserRecord,
  WorkspaceRecord,
} from "./types.js";

export interface IdentitySqlClient {
  all<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]>;
  run(sql: string, params?: unknown[]): Promise<{ changes: number }>;
}

const INVITE_TTL_SECONDS = 7 * 24 * 3600;

const DEFAULT_SESSION_TTL_SECONDS = (): number => {
  const raw = Number(process.env["GATEWAY_SESSION_TTL_SECONDS"]);
  return Number.isFinite(raw) && raw > 0 ? raw : 604_800; // 7 days
};

const nowEpoch = (): number => Math.floor(Date.now() / 1000);

// ---------------------------------------------------------------------------
// Adapters
// ---------------------------------------------------------------------------

const loadSqlite = (): typeof import("better-sqlite3") => {
  const req = typeof require === "function" ? require : createRequire(import.meta.url);
  return req("better-sqlite3");
};

/** Identity DDL for SQLite — the dsql-schema.sql tables in SQLite dialect. */
const SQLITE_IDENTITY_DDL = `
CREATE TABLE IF NOT EXISTS users (
  sub TEXT PRIMARY KEY, email TEXT, name TEXT, active_workspace_id TEXT,
  created_at TEXT, updated_at TEXT
);
CREATE INDEX IF NOT EXISTS users_by_email ON users(email);
CREATE TABLE IF NOT EXISTS workspaces (
  workspace_id TEXT PRIMARY KEY, name TEXT, plan TEXT, created_at TEXT, updated_at TEXT
);
CREATE TABLE IF NOT EXISTS memberships (
  workspace_id TEXT NOT NULL, user_id TEXT NOT NULL, role TEXT NOT NULL, created_at TEXT,
  PRIMARY KEY (workspace_id, user_id)
);
CREATE INDEX IF NOT EXISTS memberships_by_user ON memberships(user_id);
CREATE TABLE IF NOT EXISTS user_sessions (
  user_id TEXT PRIMARY KEY, current_workspace_id TEXT, expires_at INTEGER
);
CREATE TABLE IF NOT EXISTS invites (
  invite_token TEXT PRIMARY KEY, email TEXT NOT NULL, workspace_id TEXT NOT NULL,
  role TEXT, group_ids TEXT, invited_by TEXT, created_at TEXT, expires_at INTEGER
);
CREATE INDEX IF NOT EXISTS invites_by_email_workspace ON invites(email, workspace_id);
CREATE INDEX IF NOT EXISTS invites_by_workspace ON invites(workspace_id);
CREATE TABLE IF NOT EXISTS groups (
  workspace_id TEXT NOT NULL, group_id TEXT NOT NULL, name TEXT NOT NULL,
  description TEXT, created_by TEXT, created_at TEXT, updated_at TEXT,
  PRIMARY KEY (workspace_id, group_id)
);
CREATE TABLE IF NOT EXISTS group_members (
  workspace_id TEXT NOT NULL, group_id TEXT NOT NULL, user_id TEXT NOT NULL,
  added_by TEXT, created_at TEXT,
  PRIMARY KEY (workspace_id, group_id, user_id)
);
CREATE INDEX IF NOT EXISTS group_members_by_user ON group_members(workspace_id, user_id);
CREATE TABLE IF NOT EXISTS permissions (
  workspace_id TEXT NOT NULL, caller_id TEXT NOT NULL, provider TEXT NOT NULL,
  operation TEXT NOT NULL, perm_id TEXT NOT NULL, granted_by TEXT, created_at TEXT,
  PRIMARY KEY (workspace_id, caller_id, provider, operation)
);
CREATE INDEX IF NOT EXISTS permissions_by_perm_id ON permissions(workspace_id, perm_id);
CREATE TABLE IF NOT EXISTS api_keys (
  workspace_id TEXT NOT NULL, key_id TEXT NOT NULL, name TEXT, caller_id TEXT,
  secret_hash TEXT NOT NULL, created_by TEXT, created_at TEXT, expires_at INTEGER,
  PRIMARY KEY (workspace_id, key_id)
);
CREATE INDEX IF NOT EXISTS api_keys_by_secret ON api_keys(secret_hash);
`;

export function createSqliteIdentityClient(directory = workspaceDataDir()): IdentitySqlClient {
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const SqliteDatabase = loadSqlite();
  const db = new SqliteDatabase(join(directory, "workspace.db"));
  db.exec(SQLITE_IDENTITY_DDL);
  return {
    async all<T>(sql: string, params: unknown[] = []): Promise<T[]> {
      return db.prepare(sql).all(...params) as T[];
    },
    async run(sql, params = []) {
      const info = db.prepare(sql).run(...params);
      return { changes: info.changes };
    },
  };
}

export function createDsqlIdentityClient(): IdentitySqlClient {
  const toPg = (sql: string): string => {
    let index = 0;
    return sql.replace(/\?/gu, () => `$${++index}`);
  };
  return {
    async all<T>(sql: string, params: unknown[] = []): Promise<T[]> {
      const { dsqlQuery, withOccRetry } = await import("../db/dsql.js");
      const result = await withOccRetry(() => dsqlQuery(toPg(sql), params));
      return result.rows as T[];
    },
    async run(sql, params = []) {
      const { dsqlQuery, withOccRetry } = await import("../db/dsql.js");
      const result = await withOccRetry(() => dsqlQuery(toPg(sql), params));
      return { changes: result.rowCount ?? 0 };
    },
  };
}

// ---------------------------------------------------------------------------
// Row mappers
// ---------------------------------------------------------------------------

const str = (v: unknown): string | undefined => (typeof v === "string" ? v : undefined);

function toMembership(row: Record<string, unknown>): MembershipRecord {
  return {
    workspaceId: String(row["workspace_id"]),
    userId: String(row["user_id"]),
    role: str(row["role"]),
    createdAt: str(row["created_at"]),
  };
}

function toGroup(row: Record<string, unknown>): GroupRecord {
  return {
    workspaceId: String(row["workspace_id"]),
    groupId: String(row["group_id"]),
    name: String(row["name"]),
    description: str(row["description"]),
    createdAt: String(row["created_at"]),
    updatedAt: String(row["updated_at"]),
  };
}

function toInvite(row: Record<string, unknown>): InviteRecord {
  let groupIds: string[] = [];
  try {
    const parsed = JSON.parse(String(row["group_ids"] ?? "[]")) as unknown;
    if (Array.isArray(parsed)) groupIds = parsed.filter((g): g is string => typeof g === "string");
  } catch {
    // Malformed group list — treat as none.
  }
  return {
    inviteToken: String(row["invite_token"]),
    workspaceId: String(row["workspace_id"]),
    email: String(row["email"]),
    role: String(row["role"] ?? "member"),
    groupIds,
    invitedBy: String(row["invited_by"] ?? ""),
    createdAt: String(row["created_at"] ?? ""),
    expiresAt: Number(row["expires_at"]),
  };
}

function toPermission(row: Record<string, unknown>): Permission {
  return {
    id: String(row["perm_id"]),
    workspaceId: String(row["workspace_id"]),
    callerId: String(row["caller_id"]),
    provider: String(row["provider"]),
    operation: String(row["operation"]),
    grantedAt: String(row["created_at"] ?? ""),
    grantedBy: String(row["granted_by"] ?? ""),
  };
}

// ---------------------------------------------------------------------------
// The store
// ---------------------------------------------------------------------------

export function createIdentityStoreSql(client: IdentitySqlClient): IIdentityStore {
  const getMembership = async (
    workspaceId: string,
    userId: string,
  ): Promise<MembershipRecord | undefined> => {
    const rows = await client.all(
      `SELECT * FROM memberships WHERE workspace_id = ? AND user_id = ?`,
      [workspaceId, userId],
    );
    return rows[0] ? toMembership(rows[0]) : undefined;
  };

  const getInvite = async (inviteToken: string): Promise<InviteRecord | undefined> => {
    const rows = await client.all(
      `SELECT * FROM invites WHERE invite_token = ? AND expires_at > ?`,
      [inviteToken, nowEpoch()],
    );
    return rows[0] ? toInvite(rows[0]) : undefined;
  };

  const getGroup = async (
    workspaceId: string,
    groupId: string,
  ): Promise<GroupRecord | undefined> => {
    const rows = await client.all(
      `SELECT * FROM groups WHERE workspace_id = ? AND group_id = ?`,
      [workspaceId, groupId],
    );
    return rows[0] ? toGroup(rows[0]) : undefined;
  };

  return {
    users: {
      async getActiveWorkspaceId(sub) {
        const rows = await client.all(
          `SELECT active_workspace_id FROM users WHERE sub = ?`,
          [sub],
        );
        return str(rows[0]?.["active_workspace_id"]);
      },
      async setActiveWorkspaceId(sub, workspaceId) {
        await client.run(
          `INSERT INTO users (sub, active_workspace_id, updated_at) VALUES (?, ?, ?)
           ON CONFLICT (sub) DO UPDATE SET active_workspace_id = ?, updated_at = ?`,
          [sub, workspaceId, new Date().toISOString(), workspaceId, new Date().toISOString()],
        );
      },
      async upsert(user: UserRecord) {
        await client.run(
          `INSERT INTO users (sub, email, name, active_workspace_id, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?)
           ON CONFLICT (sub) DO UPDATE SET
             email = ?, name = ?, active_workspace_id = ?, updated_at = ?`,
          [
            user.sub,
            user.email ?? null,
            user.name ?? null,
            user.activeWorkspaceId ?? null,
            user.createdAt ?? new Date().toISOString(),
            user.updatedAt ?? new Date().toISOString(),
            user.email ?? null,
            user.name ?? null,
            user.activeWorkspaceId ?? null,
            user.updatedAt ?? new Date().toISOString(),
          ],
        );
      },
    },

    workspaces: {
      async get(workspaceId) {
        const rows = await client.all(
          `SELECT * FROM workspaces WHERE workspace_id = ?`,
          [workspaceId],
        );
        const row = rows[0];
        if (!row) return undefined;
        return {
          workspaceId: String(row["workspace_id"]),
          name: String(row["name"] ?? ""),
          plan: str(row["plan"]),
          createdAt: str(row["created_at"]),
          updatedAt: str(row["updated_at"]),
        };
      },
      async getMany(workspaceIds) {
        const results: WorkspaceRecord[] = [];
        for (const id of workspaceIds) {
          const workspace = await this.get(id);
          if (workspace) results.push(workspace);
        }
        return results;
      },
      async put(workspace) {
        await client.run(
          `INSERT INTO workspaces (workspace_id, name, plan, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?)
           ON CONFLICT (workspace_id) DO UPDATE SET name = ?, plan = ?, updated_at = ?`,
          [
            workspace.workspaceId,
            workspace.name,
            workspace.plan ?? null,
            workspace.createdAt ?? new Date().toISOString(),
            workspace.updatedAt ?? new Date().toISOString(),
            workspace.name,
            workspace.plan ?? null,
            workspace.updatedAt ?? new Date().toISOString(),
          ],
        );
      },
    },

    memberships: {
      get: getMembership,
      async listByWorkspace(workspaceId) {
        const rows = await client.all(
          `SELECT * FROM memberships WHERE workspace_id = ? ORDER BY user_id`,
          [workspaceId],
        );
        return rows.map(toMembership);
      },
      async listByUser(userId) {
        const rows = await client.all(
          `SELECT * FROM memberships WHERE user_id = ? ORDER BY workspace_id`,
          [userId],
        );
        return rows.map(toMembership);
      },
      async put(record) {
        const role = record.role ?? "member";
        const createdAt = record.createdAt ?? new Date().toISOString();
        await client.run(
          `INSERT INTO memberships (workspace_id, user_id, role, created_at)
           VALUES (?, ?, ?, ?)
           ON CONFLICT (workspace_id, user_id) DO UPDATE SET role = ?`,
          [record.workspaceId, record.userId, role, createdAt, role],
        );
      },
      async remove(workspaceId, userId) {
        const result = await client.run(
          `DELETE FROM memberships WHERE workspace_id = ? AND user_id = ?`,
          [workspaceId, userId],
        );
        return result.changes > 0;
      },
    },

    sessions: {
      async getCurrentWorkspace(userId) {
        const rows = await client.all(
          `SELECT current_workspace_id, expires_at FROM user_sessions WHERE user_id = ?`,
          [userId],
        );
        const row = rows[0];
        if (!row) return undefined;
        const expiresAt = row["expires_at"];
        if (typeof expiresAt === "number" && expiresAt <= nowEpoch()) return undefined;
        return str(row["current_workspace_id"]);
      },
      async setCurrentWorkspace(userId, workspaceId, ttlSeconds) {
        const expiresAt = nowEpoch() + (ttlSeconds ?? DEFAULT_SESSION_TTL_SECONDS());
        await client.run(
          `INSERT INTO user_sessions (user_id, current_workspace_id, expires_at)
           VALUES (?, ?, ?)
           ON CONFLICT (user_id) DO UPDATE SET current_workspace_id = ?, expires_at = ?`,
          [userId, workspaceId, expiresAt, workspaceId, expiresAt],
        );
      },
    },

    invites: {
      async create(workspaceId, email, role, groupIds, invitedBy) {
        const record: InviteRecord = {
          inviteToken: randomBytes(32).toString("hex"),
          workspaceId,
          email: email.toLowerCase().trim(),
          role: role || "member",
          groupIds: groupIds ?? [],
          invitedBy,
          createdAt: new Date().toISOString(),
          expiresAt: nowEpoch() + INVITE_TTL_SECONDS,
        };
        await client.run(
          `INSERT INTO invites
           (invite_token, email, workspace_id, role, group_ids, invited_by, created_at, expires_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            record.inviteToken,
            record.email,
            record.workspaceId,
            record.role,
            JSON.stringify(record.groupIds),
            record.invitedBy,
            record.createdAt,
            record.expiresAt,
          ],
        );
        return record;
      },
      get: getInvite,
      async listByWorkspace(workspaceId) {
        const rows = await client.all(
          `SELECT * FROM invites WHERE workspace_id = ? AND expires_at > ? ORDER BY created_at`,
          [workspaceId, nowEpoch()],
        );
        return rows.map(toInvite);
      },
      async revoke(inviteToken) {
        const existing = await getInvite(inviteToken);
        if (!existing) return false;
        await client.run(`DELETE FROM invites WHERE invite_token = ?`, [inviteToken]);
        return true;
      },
      async consume(inviteToken) {
        const invite = await getInvite(inviteToken);
        if (!invite) return undefined;
        await client.run(`DELETE FROM invites WHERE invite_token = ?`, [inviteToken]);
        return invite;
      },
    },

    groups: {
      async create(workspaceId, name, description) {
        const groupId = randomBytes(12).toString("hex");
        const now = new Date().toISOString();
        await client.run(
          `INSERT INTO groups (workspace_id, group_id, name, description, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [workspaceId, groupId, name, description ?? null, now, now],
        );
        return { workspaceId, groupId, name, description, createdAt: now, updatedAt: now };
      },
      async list(workspaceId) {
        const rows = await client.all(
          `SELECT * FROM groups WHERE workspace_id = ? ORDER BY group_id`,
          [workspaceId],
        );
        return rows.map(toGroup);
      },
      get: getGroup,
      async update(workspaceId, groupId, patch) {
        const existing = await getGroup(workspaceId, groupId);
        if (!existing) return undefined;
        const next: GroupRecord = {
          ...existing,
          ...(patch.name !== undefined ? { name: patch.name } : {}),
          ...(patch.description !== undefined ? { description: patch.description } : {}),
          updatedAt: new Date().toISOString(),
        };
        await client.run(
          `UPDATE groups SET name = ?, description = ?, updated_at = ?
           WHERE workspace_id = ? AND group_id = ?`,
          [next.name, next.description ?? null, next.updatedAt, workspaceId, groupId],
        );
        return next;
      },
      async remove(workspaceId, groupId) {
        const result = await client.run(
          `DELETE FROM groups WHERE workspace_id = ? AND group_id = ?`,
          [workspaceId, groupId],
        );
        if (result.changes === 0) return false;
        // App-layer integrity: memberships die with the group. Profile
        // grants held by the group live in registry-server storage and stop
        // matching once the group id no longer resolves for any principal.
        await client.run(
          `DELETE FROM group_members WHERE workspace_id = ? AND group_id = ?`,
          [workspaceId, groupId],
        );
        return true;
      },

      members: {
        async add(workspaceId, groupId, userId) {
          await client.run(
            `INSERT INTO group_members (workspace_id, group_id, user_id, created_at)
             VALUES (?, ?, ?, ?)
             ON CONFLICT (workspace_id, group_id, user_id) DO NOTHING`,
            [workspaceId, groupId, userId, new Date().toISOString()],
          );
        },
        async remove(workspaceId, groupId, userId) {
          const result = await client.run(
            `DELETE FROM group_members WHERE workspace_id = ? AND group_id = ? AND user_id = ?`,
            [workspaceId, groupId, userId],
          );
          return result.changes > 0;
        },
        async listGroupIdsForUser(workspaceId, userId) {
          const rows = await client.all(
            `SELECT group_id FROM group_members WHERE workspace_id = ? AND user_id = ? ORDER BY group_id`,
            [workspaceId, userId],
          );
          return rows.map((row) => String(row["group_id"]));
        },
        async listUserIdsForGroup(workspaceId, groupId) {
          const rows = await client.all(
            `SELECT user_id FROM group_members WHERE workspace_id = ? AND group_id = ? ORDER BY user_id`,
            [workspaceId, groupId],
          );
          return rows.map((row) => String(row["user_id"]));
        },
      },

    },

    permissions: {
      async grant(workspaceId, input) {
        const id = randomBytes(12).toString("hex");
        const now = new Date().toISOString();
        // Re-granting the same tuple overwrites in place (idempotent), with a
        // fresh perm id — mirroring the Dynamo SK-encoded behavior.
        await client.run(
          `INSERT INTO permissions
           (workspace_id, caller_id, provider, operation, perm_id, granted_by, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT (workspace_id, caller_id, provider, operation)
           DO UPDATE SET perm_id = ?, granted_by = ?, created_at = ?`,
          [
            workspaceId,
            input.callerId,
            input.provider,
            input.operation,
            id,
            input.grantedBy,
            now,
            id,
            input.grantedBy,
            now,
          ],
        );
        return {
          id,
          workspaceId,
          callerId: input.callerId,
          provider: input.provider,
          operation: input.operation,
          grantedAt: now,
          grantedBy: input.grantedBy,
        };
      },
      async revoke(workspaceId, id) {
        const result = await client.run(
          `DELETE FROM permissions WHERE workspace_id = ? AND perm_id = ?`,
          [workspaceId, id],
        );
        return result.changes > 0;
      },
      async list(workspaceId, callerId) {
        const rows = callerId
          ? await client.all(
              `SELECT * FROM permissions WHERE workspace_id = ? AND caller_id = ?
               ORDER BY caller_id, provider, operation`,
              [workspaceId, callerId],
            )
          : await client.all(
              `SELECT * FROM permissions WHERE workspace_id = ?
               ORDER BY caller_id, provider, operation`,
              [workspaceId],
            );
        return rows.map(toPermission);
      },
      async check(workspaceId, callerId, provider, operation) {
        const rows = await client.all(
          `SELECT 1 AS hit FROM permissions
           WHERE workspace_id = ? AND caller_id = ? AND provider = ?
             AND operation IN (?, '*') LIMIT 1`,
          [workspaceId, callerId, provider, operation],
        );
        return rows.length > 0;
      },
    },

    apiKeys: {
      async create(workspaceId, input) {
        const keyId = randomBytes(8).toString("hex");
        const secret = `apw_${randomBytes(24).toString("base64url")}`;
        const record = {
          workspaceId,
          keyId,
          name: input.name,
          callerId: input.callerId,
          createdBy: input.createdBy,
          createdAt: new Date().toISOString(),
          expiresAt: input.expiresAt,
        };
        await client.run(
          `INSERT INTO api_keys
           (workspace_id, key_id, name, caller_id, secret_hash, created_by, created_at, expires_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            workspaceId,
            keyId,
            input.name ?? null,
            input.callerId ?? null,
            createHash("sha256").update(secret).digest("hex"),
            input.createdBy ?? null,
            record.createdAt,
            input.expiresAt ?? null,
          ],
        );
        return { record, secret };
      },
      async list(workspaceId) {
        const rows = await client.all(
          `SELECT * FROM api_keys WHERE workspace_id = ? ORDER BY created_at`,
          [workspaceId],
        );
        return rows.map((row) => ({
          workspaceId: String(row["workspace_id"]),
          keyId: String(row["key_id"]),
          name: str(row["name"]),
          callerId: str(row["caller_id"]),
          createdBy: str(row["created_by"]),
          createdAt: String(row["created_at"] ?? ""),
          expiresAt: row["expires_at"] === null ? undefined : Number(row["expires_at"]),
        }));
      },
      async verify(secret) {
        const digest = createHash("sha256").update(secret).digest("hex");
        const rows = await client.all(
          `SELECT * FROM api_keys WHERE secret_hash = ? LIMIT 1`,
          [digest],
        );
        const row = rows[0];
        if (!row) return undefined;
        const expiresAt = row["expires_at"];
        if (typeof expiresAt === "number" && expiresAt <= nowEpoch()) return undefined;
        return {
          workspaceId: String(row["workspace_id"]),
          keyId: String(row["key_id"]),
          name: str(row["name"]),
          callerId: str(row["caller_id"]),
          createdBy: str(row["created_by"]),
          createdAt: String(row["created_at"] ?? ""),
          expiresAt: expiresAt === null ? undefined : Number(expiresAt),
        };
      },
      async revoke(workspaceId, keyId) {
        const result = await client.run(
          `DELETE FROM api_keys WHERE workspace_id = ? AND key_id = ?`,
          [workspaceId, keyId],
        );
        return result.changes > 0;
      },
    },
  };
}

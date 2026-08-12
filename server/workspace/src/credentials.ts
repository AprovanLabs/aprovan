/**
 * Credential storage — backends behind `ICredentialStore`, selected by
 * `storeBackend()` (runtime/config.ts):
 *
 * - `sqlite` — local mode.
 * - `dsql` — the credential store of record is `@aprovan/registry-server`'s
 *   storage (its `credentials` table with `created_by`, over its SqlClient
 *   seam). The workspace does NOT grow a second DSQL credential schema;
 *   `CredentialStoreRegistry` adapts the package storage to this interface
 *   over the shared db/dsql.ts pool.
 *
 * `CredentialStoreDynamodb` remains for snapshot/cutover tooling and
 * dynamodb-local contract tests only — it is not wired into the factory.
 *
 * Credentials carry a `createdBy` user dimension (tech-plan D5) — the frozen
 * seam WS-3's Profiles reference.
 *
 * Supported credential types: bearer_token, api_key, oauth2_client, oauth2_authcode
 *
 * The public API is async so callers `await` every method.
 */

import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import type { CredentialType } from "@utdk/common/auth";
import type { CredentialPayload } from "@aprovan/registry-server";
import { getCredentialCipher } from "./credentialCipher.js";
import { dynamo } from "./db/client.js";
import { getRegistryStorage } from "./registry-storage.js";
import { storeBackend, workspaceDataDir } from "./runtime/config.js";
import type Database from "better-sqlite3";

const loadSqlite = (): typeof import("better-sqlite3") => {
  const req =
    typeof require === "function" ? require : createRequire(import.meta.url);
  return req("better-sqlite3");
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Payload shapes are OWNED by `@aprovan/registry-server` (its
 * `credentials/types`) and re-exported here so the workspace has exactly one
 * definition. Redeclaring them locally silently drifts and produces
 * type-identity errors at every `resolveToInjectable` boundary — which is
 * precisely what happened before the 0.2.5 pin. Do not reintroduce copies;
 * extend the package instead.
 *
 * `CredentialType` is the shared WS-2 tuple from `@utdk/common/auth`, the same
 * source registry-server re-exports.
 */
export type { CredentialType } from "@utdk/common/auth";
export type {
  ApiKeyPayload,
  BearerTokenPayload,
  CredentialPayload,
  OAuth2AuthCodePayload,
  OAuth2ClientPayload,
  OAuthClientOrigin,
} from "@aprovan/registry-server";

export interface CredentialInput {
  provider: string;
  label?: string;
  payload: CredentialPayload;
  /** Creating user's sub (tech-plan D5) — the Profiles ownership seam. */
  createdBy?: string;
}

export interface CredentialRecord {
  id: string;
  workspaceId: string;
  provider: string;
  label?: string;
  type: CredentialType;
  /** Creating user's sub; undefined = legacy/tenant-shared row. */
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Store interface
// ---------------------------------------------------------------------------

export interface ICredentialStore {
  create(workspaceId: string, input: CredentialInput): Promise<CredentialRecord>;
  list(workspaceId: string): Promise<CredentialRecord[]>;
  get(workspaceId: string, id: string): Promise<CredentialRecord | undefined>;
  delete(workspaceId: string, id: string): Promise<boolean>;
  /** Return the raw payload for a credential. Internal use only. */
  getPayload(workspaceId: string, id: string): Promise<CredentialPayload | undefined>;
  /**
   * Find and return the first credential payload for a given provider in the
   * workspace. Used by the tool proxy to inject credentials at call time.
   */
  resolveForProvider(workspaceId: string, provider: string): Promise<CredentialPayload | undefined>;
  /**
   * Like `resolveForProvider` but includes the credential id so callers can
   * persist payload updates (e.g. refreshed OAuth tokens).
   */
  resolveRecordForProvider(
    workspaceId: string,
    provider: string,
  ): Promise<{ id: string; payload: CredentialPayload } | undefined>;
  /**
   * Resolve one specific credential, provider included.
   *
   * `resolveRecordForProvider` answers "a credential for GitHub"; this answers
   * "*that* credential". The storage layer has always allowed several
   * credentials per provider (Dynamo keys them `CRED#<provider>#<credId>`),
   * but with provider-only resolution the second Postgres connection string a
   * workspace saved was write-only — stored, listed, and never reachable. An
   * interface instance binds a credential id, so this is how it dispatches.
   */
  resolveRecordById(
    workspaceId: string,
    credentialId: string,
  ): Promise<{ id: string; provider: string; payload: CredentialPayload } | undefined>;
  /** Replace a credential's payload in place (OAuth token refresh). */
  updatePayload(workspaceId: string, id: string, payload: CredentialPayload): Promise<void>;
}

// ---------------------------------------------------------------------------
// DynamoDB backend (single-table design, APR-318)
// ---------------------------------------------------------------------------

/**
 * DynamoDB-backed credential store using the single-table schema in
 * `db/schema.ts` (`Credentials`):
 *   - `PK = WS#<workspaceId>`
 *   - `SK = CRED#<provider>#<credId>`  (the record)
 *   - `SK = CREDID#<credId>`           (a pointer credId → provider)
 *
 * `get`/`delete`/`getPayload` take `(wsId, credId)` without a provider, so they
 * read the pointer first, then the record (two reads on this cold path). The
 * hot path — `resolveForProvider(wsId, provider)` — queries the partition with
 * `begins_with(SK, "CRED#<provider>#")` in one round trip.
 *
 * Payloads are sealed with the credential cipher (KMS envelope in prod, see
 * credentialCipher.ts) on top of DynamoDB SSE; legacy plaintext rows decrypt
 * as themselves and re-encrypt on their next write.
 */
export class CredentialStoreDynamodb implements ICredentialStore {
  private readonly tableName: string;

  constructor(tableName?: string) {
    this.tableName = tableName ?? process.env["CREDENTIALS_TABLE"] ?? "Credentials";
  }

  async create(workspaceId: string, input: CredentialInput): Promise<CredentialRecord> {
    const id = randomBytes(12).toString("hex");
    const now = new Date().toISOString();
    const item: Record<string, unknown> = {
      PK: `WS#${workspaceId}`,
      SK: `CRED#${input.provider}#${id}`,
      id,
      workspaceId,
      provider: input.provider,
      type: input.payload.type,
      payload: await getCredentialCipher().encrypt(JSON.stringify(input.payload)),
      createdAt: now,
      updatedAt: now,
    };
    if (input.label !== undefined) item["label"] = input.label;
    if (input.createdBy !== undefined) item["createdBy"] = input.createdBy;
    const pointer: Record<string, unknown> = {
      PK: `WS#${workspaceId}`,
      SK: `CREDID#${id}`,
      provider: input.provider,
    };
    const { client, PutCommand } = await dynamo();
    // Write the record first with a condition so a rare id collision throws
    // instead of silently overwriting, then write the credId → provider pointer.
    await client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: item,
        ConditionExpression: "attribute_not_exists(PK)",
      }),
    );
    await client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: pointer,
        ConditionExpression: "attribute_not_exists(PK)",
      }),
    );
    return this.toRecord(item);
  }

  async list(workspaceId: string): Promise<CredentialRecord[]> {
    const { client, QueryCommand } = await dynamo();
    const result = await client.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": `WS#${workspaceId}`,
          ":sk": "CRED#",
        },
        // Exclude the payload from the listing response.
        ProjectionExpression: "id, workspaceId, provider, #lbl, #tp, createdBy, createdAt, updatedAt",
        ExpressionAttributeNames: { "#lbl": "label", "#tp": "type" },
      }),
    );
    return (result.Items ?? []).map((it) => this.toRecord(it as Record<string, unknown>));
  }

  async get(workspaceId: string, id: string): Promise<CredentialRecord | undefined> {
    const provider = await this.resolveProviderViaPointer(workspaceId, id);
    if (provider === undefined) return undefined;
    const { client, GetCommand } = await dynamo();
    const result = await client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { PK: `WS#${workspaceId}`, SK: `CRED#${provider}#${id}` },
      }),
    );
    if (!result.Item) return undefined;
    return this.toRecord(result.Item as Record<string, unknown>);
  }

  async delete(workspaceId: string, id: string): Promise<boolean> {
    const provider = await this.resolveProviderViaPointer(workspaceId, id);
    if (provider === undefined) return false;
    const { client, TransactWriteCommand } = await dynamo();
    await client.send(
      new TransactWriteCommand({
        TransactItems: [
          {
            Delete: {
              TableName: this.tableName,
              Key: { PK: `WS#${workspaceId}`, SK: `CRED#${provider}#${id}` },
            },
          },
          {
            Delete: {
              TableName: this.tableName,
              Key: { PK: `WS#${workspaceId}`, SK: `CREDID#${id}` },
            },
          },
        ],
      }),
    );
    return true;
  }

  async getPayload(workspaceId: string, id: string): Promise<CredentialPayload | undefined> {
    const provider = await this.resolveProviderViaPointer(workspaceId, id);
    if (provider === undefined) return undefined;
    const { client, GetCommand } = await dynamo();
    const result = await client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { PK: `WS#${workspaceId}`, SK: `CRED#${provider}#${id}` },
      }),
    );
    if (!result.Item) return undefined;
    const stored = (result.Item as Record<string, unknown>)["payload"] as string;
    return JSON.parse(await getCredentialCipher().decrypt(stored)) as CredentialPayload;
  }

  async resolveForProvider(workspaceId: string, provider: string): Promise<CredentialPayload | undefined> {
    return (await this.resolveRecordForProvider(workspaceId, provider))?.payload;
  }

  async resolveRecordForProvider(
    workspaceId: string,
    provider: string,
  ): Promise<{ id: string; payload: CredentialPayload } | undefined> {
    const { client, QueryCommand } = await dynamo();
    const result = await client.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": `WS#${workspaceId}`,
          ":sk": `CRED#${provider}#`,
        },
        Limit: 1,
      }),
    );
    const item = result.Items?.[0] as Record<string, unknown> | undefined;
    if (!item) return undefined;
    return {
      id: item["id"] as string,
      payload: JSON.parse(
        await getCredentialCipher().decrypt(item["payload"] as string),
      ) as CredentialPayload,
    };
  }

  async resolveRecordById(
    workspaceId: string,
    credentialId: string,
  ): Promise<{ id: string; provider: string; payload: CredentialPayload } | undefined> {
    const provider = await this.resolveProviderViaPointer(workspaceId, credentialId);
    if (provider === undefined) return undefined;
    const payload = await this.getPayload(workspaceId, credentialId);
    if (!payload) return undefined;
    return { id: credentialId, provider, payload };
  }

  async updatePayload(workspaceId: string, id: string, payload: CredentialPayload): Promise<void> {
    const provider = await this.resolveProviderViaPointer(workspaceId, id);
    if (provider === undefined) return;
    const { client, GetCommand, PutCommand } = await dynamo();
    const existing = await client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { PK: `WS#${workspaceId}`, SK: `CRED#${provider}#${id}` },
      }),
    );
    if (!existing.Item) return;
    await client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: {
          ...existing.Item,
          payload: await getCredentialCipher().encrypt(JSON.stringify(payload)),
          updatedAt: new Date().toISOString(),
        },
      }),
    );
  }

  /**
   * Read the `CREDID#<id>` pointer to recover the provider for an id-keyed
   * lookup. Returns undefined when no such credential exists.
   */
  private async resolveProviderViaPointer(workspaceId: string, id: string): Promise<string | undefined> {
    const { client, GetCommand } = await dynamo();
    const result = await client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { PK: `WS#${workspaceId}`, SK: `CREDID#${id}` },
      }),
    );
    if (!result.Item) return undefined;
    return (result.Item as Record<string, unknown>)["provider"] as string;
  }

  private toRecord(item: Record<string, unknown>): CredentialRecord {
    return {
      id: item["id"] as string,
      workspaceId: item["workspaceId"] as string,
      provider: item["provider"] as string,
      label: item["label"] as string | undefined,
      type: item["type"] as CredentialType,
      createdBy: item["createdBy"] as string | undefined,
      createdAt: item["createdAt"] as string,
      updatedAt: item["updatedAt"] as string,
    };
  }
}

export class CredentialStoreSqlite implements ICredentialStore {
  private readonly database: Database.Database;
  private readonly key: Buffer;

  constructor(
    directory = workspaceDataDir(),
  ) {
    mkdirSync(directory, { recursive: true, mode: 0o700 });
    const keyPath = join(directory, "key");
    try {
      this.key = Buffer.from(readFileSync(keyPath, "utf8"), "base64");
    } catch {
      this.key = randomBytes(32);
      writeFileSync(keyPath, this.key.toString("base64"), { mode: 0o600 });
    }
    const SqliteDatabase = loadSqlite();
    this.database = new SqliteDatabase(join(directory, "workspace.db"));
    this.database.exec(`
      CREATE TABLE IF NOT EXISTS credentials (
        id TEXT PRIMARY KEY,
        workspace_id TEXT NOT NULL,
        provider TEXT NOT NULL,
        label TEXT,
        type TEXT NOT NULL,
        payload TEXT NOT NULL,
        created_by TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS credentials_workspace_provider
      ON credentials(workspace_id, provider);
    `);
    // Pre-created_by dev databases lack the column; add it in place.
    try {
      this.database.exec(`ALTER TABLE credentials ADD COLUMN created_by TEXT`);
    } catch {
      // Column already exists.
    }
  }

  async create(
    workspaceId: string,
    input: CredentialInput,
  ): Promise<CredentialRecord> {
    const id = randomBytes(12).toString("hex");
    const now = new Date().toISOString();
    this.database
      .prepare(
        `INSERT INTO credentials
        (id, workspace_id, provider, label, type, payload, created_by, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        id,
        workspaceId,
        input.provider,
        input.label ?? null,
        input.payload.type,
        this.encrypt(input.payload),
        input.createdBy ?? null,
        now,
        now,
      );
    return {
      id,
      workspaceId,
      provider: input.provider,
      label: input.label,
      type: input.payload.type,
      createdBy: input.createdBy,
      createdAt: now,
      updatedAt: now,
    };
  }

  async list(workspaceId: string): Promise<CredentialRecord[]> {
    const rows = this.database
      .prepare(
        `SELECT id, workspace_id, provider, label, type, created_by, created_at, updated_at
         FROM credentials WHERE workspace_id = ? ORDER BY provider, created_at`,
      )
      .all(workspaceId) as Record<string, unknown>[];
    return rows.map((row) => this.record(row));
  }

  async get(
    workspaceId: string,
    id: string,
  ): Promise<CredentialRecord | undefined> {
    const row = this.database
      .prepare(
        `SELECT id, workspace_id, provider, label, type, created_by, created_at, updated_at
         FROM credentials WHERE workspace_id = ? AND id = ?`,
      )
      .get(workspaceId, id);
    return row
      ? this.record(row as Record<string, unknown>)
      : undefined;
  }

  async delete(workspaceId: string, id: string): Promise<boolean> {
    return (
      this.database
        .prepare("DELETE FROM credentials WHERE workspace_id = ? AND id = ?")
        .run(workspaceId, id).changes > 0
    );
  }

  async getPayload(
    workspaceId: string,
    id: string,
  ): Promise<CredentialPayload | undefined> {
    const row = this.database
      .prepare(
        "SELECT payload FROM credentials WHERE workspace_id = ? AND id = ?",
      )
      .get(workspaceId, id) as { payload?: string } | undefined;
    return row?.payload ? this.decrypt(row.payload) : undefined;
  }

  async resolveForProvider(
    workspaceId: string,
    provider: string,
  ): Promise<CredentialPayload | undefined> {
    return (await this.resolveRecordForProvider(workspaceId, provider))?.payload;
  }

  async resolveRecordForProvider(
    workspaceId: string,
    provider: string,
  ): Promise<{ id: string; payload: CredentialPayload } | undefined> {
    const row = this.database
      .prepare(
        `SELECT id, payload FROM credentials
         WHERE workspace_id = ? AND provider = ? ORDER BY created_at LIMIT 1`,
      )
      .get(workspaceId, provider) as { id?: string; payload?: string } | undefined;
    if (!row?.id || !row.payload) return undefined;
    return { id: row.id, payload: this.decrypt(row.payload) };
  }

  async resolveRecordById(
    workspaceId: string,
    credentialId: string,
  ): Promise<{ id: string; provider: string; payload: CredentialPayload } | undefined> {
    const row = this.database
      .prepare(
        "SELECT id, provider, payload FROM credentials WHERE workspace_id = ? AND id = ?",
      )
      .get(workspaceId, credentialId) as
      | { id?: string; provider?: string; payload?: string }
      | undefined;
    if (!row?.id || !row.provider || !row.payload) return undefined;
    return { id: row.id, provider: row.provider, payload: this.decrypt(row.payload) };
  }

  async updatePayload(
    workspaceId: string,
    id: string,
    payload: CredentialPayload,
  ): Promise<void> {
    this.database
      .prepare(
        `UPDATE credentials SET payload = ?, updated_at = ?
         WHERE workspace_id = ? AND id = ?`,
      )
      .run(this.encrypt(payload), new Date().toISOString(), workspaceId, id);
  }

  private encrypt(payload: CredentialPayload): string {
    const iv = randomBytes(12);
    const cipher = createCipheriv("aes-256-gcm", this.key, iv);
    const encrypted = Buffer.concat([
      cipher.update(JSON.stringify(payload), "utf8"),
      cipher.final(),
    ]);
    return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64");
  }

  private decrypt(value: string): CredentialPayload {
    const data = Buffer.from(value, "base64");
    const decipher = createDecipheriv(
      "aes-256-gcm",
      this.key,
      data.subarray(0, 12),
    );
    decipher.setAuthTag(data.subarray(12, 28));
    return JSON.parse(
      Buffer.concat([
        decipher.update(data.subarray(28)),
        decipher.final(),
      ]).toString("utf8"),
    ) as CredentialPayload;
  }

  private record(row: Record<string, unknown>): CredentialRecord {
    return {
      id: String(row["id"]),
      workspaceId: String(row["workspace_id"]),
      provider: String(row["provider"]),
      label: typeof row["label"] === "string" ? row["label"] : undefined,
      type: row["type"] as CredentialType,
      createdBy: typeof row["created_by"] === "string" ? row["created_by"] : undefined,
      createdAt: String(row["created_at"]),
      updatedAt: String(row["updated_at"]),
    };
  }
}

// ---------------------------------------------------------------------------
// Registry-server-backed store (dsql backend) — the WS-3 reconciliation.
//
// On DSQL, the credential store of record is @aprovan/registry-server's
// storage: its `credentials` table (with `created_by`) over its SqlClient
// seam. This adapter maps `ICredentialStore` onto that facade — the
// workspaceId is the tenant, the workspace credential cipher seals payloads
// (the same envelope the package's own domain layer applies), and the shared
// db/dsql.ts pool (IAM token auth, OCC retry, 60-min recycling) is wrapped
// as the package's SqlClient so both schemas ride one cluster connection.
// ---------------------------------------------------------------------------

export class CredentialStoreRegistry implements ICredentialStore {
  private store(): Promise<import("@aprovan/registry-server").RegistryStorage> {
    return getRegistryStorage();
  }

  private toRecord(
    workspaceId: string,
    row: import("@aprovan/registry-server").CredentialRow,
  ): CredentialRecord {
    return {
      id: row.id,
      workspaceId,
      provider: row.provider,
      label: row.label,
      type: row.type as CredentialType,
      createdBy: row.createdBy,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  async create(workspaceId: string, input: CredentialInput): Promise<CredentialRecord> {
    const storage = await this.store();
    await storage.tenants.ensure(workspaceId);
    const row = await storage.credentials.create(workspaceId, {
      provider: input.provider,
      ...(input.label !== undefined ? { label: input.label } : {}),
      type: input.payload.type,
      payload: await getCredentialCipher().encrypt(JSON.stringify(input.payload)),
      ...(input.createdBy !== undefined ? { createdBy: input.createdBy } : {}),
    });
    return this.toRecord(workspaceId, row);
  }

  async list(workspaceId: string): Promise<CredentialRecord[]> {
    const storage = await this.store();
    const rows = await storage.credentials.list(workspaceId);
    return rows.map((row) => this.toRecord(workspaceId, row));
  }

  async get(workspaceId: string, id: string): Promise<CredentialRecord | undefined> {
    const storage = await this.store();
    const row = await storage.credentials.get(workspaceId, id);
    return row ? this.toRecord(workspaceId, row) : undefined;
  }

  async delete(workspaceId: string, id: string): Promise<boolean> {
    const storage = await this.store();
    return storage.credentials.delete(workspaceId, id);
  }

  async getPayload(workspaceId: string, id: string): Promise<CredentialPayload | undefined> {
    const storage = await this.store();
    const row = await storage.credentials.getWithPayload(workspaceId, id);
    if (!row) return undefined;
    return JSON.parse(await getCredentialCipher().decrypt(row.payload)) as CredentialPayload;
  }

  async resolveForProvider(
    workspaceId: string,
    provider: string,
  ): Promise<CredentialPayload | undefined> {
    return (await this.resolveRecordForProvider(workspaceId, provider))?.payload;
  }

  async resolveRecordForProvider(
    workspaceId: string,
    provider: string,
  ): Promise<{ id: string; payload: CredentialPayload } | undefined> {
    const storage = await this.store();
    const row = await storage.credentials.firstForProvider(workspaceId, provider);
    if (!row) return undefined;
    return {
      id: row.id,
      payload: JSON.parse(await getCredentialCipher().decrypt(row.payload)) as CredentialPayload,
    };
  }

  async resolveRecordById(
    workspaceId: string,
    credentialId: string,
  ): Promise<{ id: string; provider: string; payload: CredentialPayload } | undefined> {
    const storage = await this.store();
    const row = await storage.credentials.getWithPayload(workspaceId, credentialId);
    if (!row) return undefined;
    return {
      id: row.id,
      provider: row.provider,
      payload: JSON.parse(await getCredentialCipher().decrypt(row.payload)) as CredentialPayload,
    };
  }

  async updatePayload(
    workspaceId: string,
    id: string,
    payload: CredentialPayload,
  ): Promise<void> {
    const storage = await this.store();
    await storage.credentials.updatePayload(
      workspaceId,
      id,
      await getCredentialCipher().encrypt(JSON.stringify(payload)),
    );
  }
}

// ---------------------------------------------------------------------------
// Singleton factory
// ---------------------------------------------------------------------------

let _store: ICredentialStore | undefined;

/**
 * Wrap delete so credential revocation invalidates the tool-list cache on the
 * same event (IW-9 C derived-authority / invariant 3). Dynamic import avoids a
 * credentials → derived-authority → tools → credentials cycle at module init.
 */
function withAuthorityRevokeHook(inner: ICredentialStore): ICredentialStore {
  return {
    create: (workspaceId, input) => inner.create(workspaceId, input),
    list: (workspaceId) => inner.list(workspaceId),
    get: (workspaceId, id) => inner.get(workspaceId, id),
    delete: async (workspaceId, id) => {
      const ok = await inner.delete(workspaceId, id);
      if (ok) {
        // Load tools first so setToolListCacheInvalidator has run, then cascade.
        await import("./routes/tools.js");
        const { onCredentialRevoked } = await import("./derived-authority.js");
        onCredentialRevoked(workspaceId);
      }
      return ok;
    },
    getPayload: (workspaceId, id) => inner.getPayload(workspaceId, id),
    resolveForProvider: (workspaceId, provider) =>
      inner.resolveForProvider(workspaceId, provider),
    resolveRecordForProvider: (workspaceId, provider) =>
      inner.resolveRecordForProvider(workspaceId, provider),
    resolveRecordById: (workspaceId, credentialId) =>
      inner.resolveRecordById(workspaceId, credentialId),
    updatePayload: (workspaceId, id, payload) =>
      inner.updatePayload(workspaceId, id, payload),
  };
}

export function getCredentialStore(): ICredentialStore {
  _store ??= withAuthorityRevokeHook(
    (() => {
      switch (storeBackend()) {
        case "dsql":
          return new CredentialStoreRegistry();
        case "sqlite":
          return new CredentialStoreSqlite();
      }
    })(),
  );
  return _store;
}

/** Reset the singleton (used in tests). */
export function resetCredentialStore(): void {
  _store = undefined;
}

/**
 * The one credential-resolution entry point for the dispatch paths (tool
 * proxy, workflow invoke, MCP, chat).
 *
 * With no `credentialId` this is the historical behaviour — the first
 * credential the workspace holds for the provider. With one, it is that exact
 * credential, and a mismatch is reported rather than silently falling back.
 *
 * A `profile` pin is resolved by the unified profile store before this
 * function is called (credential id on the record). Labels are display names
 * only — arriving here with a bare profile name is a configuration bug.
 */
export async function resolveCredentialRecord(
  workspaceId: string,
  provider: string,
  credentialId?: string,
  profile?: string,
): Promise<{ id: string; payload: CredentialPayload } | undefined> {
  const store = getCredentialStore();
  if (credentialId && profile !== undefined) {
    throw new CredentialResolutionError(
      `Cannot resolve ${provider} by credential id and profile at once`,
    );
  }
  if (profile !== undefined) {
    throw new CredentialResolutionError(
      `Credential profile ${JSON.stringify(profile)} for ${provider} must be resolved through the profile store ` +
        `(profiles.set { namespace: ${JSON.stringify(provider)}, name: ${JSON.stringify(profile)}, credential: <id> }) — ` +
        `credential labels are display names, not identifiers`,
    );
  }
  if (!credentialId) return store.resolveRecordForProvider(workspaceId, provider);
  const record = await store.resolveRecordById(workspaceId, credentialId);
  if (!record) {
    throw new CredentialResolutionError(
      `Credential ${credentialId} does not exist in this workspace`,
    );
  }
  if (record.provider !== provider) {
    throw new CredentialResolutionError(
      `Credential ${credentialId} belongs to ${record.provider}, not ${provider}`,
    );
  }
  return { id: record.id, payload: record.payload };
}

/** A pinned credential that cannot be honoured — always a configuration bug. */
export class CredentialResolutionError extends Error {
  readonly status = 400;
}

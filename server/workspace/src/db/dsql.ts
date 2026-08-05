/**
 * Aurora DSQL access, loaded on demand (tech-plan D4) — the Postgres-dialect
 * sibling of ./client.ts's DynamoDB loader.
 *
 * Connection: a lazy `pg` Pool. Against real DSQL (`DSQL_ENDPOINT`), every
 * new connection fetches a fresh IAM auth token via `@aws-sdk/dsql-signer`
 * (tokens are per-connection; connections are recycled well under DSQL's
 * 60-minute cap via `maxLifetimeSeconds`), TLS required. Tests and local
 * rigs may instead supply `DSQL_URL` — a complete `postgres://` connection
 * string — which is used verbatim (this is also how the DSQL contract suites
 * gate themselves: no URL, no DSQL tests).
 *
 * Concurrency: DSQL is OCC-only — a commit-time conflict fails with SQLSTATE
 * 40001 and MUST be retried. `withOccRetry` wraps any unit of work with
 * bounded, jittered retries. Transactions may modify at most 3,000 rows /
 * 10 MiB; `chunkRows` splits bulk writes to fit.
 *
 * The workspace-side DDL lives in ./dsql-schema.sql (tech-plan §5) and is
 * applied idempotently by `ensureDsqlSchema` on first use. The credentials
 * table is deliberately NOT here — on the dsql backend, workspace credentials
 * live in `@aprovan/registry-server`'s storage (its own schema over the same
 * cluster); see credentials.ts for the WS-3 reconciliation.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Loose `pg` typing — the driver is an optional dependency, loaded on demand,
// and its own types would drag @types/pg into every consumer.
// ---------------------------------------------------------------------------

export interface DsqlQueryResult {
  rows: Array<Record<string, unknown>>;
  rowCount: number | null;
}

export interface DsqlPoolClient {
  query(sql: string, params?: unknown[]): Promise<DsqlQueryResult>;
  release(err?: unknown): void;
}

export interface DsqlPool {
  query(sql: string, params?: unknown[]): Promise<DsqlQueryResult>;
  connect(): Promise<DsqlPoolClient>;
  end(): Promise<void>;
}

interface PgModule {
  Pool: new (config: Record<string, unknown>) => DsqlPool;
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

export interface DsqlConfig {
  /** Full connection string (tests / local Postgres). Wins when set. */
  url?: string;
  /** DSQL cluster endpoint hostname (IAM token auth). */
  endpoint?: string;
  database: string;
  region: string;
}

export function resolveDsqlConfig(): DsqlConfig {
  const url = process.env["DSQL_URL"];
  const endpoint = process.env["DSQL_ENDPOINT"];
  if (!url && !endpoint) {
    throw new Error(
      "STORE_BACKEND=dsql requires DSQL_ENDPOINT (IAM auth against an Aurora DSQL cluster) " +
        "or DSQL_URL (a full postgres:// connection string).",
    );
  }
  return {
    ...(url ? { url } : {}),
    ...(endpoint ? { endpoint } : {}),
    database: process.env["DSQL_DATABASE"] ?? "postgres",
    region: process.env["AWS_REGION"] ?? process.env["AWS_DEFAULT_REGION"] ?? "us-east-2",
  };
}

// ---------------------------------------------------------------------------
// Pool (lazy, memoized)
// ---------------------------------------------------------------------------

/** Keep every connection comfortably under DSQL's 60-minute connection cap. */
const MAX_CONNECTION_LIFETIME_SECONDS = 45 * 60;

let _pool: Promise<DsqlPool> | undefined;

async function createPool(): Promise<DsqlPool> {
  const config = resolveDsqlConfig();
  const pg = (await import("pg" as string)) as unknown as PgModule & { default?: PgModule };
  const Pool = pg.Pool ?? pg.default?.Pool;
  if (!Pool) throw new Error("The pg package did not expose a Pool constructor");

  if (config.url) {
    return new Pool({
      connectionString: config.url,
      max: 5,
      maxLifetimeSeconds: MAX_CONNECTION_LIFETIME_SECONDS,
    });
  }

  // Real DSQL: a fresh IAM token per new connection (pg accepts an async
  // `password` function), TLS required.
  const endpoint = config.endpoint!;
  const signerModule = (await import("@aws-sdk/dsql-signer" as string)) as {
    DsqlSigner: new (options: { hostname: string; region: string }) => {
      getDbConnectAdminAuthToken(): Promise<string>;
    };
  };
  const signer = new signerModule.DsqlSigner({ hostname: endpoint, region: config.region });
  return new Pool({
    host: endpoint,
    port: 5432,
    database: config.database,
    user: "admin",
    password: async () => signer.getDbConnectAdminAuthToken(),
    ssl: { rejectUnauthorized: true },
    max: 5,
    maxLifetimeSeconds: MAX_CONNECTION_LIFETIME_SECONDS,
  });
}

export function dsqlPool(): Promise<DsqlPool> {
  _pool ??= createPool();
  return _pool;
}

/**
 * A second pool whose connections resolve unqualified table names in the
 * `registry` schema — the namespace `@aprovan/registry-server`'s storage
 * (credentials/profiles/grants) occupies on the shared cluster. Namespacing
 * matters: the package's DDL and the workspace DDL both name `api_keys` and
 * `audit_log`, with different shapes; separate schemas keep both intact on
 * the ONE DSQL cluster per environment (well under the 10-schema limit).
 */
let _registryPool: Promise<DsqlPool> | undefined;

export function dsqlRegistryPool(): Promise<DsqlPool> {
  _registryPool ??= (async () => {
    const pool = await createPool();
    // Hook FIRST, so every connection this pool ever opens gets the search
    // path (pg queues per-connection queries, so a SET issued from the
    // connect hook always runs before that connection's first real query —
    // and search_path re-resolves per query, so setting it before the schema
    // exists is harmless).
    (pool as unknown as {
      on?: (event: string, fn: (client: DsqlPoolClient) => void) => void;
    }).on?.("connect", (client) => {
      void client.query("SET search_path TO registry, public");
    });
    await pool.query("CREATE SCHEMA IF NOT EXISTS registry");
    return pool;
  })();
  return _registryPool;
}

/** Drop the memoized pools so the next call re-reads the environment (tests). */
export async function resetDsqlPool(): Promise<void> {
  const pending = _pool;
  const pendingRegistry = _registryPool;
  _pool = undefined;
  _registryPool = undefined;
  _schemaReady = undefined;
  for (const p of [pending, pendingRegistry]) {
    if (p) await p.then((pool) => pool.end()).catch(() => undefined);
  }
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

let _schemaReady: Promise<void> | undefined;

function schemaStatements(): string[] {
  const here = dirname(fileURLToPath(import.meta.url));
  // Built layout: dist/db/dsql-schema.sql (copied by the package build script /
  // Dockerfile). Dev/tsx layout: src/db/dsql-schema.sql next to this module, or
  // reached by walking up from dist/db to the source tree.
  const candidates = [
    join(here, "dsql-schema.sql"),
    join(here, "..", "..", "src", "db", "dsql-schema.sql"),
  ];
  let ddl: string | undefined;
  for (const candidate of candidates) {
    try {
      ddl = readFileSync(candidate, "utf8");
      break;
    } catch {
      // Try the next location.
    }
  }
  if (!ddl) throw new Error("db/dsql-schema.sql not found");
  return ddl
    .split(/;\s*(?:\n|$)/u)
    .map((statement) => statement.trim())
    .filter(Boolean);
}

/**
 * Apply the workspace DDL idempotently. DSQL requires `CREATE INDEX ASYNC`
 * where vanilla Postgres wants `CREATE INDEX`; statements are written in the
 * DSQL dialect and rewritten (ASYNC dropped) when the plain form is what the
 * server accepts — so the same schema file drives both real DSQL and the
 * Postgres the test rig points DSQL_URL at.
 */
export async function ensureDsqlSchema(): Promise<void> {
  if (!_schemaReady) {
    _schemaReady = (async () => {
      const pool = await dsqlPool();
      for (const statement of schemaStatements()) {
        try {
          await pool.query(statement);
        } catch (err) {
          if (/\bASYNC\b/iu.test(statement) && isSyntaxError(err)) {
            await pool.query(statement.replace(/\bINDEX ASYNC\b/iu, "INDEX"));
            continue;
          }
          throw err;
        }
      }
    })().catch((err) => {
      // Allow a later request to retry after a transient failure (missing
      // DDL file in a bad image, brief DSQL blip, etc.).
      _schemaReady = undefined;
      throw err;
    });
  }
  return _schemaReady;
}

function isSyntaxError(err: unknown): boolean {
  return (err as { code?: string })?.code === "42601";
}

/**
 * Run a DDL statement against DSQL, rewriting plain `CREATE INDEX` to
 * `CREATE INDEX ASYNC` (required by Aurora DSQL). Vanilla Postgres test rigs
 * that reject ASYNC fall back to the plain form.
 */
export async function execDsqlDdl(pool: DsqlPool, sql: string): Promise<void> {
  const rewritten = sql.replace(/\bCREATE\s+INDEX\b(?!\s+ASYNC\b)/giu, "CREATE INDEX ASYNC");
  try {
    await pool.query(rewritten);
  } catch (err) {
    if (/\bINDEX ASYNC\b/iu.test(rewritten) && isSyntaxError(err)) {
      await pool.query(rewritten.replace(/\bINDEX ASYNC\b/giu, "INDEX"));
      return;
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// OCC retry (SQLSTATE 40001) + transaction chunking
// ---------------------------------------------------------------------------

export interface OccRetryOptions {
  /** Total attempts, first try included. */
  attempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
}

export function isOccConflict(err: unknown): boolean {
  const code = (err as { code?: string })?.code;
  if (code === "40001") return true;
  const message = err instanceof Error ? err.message : String(err);
  return /serialization failure|change conflicts with another transaction/iu.test(message);
}

/**
 * Run `fn`, retrying OCC serialization failures with jittered exponential
 * backoff. `fn` must be safe to re-run in full (single statement, or a
 * transaction that was rolled back by the failure).
 */
export async function withOccRetry<T>(
  fn: () => Promise<T>,
  options: OccRetryOptions = {},
): Promise<T> {
  const attempts = options.attempts ?? 5;
  const base = options.baseDelayMs ?? 20;
  const cap = options.maxDelayMs ?? 500;
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await fn();
    } catch (err) {
      if (!isOccConflict(err) || attempt === attempts - 1) throw err;
      lastError = err;
      const delay = Math.min(cap, base * 2 ** attempt) * (0.5 + Math.random());
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

export interface ChunkOptions<T> {
  /** DSQL cap: ≤3,000 rows modified per transaction. */
  maxRows?: number;
  /** DSQL cap: ≤10 MiB modified per transaction. */
  maxBytes?: number;
  sizeOf?: (row: T) => number;
}

const DSQL_MAX_ROWS_PER_TXN = 3_000;
const DSQL_MAX_BYTES_PER_TXN = 10 * 1024 * 1024;

/** Split rows into batches that fit DSQL's per-transaction modify limits. */
export function chunkRows<T>(rows: readonly T[], options: ChunkOptions<T> = {}): T[][] {
  const maxRows = Math.min(options.maxRows ?? DSQL_MAX_ROWS_PER_TXN, DSQL_MAX_ROWS_PER_TXN);
  const maxBytes = Math.min(options.maxBytes ?? DSQL_MAX_BYTES_PER_TXN, DSQL_MAX_BYTES_PER_TXN);
  const sizeOf = options.sizeOf ?? ((row: T) => Buffer.byteLength(JSON.stringify(row) ?? ""));
  const batches: T[][] = [];
  let batch: T[] = [];
  let batchBytes = 0;
  for (const row of rows) {
    const size = sizeOf(row);
    if (batch.length > 0 && (batch.length >= maxRows || batchBytes + size > maxBytes)) {
      batches.push(batch);
      batch = [];
      batchBytes = 0;
    }
    batch.push(row);
    batchBytes += size;
  }
  if (batch.length > 0) batches.push(batch);
  return batches;
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/** One query against the shared pool, schema guaranteed. */
export async function dsqlQuery(
  sql: string,
  params: unknown[] = [],
): Promise<DsqlQueryResult> {
  await ensureDsqlSchema();
  const pool = await dsqlPool();
  return pool.query(sql, params);
}

/**
 * Run `work` inside one transaction (BEGIN/COMMIT with ROLLBACK on error).
 * Callers wrap this in {@link withOccRetry} and keep each transaction within
 * the row/byte caps via {@link chunkRows}.
 */
export async function dsqlTransaction<T>(
  work: (client: DsqlPoolClient) => Promise<T>,
): Promise<T> {
  await ensureDsqlSchema();
  const pool = await dsqlPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw err;
  } finally {
    client.release();
  }
}

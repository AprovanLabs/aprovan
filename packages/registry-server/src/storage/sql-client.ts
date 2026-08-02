/**
 * Minimal async SQL client seam shared by every driver (tech-plan D8).
 *
 * The store implementations are written once against this interface;
 * `sqlite` (better-sqlite3, sync under the hood), `libsql` (@libsql/client),
 * and `dsql` (node-postgres) each provide an adapter. Queries use `?`
 * placeholders; the postgres adapter rewrites them to `$n`.
 */

import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

export interface SqlClient {
  /** DDL / multi-statement execution. */
  exec(sql: string): Promise<void>;
  all<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]>;
  run(sql: string, params?: unknown[]): Promise<{ changes: number }>;
  close(): Promise<void>;
}

/** Thrown so domain layers can turn constraint hits into friendly errors. */
export class UniqueConstraintError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UniqueConstraintError";
  }
}

function isUniqueViolation(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return (
    /UNIQUE constraint failed/iu.test(message) || // sqlite / libsql
    /duplicate key value violates unique constraint/iu.test(message) // postgres / dsql
  );
}

function wrapConstraint(err: unknown): never {
  if (isUniqueViolation(err)) {
    throw new UniqueConstraintError(err instanceof Error ? err.message : String(err));
  }
  throw err;
}

// ---------------------------------------------------------------------------
// sqlite (better-sqlite3)
// ---------------------------------------------------------------------------

const loadBetterSqlite = (): typeof import("better-sqlite3") => {
  const req = typeof require === "function" ? require : createRequire(import.meta.url);
  return req("better-sqlite3");
};

export function createSqliteClient(options: { url?: string; dir?: string }): SqlClient {
  const file =
    options.url?.replace(/^file:/u, "") ??
    join(options.dir ?? join(process.cwd(), ".registry"), "registry.db");
  if (file !== ":memory:") {
    mkdirSync(dirname(file), { recursive: true, mode: 0o700 });
  }
  const Database = loadBetterSqlite();
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  return {
    async exec(sql) {
      db.exec(sql);
    },
    async all<T>(sql: string, params: unknown[] = []): Promise<T[]> {
      return db.prepare(sql).all(...params) as T[];
    },
    async run(sql, params = []) {
      try {
        const info = db.prepare(sql).run(...params);
        return { changes: info.changes };
      } catch (err) {
        wrapConstraint(err);
      }
    },
    async close() {
      db.close();
    },
  };
}

// ---------------------------------------------------------------------------
// libsql (@libsql/client — optional dependency, loaded on demand)
// ---------------------------------------------------------------------------

interface LibsqlClientLike {
  executeMultiple(sql: string): Promise<unknown>;
  execute(stmt: { sql: string; args: unknown[] }): Promise<{
    rows: Array<Record<string, unknown>>;
    rowsAffected: number;
  }>;
  close(): void;
}

export async function createLibsqlClient(options: { url?: string; dir?: string }): Promise<SqlClient> {
  let mod: { createClient(config: { url: string }): LibsqlClientLike };
  try {
    mod = (await import("@libsql/client" as string)) as unknown as {
      createClient(config: { url: string }): LibsqlClientLike;
    };
  } catch {
    throw new Error(
      'storage.driver "libsql" requires the @libsql/client package — install it, or use driver "sqlite".',
    );
  }
  const url =
    options.url ?? `file:${join(options.dir ?? join(process.cwd(), ".registry"), "registry.db")}`;
  if (url.startsWith("file:")) {
    mkdirSync(dirname(url.slice("file:".length)), { recursive: true, mode: 0o700 });
  }
  const client = mod.createClient({ url });
  return {
    async exec(sql) {
      await client.executeMultiple(sql);
    },
    async all<T>(sql: string, params: unknown[] = []): Promise<T[]> {
      const result = await client.execute({ sql, args: params });
      return result.rows.map((row) => ({ ...row })) as T[];
    },
    async run(sql, params = []) {
      try {
        const result = await client.execute({ sql, args: params });
        return { changes: result.rowsAffected };
      } catch (err) {
        wrapConstraint(err);
      }
    },
    async close() {
      client.close();
    },
  };
}

// ---------------------------------------------------------------------------
// dsql (postgres dialect via node-postgres — optional dependency)
// ---------------------------------------------------------------------------

/** Rewrite `?` placeholders to postgres `$n`. Registry SQL contains no literal `?`. */
export function toPgPlaceholders(sql: string): string {
  let index = 0;
  return sql.replace(/\?/gu, () => `$${++index}`);
}

export async function createDsqlClient(options: { url: string }): Promise<SqlClient> {
  let pg: { Pool: new (config: { connectionString: string }) => PgPoolLike };
  try {
    pg = (await import("pg" as string)) as unknown as {
      Pool: new (config: { connectionString: string }) => PgPoolLike;
    };
  } catch {
    throw new Error('storage.driver "dsql" requires the pg package — install it in the host.');
  }
  const pool = new pg.Pool({ connectionString: options.url });
  return {
    async exec(sql) {
      await pool.query(sql);
    },
    async all<T>(sql: string, params: unknown[] = []): Promise<T[]> {
      const result = await pool.query(toPgPlaceholders(sql), params);
      return result.rows as T[];
    },
    async run(sql, params = []) {
      try {
        const result = await pool.query(toPgPlaceholders(sql), params);
        return { changes: result.rowCount ?? 0 };
      } catch (err) {
        wrapConstraint(err);
      }
    },
    async close() {
      await pool.end();
    },
  };
}

interface PgPoolLike {
  query(sql: string, params?: unknown[]): Promise<{ rows: unknown[]; rowCount: number | null }>;
  end(): Promise<void>;
}

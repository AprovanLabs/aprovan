/**
 * The workspace's handle on `@aprovan/registry-server` storage — the WS-3
 * dispatch-plane seam. Profile rows live on sqlite/dsql registry storage.
 */

import { storeBackend, workspaceDataDir } from "./runtime/config.js";
import type { RegistryStorage } from "@aprovan/registry-server";
import type { SqlClient } from "@aprovan/registry-server";
import type { DsqlPool, DsqlPoolClient } from "./db/dsql.js";

const toPg = (sql: string): string => {
  let index = 0;
  return sql.replace(/\?/gu, () => `$${++index}`);
};

/** Read/write methods shared by the pool-level client and each transaction's scoped client. */
function dsqlQueries(
  conn: DsqlPool | DsqlPoolClient,
  dsql: typeof import("./db/dsql.js"),
): Pick<SqlClient, "exec" | "all" | "run"> {
  return {
    async exec(sql) {
      for (const statement of sql.split(/;\s*(?:\n|$)/u)) {
        const trimmed = statement.trim();
        if (trimmed) await dsql.execDsqlDdl(conn as DsqlPool, trimmed);
      }
    },
    async all(sql, params = []) {
      const result = await dsql.withOccRetry(() => conn.query(toPg(sql), params));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.rows as any;
    },
    async run(sql, params = []) {
      const result = await dsql.withOccRetry(() => conn.query(toPg(sql), params));
      return { changes: result.rowCount ?? 0 };
    },
  };
}

async function createDsqlBackedStorage(): Promise<RegistryStorage> {
  const [{ createSqlStorage }, dsql] = await Promise.all([
    import("@aprovan/registry-server"),
    import("./db/dsql.js"),
  ]);
  const pool = await dsql.dsqlRegistryPool();

  const client: SqlClient = {
    ...dsqlQueries(pool, dsql),
    // Grant-enforcement §3's provisionCredential() runs its writes inside one
    // BEGIN/COMMIT on a single pooled connection — mirrors the package's own
    // dsql driver (storage/sql-client.ts): every statement `fn` issues MUST
    // go through the transaction-scoped client it receives, not the outer
    // pool client, or it lands on a different pooled connection outside the
    // transaction. OCC (SQLSTATE 40001) retries the whole
    // connect→BEGIN→fn→COMMIT cycle — `fn` must be safe to re-run in full,
    // which provisionCredential's write set already assumes.
    async transaction<T>(fn: (tx: SqlClient) => Promise<T>): Promise<T> {
      return dsql.withOccRetry(async () => {
        const txConn = await pool.connect();
        try {
          await txConn.query("BEGIN");
          const tx: SqlClient = {
            ...dsqlQueries(txConn, dsql),
            async transaction() {
              throw new Error("nested transactions are not supported");
            },
            async close() {
              // The outer client owns the pool; a nested close is a no-op.
            },
          };
          const result = await fn(tx);
          await txConn.query("COMMIT");
          return result;
        } catch (err) {
          await txConn.query("ROLLBACK").catch(() => undefined);
          throw err;
        } finally {
          txConn.release();
        }
      });
    },
    async close() {},
  };
  return createSqlStorage(client);
}

let _storage: Promise<RegistryStorage> | undefined;

export function getRegistryStorage(): Promise<RegistryStorage> {
  _storage ??= (async () => {
    switch (storeBackend()) {
      case "dsql":
        return createDsqlBackedStorage();
      case "sqlite": {
        const { createStorage } = await import("@aprovan/registry-server");
        return createStorage({ driver: "sqlite", dir: workspaceDataDir() });
      }
    }
  })();
  return _storage;
}

export async function resetRegistryStorage(): Promise<void> {
  const pending = _storage;
  _storage = undefined;
  if (pending) {
    await pending.then((storage) => storage.close()).catch(() => undefined);
  }
}

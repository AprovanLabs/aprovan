/**
 * The workspace's handle on `@aprovan/registry-server` storage — the WS-3
 * dispatch-plane seam. Credentials and interface bindings (as profile rows)
 * live THERE on the durable backends:
 *
 *   sqlite — local mode: the package's own sqlite driver on `registry.db`
 *            beside `workspace.db`.
 *   dsql   — cloud: the package's SQL stores over the shared db/dsql.ts pool
 *            (IAM tokens, OCC retry, 60-min recycling) inside the `registry`
 *            schema, so the package DDL and the workspace DDL share the ONE
 *            cluster without table-name collisions.
 *   dynamo — unsupported by design (WS-3 D8: the package has no Dynamo
 *            driver). Callers on the interim dynamo backend keep their
 *            legacy stores until the cutover flips to dsql.
 */

import { storeBackend, workspaceDataDir } from "./runtime/config.js";
import type { RegistryStorage } from "@aprovan/registry-server";

async function createDsqlBackedStorage(): Promise<RegistryStorage> {
  const [{ createSqlStorage }, dsql] = await Promise.all([
    import("@aprovan/registry-server"),
    import("./db/dsql.js"),
  ]);
  const pool = await dsql.dsqlRegistryPool();
  const toPg = (sql: string): string => {
    let index = 0;
    return sql.replace(/\?/gu, () => `$${++index}`);
  };
  return createSqlStorage({
    async exec(sql) {
      for (const statement of sql.split(/;\s*(?:\n|$)/u)) {
        const trimmed = statement.trim();
        if (trimmed) await pool.query(trimmed);
      }
    },
    async all(sql, params = []) {
      const result = await dsql.withOccRetry(() => pool.query(toPg(sql), params));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.rows as any;
    },
    async run(sql, params = []) {
      const result = await dsql.withOccRetry(() => pool.query(toPg(sql), params));
      return { changes: result.rowCount ?? 0 };
    },
    async close() {
      // The pool is shared with the workspace stores; db/dsql.ts owns it.
    },
  });
}

let _storage: Promise<RegistryStorage> | undefined;

/** The registry-server storage for this deployment's backend. */
export function getRegistryStorage(): Promise<RegistryStorage> {
  _storage ??= (async () => {
    const backend = storeBackend();
    switch (backend) {
      case "dsql":
        return createDsqlBackedStorage();
      case "sqlite": {
        const { createStorage } = await import("@aprovan/registry-server");
        return createStorage({ driver: "sqlite", dir: workspaceDataDir() });
      }
      case "dynamo":
        throw new Error(
          "registry-server storage has no DynamoDB driver (WS-3 D8) — the interim dynamo backend keeps its legacy stores until the DSQL cutover.",
        );
    }
  })();
  return _storage;
}

/** Reset the memoized storage (tests switch backends/data dirs). */
export async function resetRegistryStorage(): Promise<void> {
  const pending = _storage;
  _storage = undefined;
  if (pending) {
    await pending.then((storage) => storage.close()).catch(() => undefined);
  }
}

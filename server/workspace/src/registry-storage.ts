/**
 * The workspace's handle on `@aprovan/registry-server` storage — the WS-3
 * dispatch-plane seam. Profile rows live on sqlite/dsql registry storage.
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
        if (trimmed) await dsql.execDsqlDdl(pool, trimmed);
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
    async close() {},
  });
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

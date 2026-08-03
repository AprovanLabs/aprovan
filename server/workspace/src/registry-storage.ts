/**
 * The workspace's handle on `@aprovan/registry-server` storage — the WS-3
 * dispatch-plane seam. Profile rows live on sqlite/dsql registry storage, or
 * on Dynamo via `createDynamoStorage` colocated in the Credentials table.
 */

import { adaptCredentialStore } from "./credential-store-adapter.js";
import { getCredentialStore } from "./credentials.js";
import { dynamo } from "./db/client.js";
import { storeBackend, workspaceDataDir } from "./runtime/config.js";
import type { DynamoCommands, DynamoSend, RegistryStorage } from "@aprovan/registry-server";

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
    async close() {},
  });
}

let _storage: Promise<RegistryStorage> | undefined;

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
      case "dynamo": {
        const [{ createDynamoStorage }, ddb, { client }] = await Promise.all([
          import("@aprovan/registry-server"),
          import("@aws-sdk/lib-dynamodb"),
          dynamo(),
        ]);
        return createDynamoStorage({
          tableName: process.env["CREDENTIALS_TABLE"] ?? "Credentials",
          send: ((command) => client.send(command as never)) as DynamoSend,
          credentials: adaptCredentialStore(getCredentialStore()),
          commands: {
            GetCommand: ddb.GetCommand as unknown as DynamoCommands["GetCommand"],
            PutCommand: ddb.PutCommand as unknown as DynamoCommands["PutCommand"],
            QueryCommand: ddb.QueryCommand as unknown as DynamoCommands["QueryCommand"],
            TransactWriteCommand:
              ddb.TransactWriteCommand as unknown as DynamoCommands["TransactWriteCommand"],
            DeleteCommand: ddb.DeleteCommand as unknown as DynamoCommands["DeleteCommand"],
          },
        });
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

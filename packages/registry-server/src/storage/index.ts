/**
 * Storage entry point: driver selection (tech-plan D8). `sqlite`/`libsql`
 * share one dialect and one store implementation; `dsql` mirrors the schema
 * through the postgres adapter. A caller may inject a complete
 * `RegistryStorage` implementation instead.
 */

import {
  createDsqlClient,
  createLibsqlClient,
  createSqliteClient,
} from "./sql-client.js";
import { createSqlStorage } from "./sql-storage.js";
import { isRegistryStorage, type RegistryStorage } from "./types.js";

export * from "./types.js";
export { SCHEMA_DDL } from "./schema.js";
export { createSqlStorage } from "./sql-storage.js";
export { UniqueConstraintError, type SqlClient } from "./sql-client.js";

export type StorageOptions =
  | { driver: "sqlite" | "libsql"; url?: string; dir?: string }
  | { driver: "dsql"; url: string }
  | RegistryStorage;

export async function createStorage(options: StorageOptions): Promise<RegistryStorage> {
  if (isRegistryStorage(options)) return options;
  switch (options.driver) {
    case "sqlite":
      return createSqlStorage(createSqliteClient(options));
    case "libsql":
      return createSqlStorage(await createLibsqlClient(options));
    case "dsql":
      return createSqlStorage(await createDsqlClient(options));
  }
}

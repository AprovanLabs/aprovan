/**
 * `utdk/snowflake` — Snowflake provider over the SQL API v2.
 *
 * Handwritten (statement submit/poll/partition assembly doesn't fit the
 * OpenAPI-generated mold) but honors the standard UTDK provider contract:
 * `createSnowflakeClient({ headers, baseUrl? })` returns the operation
 * surface, with the PAT injected as `Authorization: Bearer …`. The query
 * engine and result contract live in `@utdk/sql`.
 */

import {
  secretFromHeaders,
  sqlToolEntries,
  type SqlClientOptions,
  type SqlQueryArgs,
  type SqlQueryResult,
} from "@utdk/sql";
import { snowflakeQuery } from "@utdk/sql/snowflake";
import { createLazyClient } from "../client.js";

export type { SqlQueryArgs, SqlQueryResult } from "@utdk/sql";

export interface SnowflakeClient {
  /**
   * Run a SQL statement; positional params via `?` + `params: [..]`.
   * Connection args: `account` (required unless baseUrl set), optional
   * `database`, `schema`, `warehouse`, `role`, `token_type`.
   */
  query(args: SqlQueryArgs): Promise<SqlQueryResult>;
}

export async function createSnowflakeClient(
  options: SqlClientOptions = {},
): Promise<SnowflakeClient> {
  return {
    query: async (args) =>
      snowflakeQuery(secretFromHeaders(options.headers, "snowflake", "access token"), args, {
        baseUrl: options.baseUrl,
        fetchImpl: options.fetchImpl,
      }),
  };
}

const defaultClient = createLazyClient(() => createSnowflakeClient());

export default defaultClient;

/** Discovery entries for GET /tools. */
export const tools = sqlToolEntries("snowflake", {
  placeholder: "?",
  params: "positional",
  connectionOptions: ["account", "database", "schema", "warehouse", "role", "token_type"],
});

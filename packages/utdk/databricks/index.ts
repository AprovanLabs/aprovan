/**
 * `utdk/databricks` — Databricks provider over the SQL Statement Execution
 * API.
 *
 * Handwritten (statement submit/poll doesn't fit the OpenAPI-generated
 * mold) but honors the standard UTDK provider contract:
 * `createDatabricksClient({ headers, baseUrl? })` returns the operation
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
import { databricksQuery } from "@utdk/sql/databricks";
import { createLazyClient } from "../client.js";

export type { SqlQueryArgs, SqlQueryResult } from "@utdk/sql";

export interface DatabricksClient {
  /**
   * Run a SQL statement; named params via `:name` + `params: { name: … }`.
   * Connection args: `host` (or factory baseUrl) + `warehouse_id`, required.
   */
  query(args: SqlQueryArgs): Promise<SqlQueryResult>;
}

export async function createDatabricksClient(
  options: SqlClientOptions = {},
): Promise<DatabricksClient> {
  return {
    query: async (args) =>
      databricksQuery(secretFromHeaders(options.headers, "databricks", "access token"), args, {
        baseUrl: options.baseUrl,
        fetchImpl: options.fetchImpl,
      }),
  };
}

const defaultClient = createLazyClient(() => createDatabricksClient());

export default defaultClient;

/** Discovery entries for GET /tools. */
export const tools = sqlToolEntries("databricks", {
  placeholder: ":name",
  params: "named",
  connectionOptions: ["host", "warehouse_id"],
});

/**
 * `utdk/postgres` — PostgreSQL provider.
 *
 * Handwritten (databases don't fit the OpenAPI-generated mold) but honors
 * the standard UTDK provider contract: `createPostgresClient({ headers })`
 * returns the operation surface, with the credential injected as
 * `Authorization: Bearer <connection string>`. The query engine and result
 * contract live in `@utdk/sql`.
 */

import {
  secretFromHeaders,
  sqlToolEntries,
  type SqlClientOptions,
  type SqlQueryArgs,
  type SqlQueryResult,
} from "@utdk/sql";
import { postgresQuery } from "@utdk/sql/postgres";
import { createLazyClient } from "../client.js";

export type { SqlQueryArgs, SqlQueryResult } from "@utdk/sql";

export interface PostgresClient {
  /** Run a SQL statement; positional params via `$1, $2` + `params: [..]`. */
  query(args: SqlQueryArgs): Promise<SqlQueryResult>;
}

export async function createPostgresClient(
  options: SqlClientOptions = {},
): Promise<PostgresClient> {
  return {
    query: async (args) =>
      postgresQuery(secretFromHeaders(options.headers, "postgres", "connection string"), args),
  };
}

const defaultClient = createLazyClient(() => createPostgresClient());

export default defaultClient;

/** Discovery entries for GET /tools. */
export const tools = sqlToolEntries("postgres", {
  placeholder: "$1, $2",
  params: "positional",
  connectionOptions: [],
});

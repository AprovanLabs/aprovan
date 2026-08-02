/**
 * Postgres query engine — direct wire-protocol connection via `pg`.
 *
 * The secret is a connection string
 * (`postgres://user:pass@host:5432/db?sslmode=require`); TLS mode and
 * database ride the string itself. One short-lived connection per query
 * keeps serverless execution simple; pooling can come later behind the
 * same contract.
 */

import pg from "pg";
import {
  MAX_ROWS,
  SqlError,
  deadlineFor,
  positionalParams,
  validateArgs,
  type SqlQueryArgs,
  type SqlQueryResult,
} from "./index.js";

/** Common type OIDs → names; anything else reports the raw OID. */
const OID_NAMES: Record<number, string> = {
  16: "bool",
  20: "int8",
  21: "int2",
  23: "int4",
  25: "text",
  114: "json",
  700: "float4",
  701: "float8",
  1043: "varchar",
  1082: "date",
  1114: "timestamp",
  1184: "timestamptz",
  1700: "numeric",
  2950: "uuid",
  3802: "jsonb",
};

export async function postgresQuery(
  secret: string,
  args: SqlQueryArgs,
): Promise<SqlQueryResult> {
  validateArgs(args);
  const params = positionalParams(args, "postgres", "$1, $2");
  const { timeoutMs } = deadlineFor(args);
  const client = new pg.Client({
    connectionString: secret,
    connectionTimeoutMillis: Math.min(10_000, timeoutMs),
    statement_timeout: timeoutMs,
    query_timeout: timeoutMs,
  });
  try {
    await client.connect();
  } catch (err) {
    throw new SqlError(
      `postgres connection failed: ${err instanceof Error ? err.message : String(err)}`,
      502,
    );
  }
  try {
    const result = await client.query({
      text: args.sql,
      values: params ?? [],
      rowMode: "array",
    });
    // Multi-statement text yields an array of results; report the last one
    // (psql semantics).
    const last = Array.isArray(result) ? result[result.length - 1] : result;
    const rows = (last?.rows ?? []) as unknown[][];
    return {
      columns: (last?.fields ?? []).map((field: { name: string; dataTypeID: number }) => ({
        name: field.name,
        type: OID_NAMES[field.dataTypeID] ?? String(field.dataTypeID),
      })),
      rows: rows.slice(0, MAX_ROWS),
      rowCount: typeof last?.rowCount === "number" ? last.rowCount : rows.length,
      truncated: rows.length > MAX_ROWS,
    };
  } catch (err) {
    if (err instanceof SqlError) throw err;
    throw new SqlError(
      `postgres query failed: ${err instanceof Error ? err.message : String(err)}`,
      400,
    );
  } finally {
    await client.end().catch(() => {});
  }
}

/**
 * Snowflake query engine — SQL API v2 (`POST /api/v2/statements`).
 *
 * Secret: a programmatic access token (PAT) by default; pass
 * `token_type: "KEYPAIR_JWT"` for key-pair JWTs. Connection args:
 * `account` (required — the account identifier, e.g. `myorg-myaccount`),
 * plus optional `database`, `schema`, `warehouse`, `role`. Long statements
 * return 202 + a handle and are polled until the deadline; large results
 * paginate as partitions, fetched until MAX_ROWS.
 */

import {
  MAX_ROWS,
  SqlError,
  deadlineFor,
  optionString,
  pollWait,
  positionalParams,
  validateArgs,
  type SqlColumn,
  type SqlQueryArgs,
  type SqlQueryResult,
} from "./index.js";

interface SnowflakeResponse {
  statementHandle?: string;
  message?: string;
  resultSetMetaData?: {
    numRows?: number;
    partitionInfo?: Array<{ rowCount: number }>;
    rowType?: Array<{ name: string; type: string }>;
  };
  data?: unknown[][];
}

function bindingsFor(
  params: unknown[] | undefined,
): Record<string, { type: string; value: string }> | undefined {
  if (!params) return undefined;
  const bindings: Record<string, { type: string; value: string }> = {};
  params.forEach((value, index) => {
    const type =
      typeof value === "number"
        ? Number.isInteger(value)
          ? "FIXED"
          : "REAL"
        : typeof value === "boolean"
          ? "BOOLEAN"
          : "TEXT";
    bindings[String(index + 1)] = { type, value: String(value) };
  });
  return bindings;
}

export async function snowflakeQuery(
  secret: string,
  args: SqlQueryArgs,
  options: { baseUrl?: string; fetchImpl?: typeof fetch } = {},
): Promise<SqlQueryResult> {
  validateArgs(args);
  const params = positionalParams(args, "snowflake", "?");
  const account = optionString(args, "account");
  if (!account && !options.baseUrl) {
    throw new SqlError(
      `snowflake needs an account identifier: bind the sql interface with options: { account: "myorg-myaccount" }`,
      400,
    );
  }
  const fetchImpl = options.fetchImpl ?? fetch;
  const root =
    options.baseUrl?.replace(/\/+$/u, "") ?? `https://${account}.snowflakecomputing.com`;
  const base = `${root}/api/v2/statements`;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${secret}`,
    "X-Snowflake-Authorization-Token-Type":
      optionString(args, "token_type") ?? "PROGRAMMATIC_ACCESS_TOKEN",
  };
  const { deadline, timeoutMs } = deadlineFor(args);

  let res = await fetchImpl(base, {
    method: "POST",
    headers,
    body: JSON.stringify({
      statement: args.sql,
      timeout: Math.ceil(timeoutMs / 1000),
      database: optionString(args, "database"),
      schema: optionString(args, "schema"),
      warehouse: optionString(args, "warehouse"),
      role: optionString(args, "role"),
      bindings: bindingsFor(params),
    }),
  });
  let body = (await res.json().catch(() => ({}))) as SnowflakeResponse;

  // 202 = still executing; poll the handle.
  while (res.status === 202) {
    if (!body.statementHandle) {
      throw new SqlError("snowflake returned 202 without a statement handle", 502);
    }
    await pollWait(deadline, timeoutMs, "snowflake query");
    res = await fetchImpl(`${base}/${body.statementHandle}`, { headers });
    body = (await res.json().catch(() => ({}))) as SnowflakeResponse;
  }
  if (!res.ok) {
    throw new SqlError(`snowflake query failed: ${body.message ?? `HTTP ${res.status}`}`, 400);
  }

  const meta = body.resultSetMetaData;
  const columns: SqlColumn[] = (meta?.rowType ?? []).map((column) => ({
    name: column.name,
    type: column.type,
  }));
  const rows: unknown[][] = [...(body.data ?? [])];

  // Partitions beyond the first arrive via ?partition=N.
  const partitions = meta?.partitionInfo?.length ?? 1;
  for (let partition = 1; partition < partitions && rows.length < MAX_ROWS; partition += 1) {
    if (Date.now() > deadline) break;
    const pageRes = await fetchImpl(`${base}/${body.statementHandle}?partition=${partition}`, {
      headers,
    });
    if (!pageRes.ok) break;
    const page = (await pageRes.json().catch(() => ({}))) as SnowflakeResponse;
    rows.push(...(page.data ?? []));
  }

  const total = meta?.numRows ?? rows.length;
  return {
    columns,
    rows: rows.slice(0, MAX_ROWS),
    rowCount: total,
    truncated: total > Math.min(rows.length, MAX_ROWS) || rows.length > MAX_ROWS,
  };
}

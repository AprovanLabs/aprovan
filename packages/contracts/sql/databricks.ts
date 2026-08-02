/**
 * Databricks query engine — SQL Statement Execution API
 * (`POST /api/2.0/sql/statements`).
 *
 * Secret: a personal access token. Connection args: `host` (required —
 * `https://<workspace>.cloud.databricks.com`, or the factory's baseUrl) and
 * `warehouse_id` (required). Statements use named `:param` placeholders;
 * positional arrays are rejected. Results are requested inline as
 * JSON_ARRAY; long statements poll until the deadline.
 */

import {
  MAX_ROWS,
  SqlError,
  deadlineFor,
  namedParams,
  optionString,
  pollWait,
  validateArgs,
  type SqlQueryArgs,
  type SqlQueryResult,
} from "./index.js";

interface DatabricksResponse {
  statement_id?: string;
  status?: { state?: string; error?: { message?: string } };
  manifest?: {
    truncated?: boolean;
    total_row_count?: number;
    schema?: { columns?: Array<{ name: string; type_name?: string; type_text?: string }> };
  };
  result?: { data_array?: unknown[][] };
  message?: string;
}

export async function databricksQuery(
  secret: string,
  args: SqlQueryArgs,
  options: { baseUrl?: string; fetchImpl?: typeof fetch } = {},
): Promise<SqlQueryResult> {
  validateArgs(args);
  const params = namedParams(args, "databricks", ":name");
  const host = optionString(args, "host") ?? options.baseUrl ?? "";
  const warehouseId = optionString(args, "warehouse_id") ?? "";
  if (!host || !warehouseId) {
    throw new SqlError(
      `databricks needs host + warehouse_id: bind the sql interface with options: { host: "https://….cloud.databricks.com", warehouse_id: "…" }`,
      400,
    );
  }
  const fetchImpl = options.fetchImpl ?? fetch;
  const base = `${host.replace(/\/+$/u, "")}/api/2.0/sql/statements`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${secret}`,
  };
  const { deadline, timeoutMs } = deadlineFor(args);

  const parameters = params
    ? Object.entries(params).map(([name, value]) => ({
        name,
        value: value === null || value === undefined ? null : String(value),
      }))
    : undefined;

  let res = await fetchImpl(base, {
    method: "POST",
    headers,
    body: JSON.stringify({
      statement: args.sql,
      warehouse_id: warehouseId,
      wait_timeout: "30s",
      on_wait_timeout: "CONTINUE",
      format: "JSON_ARRAY",
      disposition: "INLINE",
      row_limit: MAX_ROWS,
      parameters,
    }),
  });
  let body = (await res.json().catch(() => ({}))) as DatabricksResponse;
  if (!res.ok) {
    throw new SqlError(`databricks query failed: ${body.message ?? `HTTP ${res.status}`}`, 400);
  }

  while (body.status?.state === "PENDING" || body.status?.state === "RUNNING") {
    if (!body.statement_id) {
      throw new SqlError("databricks returned a running state without a statement id", 502);
    }
    await pollWait(deadline, timeoutMs, "databricks query");
    res = await fetchImpl(`${base}/${body.statement_id}`, { headers });
    body = (await res.json().catch(() => ({}))) as DatabricksResponse;
    if (!res.ok) {
      throw new SqlError(`databricks query failed: ${body.message ?? `HTTP ${res.status}`}`, 400);
    }
  }
  if (body.status?.state !== "SUCCEEDED") {
    throw new SqlError(
      `databricks query ${body.status?.state ?? "failed"}: ${body.status?.error?.message ?? "unknown error"}`,
      400,
    );
  }

  const rows = (body.result?.data_array ?? []).slice(0, MAX_ROWS);
  const total = body.manifest?.total_row_count ?? rows.length;
  return {
    columns: (body.manifest?.schema?.columns ?? []).map((column) => ({
      name: column.name,
      type: column.type_name ?? column.type_text ?? "unknown",
    })),
    rows,
    rowCount: total,
    truncated: Boolean(body.manifest?.truncated) || total > rows.length,
  };
}

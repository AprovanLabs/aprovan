/**
 * @utdk/sql — the shared SQL contract for UTDK database providers.
 *
 * Database backends don't fit the OpenAPI-generated client mold (wire
 * protocols, statement submit/poll loops, result-chunk assembly), so their
 * provider modules (`utdk/postgres`, `utdk/snowflake`, `utdk/databricks`)
 * are handwritten — but they all speak this one contract:
 *
 *   - `query({ sql, params, ...connection })` is the operation surface;
 *   - params follow the backend's own placeholder syntax (`$1` postgres,
 *     `?` snowflake, `:name` databricks), validated up front;
 *   - every backend resolves to the same `SqlQueryResult` shape;
 *   - the secret (access token or connection string) arrives as the
 *     standard UTDK `Authorization: Bearer …` header injection;
 *   - non-secret connection config (account, host, warehouse, database)
 *     arrives in the query args — the gateway's interface bindings merge
 *     workspace defaults in.
 *
 * Adding a database = one thin provider module wrapping a query engine that
 * honors this contract; nothing gateway-side changes.
 */

/** Rows returned to a caller are capped; `truncated` reports the cut. */
export const MAX_ROWS = 10_000;

/** Default per-query deadline; override per call with `timeout_ms`. */
export const DEFAULT_TIMEOUT_MS = 55_000;

export interface SqlColumn {
  name: string;
  /** Backend-reported type name (informational, not normalized). */
  type: string;
}

export interface SqlQueryResult {
  columns: SqlColumn[];
  /** Row-major values; cell representation is backend-native. */
  rows: unknown[][];
  rowCount: number;
  truncated: boolean;
}

/**
 * The `query` operation's arguments: the statement, optional params, an
 * optional deadline, and backend-specific connection options.
 */
export interface SqlQueryArgs {
  sql: string;
  params?: unknown[] | Record<string, unknown>;
  timeout_ms?: number;
  [option: string]: unknown;
}

/** Error with an HTTP-ish status for hosts that map errors onto responses. */
export class SqlError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "SqlError";
    this.status = status;
  }
}

/** Options every SQL provider client factory accepts. */
export interface SqlClientOptions {
  /** Injected headers; the secret rides `Authorization: Bearer …`. */
  headers?: Record<string, string>;
  baseUrl?: string;
  /** Injection point for tests. */
  fetchImpl?: typeof fetch;
}

/**
 * Pull the provider secret out of the injected headers (the UTDK executor
 * translates a `bearer_token` credential into `Authorization: Bearer …`).
 */
export function secretFromHeaders(
  headers: Record<string, string> | undefined,
  provider: string,
  secretName: string,
): string {
  const raw = headers?.["Authorization"] ?? headers?.["authorization"] ?? "";
  const match = /^Bearer\s+(.+)$/iu.exec(raw);
  if (!match?.[1]) {
    throw new SqlError(
      `${provider} needs a bearer_token credential holding the ${secretName}. Add one for provider "${provider}".`,
      400,
    );
  }
  return match[1];
}

export function validateArgs(args: SqlQueryArgs): void {
  if (typeof args.sql !== "string" || !args.sql.trim()) {
    throw new SqlError(`query requires { sql: "SELECT ..." }`, 400);
  }
  if (
    args.params !== undefined &&
    !Array.isArray(args.params) &&
    (typeof args.params !== "object" || args.params === null)
  ) {
    throw new SqlError("params must be an array or an object", 400);
  }
}

export function positionalParams(
  args: SqlQueryArgs,
  provider: string,
  syntax: string,
): unknown[] | undefined {
  if (args.params === undefined) return undefined;
  if (!Array.isArray(args.params)) {
    throw new SqlError(`${provider} uses positional params: sql \`${syntax}\` with params: [..]`, 400);
  }
  return args.params;
}

export function namedParams(
  args: SqlQueryArgs,
  provider: string,
  syntax: string,
): Record<string, unknown> | undefined {
  if (args.params === undefined) return undefined;
  if (Array.isArray(args.params)) {
    throw new SqlError(
      `${provider} uses named params: sql \`${syntax}\` with params: { name: value }`,
      400,
    );
  }
  return args.params;
}

/** String connection option from query args, or undefined. */
export function optionString(args: SqlQueryArgs, key: string): string | undefined {
  const value = args[key];
  return typeof value === "string" && value ? value : undefined;
}

export function deadlineFor(args: SqlQueryArgs): { deadline: number; timeoutMs: number } {
  const timeoutMs =
    typeof args.timeout_ms === "number" && args.timeout_ms > 0
      ? args.timeout_ms
      : DEFAULT_TIMEOUT_MS;
  return { deadline: Date.now() + timeoutMs, timeoutMs };
}

/** Sleep between poll rounds; throws SqlError 504 past the deadline. */
export async function pollWait(deadline: number, timeoutMs: number, what: string): Promise<void> {
  if (Date.now() > deadline) {
    throw new SqlError(`${what} timed out after ${timeoutMs}ms`, 504);
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
}

/**
 * Tool-discovery entries for a SQL provider — the static `tools` export the
 * gateway's `GET /tools` prefers over runtime metadata. One entry: `query`.
 */
export function sqlToolEntries(
  provider: string,
  details: { placeholder: string; params: "positional" | "named"; connectionOptions: string[] },
): Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> {
  const paramsDescription =
    details.params === "positional"
      ? `Positional params bound to ${details.placeholder} placeholders`
      : `Named params bound to ${details.placeholder} placeholders`;
  const properties: Record<string, unknown> = {
    sql: { type: "string", description: "SQL statement to execute" },
    params:
      details.params === "positional"
        ? { type: "array", description: paramsDescription }
        : { type: "object", description: paramsDescription },
    timeout_ms: { type: "number", description: "Per-query deadline (default 55s)" },
  };
  for (const option of details.connectionOptions) {
    properties[option] = {
      type: "string",
      description: `Connection option (usually set via the sql interface binding)`,
    };
  }
  return [
    {
      name: `${provider}.query`,
      description:
        `Run a SQL statement and return { columns, rows, rowCount, truncated } (rows capped at ${MAX_ROWS}). ` +
        paramsDescription +
        ".",
      inputSchema: { type: "object", properties, required: ["sql"] },
    },
  ];
}

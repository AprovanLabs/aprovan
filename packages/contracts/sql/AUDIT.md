# Shape audit — @utdk/sql

Paper audit (documentation-level) of the contract surface against real vendor
APIs, per Decision 8. Freeze criterion for the 0.2.0 bump.

## Vendors

1. **MySQL over PlanetScale HTTP** (`/psdb.v1alpha1.Database/Execute`)
2. **Google BigQuery** (`jobs.query` REST API)
3. **DuckDB via MotherDuck** (SQL-over-HTTP / client API)

## Per-operation mapping

### `query` (`SqlQueryArgs` → `SqlQueryResult`)

| Contract element | PlanetScale HTTP | BigQuery `jobs.query` | MotherDuck/DuckDB |
| --- | --- | --- | --- |
| `sql` statement string | `query` field | `query` field | statement string |
| `params` positional | `?` placeholders via session API | `queryParameters` (positional mode) | `?`/`$1` prepared params |
| `params` named | `:name` (client-side bind) | `queryParameters` with `name` (named mode) | `$name` prepared params |
| `options.timeoutMs` → deadline | request timeout (no server deadline) | `timeoutMs` on the request | client-side deadline |
| `columns: SqlColumn[]` (name + type) | `fields[]` (name, type) | `schema.fields[]` (name, type) | result schema (name, type) |
| `rows` as arrays of JSON values | `rows[]` (values decoded per field) | `rows[].f[].v` (string-encoded, needs decode) | rows as typed values |
| `rowCount` / truncation at `MAX_ROWS` | `rowsAffected` + row list length | `totalRows` (may exceed page) | row list length |
| polling helper (`deadlineFor`) | not needed (synchronous) | needed: `jobComplete: false` → `getQueryResults` polling | not needed (synchronous) |
| error → `SqlError(status)` | HTTP status + Vitess error code | HTTP status + `error.errors[].reason` | HTTP status / SQL error string |

Findings:

- All three vendors accept a single-statement string with bind parameters;
  both positional and named conventions are expressible (`positionalParams` /
  `namedParams` cover the split).
- BigQuery's string-encoded cell values (`f[].v`) require adapter-side
  decoding into JSON values — a driver concern, no contract change; the
  contract's "rows are JSON values" posture holds.
- BigQuery's async job model maps onto the existing `deadlineFor` +
  polling-helper posture already used by the Snowflake and Databricks
  engines; no new contract surface needed.
- Row truncation at `MAX_ROWS` (10k) is below every vendor's page maximum, so
  a single result shape works without contract-level pagination.

## Changes

No change. The surface (one `query` operation, `SqlColumn`/`SqlQueryResult`
shapes, positional + named param helpers, deadline/polling helpers,
`SqlError` with HTTP-ish status) mapped onto all three vendors without
modification.

## Verdict

**Frozen at 0.2.0.** All operations implementable against all three audited
vendors; asynchronous-job backends are covered by the existing deadline and
polling helpers.

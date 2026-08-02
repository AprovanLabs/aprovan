# Batch Exports

## Operations

### `posthog.environmentsBatchExportsList`

- **HTTP**: `GET /api/environments/{environment_id}/batch_exports/`
- **OpenAPI operationId**: `environments_batch_exports_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Com...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsListInput = Parameters<typeof posthog.environmentsBatchExportsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsListOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsList>>;

const result: EnvironmentsBatchExportsListOutput = await posthog.environmentsBatchExportsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Com...
```

### `posthog.environmentsBatchExportsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/batch_exports/`
- **OpenAPI operationId**: `environments_batch_exports_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsCreateInput = Parameters<typeof posthog.environmentsBatchExportsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsCreate>>;

const result: EnvironmentsBatchExportsCreateOutput = await posthog.environmentsBatchExportsCreate();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.environmentsBatchExportsBackfillsList`

- **HTTP**: `GET /api/environments/{environment_id}/batch_exports/{batch_export_id}/backfills/`
- **What it does**: ViewSet for BatchExportBackfill models.

Allows creating and reading backfills, but not updating or deleting them.
- **OpenAPI operationId**: `environments_batch_exports_backfills_list`
- **Path params**: `batch_export_id`
- **Query params**: `cursor`, `ordering`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; results: ({ id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsBackfillsListInput = Parameters<typeof posthog.environmentsBatchExportsBackfillsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsBackfillsListOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsBackfillsList>>;

const result: EnvironmentsBatchExportsBackfillsListOutput = await posthog.environmentsBatchExportsBackfillsList();

// Result shape (from schema): { next?: string | null; previous?: string | null; results: ({ id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNe...
```

### `posthog.environmentsBatchExportsBackfillsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/batch_exports/{batch_export_id}/backfills/`
- **What it does**: Create a new backfill for a BatchExport.
- **OpenAPI operationId**: `environments_batch_exports_backfills_create`
- **Path params**: `batch_export_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "Terminated" | "TimedOut...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsBackfillsCreateInput = Parameters<typeof posthog.environmentsBatchExportsBackfillsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsBackfillsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsBackfillsCreate>>;

const result: EnvironmentsBatchExportsBackfillsCreateOutput = await posthog.environmentsBatchExportsBackfillsCreate();

// Result shape (from schema): { id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "Terminated" | "TimedOut...
```

### `posthog.environmentsBatchExportsBackfillsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/batch_exports/{batch_export_id}/backfills/{id}/`
- **What it does**: ViewSet for BatchExportBackfill models.

Allows creating and reading backfills, but not updating or deleting them.
- **OpenAPI operationId**: `environments_batch_exports_backfills_retrieve`
- **Path params**: `batch_export_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "Terminated" | "TimedOut...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsBackfillsRetrieveInput = Parameters<typeof posthog.environmentsBatchExportsBackfillsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsBackfillsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsBackfillsRetrieve>>;

const result: EnvironmentsBatchExportsBackfillsRetrieveOutput = await posthog.environmentsBatchExportsBackfillsRetrieve();

// Result shape (from schema): { id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "Terminated" | "TimedOut...
```

### `posthog.environmentsBatchExportsBackfillsCancelCreate`

- **HTTP**: `POST /api/environments/{environment_id}/batch_exports/{batch_export_id}/backfills/{id}/cancel/`
- **What it does**: Cancel a batch export backfill.
- **OpenAPI operationId**: `environments_batch_exports_backfills_cancel_create`
- **Path params**: `batch_export_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsBackfillsCancelCreateInput = Parameters<typeof posthog.environmentsBatchExportsBackfillsCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsBackfillsCancelCreateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsBackfillsCancelCreate>>;

const result: EnvironmentsBatchExportsBackfillsCancelCreateOutput = await posthog.environmentsBatchExportsBackfillsCancelCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsBatchExportsRunsList`

- **HTTP**: `GET /api/environments/{environment_id}/batch_exports/{batch_export_id}/runs/`
- **OpenAPI operationId**: `environments_batch_exports_runs_list`
- **Path params**: `batch_export_id`
- **Query params**: `cursor`, `ordering`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; results: ({ id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" | "Running" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsRunsListInput = Parameters<typeof posthog.environmentsBatchExportsRunsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsRunsListOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsRunsList>>;

const result: EnvironmentsBatchExportsRunsListOutput = await posthog.environmentsBatchExportsRunsList();

// Result shape (from schema): { next?: string | null; previous?: string | null; results: ({ id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" | "Running" | "...
```

### `posthog.environmentsBatchExportsRunsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/batch_exports/{batch_export_id}/runs/{id}/`
- **OpenAPI operationId**: `environments_batch_exports_runs_retrieve`
- **Path params**: `batch_export_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" | "Running" | "Starting"; records_completed?: number | null; records_failed...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsRunsRetrieveInput = Parameters<typeof posthog.environmentsBatchExportsRunsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsRunsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsRunsRetrieve>>;

const result: EnvironmentsBatchExportsRunsRetrieveOutput = await posthog.environmentsBatchExportsRunsRetrieve();

// Result shape (from schema): { id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" | "Running" | "Starting"; records_completed?: number | null; records_failed...
```

### `posthog.environmentsBatchExportsRunsCancelCreate`

- **HTTP**: `POST /api/environments/{environment_id}/batch_exports/{batch_export_id}/runs/{id}/cancel/`
- **What it does**: Cancel a batch export run.
- **OpenAPI operationId**: `environments_batch_exports_runs_cancel_create`
- **Path params**: `batch_export_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsRunsCancelCreateInput = Parameters<typeof posthog.environmentsBatchExportsRunsCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsRunsCancelCreateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsRunsCancelCreate>>;

const result: EnvironmentsBatchExportsRunsCancelCreateOutput = await posthog.environmentsBatchExportsRunsCancelCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsBatchExportsRunsLogsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/batch_exports/{batch_export_id}/runs/{id}/logs/`
- **OpenAPI operationId**: `environments_batch_exports_runs_logs_retrieve`
- **Path params**: `batch_export_id`, `id`
- **Query params**: `after`, `before`, `instance_id`, `level`, `limit`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsRunsLogsRetrieveInput = Parameters<typeof posthog.environmentsBatchExportsRunsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsRunsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsRunsLogsRetrieve>>;

const result: EnvironmentsBatchExportsRunsLogsRetrieveOutput = await posthog.environmentsBatchExportsRunsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsBatchExportsRunsRetryCreate`

- **HTTP**: `POST /api/environments/{environment_id}/batch_exports/{batch_export_id}/runs/{id}/retry/`
- **What it does**: Retry a batch export run.

We use the same underlying mechanism as when backfilling a batch export, as retrying
a run is the same as backfilling one run.
- **OpenAPI operationId**: `environments_batch_exports_runs_retry_create`
- **Path params**: `batch_export_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsRunsRetryCreateInput = Parameters<typeof posthog.environmentsBatchExportsRunsRetryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsRunsRetryCreateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsRunsRetryCreate>>;

const result: EnvironmentsBatchExportsRunsRetryCreateOutput = await posthog.environmentsBatchExportsRunsRetryCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsBatchExportsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `environments_batch_exports_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsDestroyInput = Parameters<typeof posthog.environmentsBatchExportsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsDestroy>>;

const result: EnvironmentsBatchExportsDestroyOutput = await posthog.environmentsBatchExportsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsBatchExportsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `environments_batch_exports_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsRetrieveInput = Parameters<typeof posthog.environmentsBatchExportsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsRetrieve>>;

const result: EnvironmentsBatchExportsRetrieveOutput = await posthog.environmentsBatchExportsRetrieve();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.environmentsBatchExportsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `environments_batch_exports_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsPartialUpdateInput = Parameters<typeof posthog.environmentsBatchExportsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsPartialUpdate>>;

const result: EnvironmentsBatchExportsPartialUpdateOutput = await posthog.environmentsBatchExportsPartialUpdate();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.environmentsBatchExportsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `environments_batch_exports_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsUpdateInput = Parameters<typeof posthog.environmentsBatchExportsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsUpdate>>;

const result: EnvironmentsBatchExportsUpdateOutput = await posthog.environmentsBatchExportsUpdate();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.environmentsBatchExportsLogsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/batch_exports/{id}/logs/`
- **OpenAPI operationId**: `environments_batch_exports_logs_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `instance_id`, `level`, `limit`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsLogsRetrieveInput = Parameters<typeof posthog.environmentsBatchExportsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsLogsRetrieve>>;

const result: EnvironmentsBatchExportsLogsRetrieveOutput = await posthog.environmentsBatchExportsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsBatchExportsPauseCreate`

- **HTTP**: `POST /api/environments/{environment_id}/batch_exports/{id}/pause/`
- **What it does**: Pause a BatchExport.
- **OpenAPI operationId**: `environments_batch_exports_pause_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsPauseCreateInput = Parameters<typeof posthog.environmentsBatchExportsPauseCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsPauseCreateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsPauseCreate>>;

const result: EnvironmentsBatchExportsPauseCreateOutput = await posthog.environmentsBatchExportsPauseCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsBatchExportsRunTestStepCreate`

- **HTTP**: `POST /api/environments/{environment_id}/batch_exports/{id}/run_test_step/`
- **OpenAPI operationId**: `environments_batch_exports_run_test_step_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsRunTestStepCreateInput = Parameters<typeof posthog.environmentsBatchExportsRunTestStepCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsRunTestStepCreateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsRunTestStepCreate>>;

const result: EnvironmentsBatchExportsRunTestStepCreateOutput = await posthog.environmentsBatchExportsRunTestStepCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsBatchExportsUnpauseCreate`

- **HTTP**: `POST /api/environments/{environment_id}/batch_exports/{id}/unpause/`
- **What it does**: Unpause a BatchExport.
- **OpenAPI operationId**: `environments_batch_exports_unpause_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsUnpauseCreateInput = Parameters<typeof posthog.environmentsBatchExportsUnpauseCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsUnpauseCreateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsUnpauseCreate>>;

const result: EnvironmentsBatchExportsUnpauseCreateOutput = await posthog.environmentsBatchExportsUnpauseCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsBatchExportsRunTestStepNewCreate`

- **HTTP**: `POST /api/environments/{environment_id}/batch_exports/run_test_step_new/`
- **OpenAPI operationId**: `environments_batch_exports_run_test_step_new_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsRunTestStepNewCreateInput = Parameters<typeof posthog.environmentsBatchExportsRunTestStepNewCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsRunTestStepNewCreateOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsRunTestStepNewCreate>>;

const result: EnvironmentsBatchExportsRunTestStepNewCreateOutput = await posthog.environmentsBatchExportsRunTestStepNewCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsBatchExportsTestRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/batch_exports/test/`
- **OpenAPI operationId**: `environments_batch_exports_test_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsBatchExportsTestRetrieveInput = Parameters<typeof posthog.environmentsBatchExportsTestRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsBatchExportsTestRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsBatchExportsTestRetrieve>>;

const result: EnvironmentsBatchExportsTestRetrieveOutput = await posthog.environmentsBatchExportsTestRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileDownloadBatchExportsList`

- **HTTP**: `GET /api/environments/{environment_id}/file_download_batch_exports/`
- **OpenAPI operationId**: `environments_file_download_batch_exports_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileDownloadBatchExportsListInput = Parameters<typeof posthog.environmentsFileDownloadBatchExportsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileDownloadBatchExportsListOutput = Awaited<ReturnType<typeof posthog.environmentsFileDownloadBatchExportsList>>;

const result: EnvironmentsFileDownloadBatchExportsListOutput = await posthog.environmentsFileDownloadBatchExportsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" ...
```

### `posthog.environmentsFileDownloadBatchExportsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_download_batch_exports/`
- **What it does**: Create and start a batch export on demand run to download a file.
- **OpenAPI operationId**: `environments_file_download_batch_exports_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileDownloadBatchExportsCreateInput = Parameters<typeof posthog.environmentsFileDownloadBatchExportsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileDownloadBatchExportsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileDownloadBatchExportsCreate>>;

const result: EnvironmentsFileDownloadBatchExportsCreateOutput = await posthog.environmentsFileDownloadBatchExportsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileDownloadBatchExportsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/file_download_batch_exports/{id}/`
- **What it does**: Get a batch export on demand run.

If the underlying batch export run has completed, we return keys to the
generated file downloads so that users may download them by making a request
to /download.
- **OpenAPI operationId**: `environments_file_download_batch_exports_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileDownloadBatchExportsRetrieveInput = Parameters<typeof posthog.environmentsFileDownloadBatchExportsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileDownloadBatchExportsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsFileDownloadBatchExportsRetrieve>>;

const result: EnvironmentsFileDownloadBatchExportsRetrieveOutput = await posthog.environmentsFileDownloadBatchExportsRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.environmentsFileDownloadBatchExportsCancelCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_download_batch_exports/{id}/cancel/`
- **What it does**: Cancel an ongoing file-download batch export.
- **OpenAPI operationId**: `environments_file_download_batch_exports_cancel_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileDownloadBatchExportsCancelCreateInput = Parameters<typeof posthog.environmentsFileDownloadBatchExportsCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileDownloadBatchExportsCancelCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileDownloadBatchExportsCancelCreate>>;

const result: EnvironmentsFileDownloadBatchExportsCancelCreateOutput = await posthog.environmentsFileDownloadBatchExportsCancelCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileDownloadBatchExportsDownloadRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/file_download_batch_exports/{id}/download/`
- **What it does**: Download a file (or a part) from this batch export run.

Users can provide a part component with an id or index, or no part component at
all:
* If part id is included: The file download matching the id is downloaded.
* If part index is included: The file download matching the index (as ordered
    by key) is downloaded.
* If no part component is present: If there is only one file downloaded, that
    is downloaded. Otherwise the first one as sorted by key is downloaded.
- **OpenAPI operationId**: `environments_file_download_batch_exports_download_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileDownloadBatchExportsDownloadRetrieveInput = Parameters<typeof posthog.environmentsFileDownloadBatchExportsDownloadRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileDownloadBatchExportsDownloadRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsFileDownloadBatchExportsDownloadRetrieve>>;

const result: EnvironmentsFileDownloadBatchExportsDownloadRetrieveOutput = await posthog.environmentsFileDownloadBatchExportsDownloadRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileDownloadBatchExportsLogsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/file_download_batch_exports/{id}/logs/`
- **OpenAPI operationId**: `environments_file_download_batch_exports_logs_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `instance_id`, `level`, `limit`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileDownloadBatchExportsLogsRetrieveInput = Parameters<typeof posthog.environmentsFileDownloadBatchExportsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileDownloadBatchExportsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsFileDownloadBatchExportsLogsRetrieve>>;

const result: EnvironmentsFileDownloadBatchExportsLogsRetrieveOutput = await posthog.environmentsFileDownloadBatchExportsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.orgOrganizationsBatchExportsList`

- **HTTP**: `GET /api/organizations/{organization_id}/batch_exports/`
- **OpenAPI operationId**: `org_organizations_batch_exports_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Com...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsListInput = Parameters<typeof posthog.orgOrganizationsBatchExportsList> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsListOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsList>>;

const result: OrgOrganizationsBatchExportsListOutput = await posthog.orgOrganizationsBatchExportsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Com...
```

### `posthog.orgOrganizationsBatchExportsCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/batch_exports/`
- **OpenAPI operationId**: `org_organizations_batch_exports_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsCreateInput = Parameters<typeof posthog.orgOrganizationsBatchExportsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsCreateOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsCreate>>;

const result: OrgOrganizationsBatchExportsCreateOutput = await posthog.orgOrganizationsBatchExportsCreate();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.orgOrganizationsBatchExportsDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `org_organizations_batch_exports_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsDestroyInput = Parameters<typeof posthog.orgOrganizationsBatchExportsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsDestroyOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsDestroy>>;

const result: OrgOrganizationsBatchExportsDestroyOutput = await posthog.orgOrganizationsBatchExportsDestroy();

// Result shape (from schema): unknown
```

### `posthog.orgOrganizationsBatchExportsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `org_organizations_batch_exports_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsRetrieveInput = Parameters<typeof posthog.orgOrganizationsBatchExportsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsRetrieveOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsRetrieve>>;

const result: OrgOrganizationsBatchExportsRetrieveOutput = await posthog.orgOrganizationsBatchExportsRetrieve();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.orgOrganizationsBatchExportsPartialUpdate`

- **HTTP**: `PATCH /api/organizations/{organization_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `org_organizations_batch_exports_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsPartialUpdateInput = Parameters<typeof posthog.orgOrganizationsBatchExportsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsPartialUpdate>>;

const result: OrgOrganizationsBatchExportsPartialUpdateOutput = await posthog.orgOrganizationsBatchExportsPartialUpdate();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.orgOrganizationsBatchExportsUpdate`

- **HTTP**: `PUT /api/organizations/{organization_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `org_organizations_batch_exports_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsUpdateInput = Parameters<typeof posthog.orgOrganizationsBatchExportsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsUpdateOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsUpdate>>;

const result: OrgOrganizationsBatchExportsUpdateOutput = await posthog.orgOrganizationsBatchExportsUpdate();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.orgOrganizationsBatchExportsLogsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/batch_exports/{id}/logs/`
- **OpenAPI operationId**: `org_organizations_batch_exports_logs_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `instance_id`, `level`, `limit`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsLogsRetrieveInput = Parameters<typeof posthog.orgOrganizationsBatchExportsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsLogsRetrieve>>;

const result: OrgOrganizationsBatchExportsLogsRetrieveOutput = await posthog.orgOrganizationsBatchExportsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.orgOrganizationsBatchExportsPauseCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/batch_exports/{id}/pause/`
- **What it does**: Pause a BatchExport.
- **OpenAPI operationId**: `org_organizations_batch_exports_pause_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsPauseCreateInput = Parameters<typeof posthog.orgOrganizationsBatchExportsPauseCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsPauseCreateOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsPauseCreate>>;

const result: OrgOrganizationsBatchExportsPauseCreateOutput = await posthog.orgOrganizationsBatchExportsPauseCreate();

// Result shape (from schema): unknown
```

### `posthog.orgOrganizationsBatchExportsRunTestStepCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/batch_exports/{id}/run_test_step/`
- **OpenAPI operationId**: `org_organizations_batch_exports_run_test_step_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsRunTestStepCreateInput = Parameters<typeof posthog.orgOrganizationsBatchExportsRunTestStepCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsRunTestStepCreateOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsRunTestStepCreate>>;

const result: OrgOrganizationsBatchExportsRunTestStepCreateOutput = await posthog.orgOrganizationsBatchExportsRunTestStepCreate();

// Result shape (from schema): unknown
```

### `posthog.orgOrganizationsBatchExportsUnpauseCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/batch_exports/{id}/unpause/`
- **What it does**: Unpause a BatchExport.
- **OpenAPI operationId**: `org_organizations_batch_exports_unpause_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsUnpauseCreateInput = Parameters<typeof posthog.orgOrganizationsBatchExportsUnpauseCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsUnpauseCreateOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsUnpauseCreate>>;

const result: OrgOrganizationsBatchExportsUnpauseCreateOutput = await posthog.orgOrganizationsBatchExportsUnpauseCreate();

// Result shape (from schema): unknown
```

### `posthog.orgOrganizationsBatchExportsRunTestStepNewCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/batch_exports/run_test_step_new/`
- **OpenAPI operationId**: `org_organizations_batch_exports_run_test_step_new_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsRunTestStepNewCreateInput = Parameters<typeof posthog.orgOrganizationsBatchExportsRunTestStepNewCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsRunTestStepNewCreateOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsRunTestStepNewCreate>>;

const result: OrgOrganizationsBatchExportsRunTestStepNewCreateOutput = await posthog.orgOrganizationsBatchExportsRunTestStepNewCreate();

// Result shape (from schema): unknown
```

### `posthog.orgOrganizationsBatchExportsTestRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/batch_exports/test/`
- **OpenAPI operationId**: `org_organizations_batch_exports_test_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsBatchExportsTestRetrieveInput = Parameters<typeof posthog.orgOrganizationsBatchExportsTestRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsBatchExportsTestRetrieveOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsBatchExportsTestRetrieve>>;

const result: OrgOrganizationsBatchExportsTestRetrieveOutput = await posthog.orgOrganizationsBatchExportsTestRetrieve();

// Result shape (from schema): unknown
```

### `posthog.batchExportsList`

- **HTTP**: `GET /api/projects/{project_id}/batch_exports/`
- **OpenAPI operationId**: `batch_exports_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Com...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsListInput = Parameters<typeof posthog.batchExportsList> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsListOutput = Awaited<ReturnType<typeof posthog.batchExportsList>>;

const result: BatchExportsListOutput = await posthog.batchExportsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Com...
```

### `posthog.batchExportsCreate`

- **HTTP**: `POST /api/projects/{project_id}/batch_exports/`
- **OpenAPI operationId**: `batch_exports_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type BatchExportsCreateInput = Parameters<typeof posthog.batchExportsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsCreateOutput = Awaited<ReturnType<typeof posthog.batchExportsCreate>>;

const result: BatchExportsCreateOutput = await posthog.batchExportsCreate();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.batchExportsBackfillsList`

- **HTTP**: `GET /api/projects/{project_id}/batch_exports/{batch_export_id}/backfills/`
- **What it does**: ViewSet for BatchExportBackfill models.

Allows creating and reading backfills, but not updating or deleting them.
- **OpenAPI operationId**: `batch_exports_backfills_list`
- **Path params**: `batch_export_id`
- **Query params**: `cursor`, `ordering`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; results: ({ id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsBackfillsListInput = Parameters<typeof posthog.batchExportsBackfillsList> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsBackfillsListOutput = Awaited<ReturnType<typeof posthog.batchExportsBackfillsList>>;

const result: BatchExportsBackfillsListOutput = await posthog.batchExportsBackfillsList();

// Result shape (from schema): { next?: string | null; previous?: string | null; results: ({ id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNe...
```

### `posthog.batchExportsBackfillsCreate`

- **HTTP**: `POST /api/projects/{project_id}/batch_exports/{batch_export_id}/backfills/`
- **What it does**: Create a new backfill for a BatchExport.
- **OpenAPI operationId**: `batch_exports_backfills_create`
- **Path params**: `batch_export_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "Terminated" | "TimedOut...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type BatchExportsBackfillsCreateInput = Parameters<typeof posthog.batchExportsBackfillsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsBackfillsCreateOutput = Awaited<ReturnType<typeof posthog.batchExportsBackfillsCreate>>;

const result: BatchExportsBackfillsCreateOutput = await posthog.batchExportsBackfillsCreate();

// Result shape (from schema): { id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "Terminated" | "TimedOut...
```

### `posthog.batchExportsBackfillsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/batch_exports/{batch_export_id}/backfills/{id}/`
- **What it does**: ViewSet for BatchExportBackfill models.

Allows creating and reading backfills, but not updating or deleting them.
- **OpenAPI operationId**: `batch_exports_backfills_retrieve`
- **Path params**: `batch_export_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "Terminated" | "TimedOut...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsBackfillsRetrieveInput = Parameters<typeof posthog.batchExportsBackfillsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsBackfillsRetrieveOutput = Awaited<ReturnType<typeof posthog.batchExportsBackfillsRetrieve>>;

const result: BatchExportsBackfillsRetrieveOutput = await posthog.batchExportsBackfillsRetrieve();

// Result shape (from schema): { id: string; progress: { [key: string]: unknown } | null; start_at?: string | null; end_at?: string | null; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "Terminated" | "TimedOut...
```

### `posthog.batchExportsBackfillsCancelCreate`

- **HTTP**: `POST /api/projects/{project_id}/batch_exports/{batch_export_id}/backfills/{id}/cancel/`
- **What it does**: Cancel a batch export backfill.
- **OpenAPI operationId**: `batch_exports_backfills_cancel_create`
- **Path params**: `batch_export_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsBackfillsCancelCreateInput = Parameters<typeof posthog.batchExportsBackfillsCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsBackfillsCancelCreateOutput = Awaited<ReturnType<typeof posthog.batchExportsBackfillsCancelCreate>>;

const result: BatchExportsBackfillsCancelCreateOutput = await posthog.batchExportsBackfillsCancelCreate();

// Result shape (from schema): unknown
```

### `posthog.batchExportsRunsList`

- **HTTP**: `GET /api/projects/{project_id}/batch_exports/{batch_export_id}/runs/`
- **OpenAPI operationId**: `batch_exports_runs_list`
- **Path params**: `batch_export_id`
- **Query params**: `cursor`, `ordering`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; results: ({ id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" | "Running" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsRunsListInput = Parameters<typeof posthog.batchExportsRunsList> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsRunsListOutput = Awaited<ReturnType<typeof posthog.batchExportsRunsList>>;

const result: BatchExportsRunsListOutput = await posthog.batchExportsRunsList();

// Result shape (from schema): { next?: string | null; previous?: string | null; results: ({ id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" | "Running" | "...
```

### `posthog.batchExportsRunsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/batch_exports/{batch_export_id}/runs/{id}/`
- **OpenAPI operationId**: `batch_exports_runs_retrieve`
- **Path params**: `batch_export_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" | "Running" | "Starting"; records_completed?: number | null; records_failed...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsRunsRetrieveInput = Parameters<typeof posthog.batchExportsRunsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsRunsRetrieveOutput = Awaited<ReturnType<typeof posthog.batchExportsRunsRetrieve>>;

const result: BatchExportsRunsRetrieveOutput = await posthog.batchExportsRunsRetrieve();

// Result shape (from schema): { id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" | "Running" | "Starting"; records_completed?: number | null; records_failed...
```

### `posthog.batchExportsRunsCancelCreate`

- **HTTP**: `POST /api/projects/{project_id}/batch_exports/{batch_export_id}/runs/{id}/cancel/`
- **What it does**: Cancel a batch export run.
- **OpenAPI operationId**: `batch_exports_runs_cancel_create`
- **Path params**: `batch_export_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsRunsCancelCreateInput = Parameters<typeof posthog.batchExportsRunsCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsRunsCancelCreateOutput = Awaited<ReturnType<typeof posthog.batchExportsRunsCancelCreate>>;

const result: BatchExportsRunsCancelCreateOutput = await posthog.batchExportsRunsCancelCreate();

// Result shape (from schema): unknown
```

### `posthog.batchExportsRunsLogsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/batch_exports/{batch_export_id}/runs/{id}/logs/`
- **OpenAPI operationId**: `batch_exports_runs_logs_retrieve`
- **Path params**: `batch_export_id`, `id`
- **Query params**: `after`, `before`, `instance_id`, `level`, `limit`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsRunsLogsRetrieveInput = Parameters<typeof posthog.batchExportsRunsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsRunsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.batchExportsRunsLogsRetrieve>>;

const result: BatchExportsRunsLogsRetrieveOutput = await posthog.batchExportsRunsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.batchExportsRunsRetryCreate`

- **HTTP**: `POST /api/projects/{project_id}/batch_exports/{batch_export_id}/runs/{id}/retry/`
- **What it does**: Retry a batch export run.

We use the same underlying mechanism as when backfilling a batch export, as retrying
a run is the same as backfilling one run.
- **OpenAPI operationId**: `batch_exports_runs_retry_create`
- **Path params**: `batch_export_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsRunsRetryCreateInput = Parameters<typeof posthog.batchExportsRunsRetryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsRunsRetryCreateOutput = Awaited<ReturnType<typeof posthog.batchExportsRunsRetryCreate>>;

const result: BatchExportsRunsRetryCreateOutput = await posthog.batchExportsRunsRetryCreate();

// Result shape (from schema): unknown
```

### `posthog.batchExportsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `batch_exports_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type BatchExportsDestroyInput = Parameters<typeof posthog.batchExportsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsDestroyOutput = Awaited<ReturnType<typeof posthog.batchExportsDestroy>>;

const result: BatchExportsDestroyOutput = await posthog.batchExportsDestroy();

// Result shape (from schema): unknown
```

### `posthog.batchExportsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `batch_exports_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsRetrieveInput = Parameters<typeof posthog.batchExportsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsRetrieveOutput = Awaited<ReturnType<typeof posthog.batchExportsRetrieve>>;

const result: BatchExportsRetrieveOutput = await posthog.batchExportsRetrieve();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.batchExportsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `batch_exports_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsPartialUpdateInput = Parameters<typeof posthog.batchExportsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.batchExportsPartialUpdate>>;

const result: BatchExportsPartialUpdateOutput = await posthog.batchExportsPartialUpdate();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.batchExportsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/batch_exports/{id}/`
- **OpenAPI operationId**: `batch_exports_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsUpdateInput = Parameters<typeof posthog.batchExportsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsUpdateOutput = Awaited<ReturnType<typeof posthog.batchExportsUpdate>>;

const result: BatchExportsUpdateOutput = await posthog.batchExportsUpdate();

// Result shape (from schema): { id: string; team_id: number; name: string; model?: "events" | "persons" | "sessions" | "" | null; destination: { type: "S3" | "AwsS3" | "S3Compatible" | "Snowflake" | "Postgres" | "Redshift" | "BigQuery" | "Databricks...
```

### `posthog.batchExportsLogsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/batch_exports/{id}/logs/`
- **OpenAPI operationId**: `batch_exports_logs_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `instance_id`, `level`, `limit`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsLogsRetrieveInput = Parameters<typeof posthog.batchExportsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.batchExportsLogsRetrieve>>;

const result: BatchExportsLogsRetrieveOutput = await posthog.batchExportsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.batchExportsPauseCreate`

- **HTTP**: `POST /api/projects/{project_id}/batch_exports/{id}/pause/`
- **What it does**: Pause a BatchExport.
- **OpenAPI operationId**: `batch_exports_pause_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsPauseCreateInput = Parameters<typeof posthog.batchExportsPauseCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsPauseCreateOutput = Awaited<ReturnType<typeof posthog.batchExportsPauseCreate>>;

const result: BatchExportsPauseCreateOutput = await posthog.batchExportsPauseCreate();

// Result shape (from schema): unknown
```

### `posthog.batchExportsRunTestStepCreate`

- **HTTP**: `POST /api/projects/{project_id}/batch_exports/{id}/run_test_step/`
- **OpenAPI operationId**: `batch_exports_run_test_step_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsRunTestStepCreateInput = Parameters<typeof posthog.batchExportsRunTestStepCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsRunTestStepCreateOutput = Awaited<ReturnType<typeof posthog.batchExportsRunTestStepCreate>>;

const result: BatchExportsRunTestStepCreateOutput = await posthog.batchExportsRunTestStepCreate();

// Result shape (from schema): unknown
```

### `posthog.batchExportsUnpauseCreate`

- **HTTP**: `POST /api/projects/{project_id}/batch_exports/{id}/unpause/`
- **What it does**: Unpause a BatchExport.
- **OpenAPI operationId**: `batch_exports_unpause_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsUnpauseCreateInput = Parameters<typeof posthog.batchExportsUnpauseCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsUnpauseCreateOutput = Awaited<ReturnType<typeof posthog.batchExportsUnpauseCreate>>;

const result: BatchExportsUnpauseCreateOutput = await posthog.batchExportsUnpauseCreate();

// Result shape (from schema): unknown
```

### `posthog.batchExportsRunTestStepNewCreate`

- **HTTP**: `POST /api/projects/{project_id}/batch_exports/run_test_step_new/`
- **OpenAPI operationId**: `batch_exports_run_test_step_new_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsRunTestStepNewCreateInput = Parameters<typeof posthog.batchExportsRunTestStepNewCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsRunTestStepNewCreateOutput = Awaited<ReturnType<typeof posthog.batchExportsRunTestStepNewCreate>>;

const result: BatchExportsRunTestStepNewCreateOutput = await posthog.batchExportsRunTestStepNewCreate();

// Result shape (from schema): unknown
```

### `posthog.batchExportsTestRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/batch_exports/test/`
- **OpenAPI operationId**: `batch_exports_test_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BatchExportsTestRetrieveInput = Parameters<typeof posthog.batchExportsTestRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type BatchExportsTestRetrieveOutput = Awaited<ReturnType<typeof posthog.batchExportsTestRetrieve>>;

const result: BatchExportsTestRetrieveOutput = await posthog.batchExportsTestRetrieve();

// Result shape (from schema): unknown
```

### `posthog.fileDownloadBatchExportsList`

- **HTTP**: `GET /api/projects/{project_id}/file_download_batch_exports/`
- **OpenAPI operationId**: `file_download_batch_exports_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FileDownloadBatchExportsListInput = Parameters<typeof posthog.fileDownloadBatchExportsList> extends [infer T, ...unknown[]] ? T : undefined;
type FileDownloadBatchExportsListOutput = Awaited<ReturnType<typeof posthog.fileDownloadBatchExportsList>>;

const result: FileDownloadBatchExportsListOutput = await posthog.fileDownloadBatchExportsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "Cancelled" | "Completed" | "ContinuedAsNew" | "Failed" | "FailedRetryable" | "FailedBilling" | "Terminated" | "TimedOut" ...
```

### `posthog.fileDownloadBatchExportsCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_download_batch_exports/`
- **What it does**: Create and start a batch export on demand run to download a file.
- **OpenAPI operationId**: `file_download_batch_exports_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`

```ts
import posthog from "@utdk/posthog";

type FileDownloadBatchExportsCreateInput = Parameters<typeof posthog.fileDownloadBatchExportsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileDownloadBatchExportsCreateOutput = Awaited<ReturnType<typeof posthog.fileDownloadBatchExportsCreate>>;

const result: FileDownloadBatchExportsCreateOutput = await posthog.fileDownloadBatchExportsCreate();

// Result shape (from schema): unknown
```

### `posthog.fileDownloadBatchExportsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/file_download_batch_exports/{id}/`
- **What it does**: Get a batch export on demand run.

If the underlying batch export run has completed, we return keys to the
generated file downloads so that users may download them by making a request
to /download.
- **OpenAPI operationId**: `file_download_batch_exports_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FileDownloadBatchExportsRetrieveInput = Parameters<typeof posthog.fileDownloadBatchExportsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FileDownloadBatchExportsRetrieveOutput = Awaited<ReturnType<typeof posthog.fileDownloadBatchExportsRetrieve>>;

const result: FileDownloadBatchExportsRetrieveOutput = await posthog.fileDownloadBatchExportsRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.fileDownloadBatchExportsCancelCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_download_batch_exports/{id}/cancel/`
- **What it does**: Cancel an ongoing file-download batch export.
- **OpenAPI operationId**: `file_download_batch_exports_cancel_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FileDownloadBatchExportsCancelCreateInput = Parameters<typeof posthog.fileDownloadBatchExportsCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileDownloadBatchExportsCancelCreateOutput = Awaited<ReturnType<typeof posthog.fileDownloadBatchExportsCancelCreate>>;

const result: FileDownloadBatchExportsCancelCreateOutput = await posthog.fileDownloadBatchExportsCancelCreate();

// Result shape (from schema): unknown
```

### `posthog.fileDownloadBatchExportsDownloadRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/file_download_batch_exports/{id}/download/`
- **What it does**: Download a file (or a part) from this batch export run.

Users can provide a part component with an id or index, or no part component at
all:
* If part id is included: The file download matching the id is downloaded.
* If part index is included: The file download matching the index (as ordered
    by key) is downloaded.
* If no part component is present: If there is only one file downloaded, that
    is downloaded. Otherwise the first one as sorted by key is downloaded.
- **OpenAPI operationId**: `file_download_batch_exports_download_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FileDownloadBatchExportsDownloadRetrieveInput = Parameters<typeof posthog.fileDownloadBatchExportsDownloadRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FileDownloadBatchExportsDownloadRetrieveOutput = Awaited<ReturnType<typeof posthog.fileDownloadBatchExportsDownloadRetrieve>>;

const result: FileDownloadBatchExportsDownloadRetrieveOutput = await posthog.fileDownloadBatchExportsDownloadRetrieve();

// Result shape (from schema): unknown
```

### `posthog.fileDownloadBatchExportsLogsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/file_download_batch_exports/{id}/logs/`
- **OpenAPI operationId**: `file_download_batch_exports_logs_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `instance_id`, `level`, `limit`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FileDownloadBatchExportsLogsRetrieveInput = Parameters<typeof posthog.fileDownloadBatchExportsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FileDownloadBatchExportsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.fileDownloadBatchExportsLogsRetrieve>>;

const result: FileDownloadBatchExportsLogsRetrieveOutput = await posthog.fileDownloadBatchExportsLogsRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

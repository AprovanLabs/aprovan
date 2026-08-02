# Hog Flows

## Operations

### `posthog.environmentsHogFlowsList`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/`
- **OpenAPI operationId**: `environments_hog_flows_list`
- **Path params**: None
- **Query params**: `created_at`, `created_by`, `id`, `limit`, `offset`, `status`, `updated_at`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string | null; description: string; version: number; status: "draft" | "active" | "archived"; created_at: string; created_by...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsListInput = Parameters<typeof posthog.environmentsHogFlowsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsListOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsList>>;

const result: EnvironmentsHogFlowsListOutput = await posthog.environmentsHogFlowsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string | null; description: string; version: number; status: "draft" | "active" | "archived"; created_at: string; created_by...
```

### `posthog.environmentsHogFlowsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_flows/`
- **OpenAPI operationId**: `environments_hog_flows_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsCreateInput = Parameters<typeof posthog.environmentsHogFlowsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsCreate>>;

const result: EnvironmentsHogFlowsCreateOutput = await posthog.environmentsHogFlowsCreate();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.environmentsHogFlowsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/hog_flows/{id}/`
- **OpenAPI operationId**: `environments_hog_flows_destroy`
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

type EnvironmentsHogFlowsDestroyInput = Parameters<typeof posthog.environmentsHogFlowsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsDestroy>>;

const result: EnvironmentsHogFlowsDestroyOutput = await posthog.environmentsHogFlowsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsHogFlowsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/{id}/`
- **OpenAPI operationId**: `environments_hog_flows_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsRetrieveInput = Parameters<typeof posthog.environmentsHogFlowsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsRetrieve>>;

const result: EnvironmentsHogFlowsRetrieveOutput = await posthog.environmentsHogFlowsRetrieve();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.environmentsHogFlowsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/hog_flows/{id}/`
- **OpenAPI operationId**: `environments_hog_flows_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsPartialUpdateInput = Parameters<typeof posthog.environmentsHogFlowsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsPartialUpdate>>;

const result: EnvironmentsHogFlowsPartialUpdateOutput = await posthog.environmentsHogFlowsPartialUpdate();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.environmentsHogFlowsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/hog_flows/{id}/`
- **OpenAPI operationId**: `environments_hog_flows_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsUpdateInput = Parameters<typeof posthog.environmentsHogFlowsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsUpdate>>;

const result: EnvironmentsHogFlowsUpdateOutput = await posthog.environmentsHogFlowsUpdate();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.environmentsHogFlowsAssetsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/{id}/assets/`
- **OpenAPI operationId**: `environments_hog_flows_assets_retrieve`
- **Path params**: `id`
- **Query params**: `action_id`, `after`, `before`, `distinct_id`, `invocation_id`, `limit`, `offset`, `parent_run_id`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ invocation_id: string; action_id: string; function_id: string; function_name: string; parent_run_id: string; kind: string; distinct_id: string; person_id: string; recipient: string; subject: string; status: string; s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsAssetsRetrieveInput = Parameters<typeof posthog.environmentsHogFlowsAssetsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsAssetsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsAssetsRetrieve>>;

const result: EnvironmentsHogFlowsAssetsRetrieveOutput = await posthog.environmentsHogFlowsAssetsRetrieve();

// Result shape (from schema): ({ invocation_id: string; action_id: string; function_id: string; function_name: string; parent_run_id: string; kind: string; distinct_id: string; person_id: string; recipient: string; subject: string; status: string; s...
```

### `posthog.environmentsHogFlowsAssetContentRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/{id}/assets/content/`
- **OpenAPI operationId**: `environments_hog_flows_asset_content_retrieve`
- **Path params**: `id`
- **Query params**: `action_id`, `invocation_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `string`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsAssetContentRetrieveInput = Parameters<typeof posthog.environmentsHogFlowsAssetContentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsAssetContentRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsAssetContentRetrieve>>;

const result: EnvironmentsHogFlowsAssetContentRetrieveOutput = await posthog.environmentsHogFlowsAssetContentRetrieve();

// Result shape (from schema): string
```

### `posthog.environmentsHogFlowsBatchJobsList`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/{id}/batch_jobs/`
- **OpenAPI operationId**: `environments_hog_flows_batch_jobs_list`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; status?: "waiting" | "queued" | "active" | "completed" | "cancelled" | "failed"; hog_flow: string; filters?: unknown; variables?: unknown; created_at: string; created_by: { id: number; uuid: string; disti...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsBatchJobsListInput = Parameters<typeof posthog.environmentsHogFlowsBatchJobsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsBatchJobsListOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsBatchJobsList>>;

const result: EnvironmentsHogFlowsBatchJobsListOutput = await posthog.environmentsHogFlowsBatchJobsList();

// Result shape (from schema): ({ id: string; status?: "waiting" | "queued" | "active" | "completed" | "cancelled" | "failed"; hog_flow: string; filters?: unknown; variables?: unknown; created_at: string; created_by: { id: number; uuid: string; disti...
```

### `posthog.environmentsHogFlowsBatchJobsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_flows/{id}/batch_jobs/`
- **OpenAPI operationId**: `environments_hog_flows_batch_jobs_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status?: "waiting" | "queued" | "active" | "completed" | "cancelled" | "failed"; hog_flow: string; filters?: unknown; variables?: unknown; created_at: string; created_by: { id: number; uuid: string; distin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsBatchJobsCreateInput = Parameters<typeof posthog.environmentsHogFlowsBatchJobsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsBatchJobsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsBatchJobsCreate>>;

const result: EnvironmentsHogFlowsBatchJobsCreateOutput = await posthog.environmentsHogFlowsBatchJobsCreate();

// Result shape (from schema): { id: string; status?: "waiting" | "queued" | "active" | "completed" | "cancelled" | "failed"; hog_flow: string; filters?: unknown; variables?: unknown; created_at: string; created_by: { id: number; uuid: string; distin...
```

### `posthog.environmentsHogFlowsGraphPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/hog_flows/{id}/graph/`
- **OpenAPI operationId**: `environments_hog_flows_graph_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsGraphPartialUpdateInput = Parameters<typeof posthog.environmentsHogFlowsGraphPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsGraphPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsGraphPartialUpdate>>;

const result: EnvironmentsHogFlowsGraphPartialUpdateOutput = await posthog.environmentsHogFlowsGraphPartialUpdate();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.environmentsHogFlowsInvocationResultsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/{id}/invocation_results/`
- **OpenAPI operationId**: `environments_hog_flows_invocation_results_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `distinct_id`, `limit`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ invocation_id: string; status: string; error_kind: string; error_message: string; distinct_id: string; person_id: string; scheduled_at: string; started_at: string | null; finished_at: string | null; duration_ms: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsInvocationResultsRetrieveInput = Parameters<typeof posthog.environmentsHogFlowsInvocationResultsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsInvocationResultsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsInvocationResultsRetrieve>>;

const result: EnvironmentsHogFlowsInvocationResultsRetrieveOutput = await posthog.environmentsHogFlowsInvocationResultsRetrieve();

// Result shape (from schema): ({ invocation_id: string; status: string; error_kind: string; error_message: string; distinct_id: string; person_id: string; scheduled_at: string; started_at: string | null; finished_at: string | null; duration_ms: numb...
```

### `posthog.environmentsHogFlowsInvocationResultRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/{id}/invocation_results/{invocation_id}/`
- **OpenAPI operationId**: `environments_hog_flows_invocation_result_retrieve`
- **Path params**: `id`, `invocation_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ invocation_globals: { [key: string]: unknown }; invocation_id: string; status: string; error_kind: string; error_message: string; distinct_id: string; person_id: string; scheduled_at: string; started_at: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsInvocationResultRetrieveInput = Parameters<typeof posthog.environmentsHogFlowsInvocationResultRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsInvocationResultRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsInvocationResultRetrieve>>;

const result: EnvironmentsHogFlowsInvocationResultRetrieveOutput = await posthog.environmentsHogFlowsInvocationResultRetrieve();

// Result shape (from schema): { invocation_globals: { [key: string]: unknown }; invocation_id: string; status: string; error_kind: string; error_message: string; distinct_id: string; person_id: string; scheduled_at: string; started_at: string | null...
```

### `posthog.environmentsHogFlowsInvocationsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_flows/{id}/invocations/`
- **OpenAPI operationId**: `environments_hog_flows_invocations_create`
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

type EnvironmentsHogFlowsInvocationsCreateInput = Parameters<typeof posthog.environmentsHogFlowsInvocationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsInvocationsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsInvocationsCreate>>;

const result: EnvironmentsHogFlowsInvocationsCreateOutput = await posthog.environmentsHogFlowsInvocationsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsHogFlowsLogsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/{id}/logs/`
- **OpenAPI operationId**: `environments_hog_flows_logs_retrieve`
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

type EnvironmentsHogFlowsLogsRetrieveInput = Parameters<typeof posthog.environmentsHogFlowsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsLogsRetrieve>>;

const result: EnvironmentsHogFlowsLogsRetrieveOutput = await posthog.environmentsHogFlowsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsHogFlowsMetricsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/{id}/metrics/`
- **OpenAPI operationId**: `environments_hog_flows_metrics_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `breakdown_by`, `instance_id`, `interval`, `kind`, `name`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ labels: (string)[]; series: ({ name: string; values: (number)[] })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsMetricsRetrieveInput = Parameters<typeof posthog.environmentsHogFlowsMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsMetricsRetrieve>>;

const result: EnvironmentsHogFlowsMetricsRetrieveOutput = await posthog.environmentsHogFlowsMetricsRetrieve();

// Result shape (from schema): { labels: (string)[]; series: ({ name: string; values: (number)[] })[] }
```

### `posthog.environmentsHogFlowsMetricsTotalsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/{id}/metrics/totals/`
- **OpenAPI operationId**: `environments_hog_flows_metrics_totals_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `breakdown_by`, `instance_id`, `interval`, `kind`, `name`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ totals: { [key: string]: number | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsMetricsTotalsRetrieveInput = Parameters<typeof posthog.environmentsHogFlowsMetricsTotalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsMetricsTotalsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsMetricsTotalsRetrieve>>;

const result: EnvironmentsHogFlowsMetricsTotalsRetrieveOutput = await posthog.environmentsHogFlowsMetricsTotalsRetrieve();

// Result shape (from schema): { totals: { [key: string]: number | undefined } }
```

### `posthog.environmentsHogFlowsRerunCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_flows/{id}/rerun/`
- **What it does**: Rerun past invocations of this hog flow from their stored payloads.

Same shape and semantics as the hog function rerun endpoint —
proxies through to the CDP worker, which reads matching rows from
ClickHouse, rehydrates from `invocation_globals`, and re-enqueues
onto cyclotron with `is_retry=1`.

Because rerun replays historical event/person/group data, it requires
`person:read` and `group:read` on top of `hog_flow:write`.
- **OpenAPI operationId**: `environments_hog_flows_rerun_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ rerun_job_id: string; queued_count: number; skipped_count: number }`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsRerunCreateInput = Parameters<typeof posthog.environmentsHogFlowsRerunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsRerunCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsRerunCreate>>;

const result: EnvironmentsHogFlowsRerunCreateOutput = await posthog.environmentsHogFlowsRerunCreate();

// Result shape (from schema): { rerun_job_id: string; queued_count: number; skipped_count: number }
```

### `posthog.environmentsHogFlowsSchedulesList`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/{id}/schedules/`
- **OpenAPI operationId**: `environments_hog_flows_schedules_list`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsSchedulesListInput = Parameters<typeof posthog.environmentsHogFlowsSchedulesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsSchedulesListOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsSchedulesList>>;

const result: EnvironmentsHogFlowsSchedulesListOutput = await posthog.environmentsHogFlowsSchedulesList();

// Result shape (from schema): ({ id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string })[]
```

### `posthog.environmentsHogFlowsSchedulesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_flows/{id}/schedules/`
- **OpenAPI operationId**: `environments_hog_flows_schedules_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsSchedulesCreateInput = Parameters<typeof posthog.environmentsHogFlowsSchedulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsSchedulesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsSchedulesCreate>>;

const result: EnvironmentsHogFlowsSchedulesCreateOutput = await posthog.environmentsHogFlowsSchedulesCreate();

// Result shape (from schema): { id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string }
```

### `posthog.environmentsHogFlowsSchedulesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/hog_flows/{id}/schedules/{schedule_id}/`
- **OpenAPI operationId**: `environments_hog_flows_schedules_destroy`
- **Path params**: `id`, `schedule_id`
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

type EnvironmentsHogFlowsSchedulesDestroyInput = Parameters<typeof posthog.environmentsHogFlowsSchedulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsSchedulesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsSchedulesDestroy>>;

const result: EnvironmentsHogFlowsSchedulesDestroyOutput = await posthog.environmentsHogFlowsSchedulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsHogFlowsSchedulesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/hog_flows/{id}/schedules/{schedule_id}/`
- **OpenAPI operationId**: `environments_hog_flows_schedules_partial_update`
- **Path params**: `id`, `schedule_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsSchedulesPartialUpdateInput = Parameters<typeof posthog.environmentsHogFlowsSchedulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsSchedulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsSchedulesPartialUpdate>>;

const result: EnvironmentsHogFlowsSchedulesPartialUpdateOutput = await posthog.environmentsHogFlowsSchedulesPartialUpdate();

// Result shape (from schema): { id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string }
```

### `posthog.environmentsHogFlowsBulkDeleteCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_flows/bulk_delete/`
- **OpenAPI operationId**: `environments_hog_flows_bulk_delete_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsBulkDeleteCreateInput = Parameters<typeof posthog.environmentsHogFlowsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsBulkDeleteCreate>>;

const result: EnvironmentsHogFlowsBulkDeleteCreateOutput = await posthog.environmentsHogFlowsBulkDeleteCreate();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.environmentsHogFlowsMetricsGlobalRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_flows/metrics/global/`
- **OpenAPI operationId**: `environments_hog_flows_metrics_global_retrieve`
- **Path params**: None
- **Query params**: `after`, `before`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ workflow_id: string; succeeded: number; failed: number })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsMetricsGlobalRetrieveInput = Parameters<typeof posthog.environmentsHogFlowsMetricsGlobalRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsMetricsGlobalRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsMetricsGlobalRetrieve>>;

const result: EnvironmentsHogFlowsMetricsGlobalRetrieveOutput = await posthog.environmentsHogFlowsMetricsGlobalRetrieve();

// Result shape (from schema): ({ workflow_id: string; succeeded: number; failed: number })[]
```

### `posthog.environmentsHogFlowsUserBlastRadiusCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_flows/user_blast_radius/`
- **OpenAPI operationId**: `environments_hog_flows_user_blast_radius_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ affected: number; total: number; limit: number; dedupe_key: "email" | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFlowsUserBlastRadiusCreateInput = Parameters<typeof posthog.environmentsHogFlowsUserBlastRadiusCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFlowsUserBlastRadiusCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFlowsUserBlastRadiusCreate>>;

const result: EnvironmentsHogFlowsUserBlastRadiusCreateOutput = await posthog.environmentsHogFlowsUserBlastRadiusCreate();

// Result shape (from schema): { affected: number; total: number; limit: number; dedupe_key: "email" | null }
```

### `posthog.hogFlowsList`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/`
- **OpenAPI operationId**: `hog_flows_list`
- **Path params**: None
- **Query params**: `created_at`, `created_by`, `id`, `limit`, `offset`, `status`, `updated_at`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string | null; description: string; version: number; status: "draft" | "active" | "archived"; created_at: string; created_by...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsListInput = Parameters<typeof posthog.hogFlowsList> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsListOutput = Awaited<ReturnType<typeof posthog.hogFlowsList>>;

const result: HogFlowsListOutput = await posthog.hogFlowsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string | null; description: string; version: number; status: "draft" | "active" | "archived"; created_at: string; created_by...
```

### `posthog.hogFlowsCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_flows/`
- **OpenAPI operationId**: `hog_flows_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type HogFlowsCreateInput = Parameters<typeof posthog.hogFlowsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsCreateOutput = Awaited<ReturnType<typeof posthog.hogFlowsCreate>>;

const result: HogFlowsCreateOutput = await posthog.hogFlowsCreate();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.hogFlowsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/hog_flows/{id}/`
- **OpenAPI operationId**: `hog_flows_destroy`
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

type HogFlowsDestroyInput = Parameters<typeof posthog.hogFlowsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsDestroyOutput = Awaited<ReturnType<typeof posthog.hogFlowsDestroy>>;

const result: HogFlowsDestroyOutput = await posthog.hogFlowsDestroy();

// Result shape (from schema): unknown
```

### `posthog.hogFlowsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/{id}/`
- **OpenAPI operationId**: `hog_flows_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsRetrieveInput = Parameters<typeof posthog.hogFlowsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFlowsRetrieve>>;

const result: HogFlowsRetrieveOutput = await posthog.hogFlowsRetrieve();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.hogFlowsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/hog_flows/{id}/`
- **OpenAPI operationId**: `hog_flows_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsPartialUpdateInput = Parameters<typeof posthog.hogFlowsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.hogFlowsPartialUpdate>>;

const result: HogFlowsPartialUpdateOutput = await posthog.hogFlowsPartialUpdate();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.hogFlowsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/hog_flows/{id}/`
- **OpenAPI operationId**: `hog_flows_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsUpdateInput = Parameters<typeof posthog.hogFlowsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsUpdateOutput = Awaited<ReturnType<typeof posthog.hogFlowsUpdate>>;

const result: HogFlowsUpdateOutput = await posthog.hogFlowsUpdate();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.hogFlowsAssetsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/{id}/assets/`
- **OpenAPI operationId**: `hog_flows_assets_retrieve`
- **Path params**: `id`
- **Query params**: `action_id`, `after`, `before`, `distinct_id`, `invocation_id`, `limit`, `offset`, `parent_run_id`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ invocation_id: string; action_id: string; function_id: string; function_name: string; parent_run_id: string; kind: string; distinct_id: string; person_id: string; recipient: string; subject: string; status: string; s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsAssetsRetrieveInput = Parameters<typeof posthog.hogFlowsAssetsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsAssetsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFlowsAssetsRetrieve>>;

const result: HogFlowsAssetsRetrieveOutput = await posthog.hogFlowsAssetsRetrieve();

// Result shape (from schema): ({ invocation_id: string; action_id: string; function_id: string; function_name: string; parent_run_id: string; kind: string; distinct_id: string; person_id: string; recipient: string; subject: string; status: string; s...
```

### `posthog.hogFlowsAssetContentRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/{id}/assets/content/`
- **OpenAPI operationId**: `hog_flows_asset_content_retrieve`
- **Path params**: `id`
- **Query params**: `action_id`, `invocation_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `string`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsAssetContentRetrieveInput = Parameters<typeof posthog.hogFlowsAssetContentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsAssetContentRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFlowsAssetContentRetrieve>>;

const result: HogFlowsAssetContentRetrieveOutput = await posthog.hogFlowsAssetContentRetrieve();

// Result shape (from schema): string
```

### `posthog.hogFlowsBatchJobsList`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/{id}/batch_jobs/`
- **OpenAPI operationId**: `hog_flows_batch_jobs_list`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; status?: "waiting" | "queued" | "active" | "completed" | "cancelled" | "failed"; hog_flow: string; filters?: unknown; variables?: unknown; created_at: string; created_by: { id: number; uuid: string; disti...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsBatchJobsListInput = Parameters<typeof posthog.hogFlowsBatchJobsList> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsBatchJobsListOutput = Awaited<ReturnType<typeof posthog.hogFlowsBatchJobsList>>;

const result: HogFlowsBatchJobsListOutput = await posthog.hogFlowsBatchJobsList();

// Result shape (from schema): ({ id: string; status?: "waiting" | "queued" | "active" | "completed" | "cancelled" | "failed"; hog_flow: string; filters?: unknown; variables?: unknown; created_at: string; created_by: { id: number; uuid: string; disti...
```

### `posthog.hogFlowsBatchJobsCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_flows/{id}/batch_jobs/`
- **OpenAPI operationId**: `hog_flows_batch_jobs_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status?: "waiting" | "queued" | "active" | "completed" | "cancelled" | "failed"; hog_flow: string; filters?: unknown; variables?: unknown; created_at: string; created_by: { id: number; uuid: string; distin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsBatchJobsCreateInput = Parameters<typeof posthog.hogFlowsBatchJobsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsBatchJobsCreateOutput = Awaited<ReturnType<typeof posthog.hogFlowsBatchJobsCreate>>;

const result: HogFlowsBatchJobsCreateOutput = await posthog.hogFlowsBatchJobsCreate();

// Result shape (from schema): { id: string; status?: "waiting" | "queued" | "active" | "completed" | "cancelled" | "failed"; hog_flow: string; filters?: unknown; variables?: unknown; created_at: string; created_by: { id: number; uuid: string; distin...
```

### `posthog.hogFlowsGraphPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/hog_flows/{id}/graph/`
- **OpenAPI operationId**: `hog_flows_graph_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsGraphPartialUpdateInput = Parameters<typeof posthog.hogFlowsGraphPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsGraphPartialUpdateOutput = Awaited<ReturnType<typeof posthog.hogFlowsGraphPartialUpdate>>;

const result: HogFlowsGraphPartialUpdateOutput = await posthog.hogFlowsGraphPartialUpdate();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.hogFlowsInvocationResultsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/{id}/invocation_results/`
- **OpenAPI operationId**: `hog_flows_invocation_results_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `distinct_id`, `limit`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ invocation_id: string; status: string; error_kind: string; error_message: string; distinct_id: string; person_id: string; scheduled_at: string; started_at: string | null; finished_at: string | null; duration_ms: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsInvocationResultsRetrieveInput = Parameters<typeof posthog.hogFlowsInvocationResultsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsInvocationResultsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFlowsInvocationResultsRetrieve>>;

const result: HogFlowsInvocationResultsRetrieveOutput = await posthog.hogFlowsInvocationResultsRetrieve();

// Result shape (from schema): ({ invocation_id: string; status: string; error_kind: string; error_message: string; distinct_id: string; person_id: string; scheduled_at: string; started_at: string | null; finished_at: string | null; duration_ms: numb...
```

### `posthog.hogFlowsInvocationResultRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/{id}/invocation_results/{invocation_id}/`
- **OpenAPI operationId**: `hog_flows_invocation_result_retrieve`
- **Path params**: `id`, `invocation_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ invocation_globals: { [key: string]: unknown }; invocation_id: string; status: string; error_kind: string; error_message: string; distinct_id: string; person_id: string; scheduled_at: string; started_at: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsInvocationResultRetrieveInput = Parameters<typeof posthog.hogFlowsInvocationResultRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsInvocationResultRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFlowsInvocationResultRetrieve>>;

const result: HogFlowsInvocationResultRetrieveOutput = await posthog.hogFlowsInvocationResultRetrieve();

// Result shape (from schema): { invocation_globals: { [key: string]: unknown }; invocation_id: string; status: string; error_kind: string; error_message: string; distinct_id: string; person_id: string; scheduled_at: string; started_at: string | null...
```

### `posthog.hogFlowsInvocationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_flows/{id}/invocations/`
- **OpenAPI operationId**: `hog_flows_invocations_create`
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

type HogFlowsInvocationsCreateInput = Parameters<typeof posthog.hogFlowsInvocationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsInvocationsCreateOutput = Awaited<ReturnType<typeof posthog.hogFlowsInvocationsCreate>>;

const result: HogFlowsInvocationsCreateOutput = await posthog.hogFlowsInvocationsCreate();

// Result shape (from schema): unknown
```

### `posthog.hogFlowsLogsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/{id}/logs/`
- **OpenAPI operationId**: `hog_flows_logs_retrieve`
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

type HogFlowsLogsRetrieveInput = Parameters<typeof posthog.hogFlowsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFlowsLogsRetrieve>>;

const result: HogFlowsLogsRetrieveOutput = await posthog.hogFlowsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.hogFlowsMetricsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/{id}/metrics/`
- **OpenAPI operationId**: `hog_flows_metrics_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `breakdown_by`, `instance_id`, `interval`, `kind`, `name`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ labels: (string)[]; series: ({ name: string; values: (number)[] })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsMetricsRetrieveInput = Parameters<typeof posthog.hogFlowsMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFlowsMetricsRetrieve>>;

const result: HogFlowsMetricsRetrieveOutput = await posthog.hogFlowsMetricsRetrieve();

// Result shape (from schema): { labels: (string)[]; series: ({ name: string; values: (number)[] })[] }
```

### `posthog.hogFlowsMetricsTotalsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/{id}/metrics/totals/`
- **OpenAPI operationId**: `hog_flows_metrics_totals_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `breakdown_by`, `instance_id`, `interval`, `kind`, `name`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ totals: { [key: string]: number | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsMetricsTotalsRetrieveInput = Parameters<typeof posthog.hogFlowsMetricsTotalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsMetricsTotalsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFlowsMetricsTotalsRetrieve>>;

const result: HogFlowsMetricsTotalsRetrieveOutput = await posthog.hogFlowsMetricsTotalsRetrieve();

// Result shape (from schema): { totals: { [key: string]: number | undefined } }
```

### `posthog.hogFlowsRerunCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_flows/{id}/rerun/`
- **What it does**: Rerun past invocations of this hog flow from their stored payloads.

Same shape and semantics as the hog function rerun endpoint —
proxies through to the CDP worker, which reads matching rows from
ClickHouse, rehydrates from `invocation_globals`, and re-enqueues
onto cyclotron with `is_retry=1`.

Because rerun replays historical event/person/group data, it requires
`person:read` and `group:read` on top of `hog_flow:write`.
- **OpenAPI operationId**: `hog_flows_rerun_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ rerun_job_id: string; queued_count: number; skipped_count: number }`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type HogFlowsRerunCreateInput = Parameters<typeof posthog.hogFlowsRerunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsRerunCreateOutput = Awaited<ReturnType<typeof posthog.hogFlowsRerunCreate>>;

const result: HogFlowsRerunCreateOutput = await posthog.hogFlowsRerunCreate();

// Result shape (from schema): { rerun_job_id: string; queued_count: number; skipped_count: number }
```

### `posthog.hogFlowsSchedulesList`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/{id}/schedules/`
- **OpenAPI operationId**: `hog_flows_schedules_list`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsSchedulesListInput = Parameters<typeof posthog.hogFlowsSchedulesList> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsSchedulesListOutput = Awaited<ReturnType<typeof posthog.hogFlowsSchedulesList>>;

const result: HogFlowsSchedulesListOutput = await posthog.hogFlowsSchedulesList();

// Result shape (from schema): ({ id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string })[]
```

### `posthog.hogFlowsSchedulesCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_flows/{id}/schedules/`
- **OpenAPI operationId**: `hog_flows_schedules_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsSchedulesCreateInput = Parameters<typeof posthog.hogFlowsSchedulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsSchedulesCreateOutput = Awaited<ReturnType<typeof posthog.hogFlowsSchedulesCreate>>;

const result: HogFlowsSchedulesCreateOutput = await posthog.hogFlowsSchedulesCreate();

// Result shape (from schema): { id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string }
```

### `posthog.hogFlowsSchedulesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/hog_flows/{id}/schedules/{schedule_id}/`
- **OpenAPI operationId**: `hog_flows_schedules_destroy`
- **Path params**: `id`, `schedule_id`
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

type HogFlowsSchedulesDestroyInput = Parameters<typeof posthog.hogFlowsSchedulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsSchedulesDestroyOutput = Awaited<ReturnType<typeof posthog.hogFlowsSchedulesDestroy>>;

const result: HogFlowsSchedulesDestroyOutput = await posthog.hogFlowsSchedulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.hogFlowsSchedulesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/hog_flows/{id}/schedules/{schedule_id}/`
- **OpenAPI operationId**: `hog_flows_schedules_partial_update`
- **Path params**: `id`, `schedule_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsSchedulesPartialUpdateInput = Parameters<typeof posthog.hogFlowsSchedulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsSchedulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.hogFlowsSchedulesPartialUpdate>>;

const result: HogFlowsSchedulesPartialUpdateOutput = await posthog.hogFlowsSchedulesPartialUpdate();

// Result shape (from schema): { id: string; rrule: string; starts_at: string; timezone?: string; variables?: unknown; status: "active" | "paused" | "completed"; next_run_at: string | null; created_at: string; updated_at: string }
```

### `posthog.hogFlowsBulkDeleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_flows/bulk_delete/`
- **OpenAPI operationId**: `hog_flows_bulk_delete_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsBulkDeleteCreateInput = Parameters<typeof posthog.hogFlowsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.hogFlowsBulkDeleteCreate>>;

const result: HogFlowsBulkDeleteCreateOutput = await posthog.hogFlowsBulkDeleteCreate();

// Result shape (from schema): { id: string; name?: string | null; description?: string; version: number; status?: "draft" | "active" | "archived"; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.hogFlowsMetricsGlobalRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_flows/metrics/global/`
- **OpenAPI operationId**: `hog_flows_metrics_global_retrieve`
- **Path params**: None
- **Query params**: `after`, `before`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ workflow_id: string; succeeded: number; failed: number })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsMetricsGlobalRetrieveInput = Parameters<typeof posthog.hogFlowsMetricsGlobalRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsMetricsGlobalRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFlowsMetricsGlobalRetrieve>>;

const result: HogFlowsMetricsGlobalRetrieveOutput = await posthog.hogFlowsMetricsGlobalRetrieve();

// Result shape (from schema): ({ workflow_id: string; succeeded: number; failed: number })[]
```

### `posthog.hogFlowsUserBlastRadiusCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_flows/user_blast_radius/`
- **OpenAPI operationId**: `hog_flows_user_blast_radius_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ affected: number; total: number; limit: number; dedupe_key: "email" | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFlowsUserBlastRadiusCreateInput = Parameters<typeof posthog.hogFlowsUserBlastRadiusCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFlowsUserBlastRadiusCreateOutput = Awaited<ReturnType<typeof posthog.hogFlowsUserBlastRadiusCreate>>;

const result: HogFlowsUserBlastRadiusCreateOutput = await posthog.hogFlowsUserBlastRadiusCreate();

// Result shape (from schema): { affected: number; total: number; limit: number; dedupe_key: "email" | null }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

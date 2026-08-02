# Hog Functions

## Operations

### `posthog.environmentsHogFunctionsList`

- **HTTP**: `GET /api/environments/{environment_id}/hog_functions/`
- **OpenAPI operationId**: `environments_hog_functions_list`
- **Path params**: None
- **Query params**: `created_at`, `created_by`, `enabled`, `id`, `limit`, `offset`, `type`, `updated_at`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; type: string | null; name: string | null; description: string; created_at: string; created_by: { id: number; uuid: string; distinc...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFunctionsListInput = Parameters<typeof posthog.environmentsHogFunctionsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsListOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsList>>;

const result: EnvironmentsHogFunctionsListOutput = await posthog.environmentsHogFunctionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; type: string | null; name: string | null; description: string; created_at: string; created_by: { id: number; uuid: string; distinc...
```

### `posthog.environmentsHogFunctionsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_functions/`
- **OpenAPI operationId**: `environments_hog_functions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFunctionsCreateInput = Parameters<typeof posthog.environmentsHogFunctionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsCreate>>;

const result: EnvironmentsHogFunctionsCreateOutput = await posthog.environmentsHogFunctionsCreate();

// Result shape (from schema): { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...
```

### `posthog.environmentsHogFunctionsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/hog_functions/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_hog_functions_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFunctionsDestroyInput = Parameters<typeof posthog.environmentsHogFunctionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsDestroy>>;

const result: EnvironmentsHogFunctionsDestroyOutput = await posthog.environmentsHogFunctionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsHogFunctionsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_functions/{id}/`
- **OpenAPI operationId**: `environments_hog_functions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFunctionsRetrieveInput = Parameters<typeof posthog.environmentsHogFunctionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsRetrieve>>;

const result: EnvironmentsHogFunctionsRetrieveOutput = await posthog.environmentsHogFunctionsRetrieve();

// Result shape (from schema): { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...
```

### `posthog.environmentsHogFunctionsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/hog_functions/{id}/`
- **OpenAPI operationId**: `environments_hog_functions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFunctionsPartialUpdateInput = Parameters<typeof posthog.environmentsHogFunctionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsPartialUpdate>>;

const result: EnvironmentsHogFunctionsPartialUpdateOutput = await posthog.environmentsHogFunctionsPartialUpdate();

// Result shape (from schema): { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...
```

### `posthog.environmentsHogFunctionsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/hog_functions/{id}/`
- **OpenAPI operationId**: `environments_hog_functions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFunctionsUpdateInput = Parameters<typeof posthog.environmentsHogFunctionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsUpdate>>;

const result: EnvironmentsHogFunctionsUpdateOutput = await posthog.environmentsHogFunctionsUpdate();

// Result shape (from schema): { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...
```

### `posthog.environmentsHogFunctionsEnableBackfillsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_functions/{id}/enable_backfills/`
- **OpenAPI operationId**: `environments_hog_functions_enable_backfills_create`
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

type EnvironmentsHogFunctionsEnableBackfillsCreateInput = Parameters<typeof posthog.environmentsHogFunctionsEnableBackfillsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsEnableBackfillsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsEnableBackfillsCreate>>;

const result: EnvironmentsHogFunctionsEnableBackfillsCreateOutput = await posthog.environmentsHogFunctionsEnableBackfillsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsHogFunctionsInvocationsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_functions/{id}/invocations/`
- **OpenAPI operationId**: `environments_hog_functions_invocations_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ configuration: { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFunctionsInvocationsCreateInput = Parameters<typeof posthog.environmentsHogFunctionsInvocationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsInvocationsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsInvocationsCreate>>;

const result: EnvironmentsHogFunctionsInvocationsCreateOutput = await posthog.environmentsHogFunctionsInvocationsCreate();

// Result shape (from schema): { configuration: { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description...
```

### `posthog.environmentsHogFunctionsLogsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_functions/{id}/logs/`
- **OpenAPI operationId**: `environments_hog_functions_logs_retrieve`
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

type EnvironmentsHogFunctionsLogsRetrieveInput = Parameters<typeof posthog.environmentsHogFunctionsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsLogsRetrieve>>;

const result: EnvironmentsHogFunctionsLogsRetrieveOutput = await posthog.environmentsHogFunctionsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsHogFunctionsMetricsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_functions/{id}/metrics/`
- **OpenAPI operationId**: `environments_hog_functions_metrics_retrieve`
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

type EnvironmentsHogFunctionsMetricsRetrieveInput = Parameters<typeof posthog.environmentsHogFunctionsMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsMetricsRetrieve>>;

const result: EnvironmentsHogFunctionsMetricsRetrieveOutput = await posthog.environmentsHogFunctionsMetricsRetrieve();

// Result shape (from schema): { labels: (string)[]; series: ({ name: string; values: (number)[] })[] }
```

### `posthog.environmentsHogFunctionsMetricsTotalsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_functions/{id}/metrics/totals/`
- **OpenAPI operationId**: `environments_hog_functions_metrics_totals_retrieve`
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

type EnvironmentsHogFunctionsMetricsTotalsRetrieveInput = Parameters<typeof posthog.environmentsHogFunctionsMetricsTotalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsMetricsTotalsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsMetricsTotalsRetrieve>>;

const result: EnvironmentsHogFunctionsMetricsTotalsRetrieveOutput = await posthog.environmentsHogFunctionsMetricsTotalsRetrieve();

// Result shape (from schema): { totals: { [key: string]: number | undefined } }
```

### `posthog.environmentsHogFunctionsRerunCreate`

- **HTTP**: `POST /api/environments/{environment_id}/hog_functions/{id}/rerun/`
- **What it does**: Rerun past invocations of this hog function from their stored payloads.

The CDP worker reads matching rows from the `hog_invocation_results`
ClickHouse table, rehydrates the invocation from the stored
`invocation_globals`, and re-enqueues onto cyclotron. Each rerun
run reuses the original `invocation_id` with `is_retry=1` set on the
new lifecycle row so the UI can surface that it was a rerun.

For source-webhook functions the worker strips `request.headers` from
the rehydrated globals before re-enqueuing (see the rerun paginator):
those headers carry the inbound sender's credentials, and replaying
them through a reconfigured function would let a write-access user
exfiltrate stored secrets.

Because rerun replays historical event/person/group data, it requires
`person:read` and `group:read` on top of `hog_function:write`.
- **OpenAPI operationId**: `environments_hog_functions_rerun_create`
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

type EnvironmentsHogFunctionsRerunCreateInput = Parameters<typeof posthog.environmentsHogFunctionsRerunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsRerunCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsRerunCreate>>;

const result: EnvironmentsHogFunctionsRerunCreateOutput = await posthog.environmentsHogFunctionsRerunCreate();

// Result shape (from schema): { rerun_job_id: string; queued_count: number; skipped_count: number }
```

### `posthog.environmentsHogFunctionsIconRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_functions/icon/`
- **OpenAPI operationId**: `environments_hog_functions_icon_retrieve`
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

type EnvironmentsHogFunctionsIconRetrieveInput = Parameters<typeof posthog.environmentsHogFunctionsIconRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsIconRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsIconRetrieve>>;

const result: EnvironmentsHogFunctionsIconRetrieveOutput = await posthog.environmentsHogFunctionsIconRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsHogFunctionsIconsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/hog_functions/icons/`
- **OpenAPI operationId**: `environments_hog_functions_icons_retrieve`
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

type EnvironmentsHogFunctionsIconsRetrieveInput = Parameters<typeof posthog.environmentsHogFunctionsIconsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsIconsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsIconsRetrieve>>;

const result: EnvironmentsHogFunctionsIconsRetrieveOutput = await posthog.environmentsHogFunctionsIconsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsHogFunctionsRearrangePartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/hog_functions/rearrange/`
- **What it does**: Update the execution order of multiple HogFunctions.
- **OpenAPI operationId**: `environments_hog_functions_rearrange_partial_update`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; creat...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHogFunctionsRearrangePartialUpdateInput = Parameters<typeof posthog.environmentsHogFunctionsRearrangePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHogFunctionsRearrangePartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsHogFunctionsRearrangePartialUpdate>>;

const result: EnvironmentsHogFunctionsRearrangePartialUpdateOutput = await posthog.environmentsHogFunctionsRearrangePartialUpdate();

// Result shape (from schema): ({ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; creat...
```

### `posthog.hogFunctionsList`

- **HTTP**: `GET /api/projects/{project_id}/hog_functions/`
- **OpenAPI operationId**: `hog_functions_list`
- **Path params**: None
- **Query params**: `created_at`, `created_by`, `enabled`, `id`, `limit`, `offset`, `type`, `updated_at`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; type: string | null; name: string | null; description: string; created_at: string; created_by: { id: number; uuid: string; distinc...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFunctionsListInput = Parameters<typeof posthog.hogFunctionsList> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsListOutput = Awaited<ReturnType<typeof posthog.hogFunctionsList>>;

const result: HogFunctionsListOutput = await posthog.hogFunctionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; type: string | null; name: string | null; description: string; created_at: string; created_by: { id: number; uuid: string; distinc...
```

### `posthog.hogFunctionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_functions/`
- **OpenAPI operationId**: `hog_functions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type HogFunctionsCreateInput = Parameters<typeof posthog.hogFunctionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsCreateOutput = Awaited<ReturnType<typeof posthog.hogFunctionsCreate>>;

const result: HogFunctionsCreateOutput = await posthog.hogFunctionsCreate();

// Result shape (from schema): { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...
```

### `posthog.hogFunctionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/hog_functions/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `hog_functions_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type HogFunctionsDestroyInput = Parameters<typeof posthog.hogFunctionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsDestroyOutput = Awaited<ReturnType<typeof posthog.hogFunctionsDestroy>>;

const result: HogFunctionsDestroyOutput = await posthog.hogFunctionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.hogFunctionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_functions/{id}/`
- **OpenAPI operationId**: `hog_functions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFunctionsRetrieveInput = Parameters<typeof posthog.hogFunctionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFunctionsRetrieve>>;

const result: HogFunctionsRetrieveOutput = await posthog.hogFunctionsRetrieve();

// Result shape (from schema): { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...
```

### `posthog.hogFunctionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/hog_functions/{id}/`
- **OpenAPI operationId**: `hog_functions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFunctionsPartialUpdateInput = Parameters<typeof posthog.hogFunctionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.hogFunctionsPartialUpdate>>;

const result: HogFunctionsPartialUpdateOutput = await posthog.hogFunctionsPartialUpdate();

// Result shape (from schema): { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...
```

### `posthog.hogFunctionsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/hog_functions/{id}/`
- **OpenAPI operationId**: `hog_functions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFunctionsUpdateInput = Parameters<typeof posthog.hogFunctionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsUpdateOutput = Awaited<ReturnType<typeof posthog.hogFunctionsUpdate>>;

const result: HogFunctionsUpdateOutput = await posthog.hogFunctionsUpdate();

// Result shape (from schema): { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; create...
```

### `posthog.hogFunctionsEnableBackfillsCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_functions/{id}/enable_backfills/`
- **OpenAPI operationId**: `hog_functions_enable_backfills_create`
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

type HogFunctionsEnableBackfillsCreateInput = Parameters<typeof posthog.hogFunctionsEnableBackfillsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsEnableBackfillsCreateOutput = Awaited<ReturnType<typeof posthog.hogFunctionsEnableBackfillsCreate>>;

const result: HogFunctionsEnableBackfillsCreateOutput = await posthog.hogFunctionsEnableBackfillsCreate();

// Result shape (from schema): unknown
```

### `posthog.hogFunctionsInvocationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_functions/{id}/invocations/`
- **OpenAPI operationId**: `hog_functions_invocations_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ configuration: { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFunctionsInvocationsCreateInput = Parameters<typeof posthog.hogFunctionsInvocationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsInvocationsCreateOutput = Awaited<ReturnType<typeof posthog.hogFunctionsInvocationsCreate>>;

const result: HogFunctionsInvocationsCreateOutput = await posthog.hogFunctionsInvocationsCreate();

// Result shape (from schema): { configuration: { id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description...
```

### `posthog.hogFunctionsLogsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_functions/{id}/logs/`
- **OpenAPI operationId**: `hog_functions_logs_retrieve`
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

type HogFunctionsLogsRetrieveInput = Parameters<typeof posthog.hogFunctionsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFunctionsLogsRetrieve>>;

const result: HogFunctionsLogsRetrieveOutput = await posthog.hogFunctionsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.hogFunctionsMetricsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_functions/{id}/metrics/`
- **OpenAPI operationId**: `hog_functions_metrics_retrieve`
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

type HogFunctionsMetricsRetrieveInput = Parameters<typeof posthog.hogFunctionsMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFunctionsMetricsRetrieve>>;

const result: HogFunctionsMetricsRetrieveOutput = await posthog.hogFunctionsMetricsRetrieve();

// Result shape (from schema): { labels: (string)[]; series: ({ name: string; values: (number)[] })[] }
```

### `posthog.hogFunctionsMetricsTotalsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_functions/{id}/metrics/totals/`
- **OpenAPI operationId**: `hog_functions_metrics_totals_retrieve`
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

type HogFunctionsMetricsTotalsRetrieveInput = Parameters<typeof posthog.hogFunctionsMetricsTotalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsMetricsTotalsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFunctionsMetricsTotalsRetrieve>>;

const result: HogFunctionsMetricsTotalsRetrieveOutput = await posthog.hogFunctionsMetricsTotalsRetrieve();

// Result shape (from schema): { totals: { [key: string]: number | undefined } }
```

### `posthog.hogFunctionsRerunCreate`

- **HTTP**: `POST /api/projects/{project_id}/hog_functions/{id}/rerun/`
- **What it does**: Rerun past invocations of this hog function from their stored payloads.

The CDP worker reads matching rows from the `hog_invocation_results`
ClickHouse table, rehydrates the invocation from the stored
`invocation_globals`, and re-enqueues onto cyclotron. Each rerun
run reuses the original `invocation_id` with `is_retry=1` set on the
new lifecycle row so the UI can surface that it was a rerun.

For source-webhook functions the worker strips `request.headers` from
the rehydrated globals before re-enqueuing (see the rerun paginator):
those headers carry the inbound sender's credentials, and replaying
them through a reconfigured function would let a write-access user
exfiltrate stored secrets.

Because rerun replays historical event/person/group data, it requires
`person:read` and `group:read` on top of `hog_function:write`.
- **OpenAPI operationId**: `hog_functions_rerun_create`
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

type HogFunctionsRerunCreateInput = Parameters<typeof posthog.hogFunctionsRerunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsRerunCreateOutput = Awaited<ReturnType<typeof posthog.hogFunctionsRerunCreate>>;

const result: HogFunctionsRerunCreateOutput = await posthog.hogFunctionsRerunCreate();

// Result shape (from schema): { rerun_job_id: string; queued_count: number; skipped_count: number }
```

### `posthog.hogFunctionsIconRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_functions/icon/`
- **OpenAPI operationId**: `hog_functions_icon_retrieve`
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

type HogFunctionsIconRetrieveInput = Parameters<typeof posthog.hogFunctionsIconRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsIconRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFunctionsIconRetrieve>>;

const result: HogFunctionsIconRetrieveOutput = await posthog.hogFunctionsIconRetrieve();

// Result shape (from schema): unknown
```

### `posthog.hogFunctionsIconsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/hog_functions/icons/`
- **OpenAPI operationId**: `hog_functions_icons_retrieve`
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

type HogFunctionsIconsRetrieveInput = Parameters<typeof posthog.hogFunctionsIconsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsIconsRetrieveOutput = Awaited<ReturnType<typeof posthog.hogFunctionsIconsRetrieve>>;

const result: HogFunctionsIconsRetrieveOutput = await posthog.hogFunctionsIconsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.hogFunctionsRearrangePartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/hog_functions/rearrange/`
- **What it does**: Update the execution order of multiple HogFunctions.
- **OpenAPI operationId**: `hog_functions_rearrange_partial_update`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; creat...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HogFunctionsRearrangePartialUpdateInput = Parameters<typeof posthog.hogFunctionsRearrangePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type HogFunctionsRearrangePartialUpdateOutput = Awaited<ReturnType<typeof posthog.hogFunctionsRearrangePartialUpdate>>;

const result: HogFunctionsRearrangePartialUpdateOutput = await posthog.hogFunctionsRearrangePartialUpdate();

// Result shape (from schema): ({ id: string; type?: "destination" | "site_destination" | "internal_destination" | "source_webhook" | "warehouse_source_webhook" | "site_app" | "transformation" | null; name?: string | null; description?: string; creat...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

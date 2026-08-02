# Experiment Saved Metrics

## Operations

### `posthog.experimentSavedMetricsList`

- **HTTP**: `GET /api/projects/{project_id}/experiment_saved_metrics/`
- **OpenAPI operationId**: `experiment_saved_metrics_list`
- **Path params**: None
- **Query params**: `event`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; description?: string | null; query: unknown; created_by: { id: number; uuid: string; distinct_id?: string | null; fi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentSavedMetricsListInput = Parameters<typeof posthog.experimentSavedMetricsList> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentSavedMetricsListOutput = Awaited<ReturnType<typeof posthog.experimentSavedMetricsList>>;

const result: ExperimentSavedMetricsListOutput = await posthog.experimentSavedMetricsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; description?: string | null; query: unknown; created_by: { id: number; uuid: string; distinct_id?: string | null; fi...
```

### `posthog.experimentSavedMetricsCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiment_saved_metrics/`
- **OpenAPI operationId**: `experiment_saved_metrics_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; query: unknown; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: b...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ExperimentSavedMetricsCreateInput = Parameters<typeof posthog.experimentSavedMetricsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentSavedMetricsCreateOutput = Awaited<ReturnType<typeof posthog.experimentSavedMetricsCreate>>;

const result: ExperimentSavedMetricsCreateOutput = await posthog.experimentSavedMetricsCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; query: unknown; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: b...
```

### `posthog.experimentSavedMetricsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/experiment_saved_metrics/{id}/`
- **OpenAPI operationId**: `experiment_saved_metrics_destroy`
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

type ExperimentSavedMetricsDestroyInput = Parameters<typeof posthog.experimentSavedMetricsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentSavedMetricsDestroyOutput = Awaited<ReturnType<typeof posthog.experimentSavedMetricsDestroy>>;

const result: ExperimentSavedMetricsDestroyOutput = await posthog.experimentSavedMetricsDestroy();

// Result shape (from schema): unknown
```

### `posthog.experimentSavedMetricsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/experiment_saved_metrics/{id}/`
- **OpenAPI operationId**: `experiment_saved_metrics_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; query: unknown; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: b...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentSavedMetricsRetrieveInput = Parameters<typeof posthog.experimentSavedMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentSavedMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.experimentSavedMetricsRetrieve>>;

const result: ExperimentSavedMetricsRetrieveOutput = await posthog.experimentSavedMetricsRetrieve();

// Result shape (from schema): { id: number; name: string; description?: string | null; query: unknown; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: b...
```

### `posthog.experimentSavedMetricsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/experiment_saved_metrics/{id}/`
- **OpenAPI operationId**: `experiment_saved_metrics_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; query: unknown; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: b...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentSavedMetricsPartialUpdateInput = Parameters<typeof posthog.experimentSavedMetricsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentSavedMetricsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.experimentSavedMetricsPartialUpdate>>;

const result: ExperimentSavedMetricsPartialUpdateOutput = await posthog.experimentSavedMetricsPartialUpdate();

// Result shape (from schema): { id: number; name: string; description?: string | null; query: unknown; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: b...
```

### `posthog.experimentSavedMetricsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/experiment_saved_metrics/{id}/`
- **OpenAPI operationId**: `experiment_saved_metrics_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; query: unknown; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: b...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentSavedMetricsUpdateInput = Parameters<typeof posthog.experimentSavedMetricsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentSavedMetricsUpdateOutput = Awaited<ReturnType<typeof posthog.experimentSavedMetricsUpdate>>;

const result: ExperimentSavedMetricsUpdateOutput = await posthog.experimentSavedMetricsUpdate();

// Result shape (from schema): { id: number; name: string; description?: string | null; query: unknown; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: b...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

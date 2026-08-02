# Dataset Items

## Operations

### `posthog.environmentsDatasetItemsList`

- **HTTP**: `GET /api/environments/{environment_id}/dataset_items/`
- **OpenAPI operationId**: `environments_dataset_items_list`
- **Path params**: None
- **Query params**: `dataset`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | nul...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDatasetItemsListInput = Parameters<typeof posthog.environmentsDatasetItemsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetItemsListOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetItemsList>>;

const result: EnvironmentsDatasetItemsListOutput = await posthog.environmentsDatasetItemsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | nul...
```

### `posthog.environmentsDatasetItemsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dataset_items/`
- **OpenAPI operationId**: `environments_dataset_items_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDatasetItemsCreateInput = Parameters<typeof posthog.environmentsDatasetItemsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetItemsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetItemsCreate>>;

const result: EnvironmentsDatasetItemsCreateOutput = await posthog.environmentsDatasetItemsCreate();

// Result shape (from schema): { id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...
```

### `posthog.environmentsDatasetItemsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/dataset_items/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_dataset_items_destroy`
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

type EnvironmentsDatasetItemsDestroyInput = Parameters<typeof posthog.environmentsDatasetItemsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetItemsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetItemsDestroy>>;

const result: EnvironmentsDatasetItemsDestroyOutput = await posthog.environmentsDatasetItemsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsDatasetItemsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/dataset_items/{id}/`
- **OpenAPI operationId**: `environments_dataset_items_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDatasetItemsRetrieveInput = Parameters<typeof posthog.environmentsDatasetItemsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetItemsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetItemsRetrieve>>;

const result: EnvironmentsDatasetItemsRetrieveOutput = await posthog.environmentsDatasetItemsRetrieve();

// Result shape (from schema): { id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...
```

### `posthog.environmentsDatasetItemsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/dataset_items/{id}/`
- **OpenAPI operationId**: `environments_dataset_items_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDatasetItemsPartialUpdateInput = Parameters<typeof posthog.environmentsDatasetItemsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetItemsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetItemsPartialUpdate>>;

const result: EnvironmentsDatasetItemsPartialUpdateOutput = await posthog.environmentsDatasetItemsPartialUpdate();

// Result shape (from schema): { id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...
```

### `posthog.environmentsDatasetItemsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/dataset_items/{id}/`
- **OpenAPI operationId**: `environments_dataset_items_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDatasetItemsUpdateInput = Parameters<typeof posthog.environmentsDatasetItemsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetItemsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetItemsUpdate>>;

const result: EnvironmentsDatasetItemsUpdateOutput = await posthog.environmentsDatasetItemsUpdate();

// Result shape (from schema): { id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...
```

### `posthog.datasetItemsList`

- **HTTP**: `GET /api/projects/{project_id}/dataset_items/`
- **OpenAPI operationId**: `dataset_items_list`
- **Path params**: None
- **Query params**: `dataset`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | nul...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DatasetItemsListInput = Parameters<typeof posthog.datasetItemsList> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetItemsListOutput = Awaited<ReturnType<typeof posthog.datasetItemsList>>;

const result: DatasetItemsListOutput = await posthog.datasetItemsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | nul...
```

### `posthog.datasetItemsCreate`

- **HTTP**: `POST /api/projects/{project_id}/dataset_items/`
- **OpenAPI operationId**: `dataset_items_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DatasetItemsCreateInput = Parameters<typeof posthog.datasetItemsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetItemsCreateOutput = Awaited<ReturnType<typeof posthog.datasetItemsCreate>>;

const result: DatasetItemsCreateOutput = await posthog.datasetItemsCreate();

// Result shape (from schema): { id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...
```

### `posthog.datasetItemsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/dataset_items/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `dataset_items_destroy`
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

type DatasetItemsDestroyInput = Parameters<typeof posthog.datasetItemsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetItemsDestroyOutput = Awaited<ReturnType<typeof posthog.datasetItemsDestroy>>;

const result: DatasetItemsDestroyOutput = await posthog.datasetItemsDestroy();

// Result shape (from schema): unknown
```

### `posthog.datasetItemsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/dataset_items/{id}/`
- **OpenAPI operationId**: `dataset_items_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DatasetItemsRetrieveInput = Parameters<typeof posthog.datasetItemsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetItemsRetrieveOutput = Awaited<ReturnType<typeof posthog.datasetItemsRetrieve>>;

const result: DatasetItemsRetrieveOutput = await posthog.datasetItemsRetrieve();

// Result shape (from schema): { id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...
```

### `posthog.datasetItemsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/dataset_items/{id}/`
- **OpenAPI operationId**: `dataset_items_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DatasetItemsPartialUpdateInput = Parameters<typeof posthog.datasetItemsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetItemsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.datasetItemsPartialUpdate>>;

const result: DatasetItemsPartialUpdateOutput = await posthog.datasetItemsPartialUpdate();

// Result shape (from schema): { id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...
```

### `posthog.datasetItemsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/dataset_items/{id}/`
- **OpenAPI operationId**: `dataset_items_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DatasetItemsUpdateInput = Parameters<typeof posthog.datasetItemsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetItemsUpdateOutput = Awaited<ReturnType<typeof posthog.datasetItemsUpdate>>;

const result: DatasetItemsUpdateOutput = await posthog.datasetItemsUpdate();

// Result shape (from schema): { id: string; dataset: string; input?: unknown; output?: unknown; metadata?: unknown; ref_trace_id?: string | null; ref_timestamp?: string | null; ref_source_id?: string | null; deleted?: boolean | null; created_at: str...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

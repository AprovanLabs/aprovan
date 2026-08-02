# Datasets

## Operations

### `posthog.environmentsDatasetsList`

- **HTTP**: `GET /api/environments/{environment_id}/datasets/`
- **OpenAPI operationId**: `environments_datasets_list`
- **Path params**: None
- **Query params**: `id__in`, `limit`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDatasetsListInput = Parameters<typeof posthog.environmentsDatasetsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetsListOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetsList>>;

const result: EnvironmentsDatasetsListOutput = await posthog.environmentsDatasetsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | ...
```

### `posthog.environmentsDatasetsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/datasets/`
- **OpenAPI operationId**: `environments_datasets_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDatasetsCreateInput = Parameters<typeof posthog.environmentsDatasetsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetsCreate>>;

const result: EnvironmentsDatasetsCreateOutput = await posthog.environmentsDatasetsCreate();

// Result shape (from schema): { id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...
```

### `posthog.environmentsDatasetsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/datasets/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_datasets_destroy`
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

type EnvironmentsDatasetsDestroyInput = Parameters<typeof posthog.environmentsDatasetsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetsDestroy>>;

const result: EnvironmentsDatasetsDestroyOutput = await posthog.environmentsDatasetsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsDatasetsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/datasets/{id}/`
- **OpenAPI operationId**: `environments_datasets_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDatasetsRetrieveInput = Parameters<typeof posthog.environmentsDatasetsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetsRetrieve>>;

const result: EnvironmentsDatasetsRetrieveOutput = await posthog.environmentsDatasetsRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...
```

### `posthog.environmentsDatasetsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/datasets/{id}/`
- **OpenAPI operationId**: `environments_datasets_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDatasetsPartialUpdateInput = Parameters<typeof posthog.environmentsDatasetsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetsPartialUpdate>>;

const result: EnvironmentsDatasetsPartialUpdateOutput = await posthog.environmentsDatasetsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...
```

### `posthog.environmentsDatasetsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/datasets/{id}/`
- **OpenAPI operationId**: `environments_datasets_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDatasetsUpdateInput = Parameters<typeof posthog.environmentsDatasetsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDatasetsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDatasetsUpdate>>;

const result: EnvironmentsDatasetsUpdateOutput = await posthog.environmentsDatasetsUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...
```

### `posthog.datasetsList`

- **HTTP**: `GET /api/projects/{project_id}/datasets/`
- **OpenAPI operationId**: `datasets_list`
- **Path params**: None
- **Query params**: `id__in`, `limit`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DatasetsListInput = Parameters<typeof posthog.datasetsList> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetsListOutput = Awaited<ReturnType<typeof posthog.datasetsList>>;

const result: DatasetsListOutput = await posthog.datasetsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | ...
```

### `posthog.datasetsCreate`

- **HTTP**: `POST /api/projects/{project_id}/datasets/`
- **OpenAPI operationId**: `datasets_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DatasetsCreateInput = Parameters<typeof posthog.datasetsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetsCreateOutput = Awaited<ReturnType<typeof posthog.datasetsCreate>>;

const result: DatasetsCreateOutput = await posthog.datasetsCreate();

// Result shape (from schema): { id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...
```

### `posthog.datasetsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/datasets/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `datasets_destroy`
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

type DatasetsDestroyInput = Parameters<typeof posthog.datasetsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetsDestroyOutput = Awaited<ReturnType<typeof posthog.datasetsDestroy>>;

const result: DatasetsDestroyOutput = await posthog.datasetsDestroy();

// Result shape (from schema): unknown
```

### `posthog.datasetsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/datasets/{id}/`
- **OpenAPI operationId**: `datasets_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DatasetsRetrieveInput = Parameters<typeof posthog.datasetsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetsRetrieveOutput = Awaited<ReturnType<typeof posthog.datasetsRetrieve>>;

const result: DatasetsRetrieveOutput = await posthog.datasetsRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...
```

### `posthog.datasetsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/datasets/{id}/`
- **OpenAPI operationId**: `datasets_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DatasetsPartialUpdateInput = Parameters<typeof posthog.datasetsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.datasetsPartialUpdate>>;

const result: DatasetsPartialUpdateOutput = await posthog.datasetsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...
```

### `posthog.datasetsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/datasets/{id}/`
- **OpenAPI operationId**: `datasets_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DatasetsUpdateInput = Parameters<typeof posthog.datasetsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DatasetsUpdateOutput = Awaited<ReturnType<typeof posthog.datasetsUpdate>>;

const result: DatasetsUpdateOutput = await posthog.datasetsUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; metadata?: unknown; created_at: string; updated_at: string | null; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; ...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

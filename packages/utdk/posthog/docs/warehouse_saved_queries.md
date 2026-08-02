# Warehouse Saved Queries

## Operations

### `posthog.environmentsWarehouseSavedQueriesList`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_saved_queries/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_list`
- **Path params**: None
- **Query params**: `page`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted: boolean | null; name: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; l...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesListInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesListOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesList>>;

const result: EnvironmentsWarehouseSavedQueriesListOutput = await posthog.environmentsWarehouseSavedQueriesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted: boolean | null; name: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; l...
```

### `posthog.environmentsWarehouseSavedQueriesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_saved_queries/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesCreateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesCreate>>;

const result: EnvironmentsWarehouseSavedQueriesCreateOutput = await posthog.environmentsWarehouseSavedQueriesCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/warehouse_saved_queries/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_destroy`
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

type EnvironmentsWarehouseSavedQueriesDestroyInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesDestroy>>;

const result: EnvironmentsWarehouseSavedQueriesDestroyOutput = await posthog.environmentsWarehouseSavedQueriesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsWarehouseSavedQueriesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_saved_queries/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesRetrieveInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesRetrieve>>;

const result: EnvironmentsWarehouseSavedQueriesRetrieveOutput = await posthog.environmentsWarehouseSavedQueriesRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/warehouse_saved_queries/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesPartialUpdateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesPartialUpdate>>;

const result: EnvironmentsWarehouseSavedQueriesPartialUpdateOutput = await posthog.environmentsWarehouseSavedQueriesPartialUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/warehouse_saved_queries/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesUpdateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesUpdate>>;

const result: EnvironmentsWarehouseSavedQueriesUpdateOutput = await posthog.environmentsWarehouseSavedQueriesUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesActivityRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_saved_queries/{id}/activity/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_activity_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesActivityRetrieveInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesActivityRetrieve>>;

const result: EnvironmentsWarehouseSavedQueriesActivityRetrieveOutput = await posthog.environmentsWarehouseSavedQueriesActivityRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesAncestorsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_saved_queries/{id}/ancestors/`
- **What it does**: Return the ancestors of this saved query.

By default, we return the immediate parents. The `level` parameter can be used to
look further back into the ancestor tree. If `level` overshoots (i.e. points to only
ancestors beyond the root), we return an empty list.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_ancestors_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesAncestorsCreateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesAncestorsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesAncestorsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesAncestorsCreate>>;

const result: EnvironmentsWarehouseSavedQueriesAncestorsCreateOutput = await posthog.environmentsWarehouseSavedQueriesAncestorsCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesCancelCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_saved_queries/{id}/cancel/`
- **What it does**: Cancel a running saved query workflow.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_cancel_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesCancelCreateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesCancelCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesCancelCreate>>;

const result: EnvironmentsWarehouseSavedQueriesCancelCreateOutput = await posthog.environmentsWarehouseSavedQueriesCancelCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesDependenciesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_saved_queries/{id}/dependencies/`
- **What it does**: Return the count of immediate upstream and downstream dependencies for this saved query.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_dependencies_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesDependenciesRetrieveInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesDependenciesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesDependenciesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesDependenciesRetrieve>>;

const result: EnvironmentsWarehouseSavedQueriesDependenciesRetrieveOutput = await posthog.environmentsWarehouseSavedQueriesDependenciesRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesDescendantsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_saved_queries/{id}/descendants/`
- **What it does**: Return the descendants of this saved query.

By default, we return the immediate children. The `level` parameter can be used to
look further ahead into the descendants tree. If `level` overshoots (i.e. points to only
descendants further than a leaf), we return an empty list.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_descendants_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesDescendantsCreateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesDescendantsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesDescendantsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesDescendantsCreate>>;

const result: EnvironmentsWarehouseSavedQueriesDescendantsCreateOutput = await posthog.environmentsWarehouseSavedQueriesDescendantsCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesMaterializeCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_saved_queries/{id}/materialize/`
- **What it does**: Enable materialization for this saved query with a 24-hour sync frequency.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_materialize_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesMaterializeCreateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesMaterializeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesMaterializeCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesMaterializeCreate>>;

const result: EnvironmentsWarehouseSavedQueriesMaterializeCreateOutput = await posthog.environmentsWarehouseSavedQueriesMaterializeCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesRevertMaterializationCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_saved_queries/{id}/revert_materialization/`
- **What it does**: Undo materialization, revert back to the original view.
(i.e. delete the materialized table and the schedule)
- **OpenAPI operationId**: `environments_warehouse_saved_queries_revert_materialization_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesRevertMaterializationCreateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesRevertMaterializationCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesRevertMaterializationCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesRevertMaterializationCreate>>;

const result: EnvironmentsWarehouseSavedQueriesRevertMaterializationCreateOutput = await posthog.environmentsWarehouseSavedQueriesRevertMaterializationCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesRunHistoryRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_saved_queries/{id}/run_history/`
- **What it does**: Return the recent run history (up to 5 most recent) for this materialized view.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_run_history_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesRunHistoryRetrieveInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesRunHistoryRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesRunHistoryRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesRunHistoryRetrieve>>;

const result: EnvironmentsWarehouseSavedQueriesRunHistoryRetrieveOutput = await posthog.environmentsWarehouseSavedQueriesRunHistoryRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesRunCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_saved_queries/{id}/run/`
- **What it does**: Run this saved query.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_run_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesRunCreateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesRunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesRunCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesRunCreate>>;

const result: EnvironmentsWarehouseSavedQueriesRunCreateOutput = await posthog.environmentsWarehouseSavedQueriesRunCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.environmentsWarehouseSavedQueriesResumeSchedulesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_saved_queries/resume_schedules/`
- **What it does**: Resume paused materialization schedules for multiple matviews.

Accepts a list of view IDs in the request body: {"view_ids": ["id1", "id2", ...]}
This endpoint is idempotent - calling it on already running or non-existent schedules is safe.
- **OpenAPI operationId**: `environments_warehouse_saved_queries_resume_schedules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueriesResumeSchedulesCreateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueriesResumeSchedulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueriesResumeSchedulesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueriesResumeSchedulesCreate>>;

const result: EnvironmentsWarehouseSavedQueriesResumeSchedulesCreateOutput = await posthog.environmentsWarehouseSavedQueriesResumeSchedulesCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesList`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_saved_queries/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_saved_queries_list`
- **Path params**: None
- **Query params**: `page`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted: boolean | null; name: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; l...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesListInput = Parameters<typeof posthog.warehouseSavedQueriesList> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesListOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesList>>;

const result: WarehouseSavedQueriesListOutput = await posthog.warehouseSavedQueriesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted: boolean | null; name: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; l...
```

### `posthog.warehouseSavedQueriesCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_saved_queries/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_saved_queries_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesCreateInput = Parameters<typeof posthog.warehouseSavedQueriesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesCreateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesCreate>>;

const result: WarehouseSavedQueriesCreateOutput = await posthog.warehouseSavedQueriesCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/warehouse_saved_queries/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_saved_queries_destroy`
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

type WarehouseSavedQueriesDestroyInput = Parameters<typeof posthog.warehouseSavedQueriesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesDestroyOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesDestroy>>;

const result: WarehouseSavedQueriesDestroyOutput = await posthog.warehouseSavedQueriesDestroy();

// Result shape (from schema): unknown
```

### `posthog.warehouseSavedQueriesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_saved_queries/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_saved_queries_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesRetrieveInput = Parameters<typeof posthog.warehouseSavedQueriesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesRetrieve>>;

const result: WarehouseSavedQueriesRetrieveOutput = await posthog.warehouseSavedQueriesRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/warehouse_saved_queries/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_saved_queries_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesPartialUpdateInput = Parameters<typeof posthog.warehouseSavedQueriesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesPartialUpdate>>;

const result: WarehouseSavedQueriesPartialUpdateOutput = await posthog.warehouseSavedQueriesPartialUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/warehouse_saved_queries/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_saved_queries_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesUpdateInput = Parameters<typeof posthog.warehouseSavedQueriesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesUpdate>>;

const result: WarehouseSavedQueriesUpdateOutput = await posthog.warehouseSavedQueriesUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_saved_queries/{id}/activity/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_saved_queries_activity_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesActivityRetrieveInput = Parameters<typeof posthog.warehouseSavedQueriesActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesActivityRetrieve>>;

const result: WarehouseSavedQueriesActivityRetrieveOutput = await posthog.warehouseSavedQueriesActivityRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesAncestorsCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_saved_queries/{id}/ancestors/`
- **What it does**: Return the ancestors of this saved query.

By default, we return the immediate parents. The `level` parameter can be used to
look further back into the ancestor tree. If `level` overshoots (i.e. points to only
ancestors beyond the root), we return an empty list.
- **OpenAPI operationId**: `warehouse_saved_queries_ancestors_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesAncestorsCreateInput = Parameters<typeof posthog.warehouseSavedQueriesAncestorsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesAncestorsCreateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesAncestorsCreate>>;

const result: WarehouseSavedQueriesAncestorsCreateOutput = await posthog.warehouseSavedQueriesAncestorsCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesCancelCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_saved_queries/{id}/cancel/`
- **What it does**: Cancel a running saved query workflow.
- **OpenAPI operationId**: `warehouse_saved_queries_cancel_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesCancelCreateInput = Parameters<typeof posthog.warehouseSavedQueriesCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesCancelCreateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesCancelCreate>>;

const result: WarehouseSavedQueriesCancelCreateOutput = await posthog.warehouseSavedQueriesCancelCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesDependenciesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_saved_queries/{id}/dependencies/`
- **What it does**: Return the count of immediate upstream and downstream dependencies for this saved query.
- **OpenAPI operationId**: `warehouse_saved_queries_dependencies_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesDependenciesRetrieveInput = Parameters<typeof posthog.warehouseSavedQueriesDependenciesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesDependenciesRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesDependenciesRetrieve>>;

const result: WarehouseSavedQueriesDependenciesRetrieveOutput = await posthog.warehouseSavedQueriesDependenciesRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesDescendantsCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_saved_queries/{id}/descendants/`
- **What it does**: Return the descendants of this saved query.

By default, we return the immediate children. The `level` parameter can be used to
look further ahead into the descendants tree. If `level` overshoots (i.e. points to only
descendants further than a leaf), we return an empty list.
- **OpenAPI operationId**: `warehouse_saved_queries_descendants_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesDescendantsCreateInput = Parameters<typeof posthog.warehouseSavedQueriesDescendantsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesDescendantsCreateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesDescendantsCreate>>;

const result: WarehouseSavedQueriesDescendantsCreateOutput = await posthog.warehouseSavedQueriesDescendantsCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesMaterializeCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_saved_queries/{id}/materialize/`
- **What it does**: Enable materialization for this saved query with a 24-hour sync frequency.
- **OpenAPI operationId**: `warehouse_saved_queries_materialize_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesMaterializeCreateInput = Parameters<typeof posthog.warehouseSavedQueriesMaterializeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesMaterializeCreateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesMaterializeCreate>>;

const result: WarehouseSavedQueriesMaterializeCreateOutput = await posthog.warehouseSavedQueriesMaterializeCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesRevertMaterializationCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_saved_queries/{id}/revert_materialization/`
- **What it does**: Undo materialization, revert back to the original view.
(i.e. delete the materialized table and the schedule)
- **OpenAPI operationId**: `warehouse_saved_queries_revert_materialization_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesRevertMaterializationCreateInput = Parameters<typeof posthog.warehouseSavedQueriesRevertMaterializationCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesRevertMaterializationCreateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesRevertMaterializationCreate>>;

const result: WarehouseSavedQueriesRevertMaterializationCreateOutput = await posthog.warehouseSavedQueriesRevertMaterializationCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesRunHistoryRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_saved_queries/{id}/run_history/`
- **What it does**: Return the recent run history (up to 5 most recent) for this materialized view.
- **OpenAPI operationId**: `warehouse_saved_queries_run_history_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesRunHistoryRetrieveInput = Parameters<typeof posthog.warehouseSavedQueriesRunHistoryRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesRunHistoryRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesRunHistoryRetrieve>>;

const result: WarehouseSavedQueriesRunHistoryRetrieveOutput = await posthog.warehouseSavedQueriesRunHistoryRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesRunCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_saved_queries/{id}/run/`
- **What it does**: Run this saved query.
- **OpenAPI operationId**: `warehouse_saved_queries_run_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesRunCreateInput = Parameters<typeof posthog.warehouseSavedQueriesRunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesRunCreateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesRunCreate>>;

const result: WarehouseSavedQueriesRunCreateOutput = await posthog.warehouseSavedQueriesRunCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```

### `posthog.warehouseSavedQueriesResumeSchedulesCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_saved_queries/resume_schedules/`
- **What it does**: Resume paused materialization schedules for multiple matviews.

Accepts a list of view IDs in the request body: {"view_ids": ["id1", "id2", ...]}
This endpoint is idempotent - calling it on already running or non-existent schedules is safe.
- **OpenAPI operationId**: `warehouse_saved_queries_resume_schedules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueriesResumeSchedulesCreateInput = Parameters<typeof posthog.warehouseSavedQueriesResumeSchedulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueriesResumeSchedulesCreateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueriesResumeSchedulesCreate>>;

const result: WarehouseSavedQueriesResumeSchedulesCreateOutput = await posthog.warehouseSavedQueriesResumeSchedulesCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; query: { kind?: "HogQLQuery"; query: string }; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: s...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

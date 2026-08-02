# Warehouse Saved Query Folders

## Operations

### `posthog.environmentsWarehouseSavedQueryFoldersList`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_saved_query_folders/`
- **OpenAPI operationId**: `environments_warehouse_saved_query_folders_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueryFoldersListInput = Parameters<typeof posthog.environmentsWarehouseSavedQueryFoldersList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueryFoldersListOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueryFoldersList>>;

const result: EnvironmentsWarehouseSavedQueryFoldersListOutput = await posthog.environmentsWarehouseSavedQueryFoldersList();

// Result shape (from schema): ({ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_...
```

### `posthog.environmentsWarehouseSavedQueryFoldersCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_saved_query_folders/`
- **OpenAPI operationId**: `environments_warehouse_saved_query_folders_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueryFoldersCreateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueryFoldersCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueryFoldersCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueryFoldersCreate>>;

const result: EnvironmentsWarehouseSavedQueryFoldersCreateOutput = await posthog.environmentsWarehouseSavedQueryFoldersCreate();

// Result shape (from schema): { id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...
```

### `posthog.environmentsWarehouseSavedQueryFoldersDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/warehouse_saved_query_folders/{id}/`
- **OpenAPI operationId**: `environments_warehouse_saved_query_folders_destroy`
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

type EnvironmentsWarehouseSavedQueryFoldersDestroyInput = Parameters<typeof posthog.environmentsWarehouseSavedQueryFoldersDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueryFoldersDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueryFoldersDestroy>>;

const result: EnvironmentsWarehouseSavedQueryFoldersDestroyOutput = await posthog.environmentsWarehouseSavedQueryFoldersDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsWarehouseSavedQueryFoldersRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_saved_query_folders/{id}/`
- **OpenAPI operationId**: `environments_warehouse_saved_query_folders_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueryFoldersRetrieveInput = Parameters<typeof posthog.environmentsWarehouseSavedQueryFoldersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueryFoldersRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueryFoldersRetrieve>>;

const result: EnvironmentsWarehouseSavedQueryFoldersRetrieveOutput = await posthog.environmentsWarehouseSavedQueryFoldersRetrieve();

// Result shape (from schema): { id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...
```

### `posthog.environmentsWarehouseSavedQueryFoldersPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/warehouse_saved_query_folders/{id}/`
- **OpenAPI operationId**: `environments_warehouse_saved_query_folders_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseSavedQueryFoldersPartialUpdateInput = Parameters<typeof posthog.environmentsWarehouseSavedQueryFoldersPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseSavedQueryFoldersPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseSavedQueryFoldersPartialUpdate>>;

const result: EnvironmentsWarehouseSavedQueryFoldersPartialUpdateOutput = await posthog.environmentsWarehouseSavedQueryFoldersPartialUpdate();

// Result shape (from schema): { id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...
```

### `posthog.warehouseSavedQueryFoldersList`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_saved_query_folders/`
- **OpenAPI operationId**: `warehouse_saved_query_folders_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueryFoldersListInput = Parameters<typeof posthog.warehouseSavedQueryFoldersList> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueryFoldersListOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueryFoldersList>>;

const result: WarehouseSavedQueryFoldersListOutput = await posthog.warehouseSavedQueryFoldersList();

// Result shape (from schema): ({ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_...
```

### `posthog.warehouseSavedQueryFoldersCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_saved_query_folders/`
- **OpenAPI operationId**: `warehouse_saved_query_folders_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueryFoldersCreateInput = Parameters<typeof posthog.warehouseSavedQueryFoldersCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueryFoldersCreateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueryFoldersCreate>>;

const result: WarehouseSavedQueryFoldersCreateOutput = await posthog.warehouseSavedQueryFoldersCreate();

// Result shape (from schema): { id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...
```

### `posthog.warehouseSavedQueryFoldersDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/warehouse_saved_query_folders/{id}/`
- **OpenAPI operationId**: `warehouse_saved_query_folders_destroy`
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

type WarehouseSavedQueryFoldersDestroyInput = Parameters<typeof posthog.warehouseSavedQueryFoldersDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueryFoldersDestroyOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueryFoldersDestroy>>;

const result: WarehouseSavedQueryFoldersDestroyOutput = await posthog.warehouseSavedQueryFoldersDestroy();

// Result shape (from schema): unknown
```

### `posthog.warehouseSavedQueryFoldersRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_saved_query_folders/{id}/`
- **OpenAPI operationId**: `warehouse_saved_query_folders_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueryFoldersRetrieveInput = Parameters<typeof posthog.warehouseSavedQueryFoldersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueryFoldersRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueryFoldersRetrieve>>;

const result: WarehouseSavedQueryFoldersRetrieveOutput = await posthog.warehouseSavedQueryFoldersRetrieve();

// Result shape (from schema): { id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...
```

### `posthog.warehouseSavedQueryFoldersPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/warehouse_saved_query_folders/{id}/`
- **OpenAPI operationId**: `warehouse_saved_query_folders_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseSavedQueryFoldersPartialUpdateInput = Parameters<typeof posthog.warehouseSavedQueryFoldersPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseSavedQueryFoldersPartialUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseSavedQueryFoldersPartialUpdate>>;

const result: WarehouseSavedQueryFoldersPartialUpdateOutput = await posthog.warehouseSavedQueryFoldersPartialUpdate();

// Result shape (from schema): { id: string; name: string; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_c...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

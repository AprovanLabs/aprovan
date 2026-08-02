# Warehouse Column Annotations

## Operations

### `posthog.warehouseColumnAnnotationsList`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_column_annotations/`
- **What it does**: Read and edit semantic descriptions of warehouse tables and columns surfaced to the AI agent.

List can be filtered to one table with `?table_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(table, column_name)`; the table cannot be changed after creation.
- **OpenAPI operationId**: `warehouse_column_annotations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `table_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; table: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_mod...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseColumnAnnotationsListInput = Parameters<typeof posthog.warehouseColumnAnnotationsList> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseColumnAnnotationsListOutput = Awaited<ReturnType<typeof posthog.warehouseColumnAnnotationsList>>;

const result: WarehouseColumnAnnotationsListOutput = await posthog.warehouseColumnAnnotationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; table: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_mod...
```

### `posthog.warehouseColumnAnnotationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_column_annotations/`
- **What it does**: Read and edit semantic descriptions of warehouse tables and columns surfaced to the AI agent.

List can be filtered to one table with `?table_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(table, column_name)`; the table cannot be changed after creation.
- **OpenAPI operationId**: `warehouse_column_annotations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; table: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: string...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type WarehouseColumnAnnotationsCreateInput = Parameters<typeof posthog.warehouseColumnAnnotationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseColumnAnnotationsCreateOutput = Awaited<ReturnType<typeof posthog.warehouseColumnAnnotationsCreate>>;

const result: WarehouseColumnAnnotationsCreateOutput = await posthog.warehouseColumnAnnotationsCreate();

// Result shape (from schema): { id: string; table: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: string...
```

### `posthog.warehouseColumnAnnotationsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/warehouse_column_annotations/{id}/`
- **What it does**: Read and edit semantic descriptions of warehouse tables and columns surfaced to the AI agent.

List can be filtered to one table with `?table_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(table, column_name)`; the table cannot be changed after creation.
- **OpenAPI operationId**: `warehouse_column_annotations_destroy`
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

type WarehouseColumnAnnotationsDestroyInput = Parameters<typeof posthog.warehouseColumnAnnotationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseColumnAnnotationsDestroyOutput = Awaited<ReturnType<typeof posthog.warehouseColumnAnnotationsDestroy>>;

const result: WarehouseColumnAnnotationsDestroyOutput = await posthog.warehouseColumnAnnotationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.warehouseColumnAnnotationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_column_annotations/{id}/`
- **What it does**: Read and edit semantic descriptions of warehouse tables and columns surfaced to the AI agent.

List can be filtered to one table with `?table_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(table, column_name)`; the table cannot be changed after creation.
- **OpenAPI operationId**: `warehouse_column_annotations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; table: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseColumnAnnotationsRetrieveInput = Parameters<typeof posthog.warehouseColumnAnnotationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseColumnAnnotationsRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseColumnAnnotationsRetrieve>>;

const result: WarehouseColumnAnnotationsRetrieveOutput = await posthog.warehouseColumnAnnotationsRetrieve();

// Result shape (from schema): { id: string; table: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: string...
```

### `posthog.warehouseColumnAnnotationsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/warehouse_column_annotations/{id}/`
- **What it does**: Read and edit semantic descriptions of warehouse tables and columns surfaced to the AI agent.

List can be filtered to one table with `?table_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(table, column_name)`; the table cannot be changed after creation.
- **OpenAPI operationId**: `warehouse_column_annotations_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; table: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseColumnAnnotationsPartialUpdateInput = Parameters<typeof posthog.warehouseColumnAnnotationsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseColumnAnnotationsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseColumnAnnotationsPartialUpdate>>;

const result: WarehouseColumnAnnotationsPartialUpdateOutput = await posthog.warehouseColumnAnnotationsPartialUpdate();

// Result shape (from schema): { id: string; table: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: string...
```

### `posthog.warehouseColumnAnnotationsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/warehouse_column_annotations/{id}/`
- **What it does**: Read and edit semantic descriptions of warehouse tables and columns surfaced to the AI agent.

List can be filtered to one table with `?table_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(table, column_name)`; the table cannot be changed after creation.
- **OpenAPI operationId**: `warehouse_column_annotations_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; table: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseColumnAnnotationsUpdateInput = Parameters<typeof posthog.warehouseColumnAnnotationsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseColumnAnnotationsUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseColumnAnnotationsUpdate>>;

const result: WarehouseColumnAnnotationsUpdateOutput = await posthog.warehouseColumnAnnotationsUpdate();

// Result shape (from schema): { id: string; table: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: string...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

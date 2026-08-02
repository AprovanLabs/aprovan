# Saved Query Column Annotations

## Operations

### `posthog.savedQueryColumnAnnotationsList`

- **HTTP**: `GET /api/projects/{project_id}/saved_query_column_annotations/`
- **What it does**: Read and edit semantic descriptions of data-modelling views and columns surfaced to the AI agent.

List can be filtered to one view with `?saved_query_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(saved_query, column_name)`; the view cannot be changed after creation.
- **OpenAPI operationId**: `saved_query_column_annotations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `saved_query_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; saved_query: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SavedQueryColumnAnnotationsListInput = Parameters<typeof posthog.savedQueryColumnAnnotationsList> extends [infer T, ...unknown[]] ? T : undefined;
type SavedQueryColumnAnnotationsListOutput = Awaited<ReturnType<typeof posthog.savedQueryColumnAnnotationsList>>;

const result: SavedQueryColumnAnnotationsListOutput = await posthog.savedQueryColumnAnnotationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; saved_query: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ...
```

### `posthog.savedQueryColumnAnnotationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/saved_query_column_annotations/`
- **What it does**: Read and edit semantic descriptions of data-modelling views and columns surfaced to the AI agent.

List can be filtered to one view with `?saved_query_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(saved_query, column_name)`; the view cannot be changed after creation.
- **OpenAPI operationId**: `saved_query_column_annotations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; saved_query: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type SavedQueryColumnAnnotationsCreateInput = Parameters<typeof posthog.savedQueryColumnAnnotationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SavedQueryColumnAnnotationsCreateOutput = Awaited<ReturnType<typeof posthog.savedQueryColumnAnnotationsCreate>>;

const result: SavedQueryColumnAnnotationsCreateOutput = await posthog.savedQueryColumnAnnotationsCreate();

// Result shape (from schema): { id: string; saved_query: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: ...
```

### `posthog.savedQueryColumnAnnotationsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/saved_query_column_annotations/{id}/`
- **What it does**: Read and edit semantic descriptions of data-modelling views and columns surfaced to the AI agent.

List can be filtered to one view with `?saved_query_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(saved_query, column_name)`; the view cannot be changed after creation.
- **OpenAPI operationId**: `saved_query_column_annotations_destroy`
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

type SavedQueryColumnAnnotationsDestroyInput = Parameters<typeof posthog.savedQueryColumnAnnotationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SavedQueryColumnAnnotationsDestroyOutput = Awaited<ReturnType<typeof posthog.savedQueryColumnAnnotationsDestroy>>;

const result: SavedQueryColumnAnnotationsDestroyOutput = await posthog.savedQueryColumnAnnotationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.savedQueryColumnAnnotationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/saved_query_column_annotations/{id}/`
- **What it does**: Read and edit semantic descriptions of data-modelling views and columns surfaced to the AI agent.

List can be filtered to one view with `?saved_query_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(saved_query, column_name)`; the view cannot be changed after creation.
- **OpenAPI operationId**: `saved_query_column_annotations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; saved_query: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SavedQueryColumnAnnotationsRetrieveInput = Parameters<typeof posthog.savedQueryColumnAnnotationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SavedQueryColumnAnnotationsRetrieveOutput = Awaited<ReturnType<typeof posthog.savedQueryColumnAnnotationsRetrieve>>;

const result: SavedQueryColumnAnnotationsRetrieveOutput = await posthog.savedQueryColumnAnnotationsRetrieve();

// Result shape (from schema): { id: string; saved_query: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: ...
```

### `posthog.savedQueryColumnAnnotationsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/saved_query_column_annotations/{id}/`
- **What it does**: Read and edit semantic descriptions of data-modelling views and columns surfaced to the AI agent.

List can be filtered to one view with `?saved_query_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(saved_query, column_name)`; the view cannot be changed after creation.
- **OpenAPI operationId**: `saved_query_column_annotations_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; saved_query: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SavedQueryColumnAnnotationsPartialUpdateInput = Parameters<typeof posthog.savedQueryColumnAnnotationsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SavedQueryColumnAnnotationsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.savedQueryColumnAnnotationsPartialUpdate>>;

const result: SavedQueryColumnAnnotationsPartialUpdateOutput = await posthog.savedQueryColumnAnnotationsPartialUpdate();

// Result shape (from schema): { id: string; saved_query: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: ...
```

### `posthog.savedQueryColumnAnnotationsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/saved_query_column_annotations/{id}/`
- **What it does**: Read and edit semantic descriptions of data-modelling views and columns surfaced to the AI agent.

List can be filtered to one view with `?saved_query_id=<uuid>`. Any create or update is treated as a
user edit (`is_user_edited=True`), which protects the row from being overwritten by automatic
enrichment. Create upserts on `(saved_query, column_name)`; the view cannot be changed after creation.
- **OpenAPI operationId**: `saved_query_column_annotations_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; saved_query: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SavedQueryColumnAnnotationsUpdateInput = Parameters<typeof posthog.savedQueryColumnAnnotationsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SavedQueryColumnAnnotationsUpdateOutput = Awaited<ReturnType<typeof posthog.savedQueryColumnAnnotationsUpdate>>;

const result: SavedQueryColumnAnnotationsUpdateOutput = await posthog.savedQueryColumnAnnotationsUpdate();

// Result shape (from schema): { id: string; saved_query: string; column_name?: string; description: string; description_source: "canonical" | "ai_generated" | "user_edited"; ai_model: string; is_user_edited: boolean; created_at: string; updated_at: ...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

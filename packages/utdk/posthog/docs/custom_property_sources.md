# Custom Property Sources

## Operations

### `posthog.customPropertySourcesList`

- **HTTP**: `GET /api/projects/{project_id}/custom_property_sources/`
- **OpenAPI operationId**: `custom_property_sources_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; definition: string; saved_query: string; source_column: string; key_column: string; is_enabled?: boolean; consecutive_failures: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomPropertySourcesListInput = Parameters<typeof posthog.customPropertySourcesList> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertySourcesListOutput = Awaited<ReturnType<typeof posthog.customPropertySourcesList>>;

const result: CustomPropertySourcesListOutput = await posthog.customPropertySourcesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; definition: string; saved_query: string; source_column: string; key_column: string; is_enabled?: boolean; consecutive_failures: nu...
```

### `posthog.customPropertySourcesCreate`

- **HTTP**: `POST /api/projects/{project_id}/custom_property_sources/`
- **OpenAPI operationId**: `custom_property_sources_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; definition: string; saved_query: string; source_column: string; key_column: string; is_enabled?: boolean; consecutive_failures: number; last_synced_at: string | null; last_sync_error: string | null; create...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type CustomPropertySourcesCreateInput = Parameters<typeof posthog.customPropertySourcesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertySourcesCreateOutput = Awaited<ReturnType<typeof posthog.customPropertySourcesCreate>>;

const result: CustomPropertySourcesCreateOutput = await posthog.customPropertySourcesCreate();

// Result shape (from schema): { id: string; definition: string; saved_query: string; source_column: string; key_column: string; is_enabled?: boolean; consecutive_failures: number; last_synced_at: string | null; last_sync_error: string | null; create...
```

### `posthog.customPropertySourcesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/custom_property_sources/{id}/`
- **OpenAPI operationId**: `custom_property_sources_destroy`
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

type CustomPropertySourcesDestroyInput = Parameters<typeof posthog.customPropertySourcesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertySourcesDestroyOutput = Awaited<ReturnType<typeof posthog.customPropertySourcesDestroy>>;

const result: CustomPropertySourcesDestroyOutput = await posthog.customPropertySourcesDestroy();

// Result shape (from schema): unknown
```

### `posthog.customPropertySourcesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/custom_property_sources/{id}/`
- **OpenAPI operationId**: `custom_property_sources_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; definition: string; saved_query: string; source_column: string; key_column: string; is_enabled?: boolean; consecutive_failures: number; last_synced_at: string | null; last_sync_error: string | null; create...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomPropertySourcesRetrieveInput = Parameters<typeof posthog.customPropertySourcesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertySourcesRetrieveOutput = Awaited<ReturnType<typeof posthog.customPropertySourcesRetrieve>>;

const result: CustomPropertySourcesRetrieveOutput = await posthog.customPropertySourcesRetrieve();

// Result shape (from schema): { id: string; definition: string; saved_query: string; source_column: string; key_column: string; is_enabled?: boolean; consecutive_failures: number; last_synced_at: string | null; last_sync_error: string | null; create...
```

### `posthog.customPropertySourcesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/custom_property_sources/{id}/`
- **OpenAPI operationId**: `custom_property_sources_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; definition: string; saved_query: string; source_column: string; key_column: string; is_enabled?: boolean; consecutive_failures: number; last_synced_at: string | null; last_sync_error: string | null; create...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomPropertySourcesPartialUpdateInput = Parameters<typeof posthog.customPropertySourcesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertySourcesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.customPropertySourcesPartialUpdate>>;

const result: CustomPropertySourcesPartialUpdateOutput = await posthog.customPropertySourcesPartialUpdate();

// Result shape (from schema): { id: string; definition: string; saved_query: string; source_column: string; key_column: string; is_enabled?: boolean; consecutive_failures: number; last_synced_at: string | null; last_sync_error: string | null; create...
```

### `posthog.customPropertySourcesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/custom_property_sources/{id}/`
- **OpenAPI operationId**: `custom_property_sources_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; definition: string; saved_query: string; source_column: string; key_column: string; is_enabled?: boolean; consecutive_failures: number; last_synced_at: string | null; last_sync_error: string | null; create...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomPropertySourcesUpdateInput = Parameters<typeof posthog.customPropertySourcesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertySourcesUpdateOutput = Awaited<ReturnType<typeof posthog.customPropertySourcesUpdate>>;

const result: CustomPropertySourcesUpdateOutput = await posthog.customPropertySourcesUpdate();

// Result shape (from schema): { id: string; definition: string; saved_query: string; source_column: string; key_column: string; is_enabled?: boolean; consecutive_failures: number; last_synced_at: string | null; last_sync_error: string | null; create...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

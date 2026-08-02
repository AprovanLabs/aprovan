# Object Media Previews

## Operations

### `posthog.objectMediaPreviewsList`

- **HTTP**: `GET /api/projects/{project_id}/object_media_previews/`
- **OpenAPI operationId**: `object_media_previews_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ObjectMediaPreviewsListInput = Parameters<typeof posthog.objectMediaPreviewsList> extends [infer T, ...unknown[]] ? T : undefined;
type ObjectMediaPreviewsListOutput = Awaited<ReturnType<typeof posthog.objectMediaPreviewsList>>;

const result: ObjectMediaPreviewsListOutput = await posthog.objectMediaPreviewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: stri...
```

### `posthog.objectMediaPreviewsCreate`

- **HTTP**: `POST /api/projects/{project_id}/object_media_previews/`
- **OpenAPI operationId**: `object_media_previews_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: string | null; exported_asset_id?: string | null; event_definition_id?: string ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ObjectMediaPreviewsCreateInput = Parameters<typeof posthog.objectMediaPreviewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ObjectMediaPreviewsCreateOutput = Awaited<ReturnType<typeof posthog.objectMediaPreviewsCreate>>;

const result: ObjectMediaPreviewsCreateOutput = await posthog.objectMediaPreviewsCreate();

// Result shape (from schema): { id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: string | null; exported_asset_id?: string | null; event_definition_id?: string ...
```

### `posthog.objectMediaPreviewsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/object_media_previews/{id}/`
- **OpenAPI operationId**: `object_media_previews_destroy`
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

type ObjectMediaPreviewsDestroyInput = Parameters<typeof posthog.objectMediaPreviewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ObjectMediaPreviewsDestroyOutput = Awaited<ReturnType<typeof posthog.objectMediaPreviewsDestroy>>;

const result: ObjectMediaPreviewsDestroyOutput = await posthog.objectMediaPreviewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.objectMediaPreviewsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/object_media_previews/{id}/`
- **OpenAPI operationId**: `object_media_previews_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: string | null; exported_asset_id?: string | null; event_definition_id?: string ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ObjectMediaPreviewsRetrieveInput = Parameters<typeof posthog.objectMediaPreviewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ObjectMediaPreviewsRetrieveOutput = Awaited<ReturnType<typeof posthog.objectMediaPreviewsRetrieve>>;

const result: ObjectMediaPreviewsRetrieveOutput = await posthog.objectMediaPreviewsRetrieve();

// Result shape (from schema): { id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: string | null; exported_asset_id?: string | null; event_definition_id?: string ...
```

### `posthog.objectMediaPreviewsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/object_media_previews/{id}/`
- **OpenAPI operationId**: `object_media_previews_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: string | null; exported_asset_id?: string | null; event_definition_id?: string ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ObjectMediaPreviewsPartialUpdateInput = Parameters<typeof posthog.objectMediaPreviewsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ObjectMediaPreviewsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.objectMediaPreviewsPartialUpdate>>;

const result: ObjectMediaPreviewsPartialUpdateOutput = await posthog.objectMediaPreviewsPartialUpdate();

// Result shape (from schema): { id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: string | null; exported_asset_id?: string | null; event_definition_id?: string ...
```

### `posthog.objectMediaPreviewsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/object_media_previews/{id}/`
- **OpenAPI operationId**: `object_media_previews_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: string | null; exported_asset_id?: string | null; event_definition_id?: string ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ObjectMediaPreviewsUpdateInput = Parameters<typeof posthog.objectMediaPreviewsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ObjectMediaPreviewsUpdateOutput = Awaited<ReturnType<typeof posthog.objectMediaPreviewsUpdate>>;

const result: ObjectMediaPreviewsUpdateOutput = await posthog.objectMediaPreviewsUpdate();

// Result shape (from schema): { id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: string | null; exported_asset_id?: string | null; event_definition_id?: string ...
```

### `posthog.objectMediaPreviewsPreferredForEventRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/object_media_previews/preferred_for_event/`
- **What it does**: Get the preferred media preview for an event definition.
Most recent user-uploaded, then most recent exported asset.
Requires event_definition (query param).
- **OpenAPI operationId**: `object_media_previews_preferred_for_event_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: string | null; exported_asset_id?: string | null; event_definition_id?: string ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ObjectMediaPreviewsPreferredForEventRetrieveInput = Parameters<typeof posthog.objectMediaPreviewsPreferredForEventRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ObjectMediaPreviewsPreferredForEventRetrieveOutput = Awaited<ReturnType<typeof posthog.objectMediaPreviewsPreferredForEventRetrieve>>;

const result: ObjectMediaPreviewsPreferredForEventRetrieveOutput = await posthog.objectMediaPreviewsPreferredForEventRetrieve();

// Result shape (from schema): { id: string; created_at: string; updated_at: string | null; media_url: string; media_type: string; metadata?: unknown; uploaded_media_id?: string | null; exported_asset_id?: string | null; event_definition_id?: string ...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

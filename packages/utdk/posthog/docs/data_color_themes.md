# Data Color Themes

## Operations

### `posthog.environmentsDataColorThemesList`

- **HTTP**: `GET /api/environments/{environment_id}/data_color_themes/`
- **OpenAPI operationId**: `environments_data_color_themes_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataColorThemesListInput = Parameters<typeof posthog.environmentsDataColorThemesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataColorThemesListOutput = Awaited<ReturnType<typeof posthog.environmentsDataColorThemesList>>;

const result: EnvironmentsDataColorThemesListOutput = await posthog.environmentsDataColorThemesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id...
```

### `posthog.environmentsDataColorThemesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/data_color_themes/`
- **OpenAPI operationId**: `environments_data_color_themes_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataColorThemesCreateInput = Parameters<typeof posthog.environmentsDataColorThemesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataColorThemesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDataColorThemesCreate>>;

const result: EnvironmentsDataColorThemesCreateOutput = await posthog.environmentsDataColorThemesCreate();

// Result shape (from schema): { id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...
```

### `posthog.environmentsDataColorThemesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/data_color_themes/{id}/`
- **OpenAPI operationId**: `environments_data_color_themes_destroy`
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

type EnvironmentsDataColorThemesDestroyInput = Parameters<typeof posthog.environmentsDataColorThemesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataColorThemesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsDataColorThemesDestroy>>;

const result: EnvironmentsDataColorThemesDestroyOutput = await posthog.environmentsDataColorThemesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsDataColorThemesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_color_themes/{id}/`
- **OpenAPI operationId**: `environments_data_color_themes_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataColorThemesRetrieveInput = Parameters<typeof posthog.environmentsDataColorThemesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataColorThemesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataColorThemesRetrieve>>;

const result: EnvironmentsDataColorThemesRetrieveOutput = await posthog.environmentsDataColorThemesRetrieve();

// Result shape (from schema): { id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...
```

### `posthog.environmentsDataColorThemesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/data_color_themes/{id}/`
- **OpenAPI operationId**: `environments_data_color_themes_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataColorThemesPartialUpdateInput = Parameters<typeof posthog.environmentsDataColorThemesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataColorThemesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDataColorThemesPartialUpdate>>;

const result: EnvironmentsDataColorThemesPartialUpdateOutput = await posthog.environmentsDataColorThemesPartialUpdate();

// Result shape (from schema): { id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...
```

### `posthog.environmentsDataColorThemesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/data_color_themes/{id}/`
- **OpenAPI operationId**: `environments_data_color_themes_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataColorThemesUpdateInput = Parameters<typeof posthog.environmentsDataColorThemesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataColorThemesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDataColorThemesUpdate>>;

const result: EnvironmentsDataColorThemesUpdateOutput = await posthog.environmentsDataColorThemesUpdate();

// Result shape (from schema): { id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...
```

### `posthog.dataColorThemesList`

- **HTTP**: `GET /api/projects/{project_id}/data_color_themes/`
- **OpenAPI operationId**: `data_color_themes_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataColorThemesListInput = Parameters<typeof posthog.dataColorThemesList> extends [infer T, ...unknown[]] ? T : undefined;
type DataColorThemesListOutput = Awaited<ReturnType<typeof posthog.dataColorThemesList>>;

const result: DataColorThemesListOutput = await posthog.dataColorThemesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id...
```

### `posthog.dataColorThemesCreate`

- **HTTP**: `POST /api/projects/{project_id}/data_color_themes/`
- **OpenAPI operationId**: `data_color_themes_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DataColorThemesCreateInput = Parameters<typeof posthog.dataColorThemesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DataColorThemesCreateOutput = Awaited<ReturnType<typeof posthog.dataColorThemesCreate>>;

const result: DataColorThemesCreateOutput = await posthog.dataColorThemesCreate();

// Result shape (from schema): { id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...
```

### `posthog.dataColorThemesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/data_color_themes/{id}/`
- **OpenAPI operationId**: `data_color_themes_destroy`
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

type DataColorThemesDestroyInput = Parameters<typeof posthog.dataColorThemesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DataColorThemesDestroyOutput = Awaited<ReturnType<typeof posthog.dataColorThemesDestroy>>;

const result: DataColorThemesDestroyOutput = await posthog.dataColorThemesDestroy();

// Result shape (from schema): unknown
```

### `posthog.dataColorThemesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_color_themes/{id}/`
- **OpenAPI operationId**: `data_color_themes_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataColorThemesRetrieveInput = Parameters<typeof posthog.dataColorThemesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataColorThemesRetrieveOutput = Awaited<ReturnType<typeof posthog.dataColorThemesRetrieve>>;

const result: DataColorThemesRetrieveOutput = await posthog.dataColorThemesRetrieve();

// Result shape (from schema): { id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...
```

### `posthog.dataColorThemesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/data_color_themes/{id}/`
- **OpenAPI operationId**: `data_color_themes_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataColorThemesPartialUpdateInput = Parameters<typeof posthog.dataColorThemesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DataColorThemesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.dataColorThemesPartialUpdate>>;

const result: DataColorThemesPartialUpdateOutput = await posthog.dataColorThemesPartialUpdate();

// Result shape (from schema): { id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...
```

### `posthog.dataColorThemesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/data_color_themes/{id}/`
- **OpenAPI operationId**: `data_color_themes_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataColorThemesUpdateInput = Parameters<typeof posthog.dataColorThemesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DataColorThemesUpdateOutput = Awaited<ReturnType<typeof posthog.dataColorThemesUpdate>>;

const result: DataColorThemesUpdateOutput = await posthog.dataColorThemesUpdate();

// Result shape (from schema): { id: number; name: string; colors?: unknown; is_global: boolean; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; i...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

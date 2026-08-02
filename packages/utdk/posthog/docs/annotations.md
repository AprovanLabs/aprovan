# Annotations

## Operations

### `posthog.annotationsList`

- **HTTP**: `GET /api/projects/{project_id}/annotations/`
- **What it does**: Create, Read, Update and Delete annotations. [See docs](https://posthog.com/docs/data/annotations) for more information on annotations.
- **OpenAPI operationId**: `annotations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; content?: string | null; date_marker?: string | null; creation_type?: "USR" | "GIT"; dashboard_item?: number | null; dashboard_id?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AnnotationsListInput = Parameters<typeof posthog.annotationsList> extends [infer T, ...unknown[]] ? T : undefined;
type AnnotationsListOutput = Awaited<ReturnType<typeof posthog.annotationsList>>;

const result: AnnotationsListOutput = await posthog.annotationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; content?: string | null; date_marker?: string | null; creation_type?: "USR" | "GIT"; dashboard_item?: number | null; dashboard_id?...
```

### `posthog.annotationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/annotations/`
- **What it does**: Create, Read, Update and Delete annotations. [See docs](https://posthog.com/docs/data/annotations) for more information on annotations.
- **OpenAPI operationId**: `annotations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; content?: string | null; date_marker?: string | null; creation_type?: "USR" | "GIT"; dashboard_item?: number | null; dashboard_id?: number | null; dashboard_name: string | null; insight_short_id: string | ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type AnnotationsCreateInput = Parameters<typeof posthog.annotationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AnnotationsCreateOutput = Awaited<ReturnType<typeof posthog.annotationsCreate>>;

const result: AnnotationsCreateOutput = await posthog.annotationsCreate();

// Result shape (from schema): { id: number; content?: string | null; date_marker?: string | null; creation_type?: "USR" | "GIT"; dashboard_item?: number | null; dashboard_id?: number | null; dashboard_name: string | null; insight_short_id: string | ...
```

### `posthog.annotationsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/annotations/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `annotations_destroy`
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

type AnnotationsDestroyInput = Parameters<typeof posthog.annotationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type AnnotationsDestroyOutput = Awaited<ReturnType<typeof posthog.annotationsDestroy>>;

const result: AnnotationsDestroyOutput = await posthog.annotationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.annotationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/annotations/{id}/`
- **What it does**: Create, Read, Update and Delete annotations. [See docs](https://posthog.com/docs/data/annotations) for more information on annotations.
- **OpenAPI operationId**: `annotations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; content?: string | null; date_marker?: string | null; creation_type?: "USR" | "GIT"; dashboard_item?: number | null; dashboard_id?: number | null; dashboard_name: string | null; insight_short_id: string | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AnnotationsRetrieveInput = Parameters<typeof posthog.annotationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AnnotationsRetrieveOutput = Awaited<ReturnType<typeof posthog.annotationsRetrieve>>;

const result: AnnotationsRetrieveOutput = await posthog.annotationsRetrieve();

// Result shape (from schema): { id: number; content?: string | null; date_marker?: string | null; creation_type?: "USR" | "GIT"; dashboard_item?: number | null; dashboard_id?: number | null; dashboard_name: string | null; insight_short_id: string | ...
```

### `posthog.annotationsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/annotations/{id}/`
- **What it does**: Create, Read, Update and Delete annotations. [See docs](https://posthog.com/docs/data/annotations) for more information on annotations.
- **OpenAPI operationId**: `annotations_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; content?: string | null; date_marker?: string | null; creation_type?: "USR" | "GIT"; dashboard_item?: number | null; dashboard_id?: number | null; dashboard_name: string | null; insight_short_id: string | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AnnotationsPartialUpdateInput = Parameters<typeof posthog.annotationsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AnnotationsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.annotationsPartialUpdate>>;

const result: AnnotationsPartialUpdateOutput = await posthog.annotationsPartialUpdate();

// Result shape (from schema): { id: number; content?: string | null; date_marker?: string | null; creation_type?: "USR" | "GIT"; dashboard_item?: number | null; dashboard_id?: number | null; dashboard_name: string | null; insight_short_id: string | ...
```

### `posthog.annotationsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/annotations/{id}/`
- **What it does**: Create, Read, Update and Delete annotations. [See docs](https://posthog.com/docs/data/annotations) for more information on annotations.
- **OpenAPI operationId**: `annotations_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; content?: string | null; date_marker?: string | null; creation_type?: "USR" | "GIT"; dashboard_item?: number | null; dashboard_id?: number | null; dashboard_name: string | null; insight_short_id: string | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AnnotationsUpdateInput = Parameters<typeof posthog.annotationsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AnnotationsUpdateOutput = Awaited<ReturnType<typeof posthog.annotationsUpdate>>;

const result: AnnotationsUpdateOutput = await posthog.annotationsUpdate();

// Result shape (from schema): { id: number; content?: string | null; date_marker?: string | null; creation_type?: "USR" | "GIT"; dashboard_item?: number | null; dashboard_id?: number | null; dashboard_name: string | null; insight_short_id: string | ...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

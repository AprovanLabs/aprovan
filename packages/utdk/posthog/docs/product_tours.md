# Product Tours

## Operations

### `posthog.productToursList`

- **HTTP**: `GET /api/projects/{project_id}/product_tours/`
- **OpenAPI operationId**: `product_tours_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProductToursListInput = Parameters<typeof posthog.productToursList> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursListOutput = Awaited<ReturnType<typeof posthog.productToursList>>;

const result: ProductToursListOutput = await posthog.productToursList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: ...
```

### `posthog.productToursCreate`

- **HTTP**: `POST /api/projects/{project_id}/product_tours/`
- **OpenAPI operationId**: `product_tours_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ProductToursCreateInput = Parameters<typeof posthog.productToursCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursCreateOutput = Awaited<ReturnType<typeof posthog.productToursCreate>>;

const result: ProductToursCreateOutput = await posthog.productToursCreate();

// Result shape (from schema): { id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...
```

### `posthog.productToursDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/product_tours/{id}/`
- **OpenAPI operationId**: `product_tours_destroy`
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

type ProductToursDestroyInput = Parameters<typeof posthog.productToursDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursDestroyOutput = Awaited<ReturnType<typeof posthog.productToursDestroy>>;

const result: ProductToursDestroyOutput = await posthog.productToursDestroy();

// Result shape (from schema): unknown
```

### `posthog.productToursRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/product_tours/{id}/`
- **OpenAPI operationId**: `product_tours_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProductToursRetrieveInput = Parameters<typeof posthog.productToursRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursRetrieveOutput = Awaited<ReturnType<typeof posthog.productToursRetrieve>>;

const result: ProductToursRetrieveOutput = await posthog.productToursRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...
```

### `posthog.productToursPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/product_tours/{id}/`
- **OpenAPI operationId**: `product_tours_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProductToursPartialUpdateInput = Parameters<typeof posthog.productToursPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursPartialUpdateOutput = Awaited<ReturnType<typeof posthog.productToursPartialUpdate>>;

const result: ProductToursPartialUpdateOutput = await posthog.productToursPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...
```

### `posthog.productToursUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/product_tours/{id}/`
- **OpenAPI operationId**: `product_tours_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProductToursUpdateInput = Parameters<typeof posthog.productToursUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursUpdateOutput = Awaited<ReturnType<typeof posthog.productToursUpdate>>;

const result: ProductToursUpdateOutput = await posthog.productToursUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...
```

### `posthog.productToursDiscardDraftDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/product_tours/{id}/discard_draft/`
- **What it does**: Discard draft content.
- **OpenAPI operationId**: `product_tours_discard_draft_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProductToursDiscardDraftDestroyInput = Parameters<typeof posthog.productToursDiscardDraftDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursDiscardDraftDestroyOutput = Awaited<ReturnType<typeof posthog.productToursDiscardDraftDestroy>>;

const result: ProductToursDiscardDraftDestroyOutput = await posthog.productToursDiscardDraftDestroy();

// Result shape (from schema): { id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...
```

### `posthog.productToursDraftStatusRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/product_tours/{id}/draft_status/`
- **What it does**: Lightweight polling endpoint for draft change detection.
- **OpenAPI operationId**: `product_tours_draft_status_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ updated_at: string; has_draft: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProductToursDraftStatusRetrieveInput = Parameters<typeof posthog.productToursDraftStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursDraftStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.productToursDraftStatusRetrieve>>;

const result: ProductToursDraftStatusRetrieveOutput = await posthog.productToursDraftStatusRetrieve();

// Result shape (from schema): { updated_at: string; has_draft: boolean }
```

### `posthog.productToursDraftPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/product_tours/{id}/draft/`
- **What it does**: Save draft content (server-side merge). No side effects triggered.
- **OpenAPI operationId**: `product_tours_draft_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProductToursDraftPartialUpdateInput = Parameters<typeof posthog.productToursDraftPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursDraftPartialUpdateOutput = Awaited<ReturnType<typeof posthog.productToursDraftPartialUpdate>>;

const result: ProductToursDraftPartialUpdateOutput = await posthog.productToursDraftPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...
```

### `posthog.productToursGenerateCreate`

- **HTTP**: `POST /api/projects/{project_id}/product_tours/{id}/generate/`
- **What it does**: Generate tour step content using AI.
- **OpenAPI operationId**: `product_tours_generate_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ steps: ({ step_id: string; title: string; description: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProductToursGenerateCreateInput = Parameters<typeof posthog.productToursGenerateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursGenerateCreateOutput = Awaited<ReturnType<typeof posthog.productToursGenerateCreate>>;

const result: ProductToursGenerateCreateOutput = await posthog.productToursGenerateCreate();

// Result shape (from schema): { steps: ({ step_id: string; title: string; description: string })[] }
```

### `posthog.productToursPublishDraftCreate`

- **HTTP**: `POST /api/projects/{project_id}/product_tours/{id}/publish_draft/`
- **What it does**: Commit draft to live tour. Runs full validation and triggers side effects.

Accepts an optional body payload. If provided, merges it into the draft
before publishing so the caller can save + publish in a single request.
- **OpenAPI operationId**: `product_tours_publish_draft_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProductToursPublishDraftCreateInput = Parameters<typeof posthog.productToursPublishDraftCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ProductToursPublishDraftCreateOutput = Awaited<ReturnType<typeof posthog.productToursPublishDraftCreate>>;

const result: ProductToursPublishDraftCreateOutput = await posthog.productToursPublishDraftCreate();

// Result shape (from schema): { id: string; name: string; description?: string; internal_targeting_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_exp...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

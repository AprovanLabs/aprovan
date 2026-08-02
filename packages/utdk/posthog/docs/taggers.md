# Taggers

## Operations

### `posthog.environmentsTaggersList`

- **HTTP**: `GET /api/environments/{environment_id}/taggers/`
- **OpenAPI operationId**: `environments_taggers_list`
- **Path params**: None
- **Query params**: `enabled`, `id__in`, `limit`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsTaggersListInput = Parameters<typeof posthog.environmentsTaggersList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTaggersListOutput = Awaited<ReturnType<typeof posthog.environmentsTaggersList>>;

const result: EnvironmentsTaggersListOutput = await posthog.environmentsTaggersList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name...
```

### `posthog.environmentsTaggersCreate`

- **HTTP**: `POST /api/environments/{environment_id}/taggers/`
- **OpenAPI operationId**: `environments_taggers_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsTaggersCreateInput = Parameters<typeof posthog.environmentsTaggersCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTaggersCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTaggersCreate>>;

const result: EnvironmentsTaggersCreateOutput = await posthog.environmentsTaggersCreate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...
```

### `posthog.environmentsTaggersDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/taggers/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_taggers_destroy`
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

type EnvironmentsTaggersDestroyInput = Parameters<typeof posthog.environmentsTaggersDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTaggersDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsTaggersDestroy>>;

const result: EnvironmentsTaggersDestroyOutput = await posthog.environmentsTaggersDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsTaggersRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/taggers/{id}/`
- **OpenAPI operationId**: `environments_taggers_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsTaggersRetrieveInput = Parameters<typeof posthog.environmentsTaggersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTaggersRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsTaggersRetrieve>>;

const result: EnvironmentsTaggersRetrieveOutput = await posthog.environmentsTaggersRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...
```

### `posthog.environmentsTaggersPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/taggers/{id}/`
- **OpenAPI operationId**: `environments_taggers_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsTaggersPartialUpdateInput = Parameters<typeof posthog.environmentsTaggersPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTaggersPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsTaggersPartialUpdate>>;

const result: EnvironmentsTaggersPartialUpdateOutput = await posthog.environmentsTaggersPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...
```

### `posthog.environmentsTaggersUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/taggers/{id}/`
- **OpenAPI operationId**: `environments_taggers_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsTaggersUpdateInput = Parameters<typeof posthog.environmentsTaggersUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTaggersUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsTaggersUpdate>>;

const result: EnvironmentsTaggersUpdateOutput = await posthog.environmentsTaggersUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...
```

### `posthog.environmentsTaggersTestHogCreate`

- **HTTP**: `POST /api/environments/{environment_id}/taggers/test_hog/`
- **What it does**: Test Hog tagger code against sample events without saving.
- **OpenAPI operationId**: `environments_taggers_test_hog_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ event_uuid: string; trace_id?: string | null; input_preview: string; output_preview: string; tags: (string)[]; reasoning: string; error?: string | null })[]; message?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsTaggersTestHogCreateInput = Parameters<typeof posthog.environmentsTaggersTestHogCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTaggersTestHogCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTaggersTestHogCreate>>;

const result: EnvironmentsTaggersTestHogCreateOutput = await posthog.environmentsTaggersTestHogCreate();

// Result shape (from schema): { results: ({ event_uuid: string; trace_id?: string | null; input_preview: string; output_preview: string; tags: (string)[]; reasoning: string; error?: string | null })[]; message?: string }
```

### `posthog.taggersList`

- **HTTP**: `GET /api/projects/{project_id}/taggers/`
- **OpenAPI operationId**: `taggers_list`
- **Path params**: None
- **Query params**: `enabled`, `id__in`, `limit`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaggersListInput = Parameters<typeof posthog.taggersList> extends [infer T, ...unknown[]] ? T : undefined;
type TaggersListOutput = Awaited<ReturnType<typeof posthog.taggersList>>;

const result: TaggersListOutput = await posthog.taggersList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name...
```

### `posthog.taggersCreate`

- **HTTP**: `POST /api/projects/{project_id}/taggers/`
- **OpenAPI operationId**: `taggers_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type TaggersCreateInput = Parameters<typeof posthog.taggersCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TaggersCreateOutput = Awaited<ReturnType<typeof posthog.taggersCreate>>;

const result: TaggersCreateOutput = await posthog.taggersCreate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...
```

### `posthog.taggersDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/taggers/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `taggers_destroy`
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

type TaggersDestroyInput = Parameters<typeof posthog.taggersDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type TaggersDestroyOutput = Awaited<ReturnType<typeof posthog.taggersDestroy>>;

const result: TaggersDestroyOutput = await posthog.taggersDestroy();

// Result shape (from schema): unknown
```

### `posthog.taggersRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/taggers/{id}/`
- **OpenAPI operationId**: `taggers_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaggersRetrieveInput = Parameters<typeof posthog.taggersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TaggersRetrieveOutput = Awaited<ReturnType<typeof posthog.taggersRetrieve>>;

const result: TaggersRetrieveOutput = await posthog.taggersRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...
```

### `posthog.taggersPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/taggers/{id}/`
- **OpenAPI operationId**: `taggers_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaggersPartialUpdateInput = Parameters<typeof posthog.taggersPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type TaggersPartialUpdateOutput = Awaited<ReturnType<typeof posthog.taggersPartialUpdate>>;

const result: TaggersPartialUpdateOutput = await posthog.taggersPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...
```

### `posthog.taggersUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/taggers/{id}/`
- **OpenAPI operationId**: `taggers_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaggersUpdateInput = Parameters<typeof posthog.taggersUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type TaggersUpdateOutput = Awaited<ReturnType<typeof posthog.taggersUpdate>>;

const result: TaggersUpdateOutput = await posthog.taggersUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; tagger_type?: "llm" | "hog"; tagger_config: { prompt: string; tags: ({ name: string; description?: string })[]; min_tags?: number; max_tags?: number |...
```

### `posthog.taggersTestHogCreate`

- **HTTP**: `POST /api/projects/{project_id}/taggers/test_hog/`
- **What it does**: Test Hog tagger code against sample events without saving.
- **OpenAPI operationId**: `taggers_test_hog_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ event_uuid: string; trace_id?: string | null; input_preview: string; output_preview: string; tags: (string)[]; reasoning: string; error?: string | null })[]; message?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaggersTestHogCreateInput = Parameters<typeof posthog.taggersTestHogCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TaggersTestHogCreateOutput = Awaited<ReturnType<typeof posthog.taggersTestHogCreate>>;

const result: TaggersTestHogCreateOutput = await posthog.taggersTestHogCreate();

// Result shape (from schema): { results: ({ event_uuid: string; trace_id?: string | null; input_preview: string; output_preview: string; tags: (string)[]; reasoning: string; error?: string | null })[]; message?: string }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

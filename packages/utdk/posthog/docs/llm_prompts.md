# Llm Prompts

## Operations

### `posthog.environmentsLlmPromptsList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_prompts/`
- **OpenAPI operationId**: `environments_llm_prompts_list`
- **Path params**: None
- **Query params**: `content`, `created_by_id`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; prompt: unknown; version: number; version_description: string | null; created_by: { id: number; uuid: string; distin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmPromptsListInput = Parameters<typeof posthog.environmentsLlmPromptsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmPromptsListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmPromptsList>>;

const result: EnvironmentsLlmPromptsListOutput = await posthog.environmentsLlmPromptsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; prompt: unknown; version: number; version_description: string | null; created_by: { id: number; uuid: string; distin...
```

### `posthog.environmentsLlmPromptsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_prompts/`
- **OpenAPI operationId**: `environments_llm_prompts_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmPromptsCreateInput = Parameters<typeof posthog.environmentsLlmPromptsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmPromptsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmPromptsCreate>>;

const result: EnvironmentsLlmPromptsCreateOutput = await posthog.environmentsLlmPromptsCreate();

// Result shape (from schema): { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...
```

### `posthog.environmentsLlmPromptsNameRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_prompts/name/{prompt_name}/`
- **OpenAPI operationId**: `environments_llm_prompts_name_retrieve`
- **Path params**: `prompt_name`
- **Query params**: `content`, `version`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt?: unknown; prompt_preview?: string; outline: ({ level: number; text: string })[]; version: number; created_at: string; updated_at: string; deleted: boolean; is_latest: boolean; latest_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmPromptsNameRetrieveInput = Parameters<typeof posthog.environmentsLlmPromptsNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmPromptsNameRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmPromptsNameRetrieve>>;

const result: EnvironmentsLlmPromptsNameRetrieveOutput = await posthog.environmentsLlmPromptsNameRetrieve();

// Result shape (from schema): { id: string; name: string; prompt?: unknown; prompt_preview?: string; outline: ({ level: number; text: string })[]; version: number; created_at: string; updated_at: string; deleted: boolean; is_latest: boolean; latest_...
```

### `posthog.environmentsLlmPromptsNamePartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/llm_prompts/name/{prompt_name}/`
- **OpenAPI operationId**: `environments_llm_prompts_name_partial_update`
- **Path params**: `prompt_name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmPromptsNamePartialUpdateInput = Parameters<typeof posthog.environmentsLlmPromptsNamePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmPromptsNamePartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmPromptsNamePartialUpdate>>;

const result: EnvironmentsLlmPromptsNamePartialUpdateOutput = await posthog.environmentsLlmPromptsNamePartialUpdate();

// Result shape (from schema): { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...
```

### `posthog.environmentsLlmPromptsNameArchiveCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_prompts/name/{prompt_name}/archive/`
- **OpenAPI operationId**: `environments_llm_prompts_name_archive_create`
- **Path params**: `prompt_name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmPromptsNameArchiveCreateInput = Parameters<typeof posthog.environmentsLlmPromptsNameArchiveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmPromptsNameArchiveCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmPromptsNameArchiveCreate>>;

const result: EnvironmentsLlmPromptsNameArchiveCreateOutput = await posthog.environmentsLlmPromptsNameArchiveCreate();

// Result shape (from schema): { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...
```

### `posthog.environmentsLlmPromptsNameDuplicateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_prompts/name/{prompt_name}/duplicate/`
- **OpenAPI operationId**: `environments_llm_prompts_name_duplicate_create`
- **Path params**: `prompt_name`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmPromptsNameDuplicateCreateInput = Parameters<typeof posthog.environmentsLlmPromptsNameDuplicateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmPromptsNameDuplicateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmPromptsNameDuplicateCreate>>;

const result: EnvironmentsLlmPromptsNameDuplicateCreateOutput = await posthog.environmentsLlmPromptsNameDuplicateCreate();

// Result shape (from schema): { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...
```

### `posthog.environmentsLlmPromptsResolveNameRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_prompts/resolve/name/{prompt_name}/`
- **OpenAPI operationId**: `environments_llm_prompts_resolve_name_retrieve`
- **Path params**: `prompt_name`
- **Query params**: `before_version`, `limit`, `offset`, `version`, `version_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ prompt: { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmPromptsResolveNameRetrieveInput = Parameters<typeof posthog.environmentsLlmPromptsResolveNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmPromptsResolveNameRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmPromptsResolveNameRetrieve>>;

const result: EnvironmentsLlmPromptsResolveNameRetrieveOutput = await posthog.environmentsLlmPromptsResolveNameRetrieve();

// Result shape (from schema): { prompt: { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; ...
```

### `posthog.llmPromptsList`

- **HTTP**: `GET /api/projects/{project_id}/llm_prompts/`
- **OpenAPI operationId**: `llm_prompts_list`
- **Path params**: None
- **Query params**: `content`, `created_by_id`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; prompt: unknown; version: number; version_description: string | null; created_by: { id: number; uuid: string; distin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmPromptsListInput = Parameters<typeof posthog.llmPromptsList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmPromptsListOutput = Awaited<ReturnType<typeof posthog.llmPromptsList>>;

const result: LlmPromptsListOutput = await posthog.llmPromptsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; prompt: unknown; version: number; version_description: string | null; created_by: { id: number; uuid: string; distin...
```

### `posthog.llmPromptsCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_prompts/`
- **OpenAPI operationId**: `llm_prompts_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmPromptsCreateInput = Parameters<typeof posthog.llmPromptsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmPromptsCreateOutput = Awaited<ReturnType<typeof posthog.llmPromptsCreate>>;

const result: LlmPromptsCreateOutput = await posthog.llmPromptsCreate();

// Result shape (from schema): { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...
```

### `posthog.llmPromptsNameRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_prompts/name/{prompt_name}/`
- **OpenAPI operationId**: `llm_prompts_name_retrieve`
- **Path params**: `prompt_name`
- **Query params**: `content`, `version`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt?: unknown; prompt_preview?: string; outline: ({ level: number; text: string })[]; version: number; created_at: string; updated_at: string; deleted: boolean; is_latest: boolean; latest_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmPromptsNameRetrieveInput = Parameters<typeof posthog.llmPromptsNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmPromptsNameRetrieveOutput = Awaited<ReturnType<typeof posthog.llmPromptsNameRetrieve>>;

const result: LlmPromptsNameRetrieveOutput = await posthog.llmPromptsNameRetrieve();

// Result shape (from schema): { id: string; name: string; prompt?: unknown; prompt_preview?: string; outline: ({ level: number; text: string })[]; version: number; created_at: string; updated_at: string; deleted: boolean; is_latest: boolean; latest_...
```

### `posthog.llmPromptsNamePartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/llm_prompts/name/{prompt_name}/`
- **OpenAPI operationId**: `llm_prompts_name_partial_update`
- **Path params**: `prompt_name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmPromptsNamePartialUpdateInput = Parameters<typeof posthog.llmPromptsNamePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmPromptsNamePartialUpdateOutput = Awaited<ReturnType<typeof posthog.llmPromptsNamePartialUpdate>>;

const result: LlmPromptsNamePartialUpdateOutput = await posthog.llmPromptsNamePartialUpdate();

// Result shape (from schema): { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...
```

### `posthog.llmPromptsNameArchiveCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_prompts/name/{prompt_name}/archive/`
- **OpenAPI operationId**: `llm_prompts_name_archive_create`
- **Path params**: `prompt_name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmPromptsNameArchiveCreateInput = Parameters<typeof posthog.llmPromptsNameArchiveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmPromptsNameArchiveCreateOutput = Awaited<ReturnType<typeof posthog.llmPromptsNameArchiveCreate>>;

const result: LlmPromptsNameArchiveCreateOutput = await posthog.llmPromptsNameArchiveCreate();

// Result shape (from schema): { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...
```

### `posthog.llmPromptsNameDuplicateCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_prompts/name/{prompt_name}/duplicate/`
- **OpenAPI operationId**: `llm_prompts_name_duplicate_create`
- **Path params**: `prompt_name`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmPromptsNameDuplicateCreateInput = Parameters<typeof posthog.llmPromptsNameDuplicateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmPromptsNameDuplicateCreateOutput = Awaited<ReturnType<typeof posthog.llmPromptsNameDuplicateCreate>>;

const result: LlmPromptsNameDuplicateCreateOutput = await posthog.llmPromptsNameDuplicateCreate();

// Result shape (from schema): { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: str...
```

### `posthog.llmPromptsResolveNameRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_prompts/resolve/name/{prompt_name}/`
- **OpenAPI operationId**: `llm_prompts_resolve_name_retrieve`
- **Path params**: `prompt_name`
- **Query params**: `before_version`, `limit`, `offset`, `version`, `version_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ prompt: { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmPromptsResolveNameRetrieveInput = Parameters<typeof posthog.llmPromptsResolveNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmPromptsResolveNameRetrieveOutput = Awaited<ReturnType<typeof posthog.llmPromptsResolveNameRetrieve>>;

const result: LlmPromptsResolveNameRetrieveOutput = await posthog.llmPromptsResolveNameRetrieve();

// Result shape (from schema): { prompt: { id: string; name: string; prompt: unknown; version: number; version_description?: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; ...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

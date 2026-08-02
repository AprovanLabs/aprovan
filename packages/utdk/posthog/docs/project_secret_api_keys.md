# Project Secret Api Keys

## Operations

### `posthog.environmentsProjectSecretApiKeysList`

- **HTTP**: `GET /api/environments/{environment_id}/project_secret_api_keys/`
- **OpenAPI operationId**: `environments_project_secret_api_keys_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsProjectSecretApiKeysListInput = Parameters<typeof posthog.environmentsProjectSecretApiKeysList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsProjectSecretApiKeysListOutput = Awaited<ReturnType<typeof posthog.environmentsProjectSecretApiKeysList>>;

const result: EnvironmentsProjectSecretApiKeysListOutput = await posthog.environmentsProjectSecretApiKeysList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?:...
```

### `posthog.environmentsProjectSecretApiKeysCreate`

- **HTTP**: `POST /api/environments/{environment_id}/project_secret_api_keys/`
- **OpenAPI operationId**: `environments_project_secret_api_keys_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsProjectSecretApiKeysCreateInput = Parameters<typeof posthog.environmentsProjectSecretApiKeysCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsProjectSecretApiKeysCreateOutput = Awaited<ReturnType<typeof posthog.environmentsProjectSecretApiKeysCreate>>;

const result: EnvironmentsProjectSecretApiKeysCreateOutput = await posthog.environmentsProjectSecretApiKeysCreate();

// Result shape (from schema): { id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...
```

### `posthog.environmentsProjectSecretApiKeysDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/project_secret_api_keys/{id}/`
- **OpenAPI operationId**: `environments_project_secret_api_keys_destroy`
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

type EnvironmentsProjectSecretApiKeysDestroyInput = Parameters<typeof posthog.environmentsProjectSecretApiKeysDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsProjectSecretApiKeysDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsProjectSecretApiKeysDestroy>>;

const result: EnvironmentsProjectSecretApiKeysDestroyOutput = await posthog.environmentsProjectSecretApiKeysDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsProjectSecretApiKeysRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/project_secret_api_keys/{id}/`
- **OpenAPI operationId**: `environments_project_secret_api_keys_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsProjectSecretApiKeysRetrieveInput = Parameters<typeof posthog.environmentsProjectSecretApiKeysRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsProjectSecretApiKeysRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsProjectSecretApiKeysRetrieve>>;

const result: EnvironmentsProjectSecretApiKeysRetrieveOutput = await posthog.environmentsProjectSecretApiKeysRetrieve();

// Result shape (from schema): { id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...
```

### `posthog.environmentsProjectSecretApiKeysPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/project_secret_api_keys/{id}/`
- **OpenAPI operationId**: `environments_project_secret_api_keys_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsProjectSecretApiKeysPartialUpdateInput = Parameters<typeof posthog.environmentsProjectSecretApiKeysPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsProjectSecretApiKeysPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsProjectSecretApiKeysPartialUpdate>>;

const result: EnvironmentsProjectSecretApiKeysPartialUpdateOutput = await posthog.environmentsProjectSecretApiKeysPartialUpdate();

// Result shape (from schema): { id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...
```

### `posthog.environmentsProjectSecretApiKeysUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/project_secret_api_keys/{id}/`
- **OpenAPI operationId**: `environments_project_secret_api_keys_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsProjectSecretApiKeysUpdateInput = Parameters<typeof posthog.environmentsProjectSecretApiKeysUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsProjectSecretApiKeysUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsProjectSecretApiKeysUpdate>>;

const result: EnvironmentsProjectSecretApiKeysUpdateOutput = await posthog.environmentsProjectSecretApiKeysUpdate();

// Result shape (from schema): { id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...
```

### `posthog.environmentsProjectSecretApiKeysRollCreate`

- **HTTP**: `POST /api/environments/{environment_id}/project_secret_api_keys/{id}/roll/`
- **What it does**: Roll a project secret API key
- **OpenAPI operationId**: `environments_project_secret_api_keys_roll_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsProjectSecretApiKeysRollCreateInput = Parameters<typeof posthog.environmentsProjectSecretApiKeysRollCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsProjectSecretApiKeysRollCreateOutput = Awaited<ReturnType<typeof posthog.environmentsProjectSecretApiKeysRollCreate>>;

const result: EnvironmentsProjectSecretApiKeysRollCreateOutput = await posthog.environmentsProjectSecretApiKeysRollCreate();

// Result shape (from schema): { id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...
```

### `posthog.projectSecretApiKeysList`

- **HTTP**: `GET /api/projects/{project_id}/project_secret_api_keys/`
- **OpenAPI operationId**: `project_secret_api_keys_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProjectSecretApiKeysListInput = Parameters<typeof posthog.projectSecretApiKeysList> extends [infer T, ...unknown[]] ? T : undefined;
type ProjectSecretApiKeysListOutput = Awaited<ReturnType<typeof posthog.projectSecretApiKeysList>>;

const result: ProjectSecretApiKeysListOutput = await posthog.projectSecretApiKeysList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?:...
```

### `posthog.projectSecretApiKeysCreate`

- **HTTP**: `POST /api/projects/{project_id}/project_secret_api_keys/`
- **OpenAPI operationId**: `project_secret_api_keys_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ProjectSecretApiKeysCreateInput = Parameters<typeof posthog.projectSecretApiKeysCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ProjectSecretApiKeysCreateOutput = Awaited<ReturnType<typeof posthog.projectSecretApiKeysCreate>>;

const result: ProjectSecretApiKeysCreateOutput = await posthog.projectSecretApiKeysCreate();

// Result shape (from schema): { id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...
```

### `posthog.projectSecretApiKeysDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/project_secret_api_keys/{id}/`
- **OpenAPI operationId**: `project_secret_api_keys_destroy`
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

type ProjectSecretApiKeysDestroyInput = Parameters<typeof posthog.projectSecretApiKeysDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ProjectSecretApiKeysDestroyOutput = Awaited<ReturnType<typeof posthog.projectSecretApiKeysDestroy>>;

const result: ProjectSecretApiKeysDestroyOutput = await posthog.projectSecretApiKeysDestroy();

// Result shape (from schema): unknown
```

### `posthog.projectSecretApiKeysRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/project_secret_api_keys/{id}/`
- **OpenAPI operationId**: `project_secret_api_keys_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProjectSecretApiKeysRetrieveInput = Parameters<typeof posthog.projectSecretApiKeysRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ProjectSecretApiKeysRetrieveOutput = Awaited<ReturnType<typeof posthog.projectSecretApiKeysRetrieve>>;

const result: ProjectSecretApiKeysRetrieveOutput = await posthog.projectSecretApiKeysRetrieve();

// Result shape (from schema): { id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...
```

### `posthog.projectSecretApiKeysPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/project_secret_api_keys/{id}/`
- **OpenAPI operationId**: `project_secret_api_keys_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProjectSecretApiKeysPartialUpdateInput = Parameters<typeof posthog.projectSecretApiKeysPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ProjectSecretApiKeysPartialUpdateOutput = Awaited<ReturnType<typeof posthog.projectSecretApiKeysPartialUpdate>>;

const result: ProjectSecretApiKeysPartialUpdateOutput = await posthog.projectSecretApiKeysPartialUpdate();

// Result shape (from schema): { id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...
```

### `posthog.projectSecretApiKeysUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/project_secret_api_keys/{id}/`
- **OpenAPI operationId**: `project_secret_api_keys_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProjectSecretApiKeysUpdateInput = Parameters<typeof posthog.projectSecretApiKeysUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ProjectSecretApiKeysUpdateOutput = Awaited<ReturnType<typeof posthog.projectSecretApiKeysUpdate>>;

const result: ProjectSecretApiKeysUpdateOutput = await posthog.projectSecretApiKeysUpdate();

// Result shape (from schema): { id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...
```

### `posthog.projectSecretApiKeysRollCreate`

- **HTTP**: `POST /api/projects/{project_id}/project_secret_api_keys/{id}/roll/`
- **What it does**: Roll a project secret API key
- **OpenAPI operationId**: `project_secret_api_keys_roll_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProjectSecretApiKeysRollCreateInput = Parameters<typeof posthog.projectSecretApiKeysRollCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ProjectSecretApiKeysRollCreateOutput = Awaited<ReturnType<typeof posthog.projectSecretApiKeysRollCreate>>;

const result: ProjectSecretApiKeysRollCreateOutput = await posthog.projectSecretApiKeysRollCreate();

// Result shape (from schema): { id: string; label: string; value: string; mask_value: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

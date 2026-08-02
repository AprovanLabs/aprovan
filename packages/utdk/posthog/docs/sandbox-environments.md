# Sandbox Environments

## Operations

### `posthog.sandboxList`

- **HTTP**: `GET /api/projects/{project_id}/sandbox_environments/`
- **What it does**: API for managing sandbox environments that control network access for task runs.
- **OpenAPI operationId**: `sandbox_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; network_access_level: string; allowed_domains?: (string)[]; repositories?: (string)[]; private: boolean; internal: b...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SandboxListInput = Parameters<typeof posthog.sandboxList> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxListOutput = Awaited<ReturnType<typeof posthog.sandboxList>>;

const result: SandboxListOutput = await posthog.sandboxList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; network_access_level: string; allowed_domains?: (string)[]; repositories?: (string)[]; private: boolean; internal: b...
```

### `posthog.sandboxCreate`

- **HTTP**: `POST /api/projects/{project_id}/sandbox_environments/`
- **What it does**: API for managing sandbox environments that control network access for task runs.
- **OpenAPI operationId**: `sandbox_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; network_access_level: string; allowed_domains?: (string)[]; repositories?: (string)[]; private: boolean; internal: boolean; created_by?: { id: number; uuid: string; distinct_id: string; first...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type SandboxCreateInput = Parameters<typeof posthog.sandboxCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxCreateOutput = Awaited<ReturnType<typeof posthog.sandboxCreate>>;

const result: SandboxCreateOutput = await posthog.sandboxCreate();

// Result shape (from schema): { id: string; name: string; network_access_level: string; allowed_domains?: (string)[]; repositories?: (string)[]; private: boolean; internal: boolean; created_by?: { id: number; uuid: string; distinct_id: string; first...
```

### `posthog.sandboxDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/sandbox_environments/{id}/`
- **What it does**: API for managing sandbox environments that control network access for task runs.
- **OpenAPI operationId**: `sandbox_destroy`
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

type SandboxDestroyInput = Parameters<typeof posthog.sandboxDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxDestroyOutput = Awaited<ReturnType<typeof posthog.sandboxDestroy>>;

const result: SandboxDestroyOutput = await posthog.sandboxDestroy();

// Result shape (from schema): unknown
```

### `posthog.sandboxRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/sandbox_environments/{id}/`
- **What it does**: API for managing sandbox environments that control network access for task runs.
- **OpenAPI operationId**: `sandbox_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; network_access_level: string; allowed_domains?: (string)[]; repositories?: (string)[]; private: boolean; internal: boolean; created_by?: { id: number; uuid: string; distinct_id: string; first...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SandboxRetrieveInput = Parameters<typeof posthog.sandboxRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxRetrieveOutput = Awaited<ReturnType<typeof posthog.sandboxRetrieve>>;

const result: SandboxRetrieveOutput = await posthog.sandboxRetrieve();

// Result shape (from schema): { id: string; name: string; network_access_level: string; allowed_domains?: (string)[]; repositories?: (string)[]; private: boolean; internal: boolean; created_by?: { id: number; uuid: string; distinct_id: string; first...
```

### `posthog.sandboxPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/sandbox_environments/{id}/`
- **What it does**: API for managing sandbox environments that control network access for task runs.
- **OpenAPI operationId**: `sandbox_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; network_access_level: string; allowed_domains?: (string)[]; repositories?: (string)[]; private: boolean; internal: boolean; created_by?: { id: number; uuid: string; distinct_id: string; first...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SandboxPartialUpdateInput = Parameters<typeof posthog.sandboxPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SandboxPartialUpdateOutput = Awaited<ReturnType<typeof posthog.sandboxPartialUpdate>>;

const result: SandboxPartialUpdateOutput = await posthog.sandboxPartialUpdate();

// Result shape (from schema): { id: string; name: string; network_access_level: string; allowed_domains?: (string)[]; repositories?: (string)[]; private: boolean; internal: boolean; created_by?: { id: number; uuid: string; distinct_id: string; first...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

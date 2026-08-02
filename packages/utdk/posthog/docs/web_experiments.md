# Web Experiments

## Operations

### `posthog.webExperimentsList`

- **HTTP**: `GET /api/projects/{project_id}/web_experiments/`
- **OpenAPI operationId**: `web_experiments_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; created_at?: string; feature_flag_key: string; variants: unknown })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebExperimentsListInput = Parameters<typeof posthog.webExperimentsList> extends [infer T, ...unknown[]] ? T : undefined;
type WebExperimentsListOutput = Awaited<ReturnType<typeof posthog.webExperimentsList>>;

const result: WebExperimentsListOutput = await posthog.webExperimentsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; created_at?: string; feature_flag_key: string; variants: unknown })[] }
```

### `posthog.webExperimentsCreate`

- **HTTP**: `POST /api/projects/{project_id}/web_experiments/`
- **OpenAPI operationId**: `web_experiments_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; created_at?: string; feature_flag_key: string; variants: unknown }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type WebExperimentsCreateInput = Parameters<typeof posthog.webExperimentsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WebExperimentsCreateOutput = Awaited<ReturnType<typeof posthog.webExperimentsCreate>>;

const result: WebExperimentsCreateOutput = await posthog.webExperimentsCreate();

// Result shape (from schema): { id: number; name: string; created_at?: string; feature_flag_key: string; variants: unknown }
```

### `posthog.webExperimentsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/web_experiments/{id}/`
- **OpenAPI operationId**: `web_experiments_destroy`
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

type WebExperimentsDestroyInput = Parameters<typeof posthog.webExperimentsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type WebExperimentsDestroyOutput = Awaited<ReturnType<typeof posthog.webExperimentsDestroy>>;

const result: WebExperimentsDestroyOutput = await posthog.webExperimentsDestroy();

// Result shape (from schema): unknown
```

### `posthog.webExperimentsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/web_experiments/{id}/`
- **OpenAPI operationId**: `web_experiments_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; created_at?: string; feature_flag_key: string; variants: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebExperimentsRetrieveInput = Parameters<typeof posthog.webExperimentsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WebExperimentsRetrieveOutput = Awaited<ReturnType<typeof posthog.webExperimentsRetrieve>>;

const result: WebExperimentsRetrieveOutput = await posthog.webExperimentsRetrieve();

// Result shape (from schema): { id: number; name: string; created_at?: string; feature_flag_key: string; variants: unknown }
```

### `posthog.webExperimentsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/web_experiments/{id}/`
- **OpenAPI operationId**: `web_experiments_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; created_at?: string; feature_flag_key: string; variants: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebExperimentsPartialUpdateInput = Parameters<typeof posthog.webExperimentsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WebExperimentsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.webExperimentsPartialUpdate>>;

const result: WebExperimentsPartialUpdateOutput = await posthog.webExperimentsPartialUpdate();

// Result shape (from schema): { id: number; name: string; created_at?: string; feature_flag_key: string; variants: unknown }
```

### `posthog.webExperimentsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/web_experiments/{id}/`
- **OpenAPI operationId**: `web_experiments_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; created_at?: string; feature_flag_key: string; variants: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebExperimentsUpdateInput = Parameters<typeof posthog.webExperimentsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WebExperimentsUpdateOutput = Awaited<ReturnType<typeof posthog.webExperimentsUpdate>>;

const result: WebExperimentsUpdateOutput = await posthog.webExperimentsUpdate();

// Result shape (from schema): { id: number; name: string; created_at?: string; feature_flag_key: string; variants: unknown }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

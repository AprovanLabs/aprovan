# Early Access Feature

## Operations

### `posthog.earlyAccessFeatureList`

- **HTTP**: `GET /api/projects/{project_id}/early_access_feature/`
- **OpenAPI operationId**: `early_access_feature_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EarlyAccessFeatureListInput = Parameters<typeof posthog.earlyAccessFeatureList> extends [infer T, ...unknown[]] ? T : undefined;
type EarlyAccessFeatureListOutput = Awaited<ReturnType<typeof posthog.earlyAccessFeatureList>>;

const result: EarlyAccessFeatureListOutput = await posthog.earlyAccessFeatureList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; ...
```

### `posthog.earlyAccessFeatureCreate`

- **HTTP**: `POST /api/projects/{project_id}/early_access_feature/`
- **OpenAPI operationId**: `early_access_feature_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; stage: "draft" | "concept" | "alpha" | "beta" | "general-availability" | "archived"; documentation_url?: string; payload?: unknown; created_at: string; feature_flag_id?:...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EarlyAccessFeatureCreateInput = Parameters<typeof posthog.earlyAccessFeatureCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EarlyAccessFeatureCreateOutput = Awaited<ReturnType<typeof posthog.earlyAccessFeatureCreate>>;

const result: EarlyAccessFeatureCreateOutput = await posthog.earlyAccessFeatureCreate();

// Result shape (from schema): { id: string; name: string; description?: string; stage: "draft" | "concept" | "alpha" | "beta" | "general-availability" | "archived"; documentation_url?: string; payload?: unknown; created_at: string; feature_flag_id?:...
```

### `posthog.earlyAccessFeatureDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/early_access_feature/{id}/`
- **OpenAPI operationId**: `early_access_feature_destroy`
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

type EarlyAccessFeatureDestroyInput = Parameters<typeof posthog.earlyAccessFeatureDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EarlyAccessFeatureDestroyOutput = Awaited<ReturnType<typeof posthog.earlyAccessFeatureDestroy>>;

const result: EarlyAccessFeatureDestroyOutput = await posthog.earlyAccessFeatureDestroy();

// Result shape (from schema): unknown
```

### `posthog.earlyAccessFeatureRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/early_access_feature/{id}/`
- **OpenAPI operationId**: `early_access_feature_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_experience_continuity?: boolean | null; version?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EarlyAccessFeatureRetrieveInput = Parameters<typeof posthog.earlyAccessFeatureRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EarlyAccessFeatureRetrieveOutput = Awaited<ReturnType<typeof posthog.earlyAccessFeatureRetrieve>>;

const result: EarlyAccessFeatureRetrieveOutput = await posthog.earlyAccessFeatureRetrieve();

// Result shape (from schema): { id: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_experience_continuity?: boolean | null; version?: ...
```

### `posthog.earlyAccessFeaturePartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/early_access_feature/{id}/`
- **OpenAPI operationId**: `early_access_feature_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_experience_continuity?: boolean | null; version?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EarlyAccessFeaturePartialUpdateInput = Parameters<typeof posthog.earlyAccessFeaturePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EarlyAccessFeaturePartialUpdateOutput = Awaited<ReturnType<typeof posthog.earlyAccessFeaturePartialUpdate>>;

const result: EarlyAccessFeaturePartialUpdateOutput = await posthog.earlyAccessFeaturePartialUpdate();

// Result shape (from schema): { id: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_experience_continuity?: boolean | null; version?: ...
```

### `posthog.earlyAccessFeatureUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/early_access_feature/{id}/`
- **OpenAPI operationId**: `early_access_feature_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_experience_continuity?: boolean | null; version?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EarlyAccessFeatureUpdateInput = Parameters<typeof posthog.earlyAccessFeatureUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EarlyAccessFeatureUpdateOutput = Awaited<ReturnType<typeof posthog.earlyAccessFeatureUpdate>>;

const result: EarlyAccessFeatureUpdateOutput = await posthog.earlyAccessFeatureUpdate();

// Result shape (from schema): { id: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_experience_continuity?: boolean | null; version?: ...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

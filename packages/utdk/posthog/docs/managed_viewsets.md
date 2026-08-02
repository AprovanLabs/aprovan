# Managed Viewsets

## Operations

### `posthog.environmentsManagedViewsetsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/managed_viewsets/{kind}/`
- **What it does**: Get all views associated with a specific managed viewset.
GET /api/environments/{team_id}/managed_viewsets/{kind}/
- **OpenAPI operationId**: `environments_managed_viewsets_retrieve`
- **Path params**: `kind`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsManagedViewsetsRetrieveInput = Parameters<typeof posthog.environmentsManagedViewsetsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsManagedViewsetsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsManagedViewsetsRetrieve>>;

const result: EnvironmentsManagedViewsetsRetrieveOutput = await posthog.environmentsManagedViewsetsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsManagedViewsetsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/managed_viewsets/{kind}/`
- **What it does**: Enable or disable a managed viewset by kind.
PUT /api/environments/{team_id}/managed_viewsets/{kind}/ with body {"enabled": true/false}
- **OpenAPI operationId**: `environments_managed_viewsets_update`
- **Path params**: `kind`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsManagedViewsetsUpdateInput = Parameters<typeof posthog.environmentsManagedViewsetsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsManagedViewsetsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsManagedViewsetsUpdate>>;

const result: EnvironmentsManagedViewsetsUpdateOutput = await posthog.environmentsManagedViewsetsUpdate();

// Result shape (from schema): unknown
```

### `posthog.managedViewsetsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/managed_viewsets/{kind}/`
- **What it does**: Get all views associated with a specific managed viewset.
GET /api/environments/{team_id}/managed_viewsets/{kind}/
- **OpenAPI operationId**: `managed_viewsets_retrieve`
- **Path params**: `kind`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ManagedViewsetsRetrieveInput = Parameters<typeof posthog.managedViewsetsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ManagedViewsetsRetrieveOutput = Awaited<ReturnType<typeof posthog.managedViewsetsRetrieve>>;

const result: ManagedViewsetsRetrieveOutput = await posthog.managedViewsetsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.managedViewsetsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/managed_viewsets/{kind}/`
- **What it does**: Enable or disable a managed viewset by kind.
PUT /api/environments/{team_id}/managed_viewsets/{kind}/ with body {"enabled": true/false}
- **OpenAPI operationId**: `managed_viewsets_update`
- **Path params**: `kind`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ManagedViewsetsUpdateInput = Parameters<typeof posthog.managedViewsetsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ManagedViewsetsUpdateOutput = Awaited<ReturnType<typeof posthog.managedViewsetsUpdate>>;

const result: ManagedViewsetsUpdateOutput = await posthog.managedViewsetsUpdate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

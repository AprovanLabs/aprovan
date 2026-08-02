# Customer Profile Configs

## Operations

### `posthog.environmentsCustomerProfileConfigsList`

- **HTTP**: `GET /api/environments/{environment_id}/customer_profile_configs/`
- **OpenAPI operationId**: `environments_customer_profile_configs_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomerProfileConfigsListInput = Parameters<typeof posthog.environmentsCustomerProfileConfigsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerProfileConfigsListOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerProfileConfigsList>>;

const result: EnvironmentsCustomerProfileConfigsListOutput = await posthog.environmentsCustomerProfileConfigsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: str...
```

### `posthog.environmentsCustomerProfileConfigsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/customer_profile_configs/`
- **OpenAPI operationId**: `environments_customer_profile_configs_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomerProfileConfigsCreateInput = Parameters<typeof posthog.environmentsCustomerProfileConfigsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerProfileConfigsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerProfileConfigsCreate>>;

const result: EnvironmentsCustomerProfileConfigsCreateOutput = await posthog.environmentsCustomerProfileConfigsCreate();

// Result shape (from schema): { id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }
```

### `posthog.environmentsCustomerProfileConfigsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/customer_profile_configs/{id}/`
- **OpenAPI operationId**: `environments_customer_profile_configs_destroy`
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

type EnvironmentsCustomerProfileConfigsDestroyInput = Parameters<typeof posthog.environmentsCustomerProfileConfigsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerProfileConfigsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerProfileConfigsDestroy>>;

const result: EnvironmentsCustomerProfileConfigsDestroyOutput = await posthog.environmentsCustomerProfileConfigsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsCustomerProfileConfigsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/customer_profile_configs/{id}/`
- **OpenAPI operationId**: `environments_customer_profile_configs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomerProfileConfigsRetrieveInput = Parameters<typeof posthog.environmentsCustomerProfileConfigsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerProfileConfigsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerProfileConfigsRetrieve>>;

const result: EnvironmentsCustomerProfileConfigsRetrieveOutput = await posthog.environmentsCustomerProfileConfigsRetrieve();

// Result shape (from schema): { id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }
```

### `posthog.environmentsCustomerProfileConfigsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/customer_profile_configs/{id}/`
- **OpenAPI operationId**: `environments_customer_profile_configs_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomerProfileConfigsPartialUpdateInput = Parameters<typeof posthog.environmentsCustomerProfileConfigsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerProfileConfigsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerProfileConfigsPartialUpdate>>;

const result: EnvironmentsCustomerProfileConfigsPartialUpdateOutput = await posthog.environmentsCustomerProfileConfigsPartialUpdate();

// Result shape (from schema): { id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }
```

### `posthog.environmentsCustomerProfileConfigsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/customer_profile_configs/{id}/`
- **OpenAPI operationId**: `environments_customer_profile_configs_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomerProfileConfigsUpdateInput = Parameters<typeof posthog.environmentsCustomerProfileConfigsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerProfileConfigsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerProfileConfigsUpdate>>;

const result: EnvironmentsCustomerProfileConfigsUpdateOutput = await posthog.environmentsCustomerProfileConfigsUpdate();

// Result shape (from schema): { id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }
```

### `posthog.customerProfileConfigsList`

- **HTTP**: `GET /api/projects/{project_id}/customer_profile_configs/`
- **OpenAPI operationId**: `customer_profile_configs_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomerProfileConfigsListInput = Parameters<typeof posthog.customerProfileConfigsList> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerProfileConfigsListOutput = Awaited<ReturnType<typeof posthog.customerProfileConfigsList>>;

const result: CustomerProfileConfigsListOutput = await posthog.customerProfileConfigsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: str...
```

### `posthog.customerProfileConfigsCreate`

- **HTTP**: `POST /api/projects/{project_id}/customer_profile_configs/`
- **OpenAPI operationId**: `customer_profile_configs_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type CustomerProfileConfigsCreateInput = Parameters<typeof posthog.customerProfileConfigsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerProfileConfigsCreateOutput = Awaited<ReturnType<typeof posthog.customerProfileConfigsCreate>>;

const result: CustomerProfileConfigsCreateOutput = await posthog.customerProfileConfigsCreate();

// Result shape (from schema): { id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }
```

### `posthog.customerProfileConfigsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/customer_profile_configs/{id}/`
- **OpenAPI operationId**: `customer_profile_configs_destroy`
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

type CustomerProfileConfigsDestroyInput = Parameters<typeof posthog.customerProfileConfigsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerProfileConfigsDestroyOutput = Awaited<ReturnType<typeof posthog.customerProfileConfigsDestroy>>;

const result: CustomerProfileConfigsDestroyOutput = await posthog.customerProfileConfigsDestroy();

// Result shape (from schema): unknown
```

### `posthog.customerProfileConfigsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/customer_profile_configs/{id}/`
- **OpenAPI operationId**: `customer_profile_configs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomerProfileConfigsRetrieveInput = Parameters<typeof posthog.customerProfileConfigsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerProfileConfigsRetrieveOutput = Awaited<ReturnType<typeof posthog.customerProfileConfigsRetrieve>>;

const result: CustomerProfileConfigsRetrieveOutput = await posthog.customerProfileConfigsRetrieve();

// Result shape (from schema): { id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }
```

### `posthog.customerProfileConfigsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/customer_profile_configs/{id}/`
- **OpenAPI operationId**: `customer_profile_configs_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomerProfileConfigsPartialUpdateInput = Parameters<typeof posthog.customerProfileConfigsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerProfileConfigsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.customerProfileConfigsPartialUpdate>>;

const result: CustomerProfileConfigsPartialUpdateOutput = await posthog.customerProfileConfigsPartialUpdate();

// Result shape (from schema): { id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }
```

### `posthog.customerProfileConfigsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/customer_profile_configs/{id}/`
- **OpenAPI operationId**: `customer_profile_configs_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomerProfileConfigsUpdateInput = Parameters<typeof posthog.customerProfileConfigsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerProfileConfigsUpdateOutput = Awaited<ReturnType<typeof posthog.customerProfileConfigsUpdate>>;

const result: CustomerProfileConfigsUpdateOutput = await posthog.customerProfileConfigsUpdate();

// Result shape (from schema): { id: string; scope: "person" | "group_0" | "group_1" | "group_2" | "group_3" | "group_4"; content?: unknown; sidebar?: unknown; created_at: string; updated_at: string | null }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

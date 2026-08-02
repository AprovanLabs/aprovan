# Customer Journeys

## Operations

### `posthog.environmentsCustomerJourneysList`

- **HTTP**: `GET /api/environments/{environment_id}/customer_journeys/`
- **OpenAPI operationId**: `environments_customer_journeys_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomerJourneysListInput = Parameters<typeof posthog.environmentsCustomerJourneysList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerJourneysListOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerJourneysList>>;

const result: EnvironmentsCustomerJourneysListOutput = await posthog.environmentsCustomerJourneysList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | nu...
```

### `posthog.environmentsCustomerJourneysCreate`

- **HTTP**: `POST /api/environments/{environment_id}/customer_journeys/`
- **OpenAPI operationId**: `environments_customer_journeys_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomerJourneysCreateInput = Parameters<typeof posthog.environmentsCustomerJourneysCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerJourneysCreateOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerJourneysCreate>>;

const result: EnvironmentsCustomerJourneysCreateOutput = await posthog.environmentsCustomerJourneysCreate();

// Result shape (from schema): { id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }
```

### `posthog.environmentsCustomerJourneysDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/customer_journeys/{id}/`
- **OpenAPI operationId**: `environments_customer_journeys_destroy`
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

type EnvironmentsCustomerJourneysDestroyInput = Parameters<typeof posthog.environmentsCustomerJourneysDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerJourneysDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerJourneysDestroy>>;

const result: EnvironmentsCustomerJourneysDestroyOutput = await posthog.environmentsCustomerJourneysDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsCustomerJourneysRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/customer_journeys/{id}/`
- **OpenAPI operationId**: `environments_customer_journeys_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomerJourneysRetrieveInput = Parameters<typeof posthog.environmentsCustomerJourneysRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerJourneysRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerJourneysRetrieve>>;

const result: EnvironmentsCustomerJourneysRetrieveOutput = await posthog.environmentsCustomerJourneysRetrieve();

// Result shape (from schema): { id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }
```

### `posthog.environmentsCustomerJourneysPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/customer_journeys/{id}/`
- **OpenAPI operationId**: `environments_customer_journeys_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomerJourneysPartialUpdateInput = Parameters<typeof posthog.environmentsCustomerJourneysPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerJourneysPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerJourneysPartialUpdate>>;

const result: EnvironmentsCustomerJourneysPartialUpdateOutput = await posthog.environmentsCustomerJourneysPartialUpdate();

// Result shape (from schema): { id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }
```

### `posthog.environmentsCustomerJourneysUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/customer_journeys/{id}/`
- **OpenAPI operationId**: `environments_customer_journeys_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomerJourneysUpdateInput = Parameters<typeof posthog.environmentsCustomerJourneysUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomerJourneysUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsCustomerJourneysUpdate>>;

const result: EnvironmentsCustomerJourneysUpdateOutput = await posthog.environmentsCustomerJourneysUpdate();

// Result shape (from schema): { id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }
```

### `posthog.customerJourneysList`

- **HTTP**: `GET /api/projects/{project_id}/customer_journeys/`
- **OpenAPI operationId**: `customer_journeys_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomerJourneysListInput = Parameters<typeof posthog.customerJourneysList> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerJourneysListOutput = Awaited<ReturnType<typeof posthog.customerJourneysList>>;

const result: CustomerJourneysListOutput = await posthog.customerJourneysList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | nu...
```

### `posthog.customerJourneysCreate`

- **HTTP**: `POST /api/projects/{project_id}/customer_journeys/`
- **OpenAPI operationId**: `customer_journeys_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type CustomerJourneysCreateInput = Parameters<typeof posthog.customerJourneysCreate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerJourneysCreateOutput = Awaited<ReturnType<typeof posthog.customerJourneysCreate>>;

const result: CustomerJourneysCreateOutput = await posthog.customerJourneysCreate();

// Result shape (from schema): { id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }
```

### `posthog.customerJourneysDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/customer_journeys/{id}/`
- **OpenAPI operationId**: `customer_journeys_destroy`
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

type CustomerJourneysDestroyInput = Parameters<typeof posthog.customerJourneysDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerJourneysDestroyOutput = Awaited<ReturnType<typeof posthog.customerJourneysDestroy>>;

const result: CustomerJourneysDestroyOutput = await posthog.customerJourneysDestroy();

// Result shape (from schema): unknown
```

### `posthog.customerJourneysRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/customer_journeys/{id}/`
- **OpenAPI operationId**: `customer_journeys_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomerJourneysRetrieveInput = Parameters<typeof posthog.customerJourneysRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerJourneysRetrieveOutput = Awaited<ReturnType<typeof posthog.customerJourneysRetrieve>>;

const result: CustomerJourneysRetrieveOutput = await posthog.customerJourneysRetrieve();

// Result shape (from schema): { id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }
```

### `posthog.customerJourneysPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/customer_journeys/{id}/`
- **OpenAPI operationId**: `customer_journeys_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomerJourneysPartialUpdateInput = Parameters<typeof posthog.customerJourneysPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerJourneysPartialUpdateOutput = Awaited<ReturnType<typeof posthog.customerJourneysPartialUpdate>>;

const result: CustomerJourneysPartialUpdateOutput = await posthog.customerJourneysPartialUpdate();

// Result shape (from schema): { id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }
```

### `posthog.customerJourneysUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/customer_journeys/{id}/`
- **OpenAPI operationId**: `customer_journeys_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomerJourneysUpdateInput = Parameters<typeof posthog.customerJourneysUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomerJourneysUpdateOutput = Awaited<ReturnType<typeof posthog.customerJourneysUpdate>>;

const result: CustomerJourneysUpdateOutput = await posthog.customerJourneysUpdate();

// Result shape (from schema): { id: string; insight: number; name: string; description?: string | null; created_at: string; created_by: number | null; updated_at: string | null }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

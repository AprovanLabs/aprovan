# Warehouse View Links

## Operations

### `posthog.environmentsWarehouseViewLinksList`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_view_links/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_links_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseViewLinksListInput = Parameters<typeof posthog.environmentsWarehouseViewLinksList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinksListOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinksList>>;

const result: EnvironmentsWarehouseViewLinksListOutput = await posthog.environmentsWarehouseViewLinksList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: st...
```

### `posthog.environmentsWarehouseViewLinksCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_view_links/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_links_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseViewLinksCreateInput = Parameters<typeof posthog.environmentsWarehouseViewLinksCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinksCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinksCreate>>;

const result: EnvironmentsWarehouseViewLinksCreateOutput = await posthog.environmentsWarehouseViewLinksCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.environmentsWarehouseViewLinksDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/warehouse_view_links/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_links_destroy`
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

type EnvironmentsWarehouseViewLinksDestroyInput = Parameters<typeof posthog.environmentsWarehouseViewLinksDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinksDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinksDestroy>>;

const result: EnvironmentsWarehouseViewLinksDestroyOutput = await posthog.environmentsWarehouseViewLinksDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsWarehouseViewLinksRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_view_links/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_links_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseViewLinksRetrieveInput = Parameters<typeof posthog.environmentsWarehouseViewLinksRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinksRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinksRetrieve>>;

const result: EnvironmentsWarehouseViewLinksRetrieveOutput = await posthog.environmentsWarehouseViewLinksRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.environmentsWarehouseViewLinksPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/warehouse_view_links/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_links_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseViewLinksPartialUpdateInput = Parameters<typeof posthog.environmentsWarehouseViewLinksPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinksPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinksPartialUpdate>>;

const result: EnvironmentsWarehouseViewLinksPartialUpdateOutput = await posthog.environmentsWarehouseViewLinksPartialUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.environmentsWarehouseViewLinksUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/warehouse_view_links/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_links_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseViewLinksUpdateInput = Parameters<typeof posthog.environmentsWarehouseViewLinksUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinksUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinksUpdate>>;

const result: EnvironmentsWarehouseViewLinksUpdateOutput = await posthog.environmentsWarehouseViewLinksUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.environmentsWarehouseViewLinksValidateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_view_links/validate/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_links_validate_create`
- **Path params**: None
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

type EnvironmentsWarehouseViewLinksValidateCreateInput = Parameters<typeof posthog.environmentsWarehouseViewLinksValidateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinksValidateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinksValidateCreate>>;

const result: EnvironmentsWarehouseViewLinksValidateCreateOutput = await posthog.environmentsWarehouseViewLinksValidateCreate();

// Result shape (from schema): unknown
```

### `posthog.warehouseViewLinksList`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_view_links/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_links_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseViewLinksListInput = Parameters<typeof posthog.warehouseViewLinksList> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinksListOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinksList>>;

const result: WarehouseViewLinksListOutput = await posthog.warehouseViewLinksList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: st...
```

### `posthog.warehouseViewLinksCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_view_links/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_links_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type WarehouseViewLinksCreateInput = Parameters<typeof posthog.warehouseViewLinksCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinksCreateOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinksCreate>>;

const result: WarehouseViewLinksCreateOutput = await posthog.warehouseViewLinksCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.warehouseViewLinksDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/warehouse_view_links/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_links_destroy`
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

type WarehouseViewLinksDestroyInput = Parameters<typeof posthog.warehouseViewLinksDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinksDestroyOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinksDestroy>>;

const result: WarehouseViewLinksDestroyOutput = await posthog.warehouseViewLinksDestroy();

// Result shape (from schema): unknown
```

### `posthog.warehouseViewLinksRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_view_links/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_links_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseViewLinksRetrieveInput = Parameters<typeof posthog.warehouseViewLinksRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinksRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinksRetrieve>>;

const result: WarehouseViewLinksRetrieveOutput = await posthog.warehouseViewLinksRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.warehouseViewLinksPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/warehouse_view_links/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_links_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseViewLinksPartialUpdateInput = Parameters<typeof posthog.warehouseViewLinksPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinksPartialUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinksPartialUpdate>>;

const result: WarehouseViewLinksPartialUpdateOutput = await posthog.warehouseViewLinksPartialUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.warehouseViewLinksUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/warehouse_view_links/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_links_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseViewLinksUpdateInput = Parameters<typeof posthog.warehouseViewLinksUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinksUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinksUpdate>>;

const result: WarehouseViewLinksUpdateOutput = await posthog.warehouseViewLinksUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.warehouseViewLinksValidateCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_view_links/validate/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_links_validate_create`
- **Path params**: None
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

type WarehouseViewLinksValidateCreateInput = Parameters<typeof posthog.warehouseViewLinksValidateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinksValidateCreateOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinksValidateCreate>>;

const result: WarehouseViewLinksValidateCreateOutput = await posthog.warehouseViewLinksValidateCreate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

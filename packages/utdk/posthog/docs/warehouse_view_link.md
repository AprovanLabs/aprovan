# Warehouse View Link

## Operations

### `posthog.environmentsWarehouseViewLinkList`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_view_link/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_link_list`
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

type EnvironmentsWarehouseViewLinkListInput = Parameters<typeof posthog.environmentsWarehouseViewLinkList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinkListOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinkList>>;

const result: EnvironmentsWarehouseViewLinkListOutput = await posthog.environmentsWarehouseViewLinkList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: st...
```

### `posthog.environmentsWarehouseViewLinkCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_view_link/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_link_create`
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

type EnvironmentsWarehouseViewLinkCreateInput = Parameters<typeof posthog.environmentsWarehouseViewLinkCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinkCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinkCreate>>;

const result: EnvironmentsWarehouseViewLinkCreateOutput = await posthog.environmentsWarehouseViewLinkCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.environmentsWarehouseViewLinkDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/warehouse_view_link/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_link_destroy`
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

type EnvironmentsWarehouseViewLinkDestroyInput = Parameters<typeof posthog.environmentsWarehouseViewLinkDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinkDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinkDestroy>>;

const result: EnvironmentsWarehouseViewLinkDestroyOutput = await posthog.environmentsWarehouseViewLinkDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsWarehouseViewLinkRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_view_link/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_link_retrieve`
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

type EnvironmentsWarehouseViewLinkRetrieveInput = Parameters<typeof posthog.environmentsWarehouseViewLinkRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinkRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinkRetrieve>>;

const result: EnvironmentsWarehouseViewLinkRetrieveOutput = await posthog.environmentsWarehouseViewLinkRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.environmentsWarehouseViewLinkPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/warehouse_view_link/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_link_partial_update`
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

type EnvironmentsWarehouseViewLinkPartialUpdateInput = Parameters<typeof posthog.environmentsWarehouseViewLinkPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinkPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinkPartialUpdate>>;

const result: EnvironmentsWarehouseViewLinkPartialUpdateOutput = await posthog.environmentsWarehouseViewLinkPartialUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.environmentsWarehouseViewLinkUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/warehouse_view_link/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_link_update`
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

type EnvironmentsWarehouseViewLinkUpdateInput = Parameters<typeof posthog.environmentsWarehouseViewLinkUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinkUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinkUpdate>>;

const result: EnvironmentsWarehouseViewLinkUpdateOutput = await posthog.environmentsWarehouseViewLinkUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.environmentsWarehouseViewLinkValidateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_view_link/validate/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `environments_warehouse_view_link_validate_create`
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

type EnvironmentsWarehouseViewLinkValidateCreateInput = Parameters<typeof posthog.environmentsWarehouseViewLinkValidateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseViewLinkValidateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseViewLinkValidateCreate>>;

const result: EnvironmentsWarehouseViewLinkValidateCreateOutput = await posthog.environmentsWarehouseViewLinkValidateCreate();

// Result shape (from schema): unknown
```

### `posthog.warehouseViewLinkList`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_view_link/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_link_list`
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

type WarehouseViewLinkListInput = Parameters<typeof posthog.warehouseViewLinkList> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinkListOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinkList>>;

const result: WarehouseViewLinkListOutput = await posthog.warehouseViewLinkList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: st...
```

### `posthog.warehouseViewLinkCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_view_link/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_link_create`
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

type WarehouseViewLinkCreateInput = Parameters<typeof posthog.warehouseViewLinkCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinkCreateOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinkCreate>>;

const result: WarehouseViewLinkCreateOutput = await posthog.warehouseViewLinkCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.warehouseViewLinkDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/warehouse_view_link/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_link_destroy`
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

type WarehouseViewLinkDestroyInput = Parameters<typeof posthog.warehouseViewLinkDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinkDestroyOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinkDestroy>>;

const result: WarehouseViewLinkDestroyOutput = await posthog.warehouseViewLinkDestroy();

// Result shape (from schema): unknown
```

### `posthog.warehouseViewLinkRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_view_link/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_link_retrieve`
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

type WarehouseViewLinkRetrieveInput = Parameters<typeof posthog.warehouseViewLinkRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinkRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinkRetrieve>>;

const result: WarehouseViewLinkRetrieveOutput = await posthog.warehouseViewLinkRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.warehouseViewLinkPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/warehouse_view_link/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_link_partial_update`
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

type WarehouseViewLinkPartialUpdateInput = Parameters<typeof posthog.warehouseViewLinkPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinkPartialUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinkPartialUpdate>>;

const result: WarehouseViewLinkPartialUpdateOutput = await posthog.warehouseViewLinkPartialUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.warehouseViewLinkUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/warehouse_view_link/{id}/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_link_update`
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

type WarehouseViewLinkUpdateInput = Parameters<typeof posthog.warehouseViewLinkUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinkUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinkUpdate>>;

const result: WarehouseViewLinkUpdateOutput = await posthog.warehouseViewLinkUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: {...
```

### `posthog.warehouseViewLinkValidateCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_view_link/validate/`
- **What it does**: Create, Read, Update and Delete View Columns.
- **OpenAPI operationId**: `warehouse_view_link_validate_create`
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

type WarehouseViewLinkValidateCreateInput = Parameters<typeof posthog.warehouseViewLinkValidateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseViewLinkValidateCreateOutput = Awaited<ReturnType<typeof posthog.warehouseViewLinkValidateCreate>>;

const result: WarehouseViewLinkValidateCreateOutput = await posthog.warehouseViewLinkValidateCreate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

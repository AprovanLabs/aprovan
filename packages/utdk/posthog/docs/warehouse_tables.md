# Warehouse Tables

## Operations

### `posthog.environmentsWarehouseTablesList`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_tables/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_tables_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; c...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseTablesListInput = Parameters<typeof posthog.environmentsWarehouseTablesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseTablesListOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseTablesList>>;

const result: EnvironmentsWarehouseTablesListOutput = await posthog.environmentsWarehouseTablesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; c...
```

### `posthog.environmentsWarehouseTablesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_tables/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_tables_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseTablesCreateInput = Parameters<typeof posthog.environmentsWarehouseTablesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseTablesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseTablesCreate>>;

const result: EnvironmentsWarehouseTablesCreateOutput = await posthog.environmentsWarehouseTablesCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...
```

### `posthog.environmentsWarehouseTablesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/warehouse_tables/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_tables_destroy`
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

type EnvironmentsWarehouseTablesDestroyInput = Parameters<typeof posthog.environmentsWarehouseTablesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseTablesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseTablesDestroy>>;

const result: EnvironmentsWarehouseTablesDestroyOutput = await posthog.environmentsWarehouseTablesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsWarehouseTablesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/warehouse_tables/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_tables_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseTablesRetrieveInput = Parameters<typeof posthog.environmentsWarehouseTablesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseTablesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseTablesRetrieve>>;

const result: EnvironmentsWarehouseTablesRetrieveOutput = await posthog.environmentsWarehouseTablesRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...
```

### `posthog.environmentsWarehouseTablesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/warehouse_tables/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_tables_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseTablesPartialUpdateInput = Parameters<typeof posthog.environmentsWarehouseTablesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseTablesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseTablesPartialUpdate>>;

const result: EnvironmentsWarehouseTablesPartialUpdateOutput = await posthog.environmentsWarehouseTablesPartialUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...
```

### `posthog.environmentsWarehouseTablesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/warehouse_tables/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_tables_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWarehouseTablesUpdateInput = Parameters<typeof posthog.environmentsWarehouseTablesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseTablesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseTablesUpdate>>;

const result: EnvironmentsWarehouseTablesUpdateOutput = await posthog.environmentsWarehouseTablesUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...
```

### `posthog.environmentsWarehouseTablesRefreshSchemaCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_tables/{id}/refresh_schema/`
- **What it does**: Refresh table schema from source
- **OpenAPI operationId**: `environments_warehouse_tables_refresh_schema_create`
- **Path params**: `id`
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

type EnvironmentsWarehouseTablesRefreshSchemaCreateInput = Parameters<typeof posthog.environmentsWarehouseTablesRefreshSchemaCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseTablesRefreshSchemaCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseTablesRefreshSchemaCreate>>;

const result: EnvironmentsWarehouseTablesRefreshSchemaCreateOutput = await posthog.environmentsWarehouseTablesRefreshSchemaCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsWarehouseTablesUpdateSchemaCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_tables/{id}/update_schema/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_tables_update_schema_create`
- **Path params**: `id`
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

type EnvironmentsWarehouseTablesUpdateSchemaCreateInput = Parameters<typeof posthog.environmentsWarehouseTablesUpdateSchemaCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseTablesUpdateSchemaCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseTablesUpdateSchemaCreate>>;

const result: EnvironmentsWarehouseTablesUpdateSchemaCreateOutput = await posthog.environmentsWarehouseTablesUpdateSchemaCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsWarehouseTablesFileCreate`

- **HTTP**: `POST /api/environments/{environment_id}/warehouse_tables/file/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `environments_warehouse_tables_file_create`
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

type EnvironmentsWarehouseTablesFileCreateInput = Parameters<typeof posthog.environmentsWarehouseTablesFileCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWarehouseTablesFileCreateOutput = Awaited<ReturnType<typeof posthog.environmentsWarehouseTablesFileCreate>>;

const result: EnvironmentsWarehouseTablesFileCreateOutput = await posthog.environmentsWarehouseTablesFileCreate();

// Result shape (from schema): unknown
```

### `posthog.warehouseTablesList`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_tables/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_tables_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; c...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseTablesListInput = Parameters<typeof posthog.warehouseTablesList> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseTablesListOutput = Awaited<ReturnType<typeof posthog.warehouseTablesList>>;

const result: WarehouseTablesListOutput = await posthog.warehouseTablesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; c...
```

### `posthog.warehouseTablesCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_tables/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_tables_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type WarehouseTablesCreateInput = Parameters<typeof posthog.warehouseTablesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseTablesCreateOutput = Awaited<ReturnType<typeof posthog.warehouseTablesCreate>>;

const result: WarehouseTablesCreateOutput = await posthog.warehouseTablesCreate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...
```

### `posthog.warehouseTablesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/warehouse_tables/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_tables_destroy`
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

type WarehouseTablesDestroyInput = Parameters<typeof posthog.warehouseTablesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseTablesDestroyOutput = Awaited<ReturnType<typeof posthog.warehouseTablesDestroy>>;

const result: WarehouseTablesDestroyOutput = await posthog.warehouseTablesDestroy();

// Result shape (from schema): unknown
```

### `posthog.warehouseTablesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_tables/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_tables_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseTablesRetrieveInput = Parameters<typeof posthog.warehouseTablesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseTablesRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseTablesRetrieve>>;

const result: WarehouseTablesRetrieveOutput = await posthog.warehouseTablesRetrieve();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...
```

### `posthog.warehouseTablesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/warehouse_tables/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_tables_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseTablesPartialUpdateInput = Parameters<typeof posthog.warehouseTablesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseTablesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseTablesPartialUpdate>>;

const result: WarehouseTablesPartialUpdateOutput = await posthog.warehouseTablesPartialUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...
```

### `posthog.warehouseTablesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/warehouse_tables/{id}/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_tables_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseTablesUpdateInput = Parameters<typeof posthog.warehouseTablesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseTablesUpdateOutput = Awaited<ReturnType<typeof posthog.warehouseTablesUpdate>>;

const result: WarehouseTablesUpdateOutput = await posthog.warehouseTablesUpdate();

// Result shape (from schema): { id: string; deleted?: boolean | null; name: string; format: "CSV" | "CSVWithNames" | "Parquet" | "JSONEachRow" | "Delta" | "DeltaS3Wrapper"; created_by: { id: number; uuid: string; distinct_id?: string | null; first_n...
```

### `posthog.warehouseTablesRefreshSchemaCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_tables/{id}/refresh_schema/`
- **What it does**: Refresh table schema from source
- **OpenAPI operationId**: `warehouse_tables_refresh_schema_create`
- **Path params**: `id`
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

type WarehouseTablesRefreshSchemaCreateInput = Parameters<typeof posthog.warehouseTablesRefreshSchemaCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseTablesRefreshSchemaCreateOutput = Awaited<ReturnType<typeof posthog.warehouseTablesRefreshSchemaCreate>>;

const result: WarehouseTablesRefreshSchemaCreateOutput = await posthog.warehouseTablesRefreshSchemaCreate();

// Result shape (from schema): unknown
```

### `posthog.warehouseTablesUpdateSchemaCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_tables/{id}/update_schema/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_tables_update_schema_create`
- **Path params**: `id`
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

type WarehouseTablesUpdateSchemaCreateInput = Parameters<typeof posthog.warehouseTablesUpdateSchemaCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseTablesUpdateSchemaCreateOutput = Awaited<ReturnType<typeof posthog.warehouseTablesUpdateSchemaCreate>>;

const result: WarehouseTablesUpdateSchemaCreateOutput = await posthog.warehouseTablesUpdateSchemaCreate();

// Result shape (from schema): unknown
```

### `posthog.warehouseTablesFileCreate`

- **HTTP**: `POST /api/projects/{project_id}/warehouse_tables/file/`
- **What it does**: Create, Read, Update and Delete Warehouse Tables.
- **OpenAPI operationId**: `warehouse_tables_file_create`
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

type WarehouseTablesFileCreateInput = Parameters<typeof posthog.warehouseTablesFileCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseTablesFileCreateOutput = Awaited<ReturnType<typeof posthog.warehouseTablesFileCreate>>;

const result: WarehouseTablesFileCreateOutput = await posthog.warehouseTablesFileCreate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# External Data Schemas

## Operations

### `posthog.environmentsExternalDataSchemasList`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_schemas/`
- **OpenAPI operationId**: `environments_external_data_schemas_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSchemasListInput = Parameters<typeof posthog.environmentsExternalDataSchemasList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasListOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasList>>;

const result: EnvironmentsExternalDataSchemasListOutput = await posthog.environmentsExternalDataSchemasList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null...
```

### `posthog.environmentsExternalDataSchemasCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_schemas/`
- **OpenAPI operationId**: `environments_external_data_schemas_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSchemasCreateInput = Parameters<typeof posthog.environmentsExternalDataSchemasCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasCreate>>;

const result: EnvironmentsExternalDataSchemasCreateOutput = await posthog.environmentsExternalDataSchemasCreate();

// Result shape (from schema): { id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...
```

### `posthog.environmentsExternalDataSchemasDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/external_data_schemas/{id}/`
- **OpenAPI operationId**: `environments_external_data_schemas_destroy`
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

type EnvironmentsExternalDataSchemasDestroyInput = Parameters<typeof posthog.environmentsExternalDataSchemasDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasDestroy>>;

const result: EnvironmentsExternalDataSchemasDestroyOutput = await posthog.environmentsExternalDataSchemasDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSchemasRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_schemas/{id}/`
- **OpenAPI operationId**: `environments_external_data_schemas_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSchemasRetrieveInput = Parameters<typeof posthog.environmentsExternalDataSchemasRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasRetrieve>>;

const result: EnvironmentsExternalDataSchemasRetrieveOutput = await posthog.environmentsExternalDataSchemasRetrieve();

// Result shape (from schema): { id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...
```

### `posthog.environmentsExternalDataSchemasPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/external_data_schemas/{id}/`
- **OpenAPI operationId**: `environments_external_data_schemas_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSchemasPartialUpdateInput = Parameters<typeof posthog.environmentsExternalDataSchemasPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasPartialUpdate>>;

const result: EnvironmentsExternalDataSchemasPartialUpdateOutput = await posthog.environmentsExternalDataSchemasPartialUpdate();

// Result shape (from schema): { id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...
```

### `posthog.environmentsExternalDataSchemasUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/external_data_schemas/{id}/`
- **OpenAPI operationId**: `environments_external_data_schemas_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSchemasUpdateInput = Parameters<typeof posthog.environmentsExternalDataSchemasUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasUpdate>>;

const result: EnvironmentsExternalDataSchemasUpdateOutput = await posthog.environmentsExternalDataSchemasUpdate();

// Result shape (from schema): { id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...
```

### `posthog.environmentsExternalDataSchemasCancelCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_schemas/{id}/cancel/`
- **OpenAPI operationId**: `environments_external_data_schemas_cancel_create`
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

type EnvironmentsExternalDataSchemasCancelCreateInput = Parameters<typeof posthog.environmentsExternalDataSchemasCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasCancelCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasCancelCreate>>;

const result: EnvironmentsExternalDataSchemasCancelCreateOutput = await posthog.environmentsExternalDataSchemasCancelCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSchemasDeleteDataDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/external_data_schemas/{id}/delete_data/`
- **OpenAPI operationId**: `environments_external_data_schemas_delete_data_destroy`
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

type EnvironmentsExternalDataSchemasDeleteDataDestroyInput = Parameters<typeof posthog.environmentsExternalDataSchemasDeleteDataDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasDeleteDataDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasDeleteDataDestroy>>;

const result: EnvironmentsExternalDataSchemasDeleteDataDestroyOutput = await posthog.environmentsExternalDataSchemasDeleteDataDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSchemasIncrementalFieldsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_schemas/{id}/incremental_fields/`
- **OpenAPI operationId**: `environments_external_data_schemas_incremental_fields_create`
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

type EnvironmentsExternalDataSchemasIncrementalFieldsCreateInput = Parameters<typeof posthog.environmentsExternalDataSchemasIncrementalFieldsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasIncrementalFieldsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasIncrementalFieldsCreate>>;

const result: EnvironmentsExternalDataSchemasIncrementalFieldsCreateOutput = await posthog.environmentsExternalDataSchemasIncrementalFieldsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSchemasLogsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_schemas/{id}/logs/`
- **OpenAPI operationId**: `environments_external_data_schemas_logs_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `instance_id`, `level`, `limit`, `search`
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

type EnvironmentsExternalDataSchemasLogsRetrieveInput = Parameters<typeof posthog.environmentsExternalDataSchemasLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasLogsRetrieve>>;

const result: EnvironmentsExternalDataSchemasLogsRetrieveOutput = await posthog.environmentsExternalDataSchemasLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSchemasReloadCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_schemas/{id}/reload/`
- **OpenAPI operationId**: `environments_external_data_schemas_reload_create`
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

type EnvironmentsExternalDataSchemasReloadCreateInput = Parameters<typeof posthog.environmentsExternalDataSchemasReloadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasReloadCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasReloadCreate>>;

const result: EnvironmentsExternalDataSchemasReloadCreateOutput = await posthog.environmentsExternalDataSchemasReloadCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSchemasResyncCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_schemas/{id}/resync/`
- **OpenAPI operationId**: `environments_external_data_schemas_resync_create`
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

type EnvironmentsExternalDataSchemasResyncCreateInput = Parameters<typeof posthog.environmentsExternalDataSchemasResyncCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSchemasResyncCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSchemasResyncCreate>>;

const result: EnvironmentsExternalDataSchemasResyncCreateOutput = await posthog.environmentsExternalDataSchemasResyncCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSchemasList`

- **HTTP**: `GET /api/projects/{project_id}/external_data_schemas/`
- **OpenAPI operationId**: `external_data_schemas_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSchemasListInput = Parameters<typeof posthog.externalDataSchemasList> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasListOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasList>>;

const result: ExternalDataSchemasListOutput = await posthog.externalDataSchemasList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null...
```

### `posthog.externalDataSchemasCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_schemas/`
- **OpenAPI operationId**: `external_data_schemas_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSchemasCreateInput = Parameters<typeof posthog.externalDataSchemasCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasCreate>>;

const result: ExternalDataSchemasCreateOutput = await posthog.externalDataSchemasCreate();

// Result shape (from schema): { id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...
```

### `posthog.externalDataSchemasDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/external_data_schemas/{id}/`
- **OpenAPI operationId**: `external_data_schemas_destroy`
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

type ExternalDataSchemasDestroyInput = Parameters<typeof posthog.externalDataSchemasDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasDestroyOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasDestroy>>;

const result: ExternalDataSchemasDestroyOutput = await posthog.externalDataSchemasDestroy();

// Result shape (from schema): unknown
```

### `posthog.externalDataSchemasRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/external_data_schemas/{id}/`
- **OpenAPI operationId**: `external_data_schemas_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSchemasRetrieveInput = Parameters<typeof posthog.externalDataSchemasRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasRetrieveOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasRetrieve>>;

const result: ExternalDataSchemasRetrieveOutput = await posthog.externalDataSchemasRetrieve();

// Result shape (from schema): { id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...
```

### `posthog.externalDataSchemasPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/external_data_schemas/{id}/`
- **OpenAPI operationId**: `external_data_schemas_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSchemasPartialUpdateInput = Parameters<typeof posthog.externalDataSchemasPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasPartialUpdateOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasPartialUpdate>>;

const result: ExternalDataSchemasPartialUpdateOutput = await posthog.externalDataSchemasPartialUpdate();

// Result shape (from schema): { id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...
```

### `posthog.externalDataSchemasUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/external_data_schemas/{id}/`
- **OpenAPI operationId**: `external_data_schemas_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSchemasUpdateInput = Parameters<typeof posthog.externalDataSchemasUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasUpdateOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasUpdate>>;

const result: ExternalDataSchemasUpdateOutput = await posthog.externalDataSchemasUpdate();

// Result shape (from schema): { id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null; latest_error: string | null; incremental: boolean; status: string | null;...
```

### `posthog.externalDataSchemasCancelCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_schemas/{id}/cancel/`
- **OpenAPI operationId**: `external_data_schemas_cancel_create`
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

type ExternalDataSchemasCancelCreateInput = Parameters<typeof posthog.externalDataSchemasCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasCancelCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasCancelCreate>>;

const result: ExternalDataSchemasCancelCreateOutput = await posthog.externalDataSchemasCancelCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSchemasDeleteDataDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/external_data_schemas/{id}/delete_data/`
- **OpenAPI operationId**: `external_data_schemas_delete_data_destroy`
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

type ExternalDataSchemasDeleteDataDestroyInput = Parameters<typeof posthog.externalDataSchemasDeleteDataDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasDeleteDataDestroyOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasDeleteDataDestroy>>;

const result: ExternalDataSchemasDeleteDataDestroyOutput = await posthog.externalDataSchemasDeleteDataDestroy();

// Result shape (from schema): unknown
```

### `posthog.externalDataSchemasIncrementalFieldsCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_schemas/{id}/incremental_fields/`
- **OpenAPI operationId**: `external_data_schemas_incremental_fields_create`
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

type ExternalDataSchemasIncrementalFieldsCreateInput = Parameters<typeof posthog.externalDataSchemasIncrementalFieldsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasIncrementalFieldsCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasIncrementalFieldsCreate>>;

const result: ExternalDataSchemasIncrementalFieldsCreateOutput = await posthog.externalDataSchemasIncrementalFieldsCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSchemasLogsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/external_data_schemas/{id}/logs/`
- **OpenAPI operationId**: `external_data_schemas_logs_retrieve`
- **Path params**: `id`
- **Query params**: `after`, `before`, `instance_id`, `level`, `limit`, `search`
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

type ExternalDataSchemasLogsRetrieveInput = Parameters<typeof posthog.externalDataSchemasLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasLogsRetrieve>>;

const result: ExternalDataSchemasLogsRetrieveOutput = await posthog.externalDataSchemasLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.externalDataSchemasReloadCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_schemas/{id}/reload/`
- **OpenAPI operationId**: `external_data_schemas_reload_create`
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

type ExternalDataSchemasReloadCreateInput = Parameters<typeof posthog.externalDataSchemasReloadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasReloadCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasReloadCreate>>;

const result: ExternalDataSchemasReloadCreateOutput = await posthog.externalDataSchemasReloadCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSchemasResyncCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_schemas/{id}/resync/`
- **OpenAPI operationId**: `external_data_schemas_resync_create`
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

type ExternalDataSchemasResyncCreateInput = Parameters<typeof posthog.externalDataSchemasResyncCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSchemasResyncCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSchemasResyncCreate>>;

const result: ExternalDataSchemasResyncCreateOutput = await posthog.externalDataSchemasResyncCreate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

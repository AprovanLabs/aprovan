# Endpoints

## Operations

### `posthog.environmentsEndpointsList`

- **HTTP**: `GET /api/environments/{environment_id}/endpoints/`
- **What it does**: List all endpoints for the team.
- **OpenAPI operationId**: `environments_endpoints_list`
- **Path params**: None
- **Query params**: `created_by`, `is_active`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsListInput = Parameters<typeof posthog.environmentsEndpointsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsListOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsList>>;

const result: EnvironmentsEndpointsListOutput = await posthog.environmentsEndpointsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: strin...
```

### `posthog.environmentsEndpointsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/endpoints/`
- **What it does**: Create a new endpoint.
- **OpenAPI operationId**: `environments_endpoints_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsCreateInput = Parameters<typeof posthog.environmentsEndpointsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsCreate>>;

const result: EnvironmentsEndpointsCreateOutput = await posthog.environmentsEndpointsCreate();

// Result shape (from schema): { id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...
```

### `posthog.environmentsEndpointsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/endpoints/{name}/`
- **What it does**: Delete an endpoint and clean up materialized query.
- **OpenAPI operationId**: `environments_endpoints_destroy`
- **Path params**: `name`
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

type EnvironmentsEndpointsDestroyInput = Parameters<typeof posthog.environmentsEndpointsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsDestroy>>;

const result: EnvironmentsEndpointsDestroyOutput = await posthog.environmentsEndpointsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsEndpointsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/endpoints/{name}/`
- **What it does**: Retrieve an endpoint, or a specific version via ?version=N.
- **OpenAPI operationId**: `environments_endpoints_retrieve`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsRetrieveInput = Parameters<typeof posthog.environmentsEndpointsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsRetrieve>>;

const result: EnvironmentsEndpointsRetrieveOutput = await posthog.environmentsEndpointsRetrieve();

// Result shape (from schema): { id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...
```

### `posthog.environmentsEndpointsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/endpoints/{name}/`
- **What it does**: Update an existing endpoint.
- **OpenAPI operationId**: `environments_endpoints_partial_update`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsPartialUpdateInput = Parameters<typeof posthog.environmentsEndpointsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsPartialUpdate>>;

const result: EnvironmentsEndpointsPartialUpdateOutput = await posthog.environmentsEndpointsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...
```

### `posthog.environmentsEndpointsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/endpoints/{name}/`
- **What it does**: Update an existing endpoint. Parameters are optional. Pass version in body or ?version=N query param to target a specific version.
- **OpenAPI operationId**: `environments_endpoints_update`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsUpdateInput = Parameters<typeof posthog.environmentsEndpointsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsUpdate>>;

const result: EnvironmentsEndpointsUpdateOutput = await posthog.environmentsEndpointsUpdate();

// Result shape (from schema): { id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...
```

### `posthog.environmentsEndpointsLogsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/endpoints/{name}/logs/`
- **OpenAPI operationId**: `environments_endpoints_logs_retrieve`
- **Path params**: `name`
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

type EnvironmentsEndpointsLogsRetrieveInput = Parameters<typeof posthog.environmentsEndpointsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsLogsRetrieve>>;

const result: EnvironmentsEndpointsLogsRetrieveOutput = await posthog.environmentsEndpointsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsEndpointsMaterializationPreviewCreate`

- **HTTP**: `POST /api/environments/{environment_id}/endpoints/{name}/materialization_preview/`
- **What it does**: Preview the materialization transform for an endpoint. Shows what the query will look like after materialization, including range pair detection and bucket functions.
- **OpenAPI operationId**: `environments_endpoints_materialization_preview_create`
- **Path params**: `name`
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

type EnvironmentsEndpointsMaterializationPreviewCreateInput = Parameters<typeof posthog.environmentsEndpointsMaterializationPreviewCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsMaterializationPreviewCreateOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsMaterializationPreviewCreate>>;

const result: EnvironmentsEndpointsMaterializationPreviewCreateOutput = await posthog.environmentsEndpointsMaterializationPreviewCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsEndpointsMaterializationStatusRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/endpoints/{name}/materialization_status/`
- **What it does**: Get materialization status for an endpoint. Supports ?version=N query param.
- **OpenAPI operationId**: `environments_endpoints_materialization_status_retrieve`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ name: string; status?: string; can_materialize: boolean; reason?: string | null; last_materialized_at?: string | null; error?: string; saved_query_id?: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsMaterializationStatusRetrieveInput = Parameters<typeof posthog.environmentsEndpointsMaterializationStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsMaterializationStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsMaterializationStatusRetrieve>>;

const result: EnvironmentsEndpointsMaterializationStatusRetrieveOutput = await posthog.environmentsEndpointsMaterializationStatusRetrieve();

// Result shape (from schema): { name: string; status?: string; can_materialize: boolean; reason?: string | null; last_materialized_at?: string | null; error?: string; saved_query_id?: string | null }
```

### `posthog.environmentsEndpointsMaterializationSuggestionCreate`

- **HTTP**: `POST /api/environments/{environment_id}/endpoints/{name}/materialization_suggestion/`
- **What it does**: Ask AI to rewrite the endpoint's query into a semantically equivalent form that can be materialized. Only applicable to SQL (HogQL) endpoints that currently fail the materialization checks. The suggestion is validated against the live checks before being returned; nothing is saved. Requires the organization's AI data processing approval.
- **OpenAPI operationId**: `environments_endpoints_materialization_suggestion_create`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ suggestion_status: "ok" | "cannot_fix" | "invalid" | "model_error"; suggested_query: string | null; explanation: string | null; attempts: number; error: string | null; original_reason: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsMaterializationSuggestionCreateInput = Parameters<typeof posthog.environmentsEndpointsMaterializationSuggestionCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsMaterializationSuggestionCreateOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsMaterializationSuggestionCreate>>;

const result: EnvironmentsEndpointsMaterializationSuggestionCreateOutput = await posthog.environmentsEndpointsMaterializationSuggestionCreate();

// Result shape (from schema): { suggestion_status: "ok" | "cannot_fix" | "invalid" | "model_error"; suggested_query: string | null; explanation: string | null; attempts: number; error: string | null; original_reason: string }
```

### `posthog.environmentsEndpointsOpenapiSpecRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/endpoints/{name}/openapi.json/`
- **What it does**: Get OpenAPI 3.0 specification for this endpoint. Use this to generate typed SDK clients.
- **OpenAPI operationId**: `environments_endpoints_openapi_spec_retrieve`
- **Path params**: `name`
- **Query params**: `version`
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

type EnvironmentsEndpointsOpenapiSpecRetrieveInput = Parameters<typeof posthog.environmentsEndpointsOpenapiSpecRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsOpenapiSpecRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsOpenapiSpecRetrieve>>;

const result: EnvironmentsEndpointsOpenapiSpecRetrieveOutput = await posthog.environmentsEndpointsOpenapiSpecRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsEndpointsRunRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/endpoints/{name}/run/`
- **What it does**: Execute endpoint with optional materialization. Supports version parameter, runs latest version if not set.
- **OpenAPI operationId**: `environments_endpoints_run_retrieve`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ name: string; execution_id?: string; results?: (unknown)[]; columns?: (string)[]; hasMore?: boolean; endpoint_version?: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsRunRetrieveInput = Parameters<typeof posthog.environmentsEndpointsRunRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsRunRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsRunRetrieve>>;

const result: EnvironmentsEndpointsRunRetrieveOutput = await posthog.environmentsEndpointsRunRetrieve();

// Result shape (from schema): { name: string; execution_id?: string; results?: (unknown)[]; columns?: (string)[]; hasMore?: boolean; endpoint_version?: number }
```

### `posthog.environmentsEndpointsRunCreate`

- **HTTP**: `POST /api/environments/{environment_id}/endpoints/{name}/run/`
- **What it does**: Execute endpoint with optional materialization. Supports version parameter, runs latest version if not set.
- **OpenAPI operationId**: `environments_endpoints_run_create`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ name: string; execution_id?: string; results?: (unknown)[]; columns?: (string)[]; hasMore?: boolean; endpoint_version?: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsRunCreateInput = Parameters<typeof posthog.environmentsEndpointsRunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsRunCreateOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsRunCreate>>;

const result: EnvironmentsEndpointsRunCreateOutput = await posthog.environmentsEndpointsRunCreate();

// Result shape (from schema): { name: string; execution_id?: string; results?: (unknown)[]; columns?: (string)[]; hasMore?: boolean; endpoint_version?: number }
```

### `posthog.environmentsEndpointsVersionsList`

- **HTTP**: `GET /api/environments/{environment_id}/endpoints/{name}/versions/`
- **What it does**: List all versions for an endpoint.
- **OpenAPI operationId**: `environments_endpoints_versions_list`
- **Path params**: `name`
- **Query params**: `created_by`, `is_active`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsVersionsListInput = Parameters<typeof posthog.environmentsEndpointsVersionsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsVersionsListOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsVersionsList>>;

const result: EnvironmentsEndpointsVersionsListOutput = await posthog.environmentsEndpointsVersionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: strin...
```

### `posthog.environmentsEndpointsLastExecutionTimesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/endpoints/last_execution_times/`
- **What it does**: Get the most recent execution time per endpoint (endpoint-level). Timestamps are recorded by the run path for personal-API-key calls. For per-version usage, query the query_log table directly.
- **OpenAPI operationId**: `environments_endpoints_last_execution_times_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ query_status: { complete?: boolean | null; dashboard_id?: number | null; end_time?: string | null; error?: boolean | null; error_code?: string | null; error_message?: string | null; expiration_time?: string | null; id...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsLastExecutionTimesCreateInput = Parameters<typeof posthog.environmentsEndpointsLastExecutionTimesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsLastExecutionTimesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsLastExecutionTimesCreate>>;

const result: EnvironmentsEndpointsLastExecutionTimesCreateOutput = await posthog.environmentsEndpointsLastExecutionTimesCreate();

// Result shape (from schema): { query_status: { complete?: boolean | null; dashboard_id?: number | null; end_time?: string | null; error?: boolean | null; error_code?: string | null; error_message?: string | null; expiration_time?: string | null; id...
```

### `posthog.environmentsEndpointsMaterializationConditionsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/endpoints/materialization_conditions/`
- **What it does**: Get the source code of the live materialization checks, plus the rewrite contract. Lets an agent rewrite a rejected endpoint query itself: fetch these conditions, produce a semantically equivalent query that passes every check, update the endpoint with it, then confirm via materialization_status. The source is read from the running system, so it always matches the checks this instance enforces.
- **OpenAPI operationId**: `environments_endpoints_materialization_conditions_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ conditions_source: string; rewrite_contract: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEndpointsMaterializationConditionsRetrieveInput = Parameters<typeof posthog.environmentsEndpointsMaterializationConditionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEndpointsMaterializationConditionsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEndpointsMaterializationConditionsRetrieve>>;

const result: EnvironmentsEndpointsMaterializationConditionsRetrieveOutput = await posthog.environmentsEndpointsMaterializationConditionsRetrieve();

// Result shape (from schema): { conditions_source: string; rewrite_contract: string }
```

### `posthog.endpointsList`

- **HTTP**: `GET /api/projects/{project_id}/endpoints/`
- **What it does**: List all endpoints for the team.
- **OpenAPI operationId**: `endpoints_list`
- **Path params**: None
- **Query params**: `created_by`, `is_active`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsListInput = Parameters<typeof posthog.endpointsList> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsListOutput = Awaited<ReturnType<typeof posthog.endpointsList>>;

const result: EndpointsListOutput = await posthog.endpointsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: strin...
```

### `posthog.endpointsCreate`

- **HTTP**: `POST /api/projects/{project_id}/endpoints/`
- **What it does**: Create a new endpoint.
- **OpenAPI operationId**: `endpoints_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EndpointsCreateInput = Parameters<typeof posthog.endpointsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsCreateOutput = Awaited<ReturnType<typeof posthog.endpointsCreate>>;

const result: EndpointsCreateOutput = await posthog.endpointsCreate();

// Result shape (from schema): { id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...
```

### `posthog.endpointsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/endpoints/{name}/`
- **What it does**: Delete an endpoint and clean up materialized query.
- **OpenAPI operationId**: `endpoints_destroy`
- **Path params**: `name`
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

type EndpointsDestroyInput = Parameters<typeof posthog.endpointsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsDestroyOutput = Awaited<ReturnType<typeof posthog.endpointsDestroy>>;

const result: EndpointsDestroyOutput = await posthog.endpointsDestroy();

// Result shape (from schema): unknown
```

### `posthog.endpointsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/endpoints/{name}/`
- **What it does**: Retrieve an endpoint, or a specific version via ?version=N.
- **OpenAPI operationId**: `endpoints_retrieve`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsRetrieveInput = Parameters<typeof posthog.endpointsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsRetrieveOutput = Awaited<ReturnType<typeof posthog.endpointsRetrieve>>;

const result: EndpointsRetrieveOutput = await posthog.endpointsRetrieve();

// Result shape (from schema): { id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...
```

### `posthog.endpointsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/endpoints/{name}/`
- **What it does**: Update an existing endpoint.
- **OpenAPI operationId**: `endpoints_partial_update`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsPartialUpdateInput = Parameters<typeof posthog.endpointsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.endpointsPartialUpdate>>;

const result: EndpointsPartialUpdateOutput = await posthog.endpointsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...
```

### `posthog.endpointsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/endpoints/{name}/`
- **What it does**: Update an existing endpoint. Parameters are optional. Pass version in body or ?version=N query param to target a specific version.
- **OpenAPI operationId**: `endpoints_update`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsUpdateInput = Parameters<typeof posthog.endpointsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsUpdateOutput = Awaited<ReturnType<typeof posthog.endpointsUpdate>>;

const result: EndpointsUpdateOutput = await posthog.endpointsUpdate();

// Result shape (from schema): { id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: string; url: string | null; ui_url: string | null; created_at: string; updated_a...
```

### `posthog.endpointsLogsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/endpoints/{name}/logs/`
- **OpenAPI operationId**: `endpoints_logs_retrieve`
- **Path params**: `name`
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

type EndpointsLogsRetrieveInput = Parameters<typeof posthog.endpointsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.endpointsLogsRetrieve>>;

const result: EndpointsLogsRetrieveOutput = await posthog.endpointsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.endpointsMaterializationPreviewCreate`

- **HTTP**: `POST /api/projects/{project_id}/endpoints/{name}/materialization_preview/`
- **What it does**: Preview the materialization transform for an endpoint. Shows what the query will look like after materialization, including range pair detection and bucket functions.
- **OpenAPI operationId**: `endpoints_materialization_preview_create`
- **Path params**: `name`
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

type EndpointsMaterializationPreviewCreateInput = Parameters<typeof posthog.endpointsMaterializationPreviewCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsMaterializationPreviewCreateOutput = Awaited<ReturnType<typeof posthog.endpointsMaterializationPreviewCreate>>;

const result: EndpointsMaterializationPreviewCreateOutput = await posthog.endpointsMaterializationPreviewCreate();

// Result shape (from schema): unknown
```

### `posthog.endpointsMaterializationStatusRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/endpoints/{name}/materialization_status/`
- **What it does**: Get materialization status for an endpoint. Supports ?version=N query param.
- **OpenAPI operationId**: `endpoints_materialization_status_retrieve`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ name: string; status?: string; can_materialize: boolean; reason?: string | null; last_materialized_at?: string | null; error?: string; saved_query_id?: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsMaterializationStatusRetrieveInput = Parameters<typeof posthog.endpointsMaterializationStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsMaterializationStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.endpointsMaterializationStatusRetrieve>>;

const result: EndpointsMaterializationStatusRetrieveOutput = await posthog.endpointsMaterializationStatusRetrieve();

// Result shape (from schema): { name: string; status?: string; can_materialize: boolean; reason?: string | null; last_materialized_at?: string | null; error?: string; saved_query_id?: string | null }
```

### `posthog.endpointsMaterializationSuggestionCreate`

- **HTTP**: `POST /api/projects/{project_id}/endpoints/{name}/materialization_suggestion/`
- **What it does**: Ask AI to rewrite the endpoint's query into a semantically equivalent form that can be materialized. Only applicable to SQL (HogQL) endpoints that currently fail the materialization checks. The suggestion is validated against the live checks before being returned; nothing is saved. Requires the organization's AI data processing approval.
- **OpenAPI operationId**: `endpoints_materialization_suggestion_create`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ suggestion_status: "ok" | "cannot_fix" | "invalid" | "model_error"; suggested_query: string | null; explanation: string | null; attempts: number; error: string | null; original_reason: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsMaterializationSuggestionCreateInput = Parameters<typeof posthog.endpointsMaterializationSuggestionCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsMaterializationSuggestionCreateOutput = Awaited<ReturnType<typeof posthog.endpointsMaterializationSuggestionCreate>>;

const result: EndpointsMaterializationSuggestionCreateOutput = await posthog.endpointsMaterializationSuggestionCreate();

// Result shape (from schema): { suggestion_status: "ok" | "cannot_fix" | "invalid" | "model_error"; suggested_query: string | null; explanation: string | null; attempts: number; error: string | null; original_reason: string }
```

### `posthog.endpointsOpenapiSpecRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/endpoints/{name}/openapi.json/`
- **What it does**: Get OpenAPI 3.0 specification for this endpoint. Use this to generate typed SDK clients.
- **OpenAPI operationId**: `endpoints_openapi_spec_retrieve`
- **Path params**: `name`
- **Query params**: `version`
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

type EndpointsOpenapiSpecRetrieveInput = Parameters<typeof posthog.endpointsOpenapiSpecRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsOpenapiSpecRetrieveOutput = Awaited<ReturnType<typeof posthog.endpointsOpenapiSpecRetrieve>>;

const result: EndpointsOpenapiSpecRetrieveOutput = await posthog.endpointsOpenapiSpecRetrieve();

// Result shape (from schema): unknown
```

### `posthog.endpointsRunRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/endpoints/{name}/run/`
- **What it does**: Execute endpoint with optional materialization. Supports version parameter, runs latest version if not set.
- **OpenAPI operationId**: `endpoints_run_retrieve`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ name: string; execution_id?: string; results?: (unknown)[]; columns?: (string)[]; hasMore?: boolean; endpoint_version?: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsRunRetrieveInput = Parameters<typeof posthog.endpointsRunRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsRunRetrieveOutput = Awaited<ReturnType<typeof posthog.endpointsRunRetrieve>>;

const result: EndpointsRunRetrieveOutput = await posthog.endpointsRunRetrieve();

// Result shape (from schema): { name: string; execution_id?: string; results?: (unknown)[]; columns?: (string)[]; hasMore?: boolean; endpoint_version?: number }
```

### `posthog.endpointsRunCreate`

- **HTTP**: `POST /api/projects/{project_id}/endpoints/{name}/run/`
- **What it does**: Execute endpoint with optional materialization. Supports version parameter, runs latest version if not set.
- **OpenAPI operationId**: `endpoints_run_create`
- **Path params**: `name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ name: string; execution_id?: string; results?: (unknown)[]; columns?: (string)[]; hasMore?: boolean; endpoint_version?: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsRunCreateInput = Parameters<typeof posthog.endpointsRunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsRunCreateOutput = Awaited<ReturnType<typeof posthog.endpointsRunCreate>>;

const result: EndpointsRunCreateOutput = await posthog.endpointsRunCreate();

// Result shape (from schema): { name: string; execution_id?: string; results?: (unknown)[]; columns?: (string)[]; hasMore?: boolean; endpoint_version?: number }
```

### `posthog.endpointsVersionsList`

- **HTTP**: `GET /api/projects/{project_id}/endpoints/{name}/versions/`
- **What it does**: List all versions for an endpoint.
- **OpenAPI operationId**: `endpoints_versions_list`
- **Path params**: `name`
- **Query params**: `created_by`, `is_active`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsVersionsListInput = Parameters<typeof posthog.endpointsVersionsList> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsVersionsListOutput = Awaited<ReturnType<typeof posthog.endpointsVersionsList>>;

const result: EndpointsVersionsListOutput = await posthog.endpointsVersionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string | null; query: unknown; is_active: boolean; data_freshness_seconds: number; endpoint_path: strin...
```

### `posthog.endpointsLastExecutionTimesCreate`

- **HTTP**: `POST /api/projects/{project_id}/endpoints/last_execution_times/`
- **What it does**: Get the most recent execution time per endpoint (endpoint-level). Timestamps are recorded by the run path for personal-API-key calls. For per-version usage, query the query_log table directly.
- **OpenAPI operationId**: `endpoints_last_execution_times_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ query_status: { complete?: boolean | null; dashboard_id?: number | null; end_time?: string | null; error?: boolean | null; error_code?: string | null; error_message?: string | null; expiration_time?: string | null; id...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsLastExecutionTimesCreateInput = Parameters<typeof posthog.endpointsLastExecutionTimesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsLastExecutionTimesCreateOutput = Awaited<ReturnType<typeof posthog.endpointsLastExecutionTimesCreate>>;

const result: EndpointsLastExecutionTimesCreateOutput = await posthog.endpointsLastExecutionTimesCreate();

// Result shape (from schema): { query_status: { complete?: boolean | null; dashboard_id?: number | null; end_time?: string | null; error?: boolean | null; error_code?: string | null; error_message?: string | null; expiration_time?: string | null; id...
```

### `posthog.endpointsMaterializationConditionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/endpoints/materialization_conditions/`
- **What it does**: Get the source code of the live materialization checks, plus the rewrite contract. Lets an agent rewrite a rejected endpoint query itself: fetch these conditions, produce a semantically equivalent query that passes every check, update the endpoint with it, then confirm via materialization_status. The source is read from the running system, so it always matches the checks this instance enforces.
- **OpenAPI operationId**: `endpoints_materialization_conditions_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ conditions_source: string; rewrite_contract: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EndpointsMaterializationConditionsRetrieveInput = Parameters<typeof posthog.endpointsMaterializationConditionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EndpointsMaterializationConditionsRetrieveOutput = Awaited<ReturnType<typeof posthog.endpointsMaterializationConditionsRetrieve>>;

const result: EndpointsMaterializationConditionsRetrieveOutput = await posthog.endpointsMaterializationConditionsRetrieve();

// Result shape (from schema): { conditions_source: string; rewrite_contract: string }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

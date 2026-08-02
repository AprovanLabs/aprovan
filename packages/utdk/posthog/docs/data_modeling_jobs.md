# Data Modeling Jobs

## Operations

### `posthog.environmentsDataModelingJobsList`

- **HTTP**: `GET /api/environments/{environment_id}/data_modeling_jobs/`
- **What it does**: List data modeling jobs which are "runs" for our saved queries.
- **OpenAPI operationId**: `environments_data_modeling_jobs_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `saved_query_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataModelingJobsListInput = Parameters<typeof posthog.environmentsDataModelingJobsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataModelingJobsListOutput = Awaited<ReturnType<typeof posthog.environmentsDataModelingJobsList>>;

const result: EnvironmentsDataModelingJobsListOutput = await posthog.environmentsDataModelingJobsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string ...
```

### `posthog.environmentsDataModelingJobsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_modeling_jobs/{id}/`
- **What it does**: List data modeling jobs which are "runs" for our saved queries.
- **OpenAPI operationId**: `environments_data_modeling_jobs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataModelingJobsRetrieveInput = Parameters<typeof posthog.environmentsDataModelingJobsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataModelingJobsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataModelingJobsRetrieve>>;

const result: EnvironmentsDataModelingJobsRetrieveOutput = await posthog.environmentsDataModelingJobsRetrieve();

// Result shape (from schema): { id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...
```

### `posthog.environmentsDataModelingJobsRecentRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_modeling_jobs/recent/`
- **What it does**: Get the most recent non-running job for each saved query from the v2 backend.
- **OpenAPI operationId**: `environments_data_modeling_jobs_recent_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataModelingJobsRecentRetrieveInput = Parameters<typeof posthog.environmentsDataModelingJobsRecentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataModelingJobsRecentRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataModelingJobsRecentRetrieve>>;

const result: EnvironmentsDataModelingJobsRecentRetrieveOutput = await posthog.environmentsDataModelingJobsRecentRetrieve();

// Result shape (from schema): { id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...
```

### `posthog.environmentsDataModelingJobsRunningRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_modeling_jobs/running/`
- **What it does**: Get all currently running jobs from the v2 backend.
- **OpenAPI operationId**: `environments_data_modeling_jobs_running_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataModelingJobsRunningRetrieveInput = Parameters<typeof posthog.environmentsDataModelingJobsRunningRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataModelingJobsRunningRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataModelingJobsRunningRetrieve>>;

const result: EnvironmentsDataModelingJobsRunningRetrieveOutput = await posthog.environmentsDataModelingJobsRunningRetrieve();

// Result shape (from schema): { id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...
```

### `posthog.dataModelingJobsList`

- **HTTP**: `GET /api/projects/{project_id}/data_modeling_jobs/`
- **What it does**: List data modeling jobs which are "runs" for our saved queries.
- **OpenAPI operationId**: `data_modeling_jobs_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `saved_query_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataModelingJobsListInput = Parameters<typeof posthog.dataModelingJobsList> extends [infer T, ...unknown[]] ? T : undefined;
type DataModelingJobsListOutput = Awaited<ReturnType<typeof posthog.dataModelingJobsList>>;

const result: DataModelingJobsListOutput = await posthog.dataModelingJobsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string ...
```

### `posthog.dataModelingJobsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_modeling_jobs/{id}/`
- **What it does**: List data modeling jobs which are "runs" for our saved queries.
- **OpenAPI operationId**: `data_modeling_jobs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataModelingJobsRetrieveInput = Parameters<typeof posthog.dataModelingJobsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataModelingJobsRetrieveOutput = Awaited<ReturnType<typeof posthog.dataModelingJobsRetrieve>>;

const result: DataModelingJobsRetrieveOutput = await posthog.dataModelingJobsRetrieve();

// Result shape (from schema): { id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...
```

### `posthog.dataModelingJobsRecentRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_modeling_jobs/recent/`
- **What it does**: Get the most recent non-running job for each saved query from the v2 backend.
- **OpenAPI operationId**: `data_modeling_jobs_recent_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataModelingJobsRecentRetrieveInput = Parameters<typeof posthog.dataModelingJobsRecentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataModelingJobsRecentRetrieveOutput = Awaited<ReturnType<typeof posthog.dataModelingJobsRecentRetrieve>>;

const result: DataModelingJobsRecentRetrieveOutput = await posthog.dataModelingJobsRecentRetrieve();

// Result shape (from schema): { id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...
```

### `posthog.dataModelingJobsRunningRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_modeling_jobs/running/`
- **What it does**: Get all currently running jobs from the v2 backend.
- **OpenAPI operationId**: `data_modeling_jobs_running_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataModelingJobsRunningRetrieveInput = Parameters<typeof posthog.dataModelingJobsRunningRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataModelingJobsRunningRetrieveOutput = Awaited<ReturnType<typeof posthog.dataModelingJobsRunningRetrieve>>;

const result: DataModelingJobsRunningRetrieveOutput = await posthog.dataModelingJobsRunningRetrieve();

// Result shape (from schema): { id: string; saved_query_id: string | null; status: "Cancelled" | "Completed" | "Failed" | "Running"; rows_materialized: number; error: string | null; created_at: string; last_run_at: string; workflow_id: string | null...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# Data Warehouse

## Operations

### `posthog.environmentsDataWarehouseCheckDatabaseNameRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_warehouse/check-database-name/`
- **What it does**: Check if a database name is available.
- **OpenAPI operationId**: `environments_data_warehouse_check_database_name_retrieve`
- **Path params**: None
- **Query params**: `name`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ name: string; available: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataWarehouseCheckDatabaseNameRetrieveInput = Parameters<typeof posthog.environmentsDataWarehouseCheckDatabaseNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseCheckDatabaseNameRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseCheckDatabaseNameRetrieve>>;

const result: EnvironmentsDataWarehouseCheckDatabaseNameRetrieveOutput = await posthog.environmentsDataWarehouseCheckDatabaseNameRetrieve();

// Result shape (from schema): { name: string; available: boolean }
```

### `posthog.environmentsDataWarehouseCompletedActivityRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_warehouse/completed_activity/`
- **What it does**: Returns completed/non-running activities (jobs with status 'Completed').
Supports pagination and cutoff time filtering.
- **OpenAPI operationId**: `environments_data_warehouse_completed_activity_retrieve`
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

type EnvironmentsDataWarehouseCompletedActivityRetrieveInput = Parameters<typeof posthog.environmentsDataWarehouseCompletedActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseCompletedActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseCompletedActivityRetrieve>>;

const result: EnvironmentsDataWarehouseCompletedActivityRetrieveOutput = await posthog.environmentsDataWarehouseCompletedActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsDataWarehouseDataHealthIssuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_warehouse/data_health_issues/`
- **What it does**: Returns failed/disabled data pipeline items for the Pipeline status side panel.
Includes: materializations, syncs, sources, destinations, and transformations.
- **OpenAPI operationId**: `environments_data_warehouse_data_health_issues_retrieve`
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

type EnvironmentsDataWarehouseDataHealthIssuesRetrieveInput = Parameters<typeof posthog.environmentsDataWarehouseDataHealthIssuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseDataHealthIssuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseDataHealthIssuesRetrieve>>;

const result: EnvironmentsDataWarehouseDataHealthIssuesRetrieveOutput = await posthog.environmentsDataWarehouseDataHealthIssuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsDataWarehouseDataOpsDashboardRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_warehouse/data_ops_dashboard/`
- **What it does**: Returns the data ops overview dashboard ID for this team, creating it if it doesn't exist yet.
- **OpenAPI operationId**: `environments_data_warehouse_data_ops_dashboard_retrieve`
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

type EnvironmentsDataWarehouseDataOpsDashboardRetrieveInput = Parameters<typeof posthog.environmentsDataWarehouseDataOpsDashboardRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseDataOpsDashboardRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseDataOpsDashboardRetrieve>>;

const result: EnvironmentsDataWarehouseDataOpsDashboardRetrieveOutput = await posthog.environmentsDataWarehouseDataOpsDashboardRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsDataWarehouseDeleteOrgDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/data_warehouse/delete-org/`
- **What it does**: Remove the organization's provisioning record after teardown, freeing its warehouse name.

Called once the warehouse status reports `deleted`: deprovision tears the warehouse
down, this removes the now-empty org row so the database_name can be reused. Restricted
to organization admins.
- **OpenAPI operationId**: `environments_data_warehouse_delete_org_destroy`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status?: string; org?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataWarehouseDeleteOrgDestroyInput = Parameters<typeof posthog.environmentsDataWarehouseDeleteOrgDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseDeleteOrgDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseDeleteOrgDestroy>>;

const result: EnvironmentsDataWarehouseDeleteOrgDestroyOutput = await posthog.environmentsDataWarehouseDeleteOrgDestroy();

// Result shape (from schema): { status?: string; org?: string }
```

### `posthog.environmentsDataWarehouseDeprovisionCreate`

- **HTTP**: `POST /api/environments/{environment_id}/data_warehouse/deprovision/`
- **What it does**: Start deprovisioning the organization's managed warehouse. Restricted to organization admins.
- **OpenAPI operationId**: `environments_data_warehouse_deprovision_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataWarehouseDeprovisionCreateInput = Parameters<typeof posthog.environmentsDataWarehouseDeprovisionCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseDeprovisionCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseDeprovisionCreate>>;

const result: EnvironmentsDataWarehouseDeprovisionCreateOutput = await posthog.environmentsDataWarehouseDeprovisionCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsDataWarehouseEnableBackfillCreate`

- **HTTP**: `POST /api/environments/{environment_id}/data_warehouse/enable_backfill/`
- **What it does**: Enable warehouse backfill for this environment with a dedicated set of tables.

Requires a table name and records the environment's membership in the
organization's managed warehouse. Restricted to organization admins.
- **OpenAPI operationId**: `environments_data_warehouse_enable_backfill_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ enabled: boolean; table_suffix: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataWarehouseEnableBackfillCreateInput = Parameters<typeof posthog.environmentsDataWarehouseEnableBackfillCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseEnableBackfillCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseEnableBackfillCreate>>;

const result: EnvironmentsDataWarehouseEnableBackfillCreateOutput = await posthog.environmentsDataWarehouseEnableBackfillCreate();

// Result shape (from schema): { enabled: boolean; table_suffix: string }
```

### `posthog.environmentsDataWarehouseJobStatsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_warehouse/job_stats/`
- **What it does**: Returns success and failed job statistics for the last 1, 7, or 30 days.
Query parameter 'days' can be 1, 7, or 30 (default: 7).
- **OpenAPI operationId**: `environments_data_warehouse_job_stats_retrieve`
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

type EnvironmentsDataWarehouseJobStatsRetrieveInput = Parameters<typeof posthog.environmentsDataWarehouseJobStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseJobStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseJobStatsRetrieve>>;

const result: EnvironmentsDataWarehouseJobStatsRetrieveOutput = await posthog.environmentsDataWarehouseJobStatsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsDataWarehousePropertyValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_warehouse/property_values/`
- **What it does**: API endpoints for data warehouse aggregate statistics and operations.
- **OpenAPI operationId**: `environments_data_warehouse_property_values_retrieve`
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

type EnvironmentsDataWarehousePropertyValuesRetrieveInput = Parameters<typeof posthog.environmentsDataWarehousePropertyValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehousePropertyValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehousePropertyValuesRetrieve>>;

const result: EnvironmentsDataWarehousePropertyValuesRetrieveOutput = await posthog.environmentsDataWarehousePropertyValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsDataWarehouseProvisionCreate`

- **HTTP**: `POST /api/environments/{environment_id}/data_warehouse/provision/`
- **What it does**: Start provisioning a managed warehouse for this organization (shared by all its teams).
- **OpenAPI operationId**: `environments_data_warehouse_provision_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataWarehouseProvisionCreateInput = Parameters<typeof posthog.environmentsDataWarehouseProvisionCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseProvisionCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseProvisionCreate>>;

const result: EnvironmentsDataWarehouseProvisionCreateOutput = await posthog.environmentsDataWarehouseProvisionCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsDataWarehouseResetPasswordCreate`

- **HTTP**: `POST /api/environments/{environment_id}/data_warehouse/reset-password/`
- **What it does**: Reset the root password for the managed warehouse.
- **OpenAPI operationId**: `environments_data_warehouse_reset_password_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ username: string; password: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataWarehouseResetPasswordCreateInput = Parameters<typeof posthog.environmentsDataWarehouseResetPasswordCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseResetPasswordCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseResetPasswordCreate>>;

const result: EnvironmentsDataWarehouseResetPasswordCreateOutput = await posthog.environmentsDataWarehouseResetPasswordCreate();

// Result shape (from schema): { username: string; password: string }
```

### `posthog.environmentsDataWarehouseRunningActivityRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_warehouse/running_activity/`
- **What it does**: Returns currently running activities (jobs with status 'Running').
Supports pagination and cutoff time filtering.
- **OpenAPI operationId**: `environments_data_warehouse_running_activity_retrieve`
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

type EnvironmentsDataWarehouseRunningActivityRetrieveInput = Parameters<typeof posthog.environmentsDataWarehouseRunningActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseRunningActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseRunningActivityRetrieve>>;

const result: EnvironmentsDataWarehouseRunningActivityRetrieveOutput = await posthog.environmentsDataWarehouseRunningActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsDataWarehouseTotalRowsStatsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_warehouse/total_rows_stats/`
- **What it does**: Returns aggregated statistics for the data warehouse total rows processed within the current billing period.
Used by the frontend data warehouse scene to display usage information.
- **OpenAPI operationId**: `environments_data_warehouse_total_rows_stats_retrieve`
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

type EnvironmentsDataWarehouseTotalRowsStatsRetrieveInput = Parameters<typeof posthog.environmentsDataWarehouseTotalRowsStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseTotalRowsStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseTotalRowsStatsRetrieve>>;

const result: EnvironmentsDataWarehouseTotalRowsStatsRetrieveOutput = await posthog.environmentsDataWarehouseTotalRowsStatsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsDataWarehouseWarehouseStatusRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/data_warehouse/warehouse_status/`
- **What it does**: Get the current provisioning status of the managed warehouse, with this project's backfill state.
- **OpenAPI operationId**: `environments_data_warehouse_warehouse_status_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ org_id: string; state: "pending" | "provisioning" | "ready" | "failed" | "deleting" | "deleted"; status_message: string; s3_state: string; metadata_store_state: string; identity_state: string; secrets_state: string; r...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDataWarehouseWarehouseStatusRetrieveInput = Parameters<typeof posthog.environmentsDataWarehouseWarehouseStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDataWarehouseWarehouseStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDataWarehouseWarehouseStatusRetrieve>>;

const result: EnvironmentsDataWarehouseWarehouseStatusRetrieveOutput = await posthog.environmentsDataWarehouseWarehouseStatusRetrieve();

// Result shape (from schema): { org_id: string; state: "pending" | "provisioning" | "ready" | "failed" | "deleting" | "deleted"; status_message: string; s3_state: string; metadata_store_state: string; identity_state: string; secrets_state: string; r...
```

### `posthog.dataWarehouseCheckDatabaseNameRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_warehouse/check-database-name/`
- **What it does**: Check if a database name is available.
- **OpenAPI operationId**: `data_warehouse_check_database_name_retrieve`
- **Path params**: None
- **Query params**: `name`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ name: string; available: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataWarehouseCheckDatabaseNameRetrieveInput = Parameters<typeof posthog.dataWarehouseCheckDatabaseNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseCheckDatabaseNameRetrieveOutput = Awaited<ReturnType<typeof posthog.dataWarehouseCheckDatabaseNameRetrieve>>;

const result: DataWarehouseCheckDatabaseNameRetrieveOutput = await posthog.dataWarehouseCheckDatabaseNameRetrieve();

// Result shape (from schema): { name: string; available: boolean }
```

### `posthog.dataWarehouseCompletedActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_warehouse/completed_activity/`
- **What it does**: Returns completed/non-running activities (jobs with status 'Completed').
Supports pagination and cutoff time filtering.
- **OpenAPI operationId**: `data_warehouse_completed_activity_retrieve`
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

type DataWarehouseCompletedActivityRetrieveInput = Parameters<typeof posthog.dataWarehouseCompletedActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseCompletedActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.dataWarehouseCompletedActivityRetrieve>>;

const result: DataWarehouseCompletedActivityRetrieveOutput = await posthog.dataWarehouseCompletedActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.dataWarehouseDataHealthIssuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_warehouse/data_health_issues/`
- **What it does**: Returns failed/disabled data pipeline items for the Pipeline status side panel.
Includes: materializations, syncs, sources, destinations, and transformations.
- **OpenAPI operationId**: `data_warehouse_data_health_issues_retrieve`
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

type DataWarehouseDataHealthIssuesRetrieveInput = Parameters<typeof posthog.dataWarehouseDataHealthIssuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseDataHealthIssuesRetrieveOutput = Awaited<ReturnType<typeof posthog.dataWarehouseDataHealthIssuesRetrieve>>;

const result: DataWarehouseDataHealthIssuesRetrieveOutput = await posthog.dataWarehouseDataHealthIssuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.dataWarehouseDataOpsDashboardRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_warehouse/data_ops_dashboard/`
- **What it does**: Returns the data ops overview dashboard ID for this team, creating it if it doesn't exist yet.
- **OpenAPI operationId**: `data_warehouse_data_ops_dashboard_retrieve`
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

type DataWarehouseDataOpsDashboardRetrieveInput = Parameters<typeof posthog.dataWarehouseDataOpsDashboardRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseDataOpsDashboardRetrieveOutput = Awaited<ReturnType<typeof posthog.dataWarehouseDataOpsDashboardRetrieve>>;

const result: DataWarehouseDataOpsDashboardRetrieveOutput = await posthog.dataWarehouseDataOpsDashboardRetrieve();

// Result shape (from schema): unknown
```

### `posthog.dataWarehouseDeleteOrgDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/data_warehouse/delete-org/`
- **What it does**: Remove the organization's provisioning record after teardown, freeing its warehouse name.

Called once the warehouse status reports `deleted`: deprovision tears the warehouse
down, this removes the now-empty org row so the database_name can be reused. Restricted
to organization admins.
- **OpenAPI operationId**: `data_warehouse_delete_org_destroy`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status?: string; org?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataWarehouseDeleteOrgDestroyInput = Parameters<typeof posthog.dataWarehouseDeleteOrgDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseDeleteOrgDestroyOutput = Awaited<ReturnType<typeof posthog.dataWarehouseDeleteOrgDestroy>>;

const result: DataWarehouseDeleteOrgDestroyOutput = await posthog.dataWarehouseDeleteOrgDestroy();

// Result shape (from schema): { status?: string; org?: string }
```

### `posthog.dataWarehouseDeprovisionCreate`

- **HTTP**: `POST /api/projects/{project_id}/data_warehouse/deprovision/`
- **What it does**: Start deprovisioning the organization's managed warehouse. Restricted to organization admins.
- **OpenAPI operationId**: `data_warehouse_deprovision_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`

```ts
import posthog from "@utdk/posthog";

type DataWarehouseDeprovisionCreateInput = Parameters<typeof posthog.dataWarehouseDeprovisionCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseDeprovisionCreateOutput = Awaited<ReturnType<typeof posthog.dataWarehouseDeprovisionCreate>>;

const result: DataWarehouseDeprovisionCreateOutput = await posthog.dataWarehouseDeprovisionCreate();

// Result shape (from schema): unknown
```

### `posthog.dataWarehouseEnableBackfillCreate`

- **HTTP**: `POST /api/projects/{project_id}/data_warehouse/enable_backfill/`
- **What it does**: Enable warehouse backfill for this environment with a dedicated set of tables.

Requires a table name and records the environment's membership in the
organization's managed warehouse. Restricted to organization admins.
- **OpenAPI operationId**: `data_warehouse_enable_backfill_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ enabled: boolean; table_suffix: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataWarehouseEnableBackfillCreateInput = Parameters<typeof posthog.dataWarehouseEnableBackfillCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseEnableBackfillCreateOutput = Awaited<ReturnType<typeof posthog.dataWarehouseEnableBackfillCreate>>;

const result: DataWarehouseEnableBackfillCreateOutput = await posthog.dataWarehouseEnableBackfillCreate();

// Result shape (from schema): { enabled: boolean; table_suffix: string }
```

### `posthog.dataWarehouseJobStatsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_warehouse/job_stats/`
- **What it does**: Returns success and failed job statistics for the last 1, 7, or 30 days.
Query parameter 'days' can be 1, 7, or 30 (default: 7).
- **OpenAPI operationId**: `data_warehouse_job_stats_retrieve`
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

type DataWarehouseJobStatsRetrieveInput = Parameters<typeof posthog.dataWarehouseJobStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseJobStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.dataWarehouseJobStatsRetrieve>>;

const result: DataWarehouseJobStatsRetrieveOutput = await posthog.dataWarehouseJobStatsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.dataWarehousePropertyValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_warehouse/property_values/`
- **What it does**: API endpoints for data warehouse aggregate statistics and operations.
- **OpenAPI operationId**: `data_warehouse_property_values_retrieve`
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

type DataWarehousePropertyValuesRetrieveInput = Parameters<typeof posthog.dataWarehousePropertyValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehousePropertyValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.dataWarehousePropertyValuesRetrieve>>;

const result: DataWarehousePropertyValuesRetrieveOutput = await posthog.dataWarehousePropertyValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.dataWarehouseProvisionCreate`

- **HTTP**: `POST /api/projects/{project_id}/data_warehouse/provision/`
- **What it does**: Start provisioning a managed warehouse for this organization (shared by all its teams).
- **OpenAPI operationId**: `data_warehouse_provision_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`

```ts
import posthog from "@utdk/posthog";

type DataWarehouseProvisionCreateInput = Parameters<typeof posthog.dataWarehouseProvisionCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseProvisionCreateOutput = Awaited<ReturnType<typeof posthog.dataWarehouseProvisionCreate>>;

const result: DataWarehouseProvisionCreateOutput = await posthog.dataWarehouseProvisionCreate();

// Result shape (from schema): unknown
```

### `posthog.dataWarehouseResetPasswordCreate`

- **HTTP**: `POST /api/projects/{project_id}/data_warehouse/reset-password/`
- **What it does**: Reset the root password for the managed warehouse.
- **OpenAPI operationId**: `data_warehouse_reset_password_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ username: string; password: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataWarehouseResetPasswordCreateInput = Parameters<typeof posthog.dataWarehouseResetPasswordCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseResetPasswordCreateOutput = Awaited<ReturnType<typeof posthog.dataWarehouseResetPasswordCreate>>;

const result: DataWarehouseResetPasswordCreateOutput = await posthog.dataWarehouseResetPasswordCreate();

// Result shape (from schema): { username: string; password: string }
```

### `posthog.dataWarehouseRunningActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_warehouse/running_activity/`
- **What it does**: Returns currently running activities (jobs with status 'Running').
Supports pagination and cutoff time filtering.
- **OpenAPI operationId**: `data_warehouse_running_activity_retrieve`
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

type DataWarehouseRunningActivityRetrieveInput = Parameters<typeof posthog.dataWarehouseRunningActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseRunningActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.dataWarehouseRunningActivityRetrieve>>;

const result: DataWarehouseRunningActivityRetrieveOutput = await posthog.dataWarehouseRunningActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.dataWarehouseTotalRowsStatsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_warehouse/total_rows_stats/`
- **What it does**: Returns aggregated statistics for the data warehouse total rows processed within the current billing period.
Used by the frontend data warehouse scene to display usage information.
- **OpenAPI operationId**: `data_warehouse_total_rows_stats_retrieve`
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

type DataWarehouseTotalRowsStatsRetrieveInput = Parameters<typeof posthog.dataWarehouseTotalRowsStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseTotalRowsStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.dataWarehouseTotalRowsStatsRetrieve>>;

const result: DataWarehouseTotalRowsStatsRetrieveOutput = await posthog.dataWarehouseTotalRowsStatsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.dataWarehouseWarehouseStatusRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/data_warehouse/warehouse_status/`
- **What it does**: Get the current provisioning status of the managed warehouse, with this project's backfill state.
- **OpenAPI operationId**: `data_warehouse_warehouse_status_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ org_id: string; state: "pending" | "provisioning" | "ready" | "failed" | "deleting" | "deleted"; status_message: string; s3_state: string; metadata_store_state: string; identity_state: string; secrets_state: string; r...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DataWarehouseWarehouseStatusRetrieveInput = Parameters<typeof posthog.dataWarehouseWarehouseStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DataWarehouseWarehouseStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.dataWarehouseWarehouseStatusRetrieve>>;

const result: DataWarehouseWarehouseStatusRetrieveOutput = await posthog.dataWarehouseWarehouseStatusRetrieve();

// Result shape (from schema): { org_id: string; state: "pending" | "provisioning" | "ready" | "failed" | "deleting" | "deleted"; status_message: string; s3_state: string; metadata_store_state: string; identity_state: string; secrets_state: string; r...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# External Data Sources

## Operations

### `posthog.environmentsExternalDataSourcesList`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_sources/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesListInput = Parameters<typeof posthog.environmentsExternalDataSourcesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesListOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesList>>;

const result: EnvironmentsExternalDataSourcesListOutput = await posthog.environmentsExternalDataSourcesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; ...
```

### `posthog.environmentsExternalDataSourcesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesCreate>>;

const result: EnvironmentsExternalDataSourcesCreateOutput = await posthog.environmentsExternalDataSourcesCreate();

// Result shape (from schema): { id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...
```

### `posthog.environmentsExternalDataSourcesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/external_data_sources/{id}/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_destroy`
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

type EnvironmentsExternalDataSourcesDestroyInput = Parameters<typeof posthog.environmentsExternalDataSourcesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesDestroy>>;

const result: EnvironmentsExternalDataSourcesDestroyOutput = await posthog.environmentsExternalDataSourcesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_sources/{id}/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesRetrieveInput = Parameters<typeof posthog.environmentsExternalDataSourcesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesRetrieve>>;

const result: EnvironmentsExternalDataSourcesRetrieveOutput = await posthog.environmentsExternalDataSourcesRetrieve();

// Result shape (from schema): { id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...
```

### `posthog.environmentsExternalDataSourcesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/external_data_sources/{id}/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesPartialUpdateInput = Parameters<typeof posthog.environmentsExternalDataSourcesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesPartialUpdate>>;

const result: EnvironmentsExternalDataSourcesPartialUpdateOutput = await posthog.environmentsExternalDataSourcesPartialUpdate();

// Result shape (from schema): { id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...
```

### `posthog.environmentsExternalDataSourcesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/external_data_sources/{id}/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesUpdateInput = Parameters<typeof posthog.environmentsExternalDataSourcesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesUpdate>>;

const result: EnvironmentsExternalDataSourcesUpdateOutput = await posthog.environmentsExternalDataSourcesUpdate();

// Result shape (from schema): { id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...
```

### `posthog.environmentsExternalDataSourcesBulkUpdateSchemasPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/external_data_sources/{id}/bulk_update_schemas/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_bulk_update_schemas_partial_update`
- **Path params**: `id`
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

type EnvironmentsExternalDataSourcesBulkUpdateSchemasPartialUpdateInput = Parameters<typeof posthog.environmentsExternalDataSourcesBulkUpdateSchemasPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesBulkUpdateSchemasPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesBulkUpdateSchemasPartialUpdate>>;

const result: EnvironmentsExternalDataSourcesBulkUpdateSchemasPartialUpdateOutput = await posthog.environmentsExternalDataSourcesBulkUpdateSchemasPartialUpdate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null...
```

### `posthog.environmentsExternalDataSourcesCdcStatusRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_sources/{id}/cdc_status/`
- **What it does**: Live CDC health for an existing source: slot/publication existence and WAL lag.

Reads from the source DB via the engine adapter. Returns ``{"enabled": false}``
when CDC is off, or the stored config plus live ``slot_exists`` /
``publication_exists`` / ``lag_bytes`` when on. 400s if the source DB is
unreachable so the UI can show a degraded/unreachable state.
- **OpenAPI operationId**: `environments_external_data_sources_cdc_status_retrieve`
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

type EnvironmentsExternalDataSourcesCdcStatusRetrieveInput = Parameters<typeof posthog.environmentsExternalDataSourcesCdcStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesCdcStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesCdcStatusRetrieve>>;

const result: EnvironmentsExternalDataSourcesCdcStatusRetrieveOutput = await posthog.environmentsExternalDataSourcesCdcStatusRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesCheckCdcPrerequisitesForSourceCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/{id}/check_cdc_prerequisites_for_source/`
- **What it does**: Validate CDC prerequisites for an existing source using its stored credentials.

The detail=False ``check_cdc_prerequisites`` action is for the creation wizard,
where the client still holds the raw connection config (incl. password) in the
form. On the Configuration page the source already exists and secret fields are
stripped from API responses — so the client can't supply them. This reads the
stored (encrypted) credentials from the DB via the adapter instead.

Body params: ``cdc_management_mode`` (``"posthog"`` | ``"self_managed"``),
``cdc_slot_name`` (optional), ``cdc_publication_name`` (optional).
- **OpenAPI operationId**: `environments_external_data_sources_check_cdc_prerequisites_for_source_create`
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

type EnvironmentsExternalDataSourcesCheckCdcPrerequisitesForSourceCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesCheckCdcPrerequisitesForSourceCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesCheckCdcPrerequisitesForSourceCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesCheckCdcPrerequisitesForSourceCreate>>;

const result: EnvironmentsExternalDataSourcesCheckCdcPrerequisitesForSourceCreateOutput = await posthog.environmentsExternalDataSourcesCheckCdcPrerequisitesForSourceCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesCreateWebhookCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/{id}/create_webhook/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_create_webhook_create`
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

type EnvironmentsExternalDataSourcesCreateWebhookCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesCreateWebhookCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesCreateWebhookCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesCreateWebhookCreate>>;

const result: EnvironmentsExternalDataSourcesCreateWebhookCreateOutput = await posthog.environmentsExternalDataSourcesCreateWebhookCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesDeleteWebhookCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/{id}/delete_webhook/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_delete_webhook_create`
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

type EnvironmentsExternalDataSourcesDeleteWebhookCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesDeleteWebhookCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesDeleteWebhookCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesDeleteWebhookCreate>>;

const result: EnvironmentsExternalDataSourcesDeleteWebhookCreateOutput = await posthog.environmentsExternalDataSourcesDeleteWebhookCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesDisableCdcCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/{id}/disable_cdc/`
- **What it does**: Disable CDC on an existing source.

Cancels any running CDC extraction workflow, deletes the extraction schedule,
delegates engine-side teardown to the source's adapter (drops slot/publication
for Postgres; equivalent for other engines), clears ``cdc_*`` keys from
``job_inputs``, soft-deletes companion CDC tables, and sets all CDC schemas to
``sync_type=None``, ``should_sync=False`` so the user must pick a new sync
strategy before they resume.
- **OpenAPI operationId**: `environments_external_data_sources_disable_cdc_create`
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

type EnvironmentsExternalDataSourcesDisableCdcCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesDisableCdcCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesDisableCdcCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesDisableCdcCreate>>;

const result: EnvironmentsExternalDataSourcesDisableCdcCreateOutput = await posthog.environmentsExternalDataSourcesDisableCdcCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesEnableCdcCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/{id}/enable_cdc/`
- **What it does**: Enable CDC on an existing source.

Provisions engine-side CDC resources via the source's adapter, writes the CDC
config into ``source.job_inputs``, and ensures the CDC extraction schedule
exists. Re-runs prereq checks server-side so we never trust a stale
client-side check.

Body params: ``cdc_management_mode`` (``"posthog"`` | ``"self_managed"``),
plus engine-specific identifier hints (e.g. ``cdc_slot_name``,
``cdc_publication_name`` for Postgres). Universal tuning fields:
``cdc_auto_drop_slot`` (optional bool), ``cdc_lag_warning_threshold_mb``
(optional int), ``cdc_lag_critical_threshold_mb`` (optional int).
- **OpenAPI operationId**: `environments_external_data_sources_enable_cdc_create`
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

type EnvironmentsExternalDataSourcesEnableCdcCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesEnableCdcCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesEnableCdcCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesEnableCdcCreate>>;

const result: EnvironmentsExternalDataSourcesEnableCdcCreateOutput = await posthog.environmentsExternalDataSourcesEnableCdcCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesJobsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_sources/{id}/jobs/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_jobs_retrieve`
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

type EnvironmentsExternalDataSourcesJobsRetrieveInput = Parameters<typeof posthog.environmentsExternalDataSourcesJobsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesJobsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesJobsRetrieve>>;

const result: EnvironmentsExternalDataSourcesJobsRetrieveOutput = await posthog.environmentsExternalDataSourcesJobsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesRefreshSchemasCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/{id}/refresh_schemas/`
- **What it does**: Fetch current schema/table list from the source and create any new ExternalDataSchema rows (no data sync).
- **OpenAPI operationId**: `environments_external_data_sources_refresh_schemas_create`
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

type EnvironmentsExternalDataSourcesRefreshSchemasCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesRefreshSchemasCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesRefreshSchemasCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesRefreshSchemasCreate>>;

const result: EnvironmentsExternalDataSourcesRefreshSchemasCreateOutput = await posthog.environmentsExternalDataSourcesRefreshSchemasCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesReloadCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/{id}/reload/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_reload_create`
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

type EnvironmentsExternalDataSourcesReloadCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesReloadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesReloadCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesReloadCreate>>;

const result: EnvironmentsExternalDataSourcesReloadCreateOutput = await posthog.environmentsExternalDataSourcesReloadCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesRepairCdcCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/{id}/repair_cdc/`
- **What it does**: Repair CDC on a source whose replication resources were lost.

Only proceeds on evidence of breakage (a persisted broken marker, or a live probe
showing the slot/publication missing) — repairing a healthy source would drop its
slot and force a full re-sync. Cancels running CDC jobs, recreates the engine-side
slot/publication against the stored CDC config, resets every active CDC schema to
snapshot mode for a full re-sync (changes since the old slot died are
unrecoverable), clears the broken markers, and resumes the paused schedules.
Idempotent: safe to retry after a partial failure. Concurrent repairs of the same
source are rejected with a 409.
- **OpenAPI operationId**: `environments_external_data_sources_repair_cdc_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`, `400`, `409`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success?: boolean; schemas_reset?: number }`
- OpenAPI response codes: `200`, `400`, `409`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesRepairCdcCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesRepairCdcCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesRepairCdcCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesRepairCdcCreate>>;

const result: EnvironmentsExternalDataSourcesRepairCdcCreateOutput = await posthog.environmentsExternalDataSourcesRepairCdcCreate();

// Result shape (from schema): { success?: boolean; schemas_reset?: number }
```

### `posthog.environmentsExternalDataSourcesRevenueAnalyticsConfigPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/external_data_sources/{id}/revenue_analytics_config/`
- **What it does**: Update the revenue analytics configuration and return the full external data source.
- **OpenAPI operationId**: `environments_external_data_sources_revenue_analytics_config_partial_update`
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

type EnvironmentsExternalDataSourcesRevenueAnalyticsConfigPartialUpdateInput = Parameters<typeof posthog.environmentsExternalDataSourcesRevenueAnalyticsConfigPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesRevenueAnalyticsConfigPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesRevenueAnalyticsConfigPartialUpdate>>;

const result: EnvironmentsExternalDataSourcesRevenueAnalyticsConfigPartialUpdateOutput = await posthog.environmentsExternalDataSourcesRevenueAnalyticsConfigPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesUpdateCdcSettingsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/{id}/update_cdc_settings/`
- **What it does**: Update CDC tuning fields without enabling/disabling.

Lets users edit ``cdc_auto_drop_slot``, ``cdc_lag_warning_threshold_mb``, and
``cdc_lag_critical_threshold_mb`` independently. These fields are universal
across engines. Engine-specific identifiers (slot name, management mode, …)
are immutable post-enable — switching them requires disable + enable.
- **OpenAPI operationId**: `environments_external_data_sources_update_cdc_settings_create`
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

type EnvironmentsExternalDataSourcesUpdateCdcSettingsCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesUpdateCdcSettingsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesUpdateCdcSettingsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesUpdateCdcSettingsCreate>>;

const result: EnvironmentsExternalDataSourcesUpdateCdcSettingsCreateOutput = await posthog.environmentsExternalDataSourcesUpdateCdcSettingsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesUpdateWebhookInputsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/{id}/update_webhook_inputs/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_update_webhook_inputs_create`
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

type EnvironmentsExternalDataSourcesUpdateWebhookInputsCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesUpdateWebhookInputsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesUpdateWebhookInputsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesUpdateWebhookInputsCreate>>;

const result: EnvironmentsExternalDataSourcesUpdateWebhookInputsCreateOutput = await posthog.environmentsExternalDataSourcesUpdateWebhookInputsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesWebhookInfoRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_sources/{id}/webhook_info/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_webhook_info_retrieve`
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

type EnvironmentsExternalDataSourcesWebhookInfoRetrieveInput = Parameters<typeof posthog.environmentsExternalDataSourcesWebhookInfoRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesWebhookInfoRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesWebhookInfoRetrieve>>;

const result: EnvironmentsExternalDataSourcesWebhookInfoRetrieveOutput = await posthog.environmentsExternalDataSourcesWebhookInfoRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesCheckCdcPrerequisitesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/check_cdc_prerequisites/`
- **What it does**: Validate CDC prerequisites against a live Postgres connection.

Used by the source wizard to surface ✅/❌ checks before source creation,
and by the self-managed setup popup to verify user-created publications.
- **OpenAPI operationId**: `environments_external_data_sources_check_cdc_prerequisites_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ valid?: boolean; errors?: (string)[] }`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesCheckCdcPrerequisitesCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesCheckCdcPrerequisitesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesCheckCdcPrerequisitesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesCheckCdcPrerequisitesCreate>>;

const result: EnvironmentsExternalDataSourcesCheckCdcPrerequisitesCreateOutput = await posthog.environmentsExternalDataSourcesCheckCdcPrerequisitesCreate();

// Result shape (from schema): { valid?: boolean; errors?: (string)[] }
```

### `posthog.environmentsExternalDataSourcesConnectLinkRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_sources/connect_link/`
- **What it does**: Return a secure browser link for connecting a data warehouse source.

The link opens a minimal connect page rendering the source's full connection form — OAuth options
included — with no table selection and no source creation. The user authenticates in their browser,
secrets never pass through the agent, and the agent finishes setup afterwards by passing the stored
credential id to data-warehouse-source-setup.
- **OpenAPI operationId**: `environments_external_data_sources_connect_link_retrieve`
- **Path params**: None
- **Query params**: `source_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ source_type: string; auth_method: "oauth" | "credentials"; connect_url: string; instructions: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesConnectLinkRetrieveInput = Parameters<typeof posthog.environmentsExternalDataSourcesConnectLinkRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesConnectLinkRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesConnectLinkRetrieve>>;

const result: EnvironmentsExternalDataSourcesConnectLinkRetrieveOutput = await posthog.environmentsExternalDataSourcesConnectLinkRetrieve();

// Result shape (from schema): { source_type: string; auth_method: "oauth" | "credentials"; connect_url: string; instructions: string }
```

### `posthog.environmentsExternalDataSourcesConnectionsList`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_sources/connections/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_connections_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; prefix: string | null; engine: "duckdb" | "postgres" | "mysql" | "snowflake" | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesConnectionsListInput = Parameters<typeof posthog.environmentsExternalDataSourcesConnectionsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesConnectionsListOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesConnectionsList>>;

const result: EnvironmentsExternalDataSourcesConnectionsListOutput = await posthog.environmentsExternalDataSourcesConnectionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; prefix: string | null; engine: "duckdb" | "postgres" | "mysql" | "snowflake" | null })[] }
```

### `posthog.environmentsExternalDataSourcesDatabaseSchemaCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/database_schema/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_database_schema_create`
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

type EnvironmentsExternalDataSourcesDatabaseSchemaCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesDatabaseSchemaCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesDatabaseSchemaCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesDatabaseSchemaCreate>>;

const result: EnvironmentsExternalDataSourcesDatabaseSchemaCreateOutput = await posthog.environmentsExternalDataSourcesDatabaseSchemaCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesDraftCustomManifestCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/draft_custom_manifest/`
- **What it does**: Draft a Custom REST source manifest from API documentation using an LLM.

Reads the docs (a URL fetched server-side, or pasted text / OpenAPI spec), asks the model to
author a RESTAPIConfig manifest, and validates it against the create-path checks — repairing
against validation errors up to a small budget. Returns the manifest for the user to review
and tweak in the builder before creating the source; it does NOT create anything. Gated by the
`dwh-custom-source-ai-builder` flag, and requires the org to have approved AI data processing,
since the docs are sent to the LLM gateway.
- **OpenAPI operationId**: `environments_external_data_sources_draft_custom_manifest_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ draft_status: "ok" | "invalid" | "model_error"; manifest_json: string | null; resource_names: (string)[]; attempts: number; error: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesDraftCustomManifestCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesDraftCustomManifestCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesDraftCustomManifestCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesDraftCustomManifestCreate>>;

const result: EnvironmentsExternalDataSourcesDraftCustomManifestCreateOutput = await posthog.environmentsExternalDataSourcesDraftCustomManifestCreate();

// Result shape (from schema): { draft_status: "ok" | "invalid" | "model_error"; manifest_json: string | null; resource_names: (string)[]; attempts: number; error: string | null }
```

### `posthog.environmentsExternalDataSourcesOauthAccountsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_sources/oauth_accounts/`
- **What it does**: List the accounts/properties a connected OAuth integration exposes, in the shared
IntegrationAccount shape. The logic lives in each source (via OAuthMixin.get_oauth_accounts);
this endpoint just routes by source type and serializes the result.
- **OpenAPI operationId**: `environments_external_data_sources_oauth_accounts_retrieve`
- **Path params**: None
- **Query params**: `integration_id`, `source_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ accounts: ({ value: string; display_name: string; is_primary: boolean; badges: (string)[]; group: string | null; secondary_text: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesOauthAccountsRetrieveInput = Parameters<typeof posthog.environmentsExternalDataSourcesOauthAccountsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesOauthAccountsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesOauthAccountsRetrieve>>;

const result: EnvironmentsExternalDataSourcesOauthAccountsRetrieveOutput = await posthog.environmentsExternalDataSourcesOauthAccountsRetrieve();

// Result shape (from schema): { accounts: ({ value: string; display_name: string; is_primary: boolean; badges: (string)[]; group: string | null; secondary_text: string | null })[] }
```

### `posthog.environmentsExternalDataSourcesPreviewResourceCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/preview_resource/`
- **What it does**: Read a bounded sample of rows for one resource of a Custom REST source.

Lets a manifest author verify `data_selector`, `primary_key`, and the incremental
`cursor_path` against live data before creating the source. Only `source_type: "Custom"`
is supported — other source types return 400. The read is bounded (single page per
resource, capped row count, short timeouts, no redirects). Manifest, validation, and SSRF
problems return 400; a live fetch failure returns 200 with `error` set and empty `rows`.
- **OpenAPI operationId**: `environments_external_data_sources_preview_resource_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ rows: ({ [key: string]: unknown })[]; row_count: number; columns: ({ name: string; type: string })[]; error: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesPreviewResourceCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesPreviewResourceCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesPreviewResourceCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesPreviewResourceCreate>>;

const result: EnvironmentsExternalDataSourcesPreviewResourceCreateOutput = await posthog.environmentsExternalDataSourcesPreviewResourceCreate();

// Result shape (from schema): { rows: ({ [key: string]: unknown })[]; row_count: number; columns: ({ name: string; type: string })[]; error: string | null }
```

### `posthog.environmentsExternalDataSourcesSetupCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/setup/`
- **What it does**: One-shot data warehouse source setup.

Validate credentials, discover available tables, enable them all with sensible sync defaults
(incremental where supported, else append, else full refresh), and create the source in a single
call — the caller never has to assemble a `schemas` array. For sources that support webhooks
(e.g. Stripe), a webhook is auto-registered after creation: on success webhook-capable tables
switch to real-time webhook sync (unlocking webhook-only tables); on failure the polling
defaults stay in place. For fine-grained table/sync control, use the lower-level
`database_schema` + `create` flow instead.
- **OpenAPI operationId**: `environments_external_data_sources_setup_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; webhook?: { success: boolean; webhook_url: string | null; error: string | null; pending_inputs: (string)[] } }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesSetupCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesSetupCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesSetupCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesSetupCreate>>;

const result: EnvironmentsExternalDataSourcesSetupCreateOutput = await posthog.environmentsExternalDataSourcesSetupCreate();

// Result shape (from schema): { id: string; webhook?: { success: boolean; webhook_url: string | null; error: string | null; pending_inputs: (string)[] } }
```

### `posthog.environmentsExternalDataSourcesSourcePrefixCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/source_prefix/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_source_prefix_create`
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

type EnvironmentsExternalDataSourcesSourcePrefixCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesSourcePrefixCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesSourcePrefixCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesSourcePrefixCreate>>;

const result: EnvironmentsExternalDataSourcesSourcePrefixCreateOutput = await posthog.environmentsExternalDataSourcesSourcePrefixCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsExternalDataSourcesStoreCredentialsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/external_data_sources/store_credentials/`
- **What it does**: Validate and store credentials for a data warehouse source without creating the source.

Backs the source connect page: the user enters credentials directly in PostHog, they are
checked against a live connection, then stashed encrypted in a temporary store. The returned
credential id can be passed to `setup` as {'credential_id': <id>} to create the source — so
secrets never travel through an agent conversation. The stash is single-use: it is deleted
as soon as `setup` consumes it, and expires after 24 hours if never consumed.
- **OpenAPI operationId**: `environments_external_data_sources_store_credentials_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ credential_id: string; source_type: string; created_at: string; expires_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesStoreCredentialsCreateInput = Parameters<typeof posthog.environmentsExternalDataSourcesStoreCredentialsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesStoreCredentialsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesStoreCredentialsCreate>>;

const result: EnvironmentsExternalDataSourcesStoreCredentialsCreateOutput = await posthog.environmentsExternalDataSourcesStoreCredentialsCreate();

// Result shape (from schema): { credential_id: string; source_type: string; created_at: string; expires_at: string }
```

### `posthog.environmentsExternalDataSourcesStoredCredentialsList`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_sources/stored_credentials/`
- **What it does**: List credentials stored via the source connect page that haven't been consumed yet.

Returns metadata only (id, source type, timestamps) — never the secrets themselves. Stored
credentials are temporary: they disappear once consumed by `setup` or when they expire.
Newest first, so after a user confirms they've finished the connect page, the first entry
for the source type is the one to pass to `setup`.
- **OpenAPI operationId**: `environments_external_data_sources_stored_credentials_list`
- **Path params**: None
- **Query params**: `search`, `source_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ credential_id: string; source_type: string; created_at: string; expires_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsExternalDataSourcesStoredCredentialsListInput = Parameters<typeof posthog.environmentsExternalDataSourcesStoredCredentialsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesStoredCredentialsListOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesStoredCredentialsList>>;

const result: EnvironmentsExternalDataSourcesStoredCredentialsListOutput = await posthog.environmentsExternalDataSourcesStoredCredentialsList();

// Result shape (from schema): ({ credential_id: string; source_type: string; created_at: string; expires_at: string })[]
```

### `posthog.environmentsExternalDataSourcesWizardRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/external_data_sources/wizard/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `environments_external_data_sources_wizard_retrieve`
- **Path params**: None
- **Query params**: `source_type`
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

type EnvironmentsExternalDataSourcesWizardRetrieveInput = Parameters<typeof posthog.environmentsExternalDataSourcesWizardRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsExternalDataSourcesWizardRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsExternalDataSourcesWizardRetrieve>>;

const result: EnvironmentsExternalDataSourcesWizardRetrieveOutput = await posthog.environmentsExternalDataSourcesWizardRetrieve();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesList`

- **HTTP**: `GET /api/projects/{project_id}/external_data_sources/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesListInput = Parameters<typeof posthog.externalDataSourcesList> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesListOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesList>>;

const result: ExternalDataSourcesListOutput = await posthog.externalDataSourcesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; ...
```

### `posthog.externalDataSourcesCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesCreateInput = Parameters<typeof posthog.externalDataSourcesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesCreate>>;

const result: ExternalDataSourcesCreateOutput = await posthog.externalDataSourcesCreate();

// Result shape (from schema): { id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...
```

### `posthog.externalDataSourcesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/external_data_sources/{id}/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_destroy`
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

type ExternalDataSourcesDestroyInput = Parameters<typeof posthog.externalDataSourcesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesDestroyOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesDestroy>>;

const result: ExternalDataSourcesDestroyOutput = await posthog.externalDataSourcesDestroy();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/external_data_sources/{id}/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesRetrieveInput = Parameters<typeof posthog.externalDataSourcesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesRetrieveOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesRetrieve>>;

const result: ExternalDataSourcesRetrieveOutput = await posthog.externalDataSourcesRetrieve();

// Result shape (from schema): { id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...
```

### `posthog.externalDataSourcesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/external_data_sources/{id}/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesPartialUpdateInput = Parameters<typeof posthog.externalDataSourcesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesPartialUpdate>>;

const result: ExternalDataSourcesPartialUpdateOutput = await posthog.externalDataSourcesPartialUpdate();

// Result shape (from schema): { id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...
```

### `posthog.externalDataSourcesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/external_data_sources/{id}/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesUpdateInput = Parameters<typeof posthog.externalDataSourcesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesUpdateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesUpdate>>;

const result: ExternalDataSourcesUpdateOutput = await posthog.externalDataSourcesUpdate();

// Result shape (from schema): { id: string; created_at: string; created_by: string | null; created_via?: "web" | "api" | "mcp" | null; status: string; client_secret: string; account_id: string; source_type: "Ashby" | "Supabase" | "CustomerIO" | "Git...
```

### `posthog.externalDataSourcesBulkUpdateSchemasPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/external_data_sources/{id}/bulk_update_schemas/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_bulk_update_schemas_partial_update`
- **Path params**: `id`
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

type ExternalDataSourcesBulkUpdateSchemasPartialUpdateInput = Parameters<typeof posthog.externalDataSourcesBulkUpdateSchemasPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesBulkUpdateSchemasPartialUpdateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesBulkUpdateSchemasPartialUpdate>>;

const result: ExternalDataSourcesBulkUpdateSchemasPartialUpdateOutput = await posthog.externalDataSourcesBulkUpdateSchemasPartialUpdate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; label: string | null; table: { [key: string]: unknown } | null; should_sync?: boolean; last_synced_at: string | null...
```

### `posthog.externalDataSourcesCdcStatusRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/external_data_sources/{id}/cdc_status/`
- **What it does**: Live CDC health for an existing source: slot/publication existence and WAL lag.

Reads from the source DB via the engine adapter. Returns ``{"enabled": false}``
when CDC is off, or the stored config plus live ``slot_exists`` /
``publication_exists`` / ``lag_bytes`` when on. 400s if the source DB is
unreachable so the UI can show a degraded/unreachable state.
- **OpenAPI operationId**: `external_data_sources_cdc_status_retrieve`
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

type ExternalDataSourcesCdcStatusRetrieveInput = Parameters<typeof posthog.externalDataSourcesCdcStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesCdcStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesCdcStatusRetrieve>>;

const result: ExternalDataSourcesCdcStatusRetrieveOutput = await posthog.externalDataSourcesCdcStatusRetrieve();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesCheckCdcPrerequisitesForSourceCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/{id}/check_cdc_prerequisites_for_source/`
- **What it does**: Validate CDC prerequisites for an existing source using its stored credentials.

The detail=False ``check_cdc_prerequisites`` action is for the creation wizard,
where the client still holds the raw connection config (incl. password) in the
form. On the Configuration page the source already exists and secret fields are
stripped from API responses — so the client can't supply them. This reads the
stored (encrypted) credentials from the DB via the adapter instead.

Body params: ``cdc_management_mode`` (``"posthog"`` | ``"self_managed"``),
``cdc_slot_name`` (optional), ``cdc_publication_name`` (optional).
- **OpenAPI operationId**: `external_data_sources_check_cdc_prerequisites_for_source_create`
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

type ExternalDataSourcesCheckCdcPrerequisitesForSourceCreateInput = Parameters<typeof posthog.externalDataSourcesCheckCdcPrerequisitesForSourceCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesCheckCdcPrerequisitesForSourceCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesCheckCdcPrerequisitesForSourceCreate>>;

const result: ExternalDataSourcesCheckCdcPrerequisitesForSourceCreateOutput = await posthog.externalDataSourcesCheckCdcPrerequisitesForSourceCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesCreateWebhookCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/{id}/create_webhook/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_create_webhook_create`
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

type ExternalDataSourcesCreateWebhookCreateInput = Parameters<typeof posthog.externalDataSourcesCreateWebhookCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesCreateWebhookCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesCreateWebhookCreate>>;

const result: ExternalDataSourcesCreateWebhookCreateOutput = await posthog.externalDataSourcesCreateWebhookCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesDeleteWebhookCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/{id}/delete_webhook/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_delete_webhook_create`
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

type ExternalDataSourcesDeleteWebhookCreateInput = Parameters<typeof posthog.externalDataSourcesDeleteWebhookCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesDeleteWebhookCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesDeleteWebhookCreate>>;

const result: ExternalDataSourcesDeleteWebhookCreateOutput = await posthog.externalDataSourcesDeleteWebhookCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesDisableCdcCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/{id}/disable_cdc/`
- **What it does**: Disable CDC on an existing source.

Cancels any running CDC extraction workflow, deletes the extraction schedule,
delegates engine-side teardown to the source's adapter (drops slot/publication
for Postgres; equivalent for other engines), clears ``cdc_*`` keys from
``job_inputs``, soft-deletes companion CDC tables, and sets all CDC schemas to
``sync_type=None``, ``should_sync=False`` so the user must pick a new sync
strategy before they resume.
- **OpenAPI operationId**: `external_data_sources_disable_cdc_create`
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

type ExternalDataSourcesDisableCdcCreateInput = Parameters<typeof posthog.externalDataSourcesDisableCdcCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesDisableCdcCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesDisableCdcCreate>>;

const result: ExternalDataSourcesDisableCdcCreateOutput = await posthog.externalDataSourcesDisableCdcCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesEnableCdcCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/{id}/enable_cdc/`
- **What it does**: Enable CDC on an existing source.

Provisions engine-side CDC resources via the source's adapter, writes the CDC
config into ``source.job_inputs``, and ensures the CDC extraction schedule
exists. Re-runs prereq checks server-side so we never trust a stale
client-side check.

Body params: ``cdc_management_mode`` (``"posthog"`` | ``"self_managed"``),
plus engine-specific identifier hints (e.g. ``cdc_slot_name``,
``cdc_publication_name`` for Postgres). Universal tuning fields:
``cdc_auto_drop_slot`` (optional bool), ``cdc_lag_warning_threshold_mb``
(optional int), ``cdc_lag_critical_threshold_mb`` (optional int).
- **OpenAPI operationId**: `external_data_sources_enable_cdc_create`
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

type ExternalDataSourcesEnableCdcCreateInput = Parameters<typeof posthog.externalDataSourcesEnableCdcCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesEnableCdcCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesEnableCdcCreate>>;

const result: ExternalDataSourcesEnableCdcCreateOutput = await posthog.externalDataSourcesEnableCdcCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesJobsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/external_data_sources/{id}/jobs/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_jobs_retrieve`
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

type ExternalDataSourcesJobsRetrieveInput = Parameters<typeof posthog.externalDataSourcesJobsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesJobsRetrieveOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesJobsRetrieve>>;

const result: ExternalDataSourcesJobsRetrieveOutput = await posthog.externalDataSourcesJobsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesRefreshSchemasCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/{id}/refresh_schemas/`
- **What it does**: Fetch current schema/table list from the source and create any new ExternalDataSchema rows (no data sync).
- **OpenAPI operationId**: `external_data_sources_refresh_schemas_create`
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

type ExternalDataSourcesRefreshSchemasCreateInput = Parameters<typeof posthog.externalDataSourcesRefreshSchemasCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesRefreshSchemasCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesRefreshSchemasCreate>>;

const result: ExternalDataSourcesRefreshSchemasCreateOutput = await posthog.externalDataSourcesRefreshSchemasCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesReloadCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/{id}/reload/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_reload_create`
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

type ExternalDataSourcesReloadCreateInput = Parameters<typeof posthog.externalDataSourcesReloadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesReloadCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesReloadCreate>>;

const result: ExternalDataSourcesReloadCreateOutput = await posthog.externalDataSourcesReloadCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesRepairCdcCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/{id}/repair_cdc/`
- **What it does**: Repair CDC on a source whose replication resources were lost.

Only proceeds on evidence of breakage (a persisted broken marker, or a live probe
showing the slot/publication missing) — repairing a healthy source would drop its
slot and force a full re-sync. Cancels running CDC jobs, recreates the engine-side
slot/publication against the stored CDC config, resets every active CDC schema to
snapshot mode for a full re-sync (changes since the old slot died are
unrecoverable), clears the broken markers, and resumes the paused schedules.
Idempotent: safe to retry after a partial failure. Concurrent repairs of the same
source are rejected with a 409.
- **OpenAPI operationId**: `external_data_sources_repair_cdc_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`, `400`, `409`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success?: boolean; schemas_reset?: number }`
- OpenAPI response codes: `200`, `400`, `409`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesRepairCdcCreateInput = Parameters<typeof posthog.externalDataSourcesRepairCdcCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesRepairCdcCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesRepairCdcCreate>>;

const result: ExternalDataSourcesRepairCdcCreateOutput = await posthog.externalDataSourcesRepairCdcCreate();

// Result shape (from schema): { success?: boolean; schemas_reset?: number }
```

### `posthog.externalDataSourcesRevenueAnalyticsConfigPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/external_data_sources/{id}/revenue_analytics_config/`
- **What it does**: Update the revenue analytics configuration and return the full external data source.
- **OpenAPI operationId**: `external_data_sources_revenue_analytics_config_partial_update`
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

type ExternalDataSourcesRevenueAnalyticsConfigPartialUpdateInput = Parameters<typeof posthog.externalDataSourcesRevenueAnalyticsConfigPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesRevenueAnalyticsConfigPartialUpdateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesRevenueAnalyticsConfigPartialUpdate>>;

const result: ExternalDataSourcesRevenueAnalyticsConfigPartialUpdateOutput = await posthog.externalDataSourcesRevenueAnalyticsConfigPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesUpdateCdcSettingsCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/{id}/update_cdc_settings/`
- **What it does**: Update CDC tuning fields without enabling/disabling.

Lets users edit ``cdc_auto_drop_slot``, ``cdc_lag_warning_threshold_mb``, and
``cdc_lag_critical_threshold_mb`` independently. These fields are universal
across engines. Engine-specific identifiers (slot name, management mode, …)
are immutable post-enable — switching them requires disable + enable.
- **OpenAPI operationId**: `external_data_sources_update_cdc_settings_create`
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

type ExternalDataSourcesUpdateCdcSettingsCreateInput = Parameters<typeof posthog.externalDataSourcesUpdateCdcSettingsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesUpdateCdcSettingsCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesUpdateCdcSettingsCreate>>;

const result: ExternalDataSourcesUpdateCdcSettingsCreateOutput = await posthog.externalDataSourcesUpdateCdcSettingsCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesUpdateWebhookInputsCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/{id}/update_webhook_inputs/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_update_webhook_inputs_create`
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

type ExternalDataSourcesUpdateWebhookInputsCreateInput = Parameters<typeof posthog.externalDataSourcesUpdateWebhookInputsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesUpdateWebhookInputsCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesUpdateWebhookInputsCreate>>;

const result: ExternalDataSourcesUpdateWebhookInputsCreateOutput = await posthog.externalDataSourcesUpdateWebhookInputsCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesWebhookInfoRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/external_data_sources/{id}/webhook_info/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_webhook_info_retrieve`
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

type ExternalDataSourcesWebhookInfoRetrieveInput = Parameters<typeof posthog.externalDataSourcesWebhookInfoRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesWebhookInfoRetrieveOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesWebhookInfoRetrieve>>;

const result: ExternalDataSourcesWebhookInfoRetrieveOutput = await posthog.externalDataSourcesWebhookInfoRetrieve();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesCheckCdcPrerequisitesCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/check_cdc_prerequisites/`
- **What it does**: Validate CDC prerequisites against a live Postgres connection.

Used by the source wizard to surface ✅/❌ checks before source creation,
and by the self-managed setup popup to verify user-created publications.
- **OpenAPI operationId**: `external_data_sources_check_cdc_prerequisites_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ valid?: boolean; errors?: (string)[] }`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesCheckCdcPrerequisitesCreateInput = Parameters<typeof posthog.externalDataSourcesCheckCdcPrerequisitesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesCheckCdcPrerequisitesCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesCheckCdcPrerequisitesCreate>>;

const result: ExternalDataSourcesCheckCdcPrerequisitesCreateOutput = await posthog.externalDataSourcesCheckCdcPrerequisitesCreate();

// Result shape (from schema): { valid?: boolean; errors?: (string)[] }
```

### `posthog.externalDataSourcesConnectLinkRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/external_data_sources/connect_link/`
- **What it does**: Return a secure browser link for connecting a data warehouse source.

The link opens a minimal connect page rendering the source's full connection form — OAuth options
included — with no table selection and no source creation. The user authenticates in their browser,
secrets never pass through the agent, and the agent finishes setup afterwards by passing the stored
credential id to data-warehouse-source-setup.
- **OpenAPI operationId**: `external_data_sources_connect_link_retrieve`
- **Path params**: None
- **Query params**: `source_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ source_type: string; auth_method: "oauth" | "credentials"; connect_url: string; instructions: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesConnectLinkRetrieveInput = Parameters<typeof posthog.externalDataSourcesConnectLinkRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesConnectLinkRetrieveOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesConnectLinkRetrieve>>;

const result: ExternalDataSourcesConnectLinkRetrieveOutput = await posthog.externalDataSourcesConnectLinkRetrieve();

// Result shape (from schema): { source_type: string; auth_method: "oauth" | "credentials"; connect_url: string; instructions: string }
```

### `posthog.externalDataSourcesConnectionsList`

- **HTTP**: `GET /api/projects/{project_id}/external_data_sources/connections/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_connections_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; prefix: string | null; engine: "duckdb" | "postgres" | "mysql" | "snowflake" | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesConnectionsListInput = Parameters<typeof posthog.externalDataSourcesConnectionsList> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesConnectionsListOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesConnectionsList>>;

const result: ExternalDataSourcesConnectionsListOutput = await posthog.externalDataSourcesConnectionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; prefix: string | null; engine: "duckdb" | "postgres" | "mysql" | "snowflake" | null })[] }
```

### `posthog.externalDataSourcesDatabaseSchemaCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/database_schema/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_database_schema_create`
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

type ExternalDataSourcesDatabaseSchemaCreateInput = Parameters<typeof posthog.externalDataSourcesDatabaseSchemaCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesDatabaseSchemaCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesDatabaseSchemaCreate>>;

const result: ExternalDataSourcesDatabaseSchemaCreateOutput = await posthog.externalDataSourcesDatabaseSchemaCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesDraftCustomManifestCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/draft_custom_manifest/`
- **What it does**: Draft a Custom REST source manifest from API documentation using an LLM.

Reads the docs (a URL fetched server-side, or pasted text / OpenAPI spec), asks the model to
author a RESTAPIConfig manifest, and validates it against the create-path checks — repairing
against validation errors up to a small budget. Returns the manifest for the user to review
and tweak in the builder before creating the source; it does NOT create anything. Gated by the
`dwh-custom-source-ai-builder` flag, and requires the org to have approved AI data processing,
since the docs are sent to the LLM gateway.
- **OpenAPI operationId**: `external_data_sources_draft_custom_manifest_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ draft_status: "ok" | "invalid" | "model_error"; manifest_json: string | null; resource_names: (string)[]; attempts: number; error: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesDraftCustomManifestCreateInput = Parameters<typeof posthog.externalDataSourcesDraftCustomManifestCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesDraftCustomManifestCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesDraftCustomManifestCreate>>;

const result: ExternalDataSourcesDraftCustomManifestCreateOutput = await posthog.externalDataSourcesDraftCustomManifestCreate();

// Result shape (from schema): { draft_status: "ok" | "invalid" | "model_error"; manifest_json: string | null; resource_names: (string)[]; attempts: number; error: string | null }
```

### `posthog.externalDataSourcesOauthAccountsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/external_data_sources/oauth_accounts/`
- **What it does**: List the accounts/properties a connected OAuth integration exposes, in the shared
IntegrationAccount shape. The logic lives in each source (via OAuthMixin.get_oauth_accounts);
this endpoint just routes by source type and serializes the result.
- **OpenAPI operationId**: `external_data_sources_oauth_accounts_retrieve`
- **Path params**: None
- **Query params**: `integration_id`, `source_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ accounts: ({ value: string; display_name: string; is_primary: boolean; badges: (string)[]; group: string | null; secondary_text: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesOauthAccountsRetrieveInput = Parameters<typeof posthog.externalDataSourcesOauthAccountsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesOauthAccountsRetrieveOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesOauthAccountsRetrieve>>;

const result: ExternalDataSourcesOauthAccountsRetrieveOutput = await posthog.externalDataSourcesOauthAccountsRetrieve();

// Result shape (from schema): { accounts: ({ value: string; display_name: string; is_primary: boolean; badges: (string)[]; group: string | null; secondary_text: string | null })[] }
```

### `posthog.externalDataSourcesPreviewResourceCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/preview_resource/`
- **What it does**: Read a bounded sample of rows for one resource of a Custom REST source.

Lets a manifest author verify `data_selector`, `primary_key`, and the incremental
`cursor_path` against live data before creating the source. Only `source_type: "Custom"`
is supported — other source types return 400. The read is bounded (single page per
resource, capped row count, short timeouts, no redirects). Manifest, validation, and SSRF
problems return 400; a live fetch failure returns 200 with `error` set and empty `rows`.
- **OpenAPI operationId**: `external_data_sources_preview_resource_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ rows: ({ [key: string]: unknown })[]; row_count: number; columns: ({ name: string; type: string })[]; error: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesPreviewResourceCreateInput = Parameters<typeof posthog.externalDataSourcesPreviewResourceCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesPreviewResourceCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesPreviewResourceCreate>>;

const result: ExternalDataSourcesPreviewResourceCreateOutput = await posthog.externalDataSourcesPreviewResourceCreate();

// Result shape (from schema): { rows: ({ [key: string]: unknown })[]; row_count: number; columns: ({ name: string; type: string })[]; error: string | null }
```

### `posthog.externalDataSourcesSetupCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/setup/`
- **What it does**: One-shot data warehouse source setup.

Validate credentials, discover available tables, enable them all with sensible sync defaults
(incremental where supported, else append, else full refresh), and create the source in a single
call — the caller never has to assemble a `schemas` array. For sources that support webhooks
(e.g. Stripe), a webhook is auto-registered after creation: on success webhook-capable tables
switch to real-time webhook sync (unlocking webhook-only tables); on failure the polling
defaults stay in place. For fine-grained table/sync control, use the lower-level
`database_schema` + `create` flow instead.
- **OpenAPI operationId**: `external_data_sources_setup_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; webhook?: { success: boolean; webhook_url: string | null; error: string | null; pending_inputs: (string)[] } }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesSetupCreateInput = Parameters<typeof posthog.externalDataSourcesSetupCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesSetupCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesSetupCreate>>;

const result: ExternalDataSourcesSetupCreateOutput = await posthog.externalDataSourcesSetupCreate();

// Result shape (from schema): { id: string; webhook?: { success: boolean; webhook_url: string | null; error: string | null; pending_inputs: (string)[] } }
```

### `posthog.externalDataSourcesSourcePrefixCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/source_prefix/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_source_prefix_create`
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

type ExternalDataSourcesSourcePrefixCreateInput = Parameters<typeof posthog.externalDataSourcesSourcePrefixCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesSourcePrefixCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesSourcePrefixCreate>>;

const result: ExternalDataSourcesSourcePrefixCreateOutput = await posthog.externalDataSourcesSourcePrefixCreate();

// Result shape (from schema): unknown
```

### `posthog.externalDataSourcesStoreCredentialsCreate`

- **HTTP**: `POST /api/projects/{project_id}/external_data_sources/store_credentials/`
- **What it does**: Validate and store credentials for a data warehouse source without creating the source.

Backs the source connect page: the user enters credentials directly in PostHog, they are
checked against a live connection, then stashed encrypted in a temporary store. The returned
credential id can be passed to `setup` as {'credential_id': <id>} to create the source — so
secrets never travel through an agent conversation. The stash is single-use: it is deleted
as soon as `setup` consumes it, and expires after 24 hours if never consumed.
- **OpenAPI operationId**: `external_data_sources_store_credentials_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ credential_id: string; source_type: string; created_at: string; expires_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesStoreCredentialsCreateInput = Parameters<typeof posthog.externalDataSourcesStoreCredentialsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesStoreCredentialsCreateOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesStoreCredentialsCreate>>;

const result: ExternalDataSourcesStoreCredentialsCreateOutput = await posthog.externalDataSourcesStoreCredentialsCreate();

// Result shape (from schema): { credential_id: string; source_type: string; created_at: string; expires_at: string }
```

### `posthog.externalDataSourcesStoredCredentialsList`

- **HTTP**: `GET /api/projects/{project_id}/external_data_sources/stored_credentials/`
- **What it does**: List credentials stored via the source connect page that haven't been consumed yet.

Returns metadata only (id, source type, timestamps) — never the secrets themselves. Stored
credentials are temporary: they disappear once consumed by `setup` or when they expire.
Newest first, so after a user confirms they've finished the connect page, the first entry
for the source type is the one to pass to `setup`.
- **OpenAPI operationId**: `external_data_sources_stored_credentials_list`
- **Path params**: None
- **Query params**: `search`, `source_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ credential_id: string; source_type: string; created_at: string; expires_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExternalDataSourcesStoredCredentialsListInput = Parameters<typeof posthog.externalDataSourcesStoredCredentialsList> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesStoredCredentialsListOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesStoredCredentialsList>>;

const result: ExternalDataSourcesStoredCredentialsListOutput = await posthog.externalDataSourcesStoredCredentialsList();

// Result shape (from schema): ({ credential_id: string; source_type: string; created_at: string; expires_at: string })[]
```

### `posthog.externalDataSourcesWizardRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/external_data_sources/wizard/`
- **What it does**: Create, Read, Update and Delete External data Sources.
- **OpenAPI operationId**: `external_data_sources_wizard_retrieve`
- **Path params**: None
- **Query params**: `source_type`
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

type ExternalDataSourcesWizardRetrieveInput = Parameters<typeof posthog.externalDataSourcesWizardRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExternalDataSourcesWizardRetrieveOutput = Awaited<ReturnType<typeof posthog.externalDataSourcesWizardRetrieve>>;

const result: ExternalDataSourcesWizardRetrieveOutput = await posthog.externalDataSourcesWizardRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

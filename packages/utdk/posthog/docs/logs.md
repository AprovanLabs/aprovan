# Logs

## Operations

### `posthog.environmentsLogsAlertsList`

- **HTTP**: `GET /api/environments/{environment_id}/logs/alerts/`
- **OpenAPI operationId**: `environments_logs_alerts_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsAlertsListInput = Parameters<typeof posthog.environmentsLogsAlertsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsListOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsList>>;

const result: EnvironmentsLogsAlertsListOutput = await posthog.environmentsLogsAlertsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: ...
```

### `posthog.environmentsLogsAlertsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/alerts/`
- **OpenAPI operationId**: `environments_logs_alerts_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsAlertsCreateInput = Parameters<typeof posthog.environmentsLogsAlertsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsCreate>>;

const result: EnvironmentsLogsAlertsCreateOutput = await posthog.environmentsLogsAlertsCreate();

// Result shape (from schema): { id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...
```

### `posthog.environmentsLogsAlertsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/logs/alerts/{id}/`
- **OpenAPI operationId**: `environments_logs_alerts_destroy`
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

type EnvironmentsLogsAlertsDestroyInput = Parameters<typeof posthog.environmentsLogsAlertsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsDestroy>>;

const result: EnvironmentsLogsAlertsDestroyOutput = await posthog.environmentsLogsAlertsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsLogsAlertsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/logs/alerts/{id}/`
- **OpenAPI operationId**: `environments_logs_alerts_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsAlertsRetrieveInput = Parameters<typeof posthog.environmentsLogsAlertsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsRetrieve>>;

const result: EnvironmentsLogsAlertsRetrieveOutput = await posthog.environmentsLogsAlertsRetrieve();

// Result shape (from schema): { id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...
```

### `posthog.environmentsLogsAlertsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/logs/alerts/{id}/`
- **OpenAPI operationId**: `environments_logs_alerts_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsAlertsPartialUpdateInput = Parameters<typeof posthog.environmentsLogsAlertsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsPartialUpdate>>;

const result: EnvironmentsLogsAlertsPartialUpdateOutput = await posthog.environmentsLogsAlertsPartialUpdate();

// Result shape (from schema): { id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...
```

### `posthog.environmentsLogsAlertsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/logs/alerts/{id}/`
- **OpenAPI operationId**: `environments_logs_alerts_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsAlertsUpdateInput = Parameters<typeof posthog.environmentsLogsAlertsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsUpdate>>;

const result: EnvironmentsLogsAlertsUpdateOutput = await posthog.environmentsLogsAlertsUpdate();

// Result shape (from schema): { id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...
```

### `posthog.environmentsLogsAlertsDestinationsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/alerts/{id}/destinations/`
- **What it does**: Create a notification destination for this alert. One HogFunction is created per alert event kind (firing, resolved, ...) atomically.
- **OpenAPI operationId**: `environments_logs_alerts_destinations_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ hog_function_ids: (string)[] }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsAlertsDestinationsCreateInput = Parameters<typeof posthog.environmentsLogsAlertsDestinationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsDestinationsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsDestinationsCreate>>;

const result: EnvironmentsLogsAlertsDestinationsCreateOutput = await posthog.environmentsLogsAlertsDestinationsCreate();

// Result shape (from schema): { hog_function_ids: (string)[] }
```

### `posthog.environmentsLogsAlertsDestinationsDeleteCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/alerts/{id}/destinations/delete/`
- **What it does**: Delete a notification destination by deleting its HogFunction group atomically.
- **OpenAPI operationId**: `environments_logs_alerts_destinations_delete_create`
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

type EnvironmentsLogsAlertsDestinationsDeleteCreateInput = Parameters<typeof posthog.environmentsLogsAlertsDestinationsDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsDestinationsDeleteCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsDestinationsDeleteCreate>>;

const result: EnvironmentsLogsAlertsDestinationsDeleteCreateOutput = await posthog.environmentsLogsAlertsDestinationsDeleteCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsLogsAlertsEventsList`

- **HTTP**: `GET /api/environments/{environment_id}/logs/alerts/{id}/events/`
- **What it does**: Paginated event history for this alert, newest first. Returns state transitions, errored checks, and user-initiated control-plane rows (reset, enable/disable, snooze/unsnooze, threshold change) — quiet no-op check rows (where state didn't change and there was no error) are filtered out since only the last 10 are kept and they carry no forensic value. Optional `?kind=...` narrows to a single kind.
- **OpenAPI operationId**: `environments_logs_alerts_events_list`
- **Path params**: `id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; kind: "check" | "reset" | "enable" | "disable" | "snooze" | "unsnooze" | "threshold_change" | "broken_config";...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsAlertsEventsListInput = Parameters<typeof posthog.environmentsLogsAlertsEventsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsEventsListOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsEventsList>>;

const result: EnvironmentsLogsAlertsEventsListOutput = await posthog.environmentsLogsAlertsEventsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; kind: "check" | "reset" | "enable" | "disable" | "snooze" | "unsnooze" | "threshold_change" | "broken_config";...
```

### `posthog.environmentsLogsAlertsResetCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/alerts/{id}/reset/`
- **What it does**: Reset a broken alert. Clears the consecutive-failure counter and schedules an immediate recheck.
- **OpenAPI operationId**: `environments_logs_alerts_reset_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsAlertsResetCreateInput = Parameters<typeof posthog.environmentsLogsAlertsResetCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsResetCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsResetCreate>>;

const result: EnvironmentsLogsAlertsResetCreateOutput = await posthog.environmentsLogsAlertsResetCreate();

// Result shape (from schema): { id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...
```

### `posthog.environmentsLogsAlertsSimulateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/alerts/simulate/`
- **What it does**: Simulate a logs alert on historical data using the full state machine. Read-only — no alert check records are created.
- **OpenAPI operationId**: `environments_logs_alerts_simulate_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ buckets: ({ timestamp: string; count: number; threshold_breached: boolean; state: string; notification: string; reason: string })[]; fire_count: number; resolve_count: number; total_buckets: number; threshold_count: n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsAlertsSimulateCreateInput = Parameters<typeof posthog.environmentsLogsAlertsSimulateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAlertsSimulateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAlertsSimulateCreate>>;

const result: EnvironmentsLogsAlertsSimulateCreateOutput = await posthog.environmentsLogsAlertsSimulateCreate();

// Result shape (from schema): { buckets: ({ timestamp: string; count: number; threshold_breached: boolean; state: string; notification: string; reason: string })[]; fire_count: number; resolve_count: number; total_buckets: number; threshold_count: n...
```

### `posthog.environmentsLogsAttributesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/logs/attributes/`
- **OpenAPI operationId**: `environments_logs_attributes_retrieve`
- **Path params**: None
- **Query params**: `attribute_type`, `dateRange`, `filterGroup`, `limit`, `offset`, `search`, `search_values`, `serviceNames`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ name: string; propertyFilterType: string; matchedOn: "key" | "value"; matchedValue?: string | null })[]; count: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsAttributesRetrieveInput = Parameters<typeof posthog.environmentsLogsAttributesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsAttributesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLogsAttributesRetrieve>>;

const result: EnvironmentsLogsAttributesRetrieveOutput = await posthog.environmentsLogsAttributesRetrieve();

// Result shape (from schema): { results: ({ name: string; propertyFilterType: string; matchedOn: "key" | "value"; matchedValue?: string | null })[]; count: number }
```

### `posthog.environmentsLogsCountRangesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/count-ranges/`
- **OpenAPI operationId**: `environments_logs_count_ranges_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ ranges: ({ date_from: string; date_to: string; count: number })[]; interval: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsCountRangesCreateInput = Parameters<typeof posthog.environmentsLogsCountRangesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsCountRangesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsCountRangesCreate>>;

const result: EnvironmentsLogsCountRangesCreateOutput = await posthog.environmentsLogsCountRangesCreate();

// Result shape (from schema): { ranges: ({ date_from: string; date_to: string; count: number })[]; interval: string }
```

### `posthog.environmentsLogsCountCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/count/`
- **OpenAPI operationId**: `environments_logs_count_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsCountCreateInput = Parameters<typeof posthog.environmentsLogsCountCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsCountCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsCountCreate>>;

const result: EnvironmentsLogsCountCreateOutput = await posthog.environmentsLogsCountCreate();

// Result shape (from schema): { count: number }
```

### `posthog.environmentsLogsExplainLogWithAiCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/explainLogWithAI/`
- **What it does**: Explain a log entry using AI.

POST /api/environments/:id/logs/explainLogWithAI/
- **OpenAPI operationId**: `environments_logs_explainLogWithAI_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ uuid: string; timestamp: string; force_refresh?: boolean }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsExplainLogWithAiCreateInput = Parameters<typeof posthog.environmentsLogsExplainLogWithAiCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsExplainLogWithAiCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsExplainLogWithAiCreate>>;

const result: EnvironmentsLogsExplainLogWithAiCreateOutput = await posthog.environmentsLogsExplainLogWithAiCreate();

// Result shape (from schema): { uuid: string; timestamp: string; force_refresh?: boolean }
```

### `posthog.environmentsLogsExportCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/export/`
- **OpenAPI operationId**: `environments_logs_export_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsExportCreateInput = Parameters<typeof posthog.environmentsLogsExportCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsExportCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsExportCreate>>;

const result: EnvironmentsLogsExportCreateOutput = await posthog.environmentsLogsExportCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.environmentsLogsFacetValuesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/facet_values/`
- **OpenAPI operationId**: `environments_logs_facet_values_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ value: string; count: number })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsFacetValuesCreateInput = Parameters<typeof posthog.environmentsLogsFacetValuesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsFacetValuesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsFacetValuesCreate>>;

const result: EnvironmentsLogsFacetValuesCreateOutput = await posthog.environmentsLogsFacetValuesCreate();

// Result shape (from schema): { results: ({ value: string; count: number })[] }
```

### `posthog.environmentsLogsGroupByCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/group-by/`
- **OpenAPI operationId**: `environments_logs_group_by_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ groups: ({ value: string; log_count: number; error_count: number; last_seen: string })[]; total_groups: number; total_logs: number; truncated: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsGroupByCreateInput = Parameters<typeof posthog.environmentsLogsGroupByCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsGroupByCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsGroupByCreate>>;

const result: EnvironmentsLogsGroupByCreateOutput = await posthog.environmentsLogsGroupByCreate();

// Result shape (from schema): { groups: ({ value: string; log_count: number; error_count: number; last_seen: string })[]; total_groups: number; total_logs: number; truncated: boolean }
```

### `posthog.environmentsLogsHasLogsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/logs/has_logs/`
- **OpenAPI operationId**: `environments_logs_has_logs_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsHasLogsRetrieveInput = Parameters<typeof posthog.environmentsLogsHasLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsHasLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLogsHasLogsRetrieve>>;

const result: EnvironmentsLogsHasLogsRetrieveOutput = await posthog.environmentsLogsHasLogsRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.environmentsLogsPatternsDiffCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/patterns_diff/`
- **OpenAPI operationId**: `environments_logs_patterns_diff_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ entries: ({ classification: "new" | "rate_shift" | "gone" | "unchanged"; rate_ratio: number | null; pattern: { pattern: string; count: number; estimated_count: number; volume_share_pct: number; error_count: number; es...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsPatternsDiffCreateInput = Parameters<typeof posthog.environmentsLogsPatternsDiffCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsPatternsDiffCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsPatternsDiffCreate>>;

const result: EnvironmentsLogsPatternsDiffCreateOutput = await posthog.environmentsLogsPatternsDiffCreate();

// Result shape (from schema): { entries: ({ classification: "new" | "rate_shift" | "gone" | "unchanged"; rate_ratio: number | null; pattern: { pattern: string; count: number; estimated_count: number; volume_share_pct: number; error_count: number; es...
```

### `posthog.environmentsLogsPatternsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/patterns/`
- **OpenAPI operationId**: `environments_logs_patterns_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ patterns: ({ pattern: string; count: number; estimated_count: number; volume_share_pct: number; error_count: number; estimated_error_count: number; first_seen: string; last_seen: string; examples: ({ body: string; sev...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsPatternsCreateInput = Parameters<typeof posthog.environmentsLogsPatternsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsPatternsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsPatternsCreate>>;

const result: EnvironmentsLogsPatternsCreateOutput = await posthog.environmentsLogsPatternsCreate();

// Result shape (from schema): { patterns: ({ pattern: string; count: number; estimated_count: number; volume_share_pct: number; error_count: number; estimated_error_count: number; first_seen: string; last_seen: string; examples: ({ body: string; sev...
```

### `posthog.environmentsLogsQueryCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/query/`
- **OpenAPI operationId**: `environments_logs_query_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ query: { [key: string]: unknown }; results: ({ uuid: string; timestamp: string; observed_timestamp: string; body: string; severity_text: string; severity_number: number; level: string; trace_id: string; span_id: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsQueryCreateInput = Parameters<typeof posthog.environmentsLogsQueryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsQueryCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsQueryCreate>>;

const result: EnvironmentsLogsQueryCreateOutput = await posthog.environmentsLogsQueryCreate();

// Result shape (from schema): { query: { [key: string]: unknown }; results: ({ uuid: string; timestamp: string; observed_timestamp: string; body: string; severity_text: string; severity_number: number; level: string; trace_id: string; span_id: strin...
```

### `posthog.environmentsLogsSamplingRulesList`

- **HTTP**: `GET /api/environments/{environment_id}/logs/sampling_rules/`
- **OpenAPI operationId**: `environments_logs_sampling_rules_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_serv...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsSamplingRulesListInput = Parameters<typeof posthog.environmentsLogsSamplingRulesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsSamplingRulesListOutput = Awaited<ReturnType<typeof posthog.environmentsLogsSamplingRulesList>>;

const result: EnvironmentsLogsSamplingRulesListOutput = await posthog.environmentsLogsSamplingRulesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_serv...
```

### `posthog.environmentsLogsSamplingRulesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/sampling_rules/`
- **OpenAPI operationId**: `environments_logs_sampling_rules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsSamplingRulesCreateInput = Parameters<typeof posthog.environmentsLogsSamplingRulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsSamplingRulesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsSamplingRulesCreate>>;

const result: EnvironmentsLogsSamplingRulesCreateOutput = await posthog.environmentsLogsSamplingRulesCreate();

// Result shape (from schema): { id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...
```

### `posthog.environmentsLogsSamplingRulesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/logs/sampling_rules/{id}/`
- **OpenAPI operationId**: `environments_logs_sampling_rules_destroy`
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

type EnvironmentsLogsSamplingRulesDestroyInput = Parameters<typeof posthog.environmentsLogsSamplingRulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsSamplingRulesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsLogsSamplingRulesDestroy>>;

const result: EnvironmentsLogsSamplingRulesDestroyOutput = await posthog.environmentsLogsSamplingRulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsLogsSamplingRulesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/logs/sampling_rules/{id}/`
- **OpenAPI operationId**: `environments_logs_sampling_rules_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsSamplingRulesRetrieveInput = Parameters<typeof posthog.environmentsLogsSamplingRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsSamplingRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLogsSamplingRulesRetrieve>>;

const result: EnvironmentsLogsSamplingRulesRetrieveOutput = await posthog.environmentsLogsSamplingRulesRetrieve();

// Result shape (from schema): { id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...
```

### `posthog.environmentsLogsSamplingRulesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/logs/sampling_rules/{id}/`
- **OpenAPI operationId**: `environments_logs_sampling_rules_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsSamplingRulesPartialUpdateInput = Parameters<typeof posthog.environmentsLogsSamplingRulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsSamplingRulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsSamplingRulesPartialUpdate>>;

const result: EnvironmentsLogsSamplingRulesPartialUpdateOutput = await posthog.environmentsLogsSamplingRulesPartialUpdate();

// Result shape (from schema): { id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...
```

### `posthog.environmentsLogsSamplingRulesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/logs/sampling_rules/{id}/`
- **OpenAPI operationId**: `environments_logs_sampling_rules_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsSamplingRulesUpdateInput = Parameters<typeof posthog.environmentsLogsSamplingRulesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsSamplingRulesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsSamplingRulesUpdate>>;

const result: EnvironmentsLogsSamplingRulesUpdateOutput = await posthog.environmentsLogsSamplingRulesUpdate();

// Result shape (from schema): { id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...
```

### `posthog.environmentsLogsSamplingRulesSimulateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/sampling_rules/{id}/simulate/`
- **What it does**: Dry-run estimate for how much volume this rule would remove (placeholder response until CH-backed simulation is wired).
- **OpenAPI operationId**: `environments_logs_sampling_rules_simulate_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ estimated_reduction_pct: number; notes: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsSamplingRulesSimulateCreateInput = Parameters<typeof posthog.environmentsLogsSamplingRulesSimulateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsSamplingRulesSimulateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsSamplingRulesSimulateCreate>>;

const result: EnvironmentsLogsSamplingRulesSimulateCreateOutput = await posthog.environmentsLogsSamplingRulesSimulateCreate();

// Result shape (from schema): { estimated_reduction_pct: number; notes: string }
```

### `posthog.environmentsLogsSamplingRulesReorderCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/sampling_rules/reorder/`
- **What it does**: Atomically reassign priorities so the given ID order maps to ascending priorities (0..n-1).
- **OpenAPI operationId**: `environments_logs_sampling_rules_reorder_create`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_serv...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsSamplingRulesReorderCreateInput = Parameters<typeof posthog.environmentsLogsSamplingRulesReorderCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsSamplingRulesReorderCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsSamplingRulesReorderCreate>>;

const result: EnvironmentsLogsSamplingRulesReorderCreateOutput = await posthog.environmentsLogsSamplingRulesReorderCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_serv...
```

### `posthog.environmentsLogsServicesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/services/`
- **OpenAPI operationId**: `environments_logs_services_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ services: ({ service_name: string; log_count: number; error_count: number; error_rate: number; volume_share_pct?: number; severity_breakdown?: { debug: number; info: number; warn: number; error: number }; active_rules...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsServicesCreateInput = Parameters<typeof posthog.environmentsLogsServicesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsServicesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsServicesCreate>>;

const result: EnvironmentsLogsServicesCreateOutput = await posthog.environmentsLogsServicesCreate();

// Result shape (from schema): { services: ({ service_name: string; log_count: number; error_count: number; error_rate: number; volume_share_pct?: number; severity_breakdown?: { debug: number; info: number; warn: number; error: number }; active_rules...
```

### `posthog.environmentsLogsSparklineCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/sparkline/`
- **OpenAPI operationId**: `environments_logs_sparkline_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ time: string; severity?: string; service?: string; count: number; bytes_uncompressed?: number })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsSparklineCreateInput = Parameters<typeof posthog.environmentsLogsSparklineCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsSparklineCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsSparklineCreate>>;

const result: EnvironmentsLogsSparklineCreateOutput = await posthog.environmentsLogsSparklineCreate();

// Result shape (from schema): { results: ({ time: string; severity?: string; service?: string; count: number; bytes_uncompressed?: number })[] }
```

### `posthog.environmentsLogsValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/logs/values/`
- **OpenAPI operationId**: `environments_logs_values_retrieve`
- **Path params**: None
- **Query params**: `attribute_type`, `dateRange`, `filterGroup`, `key`, `serviceNames`, `value`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; name: string; count?: number })[]; refreshing: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsValuesRetrieveInput = Parameters<typeof posthog.environmentsLogsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLogsValuesRetrieve>>;

const result: EnvironmentsLogsValuesRetrieveOutput = await posthog.environmentsLogsValuesRetrieve();

// Result shape (from schema): { results: ({ id: string; name: string; count?: number })[]; refreshing: boolean }
```

### `posthog.environmentsLogsViewsList`

- **HTTP**: `GET /api/environments/{environment_id}/logs/views/`
- **OpenAPI operationId**: `environments_logs_views_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsViewsListInput = Parameters<typeof posthog.environmentsLogsViewsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsViewsListOutput = Awaited<ReturnType<typeof posthog.environmentsLogsViewsList>>;

const result: EnvironmentsLogsViewsListOutput = await posthog.environmentsLogsViewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: numb...
```

### `posthog.environmentsLogsViewsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/logs/views/`
- **OpenAPI operationId**: `environments_logs_views_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsViewsCreateInput = Parameters<typeof posthog.environmentsLogsViewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsViewsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsViewsCreate>>;

const result: EnvironmentsLogsViewsCreateOutput = await posthog.environmentsLogsViewsCreate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.environmentsLogsViewsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/logs/views/{short_id}/`
- **OpenAPI operationId**: `environments_logs_views_destroy`
- **Path params**: `short_id`
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

type EnvironmentsLogsViewsDestroyInput = Parameters<typeof posthog.environmentsLogsViewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsViewsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsLogsViewsDestroy>>;

const result: EnvironmentsLogsViewsDestroyOutput = await posthog.environmentsLogsViewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsLogsViewsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/logs/views/{short_id}/`
- **OpenAPI operationId**: `environments_logs_views_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsViewsRetrieveInput = Parameters<typeof posthog.environmentsLogsViewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsViewsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLogsViewsRetrieve>>;

const result: EnvironmentsLogsViewsRetrieveOutput = await posthog.environmentsLogsViewsRetrieve();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.environmentsLogsViewsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/logs/views/{short_id}/`
- **OpenAPI operationId**: `environments_logs_views_partial_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsViewsPartialUpdateInput = Parameters<typeof posthog.environmentsLogsViewsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsViewsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsViewsPartialUpdate>>;

const result: EnvironmentsLogsViewsPartialUpdateOutput = await posthog.environmentsLogsViewsPartialUpdate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.environmentsLogsViewsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/logs/views/{short_id}/`
- **OpenAPI operationId**: `environments_logs_views_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLogsViewsUpdateInput = Parameters<typeof posthog.environmentsLogsViewsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLogsViewsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLogsViewsUpdate>>;

const result: EnvironmentsLogsViewsUpdateOutput = await posthog.environmentsLogsViewsUpdate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.logsAlertsList`

- **HTTP**: `GET /api/projects/{project_id}/logs/alerts/`
- **OpenAPI operationId**: `logs_alerts_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsAlertsListInput = Parameters<typeof posthog.logsAlertsList> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsListOutput = Awaited<ReturnType<typeof posthog.logsAlertsList>>;

const result: LogsAlertsListOutput = await posthog.logsAlertsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: ...
```

### `posthog.logsAlertsCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/alerts/`
- **OpenAPI operationId**: `logs_alerts_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LogsAlertsCreateInput = Parameters<typeof posthog.logsAlertsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsCreateOutput = Awaited<ReturnType<typeof posthog.logsAlertsCreate>>;

const result: LogsAlertsCreateOutput = await posthog.logsAlertsCreate();

// Result shape (from schema): { id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...
```

### `posthog.logsAlertsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/logs/alerts/{id}/`
- **OpenAPI operationId**: `logs_alerts_destroy`
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

type LogsAlertsDestroyInput = Parameters<typeof posthog.logsAlertsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsDestroyOutput = Awaited<ReturnType<typeof posthog.logsAlertsDestroy>>;

const result: LogsAlertsDestroyOutput = await posthog.logsAlertsDestroy();

// Result shape (from schema): unknown
```

### `posthog.logsAlertsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/logs/alerts/{id}/`
- **OpenAPI operationId**: `logs_alerts_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsAlertsRetrieveInput = Parameters<typeof posthog.logsAlertsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsRetrieveOutput = Awaited<ReturnType<typeof posthog.logsAlertsRetrieve>>;

const result: LogsAlertsRetrieveOutput = await posthog.logsAlertsRetrieve();

// Result shape (from schema): { id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...
```

### `posthog.logsAlertsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/logs/alerts/{id}/`
- **OpenAPI operationId**: `logs_alerts_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsAlertsPartialUpdateInput = Parameters<typeof posthog.logsAlertsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.logsAlertsPartialUpdate>>;

const result: LogsAlertsPartialUpdateOutput = await posthog.logsAlertsPartialUpdate();

// Result shape (from schema): { id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...
```

### `posthog.logsAlertsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/logs/alerts/{id}/`
- **OpenAPI operationId**: `logs_alerts_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsAlertsUpdateInput = Parameters<typeof posthog.logsAlertsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsUpdateOutput = Awaited<ReturnType<typeof posthog.logsAlertsUpdate>>;

const result: LogsAlertsUpdateOutput = await posthog.logsAlertsUpdate();

// Result shape (from schema): { id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...
```

### `posthog.logsAlertsDestinationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/alerts/{id}/destinations/`
- **What it does**: Create a notification destination for this alert. One HogFunction is created per alert event kind (firing, resolved, ...) atomically.
- **OpenAPI operationId**: `logs_alerts_destinations_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ hog_function_ids: (string)[] }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LogsAlertsDestinationsCreateInput = Parameters<typeof posthog.logsAlertsDestinationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsDestinationsCreateOutput = Awaited<ReturnType<typeof posthog.logsAlertsDestinationsCreate>>;

const result: LogsAlertsDestinationsCreateOutput = await posthog.logsAlertsDestinationsCreate();

// Result shape (from schema): { hog_function_ids: (string)[] }
```

### `posthog.logsAlertsDestinationsDeleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/alerts/{id}/destinations/delete/`
- **What it does**: Delete a notification destination by deleting its HogFunction group atomically.
- **OpenAPI operationId**: `logs_alerts_destinations_delete_create`
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

type LogsAlertsDestinationsDeleteCreateInput = Parameters<typeof posthog.logsAlertsDestinationsDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsDestinationsDeleteCreateOutput = Awaited<ReturnType<typeof posthog.logsAlertsDestinationsDeleteCreate>>;

const result: LogsAlertsDestinationsDeleteCreateOutput = await posthog.logsAlertsDestinationsDeleteCreate();

// Result shape (from schema): unknown
```

### `posthog.logsAlertsEventsList`

- **HTTP**: `GET /api/projects/{project_id}/logs/alerts/{id}/events/`
- **What it does**: Paginated event history for this alert, newest first. Returns state transitions, errored checks, and user-initiated control-plane rows (reset, enable/disable, snooze/unsnooze, threshold change) — quiet no-op check rows (where state didn't change and there was no error) are filtered out since only the last 10 are kept and they carry no forensic value. Optional `?kind=...` narrows to a single kind.
- **OpenAPI operationId**: `logs_alerts_events_list`
- **Path params**: `id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; kind: "check" | "reset" | "enable" | "disable" | "snooze" | "unsnooze" | "threshold_change" | "broken_config";...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsAlertsEventsListInput = Parameters<typeof posthog.logsAlertsEventsList> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsEventsListOutput = Awaited<ReturnType<typeof posthog.logsAlertsEventsList>>;

const result: LogsAlertsEventsListOutput = await posthog.logsAlertsEventsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; kind: "check" | "reset" | "enable" | "disable" | "snooze" | "unsnooze" | "threshold_change" | "broken_config";...
```

### `posthog.logsAlertsResetCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/alerts/{id}/reset/`
- **What it does**: Reset a broken alert. Clears the consecutive-failure counter and schedules an immediate recheck.
- **OpenAPI operationId**: `logs_alerts_reset_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsAlertsResetCreateInput = Parameters<typeof posthog.logsAlertsResetCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsResetCreateOutput = Awaited<ReturnType<typeof posthog.logsAlertsResetCreate>>;

const result: LogsAlertsResetCreateOutput = await posthog.logsAlertsResetCreate();

// Result shape (from schema): { id: string; name?: string; enabled?: boolean; filters?: { filterGroup?: { type: "AND" | "OR"; values: ({ type: "AND" | "OR"; values: ({ type: unknown; values: (unknown | { key: string; label?: string | null; operator?...
```

### `posthog.logsAlertsSimulateCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/alerts/simulate/`
- **What it does**: Simulate a logs alert on historical data using the full state machine. Read-only — no alert check records are created.
- **OpenAPI operationId**: `logs_alerts_simulate_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ buckets: ({ timestamp: string; count: number; threshold_breached: boolean; state: string; notification: string; reason: string })[]; fire_count: number; resolve_count: number; total_buckets: number; threshold_count: n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsAlertsSimulateCreateInput = Parameters<typeof posthog.logsAlertsSimulateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAlertsSimulateCreateOutput = Awaited<ReturnType<typeof posthog.logsAlertsSimulateCreate>>;

const result: LogsAlertsSimulateCreateOutput = await posthog.logsAlertsSimulateCreate();

// Result shape (from schema): { buckets: ({ timestamp: string; count: number; threshold_breached: boolean; state: string; notification: string; reason: string })[]; fire_count: number; resolve_count: number; total_buckets: number; threshold_count: n...
```

### `posthog.logsAttributesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/logs/attributes/`
- **OpenAPI operationId**: `logs_attributes_retrieve`
- **Path params**: None
- **Query params**: `attribute_type`, `dateRange`, `filterGroup`, `limit`, `offset`, `search`, `search_values`, `serviceNames`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ name: string; propertyFilterType: string; matchedOn: "key" | "value"; matchedValue?: string | null })[]; count: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsAttributesRetrieveInput = Parameters<typeof posthog.logsAttributesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LogsAttributesRetrieveOutput = Awaited<ReturnType<typeof posthog.logsAttributesRetrieve>>;

const result: LogsAttributesRetrieveOutput = await posthog.logsAttributesRetrieve();

// Result shape (from schema): { results: ({ name: string; propertyFilterType: string; matchedOn: "key" | "value"; matchedValue?: string | null })[]; count: number }
```

### `posthog.logsCountRangesCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/count-ranges/`
- **OpenAPI operationId**: `logs_count_ranges_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ ranges: ({ date_from: string; date_to: string; count: number })[]; interval: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsCountRangesCreateInput = Parameters<typeof posthog.logsCountRangesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsCountRangesCreateOutput = Awaited<ReturnType<typeof posthog.logsCountRangesCreate>>;

const result: LogsCountRangesCreateOutput = await posthog.logsCountRangesCreate();

// Result shape (from schema): { ranges: ({ date_from: string; date_to: string; count: number })[]; interval: string }
```

### `posthog.logsCountCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/count/`
- **OpenAPI operationId**: `logs_count_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsCountCreateInput = Parameters<typeof posthog.logsCountCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsCountCreateOutput = Awaited<ReturnType<typeof posthog.logsCountCreate>>;

const result: LogsCountCreateOutput = await posthog.logsCountCreate();

// Result shape (from schema): { count: number }
```

### `posthog.logsExplainLogWithAiCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/explainLogWithAI/`
- **What it does**: Explain a log entry using AI.

POST /api/environments/:id/logs/explainLogWithAI/
- **OpenAPI operationId**: `logs_explainLogWithAI_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ uuid: string; timestamp: string; force_refresh?: boolean }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LogsExplainLogWithAiCreateInput = Parameters<typeof posthog.logsExplainLogWithAiCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsExplainLogWithAiCreateOutput = Awaited<ReturnType<typeof posthog.logsExplainLogWithAiCreate>>;

const result: LogsExplainLogWithAiCreateOutput = await posthog.logsExplainLogWithAiCreate();

// Result shape (from schema): { uuid: string; timestamp: string; force_refresh?: boolean }
```

### `posthog.logsExportCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/export/`
- **OpenAPI operationId**: `logs_export_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LogsExportCreateInput = Parameters<typeof posthog.logsExportCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsExportCreateOutput = Awaited<ReturnType<typeof posthog.logsExportCreate>>;

const result: LogsExportCreateOutput = await posthog.logsExportCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.logsFacetValuesCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/facet_values/`
- **OpenAPI operationId**: `logs_facet_values_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ value: string; count: number })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsFacetValuesCreateInput = Parameters<typeof posthog.logsFacetValuesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsFacetValuesCreateOutput = Awaited<ReturnType<typeof posthog.logsFacetValuesCreate>>;

const result: LogsFacetValuesCreateOutput = await posthog.logsFacetValuesCreate();

// Result shape (from schema): { results: ({ value: string; count: number })[] }
```

### `posthog.logsGroupByCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/group-by/`
- **OpenAPI operationId**: `logs_group_by_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ groups: ({ value: string; log_count: number; error_count: number; last_seen: string })[]; total_groups: number; total_logs: number; truncated: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsGroupByCreateInput = Parameters<typeof posthog.logsGroupByCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsGroupByCreateOutput = Awaited<ReturnType<typeof posthog.logsGroupByCreate>>;

const result: LogsGroupByCreateOutput = await posthog.logsGroupByCreate();

// Result shape (from schema): { groups: ({ value: string; log_count: number; error_count: number; last_seen: string })[]; total_groups: number; total_logs: number; truncated: boolean }
```

### `posthog.logsHasLogsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/logs/has_logs/`
- **OpenAPI operationId**: `logs_has_logs_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsHasLogsRetrieveInput = Parameters<typeof posthog.logsHasLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LogsHasLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.logsHasLogsRetrieve>>;

const result: LogsHasLogsRetrieveOutput = await posthog.logsHasLogsRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.logsPatternsDiffCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/patterns_diff/`
- **OpenAPI operationId**: `logs_patterns_diff_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ entries: ({ classification: "new" | "rate_shift" | "gone" | "unchanged"; rate_ratio: number | null; pattern: { pattern: string; count: number; estimated_count: number; volume_share_pct: number; error_count: number; es...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsPatternsDiffCreateInput = Parameters<typeof posthog.logsPatternsDiffCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsPatternsDiffCreateOutput = Awaited<ReturnType<typeof posthog.logsPatternsDiffCreate>>;

const result: LogsPatternsDiffCreateOutput = await posthog.logsPatternsDiffCreate();

// Result shape (from schema): { entries: ({ classification: "new" | "rate_shift" | "gone" | "unchanged"; rate_ratio: number | null; pattern: { pattern: string; count: number; estimated_count: number; volume_share_pct: number; error_count: number; es...
```

### `posthog.logsPatternsCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/patterns/`
- **OpenAPI operationId**: `logs_patterns_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ patterns: ({ pattern: string; count: number; estimated_count: number; volume_share_pct: number; error_count: number; estimated_error_count: number; first_seen: string; last_seen: string; examples: ({ body: string; sev...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsPatternsCreateInput = Parameters<typeof posthog.logsPatternsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsPatternsCreateOutput = Awaited<ReturnType<typeof posthog.logsPatternsCreate>>;

const result: LogsPatternsCreateOutput = await posthog.logsPatternsCreate();

// Result shape (from schema): { patterns: ({ pattern: string; count: number; estimated_count: number; volume_share_pct: number; error_count: number; estimated_error_count: number; first_seen: string; last_seen: string; examples: ({ body: string; sev...
```

### `posthog.logsQueryCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/query/`
- **OpenAPI operationId**: `logs_query_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ query: { [key: string]: unknown }; results: ({ uuid: string; timestamp: string; observed_timestamp: string; body: string; severity_text: string; severity_number: number; level: string; trace_id: string; span_id: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsQueryCreateInput = Parameters<typeof posthog.logsQueryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsQueryCreateOutput = Awaited<ReturnType<typeof posthog.logsQueryCreate>>;

const result: LogsQueryCreateOutput = await posthog.logsQueryCreate();

// Result shape (from schema): { query: { [key: string]: unknown }; results: ({ uuid: string; timestamp: string; observed_timestamp: string; body: string; severity_text: string; severity_number: number; level: string; trace_id: string; span_id: strin...
```

### `posthog.logsSamplingRulesList`

- **HTTP**: `GET /api/projects/{project_id}/logs/sampling_rules/`
- **OpenAPI operationId**: `logs_sampling_rules_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_serv...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsSamplingRulesListInput = Parameters<typeof posthog.logsSamplingRulesList> extends [infer T, ...unknown[]] ? T : undefined;
type LogsSamplingRulesListOutput = Awaited<ReturnType<typeof posthog.logsSamplingRulesList>>;

const result: LogsSamplingRulesListOutput = await posthog.logsSamplingRulesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_serv...
```

### `posthog.logsSamplingRulesCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/sampling_rules/`
- **OpenAPI operationId**: `logs_sampling_rules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LogsSamplingRulesCreateInput = Parameters<typeof posthog.logsSamplingRulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsSamplingRulesCreateOutput = Awaited<ReturnType<typeof posthog.logsSamplingRulesCreate>>;

const result: LogsSamplingRulesCreateOutput = await posthog.logsSamplingRulesCreate();

// Result shape (from schema): { id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...
```

### `posthog.logsSamplingRulesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/logs/sampling_rules/{id}/`
- **OpenAPI operationId**: `logs_sampling_rules_destroy`
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

type LogsSamplingRulesDestroyInput = Parameters<typeof posthog.logsSamplingRulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LogsSamplingRulesDestroyOutput = Awaited<ReturnType<typeof posthog.logsSamplingRulesDestroy>>;

const result: LogsSamplingRulesDestroyOutput = await posthog.logsSamplingRulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.logsSamplingRulesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/logs/sampling_rules/{id}/`
- **OpenAPI operationId**: `logs_sampling_rules_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsSamplingRulesRetrieveInput = Parameters<typeof posthog.logsSamplingRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LogsSamplingRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.logsSamplingRulesRetrieve>>;

const result: LogsSamplingRulesRetrieveOutput = await posthog.logsSamplingRulesRetrieve();

// Result shape (from schema): { id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...
```

### `posthog.logsSamplingRulesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/logs/sampling_rules/{id}/`
- **OpenAPI operationId**: `logs_sampling_rules_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsSamplingRulesPartialUpdateInput = Parameters<typeof posthog.logsSamplingRulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsSamplingRulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.logsSamplingRulesPartialUpdate>>;

const result: LogsSamplingRulesPartialUpdateOutput = await posthog.logsSamplingRulesPartialUpdate();

// Result shape (from schema): { id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...
```

### `posthog.logsSamplingRulesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/logs/sampling_rules/{id}/`
- **OpenAPI operationId**: `logs_sampling_rules_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsSamplingRulesUpdateInput = Parameters<typeof posthog.logsSamplingRulesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsSamplingRulesUpdateOutput = Awaited<ReturnType<typeof posthog.logsSamplingRulesUpdate>>;

const result: LogsSamplingRulesUpdateOutput = await posthog.logsSamplingRulesUpdate();

// Result shape (from schema): { id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_service?: string | null; scope_path_pattern?: string | null; scope_attribute_fi...
```

### `posthog.logsSamplingRulesSimulateCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/sampling_rules/{id}/simulate/`
- **What it does**: Dry-run estimate for how much volume this rule would remove (placeholder response until CH-backed simulation is wired).
- **OpenAPI operationId**: `logs_sampling_rules_simulate_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ estimated_reduction_pct: number; notes: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsSamplingRulesSimulateCreateInput = Parameters<typeof posthog.logsSamplingRulesSimulateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsSamplingRulesSimulateCreateOutput = Awaited<ReturnType<typeof posthog.logsSamplingRulesSimulateCreate>>;

const result: LogsSamplingRulesSimulateCreateOutput = await posthog.logsSamplingRulesSimulateCreate();

// Result shape (from schema): { estimated_reduction_pct: number; notes: string }
```

### `posthog.logsSamplingRulesReorderCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/sampling_rules/reorder/`
- **What it does**: Atomically reassign priorities so the given ID order maps to ascending priorities (0..n-1).
- **OpenAPI operationId**: `logs_sampling_rules_reorder_create`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_serv...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsSamplingRulesReorderCreateInput = Parameters<typeof posthog.logsSamplingRulesReorderCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsSamplingRulesReorderCreateOutput = Awaited<ReturnType<typeof posthog.logsSamplingRulesReorderCreate>>;

const result: LogsSamplingRulesReorderCreateOutput = await posthog.logsSamplingRulesReorderCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; enabled?: boolean; priority?: number | null; rule_type: "severity_sampling" | "path_drop" | "rate_limit"; scope_serv...
```

### `posthog.logsServicesCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/services/`
- **OpenAPI operationId**: `logs_services_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ services: ({ service_name: string; log_count: number; error_count: number; error_rate: number; volume_share_pct?: number; severity_breakdown?: { debug: number; info: number; warn: number; error: number }; active_rules...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsServicesCreateInput = Parameters<typeof posthog.logsServicesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsServicesCreateOutput = Awaited<ReturnType<typeof posthog.logsServicesCreate>>;

const result: LogsServicesCreateOutput = await posthog.logsServicesCreate();

// Result shape (from schema): { services: ({ service_name: string; log_count: number; error_count: number; error_rate: number; volume_share_pct?: number; severity_breakdown?: { debug: number; info: number; warn: number; error: number }; active_rules...
```

### `posthog.logsSparklineCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/sparkline/`
- **OpenAPI operationId**: `logs_sparkline_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ time: string; severity?: string; service?: string; count: number; bytes_uncompressed?: number })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsSparklineCreateInput = Parameters<typeof posthog.logsSparklineCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsSparklineCreateOutput = Awaited<ReturnType<typeof posthog.logsSparklineCreate>>;

const result: LogsSparklineCreateOutput = await posthog.logsSparklineCreate();

// Result shape (from schema): { results: ({ time: string; severity?: string; service?: string; count: number; bytes_uncompressed?: number })[] }
```

### `posthog.logsValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/logs/values/`
- **OpenAPI operationId**: `logs_values_retrieve`
- **Path params**: None
- **Query params**: `attribute_type`, `dateRange`, `filterGroup`, `key`, `serviceNames`, `value`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; name: string; count?: number })[]; refreshing: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsValuesRetrieveInput = Parameters<typeof posthog.logsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LogsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.logsValuesRetrieve>>;

const result: LogsValuesRetrieveOutput = await posthog.logsValuesRetrieve();

// Result shape (from schema): { results: ({ id: string; name: string; count?: number })[]; refreshing: boolean }
```

### `posthog.logsViewsList`

- **HTTP**: `GET /api/projects/{project_id}/logs/views/`
- **OpenAPI operationId**: `logs_views_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsViewsListInput = Parameters<typeof posthog.logsViewsList> extends [infer T, ...unknown[]] ? T : undefined;
type LogsViewsListOutput = Awaited<ReturnType<typeof posthog.logsViewsList>>;

const result: LogsViewsListOutput = await posthog.logsViewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: numb...
```

### `posthog.logsViewsCreate`

- **HTTP**: `POST /api/projects/{project_id}/logs/views/`
- **OpenAPI operationId**: `logs_views_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LogsViewsCreateInput = Parameters<typeof posthog.logsViewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsViewsCreateOutput = Awaited<ReturnType<typeof posthog.logsViewsCreate>>;

const result: LogsViewsCreateOutput = await posthog.logsViewsCreate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.logsViewsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/logs/views/{short_id}/`
- **OpenAPI operationId**: `logs_views_destroy`
- **Path params**: `short_id`
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

type LogsViewsDestroyInput = Parameters<typeof posthog.logsViewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LogsViewsDestroyOutput = Awaited<ReturnType<typeof posthog.logsViewsDestroy>>;

const result: LogsViewsDestroyOutput = await posthog.logsViewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.logsViewsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/logs/views/{short_id}/`
- **OpenAPI operationId**: `logs_views_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsViewsRetrieveInput = Parameters<typeof posthog.logsViewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LogsViewsRetrieveOutput = Awaited<ReturnType<typeof posthog.logsViewsRetrieve>>;

const result: LogsViewsRetrieveOutput = await posthog.logsViewsRetrieve();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.logsViewsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/logs/views/{short_id}/`
- **OpenAPI operationId**: `logs_views_partial_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsViewsPartialUpdateInput = Parameters<typeof posthog.logsViewsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsViewsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.logsViewsPartialUpdate>>;

const result: LogsViewsPartialUpdateOutput = await posthog.logsViewsPartialUpdate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.logsViewsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/logs/views/{short_id}/`
- **OpenAPI operationId**: `logs_views_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LogsViewsUpdateInput = Parameters<typeof posthog.logsViewsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LogsViewsUpdateOutput = Awaited<ReturnType<typeof posthog.logsViewsUpdate>>;

const result: LogsViewsUpdateOutput = await posthog.logsViewsUpdate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

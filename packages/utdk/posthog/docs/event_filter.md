# Event Filter

## Operations

### `posthog.environmentsEventFilterRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/event_filter/`
- **What it does**: Returns the event filter config for the team, or null if not yet created.
- **OpenAPI operationId**: `environments_event_filter_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; mode?: "disabled" | "dry_run" | "live"; filter_tree?: unknown; test_cases?: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEventFilterRetrieveInput = Parameters<typeof posthog.environmentsEventFilterRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEventFilterRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEventFilterRetrieve>>;

const result: EnvironmentsEventFilterRetrieveOutput = await posthog.environmentsEventFilterRetrieve();

// Result shape (from schema): { id: string; mode?: "disabled" | "dry_run" | "live"; filter_tree?: unknown; test_cases?: unknown; created_at: string; updated_at: string }
```

### `posthog.environmentsEventFilterCreate`

- **HTTP**: `POST /api/environments/{environment_id}/event_filter/`
- **What it does**: Create or update the event filter config.
- **OpenAPI operationId**: `environments_event_filter_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; mode?: "disabled" | "dry_run" | "live"; filter_tree?: unknown; test_cases?: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEventFilterCreateInput = Parameters<typeof posthog.environmentsEventFilterCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEventFilterCreateOutput = Awaited<ReturnType<typeof posthog.environmentsEventFilterCreate>>;

const result: EnvironmentsEventFilterCreateOutput = await posthog.environmentsEventFilterCreate();

// Result shape (from schema): { id: string; mode?: "disabled" | "dry_run" | "live"; filter_tree?: unknown; test_cases?: unknown; created_at: string; updated_at: string }
```

### `posthog.environmentsEventFilterMetricsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/event_filter/metrics/`
- **What it does**: Single event filter per team.
GET  /event_filter/ — returns the config (or null if not yet created)
POST /event_filter/ — creates or updates the config (upsert)
GET  /event_filter/metrics/ — time-series metrics
GET  /event_filter/metrics/totals/ — aggregate totals
- **OpenAPI operationId**: `environments_event_filter_metrics_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ labels: (string)[]; series: ({ name: string; values: (number)[] })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEventFilterMetricsRetrieveInput = Parameters<typeof posthog.environmentsEventFilterMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEventFilterMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEventFilterMetricsRetrieve>>;

const result: EnvironmentsEventFilterMetricsRetrieveOutput = await posthog.environmentsEventFilterMetricsRetrieve();

// Result shape (from schema): { labels: (string)[]; series: ({ name: string; values: (number)[] })[] }
```

### `posthog.environmentsEventFilterMetricsTotalsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/event_filter/metrics/totals/`
- **What it does**: Single event filter per team.
GET  /event_filter/ — returns the config (or null if not yet created)
POST /event_filter/ — creates or updates the config (upsert)
GET  /event_filter/metrics/ — time-series metrics
GET  /event_filter/metrics/totals/ — aggregate totals
- **OpenAPI operationId**: `environments_event_filter_metrics_totals_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ totals: { [key: string]: number | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEventFilterMetricsTotalsRetrieveInput = Parameters<typeof posthog.environmentsEventFilterMetricsTotalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEventFilterMetricsTotalsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEventFilterMetricsTotalsRetrieve>>;

const result: EnvironmentsEventFilterMetricsTotalsRetrieveOutput = await posthog.environmentsEventFilterMetricsTotalsRetrieve();

// Result shape (from schema): { totals: { [key: string]: number | undefined } }
```

### `posthog.eventFilterRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/event_filter/`
- **What it does**: Returns the event filter config for the team, or null if not yet created.
- **OpenAPI operationId**: `event_filter_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; mode?: "disabled" | "dry_run" | "live"; filter_tree?: unknown; test_cases?: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventFilterRetrieveInput = Parameters<typeof posthog.eventFilterRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventFilterRetrieveOutput = Awaited<ReturnType<typeof posthog.eventFilterRetrieve>>;

const result: EventFilterRetrieveOutput = await posthog.eventFilterRetrieve();

// Result shape (from schema): { id: string; mode?: "disabled" | "dry_run" | "live"; filter_tree?: unknown; test_cases?: unknown; created_at: string; updated_at: string }
```

### `posthog.eventFilterCreate`

- **HTTP**: `POST /api/projects/{project_id}/event_filter/`
- **What it does**: Create or update the event filter config.
- **OpenAPI operationId**: `event_filter_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; mode?: "disabled" | "dry_run" | "live"; filter_tree?: unknown; test_cases?: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventFilterCreateInput = Parameters<typeof posthog.eventFilterCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EventFilterCreateOutput = Awaited<ReturnType<typeof posthog.eventFilterCreate>>;

const result: EventFilterCreateOutput = await posthog.eventFilterCreate();

// Result shape (from schema): { id: string; mode?: "disabled" | "dry_run" | "live"; filter_tree?: unknown; test_cases?: unknown; created_at: string; updated_at: string }
```

### `posthog.eventFilterMetricsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/event_filter/metrics/`
- **What it does**: Single event filter per team.
GET  /event_filter/ — returns the config (or null if not yet created)
POST /event_filter/ — creates or updates the config (upsert)
GET  /event_filter/metrics/ — time-series metrics
GET  /event_filter/metrics/totals/ — aggregate totals
- **OpenAPI operationId**: `event_filter_metrics_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ labels: (string)[]; series: ({ name: string; values: (number)[] })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventFilterMetricsRetrieveInput = Parameters<typeof posthog.eventFilterMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventFilterMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.eventFilterMetricsRetrieve>>;

const result: EventFilterMetricsRetrieveOutput = await posthog.eventFilterMetricsRetrieve();

// Result shape (from schema): { labels: (string)[]; series: ({ name: string; values: (number)[] })[] }
```

### `posthog.eventFilterMetricsTotalsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/event_filter/metrics/totals/`
- **What it does**: Single event filter per team.
GET  /event_filter/ — returns the config (or null if not yet created)
POST /event_filter/ — creates or updates the config (upsert)
GET  /event_filter/metrics/ — time-series metrics
GET  /event_filter/metrics/totals/ — aggregate totals
- **OpenAPI operationId**: `event_filter_metrics_totals_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ totals: { [key: string]: number | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventFilterMetricsTotalsRetrieveInput = Parameters<typeof posthog.eventFilterMetricsTotalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventFilterMetricsTotalsRetrieveOutput = Awaited<ReturnType<typeof posthog.eventFilterMetricsTotalsRetrieve>>;

const result: EventFilterMetricsTotalsRetrieveOutput = await posthog.eventFilterMetricsTotalsRetrieve();

// Result shape (from schema): { totals: { [key: string]: number | undefined } }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

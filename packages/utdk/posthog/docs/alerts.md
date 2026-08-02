# Alerts

## Operations

### `posthog.environmentsAlertsList`

- **HTTP**: `GET /api/environments/{environment_id}/alerts/`
- **OpenAPI operationId**: `environments_alerts_list`
- **Path params**: None
- **Query params**: `created_by`, `insight_id`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAlertsListInput = Parameters<typeof posthog.environmentsAlertsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAlertsListOutput = Awaited<ReturnType<typeof posthog.environmentsAlertsList>>;

const result: EnvironmentsAlertsListOutput = await posthog.environmentsAlertsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...
```

### `posthog.environmentsAlertsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/alerts/`
- **OpenAPI operationId**: `environments_alerts_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAlertsCreateInput = Parameters<typeof posthog.environmentsAlertsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAlertsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsAlertsCreate>>;

const result: EnvironmentsAlertsCreateOutput = await posthog.environmentsAlertsCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsAlertsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/alerts/{id}/`
- **OpenAPI operationId**: `environments_alerts_destroy`
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

type EnvironmentsAlertsDestroyInput = Parameters<typeof posthog.environmentsAlertsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAlertsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsAlertsDestroy>>;

const result: EnvironmentsAlertsDestroyOutput = await posthog.environmentsAlertsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsAlertsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/alerts/{id}/`
- **OpenAPI operationId**: `environments_alerts_retrieve`
- **Path params**: `id`
- **Query params**: `checks_date_from`, `checks_date_to`, `checks_limit`, `checks_offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAlertsRetrieveInput = Parameters<typeof posthog.environmentsAlertsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAlertsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsAlertsRetrieve>>;

const result: EnvironmentsAlertsRetrieveOutput = await posthog.environmentsAlertsRetrieve();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsAlertsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/alerts/{id}/`
- **OpenAPI operationId**: `environments_alerts_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAlertsPartialUpdateInput = Parameters<typeof posthog.environmentsAlertsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAlertsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsAlertsPartialUpdate>>;

const result: EnvironmentsAlertsPartialUpdateOutput = await posthog.environmentsAlertsPartialUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsAlertsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/alerts/{id}/`
- **OpenAPI operationId**: `environments_alerts_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAlertsUpdateInput = Parameters<typeof posthog.environmentsAlertsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAlertsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsAlertsUpdate>>;

const result: EnvironmentsAlertsUpdateOutput = await posthog.environmentsAlertsUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsAlertsSimulateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/alerts/simulate/`
- **What it does**: Simulate a detector on an insight's historical data. Read-only — no AlertCheck records are created.
- **OpenAPI operationId**: `environments_alerts_simulate_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ data: (number)[]; dates: (string)[]; scores: (number | null)[]; triggered_indices: (number)[]; triggered_dates: (string)[]; interval: string | null; total_points: number; anomaly_count: number; sub_detector_scores?: (...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAlertsSimulateCreateInput = Parameters<typeof posthog.environmentsAlertsSimulateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAlertsSimulateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsAlertsSimulateCreate>>;

const result: EnvironmentsAlertsSimulateCreateOutput = await posthog.environmentsAlertsSimulateCreate();

// Result shape (from schema): { data: (number)[]; dates: (string)[]; scores: (number | null)[]; triggered_indices: (number)[]; triggered_dates: (string)[]; interval: string | null; total_points: number; anomaly_count: number; sub_detector_scores?: (...
```

### `posthog.alertsList`

- **HTTP**: `GET /api/projects/{project_id}/alerts/`
- **OpenAPI operationId**: `alerts_list`
- **Path params**: None
- **Query params**: `created_by`, `insight_id`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AlertsListInput = Parameters<typeof posthog.alertsList> extends [infer T, ...unknown[]] ? T : undefined;
type AlertsListOutput = Awaited<ReturnType<typeof posthog.alertsList>>;

const result: AlertsListOutput = await posthog.alertsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...
```

### `posthog.alertsCreate`

- **HTTP**: `POST /api/projects/{project_id}/alerts/`
- **OpenAPI operationId**: `alerts_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type AlertsCreateInput = Parameters<typeof posthog.alertsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AlertsCreateOutput = Awaited<ReturnType<typeof posthog.alertsCreate>>;

const result: AlertsCreateOutput = await posthog.alertsCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.alertsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/alerts/{id}/`
- **OpenAPI operationId**: `alerts_destroy`
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

type AlertsDestroyInput = Parameters<typeof posthog.alertsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type AlertsDestroyOutput = Awaited<ReturnType<typeof posthog.alertsDestroy>>;

const result: AlertsDestroyOutput = await posthog.alertsDestroy();

// Result shape (from schema): unknown
```

### `posthog.alertsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/alerts/{id}/`
- **OpenAPI operationId**: `alerts_retrieve`
- **Path params**: `id`
- **Query params**: `checks_date_from`, `checks_date_to`, `checks_limit`, `checks_offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AlertsRetrieveInput = Parameters<typeof posthog.alertsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AlertsRetrieveOutput = Awaited<ReturnType<typeof posthog.alertsRetrieve>>;

const result: AlertsRetrieveOutput = await posthog.alertsRetrieve();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.alertsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/alerts/{id}/`
- **OpenAPI operationId**: `alerts_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AlertsPartialUpdateInput = Parameters<typeof posthog.alertsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AlertsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.alertsPartialUpdate>>;

const result: AlertsPartialUpdateOutput = await posthog.alertsPartialUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.alertsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/alerts/{id}/`
- **OpenAPI operationId**: `alerts_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AlertsUpdateInput = Parameters<typeof posthog.alertsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AlertsUpdateOutput = Awaited<ReturnType<typeof posthog.alertsUpdate>>;

const result: AlertsUpdateOutput = await posthog.alertsUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.alertsSimulateCreate`

- **HTTP**: `POST /api/projects/{project_id}/alerts/simulate/`
- **What it does**: Simulate a detector on an insight's historical data. Read-only — no AlertCheck records are created.
- **OpenAPI operationId**: `alerts_simulate_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ data: (number)[]; dates: (string)[]; scores: (number | null)[]; triggered_indices: (number)[]; triggered_dates: (string)[]; interval: string | null; total_points: number; anomaly_count: number; sub_detector_scores?: (...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AlertsSimulateCreateInput = Parameters<typeof posthog.alertsSimulateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AlertsSimulateCreateOutput = Awaited<ReturnType<typeof posthog.alertsSimulateCreate>>;

const result: AlertsSimulateCreateOutput = await posthog.alertsSimulateCreate();

// Result shape (from schema): { data: (number)[]; dates: (string)[]; scores: (number | null)[]; triggered_indices: (number)[]; triggered_dates: (string)[]; interval: string | null; total_points: number; anomaly_count: number; sub_detector_scores?: (...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

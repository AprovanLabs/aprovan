# Metrics

## Operations

### `posthog.environmentsMetricsAttributeValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/metrics/attribute_values/`
- **What it does**: Observed values for one metric attribute key, most frequent first.
Backs the filter bar's value autocomplete.
- **OpenAPI operationId**: `environments_metrics_attribute_values_retrieve`
- **Path params**: None
- **Query params**: `dateFrom`, `dateTo`, `key`, `limit`, `value`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; name: string; count: number })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMetricsAttributeValuesRetrieveInput = Parameters<typeof posthog.environmentsMetricsAttributeValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMetricsAttributeValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMetricsAttributeValuesRetrieve>>;

const result: EnvironmentsMetricsAttributeValuesRetrieveOutput = await posthog.environmentsMetricsAttributeValuesRetrieve();

// Result shape (from schema): { results: ({ id: string; name: string; count: number })[] }
```

### `posthog.environmentsMetricsAttributesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/metrics/attributes/`
- **What it does**: Distinct attribute keys seen on the team's metrics (datapoint and
resource attributes merged), most frequent first. Backs the filter
bar's key autocomplete.
- **OpenAPI operationId**: `environments_metrics_attributes_retrieve`
- **Path params**: None
- **Query params**: `dateFrom`, `dateTo`, `limit`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ name: string })[]; count: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMetricsAttributesRetrieveInput = Parameters<typeof posthog.environmentsMetricsAttributesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMetricsAttributesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMetricsAttributesRetrieve>>;

const result: EnvironmentsMetricsAttributesRetrieveOutput = await posthog.environmentsMetricsAttributesRetrieve();

// Result shape (from schema): { results: ({ name: string })[]; count: number }
```

### `posthog.environmentsMetricsCharacterizeCreate`

- **HTTP**: `POST /api/environments/{environment_id}/metrics/characterize/`
- **What it does**: Characterize a metric anomaly: compare an anomaly window against a
baseline, find the onset, and rank which label values moved.
- **OpenAPI operationId**: `environments_metrics_characterize_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ metric_name: string; aggregation: string; interval: string; baseline_from: string; baseline_to: string; anomaly_from: string; anomaly_to: string; baseline_mean: number; baseline_stddev: number; anomaly_mean: number; a...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMetricsCharacterizeCreateInput = Parameters<typeof posthog.environmentsMetricsCharacterizeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMetricsCharacterizeCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMetricsCharacterizeCreate>>;

const result: EnvironmentsMetricsCharacterizeCreateOutput = await posthog.environmentsMetricsCharacterizeCreate();

// Result shape (from schema): { metric_name: string; aggregation: string; interval: string; baseline_from: string; baseline_to: string; anomaly_from: string; anomaly_to: string; baseline_mean: number; baseline_stddev: number; anomaly_mean: number; a...
```

### `posthog.environmentsMetricsHasMetricsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/metrics/has_metrics/`
- **OpenAPI operationId**: `environments_metrics_has_metrics_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ hasMetrics: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMetricsHasMetricsRetrieveInput = Parameters<typeof posthog.environmentsMetricsHasMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMetricsHasMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMetricsHasMetricsRetrieve>>;

const result: EnvironmentsMetricsHasMetricsRetrieveOutput = await posthog.environmentsMetricsHasMetricsRetrieve();

// Result shape (from schema): { hasMetrics: boolean }
```

### `posthog.environmentsMetricsQueryCreate`

- **HTTP**: `POST /api/environments/{environment_id}/metrics/query/`
- **OpenAPI operationId**: `environments_metrics_query_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ labels: { [key: string]: string | undefined }; points: ({ time: string; value: number | null })[]; metric_name?: string | null; clause?: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMetricsQueryCreateInput = Parameters<typeof posthog.environmentsMetricsQueryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMetricsQueryCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMetricsQueryCreate>>;

const result: EnvironmentsMetricsQueryCreateOutput = await posthog.environmentsMetricsQueryCreate();

// Result shape (from schema): { results: ({ labels: { [key: string]: string | undefined }; points: ({ time: string; value: number | null })[]; metric_name?: string | null; clause?: string | null })[] }
```

### `posthog.environmentsMetricsSamplesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/metrics/samples/`
- **What it does**: Raw individual emissions for a metric (the events model), newest
first — backs the Samples view and the metric->trace pivot.
- **OpenAPI operationId**: `environments_metrics_samples_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ timestamp: string; metric_name: string; metric_type: string; value: number; count: number; unit: string; aggregation_temporality: string; is_monotonic: boolean; service_name: string; trace_id: string; span...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMetricsSamplesCreateInput = Parameters<typeof posthog.environmentsMetricsSamplesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMetricsSamplesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMetricsSamplesCreate>>;

const result: EnvironmentsMetricsSamplesCreateOutput = await posthog.environmentsMetricsSamplesCreate();

// Result shape (from schema): { results: ({ timestamp: string; metric_name: string; metric_type: string; value: number; count: number; unit: string; aggregation_temporality: string; is_monotonic: boolean; service_name: string; trace_id: string; span...
```

### `posthog.environmentsMetricsValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/metrics/values/`
- **What it does**: Distinct metric names for the team. Backs the picker UI.
- **OpenAPI operationId**: `environments_metrics_values_retrieve`
- **Path params**: None
- **Query params**: `limit`, `value`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ name: string; metric_type: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMetricsValuesRetrieveInput = Parameters<typeof posthog.environmentsMetricsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMetricsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMetricsValuesRetrieve>>;

const result: EnvironmentsMetricsValuesRetrieveOutput = await posthog.environmentsMetricsValuesRetrieve();

// Result shape (from schema): { results: ({ name: string; metric_type: string })[] }
```

### `posthog.metricsAttributeValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/metrics/attribute_values/`
- **What it does**: Observed values for one metric attribute key, most frequent first.
Backs the filter bar's value autocomplete.
- **OpenAPI operationId**: `metrics_attribute_values_retrieve`
- **Path params**: None
- **Query params**: `dateFrom`, `dateTo`, `key`, `limit`, `value`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; name: string; count: number })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MetricsAttributeValuesRetrieveInput = Parameters<typeof posthog.metricsAttributeValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MetricsAttributeValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.metricsAttributeValuesRetrieve>>;

const result: MetricsAttributeValuesRetrieveOutput = await posthog.metricsAttributeValuesRetrieve();

// Result shape (from schema): { results: ({ id: string; name: string; count: number })[] }
```

### `posthog.metricsAttributesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/metrics/attributes/`
- **What it does**: Distinct attribute keys seen on the team's metrics (datapoint and
resource attributes merged), most frequent first. Backs the filter
bar's key autocomplete.
- **OpenAPI operationId**: `metrics_attributes_retrieve`
- **Path params**: None
- **Query params**: `dateFrom`, `dateTo`, `limit`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ name: string })[]; count: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MetricsAttributesRetrieveInput = Parameters<typeof posthog.metricsAttributesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MetricsAttributesRetrieveOutput = Awaited<ReturnType<typeof posthog.metricsAttributesRetrieve>>;

const result: MetricsAttributesRetrieveOutput = await posthog.metricsAttributesRetrieve();

// Result shape (from schema): { results: ({ name: string })[]; count: number }
```

### `posthog.metricsCharacterizeCreate`

- **HTTP**: `POST /api/projects/{project_id}/metrics/characterize/`
- **What it does**: Characterize a metric anomaly: compare an anomaly window against a
baseline, find the onset, and rank which label values moved.
- **OpenAPI operationId**: `metrics_characterize_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ metric_name: string; aggregation: string; interval: string; baseline_from: string; baseline_to: string; anomaly_from: string; anomaly_to: string; baseline_mean: number; baseline_stddev: number; anomaly_mean: number; a...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MetricsCharacterizeCreateInput = Parameters<typeof posthog.metricsCharacterizeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type MetricsCharacterizeCreateOutput = Awaited<ReturnType<typeof posthog.metricsCharacterizeCreate>>;

const result: MetricsCharacterizeCreateOutput = await posthog.metricsCharacterizeCreate();

// Result shape (from schema): { metric_name: string; aggregation: string; interval: string; baseline_from: string; baseline_to: string; anomaly_from: string; anomaly_to: string; baseline_mean: number; baseline_stddev: number; anomaly_mean: number; a...
```

### `posthog.metricsHasMetricsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/metrics/has_metrics/`
- **OpenAPI operationId**: `metrics_has_metrics_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ hasMetrics: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MetricsHasMetricsRetrieveInput = Parameters<typeof posthog.metricsHasMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MetricsHasMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.metricsHasMetricsRetrieve>>;

const result: MetricsHasMetricsRetrieveOutput = await posthog.metricsHasMetricsRetrieve();

// Result shape (from schema): { hasMetrics: boolean }
```

### `posthog.metricsQueryCreate`

- **HTTP**: `POST /api/projects/{project_id}/metrics/query/`
- **OpenAPI operationId**: `metrics_query_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ labels: { [key: string]: string | undefined }; points: ({ time: string; value: number | null })[]; metric_name?: string | null; clause?: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MetricsQueryCreateInput = Parameters<typeof posthog.metricsQueryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type MetricsQueryCreateOutput = Awaited<ReturnType<typeof posthog.metricsQueryCreate>>;

const result: MetricsQueryCreateOutput = await posthog.metricsQueryCreate();

// Result shape (from schema): { results: ({ labels: { [key: string]: string | undefined }; points: ({ time: string; value: number | null })[]; metric_name?: string | null; clause?: string | null })[] }
```

### `posthog.metricsSamplesCreate`

- **HTTP**: `POST /api/projects/{project_id}/metrics/samples/`
- **What it does**: Raw individual emissions for a metric (the events model), newest
first — backs the Samples view and the metric->trace pivot.
- **OpenAPI operationId**: `metrics_samples_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ timestamp: string; metric_name: string; metric_type: string; value: number; count: number; unit: string; aggregation_temporality: string; is_monotonic: boolean; service_name: string; trace_id: string; span...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MetricsSamplesCreateInput = Parameters<typeof posthog.metricsSamplesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type MetricsSamplesCreateOutput = Awaited<ReturnType<typeof posthog.metricsSamplesCreate>>;

const result: MetricsSamplesCreateOutput = await posthog.metricsSamplesCreate();

// Result shape (from schema): { results: ({ timestamp: string; metric_name: string; metric_type: string; value: number; count: number; unit: string; aggregation_temporality: string; is_monotonic: boolean; service_name: string; trace_id: string; span...
```

### `posthog.metricsValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/metrics/values/`
- **What it does**: Distinct metric names for the team. Backs the picker UI.
- **OpenAPI operationId**: `metrics_values_retrieve`
- **Path params**: None
- **Query params**: `limit`, `value`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ name: string; metric_type: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MetricsValuesRetrieveInput = Parameters<typeof posthog.metricsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MetricsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.metricsValuesRetrieve>>;

const result: MetricsValuesRetrieveOutput = await posthog.metricsValuesRetrieve();

// Result shape (from schema): { results: ({ name: string; metric_type: string })[] }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

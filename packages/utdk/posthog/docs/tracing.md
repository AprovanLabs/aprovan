# Tracing

## Operations

### `posthog.environmentsTracingSpansAggregateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/tracing/spans/aggregate/`
- **OpenAPI operationId**: `environments_tracing_spans_aggregate_create`
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

type EnvironmentsTracingSpansAggregateCreateInput = Parameters<typeof posthog.environmentsTracingSpansAggregateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansAggregateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansAggregateCreate>>;

const result: EnvironmentsTracingSpansAggregateCreateOutput = await posthog.environmentsTracingSpansAggregateCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsTracingSpansAttributeBreakdownCreate`

- **HTTP**: `POST /api/environments/{environment_id}/tracing/spans/attribute-breakdown/`
- **OpenAPI operationId**: `environments_tracing_spans_attribute_breakdown_create`
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

type EnvironmentsTracingSpansAttributeBreakdownCreateInput = Parameters<typeof posthog.environmentsTracingSpansAttributeBreakdownCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansAttributeBreakdownCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansAttributeBreakdownCreate>>;

const result: EnvironmentsTracingSpansAttributeBreakdownCreateOutput = await posthog.environmentsTracingSpansAttributeBreakdownCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsTracingSpansAttributesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/tracing/spans/attributes/`
- **OpenAPI operationId**: `environments_tracing_spans_attributes_retrieve`
- **Path params**: None
- **Query params**: `attribute_type`, `limit`, `offset`, `search`, `search_values`
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

type EnvironmentsTracingSpansAttributesRetrieveInput = Parameters<typeof posthog.environmentsTracingSpansAttributesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansAttributesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansAttributesRetrieve>>;

const result: EnvironmentsTracingSpansAttributesRetrieveOutput = await posthog.environmentsTracingSpansAttributesRetrieve();

// Result shape (from schema): { results: ({ name: string; propertyFilterType: string; matchedOn: "key" | "value"; matchedValue?: string | null })[]; count: number }
```

### `posthog.environmentsTracingSpansCountCreate`

- **HTTP**: `POST /api/environments/{environment_id}/tracing/spans/count/`
- **OpenAPI operationId**: `environments_tracing_spans_count_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; traceCount: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsTracingSpansCountCreateInput = Parameters<typeof posthog.environmentsTracingSpansCountCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansCountCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansCountCreate>>;

const result: EnvironmentsTracingSpansCountCreateOutput = await posthog.environmentsTracingSpansCountCreate();

// Result shape (from schema): { count: number; traceCount: number }
```

### `posthog.environmentsTracingSpansDurationHistogramCreate`

- **HTTP**: `POST /api/environments/{environment_id}/tracing/spans/duration-histogram/`
- **OpenAPI operationId**: `environments_tracing_spans_duration_histogram_create`
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

type EnvironmentsTracingSpansDurationHistogramCreateInput = Parameters<typeof posthog.environmentsTracingSpansDurationHistogramCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansDurationHistogramCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansDurationHistogramCreate>>;

const result: EnvironmentsTracingSpansDurationHistogramCreateOutput = await posthog.environmentsTracingSpansDurationHistogramCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsTracingSpansHasSpansRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/tracing/spans/has_spans/`
- **OpenAPI operationId**: `environments_tracing_spans_has_spans_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ hasSpans: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsTracingSpansHasSpansRetrieveInput = Parameters<typeof posthog.environmentsTracingSpansHasSpansRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansHasSpansRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansHasSpansRetrieve>>;

const result: EnvironmentsTracingSpansHasSpansRetrieveOutput = await posthog.environmentsTracingSpansHasSpansRetrieve();

// Result shape (from schema): { hasSpans: boolean }
```

### `posthog.environmentsTracingSpansQueryCreate`

- **HTTP**: `POST /api/environments/{environment_id}/tracing/spans/query/`
- **OpenAPI operationId**: `environments_tracing_spans_query_create`
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

type EnvironmentsTracingSpansQueryCreateInput = Parameters<typeof posthog.environmentsTracingSpansQueryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansQueryCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansQueryCreate>>;

const result: EnvironmentsTracingSpansQueryCreateOutput = await posthog.environmentsTracingSpansQueryCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsTracingSpansServiceNamesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/tracing/spans/service-names/`
- **OpenAPI operationId**: `environments_tracing_spans_service_names_retrieve`
- **Path params**: None
- **Query params**: `dateRange`, `search`
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

type EnvironmentsTracingSpansServiceNamesRetrieveInput = Parameters<typeof posthog.environmentsTracingSpansServiceNamesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansServiceNamesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansServiceNamesRetrieve>>;

const result: EnvironmentsTracingSpansServiceNamesRetrieveOutput = await posthog.environmentsTracingSpansServiceNamesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsTracingSpansSparklineCreate`

- **HTTP**: `POST /api/environments/{environment_id}/tracing/spans/sparkline/`
- **OpenAPI operationId**: `environments_tracing_spans_sparkline_create`
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

type EnvironmentsTracingSpansSparklineCreateInput = Parameters<typeof posthog.environmentsTracingSpansSparklineCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansSparklineCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansSparklineCreate>>;

const result: EnvironmentsTracingSpansSparklineCreateOutput = await posthog.environmentsTracingSpansSparklineCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsTracingSpansSymbolStatsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/tracing/spans/symbol-stats/`
- **OpenAPI operationId**: `environments_tracing_spans_symbol_stats_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ count: number; error_count: number; sum_duration_nano: number; p50_duration_nano: number; p95_duration_nano: number; p99_duration_nano: number; busy_count: number; p50_busy_nano: number; p95_busy_nano: num...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsTracingSpansSymbolStatsCreateInput = Parameters<typeof posthog.environmentsTracingSpansSymbolStatsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansSymbolStatsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansSymbolStatsCreate>>;

const result: EnvironmentsTracingSpansSymbolStatsCreateOutput = await posthog.environmentsTracingSpansSymbolStatsCreate();

// Result shape (from schema): { results: ({ count: number; error_count: number; sum_duration_nano: number; p50_duration_nano: number; p95_duration_nano: number; p99_duration_nano: number; busy_count: number; p50_busy_nano: number; p95_busy_nano: num...
```

### `posthog.environmentsTracingSpansTraceCreate`

- **HTTP**: `POST /api/environments/{environment_id}/tracing/spans/trace/{trace_id}/`
- **OpenAPI operationId**: `environments_tracing_spans_trace_create`
- **Path params**: `trace_id`
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

type EnvironmentsTracingSpansTraceCreateInput = Parameters<typeof posthog.environmentsTracingSpansTraceCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansTraceCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansTraceCreate>>;

const result: EnvironmentsTracingSpansTraceCreateOutput = await posthog.environmentsTracingSpansTraceCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsTracingSpansTreeCreate`

- **HTTP**: `POST /api/environments/{environment_id}/tracing/spans/tree/`
- **OpenAPI operationId**: `environments_tracing_spans_tree_create`
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

type EnvironmentsTracingSpansTreeCreateInput = Parameters<typeof posthog.environmentsTracingSpansTreeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansTreeCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansTreeCreate>>;

const result: EnvironmentsTracingSpansTreeCreateOutput = await posthog.environmentsTracingSpansTreeCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsTracingSpansValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/tracing/spans/values/`
- **OpenAPI operationId**: `environments_tracing_spans_values_retrieve`
- **Path params**: None
- **Query params**: `attribute_type`, `key`, `limit`, `offset`, `value`
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

type EnvironmentsTracingSpansValuesRetrieveInput = Parameters<typeof posthog.environmentsTracingSpansValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingSpansValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsTracingSpansValuesRetrieve>>;

const result: EnvironmentsTracingSpansValuesRetrieveOutput = await posthog.environmentsTracingSpansValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsTracingViewsList`

- **HTTP**: `GET /api/environments/{environment_id}/tracing/views/`
- **OpenAPI operationId**: `environments_tracing_views_list`
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

type EnvironmentsTracingViewsListInput = Parameters<typeof posthog.environmentsTracingViewsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingViewsListOutput = Awaited<ReturnType<typeof posthog.environmentsTracingViewsList>>;

const result: EnvironmentsTracingViewsListOutput = await posthog.environmentsTracingViewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: numb...
```

### `posthog.environmentsTracingViewsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/tracing/views/`
- **OpenAPI operationId**: `environments_tracing_views_create`
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

type EnvironmentsTracingViewsCreateInput = Parameters<typeof posthog.environmentsTracingViewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingViewsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingViewsCreate>>;

const result: EnvironmentsTracingViewsCreateOutput = await posthog.environmentsTracingViewsCreate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.environmentsTracingViewsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/tracing/views/{short_id}/`
- **OpenAPI operationId**: `environments_tracing_views_destroy`
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

type EnvironmentsTracingViewsDestroyInput = Parameters<typeof posthog.environmentsTracingViewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingViewsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsTracingViewsDestroy>>;

const result: EnvironmentsTracingViewsDestroyOutput = await posthog.environmentsTracingViewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsTracingViewsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/tracing/views/{short_id}/`
- **OpenAPI operationId**: `environments_tracing_views_retrieve`
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

type EnvironmentsTracingViewsRetrieveInput = Parameters<typeof posthog.environmentsTracingViewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingViewsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsTracingViewsRetrieve>>;

const result: EnvironmentsTracingViewsRetrieveOutput = await posthog.environmentsTracingViewsRetrieve();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.environmentsTracingViewsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/tracing/views/{short_id}/`
- **OpenAPI operationId**: `environments_tracing_views_partial_update`
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

type EnvironmentsTracingViewsPartialUpdateInput = Parameters<typeof posthog.environmentsTracingViewsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingViewsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingViewsPartialUpdate>>;

const result: EnvironmentsTracingViewsPartialUpdateOutput = await posthog.environmentsTracingViewsPartialUpdate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.environmentsTracingViewsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/tracing/views/{short_id}/`
- **OpenAPI operationId**: `environments_tracing_views_update`
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

type EnvironmentsTracingViewsUpdateInput = Parameters<typeof posthog.environmentsTracingViewsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsTracingViewsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsTracingViewsUpdate>>;

const result: EnvironmentsTracingViewsUpdateOutput = await posthog.environmentsTracingViewsUpdate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.tracingSpansAggregateCreate`

- **HTTP**: `POST /api/projects/{project_id}/tracing/spans/aggregate/`
- **OpenAPI operationId**: `tracing_spans_aggregate_create`
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

type TracingSpansAggregateCreateInput = Parameters<typeof posthog.tracingSpansAggregateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansAggregateCreateOutput = Awaited<ReturnType<typeof posthog.tracingSpansAggregateCreate>>;

const result: TracingSpansAggregateCreateOutput = await posthog.tracingSpansAggregateCreate();

// Result shape (from schema): unknown
```

### `posthog.tracingSpansAttributeBreakdownCreate`

- **HTTP**: `POST /api/projects/{project_id}/tracing/spans/attribute-breakdown/`
- **OpenAPI operationId**: `tracing_spans_attribute_breakdown_create`
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

type TracingSpansAttributeBreakdownCreateInput = Parameters<typeof posthog.tracingSpansAttributeBreakdownCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansAttributeBreakdownCreateOutput = Awaited<ReturnType<typeof posthog.tracingSpansAttributeBreakdownCreate>>;

const result: TracingSpansAttributeBreakdownCreateOutput = await posthog.tracingSpansAttributeBreakdownCreate();

// Result shape (from schema): unknown
```

### `posthog.tracingSpansAttributesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tracing/spans/attributes/`
- **OpenAPI operationId**: `tracing_spans_attributes_retrieve`
- **Path params**: None
- **Query params**: `attribute_type`, `limit`, `offset`, `search`, `search_values`
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

type TracingSpansAttributesRetrieveInput = Parameters<typeof posthog.tracingSpansAttributesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansAttributesRetrieveOutput = Awaited<ReturnType<typeof posthog.tracingSpansAttributesRetrieve>>;

const result: TracingSpansAttributesRetrieveOutput = await posthog.tracingSpansAttributesRetrieve();

// Result shape (from schema): { results: ({ name: string; propertyFilterType: string; matchedOn: "key" | "value"; matchedValue?: string | null })[]; count: number }
```

### `posthog.tracingSpansCountCreate`

- **HTTP**: `POST /api/projects/{project_id}/tracing/spans/count/`
- **OpenAPI operationId**: `tracing_spans_count_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; traceCount: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TracingSpansCountCreateInput = Parameters<typeof posthog.tracingSpansCountCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansCountCreateOutput = Awaited<ReturnType<typeof posthog.tracingSpansCountCreate>>;

const result: TracingSpansCountCreateOutput = await posthog.tracingSpansCountCreate();

// Result shape (from schema): { count: number; traceCount: number }
```

### `posthog.tracingSpansDurationHistogramCreate`

- **HTTP**: `POST /api/projects/{project_id}/tracing/spans/duration-histogram/`
- **OpenAPI operationId**: `tracing_spans_duration_histogram_create`
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

type TracingSpansDurationHistogramCreateInput = Parameters<typeof posthog.tracingSpansDurationHistogramCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansDurationHistogramCreateOutput = Awaited<ReturnType<typeof posthog.tracingSpansDurationHistogramCreate>>;

const result: TracingSpansDurationHistogramCreateOutput = await posthog.tracingSpansDurationHistogramCreate();

// Result shape (from schema): unknown
```

### `posthog.tracingSpansHasSpansRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tracing/spans/has_spans/`
- **OpenAPI operationId**: `tracing_spans_has_spans_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ hasSpans: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TracingSpansHasSpansRetrieveInput = Parameters<typeof posthog.tracingSpansHasSpansRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansHasSpansRetrieveOutput = Awaited<ReturnType<typeof posthog.tracingSpansHasSpansRetrieve>>;

const result: TracingSpansHasSpansRetrieveOutput = await posthog.tracingSpansHasSpansRetrieve();

// Result shape (from schema): { hasSpans: boolean }
```

### `posthog.tracingSpansQueryCreate`

- **HTTP**: `POST /api/projects/{project_id}/tracing/spans/query/`
- **OpenAPI operationId**: `tracing_spans_query_create`
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

type TracingSpansQueryCreateInput = Parameters<typeof posthog.tracingSpansQueryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansQueryCreateOutput = Awaited<ReturnType<typeof posthog.tracingSpansQueryCreate>>;

const result: TracingSpansQueryCreateOutput = await posthog.tracingSpansQueryCreate();

// Result shape (from schema): unknown
```

### `posthog.tracingSpansServiceNamesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tracing/spans/service-names/`
- **OpenAPI operationId**: `tracing_spans_service_names_retrieve`
- **Path params**: None
- **Query params**: `dateRange`, `search`
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

type TracingSpansServiceNamesRetrieveInput = Parameters<typeof posthog.tracingSpansServiceNamesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansServiceNamesRetrieveOutput = Awaited<ReturnType<typeof posthog.tracingSpansServiceNamesRetrieve>>;

const result: TracingSpansServiceNamesRetrieveOutput = await posthog.tracingSpansServiceNamesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.tracingSpansSparklineCreate`

- **HTTP**: `POST /api/projects/{project_id}/tracing/spans/sparkline/`
- **OpenAPI operationId**: `tracing_spans_sparkline_create`
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

type TracingSpansSparklineCreateInput = Parameters<typeof posthog.tracingSpansSparklineCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansSparklineCreateOutput = Awaited<ReturnType<typeof posthog.tracingSpansSparklineCreate>>;

const result: TracingSpansSparklineCreateOutput = await posthog.tracingSpansSparklineCreate();

// Result shape (from schema): unknown
```

### `posthog.tracingSpansSymbolStatsCreate`

- **HTTP**: `POST /api/projects/{project_id}/tracing/spans/symbol-stats/`
- **OpenAPI operationId**: `tracing_spans_symbol_stats_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ count: number; error_count: number; sum_duration_nano: number; p50_duration_nano: number; p95_duration_nano: number; p99_duration_nano: number; busy_count: number; p50_busy_nano: number; p95_busy_nano: num...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TracingSpansSymbolStatsCreateInput = Parameters<typeof posthog.tracingSpansSymbolStatsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansSymbolStatsCreateOutput = Awaited<ReturnType<typeof posthog.tracingSpansSymbolStatsCreate>>;

const result: TracingSpansSymbolStatsCreateOutput = await posthog.tracingSpansSymbolStatsCreate();

// Result shape (from schema): { results: ({ count: number; error_count: number; sum_duration_nano: number; p50_duration_nano: number; p95_duration_nano: number; p99_duration_nano: number; busy_count: number; p50_busy_nano: number; p95_busy_nano: num...
```

### `posthog.tracingSpansTraceCreate`

- **HTTP**: `POST /api/projects/{project_id}/tracing/spans/trace/{trace_id}/`
- **OpenAPI operationId**: `tracing_spans_trace_create`
- **Path params**: `trace_id`
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

type TracingSpansTraceCreateInput = Parameters<typeof posthog.tracingSpansTraceCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansTraceCreateOutput = Awaited<ReturnType<typeof posthog.tracingSpansTraceCreate>>;

const result: TracingSpansTraceCreateOutput = await posthog.tracingSpansTraceCreate();

// Result shape (from schema): unknown
```

### `posthog.tracingSpansTreeCreate`

- **HTTP**: `POST /api/projects/{project_id}/tracing/spans/tree/`
- **OpenAPI operationId**: `tracing_spans_tree_create`
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

type TracingSpansTreeCreateInput = Parameters<typeof posthog.tracingSpansTreeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansTreeCreateOutput = Awaited<ReturnType<typeof posthog.tracingSpansTreeCreate>>;

const result: TracingSpansTreeCreateOutput = await posthog.tracingSpansTreeCreate();

// Result shape (from schema): unknown
```

### `posthog.tracingSpansValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tracing/spans/values/`
- **OpenAPI operationId**: `tracing_spans_values_retrieve`
- **Path params**: None
- **Query params**: `attribute_type`, `key`, `limit`, `offset`, `value`
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

type TracingSpansValuesRetrieveInput = Parameters<typeof posthog.tracingSpansValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TracingSpansValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.tracingSpansValuesRetrieve>>;

const result: TracingSpansValuesRetrieveOutput = await posthog.tracingSpansValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.tracingViewsList`

- **HTTP**: `GET /api/projects/{project_id}/tracing/views/`
- **OpenAPI operationId**: `tracing_views_list`
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

type TracingViewsListInput = Parameters<typeof posthog.tracingViewsList> extends [infer T, ...unknown[]] ? T : undefined;
type TracingViewsListOutput = Awaited<ReturnType<typeof posthog.tracingViewsList>>;

const result: TracingViewsListOutput = await posthog.tracingViewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: numb...
```

### `posthog.tracingViewsCreate`

- **HTTP**: `POST /api/projects/{project_id}/tracing/views/`
- **OpenAPI operationId**: `tracing_views_create`
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

type TracingViewsCreateInput = Parameters<typeof posthog.tracingViewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingViewsCreateOutput = Awaited<ReturnType<typeof posthog.tracingViewsCreate>>;

const result: TracingViewsCreateOutput = await posthog.tracingViewsCreate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.tracingViewsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/tracing/views/{short_id}/`
- **OpenAPI operationId**: `tracing_views_destroy`
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

type TracingViewsDestroyInput = Parameters<typeof posthog.tracingViewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type TracingViewsDestroyOutput = Awaited<ReturnType<typeof posthog.tracingViewsDestroy>>;

const result: TracingViewsDestroyOutput = await posthog.tracingViewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.tracingViewsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tracing/views/{short_id}/`
- **OpenAPI operationId**: `tracing_views_retrieve`
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

type TracingViewsRetrieveInput = Parameters<typeof posthog.tracingViewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TracingViewsRetrieveOutput = Awaited<ReturnType<typeof posthog.tracingViewsRetrieve>>;

const result: TracingViewsRetrieveOutput = await posthog.tracingViewsRetrieve();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.tracingViewsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/tracing/views/{short_id}/`
- **OpenAPI operationId**: `tracing_views_partial_update`
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

type TracingViewsPartialUpdateInput = Parameters<typeof posthog.tracingViewsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingViewsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.tracingViewsPartialUpdate>>;

const result: TracingViewsPartialUpdateOutput = await posthog.tracingViewsPartialUpdate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.tracingViewsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/tracing/views/{short_id}/`
- **OpenAPI operationId**: `tracing_views_update`
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

type TracingViewsUpdateInput = Parameters<typeof posthog.tracingViewsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type TracingViewsUpdateOutput = Awaited<ReturnType<typeof posthog.tracingViewsUpdate>>;

const result: TracingViewsUpdateOutput = await posthog.tracingViewsUpdate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

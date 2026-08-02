# Llm Analytics

## Operations

### `posthog.environmentsLlmAnalyticsClusteringConfigList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/clustering_config/`
- **What it does**: Team-level clustering configuration (event filters for automated pipelines).
- **OpenAPI operationId**: `environments_llm_analytics_clustering_config_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ event_filters: ({ [key: string]: unknown })[]; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsClusteringConfigListInput = Parameters<typeof posthog.environmentsLlmAnalyticsClusteringConfigList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsClusteringConfigListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsClusteringConfigList>>;

const result: EnvironmentsLlmAnalyticsClusteringConfigListOutput = await posthog.environmentsLlmAnalyticsClusteringConfigList();

// Result shape (from schema): { event_filters: ({ [key: string]: unknown })[]; created_at: string; updated_at: string }
```

### `posthog.environmentsLlmAnalyticsClusteringConfigSetEventFiltersCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/clustering_config/set_event_filters/`
- **What it does**: Team-level clustering configuration (event filters for automated pipelines).
- **OpenAPI operationId**: `environments_llm_analytics_clustering_config_set_event_filters_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ event_filters: ({ [key: string]: unknown })[]; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsClusteringConfigSetEventFiltersCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsClusteringConfigSetEventFiltersCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsClusteringConfigSetEventFiltersCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsClusteringConfigSetEventFiltersCreate>>;

const result: EnvironmentsLlmAnalyticsClusteringConfigSetEventFiltersCreateOutput = await posthog.environmentsLlmAnalyticsClusteringConfigSetEventFiltersCreate();

// Result shape (from schema): { event_filters: ({ [key: string]: unknown })[]; created_at: string; updated_at: string }
```

### `posthog.environmentsLlmAnalyticsClusteringJobsList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/clustering_jobs/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `environments_llm_analytics_clustering_jobs_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsClusteringJobsListInput = Parameters<typeof posthog.environmentsLlmAnalyticsClusteringJobsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsClusteringJobsListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsClusteringJobsList>>;

const result: EnvironmentsLlmAnalyticsClusteringJobsListOutput = await posthog.environmentsLlmAnalyticsClusteringJobsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: strin...
```

### `posthog.environmentsLlmAnalyticsClusteringJobsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/clustering_jobs/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `environments_llm_analytics_clustering_jobs_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsClusteringJobsCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsClusteringJobsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsClusteringJobsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsClusteringJobsCreate>>;

const result: EnvironmentsLlmAnalyticsClusteringJobsCreateOutput = await posthog.environmentsLlmAnalyticsClusteringJobsCreate();

// Result shape (from schema): { id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }
```

### `posthog.environmentsLlmAnalyticsClusteringJobsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/llm_analytics/clustering_jobs/{id}/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `environments_llm_analytics_clustering_jobs_destroy`
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

type EnvironmentsLlmAnalyticsClusteringJobsDestroyInput = Parameters<typeof posthog.environmentsLlmAnalyticsClusteringJobsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsClusteringJobsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsClusteringJobsDestroy>>;

const result: EnvironmentsLlmAnalyticsClusteringJobsDestroyOutput = await posthog.environmentsLlmAnalyticsClusteringJobsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsLlmAnalyticsClusteringJobsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/clustering_jobs/{id}/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `environments_llm_analytics_clustering_jobs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsClusteringJobsRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsClusteringJobsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsClusteringJobsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsClusteringJobsRetrieve>>;

const result: EnvironmentsLlmAnalyticsClusteringJobsRetrieveOutput = await posthog.environmentsLlmAnalyticsClusteringJobsRetrieve();

// Result shape (from schema): { id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }
```

### `posthog.environmentsLlmAnalyticsClusteringJobsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/llm_analytics/clustering_jobs/{id}/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `environments_llm_analytics_clustering_jobs_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsClusteringJobsPartialUpdateInput = Parameters<typeof posthog.environmentsLlmAnalyticsClusteringJobsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsClusteringJobsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsClusteringJobsPartialUpdate>>;

const result: EnvironmentsLlmAnalyticsClusteringJobsPartialUpdateOutput = await posthog.environmentsLlmAnalyticsClusteringJobsPartialUpdate();

// Result shape (from schema): { id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }
```

### `posthog.environmentsLlmAnalyticsClusteringJobsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/llm_analytics/clustering_jobs/{id}/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `environments_llm_analytics_clustering_jobs_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsClusteringJobsUpdateInput = Parameters<typeof posthog.environmentsLlmAnalyticsClusteringJobsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsClusteringJobsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsClusteringJobsUpdate>>;

const result: EnvironmentsLlmAnalyticsClusteringJobsUpdateOutput = await posthog.environmentsLlmAnalyticsClusteringJobsUpdate();

// Result shape (from schema): { id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }
```

### `posthog.environmentsLlmAnalyticsEvaluationConfigRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/evaluation_config/`
- **What it does**: Get the evaluation config for this team
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_config_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ trial_eval_limit: number; trial_evals_used: number; trial_evals_remaining: number; trial_grandfathered: boolean; trial_deprecation_date: string; active_provider_key: { id: string; provider: "openai" | "anthropic" | "g...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsEvaluationConfigRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationConfigRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationConfigRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationConfigRetrieve>>;

const result: EnvironmentsLlmAnalyticsEvaluationConfigRetrieveOutput = await posthog.environmentsLlmAnalyticsEvaluationConfigRetrieve();

// Result shape (from schema): { trial_eval_limit: number; trial_evals_used: number; trial_evals_remaining: number; trial_grandfathered: boolean; trial_deprecation_date: string; active_provider_key: { id: string; provider: "openai" | "anthropic" | "g...
```

### `posthog.environmentsLlmAnalyticsEvaluationConfigSetActiveKeyCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/evaluation_config/set_active_key/`
- **What it does**: Set the active provider key for evaluations
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_config_set_active_key_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ trial_eval_limit: number; trial_evals_used: number; trial_evals_remaining: number; trial_grandfathered: boolean; trial_deprecation_date: string; active_provider_key: { id: string; provider: "openai" | "anthropic" | "g...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsEvaluationConfigSetActiveKeyCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationConfigSetActiveKeyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationConfigSetActiveKeyCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationConfigSetActiveKeyCreate>>;

const result: EnvironmentsLlmAnalyticsEvaluationConfigSetActiveKeyCreateOutput = await posthog.environmentsLlmAnalyticsEvaluationConfigSetActiveKeyCreate();

// Result shape (from schema): { trial_eval_limit: number; trial_evals_used: number; trial_evals_remaining: number; trial_grandfathered: boolean; trial_deprecation_date: string; active_provider_key: { id: string; provider: "openai" | "anthropic" | "g...
```

### `posthog.environmentsLlmAnalyticsEvaluationReportsList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/evaluation_reports/`
- **What it does**: CRUD for evaluation report configurations + report run history.
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_reports_list`
- **Path params**: None
- **Query params**: `evaluation`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_del...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsEvaluationReportsListInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationReportsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationReportsListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationReportsList>>;

const result: EnvironmentsLlmAnalyticsEvaluationReportsListOutput = await posthog.environmentsLlmAnalyticsEvaluationReportsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_del...
```

### `posthog.environmentsLlmAnalyticsEvaluationReportsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/evaluation_reports/`
- **What it does**: CRUD for evaluation report configurations + report run history.
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_reports_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsEvaluationReportsCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationReportsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationReportsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationReportsCreate>>;

const result: EnvironmentsLlmAnalyticsEvaluationReportsCreateOutput = await posthog.environmentsLlmAnalyticsEvaluationReportsCreate();

// Result shape (from schema): { id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...
```

### `posthog.environmentsLlmAnalyticsEvaluationReportsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/llm_analytics/evaluation_reports/{id}/`
- **What it does**: Evaluation report configs are deleted only when their evaluation is deleted. Use PATCH enabled=false to stop delivery.
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_reports_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsEvaluationReportsDestroyInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationReportsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationReportsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationReportsDestroy>>;

const result: EnvironmentsLlmAnalyticsEvaluationReportsDestroyOutput = await posthog.environmentsLlmAnalyticsEvaluationReportsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsLlmAnalyticsEvaluationReportsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/evaluation_reports/{id}/`
- **What it does**: CRUD for evaluation report configurations + report run history.
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_reports_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsEvaluationReportsRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationReportsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationReportsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationReportsRetrieve>>;

const result: EnvironmentsLlmAnalyticsEvaluationReportsRetrieveOutput = await posthog.environmentsLlmAnalyticsEvaluationReportsRetrieve();

// Result shape (from schema): { id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...
```

### `posthog.environmentsLlmAnalyticsEvaluationReportsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/llm_analytics/evaluation_reports/{id}/`
- **What it does**: CRUD for evaluation report configurations + report run history.
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_reports_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsEvaluationReportsPartialUpdateInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationReportsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationReportsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationReportsPartialUpdate>>;

const result: EnvironmentsLlmAnalyticsEvaluationReportsPartialUpdateOutput = await posthog.environmentsLlmAnalyticsEvaluationReportsPartialUpdate();

// Result shape (from schema): { id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...
```

### `posthog.environmentsLlmAnalyticsEvaluationReportsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/llm_analytics/evaluation_reports/{id}/`
- **What it does**: CRUD for evaluation report configurations + report run history.
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_reports_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsEvaluationReportsUpdateInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationReportsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationReportsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationReportsUpdate>>;

const result: EnvironmentsLlmAnalyticsEvaluationReportsUpdateOutput = await posthog.environmentsLlmAnalyticsEvaluationReportsUpdate();

// Result shape (from schema): { id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...
```

### `posthog.environmentsLlmAnalyticsEvaluationReportsGenerateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/evaluation_reports/{id}/generate/`
- **What it does**: Trigger immediate report generation.
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_reports_generate_create`
- **Path params**: `id`
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

type EnvironmentsLlmAnalyticsEvaluationReportsGenerateCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationReportsGenerateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationReportsGenerateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationReportsGenerateCreate>>;

const result: EnvironmentsLlmAnalyticsEvaluationReportsGenerateCreateOutput = await posthog.environmentsLlmAnalyticsEvaluationReportsGenerateCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsLlmAnalyticsEvaluationReportsRunsList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/evaluation_reports/{id}/runs/`
- **What it does**: List report runs (history) for this report.
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_reports_runs_list`
- **Path params**: `id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; report: string; content: unknown; metadata: unknown; period_start: string; period_end: string; delivery_status: "pending" | "deliv...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsEvaluationReportsRunsListInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationReportsRunsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationReportsRunsListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationReportsRunsList>>;

const result: EnvironmentsLlmAnalyticsEvaluationReportsRunsListOutput = await posthog.environmentsLlmAnalyticsEvaluationReportsRunsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; report: string; content: unknown; metadata: unknown; period_start: string; period_end: string; delivery_status: "pending" | "deliv...
```

### `posthog.environmentsLlmAnalyticsModelsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/models/`
- **What it does**: List available models for a provider.
- **OpenAPI operationId**: `environments_llm_analytics_models_retrieve`
- **Path params**: None
- **Query params**: `key_id`, `provider`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ models: ({ id: string; posthog_available: boolean })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsModelsRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsModelsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsModelsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsModelsRetrieve>>;

const result: EnvironmentsLlmAnalyticsModelsRetrieveOutput = await posthog.environmentsLlmAnalyticsModelsRetrieve();

// Result shape (from schema): { models: ({ id: string; posthog_available: boolean })[] }
```

### `posthog.environmentsLlmAnalyticsProviderKeyValidationsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/provider_key_validations/`
- **What it does**: Validate LLM provider API keys without persisting them
- **OpenAPI operationId**: `environments_llm_analytics_provider_key_validations_create`
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

type EnvironmentsLlmAnalyticsProviderKeyValidationsCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeyValidationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeyValidationsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeyValidationsCreate>>;

const result: EnvironmentsLlmAnalyticsProviderKeyValidationsCreateOutput = await posthog.environmentsLlmAnalyticsProviderKeyValidationsCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.environmentsLlmAnalyticsProviderKeysList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/provider_keys/`
- **OpenAPI operationId**: `environments_llm_analytics_provider_keys_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsProviderKeysListInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeysList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeysListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeysList>>;

const result: EnvironmentsLlmAnalyticsProviderKeysListOutput = await posthog.environmentsLlmAnalyticsProviderKeysList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; ...
```

### `posthog.environmentsLlmAnalyticsProviderKeysCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/provider_keys/`
- **OpenAPI operationId**: `environments_llm_analytics_provider_keys_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsProviderKeysCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeysCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeysCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeysCreate>>;

const result: EnvironmentsLlmAnalyticsProviderKeysCreateOutput = await posthog.environmentsLlmAnalyticsProviderKeysCreate();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.environmentsLlmAnalyticsProviderKeysDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/llm_analytics/provider_keys/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_provider_keys_destroy`
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

type EnvironmentsLlmAnalyticsProviderKeysDestroyInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeysDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeysDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeysDestroy>>;

const result: EnvironmentsLlmAnalyticsProviderKeysDestroyOutput = await posthog.environmentsLlmAnalyticsProviderKeysDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsLlmAnalyticsProviderKeysRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/provider_keys/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_provider_keys_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsProviderKeysRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeysRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeysRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeysRetrieve>>;

const result: EnvironmentsLlmAnalyticsProviderKeysRetrieveOutput = await posthog.environmentsLlmAnalyticsProviderKeysRetrieve();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.environmentsLlmAnalyticsProviderKeysPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/llm_analytics/provider_keys/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_provider_keys_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsProviderKeysPartialUpdateInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeysPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeysPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeysPartialUpdate>>;

const result: EnvironmentsLlmAnalyticsProviderKeysPartialUpdateOutput = await posthog.environmentsLlmAnalyticsProviderKeysPartialUpdate();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.environmentsLlmAnalyticsProviderKeysUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/llm_analytics/provider_keys/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_provider_keys_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsProviderKeysUpdateInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeysUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeysUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeysUpdate>>;

const result: EnvironmentsLlmAnalyticsProviderKeysUpdateOutput = await posthog.environmentsLlmAnalyticsProviderKeysUpdate();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.environmentsLlmAnalyticsProviderKeysAssignCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/provider_keys/{id}/assign/`
- **What it does**: Assign this key to evaluations and optionally re-enable them.
- **OpenAPI operationId**: `environments_llm_analytics_provider_keys_assign_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsProviderKeysAssignCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeysAssignCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeysAssignCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeysAssignCreate>>;

const result: EnvironmentsLlmAnalyticsProviderKeysAssignCreateOutput = await posthog.environmentsLlmAnalyticsProviderKeysAssignCreate();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.environmentsLlmAnalyticsProviderKeysDependentConfigsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/provider_keys/{id}/dependent_configs/`
- **What it does**: Get evaluations using this key and alternative keys for replacement.
- **OpenAPI operationId**: `environments_llm_analytics_provider_keys_dependent_configs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsProviderKeysDependentConfigsRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeysDependentConfigsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeysDependentConfigsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeysDependentConfigsRetrieve>>;

const result: EnvironmentsLlmAnalyticsProviderKeysDependentConfigsRetrieveOutput = await posthog.environmentsLlmAnalyticsProviderKeysDependentConfigsRetrieve();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.environmentsLlmAnalyticsProviderKeysValidateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/provider_keys/{id}/validate/`
- **OpenAPI operationId**: `environments_llm_analytics_provider_keys_validate_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsProviderKeysValidateCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeysValidateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeysValidateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeysValidateCreate>>;

const result: EnvironmentsLlmAnalyticsProviderKeysValidateCreateOutput = await posthog.environmentsLlmAnalyticsProviderKeysValidateCreate();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.environmentsLlmAnalyticsProviderKeysTrialEvaluationsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/provider_keys/trial_evaluations/`
- **What it does**: List enabled evaluations currently using trial credits for a given provider.
- **OpenAPI operationId**: `environments_llm_analytics_provider_keys_trial_evaluations_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsProviderKeysTrialEvaluationsRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsProviderKeysTrialEvaluationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsProviderKeysTrialEvaluationsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsProviderKeysTrialEvaluationsRetrieve>>;

const result: EnvironmentsLlmAnalyticsProviderKeysTrialEvaluationsRetrieveOutput = await posthog.environmentsLlmAnalyticsProviderKeysTrialEvaluationsRetrieve();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.environmentsLlmAnalyticsReviewQueueItemsList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/review_queue_items/`
- **OpenAPI operationId**: `environments_llm_analytics_review_queue_items_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `order_by`, `queue_id`, `search`, `trace_id`, `trace_id__in`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; u...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsReviewQueueItemsListInput = Parameters<typeof posthog.environmentsLlmAnalyticsReviewQueueItemsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsReviewQueueItemsListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsReviewQueueItemsList>>;

const result: EnvironmentsLlmAnalyticsReviewQueueItemsListOutput = await posthog.environmentsLlmAnalyticsReviewQueueItemsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; u...
```

### `posthog.environmentsLlmAnalyticsReviewQueueItemsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/review_queue_items/`
- **OpenAPI operationId**: `environments_llm_analytics_review_queue_items_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsReviewQueueItemsCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsReviewQueueItemsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsReviewQueueItemsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsReviewQueueItemsCreate>>;

const result: EnvironmentsLlmAnalyticsReviewQueueItemsCreateOutput = await posthog.environmentsLlmAnalyticsReviewQueueItemsCreate();

// Result shape (from schema): { id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...
```

### `posthog.environmentsLlmAnalyticsReviewQueueItemsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/llm_analytics/review_queue_items/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_review_queue_items_destroy`
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

type EnvironmentsLlmAnalyticsReviewQueueItemsDestroyInput = Parameters<typeof posthog.environmentsLlmAnalyticsReviewQueueItemsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsReviewQueueItemsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsReviewQueueItemsDestroy>>;

const result: EnvironmentsLlmAnalyticsReviewQueueItemsDestroyOutput = await posthog.environmentsLlmAnalyticsReviewQueueItemsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsLlmAnalyticsReviewQueueItemsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/review_queue_items/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_review_queue_items_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsReviewQueueItemsRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsReviewQueueItemsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsReviewQueueItemsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsReviewQueueItemsRetrieve>>;

const result: EnvironmentsLlmAnalyticsReviewQueueItemsRetrieveOutput = await posthog.environmentsLlmAnalyticsReviewQueueItemsRetrieve();

// Result shape (from schema): { id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...
```

### `posthog.environmentsLlmAnalyticsReviewQueueItemsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/llm_analytics/review_queue_items/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_review_queue_items_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsReviewQueueItemsPartialUpdateInput = Parameters<typeof posthog.environmentsLlmAnalyticsReviewQueueItemsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsReviewQueueItemsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsReviewQueueItemsPartialUpdate>>;

const result: EnvironmentsLlmAnalyticsReviewQueueItemsPartialUpdateOutput = await posthog.environmentsLlmAnalyticsReviewQueueItemsPartialUpdate();

// Result shape (from schema): { id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...
```

### `posthog.environmentsLlmAnalyticsReviewQueuesList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/review_queues/`
- **OpenAPI operationId**: `environments_llm_analytics_review_queues_list`
- **Path params**: None
- **Query params**: `limit`, `name`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; d...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsReviewQueuesListInput = Parameters<typeof posthog.environmentsLlmAnalyticsReviewQueuesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsReviewQueuesListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsReviewQueuesList>>;

const result: EnvironmentsLlmAnalyticsReviewQueuesListOutput = await posthog.environmentsLlmAnalyticsReviewQueuesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; d...
```

### `posthog.environmentsLlmAnalyticsReviewQueuesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/review_queues/`
- **OpenAPI operationId**: `environments_llm_analytics_review_queues_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsReviewQueuesCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsReviewQueuesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsReviewQueuesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsReviewQueuesCreate>>;

const result: EnvironmentsLlmAnalyticsReviewQueuesCreateOutput = await posthog.environmentsLlmAnalyticsReviewQueuesCreate();

// Result shape (from schema): { id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...
```

### `posthog.environmentsLlmAnalyticsReviewQueuesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/llm_analytics/review_queues/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_review_queues_destroy`
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

type EnvironmentsLlmAnalyticsReviewQueuesDestroyInput = Parameters<typeof posthog.environmentsLlmAnalyticsReviewQueuesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsReviewQueuesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsReviewQueuesDestroy>>;

const result: EnvironmentsLlmAnalyticsReviewQueuesDestroyOutput = await posthog.environmentsLlmAnalyticsReviewQueuesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsLlmAnalyticsReviewQueuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/review_queues/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_review_queues_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsReviewQueuesRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsReviewQueuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsReviewQueuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsReviewQueuesRetrieve>>;

const result: EnvironmentsLlmAnalyticsReviewQueuesRetrieveOutput = await posthog.environmentsLlmAnalyticsReviewQueuesRetrieve();

// Result shape (from schema): { id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...
```

### `posthog.environmentsLlmAnalyticsReviewQueuesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/llm_analytics/review_queues/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_review_queues_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsReviewQueuesPartialUpdateInput = Parameters<typeof posthog.environmentsLlmAnalyticsReviewQueuesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsReviewQueuesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsReviewQueuesPartialUpdate>>;

const result: EnvironmentsLlmAnalyticsReviewQueuesPartialUpdateOutput = await posthog.environmentsLlmAnalyticsReviewQueuesPartialUpdate();

// Result shape (from schema): { id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...
```

### `posthog.environmentsLlmAnalyticsScoreDefinitionsList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/score_definitions/`
- **OpenAPI operationId**: `environments_llm_analytics_score_definitions_list`
- **Path params**: None
- **Query params**: `archived`, `kind`, `limit`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; curren...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsScoreDefinitionsListInput = Parameters<typeof posthog.environmentsLlmAnalyticsScoreDefinitionsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsScoreDefinitionsListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsScoreDefinitionsList>>;

const result: EnvironmentsLlmAnalyticsScoreDefinitionsListOutput = await posthog.environmentsLlmAnalyticsScoreDefinitionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; curren...
```

### `posthog.environmentsLlmAnalyticsScoreDefinitionsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/score_definitions/`
- **OpenAPI operationId**: `environments_llm_analytics_score_definitions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsScoreDefinitionsCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsScoreDefinitionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsScoreDefinitionsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsScoreDefinitionsCreate>>;

const result: EnvironmentsLlmAnalyticsScoreDefinitionsCreateOutput = await posthog.environmentsLlmAnalyticsScoreDefinitionsCreate();

// Result shape (from schema): { id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...
```

### `posthog.environmentsLlmAnalyticsScoreDefinitionsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/score_definitions/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_score_definitions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsScoreDefinitionsRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsScoreDefinitionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsScoreDefinitionsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsScoreDefinitionsRetrieve>>;

const result: EnvironmentsLlmAnalyticsScoreDefinitionsRetrieveOutput = await posthog.environmentsLlmAnalyticsScoreDefinitionsRetrieve();

// Result shape (from schema): { id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...
```

### `posthog.environmentsLlmAnalyticsScoreDefinitionsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/llm_analytics/score_definitions/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_score_definitions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsScoreDefinitionsPartialUpdateInput = Parameters<typeof posthog.environmentsLlmAnalyticsScoreDefinitionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsScoreDefinitionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsScoreDefinitionsPartialUpdate>>;

const result: EnvironmentsLlmAnalyticsScoreDefinitionsPartialUpdateOutput = await posthog.environmentsLlmAnalyticsScoreDefinitionsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...
```

### `posthog.environmentsLlmAnalyticsScoreDefinitionsNewVersionCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/score_definitions/{id}/new_version/`
- **OpenAPI operationId**: `environments_llm_analytics_score_definitions_new_version_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsScoreDefinitionsNewVersionCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsScoreDefinitionsNewVersionCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsScoreDefinitionsNewVersionCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsScoreDefinitionsNewVersionCreate>>;

const result: EnvironmentsLlmAnalyticsScoreDefinitionsNewVersionCreateOutput = await posthog.environmentsLlmAnalyticsScoreDefinitionsNewVersionCreate();

// Result shape (from schema): { id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...
```

### `posthog.environmentsLlmAnalyticsTraceReviewsList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/trace_reviews/`
- **OpenAPI operationId**: `environments_llm_analytics_trace_reviews_list`
- **Path params**: None
- **Query params**: `definition_id`, `definition_id__in`, `limit`, `offset`, `order_by`, `search`, `trace_id`, `trace_id__in`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsTraceReviewsListInput = Parameters<typeof posthog.environmentsLlmAnalyticsTraceReviewsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsTraceReviewsListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsTraceReviewsList>>;

const result: EnvironmentsLlmAnalyticsTraceReviewsListOutput = await posthog.environmentsLlmAnalyticsTraceReviewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: numb...
```

### `posthog.environmentsLlmAnalyticsTraceReviewsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/trace_reviews/`
- **OpenAPI operationId**: `environments_llm_analytics_trace_reviews_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsTraceReviewsCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsTraceReviewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsTraceReviewsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsTraceReviewsCreate>>;

const result: EnvironmentsLlmAnalyticsTraceReviewsCreateOutput = await posthog.environmentsLlmAnalyticsTraceReviewsCreate();

// Result shape (from schema): { id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.environmentsLlmAnalyticsTraceReviewsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/llm_analytics/trace_reviews/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_trace_reviews_destroy`
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

type EnvironmentsLlmAnalyticsTraceReviewsDestroyInput = Parameters<typeof posthog.environmentsLlmAnalyticsTraceReviewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsTraceReviewsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsTraceReviewsDestroy>>;

const result: EnvironmentsLlmAnalyticsTraceReviewsDestroyOutput = await posthog.environmentsLlmAnalyticsTraceReviewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsLlmAnalyticsTraceReviewsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_analytics/trace_reviews/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_trace_reviews_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsTraceReviewsRetrieveInput = Parameters<typeof posthog.environmentsLlmAnalyticsTraceReviewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsTraceReviewsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsTraceReviewsRetrieve>>;

const result: EnvironmentsLlmAnalyticsTraceReviewsRetrieveOutput = await posthog.environmentsLlmAnalyticsTraceReviewsRetrieve();

// Result shape (from schema): { id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.environmentsLlmAnalyticsTraceReviewsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/llm_analytics/trace_reviews/{id}/`
- **OpenAPI operationId**: `environments_llm_analytics_trace_reviews_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsTraceReviewsPartialUpdateInput = Parameters<typeof posthog.environmentsLlmAnalyticsTraceReviewsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsTraceReviewsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsTraceReviewsPartialUpdate>>;

const result: EnvironmentsLlmAnalyticsTraceReviewsPartialUpdateOutput = await posthog.environmentsLlmAnalyticsTraceReviewsPartialUpdate();

// Result shape (from schema): { id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.environmentsLlmAnalyticsTranslateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/translate/`
- **What it does**: Translate text to target language.
- **OpenAPI operationId**: `environments_llm_analytics_translate_create`
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

type EnvironmentsLlmAnalyticsTranslateCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsTranslateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsTranslateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsTranslateCreate>>;

const result: EnvironmentsLlmAnalyticsTranslateCreateOutput = await posthog.environmentsLlmAnalyticsTranslateCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.llmAnalyticsClusteringConfigList`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/clustering_config/`
- **What it does**: Team-level clustering configuration (event filters for automated pipelines).
- **OpenAPI operationId**: `llm_analytics_clustering_config_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ event_filters: ({ [key: string]: unknown })[]; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsClusteringConfigListInput = Parameters<typeof posthog.llmAnalyticsClusteringConfigList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsClusteringConfigListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsClusteringConfigList>>;

const result: LlmAnalyticsClusteringConfigListOutput = await posthog.llmAnalyticsClusteringConfigList();

// Result shape (from schema): { event_filters: ({ [key: string]: unknown })[]; created_at: string; updated_at: string }
```

### `posthog.llmAnalyticsClusteringConfigSetEventFiltersCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/clustering_config/set_event_filters/`
- **What it does**: Team-level clustering configuration (event filters for automated pipelines).
- **OpenAPI operationId**: `llm_analytics_clustering_config_set_event_filters_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ event_filters: ({ [key: string]: unknown })[]; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsClusteringConfigSetEventFiltersCreateInput = Parameters<typeof posthog.llmAnalyticsClusteringConfigSetEventFiltersCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsClusteringConfigSetEventFiltersCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsClusteringConfigSetEventFiltersCreate>>;

const result: LlmAnalyticsClusteringConfigSetEventFiltersCreateOutput = await posthog.llmAnalyticsClusteringConfigSetEventFiltersCreate();

// Result shape (from schema): { event_filters: ({ [key: string]: unknown })[]; created_at: string; updated_at: string }
```

### `posthog.llmAnalyticsClusteringJobsList`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/clustering_jobs/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `llm_analytics_clustering_jobs_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsClusteringJobsListInput = Parameters<typeof posthog.llmAnalyticsClusteringJobsList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsClusteringJobsListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsClusteringJobsList>>;

const result: LlmAnalyticsClusteringJobsListOutput = await posthog.llmAnalyticsClusteringJobsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: strin...
```

### `posthog.llmAnalyticsClusteringJobsCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/clustering_jobs/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `llm_analytics_clustering_jobs_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsClusteringJobsCreateInput = Parameters<typeof posthog.llmAnalyticsClusteringJobsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsClusteringJobsCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsClusteringJobsCreate>>;

const result: LlmAnalyticsClusteringJobsCreateOutput = await posthog.llmAnalyticsClusteringJobsCreate();

// Result shape (from schema): { id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }
```

### `posthog.llmAnalyticsClusteringJobsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/llm_analytics/clustering_jobs/{id}/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `llm_analytics_clustering_jobs_destroy`
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

type LlmAnalyticsClusteringJobsDestroyInput = Parameters<typeof posthog.llmAnalyticsClusteringJobsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsClusteringJobsDestroyOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsClusteringJobsDestroy>>;

const result: LlmAnalyticsClusteringJobsDestroyOutput = await posthog.llmAnalyticsClusteringJobsDestroy();

// Result shape (from schema): unknown
```

### `posthog.llmAnalyticsClusteringJobsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/clustering_jobs/{id}/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `llm_analytics_clustering_jobs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsClusteringJobsRetrieveInput = Parameters<typeof posthog.llmAnalyticsClusteringJobsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsClusteringJobsRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsClusteringJobsRetrieve>>;

const result: LlmAnalyticsClusteringJobsRetrieveOutput = await posthog.llmAnalyticsClusteringJobsRetrieve();

// Result shape (from schema): { id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }
```

### `posthog.llmAnalyticsClusteringJobsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/llm_analytics/clustering_jobs/{id}/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `llm_analytics_clustering_jobs_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsClusteringJobsPartialUpdateInput = Parameters<typeof posthog.llmAnalyticsClusteringJobsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsClusteringJobsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsClusteringJobsPartialUpdate>>;

const result: LlmAnalyticsClusteringJobsPartialUpdateOutput = await posthog.llmAnalyticsClusteringJobsPartialUpdate();

// Result shape (from schema): { id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }
```

### `posthog.llmAnalyticsClusteringJobsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/llm_analytics/clustering_jobs/{id}/`
- **What it does**: CRUD for clustering job configurations (max 10 per team).
- **OpenAPI operationId**: `llm_analytics_clustering_jobs_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsClusteringJobsUpdateInput = Parameters<typeof posthog.llmAnalyticsClusteringJobsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsClusteringJobsUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsClusteringJobsUpdate>>;

const result: LlmAnalyticsClusteringJobsUpdateOutput = await posthog.llmAnalyticsClusteringJobsUpdate();

// Result shape (from schema): { id: string; name: string; analysis_level: "trace" | "generation" | "evaluation"; event_filters?: unknown; enabled?: boolean; created_at: string; updated_at: string }
```

### `posthog.llmAnalyticsEvaluationConfigRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/evaluation_config/`
- **What it does**: Get the evaluation config for this team
- **OpenAPI operationId**: `llm_analytics_evaluation_config_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ trial_eval_limit: number; trial_evals_used: number; trial_evals_remaining: number; trial_grandfathered: boolean; trial_deprecation_date: string; active_provider_key: { id: string; provider: "openai" | "anthropic" | "g...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsEvaluationConfigRetrieveInput = Parameters<typeof posthog.llmAnalyticsEvaluationConfigRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationConfigRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationConfigRetrieve>>;

const result: LlmAnalyticsEvaluationConfigRetrieveOutput = await posthog.llmAnalyticsEvaluationConfigRetrieve();

// Result shape (from schema): { trial_eval_limit: number; trial_evals_used: number; trial_evals_remaining: number; trial_grandfathered: boolean; trial_deprecation_date: string; active_provider_key: { id: string; provider: "openai" | "anthropic" | "g...
```

### `posthog.llmAnalyticsEvaluationConfigSetActiveKeyCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/evaluation_config/set_active_key/`
- **What it does**: Set the active provider key for evaluations
- **OpenAPI operationId**: `llm_analytics_evaluation_config_set_active_key_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ trial_eval_limit: number; trial_evals_used: number; trial_evals_remaining: number; trial_grandfathered: boolean; trial_deprecation_date: string; active_provider_key: { id: string; provider: "openai" | "anthropic" | "g...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsEvaluationConfigSetActiveKeyCreateInput = Parameters<typeof posthog.llmAnalyticsEvaluationConfigSetActiveKeyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationConfigSetActiveKeyCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationConfigSetActiveKeyCreate>>;

const result: LlmAnalyticsEvaluationConfigSetActiveKeyCreateOutput = await posthog.llmAnalyticsEvaluationConfigSetActiveKeyCreate();

// Result shape (from schema): { trial_eval_limit: number; trial_evals_used: number; trial_evals_remaining: number; trial_grandfathered: boolean; trial_deprecation_date: string; active_provider_key: { id: string; provider: "openai" | "anthropic" | "g...
```

### `posthog.llmAnalyticsEvaluationReportsList`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/evaluation_reports/`
- **What it does**: CRUD for evaluation report configurations + report run history.
- **OpenAPI operationId**: `llm_analytics_evaluation_reports_list`
- **Path params**: None
- **Query params**: `evaluation`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_del...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsEvaluationReportsListInput = Parameters<typeof posthog.llmAnalyticsEvaluationReportsList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationReportsListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationReportsList>>;

const result: LlmAnalyticsEvaluationReportsListOutput = await posthog.llmAnalyticsEvaluationReportsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_del...
```

### `posthog.llmAnalyticsEvaluationReportsCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/evaluation_reports/`
- **What it does**: CRUD for evaluation report configurations + report run history.
- **OpenAPI operationId**: `llm_analytics_evaluation_reports_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsEvaluationReportsCreateInput = Parameters<typeof posthog.llmAnalyticsEvaluationReportsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationReportsCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationReportsCreate>>;

const result: LlmAnalyticsEvaluationReportsCreateOutput = await posthog.llmAnalyticsEvaluationReportsCreate();

// Result shape (from schema): { id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...
```

### `posthog.llmAnalyticsEvaluationReportsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/llm_analytics/evaluation_reports/{id}/`
- **What it does**: Evaluation report configs are deleted only when their evaluation is deleted. Use PATCH enabled=false to stop delivery.
- **OpenAPI operationId**: `llm_analytics_evaluation_reports_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsEvaluationReportsDestroyInput = Parameters<typeof posthog.llmAnalyticsEvaluationReportsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationReportsDestroyOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationReportsDestroy>>;

const result: LlmAnalyticsEvaluationReportsDestroyOutput = await posthog.llmAnalyticsEvaluationReportsDestroy();

// Result shape (from schema): unknown
```

### `posthog.llmAnalyticsEvaluationReportsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/evaluation_reports/{id}/`
- **What it does**: CRUD for evaluation report configurations + report run history.
- **OpenAPI operationId**: `llm_analytics_evaluation_reports_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsEvaluationReportsRetrieveInput = Parameters<typeof posthog.llmAnalyticsEvaluationReportsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationReportsRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationReportsRetrieve>>;

const result: LlmAnalyticsEvaluationReportsRetrieveOutput = await posthog.llmAnalyticsEvaluationReportsRetrieve();

// Result shape (from schema): { id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...
```

### `posthog.llmAnalyticsEvaluationReportsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/llm_analytics/evaluation_reports/{id}/`
- **What it does**: CRUD for evaluation report configurations + report run history.
- **OpenAPI operationId**: `llm_analytics_evaluation_reports_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsEvaluationReportsPartialUpdateInput = Parameters<typeof posthog.llmAnalyticsEvaluationReportsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationReportsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationReportsPartialUpdate>>;

const result: LlmAnalyticsEvaluationReportsPartialUpdateOutput = await posthog.llmAnalyticsEvaluationReportsPartialUpdate();

// Result shape (from schema): { id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...
```

### `posthog.llmAnalyticsEvaluationReportsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/llm_analytics/evaluation_reports/{id}/`
- **What it does**: CRUD for evaluation report configurations + report run history.
- **OpenAPI operationId**: `llm_analytics_evaluation_reports_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsEvaluationReportsUpdateInput = Parameters<typeof posthog.llmAnalyticsEvaluationReportsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationReportsUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationReportsUpdate>>;

const result: LlmAnalyticsEvaluationReportsUpdateOutput = await posthog.llmAnalyticsEvaluationReportsUpdate();

// Result shape (from schema): { id: string; evaluation: string; frequency?: "scheduled" | "every_n"; rrule?: string; starts_at: string | null; timezone_name: string; next_delivery_date: string | null; delivery_targets?: unknown; max_sample_size?: nu...
```

### `posthog.llmAnalyticsEvaluationReportsGenerateCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/evaluation_reports/{id}/generate/`
- **What it does**: Trigger immediate report generation.
- **OpenAPI operationId**: `llm_analytics_evaluation_reports_generate_create`
- **Path params**: `id`
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

type LlmAnalyticsEvaluationReportsGenerateCreateInput = Parameters<typeof posthog.llmAnalyticsEvaluationReportsGenerateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationReportsGenerateCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationReportsGenerateCreate>>;

const result: LlmAnalyticsEvaluationReportsGenerateCreateOutput = await posthog.llmAnalyticsEvaluationReportsGenerateCreate();

// Result shape (from schema): unknown
```

### `posthog.llmAnalyticsEvaluationReportsRunsList`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/evaluation_reports/{id}/runs/`
- **What it does**: List report runs (history) for this report.
- **OpenAPI operationId**: `llm_analytics_evaluation_reports_runs_list`
- **Path params**: `id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; report: string; content: unknown; metadata: unknown; period_start: string; period_end: string; delivery_status: "pending" | "deliv...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsEvaluationReportsRunsListInput = Parameters<typeof posthog.llmAnalyticsEvaluationReportsRunsList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationReportsRunsListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationReportsRunsList>>;

const result: LlmAnalyticsEvaluationReportsRunsListOutput = await posthog.llmAnalyticsEvaluationReportsRunsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; report: string; content: unknown; metadata: unknown; period_start: string; period_end: string; delivery_status: "pending" | "deliv...
```

### `posthog.llmAnalyticsModelsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/models/`
- **What it does**: List available models for a provider.
- **OpenAPI operationId**: `llm_analytics_models_retrieve`
- **Path params**: None
- **Query params**: `key_id`, `provider`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ models: ({ id: string; posthog_available: boolean })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsModelsRetrieveInput = Parameters<typeof posthog.llmAnalyticsModelsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsModelsRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsModelsRetrieve>>;

const result: LlmAnalyticsModelsRetrieveOutput = await posthog.llmAnalyticsModelsRetrieve();

// Result shape (from schema): { models: ({ id: string; posthog_available: boolean })[] }
```

### `posthog.llmAnalyticsParserRecipesList`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/parser_recipes/`
- **OpenAPI operationId**: `llm_analytics_parser_recipes_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; source: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsParserRecipesListInput = Parameters<typeof posthog.llmAnalyticsParserRecipesList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsParserRecipesListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsParserRecipesList>>;

const result: LlmAnalyticsParserRecipesListOutput = await posthog.llmAnalyticsParserRecipesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; source: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?...
```

### `posthog.llmAnalyticsParserRecipesCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/parser_recipes/`
- **OpenAPI operationId**: `llm_analytics_parser_recipes_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; source: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_confi...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsParserRecipesCreateInput = Parameters<typeof posthog.llmAnalyticsParserRecipesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsParserRecipesCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsParserRecipesCreate>>;

const result: LlmAnalyticsParserRecipesCreateOutput = await posthog.llmAnalyticsParserRecipesCreate();

// Result shape (from schema): { id: string; name: string; source: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_confi...
```

### `posthog.llmAnalyticsParserRecipesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/llm_analytics/parser_recipes/{id}/`
- **OpenAPI operationId**: `llm_analytics_parser_recipes_destroy`
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

type LlmAnalyticsParserRecipesDestroyInput = Parameters<typeof posthog.llmAnalyticsParserRecipesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsParserRecipesDestroyOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsParserRecipesDestroy>>;

const result: LlmAnalyticsParserRecipesDestroyOutput = await posthog.llmAnalyticsParserRecipesDestroy();

// Result shape (from schema): unknown
```

### `posthog.llmAnalyticsParserRecipesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/parser_recipes/{id}/`
- **OpenAPI operationId**: `llm_analytics_parser_recipes_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; source: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_confi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsParserRecipesRetrieveInput = Parameters<typeof posthog.llmAnalyticsParserRecipesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsParserRecipesRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsParserRecipesRetrieve>>;

const result: LlmAnalyticsParserRecipesRetrieveOutput = await posthog.llmAnalyticsParserRecipesRetrieve();

// Result shape (from schema): { id: string; name: string; source: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_confi...
```

### `posthog.llmAnalyticsParserRecipesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/llm_analytics/parser_recipes/{id}/`
- **OpenAPI operationId**: `llm_analytics_parser_recipes_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; source: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_confi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsParserRecipesPartialUpdateInput = Parameters<typeof posthog.llmAnalyticsParserRecipesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsParserRecipesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsParserRecipesPartialUpdate>>;

const result: LlmAnalyticsParserRecipesPartialUpdateOutput = await posthog.llmAnalyticsParserRecipesPartialUpdate();

// Result shape (from schema): { id: string; name: string; source: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_confi...
```

### `posthog.llmAnalyticsProviderKeyValidationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/provider_key_validations/`
- **What it does**: Validate LLM provider API keys without persisting them
- **OpenAPI operationId**: `llm_analytics_provider_key_validations_create`
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

type LlmAnalyticsProviderKeyValidationsCreateInput = Parameters<typeof posthog.llmAnalyticsProviderKeyValidationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeyValidationsCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeyValidationsCreate>>;

const result: LlmAnalyticsProviderKeyValidationsCreateOutput = await posthog.llmAnalyticsProviderKeyValidationsCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.llmAnalyticsProviderKeysList`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/provider_keys/`
- **OpenAPI operationId**: `llm_analytics_provider_keys_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsProviderKeysListInput = Parameters<typeof posthog.llmAnalyticsProviderKeysList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeysListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeysList>>;

const result: LlmAnalyticsProviderKeysListOutput = await posthog.llmAnalyticsProviderKeysList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; ...
```

### `posthog.llmAnalyticsProviderKeysCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/provider_keys/`
- **OpenAPI operationId**: `llm_analytics_provider_keys_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsProviderKeysCreateInput = Parameters<typeof posthog.llmAnalyticsProviderKeysCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeysCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeysCreate>>;

const result: LlmAnalyticsProviderKeysCreateOutput = await posthog.llmAnalyticsProviderKeysCreate();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.llmAnalyticsProviderKeysDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/llm_analytics/provider_keys/{id}/`
- **OpenAPI operationId**: `llm_analytics_provider_keys_destroy`
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

type LlmAnalyticsProviderKeysDestroyInput = Parameters<typeof posthog.llmAnalyticsProviderKeysDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeysDestroyOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeysDestroy>>;

const result: LlmAnalyticsProviderKeysDestroyOutput = await posthog.llmAnalyticsProviderKeysDestroy();

// Result shape (from schema): unknown
```

### `posthog.llmAnalyticsProviderKeysRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/provider_keys/{id}/`
- **OpenAPI operationId**: `llm_analytics_provider_keys_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsProviderKeysRetrieveInput = Parameters<typeof posthog.llmAnalyticsProviderKeysRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeysRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeysRetrieve>>;

const result: LlmAnalyticsProviderKeysRetrieveOutput = await posthog.llmAnalyticsProviderKeysRetrieve();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.llmAnalyticsProviderKeysPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/llm_analytics/provider_keys/{id}/`
- **OpenAPI operationId**: `llm_analytics_provider_keys_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsProviderKeysPartialUpdateInput = Parameters<typeof posthog.llmAnalyticsProviderKeysPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeysPartialUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeysPartialUpdate>>;

const result: LlmAnalyticsProviderKeysPartialUpdateOutput = await posthog.llmAnalyticsProviderKeysPartialUpdate();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.llmAnalyticsProviderKeysUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/llm_analytics/provider_keys/{id}/`
- **OpenAPI operationId**: `llm_analytics_provider_keys_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsProviderKeysUpdateInput = Parameters<typeof posthog.llmAnalyticsProviderKeysUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeysUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeysUpdate>>;

const result: LlmAnalyticsProviderKeysUpdateOutput = await posthog.llmAnalyticsProviderKeysUpdate();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.llmAnalyticsProviderKeysAssignCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/provider_keys/{id}/assign/`
- **What it does**: Assign this key to evaluations and optionally re-enable them.
- **OpenAPI operationId**: `llm_analytics_provider_keys_assign_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsProviderKeysAssignCreateInput = Parameters<typeof posthog.llmAnalyticsProviderKeysAssignCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeysAssignCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeysAssignCreate>>;

const result: LlmAnalyticsProviderKeysAssignCreateOutput = await posthog.llmAnalyticsProviderKeysAssignCreate();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.llmAnalyticsProviderKeysDependentConfigsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/provider_keys/{id}/dependent_configs/`
- **What it does**: Get evaluations using this key and alternative keys for replacement.
- **OpenAPI operationId**: `llm_analytics_provider_keys_dependent_configs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsProviderKeysDependentConfigsRetrieveInput = Parameters<typeof posthog.llmAnalyticsProviderKeysDependentConfigsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeysDependentConfigsRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeysDependentConfigsRetrieve>>;

const result: LlmAnalyticsProviderKeysDependentConfigsRetrieveOutput = await posthog.llmAnalyticsProviderKeysDependentConfigsRetrieve();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.llmAnalyticsProviderKeysValidateCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/provider_keys/{id}/validate/`
- **OpenAPI operationId**: `llm_analytics_provider_keys_validate_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsProviderKeysValidateCreateInput = Parameters<typeof posthog.llmAnalyticsProviderKeysValidateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeysValidateCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeysValidateCreate>>;

const result: LlmAnalyticsProviderKeysValidateCreateOutput = await posthog.llmAnalyticsProviderKeysValidateCreate();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.llmAnalyticsProviderKeysTrialEvaluationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/provider_keys/trial_evaluations/`
- **What it does**: List enabled evaluations currently using trial credits for a given provider.
- **OpenAPI operationId**: `llm_analytics_provider_keys_trial_evaluations_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsProviderKeysTrialEvaluationsRetrieveInput = Parameters<typeof posthog.llmAnalyticsProviderKeysTrialEvaluationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsProviderKeysTrialEvaluationsRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsProviderKeysTrialEvaluationsRetrieve>>;

const result: LlmAnalyticsProviderKeysTrialEvaluationsRetrieveOutput = await posthog.llmAnalyticsProviderKeysTrialEvaluationsRetrieve();

// Result shape (from schema): { id: string; provider: "openai" | "anthropic" | "gemini" | "openrouter" | "fireworks" | "azure_openai" | "together_ai" | "minimax" | "zeabur"; name: string; state: "unknown" | "ok" | "invalid" | "error"; error_message:...
```

### `posthog.llmAnalyticsReviewQueueItemsList`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/review_queue_items/`
- **OpenAPI operationId**: `llm_analytics_review_queue_items_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `order_by`, `queue_id`, `search`, `trace_id`, `trace_id__in`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; u...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsReviewQueueItemsListInput = Parameters<typeof posthog.llmAnalyticsReviewQueueItemsList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsReviewQueueItemsListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsReviewQueueItemsList>>;

const result: LlmAnalyticsReviewQueueItemsListOutput = await posthog.llmAnalyticsReviewQueueItemsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; u...
```

### `posthog.llmAnalyticsReviewQueueItemsCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/review_queue_items/`
- **OpenAPI operationId**: `llm_analytics_review_queue_items_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsReviewQueueItemsCreateInput = Parameters<typeof posthog.llmAnalyticsReviewQueueItemsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsReviewQueueItemsCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsReviewQueueItemsCreate>>;

const result: LlmAnalyticsReviewQueueItemsCreateOutput = await posthog.llmAnalyticsReviewQueueItemsCreate();

// Result shape (from schema): { id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...
```

### `posthog.llmAnalyticsReviewQueueItemsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/llm_analytics/review_queue_items/{id}/`
- **OpenAPI operationId**: `llm_analytics_review_queue_items_destroy`
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

type LlmAnalyticsReviewQueueItemsDestroyInput = Parameters<typeof posthog.llmAnalyticsReviewQueueItemsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsReviewQueueItemsDestroyOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsReviewQueueItemsDestroy>>;

const result: LlmAnalyticsReviewQueueItemsDestroyOutput = await posthog.llmAnalyticsReviewQueueItemsDestroy();

// Result shape (from schema): unknown
```

### `posthog.llmAnalyticsReviewQueueItemsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/review_queue_items/{id}/`
- **OpenAPI operationId**: `llm_analytics_review_queue_items_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsReviewQueueItemsRetrieveInput = Parameters<typeof posthog.llmAnalyticsReviewQueueItemsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsReviewQueueItemsRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsReviewQueueItemsRetrieve>>;

const result: LlmAnalyticsReviewQueueItemsRetrieveOutput = await posthog.llmAnalyticsReviewQueueItemsRetrieve();

// Result shape (from schema): { id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...
```

### `posthog.llmAnalyticsReviewQueueItemsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/llm_analytics/review_queue_items/{id}/`
- **OpenAPI operationId**: `llm_analytics_review_queue_items_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsReviewQueueItemsPartialUpdateInput = Parameters<typeof posthog.llmAnalyticsReviewQueueItemsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsReviewQueueItemsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsReviewQueueItemsPartialUpdate>>;

const result: LlmAnalyticsReviewQueueItemsPartialUpdateOutput = await posthog.llmAnalyticsReviewQueueItemsPartialUpdate();

// Result shape (from schema): { id: string; queue_id: string; queue_name: string; trace_id: string; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: ...
```

### `posthog.llmAnalyticsReviewQueuesList`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/review_queues/`
- **OpenAPI operationId**: `llm_analytics_review_queues_list`
- **Path params**: None
- **Query params**: `limit`, `name`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; d...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsReviewQueuesListInput = Parameters<typeof posthog.llmAnalyticsReviewQueuesList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsReviewQueuesListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsReviewQueuesList>>;

const result: LlmAnalyticsReviewQueuesListOutput = await posthog.llmAnalyticsReviewQueuesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; d...
```

### `posthog.llmAnalyticsReviewQueuesCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/review_queues/`
- **OpenAPI operationId**: `llm_analytics_review_queues_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsReviewQueuesCreateInput = Parameters<typeof posthog.llmAnalyticsReviewQueuesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsReviewQueuesCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsReviewQueuesCreate>>;

const result: LlmAnalyticsReviewQueuesCreateOutput = await posthog.llmAnalyticsReviewQueuesCreate();

// Result shape (from schema): { id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...
```

### `posthog.llmAnalyticsReviewQueuesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/llm_analytics/review_queues/{id}/`
- **OpenAPI operationId**: `llm_analytics_review_queues_destroy`
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

type LlmAnalyticsReviewQueuesDestroyInput = Parameters<typeof posthog.llmAnalyticsReviewQueuesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsReviewQueuesDestroyOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsReviewQueuesDestroy>>;

const result: LlmAnalyticsReviewQueuesDestroyOutput = await posthog.llmAnalyticsReviewQueuesDestroy();

// Result shape (from schema): unknown
```

### `posthog.llmAnalyticsReviewQueuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/review_queues/{id}/`
- **OpenAPI operationId**: `llm_analytics_review_queues_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsReviewQueuesRetrieveInput = Parameters<typeof posthog.llmAnalyticsReviewQueuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsReviewQueuesRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsReviewQueuesRetrieve>>;

const result: LlmAnalyticsReviewQueuesRetrieveOutput = await posthog.llmAnalyticsReviewQueuesRetrieve();

// Result shape (from schema): { id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...
```

### `posthog.llmAnalyticsReviewQueuesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/llm_analytics/review_queues/{id}/`
- **OpenAPI operationId**: `llm_analytics_review_queues_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsReviewQueuesPartialUpdateInput = Parameters<typeof posthog.llmAnalyticsReviewQueuesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsReviewQueuesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsReviewQueuesPartialUpdate>>;

const result: LlmAnalyticsReviewQueuesPartialUpdateOutput = await posthog.llmAnalyticsReviewQueuesPartialUpdate();

// Result shape (from schema): { id: string; name: string; pending_item_count: number; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email:...
```

### `posthog.llmAnalyticsScoreDefinitionsList`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/score_definitions/`
- **OpenAPI operationId**: `llm_analytics_score_definitions_list`
- **Path params**: None
- **Query params**: `archived`, `kind`, `limit`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; curren...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsScoreDefinitionsListInput = Parameters<typeof posthog.llmAnalyticsScoreDefinitionsList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsScoreDefinitionsListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsScoreDefinitionsList>>;

const result: LlmAnalyticsScoreDefinitionsListOutput = await posthog.llmAnalyticsScoreDefinitionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; curren...
```

### `posthog.llmAnalyticsScoreDefinitionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/score_definitions/`
- **OpenAPI operationId**: `llm_analytics_score_definitions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsScoreDefinitionsCreateInput = Parameters<typeof posthog.llmAnalyticsScoreDefinitionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsScoreDefinitionsCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsScoreDefinitionsCreate>>;

const result: LlmAnalyticsScoreDefinitionsCreateOutput = await posthog.llmAnalyticsScoreDefinitionsCreate();

// Result shape (from schema): { id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...
```

### `posthog.llmAnalyticsScoreDefinitionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/score_definitions/{id}/`
- **OpenAPI operationId**: `llm_analytics_score_definitions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsScoreDefinitionsRetrieveInput = Parameters<typeof posthog.llmAnalyticsScoreDefinitionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsScoreDefinitionsRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsScoreDefinitionsRetrieve>>;

const result: LlmAnalyticsScoreDefinitionsRetrieveOutput = await posthog.llmAnalyticsScoreDefinitionsRetrieve();

// Result shape (from schema): { id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...
```

### `posthog.llmAnalyticsScoreDefinitionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/llm_analytics/score_definitions/{id}/`
- **OpenAPI operationId**: `llm_analytics_score_definitions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsScoreDefinitionsPartialUpdateInput = Parameters<typeof posthog.llmAnalyticsScoreDefinitionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsScoreDefinitionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsScoreDefinitionsPartialUpdate>>;

const result: LlmAnalyticsScoreDefinitionsPartialUpdateOutput = await posthog.llmAnalyticsScoreDefinitionsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...
```

### `posthog.llmAnalyticsScoreDefinitionsNewVersionCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/score_definitions/{id}/new_version/`
- **OpenAPI operationId**: `llm_analytics_score_definitions_new_version_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsScoreDefinitionsNewVersionCreateInput = Parameters<typeof posthog.llmAnalyticsScoreDefinitionsNewVersionCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsScoreDefinitionsNewVersionCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsScoreDefinitionsNewVersionCreate>>;

const result: LlmAnalyticsScoreDefinitionsNewVersionCreateOutput = await posthog.llmAnalyticsScoreDefinitionsNewVersionCreate();

// Result shape (from schema): { id: string; name: string; description: string; kind: "categorical" | "numeric" | "boolean"; archived: boolean; current_version: number; current_version_id: string | null; config: { options: ({ key: string; label: stri...
```

### `posthog.llmAnalyticsTraceReviewsList`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/trace_reviews/`
- **OpenAPI operationId**: `llm_analytics_trace_reviews_list`
- **Path params**: None
- **Query params**: `definition_id`, `definition_id__in`, `limit`, `offset`, `order_by`, `search`, `trace_id`, `trace_id__in`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsTraceReviewsListInput = Parameters<typeof posthog.llmAnalyticsTraceReviewsList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsTraceReviewsListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsTraceReviewsList>>;

const result: LlmAnalyticsTraceReviewsListOutput = await posthog.llmAnalyticsTraceReviewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: numb...
```

### `posthog.llmAnalyticsTraceReviewsCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/trace_reviews/`
- **OpenAPI operationId**: `llm_analytics_trace_reviews_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsTraceReviewsCreateInput = Parameters<typeof posthog.llmAnalyticsTraceReviewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsTraceReviewsCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsTraceReviewsCreate>>;

const result: LlmAnalyticsTraceReviewsCreateOutput = await posthog.llmAnalyticsTraceReviewsCreate();

// Result shape (from schema): { id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.llmAnalyticsTraceReviewsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/llm_analytics/trace_reviews/{id}/`
- **OpenAPI operationId**: `llm_analytics_trace_reviews_destroy`
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

type LlmAnalyticsTraceReviewsDestroyInput = Parameters<typeof posthog.llmAnalyticsTraceReviewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsTraceReviewsDestroyOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsTraceReviewsDestroy>>;

const result: LlmAnalyticsTraceReviewsDestroyOutput = await posthog.llmAnalyticsTraceReviewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.llmAnalyticsTraceReviewsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_analytics/trace_reviews/{id}/`
- **OpenAPI operationId**: `llm_analytics_trace_reviews_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsTraceReviewsRetrieveInput = Parameters<typeof posthog.llmAnalyticsTraceReviewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsTraceReviewsRetrieveOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsTraceReviewsRetrieve>>;

const result: LlmAnalyticsTraceReviewsRetrieveOutput = await posthog.llmAnalyticsTraceReviewsRetrieve();

// Result shape (from schema): { id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.llmAnalyticsTraceReviewsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/llm_analytics/trace_reviews/{id}/`
- **OpenAPI operationId**: `llm_analytics_trace_reviews_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsTraceReviewsPartialUpdateInput = Parameters<typeof posthog.llmAnalyticsTraceReviewsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsTraceReviewsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsTraceReviewsPartialUpdate>>;

const result: LlmAnalyticsTraceReviewsPartialUpdateOutput = await posthog.llmAnalyticsTraceReviewsPartialUpdate();

// Result shape (from schema): { id: string; trace_id: string; trace_url: string; comment: string | null; created_at: string; updated_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_na...
```

### `posthog.llmAnalyticsTranslateCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/translate/`
- **What it does**: Translate text to target language.
- **OpenAPI operationId**: `llm_analytics_translate_create`
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

type LlmAnalyticsTranslateCreateInput = Parameters<typeof posthog.llmAnalyticsTranslateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsTranslateCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsTranslateCreate>>;

const result: LlmAnalyticsTranslateCreateOutput = await posthog.llmAnalyticsTranslateCreate();

// Result shape (from schema): { [key: string]: unknown }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

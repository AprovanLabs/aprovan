# Marketing Analytics

## Operations

### `posthog.environmentsMarketingAnalyticsConversionGoalsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/marketing_analytics/conversion_goals/`
- **What it does**: List conversion goals
- **OpenAPI operationId**: `environments_marketing_analytics_conversion_goals_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ goals: ({ id: string; name: string; kind: string; target_label: string; last_30d_count: number; integrated_count: number | null; events_without_utm_source: number | null; events_with_unmatched_utm_source: number | nul...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMarketingAnalyticsConversionGoalsRetrieveInput = Parameters<typeof posthog.environmentsMarketingAnalyticsConversionGoalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMarketingAnalyticsConversionGoalsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMarketingAnalyticsConversionGoalsRetrieve>>;

const result: EnvironmentsMarketingAnalyticsConversionGoalsRetrieveOutput = await posthog.environmentsMarketingAnalyticsConversionGoalsRetrieve();

// Result shape (from schema): { goals: ({ id: string; name: string; kind: string; target_label: string; last_30d_count: number; integrated_count: number | null; events_without_utm_source: number | null; events_with_unmatched_utm_source: number | nul...
```

### `posthog.environmentsMarketingAnalyticsDataSourcesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/marketing_analytics/data_sources/`
- **What it does**: List marketing data sources
- **OpenAPI operationId**: `environments_marketing_analytics_data_sources_retrieve`
- **Path params**: None
- **Query params**: `source_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ integrations: ({ source_type: string; is_native: boolean; display_name: string; connected: boolean; last_sync_at: string | null; last_sync_status: string; last_error: string | null; rows_last_24h: number; rows_last_7d...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMarketingAnalyticsDataSourcesRetrieveInput = Parameters<typeof posthog.environmentsMarketingAnalyticsDataSourcesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMarketingAnalyticsDataSourcesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMarketingAnalyticsDataSourcesRetrieve>>;

const result: EnvironmentsMarketingAnalyticsDataSourcesRetrieveOutput = await posthog.environmentsMarketingAnalyticsDataSourcesRetrieve();

// Result shape (from schema): { integrations: ({ source_type: string; is_native: boolean; display_name: string; connected: boolean; last_sync_at: string | null; last_sync_status: string; last_error: string | null; rows_last_24h: number; rows_last_7d...
```

### `posthog.environmentsMarketingAnalyticsDiagnoseRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/marketing_analytics/diagnose/`
- **What it does**: Diagnose marketing analytics
- **OpenAPI operationId**: `environments_marketing_analytics_diagnose_retrieve`
- **Path params**: None
- **Query params**: `attribution_lookback_days`, `include_conversion_goals`, `source_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ integrations: ({ integration_key: string; source_type: string; display_name: string; overall_status: string; diagnosis: string; data_source?: { source_type: string; is_native: boolean; display_name: string; connected:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMarketingAnalyticsDiagnoseRetrieveInput = Parameters<typeof posthog.environmentsMarketingAnalyticsDiagnoseRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMarketingAnalyticsDiagnoseRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMarketingAnalyticsDiagnoseRetrieve>>;

const result: EnvironmentsMarketingAnalyticsDiagnoseRetrieveOutput = await posthog.environmentsMarketingAnalyticsDiagnoseRetrieve();

// Result shape (from schema): { integrations: ({ integration_key: string; source_type: string; display_name: string; overall_status: string; diagnosis: string; data_source?: { source_type: string; is_native: boolean; display_name: string; connected:...
```

### `posthog.environmentsMarketingAnalyticsExplainConversionGoalRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/marketing_analytics/explain_conversion_goal/`
- **What it does**: Explain a conversion goal
- **OpenAPI operationId**: `environments_marketing_analytics_explain_conversion_goal_retrieve`
- **Path params**: None
- **Query params**: `date_from`, `date_to`, `goal_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ goal_id: string; goal_name: string; kind: string; period: { date_from: string | null; date_to: string | null }; total_count: number; integrated_count: number | null; events_without_utm_source: number | null; events_wi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMarketingAnalyticsExplainConversionGoalRetrieveInput = Parameters<typeof posthog.environmentsMarketingAnalyticsExplainConversionGoalRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMarketingAnalyticsExplainConversionGoalRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMarketingAnalyticsExplainConversionGoalRetrieve>>;

const result: EnvironmentsMarketingAnalyticsExplainConversionGoalRetrieveOutput = await posthog.environmentsMarketingAnalyticsExplainConversionGoalRetrieve();

// Result shape (from schema): { goal_id: string; goal_name: string; kind: string; period: { date_from: string | null; date_to: string | null }; total_count: number; integrated_count: number | null; events_without_utm_source: number | null; events_wi...
```

### `posthog.environmentsMarketingAnalyticsSuggestConversionGoalsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/marketing_analytics/suggest_conversion_goals/`
- **What it does**: Suggest conversion goals
- **OpenAPI operationId**: `environments_marketing_analytics_suggest_conversion_goals_retrieve`
- **Path params**: None
- **Query params**: `min_count`, `top_n`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ candidates: ({ event_name: string; last_30d_count: number; distinct_users_30d: number; pct_with_utm_source: number; pct_with_utm_campaign: number; top_utm_sources: (unknown[])[]; is_already_a_goal: boolean; suggestion...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMarketingAnalyticsSuggestConversionGoalsRetrieveInput = Parameters<typeof posthog.environmentsMarketingAnalyticsSuggestConversionGoalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMarketingAnalyticsSuggestConversionGoalsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMarketingAnalyticsSuggestConversionGoalsRetrieve>>;

const result: EnvironmentsMarketingAnalyticsSuggestConversionGoalsRetrieveOutput = await posthog.environmentsMarketingAnalyticsSuggestConversionGoalsRetrieve();

// Result shape (from schema): { candidates: ({ event_name: string; last_30d_count: number; distinct_users_30d: number; pct_with_utm_source: number; pct_with_utm_campaign: number; top_utm_sources: (unknown[])[]; is_already_a_goal: boolean; suggestion...
```

### `posthog.environmentsMarketingAnalyticsSuggestUtmMappingsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/marketing_analytics/suggest_utm_mappings/`
- **What it does**: Suggest UTM source mappings
- **OpenAPI operationId**: `environments_marketing_analytics_suggest_utm_mappings_retrieve`
- **Path params**: None
- **Query params**: `lookback_days`, `min_event_count`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ source_suggestions: ({ raw_utm_source: string; suggested_target: string; suggested_target_display_name: string; reason: string })[]; campaign_suggestions: ({ integration: string; integration_display_name: string; sugg...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMarketingAnalyticsSuggestUtmMappingsRetrieveInput = Parameters<typeof posthog.environmentsMarketingAnalyticsSuggestUtmMappingsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMarketingAnalyticsSuggestUtmMappingsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMarketingAnalyticsSuggestUtmMappingsRetrieve>>;

const result: EnvironmentsMarketingAnalyticsSuggestUtmMappingsRetrieveOutput = await posthog.environmentsMarketingAnalyticsSuggestUtmMappingsRetrieve();

// Result shape (from schema): { source_suggestions: ({ raw_utm_source: string; suggested_target: string; suggested_target_display_name: string; reason: string })[]; campaign_suggestions: ({ integration: string; integration_display_name: string; sugg...
```

### `posthog.environmentsMarketingAnalyticsTestMappingCreate`

- **HTTP**: `POST /api/environments/{environment_id}/marketing_analytics/test_mapping/`
- **OpenAPI operationId**: `environments_marketing_analytics_test_mapping_create`
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

type EnvironmentsMarketingAnalyticsTestMappingCreateInput = Parameters<typeof posthog.environmentsMarketingAnalyticsTestMappingCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMarketingAnalyticsTestMappingCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMarketingAnalyticsTestMappingCreate>>;

const result: EnvironmentsMarketingAnalyticsTestMappingCreateOutput = await posthog.environmentsMarketingAnalyticsTestMappingCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsMarketingAnalyticsUtmAuditRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/marketing_analytics/utm_audit/`
- **What it does**: Run UTM audit
- **OpenAPI operationId**: `environments_marketing_analytics_utm_audit_retrieve`
- **Path params**: None
- **Query params**: `date_from`, `date_to`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ total_campaigns: number; campaigns_with_issues: number; campaigns_without_issues: number; total_spend_at_risk: number; results: ({ campaign_name: string; campaign_id: string; source_name: string; spend: number; clicks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMarketingAnalyticsUtmAuditRetrieveInput = Parameters<typeof posthog.environmentsMarketingAnalyticsUtmAuditRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMarketingAnalyticsUtmAuditRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMarketingAnalyticsUtmAuditRetrieve>>;

const result: EnvironmentsMarketingAnalyticsUtmAuditRetrieveOutput = await posthog.environmentsMarketingAnalyticsUtmAuditRetrieve();

// Result shape (from schema): { total_campaigns: number; campaigns_with_issues: number; campaigns_without_issues: number; total_spend_at_risk: number; results: ({ campaign_name: string; campaign_id: string; source_name: string; spend: number; clicks...
```

### `posthog.marketingAnalyticsConversionGoalsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/marketing_analytics/conversion_goals/`
- **What it does**: List conversion goals
- **OpenAPI operationId**: `marketing_analytics_conversion_goals_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ goals: ({ id: string; name: string; kind: string; target_label: string; last_30d_count: number; integrated_count: number | null; events_without_utm_source: number | null; events_with_unmatched_utm_source: number | nul...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MarketingAnalyticsConversionGoalsRetrieveInput = Parameters<typeof posthog.marketingAnalyticsConversionGoalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MarketingAnalyticsConversionGoalsRetrieveOutput = Awaited<ReturnType<typeof posthog.marketingAnalyticsConversionGoalsRetrieve>>;

const result: MarketingAnalyticsConversionGoalsRetrieveOutput = await posthog.marketingAnalyticsConversionGoalsRetrieve();

// Result shape (from schema): { goals: ({ id: string; name: string; kind: string; target_label: string; last_30d_count: number; integrated_count: number | null; events_without_utm_source: number | null; events_with_unmatched_utm_source: number | nul...
```

### `posthog.marketingAnalyticsDataSourcesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/marketing_analytics/data_sources/`
- **What it does**: List marketing data sources
- **OpenAPI operationId**: `marketing_analytics_data_sources_retrieve`
- **Path params**: None
- **Query params**: `source_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ integrations: ({ source_type: string; is_native: boolean; display_name: string; connected: boolean; last_sync_at: string | null; last_sync_status: string; last_error: string | null; rows_last_24h: number; rows_last_7d...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MarketingAnalyticsDataSourcesRetrieveInput = Parameters<typeof posthog.marketingAnalyticsDataSourcesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MarketingAnalyticsDataSourcesRetrieveOutput = Awaited<ReturnType<typeof posthog.marketingAnalyticsDataSourcesRetrieve>>;

const result: MarketingAnalyticsDataSourcesRetrieveOutput = await posthog.marketingAnalyticsDataSourcesRetrieve();

// Result shape (from schema): { integrations: ({ source_type: string; is_native: boolean; display_name: string; connected: boolean; last_sync_at: string | null; last_sync_status: string; last_error: string | null; rows_last_24h: number; rows_last_7d...
```

### `posthog.marketingAnalyticsDiagnoseRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/marketing_analytics/diagnose/`
- **What it does**: Diagnose marketing analytics
- **OpenAPI operationId**: `marketing_analytics_diagnose_retrieve`
- **Path params**: None
- **Query params**: `attribution_lookback_days`, `include_conversion_goals`, `source_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ integrations: ({ integration_key: string; source_type: string; display_name: string; overall_status: string; diagnosis: string; data_source?: { source_type: string; is_native: boolean; display_name: string; connected:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MarketingAnalyticsDiagnoseRetrieveInput = Parameters<typeof posthog.marketingAnalyticsDiagnoseRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MarketingAnalyticsDiagnoseRetrieveOutput = Awaited<ReturnType<typeof posthog.marketingAnalyticsDiagnoseRetrieve>>;

const result: MarketingAnalyticsDiagnoseRetrieveOutput = await posthog.marketingAnalyticsDiagnoseRetrieve();

// Result shape (from schema): { integrations: ({ integration_key: string; source_type: string; display_name: string; overall_status: string; diagnosis: string; data_source?: { source_type: string; is_native: boolean; display_name: string; connected:...
```

### `posthog.marketingAnalyticsExplainConversionGoalRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/marketing_analytics/explain_conversion_goal/`
- **What it does**: Explain a conversion goal
- **OpenAPI operationId**: `marketing_analytics_explain_conversion_goal_retrieve`
- **Path params**: None
- **Query params**: `date_from`, `date_to`, `goal_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ goal_id: string; goal_name: string; kind: string; period: { date_from: string | null; date_to: string | null }; total_count: number; integrated_count: number | null; events_without_utm_source: number | null; events_wi...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MarketingAnalyticsExplainConversionGoalRetrieveInput = Parameters<typeof posthog.marketingAnalyticsExplainConversionGoalRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MarketingAnalyticsExplainConversionGoalRetrieveOutput = Awaited<ReturnType<typeof posthog.marketingAnalyticsExplainConversionGoalRetrieve>>;

const result: MarketingAnalyticsExplainConversionGoalRetrieveOutput = await posthog.marketingAnalyticsExplainConversionGoalRetrieve();

// Result shape (from schema): { goal_id: string; goal_name: string; kind: string; period: { date_from: string | null; date_to: string | null }; total_count: number; integrated_count: number | null; events_without_utm_source: number | null; events_wi...
```

### `posthog.marketingAnalyticsSuggestConversionGoalsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/marketing_analytics/suggest_conversion_goals/`
- **What it does**: Suggest conversion goals
- **OpenAPI operationId**: `marketing_analytics_suggest_conversion_goals_retrieve`
- **Path params**: None
- **Query params**: `min_count`, `top_n`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ candidates: ({ event_name: string; last_30d_count: number; distinct_users_30d: number; pct_with_utm_source: number; pct_with_utm_campaign: number; top_utm_sources: (unknown[])[]; is_already_a_goal: boolean; suggestion...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MarketingAnalyticsSuggestConversionGoalsRetrieveInput = Parameters<typeof posthog.marketingAnalyticsSuggestConversionGoalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MarketingAnalyticsSuggestConversionGoalsRetrieveOutput = Awaited<ReturnType<typeof posthog.marketingAnalyticsSuggestConversionGoalsRetrieve>>;

const result: MarketingAnalyticsSuggestConversionGoalsRetrieveOutput = await posthog.marketingAnalyticsSuggestConversionGoalsRetrieve();

// Result shape (from schema): { candidates: ({ event_name: string; last_30d_count: number; distinct_users_30d: number; pct_with_utm_source: number; pct_with_utm_campaign: number; top_utm_sources: (unknown[])[]; is_already_a_goal: boolean; suggestion...
```

### `posthog.marketingAnalyticsSuggestUtmMappingsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/marketing_analytics/suggest_utm_mappings/`
- **What it does**: Suggest UTM source mappings
- **OpenAPI operationId**: `marketing_analytics_suggest_utm_mappings_retrieve`
- **Path params**: None
- **Query params**: `lookback_days`, `min_event_count`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ source_suggestions: ({ raw_utm_source: string; suggested_target: string; suggested_target_display_name: string; reason: string })[]; campaign_suggestions: ({ integration: string; integration_display_name: string; sugg...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MarketingAnalyticsSuggestUtmMappingsRetrieveInput = Parameters<typeof posthog.marketingAnalyticsSuggestUtmMappingsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MarketingAnalyticsSuggestUtmMappingsRetrieveOutput = Awaited<ReturnType<typeof posthog.marketingAnalyticsSuggestUtmMappingsRetrieve>>;

const result: MarketingAnalyticsSuggestUtmMappingsRetrieveOutput = await posthog.marketingAnalyticsSuggestUtmMappingsRetrieve();

// Result shape (from schema): { source_suggestions: ({ raw_utm_source: string; suggested_target: string; suggested_target_display_name: string; reason: string })[]; campaign_suggestions: ({ integration: string; integration_display_name: string; sugg...
```

### `posthog.marketingAnalyticsTestMappingCreate`

- **HTTP**: `POST /api/projects/{project_id}/marketing_analytics/test_mapping/`
- **OpenAPI operationId**: `marketing_analytics_test_mapping_create`
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

type MarketingAnalyticsTestMappingCreateInput = Parameters<typeof posthog.marketingAnalyticsTestMappingCreate> extends [infer T, ...unknown[]] ? T : undefined;
type MarketingAnalyticsTestMappingCreateOutput = Awaited<ReturnType<typeof posthog.marketingAnalyticsTestMappingCreate>>;

const result: MarketingAnalyticsTestMappingCreateOutput = await posthog.marketingAnalyticsTestMappingCreate();

// Result shape (from schema): unknown
```

### `posthog.marketingAnalyticsUtmAuditRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/marketing_analytics/utm_audit/`
- **What it does**: Run UTM audit
- **OpenAPI operationId**: `marketing_analytics_utm_audit_retrieve`
- **Path params**: None
- **Query params**: `date_from`, `date_to`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ total_campaigns: number; campaigns_with_issues: number; campaigns_without_issues: number; total_spend_at_risk: number; results: ({ campaign_name: string; campaign_id: string; source_name: string; spend: number; clicks...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MarketingAnalyticsUtmAuditRetrieveInput = Parameters<typeof posthog.marketingAnalyticsUtmAuditRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MarketingAnalyticsUtmAuditRetrieveOutput = Awaited<ReturnType<typeof posthog.marketingAnalyticsUtmAuditRetrieve>>;

const result: MarketingAnalyticsUtmAuditRetrieveOutput = await posthog.marketingAnalyticsUtmAuditRetrieve();

// Result shape (from schema): { total_campaigns: number; campaigns_with_issues: number; campaigns_without_issues: number; total_spend_at_risk: number; results: ({ campaign_name: string; campaign_id: string; source_name: string; spend: number; clicks...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

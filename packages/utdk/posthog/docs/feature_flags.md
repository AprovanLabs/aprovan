# Feature Flags

## Operations

### `posthog.featureFlagsList`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_list`
- **Path params**: None
- **Query params**: `active`, `archived`, `created_by_id`, `evaluation_runtime`, `excluded_properties`, `excluded_tags`, `has_evaluation_contexts`, `limit`, `offset`, `search`, `tags`, `type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; archived?: boolean; created...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsListInput = Parameters<typeof posthog.featureFlagsList> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsListOutput = Awaited<ReturnType<typeof posthog.featureFlagsList>>;

const result: FeatureFlagsListOutput = await posthog.featureFlagsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; archived?: boolean; created...
```

### `posthog.featureFlagsCreate`

- **HTTP**: `POST /api/projects/{project_id}/feature_flags/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; archived?: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsCreateInput = Parameters<typeof posthog.featureFlagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsCreateOutput = Awaited<ReturnType<typeof posthog.featureFlagsCreate>>;

const result: FeatureFlagsCreateOutput = await posthog.featureFlagsCreate();

// Result shape (from schema): { id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; archived?: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.featureFlagsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/feature_flags/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `feature_flags_destroy`
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

type FeatureFlagsDestroyInput = Parameters<typeof posthog.featureFlagsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsDestroyOutput = Awaited<ReturnType<typeof posthog.featureFlagsDestroy>>;

const result: FeatureFlagsDestroyOutput = await posthog.featureFlagsDestroy();

// Result shape (from schema): unknown
```

### `posthog.featureFlagsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/{id}/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; archived?: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsRetrieveInput = Parameters<typeof posthog.featureFlagsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsRetrieveOutput = Awaited<ReturnType<typeof posthog.featureFlagsRetrieve>>;

const result: FeatureFlagsRetrieveOutput = await posthog.featureFlagsRetrieve();

// Result shape (from schema): { id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; archived?: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.featureFlagsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/feature_flags/{id}/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; archived?: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsPartialUpdateInput = Parameters<typeof posthog.featureFlagsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.featureFlagsPartialUpdate>>;

const result: FeatureFlagsPartialUpdateOutput = await posthog.featureFlagsPartialUpdate();

// Result shape (from schema): { id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; archived?: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.featureFlagsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/feature_flags/{id}/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; archived?: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsUpdateInput = Parameters<typeof posthog.featureFlagsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsUpdateOutput = Awaited<ReturnType<typeof posthog.featureFlagsUpdate>>;

const result: FeatureFlagsUpdateOutput = await posthog.featureFlagsUpdate();

// Result shape (from schema): { id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; archived?: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: ...
```

### `posthog.featureFlagsActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/{id}/activity/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_activity_retrieve`
- **Path params**: `id`
- **Query params**: `limit`, `page`
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; user: { [key: string]: unknown } | null; activity: string; scope: string; item_id: string; detail?: { id: string; changes?: ({ type: string; action: string; field: string; before: unknown; afte...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsActivityRetrieveInput = Parameters<typeof posthog.featureFlagsActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.featureFlagsActivityRetrieve>>;

const result: FeatureFlagsActivityRetrieveOutput = await posthog.featureFlagsActivityRetrieve();

// Result shape (from schema): { results: ({ id: string; user: { [key: string]: unknown } | null; activity: string; scope: string; item_id: string; detail?: { id: string; changes?: ({ type: string; action: string; field: string; before: unknown; afte...
```

### `posthog.featureFlagsCreateStaticCohortForFlagCreate`

- **HTTP**: `POST /api/projects/{project_id}/feature_flags/{id}/create_static_cohort_for_flag/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_create_static_cohort_for_flag_create`
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

type FeatureFlagsCreateStaticCohortForFlagCreateInput = Parameters<typeof posthog.featureFlagsCreateStaticCohortForFlagCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsCreateStaticCohortForFlagCreateOutput = Awaited<ReturnType<typeof posthog.featureFlagsCreateStaticCohortForFlagCreate>>;

const result: FeatureFlagsCreateStaticCohortForFlagCreateOutput = await posthog.featureFlagsCreateStaticCohortForFlagCreate();

// Result shape (from schema): unknown
```

### `posthog.featureFlagsDashboardCreate`

- **HTTP**: `POST /api/projects/{project_id}/feature_flags/{id}/dashboard/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_dashboard_create`
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

type FeatureFlagsDashboardCreateInput = Parameters<typeof posthog.featureFlagsDashboardCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsDashboardCreateOutput = Awaited<ReturnType<typeof posthog.featureFlagsDashboardCreate>>;

const result: FeatureFlagsDashboardCreateOutput = await posthog.featureFlagsDashboardCreate();

// Result shape (from schema): unknown
```

### `posthog.featureFlagsDependentFlagsList`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/{id}/dependent_flags/`
- **What it does**: Get other active flags that depend on this flag.
- **OpenAPI operationId**: `feature_flags_dependent_flags_list`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: number; key: string; name: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsDependentFlagsListInput = Parameters<typeof posthog.featureFlagsDependentFlagsList> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsDependentFlagsListOutput = Awaited<ReturnType<typeof posthog.featureFlagsDependentFlagsList>>;

const result: FeatureFlagsDependentFlagsListOutput = await posthog.featureFlagsDependentFlagsList();

// Result shape (from schema): ({ id: number; key: string; name: string })[]
```

### `posthog.featureFlagsEnrichUsageDashboardCreate`

- **HTTP**: `POST /api/projects/{project_id}/feature_flags/{id}/enrich_usage_dashboard/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_enrich_usage_dashboard_create`
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

type FeatureFlagsEnrichUsageDashboardCreateInput = Parameters<typeof posthog.featureFlagsEnrichUsageDashboardCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsEnrichUsageDashboardCreateOutput = Awaited<ReturnType<typeof posthog.featureFlagsEnrichUsageDashboardCreate>>;

const result: FeatureFlagsEnrichUsageDashboardCreateOutput = await posthog.featureFlagsEnrichUsageDashboardCreate();

// Result shape (from schema): unknown
```

### `posthog.featureFlagsRemoteConfigRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/{id}/remote_config/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_remote_config_retrieve`
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

type FeatureFlagsRemoteConfigRetrieveInput = Parameters<typeof posthog.featureFlagsRemoteConfigRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsRemoteConfigRetrieveOutput = Awaited<ReturnType<typeof posthog.featureFlagsRemoteConfigRetrieve>>;

const result: FeatureFlagsRemoteConfigRetrieveOutput = await posthog.featureFlagsRemoteConfigRetrieve();

// Result shape (from schema): unknown
```

### `posthog.featureFlagsStatusRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/{id}/status/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_status_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status: string; reason: string; rollout: { effectively_full_rollout: boolean; has_targeting_conditions: boolean; max_rollout_percentage: number | null; is_multivariate: boolean } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsStatusRetrieveInput = Parameters<typeof posthog.featureFlagsStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.featureFlagsStatusRetrieve>>;

const result: FeatureFlagsStatusRetrieveOutput = await posthog.featureFlagsStatusRetrieve();

// Result shape (from schema): { status: string; reason: string; rollout: { effectively_full_rollout: boolean; has_targeting_conditions: boolean; max_rollout_percentage: number | null; is_multivariate: boolean } }
```

### `posthog.featureFlagsTestEvaluationCreate`

- **HTTP**: `POST /api/projects/{project_id}/feature_flags/{id}/test_evaluation/`
- **What it does**: Test feature flag evaluation against a specific user at an optional point in time.

This endpoint allows testing how a feature flag would evaluate for a specific user,
optionally at a historical timestamp. When a timestamp is provided, both the flag
conditions and person properties are evaluated as they existed at that time.
- **OpenAPI operationId**: `feature_flags_test_evaluation_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`, `500`, `502`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ flag_key: string; result: unknown; reason: string; condition_index: number | null; payload: unknown; person_properties: { [key: string]: unknown }; evaluation_distinct_id: string | null; conditions: ({ index: number; ...`
- OpenAPI response codes: `200`, `400`, `404`, `500`, `502`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsTestEvaluationCreateInput = Parameters<typeof posthog.featureFlagsTestEvaluationCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsTestEvaluationCreateOutput = Awaited<ReturnType<typeof posthog.featureFlagsTestEvaluationCreate>>;

const result: FeatureFlagsTestEvaluationCreateOutput = await posthog.featureFlagsTestEvaluationCreate();

// Result shape (from schema): { flag_key: string; result: unknown; reason: string; condition_index: number | null; payload: unknown; person_properties: { [key: string]: unknown }; evaluation_distinct_id: string | null; conditions: ({ index: number; ...
```

### `posthog.featureFlagsVersionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/{id}/versions/{version_number}/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_versions_retrieve`
- **Path params**: `id`, `version_number`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`, `422`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; key: string; name?: string; filters: { [key: string]: unknown }; active?: boolean; deleted?: boolean; version?: number | null; rollback_conditions?: unknown; performed_rollback?: boolean | null; ensure_exp...`
- OpenAPI response codes: `200`, `400`, `404`, `422`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsVersionsRetrieveInput = Parameters<typeof posthog.featureFlagsVersionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsVersionsRetrieveOutput = Awaited<ReturnType<typeof posthog.featureFlagsVersionsRetrieve>>;

const result: FeatureFlagsVersionsRetrieveOutput = await posthog.featureFlagsVersionsRetrieve();

// Result shape (from schema): { id: number; key: string; name?: string; filters: { [key: string]: unknown }; active?: boolean; deleted?: boolean; version?: number | null; rollback_conditions?: unknown; performed_rollback?: boolean | null; ensure_exp...
```

### `posthog.featureFlagsAllActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/activity/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_all_activity_retrieve`
- **Path params**: None
- **Query params**: `limit`, `page`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; user: { [key: string]: unknown } | null; activity: string; scope: string; item_id: string; detail?: { id: string; changes?: ({ type: string; action: string; field: string; before: unknown; afte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsAllActivityRetrieveInput = Parameters<typeof posthog.featureFlagsAllActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsAllActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.featureFlagsAllActivityRetrieve>>;

const result: FeatureFlagsAllActivityRetrieveOutput = await posthog.featureFlagsAllActivityRetrieve();

// Result shape (from schema): { results: ({ id: string; user: { [key: string]: unknown } | null; activity: string; scope: string; item_id: string; detail?: { id: string; changes?: ({ type: string; action: string; field: string; before: unknown; afte...
```

### `posthog.featureFlagsBulkDeleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/feature_flags/bulk_delete/`
- **What it does**: Bulk delete feature flags by filter criteria or explicit IDs.

Accepts either:
- {"filters": {...}} - Same filter params as list endpoint (search, active, type, etc.)
- {"ids": [...]} - Explicit list of flag IDs (no limit)

Returns same format as bulk_delete for UI compatibility.

Uses bulk operations for efficiency: database updates are batched and cache
invalidation happens once at the end rather than per-flag.
- **OpenAPI operationId**: `feature_flags_bulk_delete_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ deleted: ({ id: number; key: string; rollout_state: "fully_rolled_out" | "not_rolled_out" | "partial"; active_variant: string | null })[]; errors: ({ id: unknown; key?: string; reason: string })[] }`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsBulkDeleteCreateInput = Parameters<typeof posthog.featureFlagsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.featureFlagsBulkDeleteCreate>>;

const result: FeatureFlagsBulkDeleteCreateOutput = await posthog.featureFlagsBulkDeleteCreate();

// Result shape (from schema): { deleted: ({ id: number; key: string; rollout_state: "fully_rolled_out" | "not_rolled_out" | "partial"; active_variant: string | null })[]; errors: ({ id: unknown; key?: string; reason: string })[] }
```

### `posthog.featureFlagsBulkKeysRetrieve`

- **HTTP**: `POST /api/projects/{project_id}/feature_flags/bulk_keys/`
- **What it does**: Get feature flag keys by IDs.
Accepts a list of feature flag IDs and returns a mapping of ID to key.
- **OpenAPI operationId**: `feature_flags_bulk_keys_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ keys: { [key: string]: string | undefined }; warning?: string }`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsBulkKeysRetrieveInput = Parameters<typeof posthog.featureFlagsBulkKeysRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsBulkKeysRetrieveOutput = Awaited<ReturnType<typeof posthog.featureFlagsBulkKeysRetrieve>>;

const result: FeatureFlagsBulkKeysRetrieveOutput = await posthog.featureFlagsBulkKeysRetrieve();

// Result shape (from schema): { keys: { [key: string]: string | undefined }; warning?: string }
```

### `posthog.featureFlagsBulkUpdateTagsCreate`

- **HTTP**: `POST /api/projects/{project_id}/feature_flags/bulk_update_tags/`
- **What it does**: Bulk update tags on multiple objects.

PAT access: this action has no ``required_scopes=`` on the decorator —
inheriting viewsets must add ``"bulk_update_tags"`` to their
``scope_object_write_actions`` list to accept personal API keys.
Without that opt-in, ``APIScopePermission`` rejects PAT requests with
"This action does not support personal API key access". Done per-viewset
so granting ``<scope>:write`` for one resource doesn't leak access to
sibling resources that share this mixin.

Accepts:
- {"ids": [...], "action": "add"|"remove"|"set", "tags": ["tag1", "tag2"]}

Actions:
- "add": Add tags to existing tags on each object
- "remove": Remove specific tags from each object
- "set": Replace all tags on each object with the provided list
- **OpenAPI operationId**: `feature_flags_bulk_update_tags_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ updated: ({ id: number; tags: (string)[] })[]; skipped: ({ id: number; reason: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsBulkUpdateTagsCreateInput = Parameters<typeof posthog.featureFlagsBulkUpdateTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsBulkUpdateTagsCreateOutput = Awaited<ReturnType<typeof posthog.featureFlagsBulkUpdateTagsCreate>>;

const result: FeatureFlagsBulkUpdateTagsCreateOutput = await posthog.featureFlagsBulkUpdateTagsCreate();

// Result shape (from schema): { updated: ({ id: number; tags: (string)[] })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.featureFlagsEvaluationReasonsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/evaluation_reasons/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_evaluation_reasons_retrieve`
- **Path params**: None
- **Query params**: `distinct_id`, `groups`
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

type FeatureFlagsEvaluationReasonsRetrieveInput = Parameters<typeof posthog.featureFlagsEvaluationReasonsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsEvaluationReasonsRetrieveOutput = Awaited<ReturnType<typeof posthog.featureFlagsEvaluationReasonsRetrieve>>;

const result: FeatureFlagsEvaluationReasonsRetrieveOutput = await posthog.featureFlagsEvaluationReasonsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.featureFlagsMatchingIdsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/matching_ids/`
- **What it does**: Get IDs of all feature flags matching the current filters.
Uses the same filtering logic as the list endpoint.
Returns only IDs that the user has permission to edit.
- **OpenAPI operationId**: `feature_flags_matching_ids_retrieve`
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

type FeatureFlagsMatchingIdsRetrieveInput = Parameters<typeof posthog.featureFlagsMatchingIdsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsMatchingIdsRetrieveOutput = Awaited<ReturnType<typeof posthog.featureFlagsMatchingIdsRetrieve>>;

const result: FeatureFlagsMatchingIdsRetrieveOutput = await posthog.featureFlagsMatchingIdsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.featureFlagsMyFlagsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/feature_flags/my_flags/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_my_flags_retrieve`
- **Path params**: None
- **Query params**: `groups`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ feature_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_experience_continuity?: boolean | null; version?: number | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsMyFlagsRetrieveInput = Parameters<typeof posthog.featureFlagsMyFlagsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsMyFlagsRetrieveOutput = Awaited<ReturnType<typeof posthog.featureFlagsMyFlagsRetrieve>>;

const result: FeatureFlagsMyFlagsRetrieveOutput = await posthog.featureFlagsMyFlagsRetrieve();

// Result shape (from schema): ({ feature_flag: { id: number; team_id: number; name?: string; key: string; filters?: { [key: string]: unknown }; deleted?: boolean; active?: boolean; ensure_experience_continuity?: boolean | null; version?: number | nu...
```

### `posthog.featureFlagsUserBlastRadiusCreate`

- **HTTP**: `POST /api/projects/{project_id}/feature_flags/user_blast_radius/`
- **What it does**: Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.
- **OpenAPI operationId**: `feature_flags_user_blast_radius_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ affected: number; total: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FeatureFlagsUserBlastRadiusCreateInput = Parameters<typeof posthog.featureFlagsUserBlastRadiusCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FeatureFlagsUserBlastRadiusCreateOutput = Awaited<ReturnType<typeof posthog.featureFlagsUserBlastRadiusCreate>>;

const result: FeatureFlagsUserBlastRadiusCreateOutput = await posthog.featureFlagsUserBlastRadiusCreate();

// Result shape (from schema): { affected: number; total: number }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# Insights

## Operations

### `posthog.environmentsInsightsList`

- **HTTP**: `GET /api/environments/{environment_id}/insights/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_insights_list`
- **Path params**: None
- **Query params**: `basic`, `created_by`, `created_date_from`, `created_date_to`, `dashboards`, `date_from`, `date_to`, `favorited`, `format`, `insight`, `last_viewed_date_from`, `last_viewed_date_to`, `limit`, `offset`, `refresh`, `saved`, `search`, `short_id`, `tags`, `user`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsListInput = Parameters<typeof posthog.environmentsInsightsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsListOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsList>>;

const result: EnvironmentsInsightsListOutput = await posthog.environmentsInsightsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; ...
```

### `posthog.environmentsInsightsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insights/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_insights_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsCreateInput = Parameters<typeof posthog.environmentsInsightsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsCreate>>;

const result: EnvironmentsInsightsCreateOutput = await posthog.environmentsInsightsCreate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...
```

### `posthog.environmentsInsightsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/insights/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_insights_destroy`
- **Path params**: `id`
- **Query params**: `format`
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

type EnvironmentsInsightsDestroyInput = Parameters<typeof posthog.environmentsInsightsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsDestroy>>;

const result: EnvironmentsInsightsDestroyOutput = await posthog.environmentsInsightsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsInsightsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/insights/{id}/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_insights_retrieve`
- **Path params**: `id`
- **Query params**: `filters_override`, `format`, `from_dashboard`, `refresh`, `variables_override`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsRetrieveInput = Parameters<typeof posthog.environmentsInsightsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsRetrieve>>;

const result: EnvironmentsInsightsRetrieveOutput = await posthog.environmentsInsightsRetrieve();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...
```

### `posthog.environmentsInsightsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/insights/{id}/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_insights_partial_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsPartialUpdateInput = Parameters<typeof posthog.environmentsInsightsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsPartialUpdate>>;

const result: EnvironmentsInsightsPartialUpdateOutput = await posthog.environmentsInsightsPartialUpdate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...
```

### `posthog.environmentsInsightsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/insights/{id}/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_insights_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsUpdateInput = Parameters<typeof posthog.environmentsInsightsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsUpdate>>;

const result: EnvironmentsInsightsUpdateOutput = await posthog.environmentsInsightsUpdate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...
```

### `posthog.environmentsInsightsActivityRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/insights/{id}/activity/`
- **What it does**: Audit trail for a single insight — every change made to it, by whom, and when. Use this when you want the change history of a specific insight; use the project-wide activity endpoint for a broader view.
- **OpenAPI operationId**: `environments_insights_activity_retrieve`
- **Path params**: `id`
- **Query params**: `format`, `limit`, `page`
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

type EnvironmentsInsightsActivityRetrieveInput = Parameters<typeof posthog.environmentsInsightsActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsActivityRetrieve>>;

const result: EnvironmentsInsightsActivityRetrieveOutput = await posthog.environmentsInsightsActivityRetrieve();

// Result shape (from schema): { results: ({ id: string; user: { [key: string]: unknown } | null; activity: string; scope: string; item_id: string; detail?: { id: string; changes?: ({ type: string; action: string; field: string; before: unknown; afte...
```

### `posthog.environmentsInsightsAnalyzeRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/insights/{id}/analyze/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_insights_analyze_retrieve`
- **Path params**: `id`
- **Query params**: `format`
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

type EnvironmentsInsightsAnalyzeRetrieveInput = Parameters<typeof posthog.environmentsInsightsAnalyzeRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsAnalyzeRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsAnalyzeRetrieve>>;

const result: EnvironmentsInsightsAnalyzeRetrieveOutput = await posthog.environmentsInsightsAnalyzeRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsInsightsSuggestionsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/insights/{id}/suggestions/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_insights_suggestions_retrieve`
- **Path params**: `id`
- **Query params**: `format`
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

type EnvironmentsInsightsSuggestionsRetrieveInput = Parameters<typeof posthog.environmentsInsightsSuggestionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsSuggestionsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsSuggestionsRetrieve>>;

const result: EnvironmentsInsightsSuggestionsRetrieveOutput = await posthog.environmentsInsightsSuggestionsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsInsightsSuggestionsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insights/{id}/suggestions/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_insights_suggestions_create`
- **Path params**: `id`
- **Query params**: `format`
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

type EnvironmentsInsightsSuggestionsCreateInput = Parameters<typeof posthog.environmentsInsightsSuggestionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsSuggestionsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsSuggestionsCreate>>;

const result: EnvironmentsInsightsSuggestionsCreateOutput = await posthog.environmentsInsightsSuggestionsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsInsightsSharingList`

- **HTTP**: `GET /api/environments/{environment_id}/insights/{insight_id}/sharing/`
- **OpenAPI operationId**: `environments_insights_sharing_list`
- **Path params**: `insight_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsSharingListInput = Parameters<typeof posthog.environmentsInsightsSharingList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsSharingListOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsSharingList>>;

const result: EnvironmentsInsightsSharingListOutput = await posthog.environmentsInsightsSharingList();

// Result shape (from schema): ({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...
```

### `posthog.environmentsInsightsSharingPasswordsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insights/{insight_id}/sharing/passwords/`
- **What it does**: Create a new password for the sharing configuration.
- **OpenAPI operationId**: `environments_insights_sharing_passwords_create`
- **Path params**: `insight_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsSharingPasswordsCreateInput = Parameters<typeof posthog.environmentsInsightsSharingPasswordsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsSharingPasswordsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsSharingPasswordsCreate>>;

const result: EnvironmentsInsightsSharingPasswordsCreateOutput = await posthog.environmentsInsightsSharingPasswordsCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.environmentsInsightsSharingPasswordsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/insights/{insight_id}/sharing/passwords/{password_id}/`
- **What it does**: Delete a password from the sharing configuration.
- **OpenAPI operationId**: `environments_insights_sharing_passwords_destroy`
- **Path params**: `insight_id`, `password_id`
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

type EnvironmentsInsightsSharingPasswordsDestroyInput = Parameters<typeof posthog.environmentsInsightsSharingPasswordsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsSharingPasswordsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsSharingPasswordsDestroy>>;

const result: EnvironmentsInsightsSharingPasswordsDestroyOutput = await posthog.environmentsInsightsSharingPasswordsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsInsightsSharingRefreshCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insights/{insight_id}/sharing/refresh/`
- **OpenAPI operationId**: `environments_insights_sharing_refresh_create`
- **Path params**: `insight_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsSharingRefreshCreateInput = Parameters<typeof posthog.environmentsInsightsSharingRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsSharingRefreshCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsSharingRefreshCreate>>;

const result: EnvironmentsInsightsSharingRefreshCreateOutput = await posthog.environmentsInsightsSharingRefreshCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.environmentsInsightsThresholdsList`

- **HTTP**: `GET /api/environments/{environment_id}/insights/{insight_id}/thresholds/`
- **OpenAPI operationId**: `environments_insights_thresholds_list`
- **Path params**: `insight_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; name?: string; configuration: { bounds?: { lower?: number | null; upper?: number | null } | null; type: "absol...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsThresholdsListInput = Parameters<typeof posthog.environmentsInsightsThresholdsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsThresholdsListOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsThresholdsList>>;

const result: EnvironmentsInsightsThresholdsListOutput = await posthog.environmentsInsightsThresholdsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; name?: string; configuration: { bounds?: { lower?: number | null; upper?: number | null } | null; type: "absol...
```

### `posthog.environmentsInsightsThresholdsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/insights/{insight_id}/thresholds/{id}/`
- **OpenAPI operationId**: `environments_insights_thresholds_retrieve`
- **Path params**: `id`, `insight_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; name?: string; configuration: { bounds?: { lower?: number | null; upper?: number | null } | null; type: "absolute" | "percentage" }; alerts: ({ id: string; created_by: { id: number; uui...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsThresholdsRetrieveInput = Parameters<typeof posthog.environmentsInsightsThresholdsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsThresholdsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsThresholdsRetrieve>>;

const result: EnvironmentsInsightsThresholdsRetrieveOutput = await posthog.environmentsInsightsThresholdsRetrieve();

// Result shape (from schema): { id: string; created_at: string; name?: string; configuration: { bounds?: { lower?: number | null; upper?: number | null } | null; type: "absolute" | "percentage" }; alerts: ({ id: string; created_by: { id: number; uui...
```

### `posthog.environmentsInsightsAllActivityRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/insights/activity/`
- **What it does**: Project-wide audit trail across all insights — who created, edited, deleted, or restored insights, what changed (with before/after diffs), and when. Useful for surfacing what people (or agents) have been working on recently.
- **OpenAPI operationId**: `environments_insights_all_activity_retrieve`
- **Path params**: None
- **Query params**: `format`, `limit`, `page`
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

type EnvironmentsInsightsAllActivityRetrieveInput = Parameters<typeof posthog.environmentsInsightsAllActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsAllActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsAllActivityRetrieve>>;

const result: EnvironmentsInsightsAllActivityRetrieveOutput = await posthog.environmentsInsightsAllActivityRetrieve();

// Result shape (from schema): { results: ({ id: string; user: { [key: string]: unknown } | null; activity: string; scope: string; item_id: string; detail?: { id: string; changes?: ({ type: string; action: string; field: string; before: unknown; afte...
```

### `posthog.environmentsInsightsBulkDeleteCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insights/bulk_delete/`
- **What it does**: Soft-delete insights in bulk by ID. Mirrors the single-insight delete: sets deleted=True, soft-deletes the insights' dashboard tiles, and removes their linked alerts. Insights the requester cannot edit are skipped and reported in `skipped`. Reversible via the bulk_restore endpoint.
- **OpenAPI operationId**: `environments_insights_bulk_delete_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ deleted: ({ id: number; name: string | null })[]; skipped: ({ id: number; reason: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsBulkDeleteCreateInput = Parameters<typeof posthog.environmentsInsightsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsBulkDeleteCreate>>;

const result: EnvironmentsInsightsBulkDeleteCreateOutput = await posthog.environmentsInsightsBulkDeleteCreate();

// Result shape (from schema): { deleted: ({ id: number; name: string | null })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.environmentsInsightsBulkRestoreCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insights/bulk_restore/`
- **What it does**: Restore soft-deleted insights in bulk by ID — the inverse of bulk_delete. Sets deleted=False and re-activates the insights' dashboard tiles on dashboards that still exist. Linked alerts are not restored (they are removed on delete). Insights the requester cannot edit are reported in `skipped`.
- **OpenAPI operationId**: `environments_insights_bulk_restore_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ restored: ({ id: number; name: string | null })[]; skipped: ({ id: number; reason: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsBulkRestoreCreateInput = Parameters<typeof posthog.environmentsInsightsBulkRestoreCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsBulkRestoreCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsBulkRestoreCreate>>;

const result: EnvironmentsInsightsBulkRestoreCreateOutput = await posthog.environmentsInsightsBulkRestoreCreate();

// Result shape (from schema): { restored: ({ id: number; name: string | null })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.environmentsInsightsBulkUpdateTagsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insights/bulk_update_tags/`
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
- **OpenAPI operationId**: `environments_insights_bulk_update_tags_create`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsInsightsBulkUpdateTagsCreateInput = Parameters<typeof posthog.environmentsInsightsBulkUpdateTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsBulkUpdateTagsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsBulkUpdateTagsCreate>>;

const result: EnvironmentsInsightsBulkUpdateTagsCreateOutput = await posthog.environmentsInsightsBulkUpdateTagsCreate();

// Result shape (from schema): { updated: ({ id: number; tags: (string)[] })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.environmentsInsightsCancelCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insights/cancel/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_insights_cancel_create`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsInsightsCancelCreateInput = Parameters<typeof posthog.environmentsInsightsCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsCancelCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsCancelCreate>>;

const result: EnvironmentsInsightsCancelCreateOutput = await posthog.environmentsInsightsCancelCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsInsightsGenerateMetadataCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insights/generate_metadata/`
- **What it does**: Generate an AI-suggested name and description for an insight based on its query configuration.
- **OpenAPI operationId**: `environments_insights_generate_metadata_create`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsInsightsGenerateMetadataCreateInput = Parameters<typeof posthog.environmentsInsightsGenerateMetadataCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsGenerateMetadataCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsGenerateMetadataCreate>>;

const result: EnvironmentsInsightsGenerateMetadataCreateOutput = await posthog.environmentsInsightsGenerateMetadataCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsInsightsMyLastViewedRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/insights/my_last_viewed/`
- **What it does**: Returns basic details about the last 5 insights viewed by this user. Most recently viewed first.
- **OpenAPI operationId**: `environments_insights_my_last_viewed_retrieve`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsInsightsMyLastViewedRetrieveInput = Parameters<typeof posthog.environmentsInsightsMyLastViewedRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsMyLastViewedRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsMyLastViewedRetrieve>>;

const result: EnvironmentsInsightsMyLastViewedRetrieveOutput = await posthog.environmentsInsightsMyLastViewedRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsInsightsTrendingRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/insights/trending/`
- **What it does**: Returns insights ranked by view count over the last N days (default 7), highest first. Each result includes the same metadata as the standard insights list, plus a `view_count` and up to 3 recent `viewers`. Useful for surfacing the most-used insights in a project.
- **OpenAPI operationId**: `environments_insights_trending_retrieve`
- **Path params**: None
- **Query params**: `days`, `format`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: unknown; dashboards: (number)[]; dashboard_tiles: ({...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsTrendingRetrieveInput = Parameters<typeof posthog.environmentsInsightsTrendingRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsTrendingRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsTrendingRetrieve>>;

const result: EnvironmentsInsightsTrendingRetrieveOutput = await posthog.environmentsInsightsTrendingRetrieve();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: unknown; dashboards: (number)[]; dashboard_tiles: ({...
```

### `posthog.environmentsInsightsViewedCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insights/viewed/`
- **What it does**: Record that the current user has just viewed one or more insights. Submitted ids that do not belong to the current project or that point at deleted insights are silently dropped. Returns 201 on success regardless of how many ids were retained.
- **OpenAPI operationId**: `environments_insights_viewed_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightsViewedCreateInput = Parameters<typeof posthog.environmentsInsightsViewedCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightsViewedCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightsViewedCreate>>;

const result: EnvironmentsInsightsViewedCreateOutput = await posthog.environmentsInsightsViewedCreate();

// Result shape (from schema): unknown
```

### `posthog.insightsList`

- **HTTP**: `GET /api/projects/{project_id}/insights/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `insights_list`
- **Path params**: None
- **Query params**: `basic`, `created_by`, `created_date_from`, `created_date_to`, `dashboards`, `date_from`, `date_to`, `favorited`, `format`, `insight`, `last_viewed_date_from`, `last_viewed_date_to`, `limit`, `offset`, `refresh`, `saved`, `search`, `short_id`, `tags`, `user`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsListInput = Parameters<typeof posthog.insightsList> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsListOutput = Awaited<ReturnType<typeof posthog.insightsList>>;

const result: InsightsListOutput = await posthog.insightsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; ...
```

### `posthog.insightsCreate`

- **HTTP**: `POST /api/projects/{project_id}/insights/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `insights_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type InsightsCreateInput = Parameters<typeof posthog.insightsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsCreateOutput = Awaited<ReturnType<typeof posthog.insightsCreate>>;

const result: InsightsCreateOutput = await posthog.insightsCreate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...
```

### `posthog.insightsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/insights/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `insights_destroy`
- **Path params**: `id`
- **Query params**: `format`
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

type InsightsDestroyInput = Parameters<typeof posthog.insightsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsDestroyOutput = Awaited<ReturnType<typeof posthog.insightsDestroy>>;

const result: InsightsDestroyOutput = await posthog.insightsDestroy();

// Result shape (from schema): unknown
```

### `posthog.insightsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/insights/{id}/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `insights_retrieve`
- **Path params**: `id`
- **Query params**: `filters_override`, `format`, `from_dashboard`, `refresh`, `variables_override`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsRetrieveInput = Parameters<typeof posthog.insightsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsRetrieveOutput = Awaited<ReturnType<typeof posthog.insightsRetrieve>>;

const result: InsightsRetrieveOutput = await posthog.insightsRetrieve();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...
```

### `posthog.insightsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/insights/{id}/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `insights_partial_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsPartialUpdateInput = Parameters<typeof posthog.insightsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.insightsPartialUpdate>>;

const result: InsightsPartialUpdateOutput = await posthog.insightsPartialUpdate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...
```

### `posthog.insightsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/insights/{id}/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `insights_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsUpdateInput = Parameters<typeof posthog.insightsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsUpdateOutput = Awaited<ReturnType<typeof posthog.insightsUpdate>>;

const result: InsightsUpdateOutput = await posthog.insightsUpdate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScroll?: boolean | null; ki...
```

### `posthog.insightsActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/insights/{id}/activity/`
- **What it does**: Audit trail for a single insight — every change made to it, by whom, and when. Use this when you want the change history of a specific insight; use the project-wide activity endpoint for a broader view.
- **OpenAPI operationId**: `insights_activity_retrieve`
- **Path params**: `id`
- **Query params**: `format`, `limit`, `page`
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

type InsightsActivityRetrieveInput = Parameters<typeof posthog.insightsActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.insightsActivityRetrieve>>;

const result: InsightsActivityRetrieveOutput = await posthog.insightsActivityRetrieve();

// Result shape (from schema): { results: ({ id: string; user: { [key: string]: unknown } | null; activity: string; scope: string; item_id: string; detail?: { id: string; changes?: ({ type: string; action: string; field: string; before: unknown; afte...
```

### `posthog.insightsAnalyzeRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/insights/{id}/analyze/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `insights_analyze_retrieve`
- **Path params**: `id`
- **Query params**: `format`
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

type InsightsAnalyzeRetrieveInput = Parameters<typeof posthog.insightsAnalyzeRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsAnalyzeRetrieveOutput = Awaited<ReturnType<typeof posthog.insightsAnalyzeRetrieve>>;

const result: InsightsAnalyzeRetrieveOutput = await posthog.insightsAnalyzeRetrieve();

// Result shape (from schema): unknown
```

### `posthog.insightsSuggestionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/insights/{id}/suggestions/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `insights_suggestions_retrieve`
- **Path params**: `id`
- **Query params**: `format`
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

type InsightsSuggestionsRetrieveInput = Parameters<typeof posthog.insightsSuggestionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsSuggestionsRetrieveOutput = Awaited<ReturnType<typeof posthog.insightsSuggestionsRetrieve>>;

const result: InsightsSuggestionsRetrieveOutput = await posthog.insightsSuggestionsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.insightsSuggestionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/insights/{id}/suggestions/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `insights_suggestions_create`
- **Path params**: `id`
- **Query params**: `format`
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

type InsightsSuggestionsCreateInput = Parameters<typeof posthog.insightsSuggestionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsSuggestionsCreateOutput = Awaited<ReturnType<typeof posthog.insightsSuggestionsCreate>>;

const result: InsightsSuggestionsCreateOutput = await posthog.insightsSuggestionsCreate();

// Result shape (from schema): unknown
```

### `posthog.insightsSharingList`

- **HTTP**: `GET /api/projects/{project_id}/insights/{insight_id}/sharing/`
- **OpenAPI operationId**: `insights_sharing_list`
- **Path params**: `insight_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsSharingListInput = Parameters<typeof posthog.insightsSharingList> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsSharingListOutput = Awaited<ReturnType<typeof posthog.insightsSharingList>>;

const result: InsightsSharingListOutput = await posthog.insightsSharingList();

// Result shape (from schema): ({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...
```

### `posthog.insightsSharingPasswordsCreate`

- **HTTP**: `POST /api/projects/{project_id}/insights/{insight_id}/sharing/passwords/`
- **What it does**: Create a new password for the sharing configuration.
- **OpenAPI operationId**: `insights_sharing_passwords_create`
- **Path params**: `insight_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsSharingPasswordsCreateInput = Parameters<typeof posthog.insightsSharingPasswordsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsSharingPasswordsCreateOutput = Awaited<ReturnType<typeof posthog.insightsSharingPasswordsCreate>>;

const result: InsightsSharingPasswordsCreateOutput = await posthog.insightsSharingPasswordsCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.insightsSharingPasswordsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/insights/{insight_id}/sharing/passwords/{password_id}/`
- **What it does**: Delete a password from the sharing configuration.
- **OpenAPI operationId**: `insights_sharing_passwords_destroy`
- **Path params**: `insight_id`, `password_id`
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

type InsightsSharingPasswordsDestroyInput = Parameters<typeof posthog.insightsSharingPasswordsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsSharingPasswordsDestroyOutput = Awaited<ReturnType<typeof posthog.insightsSharingPasswordsDestroy>>;

const result: InsightsSharingPasswordsDestroyOutput = await posthog.insightsSharingPasswordsDestroy();

// Result shape (from schema): unknown
```

### `posthog.insightsSharingRefreshCreate`

- **HTTP**: `POST /api/projects/{project_id}/insights/{insight_id}/sharing/refresh/`
- **OpenAPI operationId**: `insights_sharing_refresh_create`
- **Path params**: `insight_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsSharingRefreshCreateInput = Parameters<typeof posthog.insightsSharingRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsSharingRefreshCreateOutput = Awaited<ReturnType<typeof posthog.insightsSharingRefreshCreate>>;

const result: InsightsSharingRefreshCreateOutput = await posthog.insightsSharingRefreshCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.insightsThresholdsList`

- **HTTP**: `GET /api/projects/{project_id}/insights/{insight_id}/thresholds/`
- **OpenAPI operationId**: `insights_thresholds_list`
- **Path params**: `insight_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; name?: string; configuration: { bounds?: { lower?: number | null; upper?: number | null } | null; type: "absol...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsThresholdsListInput = Parameters<typeof posthog.insightsThresholdsList> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsThresholdsListOutput = Awaited<ReturnType<typeof posthog.insightsThresholdsList>>;

const result: InsightsThresholdsListOutput = await posthog.insightsThresholdsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_at: string; name?: string; configuration: { bounds?: { lower?: number | null; upper?: number | null } | null; type: "absol...
```

### `posthog.insightsThresholdsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/insights/{insight_id}/thresholds/{id}/`
- **OpenAPI operationId**: `insights_thresholds_retrieve`
- **Path params**: `id`, `insight_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_at: string; name?: string; configuration: { bounds?: { lower?: number | null; upper?: number | null } | null; type: "absolute" | "percentage" }; alerts: ({ id: string; created_by: { id: number; uui...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsThresholdsRetrieveInput = Parameters<typeof posthog.insightsThresholdsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsThresholdsRetrieveOutput = Awaited<ReturnType<typeof posthog.insightsThresholdsRetrieve>>;

const result: InsightsThresholdsRetrieveOutput = await posthog.insightsThresholdsRetrieve();

// Result shape (from schema): { id: string; created_at: string; name?: string; configuration: { bounds?: { lower?: number | null; upper?: number | null } | null; type: "absolute" | "percentage" }; alerts: ({ id: string; created_by: { id: number; uui...
```

### `posthog.insightsAllActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/insights/activity/`
- **What it does**: Project-wide audit trail across all insights — who created, edited, deleted, or restored insights, what changed (with before/after diffs), and when. Useful for surfacing what people (or agents) have been working on recently.
- **OpenAPI operationId**: `insights_all_activity_retrieve`
- **Path params**: None
- **Query params**: `format`, `limit`, `page`
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

type InsightsAllActivityRetrieveInput = Parameters<typeof posthog.insightsAllActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsAllActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.insightsAllActivityRetrieve>>;

const result: InsightsAllActivityRetrieveOutput = await posthog.insightsAllActivityRetrieve();

// Result shape (from schema): { results: ({ id: string; user: { [key: string]: unknown } | null; activity: string; scope: string; item_id: string; detail?: { id: string; changes?: ({ type: string; action: string; field: string; before: unknown; afte...
```

### `posthog.insightsBulkDeleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/insights/bulk_delete/`
- **What it does**: Soft-delete insights in bulk by ID. Mirrors the single-insight delete: sets deleted=True, soft-deletes the insights' dashboard tiles, and removes their linked alerts. Insights the requester cannot edit are skipped and reported in `skipped`. Reversible via the bulk_restore endpoint.
- **OpenAPI operationId**: `insights_bulk_delete_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ deleted: ({ id: number; name: string | null })[]; skipped: ({ id: number; reason: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsBulkDeleteCreateInput = Parameters<typeof posthog.insightsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.insightsBulkDeleteCreate>>;

const result: InsightsBulkDeleteCreateOutput = await posthog.insightsBulkDeleteCreate();

// Result shape (from schema): { deleted: ({ id: number; name: string | null })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.insightsBulkRestoreCreate`

- **HTTP**: `POST /api/projects/{project_id}/insights/bulk_restore/`
- **What it does**: Restore soft-deleted insights in bulk by ID — the inverse of bulk_delete. Sets deleted=False and re-activates the insights' dashboard tiles on dashboards that still exist. Linked alerts are not restored (they are removed on delete). Insights the requester cannot edit are reported in `skipped`.
- **OpenAPI operationId**: `insights_bulk_restore_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ restored: ({ id: number; name: string | null })[]; skipped: ({ id: number; reason: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsBulkRestoreCreateInput = Parameters<typeof posthog.insightsBulkRestoreCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsBulkRestoreCreateOutput = Awaited<ReturnType<typeof posthog.insightsBulkRestoreCreate>>;

const result: InsightsBulkRestoreCreateOutput = await posthog.insightsBulkRestoreCreate();

// Result shape (from schema): { restored: ({ id: number; name: string | null })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.insightsBulkUpdateTagsCreate`

- **HTTP**: `POST /api/projects/{project_id}/insights/bulk_update_tags/`
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
- **OpenAPI operationId**: `insights_bulk_update_tags_create`
- **Path params**: None
- **Query params**: `format`
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

type InsightsBulkUpdateTagsCreateInput = Parameters<typeof posthog.insightsBulkUpdateTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsBulkUpdateTagsCreateOutput = Awaited<ReturnType<typeof posthog.insightsBulkUpdateTagsCreate>>;

const result: InsightsBulkUpdateTagsCreateOutput = await posthog.insightsBulkUpdateTagsCreate();

// Result shape (from schema): { updated: ({ id: number; tags: (string)[] })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.insightsCancelCreate`

- **HTTP**: `POST /api/projects/{project_id}/insights/cancel/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `insights_cancel_create`
- **Path params**: None
- **Query params**: `format`
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

type InsightsCancelCreateInput = Parameters<typeof posthog.insightsCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsCancelCreateOutput = Awaited<ReturnType<typeof posthog.insightsCancelCreate>>;

const result: InsightsCancelCreateOutput = await posthog.insightsCancelCreate();

// Result shape (from schema): unknown
```

### `posthog.insightsGenerateMetadataCreate`

- **HTTP**: `POST /api/projects/{project_id}/insights/generate_metadata/`
- **What it does**: Generate an AI-suggested name and description for an insight based on its query configuration.
- **OpenAPI operationId**: `insights_generate_metadata_create`
- **Path params**: None
- **Query params**: `format`
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

type InsightsGenerateMetadataCreateInput = Parameters<typeof posthog.insightsGenerateMetadataCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsGenerateMetadataCreateOutput = Awaited<ReturnType<typeof posthog.insightsGenerateMetadataCreate>>;

const result: InsightsGenerateMetadataCreateOutput = await posthog.insightsGenerateMetadataCreate();

// Result shape (from schema): unknown
```

### `posthog.insightsMyLastViewedRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/insights/my_last_viewed/`
- **What it does**: Returns basic details about the last 5 insights viewed by this user. Most recently viewed first.
- **OpenAPI operationId**: `insights_my_last_viewed_retrieve`
- **Path params**: None
- **Query params**: `format`
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

type InsightsMyLastViewedRetrieveInput = Parameters<typeof posthog.insightsMyLastViewedRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsMyLastViewedRetrieveOutput = Awaited<ReturnType<typeof posthog.insightsMyLastViewedRetrieve>>;

const result: InsightsMyLastViewedRetrieveOutput = await posthog.insightsMyLastViewedRetrieve();

// Result shape (from schema): unknown
```

### `posthog.insightsTrendingRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/insights/trending/`
- **What it does**: Returns insights ranked by view count over the last N days (default 7), highest first. Each result includes the same metadata as the standard insights list, plus a `view_count` and up to 3 recent `viewers`. Useful for surfacing the most-used insights in a project.
- **OpenAPI operationId**: `insights_trending_retrieve`
- **Path params**: None
- **Query params**: `days`, `format`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: unknown; dashboards: (number)[]; dashboard_tiles: ({...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightsTrendingRetrieveInput = Parameters<typeof posthog.insightsTrendingRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsTrendingRetrieveOutput = Awaited<ReturnType<typeof posthog.insightsTrendingRetrieve>>;

const result: InsightsTrendingRetrieveOutput = await posthog.insightsTrendingRetrieve();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: unknown; dashboards: (number)[]; dashboard_tiles: ({...
```

### `posthog.insightsViewedCreate`

- **HTTP**: `POST /api/projects/{project_id}/insights/viewed/`
- **What it does**: Record that the current user has just viewed one or more insights. Submitted ids that do not belong to the current project or that point at deleted insights are silently dropped. Returns 201 on success regardless of how many ids were retained.
- **OpenAPI operationId**: `insights_viewed_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type InsightsViewedCreateInput = Parameters<typeof posthog.insightsViewedCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightsViewedCreateOutput = Awaited<ReturnType<typeof posthog.insightsViewedCreate>>;

const result: InsightsViewedCreateOutput = await posthog.insightsViewedCreate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# Heatmaps

## Operations

### `posthog.environmentsHeatmapsList`

- **HTTP**: `GET /api/environments/{environment_id}/heatmaps/`
- **What it does**: Aggregated heatmap interactions for a page. For type 'click'/'rageclick'/'mousemove' each result is a point with relative x, absolute client-y, and a count. For type 'scrolldepth' the response is scroll-depth buckets instead (cumulative reach down the page).
- **OpenAPI operationId**: `environments_heatmaps_list`
- **Path params**: None
- **Query params**: `aggregation`, `cohort_ids`, `date_from`, `date_to`, `filter_test_accounts`, `hide_zero_coordinates`, `limit`, `offset`, `type`, `url_exact`, `url_pattern`, `viewport_width_max`, `viewport_width_min`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ results: ({ count: number; pointer_y: number; pointer_relative_x: number; pointer_target_fixed: boolean })[]; fold?: { total_count: number; below_fold_count: number; pct_below_fold: number; median_viewport_height: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHeatmapsListInput = Parameters<typeof posthog.environmentsHeatmapsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHeatmapsListOutput = Awaited<ReturnType<typeof posthog.environmentsHeatmapsList>>;

const result: EnvironmentsHeatmapsListOutput = await posthog.environmentsHeatmapsList();

// Result shape (from schema): ({ results: ({ count: number; pointer_y: number; pointer_relative_x: number; pointer_target_fixed: boolean })[]; fold?: { total_count: number; below_fold_count: number; pct_below_fold: number; median_viewport_height: nu...
```

### `posthog.environmentsHeatmapsEventsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/heatmaps/events/`
- **What it does**: Drill into the individual session interactions behind one or more heatmap coordinates. Pass the 'points' you want to inspect (from the heatmaps list response) to get the underlying per-session events, so you can jump to the session recordings that produced a hotspot.
- **OpenAPI operationId**: `environments_heatmaps_events_retrieve`
- **Path params**: None
- **Query params**: `aggregation`, `cohort_ids`, `date_from`, `date_to`, `filter_test_accounts`, `hide_zero_coordinates`, `limit`, `offset`, `points`, `type`, `url_exact`, `url_pattern`, `viewport_width_max`, `viewport_width_min`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ session_id?: string | null; distinct_id: string; timestamp: string; pointer_relative_x: number; pointer_y: number; current_url: string; type: string })[]; total_count: number; has_more: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHeatmapsEventsRetrieveInput = Parameters<typeof posthog.environmentsHeatmapsEventsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHeatmapsEventsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHeatmapsEventsRetrieve>>;

const result: EnvironmentsHeatmapsEventsRetrieveOutput = await posthog.environmentsHeatmapsEventsRetrieve();

// Result shape (from schema): { results: ({ session_id?: string | null; distinct_id: string; timestamp: string; pointer_relative_x: number; pointer_y: number; current_url: string; type: string })[]; total_count: number; has_more: boolean }
```

### `posthog.heatmapsList`

- **HTTP**: `GET /api/projects/{project_id}/heatmaps/`
- **What it does**: Aggregated heatmap interactions for a page. For type 'click'/'rageclick'/'mousemove' each result is a point with relative x, absolute client-y, and a count. For type 'scrolldepth' the response is scroll-depth buckets instead (cumulative reach down the page).
- **OpenAPI operationId**: `heatmaps_list`
- **Path params**: None
- **Query params**: `aggregation`, `cohort_ids`, `date_from`, `date_to`, `filter_test_accounts`, `hide_zero_coordinates`, `limit`, `offset`, `type`, `url_exact`, `url_pattern`, `viewport_width_max`, `viewport_width_min`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ results: ({ count: number; pointer_y: number; pointer_relative_x: number; pointer_target_fixed: boolean })[]; fold?: { total_count: number; below_fold_count: number; pct_below_fold: number; median_viewport_height: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HeatmapsListInput = Parameters<typeof posthog.heatmapsList> extends [infer T, ...unknown[]] ? T : undefined;
type HeatmapsListOutput = Awaited<ReturnType<typeof posthog.heatmapsList>>;

const result: HeatmapsListOutput = await posthog.heatmapsList();

// Result shape (from schema): ({ results: ({ count: number; pointer_y: number; pointer_relative_x: number; pointer_target_fixed: boolean })[]; fold?: { total_count: number; below_fold_count: number; pct_below_fold: number; median_viewport_height: nu...
```

### `posthog.heatmapsEventsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/heatmaps/events/`
- **What it does**: Drill into the individual session interactions behind one or more heatmap coordinates. Pass the 'points' you want to inspect (from the heatmaps list response) to get the underlying per-session events, so you can jump to the session recordings that produced a hotspot.
- **OpenAPI operationId**: `heatmaps_events_retrieve`
- **Path params**: None
- **Query params**: `aggregation`, `cohort_ids`, `date_from`, `date_to`, `filter_test_accounts`, `hide_zero_coordinates`, `limit`, `offset`, `points`, `type`, `url_exact`, `url_pattern`, `viewport_width_max`, `viewport_width_min`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ session_id?: string | null; distinct_id: string; timestamp: string; pointer_relative_x: number; pointer_y: number; current_url: string; type: string })[]; total_count: number; has_more: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HeatmapsEventsRetrieveInput = Parameters<typeof posthog.heatmapsEventsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HeatmapsEventsRetrieveOutput = Awaited<ReturnType<typeof posthog.heatmapsEventsRetrieve>>;

const result: HeatmapsEventsRetrieveOutput = await posthog.heatmapsEventsRetrieve();

// Result shape (from schema): { results: ({ session_id?: string | null; distinct_id: string; timestamp: string; pointer_relative_x: number; pointer_y: number; current_url: string; type: string })[]; total_count: number; has_more: boolean }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

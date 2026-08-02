# Heatmap Screenshots

## Operations

### `posthog.environmentsHeatmapScreenshotsContentRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/heatmap_screenshots/{id}/content/`
- **What it does**: Fetch the rendered screenshot image (JPEG bytes) for a saved heatmap at a given viewport width. Returns 202 with the saved-heatmap metadata while the screenshot is still being generated.
- **OpenAPI operationId**: `environments_heatmap_screenshots_content_retrieve`
- **Path params**: `id`
- **Query params**: `width`
- **Response codes**: `200`, `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `string`
- OpenAPI response codes: `200`, `202`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHeatmapScreenshotsContentRetrieveInput = Parameters<typeof posthog.environmentsHeatmapScreenshotsContentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHeatmapScreenshotsContentRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHeatmapScreenshotsContentRetrieve>>;

const result: EnvironmentsHeatmapScreenshotsContentRetrieveOutput = await posthog.environmentsHeatmapScreenshotsContentRetrieve();

// Result shape (from schema): string
```

### `posthog.heatmapScreenshotsContentRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/heatmap_screenshots/{id}/content/`
- **What it does**: Fetch the rendered screenshot image (JPEG bytes) for a saved heatmap at a given viewport width. Returns 202 with the saved-heatmap metadata while the screenshot is still being generated.
- **OpenAPI operationId**: `heatmap_screenshots_content_retrieve`
- **Path params**: `id`
- **Query params**: `width`
- **Response codes**: `200`, `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `string`
- OpenAPI response codes: `200`, `202`

```ts
import posthog from "@utdk/posthog";

type HeatmapScreenshotsContentRetrieveInput = Parameters<typeof posthog.heatmapScreenshotsContentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HeatmapScreenshotsContentRetrieveOutput = Awaited<ReturnType<typeof posthog.heatmapScreenshotsContentRetrieve>>;

const result: HeatmapScreenshotsContentRetrieveOutput = await posthog.heatmapScreenshotsContentRetrieve();

// Result shape (from schema): string
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

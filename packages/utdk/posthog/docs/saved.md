# Saved

## Operations

### `posthog.environmentsSavedList`

- **HTTP**: `GET /api/environments/{environment_id}/saved/`
- **What it does**: List saved heatmaps for the project. A saved heatmap pins a page URL and a set of viewport widths, and (for type 'screenshot') renders the page so heatmap data can be overlaid on it.
- **OpenAPI operationId**: `environments_saved_list`
- **Path params**: None
- **Query params**: `created_by`, `limit`, `offset`, `order`, `search`, `status`, `type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ results: ({ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "fail...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSavedListInput = Parameters<typeof posthog.environmentsSavedList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSavedListOutput = Awaited<ReturnType<typeof posthog.environmentsSavedList>>;

const result: EnvironmentsSavedListOutput = await posthog.environmentsSavedList();

// Result shape (from schema): ({ results: ({ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "fail...
```

### `posthog.environmentsSavedCreate`

- **HTTP**: `POST /api/environments/{environment_id}/saved/`
- **What it does**: Create a saved heatmap for a page URL. For type 'screenshot' (the default) this enqueues a headless render of the page at each target width; poll the saved heatmap or its content endpoint until status is 'completed'. Provide 'widths' to control which viewport widths are rendered.
- **OpenAPI operationId**: `environments_saved_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSavedCreateInput = Parameters<typeof posthog.environmentsSavedCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSavedCreateOutput = Awaited<ReturnType<typeof posthog.environmentsSavedCreate>>;

const result: EnvironmentsSavedCreateOutput = await posthog.environmentsSavedCreate();

// Result shape (from schema): { id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...
```

### `posthog.environmentsSavedDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/saved/{short_id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_saved_destroy`
- **Path params**: `short_id`
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

type EnvironmentsSavedDestroyInput = Parameters<typeof posthog.environmentsSavedDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSavedDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsSavedDestroy>>;

const result: EnvironmentsSavedDestroyOutput = await posthog.environmentsSavedDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsSavedRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/saved/{short_id}/`
- **What it does**: Get a single saved heatmap by its short_id, including per-width render status.
- **OpenAPI operationId**: `environments_saved_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSavedRetrieveInput = Parameters<typeof posthog.environmentsSavedRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSavedRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsSavedRetrieve>>;

const result: EnvironmentsSavedRetrieveOutput = await posthog.environmentsSavedRetrieve();

// Result shape (from schema): { id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...
```

### `posthog.environmentsSavedPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/saved/{short_id}/`
- **What it does**: Update a saved heatmap (e.g. rename, change widths, or soft-delete via 'deleted'). Changing the URL of a 'screenshot' heatmap triggers a re-render.
- **OpenAPI operationId**: `environments_saved_partial_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSavedPartialUpdateInput = Parameters<typeof posthog.environmentsSavedPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSavedPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsSavedPartialUpdate>>;

const result: EnvironmentsSavedPartialUpdateOutput = await posthog.environmentsSavedPartialUpdate();

// Result shape (from schema): { id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...
```

### `posthog.environmentsSavedRegenerateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/saved/{short_id}/regenerate/`
- **What it does**: Re-run screenshot generation for a saved heatmap of type 'screenshot'. Clears existing renders and re-renders at every target width; status returns to 'processing'.
- **OpenAPI operationId**: `environments_saved_regenerate_create`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSavedRegenerateCreateInput = Parameters<typeof posthog.environmentsSavedRegenerateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSavedRegenerateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsSavedRegenerateCreate>>;

const result: EnvironmentsSavedRegenerateCreateOutput = await posthog.environmentsSavedRegenerateCreate();

// Result shape (from schema): { id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...
```

### `posthog.savedList`

- **HTTP**: `GET /api/projects/{project_id}/saved/`
- **What it does**: List saved heatmaps for the project. A saved heatmap pins a page URL and a set of viewport widths, and (for type 'screenshot') renders the page so heatmap data can be overlaid on it.
- **OpenAPI operationId**: `saved_list`
- **Path params**: None
- **Query params**: `created_by`, `limit`, `offset`, `order`, `search`, `status`, `type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ results: ({ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "fail...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SavedListInput = Parameters<typeof posthog.savedList> extends [infer T, ...unknown[]] ? T : undefined;
type SavedListOutput = Awaited<ReturnType<typeof posthog.savedList>>;

const result: SavedListOutput = await posthog.savedList();

// Result shape (from schema): ({ results: ({ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "fail...
```

### `posthog.savedCreate`

- **HTTP**: `POST /api/projects/{project_id}/saved/`
- **What it does**: Create a saved heatmap for a page URL. For type 'screenshot' (the default) this enqueues a headless render of the page at each target width; poll the saved heatmap or its content endpoint until status is 'completed'. Provide 'widths' to control which viewport widths are rendered.
- **OpenAPI operationId**: `saved_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type SavedCreateInput = Parameters<typeof posthog.savedCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SavedCreateOutput = Awaited<ReturnType<typeof posthog.savedCreate>>;

const result: SavedCreateOutput = await posthog.savedCreate();

// Result shape (from schema): { id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...
```

### `posthog.savedDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/saved/{short_id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `saved_destroy`
- **Path params**: `short_id`
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

type SavedDestroyInput = Parameters<typeof posthog.savedDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SavedDestroyOutput = Awaited<ReturnType<typeof posthog.savedDestroy>>;

const result: SavedDestroyOutput = await posthog.savedDestroy();

// Result shape (from schema): unknown
```

### `posthog.savedRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/saved/{short_id}/`
- **What it does**: Get a single saved heatmap by its short_id, including per-width render status.
- **OpenAPI operationId**: `saved_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SavedRetrieveInput = Parameters<typeof posthog.savedRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SavedRetrieveOutput = Awaited<ReturnType<typeof posthog.savedRetrieve>>;

const result: SavedRetrieveOutput = await posthog.savedRetrieve();

// Result shape (from schema): { id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...
```

### `posthog.savedPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/saved/{short_id}/`
- **What it does**: Update a saved heatmap (e.g. rename, change widths, or soft-delete via 'deleted'). Changing the URL of a 'screenshot' heatmap triggers a re-render.
- **OpenAPI operationId**: `saved_partial_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SavedPartialUpdateInput = Parameters<typeof posthog.savedPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SavedPartialUpdateOutput = Awaited<ReturnType<typeof posthog.savedPartialUpdate>>;

const result: SavedPartialUpdateOutput = await posthog.savedPartialUpdate();

// Result shape (from schema): { id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...
```

### `posthog.savedRegenerateCreate`

- **HTTP**: `POST /api/projects/{project_id}/saved/{short_id}/regenerate/`
- **What it does**: Re-run screenshot generation for a saved heatmap of type 'screenshot'. Clears existing renders and re-renders at every target width; status returns to 'processing'.
- **OpenAPI operationId**: `saved_regenerate_create`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type SavedRegenerateCreateInput = Parameters<typeof posthog.savedRegenerateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SavedRegenerateCreateOutput = Awaited<ReturnType<typeof posthog.savedRegenerateCreate>>;

const result: SavedRegenerateCreateOutput = await posthog.savedRegenerateCreate();

// Result shape (from schema): { id: string; short_id: string; name?: string | null; url: string; data_url?: string | null; target_widths?: unknown; type?: "screenshot" | "iframe" | "recording"; status: "processing" | "completed" | "failed"; has_cont...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

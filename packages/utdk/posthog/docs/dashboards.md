# Dashboards

## Operations

### `posthog.environmentsDashboardsList`

- **HTTP**: `GET /api/environments/{environment_id}/dashboards/`
- **OpenAPI operationId**: `environments_dashboards_list`
- **Path params**: None
- **Query params**: `folder`, `format`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string | null; description: string; pinned: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsListInput = Parameters<typeof posthog.environmentsDashboardsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsListOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsList>>;

const result: EnvironmentsDashboardsListOutput = await posthog.environmentsDashboardsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string | null; description: string; pinned: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id...
```

### `posthog.environmentsDashboardsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/`
- **OpenAPI operationId**: `environments_dashboards_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsCreateInput = Parameters<typeof posthog.environmentsDashboardsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsCreate>>;

const result: EnvironmentsDashboardsCreateOutput = await posthog.environmentsDashboardsCreate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.environmentsDashboardsCollaboratorsList`

- **HTTP**: `GET /api/environments/{environment_id}/dashboards/{dashboard_id}/collaborators/`
- **OpenAPI operationId**: `environments_dashboards_collaborators_list`
- **Path params**: `dashboard_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; dashboard_id: number; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsCollaboratorsListInput = Parameters<typeof posthog.environmentsDashboardsCollaboratorsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsCollaboratorsListOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsCollaboratorsList>>;

const result: EnvironmentsDashboardsCollaboratorsListOutput = await posthog.environmentsDashboardsCollaboratorsList();

// Result shape (from schema): ({ id: string; dashboard_id: number; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: st...
```

### `posthog.environmentsDashboardsCollaboratorsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/{dashboard_id}/collaborators/`
- **OpenAPI operationId**: `environments_dashboards_collaborators_create`
- **Path params**: `dashboard_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; dashboard_id: number; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: str...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsCollaboratorsCreateInput = Parameters<typeof posthog.environmentsDashboardsCollaboratorsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsCollaboratorsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsCollaboratorsCreate>>;

const result: EnvironmentsDashboardsCollaboratorsCreateOutput = await posthog.environmentsDashboardsCollaboratorsCreate();

// Result shape (from schema): { id: string; dashboard_id: number; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: str...
```

### `posthog.environmentsDashboardsCollaboratorsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/dashboards/{dashboard_id}/collaborators/{user__uuid}/`
- **OpenAPI operationId**: `environments_dashboards_collaborators_destroy`
- **Path params**: `dashboard_id`, `user__uuid`
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

type EnvironmentsDashboardsCollaboratorsDestroyInput = Parameters<typeof posthog.environmentsDashboardsCollaboratorsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsCollaboratorsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsCollaboratorsDestroy>>;

const result: EnvironmentsDashboardsCollaboratorsDestroyOutput = await posthog.environmentsDashboardsCollaboratorsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsDashboardsSharingList`

- **HTTP**: `GET /api/environments/{environment_id}/dashboards/{dashboard_id}/sharing/`
- **OpenAPI operationId**: `environments_dashboards_sharing_list`
- **Path params**: `dashboard_id`
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

type EnvironmentsDashboardsSharingListInput = Parameters<typeof posthog.environmentsDashboardsSharingList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsSharingListOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsSharingList>>;

const result: EnvironmentsDashboardsSharingListOutput = await posthog.environmentsDashboardsSharingList();

// Result shape (from schema): ({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...
```

### `posthog.environmentsDashboardsSharingPasswordsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/{dashboard_id}/sharing/passwords/`
- **What it does**: Create a new password for the sharing configuration.
- **OpenAPI operationId**: `environments_dashboards_sharing_passwords_create`
- **Path params**: `dashboard_id`
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

type EnvironmentsDashboardsSharingPasswordsCreateInput = Parameters<typeof posthog.environmentsDashboardsSharingPasswordsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsSharingPasswordsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsSharingPasswordsCreate>>;

const result: EnvironmentsDashboardsSharingPasswordsCreateOutput = await posthog.environmentsDashboardsSharingPasswordsCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.environmentsDashboardsSharingPasswordsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/dashboards/{dashboard_id}/sharing/passwords/{password_id}/`
- **What it does**: Delete a password from the sharing configuration.
- **OpenAPI operationId**: `environments_dashboards_sharing_passwords_destroy`
- **Path params**: `dashboard_id`, `password_id`
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

type EnvironmentsDashboardsSharingPasswordsDestroyInput = Parameters<typeof posthog.environmentsDashboardsSharingPasswordsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsSharingPasswordsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsSharingPasswordsDestroy>>;

const result: EnvironmentsDashboardsSharingPasswordsDestroyOutput = await posthog.environmentsDashboardsSharingPasswordsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsDashboardsSharingRefreshCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/{dashboard_id}/sharing/refresh/`
- **OpenAPI operationId**: `environments_dashboards_sharing_refresh_create`
- **Path params**: `dashboard_id`
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

type EnvironmentsDashboardsSharingRefreshCreateInput = Parameters<typeof posthog.environmentsDashboardsSharingRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsSharingRefreshCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsSharingRefreshCreate>>;

const result: EnvironmentsDashboardsSharingRefreshCreateOutput = await posthog.environmentsDashboardsSharingRefreshCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.environmentsDashboardsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/dashboards/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_dashboards_destroy`
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

type EnvironmentsDashboardsDestroyInput = Parameters<typeof posthog.environmentsDashboardsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsDestroy>>;

const result: EnvironmentsDashboardsDestroyOutput = await posthog.environmentsDashboardsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsDashboardsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/dashboards/{id}/`
- **OpenAPI operationId**: `environments_dashboards_retrieve`
- **Path params**: `id`
- **Query params**: `filters_override`, `format`, `variables_override`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsRetrieveInput = Parameters<typeof posthog.environmentsDashboardsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsRetrieve>>;

const result: EnvironmentsDashboardsRetrieveOutput = await posthog.environmentsDashboardsRetrieve();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.environmentsDashboardsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/dashboards/{id}/`
- **OpenAPI operationId**: `environments_dashboards_partial_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsPartialUpdateInput = Parameters<typeof posthog.environmentsDashboardsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsPartialUpdate>>;

const result: EnvironmentsDashboardsPartialUpdateOutput = await posthog.environmentsDashboardsPartialUpdate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.environmentsDashboardsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/dashboards/{id}/`
- **OpenAPI operationId**: `environments_dashboards_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsUpdateInput = Parameters<typeof posthog.environmentsDashboardsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsUpdate>>;

const result: EnvironmentsDashboardsUpdateOutput = await posthog.environmentsDashboardsUpdate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.environmentsDashboardsCopyTileCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/{id}/copy_tile/`
- **What it does**: Copy an existing dashboard tile to another dashboard (insight, text card, or widget tile).
- **OpenAPI operationId**: `environments_dashboards_copy_tile_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsCopyTileCreateInput = Parameters<typeof posthog.environmentsDashboardsCopyTileCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsCopyTileCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsCopyTileCreate>>;

const result: EnvironmentsDashboardsCopyTileCreateOutput = await posthog.environmentsDashboardsCopyTileCreate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.environmentsDashboardsCreateTextTileCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/{id}/create_text_tile/`
- **What it does**: Add a markdown text tile to a dashboard.

Text tiles render as markdown blocks on the dashboard — useful as section headings, dividers,
or annotations between insight tiles to give the dashboard structure.
- **OpenAPI operationId**: `environments_dashboards_create_text_tile_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScr...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsCreateTextTileCreateInput = Parameters<typeof posthog.environmentsDashboardsCreateTextTileCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsCreateTextTileCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsCreateTextTileCreate>>;

const result: EnvironmentsDashboardsCreateTextTileCreateOutput = await posthog.environmentsDashboardsCreateTextTileCreate();

// Result shape (from schema): { id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScr...
```

### `posthog.environmentsDashboardsDeleteTile`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/{id}/delete_tile/`
- **What it does**: Soft-delete a single tile from a dashboard.

Works for text, insight, and button tiles. The underlying Insight, Text, or ButtonTile
object is preserved — only the dashboard tile is hidden. To delete the entire dashboard,
use the dashboard delete endpoint instead.
- **OpenAPI operationId**: `environments_dashboards_delete_tile`
- **Path params**: `id`
- **Query params**: `format`
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

type EnvironmentsDashboardsDeleteTileInput = Parameters<typeof posthog.environmentsDashboardsDeleteTile> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsDeleteTileOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsDeleteTile>>;

const result: EnvironmentsDashboardsDeleteTileOutput = await posthog.environmentsDashboardsDeleteTile();

// Result shape (from schema): unknown
```

### `posthog.environmentsDashboardsMoveTilePartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/dashboards/{id}/move_tile/`
- **OpenAPI operationId**: `environments_dashboards_move_tile_partial_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsMoveTilePartialUpdateInput = Parameters<typeof posthog.environmentsDashboardsMoveTilePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsMoveTilePartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsMoveTilePartialUpdate>>;

const result: EnvironmentsDashboardsMoveTilePartialUpdateOutput = await posthog.environmentsDashboardsMoveTilePartialUpdate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.environmentsDashboardsMoveTileCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/{id}/move_tile/`
- **OpenAPI operationId**: `environments_dashboards_move_tile_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsMoveTileCreateInput = Parameters<typeof posthog.environmentsDashboardsMoveTileCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsMoveTileCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsMoveTileCreate>>;

const result: EnvironmentsDashboardsMoveTileCreateOutput = await posthog.environmentsDashboardsMoveTileCreate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.environmentsDashboardsReorderTilesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/{id}/reorder_tiles/`
- **OpenAPI operationId**: `environments_dashboards_reorder_tiles_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsReorderTilesCreateInput = Parameters<typeof posthog.environmentsDashboardsReorderTilesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsReorderTilesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsReorderTilesCreate>>;

const result: EnvironmentsDashboardsReorderTilesCreateOutput = await posthog.environmentsDashboardsReorderTilesCreate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.environmentsDashboardsRunInsightsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/dashboards/{id}/run_insights/`
- **What it does**: Run all insights on a dashboard and return their results.
- **OpenAPI operationId**: `environments_dashboards_run_insights_retrieve`
- **Path params**: `id`
- **Query params**: `filters_override`, `format`, `output_format`, `refresh`, `variables_override`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id?: number; insight: { id: number; short_id: string; name: string | null; derived_name: string | null; result: unknown } })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsRunInsightsRetrieveInput = Parameters<typeof posthog.environmentsDashboardsRunInsightsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsRunInsightsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsRunInsightsRetrieve>>;

const result: EnvironmentsDashboardsRunInsightsRetrieveOutput = await posthog.environmentsDashboardsRunInsightsRetrieve();

// Result shape (from schema): { results: ({ id?: number; insight: { id: number; short_id: string; name: string | null; derived_name: string | null; result: unknown } })[] }
```

### `posthog.environmentsDashboardsRunWidgetsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/dashboards/{id}/run_widgets/`
- **OpenAPI operationId**: `environments_dashboards_run_widgets_retrieve`
- **Path params**: `id`
- **Query params**: `format`, `tile_ids`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ tile_id: number; widget_type: string | null; result: unknown; error: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsRunWidgetsRetrieveInput = Parameters<typeof posthog.environmentsDashboardsRunWidgetsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsRunWidgetsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsRunWidgetsRetrieve>>;

const result: EnvironmentsDashboardsRunWidgetsRetrieveOutput = await posthog.environmentsDashboardsRunWidgetsRetrieve();

// Result shape (from schema): { results: ({ tile_id: number; widget_type: string | null; result: unknown; error: string | null })[] }
```

### `posthog.environmentsDashboardsStreamTilesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/dashboards/{id}/stream_tiles/`
- **What it does**: Stream dashboard metadata and tiles via Server-Sent Events. Sends metadata first, then tiles as they are rendered.
- **OpenAPI operationId**: `environments_dashboards_stream_tiles_retrieve`
- **Path params**: `id`
- **Query params**: `filters_override`, `format`, `layoutSize`, `variables_override`
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

type EnvironmentsDashboardsStreamTilesRetrieveInput = Parameters<typeof posthog.environmentsDashboardsStreamTilesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsStreamTilesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsStreamTilesRetrieve>>;

const result: EnvironmentsDashboardsStreamTilesRetrieveOutput = await posthog.environmentsDashboardsStreamTilesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsDashboardsUpdateTextTileCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/{id}/update_text_tile/`
- **What it does**: Update the markdown body, layout, or color of an existing text tile on a dashboard.
- **OpenAPI operationId**: `environments_dashboards_update_text_tile_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScr...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsUpdateTextTileCreateInput = Parameters<typeof posthog.environmentsDashboardsUpdateTextTileCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsUpdateTextTileCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsUpdateTextTileCreate>>;

const result: EnvironmentsDashboardsUpdateTextTileCreateOutput = await posthog.environmentsDashboardsUpdateTextTileCreate();

// Result shape (from schema): { id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScr...
```

### `posthog.environmentsDashboardsUpdateWidgetsBatch`

- **HTTP**: `PATCH /api/environments/{environment_id}/dashboards/{id}/widgets/batch_update/`
- **What it does**: Update the settings of existing widgets in place, atomically — config, name, and description.

Each entry targets a widget by its tile_id and reuses the same write path as the dashboard PATCH endpoint.
The widget_type is immutable. This edits widget settings only (config, name, description); tile placement
(layouts, show_description) is a dashboard concern — use the dashboard PATCH endpoint or reorder_tiles for
that. All updates succeed or fail together. To add new widgets, use the widgets/batch POST endpoint; to
remove one, use delete_tile.
- **OpenAPI operationId**: `environments_dashboards_update_widgets_batch`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ tiles: ({ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsUpdateWidgetsBatchInput = Parameters<typeof posthog.environmentsDashboardsUpdateWidgetsBatch> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsUpdateWidgetsBatchOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsUpdateWidgetsBatch>>;

const result: EnvironmentsDashboardsUpdateWidgetsBatchOutput = await posthog.environmentsDashboardsUpdateWidgetsBatch();

// Result shape (from schema): { tiles: ({ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTo...
```

### `posthog.environmentsDashboardsWidgetsBatchCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/{id}/widgets/batch/`
- **What it does**: Add multiple widget tiles to a dashboard in one atomic request.
- **OpenAPI operationId**: `environments_dashboards_widgets_batch_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ tiles: ({ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTo...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsWidgetsBatchCreateInput = Parameters<typeof posthog.environmentsDashboardsWidgetsBatchCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsWidgetsBatchCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsWidgetsBatchCreate>>;

const result: EnvironmentsDashboardsWidgetsBatchCreateOutput = await posthog.environmentsDashboardsWidgetsBatchCreate();

// Result shape (from schema): { tiles: ({ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTo...
```

### `posthog.environmentsDashboardsBulkUpdateTagsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/bulk_update_tags/`
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
- **OpenAPI operationId**: `environments_dashboards_bulk_update_tags_create`
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

type EnvironmentsDashboardsBulkUpdateTagsCreateInput = Parameters<typeof posthog.environmentsDashboardsBulkUpdateTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsBulkUpdateTagsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsBulkUpdateTagsCreate>>;

const result: EnvironmentsDashboardsBulkUpdateTagsCreateOutput = await posthog.environmentsDashboardsBulkUpdateTagsCreate();

// Result shape (from schema): { updated: ({ id: number; tags: (string)[] })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.environmentsDashboardsCreateFromTemplateJsonCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/create_from_template_json/`
- **OpenAPI operationId**: `environments_dashboards_create_from_template_json_create`
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

type EnvironmentsDashboardsCreateFromTemplateJsonCreateInput = Parameters<typeof posthog.environmentsDashboardsCreateFromTemplateJsonCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsCreateFromTemplateJsonCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsCreateFromTemplateJsonCreate>>;

const result: EnvironmentsDashboardsCreateFromTemplateJsonCreateOutput = await posthog.environmentsDashboardsCreateFromTemplateJsonCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsDashboardsCreateUnlistedDashboardCreate`

- **HTTP**: `POST /api/environments/{environment_id}/dashboards/create_unlisted_dashboard/`
- **What it does**: Creates an unlisted dashboard from template by tag.
Enforces uniqueness (one per tag per team).
Returns 409 if unlisted dashboard with this tag already exists.
- **OpenAPI operationId**: `environments_dashboards_create_unlisted_dashboard_create`
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

type EnvironmentsDashboardsCreateUnlistedDashboardCreateInput = Parameters<typeof posthog.environmentsDashboardsCreateUnlistedDashboardCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsCreateUnlistedDashboardCreateOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsCreateUnlistedDashboardCreate>>;

const result: EnvironmentsDashboardsCreateUnlistedDashboardCreateOutput = await posthog.environmentsDashboardsCreateUnlistedDashboardCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsDashboardsWidgetCatalogRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/dashboards/widget_catalog/`
- **What it does**: List registered dashboard widget types and per-type config_schema documentation for agents.
- **OpenAPI operationId**: `environments_dashboards_widget_catalog_retrieve`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ widget_type: "activity_events_list"; group_id: string; group_label: string; label: string; description: string; config_schema: { dateRange?: { date_from?: "-1M" | "-30M" | "-1h" | "-3h" | "-24h" | "-7d" | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsDashboardsWidgetCatalogRetrieveInput = Parameters<typeof posthog.environmentsDashboardsWidgetCatalogRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsDashboardsWidgetCatalogRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsDashboardsWidgetCatalogRetrieve>>;

const result: EnvironmentsDashboardsWidgetCatalogRetrieveOutput = await posthog.environmentsDashboardsWidgetCatalogRetrieve();

// Result shape (from schema): { results: ({ widget_type: "activity_events_list"; group_id: string; group_label: string; label: string; description: string; config_schema: { dateRange?: { date_from?: "-1M" | "-30M" | "-1h" | "-3h" | "-24h" | "-7d" | ...
```

### `posthog.dashboardsList`

- **HTTP**: `GET /api/projects/{project_id}/dashboards/`
- **OpenAPI operationId**: `dashboards_list`
- **Path params**: None
- **Query params**: `folder`, `format`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string | null; description: string; pinned: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsListInput = Parameters<typeof posthog.dashboardsList> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsListOutput = Awaited<ReturnType<typeof posthog.dashboardsList>>;

const result: DashboardsListOutput = await posthog.dashboardsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string | null; description: string; pinned: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id...
```

### `posthog.dashboardsCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/`
- **OpenAPI operationId**: `dashboards_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DashboardsCreateInput = Parameters<typeof posthog.dashboardsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsCreate>>;

const result: DashboardsCreateOutput = await posthog.dashboardsCreate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.dashboardsCollaboratorsList`

- **HTTP**: `GET /api/projects/{project_id}/dashboards/{dashboard_id}/collaborators/`
- **OpenAPI operationId**: `dashboards_collaborators_list`
- **Path params**: `dashboard_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; dashboard_id: number; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsCollaboratorsListInput = Parameters<typeof posthog.dashboardsCollaboratorsList> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsCollaboratorsListOutput = Awaited<ReturnType<typeof posthog.dashboardsCollaboratorsList>>;

const result: DashboardsCollaboratorsListOutput = await posthog.dashboardsCollaboratorsList();

// Result shape (from schema): ({ id: string; dashboard_id: number; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: st...
```

### `posthog.dashboardsCollaboratorsCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/{dashboard_id}/collaborators/`
- **OpenAPI operationId**: `dashboards_collaborators_create`
- **Path params**: `dashboard_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; dashboard_id: number; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: str...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DashboardsCollaboratorsCreateInput = Parameters<typeof posthog.dashboardsCollaboratorsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsCollaboratorsCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsCollaboratorsCreate>>;

const result: DashboardsCollaboratorsCreateOutput = await posthog.dashboardsCollaboratorsCreate();

// Result shape (from schema): { id: string; dashboard_id: number; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: str...
```

### `posthog.dashboardsCollaboratorsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/dashboards/{dashboard_id}/collaborators/{user__uuid}/`
- **OpenAPI operationId**: `dashboards_collaborators_destroy`
- **Path params**: `dashboard_id`, `user__uuid`
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

type DashboardsCollaboratorsDestroyInput = Parameters<typeof posthog.dashboardsCollaboratorsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsCollaboratorsDestroyOutput = Awaited<ReturnType<typeof posthog.dashboardsCollaboratorsDestroy>>;

const result: DashboardsCollaboratorsDestroyOutput = await posthog.dashboardsCollaboratorsDestroy();

// Result shape (from schema): unknown
```

### `posthog.dashboardsSharingList`

- **HTTP**: `GET /api/projects/{project_id}/dashboards/{dashboard_id}/sharing/`
- **OpenAPI operationId**: `dashboards_sharing_list`
- **Path params**: `dashboard_id`
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

type DashboardsSharingListInput = Parameters<typeof posthog.dashboardsSharingList> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsSharingListOutput = Awaited<ReturnType<typeof posthog.dashboardsSharingList>>;

const result: DashboardsSharingListOutput = await posthog.dashboardsSharingList();

// Result shape (from schema): ({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...
```

### `posthog.dashboardsSharingPasswordsCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/{dashboard_id}/sharing/passwords/`
- **What it does**: Create a new password for the sharing configuration.
- **OpenAPI operationId**: `dashboards_sharing_passwords_create`
- **Path params**: `dashboard_id`
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

type DashboardsSharingPasswordsCreateInput = Parameters<typeof posthog.dashboardsSharingPasswordsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsSharingPasswordsCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsSharingPasswordsCreate>>;

const result: DashboardsSharingPasswordsCreateOutput = await posthog.dashboardsSharingPasswordsCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.dashboardsSharingPasswordsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/dashboards/{dashboard_id}/sharing/passwords/{password_id}/`
- **What it does**: Delete a password from the sharing configuration.
- **OpenAPI operationId**: `dashboards_sharing_passwords_destroy`
- **Path params**: `dashboard_id`, `password_id`
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

type DashboardsSharingPasswordsDestroyInput = Parameters<typeof posthog.dashboardsSharingPasswordsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsSharingPasswordsDestroyOutput = Awaited<ReturnType<typeof posthog.dashboardsSharingPasswordsDestroy>>;

const result: DashboardsSharingPasswordsDestroyOutput = await posthog.dashboardsSharingPasswordsDestroy();

// Result shape (from schema): unknown
```

### `posthog.dashboardsSharingRefreshCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/{dashboard_id}/sharing/refresh/`
- **OpenAPI operationId**: `dashboards_sharing_refresh_create`
- **Path params**: `dashboard_id`
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

type DashboardsSharingRefreshCreateInput = Parameters<typeof posthog.dashboardsSharingRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsSharingRefreshCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsSharingRefreshCreate>>;

const result: DashboardsSharingRefreshCreateOutput = await posthog.dashboardsSharingRefreshCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.dashboardsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/dashboards/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `dashboards_destroy`
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

type DashboardsDestroyInput = Parameters<typeof posthog.dashboardsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsDestroyOutput = Awaited<ReturnType<typeof posthog.dashboardsDestroy>>;

const result: DashboardsDestroyOutput = await posthog.dashboardsDestroy();

// Result shape (from schema): unknown
```

### `posthog.dashboardsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/dashboards/{id}/`
- **OpenAPI operationId**: `dashboards_retrieve`
- **Path params**: `id`
- **Query params**: `filters_override`, `format`, `variables_override`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsRetrieveInput = Parameters<typeof posthog.dashboardsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsRetrieveOutput = Awaited<ReturnType<typeof posthog.dashboardsRetrieve>>;

const result: DashboardsRetrieveOutput = await posthog.dashboardsRetrieve();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.dashboardsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/dashboards/{id}/`
- **OpenAPI operationId**: `dashboards_partial_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsPartialUpdateInput = Parameters<typeof posthog.dashboardsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.dashboardsPartialUpdate>>;

const result: DashboardsPartialUpdateOutput = await posthog.dashboardsPartialUpdate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.dashboardsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/dashboards/{id}/`
- **OpenAPI operationId**: `dashboards_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsUpdateInput = Parameters<typeof posthog.dashboardsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsUpdateOutput = Awaited<ReturnType<typeof posthog.dashboardsUpdate>>;

const result: DashboardsUpdateOutput = await posthog.dashboardsUpdate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.dashboardsCopyTileCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/{id}/copy_tile/`
- **What it does**: Copy an existing dashboard tile to another dashboard (insight, text card, or widget tile).
- **OpenAPI operationId**: `dashboards_copy_tile_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsCopyTileCreateInput = Parameters<typeof posthog.dashboardsCopyTileCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsCopyTileCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsCopyTileCreate>>;

const result: DashboardsCopyTileCreateOutput = await posthog.dashboardsCopyTileCreate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.dashboardsCreateTextTileCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/{id}/create_text_tile/`
- **What it does**: Add a markdown text tile to a dashboard.

Text tiles render as markdown blocks on the dashboard — useful as section headings, dividers,
or annotations between insight tiles to give the dashboard structure.
- **OpenAPI operationId**: `dashboards_create_text_tile_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScr...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DashboardsCreateTextTileCreateInput = Parameters<typeof posthog.dashboardsCreateTextTileCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsCreateTextTileCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsCreateTextTileCreate>>;

const result: DashboardsCreateTextTileCreateOutput = await posthog.dashboardsCreateTextTileCreate();

// Result shape (from schema): { id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScr...
```

### `posthog.dashboardsDeleteTile`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/{id}/delete_tile/`
- **What it does**: Soft-delete a single tile from a dashboard.

Works for text, insight, and button tiles. The underlying Insight, Text, or ButtonTile
object is preserved — only the dashboard tile is hidden. To delete the entire dashboard,
use the dashboard delete endpoint instead.
- **OpenAPI operationId**: `dashboards_delete_tile`
- **Path params**: `id`
- **Query params**: `format`
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

type DashboardsDeleteTileInput = Parameters<typeof posthog.dashboardsDeleteTile> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsDeleteTileOutput = Awaited<ReturnType<typeof posthog.dashboardsDeleteTile>>;

const result: DashboardsDeleteTileOutput = await posthog.dashboardsDeleteTile();

// Result shape (from schema): unknown
```

### `posthog.dashboardsMoveTilePartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/dashboards/{id}/move_tile/`
- **OpenAPI operationId**: `dashboards_move_tile_partial_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsMoveTilePartialUpdateInput = Parameters<typeof posthog.dashboardsMoveTilePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsMoveTilePartialUpdateOutput = Awaited<ReturnType<typeof posthog.dashboardsMoveTilePartialUpdate>>;

const result: DashboardsMoveTilePartialUpdateOutput = await posthog.dashboardsMoveTilePartialUpdate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.dashboardsMoveTileCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/{id}/move_tile/`
- **OpenAPI operationId**: `dashboards_move_tile_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsMoveTileCreateInput = Parameters<typeof posthog.dashboardsMoveTileCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsMoveTileCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsMoveTileCreate>>;

const result: DashboardsMoveTileCreateOutput = await posthog.dashboardsMoveTileCreate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.dashboardsReorderTilesCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/{id}/reorder_tiles/`
- **OpenAPI operationId**: `dashboards_reorder_tiles_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsReorderTilesCreateInput = Parameters<typeof posthog.dashboardsReorderTilesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsReorderTilesCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsReorderTilesCreate>>;

const result: DashboardsReorderTilesCreateOutput = await posthog.dashboardsReorderTilesCreate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string...
```

### `posthog.dashboardsRunInsightsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/dashboards/{id}/run_insights/`
- **What it does**: Run all insights on a dashboard and return their results.
- **OpenAPI operationId**: `dashboards_run_insights_retrieve`
- **Path params**: `id`
- **Query params**: `filters_override`, `format`, `output_format`, `refresh`, `variables_override`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id?: number; insight: { id: number; short_id: string; name: string | null; derived_name: string | null; result: unknown } })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsRunInsightsRetrieveInput = Parameters<typeof posthog.dashboardsRunInsightsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsRunInsightsRetrieveOutput = Awaited<ReturnType<typeof posthog.dashboardsRunInsightsRetrieve>>;

const result: DashboardsRunInsightsRetrieveOutput = await posthog.dashboardsRunInsightsRetrieve();

// Result shape (from schema): { results: ({ id?: number; insight: { id: number; short_id: string; name: string | null; derived_name: string | null; result: unknown } })[] }
```

### `posthog.dashboardsRunWidgetsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/dashboards/{id}/run_widgets/`
- **OpenAPI operationId**: `dashboards_run_widgets_retrieve`
- **Path params**: `id`
- **Query params**: `format`, `tile_ids`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ tile_id: number; widget_type: string | null; result: unknown; error: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsRunWidgetsRetrieveInput = Parameters<typeof posthog.dashboardsRunWidgetsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsRunWidgetsRetrieveOutput = Awaited<ReturnType<typeof posthog.dashboardsRunWidgetsRetrieve>>;

const result: DashboardsRunWidgetsRetrieveOutput = await posthog.dashboardsRunWidgetsRetrieve();

// Result shape (from schema): { results: ({ tile_id: number; widget_type: string | null; result: unknown; error: string | null })[] }
```

### `posthog.dashboardsStreamTilesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/dashboards/{id}/stream_tiles/`
- **What it does**: Stream dashboard metadata and tiles via Server-Sent Events. Sends metadata first, then tiles as they are rendered.
- **OpenAPI operationId**: `dashboards_stream_tiles_retrieve`
- **Path params**: `id`
- **Query params**: `filters_override`, `format`, `layoutSize`, `variables_override`
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

type DashboardsStreamTilesRetrieveInput = Parameters<typeof posthog.dashboardsStreamTilesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsStreamTilesRetrieveOutput = Awaited<ReturnType<typeof posthog.dashboardsStreamTilesRetrieve>>;

const result: DashboardsStreamTilesRetrieveOutput = await posthog.dashboardsStreamTilesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.dashboardsUpdateTextTileCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/{id}/update_text_tile/`
- **What it does**: Update the markdown body, layout, or color of an existing text tile on a dashboard.
- **OpenAPI operationId**: `dashboards_update_text_tile_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScr...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsUpdateTextTileCreateInput = Parameters<typeof posthog.dashboardsUpdateTextTileCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsUpdateTextTileCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsUpdateTextTileCreate>>;

const result: DashboardsUpdateTextTileCreateOutput = await posthog.dashboardsUpdateTextTileCreate();

// Result shape (from schema): { id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTooltipOnScr...
```

### `posthog.dashboardsUpdateWidgetsBatch`

- **HTTP**: `PATCH /api/projects/{project_id}/dashboards/{id}/widgets/batch_update/`
- **What it does**: Update the settings of existing widgets in place, atomically — config, name, and description.

Each entry targets a widget by its tile_id and reuses the same write path as the dashboard PATCH endpoint.
The widget_type is immutable. This edits widget settings only (config, name, description); tile placement
(layouts, show_description) is a dashboard concern — use the dashboard PATCH endpoint or reorder_tiles for
that. All updates succeed or fail together. To add new widgets, use the widgets/batch POST endpoint; to
remove one, use delete_tile.
- **OpenAPI operationId**: `dashboards_update_widgets_batch`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ tiles: ({ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsUpdateWidgetsBatchInput = Parameters<typeof posthog.dashboardsUpdateWidgetsBatch> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsUpdateWidgetsBatchOutput = Awaited<ReturnType<typeof posthog.dashboardsUpdateWidgetsBatch>>;

const result: DashboardsUpdateWidgetsBatchOutput = await posthog.dashboardsUpdateWidgetsBatch();

// Result shape (from schema): { tiles: ({ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTo...
```

### `posthog.dashboardsWidgetsBatchCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/{id}/widgets/batch/`
- **What it does**: Add multiple widget tiles to a dashboard in one atomic request.
- **OpenAPI operationId**: `dashboards_widgets_batch_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ tiles: ({ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTo...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DashboardsWidgetsBatchCreateInput = Parameters<typeof posthog.dashboardsWidgetsBatchCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsWidgetsBatchCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsWidgetsBatchCreate>>;

const result: DashboardsWidgetsBatchCreateOutput = await posthog.dashboardsWidgetsBatchCreate();

// Result shape (from schema): { tiles: ({ id?: number; insight: { id: number; short_id: string; name?: string | null; derived_name?: string | null; query?: { embedded?: boolean | null; full?: boolean | null; hidePersonsModal?: boolean | null; hideTo...
```

### `posthog.dashboardsBulkUpdateTagsCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/bulk_update_tags/`
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
- **OpenAPI operationId**: `dashboards_bulk_update_tags_create`
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

type DashboardsBulkUpdateTagsCreateInput = Parameters<typeof posthog.dashboardsBulkUpdateTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsBulkUpdateTagsCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsBulkUpdateTagsCreate>>;

const result: DashboardsBulkUpdateTagsCreateOutput = await posthog.dashboardsBulkUpdateTagsCreate();

// Result shape (from schema): { updated: ({ id: number; tags: (string)[] })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.dashboardsCreateFromTemplateJsonCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/create_from_template_json/`
- **OpenAPI operationId**: `dashboards_create_from_template_json_create`
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

type DashboardsCreateFromTemplateJsonCreateInput = Parameters<typeof posthog.dashboardsCreateFromTemplateJsonCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsCreateFromTemplateJsonCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsCreateFromTemplateJsonCreate>>;

const result: DashboardsCreateFromTemplateJsonCreateOutput = await posthog.dashboardsCreateFromTemplateJsonCreate();

// Result shape (from schema): unknown
```

### `posthog.dashboardsCreateUnlistedDashboardCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboards/create_unlisted_dashboard/`
- **What it does**: Creates an unlisted dashboard from template by tag.
Enforces uniqueness (one per tag per team).
Returns 409 if unlisted dashboard with this tag already exists.
- **OpenAPI operationId**: `dashboards_create_unlisted_dashboard_create`
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

type DashboardsCreateUnlistedDashboardCreateInput = Parameters<typeof posthog.dashboardsCreateUnlistedDashboardCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsCreateUnlistedDashboardCreateOutput = Awaited<ReturnType<typeof posthog.dashboardsCreateUnlistedDashboardCreate>>;

const result: DashboardsCreateUnlistedDashboardCreateOutput = await posthog.dashboardsCreateUnlistedDashboardCreate();

// Result shape (from schema): unknown
```

### `posthog.dashboardsWidgetCatalogRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/dashboards/widget_catalog/`
- **What it does**: List registered dashboard widget types and per-type config_schema documentation for agents.
- **OpenAPI operationId**: `dashboards_widget_catalog_retrieve`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ widget_type: "activity_events_list"; group_id: string; group_label: string; label: string; description: string; config_schema: { dateRange?: { date_from?: "-1M" | "-30M" | "-1h" | "-3h" | "-24h" | "-7d" | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardsWidgetCatalogRetrieveInput = Parameters<typeof posthog.dashboardsWidgetCatalogRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardsWidgetCatalogRetrieveOutput = Awaited<ReturnType<typeof posthog.dashboardsWidgetCatalogRetrieve>>;

const result: DashboardsWidgetCatalogRetrieveOutput = await posthog.dashboardsWidgetCatalogRetrieve();

// Result shape (from schema): { results: ({ widget_type: "activity_events_list"; group_id: string; group_label: string; label: string; description: string; config_schema: { dateRange?: { date_from?: "-1M" | "-30M" | "-1h" | "-3h" | "-24h" | "-7d" | ...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

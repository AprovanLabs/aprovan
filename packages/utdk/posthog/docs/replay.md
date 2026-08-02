# Replay

## Operations

### `posthog.environmentsSessionRecordingPlaylistsList`

- **HTTP**: `GET /api/environments/{environment_id}/session_recording_playlists/`
- **What it does**: Override list to include synthetic playlists.

Synthetics have no DB row, so we compute each one's position in the merged
sort and split the requested page between synthetics and a DB queryset slice.
The merge/rank/sort is all in-memory, so each phase is wrapped in a span and
the input sizes are recorded as span attributes — a slow response on a team
with many playlists then shows up as a wide span against a large db_count.
- **OpenAPI operationId**: `environments_session_recording_playlists_list`
- **Path params**: None
- **Query params**: `created_by`, `limit`, `offset`, `short_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingPlaylistsListInput = Parameters<typeof posthog.environmentsSessionRecordingPlaylistsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingPlaylistsListOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingPlaylistsList>>;

const result: EnvironmentsSessionRecordingPlaylistsListOutput = await posthog.environmentsSessionRecordingPlaylistsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; ...
```

### `posthog.environmentsSessionRecordingPlaylistsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/session_recording_playlists/`
- **OpenAPI operationId**: `environments_session_recording_playlists_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingPlaylistsCreateInput = Parameters<typeof posthog.environmentsSessionRecordingPlaylistsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingPlaylistsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingPlaylistsCreate>>;

const result: EnvironmentsSessionRecordingPlaylistsCreateOutput = await posthog.environmentsSessionRecordingPlaylistsCreate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...
```

### `posthog.environmentsSessionRecordingPlaylistsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/session_recording_playlists/{short_id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_session_recording_playlists_destroy`
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

type EnvironmentsSessionRecordingPlaylistsDestroyInput = Parameters<typeof posthog.environmentsSessionRecordingPlaylistsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingPlaylistsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingPlaylistsDestroy>>;

const result: EnvironmentsSessionRecordingPlaylistsDestroyOutput = await posthog.environmentsSessionRecordingPlaylistsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsSessionRecordingPlaylistsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/session_recording_playlists/{short_id}/`
- **OpenAPI operationId**: `environments_session_recording_playlists_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingPlaylistsRetrieveInput = Parameters<typeof posthog.environmentsSessionRecordingPlaylistsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingPlaylistsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingPlaylistsRetrieve>>;

const result: EnvironmentsSessionRecordingPlaylistsRetrieveOutput = await posthog.environmentsSessionRecordingPlaylistsRetrieve();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...
```

### `posthog.environmentsSessionRecordingPlaylistsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/session_recording_playlists/{short_id}/`
- **OpenAPI operationId**: `environments_session_recording_playlists_partial_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingPlaylistsPartialUpdateInput = Parameters<typeof posthog.environmentsSessionRecordingPlaylistsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingPlaylistsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingPlaylistsPartialUpdate>>;

const result: EnvironmentsSessionRecordingPlaylistsPartialUpdateOutput = await posthog.environmentsSessionRecordingPlaylistsPartialUpdate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...
```

### `posthog.environmentsSessionRecordingPlaylistsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/session_recording_playlists/{short_id}/`
- **OpenAPI operationId**: `environments_session_recording_playlists_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingPlaylistsUpdateInput = Parameters<typeof posthog.environmentsSessionRecordingPlaylistsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingPlaylistsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingPlaylistsUpdate>>;

const result: EnvironmentsSessionRecordingPlaylistsUpdateOutput = await posthog.environmentsSessionRecordingPlaylistsUpdate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...
```

### `posthog.environmentsSessionRecordingPlaylistsRecordingsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/session_recording_playlists/{short_id}/recordings/`
- **OpenAPI operationId**: `environments_session_recording_playlists_recordings_retrieve`
- **Path params**: `short_id`
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

type EnvironmentsSessionRecordingPlaylistsRecordingsRetrieveInput = Parameters<typeof posthog.environmentsSessionRecordingPlaylistsRecordingsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingPlaylistsRecordingsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingPlaylistsRecordingsRetrieve>>;

const result: EnvironmentsSessionRecordingPlaylistsRecordingsRetrieveOutput = await posthog.environmentsSessionRecordingPlaylistsRecordingsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsSessionRecordingPlaylistsRecordingsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/session_recording_playlists/{short_id}/recordings/{session_recording_id}/`
- **OpenAPI operationId**: `environments_session_recording_playlists_recordings_destroy`
- **Path params**: `session_recording_id`, `short_id`
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

type EnvironmentsSessionRecordingPlaylistsRecordingsDestroyInput = Parameters<typeof posthog.environmentsSessionRecordingPlaylistsRecordingsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingPlaylistsRecordingsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingPlaylistsRecordingsDestroy>>;

const result: EnvironmentsSessionRecordingPlaylistsRecordingsDestroyOutput = await posthog.environmentsSessionRecordingPlaylistsRecordingsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsSessionRecordingPlaylistsRecordingsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/session_recording_playlists/{short_id}/recordings/{session_recording_id}/`
- **OpenAPI operationId**: `environments_session_recording_playlists_recordings_create`
- **Path params**: `session_recording_id`, `short_id`
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

type EnvironmentsSessionRecordingPlaylistsRecordingsCreateInput = Parameters<typeof posthog.environmentsSessionRecordingPlaylistsRecordingsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingPlaylistsRecordingsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingPlaylistsRecordingsCreate>>;

const result: EnvironmentsSessionRecordingPlaylistsRecordingsCreateOutput = await posthog.environmentsSessionRecordingPlaylistsRecordingsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsSessionRecordingsList`

- **HTTP**: `GET /api/environments/{environment_id}/session_recordings/`
- **OpenAPI operationId**: `environments_session_recordings_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inact...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingsListInput = Parameters<typeof posthog.environmentsSessionRecordingsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingsListOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingsList>>;

const result: EnvironmentsSessionRecordingsListOutput = await posthog.environmentsSessionRecordingsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inact...
```

### `posthog.environmentsSessionRecordingsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/session_recordings/{id}/`
- **OpenAPI operationId**: `environments_session_recordings_destroy`
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

type EnvironmentsSessionRecordingsDestroyInput = Parameters<typeof posthog.environmentsSessionRecordingsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingsDestroy>>;

const result: EnvironmentsSessionRecordingsDestroyOutput = await posthog.environmentsSessionRecordingsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsSessionRecordingsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/session_recordings/{id}/`
- **OpenAPI operationId**: `environments_session_recordings_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingsRetrieveInput = Parameters<typeof posthog.environmentsSessionRecordingsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingsRetrieve>>;

const result: EnvironmentsSessionRecordingsRetrieveOutput = await posthog.environmentsSessionRecordingsRetrieve();

// Result shape (from schema): { id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...
```

### `posthog.environmentsSessionRecordingsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/session_recordings/{id}/`
- **OpenAPI operationId**: `environments_session_recordings_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingsPartialUpdateInput = Parameters<typeof posthog.environmentsSessionRecordingsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingsPartialUpdate>>;

const result: EnvironmentsSessionRecordingsPartialUpdateOutput = await posthog.environmentsSessionRecordingsPartialUpdate();

// Result shape (from schema): { id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...
```

### `posthog.environmentsSessionRecordingsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/session_recordings/{id}/`
- **OpenAPI operationId**: `environments_session_recordings_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingsUpdateInput = Parameters<typeof posthog.environmentsSessionRecordingsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingsUpdate>>;

const result: EnvironmentsSessionRecordingsUpdateOutput = await posthog.environmentsSessionRecordingsUpdate();

// Result shape (from schema): { id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...
```

### `posthog.environmentsSessionRecordingsBulkDeleteCreate`

- **HTTP**: `POST /api/environments/{environment_id}/session_recordings/bulk_delete/`
- **What it does**: Delete a batch of session recordings by session ID. Deletion is permanent and cannot be undone. IDs that don't match an existing recording are skipped and counted in `total_requested` but not `deleted_count`.
- **OpenAPI operationId**: `environments_session_recordings_bulk_delete_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean; deleted_count: number; total_requested: number; failed_ids: (string)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSessionRecordingsBulkDeleteCreateInput = Parameters<typeof posthog.environmentsSessionRecordingsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionRecordingsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.environmentsSessionRecordingsBulkDeleteCreate>>;

const result: EnvironmentsSessionRecordingsBulkDeleteCreateOutput = await posthog.environmentsSessionRecordingsBulkDeleteCreate();

// Result shape (from schema): { success: boolean; deleted_count: number; total_requested: number; failed_ids: (string)[] }
```

### `posthog.environmentsCreateSessionSummariesIndividually`

- **HTTP**: `POST /api/environments/{environment_id}/session_summaries/create_session_summaries_individually/`
- **What it does**: Generate AI individual summary for each session, without grouping.
- **OpenAPI operationId**: `environments_create_session_summaries_individually`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ session_ids: (string)[]; focus_area?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCreateSessionSummariesIndividuallyInput = Parameters<typeof posthog.environmentsCreateSessionSummariesIndividually> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCreateSessionSummariesIndividuallyOutput = Awaited<ReturnType<typeof posthog.environmentsCreateSessionSummariesIndividually>>;

const result: EnvironmentsCreateSessionSummariesIndividuallyOutput = await posthog.environmentsCreateSessionSummariesIndividually();

// Result shape (from schema): { session_ids: (string)[]; focus_area?: string }
```

### `posthog.sessionRecordingPlaylistsList`

- **HTTP**: `GET /api/projects/{project_id}/session_recording_playlists/`
- **What it does**: Override list to include synthetic playlists.

Synthetics have no DB row, so we compute each one's position in the merged
sort and split the requested page between synthetics and a DB queryset slice.
The merge/rank/sort is all in-memory, so each phase is wrapped in a span and
the input sizes are recorded as span attributes — a slow response on a team
with many playlists then shows up as a wide span against a large db_count.
- **OpenAPI operationId**: `session_recording_playlists_list`
- **Path params**: None
- **Query params**: `created_by`, `limit`, `offset`, `short_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingPlaylistsListInput = Parameters<typeof posthog.sessionRecordingPlaylistsList> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingPlaylistsListOutput = Awaited<ReturnType<typeof posthog.sessionRecordingPlaylistsList>>;

const result: SessionRecordingPlaylistsListOutput = await posthog.sessionRecordingPlaylistsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; ...
```

### `posthog.sessionRecordingPlaylistsCreate`

- **HTTP**: `POST /api/projects/{project_id}/session_recording_playlists/`
- **OpenAPI operationId**: `session_recording_playlists_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingPlaylistsCreateInput = Parameters<typeof posthog.sessionRecordingPlaylistsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingPlaylistsCreateOutput = Awaited<ReturnType<typeof posthog.sessionRecordingPlaylistsCreate>>;

const result: SessionRecordingPlaylistsCreateOutput = await posthog.sessionRecordingPlaylistsCreate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...
```

### `posthog.sessionRecordingPlaylistsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/session_recording_playlists/{short_id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `session_recording_playlists_destroy`
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

type SessionRecordingPlaylistsDestroyInput = Parameters<typeof posthog.sessionRecordingPlaylistsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingPlaylistsDestroyOutput = Awaited<ReturnType<typeof posthog.sessionRecordingPlaylistsDestroy>>;

const result: SessionRecordingPlaylistsDestroyOutput = await posthog.sessionRecordingPlaylistsDestroy();

// Result shape (from schema): unknown
```

### `posthog.sessionRecordingPlaylistsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/session_recording_playlists/{short_id}/`
- **OpenAPI operationId**: `session_recording_playlists_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingPlaylistsRetrieveInput = Parameters<typeof posthog.sessionRecordingPlaylistsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingPlaylistsRetrieveOutput = Awaited<ReturnType<typeof posthog.sessionRecordingPlaylistsRetrieve>>;

const result: SessionRecordingPlaylistsRetrieveOutput = await posthog.sessionRecordingPlaylistsRetrieve();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...
```

### `posthog.sessionRecordingPlaylistsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/session_recording_playlists/{short_id}/`
- **OpenAPI operationId**: `session_recording_playlists_partial_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingPlaylistsPartialUpdateInput = Parameters<typeof posthog.sessionRecordingPlaylistsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingPlaylistsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.sessionRecordingPlaylistsPartialUpdate>>;

const result: SessionRecordingPlaylistsPartialUpdateOutput = await posthog.sessionRecordingPlaylistsPartialUpdate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...
```

### `posthog.sessionRecordingPlaylistsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/session_recording_playlists/{short_id}/`
- **OpenAPI operationId**: `session_recording_playlists_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingPlaylistsUpdateInput = Parameters<typeof posthog.sessionRecordingPlaylistsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingPlaylistsUpdateOutput = Awaited<ReturnType<typeof posthog.sessionRecordingPlaylistsUpdate>>;

const result: SessionRecordingPlaylistsUpdateOutput = await posthog.sessionRecordingPlaylistsUpdate();

// Result shape (from schema): { id: number; short_id: string; name?: string | null; derived_name?: string | null; description?: string; pinned?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_...
```

### `posthog.sessionRecordingPlaylistsRecordingsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/session_recording_playlists/{short_id}/recordings/`
- **OpenAPI operationId**: `session_recording_playlists_recordings_retrieve`
- **Path params**: `short_id`
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

type SessionRecordingPlaylistsRecordingsRetrieveInput = Parameters<typeof posthog.sessionRecordingPlaylistsRecordingsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingPlaylistsRecordingsRetrieveOutput = Awaited<ReturnType<typeof posthog.sessionRecordingPlaylistsRecordingsRetrieve>>;

const result: SessionRecordingPlaylistsRecordingsRetrieveOutput = await posthog.sessionRecordingPlaylistsRecordingsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.sessionRecordingPlaylistsRecordingsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/session_recording_playlists/{short_id}/recordings/{session_recording_id}/`
- **OpenAPI operationId**: `session_recording_playlists_recordings_destroy`
- **Path params**: `session_recording_id`, `short_id`
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

type SessionRecordingPlaylistsRecordingsDestroyInput = Parameters<typeof posthog.sessionRecordingPlaylistsRecordingsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingPlaylistsRecordingsDestroyOutput = Awaited<ReturnType<typeof posthog.sessionRecordingPlaylistsRecordingsDestroy>>;

const result: SessionRecordingPlaylistsRecordingsDestroyOutput = await posthog.sessionRecordingPlaylistsRecordingsDestroy();

// Result shape (from schema): unknown
```

### `posthog.sessionRecordingPlaylistsRecordingsCreate`

- **HTTP**: `POST /api/projects/{project_id}/session_recording_playlists/{short_id}/recordings/{session_recording_id}/`
- **OpenAPI operationId**: `session_recording_playlists_recordings_create`
- **Path params**: `session_recording_id`, `short_id`
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

type SessionRecordingPlaylistsRecordingsCreateInput = Parameters<typeof posthog.sessionRecordingPlaylistsRecordingsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingPlaylistsRecordingsCreateOutput = Awaited<ReturnType<typeof posthog.sessionRecordingPlaylistsRecordingsCreate>>;

const result: SessionRecordingPlaylistsRecordingsCreateOutput = await posthog.sessionRecordingPlaylistsRecordingsCreate();

// Result shape (from schema): unknown
```

### `posthog.sessionRecordingsList`

- **HTTP**: `GET /api/projects/{project_id}/session_recordings/`
- **OpenAPI operationId**: `session_recordings_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inact...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingsListInput = Parameters<typeof posthog.sessionRecordingsList> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingsListOutput = Awaited<ReturnType<typeof posthog.sessionRecordingsList>>;

const result: SessionRecordingsListOutput = await posthog.sessionRecordingsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inact...
```

### `posthog.sessionRecordingsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/session_recordings/{id}/`
- **OpenAPI operationId**: `session_recordings_destroy`
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

type SessionRecordingsDestroyInput = Parameters<typeof posthog.sessionRecordingsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingsDestroyOutput = Awaited<ReturnType<typeof posthog.sessionRecordingsDestroy>>;

const result: SessionRecordingsDestroyOutput = await posthog.sessionRecordingsDestroy();

// Result shape (from schema): unknown
```

### `posthog.sessionRecordingsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/session_recordings/{id}/`
- **OpenAPI operationId**: `session_recordings_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingsRetrieveInput = Parameters<typeof posthog.sessionRecordingsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingsRetrieveOutput = Awaited<ReturnType<typeof posthog.sessionRecordingsRetrieve>>;

const result: SessionRecordingsRetrieveOutput = await posthog.sessionRecordingsRetrieve();

// Result shape (from schema): { id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...
```

### `posthog.sessionRecordingsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/session_recordings/{id}/`
- **OpenAPI operationId**: `session_recordings_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingsPartialUpdateInput = Parameters<typeof posthog.sessionRecordingsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.sessionRecordingsPartialUpdate>>;

const result: SessionRecordingsPartialUpdateOutput = await posthog.sessionRecordingsPartialUpdate();

// Result shape (from schema): { id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...
```

### `posthog.sessionRecordingsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/session_recordings/{id}/`
- **OpenAPI operationId**: `session_recordings_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingsUpdateInput = Parameters<typeof posthog.sessionRecordingsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingsUpdateOutput = Awaited<ReturnType<typeof posthog.sessionRecordingsUpdate>>;

const result: SessionRecordingsUpdateOutput = await posthog.sessionRecordingsUpdate();

// Result shape (from schema): { id: string; distinct_id: string | null; viewed: boolean; viewers: (string)[]; recording_duration: number; active_seconds: number | null; inactive_seconds: number | null; start_time: string | null; end_time: string | n...
```

### `posthog.sessionRecordingsBulkDeleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/session_recordings/bulk_delete/`
- **What it does**: Delete a batch of session recordings by session ID. Deletion is permanent and cannot be undone. IDs that don't match an existing recording are skipped and counted in `total_requested` but not `deleted_count`.
- **OpenAPI operationId**: `session_recordings_bulk_delete_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean; deleted_count: number; total_requested: number; failed_ids: (string)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionRecordingsBulkDeleteCreateInput = Parameters<typeof posthog.sessionRecordingsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionRecordingsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.sessionRecordingsBulkDeleteCreate>>;

const result: SessionRecordingsBulkDeleteCreateOutput = await posthog.sessionRecordingsBulkDeleteCreate();

// Result shape (from schema): { success: boolean; deleted_count: number; total_requested: number; failed_ids: (string)[] }
```

### `posthog.createSessionSummariesIndividually`

- **HTTP**: `POST /api/projects/{project_id}/session_summaries/create_session_summaries_individually/`
- **What it does**: Generate AI individual summary for each session, without grouping.
- **OpenAPI operationId**: `create_session_summaries_individually`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ session_ids: (string)[]; focus_area?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CreateSessionSummariesIndividuallyInput = Parameters<typeof posthog.createSessionSummariesIndividually> extends [infer T, ...unknown[]] ? T : undefined;
type CreateSessionSummariesIndividuallyOutput = Awaited<ReturnType<typeof posthog.createSessionSummariesIndividually>>;

const result: CreateSessionSummariesIndividuallyOutput = await posthog.createSessionSummariesIndividually();

// Result shape (from schema): { session_ids: (string)[]; focus_area?: string }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

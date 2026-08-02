# Desktop File System

## Operations

### `posthog.desktopFileSystemList`

- **HTTP**: `GET /api/projects/{project_id}/desktop_file_system/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemListInput = Parameters<typeof posthog.desktopFileSystemList> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemListOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemList>>;

const result: DesktopFileSystemListOutput = await posthog.desktopFileSystemList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean |...
```

### `posthog.desktopFileSystemCreate`

- **HTTP**: `POST /api/projects/{project_id}/desktop_file_system/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemCreateInput = Parameters<typeof posthog.desktopFileSystemCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemCreateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemCreate>>;

const result: DesktopFileSystemCreateOutput = await posthog.desktopFileSystemCreate();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.desktopFileSystemDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/desktop_file_system/{id}/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_destroy`
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

type DesktopFileSystemDestroyInput = Parameters<typeof posthog.desktopFileSystemDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemDestroyOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemDestroy>>;

const result: DesktopFileSystemDestroyOutput = await posthog.desktopFileSystemDestroy();

// Result shape (from schema): unknown
```

### `posthog.desktopFileSystemRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/desktop_file_system/{id}/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemRetrieveInput = Parameters<typeof posthog.desktopFileSystemRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemRetrieveOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemRetrieve>>;

const result: DesktopFileSystemRetrieveOutput = await posthog.desktopFileSystemRetrieve();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.desktopFileSystemPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/desktop_file_system/{id}/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemPartialUpdateInput = Parameters<typeof posthog.desktopFileSystemPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemPartialUpdateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemPartialUpdate>>;

const result: DesktopFileSystemPartialUpdateOutput = await posthog.desktopFileSystemPartialUpdate();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.desktopFileSystemUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/desktop_file_system/{id}/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemUpdateInput = Parameters<typeof posthog.desktopFileSystemUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemUpdateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemUpdate>>;

const result: DesktopFileSystemUpdateOutput = await posthog.desktopFileSystemUpdate();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.desktopFileSystemCanvasPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/desktop_file_system/{id}/canvas/`
- **What it does**: Publish a new version of a freeform canvas's React source.

Merges into the dashboard row's `meta` (never replaces it), so existing
keys like `channelId`/`templateId` survive. Appends a full-file version
snapshot and points `currentVersionId` at it — the server-side mirror of
the app's dashboardsService.saveFreeform.
- **OpenAPI operationId**: `desktop_file_system_canvas_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemCanvasPartialUpdateInput = Parameters<typeof posthog.desktopFileSystemCanvasPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemCanvasPartialUpdateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemCanvasPartialUpdate>>;

const result: DesktopFileSystemCanvasPartialUpdateOutput = await posthog.desktopFileSystemCanvasPartialUpdate();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.desktopFileSystemContextGenerationRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/desktop_file_system/{id}/context_generation/`
- **What it does**: Return the Task currently generating this folder's CONTEXT.md, or null if none.
- **OpenAPI operationId**: `desktop_file_system_context_generation_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ task_id: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemContextGenerationRetrieveInput = Parameters<typeof posthog.desktopFileSystemContextGenerationRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemContextGenerationRetrieveOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemContextGenerationRetrieve>>;

const result: DesktopFileSystemContextGenerationRetrieveOutput = await posthog.desktopFileSystemContextGenerationRetrieve();

// Result shape (from schema): { task_id: string | null }
```

### `posthog.desktopFileSystemContextGenerationUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/desktop_file_system/{id}/context_generation/`
- **What it does**: Set or clear the Task associated with this folder's CONTEXT.md generation.
- **OpenAPI operationId**: `desktop_file_system_context_generation_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ task_id: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemContextGenerationUpdateInput = Parameters<typeof posthog.desktopFileSystemContextGenerationUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemContextGenerationUpdateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemContextGenerationUpdate>>;

const result: DesktopFileSystemContextGenerationUpdateOutput = await posthog.desktopFileSystemContextGenerationUpdate();

// Result shape (from schema): { task_id: string | null }
```

### `posthog.desktopFileSystemCountCreate`

- **HTTP**: `POST /api/projects/{project_id}/desktop_file_system/{id}/count/`
- **What it does**: Get count of all files in a folder.
- **OpenAPI operationId**: `desktop_file_system_count_create`
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

type DesktopFileSystemCountCreateInput = Parameters<typeof posthog.desktopFileSystemCountCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemCountCreateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemCountCreate>>;

const result: DesktopFileSystemCountCreateOutput = await posthog.desktopFileSystemCountCreate();

// Result shape (from schema): unknown
```

### `posthog.desktopFileSystemInstructionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/desktop_file_system/{id}/instructions/`
- **What it does**: Soft-delete every version of this folder's instructions.
- **OpenAPI operationId**: `desktop_file_system_instructions_destroy`
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

type DesktopFileSystemInstructionsDestroyInput = Parameters<typeof posthog.desktopFileSystemInstructionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemInstructionsDestroyOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemInstructionsDestroy>>;

const result: DesktopFileSystemInstructionsDestroyOutput = await posthog.desktopFileSystemInstructionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.desktopFileSystemInstructionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/desktop_file_system/{id}/instructions/`
- **What it does**: Return the latest non-deleted instructions for this folder.
- **OpenAPI operationId**: `desktop_file_system_instructions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; content: string; version: number; is_latest: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolea...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemInstructionsRetrieveInput = Parameters<typeof posthog.desktopFileSystemInstructionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemInstructionsRetrieveOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemInstructionsRetrieve>>;

const result: DesktopFileSystemInstructionsRetrieveOutput = await posthog.desktopFileSystemInstructionsRetrieve();

// Result shape (from schema): { id: string; content: string; version: number; is_latest: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolea...
```

### `posthog.desktopFileSystemInstructionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/desktop_file_system/{id}/instructions/`
- **What it does**: Publish a new version of the folder's instructions.
- **OpenAPI operationId**: `desktop_file_system_instructions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; content: string; version: number; is_latest: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolea...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemInstructionsPartialUpdateInput = Parameters<typeof posthog.desktopFileSystemInstructionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemInstructionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemInstructionsPartialUpdate>>;

const result: DesktopFileSystemInstructionsPartialUpdateOutput = await posthog.desktopFileSystemInstructionsPartialUpdate();

// Result shape (from schema): { id: string; content: string; version: number; is_latest: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolea...
```

### `posthog.desktopFileSystemInstructionsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/desktop_file_system/{id}/instructions/`
- **What it does**: Publish a new version of the folder's instructions.
- **OpenAPI operationId**: `desktop_file_system_instructions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; content: string; version: number; is_latest: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolea...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemInstructionsUpdateInput = Parameters<typeof posthog.desktopFileSystemInstructionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemInstructionsUpdateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemInstructionsUpdate>>;

const result: DesktopFileSystemInstructionsUpdateOutput = await posthog.desktopFileSystemInstructionsUpdate();

// Result shape (from schema): { id: string; content: string; version: number; is_latest: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolea...
```

### `posthog.desktopFileSystemInstructionsVersionsList`

- **HTTP**: `GET /api/projects/{project_id}/desktop_file_system/{id}/instructions/versions/`
- **What it does**: List the version history for this folder's instructions, newest first.
- **OpenAPI operationId**: `desktop_file_system_instructions_versions_list`
- **Path params**: `id`
- **Query params**: `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; version: number; is_latest: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; las...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DesktopFileSystemInstructionsVersionsListInput = Parameters<typeof posthog.desktopFileSystemInstructionsVersionsList> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemInstructionsVersionsListOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemInstructionsVersionsList>>;

const result: DesktopFileSystemInstructionsVersionsListOutput = await posthog.desktopFileSystemInstructionsVersionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; version: number; is_latest: boolean; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; las...
```

### `posthog.desktopFileSystemLinkCreate`

- **HTTP**: `POST /api/projects/{project_id}/desktop_file_system/{id}/link/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_link_create`
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

type DesktopFileSystemLinkCreateInput = Parameters<typeof posthog.desktopFileSystemLinkCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemLinkCreateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemLinkCreate>>;

const result: DesktopFileSystemLinkCreateOutput = await posthog.desktopFileSystemLinkCreate();

// Result shape (from schema): unknown
```

### `posthog.desktopFileSystemMoveCreate`

- **HTTP**: `POST /api/projects/{project_id}/desktop_file_system/{id}/move/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_move_create`
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

type DesktopFileSystemMoveCreateInput = Parameters<typeof posthog.desktopFileSystemMoveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemMoveCreateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemMoveCreate>>;

const result: DesktopFileSystemMoveCreateOutput = await posthog.desktopFileSystemMoveCreate();

// Result shape (from schema): unknown
```

### `posthog.desktopFileSystemCountByPathCreate`

- **HTTP**: `POST /api/projects/{project_id}/desktop_file_system/count_by_path/`
- **What it does**: Get count of all files in a folder.
- **OpenAPI operationId**: `desktop_file_system_count_by_path_create`
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

type DesktopFileSystemCountByPathCreateInput = Parameters<typeof posthog.desktopFileSystemCountByPathCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemCountByPathCreateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemCountByPathCreate>>;

const result: DesktopFileSystemCountByPathCreateOutput = await posthog.desktopFileSystemCountByPathCreate();

// Result shape (from schema): unknown
```

### `posthog.desktopFileSystemLogViewRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/desktop_file_system/log_view/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_log_view_retrieve`
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

type DesktopFileSystemLogViewRetrieveInput = Parameters<typeof posthog.desktopFileSystemLogViewRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemLogViewRetrieveOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemLogViewRetrieve>>;

const result: DesktopFileSystemLogViewRetrieveOutput = await posthog.desktopFileSystemLogViewRetrieve();

// Result shape (from schema): unknown
```

### `posthog.desktopFileSystemLogViewCreate`

- **HTTP**: `POST /api/projects/{project_id}/desktop_file_system/log_view/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_log_view_create`
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

type DesktopFileSystemLogViewCreateInput = Parameters<typeof posthog.desktopFileSystemLogViewCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemLogViewCreateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemLogViewCreate>>;

const result: DesktopFileSystemLogViewCreateOutput = await posthog.desktopFileSystemLogViewCreate();

// Result shape (from schema): unknown
```

### `posthog.desktopFileSystemUndoDeleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/desktop_file_system/undo_delete/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_undo_delete_create`
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

type DesktopFileSystemUndoDeleteCreateInput = Parameters<typeof posthog.desktopFileSystemUndoDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemUndoDeleteCreateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemUndoDeleteCreate>>;

const result: DesktopFileSystemUndoDeleteCreateOutput = await posthog.desktopFileSystemUndoDeleteCreate();

// Result shape (from schema): unknown
```

### `posthog.desktopFileSystemUnfiledRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/desktop_file_system/unfiled/`
- **What it does**: The file tree for the desktop product surface. Reuses all FileSystemViewSet behaviour but is
scoped to the "desktop" surface, so its tree is fully isolated from the default "web" tree.

Adds per-folder, versioned markdown instructions describing the contents of a folder.
- **OpenAPI operationId**: `desktop_file_system_unfiled_retrieve`
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

type DesktopFileSystemUnfiledRetrieveInput = Parameters<typeof posthog.desktopFileSystemUnfiledRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemUnfiledRetrieveOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemUnfiledRetrieve>>;

const result: DesktopFileSystemUnfiledRetrieveOutput = await posthog.desktopFileSystemUnfiledRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

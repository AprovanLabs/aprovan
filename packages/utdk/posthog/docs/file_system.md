# File System

## Operations

### `posthog.environmentsFileSystemList`

- **HTTP**: `GET /api/environments/{environment_id}/file_system/`
- **OpenAPI operationId**: `environments_file_system_list`
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

type EnvironmentsFileSystemListInput = Parameters<typeof posthog.environmentsFileSystemList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemListOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemList>>;

const result: EnvironmentsFileSystemListOutput = await posthog.environmentsFileSystemList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean |...
```

### `posthog.environmentsFileSystemCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_system/`
- **OpenAPI operationId**: `environments_file_system_create`
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

type EnvironmentsFileSystemCreateInput = Parameters<typeof posthog.environmentsFileSystemCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemCreate>>;

const result: EnvironmentsFileSystemCreateOutput = await posthog.environmentsFileSystemCreate();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.environmentsFileSystemDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/file_system/{id}/`
- **OpenAPI operationId**: `environments_file_system_destroy`
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

type EnvironmentsFileSystemDestroyInput = Parameters<typeof posthog.environmentsFileSystemDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemDestroy>>;

const result: EnvironmentsFileSystemDestroyOutput = await posthog.environmentsFileSystemDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileSystemRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/file_system/{id}/`
- **OpenAPI operationId**: `environments_file_system_retrieve`
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

type EnvironmentsFileSystemRetrieveInput = Parameters<typeof posthog.environmentsFileSystemRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemRetrieve>>;

const result: EnvironmentsFileSystemRetrieveOutput = await posthog.environmentsFileSystemRetrieve();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.environmentsFileSystemPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/file_system/{id}/`
- **OpenAPI operationId**: `environments_file_system_partial_update`
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

type EnvironmentsFileSystemPartialUpdateInput = Parameters<typeof posthog.environmentsFileSystemPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemPartialUpdate>>;

const result: EnvironmentsFileSystemPartialUpdateOutput = await posthog.environmentsFileSystemPartialUpdate();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.environmentsFileSystemUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/file_system/{id}/`
- **OpenAPI operationId**: `environments_file_system_update`
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

type EnvironmentsFileSystemUpdateInput = Parameters<typeof posthog.environmentsFileSystemUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemUpdate>>;

const result: EnvironmentsFileSystemUpdateOutput = await posthog.environmentsFileSystemUpdate();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.environmentsFileSystemCountCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_system/{id}/count/`
- **What it does**: Get count of all files in a folder.
- **OpenAPI operationId**: `environments_file_system_count_create`
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

type EnvironmentsFileSystemCountCreateInput = Parameters<typeof posthog.environmentsFileSystemCountCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemCountCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemCountCreate>>;

const result: EnvironmentsFileSystemCountCreateOutput = await posthog.environmentsFileSystemCountCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileSystemLinkCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_system/{id}/link/`
- **OpenAPI operationId**: `environments_file_system_link_create`
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

type EnvironmentsFileSystemLinkCreateInput = Parameters<typeof posthog.environmentsFileSystemLinkCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemLinkCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemLinkCreate>>;

const result: EnvironmentsFileSystemLinkCreateOutput = await posthog.environmentsFileSystemLinkCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileSystemMoveCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_system/{id}/move/`
- **OpenAPI operationId**: `environments_file_system_move_create`
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

type EnvironmentsFileSystemMoveCreateInput = Parameters<typeof posthog.environmentsFileSystemMoveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemMoveCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemMoveCreate>>;

const result: EnvironmentsFileSystemMoveCreateOutput = await posthog.environmentsFileSystemMoveCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileSystemCountByPathCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_system/count_by_path/`
- **What it does**: Get count of all files in a folder.
- **OpenAPI operationId**: `environments_file_system_count_by_path_create`
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

type EnvironmentsFileSystemCountByPathCreateInput = Parameters<typeof posthog.environmentsFileSystemCountByPathCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemCountByPathCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemCountByPathCreate>>;

const result: EnvironmentsFileSystemCountByPathCreateOutput = await posthog.environmentsFileSystemCountByPathCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileSystemLogViewRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/file_system/log_view/`
- **OpenAPI operationId**: `environments_file_system_log_view_retrieve`
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

type EnvironmentsFileSystemLogViewRetrieveInput = Parameters<typeof posthog.environmentsFileSystemLogViewRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemLogViewRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemLogViewRetrieve>>;

const result: EnvironmentsFileSystemLogViewRetrieveOutput = await posthog.environmentsFileSystemLogViewRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileSystemLogViewCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_system/log_view/`
- **OpenAPI operationId**: `environments_file_system_log_view_create`
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

type EnvironmentsFileSystemLogViewCreateInput = Parameters<typeof posthog.environmentsFileSystemLogViewCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemLogViewCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemLogViewCreate>>;

const result: EnvironmentsFileSystemLogViewCreateOutput = await posthog.environmentsFileSystemLogViewCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileSystemUndoDeleteCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_system/undo_delete/`
- **OpenAPI operationId**: `environments_file_system_undo_delete_create`
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

type EnvironmentsFileSystemUndoDeleteCreateInput = Parameters<typeof posthog.environmentsFileSystemUndoDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemUndoDeleteCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemUndoDeleteCreate>>;

const result: EnvironmentsFileSystemUndoDeleteCreateOutput = await posthog.environmentsFileSystemUndoDeleteCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileSystemUnfiledRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/file_system/unfiled/`
- **OpenAPI operationId**: `environments_file_system_unfiled_retrieve`
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

type EnvironmentsFileSystemUnfiledRetrieveInput = Parameters<typeof posthog.environmentsFileSystemUnfiledRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemUnfiledRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemUnfiledRetrieve>>;

const result: EnvironmentsFileSystemUnfiledRetrieveOutput = await posthog.environmentsFileSystemUnfiledRetrieve();

// Result shape (from schema): unknown
```

### `posthog.fileSystemList`

- **HTTP**: `GET /api/projects/{project_id}/file_system/`
- **OpenAPI operationId**: `file_system_list`
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

type FileSystemListInput = Parameters<typeof posthog.fileSystemList> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemListOutput = Awaited<ReturnType<typeof posthog.fileSystemList>>;

const result: FileSystemListOutput = await posthog.fileSystemList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean |...
```

### `posthog.fileSystemCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_system/`
- **OpenAPI operationId**: `file_system_create`
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

type FileSystemCreateInput = Parameters<typeof posthog.fileSystemCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemCreateOutput = Awaited<ReturnType<typeof posthog.fileSystemCreate>>;

const result: FileSystemCreateOutput = await posthog.fileSystemCreate();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.fileSystemDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/file_system/{id}/`
- **OpenAPI operationId**: `file_system_destroy`
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

type FileSystemDestroyInput = Parameters<typeof posthog.fileSystemDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemDestroyOutput = Awaited<ReturnType<typeof posthog.fileSystemDestroy>>;

const result: FileSystemDestroyOutput = await posthog.fileSystemDestroy();

// Result shape (from schema): unknown
```

### `posthog.fileSystemRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/file_system/{id}/`
- **OpenAPI operationId**: `file_system_retrieve`
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

type FileSystemRetrieveInput = Parameters<typeof posthog.fileSystemRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemRetrieveOutput = Awaited<ReturnType<typeof posthog.fileSystemRetrieve>>;

const result: FileSystemRetrieveOutput = await posthog.fileSystemRetrieve();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.fileSystemPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/file_system/{id}/`
- **OpenAPI operationId**: `file_system_partial_update`
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

type FileSystemPartialUpdateInput = Parameters<typeof posthog.fileSystemPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemPartialUpdateOutput = Awaited<ReturnType<typeof posthog.fileSystemPartialUpdate>>;

const result: FileSystemPartialUpdateOutput = await posthog.fileSystemPartialUpdate();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.fileSystemUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/file_system/{id}/`
- **OpenAPI operationId**: `file_system_update`
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

type FileSystemUpdateInput = Parameters<typeof posthog.fileSystemUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemUpdateOutput = Awaited<ReturnType<typeof posthog.fileSystemUpdate>>;

const result: FileSystemUpdateOutput = await posthog.fileSystemUpdate();

// Result shape (from schema): { id: string; path: string; depth: number | null; type?: string; ref?: string | null; href?: string | null; meta?: unknown; shortcut?: boolean | null; created_at: string; last_viewed_at: string | null; user_access_level...
```

### `posthog.fileSystemCountCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_system/{id}/count/`
- **What it does**: Get count of all files in a folder.
- **OpenAPI operationId**: `file_system_count_create`
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

type FileSystemCountCreateInput = Parameters<typeof posthog.fileSystemCountCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemCountCreateOutput = Awaited<ReturnType<typeof posthog.fileSystemCountCreate>>;

const result: FileSystemCountCreateOutput = await posthog.fileSystemCountCreate();

// Result shape (from schema): unknown
```

### `posthog.fileSystemLinkCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_system/{id}/link/`
- **OpenAPI operationId**: `file_system_link_create`
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

type FileSystemLinkCreateInput = Parameters<typeof posthog.fileSystemLinkCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemLinkCreateOutput = Awaited<ReturnType<typeof posthog.fileSystemLinkCreate>>;

const result: FileSystemLinkCreateOutput = await posthog.fileSystemLinkCreate();

// Result shape (from schema): unknown
```

### `posthog.fileSystemMoveCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_system/{id}/move/`
- **OpenAPI operationId**: `file_system_move_create`
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

type FileSystemMoveCreateInput = Parameters<typeof posthog.fileSystemMoveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemMoveCreateOutput = Awaited<ReturnType<typeof posthog.fileSystemMoveCreate>>;

const result: FileSystemMoveCreateOutput = await posthog.fileSystemMoveCreate();

// Result shape (from schema): unknown
```

### `posthog.fileSystemCountByPathCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_system/count_by_path/`
- **What it does**: Get count of all files in a folder.
- **OpenAPI operationId**: `file_system_count_by_path_create`
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

type FileSystemCountByPathCreateInput = Parameters<typeof posthog.fileSystemCountByPathCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemCountByPathCreateOutput = Awaited<ReturnType<typeof posthog.fileSystemCountByPathCreate>>;

const result: FileSystemCountByPathCreateOutput = await posthog.fileSystemCountByPathCreate();

// Result shape (from schema): unknown
```

### `posthog.fileSystemLogViewRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/file_system/log_view/`
- **OpenAPI operationId**: `file_system_log_view_retrieve`
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

type FileSystemLogViewRetrieveInput = Parameters<typeof posthog.fileSystemLogViewRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemLogViewRetrieveOutput = Awaited<ReturnType<typeof posthog.fileSystemLogViewRetrieve>>;

const result: FileSystemLogViewRetrieveOutput = await posthog.fileSystemLogViewRetrieve();

// Result shape (from schema): unknown
```

### `posthog.fileSystemLogViewCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_system/log_view/`
- **OpenAPI operationId**: `file_system_log_view_create`
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

type FileSystemLogViewCreateInput = Parameters<typeof posthog.fileSystemLogViewCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemLogViewCreateOutput = Awaited<ReturnType<typeof posthog.fileSystemLogViewCreate>>;

const result: FileSystemLogViewCreateOutput = await posthog.fileSystemLogViewCreate();

// Result shape (from schema): unknown
```

### `posthog.fileSystemUndoDeleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_system/undo_delete/`
- **OpenAPI operationId**: `file_system_undo_delete_create`
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

type FileSystemUndoDeleteCreateInput = Parameters<typeof posthog.fileSystemUndoDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemUndoDeleteCreateOutput = Awaited<ReturnType<typeof posthog.fileSystemUndoDeleteCreate>>;

const result: FileSystemUndoDeleteCreateOutput = await posthog.fileSystemUndoDeleteCreate();

// Result shape (from schema): unknown
```

### `posthog.fileSystemUnfiledRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/file_system/unfiled/`
- **OpenAPI operationId**: `file_system_unfiled_retrieve`
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

type FileSystemUnfiledRetrieveInput = Parameters<typeof posthog.fileSystemUnfiledRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemUnfiledRetrieveOutput = Awaited<ReturnType<typeof posthog.fileSystemUnfiledRetrieve>>;

const result: FileSystemUnfiledRetrieveOutput = await posthog.fileSystemUnfiledRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

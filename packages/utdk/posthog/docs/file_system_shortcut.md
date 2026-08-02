# File System Shortcut

## Operations

### `posthog.environmentsFileSystemShortcutList`

- **HTTP**: `GET /api/environments/{environment_id}/file_system_shortcut/`
- **OpenAPI operationId**: `environments_file_system_shortcut_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileSystemShortcutListInput = Parameters<typeof posthog.environmentsFileSystemShortcutList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemShortcutListOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemShortcutList>>;

const result: EnvironmentsFileSystemShortcutListOutput = await posthog.environmentsFileSystemShortcutList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: str...
```

### `posthog.environmentsFileSystemShortcutCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_system_shortcut/`
- **OpenAPI operationId**: `environments_file_system_shortcut_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileSystemShortcutCreateInput = Parameters<typeof posthog.environmentsFileSystemShortcutCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemShortcutCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemShortcutCreate>>;

const result: EnvironmentsFileSystemShortcutCreateOutput = await posthog.environmentsFileSystemShortcutCreate();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.environmentsFileSystemShortcutDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/file_system_shortcut/{id}/`
- **OpenAPI operationId**: `environments_file_system_shortcut_destroy`
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

type EnvironmentsFileSystemShortcutDestroyInput = Parameters<typeof posthog.environmentsFileSystemShortcutDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemShortcutDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemShortcutDestroy>>;

const result: EnvironmentsFileSystemShortcutDestroyOutput = await posthog.environmentsFileSystemShortcutDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsFileSystemShortcutRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/file_system_shortcut/{id}/`
- **OpenAPI operationId**: `environments_file_system_shortcut_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileSystemShortcutRetrieveInput = Parameters<typeof posthog.environmentsFileSystemShortcutRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemShortcutRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemShortcutRetrieve>>;

const result: EnvironmentsFileSystemShortcutRetrieveOutput = await posthog.environmentsFileSystemShortcutRetrieve();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.environmentsFileSystemShortcutPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/file_system_shortcut/{id}/`
- **OpenAPI operationId**: `environments_file_system_shortcut_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileSystemShortcutPartialUpdateInput = Parameters<typeof posthog.environmentsFileSystemShortcutPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemShortcutPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemShortcutPartialUpdate>>;

const result: EnvironmentsFileSystemShortcutPartialUpdateOutput = await posthog.environmentsFileSystemShortcutPartialUpdate();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.environmentsFileSystemShortcutUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/file_system_shortcut/{id}/`
- **OpenAPI operationId**: `environments_file_system_shortcut_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileSystemShortcutUpdateInput = Parameters<typeof posthog.environmentsFileSystemShortcutUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemShortcutUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemShortcutUpdate>>;

const result: EnvironmentsFileSystemShortcutUpdateOutput = await posthog.environmentsFileSystemShortcutUpdate();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.environmentsFileSystemShortcutReorderCreate`

- **HTTP**: `POST /api/environments/{environment_id}/file_system_shortcut/reorder/`
- **What it does**: Set the display order of the current user's shortcuts. `ordered_ids` becomes the new top-to-bottom order; any unknown IDs are rejected.
- **OpenAPI operationId**: `environments_file_system_shortcut_reorder_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsFileSystemShortcutReorderCreateInput = Parameters<typeof posthog.environmentsFileSystemShortcutReorderCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsFileSystemShortcutReorderCreateOutput = Awaited<ReturnType<typeof posthog.environmentsFileSystemShortcutReorderCreate>>;

const result: EnvironmentsFileSystemShortcutReorderCreateOutput = await posthog.environmentsFileSystemShortcutReorderCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: str...
```

### `posthog.fileSystemShortcutList`

- **HTTP**: `GET /api/projects/{project_id}/file_system_shortcut/`
- **OpenAPI operationId**: `file_system_shortcut_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FileSystemShortcutListInput = Parameters<typeof posthog.fileSystemShortcutList> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemShortcutListOutput = Awaited<ReturnType<typeof posthog.fileSystemShortcutList>>;

const result: FileSystemShortcutListOutput = await posthog.fileSystemShortcutList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: str...
```

### `posthog.fileSystemShortcutCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_system_shortcut/`
- **OpenAPI operationId**: `file_system_shortcut_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type FileSystemShortcutCreateInput = Parameters<typeof posthog.fileSystemShortcutCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemShortcutCreateOutput = Awaited<ReturnType<typeof posthog.fileSystemShortcutCreate>>;

const result: FileSystemShortcutCreateOutput = await posthog.fileSystemShortcutCreate();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.fileSystemShortcutDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/file_system_shortcut/{id}/`
- **OpenAPI operationId**: `file_system_shortcut_destroy`
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

type FileSystemShortcutDestroyInput = Parameters<typeof posthog.fileSystemShortcutDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemShortcutDestroyOutput = Awaited<ReturnType<typeof posthog.fileSystemShortcutDestroy>>;

const result: FileSystemShortcutDestroyOutput = await posthog.fileSystemShortcutDestroy();

// Result shape (from schema): unknown
```

### `posthog.fileSystemShortcutRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/file_system_shortcut/{id}/`
- **OpenAPI operationId**: `file_system_shortcut_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FileSystemShortcutRetrieveInput = Parameters<typeof posthog.fileSystemShortcutRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemShortcutRetrieveOutput = Awaited<ReturnType<typeof posthog.fileSystemShortcutRetrieve>>;

const result: FileSystemShortcutRetrieveOutput = await posthog.fileSystemShortcutRetrieve();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.fileSystemShortcutPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/file_system_shortcut/{id}/`
- **OpenAPI operationId**: `file_system_shortcut_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FileSystemShortcutPartialUpdateInput = Parameters<typeof posthog.fileSystemShortcutPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemShortcutPartialUpdateOutput = Awaited<ReturnType<typeof posthog.fileSystemShortcutPartialUpdate>>;

const result: FileSystemShortcutPartialUpdateOutput = await posthog.fileSystemShortcutPartialUpdate();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.fileSystemShortcutUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/file_system_shortcut/{id}/`
- **OpenAPI operationId**: `file_system_shortcut_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FileSystemShortcutUpdateInput = Parameters<typeof posthog.fileSystemShortcutUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemShortcutUpdateOutput = Awaited<ReturnType<typeof posthog.fileSystemShortcutUpdate>>;

const result: FileSystemShortcutUpdateOutput = await posthog.fileSystemShortcutUpdate();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.fileSystemShortcutReorderCreate`

- **HTTP**: `POST /api/projects/{project_id}/file_system_shortcut/reorder/`
- **What it does**: Set the display order of the current user's shortcuts. `ordered_ids` becomes the new top-to-bottom order; any unknown IDs are rejected.
- **OpenAPI operationId**: `file_system_shortcut_reorder_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FileSystemShortcutReorderCreateInput = Parameters<typeof posthog.fileSystemShortcutReorderCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FileSystemShortcutReorderCreateOutput = Awaited<ReturnType<typeof posthog.fileSystemShortcutReorderCreate>>;

const result: FileSystemShortcutReorderCreateOutput = await posthog.fileSystemShortcutReorderCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: str...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

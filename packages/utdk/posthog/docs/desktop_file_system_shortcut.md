# Desktop File System Shortcut

## Operations

### `posthog.desktopFileSystemShortcutList`

- **HTTP**: `GET /api/projects/{project_id}/desktop_file_system_shortcut/`
- **What it does**: Sidebar shortcuts for the desktop product surface. Reuses all FileSystemShortcutViewSet
behaviour but is scoped to the "desktop" surface, so its shortcuts are fully isolated from
the default "web" surface.
- **OpenAPI operationId**: `desktop_file_system_shortcut_list`
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

type DesktopFileSystemShortcutListInput = Parameters<typeof posthog.desktopFileSystemShortcutList> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemShortcutListOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemShortcutList>>;

const result: DesktopFileSystemShortcutListOutput = await posthog.desktopFileSystemShortcutList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: str...
```

### `posthog.desktopFileSystemShortcutCreate`

- **HTTP**: `POST /api/projects/{project_id}/desktop_file_system_shortcut/`
- **What it does**: Sidebar shortcuts for the desktop product surface. Reuses all FileSystemShortcutViewSet
behaviour but is scoped to the "desktop" surface, so its shortcuts are fully isolated from
the default "web" surface.
- **OpenAPI operationId**: `desktop_file_system_shortcut_create`
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

type DesktopFileSystemShortcutCreateInput = Parameters<typeof posthog.desktopFileSystemShortcutCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemShortcutCreateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemShortcutCreate>>;

const result: DesktopFileSystemShortcutCreateOutput = await posthog.desktopFileSystemShortcutCreate();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.desktopFileSystemShortcutDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/desktop_file_system_shortcut/{id}/`
- **What it does**: Sidebar shortcuts for the desktop product surface. Reuses all FileSystemShortcutViewSet
behaviour but is scoped to the "desktop" surface, so its shortcuts are fully isolated from
the default "web" surface.
- **OpenAPI operationId**: `desktop_file_system_shortcut_destroy`
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

type DesktopFileSystemShortcutDestroyInput = Parameters<typeof posthog.desktopFileSystemShortcutDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemShortcutDestroyOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemShortcutDestroy>>;

const result: DesktopFileSystemShortcutDestroyOutput = await posthog.desktopFileSystemShortcutDestroy();

// Result shape (from schema): unknown
```

### `posthog.desktopFileSystemShortcutRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/desktop_file_system_shortcut/{id}/`
- **What it does**: Sidebar shortcuts for the desktop product surface. Reuses all FileSystemShortcutViewSet
behaviour but is scoped to the "desktop" surface, so its shortcuts are fully isolated from
the default "web" surface.
- **OpenAPI operationId**: `desktop_file_system_shortcut_retrieve`
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

type DesktopFileSystemShortcutRetrieveInput = Parameters<typeof posthog.desktopFileSystemShortcutRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemShortcutRetrieveOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemShortcutRetrieve>>;

const result: DesktopFileSystemShortcutRetrieveOutput = await posthog.desktopFileSystemShortcutRetrieve();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.desktopFileSystemShortcutPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/desktop_file_system_shortcut/{id}/`
- **What it does**: Sidebar shortcuts for the desktop product surface. Reuses all FileSystemShortcutViewSet
behaviour but is scoped to the "desktop" surface, so its shortcuts are fully isolated from
the default "web" surface.
- **OpenAPI operationId**: `desktop_file_system_shortcut_partial_update`
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

type DesktopFileSystemShortcutPartialUpdateInput = Parameters<typeof posthog.desktopFileSystemShortcutPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemShortcutPartialUpdateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemShortcutPartialUpdate>>;

const result: DesktopFileSystemShortcutPartialUpdateOutput = await posthog.desktopFileSystemShortcutPartialUpdate();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.desktopFileSystemShortcutUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/desktop_file_system_shortcut/{id}/`
- **What it does**: Sidebar shortcuts for the desktop product surface. Reuses all FileSystemShortcutViewSet
behaviour but is scoped to the "desktop" surface, so its shortcuts are fully isolated from
the default "web" surface.
- **OpenAPI operationId**: `desktop_file_system_shortcut_update`
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

type DesktopFileSystemShortcutUpdateInput = Parameters<typeof posthog.desktopFileSystemShortcutUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemShortcutUpdateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemShortcutUpdate>>;

const result: DesktopFileSystemShortcutUpdateOutput = await posthog.desktopFileSystemShortcutUpdate();

// Result shape (from schema): { id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: string | null }
```

### `posthog.desktopFileSystemShortcutReorderCreate`

- **HTTP**: `POST /api/projects/{project_id}/desktop_file_system_shortcut/reorder/`
- **What it does**: Set the display order of the current user's shortcuts. `ordered_ids` becomes the new top-to-bottom order; any unknown IDs are rejected.
- **OpenAPI operationId**: `desktop_file_system_shortcut_reorder_create`
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

type DesktopFileSystemShortcutReorderCreateInput = Parameters<typeof posthog.desktopFileSystemShortcutReorderCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DesktopFileSystemShortcutReorderCreateOutput = Awaited<ReturnType<typeof posthog.desktopFileSystemShortcutReorderCreate>>;

const result: DesktopFileSystemShortcutReorderCreateOutput = await posthog.desktopFileSystemShortcutReorderCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: string; type?: string; ref?: string | null; href?: string | null; order?: number; created_at: string; user_access_level: str...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

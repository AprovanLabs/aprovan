# Notebooks

## Operations

### `posthog.notebooksList`

- **HTTP**: `GET /api/projects/{project_id}/notebooks/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_list`
- **Path params**: None
- **Query params**: `contains`, `created_by`, `date_from`, `date_to`, `limit`, `offset`, `user`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; title: string | null; deleted: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type NotebooksListInput = Parameters<typeof posthog.notebooksList> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksListOutput = Awaited<ReturnType<typeof posthog.notebooksList>>;

const result: NotebooksListOutput = await posthog.notebooksList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; title: string | null; deleted: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?...
```

### `posthog.notebooksCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; version?: number; deleted?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: stri...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type NotebooksCreateInput = Parameters<typeof posthog.notebooksCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksCreateOutput = Awaited<ReturnType<typeof posthog.notebooksCreate>>;

const result: NotebooksCreateOutput = await posthog.notebooksCreate();

// Result shape (from schema): { id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; version?: number; deleted?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: stri...
```

### `posthog.notebooksSharingList`

- **HTTP**: `GET /api/projects/{project_id}/notebooks/{notebook_id}/sharing/`
- **OpenAPI operationId**: `notebooks_sharing_list`
- **Path params**: `notebook_id`
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

type NotebooksSharingListInput = Parameters<typeof posthog.notebooksSharingList> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksSharingListOutput = Awaited<ReturnType<typeof posthog.notebooksSharingList>>;

const result: NotebooksSharingListOutput = await posthog.notebooksSharingList();

// Result shape (from schema): ({ created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string;...
```

### `posthog.notebooksSharingPasswordsCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{notebook_id}/sharing/passwords/`
- **What it does**: Create a new password for the sharing configuration.
- **OpenAPI operationId**: `notebooks_sharing_passwords_create`
- **Path params**: `notebook_id`
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

type NotebooksSharingPasswordsCreateInput = Parameters<typeof posthog.notebooksSharingPasswordsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksSharingPasswordsCreateOutput = Awaited<ReturnType<typeof posthog.notebooksSharingPasswordsCreate>>;

const result: NotebooksSharingPasswordsCreateOutput = await posthog.notebooksSharingPasswordsCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.notebooksSharingPasswordsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/notebooks/{notebook_id}/sharing/passwords/{password_id}/`
- **What it does**: Delete a password from the sharing configuration.
- **OpenAPI operationId**: `notebooks_sharing_passwords_destroy`
- **Path params**: `notebook_id`, `password_id`
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

type NotebooksSharingPasswordsDestroyInput = Parameters<typeof posthog.notebooksSharingPasswordsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksSharingPasswordsDestroyOutput = Awaited<ReturnType<typeof posthog.notebooksSharingPasswordsDestroy>>;

const result: NotebooksSharingPasswordsDestroyOutput = await posthog.notebooksSharingPasswordsDestroy();

// Result shape (from schema): unknown
```

### `posthog.notebooksSharingRefreshCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{notebook_id}/sharing/refresh/`
- **OpenAPI operationId**: `notebooks_sharing_refresh_create`
- **Path params**: `notebook_id`
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

type NotebooksSharingRefreshCreateInput = Parameters<typeof posthog.notebooksSharingRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksSharingRefreshCreateOutput = Awaited<ReturnType<typeof posthog.notebooksSharingRefreshCreate>>;

const result: NotebooksSharingRefreshCreateOutput = await posthog.notebooksSharingRefreshCreate();

// Result shape (from schema): { created_at: string; enabled?: boolean; access_token: string | null; settings?: unknown; password_required?: boolean; share_passwords: ({ id: number; created_at: string; note?: string | null; created_by_email: string; ...
```

### `posthog.notebooksDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/notebooks/{short_id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `notebooks_destroy`
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

type NotebooksDestroyInput = Parameters<typeof posthog.notebooksDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksDestroyOutput = Awaited<ReturnType<typeof posthog.notebooksDestroy>>;

const result: NotebooksDestroyOutput = await posthog.notebooksDestroy();

// Result shape (from schema): unknown
```

### `posthog.notebooksRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/notebooks/{short_id}/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; version?: number; deleted?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type NotebooksRetrieveInput = Parameters<typeof posthog.notebooksRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksRetrieveOutput = Awaited<ReturnType<typeof posthog.notebooksRetrieve>>;

const result: NotebooksRetrieveOutput = await posthog.notebooksRetrieve();

// Result shape (from schema): { id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; version?: number; deleted?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: stri...
```

### `posthog.notebooksPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/notebooks/{short_id}/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_partial_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; version?: number; deleted?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type NotebooksPartialUpdateInput = Parameters<typeof posthog.notebooksPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksPartialUpdateOutput = Awaited<ReturnType<typeof posthog.notebooksPartialUpdate>>;

const result: NotebooksPartialUpdateOutput = await posthog.notebooksPartialUpdate();

// Result shape (from schema): { id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; version?: number; deleted?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: stri...
```

### `posthog.notebooksUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/notebooks/{short_id}/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_update`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; version?: number; deleted?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type NotebooksUpdateInput = Parameters<typeof posthog.notebooksUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksUpdateOutput = Awaited<ReturnType<typeof posthog.notebooksUpdate>>;

const result: NotebooksUpdateOutput = await posthog.notebooksUpdate();

// Result shape (from schema): { id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; version?: number; deleted?: boolean; created_at: string; created_by: { id: number; uuid: string; distinct_id?: stri...
```

### `posthog.notebooksActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/notebooks/{short_id}/activity/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_activity_retrieve`
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

type NotebooksActivityRetrieveInput = Parameters<typeof posthog.notebooksActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.notebooksActivityRetrieve>>;

const result: NotebooksActivityRetrieveOutput = await posthog.notebooksActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.notebooksCollabMarkdownSaveCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{short_id}/collab/markdown_save/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_collab_markdown_save_create`
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

type NotebooksCollabMarkdownSaveCreateInput = Parameters<typeof posthog.notebooksCollabMarkdownSaveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksCollabMarkdownSaveCreateOutput = Awaited<ReturnType<typeof posthog.notebooksCollabMarkdownSaveCreate>>;

const result: NotebooksCollabMarkdownSaveCreateOutput = await posthog.notebooksCollabMarkdownSaveCreate();

// Result shape (from schema): unknown
```

### `posthog.notebooksCollabPresenceCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{short_id}/collab/presence/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_collab_presence_create`
- **Path params**: `short_id`
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

type NotebooksCollabPresenceCreateInput = Parameters<typeof posthog.notebooksCollabPresenceCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksCollabPresenceCreateOutput = Awaited<ReturnType<typeof posthog.notebooksCollabPresenceCreate>>;

const result: NotebooksCollabPresenceCreateOutput = await posthog.notebooksCollabPresenceCreate();

// Result shape (from schema): unknown
```

### `posthog.notebooksCollabSaveCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{short_id}/collab/save/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_collab_save_create`
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

type NotebooksCollabSaveCreateInput = Parameters<typeof posthog.notebooksCollabSaveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksCollabSaveCreateOutput = Awaited<ReturnType<typeof posthog.notebooksCollabSaveCreate>>;

const result: NotebooksCollabSaveCreateOutput = await posthog.notebooksCollabSaveCreate();

// Result shape (from schema): unknown
```

### `posthog.notebooksCollabStreamRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/notebooks/{short_id}/collab/stream/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_collab_stream_retrieve`
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

type NotebooksCollabStreamRetrieveInput = Parameters<typeof posthog.notebooksCollabStreamRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksCollabStreamRetrieveOutput = Awaited<ReturnType<typeof posthog.notebooksCollabStreamRetrieve>>;

const result: NotebooksCollabStreamRetrieveOutput = await posthog.notebooksCollabStreamRetrieve();

// Result shape (from schema): unknown
```

### `posthog.notebooksHogqlExecuteCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{short_id}/hogql/execute/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_hogql_execute_create`
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

type NotebooksHogqlExecuteCreateInput = Parameters<typeof posthog.notebooksHogqlExecuteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksHogqlExecuteCreateOutput = Awaited<ReturnType<typeof posthog.notebooksHogqlExecuteCreate>>;

const result: NotebooksHogqlExecuteCreateOutput = await posthog.notebooksHogqlExecuteCreate();

// Result shape (from schema): unknown
```

### `posthog.notebooksKernelConfigCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{short_id}/kernel/config/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_kernel_config_create`
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

type NotebooksKernelConfigCreateInput = Parameters<typeof posthog.notebooksKernelConfigCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksKernelConfigCreateOutput = Awaited<ReturnType<typeof posthog.notebooksKernelConfigCreate>>;

const result: NotebooksKernelConfigCreateOutput = await posthog.notebooksKernelConfigCreate();

// Result shape (from schema): unknown
```

### `posthog.notebooksKernelDataframeRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/notebooks/{short_id}/kernel/dataframe/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_kernel_dataframe_retrieve`
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

type NotebooksKernelDataframeRetrieveInput = Parameters<typeof posthog.notebooksKernelDataframeRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksKernelDataframeRetrieveOutput = Awaited<ReturnType<typeof posthog.notebooksKernelDataframeRetrieve>>;

const result: NotebooksKernelDataframeRetrieveOutput = await posthog.notebooksKernelDataframeRetrieve();

// Result shape (from schema): unknown
```

### `posthog.notebooksKernelExecuteCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{short_id}/kernel/execute/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_kernel_execute_create`
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

type NotebooksKernelExecuteCreateInput = Parameters<typeof posthog.notebooksKernelExecuteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksKernelExecuteCreateOutput = Awaited<ReturnType<typeof posthog.notebooksKernelExecuteCreate>>;

const result: NotebooksKernelExecuteCreateOutput = await posthog.notebooksKernelExecuteCreate();

// Result shape (from schema): unknown
```

### `posthog.notebooksKernelExecuteStreamCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{short_id}/kernel/execute/stream/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_kernel_execute_stream_create`
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

type NotebooksKernelExecuteStreamCreateInput = Parameters<typeof posthog.notebooksKernelExecuteStreamCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksKernelExecuteStreamCreateOutput = Awaited<ReturnType<typeof posthog.notebooksKernelExecuteStreamCreate>>;

const result: NotebooksKernelExecuteStreamCreateOutput = await posthog.notebooksKernelExecuteStreamCreate();

// Result shape (from schema): unknown
```

### `posthog.notebooksKernelRestartCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{short_id}/kernel/restart/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_kernel_restart_create`
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

type NotebooksKernelRestartCreateInput = Parameters<typeof posthog.notebooksKernelRestartCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksKernelRestartCreateOutput = Awaited<ReturnType<typeof posthog.notebooksKernelRestartCreate>>;

const result: NotebooksKernelRestartCreateOutput = await posthog.notebooksKernelRestartCreate();

// Result shape (from schema): unknown
```

### `posthog.notebooksKernelStartCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{short_id}/kernel/start/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_kernel_start_create`
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

type NotebooksKernelStartCreateInput = Parameters<typeof posthog.notebooksKernelStartCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksKernelStartCreateOutput = Awaited<ReturnType<typeof posthog.notebooksKernelStartCreate>>;

const result: NotebooksKernelStartCreateOutput = await posthog.notebooksKernelStartCreate();

// Result shape (from schema): unknown
```

### `posthog.notebooksKernelStatusRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/notebooks/{short_id}/kernel/status/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_kernel_status_retrieve`
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

type NotebooksKernelStatusRetrieveInput = Parameters<typeof posthog.notebooksKernelStatusRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksKernelStatusRetrieveOutput = Awaited<ReturnType<typeof posthog.notebooksKernelStatusRetrieve>>;

const result: NotebooksKernelStatusRetrieveOutput = await posthog.notebooksKernelStatusRetrieve();

// Result shape (from schema): unknown
```

### `posthog.notebooksKernelStopCreate`

- **HTTP**: `POST /api/projects/{project_id}/notebooks/{short_id}/kernel/stop/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_kernel_stop_create`
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

type NotebooksKernelStopCreateInput = Parameters<typeof posthog.notebooksKernelStopCreate> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksKernelStopCreateOutput = Awaited<ReturnType<typeof posthog.notebooksKernelStopCreate>>;

const result: NotebooksKernelStopCreateOutput = await posthog.notebooksKernelStopCreate();

// Result shape (from schema): unknown
```

### `posthog.notebooksAllActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/notebooks/activity/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_all_activity_retrieve`
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

type NotebooksAllActivityRetrieveInput = Parameters<typeof posthog.notebooksAllActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksAllActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.notebooksAllActivityRetrieve>>;

const result: NotebooksAllActivityRetrieveOutput = await posthog.notebooksAllActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.notebooksRecordingCommentsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/notebooks/recording_comments/`
- **What it does**: The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.
- **OpenAPI operationId**: `notebooks_recording_comments_retrieve`
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

type NotebooksRecordingCommentsRetrieveInput = Parameters<typeof posthog.notebooksRecordingCommentsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type NotebooksRecordingCommentsRetrieveOutput = Awaited<ReturnType<typeof posthog.notebooksRecordingCommentsRetrieve>>;

const result: NotebooksRecordingCommentsRetrieveOutput = await posthog.notebooksRecordingCommentsRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

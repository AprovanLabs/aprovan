# Task Channels

## Operations

### `posthog.taskChannelsList`

- **HTTP**: `GET /api/projects/{project_id}/task_channels/`
- **What it does**: List channels
- **OpenAPI operationId**: `task_channels_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; channel_type: string; created_at: string; created_by?: { id: number; uuid: string; distinct_id: string; first_name: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaskChannelsListInput = Parameters<typeof posthog.taskChannelsList> extends [infer T, ...unknown[]] ? T : undefined;
type TaskChannelsListOutput = Awaited<ReturnType<typeof posthog.taskChannelsList>>;

const result: TaskChannelsListOutput = await posthog.taskChannelsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; channel_type: string; created_at: string; created_by?: { id: number; uuid: string; distinct_id: string; first_name: ...
```

### `posthog.taskChannelsCreate`

- **HTTP**: `POST /api/projects/{project_id}/task_channels/`
- **What it does**: Resolve or create a public channel
- **OpenAPI operationId**: `task_channels_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; channel_type: string; created_at: string; created_by?: { id: number; uuid: string; distinct_id: string; first_name: string; last_name: string; email: string; is_email_verified?: boolean | nul...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaskChannelsCreateInput = Parameters<typeof posthog.taskChannelsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TaskChannelsCreateOutput = Awaited<ReturnType<typeof posthog.taskChannelsCreate>>;

const result: TaskChannelsCreateOutput = await posthog.taskChannelsCreate();

// Result shape (from schema): { id: string; name: string; channel_type: string; created_at: string; created_by?: { id: number; uuid: string; distinct_id: string; first_name: string; last_name: string; email: string; is_email_verified?: boolean | nul...
```

### `posthog.taskChannelsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/task_channels/{id}/`
- **What it does**: Delete a public channel
- **OpenAPI operationId**: `task_channels_destroy`
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

type TaskChannelsDestroyInput = Parameters<typeof posthog.taskChannelsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type TaskChannelsDestroyOutput = Awaited<ReturnType<typeof posthog.taskChannelsDestroy>>;

const result: TaskChannelsDestroyOutput = await posthog.taskChannelsDestroy();

// Result shape (from schema): unknown
```

### `posthog.taskChannelsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/task_channels/{id}/`
- **What it does**: Rename a public channel
- **OpenAPI operationId**: `task_channels_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; channel_type: string; created_at: string; created_by?: { id: number; uuid: string; distinct_id: string; first_name: string; last_name: string; email: string; is_email_verified?: boolean | nul...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaskChannelsPartialUpdateInput = Parameters<typeof posthog.taskChannelsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type TaskChannelsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.taskChannelsPartialUpdate>>;

const result: TaskChannelsPartialUpdateOutput = await posthog.taskChannelsPartialUpdate();

// Result shape (from schema): { id: string; name: string; channel_type: string; created_at: string; created_by?: { id: number; uuid: string; distinct_id: string; first_name: string; last_name: string; email: string; is_email_verified?: boolean | nul...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

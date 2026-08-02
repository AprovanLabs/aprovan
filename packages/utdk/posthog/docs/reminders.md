# Reminders

## Operations

### `posthog.remindersList`

- **HTTP**: `GET /api/reminders/`
- **OpenAPI operationId**: `reminders_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; organization: string; team?: number | null; title: string; message?: string; resource_type?: string | null; resource_id?: string |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RemindersListInput = Parameters<typeof posthog.remindersList> extends [infer T, ...unknown[]] ? T : undefined;
type RemindersListOutput = Awaited<ReturnType<typeof posthog.remindersList>>;

const result: RemindersListOutput = await posthog.remindersList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; organization: string; team?: number | null; title: string; message?: string; resource_type?: string | null; resource_id?: string |...
```

### `posthog.remindersCreate`

- **HTTP**: `POST /api/reminders/`
- **OpenAPI operationId**: `reminders_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; organization: string; team?: number | null; title: string; message?: string; resource_type?: string | null; resource_id?: string | null; scheduled_at?: string | null; recurrence_interval?: "daily" | "weekl...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type RemindersCreateInput = Parameters<typeof posthog.remindersCreate> extends [infer T, ...unknown[]] ? T : undefined;
type RemindersCreateOutput = Awaited<ReturnType<typeof posthog.remindersCreate>>;

const result: RemindersCreateOutput = await posthog.remindersCreate();

// Result shape (from schema): { id: string; organization: string; team?: number | null; title: string; message?: string; resource_type?: string | null; resource_id?: string | null; scheduled_at?: string | null; recurrence_interval?: "daily" | "weekl...
```

### `posthog.remindersDestroy`

- **HTTP**: `DELETE /api/reminders/{id}/`
- **OpenAPI operationId**: `reminders_destroy`
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

type RemindersDestroyInput = Parameters<typeof posthog.remindersDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type RemindersDestroyOutput = Awaited<ReturnType<typeof posthog.remindersDestroy>>;

const result: RemindersDestroyOutput = await posthog.remindersDestroy();

// Result shape (from schema): unknown
```

### `posthog.remindersRetrieve`

- **HTTP**: `GET /api/reminders/{id}/`
- **OpenAPI operationId**: `reminders_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; organization: string; team?: number | null; title: string; message?: string; resource_type?: string | null; resource_id?: string | null; scheduled_at?: string | null; recurrence_interval?: "daily" | "weekl...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RemindersRetrieveInput = Parameters<typeof posthog.remindersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type RemindersRetrieveOutput = Awaited<ReturnType<typeof posthog.remindersRetrieve>>;

const result: RemindersRetrieveOutput = await posthog.remindersRetrieve();

// Result shape (from schema): { id: string; organization: string; team?: number | null; title: string; message?: string; resource_type?: string | null; resource_id?: string | null; scheduled_at?: string | null; recurrence_interval?: "daily" | "weekl...
```

### `posthog.remindersPartialUpdate`

- **HTTP**: `PATCH /api/reminders/{id}/`
- **OpenAPI operationId**: `reminders_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; organization: string; team?: number | null; title: string; message?: string; resource_type?: string | null; resource_id?: string | null; scheduled_at?: string | null; recurrence_interval?: "daily" | "weekl...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RemindersPartialUpdateInput = Parameters<typeof posthog.remindersPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type RemindersPartialUpdateOutput = Awaited<ReturnType<typeof posthog.remindersPartialUpdate>>;

const result: RemindersPartialUpdateOutput = await posthog.remindersPartialUpdate();

// Result shape (from schema): { id: string; organization: string; team?: number | null; title: string; message?: string; resource_type?: string | null; resource_id?: string | null; scheduled_at?: string | null; recurrence_interval?: "daily" | "weekl...
```

### `posthog.remindersUpdate`

- **HTTP**: `PUT /api/reminders/{id}/`
- **OpenAPI operationId**: `reminders_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; organization: string; team?: number | null; title: string; message?: string; resource_type?: string | null; resource_id?: string | null; scheduled_at?: string | null; recurrence_interval?: "daily" | "weekl...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RemindersUpdateInput = Parameters<typeof posthog.remindersUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type RemindersUpdateOutput = Awaited<ReturnType<typeof posthog.remindersUpdate>>;

const result: RemindersUpdateOutput = await posthog.remindersUpdate();

// Result shape (from schema): { id: string; organization: string; team?: number | null; title: string; message?: string; resource_type?: string | null; resource_id?: string | null; scheduled_at?: string | null; recurrence_interval?: "daily" | "weekl...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

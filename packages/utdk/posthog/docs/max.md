# Max

## Operations

### `posthog.environmentsConversationsList`

- **HTTP**: `GET /api/environments/{environment_id}/conversations/`
- **OpenAPI operationId**: `environments_conversations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsListInput = Parameters<typeof posthog.environmentsConversationsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsListOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsList>>;

const result: EnvironmentsConversationsListOutput = await posthog.environmentsConversationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay...
```

### `posthog.environmentsConversationsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/conversations/`
- **What it does**: Unified endpoint that handles both conversation creation and streaming.

- If message is provided: Start new conversation processing
- If no message: Stream from existing conversation
- **OpenAPI operationId**: `environments_conversations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ content: string | null; conversation: string; contextual_tools?: { [key: string]: unknown }; ui_context?: unknown; billing_context?: unknown; trace_id: string; session_id?: string; agent_mode?: "product_analytics" | "...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsCreateInput = Parameters<typeof posthog.environmentsConversationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsCreate>>;

const result: EnvironmentsConversationsCreateOutput = await posthog.environmentsConversationsCreate();

// Result shape (from schema): { content: string | null; conversation: string; contextual_tools?: { [key: string]: unknown }; ui_context?: unknown; billing_context?: unknown; trace_id: string; session_id?: string; agent_mode?: "product_analytics" | "...
```

### `posthog.environmentsConversationsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/conversations/{conversation}/`
- **What it does**: Delete a conversation.
- **OpenAPI operationId**: `environments_conversations_destroy`
- **Path params**: `conversation`
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

type EnvironmentsConversationsDestroyInput = Parameters<typeof posthog.environmentsConversationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsDestroy>>;

const result: EnvironmentsConversationsDestroyOutput = await posthog.environmentsConversationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsConversationsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/conversations/{conversation}/`
- **OpenAPI operationId**: `environments_conversations_retrieve`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsRetrieveInput = Parameters<typeof posthog.environmentsConversationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsRetrieve>>;

const result: EnvironmentsConversationsRetrieveOutput = await posthog.environmentsConversationsRetrieve();

// Result shape (from schema): { id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...
```

### `posthog.environmentsConversationsAppendMessageCreate`

- **HTTP**: `POST /api/environments/{environment_id}/conversations/{conversation}/append_message/`
- **What it does**: Appends a message to an existing conversation without triggering AI processing.
This is used for client-side generated messages that need to be persisted
(e.g., support ticket confirmation messages).
- **OpenAPI operationId**: `environments_conversations_append_message_create`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ content: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsAppendMessageCreateInput = Parameters<typeof posthog.environmentsConversationsAppendMessageCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsAppendMessageCreateOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsAppendMessageCreate>>;

const result: EnvironmentsConversationsAppendMessageCreateOutput = await posthog.environmentsConversationsAppendMessageCreate();

// Result shape (from schema): { content: string }
```

### `posthog.environmentsConversationsCancelPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/conversations/{conversation}/cancel/`
- **What it does**: Cancel the conversation's in-progress LangGraph run.
- **OpenAPI operationId**: `environments_conversations_cancel_partial_update`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `204`, `422`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`, `422`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsCancelPartialUpdateInput = Parameters<typeof posthog.environmentsConversationsCancelPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsCancelPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsCancelPartialUpdate>>;

const result: EnvironmentsConversationsCancelPartialUpdateOutput = await posthog.environmentsConversationsCancelPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsConversationsOpenCreate`

- **HTTP**: `POST /api/environments/{environment_id}/conversations/{conversation}/open/`
- **What it does**: Create-or-resume a sandbox conversation — the single sandbox session opener. With `content`, processes the turn (first message, in-progress follow-up, or terminal resume); without `content`, warms a sandbox that idles awaiting the first message. Returns the `(task, run)` handle the frontend opens SSE against. The conversation row is created on first use from the URL id.
- **OpenAPI operationId**: `environments_conversations_open_create`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`, `204`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ task_id: string; run_id: string; trace_id: string | null; run_status: string; just_created_run: boolean }`
- OpenAPI response codes: `200`, `204`, `400`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsOpenCreateInput = Parameters<typeof posthog.environmentsConversationsOpenCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsOpenCreateOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsOpenCreate>>;

const result: EnvironmentsConversationsOpenCreateOutput = await posthog.environmentsConversationsOpenCreate();

// Result shape (from schema): { task_id: string; run_id: string; trace_id: string | null; run_status: string; just_created_run: boolean }
```

### `posthog.environmentsConversationsQueueRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/conversations/{conversation}/queue/`
- **OpenAPI operationId**: `environments_conversations_queue_retrieve`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsQueueRetrieveInput = Parameters<typeof posthog.environmentsConversationsQueueRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsQueueRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsQueueRetrieve>>;

const result: EnvironmentsConversationsQueueRetrieveOutput = await posthog.environmentsConversationsQueueRetrieve();

// Result shape (from schema): { id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...
```

### `posthog.environmentsConversationsQueueCreate`

- **HTTP**: `POST /api/environments/{environment_id}/conversations/{conversation}/queue/`
- **OpenAPI operationId**: `environments_conversations_queue_create`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsQueueCreateInput = Parameters<typeof posthog.environmentsConversationsQueueCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsQueueCreateOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsQueueCreate>>;

const result: EnvironmentsConversationsQueueCreateOutput = await posthog.environmentsConversationsQueueCreate();

// Result shape (from schema): { id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...
```

### `posthog.environmentsConversationsQueueDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/conversations/{conversation}/queue/{queue_id}/`
- **OpenAPI operationId**: `environments_conversations_queue_destroy`
- **Path params**: `conversation`, `queue_id`
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

type EnvironmentsConversationsQueueDestroyInput = Parameters<typeof posthog.environmentsConversationsQueueDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsQueueDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsQueueDestroy>>;

const result: EnvironmentsConversationsQueueDestroyOutput = await posthog.environmentsConversationsQueueDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsConversationsQueuePartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/conversations/{conversation}/queue/{queue_id}/`
- **OpenAPI operationId**: `environments_conversations_queue_partial_update`
- **Path params**: `conversation`, `queue_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsQueuePartialUpdateInput = Parameters<typeof posthog.environmentsConversationsQueuePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsQueuePartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsQueuePartialUpdate>>;

const result: EnvironmentsConversationsQueuePartialUpdateOutput = await posthog.environmentsConversationsQueuePartialUpdate();

// Result shape (from schema): { id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...
```

### `posthog.environmentsConversationsQueueClearCreate`

- **HTTP**: `POST /api/environments/{environment_id}/conversations/{conversation}/queue/clear/`
- **OpenAPI operationId**: `environments_conversations_queue_clear_create`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsQueueClearCreateInput = Parameters<typeof posthog.environmentsConversationsQueueClearCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsQueueClearCreateOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsQueueClearCreate>>;

const result: EnvironmentsConversationsQueueClearCreateOutput = await posthog.environmentsConversationsQueueClearCreate();

// Result shape (from schema): { id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...
```

### `posthog.conversationsList`

- **HTTP**: `GET /api/projects/{project_id}/conversations/`
- **OpenAPI operationId**: `conversations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsListInput = Parameters<typeof posthog.conversationsList> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsListOutput = Awaited<ReturnType<typeof posthog.conversationsList>>;

const result: ConversationsListOutput = await posthog.conversationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay...
```

### `posthog.conversationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/`
- **What it does**: Unified endpoint that handles both conversation creation and streaming.

- If message is provided: Start new conversation processing
- If no message: Stream from existing conversation
- **OpenAPI operationId**: `conversations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ content: string | null; conversation: string; contextual_tools?: { [key: string]: unknown }; ui_context?: unknown; billing_context?: unknown; trace_id: string; session_id?: string; agent_mode?: "product_analytics" | "...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ConversationsCreateInput = Parameters<typeof posthog.conversationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsCreateOutput = Awaited<ReturnType<typeof posthog.conversationsCreate>>;

const result: ConversationsCreateOutput = await posthog.conversationsCreate();

// Result shape (from schema): { content: string | null; conversation: string; contextual_tools?: { [key: string]: unknown }; ui_context?: unknown; billing_context?: unknown; trace_id: string; session_id?: string; agent_mode?: "product_analytics" | "...
```

### `posthog.conversationsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/conversations/{conversation}/`
- **What it does**: Delete a conversation.
- **OpenAPI operationId**: `conversations_destroy`
- **Path params**: `conversation`
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

type ConversationsDestroyInput = Parameters<typeof posthog.conversationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsDestroyOutput = Awaited<ReturnType<typeof posthog.conversationsDestroy>>;

const result: ConversationsDestroyOutput = await posthog.conversationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.conversationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/conversations/{conversation}/`
- **OpenAPI operationId**: `conversations_retrieve`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsRetrieveInput = Parameters<typeof posthog.conversationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsRetrieveOutput = Awaited<ReturnType<typeof posthog.conversationsRetrieve>>;

const result: ConversationsRetrieveOutput = await posthog.conversationsRetrieve();

// Result shape (from schema): { id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...
```

### `posthog.conversationsAppendMessageCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/{conversation}/append_message/`
- **What it does**: Appends a message to an existing conversation without triggering AI processing.
This is used for client-side generated messages that need to be persisted
(e.g., support ticket confirmation messages).
- **OpenAPI operationId**: `conversations_append_message_create`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ content: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsAppendMessageCreateInput = Parameters<typeof posthog.conversationsAppendMessageCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsAppendMessageCreateOutput = Awaited<ReturnType<typeof posthog.conversationsAppendMessageCreate>>;

const result: ConversationsAppendMessageCreateOutput = await posthog.conversationsAppendMessageCreate();

// Result shape (from schema): { content: string }
```

### `posthog.conversationsCancelPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/conversations/{conversation}/cancel/`
- **What it does**: Cancel the conversation's in-progress LangGraph run.
- **OpenAPI operationId**: `conversations_cancel_partial_update`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `204`, `422`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`, `422`

```ts
import posthog from "@utdk/posthog";

type ConversationsCancelPartialUpdateInput = Parameters<typeof posthog.conversationsCancelPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsCancelPartialUpdateOutput = Awaited<ReturnType<typeof posthog.conversationsCancelPartialUpdate>>;

const result: ConversationsCancelPartialUpdateOutput = await posthog.conversationsCancelPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.conversationsOpenCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/{conversation}/open/`
- **What it does**: Create-or-resume a sandbox conversation — the single sandbox session opener. With `content`, processes the turn (first message, in-progress follow-up, or terminal resume); without `content`, warms a sandbox that idles awaiting the first message. Returns the `(task, run)` handle the frontend opens SSE against. The conversation row is created on first use from the URL id.
- **OpenAPI operationId**: `conversations_open_create`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`, `204`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ task_id: string; run_id: string; trace_id: string | null; run_status: string; just_created_run: boolean }`
- OpenAPI response codes: `200`, `204`, `400`

```ts
import posthog from "@utdk/posthog";

type ConversationsOpenCreateInput = Parameters<typeof posthog.conversationsOpenCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsOpenCreateOutput = Awaited<ReturnType<typeof posthog.conversationsOpenCreate>>;

const result: ConversationsOpenCreateOutput = await posthog.conversationsOpenCreate();

// Result shape (from schema): { task_id: string; run_id: string; trace_id: string | null; run_status: string; just_created_run: boolean }
```

### `posthog.conversationsQueueRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/conversations/{conversation}/queue/`
- **OpenAPI operationId**: `conversations_queue_retrieve`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsQueueRetrieveInput = Parameters<typeof posthog.conversationsQueueRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsQueueRetrieveOutput = Awaited<ReturnType<typeof posthog.conversationsQueueRetrieve>>;

const result: ConversationsQueueRetrieveOutput = await posthog.conversationsQueueRetrieve();

// Result shape (from schema): { id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...
```

### `posthog.conversationsQueueCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/{conversation}/queue/`
- **OpenAPI operationId**: `conversations_queue_create`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsQueueCreateInput = Parameters<typeof posthog.conversationsQueueCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsQueueCreateOutput = Awaited<ReturnType<typeof posthog.conversationsQueueCreate>>;

const result: ConversationsQueueCreateOutput = await posthog.conversationsQueueCreate();

// Result shape (from schema): { id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...
```

### `posthog.conversationsQueueDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/conversations/{conversation}/queue/{queue_id}/`
- **OpenAPI operationId**: `conversations_queue_destroy`
- **Path params**: `conversation`, `queue_id`
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

type ConversationsQueueDestroyInput = Parameters<typeof posthog.conversationsQueueDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsQueueDestroyOutput = Awaited<ReturnType<typeof posthog.conversationsQueueDestroy>>;

const result: ConversationsQueueDestroyOutput = await posthog.conversationsQueueDestroy();

// Result shape (from schema): unknown
```

### `posthog.conversationsQueuePartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/conversations/{conversation}/queue/{queue_id}/`
- **OpenAPI operationId**: `conversations_queue_partial_update`
- **Path params**: `conversation`, `queue_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsQueuePartialUpdateInput = Parameters<typeof posthog.conversationsQueuePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsQueuePartialUpdateOutput = Awaited<ReturnType<typeof posthog.conversationsQueuePartialUpdate>>;

const result: ConversationsQueuePartialUpdateOutput = await posthog.conversationsQueuePartialUpdate();

// Result shape (from schema): { id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...
```

### `posthog.conversationsQueueClearCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/{conversation}/queue/clear/`
- **OpenAPI operationId**: `conversations_queue_clear_create`
- **Path params**: `conversation`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsQueueClearCreateInput = Parameters<typeof posthog.conversationsQueueClearCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsQueueClearCreateOutput = Awaited<ReturnType<typeof posthog.conversationsQueueClearCreate>>;

const result: ConversationsQueueClearCreateOutput = await posthog.conversationsQueueClearCreate();

// Result shape (from schema): { id: string; status: "idle" | "in_progress" | "canceling"; title: string | null; topic: "web_analytics" | "product_analytics" | "session_replay" | "surveys" | "feature_flags" | "experiments" | "error_tracking" | "data_...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

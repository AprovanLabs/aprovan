# Conversations

## Operations

### `posthog.environmentsConversationsViewsList`

- **HTTP**: `GET /api/environments/{environment_id}/conversations/views/`
- **OpenAPI operationId**: `environments_conversations_views_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsViewsListInput = Parameters<typeof posthog.environmentsConversationsViewsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsViewsListOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsViewsList>>;

const result: EnvironmentsConversationsViewsListOutput = await posthog.environmentsConversationsViewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; ...
```

### `posthog.environmentsConversationsViewsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/conversations/views/`
- **OpenAPI operationId**: `environments_conversations_views_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsViewsCreateInput = Parameters<typeof posthog.environmentsConversationsViewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsViewsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsViewsCreate>>;

const result: EnvironmentsConversationsViewsCreateOutput = await posthog.environmentsConversationsViewsCreate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email...
```

### `posthog.environmentsConversationsViewsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/conversations/views/{short_id}/`
- **OpenAPI operationId**: `environments_conversations_views_destroy`
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

type EnvironmentsConversationsViewsDestroyInput = Parameters<typeof posthog.environmentsConversationsViewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsViewsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsViewsDestroy>>;

const result: EnvironmentsConversationsViewsDestroyOutput = await posthog.environmentsConversationsViewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsConversationsViewsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/conversations/views/{short_id}/`
- **OpenAPI operationId**: `environments_conversations_views_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsConversationsViewsRetrieveInput = Parameters<typeof posthog.environmentsConversationsViewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsConversationsViewsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsConversationsViewsRetrieve>>;

const result: EnvironmentsConversationsViewsRetrieveOutput = await posthog.environmentsConversationsViewsRetrieve();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email...
```

### `posthog.conversationsTicketsList`

- **HTTP**: `GET /api/projects/{project_id}/conversations/tickets/`
- **What it does**: List tickets with person data attached.
- **OpenAPI operationId**: `conversations_tickets_list`
- **Path params**: None
- **Query params**: `assignee`, `channel_detail`, `channel_source`, `date_from`, `date_to`, `distinct_ids`, `limit`, `offset`, `order_by`, `priority`, `search`, `sla`, `status`, `tags`, `tags_all`, `tags_exclude`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsListInput = Parameters<typeof posthog.conversationsTicketsList> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsListOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsList>>;

const result: ConversationsTicketsListOutput = await posthog.conversationsTicketsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" ...
```

### `posthog.conversationsTicketsCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/tickets/`
- **OpenAPI operationId**: `conversations_tickets_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" | "slack_bot_mention" | "slack_emoji_reaction" | "teams_channel_message" | ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsCreateInput = Parameters<typeof posthog.conversationsTicketsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsCreateOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsCreate>>;

const result: ConversationsTicketsCreateOutput = await posthog.conversationsTicketsCreate();

// Result shape (from schema): { id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" | "slack_bot_mention" | "slack_emoji_reaction" | "teams_channel_message" | ...
```

### `posthog.conversationsTicketsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/conversations/tickets/{id}/`
- **OpenAPI operationId**: `conversations_tickets_destroy`
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

type ConversationsTicketsDestroyInput = Parameters<typeof posthog.conversationsTicketsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsDestroyOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsDestroy>>;

const result: ConversationsTicketsDestroyOutput = await posthog.conversationsTicketsDestroy();

// Result shape (from schema): unknown
```

### `posthog.conversationsTicketsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/conversations/tickets/{id}/`
- **What it does**: Get single ticket and mark as read by team.
- **OpenAPI operationId**: `conversations_tickets_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" | "slack_bot_mention" | "slack_emoji_reaction" | "teams_channel_message" | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsRetrieveInput = Parameters<typeof posthog.conversationsTicketsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsRetrieveOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsRetrieve>>;

const result: ConversationsTicketsRetrieveOutput = await posthog.conversationsTicketsRetrieve();

// Result shape (from schema): { id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" | "slack_bot_mention" | "slack_emoji_reaction" | "teams_channel_message" | ...
```

### `posthog.conversationsTicketsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/conversations/tickets/{id}/`
- **OpenAPI operationId**: `conversations_tickets_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" | "slack_bot_mention" | "slack_emoji_reaction" | "teams_channel_message" | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsPartialUpdateInput = Parameters<typeof posthog.conversationsTicketsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsPartialUpdate>>;

const result: ConversationsTicketsPartialUpdateOutput = await posthog.conversationsTicketsPartialUpdate();

// Result shape (from schema): { id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" | "slack_bot_mention" | "slack_emoji_reaction" | "teams_channel_message" | ...
```

### `posthog.conversationsTicketsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/conversations/tickets/{id}/`
- **What it does**: Handle ticket updates including assignee changes.
- **OpenAPI operationId**: `conversations_tickets_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" | "slack_bot_mention" | "slack_emoji_reaction" | "teams_channel_message" | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsUpdateInput = Parameters<typeof posthog.conversationsTicketsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsUpdateOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsUpdate>>;

const result: ConversationsTicketsUpdateOutput = await posthog.conversationsTicketsUpdate();

// Result shape (from schema): { id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" | "slack_bot_mention" | "slack_emoji_reaction" | "teams_channel_message" | ...
```

### `posthog.conversationsTicketsAiFeedbackCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/tickets/{id}/ai_feedback/`
- **What it does**: Record reviewer feedback on an AI reply, captured to the internal analytics project.
- **OpenAPI operationId**: `conversations_tickets_ai_feedback_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsAiFeedbackCreateInput = Parameters<typeof posthog.conversationsTicketsAiFeedbackCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsAiFeedbackCreateOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsAiFeedbackCreate>>;

const result: ConversationsTicketsAiFeedbackCreateOutput = await posthog.conversationsTicketsAiFeedbackCreate();

// Result shape (from schema): unknown
```

### `posthog.conversationsTicketsMessagesList`

- **HTTP**: `GET /api/projects/{project_id}/conversations/tickets/{id}/messages/`
- **What it does**: Return the message thread for a ticket, ordered chronologically (paginated).
- **OpenAPI operationId**: `conversations_tickets_messages_list`
- **Path params**: `id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; content: string; rich_content: unknown; author_type: string; author_name: string; is_private: boolean; created_at: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsMessagesListInput = Parameters<typeof posthog.conversationsTicketsMessagesList> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsMessagesListOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsMessagesList>>;

const result: ConversationsTicketsMessagesListOutput = await posthog.conversationsTicketsMessagesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; content: string; rich_content: unknown; author_type: string; author_name: string; is_private: boolean; created_at: string })[] }
```

### `posthog.conversationsTicketsReplyCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/tickets/{id}/reply/`
- **What it does**: Post a reply or internal note to a ticket.

With is_private=false, the reply is delivered to the customer via the
ticket's channel (email, Slack, Teams, GitHub). With is_private=true,
the message is stored as an internal note only visible to team members.
- **OpenAPI operationId**: `conversations_tickets_reply_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; content: string; rich_content: unknown; author_type: string; author_name: string; is_private: boolean; created_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsReplyCreateInput = Parameters<typeof posthog.conversationsTicketsReplyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsReplyCreateOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsReplyCreate>>;

const result: ConversationsTicketsReplyCreateOutput = await posthog.conversationsTicketsReplyCreate();

// Result shape (from schema): { id: string; content: string; rich_content: unknown; author_type: string; author_name: string; is_private: boolean; created_at: string }
```

### `posthog.conversationsTicketsBulkUpdateStatusCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/tickets/bulk_update_status/`
- **What it does**: Update the status of multiple tickets in a single request.

Only tickets belonging to the current team are affected; other-team UUIDs
are silently ignored.  Tickets already in the requested status are skipped.
- **OpenAPI operationId**: `conversations_tickets_bulk_update_status_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ updated: number; ids: (string)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsBulkUpdateStatusCreateInput = Parameters<typeof posthog.conversationsTicketsBulkUpdateStatusCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsBulkUpdateStatusCreateOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsBulkUpdateStatusCreate>>;

const result: ConversationsTicketsBulkUpdateStatusCreateOutput = await posthog.conversationsTicketsBulkUpdateStatusCreate();

// Result shape (from schema): { updated: number; ids: (string)[] }
```

### `posthog.conversationsTicketsBulkUpdateTagsCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/tickets/bulk_update_tags/`
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
- **OpenAPI operationId**: `conversations_tickets_bulk_update_tags_create`
- **Path params**: None
- **Query params**: None
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

type ConversationsTicketsBulkUpdateTagsCreateInput = Parameters<typeof posthog.conversationsTicketsBulkUpdateTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsBulkUpdateTagsCreateOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsBulkUpdateTagsCreate>>;

const result: ConversationsTicketsBulkUpdateTagsCreateOutput = await posthog.conversationsTicketsBulkUpdateTagsCreate();

// Result shape (from schema): { updated: ({ id: number; tags: (string)[] })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.conversationsTicketsComposeCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/tickets/compose/`
- **What it does**: Create a new outbound ticket and send the first message to the customer.
- **OpenAPI operationId**: `conversations_tickets_compose_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; ticket_number: number }`
- OpenAPI response codes: `201`, `400`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsComposeCreateInput = Parameters<typeof posthog.conversationsTicketsComposeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsComposeCreateOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsComposeCreate>>;

const result: ConversationsTicketsComposeCreateOutput = await posthog.conversationsTicketsComposeCreate();

// Result shape (from schema): { id: string; ticket_number: number }
```

### `posthog.conversationsTicketsUnreadCountRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/conversations/tickets/unread_count/`
- **What it does**: Get total unread ticket count for the team.

Returns the sum of unread_team_count for all non-resolved tickets.
Cached in Redis for 30 seconds, invalidated on changes.
- **OpenAPI operationId**: `conversations_tickets_unread_count_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" | "slack_bot_mention" | "slack_emoji_reaction" | "teams_channel_message" | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsTicketsUnreadCountRetrieveInput = Parameters<typeof posthog.conversationsTicketsUnreadCountRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsTicketsUnreadCountRetrieveOutput = Awaited<ReturnType<typeof posthog.conversationsTicketsUnreadCountRetrieve>>;

const result: ConversationsTicketsUnreadCountRetrieveOutput = await posthog.conversationsTicketsUnreadCountRetrieve();

// Result shape (from schema): { id: string; ticket_number: number; channel_source: "widget" | "email" | "slack" | "teams" | "github"; channel_detail: "slack_channel_message" | "slack_bot_mention" | "slack_emoji_reaction" | "teams_channel_message" | ...
```

### `posthog.conversationsViewsList`

- **HTTP**: `GET /api/projects/{project_id}/conversations/views/`
- **OpenAPI operationId**: `conversations_views_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsViewsListInput = Parameters<typeof posthog.conversationsViewsList> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsViewsListOutput = Awaited<ReturnType<typeof posthog.conversationsViewsList>>;

const result: ConversationsViewsListOutput = await posthog.conversationsViewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; ...
```

### `posthog.conversationsViewsCreate`

- **HTTP**: `POST /api/projects/{project_id}/conversations/views/`
- **OpenAPI operationId**: `conversations_views_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ConversationsViewsCreateInput = Parameters<typeof posthog.conversationsViewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsViewsCreateOutput = Awaited<ReturnType<typeof posthog.conversationsViewsCreate>>;

const result: ConversationsViewsCreateOutput = await posthog.conversationsViewsCreate();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email...
```

### `posthog.conversationsViewsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/conversations/views/{short_id}/`
- **OpenAPI operationId**: `conversations_views_destroy`
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

type ConversationsViewsDestroyInput = Parameters<typeof posthog.conversationsViewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsViewsDestroyOutput = Awaited<ReturnType<typeof posthog.conversationsViewsDestroy>>;

const result: ConversationsViewsDestroyOutput = await posthog.conversationsViewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.conversationsViewsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/conversations/views/{short_id}/`
- **OpenAPI operationId**: `conversations_views_retrieve`
- **Path params**: `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ConversationsViewsRetrieveInput = Parameters<typeof posthog.conversationsViewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ConversationsViewsRetrieveOutput = Awaited<ReturnType<typeof posthog.conversationsViewsRetrieve>>;

const result: ConversationsViewsRetrieveOutput = await posthog.conversationsViewsRetrieve();

// Result shape (from schema): { id: string; short_id: string; name: string; filters?: { [key: string]: unknown }; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

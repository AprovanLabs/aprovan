# Comments

## Operations

### `posthog.commentsList`

- **HTTP**: `GET /api/projects/{project_id}/comments/`
- **OpenAPI operationId**: `comments_list`
- **Path params**: None
- **Query params**: `completed`, `cursor`, `item_id`, `kind`, `scope`, `search`, `source_comment`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CommentsListInput = Parameters<typeof posthog.commentsList> extends [infer T, ...unknown[]] ? T : undefined;
type CommentsListOutput = Awaited<ReturnType<typeof posthog.commentsList>>;

const result: CommentsListOutput = await posthog.commentsList();

// Result shape (from schema): { next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: ...
```

### `posthog.commentsCreate`

- **HTTP**: `POST /api/projects/{project_id}/comments/`
- **OpenAPI operationId**: `comments_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type CommentsCreateInput = Parameters<typeof posthog.commentsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type CommentsCreateOutput = Awaited<ReturnType<typeof posthog.commentsCreate>>;

const result: CommentsCreateOutput = await posthog.commentsCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.commentsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/comments/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `comments_destroy`
- **Path params**: `id`
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

type CommentsDestroyInput = Parameters<typeof posthog.commentsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type CommentsDestroyOutput = Awaited<ReturnType<typeof posthog.commentsDestroy>>;

const result: CommentsDestroyOutput = await posthog.commentsDestroy();

// Result shape (from schema): unknown
```

### `posthog.commentsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/comments/{id}/`
- **OpenAPI operationId**: `comments_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CommentsRetrieveInput = Parameters<typeof posthog.commentsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CommentsRetrieveOutput = Awaited<ReturnType<typeof posthog.commentsRetrieve>>;

const result: CommentsRetrieveOutput = await posthog.commentsRetrieve();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.commentsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/comments/{id}/`
- **OpenAPI operationId**: `comments_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CommentsPartialUpdateInput = Parameters<typeof posthog.commentsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CommentsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.commentsPartialUpdate>>;

const result: CommentsPartialUpdateOutput = await posthog.commentsPartialUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.commentsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/comments/{id}/`
- **OpenAPI operationId**: `comments_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CommentsUpdateInput = Parameters<typeof posthog.commentsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CommentsUpdateOutput = Awaited<ReturnType<typeof posthog.commentsUpdate>>;

const result: CommentsUpdateOutput = await posthog.commentsUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.commentsCompleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/comments/{id}/complete/`
- **What it does**: Mark a task-comment as complete. Sets completed_at and completed_by. 400 if the comment is not a task or is already complete.
- **OpenAPI operationId**: `comments_complete_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CommentsCompleteCreateInput = Parameters<typeof posthog.commentsCompleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type CommentsCompleteCreateOutput = Awaited<ReturnType<typeof posthog.commentsCompleteCreate>>;

const result: CommentsCompleteCreateOutput = await posthog.commentsCompleteCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.commentsReopenCreate`

- **HTTP**: `POST /api/projects/{project_id}/comments/{id}/reopen/`
- **What it does**: Reopen a completed task-comment. Clears completed_at and completed_by. 400 if the comment is not a task or is already open.
- **OpenAPI operationId**: `comments_reopen_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CommentsReopenCreateInput = Parameters<typeof posthog.commentsReopenCreate> extends [infer T, ...unknown[]] ? T : undefined;
type CommentsReopenCreateOutput = Awaited<ReturnType<typeof posthog.commentsReopenCreate>>;

const result: CommentsReopenCreateOutput = await posthog.commentsReopenCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.commentsThreadRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/comments/{id}/thread/`
- **OpenAPI operationId**: `comments_thread_retrieve`
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

type CommentsThreadRetrieveInput = Parameters<typeof posthog.commentsThreadRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CommentsThreadRetrieveOutput = Awaited<ReturnType<typeof posthog.commentsThreadRetrieve>>;

const result: CommentsThreadRetrieveOutput = await posthog.commentsThreadRetrieve();

// Result shape (from schema): unknown
```

### `posthog.commentsCountRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/comments/count/`
- **OpenAPI operationId**: `comments_count_retrieve`
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

type CommentsCountRetrieveInput = Parameters<typeof posthog.commentsCountRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CommentsCountRetrieveOutput = Awaited<ReturnType<typeof posthog.commentsCountRetrieve>>;

const result: CommentsCountRetrieveOutput = await posthog.commentsCountRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# User Interviews

## Operations

### `posthog.environmentsUserInterviewsList`

- **HTTP**: `GET /api/environments/{environment_id}/user_interviews/`
- **OpenAPI operationId**: `environments_user_interviews_list`
- **Path params**: None
- **Query params**: `classifications`, `limit`, `offset`, `topic`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewsListInput = Parameters<typeof posthog.environmentsUserInterviewsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewsListOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewsList>>;

const result: EnvironmentsUserInterviewsListOutput = await posthog.environmentsUserInterviewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...
```

### `posthog.environmentsUserInterviewsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interviews/`
- **OpenAPI operationId**: `environments_user_interviews_create`
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

type EnvironmentsUserInterviewsCreateInput = Parameters<typeof posthog.environmentsUserInterviewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewsCreate>>;

const result: EnvironmentsUserInterviewsCreateOutput = await posthog.environmentsUserInterviewsCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/user_interviews/{id}/`
- **OpenAPI operationId**: `environments_user_interviews_destroy`
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

type EnvironmentsUserInterviewsDestroyInput = Parameters<typeof posthog.environmentsUserInterviewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewsDestroy>>;

const result: EnvironmentsUserInterviewsDestroyOutput = await posthog.environmentsUserInterviewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsUserInterviewsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/user_interviews/{id}/`
- **OpenAPI operationId**: `environments_user_interviews_retrieve`
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

type EnvironmentsUserInterviewsRetrieveInput = Parameters<typeof posthog.environmentsUserInterviewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewsRetrieve>>;

const result: EnvironmentsUserInterviewsRetrieveOutput = await posthog.environmentsUserInterviewsRetrieve();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/user_interviews/{id}/`
- **OpenAPI operationId**: `environments_user_interviews_partial_update`
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

type EnvironmentsUserInterviewsPartialUpdateInput = Parameters<typeof posthog.environmentsUserInterviewsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewsPartialUpdate>>;

const result: EnvironmentsUserInterviewsPartialUpdateOutput = await posthog.environmentsUserInterviewsPartialUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/user_interviews/{id}/`
- **OpenAPI operationId**: `environments_user_interviews_update`
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

type EnvironmentsUserInterviewsUpdateInput = Parameters<typeof posthog.environmentsUserInterviewsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewsUpdate>>;

const result: EnvironmentsUserInterviewsUpdateOutput = await posthog.environmentsUserInterviewsUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.environmentsUserInterviewsSearchCreate`

- **HTTP**: `POST /api/environments/{environment_id}/user_interviews/search/`
- **What it does**: Search interview responses by semantic similarity
- **OpenAPI operationId**: `environments_user_interviews_search_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ interview_id: string; document_type: "transcript" | "summary"; similarity: number; content_snippet: string; interviewee_identifier: string; topic_id: string | null; created_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUserInterviewsSearchCreateInput = Parameters<typeof posthog.environmentsUserInterviewsSearchCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUserInterviewsSearchCreateOutput = Awaited<ReturnType<typeof posthog.environmentsUserInterviewsSearchCreate>>;

const result: EnvironmentsUserInterviewsSearchCreateOutput = await posthog.environmentsUserInterviewsSearchCreate();

// Result shape (from schema): ({ interview_id: string; document_type: "transcript" | "summary"; similarity: number; content_snippet: string; interviewee_identifier: string; topic_id: string | null; created_at: string })[]
```

### `posthog.userInterviewsList`

- **HTTP**: `GET /api/projects/{project_id}/user_interviews/`
- **OpenAPI operationId**: `user_interviews_list`
- **Path params**: None
- **Query params**: `classifications`, `limit`, `offset`, `topic`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewsListInput = Parameters<typeof posthog.userInterviewsList> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewsListOutput = Awaited<ReturnType<typeof posthog.userInterviewsList>>;

const result: UserInterviewsListOutput = await posthog.userInterviewsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_em...
```

### `posthog.userInterviewsCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interviews/`
- **OpenAPI operationId**: `user_interviews_create`
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

type UserInterviewsCreateInput = Parameters<typeof posthog.userInterviewsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewsCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewsCreate>>;

const result: UserInterviewsCreateOutput = await posthog.userInterviewsCreate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/user_interviews/{id}/`
- **OpenAPI operationId**: `user_interviews_destroy`
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

type UserInterviewsDestroyInput = Parameters<typeof posthog.userInterviewsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewsDestroyOutput = Awaited<ReturnType<typeof posthog.userInterviewsDestroy>>;

const result: UserInterviewsDestroyOutput = await posthog.userInterviewsDestroy();

// Result shape (from schema): unknown
```

### `posthog.userInterviewsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/user_interviews/{id}/`
- **OpenAPI operationId**: `user_interviews_retrieve`
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

type UserInterviewsRetrieveInput = Parameters<typeof posthog.userInterviewsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewsRetrieveOutput = Awaited<ReturnType<typeof posthog.userInterviewsRetrieve>>;

const result: UserInterviewsRetrieveOutput = await posthog.userInterviewsRetrieve();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/user_interviews/{id}/`
- **OpenAPI operationId**: `user_interviews_partial_update`
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

type UserInterviewsPartialUpdateInput = Parameters<typeof posthog.userInterviewsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.userInterviewsPartialUpdate>>;

const result: UserInterviewsPartialUpdateOutput = await posthog.userInterviewsPartialUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/user_interviews/{id}/`
- **OpenAPI operationId**: `user_interviews_update`
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

type UserInterviewsUpdateInput = Parameters<typeof posthog.userInterviewsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewsUpdateOutput = Awaited<ReturnType<typeof posthog.userInterviewsUpdate>>;

const result: UserInterviewsUpdateOutput = await posthog.userInterviewsUpdate();

// Result shape (from schema): { id: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } ...
```

### `posthog.userInterviewsSearchCreate`

- **HTTP**: `POST /api/projects/{project_id}/user_interviews/search/`
- **What it does**: Search interview responses by semantic similarity
- **OpenAPI operationId**: `user_interviews_search_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ interview_id: string; document_type: "transcript" | "summary"; similarity: number; content_snippet: string; interviewee_identifier: string; topic_id: string | null; created_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UserInterviewsSearchCreateInput = Parameters<typeof posthog.userInterviewsSearchCreate> extends [infer T, ...unknown[]] ? T : undefined;
type UserInterviewsSearchCreateOutput = Awaited<ReturnType<typeof posthog.userInterviewsSearchCreate>>;

const result: UserInterviewsSearchCreateOutput = await posthog.userInterviewsSearchCreate();

// Result shape (from schema): ({ interview_id: string; document_type: "transcript" | "summary"; similarity: number; content_snippet: string; interviewee_identifier: string; topic_id: string | null; created_at: string })[]
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

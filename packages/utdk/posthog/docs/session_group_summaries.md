# Session Group Summaries

## Operations

### `posthog.sessionGroupSummariesList`

- **HTTP**: `GET /api/projects/{project_id}/session_group_summaries/`
- **What it does**: API for retrieving and managing stored group session summaries.
- **OpenAPI operationId**: `session_group_summaries_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; title: string; session_count: number; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; fir...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionGroupSummariesListInput = Parameters<typeof posthog.sessionGroupSummariesList> extends [infer T, ...unknown[]] ? T : undefined;
type SessionGroupSummariesListOutput = Awaited<ReturnType<typeof posthog.sessionGroupSummariesList>>;

const result: SessionGroupSummariesListOutput = await posthog.sessionGroupSummariesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; title: string; session_count: number; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; fir...
```

### `posthog.sessionGroupSummariesCreate`

- **HTTP**: `POST /api/projects/{project_id}/session_group_summaries/`
- **What it does**: API for retrieving and managing stored group session summaries.
- **OpenAPI operationId**: `session_group_summaries_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; title: string; session_ids: (string)[]; summary: unknown; extra_summary_context: unknown; run_metadata: unknown; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; fir...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type SessionGroupSummariesCreateInput = Parameters<typeof posthog.sessionGroupSummariesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionGroupSummariesCreateOutput = Awaited<ReturnType<typeof posthog.sessionGroupSummariesCreate>>;

const result: SessionGroupSummariesCreateOutput = await posthog.sessionGroupSummariesCreate();

// Result shape (from schema): { id: string; title: string; session_ids: (string)[]; summary: unknown; extra_summary_context: unknown; run_metadata: unknown; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; fir...
```

### `posthog.sessionGroupSummariesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/session_group_summaries/{id}/`
- **What it does**: API for retrieving and managing stored group session summaries.
- **OpenAPI operationId**: `session_group_summaries_destroy`
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

type SessionGroupSummariesDestroyInput = Parameters<typeof posthog.sessionGroupSummariesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SessionGroupSummariesDestroyOutput = Awaited<ReturnType<typeof posthog.sessionGroupSummariesDestroy>>;

const result: SessionGroupSummariesDestroyOutput = await posthog.sessionGroupSummariesDestroy();

// Result shape (from schema): unknown
```

### `posthog.sessionGroupSummariesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/session_group_summaries/{id}/`
- **What it does**: API for retrieving and managing stored group session summaries.
- **OpenAPI operationId**: `session_group_summaries_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; title: string; session_ids: (string)[]; summary: unknown; extra_summary_context: unknown; run_metadata: unknown; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; fir...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionGroupSummariesRetrieveInput = Parameters<typeof posthog.sessionGroupSummariesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SessionGroupSummariesRetrieveOutput = Awaited<ReturnType<typeof posthog.sessionGroupSummariesRetrieve>>;

const result: SessionGroupSummariesRetrieveOutput = await posthog.sessionGroupSummariesRetrieve();

// Result shape (from schema): { id: string; title: string; session_ids: (string)[]; summary: unknown; extra_summary_context: unknown; run_metadata: unknown; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; fir...
```

### `posthog.sessionGroupSummariesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/session_group_summaries/{id}/`
- **What it does**: API for retrieving and managing stored group session summaries.
- **OpenAPI operationId**: `session_group_summaries_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; title: string; session_ids: (string)[]; summary: unknown; extra_summary_context: unknown; run_metadata: unknown; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; fir...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionGroupSummariesPartialUpdateInput = Parameters<typeof posthog.sessionGroupSummariesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionGroupSummariesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.sessionGroupSummariesPartialUpdate>>;

const result: SessionGroupSummariesPartialUpdateOutput = await posthog.sessionGroupSummariesPartialUpdate();

// Result shape (from schema): { id: string; title: string; session_ids: (string)[]; summary: unknown; extra_summary_context: unknown; run_metadata: unknown; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; fir...
```

### `posthog.sessionGroupSummariesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/session_group_summaries/{id}/`
- **What it does**: API for retrieving and managing stored group session summaries.
- **OpenAPI operationId**: `session_group_summaries_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; title: string; session_ids: (string)[]; summary: unknown; extra_summary_context: unknown; run_metadata: unknown; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; fir...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SessionGroupSummariesUpdateInput = Parameters<typeof posthog.sessionGroupSummariesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SessionGroupSummariesUpdateOutput = Awaited<ReturnType<typeof posthog.sessionGroupSummariesUpdate>>;

const result: SessionGroupSummariesUpdateOutput = await posthog.sessionGroupSummariesUpdate();

// Result shape (from schema): { id: string; title: string; session_ids: (string)[]; summary: unknown; extra_summary_context: unknown; run_metadata: unknown; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; fir...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

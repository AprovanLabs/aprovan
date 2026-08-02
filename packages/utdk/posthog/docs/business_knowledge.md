# Business Knowledge

## Operations

### `posthog.businessKnowledgeDocumentsWindowList`

- **HTTP**: `GET /api/projects/{project_id}/business_knowledge/documents/{id}/window/`
- **What it does**: Read-only access to parsed knowledge documents. Exposes hybrid search
(``search``) and a drill-down window (``window``) so an agent (PHAI or
MCP) can find and explore business knowledge chunks.
- **OpenAPI operationId**: `business_knowledge_documents_window_list`
- **Path params**: `id`
- **Query params**: `around_ordinal`, `radius`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ chunk_id: string; ordinal: number; content: string; heading_path: string; source_name: string; document_title: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeDocumentsWindowListInput = Parameters<typeof posthog.businessKnowledgeDocumentsWindowList> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeDocumentsWindowListOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeDocumentsWindowList>>;

const result: BusinessKnowledgeDocumentsWindowListOutput = await posthog.businessKnowledgeDocumentsWindowList();

// Result shape (from schema): ({ chunk_id: string; ordinal: number; content: string; heading_path: string; source_name: string; document_title: string })[]
```

### `posthog.businessKnowledgeDocumentsSearchList`

- **HTTP**: `GET /api/projects/{project_id}/business_knowledge/documents/search/`
- **What it does**: Read-only access to parsed knowledge documents. Exposes hybrid search
(``search``) and a drill-down window (``window``) so an agent (PHAI or
MCP) can find and explore business knowledge chunks.
- **OpenAPI operationId**: `business_knowledge_documents_search_list`
- **Path params**: None
- **Query params**: `limit`, `query`, `rerank`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ chunk_id: string; document_id: string; ordinal: number; source_id: string; source_name: string; source_type: string; document_title: string; heading_path: string; content: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeDocumentsSearchListInput = Parameters<typeof posthog.businessKnowledgeDocumentsSearchList> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeDocumentsSearchListOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeDocumentsSearchList>>;

const result: BusinessKnowledgeDocumentsSearchListOutput = await posthog.businessKnowledgeDocumentsSearchList();

// Result shape (from schema): ({ chunk_id: string; document_id: string; ordinal: number; source_id: string; source_name: string; source_type: string; document_title: string; heading_path: string; content: string })[]
```

### `posthog.businessKnowledgeGapSuggestionsList`

- **HTTP**: `GET /api/projects/{project_id}/business_knowledge/gap_suggestions/`
- **What it does**: Surfaces topics the support AI couldn't answer from the knowledge base.

Two list shapes controlled by the ``ticket_id`` query param:
- **per-ticket** (``?ticket_id=<uuid>``): individual gap rows for that ticket.
- **aggregated** (no ``ticket_id``): gaps grouped by normalized topic with counts,
  for the Business knowledge suggestions panel.
- **OpenAPI operationId**: `business_knowledge_gap_suggestions_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `ticket_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; ticket_id: string; topic: string; normalized_topic: string; ticket_type: string; outcome: string; status: string; resolved_source_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeGapSuggestionsListInput = Parameters<typeof posthog.businessKnowledgeGapSuggestionsList> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeGapSuggestionsListOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeGapSuggestionsList>>;

const result: BusinessKnowledgeGapSuggestionsListOutput = await posthog.businessKnowledgeGapSuggestionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; ticket_id: string; topic: string; normalized_topic: string; ticket_type: string; outcome: string; status: string; resolved_source_...
```

### `posthog.businessKnowledgeGapSuggestionsAcceptCreate`

- **HTTP**: `POST /api/projects/{project_id}/business_knowledge/gap_suggestions/{id}/accept/`
- **What it does**: Surfaces topics the support AI couldn't answer from the knowledge base.

Two list shapes controlled by the ``ticket_id`` query param:
- **per-ticket** (``?ticket_id=<uuid>``): individual gap rows for that ticket.
- **aggregated** (no ``ticket_id``): gaps grouped by normalized topic with counts,
  for the Business knowledge suggestions panel.
- **OpenAPI operationId**: `business_knowledge_gap_suggestions_accept_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; ticket_id: string; topic: string; normalized_topic: string; ticket_type: string; outcome: string; status: string; resolved_source_id: string | null; created_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeGapSuggestionsAcceptCreateInput = Parameters<typeof posthog.businessKnowledgeGapSuggestionsAcceptCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeGapSuggestionsAcceptCreateOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeGapSuggestionsAcceptCreate>>;

const result: BusinessKnowledgeGapSuggestionsAcceptCreateOutput = await posthog.businessKnowledgeGapSuggestionsAcceptCreate();

// Result shape (from schema): { id: string; ticket_id: string; topic: string; normalized_topic: string; ticket_type: string; outcome: string; status: string; resolved_source_id: string | null; created_at: string }
```

### `posthog.businessKnowledgeGapSuggestionsDismissCreate`

- **HTTP**: `POST /api/projects/{project_id}/business_knowledge/gap_suggestions/{id}/dismiss/`
- **What it does**: Surfaces topics the support AI couldn't answer from the knowledge base.

Two list shapes controlled by the ``ticket_id`` query param:
- **per-ticket** (``?ticket_id=<uuid>``): individual gap rows for that ticket.
- **aggregated** (no ``ticket_id``): gaps grouped by normalized topic with counts,
  for the Business knowledge suggestions panel.
- **OpenAPI operationId**: `business_knowledge_gap_suggestions_dismiss_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; ticket_id: string; topic: string; normalized_topic: string; ticket_type: string; outcome: string; status: string; resolved_source_id: string | null; created_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeGapSuggestionsDismissCreateInput = Parameters<typeof posthog.businessKnowledgeGapSuggestionsDismissCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeGapSuggestionsDismissCreateOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeGapSuggestionsDismissCreate>>;

const result: BusinessKnowledgeGapSuggestionsDismissCreateOutput = await posthog.businessKnowledgeGapSuggestionsDismissCreate();

// Result shape (from schema): { id: string; ticket_id: string; topic: string; normalized_topic: string; ticket_type: string; outcome: string; status: string; resolved_source_id: string | null; created_at: string }
```

### `posthog.businessKnowledgeGapSuggestionsAcceptTopicCreate`

- **HTTP**: `POST /api/projects/{project_id}/business_knowledge/gap_suggestions/accept_topic/`
- **What it does**: Accept all pending suggestions for a normalized topic cluster.
- **OpenAPI operationId**: `business_knowledge_gap_suggestions_accept_topic_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ normalized_topic: string; updated: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeGapSuggestionsAcceptTopicCreateInput = Parameters<typeof posthog.businessKnowledgeGapSuggestionsAcceptTopicCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeGapSuggestionsAcceptTopicCreateOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeGapSuggestionsAcceptTopicCreate>>;

const result: BusinessKnowledgeGapSuggestionsAcceptTopicCreateOutput = await posthog.businessKnowledgeGapSuggestionsAcceptTopicCreate();

// Result shape (from schema): { normalized_topic: string; updated: number }
```

### `posthog.businessKnowledgeGapSuggestionsDismissTopicCreate`

- **HTTP**: `POST /api/projects/{project_id}/business_knowledge/gap_suggestions/dismiss_topic/`
- **What it does**: Dismiss all pending suggestions for a normalized topic cluster.
- **OpenAPI operationId**: `business_knowledge_gap_suggestions_dismiss_topic_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ normalized_topic: string; updated: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeGapSuggestionsDismissTopicCreateInput = Parameters<typeof posthog.businessKnowledgeGapSuggestionsDismissTopicCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeGapSuggestionsDismissTopicCreateOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeGapSuggestionsDismissTopicCreate>>;

const result: BusinessKnowledgeGapSuggestionsDismissTopicCreateOutput = await posthog.businessKnowledgeGapSuggestionsDismissTopicCreate();

// Result shape (from schema): { normalized_topic: string; updated: number }
```

### `posthog.businessKnowledgeSourcesList`

- **HTTP**: `GET /api/projects/{project_id}/business_knowledge/sources/`
- **OpenAPI operationId**: `business_knowledge_sources_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; name: string; source_type: "text" | "url" | "file"; status: "pending" | "processing" | "ready" | "error"; error_m...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeSourcesListInput = Parameters<typeof posthog.businessKnowledgeSourcesList> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeSourcesListOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeSourcesList>>;

const result: BusinessKnowledgeSourcesListOutput = await posthog.businessKnowledgeSourcesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; name: string; source_type: "text" | "url" | "file"; status: "pending" | "processing" | "ready" | "error"; error_m...
```

### `posthog.businessKnowledgeSourcesCreate`

- **HTTP**: `POST /api/projects/{project_id}/business_knowledge/sources/`
- **OpenAPI operationId**: `business_knowledge_sources_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; source_type: "text" | "url" | "file"; status: "pending" | "processing" | "ready" | "error"; error_message: string; document_count: number; chunk_count: number; created_at: st...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeSourcesCreateInput = Parameters<typeof posthog.businessKnowledgeSourcesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeSourcesCreateOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeSourcesCreate>>;

const result: BusinessKnowledgeSourcesCreateOutput = await posthog.businessKnowledgeSourcesCreate();

// Result shape (from schema): { id: string; team_id: number; name: string; source_type: "text" | "url" | "file"; status: "pending" | "processing" | "ready" | "error"; error_message: string; document_count: number; chunk_count: number; created_at: st...
```

### `posthog.businessKnowledgeSourcesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/business_knowledge/sources/{id}/`
- **OpenAPI operationId**: `business_knowledge_sources_destroy`
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

type BusinessKnowledgeSourcesDestroyInput = Parameters<typeof posthog.businessKnowledgeSourcesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeSourcesDestroyOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeSourcesDestroy>>;

const result: BusinessKnowledgeSourcesDestroyOutput = await posthog.businessKnowledgeSourcesDestroy();

// Result shape (from schema): unknown
```

### `posthog.businessKnowledgeSourcesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/business_knowledge/sources/{id}/`
- **OpenAPI operationId**: `business_knowledge_sources_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; source_type: "text" | "url" | "file"; status: "pending" | "processing" | "ready" | "error"; error_message: string; document_count: number; chunk_count: number; created_at: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeSourcesRetrieveInput = Parameters<typeof posthog.businessKnowledgeSourcesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeSourcesRetrieveOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeSourcesRetrieve>>;

const result: BusinessKnowledgeSourcesRetrieveOutput = await posthog.businessKnowledgeSourcesRetrieve();

// Result shape (from schema): { id: string; team_id: number; name: string; source_type: "text" | "url" | "file"; status: "pending" | "processing" | "ready" | "error"; error_message: string; document_count: number; chunk_count: number; created_at: st...
```

### `posthog.businessKnowledgeSourcesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/business_knowledge/sources/{id}/`
- **OpenAPI operationId**: `business_knowledge_sources_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; source_type: "text" | "url" | "file"; status: "pending" | "processing" | "ready" | "error"; error_message: string; document_count: number; chunk_count: number; created_at: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeSourcesPartialUpdateInput = Parameters<typeof posthog.businessKnowledgeSourcesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeSourcesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeSourcesPartialUpdate>>;

const result: BusinessKnowledgeSourcesPartialUpdateOutput = await posthog.businessKnowledgeSourcesPartialUpdate();

// Result shape (from schema): { id: string; team_id: number; name: string; source_type: "text" | "url" | "file"; status: "pending" | "processing" | "ready" | "error"; error_message: string; document_count: number; chunk_count: number; created_at: st...
```

### `posthog.businessKnowledgeSourcesRefreshCreate`

- **HTTP**: `POST /api/projects/{project_id}/business_knowledge/sources/{id}/refresh/`
- **OpenAPI operationId**: `business_knowledge_sources_refresh_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; source_type: "text" | "url" | "file"; status: "pending" | "processing" | "ready" | "error"; error_message: string; document_count: number; chunk_count: number; created_at: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeSourcesRefreshCreateInput = Parameters<typeof posthog.businessKnowledgeSourcesRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeSourcesRefreshCreateOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeSourcesRefreshCreate>>;

const result: BusinessKnowledgeSourcesRefreshCreateOutput = await posthog.businessKnowledgeSourcesRefreshCreate();

// Result shape (from schema): { id: string; team_id: number; name: string; source_type: "text" | "url" | "file"; status: "pending" | "processing" | "ready" | "error"; error_message: string; document_count: number; chunk_count: number; created_at: st...
```

### `posthog.businessKnowledgeSourcesTextRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/business_knowledge/sources/{id}/text/`
- **OpenAPI operationId**: `business_knowledge_sources_text_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type BusinessKnowledgeSourcesTextRetrieveInput = Parameters<typeof posthog.businessKnowledgeSourcesTextRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type BusinessKnowledgeSourcesTextRetrieveOutput = Awaited<ReturnType<typeof posthog.businessKnowledgeSourcesTextRetrieve>>;

const result: BusinessKnowledgeSourcesTextRetrieveOutput = await posthog.businessKnowledgeSourcesTextRetrieve();

// Result shape (from schema): { text?: string }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# Single Session Summaries

## Operations

### `posthog.singleSessionSummariesList`

- **HTTP**: `GET /api/projects/{project_id}/single_session_summaries/`
- **What it does**: List stored AI-generated session summaries for the team, one row per session (latest summary kept). Use to discover which sessions have been summarized and to filter for sessions with specific problems — `has_exceptions=true`, `outcome=failure`, or a custom `session_ids` narrowing. Returns lightweight rows without the full summary JSON; use the retrieve endpoint for the per-segment / per-action detail.
- **OpenAPI operationId**: `single_session_summaries_list`
- **Path params**: None
- **Query params**: `created_by`, `date_from`, `date_to`, `distinct_id`, `has_exceptions`, `has_visual_confirmation`, `limit`, `offset`, `order`, `outcome`, `session_ids`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; session_id: string; distinct_id: string | null; session_start_time: string | null; session_duration: number | null; session_outcom...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SingleSessionSummariesListInput = Parameters<typeof posthog.singleSessionSummariesList> extends [infer T, ...unknown[]] ? T : undefined;
type SingleSessionSummariesListOutput = Awaited<ReturnType<typeof posthog.singleSessionSummariesList>>;

const result: SingleSessionSummariesListOutput = await posthog.singleSessionSummariesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; session_id: string; distinct_id: string | null; session_start_time: string | null; session_duration: number | null; session_outcom...
```

### `posthog.singleSessionSummariesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/single_session_summaries/{session_id}/`
- **What it does**: Get the latest stored AI summary for a single session by `session_id`. Returns the full `summary` JSON (segments with named timeline, per-action `abandonment` / `confusion` / `exception` flags, segment outcomes, headline `session_outcome`, optional `sentiment`), the `exception_event_ids` array, the `extra_summary_context` (e.g. `focus_area`) used at generation time, and the `run_metadata` (LLM model used, whether visual confirmation was applied). 404 if no summary has been generated for this session yet — to trigger generation, use the existing `session-recording-summarize` flow rather than this endpoint.
- **OpenAPI operationId**: `single_session_summaries_retrieve`
- **Path params**: `session_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; session_id: string; distinct_id: string | null; session_start_time: string | null; session_duration: number | null; summary: { [key: string]: unknown }; exception_event_ids: (string)[]; extra_summary_conte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SingleSessionSummariesRetrieveInput = Parameters<typeof posthog.singleSessionSummariesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SingleSessionSummariesRetrieveOutput = Awaited<ReturnType<typeof posthog.singleSessionSummariesRetrieve>>;

const result: SingleSessionSummariesRetrieveOutput = await posthog.singleSessionSummariesRetrieve();

// Result shape (from schema): { id: string; session_id: string; distinct_id: string | null; session_start_time: string | null; session_duration: number | null; summary: { [key: string]: unknown }; exception_event_ids: (string)[]; extra_summary_conte...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

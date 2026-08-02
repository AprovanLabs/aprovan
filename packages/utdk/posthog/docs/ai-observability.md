# AI Observability

## Operations

### `posthog.environmentsLlmAnalyticsEvaluationSummaryCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/evaluation_summary/`
- **What it does**: 
Generate an AI-powered summary of evaluation results.

This endpoint analyzes evaluation runs and identifies patterns in passing
and failing evaluations, providing actionable recommendations.

Data is fetched server-side by evaluation ID to ensure data integrity.

**Use Cases:**
- Understand why evaluations are passing or failing
- Identify systematic issues in LLM responses
- Get recommendations for improving response quality
- Review patterns across many evaluation runs at once
        
- **OpenAPI operationId**: `environments_llm_analytics_evaluation_summary_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`, `403`, `404`, `500`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ overall_assessment: string; pass_patterns: ({ title: string; description: string; frequency: string; example_generation_ids: (string)[] })[]; fail_patterns: ({ title: string; description: string; frequency: string; ex...`
- OpenAPI response codes: `200`, `400`, `403`, `404`, `500`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsEvaluationSummaryCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsEvaluationSummaryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsEvaluationSummaryCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsEvaluationSummaryCreate>>;

const result: EnvironmentsLlmAnalyticsEvaluationSummaryCreateOutput = await posthog.environmentsLlmAnalyticsEvaluationSummaryCreate();

// Result shape (from schema): { overall_assessment: string; pass_patterns: ({ title: string; description: string; frequency: string; example_generation_ids: (string)[] })[]; fail_patterns: ({ title: string; description: string; frequency: string; ex...
```

### `posthog.environmentsLlmAnalyticsOfflineEvaluationsExperimentItemsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/offline_evaluations/experiment_items/`
- **OpenAPI operationId**: `environments_llm_analytics_offline_evaluations_experiment_items_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`, `500`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ((unknown)[])[] }`
- OpenAPI response codes: `200`, `400`, `500`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsOfflineEvaluationsExperimentItemsCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsOfflineEvaluationsExperimentItemsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsOfflineEvaluationsExperimentItemsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsOfflineEvaluationsExperimentItemsCreate>>;

const result: EnvironmentsLlmAnalyticsOfflineEvaluationsExperimentItemsCreateOutput = await posthog.environmentsLlmAnalyticsOfflineEvaluationsExperimentItemsCreate();

// Result shape (from schema): { results: ((unknown)[])[] }
```

### `posthog.environmentsLlmAnalyticsSummarizationCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/summarization/`
- **What it does**: 
Generate an AI-powered summary of an LLM trace or event.

This endpoint analyzes the provided trace/event, generates a line-numbered text
representation, and uses an LLM to create a concise summary with line references.

**Two ways to use this endpoint:**

1. **By ID (recommended):** Pass `trace_id` or `generation_id` with an optional `date_from`/`date_to`.
   The backend fetches the data automatically. `summarize_type` is inferred.
2. **By data:** Pass the full trace/event data blob in `data` with `summarize_type`.
   This is how the frontend uses it.

**Summary Format:**
- Title (concise, max 10 words)
- Mermaid flow diagram showing the main flow
- 3-10 summary bullets with line references
- "Interesting Notes" section for failures, successes, or unusual patterns
- Line references in [L45] or [L45-52] format pointing to relevant sections

The response includes the structured summary, the text representation, and metadata.
        
- **OpenAPI operationId**: `environments_llm_analytics_summarization_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`, `403`, `500`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ summary: { title: string; flow_diagram: string; summary_bullets: ({ text: string; line_refs: string })[]; interesting_notes: ({ text: string; line_refs: string })[] }; text_repr: string; metadata?: unknown }`
- OpenAPI response codes: `200`, `400`, `403`, `500`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsSummarizationCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsSummarizationCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsSummarizationCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsSummarizationCreate>>;

const result: EnvironmentsLlmAnalyticsSummarizationCreateOutput = await posthog.environmentsLlmAnalyticsSummarizationCreate();

// Result shape (from schema): { summary: { title: string; flow_diagram: string; summary_bullets: ({ text: string; line_refs: string })[]; interesting_notes: ({ text: string; line_refs: string })[] }; text_repr: string; metadata?: unknown }
```

### `posthog.environmentsLlmAnalyticsSummarizationBatchCheckCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/summarization/batch_check/`
- **What it does**: 
Check which traces have cached summaries available.

This endpoint allows batch checking of multiple trace IDs to see which ones
have cached summaries. Returns only the traces that have cached summaries
with their titles.

**Use Cases:**
- Load cached summaries on session view load
- Avoid unnecessary LLM calls for already-summarized traces
- Display summary previews without generating new summaries
        
- **OpenAPI operationId**: `environments_llm_analytics_summarization_batch_check_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`, `403`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ summaries: ({ trace_id: string; title: string; cached?: boolean })[] }`
- OpenAPI response codes: `200`, `400`, `403`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsSummarizationBatchCheckCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsSummarizationBatchCheckCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsSummarizationBatchCheckCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsSummarizationBatchCheckCreate>>;

const result: EnvironmentsLlmAnalyticsSummarizationBatchCheckCreateOutput = await posthog.environmentsLlmAnalyticsSummarizationBatchCheckCreate();

// Result shape (from schema): { summaries: ({ trace_id: string; title: string; cached?: boolean })[] }
```

### `posthog.environmentsLlmAnalyticsTextReprCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_analytics/text_repr/`
- **What it does**: 
Generate a human-readable text representation of an LLM trace event.

This endpoint converts AI observability events ($ai_generation, $ai_span, $ai_embedding, or $ai_trace)
into formatted text representations suitable for display, logging, or analysis.

**Supported Event Types:**
- `$ai_generation`: Individual LLM API calls with input/output messages
- `$ai_span`: Logical spans with state transitions
- `$ai_embedding`: Embedding generation events (text input → vector)
- `$ai_trace`: Full traces with hierarchical structure

**Options:**
- `max_length`: Maximum character count (default: 2000000)
- `truncated`: Enable middle-content truncation within events (default: true)
- `truncate_buffer`: Characters at start/end when truncating (default: 1000)
- `include_markers`: Use interactive markers vs plain text indicators (default: true)
  - Frontend: set true for `<<<TRUNCATED|base64|...>>>` markers
  - Backend/LLM: set false for `... (X chars truncated) ...` text
- `collapsed`: Show summary vs full trace tree (default: false)
- `include_hierarchy`: Include tree structure for traces (default: true)
- `max_depth`: Maximum depth for hierarchical rendering (default: unlimited)
- `tools_collapse_threshold`: Number of tools before auto-collapsing list (default: 5)
  - Tool lists >5 items show `<<<TOOLS_EXPANDABLE|...>>>` marker for frontend
  - Or `[+] AVAILABLE TOOLS: N` for backend when `include_markers: false`
- `include_line_numbers`: Prefix each line with line number like L001:, L010: (default: false)

**Use Cases:**
- Frontend display: `truncated: true, include_markers: true, include_line_numbers: true`
- Backend LLM context (summary): `truncated: true, include_markers: false, collapsed: true`
- Backend LLM context (full): `truncated: false`

The response includes the formatted text and metadata about the rendering.
        
- **OpenAPI operationId**: `environments_llm_analytics_text_repr_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`, `500`, `503`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text: string; metadata: { event_type?: string; event_id?: string; trace_id?: string; rendering: string; char_count: number; truncated: boolean; error?: string } }`
- OpenAPI response codes: `200`, `400`, `500`, `503`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmAnalyticsTextReprCreateInput = Parameters<typeof posthog.environmentsLlmAnalyticsTextReprCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmAnalyticsTextReprCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmAnalyticsTextReprCreate>>;

const result: EnvironmentsLlmAnalyticsTextReprCreateOutput = await posthog.environmentsLlmAnalyticsTextReprCreate();

// Result shape (from schema): { text: string; metadata: { event_type?: string; event_id?: string; trace_id?: string; rendering: string; char_count: number; truncated: boolean; error?: string } }
```

### `posthog.llmAnalyticsPersonalSpendList`

- **HTTP**: `GET /api/llm_analytics/@me/spend/`
- **What it does**: Return a structured personal LLM spend analysis for the requesting user. Pass `date_from` / `date_to` (absolute like `2026-04-23` or relative like `-7d`) to bound the window — defaults to the last 30 days, max 90 days. The `product=<ai_product>` query param is required and scopes the tool / model / day / trace breakdowns to a single product; supported values: posthog_code. `by_product` is always returned for cross-product visibility. `by_day` returns a day-ascending spend series for the scoped product. Use `refresh=true` to bypass the 5-minute response cache.
- **OpenAPI operationId**: `llm_analytics_personal_spend_list`
- **Path params**: None
- **Query params**: `date_from`, `date_to`, `limit`, `product`, `refresh`
- **Response codes**: `200`, `400`, `401`, `403`, `404`, `429`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ summary: { date_from: string; date_to: string; product: string; total_cost_usd: number; event_count: number; scoped_cost_usd: number; scoped_event_count: number }; by_product: { items: ({ product: string | null; even...`
- OpenAPI response codes: `200`, `400`, `401`, `403`, `404`, `429`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsPersonalSpendListInput = Parameters<typeof posthog.llmAnalyticsPersonalSpendList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsPersonalSpendListOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsPersonalSpendList>>;

const result: LlmAnalyticsPersonalSpendListOutput = await posthog.llmAnalyticsPersonalSpendList();

// Result shape (from schema): ({ summary: { date_from: string; date_to: string; product: string; total_cost_usd: number; event_count: number; scoped_cost_usd: number; scoped_event_count: number }; by_product: { items: ({ product: string | null; even...
```

### `posthog.llmAnalyticsEvaluationSummaryCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/evaluation_summary/`
- **What it does**: 
Generate an AI-powered summary of evaluation results.

This endpoint analyzes evaluation runs and identifies patterns in passing
and failing evaluations, providing actionable recommendations.

Data is fetched server-side by evaluation ID to ensure data integrity.

**Use Cases:**
- Understand why evaluations are passing or failing
- Identify systematic issues in LLM responses
- Get recommendations for improving response quality
- Review patterns across many evaluation runs at once
        
- **OpenAPI operationId**: `llm_analytics_evaluation_summary_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`, `403`, `404`, `500`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ overall_assessment: string; pass_patterns: ({ title: string; description: string; frequency: string; example_generation_ids: (string)[] })[]; fail_patterns: ({ title: string; description: string; frequency: string; ex...`
- OpenAPI response codes: `200`, `400`, `403`, `404`, `500`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsEvaluationSummaryCreateInput = Parameters<typeof posthog.llmAnalyticsEvaluationSummaryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsEvaluationSummaryCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsEvaluationSummaryCreate>>;

const result: LlmAnalyticsEvaluationSummaryCreateOutput = await posthog.llmAnalyticsEvaluationSummaryCreate();

// Result shape (from schema): { overall_assessment: string; pass_patterns: ({ title: string; description: string; frequency: string; example_generation_ids: (string)[] })[]; fail_patterns: ({ title: string; description: string; frequency: string; ex...
```

### `posthog.llmAnalyticsOfflineEvaluationsExperimentItemsCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/offline_evaluations/experiment_items/`
- **OpenAPI operationId**: `llm_analytics_offline_evaluations_experiment_items_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`, `500`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ((unknown)[])[] }`
- OpenAPI response codes: `200`, `400`, `500`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsOfflineEvaluationsExperimentItemsCreateInput = Parameters<typeof posthog.llmAnalyticsOfflineEvaluationsExperimentItemsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsOfflineEvaluationsExperimentItemsCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsOfflineEvaluationsExperimentItemsCreate>>;

const result: LlmAnalyticsOfflineEvaluationsExperimentItemsCreateOutput = await posthog.llmAnalyticsOfflineEvaluationsExperimentItemsCreate();

// Result shape (from schema): { results: ((unknown)[])[] }
```

### `posthog.llmAnalyticsSummarizationCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/summarization/`
- **What it does**: 
Generate an AI-powered summary of an LLM trace or event.

This endpoint analyzes the provided trace/event, generates a line-numbered text
representation, and uses an LLM to create a concise summary with line references.

**Two ways to use this endpoint:**

1. **By ID (recommended):** Pass `trace_id` or `generation_id` with an optional `date_from`/`date_to`.
   The backend fetches the data automatically. `summarize_type` is inferred.
2. **By data:** Pass the full trace/event data blob in `data` with `summarize_type`.
   This is how the frontend uses it.

**Summary Format:**
- Title (concise, max 10 words)
- Mermaid flow diagram showing the main flow
- 3-10 summary bullets with line references
- "Interesting Notes" section for failures, successes, or unusual patterns
- Line references in [L45] or [L45-52] format pointing to relevant sections

The response includes the structured summary, the text representation, and metadata.
        
- **OpenAPI operationId**: `llm_analytics_summarization_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`, `403`, `500`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ summary: { title: string; flow_diagram: string; summary_bullets: ({ text: string; line_refs: string })[]; interesting_notes: ({ text: string; line_refs: string })[] }; text_repr: string; metadata?: unknown }`
- OpenAPI response codes: `200`, `400`, `403`, `500`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsSummarizationCreateInput = Parameters<typeof posthog.llmAnalyticsSummarizationCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsSummarizationCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsSummarizationCreate>>;

const result: LlmAnalyticsSummarizationCreateOutput = await posthog.llmAnalyticsSummarizationCreate();

// Result shape (from schema): { summary: { title: string; flow_diagram: string; summary_bullets: ({ text: string; line_refs: string })[]; interesting_notes: ({ text: string; line_refs: string })[] }; text_repr: string; metadata?: unknown }
```

### `posthog.llmAnalyticsSummarizationBatchCheckCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/summarization/batch_check/`
- **What it does**: 
Check which traces have cached summaries available.

This endpoint allows batch checking of multiple trace IDs to see which ones
have cached summaries. Returns only the traces that have cached summaries
with their titles.

**Use Cases:**
- Load cached summaries on session view load
- Avoid unnecessary LLM calls for already-summarized traces
- Display summary previews without generating new summaries
        
- **OpenAPI operationId**: `llm_analytics_summarization_batch_check_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`, `403`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ summaries: ({ trace_id: string; title: string; cached?: boolean })[] }`
- OpenAPI response codes: `200`, `400`, `403`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsSummarizationBatchCheckCreateInput = Parameters<typeof posthog.llmAnalyticsSummarizationBatchCheckCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsSummarizationBatchCheckCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsSummarizationBatchCheckCreate>>;

const result: LlmAnalyticsSummarizationBatchCheckCreateOutput = await posthog.llmAnalyticsSummarizationBatchCheckCreate();

// Result shape (from schema): { summaries: ({ trace_id: string; title: string; cached?: boolean })[] }
```

### `posthog.llmAnalyticsTextReprCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_analytics/text_repr/`
- **What it does**: 
Generate a human-readable text representation of an LLM trace event.

This endpoint converts AI observability events ($ai_generation, $ai_span, $ai_embedding, or $ai_trace)
into formatted text representations suitable for display, logging, or analysis.

**Supported Event Types:**
- `$ai_generation`: Individual LLM API calls with input/output messages
- `$ai_span`: Logical spans with state transitions
- `$ai_embedding`: Embedding generation events (text input → vector)
- `$ai_trace`: Full traces with hierarchical structure

**Options:**
- `max_length`: Maximum character count (default: 2000000)
- `truncated`: Enable middle-content truncation within events (default: true)
- `truncate_buffer`: Characters at start/end when truncating (default: 1000)
- `include_markers`: Use interactive markers vs plain text indicators (default: true)
  - Frontend: set true for `<<<TRUNCATED|base64|...>>>` markers
  - Backend/LLM: set false for `... (X chars truncated) ...` text
- `collapsed`: Show summary vs full trace tree (default: false)
- `include_hierarchy`: Include tree structure for traces (default: true)
- `max_depth`: Maximum depth for hierarchical rendering (default: unlimited)
- `tools_collapse_threshold`: Number of tools before auto-collapsing list (default: 5)
  - Tool lists >5 items show `<<<TOOLS_EXPANDABLE|...>>>` marker for frontend
  - Or `[+] AVAILABLE TOOLS: N` for backend when `include_markers: false`
- `include_line_numbers`: Prefix each line with line number like L001:, L010: (default: false)

**Use Cases:**
- Frontend display: `truncated: true, include_markers: true, include_line_numbers: true`
- Backend LLM context (summary): `truncated: true, include_markers: false, collapsed: true`
- Backend LLM context (full): `truncated: false`

The response includes the formatted text and metadata about the rendering.
        
- **OpenAPI operationId**: `llm_analytics_text_repr_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`, `500`, `503`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text: string; metadata: { event_type?: string; event_id?: string; trace_id?: string; rendering: string; char_count: number; truncated: boolean; error?: string } }`
- OpenAPI response codes: `200`, `400`, `500`, `503`

```ts
import posthog from "@utdk/posthog";

type LlmAnalyticsTextReprCreateInput = Parameters<typeof posthog.llmAnalyticsTextReprCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmAnalyticsTextReprCreateOutput = Awaited<ReturnType<typeof posthog.llmAnalyticsTextReprCreate>>;

const result: LlmAnalyticsTextReprCreateOutput = await posthog.llmAnalyticsTextReprCreate();

// Result shape (from schema): { text: string; metadata: { event_type?: string; event_id?: string; trace_id?: string; rendering: string; char_count: number; truncated: boolean; error?: string } }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

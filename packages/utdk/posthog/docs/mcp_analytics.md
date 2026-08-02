# Mcp Analytics

## Operations

### `posthog.environmentsMcpAnalyticsFeedbackList`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_analytics/feedback/`
- **What it does**: List MCP feedback submissions for the current project, newest first.
- **OpenAPI operationId**: `environments_mcp_analytics_feedback_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpAnalyticsFeedbackListInput = Parameters<typeof posthog.environmentsMcpAnalyticsFeedbackList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsFeedbackListOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsFeedbackList>>;

const result: EnvironmentsMcpAnalyticsFeedbackListOutput = await posthog.environmentsMcpAnalyticsFeedbackList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool:...
```

### `posthog.environmentsMcpAnalyticsFeedbackCreate`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_analytics/feedback/`
- **What it does**: Create a new MCP feedback submission for the current project.
- **OpenAPI operationId**: `environments_mcp_analytics_feedback_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool: string; mcp_client_name: string; mcp_client_version: string; mcp_protocol_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpAnalyticsFeedbackCreateInput = Parameters<typeof posthog.environmentsMcpAnalyticsFeedbackCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsFeedbackCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsFeedbackCreate>>;

const result: EnvironmentsMcpAnalyticsFeedbackCreateOutput = await posthog.environmentsMcpAnalyticsFeedbackCreate();

// Result shape (from schema): { id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool: string; mcp_client_name: string; mcp_client_version: string; mcp_protocol_...
```

### `posthog.environmentsMcpAnalyticsIntentClustersRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_analytics/intent_clusters/`
- **What it does**: Return the most recent intent cluster snapshot for the current project. Returns an empty IDLE snapshot when no clustering run has happened yet.
- **OpenAPI operationId**: `environments_mcp_analytics_intent_clusters_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ status: "idle" | "computing" | "error"; error_message: string; last_computed_at: string | null; last_computed_by_email: string; clusters: ({ id: number; label: string; intent_count: number; session_count: number; cal...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpAnalyticsIntentClustersRetrieveInput = Parameters<typeof posthog.environmentsMcpAnalyticsIntentClustersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsIntentClustersRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsIntentClustersRetrieve>>;

const result: EnvironmentsMcpAnalyticsIntentClustersRetrieveOutput = await posthog.environmentsMcpAnalyticsIntentClustersRetrieve();

// Result shape (from schema): ({ status: "idle" | "computing" | "error"; error_message: string; last_computed_at: string | null; last_computed_by_email: string; clusters: ({ id: number; label: string; intent_count: number; session_count: number; cal...
```

### `posthog.environmentsMcpAnalyticsIntentClustersRecompute`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_analytics/intent_clusters/recompute/`
- **What it does**: Trigger an asynchronous recompute of the intent cluster snapshot. The task runs in the background; poll the GET endpoint for progress (status transitions to 'idle' or 'error').
- **OpenAPI operationId**: `environments_mcp_analytics_intent_clusters_recompute`
- **Path params**: None
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

type EnvironmentsMcpAnalyticsIntentClustersRecomputeInput = Parameters<typeof posthog.environmentsMcpAnalyticsIntentClustersRecompute> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsIntentClustersRecomputeOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsIntentClustersRecompute>>;

const result: EnvironmentsMcpAnalyticsIntentClustersRecomputeOutput = await posthog.environmentsMcpAnalyticsIntentClustersRecompute();

// Result shape (from schema): unknown
```

### `posthog.environmentsMcpAnalyticsMissingCapabilitiesList`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_analytics/missing_capabilities/`
- **What it does**: List missing capability reports for the current project, newest first.
- **OpenAPI operationId**: `environments_mcp_analytics_missing_capabilities_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpAnalyticsMissingCapabilitiesListInput = Parameters<typeof posthog.environmentsMcpAnalyticsMissingCapabilitiesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsMissingCapabilitiesListOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsMissingCapabilitiesList>>;

const result: EnvironmentsMcpAnalyticsMissingCapabilitiesListOutput = await posthog.environmentsMcpAnalyticsMissingCapabilitiesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool:...
```

### `posthog.environmentsMcpAnalyticsMissingCapabilitiesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_analytics/missing_capabilities/`
- **What it does**: Create a new missing capability report for the current project.
- **OpenAPI operationId**: `environments_mcp_analytics_missing_capabilities_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool: string; mcp_client_name: string; mcp_client_version: string; mcp_protocol_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpAnalyticsMissingCapabilitiesCreateInput = Parameters<typeof posthog.environmentsMcpAnalyticsMissingCapabilitiesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsMissingCapabilitiesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsMissingCapabilitiesCreate>>;

const result: EnvironmentsMcpAnalyticsMissingCapabilitiesCreateOutput = await posthog.environmentsMcpAnalyticsMissingCapabilitiesCreate();

// Result shape (from schema): { id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool: string; mcp_client_name: string; mcp_client_version: string; mcp_protocol_...
```

### `posthog.environmentsMcpAnalyticsSessionsList`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_analytics/sessions/`
- **What it does**: List MCP sessions for the current project, derived by grouping $mcp_tool_call events by $mcp_session_id. Ordered by newest session start first by default.
- **OpenAPI operationId**: `environments_mcp_analytics_sessions_list`
- **Path params**: None
- **Query params**: `date_from`, `date_to`, `limit`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ session_id: string; tool_calls: number; session_start: string; session_end: string; distinct_id_count: number; tools_used: (string)[]; mcp_client_name: string; distinct_id: string; person_email: string; pe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpAnalyticsSessionsListInput = Parameters<typeof posthog.environmentsMcpAnalyticsSessionsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsSessionsListOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsSessionsList>>;

const result: EnvironmentsMcpAnalyticsSessionsListOutput = await posthog.environmentsMcpAnalyticsSessionsList();

// Result shape (from schema): { results: ({ session_id: string; tool_calls: number; session_start: string; session_end: string; distinct_id_count: number; tools_used: (string)[]; mcp_client_name: string; distinct_id: string; person_email: string; pe...
```

### `posthog.environmentsMcpAnalyticsSessionsGenerateIntent`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_analytics/sessions/{id}/generate_intent/`
- **What it does**: Generate (or return the cached) LLM summary of the agent's goal for a session, derived from its recorded $mcp_intents. The first call summarises and persists the result; subsequent calls return the stored summary.
- **OpenAPI operationId**: `environments_mcp_analytics_sessions_generate_intent`
- **Path params**: `id`
- **Query params**: `date_from`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ session_id: string; intent: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpAnalyticsSessionsGenerateIntentInput = Parameters<typeof posthog.environmentsMcpAnalyticsSessionsGenerateIntent> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsSessionsGenerateIntentOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsSessionsGenerateIntent>>;

const result: EnvironmentsMcpAnalyticsSessionsGenerateIntentOutput = await posthog.environmentsMcpAnalyticsSessionsGenerateIntent();

// Result shape (from schema): { session_id: string; intent: string }
```

### `posthog.environmentsMcpAnalyticsSessionsToolCalls`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_analytics/sessions/{id}/tool_calls/`
- **What it does**: List a page of the $mcp_tool_call events that belong to a given $session_id, in chronological order.
- **OpenAPI operationId**: `environments_mcp_analytics_sessions_tool_calls`
- **Path params**: `id`
- **Query params**: `date_from`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ event_id: string; timestamp: string; tool_name: string; intent: string; is_error: boolean; error_message: string; duration_ms: number | null })[]; has_next: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpAnalyticsSessionsToolCallsInput = Parameters<typeof posthog.environmentsMcpAnalyticsSessionsToolCalls> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsSessionsToolCallsOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsSessionsToolCalls>>;

const result: EnvironmentsMcpAnalyticsSessionsToolCallsOutput = await posthog.environmentsMcpAnalyticsSessionsToolCalls();

// Result shape (from schema): { results: ({ event_id: string; timestamp: string; tool_name: string; intent: string; is_error: boolean; error_message: string; duration_ms: number | null })[]; has_next: boolean }
```

### `posthog.environmentsMcpAnalyticsSessionsActivityOverview`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_analytics/sessions/activity_overview/`
- **What it does**: Aggregate counters, top tools, agent clients, and the most recent tool calls for the last 30 days, computed in one request. Powers the dashboard's activity view; always computed fresh so polling callers watch data arrive.
- **OpenAPI operationId**: `environments_mcp_analytics_sessions_activity_overview`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ stats: { total_calls: number; distinct_tools: number; distinct_sessions: number; distinct_clients: number; calls_with_intent: number; error_calls: number; missing_capability_reports: number }; top_tools: ({ tool: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpAnalyticsSessionsActivityOverviewInput = Parameters<typeof posthog.environmentsMcpAnalyticsSessionsActivityOverview> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsSessionsActivityOverviewOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsSessionsActivityOverview>>;

const result: EnvironmentsMcpAnalyticsSessionsActivityOverviewOutput = await posthog.environmentsMcpAnalyticsSessionsActivityOverview();

// Result shape (from schema): { stats: { total_calls: number; distinct_tools: number; distinct_sessions: number; distinct_clients: number; calls_with_intent: number; error_calls: number; missing_capability_reports: number }; top_tools: ({ tool: stri...
```

### `posthog.environmentsMcpAnalyticsSessionsIntentDigest`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_analytics/sessions/intent_digest/`
- **What it does**: Generate (or return the cached) LLM digest of what agents are trying to do with this MCP server, derived from the most recent recorded $mcp_intents across all sessions. Content-addressed cache: only regenerates when new intents arrive. Powers the dashboard's low-volume activity stage.
- **OpenAPI operationId**: `environments_mcp_analytics_sessions_intent_digest`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `503`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ digest: string | null; intent_count: number }`
- OpenAPI response codes: `200`, `503`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpAnalyticsSessionsIntentDigestInput = Parameters<typeof posthog.environmentsMcpAnalyticsSessionsIntentDigest> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpAnalyticsSessionsIntentDigestOutput = Awaited<ReturnType<typeof posthog.environmentsMcpAnalyticsSessionsIntentDigest>>;

const result: EnvironmentsMcpAnalyticsSessionsIntentDigestOutput = await posthog.environmentsMcpAnalyticsSessionsIntentDigest();

// Result shape (from schema): { digest: string | null; intent_count: number }
```

### `posthog.mcpAnalyticsFeedbackList`

- **HTTP**: `GET /api/projects/{project_id}/mcp_analytics/feedback/`
- **What it does**: List MCP feedback submissions for the current project, newest first.
- **OpenAPI operationId**: `mcp_analytics_feedback_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpAnalyticsFeedbackListInput = Parameters<typeof posthog.mcpAnalyticsFeedbackList> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsFeedbackListOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsFeedbackList>>;

const result: McpAnalyticsFeedbackListOutput = await posthog.mcpAnalyticsFeedbackList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool:...
```

### `posthog.mcpAnalyticsFeedbackCreate`

- **HTTP**: `POST /api/projects/{project_id}/mcp_analytics/feedback/`
- **What it does**: Create a new MCP feedback submission for the current project.
- **OpenAPI operationId**: `mcp_analytics_feedback_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool: string; mcp_client_name: string; mcp_client_version: string; mcp_protocol_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type McpAnalyticsFeedbackCreateInput = Parameters<typeof posthog.mcpAnalyticsFeedbackCreate> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsFeedbackCreateOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsFeedbackCreate>>;

const result: McpAnalyticsFeedbackCreateOutput = await posthog.mcpAnalyticsFeedbackCreate();

// Result shape (from schema): { id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool: string; mcp_client_name: string; mcp_client_version: string; mcp_protocol_...
```

### `posthog.mcpAnalyticsIntentClustersRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/mcp_analytics/intent_clusters/`
- **What it does**: Return the most recent intent cluster snapshot for the current project. Returns an empty IDLE snapshot when no clustering run has happened yet.
- **OpenAPI operationId**: `mcp_analytics_intent_clusters_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ status: "idle" | "computing" | "error"; error_message: string; last_computed_at: string | null; last_computed_by_email: string; clusters: ({ id: number; label: string; intent_count: number; session_count: number; cal...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpAnalyticsIntentClustersRetrieveInput = Parameters<typeof posthog.mcpAnalyticsIntentClustersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsIntentClustersRetrieveOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsIntentClustersRetrieve>>;

const result: McpAnalyticsIntentClustersRetrieveOutput = await posthog.mcpAnalyticsIntentClustersRetrieve();

// Result shape (from schema): ({ status: "idle" | "computing" | "error"; error_message: string; last_computed_at: string | null; last_computed_by_email: string; clusters: ({ id: number; label: string; intent_count: number; session_count: number; cal...
```

### `posthog.mcpAnalyticsIntentClustersRecompute`

- **HTTP**: `POST /api/projects/{project_id}/mcp_analytics/intent_clusters/recompute/`
- **What it does**: Trigger an asynchronous recompute of the intent cluster snapshot. The task runs in the background; poll the GET endpoint for progress (status transitions to 'idle' or 'error').
- **OpenAPI operationId**: `mcp_analytics_intent_clusters_recompute`
- **Path params**: None
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

type McpAnalyticsIntentClustersRecomputeInput = Parameters<typeof posthog.mcpAnalyticsIntentClustersRecompute> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsIntentClustersRecomputeOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsIntentClustersRecompute>>;

const result: McpAnalyticsIntentClustersRecomputeOutput = await posthog.mcpAnalyticsIntentClustersRecompute();

// Result shape (from schema): unknown
```

### `posthog.mcpAnalyticsMissingCapabilitiesList`

- **HTTP**: `GET /api/projects/{project_id}/mcp_analytics/missing_capabilities/`
- **What it does**: List missing capability reports for the current project, newest first.
- **OpenAPI operationId**: `mcp_analytics_missing_capabilities_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpAnalyticsMissingCapabilitiesListInput = Parameters<typeof posthog.mcpAnalyticsMissingCapabilitiesList> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsMissingCapabilitiesListOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsMissingCapabilitiesList>>;

const result: McpAnalyticsMissingCapabilitiesListOutput = await posthog.mcpAnalyticsMissingCapabilitiesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool:...
```

### `posthog.mcpAnalyticsMissingCapabilitiesCreate`

- **HTTP**: `POST /api/projects/{project_id}/mcp_analytics/missing_capabilities/`
- **What it does**: Create a new missing capability report for the current project.
- **OpenAPI operationId**: `mcp_analytics_missing_capabilities_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool: string; mcp_client_name: string; mcp_client_version: string; mcp_protocol_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type McpAnalyticsMissingCapabilitiesCreateInput = Parameters<typeof posthog.mcpAnalyticsMissingCapabilitiesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsMissingCapabilitiesCreateOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsMissingCapabilitiesCreate>>;

const result: McpAnalyticsMissingCapabilitiesCreateOutput = await posthog.mcpAnalyticsMissingCapabilitiesCreate();

// Result shape (from schema): { id: string; kind: "feedback" | "missing_capability"; goal: string; summary: string; category: string; blocked: boolean | null; attempted_tool: string; mcp_client_name: string; mcp_client_version: string; mcp_protocol_...
```

### `posthog.mcpAnalyticsSessionsList`

- **HTTP**: `GET /api/projects/{project_id}/mcp_analytics/sessions/`
- **What it does**: List MCP sessions for the current project, derived by grouping $mcp_tool_call events by $mcp_session_id. Ordered by newest session start first by default.
- **OpenAPI operationId**: `mcp_analytics_sessions_list`
- **Path params**: None
- **Query params**: `date_from`, `date_to`, `limit`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ session_id: string; tool_calls: number; session_start: string; session_end: string; distinct_id_count: number; tools_used: (string)[]; mcp_client_name: string; distinct_id: string; person_email: string; pe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpAnalyticsSessionsListInput = Parameters<typeof posthog.mcpAnalyticsSessionsList> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsSessionsListOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsSessionsList>>;

const result: McpAnalyticsSessionsListOutput = await posthog.mcpAnalyticsSessionsList();

// Result shape (from schema): { results: ({ session_id: string; tool_calls: number; session_start: string; session_end: string; distinct_id_count: number; tools_used: (string)[]; mcp_client_name: string; distinct_id: string; person_email: string; pe...
```

### `posthog.mcpAnalyticsSessionsGenerateIntent`

- **HTTP**: `POST /api/projects/{project_id}/mcp_analytics/sessions/{id}/generate_intent/`
- **What it does**: Generate (or return the cached) LLM summary of the agent's goal for a session, derived from its recorded $mcp_intents. The first call summarises and persists the result; subsequent calls return the stored summary.
- **OpenAPI operationId**: `mcp_analytics_sessions_generate_intent`
- **Path params**: `id`
- **Query params**: `date_from`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ session_id: string; intent: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpAnalyticsSessionsGenerateIntentInput = Parameters<typeof posthog.mcpAnalyticsSessionsGenerateIntent> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsSessionsGenerateIntentOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsSessionsGenerateIntent>>;

const result: McpAnalyticsSessionsGenerateIntentOutput = await posthog.mcpAnalyticsSessionsGenerateIntent();

// Result shape (from schema): { session_id: string; intent: string }
```

### `posthog.mcpAnalyticsSessionsToolCalls`

- **HTTP**: `GET /api/projects/{project_id}/mcp_analytics/sessions/{id}/tool_calls/`
- **What it does**: List a page of the $mcp_tool_call events that belong to a given $session_id, in chronological order.
- **OpenAPI operationId**: `mcp_analytics_sessions_tool_calls`
- **Path params**: `id`
- **Query params**: `date_from`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ event_id: string; timestamp: string; tool_name: string; intent: string; is_error: boolean; error_message: string; duration_ms: number | null })[]; has_next: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpAnalyticsSessionsToolCallsInput = Parameters<typeof posthog.mcpAnalyticsSessionsToolCalls> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsSessionsToolCallsOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsSessionsToolCalls>>;

const result: McpAnalyticsSessionsToolCallsOutput = await posthog.mcpAnalyticsSessionsToolCalls();

// Result shape (from schema): { results: ({ event_id: string; timestamp: string; tool_name: string; intent: string; is_error: boolean; error_message: string; duration_ms: number | null })[]; has_next: boolean }
```

### `posthog.mcpAnalyticsSessionsActivityOverview`

- **HTTP**: `GET /api/projects/{project_id}/mcp_analytics/sessions/activity_overview/`
- **What it does**: Aggregate counters, top tools, agent clients, and the most recent tool calls for the last 30 days, computed in one request. Powers the dashboard's activity view; always computed fresh so polling callers watch data arrive.
- **OpenAPI operationId**: `mcp_analytics_sessions_activity_overview`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ stats: { total_calls: number; distinct_tools: number; distinct_sessions: number; distinct_clients: number; calls_with_intent: number; error_calls: number; missing_capability_reports: number }; top_tools: ({ tool: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpAnalyticsSessionsActivityOverviewInput = Parameters<typeof posthog.mcpAnalyticsSessionsActivityOverview> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsSessionsActivityOverviewOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsSessionsActivityOverview>>;

const result: McpAnalyticsSessionsActivityOverviewOutput = await posthog.mcpAnalyticsSessionsActivityOverview();

// Result shape (from schema): { stats: { total_calls: number; distinct_tools: number; distinct_sessions: number; distinct_clients: number; calls_with_intent: number; error_calls: number; missing_capability_reports: number }; top_tools: ({ tool: stri...
```

### `posthog.mcpAnalyticsSessionsIntentDigest`

- **HTTP**: `POST /api/projects/{project_id}/mcp_analytics/sessions/intent_digest/`
- **What it does**: Generate (or return the cached) LLM digest of what agents are trying to do with this MCP server, derived from the most recent recorded $mcp_intents across all sessions. Content-addressed cache: only regenerates when new intents arrive. Powers the dashboard's low-volume activity stage.
- **OpenAPI operationId**: `mcp_analytics_sessions_intent_digest`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `503`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ digest: string | null; intent_count: number }`
- OpenAPI response codes: `200`, `503`

```ts
import posthog from "@utdk/posthog";

type McpAnalyticsSessionsIntentDigestInput = Parameters<typeof posthog.mcpAnalyticsSessionsIntentDigest> extends [infer T, ...unknown[]] ? T : undefined;
type McpAnalyticsSessionsIntentDigestOutput = Awaited<ReturnType<typeof posthog.mcpAnalyticsSessionsIntentDigest>>;

const result: McpAnalyticsSessionsIntentDigestOutput = await posthog.mcpAnalyticsSessionsIntentDigest();

// Result shape (from schema): { digest: string | null; intent_count: number }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# Vision

## Operations

### `posthog.environmentsVisionObservationsList`

- **HTTP**: `GET /api/environments/{environment_id}/vision/observations/`
- **What it does**: Read-only access to a session's observations across every scanner the caller can read, for the replay-page dock.
- **OpenAPI operationId**: `environments_vision_observations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `order_by`, `session_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionObservationsListInput = Parameters<typeof posthog.environmentsVisionObservationsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionObservationsListOutput = Awaited<ReturnType<typeof posthog.environmentsVisionObservationsList>>;

const result: EnvironmentsVisionObservationsListOutput = await posthog.environmentsVisionObservationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: strin...
```

### `posthog.environmentsVisionObservationsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/vision/observations/{id}/`
- **What it does**: Retrieve one observation. Any list filters passed along (status, tags, order_by, …) scope the `previous_observation_id`/`next_observation_id` navigation to the matching, identically-ordered set — so prev/next from a filtered table stays within that filtered list.
- **OpenAPI operationId**: `environments_vision_observations_retrieve`
- **Path params**: `id`
- **Query params**: `labeled`, `order_by`, `recording_subject`, `session_id`, `status`, `tags`, `triggered_by`, `verdict`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: string; workflow_id: string; scanner_snapshot: { name: string; scanner_type: "mo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionObservationsRetrieveInput = Parameters<typeof posthog.environmentsVisionObservationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionObservationsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsVisionObservationsRetrieve>>;

const result: EnvironmentsVisionObservationsRetrieveOutput = await posthog.environmentsVisionObservationsRetrieve();

// Result shape (from schema): { id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: string; workflow_id: string; scanner_snapshot: { name: string; scanner_type: "mo...
```

### `posthog.environmentsVisionObservationsLabelDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/vision/observations/{id}/label/`
- **What it does**: Remove the observation's shared label. Requires session recording edit access.
- **OpenAPI operationId**: `environments_vision_observations_label_destroy`
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

type EnvironmentsVisionObservationsLabelDestroyInput = Parameters<typeof posthog.environmentsVisionObservationsLabelDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionObservationsLabelDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsVisionObservationsLabelDestroy>>;

const result: EnvironmentsVisionObservationsLabelDestroyOutput = await posthog.environmentsVisionObservationsLabelDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsVisionObservationsLabelCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/observations/{id}/label/`
- **What it does**: Set or update the observation's shared label: whether the scanner scored the session correctly, plus optional feedback on what it got wrong. One label per observation, shared across the team; these labels feed prompt improvement. Requires session recording edit access.
- **OpenAPI operationId**: `environments_vision_observations_label_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ is_correct: boolean; feedback?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionObservationsLabelCreateInput = Parameters<typeof posthog.environmentsVisionObservationsLabelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionObservationsLabelCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionObservationsLabelCreate>>;

const result: EnvironmentsVisionObservationsLabelCreateOutput = await posthog.environmentsVisionObservationsLabelCreate();

// Result shape (from schema): { is_correct: boolean; feedback?: string }
```

### `posthog.environmentsVisionObservationsRetryCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/observations/{id}/retry/`
- **What it does**: Delete a failed observation and re-run its scanner on the same recording. Returns 202 with the workflow handle.
- **OpenAPI operationId**: `environments_vision_observations_retry_create`
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

type EnvironmentsVisionObservationsRetryCreateInput = Parameters<typeof posthog.environmentsVisionObservationsRetryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionObservationsRetryCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionObservationsRetryCreate>>;

const result: EnvironmentsVisionObservationsRetryCreateOutput = await posthog.environmentsVisionObservationsRetryCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsEnvironmentVisionQuotaRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/vision/quota/`
- **OpenAPI operationId**: `environments_environment_vision_quota_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ credit_limit: number | null; credits_used: number; remaining: number | null; exhausted: boolean; period_start: string; period_end: string; projected_monthly_credits: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEnvironmentVisionQuotaRetrieveInput = Parameters<typeof posthog.environmentsEnvironmentVisionQuotaRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEnvironmentVisionQuotaRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEnvironmentVisionQuotaRetrieve>>;

const result: EnvironmentsEnvironmentVisionQuotaRetrieveOutput = await posthog.environmentsEnvironmentVisionQuotaRetrieve();

// Result shape (from schema): { credit_limit: number | null; credits_used: number; remaining: number | null; exhausted: boolean; period_start: string; period_end: string; projected_monthly_credits: number }
```

### `posthog.environmentsVisionScannersList`

- **HTTP**: `GET /api/environments/{environment_id}/vision/scanners/`
- **What it does**: CRUD for Replay Vision scanners.
- **OpenAPI operationId**: `environments_vision_scanners_list`
- **Path params**: None
- **Query params**: `created_by`, `emits_signals`, `enabled`, `limit`, `offset`, `order_by`, `scanner_type`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; que...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersListInput = Parameters<typeof posthog.environmentsVisionScannersList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersListOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersList>>;

const result: EnvironmentsVisionScannersListOutput = await posthog.environmentsVisionScannersList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; que...
```

### `posthog.environmentsVisionScannersCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/scanners/`
- **What it does**: CRUD for Replay Vision scanners.
- **OpenAPI operationId**: `environments_vision_scanners_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersCreateInput = Parameters<typeof posthog.environmentsVisionScannersCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersCreate>>;

const result: EnvironmentsVisionScannersCreateOutput = await posthog.environmentsVisionScannersCreate();

// Result shape (from schema): { id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...
```

### `posthog.environmentsVisionScannersDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/vision/scanners/{id}/`
- **What it does**: CRUD for Replay Vision scanners.
- **OpenAPI operationId**: `environments_vision_scanners_destroy`
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

type EnvironmentsVisionScannersDestroyInput = Parameters<typeof posthog.environmentsVisionScannersDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersDestroy>>;

const result: EnvironmentsVisionScannersDestroyOutput = await posthog.environmentsVisionScannersDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsVisionScannersRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/vision/scanners/{id}/`
- **What it does**: CRUD for Replay Vision scanners.
- **OpenAPI operationId**: `environments_vision_scanners_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersRetrieveInput = Parameters<typeof posthog.environmentsVisionScannersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersRetrieve>>;

const result: EnvironmentsVisionScannersRetrieveOutput = await posthog.environmentsVisionScannersRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...
```

### `posthog.environmentsVisionScannersPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/vision/scanners/{id}/`
- **What it does**: CRUD for Replay Vision scanners.
- **OpenAPI operationId**: `environments_vision_scanners_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersPartialUpdateInput = Parameters<typeof posthog.environmentsVisionScannersPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersPartialUpdate>>;

const result: EnvironmentsVisionScannersPartialUpdateOutput = await posthog.environmentsVisionScannersPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...
```

### `posthog.environmentsVisionScannersObserveCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/scanners/{id}/observe/`
- **What it does**: Apply this scanner to one specific session, on demand. Returns 202 with the workflow handle.
- **OpenAPI operationId**: `environments_vision_scanners_observe_create`
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

type EnvironmentsVisionScannersObserveCreateInput = Parameters<typeof posthog.environmentsVisionScannersObserveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersObserveCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersObserveCreate>>;

const result: EnvironmentsVisionScannersObserveCreateOutput = await posthog.environmentsVisionScannersObserveCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsVisionScannersObservationsList`

- **HTTP**: `GET /api/environments/{environment_id}/vision/scanners/{scanner_id}/observations/`
- **What it does**: Read-only access to observations produced by a scanner.
- **OpenAPI operationId**: `environments_vision_scanners_observations_list`
- **Path params**: `scanner_id`
- **Query params**: `labeled`, `limit`, `offset`, `order_by`, `recording_subject`, `session_id`, `status`, `tags`, `triggered_by`, `verdict`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersObservationsListInput = Parameters<typeof posthog.environmentsVisionScannersObservationsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersObservationsListOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersObservationsList>>;

const result: EnvironmentsVisionScannersObservationsListOutput = await posthog.environmentsVisionScannersObservationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: strin...
```

### `posthog.environmentsVisionScannersObservationsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/vision/scanners/{scanner_id}/observations/{id}/`
- **What it does**: Retrieve one observation. Any list filters passed along (status, tags, order_by, …) scope the `previous_observation_id`/`next_observation_id` navigation to the matching, identically-ordered set — so prev/next from a filtered table stays within that filtered list.
- **OpenAPI operationId**: `environments_vision_scanners_observations_retrieve`
- **Path params**: `id`, `scanner_id`
- **Query params**: `labeled`, `order_by`, `recording_subject`, `session_id`, `status`, `tags`, `triggered_by`, `verdict`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: string; workflow_id: string; scanner_snapshot: { name: string; scanner_type: "mo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersObservationsRetrieveInput = Parameters<typeof posthog.environmentsVisionScannersObservationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersObservationsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersObservationsRetrieve>>;

const result: EnvironmentsVisionScannersObservationsRetrieveOutput = await posthog.environmentsVisionScannersObservationsRetrieve();

// Result shape (from schema): { id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: string; workflow_id: string; scanner_snapshot: { name: string; scanner_type: "mo...
```

### `posthog.environmentsVisionScannersObservationsLabelDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/vision/scanners/{scanner_id}/observations/{id}/label/`
- **What it does**: Remove the observation's shared label. Requires session recording edit access.
- **OpenAPI operationId**: `environments_vision_scanners_observations_label_destroy`
- **Path params**: `id`, `scanner_id`
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

type EnvironmentsVisionScannersObservationsLabelDestroyInput = Parameters<typeof posthog.environmentsVisionScannersObservationsLabelDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersObservationsLabelDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersObservationsLabelDestroy>>;

const result: EnvironmentsVisionScannersObservationsLabelDestroyOutput = await posthog.environmentsVisionScannersObservationsLabelDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsVisionScannersObservationsLabelCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/scanners/{scanner_id}/observations/{id}/label/`
- **What it does**: Set or update the observation's shared label: whether the scanner scored the session correctly, plus optional feedback on what it got wrong. One label per observation, shared across the team; these labels feed prompt improvement. Requires session recording edit access.
- **OpenAPI operationId**: `environments_vision_scanners_observations_label_create`
- **Path params**: `id`, `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ is_correct: boolean; feedback?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersObservationsLabelCreateInput = Parameters<typeof posthog.environmentsVisionScannersObservationsLabelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersObservationsLabelCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersObservationsLabelCreate>>;

const result: EnvironmentsVisionScannersObservationsLabelCreateOutput = await posthog.environmentsVisionScannersObservationsLabelCreate();

// Result shape (from schema): { is_correct: boolean; feedback?: string }
```

### `posthog.environmentsVisionScannersObservationsRetryCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/scanners/{scanner_id}/observations/{id}/retry/`
- **What it does**: Delete a failed observation and re-run its scanner on the same recording. Returns 202 with the workflow handle.
- **OpenAPI operationId**: `environments_vision_scanners_observations_retry_create`
- **Path params**: `id`, `scanner_id`
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

type EnvironmentsVisionScannersObservationsRetryCreateInput = Parameters<typeof posthog.environmentsVisionScannersObservationsRetryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersObservationsRetryCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersObservationsRetryCreate>>;

const result: EnvironmentsVisionScannersObservationsRetryCreateOutput = await posthog.environmentsVisionScannersObservationsRetryCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsVisionScannersObservationsStatsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/vision/scanners/{scanner_id}/observations/stats/`
- **What it does**: Aggregate counts and per-scanner-type distributions over the filtered observation set. Same filters as the list endpoint apply.
- **OpenAPI operationId**: `environments_vision_scanners_observations_stats_retrieve`
- **Path params**: `scanner_id`
- **Query params**: `labeled`, `recent_days`, `recording_subject`, `session_id`, `status`, `tags`, `triggered_by`, `verdict`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status_counts: { total: number; succeeded: number; failed: number; ineligible: number; in_flight: number; success_rate: number | null }; coverage: { recent_sessions: number; total_sessions: number; recent_days: number...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersObservationsStatsRetrieveInput = Parameters<typeof posthog.environmentsVisionScannersObservationsStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersObservationsStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersObservationsStatsRetrieve>>;

const result: EnvironmentsVisionScannersObservationsStatsRetrieveOutput = await posthog.environmentsVisionScannersObservationsStatsRetrieve();

// Result shape (from schema): { status_counts: { total: number; succeeded: number; failed: number; ineligible: number; in_flight: number; success_rate: number | null }; coverage: { recent_sessions: number; total_sessions: number; recent_days: number...
```

### `posthog.environmentsVisionScannersPromptSuggestionsList`

- **HTTP**: `GET /api/environments/{environment_id}/vision/scanners/{scanner_id}/prompt_suggestions/`
- **What it does**: AI prompt-rewrite suggestions for a scanner, generated from the team's thumbs up/down ratings.
- **OpenAPI operationId**: `environments_vision_scanners_prompt_suggestions_list`
- **Path params**: `scanner_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersPromptSuggestionsListInput = Parameters<typeof posthog.environmentsVisionScannersPromptSuggestionsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersPromptSuggestionsListOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersPromptSuggestionsList>>;

const result: EnvironmentsVisionScannersPromptSuggestionsListOutput = await posthog.environmentsVisionScannersPromptSuggestionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale...
```

### `posthog.environmentsVisionScannersPromptSuggestionsApplyCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/scanners/{scanner_id}/prompt_suggestions/{id}/apply/`
- **What it does**: Apply this suggestion: write its prompt to the scanner (bumping the scanner version) and mark the suggestion applied. Only the current pending suggestion can be applied. Requires session recording edit access.
- **OpenAPI operationId**: `environments_vision_scanners_prompt_suggestions_apply_create`
- **Path params**: `id`, `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersPromptSuggestionsApplyCreateInput = Parameters<typeof posthog.environmentsVisionScannersPromptSuggestionsApplyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersPromptSuggestionsApplyCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersPromptSuggestionsApplyCreate>>;

const result: EnvironmentsVisionScannersPromptSuggestionsApplyCreateOutput = await posthog.environmentsVisionScannersPromptSuggestionsApplyCreate();

// Result shape (from schema): { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...
```

### `posthog.environmentsVisionScannersPromptSuggestionsDismissCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/scanners/{scanner_id}/prompt_suggestions/{id}/dismiss/`
- **What it does**: Dismiss this suggestion without applying it. Only the current pending suggestion can be dismissed. Requires session recording edit access.
- **OpenAPI operationId**: `environments_vision_scanners_prompt_suggestions_dismiss_create`
- **Path params**: `id`, `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersPromptSuggestionsDismissCreateInput = Parameters<typeof posthog.environmentsVisionScannersPromptSuggestionsDismissCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersPromptSuggestionsDismissCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersPromptSuggestionsDismissCreate>>;

const result: EnvironmentsVisionScannersPromptSuggestionsDismissCreateOutput = await posthog.environmentsVisionScannersPromptSuggestionsDismissCreate();

// Result shape (from schema): { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...
```

### `posthog.environmentsVisionScannersPromptSuggestionsEvaluateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/scanners/{scanner_id}/prompt_suggestions/{id}/evaluate/`
- **What it does**: Test this suggestion before applying it: re-run the scanner with the suggested prompt against already-rated sessions in the background and compare each fresh output with the stored one. Results land on the suggestion's `evaluation` field. Poll `current` while status is running. `session_limit` controls how many rated sessions are re-run (thumbs-down prioritized, up to `evaluation_session_cap`). Each successful re-run charges credits like a normal observation of the same model. The request is refused with 402 when the planned credits exceed what is left of the monthly limit. Only monitor and classifier scanners are supported. Requires session recording edit access.
- **OpenAPI operationId**: `environments_vision_scanners_prompt_suggestions_evaluate_create`
- **Path params**: `id`, `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersPromptSuggestionsEvaluateCreateInput = Parameters<typeof posthog.environmentsVisionScannersPromptSuggestionsEvaluateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersPromptSuggestionsEvaluateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersPromptSuggestionsEvaluateCreate>>;

const result: EnvironmentsVisionScannersPromptSuggestionsEvaluateCreateOutput = await posthog.environmentsVisionScannersPromptSuggestionsEvaluateCreate();

// Result shape (from schema): { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...
```

### `posthog.environmentsVisionScannersPromptSuggestionsCurrentRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/vision/scanners/{scanner_id}/prompt_suggestions/current/`
- **What it does**: The scanner's newest prompt suggestion plus whether it is stale (the ratings changed since it was generated) and how many rated observations are available.
- **OpenAPI operationId**: `environments_vision_scanners_prompt_suggestions_current_retrieve`
- **Path params**: `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ suggestion: { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersPromptSuggestionsCurrentRetrieveInput = Parameters<typeof posthog.environmentsVisionScannersPromptSuggestionsCurrentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersPromptSuggestionsCurrentRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersPromptSuggestionsCurrentRetrieve>>;

const result: EnvironmentsVisionScannersPromptSuggestionsCurrentRetrieveOutput = await posthog.environmentsVisionScannersPromptSuggestionsCurrentRetrieve();

// Result shape (from schema): { suggestion: { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner...
```

### `posthog.environmentsVisionScannersPromptSuggestionsGenerateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/scanners/{scanner_id}/prompt_suggestions/generate/`
- **What it does**: Generate a fresh prompt suggestion from the team's current ratings. The previous pending suggestion becomes history (superseded). Requires at least one rated observation and session recording edit access.
- **OpenAPI operationId**: `environments_vision_scanners_prompt_suggestions_generate_create`
- **Path params**: `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersPromptSuggestionsGenerateCreateInput = Parameters<typeof posthog.environmentsVisionScannersPromptSuggestionsGenerateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersPromptSuggestionsGenerateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersPromptSuggestionsGenerateCreate>>;

const result: EnvironmentsVisionScannersPromptSuggestionsGenerateCreateOutput = await posthog.environmentsVisionScannersPromptSuggestionsGenerateCreate();

// Result shape (from schema): { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...
```

### `posthog.environmentsVisionScannersCreatorsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/vision/scanners/creators/`
- **What it does**: Distinct creators across the team's scanners — feeds the `Created by` filter dropdown.
- **OpenAPI operationId**: `environments_vision_scanners_creators_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ creators: ({ id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersCreatorsRetrieveInput = Parameters<typeof posthog.environmentsVisionScannersCreatorsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersCreatorsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersCreatorsRetrieve>>;

const result: EnvironmentsVisionScannersCreatorsRetrieveOutput = await posthog.environmentsVisionScannersCreatorsRetrieve();

// Result shape (from schema): { creators: ({ id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_...
```

### `posthog.environmentsVisionScannersEstimateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/scanners/estimate/`
- **What it does**: Estimate the observation volume a proposed scanner would generate, for the pre-save cost preview.
- **OpenAPI operationId**: `environments_vision_scanners_estimate_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ matched_sessions_in_window: number; window_days: number; estimated_observations_per_month: number; credits_per_observation: number; estimated_credits_per_month: number; other_enabled_scanners_monthly_credits: number; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersEstimateCreateInput = Parameters<typeof posthog.environmentsVisionScannersEstimateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersEstimateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersEstimateCreate>>;

const result: EnvironmentsVisionScannersEstimateCreateOutput = await posthog.environmentsVisionScannersEstimateCreate();

// Result shape (from schema): { matched_sessions_in_window: number; window_days: number; estimated_observations_per_month: number; credits_per_observation: number; estimated_credits_per_month: number; other_enabled_scanners_monthly_credits: number; ...
```

### `posthog.environmentsVisionScannersStatsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/vision/scanners/stats/`
- **What it does**: Team-wide scanner counts — independent of list filters, so the overview stays stable.
- **OpenAPI operationId**: `environments_vision_scanners_stats_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ total: number; enabled: number; by_type: { monitor: { enabled: number; total: number }; classifier: { enabled: number; total: number }; scorer: unknown; summarizer: unknown } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersStatsRetrieveInput = Parameters<typeof posthog.environmentsVisionScannersStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersStatsRetrieve>>;

const result: EnvironmentsVisionScannersStatsRetrieveOutput = await posthog.environmentsVisionScannersStatsRetrieve();

// Result shape (from schema): { total: number; enabled: number; by_type: { monitor: { enabled: number; total: number }; classifier: { enabled: number; total: number }; scorer: unknown; summarizer: unknown } }
```

### `posthog.environmentsVisionScannersSuggestTagsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/vision/scanners/suggest_tags/`
- **What it does**: Suggest classifier tags grounded in the scanner's own observations and the org's product data.
- **OpenAPI operationId**: `environments_vision_scanners_suggest_tags_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ suggestions: ({ tag: string; rationale: string; source: "observed" | "product" | "prompt" })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsVisionScannersSuggestTagsCreateInput = Parameters<typeof posthog.environmentsVisionScannersSuggestTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsVisionScannersSuggestTagsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsVisionScannersSuggestTagsCreate>>;

const result: EnvironmentsVisionScannersSuggestTagsCreateOutput = await posthog.environmentsVisionScannersSuggestTagsCreate();

// Result shape (from schema): { suggestions: ({ tag: string; rationale: string; source: "observed" | "product" | "prompt" })[] }
```

### `posthog.visionActionsList`

- **HTTP**: `GET /api/projects/{project_id}/vision/actions/`
- **What it does**: CRUD for Replay Vision actions — scheduled "and then…" automations over a scanner's observations.
- **OpenAPI operationId**: `vision_actions_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `scanner`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; scanner: string; enabled?: boolean; is_scanner_digest?: boolean; trigger_type?: "schedule" | "threshold"; mode?: "gr...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionActionsListInput = Parameters<typeof posthog.visionActionsList> extends [infer T, ...unknown[]] ? T : undefined;
type VisionActionsListOutput = Awaited<ReturnType<typeof posthog.visionActionsList>>;

const result: VisionActionsListOutput = await posthog.visionActionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; scanner: string; enabled?: boolean; is_scanner_digest?: boolean; trigger_type?: "schedule" | "threshold"; mode?: "gr...
```

### `posthog.visionActionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/actions/`
- **What it does**: CRUD for Replay Vision actions — scheduled "and then…" automations over a scanner's observations.
- **OpenAPI operationId**: `vision_actions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; scanner: string; enabled?: boolean; is_scanner_digest?: boolean; trigger_type?: "schedule" | "threshold"; mode?: "group_summary" | "per_observation"; trigger_config?: { rrule?: string; timezo...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type VisionActionsCreateInput = Parameters<typeof posthog.visionActionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionActionsCreateOutput = Awaited<ReturnType<typeof posthog.visionActionsCreate>>;

const result: VisionActionsCreateOutput = await posthog.visionActionsCreate();

// Result shape (from schema): { id: string; name: string; scanner: string; enabled?: boolean; is_scanner_digest?: boolean; trigger_type?: "schedule" | "threshold"; mode?: "group_summary" | "per_observation"; trigger_config?: { rrule?: string; timezo...
```

### `posthog.visionActionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/vision/actions/{id}/`
- **What it does**: CRUD for Replay Vision actions — scheduled "and then…" automations over a scanner's observations.
- **OpenAPI operationId**: `vision_actions_destroy`
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

type VisionActionsDestroyInput = Parameters<typeof posthog.visionActionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type VisionActionsDestroyOutput = Awaited<ReturnType<typeof posthog.visionActionsDestroy>>;

const result: VisionActionsDestroyOutput = await posthog.visionActionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.visionActionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/vision/actions/{id}/`
- **What it does**: CRUD for Replay Vision actions — scheduled "and then…" automations over a scanner's observations.
- **OpenAPI operationId**: `vision_actions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; scanner: string; enabled?: boolean; is_scanner_digest?: boolean; trigger_type?: "schedule" | "threshold"; mode?: "group_summary" | "per_observation"; trigger_config?: { rrule?: string; timezo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionActionsRetrieveInput = Parameters<typeof posthog.visionActionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisionActionsRetrieveOutput = Awaited<ReturnType<typeof posthog.visionActionsRetrieve>>;

const result: VisionActionsRetrieveOutput = await posthog.visionActionsRetrieve();

// Result shape (from schema): { id: string; name: string; scanner: string; enabled?: boolean; is_scanner_digest?: boolean; trigger_type?: "schedule" | "threshold"; mode?: "group_summary" | "per_observation"; trigger_config?: { rrule?: string; timezo...
```

### `posthog.visionActionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/vision/actions/{id}/`
- **What it does**: CRUD for Replay Vision actions — scheduled "and then…" automations over a scanner's observations.
- **OpenAPI operationId**: `vision_actions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; scanner: string; enabled?: boolean; is_scanner_digest?: boolean; trigger_type?: "schedule" | "threshold"; mode?: "group_summary" | "per_observation"; trigger_config?: { rrule?: string; timezo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionActionsPartialUpdateInput = Parameters<typeof posthog.visionActionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionActionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.visionActionsPartialUpdate>>;

const result: VisionActionsPartialUpdateOutput = await posthog.visionActionsPartialUpdate();

// Result shape (from schema): { id: string; name: string; scanner: string; enabled?: boolean; is_scanner_digest?: boolean; trigger_type?: "schedule" | "threshold"; mode?: "group_summary" | "per_observation"; trigger_config?: { rrule?: string; timezo...
```

### `posthog.visionActionsRunsList`

- **HTTP**: `GET /api/projects/{project_id}/vision/actions/{vision_action_id}/runs/`
- **What it does**: Read-only run history for a single vision action (nested under /vision/actions/{action_id}/runs/).
- **OpenAPI operationId**: `vision_actions_runs_list`
- **Path params**: `vision_action_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "running" | "completed" | "failed" | "skipped"; scheduled_at: string | null; observation_count: number; error_reason: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionActionsRunsListInput = Parameters<typeof posthog.visionActionsRunsList> extends [infer T, ...unknown[]] ? T : undefined;
type VisionActionsRunsListOutput = Awaited<ReturnType<typeof posthog.visionActionsRunsList>>;

const result: VisionActionsRunsListOutput = await posthog.visionActionsRunsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "running" | "completed" | "failed" | "skipped"; scheduled_at: string | null; observation_count: number; error_reason: stri...
```

### `posthog.visionActionsRunsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/vision/actions/{vision_action_id}/runs/{id}/`
- **What it does**: Read-only run history for a single vision action (nested under /vision/actions/{action_id}/runs/).
- **OpenAPI operationId**: `vision_actions_runs_retrieve`
- **Path params**: `id`, `vision_action_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "running" | "completed" | "failed" | "skipped"; scheduled_at: string | null; observation_count: number; error_reason: string | null; created_at: string; updated_at: string; synthesized_markdown: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionActionsRunsRetrieveInput = Parameters<typeof posthog.visionActionsRunsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisionActionsRunsRetrieveOutput = Awaited<ReturnType<typeof posthog.visionActionsRunsRetrieve>>;

const result: VisionActionsRunsRetrieveOutput = await posthog.visionActionsRunsRetrieve();

// Result shape (from schema): { id: string; status: "running" | "completed" | "failed" | "skipped"; scheduled_at: string | null; observation_count: number; error_reason: string | null; created_at: string; updated_at: string; synthesized_markdown: st...
```

### `posthog.visionObservationsList`

- **HTTP**: `GET /api/projects/{project_id}/vision/observations/`
- **What it does**: Read-only access to a session's observations across every scanner the caller can read, for the replay-page dock.
- **OpenAPI operationId**: `vision_observations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `order_by`, `session_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionObservationsListInput = Parameters<typeof posthog.visionObservationsList> extends [infer T, ...unknown[]] ? T : undefined;
type VisionObservationsListOutput = Awaited<ReturnType<typeof posthog.visionObservationsList>>;

const result: VisionObservationsListOutput = await posthog.visionObservationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: strin...
```

### `posthog.visionObservationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/vision/observations/{id}/`
- **What it does**: Retrieve one observation. Any list filters passed along (status, tags, order_by, …) scope the `previous_observation_id`/`next_observation_id` navigation to the matching, identically-ordered set — so prev/next from a filtered table stays within that filtered list.
- **OpenAPI operationId**: `vision_observations_retrieve`
- **Path params**: `id`
- **Query params**: `labeled`, `order_by`, `recording_subject`, `session_id`, `status`, `tags`, `triggered_by`, `verdict`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: string; workflow_id: string; scanner_snapshot: { name: string; scanner_type: "mo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionObservationsRetrieveInput = Parameters<typeof posthog.visionObservationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisionObservationsRetrieveOutput = Awaited<ReturnType<typeof posthog.visionObservationsRetrieve>>;

const result: VisionObservationsRetrieveOutput = await posthog.visionObservationsRetrieve();

// Result shape (from schema): { id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: string; workflow_id: string; scanner_snapshot: { name: string; scanner_type: "mo...
```

### `posthog.visionObservationsLabelDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/vision/observations/{id}/label/`
- **What it does**: Remove the observation's shared label. Requires session recording edit access.
- **OpenAPI operationId**: `vision_observations_label_destroy`
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

type VisionObservationsLabelDestroyInput = Parameters<typeof posthog.visionObservationsLabelDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type VisionObservationsLabelDestroyOutput = Awaited<ReturnType<typeof posthog.visionObservationsLabelDestroy>>;

const result: VisionObservationsLabelDestroyOutput = await posthog.visionObservationsLabelDestroy();

// Result shape (from schema): unknown
```

### `posthog.visionObservationsLabelCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/observations/{id}/label/`
- **What it does**: Set or update the observation's shared label: whether the scanner scored the session correctly, plus optional feedback on what it got wrong. One label per observation, shared across the team; these labels feed prompt improvement. Requires session recording edit access.
- **OpenAPI operationId**: `vision_observations_label_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ is_correct: boolean; feedback?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionObservationsLabelCreateInput = Parameters<typeof posthog.visionObservationsLabelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionObservationsLabelCreateOutput = Awaited<ReturnType<typeof posthog.visionObservationsLabelCreate>>;

const result: VisionObservationsLabelCreateOutput = await posthog.visionObservationsLabelCreate();

// Result shape (from schema): { is_correct: boolean; feedback?: string }
```

### `posthog.visionObservationsRetryCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/observations/{id}/retry/`
- **What it does**: Delete a failed observation and re-run its scanner on the same recording. Returns 202 with the workflow handle.
- **OpenAPI operationId**: `vision_observations_retry_create`
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

type VisionObservationsRetryCreateInput = Parameters<typeof posthog.visionObservationsRetryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionObservationsRetryCreateOutput = Awaited<ReturnType<typeof posthog.visionObservationsRetryCreate>>;

const result: VisionObservationsRetryCreateOutput = await posthog.visionObservationsRetryCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentVisionQuotaRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/vision/quota/`
- **OpenAPI operationId**: `environment_vision_quota_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ credit_limit: number | null; credits_used: number; remaining: number | null; exhausted: boolean; period_start: string; period_end: string; projected_monthly_credits: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentVisionQuotaRetrieveInput = Parameters<typeof posthog.environmentVisionQuotaRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentVisionQuotaRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentVisionQuotaRetrieve>>;

const result: EnvironmentVisionQuotaRetrieveOutput = await posthog.environmentVisionQuotaRetrieve();

// Result shape (from schema): { credit_limit: number | null; credits_used: number; remaining: number | null; exhausted: boolean; period_start: string; period_end: string; projected_monthly_credits: number }
```

### `posthog.visionScannersList`

- **HTTP**: `GET /api/projects/{project_id}/vision/scanners/`
- **What it does**: CRUD for Replay Vision scanners.
- **OpenAPI operationId**: `vision_scanners_list`
- **Path params**: None
- **Query params**: `created_by`, `emits_signals`, `enabled`, `limit`, `offset`, `order_by`, `scanner_type`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; que...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersListInput = Parameters<typeof posthog.visionScannersList> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersListOutput = Awaited<ReturnType<typeof posthog.visionScannersList>>;

const result: VisionScannersListOutput = await posthog.visionScannersList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; que...
```

### `posthog.visionScannersCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/scanners/`
- **What it does**: CRUD for Replay Vision scanners.
- **OpenAPI operationId**: `vision_scanners_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type VisionScannersCreateInput = Parameters<typeof posthog.visionScannersCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersCreateOutput = Awaited<ReturnType<typeof posthog.visionScannersCreate>>;

const result: VisionScannersCreateOutput = await posthog.visionScannersCreate();

// Result shape (from schema): { id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...
```

### `posthog.visionScannersDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/vision/scanners/{id}/`
- **What it does**: CRUD for Replay Vision scanners.
- **OpenAPI operationId**: `vision_scanners_destroy`
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

type VisionScannersDestroyInput = Parameters<typeof posthog.visionScannersDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersDestroyOutput = Awaited<ReturnType<typeof posthog.visionScannersDestroy>>;

const result: VisionScannersDestroyOutput = await posthog.visionScannersDestroy();

// Result shape (from schema): unknown
```

### `posthog.visionScannersRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/vision/scanners/{id}/`
- **What it does**: CRUD for Replay Vision scanners.
- **OpenAPI operationId**: `vision_scanners_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersRetrieveInput = Parameters<typeof posthog.visionScannersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersRetrieveOutput = Awaited<ReturnType<typeof posthog.visionScannersRetrieve>>;

const result: VisionScannersRetrieveOutput = await posthog.visionScannersRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...
```

### `posthog.visionScannersPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/vision/scanners/{id}/`
- **What it does**: CRUD for Replay Vision scanners.
- **OpenAPI operationId**: `vision_scanners_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersPartialUpdateInput = Parameters<typeof posthog.visionScannersPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersPartialUpdateOutput = Awaited<ReturnType<typeof posthog.visionScannersPartialUpdate>>;

const result: VisionScannersPartialUpdateOutput = await posthog.visionScannersPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; scanner_type: "monitor" | "classifier" | "scorer" | "summarizer"; scanner_config: unknown; query?: unknown; sampling_rate?: number; sampling_mode?: "focused" | "balanced...
```

### `posthog.visionScannersObserveCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/scanners/{id}/observe/`
- **What it does**: Apply this scanner to one specific session, on demand. Returns 202 with the workflow handle.
- **OpenAPI operationId**: `vision_scanners_observe_create`
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

type VisionScannersObserveCreateInput = Parameters<typeof posthog.visionScannersObserveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersObserveCreateOutput = Awaited<ReturnType<typeof posthog.visionScannersObserveCreate>>;

const result: VisionScannersObserveCreateOutput = await posthog.visionScannersObserveCreate();

// Result shape (from schema): unknown
```

### `posthog.visionScannersObservationsList`

- **HTTP**: `GET /api/projects/{project_id}/vision/scanners/{scanner_id}/observations/`
- **What it does**: Read-only access to observations produced by a scanner.
- **OpenAPI operationId**: `vision_scanners_observations_list`
- **Path params**: `scanner_id`
- **Query params**: `labeled`, `limit`, `offset`, `order_by`, `recording_subject`, `session_id`, `status`, `tags`, `triggered_by`, `verdict`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersObservationsListInput = Parameters<typeof posthog.visionScannersObservationsList> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersObservationsListOutput = Awaited<ReturnType<typeof posthog.visionScannersObservationsList>>;

const result: VisionScannersObservationsListOutput = await posthog.visionScannersObservationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: strin...
```

### `posthog.visionScannersObservationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/vision/scanners/{scanner_id}/observations/{id}/`
- **What it does**: Retrieve one observation. Any list filters passed along (status, tags, order_by, …) scope the `previous_observation_id`/`next_observation_id` navigation to the matching, identically-ordered set — so prev/next from a filtered table stays within that filtered list.
- **OpenAPI operationId**: `vision_scanners_observations_retrieve`
- **Path params**: `id`, `scanner_id`
- **Query params**: `labeled`, `order_by`, `recording_subject`, `session_id`, `status`, `tags`, `triggered_by`, `verdict`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: string; workflow_id: string; scanner_snapshot: { name: string; scanner_type: "mo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersObservationsRetrieveInput = Parameters<typeof posthog.visionScannersObservationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersObservationsRetrieveOutput = Awaited<ReturnType<typeof posthog.visionScannersObservationsRetrieve>>;

const result: VisionScannersObservationsRetrieveOutput = await posthog.visionScannersObservationsRetrieve();

// Result shape (from schema): { id: string; scanner_id: string; session_id: string; status: "pending" | "running" | "succeeded" | "failed" | "ineligible"; error_reason: string; workflow_id: string; scanner_snapshot: { name: string; scanner_type: "mo...
```

### `posthog.visionScannersObservationsLabelDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/vision/scanners/{scanner_id}/observations/{id}/label/`
- **What it does**: Remove the observation's shared label. Requires session recording edit access.
- **OpenAPI operationId**: `vision_scanners_observations_label_destroy`
- **Path params**: `id`, `scanner_id`
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

type VisionScannersObservationsLabelDestroyInput = Parameters<typeof posthog.visionScannersObservationsLabelDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersObservationsLabelDestroyOutput = Awaited<ReturnType<typeof posthog.visionScannersObservationsLabelDestroy>>;

const result: VisionScannersObservationsLabelDestroyOutput = await posthog.visionScannersObservationsLabelDestroy();

// Result shape (from schema): unknown
```

### `posthog.visionScannersObservationsLabelCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/scanners/{scanner_id}/observations/{id}/label/`
- **What it does**: Set or update the observation's shared label: whether the scanner scored the session correctly, plus optional feedback on what it got wrong. One label per observation, shared across the team; these labels feed prompt improvement. Requires session recording edit access.
- **OpenAPI operationId**: `vision_scanners_observations_label_create`
- **Path params**: `id`, `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ is_correct: boolean; feedback?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersObservationsLabelCreateInput = Parameters<typeof posthog.visionScannersObservationsLabelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersObservationsLabelCreateOutput = Awaited<ReturnType<typeof posthog.visionScannersObservationsLabelCreate>>;

const result: VisionScannersObservationsLabelCreateOutput = await posthog.visionScannersObservationsLabelCreate();

// Result shape (from schema): { is_correct: boolean; feedback?: string }
```

### `posthog.visionScannersObservationsRetryCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/scanners/{scanner_id}/observations/{id}/retry/`
- **What it does**: Delete a failed observation and re-run its scanner on the same recording. Returns 202 with the workflow handle.
- **OpenAPI operationId**: `vision_scanners_observations_retry_create`
- **Path params**: `id`, `scanner_id`
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

type VisionScannersObservationsRetryCreateInput = Parameters<typeof posthog.visionScannersObservationsRetryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersObservationsRetryCreateOutput = Awaited<ReturnType<typeof posthog.visionScannersObservationsRetryCreate>>;

const result: VisionScannersObservationsRetryCreateOutput = await posthog.visionScannersObservationsRetryCreate();

// Result shape (from schema): unknown
```

### `posthog.visionScannersObservationsStatsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/vision/scanners/{scanner_id}/observations/stats/`
- **What it does**: Aggregate counts and per-scanner-type distributions over the filtered observation set. Same filters as the list endpoint apply.
- **OpenAPI operationId**: `vision_scanners_observations_stats_retrieve`
- **Path params**: `scanner_id`
- **Query params**: `labeled`, `recent_days`, `recording_subject`, `session_id`, `status`, `tags`, `triggered_by`, `verdict`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status_counts: { total: number; succeeded: number; failed: number; ineligible: number; in_flight: number; success_rate: number | null }; coverage: { recent_sessions: number; total_sessions: number; recent_days: number...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersObservationsStatsRetrieveInput = Parameters<typeof posthog.visionScannersObservationsStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersObservationsStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.visionScannersObservationsStatsRetrieve>>;

const result: VisionScannersObservationsStatsRetrieveOutput = await posthog.visionScannersObservationsStatsRetrieve();

// Result shape (from schema): { status_counts: { total: number; succeeded: number; failed: number; ineligible: number; in_flight: number; success_rate: number | null }; coverage: { recent_sessions: number; total_sessions: number; recent_days: number...
```

### `posthog.visionScannersPromptSuggestionsList`

- **HTTP**: `GET /api/projects/{project_id}/vision/scanners/{scanner_id}/prompt_suggestions/`
- **What it does**: AI prompt-rewrite suggestions for a scanner, generated from the team's thumbs up/down ratings.
- **OpenAPI operationId**: `vision_scanners_prompt_suggestions_list`
- **Path params**: `scanner_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersPromptSuggestionsListInput = Parameters<typeof posthog.visionScannersPromptSuggestionsList> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersPromptSuggestionsListOutput = Awaited<ReturnType<typeof posthog.visionScannersPromptSuggestionsList>>;

const result: VisionScannersPromptSuggestionsListOutput = await posthog.visionScannersPromptSuggestionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale...
```

### `posthog.visionScannersPromptSuggestionsApplyCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/scanners/{scanner_id}/prompt_suggestions/{id}/apply/`
- **What it does**: Apply this suggestion: write its prompt to the scanner (bumping the scanner version) and mark the suggestion applied. Only the current pending suggestion can be applied. Requires session recording edit access.
- **OpenAPI operationId**: `vision_scanners_prompt_suggestions_apply_create`
- **Path params**: `id`, `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersPromptSuggestionsApplyCreateInput = Parameters<typeof posthog.visionScannersPromptSuggestionsApplyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersPromptSuggestionsApplyCreateOutput = Awaited<ReturnType<typeof posthog.visionScannersPromptSuggestionsApplyCreate>>;

const result: VisionScannersPromptSuggestionsApplyCreateOutput = await posthog.visionScannersPromptSuggestionsApplyCreate();

// Result shape (from schema): { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...
```

### `posthog.visionScannersPromptSuggestionsDismissCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/scanners/{scanner_id}/prompt_suggestions/{id}/dismiss/`
- **What it does**: Dismiss this suggestion without applying it. Only the current pending suggestion can be dismissed. Requires session recording edit access.
- **OpenAPI operationId**: `vision_scanners_prompt_suggestions_dismiss_create`
- **Path params**: `id`, `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersPromptSuggestionsDismissCreateInput = Parameters<typeof posthog.visionScannersPromptSuggestionsDismissCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersPromptSuggestionsDismissCreateOutput = Awaited<ReturnType<typeof posthog.visionScannersPromptSuggestionsDismissCreate>>;

const result: VisionScannersPromptSuggestionsDismissCreateOutput = await posthog.visionScannersPromptSuggestionsDismissCreate();

// Result shape (from schema): { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...
```

### `posthog.visionScannersPromptSuggestionsEvaluateCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/scanners/{scanner_id}/prompt_suggestions/{id}/evaluate/`
- **What it does**: Test this suggestion before applying it: re-run the scanner with the suggested prompt against already-rated sessions in the background and compare each fresh output with the stored one. Results land on the suggestion's `evaluation` field. Poll `current` while status is running. `session_limit` controls how many rated sessions are re-run (thumbs-down prioritized, up to `evaluation_session_cap`). Each successful re-run charges credits like a normal observation of the same model. The request is refused with 402 when the planned credits exceed what is left of the monthly limit. Only monitor and classifier scanners are supported. Requires session recording edit access.
- **OpenAPI operationId**: `vision_scanners_prompt_suggestions_evaluate_create`
- **Path params**: `id`, `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersPromptSuggestionsEvaluateCreateInput = Parameters<typeof posthog.visionScannersPromptSuggestionsEvaluateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersPromptSuggestionsEvaluateCreateOutput = Awaited<ReturnType<typeof posthog.visionScannersPromptSuggestionsEvaluateCreate>>;

const result: VisionScannersPromptSuggestionsEvaluateCreateOutput = await posthog.visionScannersPromptSuggestionsEvaluateCreate();

// Result shape (from schema): { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...
```

### `posthog.visionScannersPromptSuggestionsCurrentRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/vision/scanners/{scanner_id}/prompt_suggestions/current/`
- **What it does**: The scanner's newest prompt suggestion plus whether it is stale (the ratings changed since it was generated) and how many rated observations are available.
- **OpenAPI operationId**: `vision_scanners_prompt_suggestions_current_retrieve`
- **Path params**: `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ suggestion: { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersPromptSuggestionsCurrentRetrieveInput = Parameters<typeof posthog.visionScannersPromptSuggestionsCurrentRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersPromptSuggestionsCurrentRetrieveOutput = Awaited<ReturnType<typeof posthog.visionScannersPromptSuggestionsCurrentRetrieve>>;

const result: VisionScannersPromptSuggestionsCurrentRetrieveOutput = await posthog.visionScannersPromptSuggestionsCurrentRetrieve();

// Result shape (from schema): { suggestion: { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner...
```

### `posthog.visionScannersPromptSuggestionsGenerateCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/scanners/{scanner_id}/prompt_suggestions/generate/`
- **What it does**: Generate a fresh prompt suggestion from the team's current ratings. The previous pending suggestion becomes history (superseded). Requires at least one rated observation and session recording edit access.
- **OpenAPI operationId**: `vision_scanners_prompt_suggestions_generate_create`
- **Path params**: `scanner_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersPromptSuggestionsGenerateCreateInput = Parameters<typeof posthog.visionScannersPromptSuggestionsGenerateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersPromptSuggestionsGenerateCreateOutput = Awaited<ReturnType<typeof posthog.visionScannersPromptSuggestionsGenerateCreate>>;

const result: VisionScannersPromptSuggestionsGenerateCreateOutput = await posthog.visionScannersPromptSuggestionsGenerateCreate();

// Result shape (from schema): { id: string; status: "pending" | "applied" | "dismissed" | "superseded" | "no_change"; suggested_prompt: string; base_prompt: string; rationale: string; based_on_up: number; based_on_down: number; scanner_version: numb...
```

### `posthog.visionScannersCreatorsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/vision/scanners/creators/`
- **What it does**: Distinct creators across the team's scanners — feeds the `Created by` filter dropdown.
- **OpenAPI operationId**: `vision_scanners_creators_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ creators: ({ id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersCreatorsRetrieveInput = Parameters<typeof posthog.visionScannersCreatorsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersCreatorsRetrieveOutput = Awaited<ReturnType<typeof posthog.visionScannersCreatorsRetrieve>>;

const result: VisionScannersCreatorsRetrieveOutput = await posthog.visionScannersCreatorsRetrieve();

// Result shape (from schema): { creators: ({ id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null; role_...
```

### `posthog.visionScannersEstimateCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/scanners/estimate/`
- **What it does**: Estimate the observation volume a proposed scanner would generate, for the pre-save cost preview.
- **OpenAPI operationId**: `vision_scanners_estimate_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ matched_sessions_in_window: number; window_days: number; estimated_observations_per_month: number; credits_per_observation: number; estimated_credits_per_month: number; other_enabled_scanners_monthly_credits: number; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersEstimateCreateInput = Parameters<typeof posthog.visionScannersEstimateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersEstimateCreateOutput = Awaited<ReturnType<typeof posthog.visionScannersEstimateCreate>>;

const result: VisionScannersEstimateCreateOutput = await posthog.visionScannersEstimateCreate();

// Result shape (from schema): { matched_sessions_in_window: number; window_days: number; estimated_observations_per_month: number; credits_per_observation: number; estimated_credits_per_month: number; other_enabled_scanners_monthly_credits: number; ...
```

### `posthog.visionScannersStatsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/vision/scanners/stats/`
- **What it does**: Team-wide scanner counts — independent of list filters, so the overview stays stable.
- **OpenAPI operationId**: `vision_scanners_stats_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ total: number; enabled: number; by_type: { monitor: { enabled: number; total: number }; classifier: { enabled: number; total: number }; scorer: unknown; summarizer: unknown } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersStatsRetrieveInput = Parameters<typeof posthog.visionScannersStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.visionScannersStatsRetrieve>>;

const result: VisionScannersStatsRetrieveOutput = await posthog.visionScannersStatsRetrieve();

// Result shape (from schema): { total: number; enabled: number; by_type: { monitor: { enabled: number; total: number }; classifier: { enabled: number; total: number }; scorer: unknown; summarizer: unknown } }
```

### `posthog.visionScannersSuggestTagsCreate`

- **HTTP**: `POST /api/projects/{project_id}/vision/scanners/suggest_tags/`
- **What it does**: Suggest classifier tags grounded in the scanner's own observations and the org's product data.
- **OpenAPI operationId**: `vision_scanners_suggest_tags_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ suggestions: ({ tag: string; rationale: string; source: "observed" | "product" | "prompt" })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisionScannersSuggestTagsCreateInput = Parameters<typeof posthog.visionScannersSuggestTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisionScannersSuggestTagsCreateOutput = Awaited<ReturnType<typeof posthog.visionScannersSuggestTagsCreate>>;

const result: VisionScannersSuggestTagsCreateOutput = await posthog.visionScannersSuggestTagsCreate();

// Result shape (from schema): { suggestions: ({ tag: string; rationale: string; source: "observed" | "product" | "prompt" })[] }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

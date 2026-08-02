# Signals

## Operations

### `posthog.signalsProcessingList`

- **HTTP**: `GET /api/projects/{project_id}/signals/processing/`
- **What it does**: Return current processing state including pause status.
- **OpenAPI operationId**: `signals_processing_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ paused_until: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsProcessingListInput = Parameters<typeof posthog.signalsProcessingList> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsProcessingListOutput = Awaited<ReturnType<typeof posthog.signalsProcessingList>>;

const result: SignalsProcessingListOutput = await posthog.signalsProcessingList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ paused_until: string | null })[] }
```

### `posthog.signalsProcessingPauseDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/signals/processing/pause/`
- **What it does**: View and control signal processing pipeline state for a team.
- **OpenAPI operationId**: `signals_processing_pause_destroy`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status: string; paused_until: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsProcessingPauseDestroyInput = Parameters<typeof posthog.signalsProcessingPauseDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsProcessingPauseDestroyOutput = Awaited<ReturnType<typeof posthog.signalsProcessingPauseDestroy>>;

const result: SignalsProcessingPauseDestroyOutput = await posthog.signalsProcessingPauseDestroy();

// Result shape (from schema): { status: string; paused_until: string }
```

### `posthog.signalsProcessingPauseUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/signals/processing/pause/`
- **What it does**: View and control signal processing pipeline state for a team.
- **OpenAPI operationId**: `signals_processing_pause_update`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status: string; paused_until: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsProcessingPauseUpdateInput = Parameters<typeof posthog.signalsProcessingPauseUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsProcessingPauseUpdateOutput = Awaited<ReturnType<typeof posthog.signalsProcessingPauseUpdate>>;

const result: SignalsProcessingPauseUpdateOutput = await posthog.signalsProcessingPauseUpdate();

// Result shape (from schema): { status: string; paused_until: string }
```

### `posthog.signalsReportsList`

- **HTTP**: `GET /api/projects/{project_id}/signals/reports/`
- **OpenAPI operationId**: `signals_reports_list`
- **Path params**: None
- **Query params**: `has_implementation_pr`, `limit`, `offset`, `ordering`, `priority`, `search`, `source_product`, `status`, `suggested_reviewers`, `task_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; title: string | null; summary: string | null; status: "potential" | "candidate" | "in_progress" | "pending_input" | "ready" | "res...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsReportsListInput = Parameters<typeof posthog.signalsReportsList> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportsListOutput = Awaited<ReturnType<typeof posthog.signalsReportsList>>;

const result: SignalsReportsListOutput = await posthog.signalsReportsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; title: string | null; summary: string | null; status: "potential" | "candidate" | "in_progress" | "pending_input" | "ready" | "res...
```

### `posthog.signalsReportsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/signals/reports/{id}/`
- **OpenAPI operationId**: `signals_reports_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; title: string | null; summary: string | null; status: "potential" | "candidate" | "in_progress" | "pending_input" | "ready" | "resolved" | "failed" | "deleted" | "suppressed"; total_weight: number; signal_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsReportsRetrieveInput = Parameters<typeof posthog.signalsReportsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportsRetrieveOutput = Awaited<ReturnType<typeof posthog.signalsReportsRetrieve>>;

const result: SignalsReportsRetrieveOutput = await posthog.signalsReportsRetrieve();

// Result shape (from schema): { id: string; title: string | null; summary: string | null; status: "potential" | "candidate" | "in_progress" | "pending_input" | "ready" | "resolved" | "failed" | "deleted" | "suppressed"; total_weight: number; signal_...
```

### `posthog.signalsReportsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/signals/reports/{id}/`
- **What it does**: Edit a report's title or summary
- **OpenAPI operationId**: `signals_reports_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; title: string | null; summary: string | null; status: "potential" | "candidate" | "in_progress" | "pending_input" | "ready" | "resolved" | "failed" | "deleted" | "suppressed"; total_weight: number; signal_...`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsReportsPartialUpdateInput = Parameters<typeof posthog.signalsReportsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.signalsReportsPartialUpdate>>;

const result: SignalsReportsPartialUpdateOutput = await posthog.signalsReportsPartialUpdate();

// Result shape (from schema): { id: string; title: string | null; summary: string | null; status: "potential" | "candidate" | "in_progress" | "pending_input" | "ready" | "resolved" | "failed" | "deleted" | "suppressed"; total_weight: number; signal_...
```

### `posthog.signalsReportsSignalsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/signals/reports/{id}/signals/`
- **What it does**: List a report's signals
- **OpenAPI operationId**: `signals_reports_signals_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ report: { id: string; title: string | null; summary: string | null; status: "potential" | "candidate" | "in_progress" | "pending_input" | "ready" | "resolved" | "failed" | "deleted" | "suppressed"; total_weight: numbe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsReportsSignalsRetrieveInput = Parameters<typeof posthog.signalsReportsSignalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportsSignalsRetrieveOutput = Awaited<ReturnType<typeof posthog.signalsReportsSignalsRetrieve>>;

const result: SignalsReportsSignalsRetrieveOutput = await posthog.signalsReportsSignalsRetrieve();

// Result shape (from schema): { report: { id: string; title: string | null; summary: string | null; status: "potential" | "candidate" | "in_progress" | "pending_input" | "ready" | "resolved" | "failed" | "deleted" | "suppressed"; total_weight: numbe...
```

### `posthog.signalsReportsStateCreate`

- **HTTP**: `POST /api/projects/{project_id}/signals/reports/{id}/state/`
- **What it does**: Transition a report to a new state. The model validates allowed transitions.

The request body is validated by SignalReportStateRequestSerializer — only the
fields it declares (state, dismissal_reason, dismissal_note, snooze_for) are read,
and only snooze_for is ever forwarded to transition_to. Any other key is ignored,
so internal transition_to kwargs (reset_weight, error, ...) can't be injected.

Body: {
    "state": "suppressed" | "potential",
    # Optional dismissal feedback (honored when state == "suppressed" or "potential"):
    "dismissal_reason": "<canonical reason code, see SIGNAL_REPORT_DISMISSAL_REASON_CHOICES>",
    "dismissal_note": "free-form text",
    # Optional, only honored for state == "potential":
    "snooze_for": <number of additional signals before re-promotion>,
}
- **OpenAPI operationId**: `signals_reports_state_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; title: string | null; summary: string | null; status: "potential" | "candidate" | "in_progress" | "pending_input" | "ready" | "resolved" | "failed" | "deleted" | "suppressed"; total_weight: number; signal_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsReportsStateCreateInput = Parameters<typeof posthog.signalsReportsStateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportsStateCreateOutput = Awaited<ReturnType<typeof posthog.signalsReportsStateCreate>>;

const result: SignalsReportsStateCreateOutput = await posthog.signalsReportsStateCreate();

// Result shape (from schema): { id: string; title: string | null; summary: string | null; status: "potential" | "candidate" | "in_progress" | "pending_input" | "ready" | "resolved" | "failed" | "deleted" | "suppressed"; total_weight: number; signal_...
```

### `posthog.signalsReportArtefactsList`

- **HTTP**: `GET /api/projects/{project_id}/signals/reports/{report_id}/artefacts/`
- **What it does**: List a report's artefacts
- **OpenAPI operationId**: `signals_report_artefacts_list`
- **Path params**: `report_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; type: "video_segment" | "safety_judgment" | "actionability_judgment" | "priority_judgment" | "signal_finding" | "repo_selection" |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsReportArtefactsListInput = Parameters<typeof posthog.signalsReportArtefactsList> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportArtefactsListOutput = Awaited<ReturnType<typeof posthog.signalsReportArtefactsList>>;

const result: SignalsReportArtefactsListOutput = await posthog.signalsReportArtefactsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; type: "video_segment" | "safety_judgment" | "actionability_judgment" | "priority_judgment" | "signal_finding" | "repo_selection" |...
```

### `posthog.signalsReportArtefactsCreate`

- **HTTP**: `POST /api/projects/{project_id}/signals/reports/{report_id}/artefacts/`
- **What it does**: Append an artefact to a report
- **OpenAPI operationId**: `signals_report_artefacts_create`
- **Path params**: `report_id`
- **Query params**: None
- **Response codes**: `201`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; report_id: string; type: string; content: unknown; created_at: string; updated_at: string | null; task_id: string | null }`
- OpenAPI response codes: `201`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsReportArtefactsCreateInput = Parameters<typeof posthog.signalsReportArtefactsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportArtefactsCreateOutput = Awaited<ReturnType<typeof posthog.signalsReportArtefactsCreate>>;

const result: SignalsReportArtefactsCreateOutput = await posthog.signalsReportArtefactsCreate();

// Result shape (from schema): { id: string; report_id: string; type: string; content: unknown; created_at: string; updated_at: string | null; task_id: string | null }
```

### `posthog.signalsReportArtefactsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/signals/reports/{report_id}/artefacts/{id}/`
- **What it does**: Delete an artefact
- **OpenAPI operationId**: `signals_report_artefacts_destroy`
- **Path params**: `id`, `report_id`
- **Query params**: None
- **Response codes**: `204`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsReportArtefactsDestroyInput = Parameters<typeof posthog.signalsReportArtefactsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportArtefactsDestroyOutput = Awaited<ReturnType<typeof posthog.signalsReportArtefactsDestroy>>;

const result: SignalsReportArtefactsDestroyOutput = await posthog.signalsReportArtefactsDestroy();

// Result shape (from schema): unknown
```

### `posthog.signalsReportArtefactsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/signals/reports/{report_id}/artefacts/{id}/`
- **What it does**: Get a single artefact
- **OpenAPI operationId**: `signals_report_artefacts_retrieve`
- **Path params**: `id`, `report_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type: "video_segment" | "safety_judgment" | "actionability_judgment" | "priority_judgment" | "signal_finding" | "repo_selection" | "suggested_reviewers" | "dismissal" | "code_reference" | "commit" | "task_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsReportArtefactsRetrieveInput = Parameters<typeof posthog.signalsReportArtefactsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportArtefactsRetrieveOutput = Awaited<ReturnType<typeof posthog.signalsReportArtefactsRetrieve>>;

const result: SignalsReportArtefactsRetrieveOutput = await posthog.signalsReportArtefactsRetrieve();

// Result shape (from schema): { id: string; type: "video_segment" | "safety_judgment" | "actionability_judgment" | "priority_judgment" | "signal_finding" | "repo_selection" | "suggested_reviewers" | "dismissal" | "code_reference" | "commit" | "task_...
```

### `posthog.signalsReportArtefactsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/signals/reports/{report_id}/artefacts/{id}/`
- **What it does**: Replace an artefact's content
- **OpenAPI operationId**: `signals_report_artefacts_partial_update`
- **Path params**: `id`, `report_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; report_id: string; type: string; content: unknown; created_at: string; updated_at: string | null; task_id: string | null }`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsReportArtefactsPartialUpdateInput = Parameters<typeof posthog.signalsReportArtefactsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportArtefactsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.signalsReportArtefactsPartialUpdate>>;

const result: SignalsReportArtefactsPartialUpdateOutput = await posthog.signalsReportArtefactsPartialUpdate();

// Result shape (from schema): { id: string; report_id: string; type: string; content: unknown; created_at: string; updated_at: string | null; task_id: string | null }
```

### `posthog.signalsReportArtefactsDiff`

- **HTTP**: `GET /api/projects/{project_id}/signals/reports/{report_id}/artefacts/{id}/diff/`
- **What it does**: Fetch the diff for a commit artefact
- **OpenAPI operationId**: `signals_report_artefacts_diff`
- **Path params**: `id`, `report_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`, `502`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ diff: string; truncated: boolean }`
- OpenAPI response codes: `200`, `400`, `404`, `502`

```ts
import posthog from "@utdk/posthog";

type SignalsReportArtefactsDiffInput = Parameters<typeof posthog.signalsReportArtefactsDiff> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportArtefactsDiffOutput = Awaited<ReturnType<typeof posthog.signalsReportArtefactsDiff>>;

const result: SignalsReportArtefactsDiffOutput = await posthog.signalsReportArtefactsDiff();

// Result shape (from schema): { diff: string; truncated: boolean }
```

### `posthog.signalsReportsBulkStateCreate`

- **HTTP**: `POST /api/projects/{project_id}/signals/reports/bulk-state/`
- **What it does**: Transition many reports to a new state in one call.

Each id is processed independently: a report whose transition isn't allowed from its
current status is reported as `skipped` (a 409 on the single-report endpoint) and the
rest still go through. Returns one result per requested id (in request order, after
de-duplication) plus per-outcome counts. The whole call is 200 even on partial failure —
inspect `results` / the counts to see what happened.
- **OpenAPI operationId**: `signals_reports_bulk_state_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; outcome: string; status?: string | null; detail?: string | null })[]; transitioned_count: number; skipped_count: number; failed_count: number; not_found_count: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsReportsBulkStateCreateInput = Parameters<typeof posthog.signalsReportsBulkStateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsReportsBulkStateCreateOutput = Awaited<ReturnType<typeof posthog.signalsReportsBulkStateCreate>>;

const result: SignalsReportsBulkStateCreateOutput = await posthog.signalsReportsBulkStateCreate();

// Result shape (from schema): { results: ({ id: string; outcome: string; status?: string | null; detail?: string | null })[]; transitioned_count: number; skipped_count: number; failed_count: number; not_found_count: number }
```

### `posthog.signalsScoutConfigList`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/configs/`
- **What it does**: List scout configs
- **OpenAPI operationId**: `signals_scout_config_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; skill_name: string; description: string; scout_origin: "canonical" | "custom"; enabled?: boolean; emit?: boolean; run_interval_minutes?: number; last_run_at: string | null; created_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutConfigListInput = Parameters<typeof posthog.signalsScoutConfigList> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutConfigListOutput = Awaited<ReturnType<typeof posthog.signalsScoutConfigList>>;

const result: SignalsScoutConfigListOutput = await posthog.signalsScoutConfigList();

// Result shape (from schema): ({ id: string; skill_name: string; description: string; scout_origin: "canonical" | "custom"; enabled?: boolean; emit?: boolean; run_interval_minutes?: number; last_run_at: string | null; created_at: string })[]
```

### `posthog.signalsScoutConfigCreate`

- **HTTP**: `POST /api/projects/{project_id}/signals/scout/configs/`
- **What it does**: Create a scout config
- **OpenAPI operationId**: `signals_scout_config_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `201`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; skill_name: string; description: string; scout_origin: "canonical" | "custom"; enabled?: boolean; emit?: boolean; run_interval_minutes?: number; last_run_at: string | null; created_at: string }`
- OpenAPI response codes: `200`, `201`, `400`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutConfigCreateInput = Parameters<typeof posthog.signalsScoutConfigCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutConfigCreateOutput = Awaited<ReturnType<typeof posthog.signalsScoutConfigCreate>>;

const result: SignalsScoutConfigCreateOutput = await posthog.signalsScoutConfigCreate();

// Result shape (from schema): { id: string; skill_name: string; description: string; scout_origin: "canonical" | "custom"; enabled?: boolean; emit?: boolean; run_interval_minutes?: number; last_run_at: string | null; created_at: string }
```

### `posthog.signalsScoutConfigDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/signals/scout/configs/{id}/`
- **What it does**: Delete a scout config
- **OpenAPI operationId**: `signals_scout_config_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutConfigDestroyInput = Parameters<typeof posthog.signalsScoutConfigDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutConfigDestroyOutput = Awaited<ReturnType<typeof posthog.signalsScoutConfigDestroy>>;

const result: SignalsScoutConfigDestroyOutput = await posthog.signalsScoutConfigDestroy();

// Result shape (from schema): unknown
```

### `posthog.signalsScoutConfigUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/signals/scout/configs/{id}/`
- **What it does**: Update a scout config
- **OpenAPI operationId**: `signals_scout_config_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; skill_name: string; description: string; scout_origin: "canonical" | "custom"; enabled?: boolean; emit?: boolean; run_interval_minutes?: number; last_run_at: string | null; created_at: string }`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutConfigUpdateInput = Parameters<typeof posthog.signalsScoutConfigUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutConfigUpdateOutput = Awaited<ReturnType<typeof posthog.signalsScoutConfigUpdate>>;

const result: SignalsScoutConfigUpdateOutput = await posthog.signalsScoutConfigUpdate();

// Result shape (from schema): { id: string; skill_name: string; description: string; scout_origin: "canonical" | "custom"; enabled?: boolean; emit?: boolean; run_interval_minutes?: number; last_run_at: string | null; created_at: string }
```

### `posthog.signalsScoutConfigRun`

- **HTTP**: `POST /api/projects/{project_id}/signals/scout/configs/{id}/run/`
- **What it does**: Run a scout now
- **OpenAPI operationId**: `signals_scout_config_run`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `202`, `403`, `404`, `409`, `429`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`, `403`, `404`, `409`, `429`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutConfigRunInput = Parameters<typeof posthog.signalsScoutConfigRun> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutConfigRunOutput = Awaited<ReturnType<typeof posthog.signalsScoutConfigRun>>;

const result: SignalsScoutConfigRunOutput = await posthog.signalsScoutConfigRun();

// Result shape (from schema): unknown
```

### `posthog.signalsScoutConfigSync`

- **HTTP**: `POST /api/projects/{project_id}/signals/scout/configs/sync/`
- **What it does**: Sync scout configs
- **OpenAPI operationId**: `signals_scout_config_sync`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; skill_name: string; description: string; scout_origin: "canonical" | "custom"; enabled?: boolean; emit?: boolean; run_interval_minutes?: number; last_run_at: string | null; created_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutConfigSyncInput = Parameters<typeof posthog.signalsScoutConfigSync> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutConfigSyncOutput = Awaited<ReturnType<typeof posthog.signalsScoutConfigSync>>;

const result: SignalsScoutConfigSyncOutput = await posthog.signalsScoutConfigSync();

// Result shape (from schema): ({ id: string; skill_name: string; description: string; scout_origin: "canonical" | "custom"; enabled?: boolean; emit?: boolean; run_interval_minutes?: number; last_run_at: string | null; created_at: string })[]
```

### `posthog.signalsScoutMembersList`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/members/`
- **What it does**: List project members for reviewer routing
- **OpenAPI operationId**: `signals_scout_members_list`
- **Path params**: None
- **Query params**: `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ user_uuid: string; email: string; first_name: string; last_name: string; github_login: string | null })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutMembersListInput = Parameters<typeof posthog.signalsScoutMembersList> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutMembersListOutput = Awaited<ReturnType<typeof posthog.signalsScoutMembersList>>;

const result: SignalsScoutMembersListOutput = await posthog.signalsScoutMembersList();

// Result shape (from schema): ({ user_uuid: string; email: string; first_name: string; last_name: string; github_login: string | null })[]
```

### `posthog.signalsScoutMetadataGet`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/metadata/current/`
- **What it does**: Get scout metadata
- **OpenAPI operationId**: `signals_scout_metadata_get`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ enrolled: boolean; banner_message: string | null; limits: { max_runs_per_tick: number; max_runs_per_day: number | null; runs_today: number; runs_remaining_today: number | null } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutMetadataGetInput = Parameters<typeof posthog.signalsScoutMetadataGet> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutMetadataGetOutput = Awaited<ReturnType<typeof posthog.signalsScoutMetadataGet>>;

const result: SignalsScoutMetadataGetOutput = await posthog.signalsScoutMetadataGet();

// Result shape (from schema): { enrolled: boolean; banner_message: string | null; limits: { max_runs_per_tick: number; max_runs_per_day: number | null; runs_today: number; runs_remaining_today: number | null } }
```

### `posthog.signalsScoutProjectProfileGet`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/project_profile/current/`
- **What it does**: Get the current project profile
- **OpenAPI operationId**: `signals_scout_project_profile_get`
- **Path params**: None
- **Query params**: `force_refresh`
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ profile_id: string; computed_at: string; expires_at: string; source_version: string; payload: { inventory: { project_context: { product_description: string | null; app_urls: (string)[] }; products_in_use: (string)[]; ...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutProjectProfileGetInput = Parameters<typeof posthog.signalsScoutProjectProfileGet> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutProjectProfileGetOutput = Awaited<ReturnType<typeof posthog.signalsScoutProjectProfileGet>>;

const result: SignalsScoutProjectProfileGetOutput = await posthog.signalsScoutProjectProfileGet();

// Result shape (from schema): { profile_id: string; computed_at: string; expires_at: string; source_version: string; payload: { inventory: { project_context: { product_description: string | null; app_urls: (string)[] }; products_in_use: (string)[]; ...
```

### `posthog.signalsScoutRunsList`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/runs/`
- **What it does**: Search recent agent runs
- **OpenAPI operationId**: `signals_scout_runs_list`
- **Path params**: None
- **Query params**: `date_from`, `date_to`, `emitted`, `limit`, `skill_name`, `skill_version`, `text`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ run_id: string; skill_name: string; skill_version: number; status: string; created_at: string; started_at: string; completed_at: string | null; task_id?: string | null; task_run_id?: string | null; task_url?: string ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutRunsListInput = Parameters<typeof posthog.signalsScoutRunsList> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutRunsListOutput = Awaited<ReturnType<typeof posthog.signalsScoutRunsList>>;

const result: SignalsScoutRunsListOutput = await posthog.signalsScoutRunsList();

// Result shape (from schema): ({ run_id: string; skill_name: string; skill_version: number; status: string; created_at: string; started_at: string; completed_at: string | null; task_id?: string | null; task_run_id?: string | null; task_url?: string ...
```

### `posthog.signalsScoutRunsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/runs/{run_id}/`
- **What it does**: Get a run by ID
- **OpenAPI operationId**: `signals_scout_runs_retrieve`
- **Path params**: `run_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ run_id: string; skill_name: string; skill_version: number; status: string; created_at: string; started_at: string; completed_at: string | null; task_id?: string | null; task_run_id?: string | null; task_url?: string |...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutRunsRetrieveInput = Parameters<typeof posthog.signalsScoutRunsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutRunsRetrieveOutput = Awaited<ReturnType<typeof posthog.signalsScoutRunsRetrieve>>;

const result: SignalsScoutRunsRetrieveOutput = await posthog.signalsScoutRunsRetrieve();

// Result shape (from schema): { run_id: string; skill_name: string; skill_version: number; status: string; created_at: string; started_at: string; completed_at: string | null; task_id?: string | null; task_run_id?: string | null; task_url?: string |...
```

### `posthog.signalsScoutEditReport`

- **HTTP**: `POST /api/projects/{project_id}/signals/scout/runs/{run_id}/edit-report/`
- **What it does**: Edit an existing report for a run
- **OpenAPI operationId**: `signals_scout_edit_report`
- **Path params**: `run_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ report_id: string; updated_fields: (string)[]; note_appended: boolean; reviewers_set: boolean }`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutEditReportInput = Parameters<typeof posthog.signalsScoutEditReport> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutEditReportOutput = Awaited<ReturnType<typeof posthog.signalsScoutEditReport>>;

const result: SignalsScoutEditReportOutput = await posthog.signalsScoutEditReport();

// Result shape (from schema): { report_id: string; updated_fields: (string)[]; note_appended: boolean; reviewers_set: boolean }
```

### `posthog.signalsScoutRunsEmissions`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/runs/{run_id}/emissions/`
- **What it does**: List a run's emitted findings
- **OpenAPI operationId**: `signals_scout_runs_emissions`
- **Path params**: `run_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; run_id: string; finding_id: string; description: string; weight: number; confidence: number; severity: "P0" | "P1" | "P2" | "P3" | "P4" | null; tags: (string)[]; source_id: string; emitted_at: string })[]`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutRunsEmissionsInput = Parameters<typeof posthog.signalsScoutRunsEmissions> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutRunsEmissionsOutput = Awaited<ReturnType<typeof posthog.signalsScoutRunsEmissions>>;

const result: SignalsScoutRunsEmissionsOutput = await posthog.signalsScoutRunsEmissions();

// Result shape (from schema): ({ id: string; run_id: string; finding_id: string; description: string; weight: number; confidence: number; severity: "P0" | "P1" | "P2" | "P3" | "P4" | null; tags: (string)[]; source_id: string; emitted_at: string })[]
```

### `posthog.signalsScoutRunsEmissionReports`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/runs/{run_id}/emissions/reports/`
- **What it does**: List the inbox reports a run's findings linked to
- **OpenAPI operationId**: `signals_scout_runs_emission_reports`
- **Path params**: `run_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ finding_id: string; source_id: string; report: { id: string; title: string | null; status: string } | null })[]`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutRunsEmissionReportsInput = Parameters<typeof posthog.signalsScoutRunsEmissionReports> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutRunsEmissionReportsOutput = Awaited<ReturnType<typeof posthog.signalsScoutRunsEmissionReports>>;

const result: SignalsScoutRunsEmissionReportsOutput = await posthog.signalsScoutRunsEmissionReports();

// Result shape (from schema): ({ finding_id: string; source_id: string; report: { id: string; title: string | null; status: string } | null })[]
```

### `posthog.signalsScoutEmitReport`

- **HTTP**: `POST /api/projects/{project_id}/signals/scout/runs/{run_id}/emit-report/`
- **What it does**: Author a full report for a run
- **OpenAPI operationId**: `signals_scout_emit_report`
- **Path params**: `run_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ report_id: string | null; report_status: string | null; emitted: boolean; skipped_reason: string | null; safety_explanation: string | null; remediation: string | null }`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutEmitReportInput = Parameters<typeof posthog.signalsScoutEmitReport> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutEmitReportOutput = Awaited<ReturnType<typeof posthog.signalsScoutEmitReport>>;

const result: SignalsScoutEmitReportOutput = await posthog.signalsScoutEmitReport();

// Result shape (from schema): { report_id: string | null; report_status: string | null; emitted: boolean; skipped_reason: string | null; safety_explanation: string | null; remediation: string | null }
```

### `posthog.signalsScoutEmitSignal`

- **HTTP**: `POST /api/projects/{project_id}/signals/scout/runs/{run_id}/emit-signal/`
- **What it does**: Emit a finding for a run
- **OpenAPI operationId**: `signals_scout_emit_signal`
- **Path params**: `run_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ finding_id: string; emitted: boolean; skipped_reason: string | null; remediation: string | null }`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutEmitSignalInput = Parameters<typeof posthog.signalsScoutEmitSignal> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutEmitSignalOutput = Awaited<ReturnType<typeof posthog.signalsScoutEmitSignal>>;

const result: SignalsScoutEmitSignalOutput = await posthog.signalsScoutEmitSignal();

// Result shape (from schema): { finding_id: string; emitted: boolean; skipped_reason: string | null; remediation: string | null }
```

### `posthog.signalsScoutRunsEmissionsBatch`

- **HTTP**: `POST /api/projects/{project_id}/signals/scout/runs/emissions/batch/`
- **What it does**: List emitted findings for many runs at once
- **OpenAPI operationId**: `signals_scout_runs_emissions_batch`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; run_id: string; finding_id: string; description: string; weight: number; confidence: number; severity: "P0" | "P1" | "P2" | "P3" | "P4" | null; tags: (string)[]; source_id: string; emitted_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutRunsEmissionsBatchInput = Parameters<typeof posthog.signalsScoutRunsEmissionsBatch> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutRunsEmissionsBatchOutput = Awaited<ReturnType<typeof posthog.signalsScoutRunsEmissionsBatch>>;

const result: SignalsScoutRunsEmissionsBatchOutput = await posthog.signalsScoutRunsEmissionsBatch();

// Result shape (from schema): ({ id: string; run_id: string; finding_id: string; description: string; weight: number; confidence: number; severity: "P0" | "P1" | "P2" | "P3" | "P4" | null; tags: (string)[]; source_id: string; emitted_at: string })[]
```

### `posthog.signalsScoutRunsRecentEmissions`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/runs/emissions/recent/`
- **What it does**: List recent emitted findings across all runs
- **OpenAPI operationId**: `signals_scout_runs_recent_emissions`
- **Path params**: None
- **Query params**: `date_from`, `date_to`, `limit`, `skill_name`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; run_id: string; finding_id: string; description: string; weight: number; confidence: number; severity: "P0" | "P1" | "P2" | "P3" | "P4" | null; tags: (string)[]; source_id: string; emitted_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutRunsRecentEmissionsInput = Parameters<typeof posthog.signalsScoutRunsRecentEmissions> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutRunsRecentEmissionsOutput = Awaited<ReturnType<typeof posthog.signalsScoutRunsRecentEmissions>>;

const result: SignalsScoutRunsRecentEmissionsOutput = await posthog.signalsScoutRunsRecentEmissions();

// Result shape (from schema): ({ id: string; run_id: string; finding_id: string; description: string; weight: number; confidence: number; severity: "P0" | "P1" | "P2" | "P3" | "P4" | null; tags: (string)[]; source_id: string; emitted_at: string })[]
```

### `posthog.signalsScoutRunsEmissionReportsBatch`

- **HTTP**: `POST /api/projects/{project_id}/signals/scout/runs/emissions/reports/batch/`
- **What it does**: List the inbox reports many runs' findings linked to
- **OpenAPI operationId**: `signals_scout_runs_emission_reports_batch`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ finding_id: string; source_id: string; report: { id: string; title: string | null; status: string } | null })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutRunsEmissionReportsBatchInput = Parameters<typeof posthog.signalsScoutRunsEmissionReportsBatch> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutRunsEmissionReportsBatchOutput = Awaited<ReturnType<typeof posthog.signalsScoutRunsEmissionReportsBatch>>;

const result: SignalsScoutRunsEmissionReportsBatchOutput = await posthog.signalsScoutRunsEmissionReportsBatch();

// Result shape (from schema): ({ finding_id: string; source_id: string; report: { id: string; title: string | null; status: string } | null })[]
```

### `posthog.signalsScoutRunsFindingsSummary`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/runs/findings/summary/`
- **What it does**: Summarise recently emitted findings across the fleet
- **OpenAPI operationId**: `signals_scout_runs_findings_summary`
- **Path params**: None
- **Query params**: `window_hours`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; scout_count: number; latest_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutRunsFindingsSummaryInput = Parameters<typeof posthog.signalsScoutRunsFindingsSummary> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutRunsFindingsSummaryOutput = Awaited<ReturnType<typeof posthog.signalsScoutRunsFindingsSummary>>;

const result: SignalsScoutRunsFindingsSummaryOutput = await posthog.signalsScoutRunsFindingsSummary();

// Result shape (from schema): { count: number; scout_count: number; latest_at: string | null }
```

### `posthog.signalsScoutScratchpadSearch`

- **HTTP**: `GET /api/projects/{project_id}/signals/scout/scratchpad/`
- **What it does**: Search the scout scratchpad
- **OpenAPI operationId**: `signals_scout_scratchpad_search`
- **Path params**: None
- **Query params**: `content_max_chars`, `date_from`, `date_to`, `keys_only`, `limit`, `text`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ key: string; content: string; created_at: string | null; updated_at: string | null; created_by_run_id: string | null; created_by_skill?: string | null; created_by_run_url?: string | null })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutScratchpadSearchInput = Parameters<typeof posthog.signalsScoutScratchpadSearch> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutScratchpadSearchOutput = Awaited<ReturnType<typeof posthog.signalsScoutScratchpadSearch>>;

const result: SignalsScoutScratchpadSearchOutput = await posthog.signalsScoutScratchpadSearch();

// Result shape (from schema): ({ key: string; content: string; created_at: string | null; updated_at: string | null; created_by_run_id: string | null; created_by_skill?: string | null; created_by_run_url?: string | null })[]
```

### `posthog.signalsScoutScratchpadRemember`

- **HTTP**: `POST /api/projects/{project_id}/signals/scout/scratchpad/`
- **What it does**: Remember a scratchpad entry
- **OpenAPI operationId**: `signals_scout_scratchpad_remember`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ key: string; content: string; created_at: string | null; updated_at: string | null; created_by_run_id: string | null; created_by_skill?: string | null; created_by_run_url?: string | null }`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutScratchpadRememberInput = Parameters<typeof posthog.signalsScoutScratchpadRemember> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutScratchpadRememberOutput = Awaited<ReturnType<typeof posthog.signalsScoutScratchpadRemember>>;

const result: SignalsScoutScratchpadRememberOutput = await posthog.signalsScoutScratchpadRemember();

// Result shape (from schema): { key: string; content: string; created_at: string | null; updated_at: string | null; created_by_run_id: string | null; created_by_skill?: string | null; created_by_run_url?: string | null }
```

### `posthog.signalsScoutScratchpadForget`

- **HTTP**: `POST /api/projects/{project_id}/signals/scout/scratchpad/forget/`
- **What it does**: Forget a scratchpad entry by key
- **OpenAPI operationId**: `signals_scout_scratchpad_forget`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ deleted: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsScoutScratchpadForgetInput = Parameters<typeof posthog.signalsScoutScratchpadForget> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsScoutScratchpadForgetOutput = Awaited<ReturnType<typeof posthog.signalsScoutScratchpadForget>>;

const result: SignalsScoutScratchpadForgetOutput = await posthog.signalsScoutScratchpadForget();

// Result shape (from schema): { deleted: boolean }
```

### `posthog.signalsSourceConfigsList`

- **HTTP**: `GET /api/projects/{project_id}/signals/source_configs/`
- **OpenAPI operationId**: `signals_source_configs_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; source_product: "session_replay" | "llm_analytics" | "github" | "linear" | "zendesk" | "conversations" | "error_tracking" | "pgana...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsSourceConfigsListInput = Parameters<typeof posthog.signalsSourceConfigsList> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsSourceConfigsListOutput = Awaited<ReturnType<typeof posthog.signalsSourceConfigsList>>;

const result: SignalsSourceConfigsListOutput = await posthog.signalsSourceConfigsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; source_product: "session_replay" | "llm_analytics" | "github" | "linear" | "zendesk" | "conversations" | "error_tracking" | "pgana...
```

### `posthog.signalsSourceConfigsCreate`

- **HTTP**: `POST /api/projects/{project_id}/signals/source_configs/`
- **OpenAPI operationId**: `signals_source_configs_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; source_product: "session_replay" | "llm_analytics" | "github" | "linear" | "zendesk" | "conversations" | "error_tracking" | "pganalyze" | "signals_scout" | "logs" | "health_checks" | "endpoints" | "replay_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type SignalsSourceConfigsCreateInput = Parameters<typeof posthog.signalsSourceConfigsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsSourceConfigsCreateOutput = Awaited<ReturnType<typeof posthog.signalsSourceConfigsCreate>>;

const result: SignalsSourceConfigsCreateOutput = await posthog.signalsSourceConfigsCreate();

// Result shape (from schema): { id: string; source_product: "session_replay" | "llm_analytics" | "github" | "linear" | "zendesk" | "conversations" | "error_tracking" | "pganalyze" | "signals_scout" | "logs" | "health_checks" | "endpoints" | "replay_...
```

### `posthog.signalsSourceConfigsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/signals/source_configs/{id}/`
- **OpenAPI operationId**: `signals_source_configs_destroy`
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

type SignalsSourceConfigsDestroyInput = Parameters<typeof posthog.signalsSourceConfigsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsSourceConfigsDestroyOutput = Awaited<ReturnType<typeof posthog.signalsSourceConfigsDestroy>>;

const result: SignalsSourceConfigsDestroyOutput = await posthog.signalsSourceConfigsDestroy();

// Result shape (from schema): unknown
```

### `posthog.signalsSourceConfigsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/signals/source_configs/{id}/`
- **OpenAPI operationId**: `signals_source_configs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; source_product: "session_replay" | "llm_analytics" | "github" | "linear" | "zendesk" | "conversations" | "error_tracking" | "pganalyze" | "signals_scout" | "logs" | "health_checks" | "endpoints" | "replay_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsSourceConfigsRetrieveInput = Parameters<typeof posthog.signalsSourceConfigsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsSourceConfigsRetrieveOutput = Awaited<ReturnType<typeof posthog.signalsSourceConfigsRetrieve>>;

const result: SignalsSourceConfigsRetrieveOutput = await posthog.signalsSourceConfigsRetrieve();

// Result shape (from schema): { id: string; source_product: "session_replay" | "llm_analytics" | "github" | "linear" | "zendesk" | "conversations" | "error_tracking" | "pganalyze" | "signals_scout" | "logs" | "health_checks" | "endpoints" | "replay_...
```

### `posthog.signalsSourceConfigsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/signals/source_configs/{id}/`
- **OpenAPI operationId**: `signals_source_configs_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; source_product: "session_replay" | "llm_analytics" | "github" | "linear" | "zendesk" | "conversations" | "error_tracking" | "pganalyze" | "signals_scout" | "logs" | "health_checks" | "endpoints" | "replay_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsSourceConfigsPartialUpdateInput = Parameters<typeof posthog.signalsSourceConfigsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsSourceConfigsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.signalsSourceConfigsPartialUpdate>>;

const result: SignalsSourceConfigsPartialUpdateOutput = await posthog.signalsSourceConfigsPartialUpdate();

// Result shape (from schema): { id: string; source_product: "session_replay" | "llm_analytics" | "github" | "linear" | "zendesk" | "conversations" | "error_tracking" | "pganalyze" | "signals_scout" | "logs" | "health_checks" | "endpoints" | "replay_...
```

### `posthog.signalsSourceConfigsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/signals/source_configs/{id}/`
- **OpenAPI operationId**: `signals_source_configs_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; source_product: "session_replay" | "llm_analytics" | "github" | "linear" | "zendesk" | "conversations" | "error_tracking" | "pganalyze" | "signals_scout" | "logs" | "health_checks" | "endpoints" | "replay_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SignalsSourceConfigsUpdateInput = Parameters<typeof posthog.signalsSourceConfigsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SignalsSourceConfigsUpdateOutput = Awaited<ReturnType<typeof posthog.signalsSourceConfigsUpdate>>;

const result: SignalsSourceConfigsUpdateOutput = await posthog.signalsSourceConfigsUpdate();

// Result shape (from schema): { id: string; source_product: "session_replay" | "llm_analytics" | "github" | "linear" | "zendesk" | "conversations" | "error_tracking" | "pganalyze" | "signals_scout" | "logs" | "health_checks" | "endpoints" | "replay_...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

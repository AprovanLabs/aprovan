# Experiments

## Operations

### `posthog.experimentsList`

- **HTTP**: `GET /api/projects/{project_id}/experiments/`
- **What it does**: List experiments for the current project. Supports filtering by status and archival state.
- **OpenAPI operationId**: `experiments_list`
- **Path params**: None
- **Query params**: `archived`, `created_by_id`, `event`, `feature_flag_id`, `limit`, `offset`, `order`, `prompt_name`, `search`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsListInput = Parameters<typeof posthog.experimentsList> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsListOutput = Awaited<ReturnType<typeof posthog.experimentsList>>;

const result: ExperimentsListOutput = await posthog.experimentsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature...
```

### `posthog.experimentsCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/`
- **What it does**: Create a new experiment in draft status with optional metrics.
- **OpenAPI operationId**: `experiments_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ExperimentsCreateInput = Parameters<typeof posthog.experimentsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsCreateOutput = Awaited<ReturnType<typeof posthog.experimentsCreate>>;

const result: ExperimentsCreateOutput = await posthog.experimentsCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/experiments/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `experiments_destroy`
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

type ExperimentsDestroyInput = Parameters<typeof posthog.experimentsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsDestroyOutput = Awaited<ReturnType<typeof posthog.experimentsDestroy>>;

const result: ExperimentsDestroyOutput = await posthog.experimentsDestroy();

// Result shape (from schema): unknown
```

### `posthog.experimentsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/experiments/{id}/`
- **What it does**: Retrieve a single experiment by ID, including its current status, metrics, feature flag, and results metadata.
- **OpenAPI operationId**: `experiments_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsRetrieveInput = Parameters<typeof posthog.experimentsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsRetrieveOutput = Awaited<ReturnType<typeof posthog.experimentsRetrieve>>;

const result: ExperimentsRetrieveOutput = await posthog.experimentsRetrieve();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/experiments/{id}/`
- **What it does**: Update an experiment. Use this to modify experiment properties such as name, description, metrics, variants, and configuration. Metrics can be added, changed and removed at any time. Feature-flag config (variants, rollout, payloads) is sent via the feature_flag object.
- **OpenAPI operationId**: `experiments_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsPartialUpdateInput = Parameters<typeof posthog.experimentsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.experimentsPartialUpdate>>;

const result: ExperimentsPartialUpdateOutput = await posthog.experimentsPartialUpdate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/experiments/{id}/`
- **What it does**: Mixin for ViewSets to handle approval-gate exceptions raised from decorated serializers.

Intercepts ApprovalRequired (409) and PolicyConflict (400) raised by the @approval_gate
decorator on serializer methods and converts them into the same responses the viewset path
produces (see decorators._result_to_response), so both paths share one contract.
- **OpenAPI operationId**: `experiments_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsUpdateInput = Parameters<typeof posthog.experimentsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsUpdateOutput = Awaited<ReturnType<typeof posthog.experimentsUpdate>>;

const result: ExperimentsUpdateOutput = await posthog.experimentsUpdate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsArchiveCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/archive/`
- **What it does**: Archive an ended experiment.

Hides the experiment from the default list view. The experiment can be
restored at any time by updating archived=false. When the linked feature
flag is still enabled, pass disable_feature_flag=true to also disable and
archive it. Returns 400 if the experiment is already archived or has not
ended yet.
- **OpenAPI operationId**: `experiments_archive_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsArchiveCreateInput = Parameters<typeof posthog.experimentsArchiveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsArchiveCreateOutput = Awaited<ReturnType<typeof posthog.experimentsArchiveCreate>>;

const result: ExperimentsArchiveCreateOutput = await posthog.experimentsArchiveCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsCopyToProjectCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/copy_to_project/`
- **What it does**: Copy an experiment into another project in the same organization as a new draft.
- **OpenAPI operationId**: `experiments_copy_to_project_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsCopyToProjectCreateInput = Parameters<typeof posthog.experimentsCopyToProjectCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsCopyToProjectCreateOutput = Awaited<ReturnType<typeof posthog.experimentsCopyToProjectCreate>>;

const result: ExperimentsCopyToProjectCreateOutput = await posthog.experimentsCopyToProjectCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsCreateExposureCohortForExperimentCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/create_exposure_cohort_for_experiment/`
- **What it does**: Mixin for ViewSets to handle approval-gate exceptions raised from decorated serializers.

Intercepts ApprovalRequired (409) and PolicyConflict (400) raised by the @approval_gate
decorator on serializer methods and converts them into the same responses the viewset path
produces (see decorators._result_to_response), so both paths share one contract.
- **OpenAPI operationId**: `experiments_create_exposure_cohort_for_experiment_create`
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

type ExperimentsCreateExposureCohortForExperimentCreateInput = Parameters<typeof posthog.experimentsCreateExposureCohortForExperimentCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsCreateExposureCohortForExperimentCreateOutput = Awaited<ReturnType<typeof posthog.experimentsCreateExposureCohortForExperimentCreate>>;

const result: ExperimentsCreateExposureCohortForExperimentCreateOutput = await posthog.experimentsCreateExposureCohortForExperimentCreate();

// Result shape (from schema): unknown
```

### `posthog.experimentsDuplicateCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/duplicate/`
- **What it does**: Mixin for ViewSets to handle approval-gate exceptions raised from decorated serializers.

Intercepts ApprovalRequired (409) and PolicyConflict (400) raised by the @approval_gate
decorator on serializer methods and converts them into the same responses the viewset path
produces (see decorators._result_to_response), so both paths share one contract.
- **OpenAPI operationId**: `experiments_duplicate_create`
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

type ExperimentsDuplicateCreateInput = Parameters<typeof posthog.experimentsDuplicateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsDuplicateCreateOutput = Awaited<ReturnType<typeof posthog.experimentsDuplicateCreate>>;

const result: ExperimentsDuplicateCreateOutput = await posthog.experimentsDuplicateCreate();

// Result shape (from schema): unknown
```

### `posthog.experimentsEndCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/end/`
- **What it does**: End a running experiment without shipping a variant.

Sets end_date to now and marks the experiment as stopped. The feature
flag is NOT modified — users continue to see their assigned variants
and exposure events ($feature_flag_called) continue to be recorded.
However, only data up to end_date is included in experiment results.

Use this when:

- You want to freeze the results window without changing which variant
  users see.
- A variant was already shipped manually via the feature flag UI and
  the experiment just needs to be marked complete.

The end_date can be adjusted after ending via PATCH if it needs to be
backdated (e.g. to match when the flag was actually paused).

Other options:
- Use ship_variant to end the experiment AND roll out a single variant to 100%% of users.
- Use pause to deactivate the flag without ending the experiment (stops variant assignment but does not freeze results).

Returns 400 if the experiment is not running.
- **OpenAPI operationId**: `experiments_end_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsEndCreateInput = Parameters<typeof posthog.experimentsEndCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsEndCreateOutput = Awaited<ReturnType<typeof posthog.experimentsEndCreate>>;

const result: ExperimentsEndCreateOutput = await posthog.experimentsEndCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsFreezeExposureCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/freeze_exposure/`
- **What it does**: Freeze exposure on a running experiment while metrics keep flowing.

Snapshots the already-exposed users into a static cohort and narrows the
linked feature flag so only those users keep matching — new users can no
longer enter the experiment. ``end_date`` is left null so long-term metrics
(revenue/LTV/renewals/retention) keep accumulating. Enrolled users keep
their assigned variant. The serialized status becomes 'exposure_frozen'.

Returns 400 if the experiment is not running, exposure is already frozen,
the experiment is group-aggregated (group flags cannot be frozen with a
person cohort), or the exposed set is too large to snapshot synchronously.
- **OpenAPI operationId**: `experiments_freeze_exposure_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsFreezeExposureCreateInput = Parameters<typeof posthog.experimentsFreezeExposureCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsFreezeExposureCreateOutput = Awaited<ReturnType<typeof posthog.experimentsFreezeExposureCreate>>;

const result: ExperimentsFreezeExposureCreateOutput = await posthog.experimentsFreezeExposureCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsLaunchCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/launch/`
- **What it does**: Launch a draft experiment.

Validates the experiment is in draft state, activates its linked feature flag,
sets start_date to the current server time, and transitions the experiment to running.
Returns 400 if the experiment has already been launched or if the feature flag
configuration is invalid (e.g. missing "control" variant or fewer than 2 variants).
- **OpenAPI operationId**: `experiments_launch_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsLaunchCreateInput = Parameters<typeof posthog.experimentsLaunchCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsLaunchCreateOutput = Awaited<ReturnType<typeof posthog.experimentsLaunchCreate>>;

const result: ExperimentsLaunchCreateOutput = await posthog.experimentsLaunchCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsMetricsRecalculationCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/metrics_recalculation/`
- **What it does**: Trigger a batch recalculation of all metrics for this experiment.

Returns 201 with the new pending recalculation, or 200 with the active one if a recalculation is
already pending or in progress for this experiment. The response payload intentionally does not
include the `results` array — at POST time the workflow has just been queued and no per-metric
results exist yet. Clients should poll `GET metrics_recalculation/{id}/` for results as the workflow
progresses.
- **OpenAPI operationId**: `experiments_metrics_recalculation_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`, `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; experiment_id: number; status: "pending" | "in_progress" | "completed" | "failed"; total_metrics: number; completed_metrics: number; failed_metrics: number; metric_errors: unknown; trigger: "manual" | "col...`
- OpenAPI response codes: `200`, `201`

```ts
import posthog from "@utdk/posthog";

type ExperimentsMetricsRecalculationCreateInput = Parameters<typeof posthog.experimentsMetricsRecalculationCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsMetricsRecalculationCreateOutput = Awaited<ReturnType<typeof posthog.experimentsMetricsRecalculationCreate>>;

const result: ExperimentsMetricsRecalculationCreateOutput = await posthog.experimentsMetricsRecalculationCreate();

// Result shape (from schema): { id: string; experiment_id: number; status: "pending" | "in_progress" | "completed" | "failed"; total_metrics: number; completed_metrics: number; failed_metrics: number; metric_errors: unknown; trigger: "manual" | "col...
```

### `posthog.experimentsMetricsRecalculationRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/experiments/{id}/metrics_recalculation/{recalculation_id}/`
- **What it does**: Mixin for ViewSets to handle approval-gate exceptions raised from decorated serializers.

Intercepts ApprovalRequired (409) and PolicyConflict (400) raised by the @approval_gate
decorator on serializer methods and converts them into the same responses the viewset path
produces (see decorators._result_to_response), so both paths share one contract.
- **OpenAPI operationId**: `experiments_metrics_recalculation_retrieve`
- **Path params**: `id`, `recalculation_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; experiment_id: number; status: "pending" | "in_progress" | "completed" | "failed"; total_metrics: number; completed_metrics: number; failed_metrics: number; metric_errors: unknown; trigger: "manual" | "col...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type ExperimentsMetricsRecalculationRetrieveInput = Parameters<typeof posthog.experimentsMetricsRecalculationRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsMetricsRecalculationRetrieveOutput = Awaited<ReturnType<typeof posthog.experimentsMetricsRecalculationRetrieve>>;

const result: ExperimentsMetricsRecalculationRetrieveOutput = await posthog.experimentsMetricsRecalculationRetrieve();

// Result shape (from schema): { id: string; experiment_id: number; status: "pending" | "in_progress" | "completed" | "failed"; total_metrics: number; completed_metrics: number; failed_metrics: number; metric_errors: unknown; trigger: "manual" | "col...
```

### `posthog.experimentsMetricsRecalculationLatestRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/experiments/{id}/metrics_recalculation/latest/`
- **What it does**: Mixin for ViewSets to handle approval-gate exceptions raised from decorated serializers.

Intercepts ApprovalRequired (409) and PolicyConflict (400) raised by the @approval_gate
decorator on serializer methods and converts them into the same responses the viewset path
produces (see decorators._result_to_response), so both paths share one contract.
- **OpenAPI operationId**: `experiments_metrics_recalculation_latest_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; experiment_id: number; status: "pending" | "in_progress" | "completed" | "failed"; total_metrics: number; completed_metrics: number; failed_metrics: number; metric_errors: unknown; trigger: "manual" | "col...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type ExperimentsMetricsRecalculationLatestRetrieveInput = Parameters<typeof posthog.experimentsMetricsRecalculationLatestRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsMetricsRecalculationLatestRetrieveOutput = Awaited<ReturnType<typeof posthog.experimentsMetricsRecalculationLatestRetrieve>>;

const result: ExperimentsMetricsRecalculationLatestRetrieveOutput = await posthog.experimentsMetricsRecalculationLatestRetrieve();

// Result shape (from schema): { id: string; experiment_id: number; status: "pending" | "in_progress" | "completed" | "failed"; total_metrics: number; completed_metrics: number; failed_metrics: number; metric_errors: unknown; trigger: "manual" | "col...
```

### `posthog.experimentsPauseCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/pause/`
- **What it does**: Pause a running experiment.

Deactivates the linked feature flag so it is no longer returned by the
/decide endpoint. Users fall back to the application default (typically
the control experience), and no new exposure events are recorded (i.e.
$feature_flag_called is not fired).
Returns 400 if the experiment is not running or is already paused.
- **OpenAPI operationId**: `experiments_pause_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsPauseCreateInput = Parameters<typeof posthog.experimentsPauseCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsPauseCreateOutput = Awaited<ReturnType<typeof posthog.experimentsPauseCreate>>;

const result: ExperimentsPauseCreateOutput = await posthog.experimentsPauseCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsRecalculateTimeseriesCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/recalculate_timeseries/`
- **What it does**: Mixin for ViewSets to handle approval-gate exceptions raised from decorated serializers.

Intercepts ApprovalRequired (409) and PolicyConflict (400) raised by the @approval_gate
decorator on serializer methods and converts them into the same responses the viewset path
produces (see decorators._result_to_response), so both paths share one contract.
- **OpenAPI operationId**: `experiments_recalculate_timeseries_create`
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

type ExperimentsRecalculateTimeseriesCreateInput = Parameters<typeof posthog.experimentsRecalculateTimeseriesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsRecalculateTimeseriesCreateOutput = Awaited<ReturnType<typeof posthog.experimentsRecalculateTimeseriesCreate>>;

const result: ExperimentsRecalculateTimeseriesCreateOutput = await posthog.experimentsRecalculateTimeseriesCreate();

// Result shape (from schema): unknown
```

### `posthog.experimentsResetCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/reset/`
- **What it does**: Reset an experiment back to draft state.

Clears start/end dates, conclusion, and archived flag. The feature
flag is left unchanged — users continue to see their assigned variants.

Previously collected events still exist but won't be included in
results unless the start date is manually adjusted after re-launch.

Returns 400 if the experiment is already in draft state.
- **OpenAPI operationId**: `experiments_reset_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsResetCreateInput = Parameters<typeof posthog.experimentsResetCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsResetCreateOutput = Awaited<ReturnType<typeof posthog.experimentsResetCreate>>;

const result: ExperimentsResetCreateOutput = await posthog.experimentsResetCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsResumeCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/resume/`
- **What it does**: Resume a paused experiment.

Reactivates the linked feature flag so it is returned by /decide again.
Users are re-bucketed deterministically into the same variants they had
before the pause, and exposure tracking resumes.
Returns 400 if the experiment is not running or is not paused.
- **OpenAPI operationId**: `experiments_resume_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsResumeCreateInput = Parameters<typeof posthog.experimentsResumeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsResumeCreateOutput = Awaited<ReturnType<typeof posthog.experimentsResumeCreate>>;

const result: ExperimentsResumeCreateOutput = await posthog.experimentsResumeCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsShipVariantCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/ship_variant/`
- **What it does**: Ship a variant and (optionally) end the experiment.

Updates the feature flag so the selected variant gets 100% of the variant
distribution. By default, existing release conditions on the flag are preserved
untouched — the variant is served only to users who already match them. Pass
``release_to_everyone: true`` to also prepend a catch-all release condition
that rolls the variant out to 100% of users (overrides any existing release
conditions on the flag).

Can be called on both running and stopped experiments. If the experiment is
still running, it will also be ended (end_date set and status marked as stopped).
If the experiment has already ended, only the flag is rewritten - this supports
the "end first, ship later" workflow.

If an approval policy requires review before changes on the flag take effect,
the API returns 409 with a change_request_id. The experiment is NOT ended until
the change request is approved and the user retries.

Returns 400 if the experiment is in draft state, the variant_key is not found
on the flag, or the experiment has no linked feature flag.
- **OpenAPI operationId**: `experiments_ship_variant_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsShipVariantCreateInput = Parameters<typeof posthog.experimentsShipVariantCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsShipVariantCreateOutput = Awaited<ReturnType<typeof posthog.experimentsShipVariantCreate>>;

const result: ExperimentsShipVariantCreateOutput = await posthog.experimentsShipVariantCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsTimeseriesResultsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/experiments/{id}/timeseries_results/`
- **What it does**: Mixin for ViewSets to handle approval-gate exceptions raised from decorated serializers.

Intercepts ApprovalRequired (409) and PolicyConflict (400) raised by the @approval_gate
decorator on serializer methods and converts them into the same responses the viewset path
produces (see decorators._result_to_response), so both paths share one contract.
- **OpenAPI operationId**: `experiments_timeseries_results_retrieve`
- **Path params**: `id`
- **Query params**: `fingerprint`, `metric_uuid`
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

type ExperimentsTimeseriesResultsRetrieveInput = Parameters<typeof posthog.experimentsTimeseriesResultsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsTimeseriesResultsRetrieveOutput = Awaited<ReturnType<typeof posthog.experimentsTimeseriesResultsRetrieve>>;

const result: ExperimentsTimeseriesResultsRetrieveOutput = await posthog.experimentsTimeseriesResultsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.experimentsUnarchiveCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/unarchive/`
- **What it does**: Unarchive an archived experiment.

Restores the experiment to the default list view. Returns 400 if the
experiment is not currently archived.
- **OpenAPI operationId**: `experiments_unarchive_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsUnarchiveCreateInput = Parameters<typeof posthog.experimentsUnarchiveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsUnarchiveCreateOutput = Awaited<ReturnType<typeof posthog.experimentsUnarchiveCreate>>;

const result: ExperimentsUnarchiveCreateOutput = await posthog.experimentsUnarchiveCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsUnfreezeExposureCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/{id}/unfreeze_exposure/`
- **What it does**: Reopen enrollment on an exposure-frozen experiment.

Removes the snapshot-cohort condition and freeze markers from every release
group, restoring the flag's original targeting: new users can enroll again
and already-enrolled users keep their assigned variant. The snapshot cohort
is soft-deleted. The serialized status returns to 'running'.

Returns 400 if the experiment is not running or its exposure is not frozen.
- **OpenAPI operationId**: `experiments_unfreeze_exposure_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsUnfreezeExposureCreateInput = Parameters<typeof posthog.experimentsUnfreezeExposureCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsUnfreezeExposureCreateOutput = Awaited<ReturnType<typeof posthog.experimentsUnfreezeExposureCreate>>;

const result: ExperimentsUnfreezeExposureCreateOutput = await posthog.experimentsUnfreezeExposureCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsCalculateRunningTimeCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/calculate_running_time/`
- **What it does**: Estimate the recommended sample size and running time for an experiment.

Pure statistical calculation — does not read or write any experiment. Pass the metric type, a
minimum detectable effect, and either a baseline value or raw baseline statistics. When
`exposure_rate_per_day` is provided, the response also includes the estimated running time in days.
- **OpenAPI operationId**: `experiments_calculate_running_time_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ baseline_value: number | null; variance: number | null; recommended_sample_size: number | null; recommended_running_time_days: number | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsCalculateRunningTimeCreateInput = Parameters<typeof posthog.experimentsCalculateRunningTimeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsCalculateRunningTimeCreateOutput = Awaited<ReturnType<typeof posthog.experimentsCalculateRunningTimeCreate>>;

const result: ExperimentsCalculateRunningTimeCreateOutput = await posthog.experimentsCalculateRunningTimeCreate();

// Result shape (from schema): { baseline_value: number | null; variance: number | null; recommended_sample_size: number | null; recommended_running_time_days: number | null }
```

### `posthog.experimentsCreateFromPromptCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiments/create_from_prompt/`
- **What it does**: Create an experiment that compares N versions of an LLM prompt using a metric template.

The user picks 2+ versions of an existing LLMPrompt and 1+ metric templates
(cost / latency / eval_pass_rate). The endpoint builds the matching variants
(control + test-N, each named after its prompt version) and attaches one
metric per selected template, each scoped to the prompt's $ai_prompt_name.
Resulting experiment is in draft state.
- **OpenAPI operationId**: `experiments_create_from_prompt_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsCreateFromPromptCreateInput = Parameters<typeof posthog.experimentsCreateFromPromptCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsCreateFromPromptCreateOutput = Awaited<ReturnType<typeof posthog.experimentsCreateFromPromptCreate>>;

const result: ExperimentsCreateFromPromptCreateOutput = await posthog.experimentsCreateFromPromptCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; start_date?: string | null; end_date?: string | null; feature_flag_key: string; feature_flag: { id: number; team_id: number; name?: string; key: string; filters?:...
```

### `posthog.experimentsEligibleFeatureFlagsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/experiments/eligible_feature_flags/`
- **What it does**: Returns a paginated list of feature flags eligible for use in experiments.

Eligible flags must:
- Be multivariate with at least 2 variants
- Have "control" as the first variant key

Query parameters:
- search: Filter by flag key or name (case insensitive)
- limit: Number of results per page (default: 20)
- offset: Pagination offset (default: 0)
- active: Filter by active status ("true" or "false")
- created_by_id: Filter by creator user ID
- order: Sort order field
- evaluation_runtime: Filter by evaluation runtime
- has_evaluation_contexts: Filter by presence of evaluation contexts ("true" or "false")
- **OpenAPI operationId**: `experiments_eligible_feature_flags_retrieve`
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

type ExperimentsEligibleFeatureFlagsRetrieveInput = Parameters<typeof posthog.experimentsEligibleFeatureFlagsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsEligibleFeatureFlagsRetrieveOutput = Awaited<ReturnType<typeof posthog.experimentsEligibleFeatureFlagsRetrieve>>;

const result: ExperimentsEligibleFeatureFlagsRetrieveOutput = await posthog.experimentsEligibleFeatureFlagsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.experimentsPromptTemplatesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/experiments/prompt_templates/`
- **What it does**: List the LLM metric templates that can be passed to `create_from_prompt`.
- **OpenAPI operationId**: `experiments_prompt_templates_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ key: string; label: string; description: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentsPromptTemplatesRetrieveInput = Parameters<typeof posthog.experimentsPromptTemplatesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsPromptTemplatesRetrieveOutput = Awaited<ReturnType<typeof posthog.experimentsPromptTemplatesRetrieve>>;

const result: ExperimentsPromptTemplatesRetrieveOutput = await posthog.experimentsPromptTemplatesRetrieve();

// Result shape (from schema): ({ key: string; label: string; description: string })[]
```

### `posthog.experimentsStatsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/experiments/stats/`
- **What it does**: Mixin for ViewSets to handle approval-gate exceptions raised from decorated serializers.

Intercepts ApprovalRequired (409) and PolicyConflict (400) raised by the @approval_gate
decorator on serializer methods and converts them into the same responses the viewset path
produces (see decorators._result_to_response), so both paths share one contract.
- **OpenAPI operationId**: `experiments_stats_retrieve`
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

type ExperimentsStatsRetrieveInput = Parameters<typeof posthog.experimentsStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentsStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.experimentsStatsRetrieve>>;

const result: ExperimentsStatsRetrieveOutput = await posthog.experimentsStatsRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

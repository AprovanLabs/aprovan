# Engineering Analytics

## Operations

### `posthog.engineeringAnalyticsAuthorWorkflowCosts`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/author_workflow_costs/`
- **What it does**: One author's estimated CI cost split by workflow over a window (date_from default -30d), highest spend first. Runs are attributed to the author through their pull requests (attribution is by PR number). Returns an empty list when the job-level source isn't synced.
- **OpenAPI operationId**: `engineering_analytics_author_workflow_costs`
- **Path params**: None
- **Query params**: `author`, `date_from`, `date_to`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ workflow_name: string; billable_minutes: number; estimated_cost_usd: number | null; costed_jobs: number; unsettled_jobs: number; excluded_jobs: number })[]`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsAuthorWorkflowCostsInput = Parameters<typeof posthog.engineeringAnalyticsAuthorWorkflowCosts> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsAuthorWorkflowCostsOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsAuthorWorkflowCosts>>;

const result: EngineeringAnalyticsAuthorWorkflowCostsOutput = await posthog.engineeringAnalyticsAuthorWorkflowCosts();

// Result shape (from schema): ({ workflow_name: string; billable_minutes: number; estimated_cost_usd: number | null; costed_jobs: number; unsettled_jobs: number; excluded_jobs: number })[]
```

### `posthog.engineeringAnalyticsCiCards`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/ci_cards/`
- **What it does**: Headline counts for the open-PR backlog: open PRs, distinct repos, stuck PRs (open, non-draft, non-bot, older than 7 days), and PRs with failing CI. The failing-CI count rests on the head-SHA join and can lag until late CI completions settle.
- **OpenAPI operationId**: `engineering_analytics_ci_cards`
- **Path params**: None
- **Query params**: `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ open_prs: number; repos: number; stuck: number; failing_ci: number }`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsCiCardsInput = Parameters<typeof posthog.engineeringAnalyticsCiCards> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsCiCardsOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsCiCards>>;

const result: EngineeringAnalyticsCiCardsOutput = await posthog.engineeringAnalyticsCiCards();

// Result shape (from schema): { open_prs: number; repos: number; stuck: number; failing_ci: number }
```

### `posthog.engineeringAnalyticsCiFailureLogs`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/ci_failure_logs/`
- **What it does**: The thinned CI failure logs for a pull request, grouped by failed job. Resolves the PR to its workflow runs via the pull_requests association (all of the PR's pushes, not just the latest commit), then reads the Logs product joined on run_id. Returns failed jobs only (the worker fetches logs for failures); logs_available is false when CI hasn't failed, the logs aged out of the short Logs retention, or a fork PR has no run association. Each line carries its original 1-based line number in the full pre-thinning log; lines are the failure region (errors plus surrounding context, with omission markers), capped per job and overall.
- **OpenAPI operationId**: `engineering_analytics_ci_failure_logs`
- **Path params**: None
- **Query params**: `pr_number`, `repo`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ repo: { provider: string; owner: string; name: string }; jobs: ({ lines: ({ original_line: number | null; text: string })[]; job_id: number; run_id: number; conclusion: string; branch: string; original_total_lines: nu...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsCiFailureLogsInput = Parameters<typeof posthog.engineeringAnalyticsCiFailureLogs> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsCiFailureLogsOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsCiFailureLogs>>;

const result: EngineeringAnalyticsCiFailureLogsOutput = await posthog.engineeringAnalyticsCiFailureLogs();

// Result shape (from schema): { repo: { provider: string; owner: string; name: string }; jobs: ({ lines: ({ original_line: number | null; text: string })[]; job_id: number; run_id: number; conclusion: string; branch: string; original_total_lines: nu...
```

### `posthog.engineeringAnalyticsFlakyTests`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/flaky_tests/`
- **What it does**: The flaky-test leaderboard: backend tests ranked by flakiness signal from the per-test CI spans, over a window (default -7d, maximum 30 days). A test qualifies by passing on retry at least min_rerun_passes times OR failing on at least min_failed_prs distinct PRs. All figures are absolute counts, never rates: fast passing runs are not emitted, so denominators are biased. Pass-on-retry counts only flow from CI lanes running with reruns enabled; in other lanes a flake surfaces as a plain failure, which the distinct-PR count catches.
- **OpenAPI operationId**: `engineering_analytics_flaky_tests`
- **Path params**: None
- **Query params**: `date_from`, `date_to`, `limit`, `min_failed_prs`, `min_rerun_passes`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ items: ({ nodeid: string; selector: string; rerun_passed_count: number; failed_count: number; failed_pr_count: number; branch_count: number; xfailed_count: number; last_seen_at: string })[]; truncated: boolean; limit:...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsFlakyTestsInput = Parameters<typeof posthog.engineeringAnalyticsFlakyTests> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsFlakyTestsOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsFlakyTests>>;

const result: EngineeringAnalyticsFlakyTestsOutput = await posthog.engineeringAnalyticsFlakyTests();

// Result shape (from schema): { items: ({ nodeid: string; selector: string; rerun_passed_count: number; failed_count: number; failed_pr_count: number; branch_count: number; xfailed_count: number; last_seen_at: string })[]; truncated: boolean; limit:...
```

### `posthog.engineeringAnalyticsJobAggregates`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/job_aggregates/`
- **What it does**: Per-job aggregates for one workflow over a window (default -30d), one row per de-sharded job name (matrix shards aggregate together), busiest first: queue p50, duration p50/p95, failure rate, retry pressure, run share (below 1.0 = conditional job), and billable cost. Jobs always need their run as context — this is the aggregate view; use workflow_jobs for one run's jobs. Empty when the job-level source isn't synced.
- **OpenAPI operationId**: `engineering_analytics_job_aggregates`
- **Path params**: None
- **Query params**: `branch`, `date_from`, `date_to`, `source_id`, `workflow_name`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ job_name: string; job_count: number; shard_count: number; runs_in: number; run_share: number | null; queue_p50_seconds: number | null; p50_seconds: number | null; p95_seconds: number | null; failure_rate: number | nu...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsJobAggregatesInput = Parameters<typeof posthog.engineeringAnalyticsJobAggregates> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsJobAggregatesOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsJobAggregates>>;

const result: EngineeringAnalyticsJobAggregatesOutput = await posthog.engineeringAnalyticsJobAggregates();

// Result shape (from schema): ({ job_name: string; job_count: number; shard_count: number; runs_in: number; run_share: number | null; queue_p50_seconds: number | null; p50_seconds: number | null; p95_seconds: number | null; failure_rate: number | nu...
```

### `posthog.engineeringAnalyticsMasterFailures`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/master_failures/`
- **What it does**: Default-branch failures over a window (default -24h), grouped error-tracking style by (workflow, de-sharded failing job) with a run count and first/last seen, newest group first. `branch` overrides the detected default branch. PR-branch failures are deliberately excluded — at monorepo volume a flat feed is a firehose; those surface per PR. Groups degrade to workflow level (failed_job '') when the job-level source isn't synced.
- **OpenAPI operationId**: `engineering_analytics_master_failures`
- **Path params**: None
- **Query params**: `branch`, `date_from`, `date_to`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ repo: { provider: string; owner: string; name: string }; workflow_name: string; failed_job: string; run_count: number; first_seen: string; last_seen: string; latest_run_id: number })[]`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsMasterFailuresInput = Parameters<typeof posthog.engineeringAnalyticsMasterFailures> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsMasterFailuresOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsMasterFailures>>;

const result: EngineeringAnalyticsMasterFailuresOutput = await posthog.engineeringAnalyticsMasterFailures();

// Result shape (from schema): ({ repo: { provider: string; owner: string; name: string }; workflow_name: string; failed_job: string; run_count: number; first_seen: string; last_seen: string; latest_run_id: number })[]
```

### `posthog.engineeringAnalyticsPrCost`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/pr_cost/`
- **What it does**: Estimated CI cost for a pull request, summed over the jobs of all its workflow runs. Billable self-hosted Linux runners only — provider-hosted (free GitHub-hosted) and non-Linux jobs are excluded. Every figure is zero/null with `jobs_available` false when the job-level source isn't synced yet.
- **OpenAPI operationId**: `engineering_analytics_pr_cost`
- **Path params**: None
- **Query params**: `pr_number`, `repo`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ by_workflow: ({ workflow_name: string; billable_minutes: number; estimated_cost_usd: number | null; costed_jobs: number; unsettled_jobs: number; excluded_jobs: number })[]; by_run: ({ run_id: number; run_attempt: numb...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsPrCostInput = Parameters<typeof posthog.engineeringAnalyticsPrCost> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsPrCostOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsPrCost>>;

const result: EngineeringAnalyticsPrCostOutput = await posthog.engineeringAnalyticsPrCost();

// Result shape (from schema): { by_workflow: ({ workflow_name: string; billable_minutes: number; estimated_cost_usd: number | null; costed_jobs: number; unsettled_jobs: number; excluded_jobs: number })[]; by_run: ({ run_id: number; run_attempt: numb...
```

### `posthog.engineeringAnalyticsPrLifecycle`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/pr_lifecycle/`
- **What it does**: The timeline of a single pull request: header plus ordered events (opened, CI started/finished, merged or closed). Use this to answer 'where is this PR stuck and what happened to it'. This is a partial view: review and comment events are not yet available.
- **OpenAPI operationId**: `engineering_analytics_pr_lifecycle`
- **Path params**: None
- **Query params**: `pr_number`, `repo`, `source_id`
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ pull_request: { author: { handle: string; display_name: string; avatar_url: string; is_bot: boolean }; repo: { provider: string; owner: string; name: string }; id: number; number: number; title: string; state: "open" ...`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsPrLifecycleInput = Parameters<typeof posthog.engineeringAnalyticsPrLifecycle> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsPrLifecycleOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsPrLifecycle>>;

const result: EngineeringAnalyticsPrLifecycleOutput = await posthog.engineeringAnalyticsPrLifecycle();

// Result shape (from schema): { pull_request: { author: { handle: string; display_name: string; avatar_url: string; is_bot: boolean }; repo: { provider: string; owner: string; name: string }; id: number; number: number; title: string; state: "open" ...
```

### `posthog.engineeringAnalyticsPrRuns`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/pr_runs/`
- **What it does**: Every workflow run attributed to a pull request, across all its commits (grouped by head SHA client-side), newest first. Run-level only.
- **OpenAPI operationId**: `engineering_analytics_pr_runs`
- **Path params**: None
- **Query params**: `pr_number`, `repo`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ repo: { provider: string; owner: string; name: string }; id: number; workflow_name: string; head_sha: string; head_branch: string; status: string; conclusion: string | null; run_started_at: string | null; updated_at:...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsPrRunsInput = Parameters<typeof posthog.engineeringAnalyticsPrRuns> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsPrRunsOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsPrRuns>>;

const result: EngineeringAnalyticsPrRunsOutput = await posthog.engineeringAnalyticsPrRuns();

// Result shape (from schema): ({ repo: { provider: string; owner: string; name: string }; id: number; workflow_name: string; head_sha: string; head_branch: string; status: string; conclusion: string | null; run_started_at: string | null; updated_at:...
```

### `posthog.engineeringAnalyticsPullRequests`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/pull_requests/`
- **What it does**: Open pull requests plus any merged or closed since date_from (default -30d), newest first, each with its head-SHA CI rollup. The list is capped; when more match, `truncated` is true and the ci_cards counts can exceed it. open_to_merge_seconds is coarse — it fuses draft and ready-for-review time; CI counts can lag until late completions settle.
- **OpenAPI operationId**: `engineering_analytics_pull_requests`
- **Path params**: None
- **Query params**: `author`, `date_from`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ items: ({ author: { handle: string; display_name: string; avatar_url: string; is_bot: boolean }; repo: { provider: string; owner: string; name: string }; ci: { runs: number; passing: number; failing: number; pending: ...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsPullRequestsInput = Parameters<typeof posthog.engineeringAnalyticsPullRequests> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsPullRequestsOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsPullRequests>>;

const result: EngineeringAnalyticsPullRequestsOutput = await posthog.engineeringAnalyticsPullRequests();

// Result shape (from schema): { items: ({ author: { handle: string; display_name: string; avatar_url: string; is_bot: boolean }; repo: { provider: string; owner: string; name: string }; ci: { runs: number; passing: number; failing: number; pending: ...
```

### `posthog.engineeringAnalyticsQuarantine`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/quarantine/`
- **What it does**: Flaky-test quarantine file
- **OpenAPI operationId**: `engineering_analytics_quarantine`
- **Path params**: None
- **Query params**: `repo`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ entries: ({ id: string; runner: string; reason: string; owner: string; issue: string; added: string; expires: string; mode: "run" | "skip"; lifecycle: "active" | "expiring_soon" | "in_grace" | "overdue"; days_until_ex...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsQuarantineInput = Parameters<typeof posthog.engineeringAnalyticsQuarantine> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsQuarantineOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsQuarantine>>;

const result: EngineeringAnalyticsQuarantineOutput = await posthog.engineeringAnalyticsQuarantine();

// Result shape (from schema): { entries: ({ id: string; runner: string; reason: string; owner: string; issue: string; added: string; expires: string; mode: "run" | "skip"; lifecycle: "active" | "expiring_soon" | "in_grace" | "overdue"; days_until_ex...
```

### `posthog.engineeringAnalyticsQuarantineRequest`

- **HTTP**: `POST /api/projects/{project_id}/engineering_analytics/quarantine/request/`
- **What it does**: Quarantine, extend, or unquarantine a flaky test
- **OpenAPI operationId**: `engineering_analytics_quarantine_request`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ pr_url: string; issue_url: string; branch: string }`
- OpenAPI response codes: `201`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsQuarantineRequestInput = Parameters<typeof posthog.engineeringAnalyticsQuarantineRequest> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsQuarantineRequestOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsQuarantineRequest>>;

const result: EngineeringAnalyticsQuarantineRequestOutput = await posthog.engineeringAnalyticsQuarantineRequest();

// Result shape (from schema): { pr_url: string; issue_url: string; branch: string }
```

### `posthog.engineeringAnalyticsRepoOverview`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/repo_overview/`
- **What it does**: Repo-level headline aggregates over a window (default -30d): run count, success rate, re-run cycles, median PR open-to-merge (bots and drafts excluded; coarse — draft and ready time fused), and billable minutes + estimated cost — each with its equal-length previous-window twin so a caller can render honest deltas. Also carries the detected default branch and its completed-run history series. Cost figures are null until the job-level source is synced.
- **OpenAPI operationId**: `engineering_analytics_repo_overview`
- **Path params**: None
- **Query params**: `date_from`, `date_to`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ cost_series: ({ bucket_start: string; estimated_cost_usd: number | null; merges: number; cost_per_merge_usd: number | null })[]; time_to_green_series: ({ bucket_start: string; p50_seconds: number | null })[]; success_...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsRepoOverviewInput = Parameters<typeof posthog.engineeringAnalyticsRepoOverview> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsRepoOverviewOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsRepoOverview>>;

const result: EngineeringAnalyticsRepoOverviewOutput = await posthog.engineeringAnalyticsRepoOverview();

// Result shape (from schema): { cost_series: ({ bucket_start: string; estimated_cost_usd: number | null; merges: number; cost_per_merge_usd: number | null })[]; time_to_green_series: ({ bucket_start: string; p50_seconds: number | null })[]; success_...
```

### `posthog.engineeringAnalyticsRepoRunActivity`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/repo_run_activity/`
- **What it does**: Default-branch health as compact chart points over a window (default -30d), newest first, for the repo-hub run-activity chart. All of a commit's workflow runs are collapsed into ONE point per commit (head SHA): its earliest workflow start, wall-clock duration until the last workflow settled (null while any is still running), and an overall conclusion that is 'failure' if any workflow decisively failed, else 'success' when at least one passed, else 'neutral'. `branch` overrides the detected default branch. `truncated` is true when more commits matched than the cap, so the chart covers only the most recent commits.
- **OpenAPI operationId**: `engineering_analytics_repo_run_activity`
- **Path params**: None
- **Query params**: `branch`, `date_from`, `date_to`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ points: ({ run_id: number; conclusion: string | null; run_started_at: string; duration_seconds: number | null; head_branch: string; pr_number: number; head_sha: string })[]; truncated: boolean; limit: number }`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsRepoRunActivityInput = Parameters<typeof posthog.engineeringAnalyticsRepoRunActivity> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsRepoRunActivityOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsRepoRunActivity>>;

const result: EngineeringAnalyticsRepoRunActivityOutput = await posthog.engineeringAnalyticsRepoRunActivity();

// Result shape (from schema): { points: ({ run_id: number; conclusion: string | null; run_started_at: string; duration_seconds: number | null; head_branch: string; pr_number: number; head_sha: string })[]; truncated: boolean; limit: number }
```

### `posthog.engineeringAnalyticsRunFailureLogs`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/run_failure_logs/`
- **What it does**: The thinned CI failure logs of one workflow run, grouped by failed job — the run-scoped twin of ci_failure_logs for surfaces that aren't PR-scoped (default-branch failures, the run page). logs_available is false when the run didn't fail or its logs aged out of the short Logs retention.
- **OpenAPI operationId**: `engineering_analytics_run_failure_logs`
- **Path params**: None
- **Query params**: `run_id`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ jobs: ({ lines: ({ original_line: number | null; text: string })[]; job_id: number; run_id: number; conclusion: string; branch: string; original_total_lines: number; line_count: number; truncated: boolean })[]; run_id...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsRunFailureLogsInput = Parameters<typeof posthog.engineeringAnalyticsRunFailureLogs> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsRunFailureLogsOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsRunFailureLogs>>;

const result: EngineeringAnalyticsRunFailureLogsOutput = await posthog.engineeringAnalyticsRunFailureLogs();

// Result shape (from schema): { jobs: ({ lines: ({ original_line: number | null; text: string })[]; job_id: number; run_id: number; conclusion: string; branch: string; original_total_lines: number; line_count: number; truncated: boolean })[]; run_id...
```

### `posthog.engineeringAnalyticsSources`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/sources/`
- **What it does**: The team's connected GitHub data warehouse sources, oldest first. Populate a source picker from this and pass a chosen `id` back as `source_id` to the other endpoints. A team can connect GitHub more than once (e.g. one source per repository); this lists them all, including any whose tables aren't fully synced yet.
- **OpenAPI operationId**: `engineering_analytics_sources`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; repo: string; prefix: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsSourcesInput = Parameters<typeof posthog.engineeringAnalyticsSources> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsSourcesOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsSources>>;

const result: EngineeringAnalyticsSourcesOutput = await posthog.engineeringAnalyticsSources();

// Result shape (from schema): ({ id: string; repo: string; prefix: string })[]
```

### `posthog.engineeringAnalyticsWorkflowHealth`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/workflow_health/`
- **What it does**: Per-workflow CI health over a window (default last 24 hours, maximum 366 days): run count, success rate, p50/p95 duration, last failure time, latest-run status, and a zero-filled run history bucketed by hour/day/week to fit the window. p50/p95 are over successful runs only, so cancelled (superseded) and failed runs never bias the duration trend. Optionally scope to a single git branch via `branch`, or to attributed pull-request runs via `run_scope=pull_request`. Use this for 'is CI getting slower' and 'which workflow is the long pole'; compare two windows to get a trend.
- **OpenAPI operationId**: `engineering_analytics_workflow_health`
- **Path params**: None
- **Query params**: `branch`, `date_from`, `date_to`, `run_scope`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ repo: { provider: string; owner: string; name: string }; buckets: ({ bucket_start: string; run_count: number; completed: number; successes: number; failures: number })[]; workflow_name: string; run_count: number; suc...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsWorkflowHealthInput = Parameters<typeof posthog.engineeringAnalyticsWorkflowHealth> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsWorkflowHealthOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsWorkflowHealth>>;

const result: EngineeringAnalyticsWorkflowHealthOutput = await posthog.engineeringAnalyticsWorkflowHealth();

// Result shape (from schema): ({ repo: { provider: string; owner: string; name: string }; buckets: ({ bucket_start: string; run_count: number; completed: number; successes: number; failures: number })[]; workflow_name: string; run_count: number; suc...
```

### `posthog.engineeringAnalyticsWorkflowJobs`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/workflow_jobs/`
- **What it does**: Jobs of a single workflow run attempt, with per-job duration, runner tier, and estimated cost. Scoped to one run_attempt (the latest unless specified) so a re-run's attempts don't merge. Returns an empty list when the job-level source isn't synced yet.
- **OpenAPI operationId**: `engineering_analytics_workflow_jobs`
- **Path params**: None
- **Query params**: `run_attempt`, `run_id`, `source_id`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: number; run_id: number; name: string; status: string; conclusion: string | null; started_at: string | null; completed_at: string | null; duration_seconds: number | null; runner_provider: string; runner_label: str...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsWorkflowJobsInput = Parameters<typeof posthog.engineeringAnalyticsWorkflowJobs> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsWorkflowJobsOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsWorkflowJobs>>;

const result: EngineeringAnalyticsWorkflowJobsOutput = await posthog.engineeringAnalyticsWorkflowJobs();

// Result shape (from schema): ({ id: number; run_id: number; name: string; status: string; conclusion: string | null; started_at: string | null; completed_at: string | null; duration_seconds: number | null; runner_provider: string; runner_label: str...
```

### `posthog.engineeringAnalyticsWorkflowRunActivity`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/workflow_run_activity/`
- **What it does**: Compact per-run points for a single workflow over a window (date_from default -30d), newest first, for the run-activity chart: each run's start time, duration, conclusion, branch, and attributed PR. Optionally scope to a single git branch via `branch`, matching workflow_runs. Leaner and higher-capped than workflow_runs so the chart spans the full window even on busy workflows; `truncated` is true when the cap is hit, so the chart covers only the most recent runs.
- **OpenAPI operationId**: `engineering_analytics_workflow_run_activity`
- **Path params**: None
- **Query params**: `branch`, `date_from`, `date_to`, `repo`, `source_id`, `workflow_name`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ points: ({ run_id: number; conclusion: string | null; run_started_at: string; duration_seconds: number | null; head_branch: string; pr_number: number; head_sha: string })[]; truncated: boolean; limit: number }`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsWorkflowRunActivityInput = Parameters<typeof posthog.engineeringAnalyticsWorkflowRunActivity> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsWorkflowRunActivityOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsWorkflowRunActivity>>;

const result: EngineeringAnalyticsWorkflowRunActivityOutput = await posthog.engineeringAnalyticsWorkflowRunActivity();

// Result shape (from schema): { points: ({ run_id: number; conclusion: string | null; run_started_at: string; duration_seconds: number | null; head_branch: string; pr_number: number; head_sha: string })[]; truncated: boolean; limit: number }
```

### `posthog.engineeringAnalyticsWorkflowRun`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/workflow_run/`
- **What it does**: A single workflow run: status, conclusion, duration, branch, attempt, and the attributed pull request. Run-level only — per-job and per-step detail are not tracked yet.
- **OpenAPI operationId**: `engineering_analytics_workflow_run`
- **Path params**: None
- **Query params**: `run_id`, `source_id`
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ repo: { provider: string; owner: string; name: string }; id: number; workflow_name: string; head_sha: string; head_branch: string; status: string; conclusion: string | null; run_started_at: string | null; updated_at: ...`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsWorkflowRunInput = Parameters<typeof posthog.engineeringAnalyticsWorkflowRun> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsWorkflowRunOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsWorkflowRun>>;

const result: EngineeringAnalyticsWorkflowRunOutput = await posthog.engineeringAnalyticsWorkflowRun();

// Result shape (from schema): { repo: { provider: string; owner: string; name: string }; id: number; workflow_name: string; head_sha: string; head_branch: string; status: string; conclusion: string | null; run_started_at: string | null; updated_at: ...
```

### `posthog.engineeringAnalyticsWorkflowRunnerCosts`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/workflow_runner_costs/`
- **What it does**: A workflow's estimated CI cost broken down by runner tier over a window (date_from default -30d), highest spend first. Optionally scope to a single git branch via `branch`. Returns an empty list when the job-level source isn't synced.
- **OpenAPI operationId**: `engineering_analytics_workflow_runner_costs`
- **Path params**: None
- **Query params**: `branch`, `date_from`, `date_to`, `repo`, `source_id`, `workflow_name`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ provider: string; runner_label: string; job_count: number; billable_minutes: number; estimated_cost_usd: number | null })[]`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsWorkflowRunnerCostsInput = Parameters<typeof posthog.engineeringAnalyticsWorkflowRunnerCosts> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsWorkflowRunnerCostsOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsWorkflowRunnerCosts>>;

const result: EngineeringAnalyticsWorkflowRunnerCostsOutput = await posthog.engineeringAnalyticsWorkflowRunnerCosts();

// Result shape (from schema): ({ provider: string; runner_label: string; job_count: number; billable_minutes: number; estimated_cost_usd: number | null })[]
```

### `posthog.engineeringAnalyticsWorkflowRuns`

- **HTTP**: `GET /api/projects/{project_id}/engineering_analytics/workflow_runs/`
- **What it does**: Runs of a single workflow within a repo over a window (date_from default -30d), newest first. Optionally scope to a single git branch via `branch`. Each row is run-level — per-job and per-step detail are not tracked yet. Use this as the GitHub 'workflow' page between the workflow list and a single run.
- **OpenAPI operationId**: `engineering_analytics_workflow_runs`
- **Path params**: None
- **Query params**: `branch`, `date_from`, `date_to`, `repo`, `source_id`, `workflow_name`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ repo: { provider: string; owner: string; name: string }; id: number; workflow_name: string; head_sha: string; head_branch: string; status: string; conclusion: string | null; run_started_at: string | null; updated_at:...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type EngineeringAnalyticsWorkflowRunsInput = Parameters<typeof posthog.engineeringAnalyticsWorkflowRuns> extends [infer T, ...unknown[]] ? T : undefined;
type EngineeringAnalyticsWorkflowRunsOutput = Awaited<ReturnType<typeof posthog.engineeringAnalyticsWorkflowRuns>>;

const result: EngineeringAnalyticsWorkflowRunsOutput = await posthog.engineeringAnalyticsWorkflowRuns();

// Result shape (from schema): ({ repo: { provider: string; owner: string; name: string }; id: number; workflow_name: string; head_sha: string; head_branch: string; status: string; conclusion: string | null; run_started_at: string | null; updated_at:...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

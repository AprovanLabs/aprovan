# Visual Review

## Operations

### `posthog.visualReviewReposList`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/repos/`
- **What it does**: List all projects for the team.
- **OpenAPI operationId**: `visual_review_repos_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; repo_external_id: number; repo_full_name: string; baseline_file_paths: { [key: string]: string | undefined }; ena...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewReposListInput = Parameters<typeof posthog.visualReviewReposList> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposListOutput = Awaited<ReturnType<typeof posthog.visualReviewReposList>>;

const result: VisualReviewReposListOutput = await posthog.visualReviewReposList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; repo_external_id: number; repo_full_name: string; baseline_file_paths: { [key: string]: string | undefined }; ena...
```

### `posthog.visualReviewReposCreate`

- **HTTP**: `POST /api/projects/{project_id}/visual_review/repos/`
- **What it does**: Create a new repo.
- **OpenAPI operationId**: `visual_review_repos_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; repo_external_id: number; repo_full_name: string; baseline_file_paths: { [key: string]: string | undefined }; enable_pr_comments: boolean; created_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type VisualReviewReposCreateInput = Parameters<typeof posthog.visualReviewReposCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposCreateOutput = Awaited<ReturnType<typeof posthog.visualReviewReposCreate>>;

const result: VisualReviewReposCreateOutput = await posthog.visualReviewReposCreate();

// Result shape (from schema): { id: string; team_id: number; repo_external_id: number; repo_full_name: string; baseline_file_paths: { [key: string]: string | undefined }; enable_pr_comments: boolean; created_at: string }
```

### `posthog.visualReviewReposRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/repos/{id}/`
- **What it does**: Get a repo by ID.
- **OpenAPI operationId**: `visual_review_repos_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; repo_external_id: number; repo_full_name: string; baseline_file_paths: { [key: string]: string | undefined }; enable_pr_comments: boolean; created_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewReposRetrieveInput = Parameters<typeof posthog.visualReviewReposRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposRetrieveOutput = Awaited<ReturnType<typeof posthog.visualReviewReposRetrieve>>;

const result: VisualReviewReposRetrieveOutput = await posthog.visualReviewReposRetrieve();

// Result shape (from schema): { id: string; team_id: number; repo_external_id: number; repo_full_name: string; baseline_file_paths: { [key: string]: string | undefined }; enable_pr_comments: boolean; created_at: string }
```

### `posthog.visualReviewReposPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/visual_review/repos/{id}/`
- **What it does**: Update a repo's settings.
- **OpenAPI operationId**: `visual_review_repos_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; repo_external_id: number; repo_full_name: string; baseline_file_paths: { [key: string]: string | undefined }; enable_pr_comments: boolean; created_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewReposPartialUpdateInput = Parameters<typeof posthog.visualReviewReposPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposPartialUpdateOutput = Awaited<ReturnType<typeof posthog.visualReviewReposPartialUpdate>>;

const result: VisualReviewReposPartialUpdateOutput = await posthog.visualReviewReposPartialUpdate();

// Result shape (from schema): { id: string; team_id: number; repo_external_id: number; repo_full_name: string; baseline_file_paths: { [key: string]: string | undefined }; enable_pr_comments: boolean; created_at: string }
```

### `posthog.visualReviewReposBaselinesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/repos/{id}/baselines/`
- **What it does**: Snapshots overview for a repo: every identifier with a current baseline (latest non-superseded master/main run per run_type), plus tolerate counts, active quarantine state, and a 30-day stability sparkline. Capped at 5000 entries — sets `truncated` and returns the most recently active when exceeded. Filtering / faceting / search are all done client-side; this endpoint takes no filter query params.
- **OpenAPI operationId**: `visual_review_repos_baselines_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ entries: ({ quarantine?: { created_by?: { id: number; first_name: string; email: string } | null; source_run?: { id: string; branch: string; commit_sha: string; created_at: string; pr_number?: number | null } | null; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewReposBaselinesRetrieveInput = Parameters<typeof posthog.visualReviewReposBaselinesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposBaselinesRetrieveOutput = Awaited<ReturnType<typeof posthog.visualReviewReposBaselinesRetrieve>>;

const result: VisualReviewReposBaselinesRetrieveOutput = await posthog.visualReviewReposBaselinesRetrieve();

// Result shape (from schema): { entries: ({ quarantine?: { created_by?: { id: number; first_name: string; email: string } | null; source_run?: { id: string; branch: string; commit_sha: string; created_at: string; pr_number?: number | null } | null; ...
```

### `posthog.visualReviewReposQuarantineList`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/repos/{id}/quarantine/`
- **What it does**: List quarantined identifiers. Without filter: active only. With identifier: full history.
- **OpenAPI operationId**: `visual_review_repos_quarantine_list`
- **Path params**: `id`
- **Query params**: `identifier`, `limit`, `offset`, `run_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ created_by?: { id: number; first_name: string; email: string } | null; source_run?: { id: string; branch: string; commit_sha: string; created_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewReposQuarantineListInput = Parameters<typeof posthog.visualReviewReposQuarantineList> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposQuarantineListOutput = Awaited<ReturnType<typeof posthog.visualReviewReposQuarantineList>>;

const result: VisualReviewReposQuarantineListOutput = await posthog.visualReviewReposQuarantineList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ created_by?: { id: number; first_name: string; email: string } | null; source_run?: { id: string; branch: string; commit_sha: string; created_...
```

### `posthog.visualReviewReposQuarantineCreate`

- **HTTP**: `POST /api/projects/{project_id}/visual_review/repos/{id}/quarantine/{run_type}/`
- **What it does**: Quarantine a snapshot identifier for a specific run type.
- **OpenAPI operationId**: `visual_review_repos_quarantine_create`
- **Path params**: `id`, `run_type`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ created_by?: { id: number; first_name: string; email: string } | null; source_run?: { id: string; branch: string; commit_sha: string; created_at: string; pr_number?: number | null } | null; id: string; identifier: str...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type VisualReviewReposQuarantineCreateInput = Parameters<typeof posthog.visualReviewReposQuarantineCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposQuarantineCreateOutput = Awaited<ReturnType<typeof posthog.visualReviewReposQuarantineCreate>>;

const result: VisualReviewReposQuarantineCreateOutput = await posthog.visualReviewReposQuarantineCreate();

// Result shape (from schema): { created_by?: { id: number; first_name: string; email: string } | null; source_run?: { id: string; branch: string; commit_sha: string; created_at: string; pr_number?: number | null } | null; id: string; identifier: str...
```

### `posthog.visualReviewReposQuarantineExpireCreate`

- **HTTP**: `POST /api/projects/{project_id}/visual_review/repos/{id}/quarantine/{run_type}/expire/`
- **What it does**: Expire all active quarantine entries for an identifier.
- **OpenAPI operationId**: `visual_review_repos_quarantine_expire_create`
- **Path params**: `id`, `run_type`
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

type VisualReviewReposQuarantineExpireCreateInput = Parameters<typeof posthog.visualReviewReposQuarantineExpireCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposQuarantineExpireCreateOutput = Awaited<ReturnType<typeof posthog.visualReviewReposQuarantineExpireCreate>>;

const result: VisualReviewReposQuarantineExpireCreateOutput = await posthog.visualReviewReposQuarantineExpireCreate();

// Result shape (from schema): unknown
```

### `posthog.visualReviewReposThumbnailsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/repos/{id}/thumbnails/{identifier}/`
- **What it does**: Serve a snapshot thumbnail by identifier. Returns WebP with ETag caching.
- **OpenAPI operationId**: `visual_review_repos_thumbnails_retrieve`
- **Path params**: `id`, `identifier`
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

type VisualReviewReposThumbnailsRetrieveInput = Parameters<typeof posthog.visualReviewReposThumbnailsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposThumbnailsRetrieveOutput = Awaited<ReturnType<typeof posthog.visualReviewReposThumbnailsRetrieve>>;

const result: VisualReviewReposThumbnailsRetrieveOutput = await posthog.visualReviewReposThumbnailsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.visualReviewReposRunsList`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/repos/{repo_id}/runs/`
- **What it does**: List runs in this repo, optionally filtered by review state and free-text search.
- **OpenAPI operationId**: `visual_review_repos_runs_list`
- **Path params**: `repo_id`
- **Query params**: `limit`, `offset`, `review_state`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewReposRunsListInput = Parameters<typeof posthog.visualReviewReposRunsList> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposRunsListOutput = Awaited<ReturnType<typeof posthog.visualReviewReposRunsList>>;

const result: VisualReviewReposRunsListOutput = await posthog.visualReviewReposRunsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: st...
```

### `posthog.visualReviewReposRunsCountsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/repos/{repo_id}/runs/counts/`
- **What it does**: Review state counts for runs in this repo.
- **OpenAPI operationId**: `visual_review_repos_runs_counts_retrieve`
- **Path params**: `repo_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ needs_review: number; clean: number; processing: number; stale: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewReposRunsCountsRetrieveInput = Parameters<typeof posthog.visualReviewReposRunsCountsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposRunsCountsRetrieveOutput = Awaited<ReturnType<typeof posthog.visualReviewReposRunsCountsRetrieve>>;

const result: VisualReviewReposRunsCountsRetrieveOutput = await posthog.visualReviewReposRunsCountsRetrieve();

// Result shape (from schema): { needs_review: number; clean: number; processing: number; stale: number }
```

### `posthog.visualReviewReposSnapshotsList`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/repos/{repo_id}/snapshots/{run_type}/{identifier}/`
- **What it does**: Deduped baseline timeline for a snapshot identity. Newest first.
- **OpenAPI operationId**: `visual_review_repos_snapshots_list`
- **Path params**: `identifier`, `repo_id`, `run_type`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ current_artifact?: { id: string; content_hash: string; width: number | null; height: number | null; download_url: string | null } | null; run_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewReposSnapshotsListInput = Parameters<typeof posthog.visualReviewReposSnapshotsList> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewReposSnapshotsListOutput = Awaited<ReturnType<typeof posthog.visualReviewReposSnapshotsList>>;

const result: VisualReviewReposSnapshotsListOutput = await posthog.visualReviewReposSnapshotsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ current_artifact?: { id: string; content_hash: string; width: number | null; height: number | null; download_url: string | null } | null; run_...
```

### `posthog.visualReviewRunsList`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/runs/`
- **What it does**: List runs for the team, optionally filtered by review state, PR number, commit SHA, branch, or free-text search.
- **OpenAPI operationId**: `visual_review_runs_list`
- **Path params**: None
- **Query params**: `branch`, `commit_sha`, `limit`, `offset`, `pr_number`, `review_state`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: st...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsListInput = Parameters<typeof posthog.visualReviewRunsList> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsListOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsList>>;

const result: VisualReviewRunsListOutput = await posthog.visualReviewRunsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: st...
```

### `posthog.visualReviewRunsCreate`

- **HTTP**: `POST /api/projects/{project_id}/visual_review/runs/`
- **What it does**: Create a new run from a CI manifest.
- **OpenAPI operationId**: `visual_review_runs_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ run_id: string; uploads: ({ content_hash: string; url: string; fields: { [key: string]: string | undefined } })[] }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsCreateInput = Parameters<typeof posthog.visualReviewRunsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsCreateOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsCreate>>;

const result: VisualReviewRunsCreateOutput = await posthog.visualReviewRunsCreate();

// Result shape (from schema): { run_id: string; uploads: ({ content_hash: string; url: string; fields: { [key: string]: string | undefined } })[] }
```

### `posthog.visualReviewRunsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/runs/{id}/`
- **What it does**: Get run status and summary.
- **OpenAPI operationId**: `visual_review_runs_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: string; status: string; run_type: string; commit_sha: string; branch: string;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsRetrieveInput = Parameters<typeof posthog.visualReviewRunsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsRetrieveOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsRetrieve>>;

const result: VisualReviewRunsRetrieveOutput = await posthog.visualReviewRunsRetrieve();

// Result shape (from schema): { approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: string; status: string; run_type: string; commit_sha: string; branch: string;...
```

### `posthog.visualReviewRunsAddSnapshotsCreate`

- **HTTP**: `POST /api/projects/{project_id}/visual_review/runs/{id}/add-snapshots/`
- **What it does**: Add a batch of snapshots to a pending run (shard-based flow).
- **OpenAPI operationId**: `visual_review_runs_add_snapshots_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ added: number; uploads: ({ content_hash: string; url: string; fields: { [key: string]: string | undefined } })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsAddSnapshotsCreateInput = Parameters<typeof posthog.visualReviewRunsAddSnapshotsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsAddSnapshotsCreateOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsAddSnapshotsCreate>>;

const result: VisualReviewRunsAddSnapshotsCreateOutput = await posthog.visualReviewRunsAddSnapshotsCreate();

// Result shape (from schema): { added: number; uploads: ({ content_hash: string; url: string; fields: { [key: string]: string | undefined } })[] }
```

### `posthog.visualReviewRunsApproveCreate`

- **HTTP**: `POST /api/projects/{project_id}/visual_review/runs/{id}/approve/`
- **What it does**: Mark snapshots reviewed (DB only).

Records the per-snapshot "Accept change" decision. Does not commit the baseline
or change the GitHub gate — call finalize to ship the run.
- **OpenAPI operationId**: `visual_review_runs_approve_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: string; status: string; run_type: string; commit_sha: string; branch: string;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsApproveCreateInput = Parameters<typeof posthog.visualReviewRunsApproveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsApproveCreateOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsApproveCreate>>;

const result: VisualReviewRunsApproveCreateOutput = await posthog.visualReviewRunsApproveCreate();

// Result shape (from schema): { approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: string; status: string; run_type: string; commit_sha: string; branch: string;...
```

### `posthog.visualReviewRunsCompleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/visual_review/runs/{id}/complete/`
- **What it does**: Complete a run: detect removals, verify uploads, trigger diff processing.
- **OpenAPI operationId**: `visual_review_runs_complete_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: string; status: string; run_type: string; commit_sha: string; branch: string;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsCompleteCreateInput = Parameters<typeof posthog.visualReviewRunsCompleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsCompleteCreateOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsCompleteCreate>>;

const result: VisualReviewRunsCompleteCreateOutput = await posthog.visualReviewRunsCompleteCreate();

// Result shape (from schema): { approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: string; status: string; run_type: string; commit_sha: string; branch: string;...
```

### `posthog.visualReviewRunsFinalizeCreate`

- **HTTP**: `POST /api/projects/{project_id}/visual_review/runs/{id}/finalize/`
- **What it does**: Finalize a fully-reviewed run: commit the approved baseline and green the gate.

Commits exactly the snapshots approved in the DB (tolerated ones keep their baseline)
and only succeeds once every changed/new snapshot is resolved. With approve_all=true,
any still-pending changed/new snapshot is approved first. With commit_to_github=false
the server returns the signed baseline YAML instead of committing it.
- **OpenAPI operationId**: `visual_review_runs_finalize_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ run: { approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: string; status: string; run_type: string; commit_sha: string; branch: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsFinalizeCreateInput = Parameters<typeof posthog.visualReviewRunsFinalizeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsFinalizeCreateOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsFinalizeCreate>>;

const result: VisualReviewRunsFinalizeCreateOutput = await posthog.visualReviewRunsFinalizeCreate();

// Result shape (from schema): { run: { approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: string; status: string; run_type: string; commit_sha: string; branch: ...
```

### `posthog.visualReviewRunsRecomputeCreate`

- **HTTP**: `POST /api/projects/{project_id}/visual_review/runs/{id}/recompute/`
- **What it does**: Re-evaluate quarantine and counts, update commit status, and optionally rerun the CI job.
- **OpenAPI operationId**: `visual_review_runs_recompute_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ run: { approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: string; status: string; run_type: string; commit_sha: string; branch: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsRecomputeCreateInput = Parameters<typeof posthog.visualReviewRunsRecomputeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsRecomputeCreateOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsRecomputeCreate>>;

const result: VisualReviewRunsRecomputeCreateOutput = await posthog.visualReviewRunsRecomputeCreate();

// Result shape (from schema): { run: { approved_by?: { id: number; first_name: string; email: string } | null; search_match_type: "exact" | "similar" | null; id: string; repo_id: string; status: string; run_type: string; commit_sha: string; branch: ...
```

### `posthog.visualReviewRunsSnapshotHistoryList`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/runs/{id}/snapshot-history/`
- **What it does**: Recent change history for a snapshot identifier across runs.
- **OpenAPI operationId**: `visual_review_runs_snapshot_history_list`
- **Path params**: `id`
- **Query params**: `identifier`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ current_artifact?: { id: string; content_hash: string; width: number | null; height: number | null; download_url: string | null } | null; run_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsSnapshotHistoryListInput = Parameters<typeof posthog.visualReviewRunsSnapshotHistoryList> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsSnapshotHistoryListOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsSnapshotHistoryList>>;

const result: VisualReviewRunsSnapshotHistoryListOutput = await posthog.visualReviewRunsSnapshotHistoryList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ current_artifact?: { id: string; content_hash: string; width: number | null; height: number | null; download_url: string | null } | null; run_...
```

### `posthog.visualReviewRunsSnapshotsList`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/runs/{id}/snapshots/`
- **What it does**: Get a run's snapshots with diff results, excluding quarantined ones by default.
- **OpenAPI operationId**: `visual_review_runs_snapshots_list`
- **Path params**: `id`
- **Query params**: `include_quarantined`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ current_artifact?: { id: string; content_hash: string; width: number | null; height: number | null; download_url: string | null } | null; base...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsSnapshotsListInput = Parameters<typeof posthog.visualReviewRunsSnapshotsList> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsSnapshotsListOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsSnapshotsList>>;

const result: VisualReviewRunsSnapshotsListOutput = await posthog.visualReviewRunsSnapshotsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ current_artifact?: { id: string; content_hash: string; width: number | null; height: number | null; download_url: string | null } | null; base...
```

### `posthog.visualReviewRunsTolerateCreate`

- **HTTP**: `POST /api/projects/{project_id}/visual_review/runs/{id}/tolerate/`
- **What it does**: Mark a changed snapshot as a known tolerated alternate.
- **OpenAPI operationId**: `visual_review_runs_tolerate_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ current_artifact?: { id: string; content_hash: string; width: number | null; height: number | null; download_url: string | null } | null; baseline_artifact?: { id: string; content_hash: string; width: number | null; h...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsTolerateCreateInput = Parameters<typeof posthog.visualReviewRunsTolerateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsTolerateCreateOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsTolerateCreate>>;

const result: VisualReviewRunsTolerateCreateOutput = await posthog.visualReviewRunsTolerateCreate();

// Result shape (from schema): { current_artifact?: { id: string; content_hash: string; width: number | null; height: number | null; download_url: string | null } | null; baseline_artifact?: { id: string; content_hash: string; width: number | null; h...
```

### `posthog.visualReviewRunsToleratedHashesList`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/runs/{id}/tolerated-hashes/`
- **What it does**: List known tolerated hashes for a snapshot identifier.
- **OpenAPI operationId**: `visual_review_runs_tolerated_hashes_list`
- **Path params**: `id`
- **Query params**: `identifier`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; alternate_hash: string; baseline_hash: string; reason: string; diff_percentage: number | null; created_at: string; source_run_id: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsToleratedHashesListInput = Parameters<typeof posthog.visualReviewRunsToleratedHashesList> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsToleratedHashesListOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsToleratedHashesList>>;

const result: VisualReviewRunsToleratedHashesListOutput = await posthog.visualReviewRunsToleratedHashesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; alternate_hash: string; baseline_hash: string; reason: string; diff_percentage: number | null; created_at: string; source_run_id: ...
```

### `posthog.visualReviewRunsCountsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/visual_review/runs/counts/`
- **What it does**: Review state counts for the runs list.
- **OpenAPI operationId**: `visual_review_runs_counts_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ needs_review: number; clean: number; processing: number; stale: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type VisualReviewRunsCountsRetrieveInput = Parameters<typeof posthog.visualReviewRunsCountsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type VisualReviewRunsCountsRetrieveOutput = Awaited<ReturnType<typeof posthog.visualReviewRunsCountsRetrieve>>;

const result: VisualReviewRunsCountsRetrieveOutput = await posthog.visualReviewRunsCountsRetrieve();

// Result shape (from schema): { needs_review: number; clean: number; processing: number; stale: number }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

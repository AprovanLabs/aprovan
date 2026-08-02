# Task Runs

## Operations

### `posthog.tasksRunsList`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{task_id}/runs/`
- **What it does**: List task runs
- **OpenAPI operationId**: `tasks_runs_list`
- **Path params**: `task_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "code...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksRunsListInput = Parameters<typeof posthog.tasksRunsList> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsListOutput = Awaited<ReturnType<typeof posthog.tasksRunsList>>;

const result: TasksRunsListOutput = await posthog.tasksRunsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "code...
```

### `posthog.tasksRunsCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/`
- **What it does**: Create task run
- **OpenAPI operationId**: `tasks_runs_create`
- **Path params**: `task_id`
- **Query params**: None
- **Response codes**: `201`, `400`, `429`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...`
- OpenAPI response codes: `201`, `400`, `429`

```ts
import posthog from "@utdk/posthog";

type TasksRunsCreateInput = Parameters<typeof posthog.tasksRunsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsCreate>>;

const result: TasksRunsCreateOutput = await posthog.tasksRunsCreate();

// Result shape (from schema): { id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...
```

### `posthog.tasksRunsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{task_id}/runs/{id}/`
- **What it does**: Get task run
- **OpenAPI operationId**: `tasks_runs_retrieve`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsRetrieveInput = Parameters<typeof posthog.tasksRunsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsRetrieveOutput = Awaited<ReturnType<typeof posthog.tasksRunsRetrieve>>;

const result: TasksRunsRetrieveOutput = await posthog.tasksRunsRetrieve();

// Result shape (from schema): { id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...
```

### `posthog.tasksRunsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/tasks/{task_id}/runs/{id}/`
- **What it does**: Update task run
- **OpenAPI operationId**: `tasks_runs_partial_update`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsPartialUpdateInput = Parameters<typeof posthog.tasksRunsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.tasksRunsPartialUpdate>>;

const result: TasksRunsPartialUpdateOutput = await posthog.tasksRunsPartialUpdate();

// Result shape (from schema): { id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...
```

### `posthog.tasksRunsAppendLogCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{id}/append_log/`
- **What it does**: Append log entries
- **OpenAPI operationId**: `tasks_runs_append_log_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsAppendLogCreateInput = Parameters<typeof posthog.tasksRunsAppendLogCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsAppendLogCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsAppendLogCreate>>;

const result: TasksRunsAppendLogCreateOutput = await posthog.tasksRunsAppendLogCreate();

// Result shape (from schema): { id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...
```

### `posthog.tasksRunsArtifactsCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{id}/artifacts/`
- **What it does**: Upload artifacts for a task run
- **OpenAPI operationId**: `tasks_runs_artifacts_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ artifacts: ({ id?: string; name: string; type: string; source?: string; size?: number; content_type?: string; metadata?: { skill_name: string; skill_source: "user" | "repo" | "marketplace" | "codex"; content_sha256: s...`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsArtifactsCreateInput = Parameters<typeof posthog.tasksRunsArtifactsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsArtifactsCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsArtifactsCreate>>;

const result: TasksRunsArtifactsCreateOutput = await posthog.tasksRunsArtifactsCreate();

// Result shape (from schema): { artifacts: ({ id?: string; name: string; type: string; source?: string; size?: number; content_type?: string; metadata?: { skill_name: string; skill_source: "user" | "repo" | "marketplace" | "codex"; content_sha256: s...
```

### `posthog.tasksRunsArtifactsDownloadCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{id}/artifacts/download/`
- **What it does**: Download an artifact through the backend
- **OpenAPI operationId**: `tasks_runs_artifacts_download_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsArtifactsDownloadCreateInput = Parameters<typeof posthog.tasksRunsArtifactsDownloadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsArtifactsDownloadCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsArtifactsDownloadCreate>>;

const result: TasksRunsArtifactsDownloadCreateOutput = await posthog.tasksRunsArtifactsDownloadCreate();

// Result shape (from schema): unknown
```

### `posthog.tasksRunsArtifactsFinalizeUploadCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{id}/artifacts/finalize_upload/`
- **What it does**: Finalize direct uploads for task run artifacts
- **OpenAPI operationId**: `tasks_runs_artifacts_finalize_upload_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ artifacts: ({ id?: string; name: string; type: string; source?: string; size?: number; content_type?: string; metadata?: { skill_name: string; skill_source: "user" | "repo" | "marketplace" | "codex"; content_sha256: s...`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsArtifactsFinalizeUploadCreateInput = Parameters<typeof posthog.tasksRunsArtifactsFinalizeUploadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsArtifactsFinalizeUploadCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsArtifactsFinalizeUploadCreate>>;

const result: TasksRunsArtifactsFinalizeUploadCreateOutput = await posthog.tasksRunsArtifactsFinalizeUploadCreate();

// Result shape (from schema): { artifacts: ({ id?: string; name: string; type: string; source?: string; size?: number; content_type?: string; metadata?: { skill_name: string; skill_source: "user" | "repo" | "marketplace" | "codex"; content_sha256: s...
```

### `posthog.tasksRunsArtifactsPrepareUploadCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{id}/artifacts/prepare_upload/`
- **What it does**: Prepare direct uploads for task run artifacts
- **OpenAPI operationId**: `tasks_runs_artifacts_prepare_upload_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ artifacts: ({ id: string; name: string; type: string; source?: string; size: number; content_type?: string; metadata?: { skill_name: string; skill_source: "user" | "repo" | "marketplace" | "codex"; content_sha256: str...`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsArtifactsPrepareUploadCreateInput = Parameters<typeof posthog.tasksRunsArtifactsPrepareUploadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsArtifactsPrepareUploadCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsArtifactsPrepareUploadCreate>>;

const result: TasksRunsArtifactsPrepareUploadCreateOutput = await posthog.tasksRunsArtifactsPrepareUploadCreate();

// Result shape (from schema): { artifacts: ({ id: string; name: string; type: string; source?: string; size: number; content_type?: string; metadata?: { skill_name: string; skill_source: "user" | "repo" | "marketplace" | "codex"; content_sha256: str...
```

### `posthog.tasksRunsArtifactsPresignCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{id}/artifacts/presign/`
- **What it does**: Generate presigned URL for an artifact
- **OpenAPI operationId**: `tasks_runs_artifacts_presign_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ url: string; expires_in: number }`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsArtifactsPresignCreateInput = Parameters<typeof posthog.tasksRunsArtifactsPresignCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsArtifactsPresignCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsArtifactsPresignCreate>>;

const result: TasksRunsArtifactsPresignCreateOutput = await posthog.tasksRunsArtifactsPresignCreate();

// Result shape (from schema): { url: string; expires_in: number }
```

### `posthog.tasksRunsCommandCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{id}/command/`
- **What it does**: Send command to task run
- **OpenAPI operationId**: `tasks_runs_command_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`, `502`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ jsonrpc: string; id?: unknown; result?: { [key: string]: unknown }; error?: { [key: string]: unknown } }`
- OpenAPI response codes: `200`, `400`, `404`, `502`

```ts
import posthog from "@utdk/posthog";

type TasksRunsCommandCreateInput = Parameters<typeof posthog.tasksRunsCommandCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsCommandCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsCommandCreate>>;

const result: TasksRunsCommandCreateOutput = await posthog.tasksRunsCommandCreate();

// Result shape (from schema): { jsonrpc: string; id?: unknown; result?: { [key: string]: unknown }; error?: { [key: string]: unknown } }
```

### `posthog.tasksRunsConnectionTokenRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{task_id}/runs/{id}/connection_token/`
- **What it does**: Get sandbox connection token
- **OpenAPI operationId**: `tasks_runs_connection_token_retrieve`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ token: string }`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsConnectionTokenRetrieveInput = Parameters<typeof posthog.tasksRunsConnectionTokenRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsConnectionTokenRetrieveOutput = Awaited<ReturnType<typeof posthog.tasksRunsConnectionTokenRetrieve>>;

const result: TasksRunsConnectionTokenRetrieveOutput = await posthog.tasksRunsConnectionTokenRetrieve();

// Result shape (from schema): { token: string }
```

### `posthog.tasksRunsLogsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{task_id}/runs/{id}/logs/`
- **What it does**: Get task run logs
- **OpenAPI operationId**: `tasks_runs_logs_retrieve`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsLogsRetrieveInput = Parameters<typeof posthog.tasksRunsLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.tasksRunsLogsRetrieve>>;

const result: TasksRunsLogsRetrieveOutput = await posthog.tasksRunsLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.tasksRunsRelayMessageCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{id}/relay_message/`
- **What it does**: Relay run message to Slack
- **OpenAPI operationId**: `tasks_runs_relay_message_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status: string; relay_id?: string }`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsRelayMessageCreateInput = Parameters<typeof posthog.tasksRunsRelayMessageCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsRelayMessageCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsRelayMessageCreate>>;

const result: TasksRunsRelayMessageCreateOutput = await posthog.tasksRunsRelayMessageCreate();

// Result shape (from schema): { status: string; relay_id?: string }
```

### `posthog.tasksRunsResumeInCloudCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{id}/resume_in_cloud/`
- **What it does**: Resume task run in cloud
- **OpenAPI operationId**: `tasks_runs_resume_in_cloud_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `429`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...`
- OpenAPI response codes: `200`, `400`, `429`

```ts
import posthog from "@utdk/posthog";

type TasksRunsResumeInCloudCreateInput = Parameters<typeof posthog.tasksRunsResumeInCloudCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsResumeInCloudCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsResumeInCloudCreate>>;

const result: TasksRunsResumeInCloudCreateOutput = await posthog.tasksRunsResumeInCloudCreate();

// Result shape (from schema): { id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...
```

### `posthog.tasksRunsSessionLogsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{task_id}/runs/{id}/session_logs/`
- **What it does**: Get filtered task run session logs
- **OpenAPI operationId**: `tasks_runs_session_logs_retrieve`
- **Path params**: `id`, `task_id`
- **Query params**: `after`, `event_types`, `exclude_types`, `limit`, `offset`
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsSessionLogsRetrieveInput = Parameters<typeof posthog.tasksRunsSessionLogsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsSessionLogsRetrieveOutput = Awaited<ReturnType<typeof posthog.tasksRunsSessionLogsRetrieve>>;

const result: TasksRunsSessionLogsRetrieveOutput = await posthog.tasksRunsSessionLogsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.tasksRunsSetOutputPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/tasks/{task_id}/runs/{id}/set_output/`
- **What it does**: Set run output
- **OpenAPI operationId**: `tasks_runs_set_output_partial_update`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsSetOutputPartialUpdateInput = Parameters<typeof posthog.tasksRunsSetOutputPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsSetOutputPartialUpdateOutput = Awaited<ReturnType<typeof posthog.tasksRunsSetOutputPartialUpdate>>;

const result: TasksRunsSetOutputPartialUpdateOutput = await posthog.tasksRunsSetOutputPartialUpdate();

// Result shape (from schema): { id: string; task: string; stage: string | null; branch: string | null; status: string; environment: string; runtime_adapter?: "claude" | "codex" | null; provider?: "anthropic" | "openai" | null; model?: string | null;...
```

### `posthog.tasksRunsStartCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{id}/start/`
- **What it does**: Start task run
- **OpenAPI operationId**: `tasks_runs_start_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`, `429`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...`
- OpenAPI response codes: `200`, `400`, `404`, `429`

```ts
import posthog from "@utdk/posthog";

type TasksRunsStartCreateInput = Parameters<typeof posthog.tasksRunsStartCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsStartCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsStartCreate>>;

const result: TasksRunsStartCreateOutput = await posthog.tasksRunsStartCreate();

// Result shape (from schema): { id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...
```

### `posthog.tasksRunsStreamTokenRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{task_id}/runs/{id}/stream_token/`
- **What it does**: Get task run stream read token
- **OpenAPI operationId**: `tasks_runs_stream_token_retrieve`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ token: string; stream_base_url: string | null }`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsStreamTokenRetrieveInput = Parameters<typeof posthog.tasksRunsStreamTokenRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsStreamTokenRetrieveOutput = Awaited<ReturnType<typeof posthog.tasksRunsStreamTokenRetrieve>>;

const result: TasksRunsStreamTokenRetrieveOutput = await posthog.tasksRunsStreamTokenRetrieve();

// Result shape (from schema): { token: string; stream_base_url: string | null }
```

### `posthog.tasksRunsStreamRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{task_id}/runs/{id}/stream/`
- **What it does**: Server-Sent Events stream of task run events. Events carry an `id:` line (a Redis stream id) usable as a resume cursor.

The server caps each connection at 900 seconds: it emits `event: end` with `data: {"type": "rotated"}` and closes. This does NOT mean the run finished — reconnect with the `Last-Event-ID` header set to the last received event id to resume without gaps or duplicates. Only treat the stream as complete when the run itself reaches a terminal status.

`?start=latest` consumers must also carry `Last-Event-ID` across reconnects: reconnecting without it re-resolves to the then-current latest event, silently skipping anything published while disconnected.

**SDK consumers**: do not call the generated fetch wrapper for this path — it will buffer the entire stream. Use the URL builder (`getTasksRunsStreamRetrieveUrl`) with a streaming `fetch`/`EventSource`-style consumer and the `Last-Event-ID` header instead.
- **OpenAPI operationId**: `tasks_runs_stream_retrieve`
- **Path params**: `id`, `task_id`
- **Query params**: `start`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `string`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksRunsStreamRetrieveInput = Parameters<typeof posthog.tasksRunsStreamRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsStreamRetrieveOutput = Awaited<ReturnType<typeof posthog.tasksRunsStreamRetrieve>>;

const result: TasksRunsStreamRetrieveOutput = await posthog.tasksRunsStreamRetrieve();

// Result shape (from schema): string
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

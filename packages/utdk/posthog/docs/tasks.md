# Tasks

## Operations

### `posthog.tasksList`

- **HTTP**: `GET /api/projects/{project_id}/tasks/`
- **What it does**: List tasks
- **OpenAPI operationId**: `tasks_list`
- **Path params**: None
- **Query params**: `archived`, `channel`, `created_by`, `internal`, `limit`, `offset`, `organization`, `origin_product`, `repository`, `search`, `stage`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksListInput = Parameters<typeof posthog.tasksList> extends [infer T, ...unknown[]] ? T : undefined;
type TasksListOutput = Awaited<ReturnType<typeof posthog.tasksList>>;

const result: TasksListOutput = await posthog.tasksList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string;...
```

### `posthog.tasksCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/`
- **What it does**: API for managing tasks within a project. Tasks represent units of work to be performed by an agent.
- **OpenAPI operationId**: `tasks_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type TasksCreateInput = Parameters<typeof posthog.tasksCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksCreateOutput = Awaited<ReturnType<typeof posthog.tasksCreate>>;

const result: TasksCreateOutput = await posthog.tasksCreate();

// Result shape (from schema): { id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...
```

### `posthog.tasksDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/tasks/{id}/`
- **What it does**: API for managing tasks within a project. Tasks represent units of work to be performed by an agent.
- **OpenAPI operationId**: `tasks_destroy`
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

type TasksDestroyInput = Parameters<typeof posthog.tasksDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type TasksDestroyOutput = Awaited<ReturnType<typeof posthog.tasksDestroy>>;

const result: TasksDestroyOutput = await posthog.tasksDestroy();

// Result shape (from schema): unknown
```

### `posthog.tasksRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{id}/`
- **What it does**: Get task
- **OpenAPI operationId**: `tasks_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksRetrieveInput = Parameters<typeof posthog.tasksRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRetrieveOutput = Awaited<ReturnType<typeof posthog.tasksRetrieve>>;

const result: TasksRetrieveOutput = await posthog.tasksRetrieve();

// Result shape (from schema): { id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...
```

### `posthog.tasksPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/tasks/{id}/`
- **What it does**: API for managing tasks within a project. Tasks represent units of work to be performed by an agent.
- **OpenAPI operationId**: `tasks_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksPartialUpdateInput = Parameters<typeof posthog.tasksPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksPartialUpdateOutput = Awaited<ReturnType<typeof posthog.tasksPartialUpdate>>;

const result: TasksPartialUpdateOutput = await posthog.tasksPartialUpdate();

// Result shape (from schema): { id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...
```

### `posthog.tasksUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/tasks/{id}/`
- **What it does**: API for managing tasks within a project. Tasks represent units of work to be performed by an agent.
- **OpenAPI operationId**: `tasks_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksUpdateInput = Parameters<typeof posthog.tasksUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksUpdateOutput = Awaited<ReturnType<typeof posthog.tasksUpdate>>;

const result: TasksUpdateOutput = await posthog.tasksUpdate();

// Result shape (from schema): { id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...
```

### `posthog.tasksPresenceDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/tasks/{id}/presence/`
- **What it does**: Beacon presence for a device watching this task
- **OpenAPI operationId**: `tasks_presence_destroy`
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

type TasksPresenceDestroyInput = Parameters<typeof posthog.tasksPresenceDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type TasksPresenceDestroyOutput = Awaited<ReturnType<typeof posthog.tasksPresenceDestroy>>;

const result: TasksPresenceDestroyOutput = await posthog.tasksPresenceDestroy();

// Result shape (from schema): unknown
```

### `posthog.tasksPresenceCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{id}/presence/`
- **What it does**: Beacon presence for a device watching this task
- **OpenAPI operationId**: `tasks_presence_create`
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

type TasksPresenceCreateInput = Parameters<typeof posthog.tasksPresenceCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksPresenceCreateOutput = Awaited<ReturnType<typeof posthog.tasksPresenceCreate>>;

const result: TasksPresenceCreateOutput = await posthog.tasksPresenceCreate();

// Result shape (from schema): unknown
```

### `posthog.tasksRunCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{id}/run/`
- **What it does**: Run task
- **OpenAPI operationId**: `tasks_run_create`
- **Path params**: `id`
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

type TasksRunCreateInput = Parameters<typeof posthog.tasksRunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunCreate>>;

const result: TasksRunCreateOutput = await posthog.tasksRunCreate();

// Result shape (from schema): { id: string; task_number: number | null; slug: string; title: string; title_manually_set: boolean; description: string; origin_product: string; repository: string | null; github_integration: number | null; github_user_...
```

### `posthog.tasksStagedArtifactsFinalizeUploadCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{id}/staged_artifacts/finalize_upload/`
- **What it does**: Finalize staged direct uploads for task attachments
- **OpenAPI operationId**: `tasks_staged_artifacts_finalize_upload_create`
- **Path params**: `id`
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

type TasksStagedArtifactsFinalizeUploadCreateInput = Parameters<typeof posthog.tasksStagedArtifactsFinalizeUploadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksStagedArtifactsFinalizeUploadCreateOutput = Awaited<ReturnType<typeof posthog.tasksStagedArtifactsFinalizeUploadCreate>>;

const result: TasksStagedArtifactsFinalizeUploadCreateOutput = await posthog.tasksStagedArtifactsFinalizeUploadCreate();

// Result shape (from schema): { artifacts: ({ id?: string; name: string; type: string; source?: string; size?: number; content_type?: string; metadata?: { skill_name: string; skill_source: "user" | "repo" | "marketplace" | "codex"; content_sha256: s...
```

### `posthog.tasksStagedArtifactsPrepareUploadCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{id}/staged_artifacts/prepare_upload/`
- **What it does**: Prepare staged direct uploads for task attachments
- **OpenAPI operationId**: `tasks_staged_artifacts_prepare_upload_create`
- **Path params**: `id`
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

type TasksStagedArtifactsPrepareUploadCreateInput = Parameters<typeof posthog.tasksStagedArtifactsPrepareUploadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksStagedArtifactsPrepareUploadCreateOutput = Awaited<ReturnType<typeof posthog.tasksStagedArtifactsPrepareUploadCreate>>;

const result: TasksStagedArtifactsPrepareUploadCreateOutput = await posthog.tasksStagedArtifactsPrepareUploadCreate();

// Result shape (from schema): { artifacts: ({ id: string; name: string; type: string; source?: string; size: number; content_type?: string; metadata?: { skill_name: string; skill_source: "user" | "repo" | "marketplace" | "codex"; content_sha256: str...
```

### `posthog.tasksRunsLivingArtifactsList`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{task_id}/runs/{run_id}/living_artifacts/`
- **What it does**: List living artifacts for a task run
- **OpenAPI operationId**: `tasks_runs_living_artifacts_list`
- **Path params**: `run_id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ artifacts: ({ id: string; task_id: string; run_id: string; team_id: number; name: string; artifact_type: "slack_message" | "slack_canvas" | "document" | "spreadsheet" | "dashboard" | "file" | "github_pr"; adapter: "s...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsLivingArtifactsListInput = Parameters<typeof posthog.tasksRunsLivingArtifactsList> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsLivingArtifactsListOutput = Awaited<ReturnType<typeof posthog.tasksRunsLivingArtifactsList>>;

const result: TasksRunsLivingArtifactsListOutput = await posthog.tasksRunsLivingArtifactsList();

// Result shape (from schema): ({ artifacts: ({ id: string; task_id: string; run_id: string; team_id: number; name: string; artifact_type: "slack_message" | "slack_canvas" | "document" | "spreadsheet" | "dashboard" | "file" | "github_pr"; adapter: "s...
```

### `posthog.tasksRunsLivingArtifactsCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{run_id}/living_artifacts/`
- **What it does**: Create a living artifact for a task run
- **OpenAPI operationId**: `tasks_runs_living_artifacts_create`
- **Path params**: `run_id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task_id: string; run_id: string; team_id: number; name: string; artifact_type: "slack_message" | "slack_canvas" | "document" | "spreadsheet" | "dashboard" | "file" | "github_pr"; adapter: "slack_message" |...`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsLivingArtifactsCreateInput = Parameters<typeof posthog.tasksRunsLivingArtifactsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsLivingArtifactsCreateOutput = Awaited<ReturnType<typeof posthog.tasksRunsLivingArtifactsCreate>>;

const result: TasksRunsLivingArtifactsCreateOutput = await posthog.tasksRunsLivingArtifactsCreate();

// Result shape (from schema): { id: string; task_id: string; run_id: string; team_id: number; name: string; artifact_type: "slack_message" | "slack_canvas" | "document" | "spreadsheet" | "dashboard" | "file" | "github_pr"; adapter: "slack_message" |...
```

### `posthog.tasksRunsLivingArtifactsOpen`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{task_id}/runs/{run_id}/living_artifacts/{id}/`
- **What it does**: Open a living artifact for a task run
- **OpenAPI operationId**: `tasks_runs_living_artifacts_open`
- **Path params**: `id`, `run_id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task_id: string; run_id: string; team_id: number; name: string; artifact_type: "slack_message" | "slack_canvas" | "document" | "spreadsheet" | "dashboard" | "file" | "github_pr"; adapter: "slack_message" |...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsLivingArtifactsOpenInput = Parameters<typeof posthog.tasksRunsLivingArtifactsOpen> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsLivingArtifactsOpenOutput = Awaited<ReturnType<typeof posthog.tasksRunsLivingArtifactsOpen>>;

const result: TasksRunsLivingArtifactsOpenOutput = await posthog.tasksRunsLivingArtifactsOpen();

// Result shape (from schema): { id: string; task_id: string; run_id: string; team_id: number; name: string; artifact_type: "slack_message" | "slack_canvas" | "document" | "spreadsheet" | "dashboard" | "file" | "github_pr"; adapter: "slack_message" |...
```

### `posthog.tasksRunsLivingArtifactsEdit`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/runs/{run_id}/living_artifacts/{id}/edit/`
- **What it does**: Edit a living artifact for a task run
- **OpenAPI operationId**: `tasks_runs_living_artifacts_edit`
- **Path params**: `id`, `run_id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task_id: string; run_id: string; team_id: number; name: string; artifact_type: "slack_message" | "slack_canvas" | "document" | "spreadsheet" | "dashboard" | "file" | "github_pr"; adapter: "slack_message" |...`
- OpenAPI response codes: `200`, `400`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksRunsLivingArtifactsEditInput = Parameters<typeof posthog.tasksRunsLivingArtifactsEdit> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRunsLivingArtifactsEditOutput = Awaited<ReturnType<typeof posthog.tasksRunsLivingArtifactsEdit>>;

const result: TasksRunsLivingArtifactsEditOutput = await posthog.tasksRunsLivingArtifactsEdit();

// Result shape (from schema): { id: string; task_id: string; run_id: string; team_id: number; name: string; artifact_type: "slack_message" | "slack_canvas" | "document" | "spreadsheet" | "dashboard" | "file" | "github_pr"; adapter: "slack_message" |...
```

### `posthog.tasksThreadMessagesList`

- **HTTP**: `GET /api/projects/{project_id}/tasks/{task_id}/thread_messages/`
- **What it does**: List thread messages
- **OpenAPI operationId**: `tasks_thread_messages_list`
- **Path params**: `task_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; task: string; content: string; created_at: string; author?: { id: number; uuid: string; distinct_id: string; first_name: string; l...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksThreadMessagesListInput = Parameters<typeof posthog.tasksThreadMessagesList> extends [infer T, ...unknown[]] ? T : undefined;
type TasksThreadMessagesListOutput = Awaited<ReturnType<typeof posthog.tasksThreadMessagesList>>;

const result: TasksThreadMessagesListOutput = await posthog.tasksThreadMessagesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; task: string; content: string; created_at: string; author?: { id: number; uuid: string; distinct_id: string; first_name: string; l...
```

### `posthog.tasksThreadMessagesCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/thread_messages/`
- **What it does**: Post a thread message
- **OpenAPI operationId**: `tasks_thread_messages_create`
- **Path params**: `task_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task: string; content: string; created_at: string; author?: { id: number; uuid: string; distinct_id: string; first_name: string; last_name: string; email: string; is_email_verified?: boolean | null; hedgeh...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type TasksThreadMessagesCreateInput = Parameters<typeof posthog.tasksThreadMessagesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksThreadMessagesCreateOutput = Awaited<ReturnType<typeof posthog.tasksThreadMessagesCreate>>;

const result: TasksThreadMessagesCreateOutput = await posthog.tasksThreadMessagesCreate();

// Result shape (from schema): { id: string; task: string; content: string; created_at: string; author?: { id: number; uuid: string; distinct_id: string; first_name: string; last_name: string; email: string; is_email_verified?: boolean | null; hedgeh...
```

### `posthog.tasksThreadMessagesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/tasks/{task_id}/thread_messages/{id}/`
- **What it does**: Delete own thread message
- **OpenAPI operationId**: `tasks_thread_messages_destroy`
- **Path params**: `id`, `task_id`
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

type TasksThreadMessagesDestroyInput = Parameters<typeof posthog.tasksThreadMessagesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type TasksThreadMessagesDestroyOutput = Awaited<ReturnType<typeof posthog.tasksThreadMessagesDestroy>>;

const result: TasksThreadMessagesDestroyOutput = await posthog.tasksThreadMessagesDestroy();

// Result shape (from schema): unknown
```

### `posthog.tasksThreadMessagesSendToAgentCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/{task_id}/thread_messages/{id}/send_to_agent/`
- **What it does**: Send a thread message to the agent
- **OpenAPI operationId**: `tasks_thread_messages_send_to_agent_create`
- **Path params**: `id`, `task_id`
- **Query params**: None
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; task: string; content: string; created_at: string; author?: { id: number; uuid: string; distinct_id: string; first_name: string; last_name: string; email: string; is_email_verified?: boolean | null; hedgeh...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type TasksThreadMessagesSendToAgentCreateInput = Parameters<typeof posthog.tasksThreadMessagesSendToAgentCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksThreadMessagesSendToAgentCreateOutput = Awaited<ReturnType<typeof posthog.tasksThreadMessagesSendToAgentCreate>>;

const result: TasksThreadMessagesSendToAgentCreateOutput = await posthog.tasksThreadMessagesSendToAgentCreate();

// Result shape (from schema): { id: string; task: string; content: string; created_at: string; author?: { id: number; uuid: string; distinct_id: string; first_name: string; last_name: string; email: string; is_email_verified?: boolean | null; hedgeh...
```

### `posthog.tasksRepositoriesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tasks/repositories/`
- **What it does**: List distinct task repositories
- **OpenAPI operationId**: `tasks_repositories_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ repositories: (string)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksRepositoriesRetrieveInput = Parameters<typeof posthog.tasksRepositoriesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRepositoriesRetrieveOutput = Awaited<ReturnType<typeof posthog.tasksRepositoriesRetrieve>>;

const result: TasksRepositoriesRetrieveOutput = await posthog.tasksRepositoriesRetrieve();

// Result shape (from schema): { repositories: (string)[] }
```

### `posthog.tasksRepositoryReadinessRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tasks/repository_readiness/`
- **What it does**: Get repository readiness
- **OpenAPI operationId**: `tasks_repository_readiness_retrieve`
- **Path params**: None
- **Query params**: `refresh`, `repository`, `window_days`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ repository: string; classification: string; excluded: boolean; coreSuggestions: { state: "needs_setup" | "detected" | "waiting_for_data" | "ready" | "not_applicable" | "unknown"; estimated: boolean; reason: string; ev...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksRepositoryReadinessRetrieveInput = Parameters<typeof posthog.tasksRepositoryReadinessRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TasksRepositoryReadinessRetrieveOutput = Awaited<ReturnType<typeof posthog.tasksRepositoryReadinessRetrieve>>;

const result: TasksRepositoryReadinessRetrieveOutput = await posthog.tasksRepositoryReadinessRetrieve();

// Result shape (from schema): { repository: string; classification: string; excluded: boolean; coreSuggestions: { state: "needs_setup" | "detected" | "waiting_for_data" | "ready" | "not_applicable" | "unknown"; estimated: boolean; reason: string; ev...
```

### `posthog.tasksSlackThreadContextRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/tasks/slack_thread_context/`
- **What it does**: Resolve a Slack thread to its task, runs, and Temporal workflows
- **OpenAPI operationId**: `tasks_slack_thread_context_retrieve`
- **Path params**: None
- **Query params**: `url`
- **Response codes**: `200`, `400`, `403`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ thread: { url: string; channel: string; thread_ts: string; slack_workspace_id: string | null; mentioning_slack_user_id: string | null }; task: { id: string; team_id: number; title: string; repository: string | null; o...`
- OpenAPI response codes: `200`, `400`, `403`, `404`

```ts
import posthog from "@utdk/posthog";

type TasksSlackThreadContextRetrieveInput = Parameters<typeof posthog.tasksSlackThreadContextRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TasksSlackThreadContextRetrieveOutput = Awaited<ReturnType<typeof posthog.tasksSlackThreadContextRetrieve>>;

const result: TasksSlackThreadContextRetrieveOutput = await posthog.tasksSlackThreadContextRetrieve();

// Result shape (from schema): { thread: { url: string; channel: string; thread_ts: string; slack_workspace_id: string | null; mentioning_slack_user_id: string | null }; task: { id: string; team_id: number; title: string; repository: string | null; o...
```

### `posthog.tasksSummariesCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/summaries/`
- **What it does**: Fetch task summaries by ID
- **OpenAPI operationId**: `tasks_summaries_create`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; title: string; repository: string | null; created_at: string; updated_at: string; origin_product?: string; latest_run?: { status: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksSummariesCreateInput = Parameters<typeof posthog.tasksSummariesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksSummariesCreateOutput = Awaited<ReturnType<typeof posthog.tasksSummariesCreate>>;

const result: TasksSummariesCreateOutput = await posthog.tasksSummariesCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; title: string; repository: string | null; created_at: string; updated_at: string; origin_product?: string; latest_run?: { status: ...
```

### `posthog.tasksWarmCreate`

- **HTTP**: `POST /api/projects/{project_id}/tasks/warm/`
- **What it does**: Warm a task sandbox
- **OpenAPI operationId**: `tasks_warm_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ task_id: string; run_id: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TasksWarmCreateInput = Parameters<typeof posthog.tasksWarmCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TasksWarmCreateOutput = Awaited<ReturnType<typeof posthog.tasksWarmCreate>>;

const result: TasksWarmCreateOutput = await posthog.tasksWarmCreate();

// Result shape (from schema): { task_id: string; run_id: string }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# Task Automations

## Operations

### `posthog.taskAutomationsList`

- **HTTP**: `GET /api/projects/{project_id}/task_automations/`
- **What it does**: API for managing scheduled task automations.
- **OpenAPI operationId**: `task_automations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; prompt: string; repository: string | null; github_integration: number | null; cron_expression: string; timezone: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaskAutomationsListInput = Parameters<typeof posthog.taskAutomationsList> extends [infer T, ...unknown[]] ? T : undefined;
type TaskAutomationsListOutput = Awaited<ReturnType<typeof posthog.taskAutomationsList>>;

const result: TaskAutomationsListOutput = await posthog.taskAutomationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; prompt: string; repository: string | null; github_integration: number | null; cron_expression: string; timezone: str...
```

### `posthog.taskAutomationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/task_automations/`
- **What it does**: API for managing scheduled task automations.
- **OpenAPI operationId**: `task_automations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: string; repository: string | null; github_integration: number | null; cron_expression: string; timezone: string; template_id: string | null; enabled: boolean; last_run_at: string | nu...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type TaskAutomationsCreateInput = Parameters<typeof posthog.taskAutomationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TaskAutomationsCreateOutput = Awaited<ReturnType<typeof posthog.taskAutomationsCreate>>;

const result: TaskAutomationsCreateOutput = await posthog.taskAutomationsCreate();

// Result shape (from schema): { id: string; name: string; prompt: string; repository: string | null; github_integration: number | null; cron_expression: string; timezone: string; template_id: string | null; enabled: boolean; last_run_at: string | nu...
```

### `posthog.taskAutomationsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/task_automations/{id}/`
- **What it does**: API for managing scheduled task automations.
- **OpenAPI operationId**: `task_automations_destroy`
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

type TaskAutomationsDestroyInput = Parameters<typeof posthog.taskAutomationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type TaskAutomationsDestroyOutput = Awaited<ReturnType<typeof posthog.taskAutomationsDestroy>>;

const result: TaskAutomationsDestroyOutput = await posthog.taskAutomationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.taskAutomationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/task_automations/{id}/`
- **What it does**: API for managing scheduled task automations.
- **OpenAPI operationId**: `task_automations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: string; repository: string | null; github_integration: number | null; cron_expression: string; timezone: string; template_id: string | null; enabled: boolean; last_run_at: string | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaskAutomationsRetrieveInput = Parameters<typeof posthog.taskAutomationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type TaskAutomationsRetrieveOutput = Awaited<ReturnType<typeof posthog.taskAutomationsRetrieve>>;

const result: TaskAutomationsRetrieveOutput = await posthog.taskAutomationsRetrieve();

// Result shape (from schema): { id: string; name: string; prompt: string; repository: string | null; github_integration: number | null; cron_expression: string; timezone: string; template_id: string | null; enabled: boolean; last_run_at: string | nu...
```

### `posthog.taskAutomationsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/task_automations/{id}/`
- **What it does**: API for managing scheduled task automations.
- **OpenAPI operationId**: `task_automations_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: string; repository: string | null; github_integration: number | null; cron_expression: string; timezone: string; template_id: string | null; enabled: boolean; last_run_at: string | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaskAutomationsPartialUpdateInput = Parameters<typeof posthog.taskAutomationsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type TaskAutomationsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.taskAutomationsPartialUpdate>>;

const result: TaskAutomationsPartialUpdateOutput = await posthog.taskAutomationsPartialUpdate();

// Result shape (from schema): { id: string; name: string; prompt: string; repository: string | null; github_integration: number | null; cron_expression: string; timezone: string; template_id: string | null; enabled: boolean; last_run_at: string | nu...
```

### `posthog.taskAutomationsRunCreate`

- **HTTP**: `POST /api/projects/{project_id}/task_automations/{id}/run/`
- **What it does**: API for managing scheduled task automations.
- **OpenAPI operationId**: `task_automations_run_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; prompt: string; repository: string | null; github_integration: number | null; cron_expression: string; timezone: string; template_id: string | null; enabled: boolean; last_run_at: string | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type TaskAutomationsRunCreateInput = Parameters<typeof posthog.taskAutomationsRunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type TaskAutomationsRunCreateOutput = Awaited<ReturnType<typeof posthog.taskAutomationsRunCreate>>;

const result: TaskAutomationsRunCreateOutput = await posthog.taskAutomationsRunCreate();

// Result shape (from schema): { id: string; name: string; prompt: string; repository: string | null; github_integration: number | null; cron_expression: string; timezone: string; template_id: string | null; enabled: boolean; last_run_at: string | nu...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

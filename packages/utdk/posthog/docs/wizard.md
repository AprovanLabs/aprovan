# Wizard

## Operations

### `posthog.wizardSessionsList`

- **HTTP**: `GET /api/projects/{project_id}/wizard/sessions/`
- **What it does**: List wizard sessions for the project, ordered by started_at desc. This should only be called by the PostHog Wizard. Optional filters: ?workflow_id=<id> and ?skill_id=<id>.
- **OpenAPI operationId**: `wizard_sessions_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `skill_id`, `workflow_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ session_id: string; team_id: number; workflow_id: string; skill_id: string; started_at: string; run_phase: "idle" | "running" | "completed" | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WizardSessionsListInput = Parameters<typeof posthog.wizardSessionsList> extends [infer T, ...unknown[]] ? T : undefined;
type WizardSessionsListOutput = Awaited<ReturnType<typeof posthog.wizardSessionsList>>;

const result: WizardSessionsListOutput = await posthog.wizardSessionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ session_id: string; team_id: number; workflow_id: string; skill_id: string; started_at: string; run_phase: "idle" | "running" | "completed" | ...
```

### `posthog.wizardSessionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/wizard/sessions/`
- **What it does**: Upsert a wizard session. The `session_id` key is the idempotency anchor — reposting the same `session_id` replaces the existing row. Returns 201 on create, 200 on update.
- **OpenAPI operationId**: `wizard_sessions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ session_id: string; team_id: number; workflow_id: string; skill_id: string; started_at: string; run_phase: "idle" | "running" | "completed" | "error"; tasks: ({ id: string; title: string; status: "pending" | "in_progr...`
- OpenAPI response codes: `200`, `201`

```ts
import posthog from "@utdk/posthog";

type WizardSessionsCreateInput = Parameters<typeof posthog.wizardSessionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type WizardSessionsCreateOutput = Awaited<ReturnType<typeof posthog.wizardSessionsCreate>>;

const result: WizardSessionsCreateOutput = await posthog.wizardSessionsCreate();

// Result shape (from schema): { session_id: string; team_id: number; workflow_id: string; skill_id: string; started_at: string; run_phase: "idle" | "running" | "completed" | "error"; tasks: ({ id: string; title: string; status: "pending" | "in_progr...
```

### `posthog.wizardSessionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/wizard/sessions/{session_id}/`
- **What it does**: Retrieve a single wizard session by its session_id.
- **OpenAPI operationId**: `wizard_sessions_retrieve`
- **Path params**: `session_id`
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ session_id: string; team_id: number; workflow_id: string; skill_id: string; started_at: string; run_phase: "idle" | "running" | "completed" | "error"; tasks: ({ id: string; title: string; status: "pending" | "in_progr...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type WizardSessionsRetrieveInput = Parameters<typeof posthog.wizardSessionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WizardSessionsRetrieveOutput = Awaited<ReturnType<typeof posthog.wizardSessionsRetrieve>>;

const result: WizardSessionsRetrieveOutput = await posthog.wizardSessionsRetrieve();

// Result shape (from schema): { session_id: string; team_id: number; workflow_id: string; skill_id: string; started_at: string; run_phase: "idle" | "running" | "completed" | "error"; tasks: ({ id: string; title: string; status: "pending" | "in_progr...
```

### `posthog.wizardSessionsLatestRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/wizard/sessions/latest/`
- **What it does**: Return the single most-recent wizard session for a workflow (and optional skill), or 204 if none exists. Unlike `list`, this is a point lookup the app shell uses to decide whether to open the live SSE stream — it never returns a collection, and 'no run' is a 204 rather than a 404 so clients don't conflate it with a missing endpoint.
- **OpenAPI operationId**: `wizard_sessions_latest_retrieve`
- **Path params**: None
- **Query params**: `skill_id`, `workflow_id`
- **Response codes**: `200`, `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ session_id: string; team_id: number; workflow_id: string; skill_id: string; started_at: string; run_phase: "idle" | "running" | "completed" | "error"; tasks: ({ id: string; title: string; status: "pending" | "in_progr...`
- OpenAPI response codes: `200`, `204`

```ts
import posthog from "@utdk/posthog";

type WizardSessionsLatestRetrieveInput = Parameters<typeof posthog.wizardSessionsLatestRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WizardSessionsLatestRetrieveOutput = Awaited<ReturnType<typeof posthog.wizardSessionsLatestRetrieve>>;

const result: WizardSessionsLatestRetrieveOutput = await posthog.wizardSessionsLatestRetrieve();

// Result shape (from schema): { session_id: string; team_id: number; workflow_id: string; skill_id: string; started_at: string; run_phase: "idle" | "running" | "completed" | "error"; tasks: ({ id: string; title: string; status: "pending" | "in_progr...
```

### `posthog.wizardSessionsStreamRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/wizard/sessions/stream/`
- **What it does**: Server-Sent Events stream of wizard session updates for a (workflow_id, skill_id) pair. On connect, the current latest session (if any) is emitted as the first event; subsequent upserts are streamed in real time. The server closes the connection after 900 seconds with an `event: end` line so the client (EventSource) can reconnect.

**SDK consumers**: do not call the generated fetch wrapper for this path — it will buffer the entire infinite stream. Use the URL builder (`getWizardSessionsStreamRetrieveUrl`) with the browser's `EventSource` API instead.
- **OpenAPI operationId**: `wizard_sessions_stream_retrieve`
- **Path params**: None
- **Query params**: `skill_id`, `workflow_id`
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

type WizardSessionsStreamRetrieveInput = Parameters<typeof posthog.wizardSessionsStreamRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WizardSessionsStreamRetrieveOutput = Awaited<ReturnType<typeof posthog.wizardSessionsStreamRetrieve>>;

const result: WizardSessionsStreamRetrieveOutput = await posthog.wizardSessionsStreamRetrieve();

// Result shape (from schema): string
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

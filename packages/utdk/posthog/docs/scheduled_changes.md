# Scheduled Changes

## Operations

### `posthog.scheduledChangesList`

- **HTTP**: `GET /api/projects/{project_id}/scheduled_changes/`
- **What it does**: Create, read, update and delete scheduled changes.
- **OpenAPI operationId**: `scheduled_changes_list`
- **Path params**: None
- **Query params**: `limit`, `model_name`, `offset`, `record_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; team_id: number; record_id: string; model_name: "FeatureFlag"; payload: unknown; scheduled_at: string; executed_at: string | null;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ScheduledChangesListInput = Parameters<typeof posthog.scheduledChangesList> extends [infer T, ...unknown[]] ? T : undefined;
type ScheduledChangesListOutput = Awaited<ReturnType<typeof posthog.scheduledChangesList>>;

const result: ScheduledChangesListOutput = await posthog.scheduledChangesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; team_id: number; record_id: string; model_name: "FeatureFlag"; payload: unknown; scheduled_at: string; executed_at: string | null;...
```

### `posthog.scheduledChangesCreate`

- **HTTP**: `POST /api/projects/{project_id}/scheduled_changes/`
- **What it does**: Create, read, update and delete scheduled changes.
- **OpenAPI operationId**: `scheduled_changes_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; team_id: number; record_id: string; model_name: "FeatureFlag"; payload: unknown; scheduled_at: string; executed_at: string | null; failure_reason: string | null; created_at: string; created_by: { id: numbe...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ScheduledChangesCreateInput = Parameters<typeof posthog.scheduledChangesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ScheduledChangesCreateOutput = Awaited<ReturnType<typeof posthog.scheduledChangesCreate>>;

const result: ScheduledChangesCreateOutput = await posthog.scheduledChangesCreate();

// Result shape (from schema): { id: number; team_id: number; record_id: string; model_name: "FeatureFlag"; payload: unknown; scheduled_at: string; executed_at: string | null; failure_reason: string | null; created_at: string; created_by: { id: numbe...
```

### `posthog.scheduledChangesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/scheduled_changes/{id}/`
- **What it does**: Create, read, update and delete scheduled changes.
- **OpenAPI operationId**: `scheduled_changes_destroy`
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

type ScheduledChangesDestroyInput = Parameters<typeof posthog.scheduledChangesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ScheduledChangesDestroyOutput = Awaited<ReturnType<typeof posthog.scheduledChangesDestroy>>;

const result: ScheduledChangesDestroyOutput = await posthog.scheduledChangesDestroy();

// Result shape (from schema): unknown
```

### `posthog.scheduledChangesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/scheduled_changes/{id}/`
- **What it does**: Create, read, update and delete scheduled changes.
- **OpenAPI operationId**: `scheduled_changes_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; team_id: number; record_id: string; model_name: "FeatureFlag"; payload: unknown; scheduled_at: string; executed_at: string | null; failure_reason: string | null; created_at: string; created_by: { id: numbe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ScheduledChangesRetrieveInput = Parameters<typeof posthog.scheduledChangesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ScheduledChangesRetrieveOutput = Awaited<ReturnType<typeof posthog.scheduledChangesRetrieve>>;

const result: ScheduledChangesRetrieveOutput = await posthog.scheduledChangesRetrieve();

// Result shape (from schema): { id: number; team_id: number; record_id: string; model_name: "FeatureFlag"; payload: unknown; scheduled_at: string; executed_at: string | null; failure_reason: string | null; created_at: string; created_by: { id: numbe...
```

### `posthog.scheduledChangesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/scheduled_changes/{id}/`
- **What it does**: Create, read, update and delete scheduled changes.
- **OpenAPI operationId**: `scheduled_changes_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; team_id: number; record_id: string; model_name: "FeatureFlag"; payload: unknown; scheduled_at: string; executed_at: string | null; failure_reason: string | null; created_at: string; created_by: { id: numbe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ScheduledChangesPartialUpdateInput = Parameters<typeof posthog.scheduledChangesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ScheduledChangesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.scheduledChangesPartialUpdate>>;

const result: ScheduledChangesPartialUpdateOutput = await posthog.scheduledChangesPartialUpdate();

// Result shape (from schema): { id: number; team_id: number; record_id: string; model_name: "FeatureFlag"; payload: unknown; scheduled_at: string; executed_at: string | null; failure_reason: string | null; created_at: string; created_by: { id: numbe...
```

### `posthog.scheduledChangesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/scheduled_changes/{id}/`
- **What it does**: Create, read, update and delete scheduled changes.
- **OpenAPI operationId**: `scheduled_changes_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; team_id: number; record_id: string; model_name: "FeatureFlag"; payload: unknown; scheduled_at: string; executed_at: string | null; failure_reason: string | null; created_at: string; created_by: { id: numbe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ScheduledChangesUpdateInput = Parameters<typeof posthog.scheduledChangesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ScheduledChangesUpdateOutput = Awaited<ReturnType<typeof posthog.scheduledChangesUpdate>>;

const result: ScheduledChangesUpdateOutput = await posthog.scheduledChangesUpdate();

// Result shape (from schema): { id: number; team_id: number; record_id: string; model_name: "FeatureFlag"; payload: unknown; scheduled_at: string; executed_at: string | null; failure_reason: string | null; created_at: string; created_by: { id: numbe...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

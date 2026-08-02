# Evaluations

## Operations

### `posthog.environmentsEvaluationsList`

- **HTTP**: `GET /api/environments/{environment_id}/evaluations/`
- **OpenAPI operationId**: `environments_evaluations_list`
- **Path params**: None
- **Query params**: `enabled`, `evaluation_type`, `id__in`, `limit`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_require...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEvaluationsListInput = Parameters<typeof posthog.environmentsEvaluationsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEvaluationsListOutput = Awaited<ReturnType<typeof posthog.environmentsEvaluationsList>>;

const result: EnvironmentsEvaluationsListOutput = await posthog.environmentsEvaluationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_require...
```

### `posthog.environmentsEvaluationsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/evaluations/`
- **OpenAPI operationId**: `environments_evaluations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEvaluationsCreateInput = Parameters<typeof posthog.environmentsEvaluationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEvaluationsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsEvaluationsCreate>>;

const result: EnvironmentsEvaluationsCreateOutput = await posthog.environmentsEvaluationsCreate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...
```

### `posthog.environmentsEvaluationsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/evaluations/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_evaluations_destroy`
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

type EnvironmentsEvaluationsDestroyInput = Parameters<typeof posthog.environmentsEvaluationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEvaluationsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsEvaluationsDestroy>>;

const result: EnvironmentsEvaluationsDestroyOutput = await posthog.environmentsEvaluationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsEvaluationsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/evaluations/{id}/`
- **OpenAPI operationId**: `environments_evaluations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEvaluationsRetrieveInput = Parameters<typeof posthog.environmentsEvaluationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEvaluationsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEvaluationsRetrieve>>;

const result: EnvironmentsEvaluationsRetrieveOutput = await posthog.environmentsEvaluationsRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...
```

### `posthog.environmentsEvaluationsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/evaluations/{id}/`
- **OpenAPI operationId**: `environments_evaluations_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEvaluationsPartialUpdateInput = Parameters<typeof posthog.environmentsEvaluationsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEvaluationsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsEvaluationsPartialUpdate>>;

const result: EnvironmentsEvaluationsPartialUpdateOutput = await posthog.environmentsEvaluationsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...
```

### `posthog.environmentsEvaluationsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/evaluations/{id}/`
- **OpenAPI operationId**: `environments_evaluations_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEvaluationsUpdateInput = Parameters<typeof posthog.environmentsEvaluationsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEvaluationsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsEvaluationsUpdate>>;

const result: EnvironmentsEvaluationsUpdateOutput = await posthog.environmentsEvaluationsUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...
```

### `posthog.environmentsEvaluationsTestHogCreate`

- **HTTP**: `POST /api/environments/{environment_id}/evaluations/test_hog/`
- **What it does**: Test Hog evaluation code against sample events without saving.
- **OpenAPI operationId**: `environments_evaluations_test_hog_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ event_uuid: string; trace_id?: string | null; input_preview: string; output_preview: string; result: boolean | null; reasoning: string | null; error: string | null })[]; message?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEvaluationsTestHogCreateInput = Parameters<typeof posthog.environmentsEvaluationsTestHogCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEvaluationsTestHogCreateOutput = Awaited<ReturnType<typeof posthog.environmentsEvaluationsTestHogCreate>>;

const result: EnvironmentsEvaluationsTestHogCreateOutput = await posthog.environmentsEvaluationsTestHogCreate();

// Result shape (from schema): { results: ({ event_uuid: string; trace_id?: string | null; input_preview: string; output_preview: string; result: boolean | null; reasoning: string | null; error: string | null })[]; message?: string }
```

### `posthog.evaluationsList`

- **HTTP**: `GET /api/projects/{project_id}/evaluations/`
- **OpenAPI operationId**: `evaluations_list`
- **Path params**: None
- **Query params**: `enabled`, `evaluation_type`, `id__in`, `limit`, `offset`, `order_by`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_require...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EvaluationsListInput = Parameters<typeof posthog.evaluationsList> extends [infer T, ...unknown[]] ? T : undefined;
type EvaluationsListOutput = Awaited<ReturnType<typeof posthog.evaluationsList>>;

const result: EvaluationsListOutput = await posthog.evaluationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_require...
```

### `posthog.evaluationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/evaluations/`
- **OpenAPI operationId**: `evaluations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EvaluationsCreateInput = Parameters<typeof posthog.evaluationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EvaluationsCreateOutput = Awaited<ReturnType<typeof posthog.evaluationsCreate>>;

const result: EvaluationsCreateOutput = await posthog.evaluationsCreate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...
```

### `posthog.evaluationsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/evaluations/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `evaluations_destroy`
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

type EvaluationsDestroyInput = Parameters<typeof posthog.evaluationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EvaluationsDestroyOutput = Awaited<ReturnType<typeof posthog.evaluationsDestroy>>;

const result: EvaluationsDestroyOutput = await posthog.evaluationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.evaluationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/evaluations/{id}/`
- **OpenAPI operationId**: `evaluations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EvaluationsRetrieveInput = Parameters<typeof posthog.evaluationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EvaluationsRetrieveOutput = Awaited<ReturnType<typeof posthog.evaluationsRetrieve>>;

const result: EvaluationsRetrieveOutput = await posthog.evaluationsRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...
```

### `posthog.evaluationsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/evaluations/{id}/`
- **OpenAPI operationId**: `evaluations_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EvaluationsPartialUpdateInput = Parameters<typeof posthog.evaluationsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EvaluationsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.evaluationsPartialUpdate>>;

const result: EvaluationsPartialUpdateOutput = await posthog.evaluationsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...
```

### `posthog.evaluationsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/evaluations/{id}/`
- **OpenAPI operationId**: `evaluations_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EvaluationsUpdateInput = Parameters<typeof posthog.evaluationsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EvaluationsUpdateOutput = Awaited<ReturnType<typeof posthog.evaluationsUpdate>>;

const result: EvaluationsUpdateOutput = await posthog.evaluationsUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; enabled?: boolean; status: "active" | "paused" | "error"; status_reason: "provider_key_required" | "trial_limit_reached" | "model_not_allowed" | "provider_key_deleted" |...
```

### `posthog.evaluationsTestHogCreate`

- **HTTP**: `POST /api/projects/{project_id}/evaluations/test_hog/`
- **What it does**: Test Hog evaluation code against sample events without saving.
- **OpenAPI operationId**: `evaluations_test_hog_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ event_uuid: string; trace_id?: string | null; input_preview: string; output_preview: string; result: boolean | null; reasoning: string | null; error: string | null })[]; message?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EvaluationsTestHogCreateInput = Parameters<typeof posthog.evaluationsTestHogCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EvaluationsTestHogCreateOutput = Awaited<ReturnType<typeof posthog.evaluationsTestHogCreate>>;

const result: EvaluationsTestHogCreateOutput = await posthog.evaluationsTestHogCreate();

// Result shape (from schema): { results: ({ event_uuid: string; trace_id?: string | null; input_preview: string; output_preview: string; result: boolean | null; reasoning: string | null; error: string | null })[]; message?: string }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

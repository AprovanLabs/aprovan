# Experiment Holdouts

## Operations

### `posthog.experimentHoldoutsList`

- **HTTP**: `GET /api/projects/{project_id}/experiment_holdouts/`
- **OpenAPI operationId**: `experiment_holdouts_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; description?: string | null; filters?: ({ properties?: ({ key: string; type?: "cohort" | "person" | "group"; cohort_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentHoldoutsListInput = Parameters<typeof posthog.experimentHoldoutsList> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentHoldoutsListOutput = Awaited<ReturnType<typeof posthog.experimentHoldoutsList>>;

const result: ExperimentHoldoutsListOutput = await posthog.experimentHoldoutsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name: string; description?: string | null; filters?: ({ properties?: ({ key: string; type?: "cohort" | "person" | "group"; cohort_...
```

### `posthog.experimentHoldoutsCreate`

- **HTTP**: `POST /api/projects/{project_id}/experiment_holdouts/`
- **OpenAPI operationId**: `experiment_holdouts_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; filters?: ({ properties?: ({ key: string; type?: "cohort" | "person" | "group"; cohort_name?: string | null; group_type_index?: number | null; value: unknown; ope...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ExperimentHoldoutsCreateInput = Parameters<typeof posthog.experimentHoldoutsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentHoldoutsCreateOutput = Awaited<ReturnType<typeof posthog.experimentHoldoutsCreate>>;

const result: ExperimentHoldoutsCreateOutput = await posthog.experimentHoldoutsCreate();

// Result shape (from schema): { id: number; name: string; description?: string | null; filters?: ({ properties?: ({ key: string; type?: "cohort" | "person" | "group"; cohort_name?: string | null; group_type_index?: number | null; value: unknown; ope...
```

### `posthog.experimentHoldoutsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/experiment_holdouts/{id}/`
- **OpenAPI operationId**: `experiment_holdouts_destroy`
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

type ExperimentHoldoutsDestroyInput = Parameters<typeof posthog.experimentHoldoutsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentHoldoutsDestroyOutput = Awaited<ReturnType<typeof posthog.experimentHoldoutsDestroy>>;

const result: ExperimentHoldoutsDestroyOutput = await posthog.experimentHoldoutsDestroy();

// Result shape (from schema): unknown
```

### `posthog.experimentHoldoutsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/experiment_holdouts/{id}/`
- **OpenAPI operationId**: `experiment_holdouts_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; filters?: ({ properties?: ({ key: string; type?: "cohort" | "person" | "group"; cohort_name?: string | null; group_type_index?: number | null; value: unknown; ope...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentHoldoutsRetrieveInput = Parameters<typeof posthog.experimentHoldoutsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentHoldoutsRetrieveOutput = Awaited<ReturnType<typeof posthog.experimentHoldoutsRetrieve>>;

const result: ExperimentHoldoutsRetrieveOutput = await posthog.experimentHoldoutsRetrieve();

// Result shape (from schema): { id: number; name: string; description?: string | null; filters?: ({ properties?: ({ key: string; type?: "cohort" | "person" | "group"; cohort_name?: string | null; group_type_index?: number | null; value: unknown; ope...
```

### `posthog.experimentHoldoutsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/experiment_holdouts/{id}/`
- **OpenAPI operationId**: `experiment_holdouts_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; filters?: ({ properties?: ({ key: string; type?: "cohort" | "person" | "group"; cohort_name?: string | null; group_type_index?: number | null; value: unknown; ope...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentHoldoutsPartialUpdateInput = Parameters<typeof posthog.experimentHoldoutsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentHoldoutsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.experimentHoldoutsPartialUpdate>>;

const result: ExperimentHoldoutsPartialUpdateOutput = await posthog.experimentHoldoutsPartialUpdate();

// Result shape (from schema): { id: number; name: string; description?: string | null; filters?: ({ properties?: ({ key: string; type?: "cohort" | "person" | "group"; cohort_name?: string | null; group_type_index?: number | null; value: unknown; ope...
```

### `posthog.experimentHoldoutsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/experiment_holdouts/{id}/`
- **OpenAPI operationId**: `experiment_holdouts_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; description?: string | null; filters?: ({ properties?: ({ key: string; type?: "cohort" | "person" | "group"; cohort_name?: string | null; group_type_index?: number | null; value: unknown; ope...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ExperimentHoldoutsUpdateInput = Parameters<typeof posthog.experimentHoldoutsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ExperimentHoldoutsUpdateOutput = Awaited<ReturnType<typeof posthog.experimentHoldoutsUpdate>>;

const result: ExperimentHoldoutsUpdateOutput = await posthog.experimentHoldoutsUpdate();

// Result shape (from schema): { id: number; name: string; description?: string | null; filters?: ({ properties?: ({ key: string; type?: "cohort" | "person" | "group"; cohort_name?: string | null; group_type_index?: number | null; value: unknown; ope...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

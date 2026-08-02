# Cohorts

## Operations

### `posthog.cohortsList`

- **HTTP**: `GET /api/projects/{project_id}/cohorts/`
- **OpenAPI operationId**: `cohorts_list`
- **Path params**: None
- **Query params**: `basic`, `hide_behavioral_cohorts`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name?: string | null; description?: string; groups?: unknown; deleted?: boolean; filters?: { properties: { type: "AND" | "OR"; val...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CohortsListInput = Parameters<typeof posthog.cohortsList> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsListOutput = Awaited<ReturnType<typeof posthog.cohortsList>>;

const result: CohortsListOutput = await posthog.cohortsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name?: string | null; description?: string; groups?: unknown; deleted?: boolean; filters?: { properties: { type: "AND" | "OR"; val...
```

### `posthog.cohortsCreate`

- **HTTP**: `POST /api/projects/{project_id}/cohorts/`
- **OpenAPI operationId**: `cohorts_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; groups?: unknown; deleted?: boolean; filters?: { properties: { type: "AND" | "OR"; values: ({ bytecode?: (unknown)[] | null; bytecode_error?: string | null; cond...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type CohortsCreateInput = Parameters<typeof posthog.cohortsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsCreateOutput = Awaited<ReturnType<typeof posthog.cohortsCreate>>;

const result: CohortsCreateOutput = await posthog.cohortsCreate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; groups?: unknown; deleted?: boolean; filters?: { properties: { type: "AND" | "OR"; values: ({ bytecode?: (unknown)[] | null; bytecode_error?: string | null; cond...
```

### `posthog.cohortsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/cohorts/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `cohorts_destroy`
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

type CohortsDestroyInput = Parameters<typeof posthog.cohortsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsDestroyOutput = Awaited<ReturnType<typeof posthog.cohortsDestroy>>;

const result: CohortsDestroyOutput = await posthog.cohortsDestroy();

// Result shape (from schema): unknown
```

### `posthog.cohortsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/cohorts/{id}/`
- **OpenAPI operationId**: `cohorts_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; groups?: unknown; deleted?: boolean; filters?: { properties: { type: "AND" | "OR"; values: ({ bytecode?: (unknown)[] | null; bytecode_error?: string | null; cond...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CohortsRetrieveInput = Parameters<typeof posthog.cohortsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsRetrieveOutput = Awaited<ReturnType<typeof posthog.cohortsRetrieve>>;

const result: CohortsRetrieveOutput = await posthog.cohortsRetrieve();

// Result shape (from schema): { id: number; name?: string | null; description?: string; groups?: unknown; deleted?: boolean; filters?: { properties: { type: "AND" | "OR"; values: ({ bytecode?: (unknown)[] | null; bytecode_error?: string | null; cond...
```

### `posthog.cohortsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/cohorts/{id}/`
- **OpenAPI operationId**: `cohorts_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; groups?: unknown; deleted?: boolean; filters?: { properties: { type: "AND" | "OR"; values: ({ bytecode?: (unknown)[] | null; bytecode_error?: string | null; cond...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CohortsPartialUpdateInput = Parameters<typeof posthog.cohortsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.cohortsPartialUpdate>>;

const result: CohortsPartialUpdateOutput = await posthog.cohortsPartialUpdate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; groups?: unknown; deleted?: boolean; filters?: { properties: { type: "AND" | "OR"; values: ({ bytecode?: (unknown)[] | null; bytecode_error?: string | null; cond...
```

### `posthog.cohortsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/cohorts/{id}/`
- **OpenAPI operationId**: `cohorts_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; groups?: unknown; deleted?: boolean; filters?: { properties: { type: "AND" | "OR"; values: ({ bytecode?: (unknown)[] | null; bytecode_error?: string | null; cond...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CohortsUpdateInput = Parameters<typeof posthog.cohortsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsUpdateOutput = Awaited<ReturnType<typeof posthog.cohortsUpdate>>;

const result: CohortsUpdateOutput = await posthog.cohortsUpdate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; groups?: unknown; deleted?: boolean; filters?: { properties: { type: "AND" | "OR"; values: ({ bytecode?: (unknown)[] | null; bytecode_error?: string | null; cond...
```

### `posthog.cohortsActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/cohorts/{id}/activity/`
- **OpenAPI operationId**: `cohorts_activity_retrieve`
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

type CohortsActivityRetrieveInput = Parameters<typeof posthog.cohortsActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.cohortsActivityRetrieve>>;

const result: CohortsActivityRetrieveOutput = await posthog.cohortsActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.cohortsAddPersonsToStaticCohortPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/cohorts/{id}/add_persons_to_static_cohort/`
- **OpenAPI operationId**: `cohorts_add_persons_to_static_cohort_partial_update`
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

type CohortsAddPersonsToStaticCohortPartialUpdateInput = Parameters<typeof posthog.cohortsAddPersonsToStaticCohortPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsAddPersonsToStaticCohortPartialUpdateOutput = Awaited<ReturnType<typeof posthog.cohortsAddPersonsToStaticCohortPartialUpdate>>;

const result: CohortsAddPersonsToStaticCohortPartialUpdateOutput = await posthog.cohortsAddPersonsToStaticCohortPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.cohortsCalculationHistoryRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/cohorts/{id}/calculation_history/`
- **OpenAPI operationId**: `cohorts_calculation_history_retrieve`
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

type CohortsCalculationHistoryRetrieveInput = Parameters<typeof posthog.cohortsCalculationHistoryRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsCalculationHistoryRetrieveOutput = Awaited<ReturnType<typeof posthog.cohortsCalculationHistoryRetrieve>>;

const result: CohortsCalculationHistoryRetrieveOutput = await posthog.cohortsCalculationHistoryRetrieve();

// Result shape (from schema): unknown
```

### `posthog.cohortsPersonsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/cohorts/{id}/persons/`
- **OpenAPI operationId**: `cohorts_persons_retrieve`
- **Path params**: `id`
- **Query params**: `format`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; uuid: string; type: "person"; name: string; distinct_ids: (string)[]; properties: { [key: string]: unknown }; created_at: string | null; last_seen_at: string | null; is_identified: boolean | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CohortsPersonsRetrieveInput = Parameters<typeof posthog.cohortsPersonsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsPersonsRetrieveOutput = Awaited<ReturnType<typeof posthog.cohortsPersonsRetrieve>>;

const result: CohortsPersonsRetrieveOutput = await posthog.cohortsPersonsRetrieve();

// Result shape (from schema): { results: ({ id: string; uuid: string; type: "person"; name: string; distinct_ids: (string)[]; properties: { [key: string]: unknown }; created_at: string | null; last_seen_at: string | null; is_identified: boolean | nu...
```

### `posthog.cohortsRemovePersonFromStaticCohortPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/cohorts/{id}/remove_person_from_static_cohort/`
- **OpenAPI operationId**: `cohorts_remove_person_from_static_cohort_partial_update`
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

type CohortsRemovePersonFromStaticCohortPartialUpdateInput = Parameters<typeof posthog.cohortsRemovePersonFromStaticCohortPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsRemovePersonFromStaticCohortPartialUpdateOutput = Awaited<ReturnType<typeof posthog.cohortsRemovePersonFromStaticCohortPartialUpdate>>;

const result: CohortsRemovePersonFromStaticCohortPartialUpdateOutput = await posthog.cohortsRemovePersonFromStaticCohortPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.cohortsUsedInRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/cohorts/{id}/used_in/`
- **OpenAPI operationId**: `cohorts_used_in_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ feature_flags: { results: ({ id: number; key: string; name: string | null })[]; total: number; has_more: boolean }; insights: { results: ({ id: number; short_id: string; name: string })[]; total: number; has_more: boo...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CohortsUsedInRetrieveInput = Parameters<typeof posthog.cohortsUsedInRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsUsedInRetrieveOutput = Awaited<ReturnType<typeof posthog.cohortsUsedInRetrieve>>;

const result: CohortsUsedInRetrieveOutput = await posthog.cohortsUsedInRetrieve();

// Result shape (from schema): { feature_flags: { results: ({ id: number; key: string; name: string | null })[]; total: number; has_more: boolean }; insights: { results: ({ id: number; short_id: string; name: string })[]; total: number; has_more: boo...
```

### `posthog.cohortsAllActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/cohorts/activity/`
- **OpenAPI operationId**: `cohorts_all_activity_retrieve`
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

type CohortsAllActivityRetrieveInput = Parameters<typeof posthog.cohortsAllActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CohortsAllActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.cohortsAllActivityRetrieve>>;

const result: CohortsAllActivityRetrieveOutput = await posthog.cohortsAllActivityRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

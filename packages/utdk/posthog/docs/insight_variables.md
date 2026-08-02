# Insight Variables

## Operations

### `posthog.environmentsInsightVariablesList`

- **HTTP**: `GET /api/environments/{environment_id}/insight_variables/`
- **OpenAPI operationId**: `environments_insight_variables_list`
- **Path params**: None
- **Query params**: `page`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightVariablesListInput = Parameters<typeof posthog.environmentsInsightVariablesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightVariablesListOutput = Awaited<ReturnType<typeof posthog.environmentsInsightVariablesList>>;

const result: EnvironmentsInsightVariablesListOutput = await posthog.environmentsInsightVariablesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created...
```

### `posthog.environmentsInsightVariablesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/insight_variables/`
- **OpenAPI operationId**: `environments_insight_variables_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightVariablesCreateInput = Parameters<typeof posthog.environmentsInsightVariablesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightVariablesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightVariablesCreate>>;

const result: EnvironmentsInsightVariablesCreateOutput = await posthog.environmentsInsightVariablesCreate();

// Result shape (from schema): { id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }
```

### `posthog.environmentsInsightVariablesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/insight_variables/{id}/`
- **OpenAPI operationId**: `environments_insight_variables_destroy`
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

type EnvironmentsInsightVariablesDestroyInput = Parameters<typeof posthog.environmentsInsightVariablesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightVariablesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsInsightVariablesDestroy>>;

const result: EnvironmentsInsightVariablesDestroyOutput = await posthog.environmentsInsightVariablesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsInsightVariablesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/insight_variables/{id}/`
- **OpenAPI operationId**: `environments_insight_variables_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightVariablesRetrieveInput = Parameters<typeof posthog.environmentsInsightVariablesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightVariablesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsInsightVariablesRetrieve>>;

const result: EnvironmentsInsightVariablesRetrieveOutput = await posthog.environmentsInsightVariablesRetrieve();

// Result shape (from schema): { id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }
```

### `posthog.environmentsInsightVariablesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/insight_variables/{id}/`
- **OpenAPI operationId**: `environments_insight_variables_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightVariablesPartialUpdateInput = Parameters<typeof posthog.environmentsInsightVariablesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightVariablesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightVariablesPartialUpdate>>;

const result: EnvironmentsInsightVariablesPartialUpdateOutput = await posthog.environmentsInsightVariablesPartialUpdate();

// Result shape (from schema): { id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }
```

### `posthog.environmentsInsightVariablesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/insight_variables/{id}/`
- **OpenAPI operationId**: `environments_insight_variables_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsInsightVariablesUpdateInput = Parameters<typeof posthog.environmentsInsightVariablesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsInsightVariablesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsInsightVariablesUpdate>>;

const result: EnvironmentsInsightVariablesUpdateOutput = await posthog.environmentsInsightVariablesUpdate();

// Result shape (from schema): { id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }
```

### `posthog.insightVariablesList`

- **HTTP**: `GET /api/projects/{project_id}/insight_variables/`
- **OpenAPI operationId**: `insight_variables_list`
- **Path params**: None
- **Query params**: `page`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightVariablesListInput = Parameters<typeof posthog.insightVariablesList> extends [infer T, ...unknown[]] ? T : undefined;
type InsightVariablesListOutput = Awaited<ReturnType<typeof posthog.insightVariablesList>>;

const result: InsightVariablesListOutput = await posthog.insightVariablesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created...
```

### `posthog.insightVariablesCreate`

- **HTTP**: `POST /api/projects/{project_id}/insight_variables/`
- **OpenAPI operationId**: `insight_variables_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type InsightVariablesCreateInput = Parameters<typeof posthog.insightVariablesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightVariablesCreateOutput = Awaited<ReturnType<typeof posthog.insightVariablesCreate>>;

const result: InsightVariablesCreateOutput = await posthog.insightVariablesCreate();

// Result shape (from schema): { id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }
```

### `posthog.insightVariablesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/insight_variables/{id}/`
- **OpenAPI operationId**: `insight_variables_destroy`
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

type InsightVariablesDestroyInput = Parameters<typeof posthog.insightVariablesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type InsightVariablesDestroyOutput = Awaited<ReturnType<typeof posthog.insightVariablesDestroy>>;

const result: InsightVariablesDestroyOutput = await posthog.insightVariablesDestroy();

// Result shape (from schema): unknown
```

### `posthog.insightVariablesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/insight_variables/{id}/`
- **OpenAPI operationId**: `insight_variables_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightVariablesRetrieveInput = Parameters<typeof posthog.insightVariablesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type InsightVariablesRetrieveOutput = Awaited<ReturnType<typeof posthog.insightVariablesRetrieve>>;

const result: InsightVariablesRetrieveOutput = await posthog.insightVariablesRetrieve();

// Result shape (from schema): { id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }
```

### `posthog.insightVariablesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/insight_variables/{id}/`
- **OpenAPI operationId**: `insight_variables_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightVariablesPartialUpdateInput = Parameters<typeof posthog.insightVariablesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightVariablesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.insightVariablesPartialUpdate>>;

const result: InsightVariablesPartialUpdateOutput = await posthog.insightVariablesPartialUpdate();

// Result shape (from schema): { id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }
```

### `posthog.insightVariablesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/insight_variables/{id}/`
- **OpenAPI operationId**: `insight_variables_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type InsightVariablesUpdateInput = Parameters<typeof posthog.insightVariablesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type InsightVariablesUpdateOutput = Awaited<ReturnType<typeof posthog.insightVariablesUpdate>>;

const result: InsightVariablesUpdateOutput = await posthog.insightVariablesUpdate();

// Result shape (from schema): { id: string; name: string; type: "String" | "Number" | "Boolean" | "List" | "Date"; default_value?: unknown; created_by: number | null; created_at: string; code_name: string | null; values?: unknown }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

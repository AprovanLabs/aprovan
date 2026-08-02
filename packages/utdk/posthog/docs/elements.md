# Elements

## Operations

### `posthog.environmentsElementsList`

- **HTTP**: `GET /api/environments/{environment_id}/elements/`
- **OpenAPI operationId**: `environments_elements_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsElementsListInput = Parameters<typeof posthog.environmentsElementsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsElementsListOutput = Awaited<ReturnType<typeof posthog.environmentsElementsList>>;

const result: EnvironmentsElementsListOutput = await posthog.environmentsElementsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: numb...
```

### `posthog.environmentsElementsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/elements/`
- **OpenAPI operationId**: `environments_elements_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsElementsCreateInput = Parameters<typeof posthog.environmentsElementsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsElementsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsElementsCreate>>;

const result: EnvironmentsElementsCreateOutput = await posthog.environmentsElementsCreate();

// Result shape (from schema): { text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...
```

### `posthog.environmentsElementsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/elements/{id}/`
- **OpenAPI operationId**: `environments_elements_destroy`
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

type EnvironmentsElementsDestroyInput = Parameters<typeof posthog.environmentsElementsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsElementsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsElementsDestroy>>;

const result: EnvironmentsElementsDestroyOutput = await posthog.environmentsElementsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsElementsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/elements/{id}/`
- **OpenAPI operationId**: `environments_elements_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsElementsRetrieveInput = Parameters<typeof posthog.environmentsElementsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsElementsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsElementsRetrieve>>;

const result: EnvironmentsElementsRetrieveOutput = await posthog.environmentsElementsRetrieve();

// Result shape (from schema): { text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...
```

### `posthog.environmentsElementsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/elements/{id}/`
- **OpenAPI operationId**: `environments_elements_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsElementsPartialUpdateInput = Parameters<typeof posthog.environmentsElementsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsElementsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsElementsPartialUpdate>>;

const result: EnvironmentsElementsPartialUpdateOutput = await posthog.environmentsElementsPartialUpdate();

// Result shape (from schema): { text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...
```

### `posthog.environmentsElementsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/elements/{id}/`
- **OpenAPI operationId**: `environments_elements_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsElementsUpdateInput = Parameters<typeof posthog.environmentsElementsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsElementsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsElementsUpdate>>;

const result: EnvironmentsElementsUpdateOutput = await posthog.environmentsElementsUpdate();

// Result shape (from schema): { text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...
```

### `posthog.environmentsElementsStatsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/elements/stats/`
- **What it does**: Counts of $autocapture, $rageclick, and $dead_click events grouped by the element chain
they occurred on, ordered by count. Defaults to all three event types; narrow with the
include parameter.
- **OpenAPI operationId**: `environments_elements_stats_retrieve`
- **Path params**: None
- **Query params**: `data_attributes`, `date_from`, `date_to`, `filter_test_accounts`, `include`, `limit`, `offset`, `properties`, `sampling_factor`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ count: number; hash: string | null; type: string; elements: ({ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsElementsStatsRetrieveInput = Parameters<typeof posthog.environmentsElementsStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsElementsStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsElementsStatsRetrieve>>;

const result: EnvironmentsElementsStatsRetrieveOutput = await posthog.environmentsElementsStatsRetrieve();

// Result shape (from schema): { results: ({ count: number; hash: string | null; type: string; elements: ({ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: numb...
```

### `posthog.environmentsElementsValuesList`

- **HTTP**: `GET /api/environments/{environment_id}/elements/values/`
- **OpenAPI operationId**: `environments_elements_values_list`
- **Path params**: None
- **Query params**: `key`, `value`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ name: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsElementsValuesListInput = Parameters<typeof posthog.environmentsElementsValuesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsElementsValuesListOutput = Awaited<ReturnType<typeof posthog.environmentsElementsValuesList>>;

const result: EnvironmentsElementsValuesListOutput = await posthog.environmentsElementsValuesList();

// Result shape (from schema): ({ name: string })[]
```

### `posthog.elementsList`

- **HTTP**: `GET /api/projects/{project_id}/elements/`
- **OpenAPI operationId**: `elements_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ElementsListInput = Parameters<typeof posthog.elementsList> extends [infer T, ...unknown[]] ? T : undefined;
type ElementsListOutput = Awaited<ReturnType<typeof posthog.elementsList>>;

const result: ElementsListOutput = await posthog.elementsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: numb...
```

### `posthog.elementsCreate`

- **HTTP**: `POST /api/projects/{project_id}/elements/`
- **OpenAPI operationId**: `elements_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ElementsCreateInput = Parameters<typeof posthog.elementsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ElementsCreateOutput = Awaited<ReturnType<typeof posthog.elementsCreate>>;

const result: ElementsCreateOutput = await posthog.elementsCreate();

// Result shape (from schema): { text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...
```

### `posthog.elementsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/elements/{id}/`
- **OpenAPI operationId**: `elements_destroy`
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

type ElementsDestroyInput = Parameters<typeof posthog.elementsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ElementsDestroyOutput = Awaited<ReturnType<typeof posthog.elementsDestroy>>;

const result: ElementsDestroyOutput = await posthog.elementsDestroy();

// Result shape (from schema): unknown
```

### `posthog.elementsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/elements/{id}/`
- **OpenAPI operationId**: `elements_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ElementsRetrieveInput = Parameters<typeof posthog.elementsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ElementsRetrieveOutput = Awaited<ReturnType<typeof posthog.elementsRetrieve>>;

const result: ElementsRetrieveOutput = await posthog.elementsRetrieve();

// Result shape (from schema): { text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...
```

### `posthog.elementsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/elements/{id}/`
- **OpenAPI operationId**: `elements_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ElementsPartialUpdateInput = Parameters<typeof posthog.elementsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ElementsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.elementsPartialUpdate>>;

const result: ElementsPartialUpdateOutput = await posthog.elementsPartialUpdate();

// Result shape (from schema): { text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...
```

### `posthog.elementsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/elements/{id}/`
- **OpenAPI operationId**: `elements_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ElementsUpdateInput = Parameters<typeof posthog.elementsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ElementsUpdateOutput = Awaited<ReturnType<typeof posthog.elementsUpdate>>;

const result: ElementsUpdateOutput = await posthog.elementsUpdate();

// Result shape (from schema): { text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: number | null; nth_of_type?: number | null; attributes?: unknown; order?: numbe...
```

### `posthog.elementsStatsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/elements/stats/`
- **What it does**: Counts of $autocapture, $rageclick, and $dead_click events grouped by the element chain
they occurred on, ordered by count. Defaults to all three event types; narrow with the
include parameter.
- **OpenAPI operationId**: `elements_stats_retrieve`
- **Path params**: None
- **Query params**: `data_attributes`, `date_from`, `date_to`, `filter_test_accounts`, `include`, `limit`, `offset`, `properties`, `sampling_factor`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ count: number; hash: string | null; type: string; elements: ({ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: numb...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ElementsStatsRetrieveInput = Parameters<typeof posthog.elementsStatsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ElementsStatsRetrieveOutput = Awaited<ReturnType<typeof posthog.elementsStatsRetrieve>>;

const result: ElementsStatsRetrieveOutput = await posthog.elementsStatsRetrieve();

// Result shape (from schema): { results: ({ count: number; hash: string | null; type: string; elements: ({ text?: string | null; tag_name?: string | null; attr_class?: unknown[] | null; href?: string | null; attr_id?: string | null; nth_child?: numb...
```

### `posthog.elementsValuesList`

- **HTTP**: `GET /api/projects/{project_id}/elements/values/`
- **OpenAPI operationId**: `elements_values_list`
- **Path params**: None
- **Query params**: `key`, `value`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ name: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ElementsValuesListInput = Parameters<typeof posthog.elementsValuesList> extends [infer T, ...unknown[]] ? T : undefined;
type ElementsValuesListOutput = Awaited<ReturnType<typeof posthog.elementsValuesList>>;

const result: ElementsValuesListOutput = await posthog.elementsValuesList();

// Result shape (from schema): ({ name: string })[]
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

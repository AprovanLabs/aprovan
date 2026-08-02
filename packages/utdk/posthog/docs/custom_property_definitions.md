# Custom Property Definitions

## Operations

### `posthog.environmentsCustomPropertyDefinitionsList`

- **HTTP**: `GET /api/environments/{environment_id}/custom_property_definitions/`
- **OpenAPI operationId**: `environments_custom_property_definitions_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boole...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomPropertyDefinitionsListInput = Parameters<typeof posthog.environmentsCustomPropertyDefinitionsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomPropertyDefinitionsListOutput = Awaited<ReturnType<typeof posthog.environmentsCustomPropertyDefinitionsList>>;

const result: EnvironmentsCustomPropertyDefinitionsListOutput = await posthog.environmentsCustomPropertyDefinitionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boole...
```

### `posthog.environmentsCustomPropertyDefinitionsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/custom_property_definitions/`
- **OpenAPI operationId**: `environments_custom_property_definitions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomPropertyDefinitionsCreateInput = Parameters<typeof posthog.environmentsCustomPropertyDefinitionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomPropertyDefinitionsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsCustomPropertyDefinitionsCreate>>;

const result: EnvironmentsCustomPropertyDefinitionsCreateOutput = await posthog.environmentsCustomPropertyDefinitionsCreate();

// Result shape (from schema): { id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...
```

### `posthog.environmentsCustomPropertyDefinitionsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/custom_property_definitions/{id}/`
- **OpenAPI operationId**: `environments_custom_property_definitions_destroy`
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

type EnvironmentsCustomPropertyDefinitionsDestroyInput = Parameters<typeof posthog.environmentsCustomPropertyDefinitionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomPropertyDefinitionsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsCustomPropertyDefinitionsDestroy>>;

const result: EnvironmentsCustomPropertyDefinitionsDestroyOutput = await posthog.environmentsCustomPropertyDefinitionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsCustomPropertyDefinitionsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/custom_property_definitions/{id}/`
- **OpenAPI operationId**: `environments_custom_property_definitions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomPropertyDefinitionsRetrieveInput = Parameters<typeof posthog.environmentsCustomPropertyDefinitionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomPropertyDefinitionsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsCustomPropertyDefinitionsRetrieve>>;

const result: EnvironmentsCustomPropertyDefinitionsRetrieveOutput = await posthog.environmentsCustomPropertyDefinitionsRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...
```

### `posthog.environmentsCustomPropertyDefinitionsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/custom_property_definitions/{id}/`
- **OpenAPI operationId**: `environments_custom_property_definitions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomPropertyDefinitionsPartialUpdateInput = Parameters<typeof posthog.environmentsCustomPropertyDefinitionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomPropertyDefinitionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsCustomPropertyDefinitionsPartialUpdate>>;

const result: EnvironmentsCustomPropertyDefinitionsPartialUpdateOutput = await posthog.environmentsCustomPropertyDefinitionsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...
```

### `posthog.environmentsCustomPropertyDefinitionsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/custom_property_definitions/{id}/`
- **OpenAPI operationId**: `environments_custom_property_definitions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomPropertyDefinitionsUpdateInput = Parameters<typeof posthog.environmentsCustomPropertyDefinitionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomPropertyDefinitionsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsCustomPropertyDefinitionsUpdate>>;

const result: EnvironmentsCustomPropertyDefinitionsUpdateOutput = await posthog.environmentsCustomPropertyDefinitionsUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...
```

### `posthog.environmentsCustomPropertyDefinitionsValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/custom_property_definitions/values/`
- **OpenAPI operationId**: `environments_custom_property_definitions_values_retrieve`
- **Path params**: None
- **Query params**: `key`, `value`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ name: string })[]; refreshing: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCustomPropertyDefinitionsValuesRetrieveInput = Parameters<typeof posthog.environmentsCustomPropertyDefinitionsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCustomPropertyDefinitionsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsCustomPropertyDefinitionsValuesRetrieve>>;

const result: EnvironmentsCustomPropertyDefinitionsValuesRetrieveOutput = await posthog.environmentsCustomPropertyDefinitionsValuesRetrieve();

// Result shape (from schema): { results: ({ name: string })[]; refreshing: boolean }
```

### `posthog.customPropertyDefinitionsList`

- **HTTP**: `GET /api/projects/{project_id}/custom_property_definitions/`
- **OpenAPI operationId**: `custom_property_definitions_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boole...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomPropertyDefinitionsListInput = Parameters<typeof posthog.customPropertyDefinitionsList> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertyDefinitionsListOutput = Awaited<ReturnType<typeof posthog.customPropertyDefinitionsList>>;

const result: CustomPropertyDefinitionsListOutput = await posthog.customPropertyDefinitionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boole...
```

### `posthog.customPropertyDefinitionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/custom_property_definitions/`
- **OpenAPI operationId**: `custom_property_definitions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type CustomPropertyDefinitionsCreateInput = Parameters<typeof posthog.customPropertyDefinitionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertyDefinitionsCreateOutput = Awaited<ReturnType<typeof posthog.customPropertyDefinitionsCreate>>;

const result: CustomPropertyDefinitionsCreateOutput = await posthog.customPropertyDefinitionsCreate();

// Result shape (from schema): { id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...
```

### `posthog.customPropertyDefinitionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/custom_property_definitions/{id}/`
- **OpenAPI operationId**: `custom_property_definitions_destroy`
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

type CustomPropertyDefinitionsDestroyInput = Parameters<typeof posthog.customPropertyDefinitionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertyDefinitionsDestroyOutput = Awaited<ReturnType<typeof posthog.customPropertyDefinitionsDestroy>>;

const result: CustomPropertyDefinitionsDestroyOutput = await posthog.customPropertyDefinitionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.customPropertyDefinitionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/custom_property_definitions/{id}/`
- **OpenAPI operationId**: `custom_property_definitions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomPropertyDefinitionsRetrieveInput = Parameters<typeof posthog.customPropertyDefinitionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertyDefinitionsRetrieveOutput = Awaited<ReturnType<typeof posthog.customPropertyDefinitionsRetrieve>>;

const result: CustomPropertyDefinitionsRetrieveOutput = await posthog.customPropertyDefinitionsRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...
```

### `posthog.customPropertyDefinitionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/custom_property_definitions/{id}/`
- **OpenAPI operationId**: `custom_property_definitions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomPropertyDefinitionsPartialUpdateInput = Parameters<typeof posthog.customPropertyDefinitionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertyDefinitionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.customPropertyDefinitionsPartialUpdate>>;

const result: CustomPropertyDefinitionsPartialUpdateOutput = await posthog.customPropertyDefinitionsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...
```

### `posthog.customPropertyDefinitionsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/custom_property_definitions/{id}/`
- **OpenAPI operationId**: `custom_property_definitions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomPropertyDefinitionsUpdateInput = Parameters<typeof posthog.customPropertyDefinitionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertyDefinitionsUpdateOutput = Awaited<ReturnType<typeof posthog.customPropertyDefinitionsUpdate>>;

const result: CustomPropertyDefinitionsUpdateOutput = await posthog.customPropertyDefinitionsUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; display_type: "text" | "number" | "currency" | "percent" | "date" | "datetime" | "boolean" | "select"; is_big_number?: boolean; options?: unknown[] | null; source...
```

### `posthog.customPropertyDefinitionsValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/custom_property_definitions/values/`
- **OpenAPI operationId**: `custom_property_definitions_values_retrieve`
- **Path params**: None
- **Query params**: `key`, `value`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ name: string })[]; refreshing: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CustomPropertyDefinitionsValuesRetrieveInput = Parameters<typeof posthog.customPropertyDefinitionsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type CustomPropertyDefinitionsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.customPropertyDefinitionsValuesRetrieve>>;

const result: CustomPropertyDefinitionsValuesRetrieveOutput = await posthog.customPropertyDefinitionsValuesRetrieve();

// Result shape (from schema): { results: ({ name: string })[]; refreshing: boolean }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

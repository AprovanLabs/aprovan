# Schema Property Groups

## Operations

### `posthog.schemaPropertyGroupsList`

- **HTTP**: `GET /api/projects/{project_id}/schema_property_groups/`
- **OpenAPI operationId**: `schema_property_groups_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SchemaPropertyGroupsListInput = Parameters<typeof posthog.schemaPropertyGroupsList> extends [infer T, ...unknown[]] ? T : undefined;
type SchemaPropertyGroupsListOutput = Awaited<ReturnType<typeof posthog.schemaPropertyGroupsList>>;

const result: SchemaPropertyGroupsListOutput = await posthog.schemaPropertyGroupsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "...
```

### `posthog.schemaPropertyGroupsCreate`

- **HTTP**: `POST /api/projects/{project_id}/schema_property_groups/`
- **OpenAPI operationId**: `schema_property_groups_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"; is_required?: boolean; is_optional_in_types?: boolean;...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type SchemaPropertyGroupsCreateInput = Parameters<typeof posthog.schemaPropertyGroupsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SchemaPropertyGroupsCreateOutput = Awaited<ReturnType<typeof posthog.schemaPropertyGroupsCreate>>;

const result: SchemaPropertyGroupsCreateOutput = await posthog.schemaPropertyGroupsCreate();

// Result shape (from schema): { id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"; is_required?: boolean; is_optional_in_types?: boolean;...
```

### `posthog.schemaPropertyGroupsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/schema_property_groups/{id}/`
- **OpenAPI operationId**: `schema_property_groups_destroy`
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

type SchemaPropertyGroupsDestroyInput = Parameters<typeof posthog.schemaPropertyGroupsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SchemaPropertyGroupsDestroyOutput = Awaited<ReturnType<typeof posthog.schemaPropertyGroupsDestroy>>;

const result: SchemaPropertyGroupsDestroyOutput = await posthog.schemaPropertyGroupsDestroy();

// Result shape (from schema): unknown
```

### `posthog.schemaPropertyGroupsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/schema_property_groups/{id}/`
- **OpenAPI operationId**: `schema_property_groups_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"; is_required?: boolean; is_optional_in_types?: boolean;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SchemaPropertyGroupsRetrieveInput = Parameters<typeof posthog.schemaPropertyGroupsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SchemaPropertyGroupsRetrieveOutput = Awaited<ReturnType<typeof posthog.schemaPropertyGroupsRetrieve>>;

const result: SchemaPropertyGroupsRetrieveOutput = await posthog.schemaPropertyGroupsRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"; is_required?: boolean; is_optional_in_types?: boolean;...
```

### `posthog.schemaPropertyGroupsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/schema_property_groups/{id}/`
- **OpenAPI operationId**: `schema_property_groups_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"; is_required?: boolean; is_optional_in_types?: boolean;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SchemaPropertyGroupsPartialUpdateInput = Parameters<typeof posthog.schemaPropertyGroupsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SchemaPropertyGroupsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.schemaPropertyGroupsPartialUpdate>>;

const result: SchemaPropertyGroupsPartialUpdateOutput = await posthog.schemaPropertyGroupsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"; is_required?: boolean; is_optional_in_types?: boolean;...
```

### `posthog.schemaPropertyGroupsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/schema_property_groups/{id}/`
- **OpenAPI operationId**: `schema_property_groups_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"; is_required?: boolean; is_optional_in_types?: boolean;...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SchemaPropertyGroupsUpdateInput = Parameters<typeof posthog.schemaPropertyGroupsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SchemaPropertyGroupsUpdateOutput = Awaited<ReturnType<typeof posthog.schemaPropertyGroupsUpdate>>;

const result: SchemaPropertyGroupsUpdateOutput = await posthog.schemaPropertyGroupsUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"; is_required?: boolean; is_optional_in_types?: boolean;...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

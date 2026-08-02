# Event Schemas

## Operations

### `posthog.eventSchemasList`

- **HTTP**: `GET /api/projects/{project_id}/event_schemas/`
- **OpenAPI operationId**: `event_schemas_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; event_definition: string; property_group: { id: string; name: string; description?: string; properties?: ({ id: string; name: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventSchemasListInput = Parameters<typeof posthog.eventSchemasList> extends [infer T, ...unknown[]] ? T : undefined;
type EventSchemasListOutput = Awaited<ReturnType<typeof posthog.eventSchemasList>>;

const result: EventSchemasListOutput = await posthog.eventSchemasList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; event_definition: string; property_group: { id: string; name: string; description?: string; properties?: ({ id: string; name: stri...
```

### `posthog.eventSchemasCreate`

- **HTTP**: `POST /api/projects/{project_id}/event_schemas/`
- **OpenAPI operationId**: `event_schemas_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; event_definition: string; property_group: { id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EventSchemasCreateInput = Parameters<typeof posthog.eventSchemasCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EventSchemasCreateOutput = Awaited<ReturnType<typeof posthog.eventSchemasCreate>>;

const result: EventSchemasCreateOutput = await posthog.eventSchemasCreate();

// Result shape (from schema): { id: string; event_definition: string; property_group: { id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"...
```

### `posthog.eventSchemasDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/event_schemas/{id}/`
- **OpenAPI operationId**: `event_schemas_destroy`
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

type EventSchemasDestroyInput = Parameters<typeof posthog.eventSchemasDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EventSchemasDestroyOutput = Awaited<ReturnType<typeof posthog.eventSchemasDestroy>>;

const result: EventSchemasDestroyOutput = await posthog.eventSchemasDestroy();

// Result shape (from schema): unknown
```

### `posthog.eventSchemasPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/event_schemas/{id}/`
- **OpenAPI operationId**: `event_schemas_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; event_definition: string; property_group: { id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventSchemasPartialUpdateInput = Parameters<typeof posthog.eventSchemasPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EventSchemasPartialUpdateOutput = Awaited<ReturnType<typeof posthog.eventSchemasPartialUpdate>>;

const result: EventSchemasPartialUpdateOutput = await posthog.eventSchemasPartialUpdate();

// Result shape (from schema): { id: string; event_definition: string; property_group: { id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"...
```

### `posthog.eventSchemasUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/event_schemas/{id}/`
- **OpenAPI operationId**: `event_schemas_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; event_definition: string; property_group: { id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventSchemasUpdateInput = Parameters<typeof posthog.eventSchemasUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EventSchemasUpdateOutput = Awaited<ReturnType<typeof posthog.eventSchemasUpdate>>;

const result: EventSchemasUpdateOutput = await posthog.eventSchemasUpdate();

// Result shape (from schema): { id: string; event_definition: string; property_group: { id: string; name: string; description?: string; properties?: ({ id: string; name: string; property_type: "DateTime" | "String" | "Numeric" | "Boolean" | "Object"...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

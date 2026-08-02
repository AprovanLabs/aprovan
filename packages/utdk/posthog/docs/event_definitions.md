# Event Definitions

## Operations

### `posthog.eventDefinitionsList`

- **HTTP**: `GET /api/projects/{project_id}/event_definitions/`
- **OpenAPI operationId**: `event_definitions_list`
- **Path params**: None
- **Query params**: `exclude_hidden`, `exclude_stale`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; owner?: number | null; description?: string | null; tags?: (unknown)[]; created_at: string | null; updated_at: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventDefinitionsListInput = Parameters<typeof posthog.eventDefinitionsList> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsListOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsList>>;

const result: EventDefinitionsListOutput = await posthog.eventDefinitionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; owner?: number | null; description?: string | null; tags?: (unknown)[]; created_at: string | null; updated_at: strin...
```

### `posthog.eventDefinitionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/event_definitions/`
- **OpenAPI operationId**: `event_definitions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; owner?: number | null; description?: string | null; tags?: (unknown)[]; created_at: string | null; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; fir...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EventDefinitionsCreateInput = Parameters<typeof posthog.eventDefinitionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsCreateOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsCreate>>;

const result: EventDefinitionsCreateOutput = await posthog.eventDefinitionsCreate();

// Result shape (from schema): { id: string; name: string; owner?: number | null; description?: string | null; tags?: (unknown)[]; created_at: string | null; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; fir...
```

### `posthog.eventDefinitionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/event_definitions/{id}/`
- **OpenAPI operationId**: `event_definitions_destroy`
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

type EventDefinitionsDestroyInput = Parameters<typeof posthog.eventDefinitionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsDestroyOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsDestroy>>;

const result: EventDefinitionsDestroyOutput = await posthog.eventDefinitionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.eventDefinitionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/event_definitions/{id}/`
- **OpenAPI operationId**: `event_definitions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; owner?: number | null; description?: string | null; tags?: (unknown)[]; created_at: string | null; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; fir...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventDefinitionsRetrieveInput = Parameters<typeof posthog.eventDefinitionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsRetrieveOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsRetrieve>>;

const result: EventDefinitionsRetrieveOutput = await posthog.eventDefinitionsRetrieve();

// Result shape (from schema): { id: string; name: string; owner?: number | null; description?: string | null; tags?: (unknown)[]; created_at: string | null; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; fir...
```

### `posthog.eventDefinitionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/event_definitions/{id}/`
- **OpenAPI operationId**: `event_definitions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; owner?: number | null; description?: string | null; tags?: (unknown)[]; created_at: string | null; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; fir...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventDefinitionsPartialUpdateInput = Parameters<typeof posthog.eventDefinitionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsPartialUpdate>>;

const result: EventDefinitionsPartialUpdateOutput = await posthog.eventDefinitionsPartialUpdate();

// Result shape (from schema): { id: string; name: string; owner?: number | null; description?: string | null; tags?: (unknown)[]; created_at: string | null; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; fir...
```

### `posthog.eventDefinitionsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/event_definitions/{id}/`
- **OpenAPI operationId**: `event_definitions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; owner?: number | null; description?: string | null; tags?: (unknown)[]; created_at: string | null; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; fir...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventDefinitionsUpdateInput = Parameters<typeof posthog.eventDefinitionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsUpdateOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsUpdate>>;

const result: EventDefinitionsUpdateOutput = await posthog.eventDefinitionsUpdate();

// Result shape (from schema): { id: string; name: string; owner?: number | null; description?: string | null; tags?: (unknown)[]; created_at: string | null; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; fir...
```

### `posthog.eventDefinitionsMetricsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/event_definitions/{id}/metrics/`
- **OpenAPI operationId**: `event_definitions_metrics_retrieve`
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

type EventDefinitionsMetricsRetrieveInput = Parameters<typeof posthog.eventDefinitionsMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsMetricsRetrieve>>;

const result: EventDefinitionsMetricsRetrieveOutput = await posthog.eventDefinitionsMetricsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.eventDefinitionsBulkUpdateTagsCreate`

- **HTTP**: `POST /api/projects/{project_id}/event_definitions/bulk_update_tags/`
- **What it does**: Add, remove, or replace tags across multiple event definitions in one request.

Overrides ``TaggedItemViewSetMixin.bulk_update_tags``, which assumes integer PKs and runs
object-level access-control filtering. Event definitions use UUID PKs and are not an
object-level access-controlled resource — project membership (enforced by the viewset) is
the only boundary, matching the single-object update path — so this scopes by project and
skips the per-object editor check. Tags live on the base ``EventDefinition`` row, so it
operates there regardless of the enterprise extension.
- **OpenAPI operationId**: `event_definitions_bulk_update_tags_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ updated: ({ id: string; tags: (string)[] })[]; skipped: ({ id: string; reason: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventDefinitionsBulkUpdateTagsCreateInput = Parameters<typeof posthog.eventDefinitionsBulkUpdateTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsBulkUpdateTagsCreateOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsBulkUpdateTagsCreate>>;

const result: EventDefinitionsBulkUpdateTagsCreateOutput = await posthog.eventDefinitionsBulkUpdateTagsCreate();

// Result shape (from schema): { updated: ({ id: string; tags: (string)[] })[]; skipped: ({ id: string; reason: string })[] }
```

### `posthog.eventDefinitionsByNameRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/event_definitions/by_name/`
- **What it does**: Get event definition by exact name
- **OpenAPI operationId**: `event_definitions_by_name_retrieve`
- **Path params**: None
- **Query params**: `name`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; created_at?: string | null; last_seen_at?: string | null; last_updated_at: string; tags?: (unknown)[]; enforcement_mode?: "allow" | "reject"; primary_property?: string | null; is_action: bool...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventDefinitionsByNameRetrieveInput = Parameters<typeof posthog.eventDefinitionsByNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsByNameRetrieveOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsByNameRetrieve>>;

const result: EventDefinitionsByNameRetrieveOutput = await posthog.eventDefinitionsByNameRetrieve();

// Result shape (from schema): { id: string; name: string; created_at?: string | null; last_seen_at?: string | null; last_updated_at: string; tags?: (unknown)[]; enforcement_mode?: "allow" | "reject"; primary_property?: string | null; is_action: bool...
```

### `posthog.eventDefinitionsGolangRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/event_definitions/golang/`
- **OpenAPI operationId**: `event_definitions_golang_retrieve`
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

type EventDefinitionsGolangRetrieveInput = Parameters<typeof posthog.eventDefinitionsGolangRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsGolangRetrieveOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsGolangRetrieve>>;

const result: EventDefinitionsGolangRetrieveOutput = await posthog.eventDefinitionsGolangRetrieve();

// Result shape (from schema): unknown
```

### `posthog.eventDefinitionsPrimaryPropertiesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/event_definitions/primary_properties/`
- **What it does**: Resolve team-configured primary properties for event definitions.

The response only contains entries where a non-null primary_property is set on the
EventDefinition. Callers should fall back to the core taxonomy defaults client-side
for names not present in the response.
- **OpenAPI operationId**: `event_definitions_primary_properties_retrieve`
- **Path params**: None
- **Query params**: `names`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ primary_properties: { [key: string]: string | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventDefinitionsPrimaryPropertiesRetrieveInput = Parameters<typeof posthog.eventDefinitionsPrimaryPropertiesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsPrimaryPropertiesRetrieveOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsPrimaryPropertiesRetrieve>>;

const result: EventDefinitionsPrimaryPropertiesRetrieveOutput = await posthog.eventDefinitionsPrimaryPropertiesRetrieve();

// Result shape (from schema): { primary_properties: { [key: string]: string | undefined } }
```

### `posthog.eventDefinitionsPythonRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/event_definitions/python/`
- **OpenAPI operationId**: `event_definitions_python_retrieve`
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

type EventDefinitionsPythonRetrieveInput = Parameters<typeof posthog.eventDefinitionsPythonRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsPythonRetrieveOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsPythonRetrieve>>;

const result: EventDefinitionsPythonRetrieveOutput = await posthog.eventDefinitionsPythonRetrieve();

// Result shape (from schema): unknown
```

### `posthog.eventDefinitionsTypescriptRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/event_definitions/typescript/`
- **OpenAPI operationId**: `event_definitions_typescript_retrieve`
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

type EventDefinitionsTypescriptRetrieveInput = Parameters<typeof posthog.eventDefinitionsTypescriptRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventDefinitionsTypescriptRetrieveOutput = Awaited<ReturnType<typeof posthog.eventDefinitionsTypescriptRetrieve>>;

const result: EventDefinitionsTypescriptRetrieveOutput = await posthog.eventDefinitionsTypescriptRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# Property Definitions

## Operations

### `posthog.propertyDefinitionsList`

- **HTTP**: `GET /api/projects/{project_id}/property_definitions/`
- **OpenAPI operationId**: `property_definitions_list`
- **Path params**: None
- **Query params**: `event_names`, `exclude_core_properties`, `exclude_hidden`, `exclude_restricted`, `excluded_properties`, `filter_by_event_names`, `group_type_index`, `is_feature_flag`, `is_numerical`, `limit`, `offset`, `properties`, `search`, `type`, `verified`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; tags?: (unknown)[]; is_numerical: boolean; updated_at: string; updated_by: { id: number...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PropertyDefinitionsListInput = Parameters<typeof posthog.propertyDefinitionsList> extends [infer T, ...unknown[]] ? T : undefined;
type PropertyDefinitionsListOutput = Awaited<ReturnType<typeof posthog.propertyDefinitionsList>>;

const result: PropertyDefinitionsListOutput = await posthog.propertyDefinitionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; tags?: (unknown)[]; is_numerical: boolean; updated_at: string; updated_by: { id: number...
```

### `posthog.propertyDefinitionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/property_definitions/{id}/`
- **OpenAPI operationId**: `property_definitions_destroy`
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

type PropertyDefinitionsDestroyInput = Parameters<typeof posthog.propertyDefinitionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type PropertyDefinitionsDestroyOutput = Awaited<ReturnType<typeof posthog.propertyDefinitionsDestroy>>;

const result: PropertyDefinitionsDestroyOutput = await posthog.propertyDefinitionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.propertyDefinitionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/property_definitions/{id}/`
- **OpenAPI operationId**: `property_definitions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; tags?: (unknown)[]; is_numerical: boolean; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PropertyDefinitionsRetrieveInput = Parameters<typeof posthog.propertyDefinitionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PropertyDefinitionsRetrieveOutput = Awaited<ReturnType<typeof posthog.propertyDefinitionsRetrieve>>;

const result: PropertyDefinitionsRetrieveOutput = await posthog.propertyDefinitionsRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string | null; tags?: (unknown)[]; is_numerical: boolean; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name...
```

### `posthog.propertyDefinitionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/property_definitions/{id}/`
- **OpenAPI operationId**: `property_definitions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; tags?: (unknown)[]; is_numerical: boolean; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PropertyDefinitionsPartialUpdateInput = Parameters<typeof posthog.propertyDefinitionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type PropertyDefinitionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.propertyDefinitionsPartialUpdate>>;

const result: PropertyDefinitionsPartialUpdateOutput = await posthog.propertyDefinitionsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; tags?: (unknown)[]; is_numerical: boolean; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name...
```

### `posthog.propertyDefinitionsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/property_definitions/{id}/`
- **OpenAPI operationId**: `property_definitions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; tags?: (unknown)[]; is_numerical: boolean; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PropertyDefinitionsUpdateInput = Parameters<typeof posthog.propertyDefinitionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type PropertyDefinitionsUpdateOutput = Awaited<ReturnType<typeof posthog.propertyDefinitionsUpdate>>;

const result: PropertyDefinitionsUpdateOutput = await posthog.propertyDefinitionsUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; tags?: (unknown)[]; is_numerical: boolean; updated_at: string; updated_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name...
```

### `posthog.propertyDefinitionsBulkUpdateTagsCreate`

- **HTTP**: `POST /api/projects/{project_id}/property_definitions/bulk_update_tags/`
- **What it does**: Bulk update tags on multiple objects.

PAT access: this action has no ``required_scopes=`` on the decorator —
inheriting viewsets must add ``"bulk_update_tags"`` to their
``scope_object_write_actions`` list to accept personal API keys.
Without that opt-in, ``APIScopePermission`` rejects PAT requests with
"This action does not support personal API key access". Done per-viewset
so granting ``<scope>:write`` for one resource doesn't leak access to
sibling resources that share this mixin.

Accepts:
- {"ids": [...], "action": "add"|"remove"|"set", "tags": ["tag1", "tag2"]}

Actions:
- "add": Add tags to existing tags on each object
- "remove": Remove specific tags from each object
- "set": Replace all tags on each object with the provided list
- **OpenAPI operationId**: `property_definitions_bulk_update_tags_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ updated: ({ id: number; tags: (string)[] })[]; skipped: ({ id: number; reason: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PropertyDefinitionsBulkUpdateTagsCreateInput = Parameters<typeof posthog.propertyDefinitionsBulkUpdateTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type PropertyDefinitionsBulkUpdateTagsCreateOutput = Awaited<ReturnType<typeof posthog.propertyDefinitionsBulkUpdateTagsCreate>>;

const result: PropertyDefinitionsBulkUpdateTagsCreateOutput = await posthog.propertyDefinitionsBulkUpdateTagsCreate();

// Result shape (from schema): { updated: ({ id: number; tags: (string)[] })[]; skipped: ({ id: number; reason: string })[] }
```

### `posthog.propertyDefinitionsSeenTogetherRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/property_definitions/seen_together/`
- **What it does**: Allows a caller to provide a list of event names and a single property name
Returns a map of the event names to a boolean representing whether that property has ever been seen with that event_name
- **OpenAPI operationId**: `property_definitions_seen_together_retrieve`
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

type PropertyDefinitionsSeenTogetherRetrieveInput = Parameters<typeof posthog.propertyDefinitionsSeenTogetherRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PropertyDefinitionsSeenTogetherRetrieveOutput = Awaited<ReturnType<typeof posthog.propertyDefinitionsSeenTogetherRetrieve>>;

const result: PropertyDefinitionsSeenTogetherRetrieveOutput = await posthog.propertyDefinitionsSeenTogetherRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

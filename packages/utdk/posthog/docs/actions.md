# Actions

## Operations

### `posthog.actionsList`

- **HTTP**: `GET /api/projects/{project_id}/actions/`
- **OpenAPI operationId**: `actions_list`
- **Path params**: None
- **Query params**: `created_by`, `format`, `limit`, `offset`, `ordering`, `search`, `tags`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; name?: string | null; description?: string; tags?: (unknown)[]; post_to_slack?: boolean; slack_message_format?: string; steps?: ({...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ActionsListInput = Parameters<typeof posthog.actionsList> extends [infer T, ...unknown[]] ? T : undefined;
type ActionsListOutput = Awaited<ReturnType<typeof posthog.actionsList>>;

const result: ActionsListOutput = await posthog.actionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; name?: string | null; description?: string; tags?: (unknown)[]; post_to_slack?: boolean; slack_message_format?: string; steps?: ({...
```

### `posthog.actionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/actions/`
- **OpenAPI operationId**: `actions_create`
- **Path params**: None
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; tags?: (unknown)[]; post_to_slack?: boolean; slack_message_format?: string; steps?: ({ event?: string | null; properties?: unknown[] | null; selector?: string | ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ActionsCreateInput = Parameters<typeof posthog.actionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ActionsCreateOutput = Awaited<ReturnType<typeof posthog.actionsCreate>>;

const result: ActionsCreateOutput = await posthog.actionsCreate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; tags?: (unknown)[]; post_to_slack?: boolean; slack_message_format?: string; steps?: ({ event?: string | null; properties?: unknown[] | null; selector?: string | ...
```

### `posthog.actionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/actions/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `actions_destroy`
- **Path params**: `id`
- **Query params**: `format`
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

type ActionsDestroyInput = Parameters<typeof posthog.actionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ActionsDestroyOutput = Awaited<ReturnType<typeof posthog.actionsDestroy>>;

const result: ActionsDestroyOutput = await posthog.actionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.actionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/actions/{id}/`
- **OpenAPI operationId**: `actions_retrieve`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; tags?: (unknown)[]; post_to_slack?: boolean; slack_message_format?: string; steps?: ({ event?: string | null; properties?: unknown[] | null; selector?: string | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ActionsRetrieveInput = Parameters<typeof posthog.actionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ActionsRetrieveOutput = Awaited<ReturnType<typeof posthog.actionsRetrieve>>;

const result: ActionsRetrieveOutput = await posthog.actionsRetrieve();

// Result shape (from schema): { id: number; name?: string | null; description?: string; tags?: (unknown)[]; post_to_slack?: boolean; slack_message_format?: string; steps?: ({ event?: string | null; properties?: unknown[] | null; selector?: string | ...
```

### `posthog.actionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/actions/{id}/`
- **OpenAPI operationId**: `actions_partial_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; tags?: (unknown)[]; post_to_slack?: boolean; slack_message_format?: string; steps?: ({ event?: string | null; properties?: unknown[] | null; selector?: string | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ActionsPartialUpdateInput = Parameters<typeof posthog.actionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ActionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.actionsPartialUpdate>>;

const result: ActionsPartialUpdateOutput = await posthog.actionsPartialUpdate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; tags?: (unknown)[]; post_to_slack?: boolean; slack_message_format?: string; steps?: ({ event?: string | null; properties?: unknown[] | null; selector?: string | ...
```

### `posthog.actionsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/actions/{id}/`
- **OpenAPI operationId**: `actions_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name?: string | null; description?: string; tags?: (unknown)[]; post_to_slack?: boolean; slack_message_format?: string; steps?: ({ event?: string | null; properties?: unknown[] | null; selector?: string | ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ActionsUpdateInput = Parameters<typeof posthog.actionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ActionsUpdateOutput = Awaited<ReturnType<typeof posthog.actionsUpdate>>;

const result: ActionsUpdateOutput = await posthog.actionsUpdate();

// Result shape (from schema): { id: number; name?: string | null; description?: string; tags?: (unknown)[]; post_to_slack?: boolean; slack_message_format?: string; steps?: ({ event?: string | null; properties?: unknown[] | null; selector?: string | ...
```

### `posthog.actionsReferencesList`

- **HTTP**: `GET /api/projects/{project_id}/actions/{id}/references/`
- **OpenAPI operationId**: `actions_references_list`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ type: string; id: string; name: string; url: string; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_ve...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ActionsReferencesListInput = Parameters<typeof posthog.actionsReferencesList> extends [infer T, ...unknown[]] ? T : undefined;
type ActionsReferencesListOutput = Awaited<ReturnType<typeof posthog.actionsReferencesList>>;

const result: ActionsReferencesListOutput = await posthog.actionsReferencesList();

// Result shape (from schema): ({ type: string; id: string; name: string; url: string; created_at: string | null; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_ve...
```

### `posthog.actionsBulkUpdateTagsCreate`

- **HTTP**: `POST /api/projects/{project_id}/actions/bulk_update_tags/`
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
- **OpenAPI operationId**: `actions_bulk_update_tags_create`
- **Path params**: None
- **Query params**: `format`
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

type ActionsBulkUpdateTagsCreateInput = Parameters<typeof posthog.actionsBulkUpdateTagsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ActionsBulkUpdateTagsCreateOutput = Awaited<ReturnType<typeof posthog.actionsBulkUpdateTagsCreate>>;

const result: ActionsBulkUpdateTagsCreateOutput = await posthog.actionsBulkUpdateTagsCreate();

// Result shape (from schema): { updated: ({ id: number; tags: (string)[] })[]; skipped: ({ id: number; reason: string })[] }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

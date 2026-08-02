# Messaging Templates

## Operations

### `posthog.environmentsMessagingTemplatesList`

- **HTTP**: `GET /api/environments/{environment_id}/messaging_templates/`
- **OpenAPI operationId**: `environments_messaging_templates_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMessagingTemplatesListInput = Parameters<typeof posthog.environmentsMessagingTemplatesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMessagingTemplatesListOutput = Awaited<ReturnType<typeof posthog.environmentsMessagingTemplatesList>>;

const result: EnvironmentsMessagingTemplatesListOutput = await posthog.environmentsMessagingTemplatesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?:...
```

### `posthog.environmentsMessagingTemplatesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/messaging_templates/`
- **OpenAPI operationId**: `environments_messaging_templates_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMessagingTemplatesCreateInput = Parameters<typeof posthog.environmentsMessagingTemplatesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMessagingTemplatesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMessagingTemplatesCreate>>;

const result: EnvironmentsMessagingTemplatesCreateOutput = await posthog.environmentsMessagingTemplatesCreate();

// Result shape (from schema): { id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...
```

### `posthog.environmentsMessagingTemplatesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/messaging_templates/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_messaging_templates_destroy`
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

type EnvironmentsMessagingTemplatesDestroyInput = Parameters<typeof posthog.environmentsMessagingTemplatesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMessagingTemplatesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsMessagingTemplatesDestroy>>;

const result: EnvironmentsMessagingTemplatesDestroyOutput = await posthog.environmentsMessagingTemplatesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsMessagingTemplatesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/messaging_templates/{id}/`
- **OpenAPI operationId**: `environments_messaging_templates_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMessagingTemplatesRetrieveInput = Parameters<typeof posthog.environmentsMessagingTemplatesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMessagingTemplatesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMessagingTemplatesRetrieve>>;

const result: EnvironmentsMessagingTemplatesRetrieveOutput = await posthog.environmentsMessagingTemplatesRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...
```

### `posthog.environmentsMessagingTemplatesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/messaging_templates/{id}/`
- **OpenAPI operationId**: `environments_messaging_templates_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMessagingTemplatesPartialUpdateInput = Parameters<typeof posthog.environmentsMessagingTemplatesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMessagingTemplatesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsMessagingTemplatesPartialUpdate>>;

const result: EnvironmentsMessagingTemplatesPartialUpdateOutput = await posthog.environmentsMessagingTemplatesPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...
```

### `posthog.environmentsMessagingTemplatesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/messaging_templates/{id}/`
- **OpenAPI operationId**: `environments_messaging_templates_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMessagingTemplatesUpdateInput = Parameters<typeof posthog.environmentsMessagingTemplatesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMessagingTemplatesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsMessagingTemplatesUpdate>>;

const result: EnvironmentsMessagingTemplatesUpdateOutput = await posthog.environmentsMessagingTemplatesUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...
```

### `posthog.environmentsMessagingTemplatesDesignPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/messaging_templates/{id}/design/`
- **OpenAPI operationId**: `environments_messaging_templates_design_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMessagingTemplatesDesignPartialUpdateInput = Parameters<typeof posthog.environmentsMessagingTemplatesDesignPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMessagingTemplatesDesignPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsMessagingTemplatesDesignPartialUpdate>>;

const result: EnvironmentsMessagingTemplatesDesignPartialUpdateOutput = await posthog.environmentsMessagingTemplatesDesignPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...
```

### `posthog.messagingTemplatesList`

- **HTTP**: `GET /api/projects/{project_id}/messaging_templates/`
- **OpenAPI operationId**: `messaging_templates_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MessagingTemplatesListInput = Parameters<typeof posthog.messagingTemplatesList> extends [infer T, ...unknown[]] ? T : undefined;
type MessagingTemplatesListOutput = Awaited<ReturnType<typeof posthog.messagingTemplatesList>>;

const result: MessagingTemplatesListOutput = await posthog.messagingTemplatesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?:...
```

### `posthog.messagingTemplatesCreate`

- **HTTP**: `POST /api/projects/{project_id}/messaging_templates/`
- **OpenAPI operationId**: `messaging_templates_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type MessagingTemplatesCreateInput = Parameters<typeof posthog.messagingTemplatesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type MessagingTemplatesCreateOutput = Awaited<ReturnType<typeof posthog.messagingTemplatesCreate>>;

const result: MessagingTemplatesCreateOutput = await posthog.messagingTemplatesCreate();

// Result shape (from schema): { id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...
```

### `posthog.messagingTemplatesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/messaging_templates/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `messaging_templates_destroy`
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

type MessagingTemplatesDestroyInput = Parameters<typeof posthog.messagingTemplatesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type MessagingTemplatesDestroyOutput = Awaited<ReturnType<typeof posthog.messagingTemplatesDestroy>>;

const result: MessagingTemplatesDestroyOutput = await posthog.messagingTemplatesDestroy();

// Result shape (from schema): unknown
```

### `posthog.messagingTemplatesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/messaging_templates/{id}/`
- **OpenAPI operationId**: `messaging_templates_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MessagingTemplatesRetrieveInput = Parameters<typeof posthog.messagingTemplatesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type MessagingTemplatesRetrieveOutput = Awaited<ReturnType<typeof posthog.messagingTemplatesRetrieve>>;

const result: MessagingTemplatesRetrieveOutput = await posthog.messagingTemplatesRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...
```

### `posthog.messagingTemplatesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/messaging_templates/{id}/`
- **OpenAPI operationId**: `messaging_templates_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MessagingTemplatesPartialUpdateInput = Parameters<typeof posthog.messagingTemplatesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type MessagingTemplatesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.messagingTemplatesPartialUpdate>>;

const result: MessagingTemplatesPartialUpdateOutput = await posthog.messagingTemplatesPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...
```

### `posthog.messagingTemplatesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/messaging_templates/{id}/`
- **OpenAPI operationId**: `messaging_templates_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MessagingTemplatesUpdateInput = Parameters<typeof posthog.messagingTemplatesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type MessagingTemplatesUpdateOutput = Awaited<ReturnType<typeof posthog.messagingTemplatesUpdate>>;

const result: MessagingTemplatesUpdateOutput = await posthog.messagingTemplatesUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...
```

### `posthog.messagingTemplatesDesignPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/messaging_templates/{id}/design/`
- **OpenAPI operationId**: `messaging_templates_design_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MessagingTemplatesDesignPartialUpdateInput = Parameters<typeof posthog.messagingTemplatesDesignPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type MessagingTemplatesDesignPartialUpdateOutput = Awaited<ReturnType<typeof posthog.messagingTemplatesDesignPartialUpdate>>;

const result: MessagingTemplatesDesignPartialUpdateOutput = await posthog.messagingTemplatesDesignPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string; created_at: string; updated_at: string; content?: { templating?: "liquid"; email?: { subject?: string; text?: string; html?: string; design?: { counters?: { [key: string...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

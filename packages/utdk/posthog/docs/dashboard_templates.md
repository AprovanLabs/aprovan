# Dashboard Templates

## Operations

### `posthog.dashboardTemplatesList`

- **HTTP**: `GET /api/projects/{project_id}/dashboard_templates/`
- **OpenAPI operationId**: `dashboard_templates_list`
- **Path params**: None
- **Query params**: `is_featured`, `limit`, `offset`, `ordering`, `scope`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardTemplatesListInput = Parameters<typeof posthog.dashboardTemplatesList> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardTemplatesListOutput = Awaited<ReturnType<typeof posthog.dashboardTemplatesList>>;

const result: DashboardTemplatesListOutput = await posthog.dashboardTemplatesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?...
```

### `posthog.dashboardTemplatesCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboard_templates/`
- **OpenAPI operationId**: `dashboard_templates_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?: unknown; variables?: unknown; deleted?: boolean | null; created_at: strin...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DashboardTemplatesCreateInput = Parameters<typeof posthog.dashboardTemplatesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardTemplatesCreateOutput = Awaited<ReturnType<typeof posthog.dashboardTemplatesCreate>>;

const result: DashboardTemplatesCreateOutput = await posthog.dashboardTemplatesCreate();

// Result shape (from schema): { id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?: unknown; variables?: unknown; deleted?: boolean | null; created_at: strin...
```

### `posthog.dashboardTemplatesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/dashboard_templates/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `dashboard_templates_destroy`
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

type DashboardTemplatesDestroyInput = Parameters<typeof posthog.dashboardTemplatesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardTemplatesDestroyOutput = Awaited<ReturnType<typeof posthog.dashboardTemplatesDestroy>>;

const result: DashboardTemplatesDestroyOutput = await posthog.dashboardTemplatesDestroy();

// Result shape (from schema): unknown
```

### `posthog.dashboardTemplatesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/dashboard_templates/{id}/`
- **OpenAPI operationId**: `dashboard_templates_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?: unknown; variables?: unknown; deleted?: boolean | null; created_at: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardTemplatesRetrieveInput = Parameters<typeof posthog.dashboardTemplatesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardTemplatesRetrieveOutput = Awaited<ReturnType<typeof posthog.dashboardTemplatesRetrieve>>;

const result: DashboardTemplatesRetrieveOutput = await posthog.dashboardTemplatesRetrieve();

// Result shape (from schema): { id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?: unknown; variables?: unknown; deleted?: boolean | null; created_at: strin...
```

### `posthog.dashboardTemplatesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/dashboard_templates/{id}/`
- **OpenAPI operationId**: `dashboard_templates_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?: unknown; variables?: unknown; deleted?: boolean | null; created_at: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardTemplatesPartialUpdateInput = Parameters<typeof posthog.dashboardTemplatesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardTemplatesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.dashboardTemplatesPartialUpdate>>;

const result: DashboardTemplatesPartialUpdateOutput = await posthog.dashboardTemplatesPartialUpdate();

// Result shape (from schema): { id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?: unknown; variables?: unknown; deleted?: boolean | null; created_at: strin...
```

### `posthog.dashboardTemplatesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/dashboard_templates/{id}/`
- **OpenAPI operationId**: `dashboard_templates_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?: unknown; variables?: unknown; deleted?: boolean | null; created_at: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type DashboardTemplatesUpdateInput = Parameters<typeof posthog.dashboardTemplatesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardTemplatesUpdateOutput = Awaited<ReturnType<typeof posthog.dashboardTemplatesUpdate>>;

const result: DashboardTemplatesUpdateOutput = await posthog.dashboardTemplatesUpdate();

// Result shape (from schema): { id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?: unknown; variables?: unknown; deleted?: boolean | null; created_at: strin...
```

### `posthog.dashboardTemplatesCopyBetweenProjectsCreate`

- **HTTP**: `POST /api/projects/{project_id}/dashboard_templates/copy_between_projects/`
- **What it does**: Copy a team template to this project
- **OpenAPI operationId**: `dashboard_templates_copy_between_projects_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?: unknown; variables?: unknown; deleted?: boolean | null; created_at: strin...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type DashboardTemplatesCopyBetweenProjectsCreateInput = Parameters<typeof posthog.dashboardTemplatesCopyBetweenProjectsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardTemplatesCopyBetweenProjectsCreateOutput = Awaited<ReturnType<typeof posthog.dashboardTemplatesCopyBetweenProjectsCreate>>;

const result: DashboardTemplatesCopyBetweenProjectsCreateOutput = await posthog.dashboardTemplatesCopyBetweenProjectsCreate();

// Result shape (from schema): { id: string; template_name?: string | null; dashboard_description?: string | null; dashboard_filters?: unknown; tags?: unknown[] | null; tiles?: unknown; variables?: unknown; deleted?: boolean | null; created_at: strin...
```

### `posthog.dashboardTemplatesJsonSchemaRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/dashboard_templates/json_schema/`
- **OpenAPI operationId**: `dashboard_templates_json_schema_retrieve`
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

type DashboardTemplatesJsonSchemaRetrieveInput = Parameters<typeof posthog.dashboardTemplatesJsonSchemaRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type DashboardTemplatesJsonSchemaRetrieveOutput = Awaited<ReturnType<typeof posthog.dashboardTemplatesJsonSchemaRetrieve>>;

const result: DashboardTemplatesJsonSchemaRetrieveOutput = await posthog.dashboardTemplatesJsonSchemaRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

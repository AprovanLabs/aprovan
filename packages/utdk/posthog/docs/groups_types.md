# Groups Types

## Operations

### `posthog.groupsTypesList`

- **HTTP**: `GET /api/projects/{project_id}/groups_types/`
- **OpenAPI operationId**: `groups_types_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ group_type: string; group_type_index: number; name_singular?: string | null; name_plural?: string | null; detail_dashboard?: number | null; default_columns?: unknown[] | null; created_at?: string | null })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type GroupsTypesListInput = Parameters<typeof posthog.groupsTypesList> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesListOutput = Awaited<ReturnType<typeof posthog.groupsTypesList>>;

const result: GroupsTypesListOutput = await posthog.groupsTypesList();

// Result shape (from schema): ({ group_type: string; group_type_index: number; name_singular?: string | null; name_plural?: string | null; detail_dashboard?: number | null; default_columns?: unknown[] | null; created_at?: string | null })[]
```

### `posthog.groupsTypesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/groups_types/{group_type_index}/`
- **OpenAPI operationId**: `groups_types_destroy`
- **Path params**: `group_type_index`
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

type GroupsTypesDestroyInput = Parameters<typeof posthog.groupsTypesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesDestroyOutput = Awaited<ReturnType<typeof posthog.groupsTypesDestroy>>;

const result: GroupsTypesDestroyOutput = await posthog.groupsTypesDestroy();

// Result shape (from schema): unknown
```

### `posthog.groupsTypesMetricsList`

- **HTTP**: `GET /api/projects/{project_id}/groups_types/{group_type_index}/metrics/`
- **OpenAPI operationId**: `groups_types_metrics_list`
- **Path params**: `group_type_index`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; format?: "numeric" | "currency"; interval?: number; display?: "number" | "sparkline"; filters: { [key: string]: unkn...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type GroupsTypesMetricsListInput = Parameters<typeof posthog.groupsTypesMetricsList> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesMetricsListOutput = Awaited<ReturnType<typeof posthog.groupsTypesMetricsList>>;

const result: GroupsTypesMetricsListOutput = await posthog.groupsTypesMetricsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; format?: "numeric" | "currency"; interval?: number; display?: "number" | "sparkline"; filters: { [key: string]: unkn...
```

### `posthog.groupsTypesMetricsCreate`

- **HTTP**: `POST /api/projects/{project_id}/groups_types/{group_type_index}/metrics/`
- **OpenAPI operationId**: `groups_types_metrics_create`
- **Path params**: `group_type_index`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; format?: "numeric" | "currency"; interval?: number; display?: "number" | "sparkline"; filters: { [key: string]: unknown }; math?: "count" | "sum"; math_property?: string | null }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type GroupsTypesMetricsCreateInput = Parameters<typeof posthog.groupsTypesMetricsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesMetricsCreateOutput = Awaited<ReturnType<typeof posthog.groupsTypesMetricsCreate>>;

const result: GroupsTypesMetricsCreateOutput = await posthog.groupsTypesMetricsCreate();

// Result shape (from schema): { id: string; name: string; format?: "numeric" | "currency"; interval?: number; display?: "number" | "sparkline"; filters: { [key: string]: unknown }; math?: "count" | "sum"; math_property?: string | null }
```

### `posthog.groupsTypesMetricsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/groups_types/{group_type_index}/metrics/{id}/`
- **OpenAPI operationId**: `groups_types_metrics_destroy`
- **Path params**: `group_type_index`, `id`
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

type GroupsTypesMetricsDestroyInput = Parameters<typeof posthog.groupsTypesMetricsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesMetricsDestroyOutput = Awaited<ReturnType<typeof posthog.groupsTypesMetricsDestroy>>;

const result: GroupsTypesMetricsDestroyOutput = await posthog.groupsTypesMetricsDestroy();

// Result shape (from schema): unknown
```

### `posthog.groupsTypesMetricsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/groups_types/{group_type_index}/metrics/{id}/`
- **OpenAPI operationId**: `groups_types_metrics_retrieve`
- **Path params**: `group_type_index`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; format?: "numeric" | "currency"; interval?: number; display?: "number" | "sparkline"; filters: { [key: string]: unknown }; math?: "count" | "sum"; math_property?: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type GroupsTypesMetricsRetrieveInput = Parameters<typeof posthog.groupsTypesMetricsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesMetricsRetrieveOutput = Awaited<ReturnType<typeof posthog.groupsTypesMetricsRetrieve>>;

const result: GroupsTypesMetricsRetrieveOutput = await posthog.groupsTypesMetricsRetrieve();

// Result shape (from schema): { id: string; name: string; format?: "numeric" | "currency"; interval?: number; display?: "number" | "sparkline"; filters: { [key: string]: unknown }; math?: "count" | "sum"; math_property?: string | null }
```

### `posthog.groupsTypesMetricsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/groups_types/{group_type_index}/metrics/{id}/`
- **OpenAPI operationId**: `groups_types_metrics_partial_update`
- **Path params**: `group_type_index`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; format?: "numeric" | "currency"; interval?: number; display?: "number" | "sparkline"; filters: { [key: string]: unknown }; math?: "count" | "sum"; math_property?: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type GroupsTypesMetricsPartialUpdateInput = Parameters<typeof posthog.groupsTypesMetricsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesMetricsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.groupsTypesMetricsPartialUpdate>>;

const result: GroupsTypesMetricsPartialUpdateOutput = await posthog.groupsTypesMetricsPartialUpdate();

// Result shape (from schema): { id: string; name: string; format?: "numeric" | "currency"; interval?: number; display?: "number" | "sparkline"; filters: { [key: string]: unknown }; math?: "count" | "sum"; math_property?: string | null }
```

### `posthog.groupsTypesMetricsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/groups_types/{group_type_index}/metrics/{id}/`
- **OpenAPI operationId**: `groups_types_metrics_update`
- **Path params**: `group_type_index`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; format?: "numeric" | "currency"; interval?: number; display?: "number" | "sparkline"; filters: { [key: string]: unknown }; math?: "count" | "sum"; math_property?: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type GroupsTypesMetricsUpdateInput = Parameters<typeof posthog.groupsTypesMetricsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesMetricsUpdateOutput = Awaited<ReturnType<typeof posthog.groupsTypesMetricsUpdate>>;

const result: GroupsTypesMetricsUpdateOutput = await posthog.groupsTypesMetricsUpdate();

// Result shape (from schema): { id: string; name: string; format?: "numeric" | "currency"; interval?: number; display?: "number" | "sparkline"; filters: { [key: string]: unknown }; math?: "count" | "sum"; math_property?: string | null }
```

### `posthog.groupsTypesCreateDetailDashboardUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/groups_types/create_detail_dashboard/`
- **OpenAPI operationId**: `groups_types_create_detail_dashboard_update`
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

type GroupsTypesCreateDetailDashboardUpdateInput = Parameters<typeof posthog.groupsTypesCreateDetailDashboardUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesCreateDetailDashboardUpdateOutput = Awaited<ReturnType<typeof posthog.groupsTypesCreateDetailDashboardUpdate>>;

const result: GroupsTypesCreateDetailDashboardUpdateOutput = await posthog.groupsTypesCreateDetailDashboardUpdate();

// Result shape (from schema): unknown
```

### `posthog.groupsTypesSetDefaultColumnsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/groups_types/set_default_columns/`
- **OpenAPI operationId**: `groups_types_set_default_columns_update`
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

type GroupsTypesSetDefaultColumnsUpdateInput = Parameters<typeof posthog.groupsTypesSetDefaultColumnsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesSetDefaultColumnsUpdateOutput = Awaited<ReturnType<typeof posthog.groupsTypesSetDefaultColumnsUpdate>>;

const result: GroupsTypesSetDefaultColumnsUpdateOutput = await posthog.groupsTypesSetDefaultColumnsUpdate();

// Result shape (from schema): unknown
```

### `posthog.groupsTypesUpdateMetadataPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/groups_types/update_metadata/`
- **OpenAPI operationId**: `groups_types_update_metadata_partial_update`
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

type GroupsTypesUpdateMetadataPartialUpdateInput = Parameters<typeof posthog.groupsTypesUpdateMetadataPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsTypesUpdateMetadataPartialUpdateOutput = Awaited<ReturnType<typeof posthog.groupsTypesUpdateMetadataPartialUpdate>>;

const result: GroupsTypesUpdateMetadataPartialUpdateOutput = await posthog.groupsTypesUpdateMetadataPartialUpdate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

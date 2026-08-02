# Groups

## Operations

### `posthog.environmentsGroupsList`

- **HTTP**: `GET /api/environments/{environment_id}/groups/`
- **What it does**: List all groups of a specific group type. You must pass ?group_type_index= in the URL.
To get a list of valid group types, call /api/:project_id/groups_types/.

Uses forward-only keyset pagination via the `cursor` parameter.
The `previous` field in the response envelope is always null.
- **OpenAPI operationId**: `environments_groups_list`
- **Path params**: None
- **Query params**: `cursor`, `group_key`, `group_type_index`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ group_type_index: number; group_key: string; group_properties?: unknown; created_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsGroupsListInput = Parameters<typeof posthog.environmentsGroupsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsGroupsListOutput = Awaited<ReturnType<typeof posthog.environmentsGroupsList>>;

const result: EnvironmentsGroupsListOutput = await posthog.environmentsGroupsList();

// Result shape (from schema): ({ group_type_index: number; group_key: string; group_properties?: unknown; created_at: string })[]
```

### `posthog.environmentsGroupsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/groups/`
- **OpenAPI operationId**: `environments_groups_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ group_type_index: number; group_key: string; group_properties?: unknown; created_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsGroupsCreateInput = Parameters<typeof posthog.environmentsGroupsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsGroupsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsGroupsCreate>>;

const result: EnvironmentsGroupsCreateOutput = await posthog.environmentsGroupsCreate();

// Result shape (from schema): { group_type_index: number; group_key: string; group_properties?: unknown; created_at: string }
```

### `posthog.environmentsGroupsActivityRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/groups/activity/`
- **OpenAPI operationId**: `environments_groups_activity_retrieve`
- **Path params**: None
- **Query params**: `group_type_index`, `id`
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

type EnvironmentsGroupsActivityRetrieveInput = Parameters<typeof posthog.environmentsGroupsActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsGroupsActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsGroupsActivityRetrieve>>;

const result: EnvironmentsGroupsActivityRetrieveOutput = await posthog.environmentsGroupsActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsGroupsDeletePropertyCreate`

- **HTTP**: `POST /api/environments/{environment_id}/groups/delete_property/`
- **OpenAPI operationId**: `environments_groups_delete_property_create`
- **Path params**: None
- **Query params**: `group_key`, `group_type_index`
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

type EnvironmentsGroupsDeletePropertyCreateInput = Parameters<typeof posthog.environmentsGroupsDeletePropertyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsGroupsDeletePropertyCreateOutput = Awaited<ReturnType<typeof posthog.environmentsGroupsDeletePropertyCreate>>;

const result: EnvironmentsGroupsDeletePropertyCreateOutput = await posthog.environmentsGroupsDeletePropertyCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsGroupsFindRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/groups/find/`
- **OpenAPI operationId**: `environments_groups_find_retrieve`
- **Path params**: None
- **Query params**: `group_key`, `group_type_index`, `skip_create_notebook`
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

type EnvironmentsGroupsFindRetrieveInput = Parameters<typeof posthog.environmentsGroupsFindRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsGroupsFindRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsGroupsFindRetrieve>>;

const result: EnvironmentsGroupsFindRetrieveOutput = await posthog.environmentsGroupsFindRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsGroupsPropertyValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/groups/property_values/`
- **OpenAPI operationId**: `environments_groups_property_values_retrieve`
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

type EnvironmentsGroupsPropertyValuesRetrieveInput = Parameters<typeof posthog.environmentsGroupsPropertyValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsGroupsPropertyValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsGroupsPropertyValuesRetrieve>>;

const result: EnvironmentsGroupsPropertyValuesRetrieveOutput = await posthog.environmentsGroupsPropertyValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsGroupsRelatedRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/groups/related/`
- **OpenAPI operationId**: `environments_groups_related_retrieve`
- **Path params**: None
- **Query params**: `group_type_index`, `id`
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

type EnvironmentsGroupsRelatedRetrieveInput = Parameters<typeof posthog.environmentsGroupsRelatedRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsGroupsRelatedRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsGroupsRelatedRetrieve>>;

const result: EnvironmentsGroupsRelatedRetrieveOutput = await posthog.environmentsGroupsRelatedRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsGroupsUpdatePropertyCreate`

- **HTTP**: `POST /api/environments/{environment_id}/groups/update_property/`
- **OpenAPI operationId**: `environments_groups_update_property_create`
- **Path params**: None
- **Query params**: `group_key`, `group_type_index`
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

type EnvironmentsGroupsUpdatePropertyCreateInput = Parameters<typeof posthog.environmentsGroupsUpdatePropertyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsGroupsUpdatePropertyCreateOutput = Awaited<ReturnType<typeof posthog.environmentsGroupsUpdatePropertyCreate>>;

const result: EnvironmentsGroupsUpdatePropertyCreateOutput = await posthog.environmentsGroupsUpdatePropertyCreate();

// Result shape (from schema): unknown
```

### `posthog.groupsList`

- **HTTP**: `GET /api/projects/{project_id}/groups/`
- **What it does**: List all groups of a specific group type. You must pass ?group_type_index= in the URL.
To get a list of valid group types, call /api/:project_id/groups_types/.

Uses forward-only keyset pagination via the `cursor` parameter.
The `previous` field in the response envelope is always null.
- **OpenAPI operationId**: `groups_list`
- **Path params**: None
- **Query params**: `cursor`, `group_key`, `group_type_index`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ group_type_index: number; group_key: string; group_properties?: unknown; created_at: string })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type GroupsListInput = Parameters<typeof posthog.groupsList> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsListOutput = Awaited<ReturnType<typeof posthog.groupsList>>;

const result: GroupsListOutput = await posthog.groupsList();

// Result shape (from schema): ({ group_type_index: number; group_key: string; group_properties?: unknown; created_at: string })[]
```

### `posthog.groupsCreate`

- **HTTP**: `POST /api/projects/{project_id}/groups/`
- **OpenAPI operationId**: `groups_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ group_type_index: number; group_key: string; group_properties?: unknown; created_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type GroupsCreateInput = Parameters<typeof posthog.groupsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsCreateOutput = Awaited<ReturnType<typeof posthog.groupsCreate>>;

const result: GroupsCreateOutput = await posthog.groupsCreate();

// Result shape (from schema): { group_type_index: number; group_key: string; group_properties?: unknown; created_at: string }
```

### `posthog.groupsActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/groups/activity/`
- **OpenAPI operationId**: `groups_activity_retrieve`
- **Path params**: None
- **Query params**: `group_type_index`, `id`
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

type GroupsActivityRetrieveInput = Parameters<typeof posthog.groupsActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.groupsActivityRetrieve>>;

const result: GroupsActivityRetrieveOutput = await posthog.groupsActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.groupsDeletePropertyCreate`

- **HTTP**: `POST /api/projects/{project_id}/groups/delete_property/`
- **OpenAPI operationId**: `groups_delete_property_create`
- **Path params**: None
- **Query params**: `group_key`, `group_type_index`
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

type GroupsDeletePropertyCreateInput = Parameters<typeof posthog.groupsDeletePropertyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsDeletePropertyCreateOutput = Awaited<ReturnType<typeof posthog.groupsDeletePropertyCreate>>;

const result: GroupsDeletePropertyCreateOutput = await posthog.groupsDeletePropertyCreate();

// Result shape (from schema): unknown
```

### `posthog.groupsFindRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/groups/find/`
- **OpenAPI operationId**: `groups_find_retrieve`
- **Path params**: None
- **Query params**: `group_key`, `group_type_index`, `skip_create_notebook`
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

type GroupsFindRetrieveInput = Parameters<typeof posthog.groupsFindRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsFindRetrieveOutput = Awaited<ReturnType<typeof posthog.groupsFindRetrieve>>;

const result: GroupsFindRetrieveOutput = await posthog.groupsFindRetrieve();

// Result shape (from schema): unknown
```

### `posthog.groupsPropertyValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/groups/property_values/`
- **OpenAPI operationId**: `groups_property_values_retrieve`
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

type GroupsPropertyValuesRetrieveInput = Parameters<typeof posthog.groupsPropertyValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsPropertyValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.groupsPropertyValuesRetrieve>>;

const result: GroupsPropertyValuesRetrieveOutput = await posthog.groupsPropertyValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.groupsRelatedRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/groups/related/`
- **OpenAPI operationId**: `groups_related_retrieve`
- **Path params**: None
- **Query params**: `group_type_index`, `id`
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

type GroupsRelatedRetrieveInput = Parameters<typeof posthog.groupsRelatedRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsRelatedRetrieveOutput = Awaited<ReturnType<typeof posthog.groupsRelatedRetrieve>>;

const result: GroupsRelatedRetrieveOutput = await posthog.groupsRelatedRetrieve();

// Result shape (from schema): unknown
```

### `posthog.groupsUpdatePropertyCreate`

- **HTTP**: `POST /api/projects/{project_id}/groups/update_property/`
- **OpenAPI operationId**: `groups_update_property_create`
- **Path params**: None
- **Query params**: `group_key`, `group_type_index`
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

type GroupsUpdatePropertyCreateInput = Parameters<typeof posthog.groupsUpdatePropertyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type GroupsUpdatePropertyCreateOutput = Awaited<ReturnType<typeof posthog.groupsUpdatePropertyCreate>>;

const result: GroupsUpdatePropertyCreateOutput = await posthog.groupsUpdatePropertyCreate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

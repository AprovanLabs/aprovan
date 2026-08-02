# Property Access Controls

## Operations

### `posthog.environmentsPropertyAccessControlsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/property_access_controls/`
- **What it does**: Delete a property access control rule. The rule is identified by `property_definition_id` plus an optional `organization_member` or `role` query parameter. Omitting both targets deletes the default rule.
- **OpenAPI operationId**: `environments_property_access_controls_destroy`
- **Path params**: None
- **Query params**: `organization_member`, `property_definition_id`, `role`
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

type EnvironmentsPropertyAccessControlsDestroyInput = Parameters<typeof posthog.environmentsPropertyAccessControlsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPropertyAccessControlsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsPropertyAccessControlsDestroy>>;

const result: EnvironmentsPropertyAccessControlsDestroyOutput = await posthog.environmentsPropertyAccessControlsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsPropertyAccessControlsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/property_access_controls/`
- **What it does**: Get all property access control rules for a property definition.
- **OpenAPI operationId**: `environments_property_access_controls_retrieve`
- **Path params**: None
- **Query params**: `property_definition_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ access_controls: ({ id: string; access_level: "read_write" | "read" | "none"; organization_member: string | null; role: string | null; created_by: number | null; created_at: string; updated_at: string })[]; available_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPropertyAccessControlsRetrieveInput = Parameters<typeof posthog.environmentsPropertyAccessControlsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPropertyAccessControlsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPropertyAccessControlsRetrieve>>;

const result: EnvironmentsPropertyAccessControlsRetrieveOutput = await posthog.environmentsPropertyAccessControlsRetrieve();

// Result shape (from schema): { access_controls: ({ id: string; access_level: "read_write" | "read" | "none"; organization_member: string | null; role: string | null; created_by: number | null; created_at: string; updated_at: string })[]; available_...
```

### `posthog.environmentsPropertyAccessControlsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/property_access_controls/`
- **What it does**: Create or update a property access control rule.
- **OpenAPI operationId**: `environments_property_access_controls_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; access_level: "read_write" | "read" | "none"; organization_member: string | null; role: string | null; created_by: number | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPropertyAccessControlsCreateInput = Parameters<typeof posthog.environmentsPropertyAccessControlsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPropertyAccessControlsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsPropertyAccessControlsCreate>>;

const result: EnvironmentsPropertyAccessControlsCreateOutput = await posthog.environmentsPropertyAccessControlsCreate();

// Result shape (from schema): { id: string; access_level: "read_write" | "read" | "none"; organization_member: string | null; role: string | null; created_by: number | null; created_at: string; updated_at: string }
```

### `posthog.propertyAccessControlsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/property_access_controls/`
- **What it does**: Delete a property access control rule. The rule is identified by `property_definition_id` plus an optional `organization_member` or `role` query parameter. Omitting both targets deletes the default rule.
- **OpenAPI operationId**: `property_access_controls_destroy`
- **Path params**: None
- **Query params**: `organization_member`, `property_definition_id`, `role`
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

type PropertyAccessControlsDestroyInput = Parameters<typeof posthog.propertyAccessControlsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type PropertyAccessControlsDestroyOutput = Awaited<ReturnType<typeof posthog.propertyAccessControlsDestroy>>;

const result: PropertyAccessControlsDestroyOutput = await posthog.propertyAccessControlsDestroy();

// Result shape (from schema): unknown
```

### `posthog.propertyAccessControlsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/property_access_controls/`
- **What it does**: Get all property access control rules for a property definition.
- **OpenAPI operationId**: `property_access_controls_retrieve`
- **Path params**: None
- **Query params**: `property_definition_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ access_controls: ({ id: string; access_level: "read_write" | "read" | "none"; organization_member: string | null; role: string | null; created_by: number | null; created_at: string; updated_at: string })[]; available_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PropertyAccessControlsRetrieveInput = Parameters<typeof posthog.propertyAccessControlsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PropertyAccessControlsRetrieveOutput = Awaited<ReturnType<typeof posthog.propertyAccessControlsRetrieve>>;

const result: PropertyAccessControlsRetrieveOutput = await posthog.propertyAccessControlsRetrieve();

// Result shape (from schema): { access_controls: ({ id: string; access_level: "read_write" | "read" | "none"; organization_member: string | null; role: string | null; created_by: number | null; created_at: string; updated_at: string })[]; available_...
```

### `posthog.propertyAccessControlsCreate`

- **HTTP**: `POST /api/projects/{project_id}/property_access_controls/`
- **What it does**: Create or update a property access control rule.
- **OpenAPI operationId**: `property_access_controls_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; access_level: "read_write" | "read" | "none"; organization_member: string | null; role: string | null; created_by: number | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PropertyAccessControlsCreateInput = Parameters<typeof posthog.propertyAccessControlsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type PropertyAccessControlsCreateOutput = Awaited<ReturnType<typeof posthog.propertyAccessControlsCreate>>;

const result: PropertyAccessControlsCreateOutput = await posthog.propertyAccessControlsCreate();

// Result shape (from schema): { id: string; access_level: "read_write" | "read" | "none"; organization_member: string | null; role: string | null; created_by: number | null; created_at: string; updated_at: string }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

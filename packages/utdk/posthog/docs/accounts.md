# Accounts

## Operations

### `posthog.environmentsAccountsList`

- **HTTP**: `GET /api/environments/{environment_id}/accounts/`
- **OpenAPI operationId**: `environments_accounts_list`
- **Path params**: None
- **Query params**: `account_executive`, `account_owner`, `all_roles_unassigned`, `csm`, `limit`, `offset`, `ordering`, `search`, `tags`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAccountsListInput = Parameters<typeof posthog.environmentsAccountsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAccountsListOutput = Awaited<ReturnType<typeof posthog.environmentsAccountsList>>;

const result: EnvironmentsAccountsListOutput = await posthog.environmentsAccountsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[...
```

### `posthog.environmentsAccountsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/accounts/`
- **OpenAPI operationId**: `environments_accounts_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAccountsCreateInput = Parameters<typeof posthog.environmentsAccountsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAccountsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsAccountsCreate>>;

const result: EnvironmentsAccountsCreateOutput = await posthog.environmentsAccountsCreate();

// Result shape (from schema): { id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...
```

### `posthog.environmentsAccountsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/accounts/{id}/`
- **OpenAPI operationId**: `environments_accounts_destroy`
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

type EnvironmentsAccountsDestroyInput = Parameters<typeof posthog.environmentsAccountsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAccountsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsAccountsDestroy>>;

const result: EnvironmentsAccountsDestroyOutput = await posthog.environmentsAccountsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsAccountsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/accounts/{id}/`
- **OpenAPI operationId**: `environments_accounts_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAccountsRetrieveInput = Parameters<typeof posthog.environmentsAccountsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAccountsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsAccountsRetrieve>>;

const result: EnvironmentsAccountsRetrieveOutput = await posthog.environmentsAccountsRetrieve();

// Result shape (from schema): { id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...
```

### `posthog.environmentsAccountsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/accounts/{id}/`
- **OpenAPI operationId**: `environments_accounts_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAccountsPartialUpdateInput = Parameters<typeof posthog.environmentsAccountsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAccountsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsAccountsPartialUpdate>>;

const result: EnvironmentsAccountsPartialUpdateOutput = await posthog.environmentsAccountsPartialUpdate();

// Result shape (from schema): { id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...
```

### `posthog.environmentsAccountsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/accounts/{id}/`
- **OpenAPI operationId**: `environments_accounts_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAccountsUpdateInput = Parameters<typeof posthog.environmentsAccountsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAccountsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsAccountsUpdate>>;

const result: EnvironmentsAccountsUpdateOutput = await posthog.environmentsAccountsUpdate();

// Result shape (from schema): { id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...
```

### `posthog.accountsList`

- **HTTP**: `GET /api/projects/{project_id}/accounts/`
- **OpenAPI operationId**: `accounts_list`
- **Path params**: None
- **Query params**: `account_executive`, `account_owner`, `all_roles_unassigned`, `csm`, `limit`, `offset`, `ordering`, `search`, `tags`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountsListInput = Parameters<typeof posthog.accountsList> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsListOutput = Awaited<ReturnType<typeof posthog.accountsList>>;

const result: AccountsListOutput = await posthog.accountsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[...
```

### `posthog.accountsCreate`

- **HTTP**: `POST /api/projects/{project_id}/accounts/`
- **OpenAPI operationId**: `accounts_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type AccountsCreateInput = Parameters<typeof posthog.accountsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsCreateOutput = Awaited<ReturnType<typeof posthog.accountsCreate>>;

const result: AccountsCreateOutput = await posthog.accountsCreate();

// Result shape (from schema): { id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...
```

### `posthog.accountsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/accounts/{id}/`
- **OpenAPI operationId**: `accounts_destroy`
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

type AccountsDestroyInput = Parameters<typeof posthog.accountsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsDestroyOutput = Awaited<ReturnType<typeof posthog.accountsDestroy>>;

const result: AccountsDestroyOutput = await posthog.accountsDestroy();

// Result shape (from schema): unknown
```

### `posthog.accountsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/accounts/{id}/`
- **OpenAPI operationId**: `accounts_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountsRetrieveInput = Parameters<typeof posthog.accountsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsRetrieveOutput = Awaited<ReturnType<typeof posthog.accountsRetrieve>>;

const result: AccountsRetrieveOutput = await posthog.accountsRetrieve();

// Result shape (from schema): { id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...
```

### `posthog.accountsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/accounts/{id}/`
- **OpenAPI operationId**: `accounts_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountsPartialUpdateInput = Parameters<typeof posthog.accountsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.accountsPartialUpdate>>;

const result: AccountsPartialUpdateOutput = await posthog.accountsPartialUpdate();

// Result shape (from schema): { id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...
```

### `posthog.accountsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/accounts/{id}/`
- **OpenAPI operationId**: `accounts_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountsUpdateInput = Parameters<typeof posthog.accountsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsUpdateOutput = Awaited<ReturnType<typeof posthog.accountsUpdate>>;

const result: AccountsUpdateOutput = await posthog.accountsUpdate();

// Result shape (from schema): { id: string; name: string; external_id?: string | null; properties?: { [key: string]: unknown } | null; tags?: (string)[]; notebooks: (string)[]; created_at: string; created_by: number | null; updated_at: string | null...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

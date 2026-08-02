# Customer Analytics

## Operations

### `posthog.environmentsAccountsNotebooksList`

- **HTTP**: `GET /api/environments/{environment_id}/accounts/{account_id}/notebooks/`
- **OpenAPI operationId**: `environments_accounts_notebooks_list`
- **Path params**: `account_id`
- **Query params**: `limit`, `offset`, `ordering`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAccountsNotebooksListInput = Parameters<typeof posthog.environmentsAccountsNotebooksList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAccountsNotebooksListOutput = Awaited<ReturnType<typeof posthog.environmentsAccountsNotebooksList>>;

const result: EnvironmentsAccountsNotebooksListOutput = await posthog.environmentsAccountsNotebooksList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: nu...
```

### `posthog.environmentsAccountsNotebooksCreate`

- **HTTP**: `POST /api/environments/{environment_id}/accounts/{account_id}/notebooks/`
- **OpenAPI operationId**: `environments_accounts_notebooks_create`
- **Path params**: `account_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAccountsNotebooksCreateInput = Parameters<typeof posthog.environmentsAccountsNotebooksCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAccountsNotebooksCreateOutput = Awaited<ReturnType<typeof posthog.environmentsAccountsNotebooksCreate>>;

const result: EnvironmentsAccountsNotebooksCreateOutput = await posthog.environmentsAccountsNotebooksCreate();

// Result shape (from schema): { id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_...
```

### `posthog.environmentsAccountsNotebooksDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/accounts/{account_id}/notebooks/{short_id}/`
- **OpenAPI operationId**: `environments_accounts_notebooks_destroy`
- **Path params**: `account_id`, `short_id`
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

type EnvironmentsAccountsNotebooksDestroyInput = Parameters<typeof posthog.environmentsAccountsNotebooksDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAccountsNotebooksDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsAccountsNotebooksDestroy>>;

const result: EnvironmentsAccountsNotebooksDestroyOutput = await posthog.environmentsAccountsNotebooksDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsAccountsNotebooksRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/accounts/{account_id}/notebooks/{short_id}/`
- **OpenAPI operationId**: `environments_accounts_notebooks_retrieve`
- **Path params**: `account_id`, `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsAccountsNotebooksRetrieveInput = Parameters<typeof posthog.environmentsAccountsNotebooksRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsAccountsNotebooksRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsAccountsNotebooksRetrieve>>;

const result: EnvironmentsAccountsNotebooksRetrieveOutput = await posthog.environmentsAccountsNotebooksRetrieve();

// Result shape (from schema): { id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_...
```

### `posthog.accountNotesList`

- **HTTP**: `GET /api/projects/{project_id}/account_notes/`
- **OpenAPI operationId**: `account_notes_list`
- **Path params**: None
- **Query params**: `account_id`, `assigned_to`, `created_by`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ short_id: string; title: string | null; created_at: string; last_modified_at: string; account_id: string; account_name: string; created_by: { ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountNotesListInput = Parameters<typeof posthog.accountNotesList> extends [infer T, ...unknown[]] ? T : undefined;
type AccountNotesListOutput = Awaited<ReturnType<typeof posthog.accountNotesList>>;

const result: AccountNotesListOutput = await posthog.accountNotesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ short_id: string; title: string | null; created_at: string; last_modified_at: string; account_id: string; account_name: string; created_by: { ...
```

### `posthog.accountsCustomPropertyValuesList`

- **HTTP**: `GET /api/projects/{project_id}/accounts/{account_id}/custom_property_values/`
- **OpenAPI operationId**: `accounts_custom_property_values_list`
- **Path params**: `account_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; account_id: string; definition_id: string; value: string | number | boolean; created_at: string; created_by_id: number | null })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountsCustomPropertyValuesListInput = Parameters<typeof posthog.accountsCustomPropertyValuesList> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsCustomPropertyValuesListOutput = Awaited<ReturnType<typeof posthog.accountsCustomPropertyValuesList>>;

const result: AccountsCustomPropertyValuesListOutput = await posthog.accountsCustomPropertyValuesList();

// Result shape (from schema): ({ id: string; account_id: string; definition_id: string; value: string | number | boolean; created_at: string; created_by_id: number | null })[]
```

### `posthog.accountsCustomPropertyValuesCreate`

- **HTTP**: `POST /api/projects/{project_id}/accounts/{account_id}/custom_property_values/`
- **OpenAPI operationId**: `accounts_custom_property_values_create`
- **Path params**: `account_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; account_id: string; definition_id: string; value: string | number | boolean; created_at: string; created_by_id: number | null }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type AccountsCustomPropertyValuesCreateInput = Parameters<typeof posthog.accountsCustomPropertyValuesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsCustomPropertyValuesCreateOutput = Awaited<ReturnType<typeof posthog.accountsCustomPropertyValuesCreate>>;

const result: AccountsCustomPropertyValuesCreateOutput = await posthog.accountsCustomPropertyValuesCreate();

// Result shape (from schema): { id: string; account_id: string; definition_id: string; value: string | number | boolean; created_at: string; created_by_id: number | null }
```

### `posthog.accountsNotebooksList`

- **HTTP**: `GET /api/projects/{project_id}/accounts/{account_id}/notebooks/`
- **OpenAPI operationId**: `accounts_notebooks_list`
- **Path params**: `account_id`
- **Query params**: `limit`, `offset`, `ordering`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountsNotebooksListInput = Parameters<typeof posthog.accountsNotebooksList> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsNotebooksListOutput = Awaited<ReturnType<typeof posthog.accountsNotebooksList>>;

const result: AccountsNotebooksListOutput = await posthog.accountsNotebooksList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: nu...
```

### `posthog.accountsNotebooksCreate`

- **HTTP**: `POST /api/projects/{project_id}/accounts/{account_id}/notebooks/`
- **OpenAPI operationId**: `accounts_notebooks_create`
- **Path params**: `account_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type AccountsNotebooksCreateInput = Parameters<typeof posthog.accountsNotebooksCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsNotebooksCreateOutput = Awaited<ReturnType<typeof posthog.accountsNotebooksCreate>>;

const result: AccountsNotebooksCreateOutput = await posthog.accountsNotebooksCreate();

// Result shape (from schema): { id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_...
```

### `posthog.accountsNotebooksDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/accounts/{account_id}/notebooks/{short_id}/`
- **OpenAPI operationId**: `accounts_notebooks_destroy`
- **Path params**: `account_id`, `short_id`
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

type AccountsNotebooksDestroyInput = Parameters<typeof posthog.accountsNotebooksDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsNotebooksDestroyOutput = Awaited<ReturnType<typeof posthog.accountsNotebooksDestroy>>;

const result: AccountsNotebooksDestroyOutput = await posthog.accountsNotebooksDestroy();

// Result shape (from schema): unknown
```

### `posthog.accountsNotebooksRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/accounts/{account_id}/notebooks/{short_id}/`
- **OpenAPI operationId**: `accounts_notebooks_retrieve`
- **Path params**: `account_id`, `short_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountsNotebooksRetrieveInput = Parameters<typeof posthog.accountsNotebooksRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsNotebooksRetrieveOutput = Awaited<ReturnType<typeof posthog.accountsNotebooksRetrieve>>;

const result: AccountsNotebooksRetrieveOutput = await posthog.accountsNotebooksRetrieve();

// Result shape (from schema): { id: string; short_id: string; title?: string | null; content?: unknown; text_content?: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_...
```

### `posthog.accountsRelationshipsList`

- **HTTP**: `GET /api/projects/{project_id}/accounts/{account_id}/relationships/`
- **OpenAPI operationId**: `accounts_relationships_list`
- **Path params**: `account_id`
- **Query params**: `include_history`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ id: string; definition: { id: string; name: string; description?: string | null; is_single_holder?: boolean }; user: { id: number; email: string } | null; started_at: string; ended_at: string | null })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountsRelationshipsListInput = Parameters<typeof posthog.accountsRelationshipsList> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsRelationshipsListOutput = Awaited<ReturnType<typeof posthog.accountsRelationshipsList>>;

const result: AccountsRelationshipsListOutput = await posthog.accountsRelationshipsList();

// Result shape (from schema): ({ id: string; definition: { id: string; name: string; description?: string | null; is_single_holder?: boolean }; user: { id: number; email: string } | null; started_at: string; ended_at: string | null })[]
```

### `posthog.accountsRelationshipsCreate`

- **HTTP**: `POST /api/projects/{project_id}/accounts/{account_id}/relationships/`
- **OpenAPI operationId**: `accounts_relationships_create`
- **Path params**: `account_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; definition: { id: string; name: string; description?: string | null; is_single_holder?: boolean }; user: { id: number; email: string } | null; started_at: string; ended_at: string | null }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type AccountsRelationshipsCreateInput = Parameters<typeof posthog.accountsRelationshipsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsRelationshipsCreateOutput = Awaited<ReturnType<typeof posthog.accountsRelationshipsCreate>>;

const result: AccountsRelationshipsCreateOutput = await posthog.accountsRelationshipsCreate();

// Result shape (from schema): { id: string; definition: { id: string; name: string; description?: string | null; is_single_holder?: boolean }; user: { id: number; email: string } | null; started_at: string; ended_at: string | null }
```

### `posthog.accountsRelationshipsEndCreate`

- **HTTP**: `POST /api/projects/{project_id}/accounts/{account_id}/relationships/{id}/end/`
- **OpenAPI operationId**: `accounts_relationships_end_create`
- **Path params**: `account_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; definition: { id: string; name: string; description?: string | null; is_single_holder?: boolean }; user: { id: number; email: string } | null; started_at: string; ended_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountsRelationshipsEndCreateInput = Parameters<typeof posthog.accountsRelationshipsEndCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AccountsRelationshipsEndCreateOutput = Awaited<ReturnType<typeof posthog.accountsRelationshipsEndCreate>>;

const result: AccountsRelationshipsEndCreateOutput = await posthog.accountsRelationshipsEndCreate();

// Result shape (from schema): { id: string; definition: { id: string; name: string; description?: string | null; is_single_holder?: boolean }; user: { id: number; email: string } | null; started_at: string; ended_at: string | null }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

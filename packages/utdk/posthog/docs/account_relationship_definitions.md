# Account Relationship Definitions

## Operations

### `posthog.accountRelationshipDefinitionsList`

- **HTTP**: `GET /api/projects/{project_id}/account_relationship_definitions/`
- **OpenAPI operationId**: `account_relationship_definitions_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; is_single_holder?: boolean })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountRelationshipDefinitionsListInput = Parameters<typeof posthog.accountRelationshipDefinitionsList> extends [infer T, ...unknown[]] ? T : undefined;
type AccountRelationshipDefinitionsListOutput = Awaited<ReturnType<typeof posthog.accountRelationshipDefinitionsList>>;

const result: AccountRelationshipDefinitionsListOutput = await posthog.accountRelationshipDefinitionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description?: string | null; is_single_holder?: boolean })[] }
```

### `posthog.accountRelationshipDefinitionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/account_relationship_definitions/`
- **OpenAPI operationId**: `account_relationship_definitions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; is_single_holder?: boolean }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type AccountRelationshipDefinitionsCreateInput = Parameters<typeof posthog.accountRelationshipDefinitionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AccountRelationshipDefinitionsCreateOutput = Awaited<ReturnType<typeof posthog.accountRelationshipDefinitionsCreate>>;

const result: AccountRelationshipDefinitionsCreateOutput = await posthog.accountRelationshipDefinitionsCreate();

// Result shape (from schema): { id: string; name: string; description?: string | null; is_single_holder?: boolean }
```

### `posthog.accountRelationshipDefinitionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/account_relationship_definitions/{id}/`
- **OpenAPI operationId**: `account_relationship_definitions_destroy`
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

type AccountRelationshipDefinitionsDestroyInput = Parameters<typeof posthog.accountRelationshipDefinitionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type AccountRelationshipDefinitionsDestroyOutput = Awaited<ReturnType<typeof posthog.accountRelationshipDefinitionsDestroy>>;

const result: AccountRelationshipDefinitionsDestroyOutput = await posthog.accountRelationshipDefinitionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.accountRelationshipDefinitionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/account_relationship_definitions/{id}/`
- **OpenAPI operationId**: `account_relationship_definitions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; is_single_holder?: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountRelationshipDefinitionsRetrieveInput = Parameters<typeof posthog.accountRelationshipDefinitionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AccountRelationshipDefinitionsRetrieveOutput = Awaited<ReturnType<typeof posthog.accountRelationshipDefinitionsRetrieve>>;

const result: AccountRelationshipDefinitionsRetrieveOutput = await posthog.accountRelationshipDefinitionsRetrieve();

// Result shape (from schema): { id: string; name: string; description?: string | null; is_single_holder?: boolean }
```

### `posthog.accountRelationshipDefinitionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/account_relationship_definitions/{id}/`
- **OpenAPI operationId**: `account_relationship_definitions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; is_single_holder?: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountRelationshipDefinitionsPartialUpdateInput = Parameters<typeof posthog.accountRelationshipDefinitionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AccountRelationshipDefinitionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.accountRelationshipDefinitionsPartialUpdate>>;

const result: AccountRelationshipDefinitionsPartialUpdateOutput = await posthog.accountRelationshipDefinitionsPartialUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; is_single_holder?: boolean }
```

### `posthog.accountRelationshipDefinitionsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/account_relationship_definitions/{id}/`
- **OpenAPI operationId**: `account_relationship_definitions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description?: string | null; is_single_holder?: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AccountRelationshipDefinitionsUpdateInput = Parameters<typeof posthog.accountRelationshipDefinitionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AccountRelationshipDefinitionsUpdateOutput = Awaited<ReturnType<typeof posthog.accountRelationshipDefinitionsUpdate>>;

const result: AccountRelationshipDefinitionsUpdateOutput = await posthog.accountRelationshipDefinitionsUpdate();

// Result shape (from schema): { id: string; name: string; description?: string | null; is_single_holder?: boolean }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

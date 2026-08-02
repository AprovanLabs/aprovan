# Warehouse Model Paths

## Operations

### `posthog.warehouseModelPathsList`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_model_paths/`
- **OpenAPI operationId**: `warehouse_model_paths_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: (string)[]; team: number; table?: string | null; saved_query?: string | null; created_at: string; created_by: { id: number; ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseModelPathsListInput = Parameters<typeof posthog.warehouseModelPathsList> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseModelPathsListOutput = Awaited<ReturnType<typeof posthog.warehouseModelPathsList>>;

const result: WarehouseModelPathsListOutput = await posthog.warehouseModelPathsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; path: (string)[]; team: number; table?: string | null; saved_query?: string | null; created_at: string; created_by: { id: number; ...
```

### `posthog.warehouseModelPathsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_model_paths/{id}/`
- **OpenAPI operationId**: `warehouse_model_paths_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; path: (string)[]; team: number; table?: string | null; saved_query?: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseModelPathsRetrieveInput = Parameters<typeof posthog.warehouseModelPathsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseModelPathsRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseModelPathsRetrieve>>;

const result: WarehouseModelPathsRetrieveOutput = await posthog.warehouseModelPathsRetrieve();

// Result shape (from schema): { id: string; path: (string)[]; team: number; table?: string | null; saved_query?: string | null; created_at: string; created_by: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?:...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

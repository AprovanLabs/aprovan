# Warehouse Column Statistics

## Operations

### `posthog.warehouseColumnStatisticsList`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_column_statistics/`
- **What it does**: Read per-column data statistics (null fraction, min/max, row count) for warehouse tables.

Statistics are computed automatically after a sync and surfaced to the AI agent so it can write
better queries. They are system-owned and read-only here. List can be filtered to one table with
`?table_id=<uuid>`.
- **OpenAPI operationId**: `warehouse_column_statistics_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `table_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; table: string; column_name: string; column_type: string; row_count: number; null_count: number; null_fraction: number; min_value: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseColumnStatisticsListInput = Parameters<typeof posthog.warehouseColumnStatisticsList> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseColumnStatisticsListOutput = Awaited<ReturnType<typeof posthog.warehouseColumnStatisticsList>>;

const result: WarehouseColumnStatisticsListOutput = await posthog.warehouseColumnStatisticsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; table: string; column_name: string; column_type: string; row_count: number; null_count: number; null_fraction: number; min_value: ...
```

### `posthog.warehouseColumnStatisticsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_column_statistics/{id}/`
- **What it does**: Read per-column data statistics (null fraction, min/max, row count) for warehouse tables.

Statistics are computed automatically after a sync and surfaced to the AI agent so it can write
better queries. They are system-owned and read-only here. List can be filtered to one table with
`?table_id=<uuid>`.
- **OpenAPI operationId**: `warehouse_column_statistics_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; table: string; column_name: string; column_type: string; row_count: number; null_count: number; null_fraction: number; min_value: string; max_value: string; has_min_max: boolean; computed_at: string; compu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WarehouseColumnStatisticsRetrieveInput = Parameters<typeof posthog.warehouseColumnStatisticsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseColumnStatisticsRetrieveOutput = Awaited<ReturnType<typeof posthog.warehouseColumnStatisticsRetrieve>>;

const result: WarehouseColumnStatisticsRetrieveOutput = await posthog.warehouseColumnStatisticsRetrieve();

// Result shape (from schema): { id: string; table: string; column_name: string; column_type: string; row_count: number; null_count: number; null_fraction: number; min_value: string; max_value: string; has_min_max: boolean; computed_at: string; compu...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

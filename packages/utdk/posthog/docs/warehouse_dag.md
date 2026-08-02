# Warehouse Dag

## Operations

### `posthog.warehouseDagList`

- **HTTP**: `GET /api/projects/{project_id}/warehouse_dag/`
- **What it does**: Return this team's DAG as a set of edges and nodes
- **OpenAPI operationId**: `warehouse_dag_list`
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

type WarehouseDagListInput = Parameters<typeof posthog.warehouseDagList> extends [infer T, ...unknown[]] ? T : undefined;
type WarehouseDagListOutput = Awaited<ReturnType<typeof posthog.warehouseDagList>>;

const result: WarehouseDagListOutput = await posthog.warehouseDagList();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

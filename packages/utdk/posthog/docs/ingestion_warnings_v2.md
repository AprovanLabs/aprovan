# Ingestion Warnings V2

## Operations

### `posthog.ingestionWarningsV2List`

- **HTTP**: `GET /api/projects/{project_id}/ingestion_warnings_v2/`
- **What it does**: List ingestion warnings
- **OpenAPI operationId**: `ingestion_warnings_v2_list`
- **Path params**: None
- **Query params**: `category`, `limit`, `order_by`, `q`, `samples`, `severity`, `since`, `type`, `until`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ type: string; category: string; severity: string; count: number; last_seen: string; sparkline: ({ timestamp: string; count: number })[]; samples: ({ timestamp: string; source: string; pipeline_step: string; event_uui...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type IngestionWarningsV2ListInput = Parameters<typeof posthog.ingestionWarningsV2List> extends [infer T, ...unknown[]] ? T : undefined;
type IngestionWarningsV2ListOutput = Awaited<ReturnType<typeof posthog.ingestionWarningsV2List>>;

const result: IngestionWarningsV2ListOutput = await posthog.ingestionWarningsV2List();

// Result shape (from schema): ({ type: string; category: string; severity: string; count: number; last_seen: string; sparkline: ({ timestamp: string; count: number })[]; samples: ({ timestamp: string; source: string; pipeline_step: string; event_uui...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

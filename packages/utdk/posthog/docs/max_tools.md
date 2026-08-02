# Max Tools

## Operations

### `posthog.environmentsMaxToolsCreateAndQueryInsightCreate`

- **HTTP**: `POST /api/environments/{environment_id}/max_tools/create_and_query_insight/`
- **OpenAPI operationId**: `environments_max_tools_create_and_query_insight_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMaxToolsCreateAndQueryInsightCreateInput = Parameters<typeof posthog.environmentsMaxToolsCreateAndQueryInsightCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMaxToolsCreateAndQueryInsightCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMaxToolsCreateAndQueryInsightCreate>>;

const result: EnvironmentsMaxToolsCreateAndQueryInsightCreateOutput = await posthog.environmentsMaxToolsCreateAndQueryInsightCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.maxToolsCreateAndQueryInsightCreate`

- **HTTP**: `POST /api/projects/{project_id}/max_tools/create_and_query_insight/`
- **OpenAPI operationId**: `max_tools_create_and_query_insight_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ [key: string]: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type MaxToolsCreateAndQueryInsightCreateInput = Parameters<typeof posthog.maxToolsCreateAndQueryInsightCreate> extends [infer T, ...unknown[]] ? T : undefined;
type MaxToolsCreateAndQueryInsightCreateOutput = Awaited<ReturnType<typeof posthog.maxToolsCreateAndQueryInsightCreate>>;

const result: MaxToolsCreateAndQueryInsightCreateOutput = await posthog.maxToolsCreateAndQueryInsightCreate();

// Result shape (from schema): { [key: string]: unknown }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

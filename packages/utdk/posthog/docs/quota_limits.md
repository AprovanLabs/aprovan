# Quota Limits

## Operations

### `posthog.quotaLimitsList`

- **HTTP**: `GET /api/projects/{project_id}/quota_limits/`
- **What it does**: Get a team's quota-limit state
- **OpenAPI operationId**: `quota_limits_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ limited: { [key: string]: { limited: boolean } | undefined } })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type QuotaLimitsListInput = Parameters<typeof posthog.quotaLimitsList> extends [infer T, ...unknown[]] ? T : undefined;
type QuotaLimitsListOutput = Awaited<ReturnType<typeof posthog.quotaLimitsList>>;

const result: QuotaLimitsListOutput = await posthog.quotaLimitsList();

// Result shape (from schema): ({ limited: { [key: string]: { limited: boolean } | undefined } })[]
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

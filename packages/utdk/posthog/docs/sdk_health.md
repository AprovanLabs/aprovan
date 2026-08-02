# Sdk Health

## Operations

### `posthog.sdkHealthReportRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/sdk_health/report/`
- **What it does**: Get SDK health report for a project
- **OpenAPI operationId**: `sdk_health_report_retrieve`
- **Path params**: None
- **Query params**: `force_refresh`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ overall_health: "healthy" | "needs_attention"; health: "success" | "warning" | "danger"; needs_updating_count: number; team_sdk_count: number; sdks: ({ lib: string; readable_name: string; latest_version: string; needs...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SdkHealthReportRetrieveInput = Parameters<typeof posthog.sdkHealthReportRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SdkHealthReportRetrieveOutput = Awaited<ReturnType<typeof posthog.sdkHealthReportRetrieve>>;

const result: SdkHealthReportRetrieveOutput = await posthog.sdkHealthReportRetrieve();

// Result shape (from schema): { overall_health: "healthy" | "needs_attention"; health: "success" | "warning" | "danger"; needs_updating_count: number; team_sdk_count: number; sdks: ({ lib: string; readable_name: string; latest_version: string; needs...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

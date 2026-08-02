# Web Analytics

## Operations

### `posthog.environmentsWebAnalyticsRecap`

- **HTTP**: `GET /api/environments/{environment_id}/web_analytics/recap/`
- **What it does**: Weekly web analytics recap
- **OpenAPI operationId**: `environments_web_analytics_recap`
- **Path params**: None
- **Query params**: `compare`, `days`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ visitors: { current: number; previous: number | null; change: { percent: number; direction: "Up" | "Down"; color: string; text: string; long_text: string } | null }; pageviews: { current: number; previous: number | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWebAnalyticsRecapInput = Parameters<typeof posthog.environmentsWebAnalyticsRecap> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWebAnalyticsRecapOutput = Awaited<ReturnType<typeof posthog.environmentsWebAnalyticsRecap>>;

const result: EnvironmentsWebAnalyticsRecapOutput = await posthog.environmentsWebAnalyticsRecap();

// Result shape (from schema): { visitors: { current: number; previous: number | null; change: { percent: number; direction: "Up" | "Down"; color: string; text: string; long_text: string } | null }; pageviews: { current: number; previous: number | nu...
```

### `posthog.environmentsWebAnalyticsWeeklyDigest`

- **HTTP**: `GET /api/environments/{environment_id}/web_analytics/weekly_digest/`
- **What it does**: Summarize web analytics
- **OpenAPI operationId**: `environments_web_analytics_weekly_digest`
- **Path params**: None
- **Query params**: `compare`, `days`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ visitors: { current: number; previous: number | null; change: { percent: number; direction: "Up" | "Down"; color: string; text: string; long_text: string } | null }; pageviews: { current: number; previous: number | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsWebAnalyticsWeeklyDigestInput = Parameters<typeof posthog.environmentsWebAnalyticsWeeklyDigest> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWebAnalyticsWeeklyDigestOutput = Awaited<ReturnType<typeof posthog.environmentsWebAnalyticsWeeklyDigest>>;

const result: EnvironmentsWebAnalyticsWeeklyDigestOutput = await posthog.environmentsWebAnalyticsWeeklyDigest();

// Result shape (from schema): { visitors: { current: number; previous: number | null; change: { percent: number; direction: "Up" | "Down"; color: string; text: string; long_text: string } | null }; pageviews: { current: number; previous: number | nu...
```

### `posthog.webAnalyticsRecap`

- **HTTP**: `GET /api/projects/{project_id}/web_analytics/recap/`
- **What it does**: Weekly web analytics recap
- **OpenAPI operationId**: `web_analytics_recap`
- **Path params**: None
- **Query params**: `compare`, `days`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ visitors: { current: number; previous: number | null; change: { percent: number; direction: "Up" | "Down"; color: string; text: string; long_text: string } | null }; pageviews: { current: number; previous: number | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebAnalyticsRecapInput = Parameters<typeof posthog.webAnalyticsRecap> extends [infer T, ...unknown[]] ? T : undefined;
type WebAnalyticsRecapOutput = Awaited<ReturnType<typeof posthog.webAnalyticsRecap>>;

const result: WebAnalyticsRecapOutput = await posthog.webAnalyticsRecap();

// Result shape (from schema): { visitors: { current: number; previous: number | null; change: { percent: number; direction: "Up" | "Down"; color: string; text: string; long_text: string } | null }; pageviews: { current: number; previous: number | nu...
```

### `posthog.webAnalyticsWeeklyDigest`

- **HTTP**: `GET /api/projects/{project_id}/web_analytics/weekly_digest/`
- **What it does**: Summarize web analytics
- **OpenAPI operationId**: `web_analytics_weekly_digest`
- **Path params**: None
- **Query params**: `compare`, `days`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ visitors: { current: number; previous: number | null; change: { percent: number; direction: "Up" | "Down"; color: string; text: string; long_text: string } | null }; pageviews: { current: number; previous: number | nu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type WebAnalyticsWeeklyDigestInput = Parameters<typeof posthog.webAnalyticsWeeklyDigest> extends [infer T, ...unknown[]] ? T : undefined;
type WebAnalyticsWeeklyDigestOutput = Awaited<ReturnType<typeof posthog.webAnalyticsWeeklyDigest>>;

const result: WebAnalyticsWeeklyDigestOutput = await posthog.webAnalyticsWeeklyDigest();

// Result shape (from schema): { visitors: { current: number; previous: number | null; change: { percent: number; direction: "Up" | "Down"; color: string; text: string; long_text: string } | null }; pageviews: { current: number; previous: number | nu...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# Web Vitals

## Operations

### `posthog.environmentsWebVitalsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/web_vitals/`
- **What it does**: Get web vitals for a specific pathname.
Toolbar accesses this via OAuth (handled by TeamAndOrgViewSetMixin.get_authenticators).
- **OpenAPI operationId**: `environments_web_vitals_retrieve`
- **Path params**: None
- **Query params**: `pathname`
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

type EnvironmentsWebVitalsRetrieveInput = Parameters<typeof posthog.environmentsWebVitalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsWebVitalsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsWebVitalsRetrieve>>;

const result: EnvironmentsWebVitalsRetrieveOutput = await posthog.environmentsWebVitalsRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.webVitalsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/web_vitals/`
- **What it does**: Get web vitals for a specific pathname.
Toolbar accesses this via OAuth (handled by TeamAndOrgViewSetMixin.get_authenticators).
- **OpenAPI operationId**: `web_vitals_retrieve`
- **Path params**: None
- **Query params**: `pathname`
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

type WebVitalsRetrieveInput = Parameters<typeof posthog.webVitalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type WebVitalsRetrieveOutput = Awaited<ReturnType<typeof posthog.webVitalsRetrieve>>;

const result: WebVitalsRetrieveOutput = await posthog.webVitalsRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

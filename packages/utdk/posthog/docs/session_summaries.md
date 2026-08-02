# Session Summaries

## Operations

### `posthog.environmentsRetrieveSessionSummariesConfig`

- **HTTP**: `GET /api/environments/{environment_id}/session_summaries/config/`
- **What it does**: Retrieve the team's session summaries configuration (product context used to tailor single-session replay summaries).
- **OpenAPI operationId**: `environments_retrieve_session_summaries_config`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ product_context?: string; custom_tags?: { [key: string]: string | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsRetrieveSessionSummariesConfigInput = Parameters<typeof posthog.environmentsRetrieveSessionSummariesConfig> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsRetrieveSessionSummariesConfigOutput = Awaited<ReturnType<typeof posthog.environmentsRetrieveSessionSummariesConfig>>;

const result: EnvironmentsRetrieveSessionSummariesConfigOutput = await posthog.environmentsRetrieveSessionSummariesConfig();

// Result shape (from schema): { product_context?: string; custom_tags?: { [key: string]: string | undefined } }
```

### `posthog.environmentsUpdateSessionSummariesConfig`

- **HTTP**: `PATCH /api/environments/{environment_id}/session_summaries/config/`
- **What it does**: Update the team's session summaries configuration (product context used to tailor single-session replay summaries).
- **OpenAPI operationId**: `environments_update_session_summaries_config`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ product_context?: string; custom_tags?: { [key: string]: string | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsUpdateSessionSummariesConfigInput = Parameters<typeof posthog.environmentsUpdateSessionSummariesConfig> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsUpdateSessionSummariesConfigOutput = Awaited<ReturnType<typeof posthog.environmentsUpdateSessionSummariesConfig>>;

const result: EnvironmentsUpdateSessionSummariesConfigOutput = await posthog.environmentsUpdateSessionSummariesConfig();

// Result shape (from schema): { product_context?: string; custom_tags?: { [key: string]: string | undefined } }
```

### `posthog.environmentsCreateSessionSummaries`

- **HTTP**: `POST /api/environments/{environment_id}/session_summaries/create_session_summaries/`
- **What it does**: Generate AI summary for a group of session recordings to find patterns and generate a notebook.
- **OpenAPI operationId**: `environments_create_session_summaries`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ session_ids: (string)[]; focus_area?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsCreateSessionSummariesInput = Parameters<typeof posthog.environmentsCreateSessionSummaries> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsCreateSessionSummariesOutput = Awaited<ReturnType<typeof posthog.environmentsCreateSessionSummaries>>;

const result: EnvironmentsCreateSessionSummariesOutput = await posthog.environmentsCreateSessionSummaries();

// Result shape (from schema): { session_ids: (string)[]; focus_area?: string }
```

### `posthog.retrieveSessionSummariesConfig`

- **HTTP**: `GET /api/projects/{project_id}/session_summaries/config/`
- **What it does**: Retrieve the team's session summaries configuration (product context used to tailor single-session replay summaries).
- **OpenAPI operationId**: `retrieve_session_summaries_config`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ product_context?: string; custom_tags?: { [key: string]: string | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type RetrieveSessionSummariesConfigInput = Parameters<typeof posthog.retrieveSessionSummariesConfig> extends [infer T, ...unknown[]] ? T : undefined;
type RetrieveSessionSummariesConfigOutput = Awaited<ReturnType<typeof posthog.retrieveSessionSummariesConfig>>;

const result: RetrieveSessionSummariesConfigOutput = await posthog.retrieveSessionSummariesConfig();

// Result shape (from schema): { product_context?: string; custom_tags?: { [key: string]: string | undefined } }
```

### `posthog.updateSessionSummariesConfig`

- **HTTP**: `PATCH /api/projects/{project_id}/session_summaries/config/`
- **What it does**: Update the team's session summaries configuration (product context used to tailor single-session replay summaries).
- **OpenAPI operationId**: `update_session_summaries_config`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ product_context?: string; custom_tags?: { [key: string]: string | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type UpdateSessionSummariesConfigInput = Parameters<typeof posthog.updateSessionSummariesConfig> extends [infer T, ...unknown[]] ? T : undefined;
type UpdateSessionSummariesConfigOutput = Awaited<ReturnType<typeof posthog.updateSessionSummariesConfig>>;

const result: UpdateSessionSummariesConfigOutput = await posthog.updateSessionSummariesConfig();

// Result shape (from schema): { product_context?: string; custom_tags?: { [key: string]: string | undefined } }
```

### `posthog.createSessionSummaries`

- **HTTP**: `POST /api/projects/{project_id}/session_summaries/create_session_summaries/`
- **What it does**: Generate AI summary for a group of session recordings to find patterns and generate a notebook.
- **OpenAPI operationId**: `create_session_summaries`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ session_ids: (string)[]; focus_area?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type CreateSessionSummariesInput = Parameters<typeof posthog.createSessionSummaries> extends [infer T, ...unknown[]] ? T : undefined;
type CreateSessionSummariesOutput = Awaited<ReturnType<typeof posthog.createSessionSummaries>>;

const result: CreateSessionSummariesOutput = await posthog.createSessionSummaries();

// Result shape (from schema): { session_ids: (string)[]; focus_area?: string }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

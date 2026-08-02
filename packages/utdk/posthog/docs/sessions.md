# Sessions

## Operations

### `posthog.environmentsSessionsPropertyDefinitionsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/sessions/property_definitions/`
- **OpenAPI operationId**: `environments_sessions_property_definitions_retrieve`
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

type EnvironmentsSessionsPropertyDefinitionsRetrieveInput = Parameters<typeof posthog.environmentsSessionsPropertyDefinitionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionsPropertyDefinitionsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsSessionsPropertyDefinitionsRetrieve>>;

const result: EnvironmentsSessionsPropertyDefinitionsRetrieveOutput = await posthog.environmentsSessionsPropertyDefinitionsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsSessionsValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/sessions/values/`
- **OpenAPI operationId**: `environments_sessions_values_retrieve`
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

type EnvironmentsSessionsValuesRetrieveInput = Parameters<typeof posthog.environmentsSessionsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSessionsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsSessionsValuesRetrieve>>;

const result: EnvironmentsSessionsValuesRetrieveOutput = await posthog.environmentsSessionsValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.sessionsPropertyDefinitionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/sessions/property_definitions/`
- **OpenAPI operationId**: `sessions_property_definitions_retrieve`
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

type SessionsPropertyDefinitionsRetrieveInput = Parameters<typeof posthog.sessionsPropertyDefinitionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SessionsPropertyDefinitionsRetrieveOutput = Awaited<ReturnType<typeof posthog.sessionsPropertyDefinitionsRetrieve>>;

const result: SessionsPropertyDefinitionsRetrieveOutput = await posthog.sessionsPropertyDefinitionsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.sessionsValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/sessions/values/`
- **OpenAPI operationId**: `sessions_values_retrieve`
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

type SessionsValuesRetrieveInput = Parameters<typeof posthog.sessionsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SessionsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.sessionsValuesRetrieve>>;

const result: SessionsValuesRetrieveOutput = await posthog.sessionsValuesRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

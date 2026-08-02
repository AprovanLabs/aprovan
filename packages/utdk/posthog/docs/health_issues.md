# Health Issues

## Operations

### `posthog.environmentsHealthIssuesList`

- **HTTP**: `GET /api/environments/{environment_id}/health_issues/`
- **What it does**: List health issues
- **OpenAPI operationId**: `environments_health_issues_list`
- **Path params**: None
- **Query params**: `dismissed`, `kind`, `limit`, `offset`, `severity`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHealthIssuesListInput = Parameters<typeof posthog.environmentsHealthIssuesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHealthIssuesListOutput = Awaited<ReturnType<typeof posthog.environmentsHealthIssuesList>>;

const result: EnvironmentsHealthIssuesListOutput = await posthog.environmentsHealthIssuesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: stri...
```

### `posthog.environmentsHealthIssuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/health_issues/{id}/`
- **What it does**: Get a health issue
- **OpenAPI operationId**: `environments_health_issues_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHealthIssuesRetrieveInput = Parameters<typeof posthog.environmentsHealthIssuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHealthIssuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHealthIssuesRetrieve>>;

const result: EnvironmentsHealthIssuesRetrieveOutput = await posthog.environmentsHealthIssuesRetrieve();

// Result shape (from schema): { id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...
```

### `posthog.environmentsHealthIssuesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/health_issues/{id}/`
- **OpenAPI operationId**: `environments_health_issues_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHealthIssuesPartialUpdateInput = Parameters<typeof posthog.environmentsHealthIssuesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHealthIssuesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsHealthIssuesPartialUpdate>>;

const result: EnvironmentsHealthIssuesPartialUpdateOutput = await posthog.environmentsHealthIssuesPartialUpdate();

// Result shape (from schema): { id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...
```

### `posthog.environmentsHealthIssuesResolveCreate`

- **HTTP**: `POST /api/environments/{environment_id}/health_issues/{id}/resolve/`
- **OpenAPI operationId**: `environments_health_issues_resolve_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHealthIssuesResolveCreateInput = Parameters<typeof posthog.environmentsHealthIssuesResolveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHealthIssuesResolveCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHealthIssuesResolveCreate>>;

const result: EnvironmentsHealthIssuesResolveCreateOutput = await posthog.environmentsHealthIssuesResolveCreate();

// Result shape (from schema): { id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...
```

### `posthog.environmentsHealthIssuesRefreshCreate`

- **HTTP**: `POST /api/environments/{environment_id}/health_issues/refresh/`
- **OpenAPI operationId**: `environments_health_issues_refresh_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `202`, `429`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`, `429`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHealthIssuesRefreshCreateInput = Parameters<typeof posthog.environmentsHealthIssuesRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHealthIssuesRefreshCreateOutput = Awaited<ReturnType<typeof posthog.environmentsHealthIssuesRefreshCreate>>;

const result: EnvironmentsHealthIssuesRefreshCreateOutput = await posthog.environmentsHealthIssuesRefreshCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsHealthIssuesSummaryRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/health_issues/summary/`
- **What it does**: Summarize active health issues
- **OpenAPI operationId**: `environments_health_issues_summary_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ total: number; by_severity: { [key: string]: number | undefined }; by_kind: { [key: string]: number | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsHealthIssuesSummaryRetrieveInput = Parameters<typeof posthog.environmentsHealthIssuesSummaryRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsHealthIssuesSummaryRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsHealthIssuesSummaryRetrieve>>;

const result: EnvironmentsHealthIssuesSummaryRetrieveOutput = await posthog.environmentsHealthIssuesSummaryRetrieve();

// Result shape (from schema): { total: number; by_severity: { [key: string]: number | undefined }; by_kind: { [key: string]: number | undefined } }
```

### `posthog.healthIssuesList`

- **HTTP**: `GET /api/projects/{project_id}/health_issues/`
- **What it does**: List health issues
- **OpenAPI operationId**: `health_issues_list`
- **Path params**: None
- **Query params**: `dismissed`, `kind`, `limit`, `offset`, `severity`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HealthIssuesListInput = Parameters<typeof posthog.healthIssuesList> extends [infer T, ...unknown[]] ? T : undefined;
type HealthIssuesListOutput = Awaited<ReturnType<typeof posthog.healthIssuesList>>;

const result: HealthIssuesListOutput = await posthog.healthIssuesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: stri...
```

### `posthog.healthIssuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/health_issues/{id}/`
- **What it does**: Get a health issue
- **OpenAPI operationId**: `health_issues_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HealthIssuesRetrieveInput = Parameters<typeof posthog.healthIssuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HealthIssuesRetrieveOutput = Awaited<ReturnType<typeof posthog.healthIssuesRetrieve>>;

const result: HealthIssuesRetrieveOutput = await posthog.healthIssuesRetrieve();

// Result shape (from schema): { id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...
```

### `posthog.healthIssuesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/health_issues/{id}/`
- **OpenAPI operationId**: `health_issues_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HealthIssuesPartialUpdateInput = Parameters<typeof posthog.healthIssuesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type HealthIssuesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.healthIssuesPartialUpdate>>;

const result: HealthIssuesPartialUpdateOutput = await posthog.healthIssuesPartialUpdate();

// Result shape (from schema): { id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...
```

### `posthog.healthIssuesResolveCreate`

- **HTTP**: `POST /api/projects/{project_id}/health_issues/{id}/resolve/`
- **OpenAPI operationId**: `health_issues_resolve_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HealthIssuesResolveCreateInput = Parameters<typeof posthog.healthIssuesResolveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HealthIssuesResolveCreateOutput = Awaited<ReturnType<typeof posthog.healthIssuesResolveCreate>>;

const result: HealthIssuesResolveCreateOutput = await posthog.healthIssuesResolveCreate();

// Result shape (from schema): { id: string; kind: string; severity: "critical" | "warning" | "info"; status: "active" | "resolved"; dismissed?: boolean; payload: { [key: string]: unknown }; created_at: string; updated_at: string; resolved_at: string...
```

### `posthog.healthIssuesRefreshCreate`

- **HTTP**: `POST /api/projects/{project_id}/health_issues/refresh/`
- **OpenAPI operationId**: `health_issues_refresh_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `202`, `429`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`, `429`

```ts
import posthog from "@utdk/posthog";

type HealthIssuesRefreshCreateInput = Parameters<typeof posthog.healthIssuesRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type HealthIssuesRefreshCreateOutput = Awaited<ReturnType<typeof posthog.healthIssuesRefreshCreate>>;

const result: HealthIssuesRefreshCreateOutput = await posthog.healthIssuesRefreshCreate();

// Result shape (from schema): unknown
```

### `posthog.healthIssuesSummaryRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/health_issues/summary/`
- **What it does**: Summarize active health issues
- **OpenAPI operationId**: `health_issues_summary_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ total: number; by_severity: { [key: string]: number | undefined }; by_kind: { [key: string]: number | undefined } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type HealthIssuesSummaryRetrieveInput = Parameters<typeof posthog.healthIssuesSummaryRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type HealthIssuesSummaryRetrieveOutput = Awaited<ReturnType<typeof posthog.healthIssuesSummaryRetrieve>>;

const result: HealthIssuesSummaryRetrieveOutput = await posthog.healthIssuesSummaryRetrieve();

// Result shape (from schema): { total: number; by_severity: { [key: string]: number | undefined }; by_kind: { [key: string]: number | undefined } }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

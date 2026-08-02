# Query

## Operations

### `posthog.environmentsQueryCreate`

- **HTTP**: `POST /api/environments/{environment_id}/query/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_query_create`
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

type EnvironmentsQueryCreateInput = Parameters<typeof posthog.environmentsQueryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsQueryCreateOutput = Awaited<ReturnType<typeof posthog.environmentsQueryCreate>>;

const result: EnvironmentsQueryCreateOutput = await posthog.environmentsQueryCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.environmentsQueryDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/query/{id}/`
- **What it does**: (Experimental)
- **OpenAPI operationId**: `environments_query_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsQueryDestroyInput = Parameters<typeof posthog.environmentsQueryDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsQueryDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsQueryDestroy>>;

const result: EnvironmentsQueryDestroyOutput = await posthog.environmentsQueryDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsQueryRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/query/{id}/`
- **What it does**: (Experimental)
- **OpenAPI operationId**: `environments_query_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ query_status: { complete?: boolean | null; dashboard_id?: number | null; end_time?: string | null; error?: boolean | null; error_code?: string | null; error_message?: string | null; expiration_time?: string | null; id...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsQueryRetrieveInput = Parameters<typeof posthog.environmentsQueryRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsQueryRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsQueryRetrieve>>;

const result: EnvironmentsQueryRetrieveOutput = await posthog.environmentsQueryRetrieve();

// Result shape (from schema): { query_status: { complete?: boolean | null; dashboard_id?: number | null; end_time?: string | null; error?: boolean | null; error_code?: string | null; error_message?: string | null; expiration_time?: string | null; id...
```

### `posthog.environmentsQueryLogRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/query/{id}/log/`
- **What it does**: Get query log details from query_log_archive table for a specific query_id, the query must have been issued in last 24 hours.
- **OpenAPI operationId**: `environments_query_log_retrieve`
- **Path params**: `id`
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

type EnvironmentsQueryLogRetrieveInput = Parameters<typeof posthog.environmentsQueryLogRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsQueryLogRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsQueryLogRetrieve>>;

const result: EnvironmentsQueryLogRetrieveOutput = await posthog.environmentsQueryLogRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.environmentsQueryCreateWithKind`

- **HTTP**: `POST /api/environments/{environment_id}/query/{query_kind}/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_query_create_with_kind`
- **Path params**: `query_kind`
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

type EnvironmentsQueryCreateWithKindInput = Parameters<typeof posthog.environmentsQueryCreateWithKind> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsQueryCreateWithKindOutput = Awaited<ReturnType<typeof posthog.environmentsQueryCreateWithKind>>;

const result: EnvironmentsQueryCreateWithKindOutput = await posthog.environmentsQueryCreateWithKind();

// Result shape (from schema): unknown
```

### `posthog.environmentsQueryCheckAuthForAsyncCreate`

- **HTTP**: `POST /api/environments/{environment_id}/query/check_auth_for_async/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_query_check_auth_for_async_create`
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

type EnvironmentsQueryCheckAuthForAsyncCreateInput = Parameters<typeof posthog.environmentsQueryCheckAuthForAsyncCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsQueryCheckAuthForAsyncCreateOutput = Awaited<ReturnType<typeof posthog.environmentsQueryCheckAuthForAsyncCreate>>;

const result: EnvironmentsQueryCheckAuthForAsyncCreateOutput = await posthog.environmentsQueryCheckAuthForAsyncCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.environmentsQueryDraftSqlRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/query/draft_sql/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `environments_query_draft_sql_retrieve`
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

type EnvironmentsQueryDraftSqlRetrieveInput = Parameters<typeof posthog.environmentsQueryDraftSqlRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsQueryDraftSqlRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsQueryDraftSqlRetrieve>>;

const result: EnvironmentsQueryDraftSqlRetrieveOutput = await posthog.environmentsQueryDraftSqlRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.environmentsQueryUpgradeCreate`

- **HTTP**: `POST /api/environments/{environment_id}/query/upgrade/`
- **What it does**: Upgrades a query without executing it. Returns a query with all nodes migrated to the latest version.
- **OpenAPI operationId**: `environments_query_upgrade_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ query: { custom_name?: string | null; event?: string | null; fixedProperties?: ({ key: string; label?: string | null; operator?: "exact" | "is_not" | "icontains" | "not_icontains" | "regex" | "not_regex" | "gt" | "gte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsQueryUpgradeCreateInput = Parameters<typeof posthog.environmentsQueryUpgradeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsQueryUpgradeCreateOutput = Awaited<ReturnType<typeof posthog.environmentsQueryUpgradeCreate>>;

const result: EnvironmentsQueryUpgradeCreateOutput = await posthog.environmentsQueryUpgradeCreate();

// Result shape (from schema): { query: { custom_name?: string | null; event?: string | null; fixedProperties?: ({ key: string; label?: string | null; operator?: "exact" | "is_not" | "icontains" | "not_icontains" | "regex" | "not_regex" | "gt" | "gte...
```

### `posthog.queryCreate`

- **HTTP**: `POST /api/projects/{project_id}/query/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `query_create`
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

type QueryCreateInput = Parameters<typeof posthog.queryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type QueryCreateOutput = Awaited<ReturnType<typeof posthog.queryCreate>>;

const result: QueryCreateOutput = await posthog.queryCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.queryDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/query/{id}/`
- **What it does**: (Experimental)
- **OpenAPI operationId**: `query_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `204`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `204`

```ts
import posthog from "@utdk/posthog";

type QueryDestroyInput = Parameters<typeof posthog.queryDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type QueryDestroyOutput = Awaited<ReturnType<typeof posthog.queryDestroy>>;

const result: QueryDestroyOutput = await posthog.queryDestroy();

// Result shape (from schema): unknown
```

### `posthog.queryRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/query/{id}/`
- **What it does**: (Experimental)
- **OpenAPI operationId**: `query_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ query_status: { complete?: boolean | null; dashboard_id?: number | null; end_time?: string | null; error?: boolean | null; error_code?: string | null; error_message?: string | null; expiration_time?: string | null; id...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type QueryRetrieveInput = Parameters<typeof posthog.queryRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type QueryRetrieveOutput = Awaited<ReturnType<typeof posthog.queryRetrieve>>;

const result: QueryRetrieveOutput = await posthog.queryRetrieve();

// Result shape (from schema): { query_status: { complete?: boolean | null; dashboard_id?: number | null; end_time?: string | null; error?: boolean | null; error_code?: string | null; error_message?: string | null; expiration_time?: string | null; id...
```

### `posthog.queryLogRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/query/{id}/log/`
- **What it does**: Get query log details from query_log_archive table for a specific query_id, the query must have been issued in last 24 hours.
- **OpenAPI operationId**: `query_log_retrieve`
- **Path params**: `id`
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

type QueryLogRetrieveInput = Parameters<typeof posthog.queryLogRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type QueryLogRetrieveOutput = Awaited<ReturnType<typeof posthog.queryLogRetrieve>>;

const result: QueryLogRetrieveOutput = await posthog.queryLogRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.queryCreateWithKind`

- **HTTP**: `POST /api/projects/{project_id}/query/{query_kind}/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `query_create_with_kind`
- **Path params**: `query_kind`
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

type QueryCreateWithKindInput = Parameters<typeof posthog.queryCreateWithKind> extends [infer T, ...unknown[]] ? T : undefined;
type QueryCreateWithKindOutput = Awaited<ReturnType<typeof posthog.queryCreateWithKind>>;

const result: QueryCreateWithKindOutput = await posthog.queryCreateWithKind();

// Result shape (from schema): unknown
```

### `posthog.queryCheckAuthForAsyncCreate`

- **HTTP**: `POST /api/projects/{project_id}/query/check_auth_for_async/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `query_check_auth_for_async_create`
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

type QueryCheckAuthForAsyncCreateInput = Parameters<typeof posthog.queryCheckAuthForAsyncCreate> extends [infer T, ...unknown[]] ? T : undefined;
type QueryCheckAuthForAsyncCreateOutput = Awaited<ReturnType<typeof posthog.queryCheckAuthForAsyncCreate>>;

const result: QueryCheckAuthForAsyncCreateOutput = await posthog.queryCheckAuthForAsyncCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.queryDraftSqlRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/query/draft_sql/`
- **What it does**: DRF ViewSet mixin that gates coalesced responses behind permission checks.

The QueryCoalescingMiddleware attaches cached response data to
request.META["_coalesced_response"] for followers. This mixin runs DRF's
initial() (auth + permissions + throttling) before returning the
cached response, ensuring the request is authorized.
- **OpenAPI operationId**: `query_draft_sql_retrieve`
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

type QueryDraftSqlRetrieveInput = Parameters<typeof posthog.queryDraftSqlRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type QueryDraftSqlRetrieveOutput = Awaited<ReturnType<typeof posthog.queryDraftSqlRetrieve>>;

const result: QueryDraftSqlRetrieveOutput = await posthog.queryDraftSqlRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.queryUpgradeCreate`

- **HTTP**: `POST /api/projects/{project_id}/query/upgrade/`
- **What it does**: Upgrades a query without executing it. Returns a query with all nodes migrated to the latest version.
- **OpenAPI operationId**: `query_upgrade_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ query: { custom_name?: string | null; event?: string | null; fixedProperties?: ({ key: string; label?: string | null; operator?: "exact" | "is_not" | "icontains" | "not_icontains" | "regex" | "not_regex" | "gt" | "gte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type QueryUpgradeCreateInput = Parameters<typeof posthog.queryUpgradeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type QueryUpgradeCreateOutput = Awaited<ReturnType<typeof posthog.queryUpgradeCreate>>;

const result: QueryUpgradeCreateOutput = await posthog.queryUpgradeCreate();

// Result shape (from schema): { query: { custom_name?: string | null; event?: string | null; fixedProperties?: ({ key: string; label?: string | null; operator?: "exact" | "is_not" | "icontains" | "not_icontains" | "regex" | "not_regex" | "gt" | "gte...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

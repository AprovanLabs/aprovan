# Reverse Proxy

## Operations

### `posthog.proxyRecordsList`

- **HTTP**: `GET /api/organizations/{organization_id}/proxy_records/`
- **What it does**: List all reverse proxies configured for the organization. Returns proxy records along with the maximum number allowed by the current plan.
- **OpenAPI operationId**: `proxy_records_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ results: ({ id: string; domain: string; target_cname: string; status: "waiting" | "issuing" | "valid" | "warning" | "erroring" | "deleting" | "timed_out"; message: string | null; created_at: string; updated_at: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProxyRecordsListInput = Parameters<typeof posthog.proxyRecordsList> extends [infer T, ...unknown[]] ? T : undefined;
type ProxyRecordsListOutput = Awaited<ReturnType<typeof posthog.proxyRecordsList>>;

const result: ProxyRecordsListOutput = await posthog.proxyRecordsList();

// Result shape (from schema): ({ results: ({ id: string; domain: string; target_cname: string; status: "waiting" | "issuing" | "valid" | "warning" | "erroring" | "deleting" | "timed_out"; message: string | null; created_at: string; updated_at: strin...
```

### `posthog.proxyRecordsCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/proxy_records/`
- **What it does**: Create a new managed reverse proxy. Provide the domain you want to proxy through. The response includes the CNAME target you need to add as a DNS record. Once the CNAME is configured, the proxy will be automatically verified and provisioned.
- **OpenAPI operationId**: `proxy_records_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; domain: string; target_cname: string; status: "waiting" | "issuing" | "valid" | "warning" | "erroring" | "deleting" | "timed_out"; message: string | null; created_at: string; updated_at: string; created_by...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ProxyRecordsCreateInput = Parameters<typeof posthog.proxyRecordsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ProxyRecordsCreateOutput = Awaited<ReturnType<typeof posthog.proxyRecordsCreate>>;

const result: ProxyRecordsCreateOutput = await posthog.proxyRecordsCreate();

// Result shape (from schema): { id: string; domain: string; target_cname: string; status: "waiting" | "issuing" | "valid" | "warning" | "erroring" | "deleting" | "timed_out"; message: string | null; created_at: string; updated_at: string; created_by...
```

### `posthog.proxyRecordsDestroy`

- **HTTP**: `DELETE /api/organizations/{organization_id}/proxy_records/{id}/`
- **What it does**: Delete a reverse proxy. For proxies in 'waiting', 'erroring', or 'timed_out' status, the record is deleted immediately. For active proxies, a deletion workflow is started to clean up the provisioned infrastructure.
- **OpenAPI operationId**: `proxy_records_destroy`
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

type ProxyRecordsDestroyInput = Parameters<typeof posthog.proxyRecordsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ProxyRecordsDestroyOutput = Awaited<ReturnType<typeof posthog.proxyRecordsDestroy>>;

const result: ProxyRecordsDestroyOutput = await posthog.proxyRecordsDestroy();

// Result shape (from schema): unknown
```

### `posthog.proxyRecordsRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/proxy_records/{id}/`
- **What it does**: Get details of a specific reverse proxy by ID. Returns the full configuration including domain, CNAME target, and current provisioning status.
- **OpenAPI operationId**: `proxy_records_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; domain: string; target_cname: string; status: "waiting" | "issuing" | "valid" | "warning" | "erroring" | "deleting" | "timed_out"; message: string | null; created_at: string; updated_at: string; created_by...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProxyRecordsRetrieveInput = Parameters<typeof posthog.proxyRecordsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ProxyRecordsRetrieveOutput = Awaited<ReturnType<typeof posthog.proxyRecordsRetrieve>>;

const result: ProxyRecordsRetrieveOutput = await posthog.proxyRecordsRetrieve();

// Result shape (from schema): { id: string; domain: string; target_cname: string; status: "waiting" | "issuing" | "valid" | "warning" | "erroring" | "deleting" | "timed_out"; message: string | null; created_at: string; updated_at: string; created_by...
```

### `posthog.proxyRecordsDiagnoseCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/proxy_records/{id}/diagnose/`
- **What it does**: Run a deep diagnostic on a reverse proxy. Inspects DNS CNAME alignment, the certificate provider's hostname state, CAA records walked up the customer's DNS tree, HTTP-01 challenge reachability, a live event probe, and certificate expiry. Returns a structured report with each check's status and concrete remediation steps (e.g. exact DNS records to add). Use this to debug why a proxy is stuck or erroring.
- **OpenAPI operationId**: `proxy_records_diagnose_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ ran_at: string; summary: { status: "healthy" | "warn" | "fail"; primary_issue: string | null; next_action: string | null }; checks: ({ id: string; name: string; status: "passed" | "warned" | "failed" | "skipped"; deta...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProxyRecordsDiagnoseCreateInput = Parameters<typeof posthog.proxyRecordsDiagnoseCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ProxyRecordsDiagnoseCreateOutput = Awaited<ReturnType<typeof posthog.proxyRecordsDiagnoseCreate>>;

const result: ProxyRecordsDiagnoseCreateOutput = await posthog.proxyRecordsDiagnoseCreate();

// Result shape (from schema): { ran_at: string; summary: { status: "healthy" | "warn" | "fail"; primary_issue: string | null; next_action: string | null }; checks: ({ id: string; name: string; status: "passed" | "warned" | "failed" | "skipped"; deta...
```

### `posthog.proxyRecordsRetryCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/proxy_records/{id}/retry/`
- **What it does**: Retry provisioning a failed reverse proxy. Only available for proxies in 'erroring' or 'timed_out' status. Resets the proxy to 'waiting' status and restarts the provisioning workflow.
- **OpenAPI operationId**: `proxy_records_retry_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; domain: string; target_cname: string; status: "waiting" | "issuing" | "valid" | "warning" | "erroring" | "deleting" | "timed_out"; message: string | null; created_at: string; updated_at: string; created_by...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ProxyRecordsRetryCreateInput = Parameters<typeof posthog.proxyRecordsRetryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ProxyRecordsRetryCreateOutput = Awaited<ReturnType<typeof posthog.proxyRecordsRetryCreate>>;

const result: ProxyRecordsRetryCreateOutput = await posthog.proxyRecordsRetryCreate();

// Result shape (from schema): { id: string; domain: string; target_cname: string; status: "waiting" | "issuing" | "valid" | "warning" | "erroring" | "deleting" | "timed_out"; message: string | null; created_at: string; updated_at: string; created_by...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# Activity Logs

## Operations

### `posthog.orgOrganizationsAdvancedActivityLogsList`

- **HTTP**: `GET /api/organizations/{organization_id}/advanced_activity_logs/`
- **What it does**: Organization-wide view of activity logs across every project in the organization.

Mounted at /api/organizations/<organization_id>/advanced_activity_logs/.
Restricted to organization admins and owners.
- **OpenAPI operationId**: `org_organizations_advanced_activity_logs_list`
- **Path params**: None
- **Query params**: `activities`, `clients`, `detail_filters`, `end_date`, `hogql_filter`, `ip_addresses`, `is_system`, `item_ids`, `page`, `page_size`, `scopes`, `search_text`, `start_date`, `team_ids`, `users`, `was_impersonated`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_ve...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsAdvancedActivityLogsListInput = Parameters<typeof posthog.orgOrganizationsAdvancedActivityLogsList> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsAdvancedActivityLogsListOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsAdvancedActivityLogsList>>;

const result: OrgOrganizationsAdvancedActivityLogsListOutput = await posthog.orgOrganizationsAdvancedActivityLogsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_ve...
```

### `posthog.orgOrganizationsAdvancedActivityLogsAvailableFiltersRetrieve`

- **HTTP**: `GET /api/organizations/{organization_id}/advanced_activity_logs/available_filters/`
- **What it does**: Organization-wide view of activity logs across every project in the organization.

Mounted at /api/organizations/<organization_id>/advanced_activity_logs/.
Restricted to organization admins and owners.
- **OpenAPI operationId**: `org_organizations_advanced_activity_logs_available_filters_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ static_filters: { users: ({ [key: string]: unknown })[]; scopes: ({ [key: string]: unknown })[]; activities: ({ [key: string]: unknown })[]; clients: ({ [key: string]: unknown })[] }; detail_fields: { [key: string]: u...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsAdvancedActivityLogsAvailableFiltersRetrieveInput = Parameters<typeof posthog.orgOrganizationsAdvancedActivityLogsAvailableFiltersRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsAdvancedActivityLogsAvailableFiltersRetrieveOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsAdvancedActivityLogsAvailableFiltersRetrieve>>;

const result: OrgOrganizationsAdvancedActivityLogsAvailableFiltersRetrieveOutput = await posthog.orgOrganizationsAdvancedActivityLogsAvailableFiltersRetrieve();

// Result shape (from schema): { static_filters: { users: ({ [key: string]: unknown })[]; scopes: ({ [key: string]: unknown })[]; activities: ({ [key: string]: unknown })[]; clients: ({ [key: string]: unknown })[] }; detail_fields: { [key: string]: u...
```

### `posthog.orgOrganizationsAdvancedActivityLogsExportCreate`

- **HTTP**: `POST /api/organizations/{organization_id}/advanced_activity_logs/export/`
- **What it does**: Organization-wide view of activity logs across every project in the organization.

Mounted at /api/organizations/<organization_id>/advanced_activity_logs/.
Restricted to organization admins and owners.
- **OpenAPI operationId**: `org_organizations_advanced_activity_logs_export_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type OrgOrganizationsAdvancedActivityLogsExportCreateInput = Parameters<typeof posthog.orgOrganizationsAdvancedActivityLogsExportCreate> extends [infer T, ...unknown[]] ? T : undefined;
type OrgOrganizationsAdvancedActivityLogsExportCreateOutput = Awaited<ReturnType<typeof posthog.orgOrganizationsAdvancedActivityLogsExportCreate>>;

const result: OrgOrganizationsAdvancedActivityLogsExportCreateOutput = await posthog.orgOrganizationsAdvancedActivityLogsExportCreate();

// Result shape (from schema): { id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_verified?: boolean | null; hedgehog_config: { [key: string]: unknown } | null...
```

### `posthog.activityLogList`

- **HTTP**: `GET /api/projects/{project_id}/activity_log/`
- **OpenAPI operationId**: `activity_log_list`
- **Path params**: None
- **Query params**: `item_id`, `page`, `page_size`, `scope`, `scopes`, `user`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_ve...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ActivityLogListInput = Parameters<typeof posthog.activityLogList> extends [infer T, ...unknown[]] ? T : undefined;
type ActivityLogListOutput = Awaited<ReturnType<typeof posthog.activityLogList>>;

const result: ActivityLogListOutput = await posthog.activityLogList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; user: { id: number; uuid: string; distinct_id?: string | null; first_name?: string; last_name?: string; email: string; is_email_ve...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

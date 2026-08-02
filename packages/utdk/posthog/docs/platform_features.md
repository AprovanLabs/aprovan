# Platform Features

## Operations

### `posthog.environmentsApprovalPoliciesList`

- **HTTP**: `GET /api/environments/{environment_id}/approval_policies/`
- **OpenAPI operationId**: `environments_approval_policies_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: u...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsApprovalPoliciesListInput = Parameters<typeof posthog.environmentsApprovalPoliciesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsApprovalPoliciesListOutput = Awaited<ReturnType<typeof posthog.environmentsApprovalPoliciesList>>;

const result: EnvironmentsApprovalPoliciesListOutput = await posthog.environmentsApprovalPoliciesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: u...
```

### `posthog.environmentsApprovalPoliciesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/approval_policies/`
- **OpenAPI operationId**: `environments_approval_policies_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsApprovalPoliciesCreateInput = Parameters<typeof posthog.environmentsApprovalPoliciesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsApprovalPoliciesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsApprovalPoliciesCreate>>;

const result: EnvironmentsApprovalPoliciesCreateOutput = await posthog.environmentsApprovalPoliciesCreate();

// Result shape (from schema): { id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...
```

### `posthog.environmentsApprovalPoliciesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/approval_policies/{id}/`
- **OpenAPI operationId**: `environments_approval_policies_destroy`
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

type EnvironmentsApprovalPoliciesDestroyInput = Parameters<typeof posthog.environmentsApprovalPoliciesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsApprovalPoliciesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsApprovalPoliciesDestroy>>;

const result: EnvironmentsApprovalPoliciesDestroyOutput = await posthog.environmentsApprovalPoliciesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsApprovalPoliciesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/approval_policies/{id}/`
- **OpenAPI operationId**: `environments_approval_policies_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsApprovalPoliciesRetrieveInput = Parameters<typeof posthog.environmentsApprovalPoliciesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsApprovalPoliciesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsApprovalPoliciesRetrieve>>;

const result: EnvironmentsApprovalPoliciesRetrieveOutput = await posthog.environmentsApprovalPoliciesRetrieve();

// Result shape (from schema): { id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...
```

### `posthog.environmentsApprovalPoliciesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/approval_policies/{id}/`
- **OpenAPI operationId**: `environments_approval_policies_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsApprovalPoliciesPartialUpdateInput = Parameters<typeof posthog.environmentsApprovalPoliciesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsApprovalPoliciesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsApprovalPoliciesPartialUpdate>>;

const result: EnvironmentsApprovalPoliciesPartialUpdateOutput = await posthog.environmentsApprovalPoliciesPartialUpdate();

// Result shape (from schema): { id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...
```

### `posthog.environmentsApprovalPoliciesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/approval_policies/{id}/`
- **OpenAPI operationId**: `environments_approval_policies_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsApprovalPoliciesUpdateInput = Parameters<typeof posthog.environmentsApprovalPoliciesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsApprovalPoliciesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsApprovalPoliciesUpdate>>;

const result: EnvironmentsApprovalPoliciesUpdateOutput = await posthog.environmentsApprovalPoliciesUpdate();

// Result shape (from schema): { id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...
```

### `posthog.environmentsChangeRequestsList`

- **HTTP**: `GET /api/environments/{environment_id}/change_requests/`
- **OpenAPI operationId**: `environments_change_requests_list`
- **Path params**: None
- **Query params**: `action_key`, `limit`, `offset`, `requester`, `resource_id`, `resource_type`, `state`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: un...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsChangeRequestsListInput = Parameters<typeof posthog.environmentsChangeRequestsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsChangeRequestsListOutput = Awaited<ReturnType<typeof posthog.environmentsChangeRequestsList>>;

const result: EnvironmentsChangeRequestsListOutput = await posthog.environmentsChangeRequestsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: un...
```

### `posthog.environmentsChangeRequestsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/change_requests/{id}/`
- **OpenAPI operationId**: `environments_change_requests_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsChangeRequestsRetrieveInput = Parameters<typeof posthog.environmentsChangeRequestsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsChangeRequestsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsChangeRequestsRetrieve>>;

const result: EnvironmentsChangeRequestsRetrieveOutput = await posthog.environmentsChangeRequestsRetrieve();

// Result shape (from schema): { id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...
```

### `posthog.environmentsChangeRequestsApproveCreate`

- **HTTP**: `POST /api/environments/{environment_id}/change_requests/{id}/approve/`
- **What it does**: Approve a change request.
If quorum is reached, automatically applies the change immediately.
- **OpenAPI operationId**: `environments_change_requests_approve_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsChangeRequestsApproveCreateInput = Parameters<typeof posthog.environmentsChangeRequestsApproveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsChangeRequestsApproveCreateOutput = Awaited<ReturnType<typeof posthog.environmentsChangeRequestsApproveCreate>>;

const result: EnvironmentsChangeRequestsApproveCreateOutput = await posthog.environmentsChangeRequestsApproveCreate();

// Result shape (from schema): { id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...
```

### `posthog.environmentsChangeRequestsCancelCreate`

- **HTTP**: `POST /api/environments/{environment_id}/change_requests/{id}/cancel/`
- **What it does**: Cancel a change request.
Only the requester can cancel their own pending change request.
- **OpenAPI operationId**: `environments_change_requests_cancel_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsChangeRequestsCancelCreateInput = Parameters<typeof posthog.environmentsChangeRequestsCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsChangeRequestsCancelCreateOutput = Awaited<ReturnType<typeof posthog.environmentsChangeRequestsCancelCreate>>;

const result: EnvironmentsChangeRequestsCancelCreateOutput = await posthog.environmentsChangeRequestsCancelCreate();

// Result shape (from schema): { id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...
```

### `posthog.environmentsChangeRequestsRejectCreate`

- **HTTP**: `POST /api/environments/{environment_id}/change_requests/{id}/reject/`
- **What it does**: Reject a change request.
- **OpenAPI operationId**: `environments_change_requests_reject_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsChangeRequestsRejectCreateInput = Parameters<typeof posthog.environmentsChangeRequestsRejectCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsChangeRequestsRejectCreateOutput = Awaited<ReturnType<typeof posthog.environmentsChangeRequestsRejectCreate>>;

const result: EnvironmentsChangeRequestsRejectCreateOutput = await posthog.environmentsChangeRequestsRejectCreate();

// Result shape (from schema): { id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...
```

### `posthog.approvalPoliciesList`

- **HTTP**: `GET /api/projects/{project_id}/approval_policies/`
- **OpenAPI operationId**: `approval_policies_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: u...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ApprovalPoliciesListInput = Parameters<typeof posthog.approvalPoliciesList> extends [infer T, ...unknown[]] ? T : undefined;
type ApprovalPoliciesListOutput = Awaited<ReturnType<typeof posthog.approvalPoliciesList>>;

const result: ApprovalPoliciesListOutput = await posthog.approvalPoliciesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: u...
```

### `posthog.approvalPoliciesCreate`

- **HTTP**: `POST /api/projects/{project_id}/approval_policies/`
- **OpenAPI operationId**: `approval_policies_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ApprovalPoliciesCreateInput = Parameters<typeof posthog.approvalPoliciesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ApprovalPoliciesCreateOutput = Awaited<ReturnType<typeof posthog.approvalPoliciesCreate>>;

const result: ApprovalPoliciesCreateOutput = await posthog.approvalPoliciesCreate();

// Result shape (from schema): { id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...
```

### `posthog.approvalPoliciesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/approval_policies/{id}/`
- **OpenAPI operationId**: `approval_policies_destroy`
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

type ApprovalPoliciesDestroyInput = Parameters<typeof posthog.approvalPoliciesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ApprovalPoliciesDestroyOutput = Awaited<ReturnType<typeof posthog.approvalPoliciesDestroy>>;

const result: ApprovalPoliciesDestroyOutput = await posthog.approvalPoliciesDestroy();

// Result shape (from schema): unknown
```

### `posthog.approvalPoliciesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/approval_policies/{id}/`
- **OpenAPI operationId**: `approval_policies_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ApprovalPoliciesRetrieveInput = Parameters<typeof posthog.approvalPoliciesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ApprovalPoliciesRetrieveOutput = Awaited<ReturnType<typeof posthog.approvalPoliciesRetrieve>>;

const result: ApprovalPoliciesRetrieveOutput = await posthog.approvalPoliciesRetrieve();

// Result shape (from schema): { id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...
```

### `posthog.approvalPoliciesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/approval_policies/{id}/`
- **OpenAPI operationId**: `approval_policies_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ApprovalPoliciesPartialUpdateInput = Parameters<typeof posthog.approvalPoliciesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ApprovalPoliciesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.approvalPoliciesPartialUpdate>>;

const result: ApprovalPoliciesPartialUpdateOutput = await posthog.approvalPoliciesPartialUpdate();

// Result shape (from schema): { id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...
```

### `posthog.approvalPoliciesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/approval_policies/{id}/`
- **OpenAPI operationId**: `approval_policies_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ApprovalPoliciesUpdateInput = Parameters<typeof posthog.approvalPoliciesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ApprovalPoliciesUpdateOutput = Awaited<ReturnType<typeof posthog.approvalPoliciesUpdate>>;

const result: ApprovalPoliciesUpdateOutput = await posthog.approvalPoliciesUpdate();

// Result shape (from schema): { id: string; action_key: string; conditions?: unknown; approver_config: unknown; allow_self_approve?: boolean; bypass_org_membership_levels?: unknown; bypass_roles?: (string)[]; expires_after?: string; enabled?: boolea...
```

### `posthog.changeRequestsList`

- **HTTP**: `GET /api/projects/{project_id}/change_requests/`
- **OpenAPI operationId**: `change_requests_list`
- **Path params**: None
- **Query params**: `action_key`, `limit`, `offset`, `requester`, `resource_id`, `resource_type`, `state`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: un...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ChangeRequestsListInput = Parameters<typeof posthog.changeRequestsList> extends [infer T, ...unknown[]] ? T : undefined;
type ChangeRequestsListOutput = Awaited<ReturnType<typeof posthog.changeRequestsList>>;

const result: ChangeRequestsListOutput = await posthog.changeRequestsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: un...
```

### `posthog.changeRequestsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/change_requests/{id}/`
- **OpenAPI operationId**: `change_requests_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ChangeRequestsRetrieveInput = Parameters<typeof posthog.changeRequestsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ChangeRequestsRetrieveOutput = Awaited<ReturnType<typeof posthog.changeRequestsRetrieve>>;

const result: ChangeRequestsRetrieveOutput = await posthog.changeRequestsRetrieve();

// Result shape (from schema): { id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...
```

### `posthog.changeRequestsApproveCreate`

- **HTTP**: `POST /api/projects/{project_id}/change_requests/{id}/approve/`
- **What it does**: Approve a change request.
If quorum is reached, automatically applies the change immediately.
- **OpenAPI operationId**: `change_requests_approve_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ChangeRequestsApproveCreateInput = Parameters<typeof posthog.changeRequestsApproveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ChangeRequestsApproveCreateOutput = Awaited<ReturnType<typeof posthog.changeRequestsApproveCreate>>;

const result: ChangeRequestsApproveCreateOutput = await posthog.changeRequestsApproveCreate();

// Result shape (from schema): { id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...
```

### `posthog.changeRequestsCancelCreate`

- **HTTP**: `POST /api/projects/{project_id}/change_requests/{id}/cancel/`
- **What it does**: Cancel a change request.
Only the requester can cancel their own pending change request.
- **OpenAPI operationId**: `change_requests_cancel_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ChangeRequestsCancelCreateInput = Parameters<typeof posthog.changeRequestsCancelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ChangeRequestsCancelCreateOutput = Awaited<ReturnType<typeof posthog.changeRequestsCancelCreate>>;

const result: ChangeRequestsCancelCreateOutput = await posthog.changeRequestsCancelCreate();

// Result shape (from schema): { id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...
```

### `posthog.changeRequestsRejectCreate`

- **HTTP**: `POST /api/projects/{project_id}/change_requests/{id}/reject/`
- **What it does**: Reject a change request.
- **OpenAPI operationId**: `change_requests_reject_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ChangeRequestsRejectCreateInput = Parameters<typeof posthog.changeRequestsRejectCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ChangeRequestsRejectCreateOutput = Awaited<ReturnType<typeof posthog.changeRequestsRejectCreate>>;

const result: ChangeRequestsRejectCreateOutput = await posthog.changeRequestsRejectCreate();

// Result shape (from schema): { id: string; action_key: string; action_version: number; resource_type: string; resource_id: string | null; intent: unknown; intent_display: unknown; policy_snapshot: unknown; validation_status: "valid" | "invalid" | "...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

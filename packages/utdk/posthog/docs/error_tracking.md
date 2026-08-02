# Error Tracking

## Operations

### `posthog.environmentsErrorTrackingAssignmentRulesList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/assignment_rules/`
- **OpenAPI operationId**: `environments_error_tracking_assignment_rules_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; upda...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingAssignmentRulesListInput = Parameters<typeof posthog.environmentsErrorTrackingAssignmentRulesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingAssignmentRulesListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingAssignmentRulesList>>;

const result: EnvironmentsErrorTrackingAssignmentRulesListOutput = await posthog.environmentsErrorTrackingAssignmentRulesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; upda...
```

### `posthog.environmentsErrorTrackingAssignmentRulesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/assignment_rules/`
- **OpenAPI operationId**: `environments_error_tracking_assignment_rules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingAssignmentRulesCreateInput = Parameters<typeof posthog.environmentsErrorTrackingAssignmentRulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingAssignmentRulesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingAssignmentRulesCreate>>;

const result: EnvironmentsErrorTrackingAssignmentRulesCreateOutput = await posthog.environmentsErrorTrackingAssignmentRulesCreate();

// Result shape (from schema): { id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }
```

### `posthog.environmentsErrorTrackingAssignmentRulesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/error_tracking/assignment_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_assignment_rules_destroy`
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

type EnvironmentsErrorTrackingAssignmentRulesDestroyInput = Parameters<typeof posthog.environmentsErrorTrackingAssignmentRulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingAssignmentRulesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingAssignmentRulesDestroy>>;

const result: EnvironmentsErrorTrackingAssignmentRulesDestroyOutput = await posthog.environmentsErrorTrackingAssignmentRulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingAssignmentRulesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/assignment_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_assignment_rules_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingAssignmentRulesRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingAssignmentRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingAssignmentRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingAssignmentRulesRetrieve>>;

const result: EnvironmentsErrorTrackingAssignmentRulesRetrieveOutput = await posthog.environmentsErrorTrackingAssignmentRulesRetrieve();

// Result shape (from schema): { id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }
```

### `posthog.environmentsErrorTrackingAssignmentRulesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/assignment_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_assignment_rules_partial_update`
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

type EnvironmentsErrorTrackingAssignmentRulesPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingAssignmentRulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingAssignmentRulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingAssignmentRulesPartialUpdate>>;

const result: EnvironmentsErrorTrackingAssignmentRulesPartialUpdateOutput = await posthog.environmentsErrorTrackingAssignmentRulesPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingAssignmentRulesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/error_tracking/assignment_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_assignment_rules_update`
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

type EnvironmentsErrorTrackingAssignmentRulesUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingAssignmentRulesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingAssignmentRulesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingAssignmentRulesUpdate>>;

const result: EnvironmentsErrorTrackingAssignmentRulesUpdateOutput = await posthog.environmentsErrorTrackingAssignmentRulesUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingAssignmentRulesReorderPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/assignment_rules/reorder/`
- **OpenAPI operationId**: `environments_error_tracking_assignment_rules_reorder_partial_update`
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

type EnvironmentsErrorTrackingAssignmentRulesReorderPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingAssignmentRulesReorderPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingAssignmentRulesReorderPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingAssignmentRulesReorderPartialUpdate>>;

const result: EnvironmentsErrorTrackingAssignmentRulesReorderPartialUpdateOutput = await posthog.environmentsErrorTrackingAssignmentRulesReorderPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingBypassRulesList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/bypass_rules/`
- **OpenAPI operationId**: `environments_error_tracking_bypass_rules_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingBypassRulesListInput = Parameters<typeof posthog.environmentsErrorTrackingBypassRulesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingBypassRulesListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingBypassRulesList>>;

const result: EnvironmentsErrorTrackingBypassRulesListOutput = await posthog.environmentsErrorTrackingBypassRulesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string })[] }
```

### `posthog.environmentsErrorTrackingBypassRulesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/bypass_rules/`
- **OpenAPI operationId**: `environments_error_tracking_bypass_rules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingBypassRulesCreateInput = Parameters<typeof posthog.environmentsErrorTrackingBypassRulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingBypassRulesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingBypassRulesCreate>>;

const result: EnvironmentsErrorTrackingBypassRulesCreateOutput = await posthog.environmentsErrorTrackingBypassRulesCreate();

// Result shape (from schema): { id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }
```

### `posthog.environmentsErrorTrackingBypassRulesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/error_tracking/bypass_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_bypass_rules_destroy`
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

type EnvironmentsErrorTrackingBypassRulesDestroyInput = Parameters<typeof posthog.environmentsErrorTrackingBypassRulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingBypassRulesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingBypassRulesDestroy>>;

const result: EnvironmentsErrorTrackingBypassRulesDestroyOutput = await posthog.environmentsErrorTrackingBypassRulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingBypassRulesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/bypass_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_bypass_rules_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingBypassRulesRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingBypassRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingBypassRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingBypassRulesRetrieve>>;

const result: EnvironmentsErrorTrackingBypassRulesRetrieveOutput = await posthog.environmentsErrorTrackingBypassRulesRetrieve();

// Result shape (from schema): { id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }
```

### `posthog.environmentsErrorTrackingBypassRulesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/bypass_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_bypass_rules_partial_update`
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

type EnvironmentsErrorTrackingBypassRulesPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingBypassRulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingBypassRulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingBypassRulesPartialUpdate>>;

const result: EnvironmentsErrorTrackingBypassRulesPartialUpdateOutput = await posthog.environmentsErrorTrackingBypassRulesPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingBypassRulesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/error_tracking/bypass_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_bypass_rules_update`
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

type EnvironmentsErrorTrackingBypassRulesUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingBypassRulesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingBypassRulesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingBypassRulesUpdate>>;

const result: EnvironmentsErrorTrackingBypassRulesUpdateOutput = await posthog.environmentsErrorTrackingBypassRulesUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingBypassRulesReorderPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/bypass_rules/reorder/`
- **OpenAPI operationId**: `environments_error_tracking_bypass_rules_reorder_partial_update`
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

type EnvironmentsErrorTrackingBypassRulesReorderPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingBypassRulesReorderPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingBypassRulesReorderPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingBypassRulesReorderPartialUpdate>>;

const result: EnvironmentsErrorTrackingBypassRulesReorderPartialUpdateOutput = await posthog.environmentsErrorTrackingBypassRulesReorderPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingExternalReferencesList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/external_references/`
- **OpenAPI operationId**: `environments_error_tracking_external_references_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingExternalReferencesListInput = Parameters<typeof posthog.environmentsErrorTrackingExternalReferencesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingExternalReferencesListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingExternalReferencesList>>;

const result: EnvironmentsErrorTrackingExternalReferencesListOutput = await posthog.environmentsErrorTrackingExternalReferencesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefin...
```

### `posthog.environmentsErrorTrackingExternalReferencesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/external_references/`
- **OpenAPI operationId**: `environments_error_tracking_external_references_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefined }; issue: string; external_url: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingExternalReferencesCreateInput = Parameters<typeof posthog.environmentsErrorTrackingExternalReferencesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingExternalReferencesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingExternalReferencesCreate>>;

const result: EnvironmentsErrorTrackingExternalReferencesCreateOutput = await posthog.environmentsErrorTrackingExternalReferencesCreate();

// Result shape (from schema): { id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefined }; issue: string; external_url: string }
```

### `posthog.environmentsErrorTrackingExternalReferencesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/error_tracking/external_references/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_error_tracking_external_references_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingExternalReferencesDestroyInput = Parameters<typeof posthog.environmentsErrorTrackingExternalReferencesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingExternalReferencesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingExternalReferencesDestroy>>;

const result: EnvironmentsErrorTrackingExternalReferencesDestroyOutput = await posthog.environmentsErrorTrackingExternalReferencesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingExternalReferencesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/external_references/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_external_references_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefined }; issue: string; external_url: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingExternalReferencesRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingExternalReferencesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingExternalReferencesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingExternalReferencesRetrieve>>;

const result: EnvironmentsErrorTrackingExternalReferencesRetrieveOutput = await posthog.environmentsErrorTrackingExternalReferencesRetrieve();

// Result shape (from schema): { id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefined }; issue: string; external_url: string }
```

### `posthog.environmentsErrorTrackingFingerprintsList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/fingerprints/`
- **OpenAPI operationId**: `environments_error_tracking_fingerprints_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; fingerprint: string; issue_id: string; created_at: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingFingerprintsListInput = Parameters<typeof posthog.environmentsErrorTrackingFingerprintsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingFingerprintsListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingFingerprintsList>>;

const result: EnvironmentsErrorTrackingFingerprintsListOutput = await posthog.environmentsErrorTrackingFingerprintsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; fingerprint: string; issue_id: string; created_at: string })[] }
```

### `posthog.environmentsErrorTrackingFingerprintsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/error_tracking/fingerprints/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_error_tracking_fingerprints_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingFingerprintsDestroyInput = Parameters<typeof posthog.environmentsErrorTrackingFingerprintsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingFingerprintsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingFingerprintsDestroy>>;

const result: EnvironmentsErrorTrackingFingerprintsDestroyOutput = await posthog.environmentsErrorTrackingFingerprintsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingFingerprintsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/fingerprints/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_fingerprints_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; fingerprint: string; issue_id: string; created_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingFingerprintsRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingFingerprintsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingFingerprintsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingFingerprintsRetrieve>>;

const result: EnvironmentsErrorTrackingFingerprintsRetrieveOutput = await posthog.environmentsErrorTrackingFingerprintsRetrieve();

// Result shape (from schema): { id: string; fingerprint: string; issue_id: string; created_at: string }
```

### `posthog.environmentsErrorTrackingGitProviderFileLinksResolveGithubRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/git-provider-file-links/resolve_github/`
- **OpenAPI operationId**: `environments_error_tracking_git_provider_file_links_resolve_github_retrieve`
- **Path params**: None
- **Query params**: `code_sample`, `file_name`, `owner`, `repository`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ found: boolean; url?: string; error?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingGitProviderFileLinksResolveGithubRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingGitProviderFileLinksResolveGithubRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingGitProviderFileLinksResolveGithubRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingGitProviderFileLinksResolveGithubRetrieve>>;

const result: EnvironmentsErrorTrackingGitProviderFileLinksResolveGithubRetrieveOutput = await posthog.environmentsErrorTrackingGitProviderFileLinksResolveGithubRetrieve();

// Result shape (from schema): { found: boolean; url?: string; error?: string }
```

### `posthog.environmentsErrorTrackingGitProviderFileLinksResolveGitlabRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/git-provider-file-links/resolve_gitlab/`
- **OpenAPI operationId**: `environments_error_tracking_git_provider_file_links_resolve_gitlab_retrieve`
- **Path params**: None
- **Query params**: `code_sample`, `file_name`, `owner`, `repository`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ found: boolean; url?: string; error?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingGitProviderFileLinksResolveGitlabRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingGitProviderFileLinksResolveGitlabRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingGitProviderFileLinksResolveGitlabRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingGitProviderFileLinksResolveGitlabRetrieve>>;

const result: EnvironmentsErrorTrackingGitProviderFileLinksResolveGitlabRetrieveOutput = await posthog.environmentsErrorTrackingGitProviderFileLinksResolveGitlabRetrieve();

// Result shape (from schema): { found: boolean; url?: string; error?: string }
```

### `posthog.environmentsErrorTrackingGroupingRulesList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/grouping_rules/`
- **OpenAPI operationId**: `environments_error_tracking_grouping_rules_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingGroupingRulesListInput = Parameters<typeof posthog.environmentsErrorTrackingGroupingRulesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingGroupingRulesListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingGroupingRulesList>>;

const result: EnvironmentsErrorTrackingGroupingRulesListOutput = await posthog.environmentsErrorTrackingGroupingRulesList();

// Result shape (from schema): { results: ({ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: strin...
```

### `posthog.environmentsErrorTrackingGroupingRulesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/grouping_rules/`
- **OpenAPI operationId**: `environments_error_tracking_grouping_rules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_a...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingGroupingRulesCreateInput = Parameters<typeof posthog.environmentsErrorTrackingGroupingRulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingGroupingRulesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingGroupingRulesCreate>>;

const result: EnvironmentsErrorTrackingGroupingRulesCreateOutput = await posthog.environmentsErrorTrackingGroupingRulesCreate();

// Result shape (from schema): { id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_a...
```

### `posthog.environmentsErrorTrackingGroupingRulesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/error_tracking/grouping_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_grouping_rules_destroy`
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

type EnvironmentsErrorTrackingGroupingRulesDestroyInput = Parameters<typeof posthog.environmentsErrorTrackingGroupingRulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingGroupingRulesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingGroupingRulesDestroy>>;

const result: EnvironmentsErrorTrackingGroupingRulesDestroyOutput = await posthog.environmentsErrorTrackingGroupingRulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingGroupingRulesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/grouping_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_grouping_rules_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_a...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingGroupingRulesRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingGroupingRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingGroupingRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingGroupingRulesRetrieve>>;

const result: EnvironmentsErrorTrackingGroupingRulesRetrieveOutput = await posthog.environmentsErrorTrackingGroupingRulesRetrieve();

// Result shape (from schema): { id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_a...
```

### `posthog.environmentsErrorTrackingGroupingRulesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/grouping_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_grouping_rules_partial_update`
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

type EnvironmentsErrorTrackingGroupingRulesPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingGroupingRulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingGroupingRulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingGroupingRulesPartialUpdate>>;

const result: EnvironmentsErrorTrackingGroupingRulesPartialUpdateOutput = await posthog.environmentsErrorTrackingGroupingRulesPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingGroupingRulesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/error_tracking/grouping_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_grouping_rules_update`
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

type EnvironmentsErrorTrackingGroupingRulesUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingGroupingRulesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingGroupingRulesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingGroupingRulesUpdate>>;

const result: EnvironmentsErrorTrackingGroupingRulesUpdateOutput = await posthog.environmentsErrorTrackingGroupingRulesUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingGroupingRulesReorderPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/grouping_rules/reorder/`
- **OpenAPI operationId**: `environments_error_tracking_grouping_rules_reorder_partial_update`
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

type EnvironmentsErrorTrackingGroupingRulesReorderPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingGroupingRulesReorderPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingGroupingRulesReorderPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingGroupingRulesReorderPartialUpdate>>;

const result: EnvironmentsErrorTrackingGroupingRulesReorderPartialUpdateOutput = await posthog.environmentsErrorTrackingGroupingRulesReorderPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingIssuesList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/issues/`
- **OpenAPI operationId**: `environments_error_tracking_issues_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingIssuesListInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesList>>;

const result: EnvironmentsErrorTrackingIssuesListOutput = await posthog.environmentsErrorTrackingIssuesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null...
```

### `posthog.environmentsErrorTrackingIssuesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/error_tracking/issues/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_error_tracking_issues_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingIssuesDestroyInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesDestroy>>;

const result: EnvironmentsErrorTrackingIssuesDestroyOutput = await posthog.environmentsErrorTrackingIssuesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingIssuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/issues/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_issues_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingIssuesRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesRetrieve>>;

const result: EnvironmentsErrorTrackingIssuesRetrieveOutput = await posthog.environmentsErrorTrackingIssuesRetrieve();

// Result shape (from schema): { id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...
```

### `posthog.environmentsErrorTrackingIssuesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/issues/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_issues_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingIssuesPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesPartialUpdate>>;

const result: EnvironmentsErrorTrackingIssuesPartialUpdateOutput = await posthog.environmentsErrorTrackingIssuesPartialUpdate();

// Result shape (from schema): { id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...
```

### `posthog.environmentsErrorTrackingIssuesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/error_tracking/issues/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_issues_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingIssuesUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesUpdate>>;

const result: EnvironmentsErrorTrackingIssuesUpdateOutput = await posthog.environmentsErrorTrackingIssuesUpdate();

// Result shape (from schema): { id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...
```

### `posthog.environmentsErrorTrackingIssuesActivityRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/issues/{id}/activity/`
- **OpenAPI operationId**: `environments_error_tracking_issues_activity_retrieve`
- **Path params**: `id`
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

type EnvironmentsErrorTrackingIssuesActivityRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesActivityRetrieve>>;

const result: EnvironmentsErrorTrackingIssuesActivityRetrieveOutput = await posthog.environmentsErrorTrackingIssuesActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingIssuesAssignPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/issues/{id}/assign/`
- **OpenAPI operationId**: `environments_error_tracking_issues_assign_partial_update`
- **Path params**: `id`
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

type EnvironmentsErrorTrackingIssuesAssignPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesAssignPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesAssignPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesAssignPartialUpdate>>;

const result: EnvironmentsErrorTrackingIssuesAssignPartialUpdateOutput = await posthog.environmentsErrorTrackingIssuesAssignPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingIssuesCohortUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/error_tracking/issues/{id}/cohort/`
- **OpenAPI operationId**: `environments_error_tracking_issues_cohort_update`
- **Path params**: `id`
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

type EnvironmentsErrorTrackingIssuesCohortUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesCohortUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesCohortUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesCohortUpdate>>;

const result: EnvironmentsErrorTrackingIssuesCohortUpdateOutput = await posthog.environmentsErrorTrackingIssuesCohortUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingIssuesMergeCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/issues/{id}/merge/`
- **OpenAPI operationId**: `environments_error_tracking_issues_merge_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingIssuesMergeCreateInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesMergeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesMergeCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesMergeCreate>>;

const result: EnvironmentsErrorTrackingIssuesMergeCreateOutput = await posthog.environmentsErrorTrackingIssuesMergeCreate();

// Result shape (from schema): { success: boolean }
```

### `posthog.environmentsErrorTrackingIssuesSplitCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/issues/{id}/split/`
- **OpenAPI operationId**: `environments_error_tracking_issues_split_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean; new_issue_ids: (string)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingIssuesSplitCreateInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesSplitCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesSplitCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesSplitCreate>>;

const result: EnvironmentsErrorTrackingIssuesSplitCreateOutput = await posthog.environmentsErrorTrackingIssuesSplitCreate();

// Result shape (from schema): { success: boolean; new_issue_ids: (string)[] }
```

### `posthog.environmentsErrorTrackingIssuesAllActivityRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/issues/activity/`
- **OpenAPI operationId**: `environments_error_tracking_issues_all_activity_retrieve`
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

type EnvironmentsErrorTrackingIssuesAllActivityRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesAllActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesAllActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesAllActivityRetrieve>>;

const result: EnvironmentsErrorTrackingIssuesAllActivityRetrieveOutput = await posthog.environmentsErrorTrackingIssuesAllActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingIssuesBulkCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/issues/bulk/`
- **OpenAPI operationId**: `environments_error_tracking_issues_bulk_create`
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

type EnvironmentsErrorTrackingIssuesBulkCreateInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesBulkCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesBulkCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesBulkCreate>>;

const result: EnvironmentsErrorTrackingIssuesBulkCreateOutput = await posthog.environmentsErrorTrackingIssuesBulkCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingIssuesExistsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/issues/exists/`
- **OpenAPI operationId**: `environments_error_tracking_issues_exists_retrieve`
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

type EnvironmentsErrorTrackingIssuesExistsRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesExistsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesExistsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesExistsRetrieve>>;

const result: EnvironmentsErrorTrackingIssuesExistsRetrieveOutput = await posthog.environmentsErrorTrackingIssuesExistsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingIssuesValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/issues/values/`
- **OpenAPI operationId**: `environments_error_tracking_issues_values_retrieve`
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

type EnvironmentsErrorTrackingIssuesValuesRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingIssuesValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingIssuesValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingIssuesValuesRetrieve>>;

const result: EnvironmentsErrorTrackingIssuesValuesRetrieveOutput = await posthog.environmentsErrorTrackingIssuesValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingQueryIssueEventsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/query/issue_events/`
- **What it does**: List sampled exception events for an error tracking issue
- **OpenAPI operationId**: `environments_error_tracking_query_issue_events_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ uuid?: string; distinct_id?: string; timestamp?: string; properties?: { [key: string]: unknown } })[]; hasMore: boolean; limit: number; offset: number; nextOffset?: number }`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingQueryIssueEventsCreateInput = Parameters<typeof posthog.environmentsErrorTrackingQueryIssueEventsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingQueryIssueEventsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingQueryIssueEventsCreate>>;

const result: EnvironmentsErrorTrackingQueryIssueEventsCreateOutput = await posthog.environmentsErrorTrackingQueryIssueEventsCreate();

// Result shape (from schema): { results: ({ uuid?: string; distinct_id?: string; timestamp?: string; properties?: { [key: string]: unknown } })[]; hasMore: boolean; limit: number; offset: number; nextOffset?: number }
```

### `posthog.environmentsErrorTrackingQueryIssueCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/query/issue/`
- **What it does**: Get compact error tracking issue details
- **OpenAPI operationId**: `environments_error_tracking_query_issue_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string | null; status?: string; first_seen?: string | null; last_seen?: string | null; library?: string | null; source?: string | null; assignee?: { id?: string | number...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingQueryIssueCreateInput = Parameters<typeof posthog.environmentsErrorTrackingQueryIssueCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingQueryIssueCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingQueryIssueCreate>>;

const result: EnvironmentsErrorTrackingQueryIssueCreateOutput = await posthog.environmentsErrorTrackingQueryIssueCreate();

// Result shape (from schema): { id: string; name?: string | null; description?: string | null; status?: string; first_seen?: string | null; last_seen?: string | null; library?: string | null; source?: string | null; assignee?: { id?: string | number...
```

### `posthog.environmentsErrorTrackingQueryIssuesListCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/query/issues/`
- **What it does**: List compact error tracking issues
- **OpenAPI operationId**: `environments_error_tracking_query_issues_list_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; name?: string | null; description?: string | null; status?: string; first_seen?: string | null; last_seen?: string | null; library?: string | null; source?: string | null; assignee?: { id?: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingQueryIssuesListCreateInput = Parameters<typeof posthog.environmentsErrorTrackingQueryIssuesListCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingQueryIssuesListCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingQueryIssuesListCreate>>;

const result: EnvironmentsErrorTrackingQueryIssuesListCreateOutput = await posthog.environmentsErrorTrackingQueryIssuesListCreate();

// Result shape (from schema): { results: ({ id: string; name?: string | null; description?: string | null; status?: string; first_seen?: string | null; last_seen?: string | null; library?: string | null; source?: string | null; assignee?: { id?: str...
```

### `posthog.environmentsErrorTrackingRecommendationsList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/recommendations/`
- **OpenAPI operationId**: `environments_error_tracking_recommendations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingRecommendationsListInput = Parameters<typeof posthog.environmentsErrorTrackingRecommendationsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingRecommendationsListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingRecommendationsList>>;

const result: EnvironmentsErrorTrackingRecommendationsListOutput = await posthog.environmentsErrorTrackingRecommendationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_...
```

### `posthog.environmentsErrorTrackingRecommendationsDismissCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/recommendations/{id}/dismiss/`
- **OpenAPI operationId**: `environments_error_tracking_recommendations_dismiss_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingRecommendationsDismissCreateInput = Parameters<typeof posthog.environmentsErrorTrackingRecommendationsDismissCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingRecommendationsDismissCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingRecommendationsDismissCreate>>;

const result: EnvironmentsErrorTrackingRecommendationsDismissCreateOutput = await posthog.environmentsErrorTrackingRecommendationsDismissCreate();

// Result shape (from schema): { id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }
```

### `posthog.environmentsErrorTrackingRecommendationsRefreshCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/recommendations/{id}/refresh/`
- **OpenAPI operationId**: `environments_error_tracking_recommendations_refresh_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingRecommendationsRefreshCreateInput = Parameters<typeof posthog.environmentsErrorTrackingRecommendationsRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingRecommendationsRefreshCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingRecommendationsRefreshCreate>>;

const result: EnvironmentsErrorTrackingRecommendationsRefreshCreateOutput = await posthog.environmentsErrorTrackingRecommendationsRefreshCreate();

// Result shape (from schema): { id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }
```

### `posthog.environmentsErrorTrackingRecommendationsRestoreCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/recommendations/{id}/restore/`
- **OpenAPI operationId**: `environments_error_tracking_recommendations_restore_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingRecommendationsRestoreCreateInput = Parameters<typeof posthog.environmentsErrorTrackingRecommendationsRestoreCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingRecommendationsRestoreCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingRecommendationsRestoreCreate>>;

const result: EnvironmentsErrorTrackingRecommendationsRestoreCreateOutput = await posthog.environmentsErrorTrackingRecommendationsRestoreCreate();

// Result shape (from schema): { id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }
```

### `posthog.environmentsErrorTrackingReleasesList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/releases/`
- **OpenAPI operationId**: `environments_error_tracking_releases_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingReleasesListInput = Parameters<typeof posthog.environmentsErrorTrackingReleasesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingReleasesListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingReleasesList>>;

const result: EnvironmentsErrorTrackingReleasesListOutput = await posthog.environmentsErrorTrackingReleasesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: strin...
```

### `posthog.environmentsErrorTrackingReleasesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/releases/`
- **OpenAPI operationId**: `environments_error_tracking_releases_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingReleasesCreateInput = Parameters<typeof posthog.environmentsErrorTrackingReleasesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingReleasesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingReleasesCreate>>;

const result: EnvironmentsErrorTrackingReleasesCreateOutput = await posthog.environmentsErrorTrackingReleasesCreate();

// Result shape (from schema): { id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: string }
```

### `posthog.environmentsErrorTrackingReleasesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/error_tracking/releases/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_releases_destroy`
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

type EnvironmentsErrorTrackingReleasesDestroyInput = Parameters<typeof posthog.environmentsErrorTrackingReleasesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingReleasesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingReleasesDestroy>>;

const result: EnvironmentsErrorTrackingReleasesDestroyOutput = await posthog.environmentsErrorTrackingReleasesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingReleasesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/releases/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_releases_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingReleasesRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingReleasesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingReleasesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingReleasesRetrieve>>;

const result: EnvironmentsErrorTrackingReleasesRetrieveOutput = await posthog.environmentsErrorTrackingReleasesRetrieve();

// Result shape (from schema): { id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: string }
```

### `posthog.environmentsErrorTrackingReleasesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/releases/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_releases_partial_update`
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

type EnvironmentsErrorTrackingReleasesPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingReleasesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingReleasesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingReleasesPartialUpdate>>;

const result: EnvironmentsErrorTrackingReleasesPartialUpdateOutput = await posthog.environmentsErrorTrackingReleasesPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingReleasesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/error_tracking/releases/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_releases_update`
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

type EnvironmentsErrorTrackingReleasesUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingReleasesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingReleasesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingReleasesUpdate>>;

const result: EnvironmentsErrorTrackingReleasesUpdateOutput = await posthog.environmentsErrorTrackingReleasesUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingReleasesHashRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/releases/hash/{hash_id}/`
- **OpenAPI operationId**: `environments_error_tracking_releases_hash_retrieve`
- **Path params**: `hash_id`
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

type EnvironmentsErrorTrackingReleasesHashRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingReleasesHashRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingReleasesHashRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingReleasesHashRetrieve>>;

const result: EnvironmentsErrorTrackingReleasesHashRetrieveOutput = await posthog.environmentsErrorTrackingReleasesHashRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingSettingsRetrieveSettingsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/settings/retrieve_settings/`
- **OpenAPI operationId**: `environments_error_tracking_settings_retrieve_settings_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ project_rate_limit_value?: number | null; project_rate_limit_bucket_size_minutes?: number | null; per_issue_rate_limit_value?: number | null; per_issue_rate_limit_bucket_size_minutes?: number | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSettingsRetrieveSettingsRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingSettingsRetrieveSettingsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSettingsRetrieveSettingsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSettingsRetrieveSettingsRetrieve>>;

const result: EnvironmentsErrorTrackingSettingsRetrieveSettingsRetrieveOutput = await posthog.environmentsErrorTrackingSettingsRetrieveSettingsRetrieve();

// Result shape (from schema): { project_rate_limit_value?: number | null; project_rate_limit_bucket_size_minutes?: number | null; per_issue_rate_limit_value?: number | null; per_issue_rate_limit_bucket_size_minutes?: number | null }
```

### `posthog.environmentsErrorTrackingSettingsUpdateSettingsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/settings/update_settings/`
- **OpenAPI operationId**: `environments_error_tracking_settings_update_settings_partial_update`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ project_rate_limit_value?: number | null; project_rate_limit_bucket_size_minutes?: number | null; per_issue_rate_limit_value?: number | null; per_issue_rate_limit_bucket_size_minutes?: number | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSettingsUpdateSettingsPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingSettingsUpdateSettingsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSettingsUpdateSettingsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSettingsUpdateSettingsPartialUpdate>>;

const result: EnvironmentsErrorTrackingSettingsUpdateSettingsPartialUpdateOutput = await posthog.environmentsErrorTrackingSettingsUpdateSettingsPartialUpdate();

// Result shape (from schema): { project_rate_limit_value?: number | null; project_rate_limit_bucket_size_minutes?: number | null; per_issue_rate_limit_value?: number | null; per_issue_rate_limit_bucket_size_minutes?: number | null }
```

### `posthog.environmentsErrorTrackingSpikeDetectionConfigList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/spike_detection_config/`
- **OpenAPI operationId**: `environments_error_tracking_spike_detection_config_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ snooze_duration_minutes: number; multiplier: number; threshold: number })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSpikeDetectionConfigListInput = Parameters<typeof posthog.environmentsErrorTrackingSpikeDetectionConfigList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSpikeDetectionConfigListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSpikeDetectionConfigList>>;

const result: EnvironmentsErrorTrackingSpikeDetectionConfigListOutput = await posthog.environmentsErrorTrackingSpikeDetectionConfigList();

// Result shape (from schema): ({ snooze_duration_minutes: number; multiplier: number; threshold: number })[]
```

### `posthog.environmentsErrorTrackingSpikeDetectionConfigUpdateConfigPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/spike_detection_config/update_config/`
- **OpenAPI operationId**: `environments_error_tracking_spike_detection_config_update_config_partial_update`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ snooze_duration_minutes: number; multiplier: number; threshold: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSpikeDetectionConfigUpdateConfigPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingSpikeDetectionConfigUpdateConfigPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSpikeDetectionConfigUpdateConfigPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSpikeDetectionConfigUpdateConfigPartialUpdate>>;

const result: EnvironmentsErrorTrackingSpikeDetectionConfigUpdateConfigPartialUpdateOutput = await posthog.environmentsErrorTrackingSpikeDetectionConfigUpdateConfigPartialUpdate();

// Result shape (from schema): { snooze_duration_minutes: number; multiplier: number; threshold: number }
```

### `posthog.environmentsErrorTrackingSpikeEventsList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/spike_events/`
- **OpenAPI operationId**: `environments_error_tracking_spike_events_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; issue: { id: string; name: string | null; description: string | null }; detected_at: string; computed_baseline: number; current_bu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSpikeEventsListInput = Parameters<typeof posthog.environmentsErrorTrackingSpikeEventsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSpikeEventsListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSpikeEventsList>>;

const result: EnvironmentsErrorTrackingSpikeEventsListOutput = await posthog.environmentsErrorTrackingSpikeEventsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; issue: { id: string; name: string | null; description: string | null }; detected_at: string; computed_baseline: number; current_bu...
```

### `posthog.environmentsErrorTrackingStackFramesList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/stack_frames/`
- **OpenAPI operationId**: `environments_error_tracking_stack_frames_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingStackFramesListInput = Parameters<typeof posthog.environmentsErrorTrackingStackFramesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingStackFramesListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingStackFramesList>>;

const result: EnvironmentsErrorTrackingStackFramesListOutput = await posthog.environmentsErrorTrackingStackFramesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } |...
```

### `posthog.environmentsErrorTrackingStackFramesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/error_tracking/stack_frames/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_error_tracking_stack_frames_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingStackFramesDestroyInput = Parameters<typeof posthog.environmentsErrorTrackingStackFramesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingStackFramesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingStackFramesDestroy>>;

const result: EnvironmentsErrorTrackingStackFramesDestroyOutput = await posthog.environmentsErrorTrackingStackFramesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingStackFramesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/stack_frames/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_stack_frames_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } | null; symbol_set_ref: string | null; release: { id: string; hash_id: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingStackFramesRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingStackFramesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingStackFramesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingStackFramesRetrieve>>;

const result: EnvironmentsErrorTrackingStackFramesRetrieveOutput = await posthog.environmentsErrorTrackingStackFramesRetrieve();

// Result shape (from schema): { id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } | null; symbol_set_ref: string | null; release: { id: string; hash_id: strin...
```

### `posthog.environmentsErrorTrackingStackFramesBatchGetCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/stack_frames/batch_get/`
- **OpenAPI operationId**: `environments_error_tracking_stack_frames_batch_get_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } | null; symbol_set_ref: string | null; release: { id: string; ha...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingStackFramesBatchGetCreateInput = Parameters<typeof posthog.environmentsErrorTrackingStackFramesBatchGetCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingStackFramesBatchGetCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingStackFramesBatchGetCreate>>;

const result: EnvironmentsErrorTrackingStackFramesBatchGetCreateOutput = await posthog.environmentsErrorTrackingStackFramesBatchGetCreate();

// Result shape (from schema): { results: ({ id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } | null; symbol_set_ref: string | null; release: { id: string; ha...
```

### `posthog.environmentsErrorTrackingSuppressionRulesList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/suppression_rules/`
- **OpenAPI operationId**: `environments_error_tracking_suppression_rules_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSuppressionRulesListInput = Parameters<typeof posthog.environmentsErrorTrackingSuppressionRulesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSuppressionRulesListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSuppressionRulesList>>;

const result: EnvironmentsErrorTrackingSuppressionRulesListOutput = await posthog.environmentsErrorTrackingSuppressionRulesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string })[] }
```

### `posthog.environmentsErrorTrackingSuppressionRulesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/suppression_rules/`
- **OpenAPI operationId**: `environments_error_tracking_suppression_rules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSuppressionRulesCreateInput = Parameters<typeof posthog.environmentsErrorTrackingSuppressionRulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSuppressionRulesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSuppressionRulesCreate>>;

const result: EnvironmentsErrorTrackingSuppressionRulesCreateOutput = await posthog.environmentsErrorTrackingSuppressionRulesCreate();

// Result shape (from schema): { id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string }
```

### `posthog.environmentsErrorTrackingSuppressionRulesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/error_tracking/suppression_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_suppression_rules_destroy`
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

type EnvironmentsErrorTrackingSuppressionRulesDestroyInput = Parameters<typeof posthog.environmentsErrorTrackingSuppressionRulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSuppressionRulesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSuppressionRulesDestroy>>;

const result: EnvironmentsErrorTrackingSuppressionRulesDestroyOutput = await posthog.environmentsErrorTrackingSuppressionRulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingSuppressionRulesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/suppression_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_suppression_rules_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSuppressionRulesRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingSuppressionRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSuppressionRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSuppressionRulesRetrieve>>;

const result: EnvironmentsErrorTrackingSuppressionRulesRetrieveOutput = await posthog.environmentsErrorTrackingSuppressionRulesRetrieve();

// Result shape (from schema): { id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string }
```

### `posthog.environmentsErrorTrackingSuppressionRulesPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/suppression_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_suppression_rules_partial_update`
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

type EnvironmentsErrorTrackingSuppressionRulesPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingSuppressionRulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSuppressionRulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSuppressionRulesPartialUpdate>>;

const result: EnvironmentsErrorTrackingSuppressionRulesPartialUpdateOutput = await posthog.environmentsErrorTrackingSuppressionRulesPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingSuppressionRulesUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/error_tracking/suppression_rules/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_suppression_rules_update`
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

type EnvironmentsErrorTrackingSuppressionRulesUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingSuppressionRulesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSuppressionRulesUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSuppressionRulesUpdate>>;

const result: EnvironmentsErrorTrackingSuppressionRulesUpdateOutput = await posthog.environmentsErrorTrackingSuppressionRulesUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingSuppressionRulesReorderPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/error_tracking/suppression_rules/reorder/`
- **OpenAPI operationId**: `environments_error_tracking_suppression_rules_reorder_partial_update`
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

type EnvironmentsErrorTrackingSuppressionRulesReorderPartialUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingSuppressionRulesReorderPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSuppressionRulesReorderPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSuppressionRulesReorderPartialUpdate>>;

const result: EnvironmentsErrorTrackingSuppressionRulesReorderPartialUpdateOutput = await posthog.environmentsErrorTrackingSuppressionRulesReorderPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingSymbolSetsList`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/symbol_sets/`
- **OpenAPI operationId**: `environments_error_tracking_symbol_sets_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `order_by`, `ref`, `search`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; ref: string; team_id: number; created_at: string; last_used: string | null; failure_reason: string | null; has_uploaded_file: bool...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSymbolSetsListInput = Parameters<typeof posthog.environmentsErrorTrackingSymbolSetsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSymbolSetsListOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSymbolSetsList>>;

const result: EnvironmentsErrorTrackingSymbolSetsListOutput = await posthog.environmentsErrorTrackingSymbolSetsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; ref: string; team_id: number; created_at: string; last_used: string | null; failure_reason: string | null; has_uploaded_file: bool...
```

### `posthog.environmentsErrorTrackingSymbolSetsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/error_tracking/symbol_sets/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_symbol_sets_destroy`
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

type EnvironmentsErrorTrackingSymbolSetsDestroyInput = Parameters<typeof posthog.environmentsErrorTrackingSymbolSetsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSymbolSetsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSymbolSetsDestroy>>;

const result: EnvironmentsErrorTrackingSymbolSetsDestroyOutput = await posthog.environmentsErrorTrackingSymbolSetsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingSymbolSetsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/symbol_sets/{id}/`
- **OpenAPI operationId**: `environments_error_tracking_symbol_sets_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; ref: string; team_id: number; created_at: string; last_used: string | null; failure_reason: string | null; has_uploaded_file: boolean; release: { id: string; hash_id: string; team_id: number; created_at: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSymbolSetsRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingSymbolSetsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSymbolSetsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSymbolSetsRetrieve>>;

const result: EnvironmentsErrorTrackingSymbolSetsRetrieveOutput = await posthog.environmentsErrorTrackingSymbolSetsRetrieve();

// Result shape (from schema): { id: string; ref: string; team_id: number; created_at: string; last_used: string | null; failure_reason: string | null; has_uploaded_file: boolean; release: { id: string; hash_id: string; team_id: number; created_at: s...
```

### `posthog.environmentsErrorTrackingSymbolSetsDownloadRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/error_tracking/symbol_sets/{id}/download/`
- **What it does**: Return a presigned URL for downloading the symbol set's source map.
- **OpenAPI operationId**: `environments_error_tracking_symbol_sets_download_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ url: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsErrorTrackingSymbolSetsDownloadRetrieveInput = Parameters<typeof posthog.environmentsErrorTrackingSymbolSetsDownloadRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSymbolSetsDownloadRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSymbolSetsDownloadRetrieve>>;

const result: EnvironmentsErrorTrackingSymbolSetsDownloadRetrieveOutput = await posthog.environmentsErrorTrackingSymbolSetsDownloadRetrieve();

// Result shape (from schema): { url: string }
```

### `posthog.environmentsErrorTrackingSymbolSetsFinishUploadUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/error_tracking/symbol_sets/{id}/finish_upload/`
- **OpenAPI operationId**: `environments_error_tracking_symbol_sets_finish_upload_update`
- **Path params**: `id`
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

type EnvironmentsErrorTrackingSymbolSetsFinishUploadUpdateInput = Parameters<typeof posthog.environmentsErrorTrackingSymbolSetsFinishUploadUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSymbolSetsFinishUploadUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSymbolSetsFinishUploadUpdate>>;

const result: EnvironmentsErrorTrackingSymbolSetsFinishUploadUpdateOutput = await posthog.environmentsErrorTrackingSymbolSetsFinishUploadUpdate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingSymbolSetsBulkDeleteCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/symbol_sets/bulk_delete/`
- **OpenAPI operationId**: `environments_error_tracking_symbol_sets_bulk_delete_create`
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

type EnvironmentsErrorTrackingSymbolSetsBulkDeleteCreateInput = Parameters<typeof posthog.environmentsErrorTrackingSymbolSetsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSymbolSetsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSymbolSetsBulkDeleteCreate>>;

const result: EnvironmentsErrorTrackingSymbolSetsBulkDeleteCreateOutput = await posthog.environmentsErrorTrackingSymbolSetsBulkDeleteCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingSymbolSetsBulkFinishUploadCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/symbol_sets/bulk_finish_upload/`
- **OpenAPI operationId**: `environments_error_tracking_symbol_sets_bulk_finish_upload_create`
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

type EnvironmentsErrorTrackingSymbolSetsBulkFinishUploadCreateInput = Parameters<typeof posthog.environmentsErrorTrackingSymbolSetsBulkFinishUploadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSymbolSetsBulkFinishUploadCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSymbolSetsBulkFinishUploadCreate>>;

const result: EnvironmentsErrorTrackingSymbolSetsBulkFinishUploadCreateOutput = await posthog.environmentsErrorTrackingSymbolSetsBulkFinishUploadCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsErrorTrackingSymbolSetsBulkStartUploadCreate`

- **HTTP**: `POST /api/environments/{environment_id}/error_tracking/symbol_sets/bulk_start_upload/`
- **OpenAPI operationId**: `environments_error_tracking_symbol_sets_bulk_start_upload_create`
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

type EnvironmentsErrorTrackingSymbolSetsBulkStartUploadCreateInput = Parameters<typeof posthog.environmentsErrorTrackingSymbolSetsBulkStartUploadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsErrorTrackingSymbolSetsBulkStartUploadCreateOutput = Awaited<ReturnType<typeof posthog.environmentsErrorTrackingSymbolSetsBulkStartUploadCreate>>;

const result: EnvironmentsErrorTrackingSymbolSetsBulkStartUploadCreateOutput = await posthog.environmentsErrorTrackingSymbolSetsBulkStartUploadCreate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingAssignmentRulesList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/assignment_rules/`
- **OpenAPI operationId**: `error_tracking_assignment_rules_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; upda...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingAssignmentRulesListInput = Parameters<typeof posthog.errorTrackingAssignmentRulesList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingAssignmentRulesListOutput = Awaited<ReturnType<typeof posthog.errorTrackingAssignmentRulesList>>;

const result: ErrorTrackingAssignmentRulesListOutput = await posthog.errorTrackingAssignmentRulesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; upda...
```

### `posthog.errorTrackingAssignmentRulesCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/assignment_rules/`
- **OpenAPI operationId**: `error_tracking_assignment_rules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingAssignmentRulesCreateInput = Parameters<typeof posthog.errorTrackingAssignmentRulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingAssignmentRulesCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingAssignmentRulesCreate>>;

const result: ErrorTrackingAssignmentRulesCreateOutput = await posthog.errorTrackingAssignmentRulesCreate();

// Result shape (from schema): { id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }
```

### `posthog.errorTrackingAssignmentRulesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/error_tracking/assignment_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_assignment_rules_destroy`
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

type ErrorTrackingAssignmentRulesDestroyInput = Parameters<typeof posthog.errorTrackingAssignmentRulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingAssignmentRulesDestroyOutput = Awaited<ReturnType<typeof posthog.errorTrackingAssignmentRulesDestroy>>;

const result: ErrorTrackingAssignmentRulesDestroyOutput = await posthog.errorTrackingAssignmentRulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingAssignmentRulesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/assignment_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_assignment_rules_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingAssignmentRulesRetrieveInput = Parameters<typeof posthog.errorTrackingAssignmentRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingAssignmentRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingAssignmentRulesRetrieve>>;

const result: ErrorTrackingAssignmentRulesRetrieveOutput = await posthog.errorTrackingAssignmentRulesRetrieve();

// Result shape (from schema): { id: string; filters: unknown; assignee: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }
```

### `posthog.errorTrackingAssignmentRulesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/assignment_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_assignment_rules_partial_update`
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

type ErrorTrackingAssignmentRulesPartialUpdateInput = Parameters<typeof posthog.errorTrackingAssignmentRulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingAssignmentRulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingAssignmentRulesPartialUpdate>>;

const result: ErrorTrackingAssignmentRulesPartialUpdateOutput = await posthog.errorTrackingAssignmentRulesPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingAssignmentRulesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/error_tracking/assignment_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_assignment_rules_update`
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

type ErrorTrackingAssignmentRulesUpdateInput = Parameters<typeof posthog.errorTrackingAssignmentRulesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingAssignmentRulesUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingAssignmentRulesUpdate>>;

const result: ErrorTrackingAssignmentRulesUpdateOutput = await posthog.errorTrackingAssignmentRulesUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingAssignmentRulesReorderPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/assignment_rules/reorder/`
- **OpenAPI operationId**: `error_tracking_assignment_rules_reorder_partial_update`
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

type ErrorTrackingAssignmentRulesReorderPartialUpdateInput = Parameters<typeof posthog.errorTrackingAssignmentRulesReorderPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingAssignmentRulesReorderPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingAssignmentRulesReorderPartialUpdate>>;

const result: ErrorTrackingAssignmentRulesReorderPartialUpdateOutput = await posthog.errorTrackingAssignmentRulesReorderPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingBypassRulesList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/bypass_rules/`
- **OpenAPI operationId**: `error_tracking_bypass_rules_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingBypassRulesListInput = Parameters<typeof posthog.errorTrackingBypassRulesList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingBypassRulesListOutput = Awaited<ReturnType<typeof posthog.errorTrackingBypassRulesList>>;

const result: ErrorTrackingBypassRulesListOutput = await posthog.errorTrackingBypassRulesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string })[] }
```

### `posthog.errorTrackingBypassRulesCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/bypass_rules/`
- **OpenAPI operationId**: `error_tracking_bypass_rules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingBypassRulesCreateInput = Parameters<typeof posthog.errorTrackingBypassRulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingBypassRulesCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingBypassRulesCreate>>;

const result: ErrorTrackingBypassRulesCreateOutput = await posthog.errorTrackingBypassRulesCreate();

// Result shape (from schema): { id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }
```

### `posthog.errorTrackingBypassRulesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/error_tracking/bypass_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_bypass_rules_destroy`
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

type ErrorTrackingBypassRulesDestroyInput = Parameters<typeof posthog.errorTrackingBypassRulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingBypassRulesDestroyOutput = Awaited<ReturnType<typeof posthog.errorTrackingBypassRulesDestroy>>;

const result: ErrorTrackingBypassRulesDestroyOutput = await posthog.errorTrackingBypassRulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingBypassRulesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/bypass_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_bypass_rules_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingBypassRulesRetrieveInput = Parameters<typeof posthog.errorTrackingBypassRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingBypassRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingBypassRulesRetrieve>>;

const result: ErrorTrackingBypassRulesRetrieveOutput = await posthog.errorTrackingBypassRulesRetrieve();

// Result shape (from schema): { id: string; filters: unknown; order_key: number; disabled_data: unknown; created_at: string; updated_at: string }
```

### `posthog.errorTrackingBypassRulesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/bypass_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_bypass_rules_partial_update`
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

type ErrorTrackingBypassRulesPartialUpdateInput = Parameters<typeof posthog.errorTrackingBypassRulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingBypassRulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingBypassRulesPartialUpdate>>;

const result: ErrorTrackingBypassRulesPartialUpdateOutput = await posthog.errorTrackingBypassRulesPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingBypassRulesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/error_tracking/bypass_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_bypass_rules_update`
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

type ErrorTrackingBypassRulesUpdateInput = Parameters<typeof posthog.errorTrackingBypassRulesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingBypassRulesUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingBypassRulesUpdate>>;

const result: ErrorTrackingBypassRulesUpdateOutput = await posthog.errorTrackingBypassRulesUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingBypassRulesReorderPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/bypass_rules/reorder/`
- **OpenAPI operationId**: `error_tracking_bypass_rules_reorder_partial_update`
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

type ErrorTrackingBypassRulesReorderPartialUpdateInput = Parameters<typeof posthog.errorTrackingBypassRulesReorderPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingBypassRulesReorderPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingBypassRulesReorderPartialUpdate>>;

const result: ErrorTrackingBypassRulesReorderPartialUpdateOutput = await posthog.errorTrackingBypassRulesReorderPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingExternalReferencesList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/external_references/`
- **OpenAPI operationId**: `error_tracking_external_references_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingExternalReferencesListInput = Parameters<typeof posthog.errorTrackingExternalReferencesList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingExternalReferencesListOutput = Awaited<ReturnType<typeof posthog.errorTrackingExternalReferencesList>>;

const result: ErrorTrackingExternalReferencesListOutput = await posthog.errorTrackingExternalReferencesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefin...
```

### `posthog.errorTrackingExternalReferencesCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/external_references/`
- **OpenAPI operationId**: `error_tracking_external_references_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefined }; issue: string; external_url: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingExternalReferencesCreateInput = Parameters<typeof posthog.errorTrackingExternalReferencesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingExternalReferencesCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingExternalReferencesCreate>>;

const result: ErrorTrackingExternalReferencesCreateOutput = await posthog.errorTrackingExternalReferencesCreate();

// Result shape (from schema): { id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefined }; issue: string; external_url: string }
```

### `posthog.errorTrackingExternalReferencesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/error_tracking/external_references/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `error_tracking_external_references_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingExternalReferencesDestroyInput = Parameters<typeof posthog.errorTrackingExternalReferencesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingExternalReferencesDestroyOutput = Awaited<ReturnType<typeof posthog.errorTrackingExternalReferencesDestroy>>;

const result: ErrorTrackingExternalReferencesDestroyOutput = await posthog.errorTrackingExternalReferencesDestroy();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingExternalReferencesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/external_references/{id}/`
- **OpenAPI operationId**: `error_tracking_external_references_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefined }; issue: string; external_url: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingExternalReferencesRetrieveInput = Parameters<typeof posthog.errorTrackingExternalReferencesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingExternalReferencesRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingExternalReferencesRetrieve>>;

const result: ErrorTrackingExternalReferencesRetrieveOutput = await posthog.errorTrackingExternalReferencesRetrieve();

// Result shape (from schema): { id: string; integration: { id: number; kind: string; display_name: string }; integration_id: number; config: { [key: string]: string | undefined }; issue: string; external_url: string }
```

### `posthog.errorTrackingFingerprintsList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/fingerprints/`
- **OpenAPI operationId**: `error_tracking_fingerprints_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; fingerprint: string; issue_id: string; created_at: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingFingerprintsListInput = Parameters<typeof posthog.errorTrackingFingerprintsList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingFingerprintsListOutput = Awaited<ReturnType<typeof posthog.errorTrackingFingerprintsList>>;

const result: ErrorTrackingFingerprintsListOutput = await posthog.errorTrackingFingerprintsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; fingerprint: string; issue_id: string; created_at: string })[] }
```

### `posthog.errorTrackingFingerprintsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/error_tracking/fingerprints/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `error_tracking_fingerprints_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingFingerprintsDestroyInput = Parameters<typeof posthog.errorTrackingFingerprintsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingFingerprintsDestroyOutput = Awaited<ReturnType<typeof posthog.errorTrackingFingerprintsDestroy>>;

const result: ErrorTrackingFingerprintsDestroyOutput = await posthog.errorTrackingFingerprintsDestroy();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingFingerprintsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/fingerprints/{id}/`
- **OpenAPI operationId**: `error_tracking_fingerprints_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; fingerprint: string; issue_id: string; created_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingFingerprintsRetrieveInput = Parameters<typeof posthog.errorTrackingFingerprintsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingFingerprintsRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingFingerprintsRetrieve>>;

const result: ErrorTrackingFingerprintsRetrieveOutput = await posthog.errorTrackingFingerprintsRetrieve();

// Result shape (from schema): { id: string; fingerprint: string; issue_id: string; created_at: string }
```

### `posthog.errorTrackingGitProviderFileLinksResolveGithubRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/git-provider-file-links/resolve_github/`
- **OpenAPI operationId**: `error_tracking_git_provider_file_links_resolve_github_retrieve`
- **Path params**: None
- **Query params**: `code_sample`, `file_name`, `owner`, `repository`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ found: boolean; url?: string; error?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingGitProviderFileLinksResolveGithubRetrieveInput = Parameters<typeof posthog.errorTrackingGitProviderFileLinksResolveGithubRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingGitProviderFileLinksResolveGithubRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingGitProviderFileLinksResolveGithubRetrieve>>;

const result: ErrorTrackingGitProviderFileLinksResolveGithubRetrieveOutput = await posthog.errorTrackingGitProviderFileLinksResolveGithubRetrieve();

// Result shape (from schema): { found: boolean; url?: string; error?: string }
```

### `posthog.errorTrackingGitProviderFileLinksResolveGitlabRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/git-provider-file-links/resolve_gitlab/`
- **OpenAPI operationId**: `error_tracking_git_provider_file_links_resolve_gitlab_retrieve`
- **Path params**: None
- **Query params**: `code_sample`, `file_name`, `owner`, `repository`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ found: boolean; url?: string; error?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingGitProviderFileLinksResolveGitlabRetrieveInput = Parameters<typeof posthog.errorTrackingGitProviderFileLinksResolveGitlabRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingGitProviderFileLinksResolveGitlabRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingGitProviderFileLinksResolveGitlabRetrieve>>;

const result: ErrorTrackingGitProviderFileLinksResolveGitlabRetrieveOutput = await posthog.errorTrackingGitProviderFileLinksResolveGitlabRetrieve();

// Result shape (from schema): { found: boolean; url?: string; error?: string }
```

### `posthog.errorTrackingGroupingRulesList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/grouping_rules/`
- **OpenAPI operationId**: `error_tracking_grouping_rules_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingGroupingRulesListInput = Parameters<typeof posthog.errorTrackingGroupingRulesList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingGroupingRulesListOutput = Awaited<ReturnType<typeof posthog.errorTrackingGroupingRulesList>>;

const result: ErrorTrackingGroupingRulesListOutput = await posthog.errorTrackingGroupingRulesList();

// Result shape (from schema): { results: ({ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: strin...
```

### `posthog.errorTrackingGroupingRulesCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/grouping_rules/`
- **OpenAPI operationId**: `error_tracking_grouping_rules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_a...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingGroupingRulesCreateInput = Parameters<typeof posthog.errorTrackingGroupingRulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingGroupingRulesCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingGroupingRulesCreate>>;

const result: ErrorTrackingGroupingRulesCreateOutput = await posthog.errorTrackingGroupingRulesCreate();

// Result shape (from schema): { id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_a...
```

### `posthog.errorTrackingGroupingRulesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/error_tracking/grouping_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_grouping_rules_destroy`
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

type ErrorTrackingGroupingRulesDestroyInput = Parameters<typeof posthog.errorTrackingGroupingRulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingGroupingRulesDestroyOutput = Awaited<ReturnType<typeof posthog.errorTrackingGroupingRulesDestroy>>;

const result: ErrorTrackingGroupingRulesDestroyOutput = await posthog.errorTrackingGroupingRulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingGroupingRulesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/grouping_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_grouping_rules_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_a...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingGroupingRulesRetrieveInput = Parameters<typeof posthog.errorTrackingGroupingRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingGroupingRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingGroupingRulesRetrieve>>;

const result: ErrorTrackingGroupingRulesRetrieveOutput = await posthog.errorTrackingGroupingRulesRetrieve();

// Result shape (from schema): { id: string; filters: unknown; assignee: { [key: string]: unknown } | null; description: string | null; issue: { [key: string]: unknown } | null; order_key: number; disabled_data: unknown; created_at: string; updated_a...
```

### `posthog.errorTrackingGroupingRulesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/grouping_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_grouping_rules_partial_update`
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

type ErrorTrackingGroupingRulesPartialUpdateInput = Parameters<typeof posthog.errorTrackingGroupingRulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingGroupingRulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingGroupingRulesPartialUpdate>>;

const result: ErrorTrackingGroupingRulesPartialUpdateOutput = await posthog.errorTrackingGroupingRulesPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingGroupingRulesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/error_tracking/grouping_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_grouping_rules_update`
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

type ErrorTrackingGroupingRulesUpdateInput = Parameters<typeof posthog.errorTrackingGroupingRulesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingGroupingRulesUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingGroupingRulesUpdate>>;

const result: ErrorTrackingGroupingRulesUpdateOutput = await posthog.errorTrackingGroupingRulesUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingGroupingRulesReorderPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/grouping_rules/reorder/`
- **OpenAPI operationId**: `error_tracking_grouping_rules_reorder_partial_update`
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

type ErrorTrackingGroupingRulesReorderPartialUpdateInput = Parameters<typeof posthog.errorTrackingGroupingRulesReorderPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingGroupingRulesReorderPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingGroupingRulesReorderPartialUpdate>>;

const result: ErrorTrackingGroupingRulesReorderPartialUpdateOutput = await posthog.errorTrackingGroupingRulesReorderPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingIssuesList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/issues/`
- **OpenAPI operationId**: `error_tracking_issues_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingIssuesListInput = Parameters<typeof posthog.errorTrackingIssuesList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesListOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesList>>;

const result: ErrorTrackingIssuesListOutput = await posthog.errorTrackingIssuesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null...
```

### `posthog.errorTrackingIssuesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/error_tracking/issues/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `error_tracking_issues_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingIssuesDestroyInput = Parameters<typeof posthog.errorTrackingIssuesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesDestroyOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesDestroy>>;

const result: ErrorTrackingIssuesDestroyOutput = await posthog.errorTrackingIssuesDestroy();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingIssuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/issues/{id}/`
- **OpenAPI operationId**: `error_tracking_issues_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingIssuesRetrieveInput = Parameters<typeof posthog.errorTrackingIssuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesRetrieve>>;

const result: ErrorTrackingIssuesRetrieveOutput = await posthog.errorTrackingIssuesRetrieve();

// Result shape (from schema): { id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...
```

### `posthog.errorTrackingIssuesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/issues/{id}/`
- **OpenAPI operationId**: `error_tracking_issues_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingIssuesPartialUpdateInput = Parameters<typeof posthog.errorTrackingIssuesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesPartialUpdate>>;

const result: ErrorTrackingIssuesPartialUpdateOutput = await posthog.errorTrackingIssuesPartialUpdate();

// Result shape (from schema): { id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...
```

### `posthog.errorTrackingIssuesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/error_tracking/issues/{id}/`
- **OpenAPI operationId**: `error_tracking_issues_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingIssuesUpdateInput = Parameters<typeof posthog.errorTrackingIssuesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesUpdate>>;

const result: ErrorTrackingIssuesUpdateOutput = await posthog.errorTrackingIssuesUpdate();

// Result shape (from schema): { id: string; status: string; name: string | null; description: string | null; first_seen: string | null; assignee: { id: number | string | null; type: string } | null; external_issues: ({ id: string; integration: { id:...
```

### `posthog.errorTrackingIssuesActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/issues/{id}/activity/`
- **OpenAPI operationId**: `error_tracking_issues_activity_retrieve`
- **Path params**: `id`
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

type ErrorTrackingIssuesActivityRetrieveInput = Parameters<typeof posthog.errorTrackingIssuesActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesActivityRetrieve>>;

const result: ErrorTrackingIssuesActivityRetrieveOutput = await posthog.errorTrackingIssuesActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingIssuesAssignPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/issues/{id}/assign/`
- **OpenAPI operationId**: `error_tracking_issues_assign_partial_update`
- **Path params**: `id`
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

type ErrorTrackingIssuesAssignPartialUpdateInput = Parameters<typeof posthog.errorTrackingIssuesAssignPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesAssignPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesAssignPartialUpdate>>;

const result: ErrorTrackingIssuesAssignPartialUpdateOutput = await posthog.errorTrackingIssuesAssignPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingIssuesCohortUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/error_tracking/issues/{id}/cohort/`
- **OpenAPI operationId**: `error_tracking_issues_cohort_update`
- **Path params**: `id`
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

type ErrorTrackingIssuesCohortUpdateInput = Parameters<typeof posthog.errorTrackingIssuesCohortUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesCohortUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesCohortUpdate>>;

const result: ErrorTrackingIssuesCohortUpdateOutput = await posthog.errorTrackingIssuesCohortUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingIssuesMergeCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/issues/{id}/merge/`
- **OpenAPI operationId**: `error_tracking_issues_merge_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingIssuesMergeCreateInput = Parameters<typeof posthog.errorTrackingIssuesMergeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesMergeCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesMergeCreate>>;

const result: ErrorTrackingIssuesMergeCreateOutput = await posthog.errorTrackingIssuesMergeCreate();

// Result shape (from schema): { success: boolean }
```

### `posthog.errorTrackingIssuesSplitCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/issues/{id}/split/`
- **OpenAPI operationId**: `error_tracking_issues_split_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean; new_issue_ids: (string)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingIssuesSplitCreateInput = Parameters<typeof posthog.errorTrackingIssuesSplitCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesSplitCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesSplitCreate>>;

const result: ErrorTrackingIssuesSplitCreateOutput = await posthog.errorTrackingIssuesSplitCreate();

// Result shape (from schema): { success: boolean; new_issue_ids: (string)[] }
```

### `posthog.errorTrackingIssuesAllActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/issues/activity/`
- **OpenAPI operationId**: `error_tracking_issues_all_activity_retrieve`
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

type ErrorTrackingIssuesAllActivityRetrieveInput = Parameters<typeof posthog.errorTrackingIssuesAllActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesAllActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesAllActivityRetrieve>>;

const result: ErrorTrackingIssuesAllActivityRetrieveOutput = await posthog.errorTrackingIssuesAllActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingIssuesBulkCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/issues/bulk/`
- **OpenAPI operationId**: `error_tracking_issues_bulk_create`
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

type ErrorTrackingIssuesBulkCreateInput = Parameters<typeof posthog.errorTrackingIssuesBulkCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesBulkCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesBulkCreate>>;

const result: ErrorTrackingIssuesBulkCreateOutput = await posthog.errorTrackingIssuesBulkCreate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingIssuesExistsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/issues/exists/`
- **OpenAPI operationId**: `error_tracking_issues_exists_retrieve`
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

type ErrorTrackingIssuesExistsRetrieveInput = Parameters<typeof posthog.errorTrackingIssuesExistsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesExistsRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesExistsRetrieve>>;

const result: ErrorTrackingIssuesExistsRetrieveOutput = await posthog.errorTrackingIssuesExistsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingIssuesValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/issues/values/`
- **OpenAPI operationId**: `error_tracking_issues_values_retrieve`
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

type ErrorTrackingIssuesValuesRetrieveInput = Parameters<typeof posthog.errorTrackingIssuesValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingIssuesValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingIssuesValuesRetrieve>>;

const result: ErrorTrackingIssuesValuesRetrieveOutput = await posthog.errorTrackingIssuesValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingQueryIssueEventsCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/query/issue_events/`
- **What it does**: List sampled exception events for an error tracking issue
- **OpenAPI operationId**: `error_tracking_query_issue_events_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ uuid?: string; distinct_id?: string; timestamp?: string; properties?: { [key: string]: unknown } })[]; hasMore: boolean; limit: number; offset: number; nextOffset?: number }`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingQueryIssueEventsCreateInput = Parameters<typeof posthog.errorTrackingQueryIssueEventsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingQueryIssueEventsCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingQueryIssueEventsCreate>>;

const result: ErrorTrackingQueryIssueEventsCreateOutput = await posthog.errorTrackingQueryIssueEventsCreate();

// Result shape (from schema): { results: ({ uuid?: string; distinct_id?: string; timestamp?: string; properties?: { [key: string]: unknown } })[]; hasMore: boolean; limit: number; offset: number; nextOffset?: number }
```

### `posthog.errorTrackingQueryIssueCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/query/issue/`
- **What it does**: Get compact error tracking issue details
- **OpenAPI operationId**: `error_tracking_query_issue_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `404`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name?: string | null; description?: string | null; status?: string; first_seen?: string | null; last_seen?: string | null; library?: string | null; source?: string | null; assignee?: { id?: string | number...`
- OpenAPI response codes: `200`, `404`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingQueryIssueCreateInput = Parameters<typeof posthog.errorTrackingQueryIssueCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingQueryIssueCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingQueryIssueCreate>>;

const result: ErrorTrackingQueryIssueCreateOutput = await posthog.errorTrackingQueryIssueCreate();

// Result shape (from schema): { id: string; name?: string | null; description?: string | null; status?: string; first_seen?: string | null; last_seen?: string | null; library?: string | null; source?: string | null; assignee?: { id?: string | number...
```

### `posthog.errorTrackingQueryIssuesListCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/query/issues/`
- **What it does**: List compact error tracking issues
- **OpenAPI operationId**: `error_tracking_query_issues_list_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; name?: string | null; description?: string | null; status?: string; first_seen?: string | null; last_seen?: string | null; library?: string | null; source?: string | null; assignee?: { id?: str...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingQueryIssuesListCreateInput = Parameters<typeof posthog.errorTrackingQueryIssuesListCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingQueryIssuesListCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingQueryIssuesListCreate>>;

const result: ErrorTrackingQueryIssuesListCreateOutput = await posthog.errorTrackingQueryIssuesListCreate();

// Result shape (from schema): { results: ({ id: string; name?: string | null; description?: string | null; status?: string; first_seen?: string | null; last_seen?: string | null; library?: string | null; source?: string | null; assignee?: { id?: str...
```

### `posthog.errorTrackingRecommendationsList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/recommendations/`
- **OpenAPI operationId**: `error_tracking_recommendations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingRecommendationsListInput = Parameters<typeof posthog.errorTrackingRecommendationsList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingRecommendationsListOutput = Awaited<ReturnType<typeof posthog.errorTrackingRecommendationsList>>;

const result: ErrorTrackingRecommendationsListOutput = await posthog.errorTrackingRecommendationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_...
```

### `posthog.errorTrackingRecommendationsDismissCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/recommendations/{id}/dismiss/`
- **OpenAPI operationId**: `error_tracking_recommendations_dismiss_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingRecommendationsDismissCreateInput = Parameters<typeof posthog.errorTrackingRecommendationsDismissCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingRecommendationsDismissCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingRecommendationsDismissCreate>>;

const result: ErrorTrackingRecommendationsDismissCreateOutput = await posthog.errorTrackingRecommendationsDismissCreate();

// Result shape (from schema): { id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }
```

### `posthog.errorTrackingRecommendationsRefreshCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/recommendations/{id}/refresh/`
- **OpenAPI operationId**: `error_tracking_recommendations_refresh_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingRecommendationsRefreshCreateInput = Parameters<typeof posthog.errorTrackingRecommendationsRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingRecommendationsRefreshCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingRecommendationsRefreshCreate>>;

const result: ErrorTrackingRecommendationsRefreshCreateOutput = await posthog.errorTrackingRecommendationsRefreshCreate();

// Result shape (from schema): { id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }
```

### `posthog.errorTrackingRecommendationsRestoreCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/recommendations/{id}/restore/`
- **OpenAPI operationId**: `error_tracking_recommendations_restore_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingRecommendationsRestoreCreateInput = Parameters<typeof posthog.errorTrackingRecommendationsRestoreCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingRecommendationsRestoreCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingRecommendationsRestoreCreate>>;

const result: ErrorTrackingRecommendationsRestoreCreateOutput = await posthog.errorTrackingRecommendationsRestoreCreate();

// Result shape (from schema): { id: string; type: string; meta: unknown; completed: boolean; status: string; computed_at: string | null; dismissed_at: string | null; created_at: string; updated_at: string }
```

### `posthog.errorTrackingReleasesList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/releases/`
- **OpenAPI operationId**: `error_tracking_releases_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingReleasesListInput = Parameters<typeof posthog.errorTrackingReleasesList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingReleasesListOutput = Awaited<ReturnType<typeof posthog.errorTrackingReleasesList>>;

const result: ErrorTrackingReleasesListOutput = await posthog.errorTrackingReleasesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: strin...
```

### `posthog.errorTrackingReleasesCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/releases/`
- **OpenAPI operationId**: `error_tracking_releases_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingReleasesCreateInput = Parameters<typeof posthog.errorTrackingReleasesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingReleasesCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingReleasesCreate>>;

const result: ErrorTrackingReleasesCreateOutput = await posthog.errorTrackingReleasesCreate();

// Result shape (from schema): { id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: string }
```

### `posthog.errorTrackingReleasesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/error_tracking/releases/{id}/`
- **OpenAPI operationId**: `error_tracking_releases_destroy`
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

type ErrorTrackingReleasesDestroyInput = Parameters<typeof posthog.errorTrackingReleasesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingReleasesDestroyOutput = Awaited<ReturnType<typeof posthog.errorTrackingReleasesDestroy>>;

const result: ErrorTrackingReleasesDestroyOutput = await posthog.errorTrackingReleasesDestroy();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingReleasesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/releases/{id}/`
- **OpenAPI operationId**: `error_tracking_releases_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingReleasesRetrieveInput = Parameters<typeof posthog.errorTrackingReleasesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingReleasesRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingReleasesRetrieve>>;

const result: ErrorTrackingReleasesRetrieveOutput = await posthog.errorTrackingReleasesRetrieve();

// Result shape (from schema): { id: string; hash_id: string; team_id: number; created_at: string; metadata: { [key: string]: unknown } | null; version: string; project: string }
```

### `posthog.errorTrackingReleasesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/releases/{id}/`
- **OpenAPI operationId**: `error_tracking_releases_partial_update`
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

type ErrorTrackingReleasesPartialUpdateInput = Parameters<typeof posthog.errorTrackingReleasesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingReleasesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingReleasesPartialUpdate>>;

const result: ErrorTrackingReleasesPartialUpdateOutput = await posthog.errorTrackingReleasesPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingReleasesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/error_tracking/releases/{id}/`
- **OpenAPI operationId**: `error_tracking_releases_update`
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

type ErrorTrackingReleasesUpdateInput = Parameters<typeof posthog.errorTrackingReleasesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingReleasesUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingReleasesUpdate>>;

const result: ErrorTrackingReleasesUpdateOutput = await posthog.errorTrackingReleasesUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingReleasesHashRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/releases/hash/{hash_id}/`
- **OpenAPI operationId**: `error_tracking_releases_hash_retrieve`
- **Path params**: `hash_id`
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

type ErrorTrackingReleasesHashRetrieveInput = Parameters<typeof posthog.errorTrackingReleasesHashRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingReleasesHashRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingReleasesHashRetrieve>>;

const result: ErrorTrackingReleasesHashRetrieveOutput = await posthog.errorTrackingReleasesHashRetrieve();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingSettingsRetrieveSettingsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/settings/retrieve_settings/`
- **OpenAPI operationId**: `error_tracking_settings_retrieve_settings_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ project_rate_limit_value?: number | null; project_rate_limit_bucket_size_minutes?: number | null; per_issue_rate_limit_value?: number | null; per_issue_rate_limit_bucket_size_minutes?: number | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSettingsRetrieveSettingsRetrieveInput = Parameters<typeof posthog.errorTrackingSettingsRetrieveSettingsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSettingsRetrieveSettingsRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingSettingsRetrieveSettingsRetrieve>>;

const result: ErrorTrackingSettingsRetrieveSettingsRetrieveOutput = await posthog.errorTrackingSettingsRetrieveSettingsRetrieve();

// Result shape (from schema): { project_rate_limit_value?: number | null; project_rate_limit_bucket_size_minutes?: number | null; per_issue_rate_limit_value?: number | null; per_issue_rate_limit_bucket_size_minutes?: number | null }
```

### `posthog.errorTrackingSettingsUpdateSettingsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/settings/update_settings/`
- **OpenAPI operationId**: `error_tracking_settings_update_settings_partial_update`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ project_rate_limit_value?: number | null; project_rate_limit_bucket_size_minutes?: number | null; per_issue_rate_limit_value?: number | null; per_issue_rate_limit_bucket_size_minutes?: number | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSettingsUpdateSettingsPartialUpdateInput = Parameters<typeof posthog.errorTrackingSettingsUpdateSettingsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSettingsUpdateSettingsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingSettingsUpdateSettingsPartialUpdate>>;

const result: ErrorTrackingSettingsUpdateSettingsPartialUpdateOutput = await posthog.errorTrackingSettingsUpdateSettingsPartialUpdate();

// Result shape (from schema): { project_rate_limit_value?: number | null; project_rate_limit_bucket_size_minutes?: number | null; per_issue_rate_limit_value?: number | null; per_issue_rate_limit_bucket_size_minutes?: number | null }
```

### `posthog.errorTrackingSpikeDetectionConfigList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/spike_detection_config/`
- **OpenAPI operationId**: `error_tracking_spike_detection_config_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ snooze_duration_minutes: number; multiplier: number; threshold: number })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSpikeDetectionConfigListInput = Parameters<typeof posthog.errorTrackingSpikeDetectionConfigList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSpikeDetectionConfigListOutput = Awaited<ReturnType<typeof posthog.errorTrackingSpikeDetectionConfigList>>;

const result: ErrorTrackingSpikeDetectionConfigListOutput = await posthog.errorTrackingSpikeDetectionConfigList();

// Result shape (from schema): ({ snooze_duration_minutes: number; multiplier: number; threshold: number })[]
```

### `posthog.errorTrackingSpikeDetectionConfigUpdateConfigPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/spike_detection_config/update_config/`
- **OpenAPI operationId**: `error_tracking_spike_detection_config_update_config_partial_update`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ snooze_duration_minutes: number; multiplier: number; threshold: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSpikeDetectionConfigUpdateConfigPartialUpdateInput = Parameters<typeof posthog.errorTrackingSpikeDetectionConfigUpdateConfigPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSpikeDetectionConfigUpdateConfigPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingSpikeDetectionConfigUpdateConfigPartialUpdate>>;

const result: ErrorTrackingSpikeDetectionConfigUpdateConfigPartialUpdateOutput = await posthog.errorTrackingSpikeDetectionConfigUpdateConfigPartialUpdate();

// Result shape (from schema): { snooze_duration_minutes: number; multiplier: number; threshold: number }
```

### `posthog.errorTrackingSpikeEventsList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/spike_events/`
- **OpenAPI operationId**: `error_tracking_spike_events_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; issue: { id: string; name: string | null; description: string | null }; detected_at: string; computed_baseline: number; current_bu...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSpikeEventsListInput = Parameters<typeof posthog.errorTrackingSpikeEventsList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSpikeEventsListOutput = Awaited<ReturnType<typeof posthog.errorTrackingSpikeEventsList>>;

const result: ErrorTrackingSpikeEventsListOutput = await posthog.errorTrackingSpikeEventsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; issue: { id: string; name: string | null; description: string | null }; detected_at: string; computed_baseline: number; current_bu...
```

### `posthog.errorTrackingStackFramesList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/stack_frames/`
- **OpenAPI operationId**: `error_tracking_stack_frames_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } |...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingStackFramesListInput = Parameters<typeof posthog.errorTrackingStackFramesList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingStackFramesListOutput = Awaited<ReturnType<typeof posthog.errorTrackingStackFramesList>>;

const result: ErrorTrackingStackFramesListOutput = await posthog.errorTrackingStackFramesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } |...
```

### `posthog.errorTrackingStackFramesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/error_tracking/stack_frames/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `error_tracking_stack_frames_destroy`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `405`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `405`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingStackFramesDestroyInput = Parameters<typeof posthog.errorTrackingStackFramesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingStackFramesDestroyOutput = Awaited<ReturnType<typeof posthog.errorTrackingStackFramesDestroy>>;

const result: ErrorTrackingStackFramesDestroyOutput = await posthog.errorTrackingStackFramesDestroy();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingStackFramesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/stack_frames/{id}/`
- **OpenAPI operationId**: `error_tracking_stack_frames_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } | null; symbol_set_ref: string | null; release: { id: string; hash_id: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingStackFramesRetrieveInput = Parameters<typeof posthog.errorTrackingStackFramesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingStackFramesRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingStackFramesRetrieve>>;

const result: ErrorTrackingStackFramesRetrieveOutput = await posthog.errorTrackingStackFramesRetrieve();

// Result shape (from schema): { id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } | null; symbol_set_ref: string | null; release: { id: string; hash_id: strin...
```

### `posthog.errorTrackingStackFramesBatchGetCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/stack_frames/batch_get/`
- **OpenAPI operationId**: `error_tracking_stack_frames_batch_get_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } | null; symbol_set_ref: string | null; release: { id: string; ha...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingStackFramesBatchGetCreateInput = Parameters<typeof posthog.errorTrackingStackFramesBatchGetCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingStackFramesBatchGetCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingStackFramesBatchGetCreate>>;

const result: ErrorTrackingStackFramesBatchGetCreateOutput = await posthog.errorTrackingStackFramesBatchGetCreate();

// Result shape (from schema): { results: ({ id: string; raw_id: string; created_at: string; contents: { [key: string]: unknown }; resolved: boolean; context: { [key: string]: unknown } | null; symbol_set_ref: string | null; release: { id: string; ha...
```

### `posthog.errorTrackingSuppressionRulesList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/suppression_rules/`
- **OpenAPI operationId**: `error_tracking_suppression_rules_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSuppressionRulesListInput = Parameters<typeof posthog.errorTrackingSuppressionRulesList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSuppressionRulesListOutput = Awaited<ReturnType<typeof posthog.errorTrackingSuppressionRulesList>>;

const result: ErrorTrackingSuppressionRulesListOutput = await posthog.errorTrackingSuppressionRulesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string })[] }
```

### `posthog.errorTrackingSuppressionRulesCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/suppression_rules/`
- **OpenAPI operationId**: `error_tracking_suppression_rules_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSuppressionRulesCreateInput = Parameters<typeof posthog.errorTrackingSuppressionRulesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSuppressionRulesCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingSuppressionRulesCreate>>;

const result: ErrorTrackingSuppressionRulesCreateOutput = await posthog.errorTrackingSuppressionRulesCreate();

// Result shape (from schema): { id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string }
```

### `posthog.errorTrackingSuppressionRulesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/error_tracking/suppression_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_suppression_rules_destroy`
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

type ErrorTrackingSuppressionRulesDestroyInput = Parameters<typeof posthog.errorTrackingSuppressionRulesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSuppressionRulesDestroyOutput = Awaited<ReturnType<typeof posthog.errorTrackingSuppressionRulesDestroy>>;

const result: ErrorTrackingSuppressionRulesDestroyOutput = await posthog.errorTrackingSuppressionRulesDestroy();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingSuppressionRulesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/suppression_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_suppression_rules_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSuppressionRulesRetrieveInput = Parameters<typeof posthog.errorTrackingSuppressionRulesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSuppressionRulesRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingSuppressionRulesRetrieve>>;

const result: ErrorTrackingSuppressionRulesRetrieveOutput = await posthog.errorTrackingSuppressionRulesRetrieve();

// Result shape (from schema): { id: string; filters: unknown; order_key: number; disabled_data: unknown; sampling_rate: number; created_at: string; updated_at: string }
```

### `posthog.errorTrackingSuppressionRulesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/suppression_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_suppression_rules_partial_update`
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

type ErrorTrackingSuppressionRulesPartialUpdateInput = Parameters<typeof posthog.errorTrackingSuppressionRulesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSuppressionRulesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingSuppressionRulesPartialUpdate>>;

const result: ErrorTrackingSuppressionRulesPartialUpdateOutput = await posthog.errorTrackingSuppressionRulesPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingSuppressionRulesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/error_tracking/suppression_rules/{id}/`
- **OpenAPI operationId**: `error_tracking_suppression_rules_update`
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

type ErrorTrackingSuppressionRulesUpdateInput = Parameters<typeof posthog.errorTrackingSuppressionRulesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSuppressionRulesUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingSuppressionRulesUpdate>>;

const result: ErrorTrackingSuppressionRulesUpdateOutput = await posthog.errorTrackingSuppressionRulesUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingSuppressionRulesReorderPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/error_tracking/suppression_rules/reorder/`
- **OpenAPI operationId**: `error_tracking_suppression_rules_reorder_partial_update`
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

type ErrorTrackingSuppressionRulesReorderPartialUpdateInput = Parameters<typeof posthog.errorTrackingSuppressionRulesReorderPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSuppressionRulesReorderPartialUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingSuppressionRulesReorderPartialUpdate>>;

const result: ErrorTrackingSuppressionRulesReorderPartialUpdateOutput = await posthog.errorTrackingSuppressionRulesReorderPartialUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingSymbolSetsList`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/symbol_sets/`
- **OpenAPI operationId**: `error_tracking_symbol_sets_list`
- **Path params**: None
- **Query params**: `limit`, `offset`, `order_by`, `ref`, `search`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; ref: string; team_id: number; created_at: string; last_used: string | null; failure_reason: string | null; has_uploaded_file: bool...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSymbolSetsListInput = Parameters<typeof posthog.errorTrackingSymbolSetsList> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSymbolSetsListOutput = Awaited<ReturnType<typeof posthog.errorTrackingSymbolSetsList>>;

const result: ErrorTrackingSymbolSetsListOutput = await posthog.errorTrackingSymbolSetsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; ref: string; team_id: number; created_at: string; last_used: string | null; failure_reason: string | null; has_uploaded_file: bool...
```

### `posthog.errorTrackingSymbolSetsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/error_tracking/symbol_sets/{id}/`
- **OpenAPI operationId**: `error_tracking_symbol_sets_destroy`
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

type ErrorTrackingSymbolSetsDestroyInput = Parameters<typeof posthog.errorTrackingSymbolSetsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSymbolSetsDestroyOutput = Awaited<ReturnType<typeof posthog.errorTrackingSymbolSetsDestroy>>;

const result: ErrorTrackingSymbolSetsDestroyOutput = await posthog.errorTrackingSymbolSetsDestroy();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingSymbolSetsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/symbol_sets/{id}/`
- **OpenAPI operationId**: `error_tracking_symbol_sets_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; ref: string; team_id: number; created_at: string; last_used: string | null; failure_reason: string | null; has_uploaded_file: boolean; release: { id: string; hash_id: string; team_id: number; created_at: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSymbolSetsRetrieveInput = Parameters<typeof posthog.errorTrackingSymbolSetsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSymbolSetsRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingSymbolSetsRetrieve>>;

const result: ErrorTrackingSymbolSetsRetrieveOutput = await posthog.errorTrackingSymbolSetsRetrieve();

// Result shape (from schema): { id: string; ref: string; team_id: number; created_at: string; last_used: string | null; failure_reason: string | null; has_uploaded_file: boolean; release: { id: string; hash_id: string; team_id: number; created_at: s...
```

### `posthog.errorTrackingSymbolSetsDownloadRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/error_tracking/symbol_sets/{id}/download/`
- **What it does**: Return a presigned URL for downloading the symbol set's source map.
- **OpenAPI operationId**: `error_tracking_symbol_sets_download_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ url: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type ErrorTrackingSymbolSetsDownloadRetrieveInput = Parameters<typeof posthog.errorTrackingSymbolSetsDownloadRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSymbolSetsDownloadRetrieveOutput = Awaited<ReturnType<typeof posthog.errorTrackingSymbolSetsDownloadRetrieve>>;

const result: ErrorTrackingSymbolSetsDownloadRetrieveOutput = await posthog.errorTrackingSymbolSetsDownloadRetrieve();

// Result shape (from schema): { url: string }
```

### `posthog.errorTrackingSymbolSetsFinishUploadUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/error_tracking/symbol_sets/{id}/finish_upload/`
- **OpenAPI operationId**: `error_tracking_symbol_sets_finish_upload_update`
- **Path params**: `id`
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

type ErrorTrackingSymbolSetsFinishUploadUpdateInput = Parameters<typeof posthog.errorTrackingSymbolSetsFinishUploadUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSymbolSetsFinishUploadUpdateOutput = Awaited<ReturnType<typeof posthog.errorTrackingSymbolSetsFinishUploadUpdate>>;

const result: ErrorTrackingSymbolSetsFinishUploadUpdateOutput = await posthog.errorTrackingSymbolSetsFinishUploadUpdate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingSymbolSetsBulkDeleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/symbol_sets/bulk_delete/`
- **OpenAPI operationId**: `error_tracking_symbol_sets_bulk_delete_create`
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

type ErrorTrackingSymbolSetsBulkDeleteCreateInput = Parameters<typeof posthog.errorTrackingSymbolSetsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSymbolSetsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingSymbolSetsBulkDeleteCreate>>;

const result: ErrorTrackingSymbolSetsBulkDeleteCreateOutput = await posthog.errorTrackingSymbolSetsBulkDeleteCreate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingSymbolSetsBulkFinishUploadCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/symbol_sets/bulk_finish_upload/`
- **OpenAPI operationId**: `error_tracking_symbol_sets_bulk_finish_upload_create`
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

type ErrorTrackingSymbolSetsBulkFinishUploadCreateInput = Parameters<typeof posthog.errorTrackingSymbolSetsBulkFinishUploadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSymbolSetsBulkFinishUploadCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingSymbolSetsBulkFinishUploadCreate>>;

const result: ErrorTrackingSymbolSetsBulkFinishUploadCreateOutput = await posthog.errorTrackingSymbolSetsBulkFinishUploadCreate();

// Result shape (from schema): unknown
```

### `posthog.errorTrackingSymbolSetsBulkStartUploadCreate`

- **HTTP**: `POST /api/projects/{project_id}/error_tracking/symbol_sets/bulk_start_upload/`
- **OpenAPI operationId**: `error_tracking_symbol_sets_bulk_start_upload_create`
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

type ErrorTrackingSymbolSetsBulkStartUploadCreateInput = Parameters<typeof posthog.errorTrackingSymbolSetsBulkStartUploadCreate> extends [infer T, ...unknown[]] ? T : undefined;
type ErrorTrackingSymbolSetsBulkStartUploadCreateOutput = Awaited<ReturnType<typeof posthog.errorTrackingSymbolSetsBulkStartUploadCreate>>;

const result: ErrorTrackingSymbolSetsBulkStartUploadCreateOutput = await posthog.errorTrackingSymbolSetsBulkStartUploadCreate();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

# Subscriptions

## Operations

### `posthog.environmentsSubscriptionsList`

- **HTTP**: `GET /api/environments/{environment_id}/subscriptions/`
- **OpenAPI operationId**: `environments_subscriptions_list`
- **Path params**: None
- **Query params**: `created_by`, `dashboard`, `dashboard_tiles`, `insight`, `insights`, `limit`, `offset`, `ordering`, `resource_type`, `search`, `target_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSubscriptionsListInput = Parameters<typeof posthog.environmentsSubscriptionsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSubscriptionsListOutput = Awaited<ReturnType<typeof posthog.environmentsSubscriptionsList>>;

const result: EnvironmentsSubscriptionsListOutput = await posthog.environmentsSubscriptionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string...
```

### `posthog.environmentsSubscriptionsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/subscriptions/`
- **OpenAPI operationId**: `environments_subscriptions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSubscriptionsCreateInput = Parameters<typeof posthog.environmentsSubscriptionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSubscriptionsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsSubscriptionsCreate>>;

const result: EnvironmentsSubscriptionsCreateOutput = await posthog.environmentsSubscriptionsCreate();

// Result shape (from schema): { id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...
```

### `posthog.environmentsSubscriptionsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/subscriptions/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `environments_subscriptions_destroy`
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

type EnvironmentsSubscriptionsDestroyInput = Parameters<typeof posthog.environmentsSubscriptionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSubscriptionsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsSubscriptionsDestroy>>;

const result: EnvironmentsSubscriptionsDestroyOutput = await posthog.environmentsSubscriptionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsSubscriptionsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/subscriptions/{id}/`
- **OpenAPI operationId**: `environments_subscriptions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSubscriptionsRetrieveInput = Parameters<typeof posthog.environmentsSubscriptionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSubscriptionsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsSubscriptionsRetrieve>>;

const result: EnvironmentsSubscriptionsRetrieveOutput = await posthog.environmentsSubscriptionsRetrieve();

// Result shape (from schema): { id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...
```

### `posthog.environmentsSubscriptionsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/subscriptions/{id}/`
- **OpenAPI operationId**: `environments_subscriptions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSubscriptionsPartialUpdateInput = Parameters<typeof posthog.environmentsSubscriptionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSubscriptionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsSubscriptionsPartialUpdate>>;

const result: EnvironmentsSubscriptionsPartialUpdateOutput = await posthog.environmentsSubscriptionsPartialUpdate();

// Result shape (from schema): { id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...
```

### `posthog.environmentsSubscriptionsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/subscriptions/{id}/`
- **OpenAPI operationId**: `environments_subscriptions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSubscriptionsUpdateInput = Parameters<typeof posthog.environmentsSubscriptionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSubscriptionsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsSubscriptionsUpdate>>;

const result: EnvironmentsSubscriptionsUpdateOutput = await posthog.environmentsSubscriptionsUpdate();

// Result shape (from schema): { id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...
```

### `posthog.environmentsSubscriptionsTestDeliveryCreate`

- **HTTP**: `POST /api/environments/{environment_id}/subscriptions/{id}/test-delivery/`
- **OpenAPI operationId**: `environments_subscriptions_test_delivery_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSubscriptionsTestDeliveryCreateInput = Parameters<typeof posthog.environmentsSubscriptionsTestDeliveryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSubscriptionsTestDeliveryCreateOutput = Awaited<ReturnType<typeof posthog.environmentsSubscriptionsTestDeliveryCreate>>;

const result: EnvironmentsSubscriptionsTestDeliveryCreateOutput = await posthog.environmentsSubscriptionsTestDeliveryCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsSubscriptionsDeliveriesList`

- **HTTP**: `GET /api/environments/{environment_id}/subscriptions/{subscription_id}/deliveries/`
- **What it does**: List subscription deliveries
- **OpenAPI operationId**: `environments_subscriptions_deliveries_list`
- **Path params**: `subscription_id`
- **Query params**: `cursor`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; results: ({ id: string; subscription: number; temporal_workflow_id: string; idempotency_key: string; trigger_type: string; scheduled_at: string | null; target_type: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSubscriptionsDeliveriesListInput = Parameters<typeof posthog.environmentsSubscriptionsDeliveriesList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSubscriptionsDeliveriesListOutput = Awaited<ReturnType<typeof posthog.environmentsSubscriptionsDeliveriesList>>;

const result: EnvironmentsSubscriptionsDeliveriesListOutput = await posthog.environmentsSubscriptionsDeliveriesList();

// Result shape (from schema): { next?: string | null; previous?: string | null; results: ({ id: string; subscription: number; temporal_workflow_id: string; idempotency_key: string; trigger_type: string; scheduled_at: string | null; target_type: stri...
```

### `posthog.environmentsSubscriptionsDeliveriesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/subscriptions/{subscription_id}/deliveries/{id}/`
- **What it does**: Retrieve subscription delivery
- **OpenAPI operationId**: `environments_subscriptions_deliveries_retrieve`
- **Path params**: `id`, `subscription_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; subscription: number; temporal_workflow_id: string; idempotency_key: string; trigger_type: string; scheduled_at: string | null; target_type: string; target_value: string; exported_asset_ids: (number)[]; co...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSubscriptionsDeliveriesRetrieveInput = Parameters<typeof posthog.environmentsSubscriptionsDeliveriesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSubscriptionsDeliveriesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsSubscriptionsDeliveriesRetrieve>>;

const result: EnvironmentsSubscriptionsDeliveriesRetrieveOutput = await posthog.environmentsSubscriptionsDeliveriesRetrieve();

// Result shape (from schema): { id: string; subscription: number; temporal_workflow_id: string; idempotency_key: string; trigger_type: string; scheduled_at: string | null; target_type: string; target_value: string; exported_asset_ids: (number)[]; co...
```

### `posthog.environmentsSubscriptionsSummaryQuotaRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/subscriptions/summary_quota/`
- **OpenAPI operationId**: `environments_subscriptions_summary_quota_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ active_count: number; limit: number | null; at_limit: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsSubscriptionsSummaryQuotaRetrieveInput = Parameters<typeof posthog.environmentsSubscriptionsSummaryQuotaRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsSubscriptionsSummaryQuotaRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsSubscriptionsSummaryQuotaRetrieve>>;

const result: EnvironmentsSubscriptionsSummaryQuotaRetrieveOutput = await posthog.environmentsSubscriptionsSummaryQuotaRetrieve();

// Result shape (from schema): { active_count: number; limit: number | null; at_limit: boolean }
```

### `posthog.subscriptionsList`

- **HTTP**: `GET /api/projects/{project_id}/subscriptions/`
- **OpenAPI operationId**: `subscriptions_list`
- **Path params**: None
- **Query params**: `created_by`, `dashboard`, `dashboard_tiles`, `insight`, `insights`, `limit`, `offset`, `ordering`, `resource_type`, `search`, `target_type`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SubscriptionsListInput = Parameters<typeof posthog.subscriptionsList> extends [infer T, ...unknown[]] ? T : undefined;
type SubscriptionsListOutput = Awaited<ReturnType<typeof posthog.subscriptionsList>>;

const result: SubscriptionsListOutput = await posthog.subscriptionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string...
```

### `posthog.subscriptionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/subscriptions/`
- **OpenAPI operationId**: `subscriptions_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type SubscriptionsCreateInput = Parameters<typeof posthog.subscriptionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SubscriptionsCreateOutput = Awaited<ReturnType<typeof posthog.subscriptionsCreate>>;

const result: SubscriptionsCreateOutput = await posthog.subscriptionsCreate();

// Result shape (from schema): { id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...
```

### `posthog.subscriptionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/subscriptions/{id}/`
- **What it does**: Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true
- **OpenAPI operationId**: `subscriptions_destroy`
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

type SubscriptionsDestroyInput = Parameters<typeof posthog.subscriptionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type SubscriptionsDestroyOutput = Awaited<ReturnType<typeof posthog.subscriptionsDestroy>>;

const result: SubscriptionsDestroyOutput = await posthog.subscriptionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.subscriptionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/subscriptions/{id}/`
- **OpenAPI operationId**: `subscriptions_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SubscriptionsRetrieveInput = Parameters<typeof posthog.subscriptionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SubscriptionsRetrieveOutput = Awaited<ReturnType<typeof posthog.subscriptionsRetrieve>>;

const result: SubscriptionsRetrieveOutput = await posthog.subscriptionsRetrieve();

// Result shape (from schema): { id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...
```

### `posthog.subscriptionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/subscriptions/{id}/`
- **OpenAPI operationId**: `subscriptions_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SubscriptionsPartialUpdateInput = Parameters<typeof posthog.subscriptionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SubscriptionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.subscriptionsPartialUpdate>>;

const result: SubscriptionsPartialUpdateOutput = await posthog.subscriptionsPartialUpdate();

// Result shape (from schema): { id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...
```

### `posthog.subscriptionsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/subscriptions/{id}/`
- **OpenAPI operationId**: `subscriptions_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SubscriptionsUpdateInput = Parameters<typeof posthog.subscriptionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type SubscriptionsUpdateOutput = Awaited<ReturnType<typeof posthog.subscriptionsUpdate>>;

const result: SubscriptionsUpdateOutput = await posthog.subscriptionsUpdate();

// Result shape (from schema): { id: number; resource_type: "insight" | "dashboard" | "ai_prompt"; dashboard?: number | null; insight?: number | null; insight_short_id: string | null; resource_name: string | null; dashboard_export_insights?: (number)...
```

### `posthog.subscriptionsTestDeliveryCreate`

- **HTTP**: `POST /api/projects/{project_id}/subscriptions/{id}/test-delivery/`
- **OpenAPI operationId**: `subscriptions_test_delivery_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `202`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `unknown`
- OpenAPI response codes: `202`

```ts
import posthog from "@utdk/posthog";

type SubscriptionsTestDeliveryCreateInput = Parameters<typeof posthog.subscriptionsTestDeliveryCreate> extends [infer T, ...unknown[]] ? T : undefined;
type SubscriptionsTestDeliveryCreateOutput = Awaited<ReturnType<typeof posthog.subscriptionsTestDeliveryCreate>>;

const result: SubscriptionsTestDeliveryCreateOutput = await posthog.subscriptionsTestDeliveryCreate();

// Result shape (from schema): unknown
```

### `posthog.subscriptionsDeliveriesList`

- **HTTP**: `GET /api/projects/{project_id}/subscriptions/{subscription_id}/deliveries/`
- **What it does**: List subscription deliveries
- **OpenAPI operationId**: `subscriptions_deliveries_list`
- **Path params**: `subscription_id`
- **Query params**: `cursor`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; results: ({ id: string; subscription: number; temporal_workflow_id: string; idempotency_key: string; trigger_type: string; scheduled_at: string | null; target_type: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SubscriptionsDeliveriesListInput = Parameters<typeof posthog.subscriptionsDeliveriesList> extends [infer T, ...unknown[]] ? T : undefined;
type SubscriptionsDeliveriesListOutput = Awaited<ReturnType<typeof posthog.subscriptionsDeliveriesList>>;

const result: SubscriptionsDeliveriesListOutput = await posthog.subscriptionsDeliveriesList();

// Result shape (from schema): { next?: string | null; previous?: string | null; results: ({ id: string; subscription: number; temporal_workflow_id: string; idempotency_key: string; trigger_type: string; scheduled_at: string | null; target_type: stri...
```

### `posthog.subscriptionsDeliveriesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/subscriptions/{subscription_id}/deliveries/{id}/`
- **What it does**: Retrieve subscription delivery
- **OpenAPI operationId**: `subscriptions_deliveries_retrieve`
- **Path params**: `id`, `subscription_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; subscription: number; temporal_workflow_id: string; idempotency_key: string; trigger_type: string; scheduled_at: string | null; target_type: string; target_value: string; exported_asset_ids: (number)[]; co...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SubscriptionsDeliveriesRetrieveInput = Parameters<typeof posthog.subscriptionsDeliveriesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SubscriptionsDeliveriesRetrieveOutput = Awaited<ReturnType<typeof posthog.subscriptionsDeliveriesRetrieve>>;

const result: SubscriptionsDeliveriesRetrieveOutput = await posthog.subscriptionsDeliveriesRetrieve();

// Result shape (from schema): { id: string; subscription: number; temporal_workflow_id: string; idempotency_key: string; trigger_type: string; scheduled_at: string | null; target_type: string; target_value: string; exported_asset_ids: (number)[]; co...
```

### `posthog.subscriptionsSummaryQuotaRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/subscriptions/summary_quota/`
- **OpenAPI operationId**: `subscriptions_summary_quota_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ active_count: number; limit: number | null; at_limit: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type SubscriptionsSummaryQuotaRetrieveInput = Parameters<typeof posthog.subscriptionsSummaryQuotaRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type SubscriptionsSummaryQuotaRetrieveOutput = Awaited<ReturnType<typeof posthog.subscriptionsSummaryQuotaRetrieve>>;

const result: SubscriptionsSummaryQuotaRetrieveOutput = await posthog.subscriptionsSummaryQuotaRetrieve();

// Result shape (from schema): { active_count: number; limit: number | null; at_limit: boolean }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

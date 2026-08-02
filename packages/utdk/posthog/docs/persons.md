# Persons

## Operations

### `posthog.environmentsPersonsList`

- **HTTP**: `GET /api/environments/{environment_id}/persons/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_list`
- **Path params**: None
- **Query params**: `distinct_id`, `email`, `format`, `limit`, `offset`, `properties`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; count?: number; results?: ({ id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null })[]...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPersonsListInput = Parameters<typeof posthog.environmentsPersonsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsListOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsList>>;

const result: EnvironmentsPersonsListOutput = await posthog.environmentsPersonsList();

// Result shape (from schema): { next?: string | null; previous?: string | null; count?: number; results?: ({ id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null })[]...
```

### `posthog.environmentsPersonsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/persons/{id}/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_retrieve`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPersonsRetrieveInput = Parameters<typeof posthog.environmentsPersonsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsRetrieve>>;

const result: EnvironmentsPersonsRetrieveOutput = await posthog.environmentsPersonsRetrieve();

// Result shape (from schema): { id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }
```

### `posthog.environmentsPersonsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/persons/{id}/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_partial_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPersonsPartialUpdateInput = Parameters<typeof posthog.environmentsPersonsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsPartialUpdate>>;

const result: EnvironmentsPersonsPartialUpdateOutput = await posthog.environmentsPersonsPartialUpdate();

// Result shape (from schema): { id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }
```

### `posthog.environmentsPersonsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/persons/{id}/`
- **What it does**: Only for setting properties on the person. "properties" from the request data will be updated via a "$set" event.
This means that only the properties listed will be updated, but other properties won't be removed nor updated.
If you would like to remove a property use the `delete_property` endpoint.
- **OpenAPI operationId**: `environments_persons_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPersonsUpdateInput = Parameters<typeof posthog.environmentsPersonsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsUpdate>>;

const result: EnvironmentsPersonsUpdateOutput = await posthog.environmentsPersonsUpdate();

// Result shape (from schema): { id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }
```

### `posthog.environmentsPersonsActivityRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/persons/{id}/activity/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_activity_retrieve`
- **Path params**: `id`
- **Query params**: `format`
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

type EnvironmentsPersonsActivityRetrieveInput = Parameters<typeof posthog.environmentsPersonsActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsActivityRetrieve>>;

const result: EnvironmentsPersonsActivityRetrieveOutput = await posthog.environmentsPersonsActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsDeletePropertyCreate`

- **HTTP**: `POST /api/environments/{environment_id}/persons/{id}/delete_property/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_delete_property_create`
- **Path params**: `id`
- **Query params**: `format`
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

type EnvironmentsPersonsDeletePropertyCreateInput = Parameters<typeof posthog.environmentsPersonsDeletePropertyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsDeletePropertyCreateOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsDeletePropertyCreate>>;

const result: EnvironmentsPersonsDeletePropertyCreateOutput = await posthog.environmentsPersonsDeletePropertyCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsEmailsList`

- **HTTP**: `GET /api/environments/{environment_id}/persons/{id}/emails/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_emails_list`
- **Path params**: `id`
- **Query params**: `after`, `before`, `format`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ invocation_id: string; action_id: string; function_id: string; function_name: string; parent_run_id: string; kind: string; distinct_id: string; person_id: string; recipient: string; subject: string; status: string; s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPersonsEmailsListInput = Parameters<typeof posthog.environmentsPersonsEmailsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsEmailsListOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsEmailsList>>;

const result: EnvironmentsPersonsEmailsListOutput = await posthog.environmentsPersonsEmailsList();

// Result shape (from schema): ({ invocation_id: string; action_id: string; function_id: string; function_name: string; parent_run_id: string; kind: string; distinct_id: string; person_id: string; recipient: string; subject: string; status: string; s...
```

### `posthog.environmentsPersonsPropertiesTimelineRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/persons/{id}/properties_timeline/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_properties_timeline_retrieve`
- **Path params**: `id`
- **Query params**: `format`
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

type EnvironmentsPersonsPropertiesTimelineRetrieveInput = Parameters<typeof posthog.environmentsPersonsPropertiesTimelineRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsPropertiesTimelineRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsPropertiesTimelineRetrieve>>;

const result: EnvironmentsPersonsPropertiesTimelineRetrieveOutput = await posthog.environmentsPersonsPropertiesTimelineRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsSplitCreate`

- **HTTP**: `POST /api/environments/{environment_id}/persons/{id}/split/`
- **What it does**: Split distinct_ids off a merged person. Two mutually exclusive modes:

- **`distinct_ids_to_split`** (recommended for surgical edits): moves only the listed distinct_ids off this person onto new single-id persons. The original person keeps every other distinct_id and its properties.
- **`main_distinct_id`**: keeps only the specified distinct_id on this person; moves every *other* distinct_id off onto its own new person. If omitted, the first distinct_id is kept.

The original person always retains its properties. To clear individual properties afterward, use the `delete_property` endpoint.

The split runs asynchronously: a 201 response means the task was enqueued. Newly-created split-off persons get a deterministic UUID derived from `(team_id, distinct_id)`, so they can be located client-side without polling. If you need to delete a split-off person after this call, prefer looking it up by that deterministic UUID rather than by distinct_id, since the latter still resolves to the original merged person until the async task completes.
- **OpenAPI operationId**: `environments_persons_split_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPersonsSplitCreateInput = Parameters<typeof posthog.environmentsPersonsSplitCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsSplitCreateOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsSplitCreate>>;

const result: EnvironmentsPersonsSplitCreateOutput = await posthog.environmentsPersonsSplitCreate();

// Result shape (from schema): { success: boolean }
```

### `posthog.environmentsPersonsUpdatePropertyCreate`

- **HTTP**: `POST /api/environments/{environment_id}/persons/{id}/update_property/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_update_property_create`
- **Path params**: `id`
- **Query params**: `format`
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

type EnvironmentsPersonsUpdatePropertyCreateInput = Parameters<typeof posthog.environmentsPersonsUpdatePropertyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsUpdatePropertyCreateOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsUpdatePropertyCreate>>;

const result: EnvironmentsPersonsUpdatePropertyCreateOutput = await posthog.environmentsPersonsUpdatePropertyCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsAllActivityRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/persons/activity/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_all_activity_retrieve`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsPersonsAllActivityRetrieveInput = Parameters<typeof posthog.environmentsPersonsAllActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsAllActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsAllActivityRetrieve>>;

const result: EnvironmentsPersonsAllActivityRetrieveOutput = await posthog.environmentsPersonsAllActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsBatchByDistinctIdsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/persons/batch_by_distinct_ids/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_batch_by_distinct_ids_create`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsPersonsBatchByDistinctIdsCreateInput = Parameters<typeof posthog.environmentsPersonsBatchByDistinctIdsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsBatchByDistinctIdsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsBatchByDistinctIdsCreate>>;

const result: EnvironmentsPersonsBatchByDistinctIdsCreateOutput = await posthog.environmentsPersonsBatchByDistinctIdsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsBatchByUuidsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/persons/batch_by_uuids/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_batch_by_uuids_create`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsPersonsBatchByUuidsCreateInput = Parameters<typeof posthog.environmentsPersonsBatchByUuidsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsBatchByUuidsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsBatchByUuidsCreate>>;

const result: EnvironmentsPersonsBatchByUuidsCreateOutput = await posthog.environmentsPersonsBatchByUuidsCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsBulkDeleteCreate`

- **HTTP**: `POST /api/environments/{environment_id}/persons/bulk_delete/`
- **What it does**: This endpoint allows you to bulk delete persons, either by the PostHog person IDs or by distinct IDs. You can pass in a maximum of 1000 IDs per call. Only events captured before the request will be deleted.
- **OpenAPI operationId**: `environments_persons_bulk_delete_create`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsPersonsBulkDeleteCreateInput = Parameters<typeof posthog.environmentsPersonsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsBulkDeleteCreate>>;

const result: EnvironmentsPersonsBulkDeleteCreateOutput = await posthog.environmentsPersonsBulkDeleteCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsCohortsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/persons/cohorts/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_cohorts_retrieve`
- **Path params**: None
- **Query params**: `format`, `person_id`
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

type EnvironmentsPersonsCohortsRetrieveInput = Parameters<typeof posthog.environmentsPersonsCohortsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsCohortsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsCohortsRetrieve>>;

const result: EnvironmentsPersonsCohortsRetrieveOutput = await posthog.environmentsPersonsCohortsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsDeletionStatusList`

- **HTTP**: `GET /api/environments/{environment_id}/persons/deletion_status/`
- **What it does**: List the status of queued event deletions for persons. When you delete a person with `delete_events=true`, an async deletion is queued. Use this endpoint to check whether those deletions are still pending or have been completed.
- **OpenAPI operationId**: `environments_persons_deletion_status_list`
- **Path params**: None
- **Query params**: `format`, `limit`, `offset`, `person_uuid`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; count?: number; results?: ({ person_uuid: string; created_at: string; status: string; delete_verified_at: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPersonsDeletionStatusListInput = Parameters<typeof posthog.environmentsPersonsDeletionStatusList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsDeletionStatusListOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsDeletionStatusList>>;

const result: EnvironmentsPersonsDeletionStatusListOutput = await posthog.environmentsPersonsDeletionStatusList();

// Result shape (from schema): { next?: string | null; previous?: string | null; count?: number; results?: ({ person_uuid: string; created_at: string; status: string; delete_verified_at: string | null })[] }
```

### `posthog.environmentsPersonsFunnelRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/persons/funnel/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_funnel_retrieve`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsPersonsFunnelRetrieveInput = Parameters<typeof posthog.environmentsPersonsFunnelRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsFunnelRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsFunnelRetrieve>>;

const result: EnvironmentsPersonsFunnelRetrieveOutput = await posthog.environmentsPersonsFunnelRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsFunnelCreate`

- **HTTP**: `POST /api/environments/{environment_id}/persons/funnel/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_funnel_create`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsPersonsFunnelCreateInput = Parameters<typeof posthog.environmentsPersonsFunnelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsFunnelCreateOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsFunnelCreate>>;

const result: EnvironmentsPersonsFunnelCreateOutput = await posthog.environmentsPersonsFunnelCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsLifecycleRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/persons/lifecycle/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_lifecycle_retrieve`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsPersonsLifecycleRetrieveInput = Parameters<typeof posthog.environmentsPersonsLifecycleRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsLifecycleRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsLifecycleRetrieve>>;

const result: EnvironmentsPersonsLifecycleRetrieveOutput = await posthog.environmentsPersonsLifecycleRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsPropertiesAtTimeRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/persons/properties_at_time/`
- **What it does**: Get person properties as they existed at a specific point in time.

This endpoint reconstructs person properties by querying ClickHouse events
for $set and $set_once operations up to the specified timestamp.

Query parameters:
- distinct_id: The distinct_id of the person
- timestamp: ISO datetime string for the point in time (e.g., "2023-06-15T14:30:00Z")
- include_set_once: Whether to handle $set_once operations (default: false)
- **OpenAPI operationId**: `environments_persons_properties_at_time_retrieve`
- **Path params**: None
- **Query params**: `distinct_id`, `format`, `include_set_once`, `person_id`, `timestamp`
- **Response codes**: `200`, `400`, `404`, `500`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; distinct_ids: (string)[]; properties: { [key: string]: string | null | undefined }; created_at: string; uuid: string; last_seen_at: string | null; point_in_time_metadata: { queried_timestamp:...`
- OpenAPI response codes: `200`, `400`, `404`, `500`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPersonsPropertiesAtTimeRetrieveInput = Parameters<typeof posthog.environmentsPersonsPropertiesAtTimeRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsPropertiesAtTimeRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsPropertiesAtTimeRetrieve>>;

const result: EnvironmentsPersonsPropertiesAtTimeRetrieveOutput = await posthog.environmentsPersonsPropertiesAtTimeRetrieve();

// Result shape (from schema): { id: number; name: string; distinct_ids: (string)[]; properties: { [key: string]: string | null | undefined }; created_at: string; uuid: string; last_seen_at: string | null; point_in_time_metadata: { queried_timestamp:...
```

### `posthog.environmentsPersonsResetPersonDistinctIdCreate`

- **HTTP**: `POST /api/environments/{environment_id}/persons/reset_person_distinct_id/`
- **What it does**: Reset a distinct_id for a deleted person. This allows the distinct_id to be used again.
- **OpenAPI operationId**: `environments_persons_reset_person_distinct_id_create`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsPersonsResetPersonDistinctIdCreateInput = Parameters<typeof posthog.environmentsPersonsResetPersonDistinctIdCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsResetPersonDistinctIdCreateOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsResetPersonDistinctIdCreate>>;

const result: EnvironmentsPersonsResetPersonDistinctIdCreateOutput = await posthog.environmentsPersonsResetPersonDistinctIdCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsTrendsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/persons/trends/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_trends_retrieve`
- **Path params**: None
- **Query params**: `format`
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

type EnvironmentsPersonsTrendsRetrieveInput = Parameters<typeof posthog.environmentsPersonsTrendsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsTrendsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsTrendsRetrieve>>;

const result: EnvironmentsPersonsTrendsRetrieveOutput = await posthog.environmentsPersonsTrendsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsPersonsValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/persons/values/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `environments_persons_values_retrieve`
- **Path params**: None
- **Query params**: `format`, `key`, `value`
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

type EnvironmentsPersonsValuesRetrieveInput = Parameters<typeof posthog.environmentsPersonsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPersonsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsPersonsValuesRetrieve>>;

const result: EnvironmentsPersonsValuesRetrieveOutput = await posthog.environmentsPersonsValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.personsList`

- **HTTP**: `GET /api/projects/{project_id}/persons/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_list`
- **Path params**: None
- **Query params**: `distinct_id`, `email`, `format`, `limit`, `offset`, `properties`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; count?: number; results?: ({ id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null })[]...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PersonsListInput = Parameters<typeof posthog.personsList> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsListOutput = Awaited<ReturnType<typeof posthog.personsList>>;

const result: PersonsListOutput = await posthog.personsList();

// Result shape (from schema): { next?: string | null; previous?: string | null; count?: number; results?: ({ id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null })[]...
```

### `posthog.personsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/persons/{id}/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_retrieve`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PersonsRetrieveInput = Parameters<typeof posthog.personsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsRetrieveOutput = Awaited<ReturnType<typeof posthog.personsRetrieve>>;

const result: PersonsRetrieveOutput = await posthog.personsRetrieve();

// Result shape (from schema): { id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }
```

### `posthog.personsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/persons/{id}/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_partial_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PersonsPartialUpdateInput = Parameters<typeof posthog.personsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.personsPartialUpdate>>;

const result: PersonsPartialUpdateOutput = await posthog.personsPartialUpdate();

// Result shape (from schema): { id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }
```

### `posthog.personsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/persons/{id}/`
- **What it does**: Only for setting properties on the person. "properties" from the request data will be updated via a "$set" event.
This means that only the properties listed will be updated, but other properties won't be removed nor updated.
If you would like to remove a property use the `delete_property` endpoint.
- **OpenAPI operationId**: `persons_update`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PersonsUpdateInput = Parameters<typeof posthog.personsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsUpdateOutput = Awaited<ReturnType<typeof posthog.personsUpdate>>;

const result: PersonsUpdateOutput = await posthog.personsUpdate();

// Result shape (from schema): { id: number; name: string; distinct_ids: (string)[]; properties?: unknown; created_at: string; uuid: string; last_seen_at: string | null }
```

### `posthog.personsActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/persons/{id}/activity/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_activity_retrieve`
- **Path params**: `id`
- **Query params**: `format`
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

type PersonsActivityRetrieveInput = Parameters<typeof posthog.personsActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.personsActivityRetrieve>>;

const result: PersonsActivityRetrieveOutput = await posthog.personsActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.personsDeletePropertyCreate`

- **HTTP**: `POST /api/projects/{project_id}/persons/{id}/delete_property/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_delete_property_create`
- **Path params**: `id`
- **Query params**: `format`
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

type PersonsDeletePropertyCreateInput = Parameters<typeof posthog.personsDeletePropertyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsDeletePropertyCreateOutput = Awaited<ReturnType<typeof posthog.personsDeletePropertyCreate>>;

const result: PersonsDeletePropertyCreateOutput = await posthog.personsDeletePropertyCreate();

// Result shape (from schema): unknown
```

### `posthog.personsEmailsList`

- **HTTP**: `GET /api/projects/{project_id}/persons/{id}/emails/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_emails_list`
- **Path params**: `id`
- **Query params**: `after`, `before`, `format`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ invocation_id: string; action_id: string; function_id: string; function_name: string; parent_run_id: string; kind: string; distinct_id: string; person_id: string; recipient: string; subject: string; status: string; s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PersonsEmailsListInput = Parameters<typeof posthog.personsEmailsList> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsEmailsListOutput = Awaited<ReturnType<typeof posthog.personsEmailsList>>;

const result: PersonsEmailsListOutput = await posthog.personsEmailsList();

// Result shape (from schema): ({ invocation_id: string; action_id: string; function_id: string; function_name: string; parent_run_id: string; kind: string; distinct_id: string; person_id: string; recipient: string; subject: string; status: string; s...
```

### `posthog.personsPropertiesTimelineRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/persons/{id}/properties_timeline/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_properties_timeline_retrieve`
- **Path params**: `id`
- **Query params**: `format`
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

type PersonsPropertiesTimelineRetrieveInput = Parameters<typeof posthog.personsPropertiesTimelineRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsPropertiesTimelineRetrieveOutput = Awaited<ReturnType<typeof posthog.personsPropertiesTimelineRetrieve>>;

const result: PersonsPropertiesTimelineRetrieveOutput = await posthog.personsPropertiesTimelineRetrieve();

// Result shape (from schema): unknown
```

### `posthog.personsSplitCreate`

- **HTTP**: `POST /api/projects/{project_id}/persons/{id}/split/`
- **What it does**: Split distinct_ids off a merged person. Two mutually exclusive modes:

- **`distinct_ids_to_split`** (recommended for surgical edits): moves only the listed distinct_ids off this person onto new single-id persons. The original person keeps every other distinct_id and its properties.
- **`main_distinct_id`**: keeps only the specified distinct_id on this person; moves every *other* distinct_id off onto its own new person. If omitted, the first distinct_id is kept.

The original person always retains its properties. To clear individual properties afterward, use the `delete_property` endpoint.

The split runs asynchronously: a 201 response means the task was enqueued. Newly-created split-off persons get a deterministic UUID derived from `(team_id, distinct_id)`, so they can be located client-side without polling. If you need to delete a split-off person after this call, prefer looking it up by that deterministic UUID rather than by distinct_id, since the latter still resolves to the original merged person until the async task completes.
- **OpenAPI operationId**: `persons_split_create`
- **Path params**: `id`
- **Query params**: `format`
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ success: boolean }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type PersonsSplitCreateInput = Parameters<typeof posthog.personsSplitCreate> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsSplitCreateOutput = Awaited<ReturnType<typeof posthog.personsSplitCreate>>;

const result: PersonsSplitCreateOutput = await posthog.personsSplitCreate();

// Result shape (from schema): { success: boolean }
```

### `posthog.personsUpdatePropertyCreate`

- **HTTP**: `POST /api/projects/{project_id}/persons/{id}/update_property/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_update_property_create`
- **Path params**: `id`
- **Query params**: `format`
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

type PersonsUpdatePropertyCreateInput = Parameters<typeof posthog.personsUpdatePropertyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsUpdatePropertyCreateOutput = Awaited<ReturnType<typeof posthog.personsUpdatePropertyCreate>>;

const result: PersonsUpdatePropertyCreateOutput = await posthog.personsUpdatePropertyCreate();

// Result shape (from schema): unknown
```

### `posthog.personsAllActivityRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/persons/activity/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_all_activity_retrieve`
- **Path params**: None
- **Query params**: `format`
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

type PersonsAllActivityRetrieveInput = Parameters<typeof posthog.personsAllActivityRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsAllActivityRetrieveOutput = Awaited<ReturnType<typeof posthog.personsAllActivityRetrieve>>;

const result: PersonsAllActivityRetrieveOutput = await posthog.personsAllActivityRetrieve();

// Result shape (from schema): unknown
```

### `posthog.personsBatchByDistinctIdsCreate`

- **HTTP**: `POST /api/projects/{project_id}/persons/batch_by_distinct_ids/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_batch_by_distinct_ids_create`
- **Path params**: None
- **Query params**: `format`
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

type PersonsBatchByDistinctIdsCreateInput = Parameters<typeof posthog.personsBatchByDistinctIdsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsBatchByDistinctIdsCreateOutput = Awaited<ReturnType<typeof posthog.personsBatchByDistinctIdsCreate>>;

const result: PersonsBatchByDistinctIdsCreateOutput = await posthog.personsBatchByDistinctIdsCreate();

// Result shape (from schema): unknown
```

### `posthog.personsBatchByUuidsCreate`

- **HTTP**: `POST /api/projects/{project_id}/persons/batch_by_uuids/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_batch_by_uuids_create`
- **Path params**: None
- **Query params**: `format`
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

type PersonsBatchByUuidsCreateInput = Parameters<typeof posthog.personsBatchByUuidsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsBatchByUuidsCreateOutput = Awaited<ReturnType<typeof posthog.personsBatchByUuidsCreate>>;

const result: PersonsBatchByUuidsCreateOutput = await posthog.personsBatchByUuidsCreate();

// Result shape (from schema): unknown
```

### `posthog.personsBulkDeleteCreate`

- **HTTP**: `POST /api/projects/{project_id}/persons/bulk_delete/`
- **What it does**: This endpoint allows you to bulk delete persons, either by the PostHog person IDs or by distinct IDs. You can pass in a maximum of 1000 IDs per call. Only events captured before the request will be deleted.
- **OpenAPI operationId**: `persons_bulk_delete_create`
- **Path params**: None
- **Query params**: `format`
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

type PersonsBulkDeleteCreateInput = Parameters<typeof posthog.personsBulkDeleteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsBulkDeleteCreateOutput = Awaited<ReturnType<typeof posthog.personsBulkDeleteCreate>>;

const result: PersonsBulkDeleteCreateOutput = await posthog.personsBulkDeleteCreate();

// Result shape (from schema): unknown
```

### `posthog.personsCohortsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/persons/cohorts/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_cohorts_retrieve`
- **Path params**: None
- **Query params**: `format`, `person_id`
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

type PersonsCohortsRetrieveInput = Parameters<typeof posthog.personsCohortsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsCohortsRetrieveOutput = Awaited<ReturnType<typeof posthog.personsCohortsRetrieve>>;

const result: PersonsCohortsRetrieveOutput = await posthog.personsCohortsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.personsDeletionStatusList`

- **HTTP**: `GET /api/projects/{project_id}/persons/deletion_status/`
- **What it does**: List the status of queued event deletions for persons. When you delete a person with `delete_events=true`, an async deletion is queued. Use this endpoint to check whether those deletions are still pending or have been completed.
- **OpenAPI operationId**: `persons_deletion_status_list`
- **Path params**: None
- **Query params**: `format`, `limit`, `offset`, `person_uuid`, `status`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; previous?: string | null; count?: number; results?: ({ person_uuid: string; created_at: string; status: string; delete_verified_at: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PersonsDeletionStatusListInput = Parameters<typeof posthog.personsDeletionStatusList> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsDeletionStatusListOutput = Awaited<ReturnType<typeof posthog.personsDeletionStatusList>>;

const result: PersonsDeletionStatusListOutput = await posthog.personsDeletionStatusList();

// Result shape (from schema): { next?: string | null; previous?: string | null; count?: number; results?: ({ person_uuid: string; created_at: string; status: string; delete_verified_at: string | null })[] }
```

### `posthog.personsFunnelRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/persons/funnel/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_funnel_retrieve`
- **Path params**: None
- **Query params**: `format`
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

type PersonsFunnelRetrieveInput = Parameters<typeof posthog.personsFunnelRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsFunnelRetrieveOutput = Awaited<ReturnType<typeof posthog.personsFunnelRetrieve>>;

const result: PersonsFunnelRetrieveOutput = await posthog.personsFunnelRetrieve();

// Result shape (from schema): unknown
```

### `posthog.personsFunnelCreate`

- **HTTP**: `POST /api/projects/{project_id}/persons/funnel/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_funnel_create`
- **Path params**: None
- **Query params**: `format`
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

type PersonsFunnelCreateInput = Parameters<typeof posthog.personsFunnelCreate> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsFunnelCreateOutput = Awaited<ReturnType<typeof posthog.personsFunnelCreate>>;

const result: PersonsFunnelCreateOutput = await posthog.personsFunnelCreate();

// Result shape (from schema): unknown
```

### `posthog.personsLifecycleRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/persons/lifecycle/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_lifecycle_retrieve`
- **Path params**: None
- **Query params**: `format`
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

type PersonsLifecycleRetrieveInput = Parameters<typeof posthog.personsLifecycleRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsLifecycleRetrieveOutput = Awaited<ReturnType<typeof posthog.personsLifecycleRetrieve>>;

const result: PersonsLifecycleRetrieveOutput = await posthog.personsLifecycleRetrieve();

// Result shape (from schema): unknown
```

### `posthog.personsPropertiesAtTimeRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/persons/properties_at_time/`
- **What it does**: Get person properties as they existed at a specific point in time.

This endpoint reconstructs person properties by querying ClickHouse events
for $set and $set_once operations up to the specified timestamp.

Query parameters:
- distinct_id: The distinct_id of the person
- timestamp: ISO datetime string for the point in time (e.g., "2023-06-15T14:30:00Z")
- include_set_once: Whether to handle $set_once operations (default: false)
- **OpenAPI operationId**: `persons_properties_at_time_retrieve`
- **Path params**: None
- **Query params**: `distinct_id`, `format`, `include_set_once`, `person_id`, `timestamp`
- **Response codes**: `200`, `400`, `404`, `500`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: number; name: string; distinct_ids: (string)[]; properties: { [key: string]: string | null | undefined }; created_at: string; uuid: string; last_seen_at: string | null; point_in_time_metadata: { queried_timestamp:...`
- OpenAPI response codes: `200`, `400`, `404`, `500`

```ts
import posthog from "@utdk/posthog";

type PersonsPropertiesAtTimeRetrieveInput = Parameters<typeof posthog.personsPropertiesAtTimeRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsPropertiesAtTimeRetrieveOutput = Awaited<ReturnType<typeof posthog.personsPropertiesAtTimeRetrieve>>;

const result: PersonsPropertiesAtTimeRetrieveOutput = await posthog.personsPropertiesAtTimeRetrieve();

// Result shape (from schema): { id: number; name: string; distinct_ids: (string)[]; properties: { [key: string]: string | null | undefined }; created_at: string; uuid: string; last_seen_at: string | null; point_in_time_metadata: { queried_timestamp:...
```

### `posthog.personsResetPersonDistinctIdCreate`

- **HTTP**: `POST /api/projects/{project_id}/persons/reset_person_distinct_id/`
- **What it does**: Reset a distinct_id for a deleted person. This allows the distinct_id to be used again.
- **OpenAPI operationId**: `persons_reset_person_distinct_id_create`
- **Path params**: None
- **Query params**: `format`
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

type PersonsResetPersonDistinctIdCreateInput = Parameters<typeof posthog.personsResetPersonDistinctIdCreate> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsResetPersonDistinctIdCreateOutput = Awaited<ReturnType<typeof posthog.personsResetPersonDistinctIdCreate>>;

const result: PersonsResetPersonDistinctIdCreateOutput = await posthog.personsResetPersonDistinctIdCreate();

// Result shape (from schema): unknown
```

### `posthog.personsTrendsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/persons/trends/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_trends_retrieve`
- **Path params**: None
- **Query params**: `format`
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

type PersonsTrendsRetrieveInput = Parameters<typeof posthog.personsTrendsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsTrendsRetrieveOutput = Awaited<ReturnType<typeof posthog.personsTrendsRetrieve>>;

const result: PersonsTrendsRetrieveOutput = await posthog.personsTrendsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.personsValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/persons/values/`
- **What it does**: This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.
- **OpenAPI operationId**: `persons_values_retrieve`
- **Path params**: None
- **Query params**: `format`, `key`, `value`
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

type PersonsValuesRetrieveInput = Parameters<typeof posthog.personsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type PersonsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.personsValuesRetrieve>>;

const result: PersonsValuesRetrieveOutput = await posthog.personsValuesRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

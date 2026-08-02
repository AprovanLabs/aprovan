# Events

## Operations

### `posthog.environmentsEventsList`

- **HTTP**: `GET /api/environments/{environment_id}/events/`
- **What it does**: 
        This endpoint allows you to list and filter events.
        It is effectively deprecated and is kept only for backwards compatibility.
        If you ever ask about it you will be advised to not use it...
        If you want to ad-hoc list or aggregate events, use the Query endpoint instead.
        If you want to export all events or many pages of events you should use our CDP/Batch Exports products instead.
        
- **OpenAPI operationId**: `environments_events_list`
- **Path params**: None
- **Query params**: `after`, `before`, `distinct_id`, `event`, `format`, `include_person`, `limit`, `offset`, `person_id`, `properties`, `select`, `where`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; results?: ({ id: string; distinct_id: string; properties: { [key: string]: unknown }; event: string; timestamp: string; person: { [key: string]: unknown } | null; elements: ({ event: string; text...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsEventsListInput = Parameters<typeof posthog.environmentsEventsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEventsListOutput = Awaited<ReturnType<typeof posthog.environmentsEventsList>>;

const result: EnvironmentsEventsListOutput = await posthog.environmentsEventsList();

// Result shape (from schema): { next?: string | null; results?: ({ id: string; distinct_id: string; properties: { [key: string]: unknown }; event: string; timestamp: string; person: { [key: string]: unknown } | null; elements: ({ event: string; text...
```

### `posthog.environmentsEventsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/events/{id}/`
- **OpenAPI operationId**: `environments_events_retrieve`
- **Path params**: `id`
- **Query params**: `format`, `include_person`
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

type EnvironmentsEventsRetrieveInput = Parameters<typeof posthog.environmentsEventsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEventsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEventsRetrieve>>;

const result: EnvironmentsEventsRetrieveOutput = await posthog.environmentsEventsRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.environmentsEventsValuesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/events/values/`
- **OpenAPI operationId**: `environments_events_values_retrieve`
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

type EnvironmentsEventsValuesRetrieveInput = Parameters<typeof posthog.environmentsEventsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsEventsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsEventsValuesRetrieve>>;

const result: EnvironmentsEventsValuesRetrieveOutput = await posthog.environmentsEventsValuesRetrieve();

// Result shape (from schema): unknown
```

### `posthog.eventsList`

- **HTTP**: `GET /api/projects/{project_id}/events/`
- **What it does**: 
        This endpoint allows you to list and filter events.
        It is effectively deprecated and is kept only for backwards compatibility.
        If you ever ask about it you will be advised to not use it...
        If you want to ad-hoc list or aggregate events, use the Query endpoint instead.
        If you want to export all events or many pages of events you should use our CDP/Batch Exports products instead.
        
- **OpenAPI operationId**: `events_list`
- **Path params**: None
- **Query params**: `after`, `before`, `distinct_id`, `event`, `format`, `include_person`, `limit`, `offset`, `person_id`, `properties`, `select`, `where`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ next?: string | null; results?: ({ id: string; distinct_id: string; properties: { [key: string]: unknown }; event: string; timestamp: string; person: { [key: string]: unknown } | null; elements: ({ event: string; text...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EventsListInput = Parameters<typeof posthog.eventsList> extends [infer T, ...unknown[]] ? T : undefined;
type EventsListOutput = Awaited<ReturnType<typeof posthog.eventsList>>;

const result: EventsListOutput = await posthog.eventsList();

// Result shape (from schema): { next?: string | null; results?: ({ id: string; distinct_id: string; properties: { [key: string]: unknown }; event: string; timestamp: string; person: { [key: string]: unknown } | null; elements: ({ event: string; text...
```

### `posthog.eventsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/events/{id}/`
- **OpenAPI operationId**: `events_retrieve`
- **Path params**: `id`
- **Query params**: `format`, `include_person`
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

type EventsRetrieveInput = Parameters<typeof posthog.eventsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventsRetrieveOutput = Awaited<ReturnType<typeof posthog.eventsRetrieve>>;

const result: EventsRetrieveOutput = await posthog.eventsRetrieve();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.eventsValuesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/events/values/`
- **OpenAPI operationId**: `events_values_retrieve`
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

type EventsValuesRetrieveInput = Parameters<typeof posthog.eventsValuesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EventsValuesRetrieveOutput = Awaited<ReturnType<typeof posthog.eventsValuesRetrieve>>;

const result: EventsValuesRetrieveOutput = await posthog.eventsValuesRetrieve();

// Result shape (from schema): unknown
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

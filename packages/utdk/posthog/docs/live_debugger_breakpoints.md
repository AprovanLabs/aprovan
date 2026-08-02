# Live Debugger Breakpoints

## Operations

### `posthog.liveDebuggerBreakpointsList`

- **HTTP**: `GET /api/projects/{project_id}/live_debugger_breakpoints/`
- **What it does**: Create, Read, Update and Delete breakpoints for live debugging.
- **OpenAPI operationId**: `live_debugger_breakpoints_list`
- **Path params**: None
- **Query params**: `filename`, `limit`, `offset`, `repository`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; repository?: string | null; filename: string; line_number: number; enabled?: boolean; condition?: string | null; created_at: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LiveDebuggerBreakpointsListInput = Parameters<typeof posthog.liveDebuggerBreakpointsList> extends [infer T, ...unknown[]] ? T : undefined;
type LiveDebuggerBreakpointsListOutput = Awaited<ReturnType<typeof posthog.liveDebuggerBreakpointsList>>;

const result: LiveDebuggerBreakpointsListOutput = await posthog.liveDebuggerBreakpointsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; repository?: string | null; filename: string; line_number: number; enabled?: boolean; condition?: string | null; created_at: strin...
```

### `posthog.liveDebuggerBreakpointsCreate`

- **HTTP**: `POST /api/projects/{project_id}/live_debugger_breakpoints/`
- **What it does**: Create, Read, Update and Delete breakpoints for live debugging.
- **OpenAPI operationId**: `live_debugger_breakpoints_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; repository?: string | null; filename: string; line_number: number; enabled?: boolean; condition?: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LiveDebuggerBreakpointsCreateInput = Parameters<typeof posthog.liveDebuggerBreakpointsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LiveDebuggerBreakpointsCreateOutput = Awaited<ReturnType<typeof posthog.liveDebuggerBreakpointsCreate>>;

const result: LiveDebuggerBreakpointsCreateOutput = await posthog.liveDebuggerBreakpointsCreate();

// Result shape (from schema): { id: string; repository?: string | null; filename: string; line_number: number; enabled?: boolean; condition?: string | null; created_at: string; updated_at: string }
```

### `posthog.liveDebuggerBreakpointsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/live_debugger_breakpoints/{id}/`
- **What it does**: Create, Read, Update and Delete breakpoints for live debugging.
- **OpenAPI operationId**: `live_debugger_breakpoints_destroy`
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

type LiveDebuggerBreakpointsDestroyInput = Parameters<typeof posthog.liveDebuggerBreakpointsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LiveDebuggerBreakpointsDestroyOutput = Awaited<ReturnType<typeof posthog.liveDebuggerBreakpointsDestroy>>;

const result: LiveDebuggerBreakpointsDestroyOutput = await posthog.liveDebuggerBreakpointsDestroy();

// Result shape (from schema): unknown
```

### `posthog.liveDebuggerBreakpointsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/live_debugger_breakpoints/{id}/`
- **What it does**: Create, Read, Update and Delete breakpoints for live debugging.
- **OpenAPI operationId**: `live_debugger_breakpoints_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; repository?: string | null; filename: string; line_number: number; enabled?: boolean; condition?: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LiveDebuggerBreakpointsRetrieveInput = Parameters<typeof posthog.liveDebuggerBreakpointsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LiveDebuggerBreakpointsRetrieveOutput = Awaited<ReturnType<typeof posthog.liveDebuggerBreakpointsRetrieve>>;

const result: LiveDebuggerBreakpointsRetrieveOutput = await posthog.liveDebuggerBreakpointsRetrieve();

// Result shape (from schema): { id: string; repository?: string | null; filename: string; line_number: number; enabled?: boolean; condition?: string | null; created_at: string; updated_at: string }
```

### `posthog.liveDebuggerBreakpointsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/live_debugger_breakpoints/{id}/`
- **What it does**: Create, Read, Update and Delete breakpoints for live debugging.
- **OpenAPI operationId**: `live_debugger_breakpoints_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; repository?: string | null; filename: string; line_number: number; enabled?: boolean; condition?: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LiveDebuggerBreakpointsPartialUpdateInput = Parameters<typeof posthog.liveDebuggerBreakpointsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LiveDebuggerBreakpointsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.liveDebuggerBreakpointsPartialUpdate>>;

const result: LiveDebuggerBreakpointsPartialUpdateOutput = await posthog.liveDebuggerBreakpointsPartialUpdate();

// Result shape (from schema): { id: string; repository?: string | null; filename: string; line_number: number; enabled?: boolean; condition?: string | null; created_at: string; updated_at: string }
```

### `posthog.liveDebuggerBreakpointsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/live_debugger_breakpoints/{id}/`
- **What it does**: Create, Read, Update and Delete breakpoints for live debugging.
- **OpenAPI operationId**: `live_debugger_breakpoints_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; repository?: string | null; filename: string; line_number: number; enabled?: boolean; condition?: string | null; created_at: string; updated_at: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LiveDebuggerBreakpointsUpdateInput = Parameters<typeof posthog.liveDebuggerBreakpointsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LiveDebuggerBreakpointsUpdateOutput = Awaited<ReturnType<typeof posthog.liveDebuggerBreakpointsUpdate>>;

const result: LiveDebuggerBreakpointsUpdateOutput = await posthog.liveDebuggerBreakpointsUpdate();

// Result shape (from schema): { id: string; repository?: string | null; filename: string; line_number: number; enabled?: boolean; condition?: string | null; created_at: string; updated_at: string }
```

### `posthog.liveDebuggerBreakpointsActiveRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/live_debugger_breakpoints/active/`
- **What it does**: Get active breakpoints (External API)
- **OpenAPI operationId**: `live_debugger_breakpoints_active_retrieve`
- **Path params**: None
- **Query params**: `enabled`, `filename`, `repository`
- **Response codes**: `200`, `400`, `401`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ breakpoints: ({ id: string; repository?: string | null; filename: string; line_number: number; enabled: boolean; condition?: string | null })[] }`
- OpenAPI response codes: `200`, `400`, `401`

```ts
import posthog from "@utdk/posthog";

type LiveDebuggerBreakpointsActiveRetrieveInput = Parameters<typeof posthog.liveDebuggerBreakpointsActiveRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LiveDebuggerBreakpointsActiveRetrieveOutput = Awaited<ReturnType<typeof posthog.liveDebuggerBreakpointsActiveRetrieve>>;

const result: LiveDebuggerBreakpointsActiveRetrieveOutput = await posthog.liveDebuggerBreakpointsActiveRetrieve();

// Result shape (from schema): { breakpoints: ({ id: string; repository?: string | null; filename: string; line_number: number; enabled: boolean; condition?: string | null })[] }
```

### `posthog.liveDebuggerBreakpointsBreakpointHitsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/live_debugger_breakpoints/breakpoint_hits/`
- **What it does**: Get breakpoint hits
- **OpenAPI operationId**: `live_debugger_breakpoints_breakpoint_hits_retrieve`
- **Path params**: None
- **Query params**: `breakpoint_ids`, `limit`, `offset`
- **Response codes**: `200`, `400`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; lineNumber: number; functionName: string; timestamp: string; variables: { [key: string]: unknown }; stackTrace: (unknown)[]; breakpoint_id: string; filename: string })[]; count: number; has_mor...`
- OpenAPI response codes: `200`, `400`

```ts
import posthog from "@utdk/posthog";

type LiveDebuggerBreakpointsBreakpointHitsRetrieveInput = Parameters<typeof posthog.liveDebuggerBreakpointsBreakpointHitsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LiveDebuggerBreakpointsBreakpointHitsRetrieveOutput = Awaited<ReturnType<typeof posthog.liveDebuggerBreakpointsBreakpointHitsRetrieve>>;

const result: LiveDebuggerBreakpointsBreakpointHitsRetrieveOutput = await posthog.liveDebuggerBreakpointsBreakpointHitsRetrieve();

// Result shape (from schema): { results: ({ id: string; lineNumber: number; functionName: string; timestamp: string; variables: { [key: string]: unknown }; stackTrace: (unknown)[]; breakpoint_id: string; filename: string })[]; count: number; has_mor...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

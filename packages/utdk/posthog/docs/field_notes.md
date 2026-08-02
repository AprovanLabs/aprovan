# Field Notes

## Operations

### `posthog.fieldNotesList`

- **HTTP**: `GET /api/projects/{project_id}/field_notes/`
- **What it does**: Create, read, update, and resolve toolbar field notes — UI feedback a user
points at on their own site, surfaced to coding agents over MCP.
- **OpenAPI operationId**: `field_notes_list`
- **Path params**: None
- **Query params**: `field_note_status`, `host`, `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; comment: string; field_note_status?: "pending" | "acknowledged" | "resolved" | "dismissed"; resolution?: string | null; url: strin...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FieldNotesListInput = Parameters<typeof posthog.fieldNotesList> extends [infer T, ...unknown[]] ? T : undefined;
type FieldNotesListOutput = Awaited<ReturnType<typeof posthog.fieldNotesList>>;

const result: FieldNotesListOutput = await posthog.fieldNotesList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; comment: string; field_note_status?: "pending" | "acknowledged" | "resolved" | "dismissed"; resolution?: string | null; url: strin...
```

### `posthog.fieldNotesCreate`

- **HTTP**: `POST /api/projects/{project_id}/field_notes/`
- **What it does**: Create, read, update, and resolve toolbar field notes — UI feedback a user
points at on their own site, surfaced to coding agents over MCP.
- **OpenAPI operationId**: `field_notes_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; comment: string; field_note_status?: "pending" | "acknowledged" | "resolved" | "dismissed"; resolution?: string | null; url: string; host: string; pathname?: string | null; selector: string; element_text?:...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type FieldNotesCreateInput = Parameters<typeof posthog.fieldNotesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type FieldNotesCreateOutput = Awaited<ReturnType<typeof posthog.fieldNotesCreate>>;

const result: FieldNotesCreateOutput = await posthog.fieldNotesCreate();

// Result shape (from schema): { id: string; comment: string; field_note_status?: "pending" | "acknowledged" | "resolved" | "dismissed"; resolution?: string | null; url: string; host: string; pathname?: string | null; selector: string; element_text?:...
```

### `posthog.fieldNotesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/field_notes/{id}/`
- **What it does**: Create, read, update, and resolve toolbar field notes — UI feedback a user
points at on their own site, surfaced to coding agents over MCP.
- **OpenAPI operationId**: `field_notes_destroy`
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

type FieldNotesDestroyInput = Parameters<typeof posthog.fieldNotesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type FieldNotesDestroyOutput = Awaited<ReturnType<typeof posthog.fieldNotesDestroy>>;

const result: FieldNotesDestroyOutput = await posthog.fieldNotesDestroy();

// Result shape (from schema): unknown
```

### `posthog.fieldNotesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/field_notes/{id}/`
- **What it does**: Create, read, update, and resolve toolbar field notes — UI feedback a user
points at on their own site, surfaced to coding agents over MCP.
- **OpenAPI operationId**: `field_notes_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; comment: string; field_note_status?: "pending" | "acknowledged" | "resolved" | "dismissed"; resolution?: string | null; url: string; host: string; pathname?: string | null; selector: string; element_text?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FieldNotesRetrieveInput = Parameters<typeof posthog.fieldNotesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type FieldNotesRetrieveOutput = Awaited<ReturnType<typeof posthog.fieldNotesRetrieve>>;

const result: FieldNotesRetrieveOutput = await posthog.fieldNotesRetrieve();

// Result shape (from schema): { id: string; comment: string; field_note_status?: "pending" | "acknowledged" | "resolved" | "dismissed"; resolution?: string | null; url: string; host: string; pathname?: string | null; selector: string; element_text?:...
```

### `posthog.fieldNotesPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/field_notes/{id}/`
- **What it does**: Create, read, update, and resolve toolbar field notes — UI feedback a user
points at on their own site, surfaced to coding agents over MCP.
- **OpenAPI operationId**: `field_notes_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; comment: string; field_note_status?: "pending" | "acknowledged" | "resolved" | "dismissed"; resolution?: string | null; url: string; host: string; pathname?: string | null; selector: string; element_text?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FieldNotesPartialUpdateInput = Parameters<typeof posthog.fieldNotesPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type FieldNotesPartialUpdateOutput = Awaited<ReturnType<typeof posthog.fieldNotesPartialUpdate>>;

const result: FieldNotesPartialUpdateOutput = await posthog.fieldNotesPartialUpdate();

// Result shape (from schema): { id: string; comment: string; field_note_status?: "pending" | "acknowledged" | "resolved" | "dismissed"; resolution?: string | null; url: string; host: string; pathname?: string | null; selector: string; element_text?:...
```

### `posthog.fieldNotesUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/field_notes/{id}/`
- **What it does**: Create, read, update, and resolve toolbar field notes — UI feedback a user
points at on their own site, surfaced to coding agents over MCP.
- **OpenAPI operationId**: `field_notes_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; comment: string; field_note_status?: "pending" | "acknowledged" | "resolved" | "dismissed"; resolution?: string | null; url: string; host: string; pathname?: string | null; selector: string; element_text?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type FieldNotesUpdateInput = Parameters<typeof posthog.fieldNotesUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type FieldNotesUpdateOutput = Awaited<ReturnType<typeof posthog.fieldNotesUpdate>>;

const result: FieldNotesUpdateOutput = await posthog.fieldNotesUpdate();

// Result shape (from schema): { id: string; comment: string; field_note_status?: "pending" | "acknowledged" | "resolved" | "dismissed"; resolution?: string | null; url: string; host: string; pathname?: string | null; selector: string; element_text?:...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

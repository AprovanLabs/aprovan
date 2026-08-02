# Agent Platform

## Operations

### `posthog.agentApplicationsList`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/`
- **What it does**: Agent applications — the deployable unit of the platform.

URLs:
    GET    /api/projects/<team>/agent_applications/             list
    POST   /api/projects/<team>/agent_applications/             create
    GET    /api/projects/<team>/agent_applications/<id|slug>/   retrieve
    PATCH  /api/projects/<team>/agent_applications/<id|slug>/   update
    DELETE /api/projects/<team>/agent_applications/<id|slug>/   archive
    POST   /api/projects/<team>/agent_applications/<id|slug>/set_env/        bulk replace env
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/        list set keys
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  is one key set?
    PUT    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  set one key
    DELETE /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  clear one key
- **OpenAPI operationId**: `agent_applications_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsListInput = Parameters<typeof posthog.agentApplicationsList> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsListOutput = Awaited<ReturnType<typeof posthog.agentApplicationsList>>;

const result: AgentApplicationsListOutput = await posthog.agentApplicationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at:...
```

### `posthog.agentApplicationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/`
- **What it does**: Agent applications — the deployable unit of the platform.

URLs:
    GET    /api/projects/<team>/agent_applications/             list
    POST   /api/projects/<team>/agent_applications/             create
    GET    /api/projects/<team>/agent_applications/<id|slug>/   retrieve
    PATCH  /api/projects/<team>/agent_applications/<id|slug>/   update
    DELETE /api/projects/<team>/agent_applications/<id|slug>/   archive
    POST   /api/projects/<team>/agent_applications/<id|slug>/set_env/        bulk replace env
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/        list set keys
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  is one key set?
    PUT    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  set one key
    DELETE /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  clear one key
- **OpenAPI operationId**: `agent_applications_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsCreateInput = Parameters<typeof posthog.agentApplicationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsCreate>>;

const result: AgentApplicationsCreateOutput = await posthog.agentApplicationsCreate();

// Result shape (from schema): { id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...
```

### `posthog.agentMemoryListFiles`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/memory/files/`
- **What it does**: List memory file headers under the agent's prefix. Headers only — no bodies.
- **OpenAPI operationId**: `agent_memory_list_files`
- **Path params**: `application_id`
- **Query params**: `prefix`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; entries: ({ path: string; description: string; tags: (string)[]; created_at: string | null; updated_at: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentMemoryListFilesInput = Parameters<typeof posthog.agentMemoryListFiles> extends [infer T, ...unknown[]] ? T : undefined;
type AgentMemoryListFilesOutput = Awaited<ReturnType<typeof posthog.agentMemoryListFiles>>;

const result: AgentMemoryListFilesOutput = await posthog.agentMemoryListFiles();

// Result shape (from schema): { count: number; entries: ({ path: string; description: string; tags: (string)[]; created_at: string | null; updated_at: string | null })[] }
```

### `posthog.agentMemoryCreateFile`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/memory/files/`
- **What it does**: Create a memory file. Fails if the path already exists — use the update endpoint to overwrite.
- **OpenAPI operationId**: `agent_memory_create_file`
- **Path params**: `application_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ content: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentMemoryCreateFileInput = Parameters<typeof posthog.agentMemoryCreateFile> extends [infer T, ...unknown[]] ? T : undefined;
type AgentMemoryCreateFileOutput = Awaited<ReturnType<typeof posthog.agentMemoryCreateFile>>;

const result: AgentMemoryCreateFileOutput = await posthog.agentMemoryCreateFile();

// Result shape (from schema): { content: string }
```

### `posthog.agentMemoryDeleteFile`

- **HTTP**: `DELETE /api/projects/{project_id}/agent_applications/{application_id}/memory/files/by_path/`
- **What it does**: Hard-delete a memory file. Activity log captures the action against the agent.
- **OpenAPI operationId**: `agent_memory_delete_file`
- **Path params**: `application_id`
- **Query params**: `path`
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

type AgentMemoryDeleteFileInput = Parameters<typeof posthog.agentMemoryDeleteFile> extends [infer T, ...unknown[]] ? T : undefined;
type AgentMemoryDeleteFileOutput = Awaited<ReturnType<typeof posthog.agentMemoryDeleteFile>>;

const result: AgentMemoryDeleteFileOutput = await posthog.agentMemoryDeleteFile();

// Result shape (from schema): unknown
```

### `posthog.agentMemoryGetFile`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/memory/files/by_path/`
- **What it does**: Read one memory file in full (frontmatter + markdown body).
- **OpenAPI operationId**: `agent_memory_get_file`
- **Path params**: `application_id`
- **Query params**: `path`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ content: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentMemoryGetFileInput = Parameters<typeof posthog.agentMemoryGetFile> extends [infer T, ...unknown[]] ? T : undefined;
type AgentMemoryGetFileOutput = Awaited<ReturnType<typeof posthog.agentMemoryGetFile>>;

const result: AgentMemoryGetFileOutput = await posthog.agentMemoryGetFile();

// Result shape (from schema): { content: string }
```

### `posthog.agentMemoryUpdateFile`

- **HTTP**: `PATCH /api/projects/{project_id}/agent_applications/{application_id}/memory/files/by_path/`
- **What it does**: Update a memory file. Any field omitted is preserved from the existing file.
- **OpenAPI operationId**: `agent_memory_update_file`
- **Path params**: `application_id`
- **Query params**: `path`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ content: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentMemoryUpdateFileInput = Parameters<typeof posthog.agentMemoryUpdateFile> extends [infer T, ...unknown[]] ? T : undefined;
type AgentMemoryUpdateFileOutput = Awaited<ReturnType<typeof posthog.agentMemoryUpdateFile>>;

const result: AgentMemoryUpdateFileOutput = await posthog.agentMemoryUpdateFile();

// Result shape (from schema): { content: string }
```

### `posthog.agentMemorySearch`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/memory/search/`
- **What it does**: BM25 search across the agent's memory files. Ranks by description+tags+path+body with field weighting.
- **OpenAPI operationId**: `agent_memory_search`
- **Path params**: `application_id`
- **Query params**: `limit`, `prefix`, `q`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ cue: string; count: number; results: ({ path: string; description: string; tags: (string)[]; score: number; snippet: string | null })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentMemorySearchInput = Parameters<typeof posthog.agentMemorySearch> extends [infer T, ...unknown[]] ? T : undefined;
type AgentMemorySearchOutput = Awaited<ReturnType<typeof posthog.agentMemorySearch>>;

const result: AgentMemorySearchOutput = await posthog.agentMemorySearch();

// Result shape (from schema): { cue: string; count: number; results: ({ path: string; description: string; tags: (string)[]; score: number; snippet: string | null })[] }
```

### `posthog.agentMemoryListTables`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/memory/tables/`
- **What it does**: List the agent's tabular-reference tables (the @posthog/table-* JSONL tables): name + byte size.
- **OpenAPI operationId**: `agent_memory_list_tables`
- **Path params**: `application_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; tables: ({ name: string; size: number })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentMemoryListTablesInput = Parameters<typeof posthog.agentMemoryListTables> extends [infer T, ...unknown[]] ? T : undefined;
type AgentMemoryListTablesOutput = Awaited<ReturnType<typeof posthog.agentMemoryListTables>>;

const result: AgentMemoryListTablesOutput = await posthog.agentMemoryListTables();

// Result shape (from schema): { count: number; tables: ({ name: string; size: number })[] }
```

### `posthog.agentMemoryReadTable`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/memory/tables/{name}/`
- **What it does**: Read rows from one tabular-reference table (capped via ?limit).
- **OpenAPI operationId**: `agent_memory_read_table`
- **Path params**: `application_id`, `name`
- **Query params**: `limit`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ name: string; total: number; returned: number; limit: number; rows: ({ [key: string]: unknown })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentMemoryReadTableInput = Parameters<typeof posthog.agentMemoryReadTable> extends [infer T, ...unknown[]] ? T : undefined;
type AgentMemoryReadTableOutput = Awaited<ReturnType<typeof posthog.agentMemoryReadTable>>;

const result: AgentMemoryReadTableOutput = await posthog.agentMemoryReadTable();

// Result shape (from schema): { name: string; total: number; returned: number; limit: number; rows: ({ [key: string]: unknown })[] }
```

### `posthog.agentMemoryTree`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/memory/tree/`
- **What it does**: Pre-aggregated folder tree of memory files. Saves the frontend re-derivation work.
- **OpenAPI operationId**: `agent_memory_tree`
- **Path params**: `application_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ root: { [key: string]: unknown } }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentMemoryTreeInput = Parameters<typeof posthog.agentMemoryTree> extends [infer T, ...unknown[]] ? T : undefined;
type AgentMemoryTreeOutput = Awaited<ReturnType<typeof posthog.agentMemoryTree>>;

const result: AgentMemoryTreeOutput = await posthog.agentMemoryTree();

// Result shape (from schema): { root: { [key: string]: unknown } }
```

### `posthog.agentApplicationsRevisionsList`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/revisions/`
- **What it does**: Revisions of an agent. Created in `draft`, promoted through
`ready → live` once the bundle has been uploaded + frozen.

URLs (nested under an application):

    Model CRUD:
        GET   .../revisions/                       list
        POST  .../revisions/                       create draft
        GET   .../revisions/<id>/                  retrieve
        PATCH .../revisions/<id>/                  update spec (draft only)

    Lifecycle:
        POST  .../revisions/<id>/promote/          ready → live
        POST  .../revisions/<id>/archive/          → archived
        POST  .../revisions/<id>/freeze/           draft → ready (stamps sha256)
        POST  .../revisions/<id>/clone_from/       copy bundle from another rev
        POST  .../revisions/new_draft/             create draft + clone_from atomically

    Bundle authoring (proxied to the janitor):
        GET    .../revisions/<id>/manifest/        list paths + sha256
        GET    .../revisions/<id>/file/?path=…     read one file
        PUT    .../revisions/<id>/file/?path=…     write one file (draft)
        DELETE .../revisions/<id>/file/?path=…     delete one file (draft)
        GET    .../revisions/<id>/bundle/          bulk pull all files
        PUT    .../revisions/<id>/bundle/          bulk push (replace|merge)
- **OpenAPI operationId**: `agent_applications_revisions_list`
- **Path params**: `application_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsListInput = Parameters<typeof posthog.agentApplicationsRevisionsList> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsListOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsList>>;

const result: AgentApplicationsRevisionsListOutput = await posthog.agentApplicationsRevisionsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_...
```

### `posthog.agentApplicationsRevisionsCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/`
- **What it does**: Revisions of an agent. Created in `draft`, promoted through
`ready → live` once the bundle has been uploaded + frozen.

URLs (nested under an application):

    Model CRUD:
        GET   .../revisions/                       list
        POST  .../revisions/                       create draft
        GET   .../revisions/<id>/                  retrieve
        PATCH .../revisions/<id>/                  update spec (draft only)

    Lifecycle:
        POST  .../revisions/<id>/promote/          ready → live
        POST  .../revisions/<id>/archive/          → archived
        POST  .../revisions/<id>/freeze/           draft → ready (stamps sha256)
        POST  .../revisions/<id>/clone_from/       copy bundle from another rev
        POST  .../revisions/new_draft/             create draft + clone_from atomically

    Bundle authoring (proxied to the janitor):
        GET    .../revisions/<id>/manifest/        list paths + sha256
        GET    .../revisions/<id>/file/?path=…     read one file
        PUT    .../revisions/<id>/file/?path=…     write one file (draft)
        DELETE .../revisions/<id>/file/?path=…     delete one file (draft)
        GET    .../revisions/<id>/bundle/          bulk pull all files
        PUT    .../revisions/<id>/bundle/          bulk push (replace|merge)
- **OpenAPI operationId**: `agent_applications_revisions_create`
- **Path params**: `application_id`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsCreate>>;

const result: AgentApplicationsRevisionsCreateOutput = await posthog.agentApplicationsRevisionsCreate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/`
- **What it does**: Revisions of an agent. Created in `draft`, promoted through
`ready → live` once the bundle has been uploaded + frozen.

URLs (nested under an application):

    Model CRUD:
        GET   .../revisions/                       list
        POST  .../revisions/                       create draft
        GET   .../revisions/<id>/                  retrieve
        PATCH .../revisions/<id>/                  update spec (draft only)

    Lifecycle:
        POST  .../revisions/<id>/promote/          ready → live
        POST  .../revisions/<id>/archive/          → archived
        POST  .../revisions/<id>/freeze/           draft → ready (stamps sha256)
        POST  .../revisions/<id>/clone_from/       copy bundle from another rev
        POST  .../revisions/new_draft/             create draft + clone_from atomically

    Bundle authoring (proxied to the janitor):
        GET    .../revisions/<id>/manifest/        list paths + sha256
        GET    .../revisions/<id>/file/?path=…     read one file
        PUT    .../revisions/<id>/file/?path=…     write one file (draft)
        DELETE .../revisions/<id>/file/?path=…     delete one file (draft)
        GET    .../revisions/<id>/bundle/          bulk pull all files
        PUT    .../revisions/<id>/bundle/          bulk push (replace|merge)
- **OpenAPI operationId**: `agent_applications_revisions_destroy`
- **Path params**: `application_id`, `id`
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

type AgentApplicationsRevisionsDestroyInput = Parameters<typeof posthog.agentApplicationsRevisionsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsDestroyOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsDestroy>>;

const result: AgentApplicationsRevisionsDestroyOutput = await posthog.agentApplicationsRevisionsDestroy();

// Result shape (from schema): unknown
```

### `posthog.agentApplicationsRevisionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/`
- **What it does**: Revisions of an agent. Created in `draft`, promoted through
`ready → live` once the bundle has been uploaded + frozen.

URLs (nested under an application):

    Model CRUD:
        GET   .../revisions/                       list
        POST  .../revisions/                       create draft
        GET   .../revisions/<id>/                  retrieve
        PATCH .../revisions/<id>/                  update spec (draft only)

    Lifecycle:
        POST  .../revisions/<id>/promote/          ready → live
        POST  .../revisions/<id>/archive/          → archived
        POST  .../revisions/<id>/freeze/           draft → ready (stamps sha256)
        POST  .../revisions/<id>/clone_from/       copy bundle from another rev
        POST  .../revisions/new_draft/             create draft + clone_from atomically

    Bundle authoring (proxied to the janitor):
        GET    .../revisions/<id>/manifest/        list paths + sha256
        GET    .../revisions/<id>/file/?path=…     read one file
        PUT    .../revisions/<id>/file/?path=…     write one file (draft)
        DELETE .../revisions/<id>/file/?path=…     delete one file (draft)
        GET    .../revisions/<id>/bundle/          bulk pull all files
        PUT    .../revisions/<id>/bundle/          bulk push (replace|merge)
- **OpenAPI operationId**: `agent_applications_revisions_retrieve`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsRetrieveInput = Parameters<typeof posthog.agentApplicationsRevisionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsRetrieveOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsRetrieve>>;

const result: AgentApplicationsRevisionsRetrieveOutput = await posthog.agentApplicationsRevisionsRetrieve();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/`
- **What it does**: Revisions of an agent. Created in `draft`, promoted through
`ready → live` once the bundle has been uploaded + frozen.

URLs (nested under an application):

    Model CRUD:
        GET   .../revisions/                       list
        POST  .../revisions/                       create draft
        GET   .../revisions/<id>/                  retrieve
        PATCH .../revisions/<id>/                  update spec (draft only)

    Lifecycle:
        POST  .../revisions/<id>/promote/          ready → live
        POST  .../revisions/<id>/archive/          → archived
        POST  .../revisions/<id>/freeze/           draft → ready (stamps sha256)
        POST  .../revisions/<id>/clone_from/       copy bundle from another rev
        POST  .../revisions/new_draft/             create draft + clone_from atomically

    Bundle authoring (proxied to the janitor):
        GET    .../revisions/<id>/manifest/        list paths + sha256
        GET    .../revisions/<id>/file/?path=…     read one file
        PUT    .../revisions/<id>/file/?path=…     write one file (draft)
        DELETE .../revisions/<id>/file/?path=…     delete one file (draft)
        GET    .../revisions/<id>/bundle/          bulk pull all files
        PUT    .../revisions/<id>/bundle/          bulk push (replace|merge)
- **OpenAPI operationId**: `agent_applications_revisions_partial_update`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsPartialUpdateInput = Parameters<typeof posthog.agentApplicationsRevisionsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsPartialUpdate>>;

const result: AgentApplicationsRevisionsPartialUpdateOutput = await posthog.agentApplicationsRevisionsPartialUpdate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/`
- **What it does**: Spec edits are only allowed while state='draft'. Once promoted to
ready/live the spec is frozen — change requires a new revision.
- **OpenAPI operationId**: `agent_applications_revisions_update`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsUpdateInput = Parameters<typeof posthog.agentApplicationsRevisionsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsUpdateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsUpdate>>;

const result: AgentApplicationsRevisionsUpdateOutput = await posthog.agentApplicationsRevisionsUpdate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsAgentMdUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/agent_md/`
- **What it does**: Revisions of an agent. Created in `draft`, promoted through
`ready → live` once the bundle has been uploaded + frozen.

URLs (nested under an application):

    Model CRUD:
        GET   .../revisions/                       list
        POST  .../revisions/                       create draft
        GET   .../revisions/<id>/                  retrieve
        PATCH .../revisions/<id>/                  update spec (draft only)

    Lifecycle:
        POST  .../revisions/<id>/promote/          ready → live
        POST  .../revisions/<id>/archive/          → archived
        POST  .../revisions/<id>/freeze/           draft → ready (stamps sha256)
        POST  .../revisions/<id>/clone_from/       copy bundle from another rev
        POST  .../revisions/new_draft/             create draft + clone_from atomically

    Bundle authoring (proxied to the janitor):
        GET    .../revisions/<id>/manifest/        list paths + sha256
        GET    .../revisions/<id>/file/?path=…     read one file
        PUT    .../revisions/<id>/file/?path=…     write one file (draft)
        DELETE .../revisions/<id>/file/?path=…     delete one file (draft)
        GET    .../revisions/<id>/bundle/          bulk pull all files
        PUT    .../revisions/<id>/bundle/          bulk push (replace|merge)
- **OpenAPI operationId**: `agent_applications_revisions_agent_md_update`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsAgentMdUpdateInput = Parameters<typeof posthog.agentApplicationsRevisionsAgentMdUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsAgentMdUpdateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsAgentMdUpdate>>;

const result: AgentApplicationsRevisionsAgentMdUpdateOutput = await posthog.agentApplicationsRevisionsAgentMdUpdate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsArchiveCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/archive/`
- **What it does**: Mark a revision archived. If it was the live one, clear the
application's live_revision pointer (the app effectively has no
deployable version until another revision is promoted).
- **OpenAPI operationId**: `agent_applications_revisions_archive_create`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsArchiveCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsArchiveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsArchiveCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsArchiveCreate>>;

const result: AgentApplicationsRevisionsArchiveCreateOutput = await posthog.agentApplicationsRevisionsArchiveCreate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsBundleRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/bundle/`
- **What it does**: Read the full typed bundle: `{ agent_md, skills, tools, spec }`.
- **OpenAPI operationId**: `agent_applications_revisions_bundle_retrieve`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsBundleRetrieveInput = Parameters<typeof posthog.agentApplicationsRevisionsBundleRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsBundleRetrieveOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsBundleRetrieve>>;

const result: AgentApplicationsRevisionsBundleRetrieveOutput = await posthog.agentApplicationsRevisionsBundleRetrieve();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsBundleUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/bundle/`
- **What it does**: Full-replace the typed bundle. Anything not in the payload is
deleted. Tool sources are AST-checked + esbuild-compiled by the
janitor before any S3 writes.
- **OpenAPI operationId**: `agent_applications_revisions_bundle_update`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsBundleUpdateInput = Parameters<typeof posthog.agentApplicationsRevisionsBundleUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsBundleUpdateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsBundleUpdate>>;

const result: AgentApplicationsRevisionsBundleUpdateOutput = await posthog.agentApplicationsRevisionsBundleUpdate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsBundleFileUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/bundle/file/`
- **What it does**: Update one `.md` file on a draft revision.

`agent.md` writes go to the draft bundle. `skills/<id>/SKILL.md`
writes are store-backed — skills are materialized from the skill
store at freeze, so the edit publishes a new version of the
referenced store skill and re-pins the draft's `skill_refs` entry
to it. `<id>` must be a ref alias on this revision; add new skills
via `bundle/import/` or `skill_refs`. Tool source / schema editing
is out of scope here — use the per-tool endpoints. Returns the
updated revision so the caller can refresh in one round-trip.
- **OpenAPI operationId**: `agent_applications_revisions_bundle_file_update`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`, `409`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`, `409`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsBundleFileUpdateInput = Parameters<typeof posthog.agentApplicationsRevisionsBundleFileUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsBundleFileUpdateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsBundleFileUpdate>>;

const result: AgentApplicationsRevisionsBundleFileUpdateOutput = await posthog.agentApplicationsRevisionsBundleFileUpdate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsBundleImportCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/bundle/import/`
- **What it does**: Bulk-merge a set of `.md` files into a draft revision.

Sets `agent_md` on the draft bundle if present. `skills[]` are
store-backed and merge by `id`: an id already referenced by the
draft publishes a new version of its store skill; an unreferenced
id attaches the store skill of that name (publishing the payload's
body to it), or creates it when no such skill exists — and each
ref is (re-)pinned to the published version. Skills not mentioned
are left alone, so the import is safe to retry. Draft-only;
non-draft revisions return 409 untouched.
- **OpenAPI operationId**: `agent_applications_revisions_bundle_import_create`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`, `409`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`, `409`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsBundleImportCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsBundleImportCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsBundleImportCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsBundleImportCreate>>;

const result: AgentApplicationsRevisionsBundleImportCreateOutput = await posthog.agentApplicationsRevisionsBundleImportCreate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsCloneFromCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/clone_from/`
- **What it does**: Copy every file from `source_revision_id` into this revision.
- **OpenAPI operationId**: `agent_applications_revisions_clone_from_create`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsCloneFromCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsCloneFromCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsCloneFromCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsCloneFromCreate>>;

const result: AgentApplicationsRevisionsCloneFromCreateOutput = await posthog.agentApplicationsRevisionsCloneFromCreate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsCronFireCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/cron/fire/`
- **What it does**: Fire one cron job out-of-band — the same execution path the
scheduler walks, but on demand. Authoring UX: the user iterates on
a cron prompt by clicking 'Fire now' rather than waiting for the
next scheduled firing. Without this, 'did my prompt do the right
thing?' is unanswerable until the cron actually fires.

Idempotent via `request_id`: repeat clicks with the same id resolve
to the same session id rather than firing N times.
- **OpenAPI operationId**: `agent_applications_revisions_cron_fire_create`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ ok: boolean; session_id: string; fired_at: string; idempotency_key: string; request_id: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsCronFireCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsCronFireCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsCronFireCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsCronFireCreate>>;

const result: AgentApplicationsRevisionsCronFireCreateOutput = await posthog.agentApplicationsRevisionsCronFireCreate();

// Result shape (from schema): { ok: boolean; session_id: string; fired_at: string; idempotency_key: string; request_id: string }
```

### `posthog.agentRevisionsEnvKeysList`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/env_keys/`
- **What it does**: List the names of secrets currently set on this revision.

Returns names only — values stay server-side under
`EncryptedTextField`. Use this to drive the "set / unset" badge next to
a declared secret in the editor UI.
- **OpenAPI operationId**: `agent_revisions_env_keys_list`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ keys: (string)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentRevisionsEnvKeysListInput = Parameters<typeof posthog.agentRevisionsEnvKeysList> extends [infer T, ...unknown[]] ? T : undefined;
type AgentRevisionsEnvKeysListOutput = Awaited<ReturnType<typeof posthog.agentRevisionsEnvKeysList>>;

const result: AgentRevisionsEnvKeysListOutput = await posthog.agentRevisionsEnvKeysList();

// Result shape (from schema): { keys: (string)[] }
```

### `posthog.agentRevisionsEnvKeysClear`

- **HTTP**: `DELETE /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/env_keys/{key}/`
- **What it does**: GET / PUT / DELETE one secret by name on this revision.

- `GET`    → `{ key, is_set }` (never returns the value).
- `PUT`    → upserts `{ value }` into the env block.
- `DELETE` → removes the key. No-op when it wasn't set.

Per-method scope: GET is treated as a write action so the single action
name maps to one consistent scope; reading whether a secret is set is
restricted to writers in any case.
- **OpenAPI operationId**: `agent_revisions_env_keys_clear`
- **Path params**: `application_id`, `id`, `key`
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

type AgentRevisionsEnvKeysClearInput = Parameters<typeof posthog.agentRevisionsEnvKeysClear> extends [infer T, ...unknown[]] ? T : undefined;
type AgentRevisionsEnvKeysClearOutput = Awaited<ReturnType<typeof posthog.agentRevisionsEnvKeysClear>>;

const result: AgentRevisionsEnvKeysClearOutput = await posthog.agentRevisionsEnvKeysClear();

// Result shape (from schema): unknown
```

### `posthog.agentRevisionsEnvKeysGet`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/env_keys/{key}/`
- **What it does**: GET / PUT / DELETE one secret by name on this revision.

- `GET`    → `{ key, is_set }` (never returns the value).
- `PUT`    → upserts `{ value }` into the env block.
- `DELETE` → removes the key. No-op when it wasn't set.

Per-method scope: GET is treated as a write action so the single action
name maps to one consistent scope; reading whether a secret is set is
restricted to writers in any case.
- **OpenAPI operationId**: `agent_revisions_env_keys_get`
- **Path params**: `application_id`, `id`, `key`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ key: string; is_set: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentRevisionsEnvKeysGetInput = Parameters<typeof posthog.agentRevisionsEnvKeysGet> extends [infer T, ...unknown[]] ? T : undefined;
type AgentRevisionsEnvKeysGetOutput = Awaited<ReturnType<typeof posthog.agentRevisionsEnvKeysGet>>;

const result: AgentRevisionsEnvKeysGetOutput = await posthog.agentRevisionsEnvKeysGet();

// Result shape (from schema): { key: string; is_set: boolean }
```

### `posthog.agentRevisionsEnvKeysSet`

- **HTTP**: `PUT /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/env_keys/{key}/`
- **What it does**: GET / PUT / DELETE one secret by name on this revision.

- `GET`    → `{ key, is_set }` (never returns the value).
- `PUT`    → upserts `{ value }` into the env block.
- `DELETE` → removes the key. No-op when it wasn't set.

Per-method scope: GET is treated as a write action so the single action
name maps to one consistent scope; reading whether a secret is set is
restricted to writers in any case.
- **OpenAPI operationId**: `agent_revisions_env_keys_set`
- **Path params**: `application_id`, `id`, `key`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ key: string; is_set: boolean }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentRevisionsEnvKeysSetInput = Parameters<typeof posthog.agentRevisionsEnvKeysSet> extends [infer T, ...unknown[]] ? T : undefined;
type AgentRevisionsEnvKeysSetOutput = Awaited<ReturnType<typeof posthog.agentRevisionsEnvKeysSet>>;

const result: AgentRevisionsEnvKeysSetOutput = await posthog.agentRevisionsEnvKeysSet();

// Result shape (from schema): { key: string; is_set: boolean }
```

### `posthog.agentApplicationsRevisionsFreezeCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/freeze/`
- **What it does**: Freeze the bundle: draft → ready, stamps sha256 on the row.

Django is a thin proxy here: resolve template refs into the
bundle, ask the janitor to seal it (the janitor returns the sha
+ the spec it derived from the typed resources), then stamp the
row. No `transaction.atomic()` — the janitor's freeze is idempotent
(on retry it re-reads the existing `.frozen` marker + re-derives
spec), so a partial failure here is recoverable by re-calling
freeze, not by transactional rollback. Holding an atomic block
across the janitor HTTP call previously deadlocked the
agent_revision row against the janitor's spec write — that's
moved off the janitor side as part of the same fix.
- **OpenAPI operationId**: `agent_applications_revisions_freeze_create`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsFreezeCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsFreezeCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsFreezeCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsFreezeCreate>>;

const result: AgentApplicationsRevisionsFreezeCreateOutput = await posthog.agentApplicationsRevisionsFreezeCreate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsManifestRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/manifest/`
- **What it does**: List every file in this revision's bundle (path, size, sha256).
- **OpenAPI operationId**: `agent_applications_revisions_manifest_retrieve`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsManifestRetrieveInput = Parameters<typeof posthog.agentApplicationsRevisionsManifestRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsManifestRetrieveOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsManifestRetrieve>>;

const result: AgentApplicationsRevisionsManifestRetrieveOutput = await posthog.agentApplicationsRevisionsManifestRetrieve();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsPromoteCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/promote/`
- **What it does**: ready → live. Sets the parent application's live_revision.
- **OpenAPI operationId**: `agent_applications_revisions_promote_create`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsPromoteCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsPromoteCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsPromoteCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsPromoteCreate>>;

const result: AgentApplicationsRevisionsPromoteCreateOutput = await posthog.agentApplicationsRevisionsPromoteCreate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsSetEnvCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/set_env/`
- **What it does**: Replace this revision's encrypted env block.

The body is `{ "env": { "<KEY>": "<value>", ... } }`. The encrypted
text is stored on `AgentRevision.encrypted_env`; the worker decrypts it
at session start via the same Fernet schedule (see
agent-shared/src/runtime/encryption.ts).
- **OpenAPI operationId**: `agent_applications_revisions_set_env_create`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsSetEnvCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsSetEnvCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsSetEnvCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsSetEnvCreate>>;

const result: AgentApplicationsRevisionsSetEnvCreateOutput = await posthog.agentApplicationsRevisionsSetEnvCreate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsSkillRefsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/skill_refs/`
- **What it does**: Full-replace the draft's store-skill references. They are resolved
and materialized into the bundle at freeze, not here — this only records
which skills (and pinned versions) the freeze should pull in.
- **OpenAPI operationId**: `agent_applications_revisions_skill_refs_update`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsSkillRefsUpdateInput = Parameters<typeof posthog.agentApplicationsRevisionsSkillRefsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsSkillRefsUpdateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsSkillRefsUpdate>>;

const result: AgentApplicationsRevisionsSkillRefsUpdateOutput = await posthog.agentApplicationsRevisionsSkillRefsUpdate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsSlackManifest`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/slack_manifest/`
- **What it does**: Build a Slack app manifest for this revision's slack trigger.

Deterministic: the OAuth scopes and bot event subscriptions are derived
from the slack trigger config (`mention_only` / `auto_resume_threads` /
`ack_reaction`) and the agent's Slack tools, so the manifest already
subscribes to exactly the events the config needs. 400 if the revision
has no slack trigger.
- **OpenAPI operationId**: `agent_applications_revisions_slack_manifest`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ revision_id: string; manifest: unknown; notes: (string)[]; events_url: string | null; interactivity_url: string | null }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsSlackManifestInput = Parameters<typeof posthog.agentApplicationsRevisionsSlackManifest> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsSlackManifestOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsSlackManifest>>;

const result: AgentApplicationsRevisionsSlackManifestOutput = await posthog.agentApplicationsRevisionsSlackManifest();

// Result shape (from schema): { revision_id: string; manifest: unknown; notes: (string)[]; events_url: string | null; interactivity_url: string | null }
```

### `posthog.agentApplicationsRevisionsSpecUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/spec/`
- **What it does**: Revisions of an agent. Created in `draft`, promoted through
`ready → live` once the bundle has been uploaded + frozen.

URLs (nested under an application):

    Model CRUD:
        GET   .../revisions/                       list
        POST  .../revisions/                       create draft
        GET   .../revisions/<id>/                  retrieve
        PATCH .../revisions/<id>/                  update spec (draft only)

    Lifecycle:
        POST  .../revisions/<id>/promote/          ready → live
        POST  .../revisions/<id>/archive/          → archived
        POST  .../revisions/<id>/freeze/           draft → ready (stamps sha256)
        POST  .../revisions/<id>/clone_from/       copy bundle from another rev
        POST  .../revisions/new_draft/             create draft + clone_from atomically

    Bundle authoring (proxied to the janitor):
        GET    .../revisions/<id>/manifest/        list paths + sha256
        GET    .../revisions/<id>/file/?path=…     read one file
        PUT    .../revisions/<id>/file/?path=…     write one file (draft)
        DELETE .../revisions/<id>/file/?path=…     delete one file (draft)
        GET    .../revisions/<id>/bundle/          bulk pull all files
        PUT    .../revisions/<id>/bundle/          bulk push (replace|merge)
- **OpenAPI operationId**: `agent_applications_revisions_spec_update`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsSpecUpdateInput = Parameters<typeof posthog.agentApplicationsRevisionsSpecUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsSpecUpdateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsSpecUpdate>>;

const result: AgentApplicationsRevisionsSpecUpdateOutput = await posthog.agentApplicationsRevisionsSpecUpdate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsSystemPrompt`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/system_prompt/`
- **What it does**: Return the fully-assembled system prompt for this revision.

Authoring tools call this to preview what the model will actually
see at session start — the platform framework preamble plus the
bundle's `agent.md` plus the skills index. Useful for debugging
author-vs-framework precedence conflicts and verifying
`spec.framework_prompt.omit` overrides took effect.
- **OpenAPI operationId**: `agent_applications_revisions_system_prompt`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ revision_id: string; framework_prompt_version: number; system_prompt: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsSystemPromptInput = Parameters<typeof posthog.agentApplicationsRevisionsSystemPrompt> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsSystemPromptOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsSystemPrompt>>;

const result: AgentApplicationsRevisionsSystemPromptOutput = await posthog.agentApplicationsRevisionsSystemPrompt();

// Result shape (from schema): { revision_id: string; framework_prompt_version: number; system_prompt: string }
```

### `posthog.agentApplicationsRevisionsToolsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/tools/{tool_id}/`
- **What it does**: Revisions of an agent. Created in `draft`, promoted through
`ready → live` once the bundle has been uploaded + frozen.

URLs (nested under an application):

    Model CRUD:
        GET   .../revisions/                       list
        POST  .../revisions/                       create draft
        GET   .../revisions/<id>/                  retrieve
        PATCH .../revisions/<id>/                  update spec (draft only)

    Lifecycle:
        POST  .../revisions/<id>/promote/          ready → live
        POST  .../revisions/<id>/archive/          → archived
        POST  .../revisions/<id>/freeze/           draft → ready (stamps sha256)
        POST  .../revisions/<id>/clone_from/       copy bundle from another rev
        POST  .../revisions/new_draft/             create draft + clone_from atomically

    Bundle authoring (proxied to the janitor):
        GET    .../revisions/<id>/manifest/        list paths + sha256
        GET    .../revisions/<id>/file/?path=…     read one file
        PUT    .../revisions/<id>/file/?path=…     write one file (draft)
        DELETE .../revisions/<id>/file/?path=…     delete one file (draft)
        GET    .../revisions/<id>/bundle/          bulk pull all files
        PUT    .../revisions/<id>/bundle/          bulk push (replace|merge)
- **OpenAPI operationId**: `agent_applications_revisions_tools_destroy`
- **Path params**: `application_id`, `id`, `tool_id`
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

type AgentApplicationsRevisionsToolsDestroyInput = Parameters<typeof posthog.agentApplicationsRevisionsToolsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsToolsDestroyOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsToolsDestroy>>;

const result: AgentApplicationsRevisionsToolsDestroyOutput = await posthog.agentApplicationsRevisionsToolsDestroy();

// Result shape (from schema): unknown
```

### `posthog.agentApplicationsRevisionsToolsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/tools/{tool_id}/`
- **What it does**: Revisions of an agent. Created in `draft`, promoted through
`ready → live` once the bundle has been uploaded + frozen.

URLs (nested under an application):

    Model CRUD:
        GET   .../revisions/                       list
        POST  .../revisions/                       create draft
        GET   .../revisions/<id>/                  retrieve
        PATCH .../revisions/<id>/                  update spec (draft only)

    Lifecycle:
        POST  .../revisions/<id>/promote/          ready → live
        POST  .../revisions/<id>/archive/          → archived
        POST  .../revisions/<id>/freeze/           draft → ready (stamps sha256)
        POST  .../revisions/<id>/clone_from/       copy bundle from another rev
        POST  .../revisions/new_draft/             create draft + clone_from atomically

    Bundle authoring (proxied to the janitor):
        GET    .../revisions/<id>/manifest/        list paths + sha256
        GET    .../revisions/<id>/file/?path=…     read one file
        PUT    .../revisions/<id>/file/?path=…     write one file (draft)
        DELETE .../revisions/<id>/file/?path=…     delete one file (draft)
        GET    .../revisions/<id>/bundle/          bulk pull all files
        PUT    .../revisions/<id>/bundle/          bulk push (replace|merge)
- **OpenAPI operationId**: `agent_applications_revisions_tools_update`
- **Path params**: `application_id`, `id`, `tool_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsToolsUpdateInput = Parameters<typeof posthog.agentApplicationsRevisionsToolsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsToolsUpdateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsToolsUpdate>>;

const result: AgentApplicationsRevisionsToolsUpdateOutput = await posthog.agentApplicationsRevisionsToolsUpdate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsRevisionsToolsDryRunCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/tools/{tool_id}/dry_run/`
- **What it does**: Execute one persisted custom tool in a single-shot sandbox.

Authoring loop's "test this tool" button. The tool's source must
already be PUT (compiled.js is what runs); this just invokes it
with the caller-supplied args and a stubbed ctx. No real secrets
leave Django — `mock_secrets` is a `{name → placeholder}` map.
- **OpenAPI operationId**: `agent_applications_revisions_tools_dry_run_create`
- **Path params**: `application_id`, `id`, `tool_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ ok: boolean; tool_id: string; result?: unknown; error?: { code: string; message: string }; duration_ms: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsToolsDryRunCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsToolsDryRunCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsToolsDryRunCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsToolsDryRunCreate>>;

const result: AgentApplicationsRevisionsToolsDryRunCreateOutput = await posthog.agentApplicationsRevisionsToolsDryRunCreate();

// Result shape (from schema): { ok: boolean; tool_id: string; result?: unknown; error?: { code: string; message: string }; duration_ms: number }
```

### `posthog.agentApplicationsRevisionsValidateCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/{id}/validate/`
- **What it does**: Pre-flight checks before freeze + promote: agent.md exists,
every native tool id is registered, every custom tool has its
compiled.js + schema.json, every skill path exists, every declared
secret has a value set in this revision's env block. Returns
`{ ok, errors: [...] }`. Works on any revision state.
- **OpenAPI operationId**: `agent_applications_revisions_validate_create`
- **Path params**: `application_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ ok: boolean; revision_id: string; revision_state: string; errors: ({ code: string; message: string; pointer: string })[]; resolved_natives: (string)[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsValidateCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsValidateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsValidateCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsValidateCreate>>;

const result: AgentApplicationsRevisionsValidateCreateOutput = await posthog.agentApplicationsRevisionsValidateCreate();

// Result shape (from schema): { ok: boolean; revision_id: string; revision_state: string; errors: ({ code: string; message: string; pointer: string })[]; resolved_natives: (string)[] }
```

### `posthog.agentApplicationsRevisionsNewDraftCreate`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{application_id}/revisions/new_draft/`
- **What it does**: Create a fresh draft revision under `application_id` and seed it
from `source_revision_id`. Saves the MCP one round-trip vs the
explicit create + clone_from sequence.
- **OpenAPI operationId**: `agent_applications_revisions_new_draft_create`
- **Path params**: `application_id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRevisionsNewDraftCreateInput = Parameters<typeof posthog.agentApplicationsRevisionsNewDraftCreate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRevisionsNewDraftCreateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRevisionsNewDraftCreate>>;

const result: AgentApplicationsRevisionsNewDraftCreateOutput = await posthog.agentApplicationsRevisionsNewDraftCreate();

// Result shape (from schema): { id: string; application: string; parent_revision?: string | null; state: "draft" | "ready" | "live" | "archived"; bundle_uri?: string; bundle_sha256: string | null; spec?: unknown; skill_refs: ({ from_template: string...
```

### `posthog.agentApplicationsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/agent_applications/{id}/`
- **What it does**: Agent applications — the deployable unit of the platform.

URLs:
    GET    /api/projects/<team>/agent_applications/             list
    POST   /api/projects/<team>/agent_applications/             create
    GET    /api/projects/<team>/agent_applications/<id|slug>/   retrieve
    PATCH  /api/projects/<team>/agent_applications/<id|slug>/   update
    DELETE /api/projects/<team>/agent_applications/<id|slug>/   archive
    POST   /api/projects/<team>/agent_applications/<id|slug>/set_env/        bulk replace env
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/        list set keys
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  is one key set?
    PUT    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  set one key
    DELETE /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  clear one key
- **OpenAPI operationId**: `agent_applications_destroy`
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

type AgentApplicationsDestroyInput = Parameters<typeof posthog.agentApplicationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsDestroyOutput = Awaited<ReturnType<typeof posthog.agentApplicationsDestroy>>;

const result: AgentApplicationsDestroyOutput = await posthog.agentApplicationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.agentApplicationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{id}/`
- **What it does**: Agent applications — the deployable unit of the platform.

URLs:
    GET    /api/projects/<team>/agent_applications/             list
    POST   /api/projects/<team>/agent_applications/             create
    GET    /api/projects/<team>/agent_applications/<id|slug>/   retrieve
    PATCH  /api/projects/<team>/agent_applications/<id|slug>/   update
    DELETE /api/projects/<team>/agent_applications/<id|slug>/   archive
    POST   /api/projects/<team>/agent_applications/<id|slug>/set_env/        bulk replace env
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/        list set keys
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  is one key set?
    PUT    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  set one key
    DELETE /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  clear one key
- **OpenAPI operationId**: `agent_applications_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsRetrieveInput = Parameters<typeof posthog.agentApplicationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsRetrieveOutput = Awaited<ReturnType<typeof posthog.agentApplicationsRetrieve>>;

const result: AgentApplicationsRetrieveOutput = await posthog.agentApplicationsRetrieve();

// Result shape (from schema): { id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...
```

### `posthog.agentApplicationsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/agent_applications/{id}/`
- **What it does**: Agent applications — the deployable unit of the platform.

URLs:
    GET    /api/projects/<team>/agent_applications/             list
    POST   /api/projects/<team>/agent_applications/             create
    GET    /api/projects/<team>/agent_applications/<id|slug>/   retrieve
    PATCH  /api/projects/<team>/agent_applications/<id|slug>/   update
    DELETE /api/projects/<team>/agent_applications/<id|slug>/   archive
    POST   /api/projects/<team>/agent_applications/<id|slug>/set_env/        bulk replace env
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/        list set keys
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  is one key set?
    PUT    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  set one key
    DELETE /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  clear one key
- **OpenAPI operationId**: `agent_applications_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsPartialUpdateInput = Parameters<typeof posthog.agentApplicationsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsPartialUpdate>>;

const result: AgentApplicationsPartialUpdateOutput = await posthog.agentApplicationsPartialUpdate();

// Result shape (from schema): { id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...
```

### `posthog.agentApplicationsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/agent_applications/{id}/`
- **What it does**: Agent applications — the deployable unit of the platform.

URLs:
    GET    /api/projects/<team>/agent_applications/             list
    POST   /api/projects/<team>/agent_applications/             create
    GET    /api/projects/<team>/agent_applications/<id|slug>/   retrieve
    PATCH  /api/projects/<team>/agent_applications/<id|slug>/   update
    DELETE /api/projects/<team>/agent_applications/<id|slug>/   archive
    POST   /api/projects/<team>/agent_applications/<id|slug>/set_env/        bulk replace env
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/        list set keys
    GET    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  is one key set?
    PUT    /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  set one key
    DELETE /api/projects/<team>/agent_applications/<id|slug>/env_keys/<KEY>/  clear one key
- **OpenAPI operationId**: `agent_applications_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsUpdateInput = Parameters<typeof posthog.agentApplicationsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsUpdateOutput = Awaited<ReturnType<typeof posthog.agentApplicationsUpdate>>;

const result: AgentApplicationsUpdateOutput = await posthog.agentApplicationsUpdate();

// Result shape (from schema): { id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...
```

### `posthog.agentApplicationsApprovalsList`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{id}/approvals/`
- **What it does**: List approval-gated tool requests for this application. Team-admin
only (per plan §6.1). Default returns all states — pass `?state=queued`
for the inbox view.
- **OpenAPI operationId**: `agent_applications_approvals_list`
- **Path params**: `id`
- **Query params**: `limit`, `offset`, `state`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ id: string; session_id: string; application_id: string; team_id: number; revision_id: string; turn: number; tool_call_id: string; tool_name: string; proposed_args: { [key: string]: unknown }; decided_args:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsApprovalsListInput = Parameters<typeof posthog.agentApplicationsApprovalsList> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsApprovalsListOutput = Awaited<ReturnType<typeof posthog.agentApplicationsApprovalsList>>;

const result: AgentApplicationsApprovalsListOutput = await posthog.agentApplicationsApprovalsList();

// Result shape (from schema): { results: ({ id: string; session_id: string; application_id: string; team_id: number; revision_id: string; turn: number; tool_call_id: string; tool_name: string; proposed_args: { [key: string]: unknown }; decided_args:...
```

### `posthog.agentApplicationsApprovalsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{id}/approvals/{approval_id}/`
- **What it does**: Single approval request — full proposed args, assistant snapshot,
decision metadata, dispatch outcome. Team-admin only (plan §6.1).
- **OpenAPI operationId**: `agent_applications_approvals_retrieve`
- **Path params**: `approval_id`, `id`
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

type AgentApplicationsApprovalsRetrieveInput = Parameters<typeof posthog.agentApplicationsApprovalsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsApprovalsRetrieveOutput = Awaited<ReturnType<typeof posthog.agentApplicationsApprovalsRetrieve>>;

const result: AgentApplicationsApprovalsRetrieveOutput = await posthog.agentApplicationsApprovalsRetrieve();

// Result shape (from schema): unknown
```

### `posthog.agentApplicationsApprovalsDecide`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{id}/approvals/{approval_id}/decide/`
- **What it does**: Approve or reject a queued `agent`-type tool-approval request.

This is the OWNER decision surface — the only PostHog-authoritative one:
team admins decide here, in the console. `principal`-type approvals are
decided by the session principal at the ingress decision API, not here.
The runtime side runs the tool platform-side on approve and wakes the
session with a synthetic tool_result either way.
- **OpenAPI operationId**: `agent_applications_approvals_decide`
- **Path params**: `approval_id`, `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ ok: boolean; state: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsApprovalsDecideInput = Parameters<typeof posthog.agentApplicationsApprovalsDecide> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsApprovalsDecideOutput = Awaited<ReturnType<typeof posthog.agentApplicationsApprovalsDecide>>;

const result: AgentApplicationsApprovalsDecideOutput = await posthog.agentApplicationsApprovalsDecide();

// Result shape (from schema): { ok: boolean; state: string }
```

### `posthog.agentApplicationsPreviewProxyGet`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{id}/preview-proxy/{rest}/`
- **What it does**: GET passthrough for the preview-proxy — used for `/listen` SSE.
- **OpenAPI operationId**: `agent_applications_preview_proxy_get`
- **Path params**: `id`, `rest`
- **Query params**: `format`, `revision_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsPreviewProxyGetInput = Parameters<typeof posthog.agentApplicationsPreviewProxyGet> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsPreviewProxyGetOutput = Awaited<ReturnType<typeof posthog.agentApplicationsPreviewProxyGet>>;

const result: AgentApplicationsPreviewProxyGetOutput = await posthog.agentApplicationsPreviewProxyGet();

// Result shape (from schema): { id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...
```

### `posthog.agentApplicationsPreviewProxy`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{id}/preview-proxy/{rest}/`
- **What it does**: Authoring-side proxy for invoking a *draft* (or any non-live) revision.

Closes the anonymous-draft-invoke gap: the public ingress URL refuses
non-live invokes that don't carry the `x-agent-preview-secret` header;
this proxy attaches it after authenticating the Django caller.

URL: `/api/projects/<team>/agent_applications/<app>/preview-proxy/<rest>`
Auth: standard PAT / session — `agents:write` scope (POST run/send/cancel
is a mutating invoke; the read-only `listen` GET is `agents:read`).
- **OpenAPI operationId**: `agent_applications_preview_proxy`
- **Path params**: `id`, `rest`
- **Query params**: `format`, `revision_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `string`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsPreviewProxyInput = Parameters<typeof posthog.agentApplicationsPreviewProxy> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsPreviewProxyOutput = Awaited<ReturnType<typeof posthog.agentApplicationsPreviewProxy>>;

const result: AgentApplicationsPreviewProxyOutput = await posthog.agentApplicationsPreviewProxy();

// Result shape (from schema): string
```

### `posthog.agentApplicationsPreviewToken`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{id}/preview-token/`
- **What it does**: GET sibling of `preview_token_mint`. Same body and response
shape — exists because `EventSource` can't set headers, so SSE
callers fetch the token via GET and then attach `?preview_token=`
to the ingress URL. Behind the same URL (`url_path="preview-token"`)
thanks to DRF's `@<action>.mapping.get`; DRF resolves it to a
distinct `view.action`, but it is in `scope_object_write_actions`
alongside the POST sibling — both return a usable credential, so
both require `agents:write`.
- **OpenAPI operationId**: `agent_applications_preview_token`
- **Path params**: `id`
- **Query params**: `revision_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ token: string; expires_in: number; ingress_slug: string; endpoints: unknown; auth: unknown; preview_proxy: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsPreviewTokenInput = Parameters<typeof posthog.agentApplicationsPreviewToken> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsPreviewTokenOutput = Awaited<ReturnType<typeof posthog.agentApplicationsPreviewToken>>;

const result: AgentApplicationsPreviewTokenOutput = await posthog.agentApplicationsPreviewToken();

// Result shape (from schema): { token: string; expires_in: number; ingress_slug: string; endpoints: unknown; auth: unknown; preview_proxy: unknown }
```

### `posthog.agentApplicationsPreviewTokenMint`

- **HTTP**: `POST /api/projects/{project_id}/agent_applications/{id}/preview-token/`
- **What it does**: Mint a short-lived JWT for talking to a non-live revision
directly via the public ingress URL. The caller attaches it as
the `x-agent-preview-token` header (or `?preview_token=` query
param for `EventSource`). See `_mint_preview_jwt` for the
payload + claim binding.

The response also includes `endpoints`, `auth`, and
`preview_proxy` blocks so the caller can wire a preview
invocation without grepping the agent-ingress source for which
path each trigger exposes or which header name carries the
token. This is the "self-describing" half of preview-mode —
every piece of info you need to hit ingress is in one response.

POST is the canonical verb — minting credentials for downstream
`run`/`send`/`cancel` is a write-class capability. A GET sibling
exists at the same URL for `EventSource` callers (which can't set
headers); it is also write-scoped, since it returns the same token.
- **OpenAPI operationId**: `agent_applications_preview_token_mint`
- **Path params**: `id`
- **Query params**: `revision_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ token: string; expires_in: number; ingress_slug: string; endpoints: unknown; auth: unknown; preview_proxy: unknown }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsPreviewTokenMintInput = Parameters<typeof posthog.agentApplicationsPreviewTokenMint> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsPreviewTokenMintOutput = Awaited<ReturnType<typeof posthog.agentApplicationsPreviewTokenMint>>;

const result: AgentApplicationsPreviewTokenMintOutput = await posthog.agentApplicationsPreviewTokenMint();

// Result shape (from schema): { token: string; expires_in: number; ingress_slug: string; endpoints: unknown; auth: unknown; preview_proxy: unknown }
```

### `posthog.agentApplicationsSessionsList`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{id}/sessions/`
- **What it does**: List sessions for this application, most recently active first. Strips the
conversation transcript from each summary, but includes a `preview`
(last assistant text, ~120 chars) and `usage_total` (token + cost
aggregate). Use `agent-applications-sessions-retrieve` for the full
transcript of a single session.
- **OpenAPI operationId**: `agent_applications_sessions_list`
- **Path params**: `id`
- **Query params**: `created_after`, `created_before`, `limit`, `offset`, `revision_id`, `state`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ usage_total: { tokens_in: number; tokens_out: number; cache_read: number; cache_write: number; cost_input: number; cost_output: number; cost_cache_read: number; cost_cache_write: number; cost_total: number...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsSessionsListInput = Parameters<typeof posthog.agentApplicationsSessionsList> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsSessionsListOutput = Awaited<ReturnType<typeof posthog.agentApplicationsSessionsList>>;

const result: AgentApplicationsSessionsListOutput = await posthog.agentApplicationsSessionsList();

// Result shape (from schema): { results: ({ usage_total: { tokens_in: number; tokens_out: number; cache_read: number; cache_write: number; cost_input: number; cost_output: number; cost_cache_read: number; cost_cache_write: number; cost_total: number...
```

### `posthog.agentApplicationsSessionsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{id}/sessions/{session_id}/`
- **What it does**: Fetch one session's state — full conversation by default, or just
the trailing N messages with `?last_n=`. Always returns a
`usage_total` block aggregated over the entire session, regardless of
trim. The runner-side queue DB is the source of truth.
- **OpenAPI operationId**: `agent_applications_sessions_retrieve`
- **Path params**: `id`, `session_id`
- **Query params**: `last_n`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ usage_total: { tokens_in: number; tokens_out: number; cache_read: number; cache_write: number; cost_input: number; cost_output: number; cost_cache_read: number; cost_cache_write: number; cost_total: number }; principa...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsSessionsRetrieveInput = Parameters<typeof posthog.agentApplicationsSessionsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsSessionsRetrieveOutput = Awaited<ReturnType<typeof posthog.agentApplicationsSessionsRetrieve>>;

const result: AgentApplicationsSessionsRetrieveOutput = await posthog.agentApplicationsSessionsRetrieve();

// Result shape (from schema): { usage_total: { tokens_in: number; tokens_out: number; cache_read: number; cache_write: number; cost_input: number; cost_output: number; cost_cache_read: number; cost_cache_write: number; cost_total: number }; principa...
```

### `posthog.agentApplicationsSessionLogs`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{id}/sessions/{session_id}/logs/`
- **What it does**: Read the runner's structured event log for one session from
ClickHouse. Filters (limit / after / before / level / search)
match the shared `LogEntryMixin` helper used by hog_function +
hog_flow.
- **OpenAPI operationId**: `agent_applications_session_logs`
- **Path params**: `id`, `session_id`
- **Query params**: `after`, `before`, `instance_id`, `level`, `limit`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ log_source_id: string; instance_id: string; timestamp: string; level: string; message: string })[] }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsSessionLogsInput = Parameters<typeof posthog.agentApplicationsSessionLogs> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsSessionLogsOutput = Awaited<ReturnType<typeof posthog.agentApplicationsSessionLogs>>;

const result: AgentApplicationsSessionLogsOutput = await posthog.agentApplicationsSessionLogs();

// Result shape (from schema): { results: ({ log_source_id: string; instance_id: string; timestamp: string; level: string; message: string })[] }
```

### `posthog.agentApplicationsStats`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{id}/stats/`
- **What it does**: Roll-up stats for the agent — drives the agent-detail overview tiles.
- **OpenAPI operationId**: `agent_applications_stats`
- **Path params**: `id`
- **Query params**: `since`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ liveCount: number; sessionsInWindowCount: number; spendInWindowUsd: number; lastActivityAt: string | null; failedInWindowCount: number; pendingApprovalsCount: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsStatsInput = Parameters<typeof posthog.agentApplicationsStats> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsStatsOutput = Awaited<ReturnType<typeof posthog.agentApplicationsStats>>;

const result: AgentApplicationsStatsOutput = await posthog.agentApplicationsStats();

// Result shape (from schema): { liveCount: number; sessionsInWindowCount: number; spendInWindowUsd: number; lastActivityAt: string | null; failedInWindowCount: number; pendingApprovalsCount: number }
```

### `posthog.agentApplicationsUsersList`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/{id}/users/`
- **What it does**: List this agent's end-users (the stable identities behind inbound principals) and each user's linked external connections. Connection metadata only — credential material is never returned.
- **OpenAPI operationId**: `agent_applications_users_list`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; results: ({ id: string; principal_kind: string; principal_id: string; metadata?: unknown; created_at: string; connections: ({ id: string; provider: string; scopes: (string)[]; state: string; subject?: s...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsUsersListInput = Parameters<typeof posthog.agentApplicationsUsersList> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsUsersListOutput = Awaited<ReturnType<typeof posthog.agentApplicationsUsersList>>;

const result: AgentApplicationsUsersListOutput = await posthog.agentApplicationsUsersList();

// Result shape (from schema): { count: number; results: ({ id: string; principal_kind: string; principal_id: string; metadata?: unknown; created_at: string; connections: ({ id: string; provider: string; scopes: (string)[]; state: string; subject?: s...
```

### `posthog.agentApplicationsUsersConnectionDelete`

- **HTTP**: `DELETE /api/projects/{project_id}/agent_applications/{id}/users/{agent_user_id}/connections/{provider}/`
- **What it does**: Revoke one of an end-user's linked connections. The credential is marked revoked (kept for audit), so the agent can no longer act as that user on the provider.
- **OpenAPI operationId**: `agent_applications_users_connection_delete`
- **Path params**: `agent_user_id`, `id`, `provider`
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

type AgentApplicationsUsersConnectionDeleteInput = Parameters<typeof posthog.agentApplicationsUsersConnectionDelete> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsUsersConnectionDeleteOutput = Awaited<ReturnType<typeof posthog.agentApplicationsUsersConnectionDelete>>;

const result: AgentApplicationsUsersConnectionDeleteOutput = await posthog.agentApplicationsUsersConnectionDelete();

// Result shape (from schema): unknown
```

### `posthog.agentApplicationsModels`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/models/`
- **What it does**: Served-model catalog — each model's id, provider, context window, and USD-per-million-token pricing — plus the curated auto-level → model map. Project-agnostic; sourced from the AI gateway catalog. Powers the config UI model browser and the agent builder's model-choosing skill.
- **OpenAPI operationId**: `agent_applications_models`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsModelsInput = Parameters<typeof posthog.agentApplicationsModels> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsModelsOutput = Awaited<ReturnType<typeof posthog.agentApplicationsModels>>;

const result: AgentApplicationsModelsOutput = await posthog.agentApplicationsModels();

// Result shape (from schema): { id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...
```

### `posthog.agentApplicationsSpecSchema`

- **HTTP**: `GET /api/projects/{project_id}/agent_applications/spec_schema/`
- **What it does**: The canonical JSON Schema for an agent `spec` — every field, type, enum, default, and the discriminated unions for `models` / `triggers[]` / `tools[]`, each with an inline description. Emitted from the same source the runner validates against (fields with a default are optional on write), so read it BEFORE composing a spec for create / revisions-spec-update instead of guessing the shape. Pass `section` to fetch just one part.
- **OpenAPI operationId**: `agent_applications_spec_schema`
- **Path params**: None
- **Query params**: `section`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentApplicationsSpecSchemaInput = Parameters<typeof posthog.agentApplicationsSpecSchema> extends [infer T, ...unknown[]] ? T : undefined;
type AgentApplicationsSpecSchemaOutput = Awaited<ReturnType<typeof posthog.agentApplicationsSpecSchema>>;

const result: AgentApplicationsSpecSchemaOutput = await posthog.agentApplicationsSpecSchema();

// Result shape (from schema): { id: string; team_id: number; name: string; slug?: string; description?: string; live_revision: string | null; archived?: boolean; archived_at: string | null; created_by_id: number | null; created_by: { [key: string]: ...
```

### `posthog.agentFleetApprovalsList`

- **HTTP**: `GET /api/projects/{project_id}/agent_fleet/approvals/`
- **What it does**: Approval-gated tool requests across every agent in this team. Team-admin only.
- **OpenAPI operationId**: `agent_fleet_approvals_list`
- **Path params**: None
- **Query params**: `agent_id`, `limit`, `offset`, `state`
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

type AgentFleetApprovalsListInput = Parameters<typeof posthog.agentFleetApprovalsList> extends [infer T, ...unknown[]] ? T : undefined;
type AgentFleetApprovalsListOutput = Awaited<ReturnType<typeof posthog.agentFleetApprovalsList>>;

const result: AgentFleetApprovalsListOutput = await posthog.agentFleetApprovalsList();

// Result shape (from schema): unknown
```

### `posthog.agentFleetLiveSessions`

- **HTTP**: `GET /api/projects/{project_id}/agent_fleet/live_sessions/`
- **What it does**: Live (non-terminal) sessions across every agent owned by this team, newest activity first.
- **OpenAPI operationId**: `agent_fleet_live_sessions`
- **Path params**: None
- **Query params**: `limit`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ results: ({ usage_total: { tokens_in: number; tokens_out: number; cache_read: number; cache_write: number; cost_input: number; cost_output: number; cost_cache_read: number; cost_cache_write: number; cost_total: number...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentFleetLiveSessionsInput = Parameters<typeof posthog.agentFleetLiveSessions> extends [infer T, ...unknown[]] ? T : undefined;
type AgentFleetLiveSessionsOutput = Awaited<ReturnType<typeof posthog.agentFleetLiveSessions>>;

const result: AgentFleetLiveSessionsOutput = await posthog.agentFleetLiveSessions();

// Result shape (from schema): { results: ({ usage_total: { tokens_in: number; tokens_out: number; cache_read: number; cache_write: number; cost_input: number; cost_output: number; cost_cache_read: number; cost_cache_write: number; cost_total: number...
```

### `posthog.agentFleetStats`

- **HTTP**: `GET /api/projects/{project_id}/agent_fleet/stats/`
- **What it does**: Roll-up stats across every agent owned by this team.
- **OpenAPI operationId**: `agent_fleet_stats`
- **Path params**: None
- **Query params**: `since`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ liveCount: number; sessionsInWindowCount: number; spendInWindowUsd: number; lastActivityAt: string | null; failedInWindowCount: number; pendingApprovalsCount: number }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentFleetStatsInput = Parameters<typeof posthog.agentFleetStats> extends [infer T, ...unknown[]] ? T : undefined;
type AgentFleetStatsOutput = Awaited<ReturnType<typeof posthog.agentFleetStats>>;

const result: AgentFleetStatsOutput = await posthog.agentFleetStats();

// Result shape (from schema): { liveCount: number; sessionsInWindowCount: number; spendInWindowUsd: number; lastActivityAt: string | null; failedInWindowCount: number; pendingApprovalsCount: number }
```

### `posthog.agentNativeToolsList`

- **HTTP**: `GET /api/projects/{project_id}/agent_native_tools/`
- **What it does**: Read-only catalog of every @posthog/* native tool the runner knows.
- **OpenAPI operationId**: `agent_native_tools_list`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `({ tools: ({ id: string; schema: { [key: string]: unknown } })[] })[]`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type AgentNativeToolsListInput = Parameters<typeof posthog.agentNativeToolsList> extends [infer T, ...unknown[]] ? T : undefined;
type AgentNativeToolsListOutput = Awaited<ReturnType<typeof posthog.agentNativeToolsList>>;

const result: AgentNativeToolsListOutput = await posthog.agentNativeToolsList();

// Result shape (from schema): ({ tools: ({ id: string; schema: { [key: string]: unknown } })[] })[]
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

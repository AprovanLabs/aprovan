# Llm Skills

## Operations

### `posthog.environmentsLlmSkillsList`

- **HTTP**: `GET /api/environments/{environment_id}/llm_skills/`
- **OpenAPI operationId**: `environments_llm_skills_list`
- **Path params**: None
- **Query params**: `category`, `created_by_id`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsListInput = Parameters<typeof posthog.environmentsLlmSkillsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsListOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsList>>;

const result: EnvironmentsLlmSkillsListOutput = await posthog.environmentsLlmSkillsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string...
```

### `posthog.environmentsLlmSkillsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_skills/`
- **OpenAPI operationId**: `environments_llm_skills_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files?: ({ path: string; cont...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsCreateInput = Parameters<typeof posthog.environmentsLlmSkillsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsCreate>>;

const result: EnvironmentsLlmSkillsCreateOutput = await posthog.environmentsLlmSkillsCreate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files?: ({ path: string; cont...
```

### `posthog.environmentsLlmSkillsImportCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_skills/import/`
- **OpenAPI operationId**: `environments_llm_skills_import_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsImportCreateInput = Parameters<typeof posthog.environmentsLlmSkillsImportCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsImportCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsImportCreate>>;

const result: EnvironmentsLlmSkillsImportCreateOutput = await posthog.environmentsLlmSkillsImportCreate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.environmentsLlmSkillsMarketplaceInstallCommandRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_skills/marketplace/install-command/`
- **What it does**: Report whether the user already has a marketplace credential, without minting one.

The token is unrecoverable, so an existing credential returns its mask only — the UI shows
"already connected, existing setups keep working" and offers an explicit rotate.
- **OpenAPI operationId**: `environments_llm_skills_marketplace_install_command_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status: "absent" | "exists" | "created" | "rotated"; connected: boolean; plugin_name: string; marketplace_name: string; label: string; repo_url: string; command: string | null; command_template: string; codex_command:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsMarketplaceInstallCommandRetrieveInput = Parameters<typeof posthog.environmentsLlmSkillsMarketplaceInstallCommandRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsMarketplaceInstallCommandRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsMarketplaceInstallCommandRetrieve>>;

const result: EnvironmentsLlmSkillsMarketplaceInstallCommandRetrieveOutput = await posthog.environmentsLlmSkillsMarketplaceInstallCommandRetrieve();

// Result shape (from schema): { status: "absent" | "exists" | "created" | "rotated"; connected: boolean; plugin_name: string; marketplace_name: string; label: string; repo_url: string; command: string | null; command_template: string; codex_command:...
```

### `posthog.environmentsLlmSkillsMarketplaceInstallCommandCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_skills/marketplace/install-command/`
- **What it does**: Mint the user's read-only marketplace credential (or rotate it) and return the install command.

Per-user: rotating only ever invalidates this user's own credential, never a teammate's.
- **OpenAPI operationId**: `environments_llm_skills_marketplace_install_command_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status: "absent" | "exists" | "created" | "rotated"; connected: boolean; plugin_name: string; marketplace_name: string; label: string; repo_url: string; command: string | null; command_template: string; codex_command:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsMarketplaceInstallCommandCreateInput = Parameters<typeof posthog.environmentsLlmSkillsMarketplaceInstallCommandCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsMarketplaceInstallCommandCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsMarketplaceInstallCommandCreate>>;

const result: EnvironmentsLlmSkillsMarketplaceInstallCommandCreateOutput = await posthog.environmentsLlmSkillsMarketplaceInstallCommandCreate();

// Result shape (from schema): { status: "absent" | "exists" | "created" | "rotated"; connected: boolean; plugin_name: string; marketplace_name: string; label: string; repo_url: string; command: string | null; command_template: string; codex_command:...
```

### `posthog.environmentsLlmSkillsNameRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_skills/name/{skill_name}/`
- **OpenAPI operationId**: `environments_llm_skills_name_retrieve`
- **Path params**: `skill_name`
- **Query params**: `version`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsNameRetrieveInput = Parameters<typeof posthog.environmentsLlmSkillsNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsNameRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsNameRetrieve>>;

const result: EnvironmentsLlmSkillsNameRetrieveOutput = await posthog.environmentsLlmSkillsNameRetrieve();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.environmentsLlmSkillsNamePartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/llm_skills/name/{skill_name}/`
- **OpenAPI operationId**: `environments_llm_skills_name_partial_update`
- **Path params**: `skill_name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsNamePartialUpdateInput = Parameters<typeof posthog.environmentsLlmSkillsNamePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsNamePartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsNamePartialUpdate>>;

const result: EnvironmentsLlmSkillsNamePartialUpdateOutput = await posthog.environmentsLlmSkillsNamePartialUpdate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.environmentsLlmSkillsNameArchiveCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_skills/name/{skill_name}/archive/`
- **OpenAPI operationId**: `environments_llm_skills_name_archive_create`
- **Path params**: `skill_name`
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

type EnvironmentsLlmSkillsNameArchiveCreateInput = Parameters<typeof posthog.environmentsLlmSkillsNameArchiveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsNameArchiveCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsNameArchiveCreate>>;

const result: EnvironmentsLlmSkillsNameArchiveCreateOutput = await posthog.environmentsLlmSkillsNameArchiveCreate();

// Result shape (from schema): unknown
```

### `posthog.environmentsLlmSkillsNameDuplicateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_skills/name/{skill_name}/duplicate/`
- **OpenAPI operationId**: `environments_llm_skills_name_duplicate_create`
- **Path params**: `skill_name`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsNameDuplicateCreateInput = Parameters<typeof posthog.environmentsLlmSkillsNameDuplicateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsNameDuplicateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsNameDuplicateCreate>>;

const result: EnvironmentsLlmSkillsNameDuplicateCreateOutput = await posthog.environmentsLlmSkillsNameDuplicateCreate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.environmentsLlmSkillsNameExportRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_skills/name/{skill_name}/export/`
- **OpenAPI operationId**: `environments_llm_skills_name_export_retrieve`
- **Path params**: `skill_name`
- **Query params**: `version`
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

type EnvironmentsLlmSkillsNameExportRetrieveInput = Parameters<typeof posthog.environmentsLlmSkillsNameExportRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsNameExportRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsNameExportRetrieve>>;

const result: EnvironmentsLlmSkillsNameExportRetrieveOutput = await posthog.environmentsLlmSkillsNameExportRetrieve();

// Result shape (from schema): string
```

### `posthog.environmentsLlmSkillsNameFilesRenameCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_skills/name/{skill_name}/files-rename/`
- **OpenAPI operationId**: `environments_llm_skills_name_files_rename_create`
- **Path params**: `skill_name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsNameFilesRenameCreateInput = Parameters<typeof posthog.environmentsLlmSkillsNameFilesRenameCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsNameFilesRenameCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsNameFilesRenameCreate>>;

const result: EnvironmentsLlmSkillsNameFilesRenameCreateOutput = await posthog.environmentsLlmSkillsNameFilesRenameCreate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.environmentsLlmSkillsNameFilesCreate`

- **HTTP**: `POST /api/environments/{environment_id}/llm_skills/name/{skill_name}/files/`
- **OpenAPI operationId**: `environments_llm_skills_name_files_create`
- **Path params**: `skill_name`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsNameFilesCreateInput = Parameters<typeof posthog.environmentsLlmSkillsNameFilesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsNameFilesCreateOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsNameFilesCreate>>;

const result: EnvironmentsLlmSkillsNameFilesCreateOutput = await posthog.environmentsLlmSkillsNameFilesCreate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.environmentsLlmSkillsNameFilesDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/llm_skills/name/{skill_name}/files/{file_path}/`
- **OpenAPI operationId**: `environments_llm_skills_name_files_destroy`
- **Path params**: `file_path`, `skill_name`
- **Query params**: `base_version`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsNameFilesDestroyInput = Parameters<typeof posthog.environmentsLlmSkillsNameFilesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsNameFilesDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsNameFilesDestroy>>;

const result: EnvironmentsLlmSkillsNameFilesDestroyOutput = await posthog.environmentsLlmSkillsNameFilesDestroy();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.environmentsLlmSkillsNameFilesRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_skills/name/{skill_name}/files/{file_path}/`
- **OpenAPI operationId**: `environments_llm_skills_name_files_retrieve`
- **Path params**: `file_path`, `skill_name`
- **Query params**: `version`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ path: string; content: string; content_type?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsNameFilesRetrieveInput = Parameters<typeof posthog.environmentsLlmSkillsNameFilesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsNameFilesRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsNameFilesRetrieve>>;

const result: EnvironmentsLlmSkillsNameFilesRetrieveOutput = await posthog.environmentsLlmSkillsNameFilesRetrieve();

// Result shape (from schema): { path: string; content: string; content_type?: string }
```

### `posthog.environmentsLlmSkillsResolveNameRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/llm_skills/resolve/name/{skill_name}/`
- **OpenAPI operationId**: `environments_llm_skills_resolve_name_retrieve`
- **Path params**: `skill_name`
- **Query params**: `before_version`, `limit`, `offset`, `version`, `version_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ skill: { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsLlmSkillsResolveNameRetrieveInput = Parameters<typeof posthog.environmentsLlmSkillsResolveNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsLlmSkillsResolveNameRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsLlmSkillsResolveNameRetrieve>>;

const result: EnvironmentsLlmSkillsResolveNameRetrieveOutput = await posthog.environmentsLlmSkillsResolveNameRetrieve();

// Result shape (from schema): { skill: { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: stri...
```

### `posthog.llmSkillsList`

- **HTTP**: `GET /api/projects/{project_id}/llm_skills/`
- **OpenAPI operationId**: `llm_skills_list`
- **Path params**: None
- **Query params**: `category`, `created_by_id`, `limit`, `offset`, `search`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsListInput = Parameters<typeof posthog.llmSkillsList> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsListOutput = Awaited<ReturnType<typeof posthog.llmSkillsList>>;

const result: LlmSkillsListOutput = await posthog.llmSkillsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; description: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string...
```

### `posthog.llmSkillsCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_skills/`
- **OpenAPI operationId**: `llm_skills_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files?: ({ path: string; cont...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsCreateInput = Parameters<typeof posthog.llmSkillsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsCreateOutput = Awaited<ReturnType<typeof posthog.llmSkillsCreate>>;

const result: LlmSkillsCreateOutput = await posthog.llmSkillsCreate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files?: ({ path: string; cont...
```

### `posthog.llmSkillsImportCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_skills/import/`
- **OpenAPI operationId**: `llm_skills_import_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsImportCreateInput = Parameters<typeof posthog.llmSkillsImportCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsImportCreateOutput = Awaited<ReturnType<typeof posthog.llmSkillsImportCreate>>;

const result: LlmSkillsImportCreateOutput = await posthog.llmSkillsImportCreate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.llmSkillsMarketplaceInstallCommandRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_skills/marketplace/install-command/`
- **What it does**: Report whether the user already has a marketplace credential, without minting one.

The token is unrecoverable, so an existing credential returns its mask only — the UI shows
"already connected, existing setups keep working" and offers an explicit rotate.
- **OpenAPI operationId**: `llm_skills_marketplace_install_command_retrieve`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status: "absent" | "exists" | "created" | "rotated"; connected: boolean; plugin_name: string; marketplace_name: string; label: string; repo_url: string; command: string | null; command_template: string; codex_command:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsMarketplaceInstallCommandRetrieveInput = Parameters<typeof posthog.llmSkillsMarketplaceInstallCommandRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsMarketplaceInstallCommandRetrieveOutput = Awaited<ReturnType<typeof posthog.llmSkillsMarketplaceInstallCommandRetrieve>>;

const result: LlmSkillsMarketplaceInstallCommandRetrieveOutput = await posthog.llmSkillsMarketplaceInstallCommandRetrieve();

// Result shape (from schema): { status: "absent" | "exists" | "created" | "rotated"; connected: boolean; plugin_name: string; marketplace_name: string; label: string; repo_url: string; command: string | null; command_template: string; codex_command:...
```

### `posthog.llmSkillsMarketplaceInstallCommandCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_skills/marketplace/install-command/`
- **What it does**: Mint the user's read-only marketplace credential (or rotate it) and return the install command.

Per-user: rotating only ever invalidates this user's own credential, never a teammate's.
- **OpenAPI operationId**: `llm_skills_marketplace_install_command_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ status: "absent" | "exists" | "created" | "rotated"; connected: boolean; plugin_name: string; marketplace_name: string; label: string; repo_url: string; command: string | null; command_template: string; codex_command:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsMarketplaceInstallCommandCreateInput = Parameters<typeof posthog.llmSkillsMarketplaceInstallCommandCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsMarketplaceInstallCommandCreateOutput = Awaited<ReturnType<typeof posthog.llmSkillsMarketplaceInstallCommandCreate>>;

const result: LlmSkillsMarketplaceInstallCommandCreateOutput = await posthog.llmSkillsMarketplaceInstallCommandCreate();

// Result shape (from schema): { status: "absent" | "exists" | "created" | "rotated"; connected: boolean; plugin_name: string; marketplace_name: string; label: string; repo_url: string; command: string | null; command_template: string; codex_command:...
```

### `posthog.llmSkillsNameRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_skills/name/{skill_name}/`
- **OpenAPI operationId**: `llm_skills_name_retrieve`
- **Path params**: `skill_name`
- **Query params**: `version`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsNameRetrieveInput = Parameters<typeof posthog.llmSkillsNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsNameRetrieveOutput = Awaited<ReturnType<typeof posthog.llmSkillsNameRetrieve>>;

const result: LlmSkillsNameRetrieveOutput = await posthog.llmSkillsNameRetrieve();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.llmSkillsNamePartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/llm_skills/name/{skill_name}/`
- **OpenAPI operationId**: `llm_skills_name_partial_update`
- **Path params**: `skill_name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsNamePartialUpdateInput = Parameters<typeof posthog.llmSkillsNamePartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsNamePartialUpdateOutput = Awaited<ReturnType<typeof posthog.llmSkillsNamePartialUpdate>>;

const result: LlmSkillsNamePartialUpdateOutput = await posthog.llmSkillsNamePartialUpdate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.llmSkillsNameArchiveCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_skills/name/{skill_name}/archive/`
- **OpenAPI operationId**: `llm_skills_name_archive_create`
- **Path params**: `skill_name`
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

type LlmSkillsNameArchiveCreateInput = Parameters<typeof posthog.llmSkillsNameArchiveCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsNameArchiveCreateOutput = Awaited<ReturnType<typeof posthog.llmSkillsNameArchiveCreate>>;

const result: LlmSkillsNameArchiveCreateOutput = await posthog.llmSkillsNameArchiveCreate();

// Result shape (from schema): unknown
```

### `posthog.llmSkillsNameDuplicateCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_skills/name/{skill_name}/duplicate/`
- **OpenAPI operationId**: `llm_skills_name_duplicate_create`
- **Path params**: `skill_name`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsNameDuplicateCreateInput = Parameters<typeof posthog.llmSkillsNameDuplicateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsNameDuplicateCreateOutput = Awaited<ReturnType<typeof posthog.llmSkillsNameDuplicateCreate>>;

const result: LlmSkillsNameDuplicateCreateOutput = await posthog.llmSkillsNameDuplicateCreate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.llmSkillsNameExportRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_skills/name/{skill_name}/export/`
- **OpenAPI operationId**: `llm_skills_name_export_retrieve`
- **Path params**: `skill_name`
- **Query params**: `version`
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

type LlmSkillsNameExportRetrieveInput = Parameters<typeof posthog.llmSkillsNameExportRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsNameExportRetrieveOutput = Awaited<ReturnType<typeof posthog.llmSkillsNameExportRetrieve>>;

const result: LlmSkillsNameExportRetrieveOutput = await posthog.llmSkillsNameExportRetrieve();

// Result shape (from schema): string
```

### `posthog.llmSkillsNameFilesRenameCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_skills/name/{skill_name}/files-rename/`
- **OpenAPI operationId**: `llm_skills_name_files_rename_create`
- **Path params**: `skill_name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsNameFilesRenameCreateInput = Parameters<typeof posthog.llmSkillsNameFilesRenameCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsNameFilesRenameCreateOutput = Awaited<ReturnType<typeof posthog.llmSkillsNameFilesRenameCreate>>;

const result: LlmSkillsNameFilesRenameCreateOutput = await posthog.llmSkillsNameFilesRenameCreate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.llmSkillsNameFilesCreate`

- **HTTP**: `POST /api/projects/{project_id}/llm_skills/name/{skill_name}/files/`
- **OpenAPI operationId**: `llm_skills_name_files_create`
- **Path params**: `skill_name`
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsNameFilesCreateInput = Parameters<typeof posthog.llmSkillsNameFilesCreate> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsNameFilesCreateOutput = Awaited<ReturnType<typeof posthog.llmSkillsNameFilesCreate>>;

const result: LlmSkillsNameFilesCreateOutput = await posthog.llmSkillsNameFilesCreate();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.llmSkillsNameFilesDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/llm_skills/name/{skill_name}/files/{file_path}/`
- **OpenAPI operationId**: `llm_skills_name_files_destroy`
- **Path params**: `file_path`, `skill_name`
- **Query params**: `base_version`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsNameFilesDestroyInput = Parameters<typeof posthog.llmSkillsNameFilesDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsNameFilesDestroyOutput = Awaited<ReturnType<typeof posthog.llmSkillsNameFilesDestroy>>;

const result: LlmSkillsNameFilesDestroyOutput = await posthog.llmSkillsNameFilesDestroy();

// Result shape (from schema): { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: string; conte...
```

### `posthog.llmSkillsNameFilesRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_skills/name/{skill_name}/files/{file_path}/`
- **OpenAPI operationId**: `llm_skills_name_files_retrieve`
- **Path params**: `file_path`, `skill_name`
- **Query params**: `version`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ path: string; content: string; content_type?: string }`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsNameFilesRetrieveInput = Parameters<typeof posthog.llmSkillsNameFilesRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsNameFilesRetrieveOutput = Awaited<ReturnType<typeof posthog.llmSkillsNameFilesRetrieve>>;

const result: LlmSkillsNameFilesRetrieveOutput = await posthog.llmSkillsNameFilesRetrieve();

// Result shape (from schema): { path: string; content: string; content_type?: string }
```

### `posthog.llmSkillsResolveNameRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/llm_skills/resolve/name/{skill_name}/`
- **OpenAPI operationId**: `llm_skills_resolve_name_retrieve`
- **Path params**: `skill_name`
- **Query params**: `before_version`, `limit`, `offset`, `version`, `version_id`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ skill: { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: stri...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type LlmSkillsResolveNameRetrieveInput = Parameters<typeof posthog.llmSkillsResolveNameRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type LlmSkillsResolveNameRetrieveOutput = Awaited<ReturnType<typeof posthog.llmSkillsResolveNameRetrieve>>;

const result: LlmSkillsResolveNameRetrieveOutput = await posthog.llmSkillsResolveNameRetrieve();

// Result shape (from schema): { skill: { id: string; name: string; description: string; body: string; license?: string; compatibility?: string; allowed_tools?: (string)[]; metadata?: { [key: string]: unknown }; category: string; files: ({ path: stri...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

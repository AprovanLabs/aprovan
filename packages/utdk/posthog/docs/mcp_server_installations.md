# Mcp Server Installations

## Operations

### `posthog.environmentsMcpServerInstallationsList`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_server_installations/`
- **OpenAPI operationId**: `environments_mcp_server_installations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsListInput = Parameters<typeof posthog.environmentsMcpServerInstallationsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsListOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsList>>;

const result: EnvironmentsMcpServerInstallationsListOutput = await posthog.environmentsMcpServerInstallationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?:...
```

### `posthog.environmentsMcpServerInstallationsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_server_installations/`
- **OpenAPI operationId**: `environments_mcp_server_installations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsCreateInput = Parameters<typeof posthog.environmentsMcpServerInstallationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsCreate>>;

const result: EnvironmentsMcpServerInstallationsCreateOutput = await posthog.environmentsMcpServerInstallationsCreate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.environmentsMcpServerInstallationsDestroy`

- **HTTP**: `DELETE /api/environments/{environment_id}/mcp_server_installations/{id}/`
- **OpenAPI operationId**: `environments_mcp_server_installations_destroy`
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

type EnvironmentsMcpServerInstallationsDestroyInput = Parameters<typeof posthog.environmentsMcpServerInstallationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsDestroyOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsDestroy>>;

const result: EnvironmentsMcpServerInstallationsDestroyOutput = await posthog.environmentsMcpServerInstallationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.environmentsMcpServerInstallationsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_server_installations/{id}/`
- **OpenAPI operationId**: `environments_mcp_server_installations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsRetrieveInput = Parameters<typeof posthog.environmentsMcpServerInstallationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsRetrieve>>;

const result: EnvironmentsMcpServerInstallationsRetrieveOutput = await posthog.environmentsMcpServerInstallationsRetrieve();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.environmentsMcpServerInstallationsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/mcp_server_installations/{id}/`
- **OpenAPI operationId**: `environments_mcp_server_installations_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsPartialUpdateInput = Parameters<typeof posthog.environmentsMcpServerInstallationsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsPartialUpdate>>;

const result: EnvironmentsMcpServerInstallationsPartialUpdateOutput = await posthog.environmentsMcpServerInstallationsPartialUpdate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.environmentsMcpServerInstallationsUpdate`

- **HTTP**: `PUT /api/environments/{environment_id}/mcp_server_installations/{id}/`
- **OpenAPI operationId**: `environments_mcp_server_installations_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsUpdateInput = Parameters<typeof posthog.environmentsMcpServerInstallationsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsUpdate>>;

const result: EnvironmentsMcpServerInstallationsUpdateOutput = await posthog.environmentsMcpServerInstallationsUpdate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.environmentsMcpServerInstallationsProxyCreate`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_server_installations/{id}/proxy/`
- **OpenAPI operationId**: `environments_mcp_server_installations_proxy_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsProxyCreateInput = Parameters<typeof posthog.environmentsMcpServerInstallationsProxyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsProxyCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsProxyCreate>>;

const result: EnvironmentsMcpServerInstallationsProxyCreateOutput = await posthog.environmentsMcpServerInstallationsProxyCreate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.environmentsMcpServerInstallationsShareCreate`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_server_installations/{id}/share/`
- **What it does**: Escalate a personal installation to a team-wide shared one.

Owner-only AND admin-only: sharing exposes the owner's credential to
every project member and all autonomous agents, so it carries the same
gate as creating a shared install outright.
- **OpenAPI operationId**: `environments_mcp_server_installations_share_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsShareCreateInput = Parameters<typeof posthog.environmentsMcpServerInstallationsShareCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsShareCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsShareCreate>>;

const result: EnvironmentsMcpServerInstallationsShareCreateOutput = await posthog.environmentsMcpServerInstallationsShareCreate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.environmentsMcpServerInstallationsToolsRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_server_installations/{id}/tools/`
- **OpenAPI operationId**: `environments_mcp_server_installations_tools_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsToolsRetrieveInput = Parameters<typeof posthog.environmentsMcpServerInstallationsToolsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsToolsRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsToolsRetrieve>>;

const result: EnvironmentsMcpServerInstallationsToolsRetrieveOutput = await posthog.environmentsMcpServerInstallationsToolsRetrieve();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval...
```

### `posthog.environmentsMcpServerInstallationsToolsPartialUpdate`

- **HTTP**: `PATCH /api/environments/{environment_id}/mcp_server_installations/{id}/tools/{tool_name}/`
- **OpenAPI operationId**: `environments_mcp_server_installations_tools_partial_update`
- **Path params**: `id`, `tool_name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval" | "do_not_use"; last_seen_at: string; removed_at: string | null; created_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsToolsPartialUpdateInput = Parameters<typeof posthog.environmentsMcpServerInstallationsToolsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsToolsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsToolsPartialUpdate>>;

const result: EnvironmentsMcpServerInstallationsToolsPartialUpdateOutput = await posthog.environmentsMcpServerInstallationsToolsPartialUpdate();

// Result shape (from schema): { id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval" | "do_not_use"; last_seen_at: string; removed_at: string | null; created_...
```

### `posthog.environmentsMcpServerInstallationsToolsRefreshCreate`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_server_installations/{id}/tools/refresh/`
- **OpenAPI operationId**: `environments_mcp_server_installations_tools_refresh_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsToolsRefreshCreateInput = Parameters<typeof posthog.environmentsMcpServerInstallationsToolsRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsToolsRefreshCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsToolsRefreshCreate>>;

const result: EnvironmentsMcpServerInstallationsToolsRefreshCreateOutput = await posthog.environmentsMcpServerInstallationsToolsRefreshCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval...
```

### `posthog.environmentsMcpServerInstallationsUnshareCreate`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_server_installations/{id}/unshare/`
- **What it does**: De-escalate a shared installation back to personal.

Allowed for the credential owner OR a project admin (the reclaim path
for shared credentials). The row always stays owned by the ORIGINAL
owner — an admin unsharing someone else's install must not capture
their credential.
- **OpenAPI operationId**: `environments_mcp_server_installations_unshare_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsUnshareCreateInput = Parameters<typeof posthog.environmentsMcpServerInstallationsUnshareCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsUnshareCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsUnshareCreate>>;

const result: EnvironmentsMcpServerInstallationsUnshareCreateOutput = await posthog.environmentsMcpServerInstallationsUnshareCreate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.environmentsMcpServerInstallationsAuthorizeRetrieve`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_server_installations/authorize/`
- **What it does**: Start (or re-start) an OAuth flow.

Pass ``template_id`` to (re)connect a catalog template, or
``installation_id`` to reconnect an existing custom install using its
cached metadata and per-user DCR creds.
- **OpenAPI operationId**: `environments_mcp_server_installations_authorize_retrieve`
- **Path params**: None
- **Query params**: `install_source`, `installation_id`, `posthog_code_callback_url`, `template_id`
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

type EnvironmentsMcpServerInstallationsAuthorizeRetrieveInput = Parameters<typeof posthog.environmentsMcpServerInstallationsAuthorizeRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsAuthorizeRetrieveOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsAuthorizeRetrieve>>;

const result: EnvironmentsMcpServerInstallationsAuthorizeRetrieveOutput = await posthog.environmentsMcpServerInstallationsAuthorizeRetrieve();

// Result shape (from schema): unknown
```

### `posthog.environmentsMcpServerInstallationsInstallCustomCreate`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_server_installations/install_custom/`
- **OpenAPI operationId**: `environments_mcp_server_installations_install_custom_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ redirect_url: string }`
- OpenAPI response codes: `200`, `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsInstallCustomCreateInput = Parameters<typeof posthog.environmentsMcpServerInstallationsInstallCustomCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsInstallCustomCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsInstallCustomCreate>>;

const result: EnvironmentsMcpServerInstallationsInstallCustomCreateOutput = await posthog.environmentsMcpServerInstallationsInstallCustomCreate();

// Result shape (from schema): { redirect_url: string }
```

### `posthog.environmentsMcpServerInstallationsInstallTemplateCreate`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_server_installations/install_template/`
- **OpenAPI operationId**: `environments_mcp_server_installations_install_template_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ redirect_url: string }`
- OpenAPI response codes: `200`, `201`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServerInstallationsInstallTemplateCreateInput = Parameters<typeof posthog.environmentsMcpServerInstallationsInstallTemplateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServerInstallationsInstallTemplateCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServerInstallationsInstallTemplateCreate>>;

const result: EnvironmentsMcpServerInstallationsInstallTemplateCreateOutput = await posthog.environmentsMcpServerInstallationsInstallTemplateCreate();

// Result shape (from schema): { redirect_url: string }
```

### `posthog.mcpServerInstallationsList`

- **HTTP**: `GET /api/projects/{project_id}/mcp_server_installations/`
- **OpenAPI operationId**: `mcp_server_installations_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsListInput = Parameters<typeof posthog.mcpServerInstallationsList> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsListOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsList>>;

const result: McpServerInstallationsListOutput = await posthog.mcpServerInstallationsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?:...
```

### `posthog.mcpServerInstallationsCreate`

- **HTTP**: `POST /api/projects/{project_id}/mcp_server_installations/`
- **OpenAPI operationId**: `mcp_server_installations_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `201`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsCreateInput = Parameters<typeof posthog.mcpServerInstallationsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsCreateOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsCreate>>;

const result: McpServerInstallationsCreateOutput = await posthog.mcpServerInstallationsCreate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.mcpServerInstallationsDestroy`

- **HTTP**: `DELETE /api/projects/{project_id}/mcp_server_installations/{id}/`
- **OpenAPI operationId**: `mcp_server_installations_destroy`
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

type McpServerInstallationsDestroyInput = Parameters<typeof posthog.mcpServerInstallationsDestroy> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsDestroyOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsDestroy>>;

const result: McpServerInstallationsDestroyOutput = await posthog.mcpServerInstallationsDestroy();

// Result shape (from schema): unknown
```

### `posthog.mcpServerInstallationsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/mcp_server_installations/{id}/`
- **OpenAPI operationId**: `mcp_server_installations_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsRetrieveInput = Parameters<typeof posthog.mcpServerInstallationsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsRetrieveOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsRetrieve>>;

const result: McpServerInstallationsRetrieveOutput = await posthog.mcpServerInstallationsRetrieve();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.mcpServerInstallationsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/mcp_server_installations/{id}/`
- **OpenAPI operationId**: `mcp_server_installations_partial_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsPartialUpdateInput = Parameters<typeof posthog.mcpServerInstallationsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsPartialUpdate>>;

const result: McpServerInstallationsPartialUpdateOutput = await posthog.mcpServerInstallationsPartialUpdate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.mcpServerInstallationsUpdate`

- **HTTP**: `PUT /api/projects/{project_id}/mcp_server_installations/{id}/`
- **OpenAPI operationId**: `mcp_server_installations_update`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsUpdateInput = Parameters<typeof posthog.mcpServerInstallationsUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsUpdateOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsUpdate>>;

const result: McpServerInstallationsUpdateOutput = await posthog.mcpServerInstallationsUpdate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.mcpServerInstallationsProxyCreate`

- **HTTP**: `POST /api/projects/{project_id}/mcp_server_installations/{id}/proxy/`
- **OpenAPI operationId**: `mcp_server_installations_proxy_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsProxyCreateInput = Parameters<typeof posthog.mcpServerInstallationsProxyCreate> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsProxyCreateOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsProxyCreate>>;

const result: McpServerInstallationsProxyCreateOutput = await posthog.mcpServerInstallationsProxyCreate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.mcpServerInstallationsShareCreate`

- **HTTP**: `POST /api/projects/{project_id}/mcp_server_installations/{id}/share/`
- **What it does**: Escalate a personal installation to a team-wide shared one.

Owner-only AND admin-only: sharing exposes the owner's credential to
every project member and all autonomous agents, so it carries the same
gate as creating a shared install outright.
- **OpenAPI operationId**: `mcp_server_installations_share_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsShareCreateInput = Parameters<typeof posthog.mcpServerInstallationsShareCreate> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsShareCreateOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsShareCreate>>;

const result: McpServerInstallationsShareCreateOutput = await posthog.mcpServerInstallationsShareCreate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.mcpServerInstallationsToolsRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/mcp_server_installations/{id}/tools/`
- **OpenAPI operationId**: `mcp_server_installations_tools_retrieve`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsToolsRetrieveInput = Parameters<typeof posthog.mcpServerInstallationsToolsRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsToolsRetrieveOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsToolsRetrieve>>;

const result: McpServerInstallationsToolsRetrieveOutput = await posthog.mcpServerInstallationsToolsRetrieve();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval...
```

### `posthog.mcpServerInstallationsToolsPartialUpdate`

- **HTTP**: `PATCH /api/projects/{project_id}/mcp_server_installations/{id}/tools/{tool_name}/`
- **OpenAPI operationId**: `mcp_server_installations_tools_partial_update`
- **Path params**: `id`, `tool_name`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval" | "do_not_use"; last_seen_at: string; removed_at: string | null; created_...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsToolsPartialUpdateInput = Parameters<typeof posthog.mcpServerInstallationsToolsPartialUpdate> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsToolsPartialUpdateOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsToolsPartialUpdate>>;

const result: McpServerInstallationsToolsPartialUpdateOutput = await posthog.mcpServerInstallationsToolsPartialUpdate();

// Result shape (from schema): { id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval" | "do_not_use"; last_seen_at: string; removed_at: string | null; created_...
```

### `posthog.mcpServerInstallationsToolsRefreshCreate`

- **HTTP**: `POST /api/projects/{project_id}/mcp_server_installations/{id}/tools/refresh/`
- **OpenAPI operationId**: `mcp_server_installations_tools_refresh_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsToolsRefreshCreateInput = Parameters<typeof posthog.mcpServerInstallationsToolsRefreshCreate> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsToolsRefreshCreateOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsToolsRefreshCreate>>;

const result: McpServerInstallationsToolsRefreshCreateOutput = await posthog.mcpServerInstallationsToolsRefreshCreate();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; tool_name: string; display_name: string; description: string; input_schema: unknown; approval_state?: "approved" | "needs_approval...
```

### `posthog.mcpServerInstallationsUnshareCreate`

- **HTTP**: `POST /api/projects/{project_id}/mcp_server_installations/{id}/unshare/`
- **What it does**: De-escalate a shared installation back to personal.

Allowed for the credential owner OR a project admin (the reclaim path
for shared credentials). The row always stays owned by the ORIGINAL
owner — an admin unsharing someone else's install must not capture
their credential.
- **OpenAPI operationId**: `mcp_server_installations_unshare_create`
- **Path params**: `id`
- **Query params**: None
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsUnshareCreateInput = Parameters<typeof posthog.mcpServerInstallationsUnshareCreate> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsUnshareCreateOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsUnshareCreate>>;

const result: McpServerInstallationsUnshareCreateOutput = await posthog.mcpServerInstallationsUnshareCreate();

// Result shape (from schema): { id: string; template_id: string | null; name: string; icon_key: string; display_name?: string; url?: string; description?: string; auth_type?: "api_key" | "oauth"; is_enabled?: boolean; scope: "personal" | "shared"; i...
```

### `posthog.mcpServerInstallationsAuthorizeRetrieve`

- **HTTP**: `GET /api/projects/{project_id}/mcp_server_installations/authorize/`
- **What it does**: Start (or re-start) an OAuth flow.

Pass ``template_id`` to (re)connect a catalog template, or
``installation_id`` to reconnect an existing custom install using its
cached metadata and per-user DCR creds.
- **OpenAPI operationId**: `mcp_server_installations_authorize_retrieve`
- **Path params**: None
- **Query params**: `install_source`, `installation_id`, `posthog_code_callback_url`, `template_id`
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

type McpServerInstallationsAuthorizeRetrieveInput = Parameters<typeof posthog.mcpServerInstallationsAuthorizeRetrieve> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsAuthorizeRetrieveOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsAuthorizeRetrieve>>;

const result: McpServerInstallationsAuthorizeRetrieveOutput = await posthog.mcpServerInstallationsAuthorizeRetrieve();

// Result shape (from schema): unknown
```

### `posthog.mcpServerInstallationsInstallCustomCreate`

- **HTTP**: `POST /api/projects/{project_id}/mcp_server_installations/install_custom/`
- **OpenAPI operationId**: `mcp_server_installations_install_custom_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ redirect_url: string }`
- OpenAPI response codes: `200`, `201`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsInstallCustomCreateInput = Parameters<typeof posthog.mcpServerInstallationsInstallCustomCreate> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsInstallCustomCreateOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsInstallCustomCreate>>;

const result: McpServerInstallationsInstallCustomCreateOutput = await posthog.mcpServerInstallationsInstallCustomCreate();

// Result shape (from schema): { redirect_url: string }
```

### `posthog.mcpServerInstallationsInstallTemplateCreate`

- **HTTP**: `POST /api/projects/{project_id}/mcp_server_installations/install_template/`
- **OpenAPI operationId**: `mcp_server_installations_install_template_create`
- **Path params**: None
- **Query params**: None
- **Response codes**: `200`, `201`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ redirect_url: string }`
- OpenAPI response codes: `200`, `201`

```ts
import posthog from "@utdk/posthog";

type McpServerInstallationsInstallTemplateCreateInput = Parameters<typeof posthog.mcpServerInstallationsInstallTemplateCreate> extends [infer T, ...unknown[]] ? T : undefined;
type McpServerInstallationsInstallTemplateCreateOutput = Awaited<ReturnType<typeof posthog.mcpServerInstallationsInstallTemplateCreate>>;

const result: McpServerInstallationsInstallTemplateCreateOutput = await posthog.mcpServerInstallationsInstallTemplateCreate();

// Result shape (from schema): { redirect_url: string }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

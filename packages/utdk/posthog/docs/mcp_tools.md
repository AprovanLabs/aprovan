# Mcp Tools

## Operations

### `posthog.environmentsMcpToolsCreate`

- **HTTP**: `POST /api/environments/{environment_id}/mcp_tools/{tool_name}/`
- **What it does**: Invoke an MCP tool by name.

This endpoint allows MCP callers to invoke Max AI tools directly
without going through the full LangChain conversation flow.

Scopes are resolved dynamically per tool via dangerously_get_required_scopes.
- **OpenAPI operationId**: `environments_mcp_tools_create`
- **Path params**: `tool_name`
- **Query params**: None
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

type EnvironmentsMcpToolsCreateInput = Parameters<typeof posthog.environmentsMcpToolsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpToolsCreateOutput = Awaited<ReturnType<typeof posthog.environmentsMcpToolsCreate>>;

const result: EnvironmentsMcpToolsCreateOutput = await posthog.environmentsMcpToolsCreate();

// Result shape (from schema): { [key: string]: unknown }
```

### `posthog.mcpToolsCreate`

- **HTTP**: `POST /api/projects/{project_id}/mcp_tools/{tool_name}/`
- **What it does**: Invoke an MCP tool by name.

This endpoint allows MCP callers to invoke Max AI tools directly
without going through the full LangChain conversation flow.

Scopes are resolved dynamically per tool via dangerously_get_required_scopes.
- **OpenAPI operationId**: `mcp_tools_create`
- **Path params**: `tool_name`
- **Query params**: None
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

type McpToolsCreateInput = Parameters<typeof posthog.mcpToolsCreate> extends [infer T, ...unknown[]] ? T : undefined;
type McpToolsCreateOutput = Awaited<ReturnType<typeof posthog.mcpToolsCreate>>;

const result: McpToolsCreateOutput = await posthog.mcpToolsCreate();

// Result shape (from schema): { [key: string]: unknown }
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

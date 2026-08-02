# Mcp Servers

## Operations

### `posthog.environmentsMcpServersList`

- **HTTP**: `GET /api/environments/{environment_id}/mcp_servers/`
- **What it does**: Lists curated MCP server templates that users can install with one click.

Templates are seeded by PostHog operators and carry shared, encrypted
OAuth client credentials. Inactive templates are hidden from the catalog.
- **OpenAPI operationId**: `environments_mcp_servers_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; url: string; docs_url?: string; description?: string; auth_type?: "api_key" | "oauth"; icon_key?: string; category?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsMcpServersListInput = Parameters<typeof posthog.environmentsMcpServersList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsMcpServersListOutput = Awaited<ReturnType<typeof posthog.environmentsMcpServersList>>;

const result: EnvironmentsMcpServersListOutput = await posthog.environmentsMcpServersList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; url: string; docs_url?: string; description?: string; auth_type?: "api_key" | "oauth"; icon_key?: string; category?:...
```

### `posthog.mcpServersList`

- **HTTP**: `GET /api/projects/{project_id}/mcp_servers/`
- **What it does**: Lists curated MCP server templates that users can install with one click.

Templates are seeded by PostHog operators and carry shared, encrypted
OAuth client credentials. Inactive templates are hidden from the catalog.
- **OpenAPI operationId**: `mcp_servers_list`
- **Path params**: None
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; url: string; docs_url?: string; description?: string; auth_type?: "api_key" | "oauth"; icon_key?: string; category?:...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type McpServersListInput = Parameters<typeof posthog.mcpServersList> extends [infer T, ...unknown[]] ? T : undefined;
type McpServersListOutput = Awaited<ReturnType<typeof posthog.mcpServersList>>;

const result: McpServersListOutput = await posthog.mcpServersList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; name: string; url: string; docs_url?: string; description?: string; auth_type?: "api_key" | "oauth"; icon_key?: string; category?:...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

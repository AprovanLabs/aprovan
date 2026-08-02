# Plugin Configs

## Operations

### `posthog.environmentsPluginConfigsLogsList`

- **HTTP**: `GET /api/environments/{environment_id}/plugin_configs/{plugin_config_id}/logs/`
- **OpenAPI operationId**: `environments_plugin_configs_logs_list`
- **Path params**: `plugin_config_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; plugin_id: number; plugin_config_id: number; timestamp: string; source: "SYSTEM" | "PLUGIN" | "CONSOLE"; type: "D...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type EnvironmentsPluginConfigsLogsListInput = Parameters<typeof posthog.environmentsPluginConfigsLogsList> extends [infer T, ...unknown[]] ? T : undefined;
type EnvironmentsPluginConfigsLogsListOutput = Awaited<ReturnType<typeof posthog.environmentsPluginConfigsLogsList>>;

const result: EnvironmentsPluginConfigsLogsListOutput = await posthog.environmentsPluginConfigsLogsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; plugin_id: number; plugin_config_id: number; timestamp: string; source: "SYSTEM" | "PLUGIN" | "CONSOLE"; type: "D...
```

### `posthog.pluginConfigsLogsList`

- **HTTP**: `GET /api/projects/{project_id}/plugin_configs/{plugin_config_id}/logs/`
- **OpenAPI operationId**: `plugin_configs_logs_list`
- **Path params**: `plugin_config_id`
- **Query params**: `limit`, `offset`
- **Response codes**: `200`
- **Transport options**: None
- **TypeScript**: [Client interface](../types.ts)

**Inputs**

- Client input type: `{ [key: string]: unknown }`
- Client transport options: None

**Outputs**

- Client return type: `{ count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; plugin_id: number; plugin_config_id: number; timestamp: string; source: "SYSTEM" | "PLUGIN" | "CONSOLE"; type: "D...`
- OpenAPI response codes: `200`

```ts
import posthog from "@utdk/posthog";

type PluginConfigsLogsListInput = Parameters<typeof posthog.pluginConfigsLogsList> extends [infer T, ...unknown[]] ? T : undefined;
type PluginConfigsLogsListOutput = Awaited<ReturnType<typeof posthog.pluginConfigsLogsList>>;

const result: PluginConfigsLogsListOutput = await posthog.pluginConfigsLogsList();

// Result shape (from schema): { count: number; next?: string | null; previous?: string | null; results: ({ id: string; team_id: number; plugin_id: number; plugin_config_id: number; timestamp: string; source: "SYSTEM" | "PLUGIN" | "CONSOLE"; type: "D...
```


<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->

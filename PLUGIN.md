# Aprovan MCP Plugin

This repository is packaged as a **Cursor** and **Claude Code** plugin at the repo root. Install by pointing your client at this directory (or publish the repo as the plugin).

The plugin connects directly to the production Streamable HTTP endpoint:

**`https://aprovan.com/api/mcp`**

That URL is the same surface the workspace gateway exposes in production (see `server/workspace`, `scripts/deploy-web.sh`, and `infra/aws`). OAuth metadata is at `https://aprovan.com/.well-known/oauth-protected-resource/api/mcp`.

## What you get

- Tool catalog meta-tools (`list_tools`, `search_tools`, `tool_info`, `call_tool`)
- Workspace filesystem tools (`fs_list`, `fs_read`, `fs_write`, `fs_delete`)
- Telemetry tools (`telemetry_traces`, `telemetry_query`)
- Prompts and resources registered by the workspace gateway

## Authentication

Production MCP requires authentication. Clients connect via **OAuth** (RFC 9728 resource metadata + PKCE) when you enable the plugin or add a custom connector.

See `server/workspace/README.md` for the hosted MCP install flow (Dynamic Client Registration, authorization code + PKCE).

## Install in Cursor

### From a clone of this repo

1. Clone `AprovanLabs/aprovan` (or use your existing checkout).
2. Copy or symlink the **repository root** to `~/.cursor/plugins/local/aprovan/` (must contain `plugin.json` or `.cursor-plugin/plugin.json`).
3. Reload the Cursor window.
4. Enable **Aprovan** under **Settings → Plugins** and complete OAuth when prompted.

Or test without installing:

```bash
cursor --plugin-dir .
```

Run that from the repository root.

### From a marketplace / team catalog

The repo root ships:

- `plugin.json` — [Agent Plugins](https://agent-plugins.org/) portable manifest
- `.cursor-plugin/plugin.json` — Cursor-native manifest
- `mcp.json` — Streamable HTTP config pointing at `https://aprovan.com/api/mcp`

Submit to the [Cursor marketplace](https://cursor.com/marketplace/publish) when ready.

## Install in Claude Code

### Plugin marketplace

```bash
claude plugin marketplace add AprovanLabs/aprovan
claude plugin install aprovan@aprovan
```

### From a clone

```bash
cd /path/to/aprovan
claude --plugin-dir .
```

Reload after manifest changes: `/reload-plugins`.

## Install in Claude Desktop

Use **Settings → Connectors → Add custom connector** and paste:

```
https://aprovan.com/api/mcp
```

Claude Desktop connects over Streamable HTTP and handles OAuth in the connector UI.

## Optional: point at a local gateway

For local workspace development, override the MCP URL in your **project** MCP config (not the published plugin default):

```json
{
  "mcpServers": {
    "aprovan-local": {
      "url": "http://localhost:4000/api/mcp"
    }
  }
}
```

Start the gateway first:

```bash
pnpm --filter @aprovan/workspace dev
```

Local mode runs with auth off; production at `aprovan.com` requires OAuth.

## Repo-root plugin layout

```
aprovan/                     # repository root = plugin root
├── plugin.json              # Agent Plugins manifest (portable)
├── mcp.json                 # MCP config (Cursor + Agent Plugins)
├── .mcp.json                # MCP config (Claude Code)
├── .cursor-plugin/plugin.json
├── .claude-plugin/plugin.json
├── PLUGIN.md                # this file
└── scripts/validate-plugin-manifests.mjs
```

## Troubleshooting

| Symptom | Fix |
|--------|-----|
| OAuth / 401 | Complete sign-in when the client prompts; check connector settings |
| Connection refused (local override) | Start the gateway: `pnpm --filter @aprovan/workspace dev` |
| Empty tool list | Confirm the MCP URL responds; check gateway logs |
| Plugin changes not picked up | Cursor: reload window. Claude: `/reload-plugins` |

## Development

Validate manifests from the repository root:

```bash
node scripts/validate-plugin-manifests.mjs
```

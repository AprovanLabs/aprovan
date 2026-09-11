# Aprovan MCP Plugin

Install the Aprovan workspace MCP server in **Cursor** and **Claude Code** without hand-wiring `mcp.json`.

The plugin connects to the MCP endpoint your gateway already exposes at `/api/mcp` (see `server/workspace`). It does **not** ship a second MCP implementation — `@aprovan/mcp-plugin` bridges stdio clients to that Streamable HTTP surface via [`mcp-remote`](https://github.com/punkpeye/mcp-remote).

## What you get

- Tool catalog meta-tools (`list_tools`, `search_tools`, `tool_info`, `call_tool`)
- Workspace filesystem tools (`fs_list`, `fs_read`, `fs_write`, `fs_delete`)
- Telemetry tools (`telemetry_traces`, `telemetry_query`)
- Prompts and resources registered by the workspace gateway

## Prerequisites

### Local development (default)

1. Start the workspace gateway:

   ```bash
   pnpm --filter @aprovan/workspace dev
   ```

   The MCP endpoint is `http://localhost:4000/api/mcp` (local mode, auth off).

2. Install the plugin (see below). The default `APROVAN_MCP_URL` points at that endpoint.

### Hosted / production

Point `APROVAN_MCP_URL` at your public gateway, e.g. `https://app.example.com/api/mcp`.

- **OAuth (recommended):** Hosted gateways use RFC 9728 resource metadata at `/.well-known/oauth-protected-resource/api/mcp`. `mcp-remote` handles the OAuth flow when no static token is set.
- **Static token:** Set `APROVAN_MCP_TOKEN` to a bearer access token if your deployment uses one.

## Install in Cursor

### From the repository (local dev)

1. Copy or symlink this directory to `~/.cursor/plugins/local/aprovan/` (must contain `plugin.json` or `.cursor-plugin/plugin.json`).
2. Reload the Cursor window.
3. Open **Settings → Plugins**, enable **Aprovan**, and set:
   - **MCP endpoint URL:** `http://localhost:4000/api/mcp` (default)
   - **Bearer token:** leave empty for local mode

Or test without installing:

```bash
# from the aprovan repo root, after pnpm build
cursor --plugin-dir plugin/aprovan
```

### From a marketplace / team catalog

Publish or add a marketplace entry that points at this directory. The repo ships:

- `plugin.json` — [Agent Plugins](https://agent-plugins.org/) portable manifest
- `.cursor-plugin/plugin.json` — Cursor-native manifest with `${APROVAN_MCP_URL}` variables

Submit to the [Cursor marketplace](https://cursor.com/marketplace/publish) when ready.

## Install in Claude Code

### Plugin marketplace

```bash
# add this repo as a marketplace (one-time)
claude plugin marketplace add AprovanLabs/aprovan

# install the plugin
claude plugin install aprovan@aprovan
```

### Local development

```bash
claude --plugin-dir /path/to/aprovan/plugin/aprovan
```

On first enable, Claude prompts for **MCP endpoint URL** (default `http://localhost:4000/api/mcp`) and optional **Bearer token**.

Reload after manifest changes: `/reload-plugins`.

## Install in Claude Desktop

Claude Desktop supports remote MCP via **Settings → Connectors → Add custom connector** (Streamable HTTP + OAuth). Paste your gateway MCP URL (`https://<host>/api/mcp`).

For stdio bridging (e.g. static bearer token), add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "aprovan": {
      "command": "npx",
      "args": ["-y", "@aprovan/mcp-plugin", "serve"],
      "env": {
        "APROVAN_MCP_URL": "https://your-gateway.example.com/api/mcp",
        "APROVAN_MCP_TOKEN": "your-access-token"
      }
    }
  }
}
```

## Alternative: native Streamable HTTP (no stdio bridge)

Clients that support Streamable HTTP directly can skip `@aprovan/mcp-plugin` and point at the gateway URL. Example for Cursor project MCP (not the plugin):

```json
{
  "mcpServers": {
    "aprovan": {
      "url": "http://localhost:4000/api/mcp"
    }
  }
}
```

OAuth-protected hosted gateways work best with this transport or Claude Desktop custom connectors.

## Package layout

```
plugin/aprovan/
├── plugin.json              # Agent Plugins manifest (portable)
├── mcp.json                 # MCP config (Cursor + Agent Plugins)
├── .mcp.json                # MCP config (Claude Code default discovery)
├── .cursor-plugin/plugin.json
├── .claude-plugin/plugin.json
└── README.md

packages/mcp-plugin/         # @aprovan/mcp-plugin — stdio bridge entrypoint
```

## Troubleshooting

| Symptom | Fix |
|--------|-----|
| Connection refused | Start the gateway: `pnpm --filter @aprovan/workspace dev` |
| 401 / OAuth required | Set `APROVAN_MCP_TOKEN` or complete OAuth via `mcp-remote` |
| Empty tool list | Confirm `/api/mcp` responds; check gateway logs |
| Plugin changes not picked up | Cursor: reload window. Claude: `/reload-plugins` |

## Development

```bash
pnpm --filter @aprovan/mcp-plugin build
pnpm --filter @aprovan/mcp-plugin test
APROVAN_MCP_URL=http://localhost:4000/api/mcp node packages/mcp-plugin/dist/bin.js serve
```

Validate JSON manifests:

```bash
node plugin/aprovan/scripts/validate-manifests.mjs
```

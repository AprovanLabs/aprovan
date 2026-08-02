# @utdk/mcp-server

Unified MCP server that dynamically loads tools from any registered `@utdk/*` provider.

## Usage

### MCP config (recommended)

```json
{
  "command": "npx",
  "args": ["@utdk/mcp-server"],
  "env": {
    "UTDK_PROVIDERS": "github,slack,stripe"
  }
}
```

### Direct invocation

```bash
UTDK_PROVIDERS=github,slack npx @utdk/mcp-server
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `UTDK_PROVIDERS` | Comma-separated list of `@utdk` providers to load (e.g. `github,slack,stripe`) |
| `UTDK_OTEL_EXPORTER` | Telemetry exporter: `otlp` \| `console` \| unset (no-op) |
| `<PROVIDER>_TOKEN` | Bearer token for a provider (e.g. `GITHUB_TOKEN`, `SLACK_TOKEN`) |

Auth credentials are read from environment variables using each provider's `utdk.auth` configuration:
- GitHub: `GITHUB_TOKEN`
- Stripe: `STRIPE_SECRET_KEY`
- Slack: `SLACK_CLIENT_ID` + `SLACK_CLIENT_SECRET` (OAuth2 client credentials)
- Other providers: see the provider package's `package.json` `utdk.auth` field

## Supported providers

All `@utdk/*` workspace packages are supported as optional dependencies:

- `@utdk/github`
- `@utdk/slack`
- `@utdk/stripe`
- `@utdk/notion`
- `@utdk/jira`
- `@utdk/linear`
- `@utdk/airtable`
- `@utdk/hubspot`
- `@utdk/intercom`
- `@utdk/zendesk`
- `@utdk/salesforce`
- `@utdk/sendgrid`
- `@utdk/twilio`
- `@utdk/datadog`
- `@utdk/figma`
- `utdk/google/<service>` (suite — e.g. `UTDK_PROVIDERS=google/drive,google/gmail`)
- `@utdk/openai`
- `@utdk/spotify`

## Hot-reload

Send `SIGHUP` to reload providers without restarting:

```bash
kill -HUP <pid>
```

The server updates its tool registry from the current `UTDK_PROVIDERS` env value. MCP clients will see the updated tools on the next `tools/list` request.

## Telemetry

Set `UTDK_OTEL_EXPORTER=console` for local debugging or `UTDK_OTEL_EXPORTER=otlp` to export spans to an OpenTelemetry collector. Each tool call emits a span with:

- `utdk.provider` — provider name (e.g. `github`)
- `utdk.tool` — UTCP tool name (e.g. `github.repos/list`)
- `mcp.tool_name` — MCP tool name (e.g. `github__repos_list`)
- `http.method` — HTTP method
- `http.url` — resolved URL
- `http.status_code` — response status

# Workspace

`@aprovan/workspace` — the Aprovan platform in one process: chat, apps,
workflows and cron, MCP, VCS, notifications, and the credential/permission
gateway underneath them.

One artifact, three ways to run it:

```bash
npx @aprovan/workspace start                          # npm CLI
docker run -p 4000:4000 -v ./data:/data \
  ghcr.io/aprovanlabs/workspace                       # container (ECS runs this)
```

```ts
import { startWorkspace } from "@aprovan/workspace";   // embedded (desktop app)
const workspace = await startWorkspace({ port: 4000 });
```

`WORKSPACE_MODE` decides where state lives — `local` (SQLite on disk, auth off,
no AWS account) or `aws` (DynamoDB + S3 + Cognito). See
[docs/local-mode.md](../../docs/local-mode.md) for the parity contract and
[docs/deployment.md](../../docs/deployment.md) for how it is deployed.

## Routes

| Prefix | What |
|---|---|
| `/api/gateway/*` | REST API — credentials, fs, llm, apps, workflows, tools, audit |
| `/api/mcp` | public MCP endpoint |
| `/.well-known/*` | RFC 9728 OAuth resource metadata, resolved at the domain root |
| `/apps/*` | live published app pages |
| `/health` | liveness, for container and load-balancer probes |

## Hosted MCP Install Flow (OAuth 2.0 with DCR)

Hosted MCP clients (e.g. Claude connectors) authenticate against the gateway using the standard [OAuth 2.0 Authorization Code flow with PKCE](https://www.rfc-editor.org/rfc/rfc7636). The install flow uses [RFC 7591 Dynamic Client Registration](https://www.rfc-editor.org/rfc/rfc7591) so clients do not need a pre-shared secret:

```
MCP client                      Gateway                    Cognito Hosted UI
    │                              │                               │
    │  POST /oauth/register        │                               │
    │  { redirect_uris: [...] }    │                               │
    │─────────────────────────────>│                               │
    │                              │  CreateUserPoolClient         │
    │                              │──────────────────────────────>│
    │                              │  { ClientId, ClientSecret }   │
    │                              │<──────────────────────────────│
    │  { client_id, client_secret }│                               │
    │<─────────────────────────────│                               │
    │                              │                               │
    │  Redirect user to:           │                               │
    │  /oauth2/authorize           │                               │
    │  ?client_id=<client_id>      │                               │
    │  &code_challenge=<S256>      │                               │
    │  &response_type=code ...     │                               │
    │──────────────────────────────────────────────────────────────>
    │                              │                               │
    │  User completes login        │                               │
    │<──────────────────────────────────────────────────────────────
    │  ?code=<auth_code>           │                               │
    │                              │                               │
    │  POST /oauth2/token          │                               │
    │  code=... code_verifier=...  │                               │
    │──────────────────────────────────────────────────────────────>
    │  { access_token, refresh_token }                             │
    │<──────────────────────────────────────────────────────────────
```

The gateway's `POST /oauth/register` is the only new endpoint. `/oauth2/authorize` and `/oauth2/token` are served directly by the Cognito Hosted UI — the gateway is not in that path.

### Step 1 — Dynamic Client Registration

```http
POST /oauth/register
Content-Type: application/json

{
  "redirect_uris": ["https://your-mcp-client.example.com/callback"],
  "client_name": "My MCP Client",
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "scope": "openid email profile"
}
```

Response `201 Created`:

```json
{
  "client_id": "7abc123...",
  "client_secret": "...",
  "client_id_issued_at": 1751338800,
  "client_secret_expires_at": 0,
  "redirect_uris": ["https://your-mcp-client.example.com/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "client_secret_basic",
  "client_name": "My MCP Client",
  "scope": "openid email profile"
}
```

- `redirect_uris` — required; must be HTTPS (or `http://localhost` for local development).
- `grant_types` — optional, defaults to `["authorization_code", "refresh_token"]`.
- `scope` — optional, defaults to `openid email profile`.
- `client_secret_expires_at: 0` means the secret does not expire.

### Step 2 — Authorization Code + PKCE

Redirect the user to:

```
https://<COGNITO_DOMAIN>/oauth2/authorize
  ?response_type=code
  &client_id=<client_id>
  &redirect_uri=<redirect_uri>
  &scope=openid+email+profile
  &code_challenge=<S256_code_challenge>
  &code_challenge_method=S256
```

### Step 3 — Token Exchange

```http
POST https://<COGNITO_DOMAIN>/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&client_id=<client_id>
&client_secret=<client_secret>
&code=<auth_code>
&redirect_uri=<redirect_uri>
&code_verifier=<code_verifier>
```

The MCP client stores the returned `refresh_token` in its install context for subsequent API calls.

## Environment Variables

`WORKSPACE_MODE` is the only variable local development needs; everything below
is either an `aws`-mode detail (supplied by the CDK task definition or
`/aprovan/<env>/env` in SSM) or a tuning knob.

### Runtime

| Variable | Default | Description |
|---|---|---|
| `WORKSPACE_MODE` | `local` | `local` (SQLite) or `aws` (DynamoDB + S3 + Cognito) |
| `WORKSPACE_PORT` | `4000` | HTTP port |
| `WORKSPACE_DATA_DIR` | `~/.aprovan` | local-mode data directory (`/data` in the container) |
| `WORKSPACE_CRON` | on | set `0` to opt out of contending for the cron lease |
| `WORKSPACE_CRON_SECRET` | — | guards `POST /hooks/cron/tick`; required wherever auth is on |
| `WORKSPACE_ALLOW_INSECURE` | — | set `1` to allow `aws` mode with auth off |
| `APROVAN_ENVIRONMENT` | `prd` | which `/aprovan/<env>/env` bundle `aws` mode loads |

### Identity

| Variable | Default | Description |
|---|---|---|
| `OIDC_ISSUER` / `OIDCAUDIENCE` | — | Cognito issuer + app client id; their presence is what turns auth on |
| `COGNITO_USER_POOL_ID` | *(required for DCR)* | user pool for dynamic client registration |
| `COGNITO_DOMAIN` | — | Cognito hosted UI domain (e.g. `auth.example.com`) |
| `COGNITO_REGION` | `AWS_REGION` → `us-east-1` | AWS region for Cognito |

### Storage (`aws` mode)

| Variable | Default | Description |
|---|---|---|
| `FS_BUCKET` | *(required)* | workspace-fs content blobs; `aws` mode refuses to start without it |
| `FS_TABLE` | `FsFiles` | workspace-fs pointer/version index |
| `RECORDS_TABLE` | `Records` | record store |
| `CREDENTIALS_TABLE` | `Credentials` | credential storage |
| `PERMISSIONS_TABLE` | `Permissions` | permission storage |
| `AUDIT_TABLE` | `Audit` | audit log |

### Tuning

| Variable | Default | Description |
|---|---|---|
| `GATEWAY_RATE_LIMIT_RPS` | `10` | Requests/second per caller+provider |
| `GATEWAY_RATE_LIMIT_BURST` | `20` | Burst capacity |
| `PROVIDER_CACHE_SIZE` | `20` | Max providers held in the LRU provider module cache |
| `SANDBOX_MEMORY_LIMIT_MB` | `32` | Per-guest heap ceiling for workflow scripts |
| `SANDBOX_POOL_MAX` | `2` | Concurrent workflow guests; each costs a fixed 16 MiB of wasm memory |
| `TOOL_LIST_CACHE_TTL_MS` | `300000` (5 min) | Per-workspace TTL for the `GET /tools` tool-list cache |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | *(disabled)* | OTLP/HTTP collector root. Setting it registers a tracer provider; leaving it unset means the OpenTelemetry SDK is never imported |
| `OTEL_SERVICE_NAME` | `workspace` | `service.name` on exported spans |

## Developing

```bash
pnpm dev          # tsx watch, local mode
pnpm test         # full suite; AWS-backend suites need `docker compose up -d` at the repo root
pnpm build        # tsc
```

# catalog-session — Spec Delta

The catalog's configurable session layer: one abstraction that authenticates the visitor and
yields an authorized gateway client, with build-time mode selection between the hosted
product deployment and standalone registry-server deployments.

## ADDED Requirements

### Requirement: Session mode configuration

The catalog SHALL resolve its session mode from the build-time variable
`PUBLIC_SESSION_MODE` with exactly two values: `hosted` and `standalone`. Unset builds
SHALL default to `standalone`. The legacy `PUBLIC_ACCOUNT_HOST` variable SHALL be removed
from the codebase (env types, `.env.example`, deploy workflow); no code path SHALL read it.

#### Scenario: Default build is standalone

- **WHEN** the catalog is built with `PUBLIC_SESSION_MODE` unset
- **THEN** account/admin pages use the standalone session layer targeting
  `PUBLIC_GATEWAY_URL` (or its documented fallbacks)

#### Scenario: Hosted build

- **WHEN** the catalog is built with `PUBLIC_SESSION_MODE=hosted`
- **THEN** account/admin pages use the hosted session layer (Cognito PKCE + product gateway)

#### Scenario: Legacy variable retired

- **WHEN** the built catalog source is searched for `PUBLIC_ACCOUNT_HOST`
- **THEN** there are zero references in `apps/registry/src`, `env.d.ts`, `.env.example`,
  and `.github/workflows/registry-deploy.yml`

### Requirement: Hosted session — shared Cognito pool and product gateway

In `hosted` mode the session layer SHALL authenticate via Cognito PKCE using the shared
`@aprovan/ui/auth` client (`PUBLIC_COGNITO_AUTHORITY`, `PUBLIC_COGNITO_CLIENT_ID`,
redirect `${base}/auth/callback`), SHALL attempt silent sign-in before prompting so an
existing same-origin product session is reused, and SHALL resolve session/workspace state
via the product gateway's `GET /session` / `POST /session/workspace` endpoints.
Authenticated requests SHALL carry the bearer token in `X-Aprovan-Authorization` and the
active workspace in `X-Aprovan-Workspace` (CloudFront OAC overwrites `Authorization`).

#### Scenario: Silent SSO from an existing product session

- **WHEN** a user with a live Cognito session on aprovan.com opens
  `/registry/account/credentials` in a hosted build
- **THEN** the session layer completes silent sign-in without an interactive redirect and
  proceeds to workspace resolution

#### Scenario: Interactive sign-in

- **WHEN** a signed-out user opens a hosted account page
- **THEN** the page offers Cognito sign-in, completes the PKCE redirect via
  `/auth/callback`, and returns the user to the page they started on

#### Scenario: Workspace selection

- **WHEN** a signed-in hosted user has no active workspace and more than one membership
- **THEN** the session layer presents the workspace picker and pins subsequent requests to
  the selection via `X-Aprovan-Workspace`

#### Scenario: Transport headers under CloudFront

- **WHEN** the hosted session layer issues an authenticated gateway request
- **THEN** the token rides in `X-Aprovan-Authorization` (not `Authorization`) and the
  request succeeds through the CloudFront origin path `/api/gateway`

### Requirement: Standalone session — registry-server pluggable auth

In `standalone` mode the session layer SHALL discover the target server's auth mode via
`GET {gateway}/auth/config` and gate accordingly: mode `none` proceeds with no sign-in
(sentinel token, requests carry no bearer); mode `api-key` collects an API key; mode `oidc`
offers PKCE sign-in against the advertised issuer when a `browserClientId` is advertised,
and paste-a-bearer-token entry otherwise (paste-token SHALL also be available as a fallback
in `oidc` mode with a browser client). Authenticated requests SHALL carry the credential in
`Authorization: Bearer` and any explicit tenant selection in `X-Registry-Tenant`.

#### Scenario: Auth-none server

- **WHEN** a standalone catalog targets a registry-server running auth mode `none`
- **THEN** account pages render live surfaces with no sign-in prompt

#### Scenario: API-key server

- **WHEN** the target server reports mode `api-key` and the user submits a valid key
- **THEN** the session persists for the browser session and subsequent requests send
  `Authorization: Bearer <key>`

#### Scenario: OIDC server without a browser client

- **WHEN** the target server reports mode `oidc` with no `browserClientId`
- **THEN** the gate offers bearer-token entry and, on submission of a valid token, reaches
  the ready state

#### Scenario: OIDC server with a browser client

- **WHEN** the target server reports mode `oidc` with a `browserClientId`
- **THEN** the gate offers a PKCE redirect sign-in against the advertised issuer and reaches
  the ready state on return

#### Scenario: Invalid credential

- **WHEN** the stored or submitted credential is rejected (401) by the server
- **THEN** the gate returns to its sign-in state with the server's error message and does not
  render account surfaces

#### Scenario: Tenant resolution

- **WHEN** a standalone session reaches the ready state
- **THEN** the effective tenant is the one reported by `GET /whoami` (sole/default tenant, or
  the api-key's pinned tenant), and an advanced control MAY pin a different tenant via
  `X-Registry-Tenant`

### Requirement: Unified session gate contract

Both modes SHALL be exposed to page hosts through one `SessionGate` contract that renders
its child with an authorized `GatewayClient` only in the ready state, and SHALL surface the
non-ready states distinctly: loading, sign-in required, unreachable gateway (with retry),
and error. Hosts SHALL NOT branch on session mode.

#### Scenario: Host is mode-agnostic

- **WHEN** `CredentialsHost`, `AdminHost`, or `OAuthCallbackHost` renders
- **THEN** it passes only captions/composition into `SessionGate` and receives a ready
  client; no host imports mode-specific auth code

#### Scenario: Unreachable gateway

- **WHEN** the configured gateway cannot be reached in either mode
- **THEN** the gate shows an error card naming the gateway URL with a retry action

#### Scenario: Sign-out

- **WHEN** the user clears the session from the gate
- **THEN** stored tokens/keys for the catalog are removed from browser storage and the gate
  returns to its sign-in state

# registry-server-auth-discovery — Spec Delta

Small additions to the published `@aprovan/registry-server` HTTP surface so a browser UI
can discover how to authenticate and confirm who it is. No credential-backend or
profile-model changes.

## ADDED Requirements

### Requirement: Public auth configuration endpoint

registry-server SHALL serve `GET /auth/config` without authentication (alongside
`/healthz` in the middleware exemption). The response SHALL be
`{ mode: "oidc" | "api-key" | "none", oidc?: { issuer: string, audience: string,
browserClientId?: string } }`, where `oidc` is present only in OIDC mode and
`browserClientId` only when the operator configures a public browser client. The response
SHALL contain no secrets (no key digests, no client secrets, no JWKS material).

#### Scenario: Auth-none server

- **WHEN** an unauthenticated client calls `GET /auth/config` on a server configured with
  auth `none`
- **THEN** it receives 200 `{ "mode": "none" }`

#### Scenario: OIDC server with browser client

- **WHEN** the server is configured with OIDC auth and a `browserClientId`
- **THEN** `GET /auth/config` returns mode `oidc` with issuer, audience, and
  `browserClientId`, with no other auth material

#### Scenario: API-key server

- **WHEN** the server is configured with api-key auth
- **THEN** `GET /auth/config` returns 200 `{ "mode": "api-key" }` and never any key
  material

### Requirement: Authenticated identity endpoint

registry-server SHALL serve `GET /whoami` through the standard authentication + tenant
resolution middleware, returning the resolved call context:
`{ principal: string, tenantId: string, role: "admin" | "member", groupIds: string[],
mode: "oidc" | "api-key" | "none" }`.

#### Scenario: Valid caller

- **WHEN** an authenticated caller (any auth mode) calls `GET /whoami`
- **THEN** it receives its resolved principal, tenant, role, and group ids

#### Scenario: Invalid caller

- **WHEN** a caller with a missing or invalid credential calls `GET /whoami` on a server
  with auth mode `oidc` or `api-key`
- **THEN** it receives 401 with the adapter's error message

### Requirement: Browser OIDC client configuration

The server config's OIDC auth entry SHALL accept an optional `browserClientId` used only
by `GET /auth/config` advertising. Omitting it SHALL change nothing about token
verification (the existing issuer + audience verification is untouched).

#### Scenario: Config accepted

- **WHEN** a server is constructed with
  `auth: { mode: "oidc", issuer, audience, browserClientId }`
- **THEN** it boots, verifies bearer tokens exactly as before, and advertises the
  browser client id via `/auth/config`

### Requirement: Shipped in the published package

The discovery endpoints SHALL ship in a published `@aprovan/registry-server` version
(semver minor — additive surface only) so standalone deployments and the embedded product
server get them from npm. Both the standalone HTTP server and the embedded router SHALL
expose them.

#### Scenario: Published surface

- **WHEN** a standalone deployment installs the released `@aprovan/registry-server` and
  starts it
- **THEN** `GET /auth/config` and `GET /whoami` are served with no extra configuration

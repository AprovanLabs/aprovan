# auth-adapters

Pluggable authentication for the registry server: OIDC (any issuer), API keys, none.
See tech-plan D7; decision 4 (final).

## ADDED Requirements

### Requirement: Adapter selection by configuration

The server SHALL select its authentication adapter from configuration — `oidc`,
`api-key`, or `none` — or accept a caller-provided `AuthAdapter` implementation.
Authentication (establishing the subject) SHALL be separate from tenant resolution
(establishing tenant, role, and groups), so embedded hosts can supply their own
`TenantResolver` while reusing any adapter.

#### Scenario: Adapter swap requires no code change

- **WHEN** a deployment changes configuration from `{mode: "none"}` to
  `{mode: "oidc", issuer, audience}` and restarts
- **THEN** previously anonymous requests now require a valid bearer token, with no other
  behavioral change

### Requirement: Generic OIDC verification

The OIDC adapter SHALL verify bearer JWTs against ANY compliant issuer using OIDC
discovery and remote JWKS — configured by `{issuer, audience}` only. No
issuer-URL-pattern parsing (Cognito or otherwise) SHALL exist; Cognito is expressible
purely as configuration.

#### Scenario: Non-Cognito issuer works

- **WHEN** the adapter is configured with a non-AWS OIDC issuer and a caller presents a
  token signed by that issuer's JWKS with the configured audience
- **THEN** authentication succeeds with the token's subject

#### Scenario: Wrong audience rejected

- **WHEN** a structurally valid token from the configured issuer carries a different
  audience
- **THEN** the request fails 401 without reaching tenant resolution

### Requirement: API-key authentication

The API-key adapter SHALL authenticate tenant-scoped keys presented as bearer tokens.
Keys SHALL be stored as digests only (plaintext returned exactly once at mint time),
SHALL be revocable, and a key SHALL resolve to its tenant without a tenant header.

#### Scenario: Minted key authenticates its tenant

- **WHEN** an admin mints a key for tenant T and a caller presents it
- **THEN** the call authenticates and executes within T

#### Scenario: Revoked key stops working

- **WHEN** a key is revoked and subsequently presented
- **THEN** the request fails 401, and the stored record shows the revocation

### Requirement: Auth-none mode is local-single-tenant only

Auth mode `none` SHALL resolve every request to an implicit admin principal in the
single default tenant. The server SHALL refuse to start in a network-exposed
multi-tenant configuration with auth `none` unless `allowInsecure` is explicitly set.

#### Scenario: Local zero-config just works

- **WHEN** the standalone server runs with defaults (auth none, single tenant)
- **THEN** requests need no Authorization header and act as the admin of `default`

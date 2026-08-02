# multi-tenancy

Tenant model and isolation invariants for the registry server. See tech-plan D2.

## ADDED Requirements

### Requirement: Explicit tenant context on every operation

Every store method, dispatch call, cache key, credential resolution, and telemetry
emission in the registry server SHALL take or carry an explicit `tenantId`. No code path
may derive a tenant from process-global state. All persisted rows SHALL carry a
`tenant_id` column, and all unique constraints SHALL be scoped by it.

#### Scenario: Cross-tenant reads are impossible

- **WHEN** tenant A creates a credential and a profile, and tenant B lists credentials,
  lists profiles, resolves the same provider, and queries audit
- **THEN** tenant B observes none of tenant A's rows, and tenant B's zero-config
  resolution finds no credential

#### Scenario: Caches are tenant-keyed

- **WHEN** tenant A's tool-discovery list, OAuth client-credentials token, and rate-limit
  bucket are warm, and tenant B makes the equivalent calls
- **THEN** tenant B gets its own cache entries — no discovery entry, token, or bucket
  state from tenant A is observable in B's results

### Requirement: Standalone default tenant auto-provisioning

In single-tenant mode (standalone), the server SHALL auto-provision a tenant with id
`default` on first boot and route all requests to it without any tenant header.

#### Scenario: First boot provisions the default tenant

- **WHEN** the standalone server boots against an empty data directory
- **THEN** the `default` tenant row exists and an untagged request dispatches within it

### Requirement: Embedded tenant resolution is host-supplied

In external tenancy mode, the server SHALL resolve the tenant for each call via the
host-supplied `TenantResolver` (aprovan maps `workspaceId` to tenant 1:1). The server
SHALL create the tenant row on first use of a resolver-supplied tenant id
(auto-provision-on-first-use), so the host never performs tenant CRUD explicitly.

#### Scenario: workspaceId maps to tenant on first use

- **WHEN** the embedded host dispatches with a `CallContext` whose `tenantId` is a
  workspace id the server has never seen
- **THEN** the tenant row is created and the dispatch proceeds, and subsequent calls for
  the same id reuse it

#### Scenario: Requested tenant is validated

- **WHEN** an HTTP caller sends `X-Registry-Tenant: T` and the tenant resolver denies the
  authenticated principal membership of T
- **THEN** the request fails 403 without touching any T-scoped store

## ADDED Requirements

### Requirement: Resolution receives the invoker

Every credential-resolution entry point on the dispatch paths (workspace
`resolveCredentialRecord`, registry `resolveProfile` step 4c/5 and
`CredentialService` resolution) SHALL receive the invoker's identity (user
sub, plus any non-user actor) alongside workspace/tenant and provider.
Resolution without an invoker SHALL be impossible for paths that can reach
a `user-oauth` credential.

#### Scenario: Dispatch paths pass the invoker

- **WHEN** a tool call, workflow invocation, or LLM route resolves a
  credential
- **THEN** the resolution call carries the invoking user's sub from the
  authenticated principal, not a placeholder

### Requirement: User-level credentials resolve per-invoker

A `user-oauth` credential SHALL resolve only for invocations by its owner.
Resolution SHALL never return one user's `user-oauth` credential for a
different invoker, regardless of how the credential was selected (provider
default, profile pin, or interface pin).

#### Scenario: Owner resolves their own connection

- **WHEN** a user who owns a `user-oauth` credential for a provider invokes
  a tool on that provider
- **THEN** resolution returns that user's credential

#### Scenario: Another user never receives it

- **WHEN** a different user invokes the same provider and holds no
  connection of their own, and no workspace-level credential exists for the
  provider
- **THEN** resolution fails closed; it does not return the first user's
  credential

### Requirement: Fail closed when the invoker is not connected

When resolution requires a user-level credential (the selection — pin or
default — lands on level `user-oauth`) and the invoker has no connection,
resolution SHALL fail with a distinguishable "not connected" error that
names the provider and the required level. There SHALL be no silent
fallback to another user's credential and no silent downgrade to a
workspace-level credential when a user-level one was explicitly selected.

#### Scenario: Pinned user-level slot, unconnected invoker

- **WHEN** a profile pins a provider at user level and an invoker without
  their own connection dispatches through it
- **THEN** the call fails with a not-connected error identifying the
  provider, and no credential is injected

#### Scenario: The error is machine-distinguishable

- **WHEN** the not-connected failure occurs
- **THEN** callers can distinguish it from "no credential exists at all"
  (so a future connect flow and iw9-c approval routing can react to it)

### Requirement: Deterministic resolution order

Default resolution (no explicit credential pin) SHALL follow a stated
order: (1) the invoker's own `user-oauth` credential for the provider, if
one exists; (2) workspace-level credentials for the provider in their
existing deterministic order. An explicit pin (credential id on a profile
or interface) SHALL resolve exactly that credential loudly — a missing or
mismatched pin is an error, never a fallback (preserving today's contract).

#### Scenario: Invoker's own connection wins over workspace credential

- **WHEN** a provider has both a workspace-level credential and the
  invoker's own `user-oauth` credential, and no pin selects one
- **THEN** resolution returns the invoker's own credential

#### Scenario: Workspace credential serves unconnected invokers

- **WHEN** a provider has a workspace-level credential, and an invoker with
  no connection of their own dispatches without a pin
- **THEN** resolution returns the workspace-level credential

### Requirement: Resolution-order contract is published

The resolution-order contract — inputs (tenant, provider, invoker,
optional pin/profile), the ordering above, the fail-closed rule, and the
resolved output (credential id, level, owner) — SHALL be published as a
typed interface from `@aprovan/registry-server` so sibling change
iw9-c-capability-approval can route approvals by level (workspace-level →
admin approves once; user-level → per-user; IW-9 D12/D15) without reading
resolution internals.

#### Scenario: Resolved output names the level

- **WHEN** any dispatch path resolves a credential
- **THEN** the resolution result exposes the credential's id, level, and
  (for user-level) owner to the caller, typed by the published interface

#### Scenario: Contract is importable by consumers

- **WHEN** a consumer imports the published package
- **THEN** the resolution request/result types and level vocabulary are
  available from the package's public exports

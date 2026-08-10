## ADDED Requirements

### Requirement: Three credential levels

Every credential record SHALL carry exactly one `level` from the closed
vocabulary `workspace-token` | `workspace-oauth` | `user-oauth` (IW-9
invariant 1). The level SHALL be stored on the row in both repositories
(`CredentialRecord` in the workspace, `CredentialRow` in
`@aprovan/registry-server`) and SHALL be returned by every list/get surface
that returns credential metadata.

#### Scenario: Level is present on every read surface

- **WHEN** a credential is created with any level and then read back via
  `list`, `get`, or the store adapter
- **THEN** the returned record includes the same `level` value that was
  stored

#### Scenario: Unknown level values are rejected

- **WHEN** a credential is created with a `level` outside the three-value
  vocabulary
- **THEN** creation fails with a validation error naming the allowed values

### Requirement: Level and payload-type compatibility

The level SHALL be validated against the credential's payload type at
creation: `workspace-token` requires a static payload (`bearer_token` or
`api_key`); `user-oauth` requires `oauth2_authcode`; `workspace-oauth`
requires an OAuth payload (`oauth2_client` or `oauth2_authcode`). When no
level is supplied, the default SHALL derive from the payload type:
`bearer_token`/`api_key` → `workspace-token`, `oauth2_client` →
`workspace-oauth`, `oauth2_authcode` → `user-oauth`.

#### Scenario: Incompatible level is rejected

- **WHEN** a credential is created with payload type `bearer_token` and
  level `user-oauth`
- **THEN** creation fails with an error naming the level/type mismatch

#### Scenario: Default level derives from payload type

- **WHEN** a credential is created with payload type `oauth2_authcode` and
  no explicit level
- **THEN** the stored level is `user-oauth`

#### Scenario: Authcode payload may be a shared bot

- **WHEN** a credential is created with payload type `oauth2_authcode` and
  explicit level `workspace-oauth`
- **THEN** creation succeeds and the stored level is `workspace-oauth`

### Requirement: User-level credentials have an owner

A `user-oauth` credential SHALL record its owner (the connecting user's
sub) and creation SHALL fail when no owner is available. Workspace-level
credentials keep `createdBy` as provenance only. A workspace SHALL hold at
most one `user-oauth` credential per (provider, owner) pair.

#### Scenario: User-level credential without an owner is rejected

- **WHEN** a `user-oauth` credential is created with no authenticated
  user sub in the calling context
- **THEN** creation fails rather than storing an ownerless user-level row

#### Scenario: Duplicate user connection is rejected

- **WHEN** a user who already owns a `user-oauth` credential for a provider
  creates a second `user-oauth` credential for the same provider in the
  same workspace
- **THEN** creation fails with an error identifying the existing connection

#### Scenario: Two users connect the same provider

- **WHEN** two different users each create a `user-oauth` credential for
  the same provider in the same workspace
- **THEN** both rows exist, each with its own owner

### Requirement: Legacy rows backfill to workspace levels

Credential rows that predate the `level` field SHALL resolve to a
deterministic level derived from their payload type — `bearer_token`/
`api_key` → `workspace-token`; `oauth2_client`/`oauth2_authcode` →
`workspace-oauth` — preserving their current workspace-shared behavior. No
legacy row SHALL ever backfill to `user-oauth`. The backfill SHALL apply on
read (a missing stored level maps to the derived value) so no bulk data
migration is required before deploy.

#### Scenario: Legacy static row resolves as workspace-token

- **WHEN** a pre-existing `api_key` credential row without a stored level
  is read or resolved
- **THEN** it behaves as `workspace-token` on every surface

#### Scenario: Legacy authcode row stays workspace-shared

- **WHEN** a pre-existing `oauth2_authcode` credential row without a stored
  level is read or resolved
- **THEN** it behaves as `workspace-oauth` (shared), and no invoker is cut
  off from a connection that worked before the migration

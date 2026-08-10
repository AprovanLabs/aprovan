## ADDED Requirements

### Requirement: Audit rows attribute the credential

Every audit row written for a provider dispatch that resolved a credential
SHALL record, in addition to the existing fields, the credential's id and
level, and the via-path when the dispatch did not come directly from the
user (the profile name used, and/or the non-user actor — app, workflow, or
agent — that carried the call). The invoking user remains the existing
`callerId`. Together these answer "who did this, through what, as whom"
(IW-9 invariant 1: shared-bot actions stay attributable).

#### Scenario: Shared-bot action names the human

- **WHEN** a user's tool call executes under a `workspace-oauth` credential
- **THEN** the audit row records that user as `callerId` and the
  credential's id and level `workspace-oauth`

#### Scenario: User-level action names the credential owner implicitly

- **WHEN** a user's tool call executes under their own `user-oauth`
  credential
- **THEN** the audit row records level `user-oauth` and the credential id,
  and `callerId` equals the credential owner

#### Scenario: Via-path is recorded for indirect dispatch

- **WHEN** a workflow or agent run dispatches a provider call under a
  resolved credential
- **THEN** the audit row records the actor (kind and id) and, when a
  profile selected the credential, the profile name

### Requirement: Credential-less calls audit unchanged

Dispatches that resolve no credential (credential-less compat entries,
native services, ephemeral request-supplied credentials) SHALL continue to
produce audit rows; the new attribution fields are simply absent. Ephemeral
credentials SHALL be marked as such rather than left indistinguishable
from stored credentials.

#### Scenario: No credential, no attribution fields

- **WHEN** a dispatch executes without resolving a stored credential
- **THEN** the audit row is written with the existing fields and no
  credential id/level

#### Scenario: Ephemeral credential is distinguishable

- **WHEN** a dispatch executes with a request-supplied ephemeral credential
- **THEN** the audit row marks the credential source as ephemeral and
  stores no stored-credential id

### Requirement: Attribution fields are queryable

The audit read surface SHALL return the new fields on every backend that
serves reads (sqlite and dsql), and rows written before the change SHALL
read back with the fields absent, not erroring.

#### Scenario: Old rows still read

- **WHEN** `recent()` returns rows written before this change
- **THEN** they deserialize with the attribution fields undefined

#### Scenario: New fields round-trip on both backends

- **WHEN** an audit row with credential attribution is written and read
  back on the sqlite and dsql backends
- **THEN** credential id, level, source, actor, and profile fields
  round-trip intact

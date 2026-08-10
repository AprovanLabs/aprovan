# app-manifest — `app.yaml` format, authored/derived split, reconcile contract

Delta for iw9-f4-app-identity. Grounded in IW-9 decision D3.

## ADDED Requirements

### Requirement: app.yaml is the authored manifest
The platform SHALL accept an app declaration as a YAML file named `app.yaml` at the app root, parsed and validated by a Zod schema (Zod-over-YAML). The file SHALL admit only human/agent-authored declarative fields: `slug` (optional, see app-slug), `title`, `icon`, `description`, `capabilities` (coarse ceiling — field defined here, enforced by iw9-c), `requires` (interface-contract requirements), and `hostModes` (supported data-hosting modes, D2 shape). Unknown top-level keys SHALL be rejected with an error naming the key.

#### Scenario: valid manifest parses
- **WHEN** an `app.yaml` containing only authored fields with valid values is loaded
- **THEN** the loader returns a typed manifest object and no errors

#### Scenario: unknown key rejected
- **WHEN** an `app.yaml` contains a top-level key outside the authored field set
- **THEN** validation fails with an issue naming that key and its YAML path

#### Scenario: malformed YAML rejected with position
- **WHEN** the file is not parseable YAML
- **THEN** the loader fails with an error carrying the parse position, and no partial manifest is produced

### Requirement: Platform-owned fields never appear in app.yaml
`app.yaml` SHALL NOT contain `appId` or any platform-derived field (identity, alias state, directory row, `createdAt`/`updatedAt`, `createdBy`). Validation SHALL fail closed when any such field is present, with an error stating that identity is platform-assigned.

#### Scenario: appId in file rejected
- **WHEN** an `app.yaml` contains an `appId` key (any value, including a well-formed ULID)
- **THEN** validation fails and the manifest is not loaded

#### Scenario: derived timestamp rejected
- **WHEN** an `app.yaml` contains `createdAt`, `updatedAt`, or `createdBy`
- **THEN** validation fails with an error naming the offending field

### Requirement: Platform record holds identity and derived state
Identity and derived state SHALL live only in the platform-owned record `svc#apps/<appId>`: `appId` (ULID), current alias/slug binding, directory-row projection inputs, timestamps, and creator. The record SHALL never be hand-written; the only writers are the reconcile entry point and existing platform mutations funneled through it.

#### Scenario: record is the identity source
- **WHEN** any consumer needs an app's `appId`, timestamps, or alias
- **THEN** it reads `svc#apps/<appId>` (or the alias/location indexes derived from it), never `app.yaml`

### Requirement: Reconcile assigns identity on first sight
The reconcile contract (the interface Wave-1 `iw9-b-app-model` builds on) SHALL be: given an app root containing a valid `app.yaml` with no existing `svc#apps` record bound to that root, the platform mints a new ULID via the existing minting path and creates the record, alias binding, deployment location index, and directory row in one entry point (successor of the four-write fan-out in `apps/store.ts saveApp`). Reconcile SHALL be idempotent: re-reconciling an unchanged root performs no writes.

#### Scenario: first sight mints ULID
- **WHEN** reconcile runs against an app root that has a valid `app.yaml` and no bound record
- **THEN** a new ULID is minted, `svc#apps/<appId>` is created, and the alias, location index, and directory row reflect it

#### Scenario: idempotent re-reconcile
- **WHEN** reconcile runs twice against the same unchanged app root
- **THEN** the second run performs no record writes and reports no changes

### Requirement: Duplicate and foreign identity rejected at reconcile
Reconcile SHALL reject, with a non-retriable validation error: (a) any `app.yaml` claiming identity (already covered above), (b) two app roots resolving to the same identity binding, and (c) any attempt to bind a root to an `appId` minted for a different root or workspace (foreign id). Rejection SHALL never silently re-mint or adopt; the error names the conflicting root and id.

#### Scenario: duplicated root binding rejected
- **WHEN** reconcile encounters a second app root whose resolution would bind to an `appId` already bound to another root
- **THEN** reconcile fails for that root with an error naming both roots and the contested `appId`, and the existing binding is unchanged

#### Scenario: foreign id rejected
- **WHEN** a caller attempts to reconcile a root against an explicit `appId` that the platform minted for a different root
- **THEN** the call fails with a validation error and no record is written

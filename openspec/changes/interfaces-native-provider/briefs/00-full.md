# Brief: interfaces-native-provider (streams 1–8)

## Mission
Un-erase helper types; create `@aprovan/native`; implement five contracts; register credentialless
compat defaults; split vfs/vcs; platform namespaces → plugins; hand-write platform output schemas;
update callers + reseed; **8.4 flip catalog-derived tool entries to real schemas** from utdk-output-schemas.

## Gate
**Blocked until profiles-unified + editor-consolidation + utdk-output-schemas all on main.**

## Settled
Keep third-party interface compat adapters. One Aprovan provider id. Plugin registry enforces
output schemas. Advisory mark for driver-passthrough. Split argument-dependent ops.

## Read first
prd/tech-plan/tasks/specs under openspec/changes/interfaces-native-provider/

## Tasks
Streams 1–8 verbatim.

## Acceptance criteria
### native-interface-provider

#### Scenario: No shadowed names

- **WHEN** the set of first-party service names is compared with the set of interface ids
- **THEN** the intersection is empty

### native-interface-provider

#### Scenario: No precedence rule

- **WHEN** a call is dispatched to a namespace
- **THEN** resolution proceeds by the namespace's single kind, with no branch preferring a service over an interface of the same name

### native-interface-provider

#### Scenario: Default binding resolves to the native provider

- **WHEN** a namespace with no configured profile is called
- **THEN** the call is served by the Aprovan provider

### native-interface-provider

#### Scenario: Rebinding to a third party

- **WHEN** a profile binds one of these namespaces to a third-party implementation
- **THEN** calls through that profile are served by it, using the same operations and the same result shapes

### native-interface-provider

#### Scenario: Credentialless

- **WHEN** the Aprovan provider serves a call
- **THEN** no credential is required, and the workspace context is supplied by the caller's own session

### native-interface-provider

#### Scenario: Served in process

- **WHEN** the Aprovan provider serves a call
- **THEN** it executes in the gateway rather than in the isolate, because an isolate-hosted module cannot reach workspace storage

### native-interface-provider

#### Scenario: Key-value read distinguishes absence

- **WHEN** a key that has never been set is read
- **THEN** the result reports absence explicitly, distinguishably from a key whose stored value is empty

### native-interface-provider

#### Scenario: File metadata uses contract field names

- **WHEN** file metadata is returned
- **THEN** its version token, timestamp, and entry-kind fields are named and typed as the contract declares

### native-interface-provider

#### Scenario: Delete result type matches

- **WHEN** a file is deleted
- **THEN** the result's deletion field carries the contract's declared type, not a differently-typed value

### native-interface-provider

#### Scenario: Listing reports entry kind

- **WHEN** a directory is listed
- **THEN** each entry indicates whether it is a file or a directory

### native-interface-provider

#### Scenario: Contract operations are all present

- **WHEN** the Aprovan provider is checked against each contract it claims
- **THEN** every operation the contract declares is implemented, including any absent from the previous first-party surface

### native-interface-provider

#### Scenario: One package

- **WHEN** the Aprovan-supplied implementations are located
- **THEN** they are in a single package, and the previously separate sandbox packages no longer exist

### native-interface-provider

#### Scenario: Server-side only

- **WHEN** the package's contents are inspected
- **THEN** nothing in it is intended for import by sandboxed widget code

### platform-namespace-plugins

#### Scenario: Platform namespace resolves through a plugin

- **WHEN** a platform namespace is called
- **THEN** it resolves through the plugin registry, using the same mechanism as any other plugin-provided namespace

### platform-namespace-plugins

#### Scenario: No special service category

- **WHEN** the routing implementation is inspected
- **THEN** it contains no enumerated list of first-party service names and no branch that resolves them ahead of other namespaces

### platform-namespace-plugins

#### Scenario: Classification remains published

- **WHEN** a client asks what kind each namespace is
- **THEN** platform namespaces are still identified as first-party, so a services surface can group them

### platform-namespace-plugins

#### Scenario: Determinable operation declares a schema

- **WHEN** a platform operation with a fixed result shape is inspected
- **THEN** it declares an output schema describing that shape

### platform-namespace-plugins

#### Scenario: Passthrough operation is marked

- **WHEN** a platform operation forwards to a bound implementation whose result it does not control
- **THEN** it is marked as passthrough, and any declared shape is labelled advisory rather than guaranteed

### platform-namespace-plugins

#### Scenario: No silent unknowns

- **WHEN** the platform operation set is checked
- **THEN** every operation either declares a schema or is explicitly marked, and none is silently undeclared

### platform-namespace-plugins

#### Scenario: Overloaded operation split

- **WHEN** an operation previously returned one of several shapes depending on its arguments
- **THEN** it is replaced by operations that each return one shape and each declare it

### platform-namespace-plugins

#### Scenario: No alternation in declared results

- **WHEN** platform output schemas are inspected
- **THEN** none expresses a result as an alternation of unrelated shapes

### platform-namespace-plugins

#### Scenario: Helper shapes recovered

- **WHEN** a helper that previously declared an opaque record return is inspected
- **THEN** its declared return type reflects the shape it actually produces

### platform-namespace-plugins

#### Scenario: Downstream schemas follow

- **WHEN** operations built on such a helper declare their output schemas
- **THEN** those schemas match the recovered shape

### vfs-vcs-split

#### Scenario: Driver surface only

- **WHEN** the file namespace's operations are listed
- **THEN** they are exactly the contract's operations, and no version-control or mount-management operation is among them

### vfs-vcs-split

#### Scenario: Version-control operation not on the file namespace

- **WHEN** a version-control operation is requested on the file namespace
- **THEN** it is not found there

### vfs-vcs-split

#### Scenario: History through the version-control namespace

- **WHEN** a caller requests commit history
- **THEN** it is served by the version-control namespace

### vfs-vcs-split

#### Scenario: Default binding is the workspace store

- **WHEN** the version-control namespace is called with no configured profile
- **THEN** the workspace's own store serves the call

### vfs-vcs-split

#### Scenario: Rebinding to a hosting provider

- **WHEN** a profile binds the version-control namespace to a third-party host
- **THEN** calls through that profile are served by it using the same operations

### vfs-vcs-split

#### Scenario: No mount operations on the file namespace

- **WHEN** the file namespace's operations are listed
- **THEN** no mount, unmount, or mount-listing operation appears

### vfs-vcs-split

#### Scenario: Resolution stays internal

- **WHEN** a file under a mounted prefix is read
- **THEN** the caller uses the ordinary read operation and the delegation is not visible in the call

### vfs-vcs-split

#### Scenario: Guard removed

- **WHEN** the file namespace's implementation is inspected
- **THEN** it contains no branch rejecting version-control operations for application sessions, because those operations are no longer reachable there

### vfs-vcs-split

#### Scenario: Application access governed by grants

- **WHEN** an application session calls the version-control namespace
- **THEN** access is decided by the session's grants, like any other namespace

## Verify
Per tasks.md; final check-types + workspace test.

## Git
Aprovan + registry (compat.json). Worktrees `iw7/interfaces-native`. PRs; do not merge.

## Report
briefs/00-report.md

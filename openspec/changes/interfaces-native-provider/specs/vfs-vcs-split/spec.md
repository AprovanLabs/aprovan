## ADDED Requirements

### Requirement: The file namespace exposes driver operations only

The file namespace SHALL expose only the operations its contract declares. Version-control and mount-management operations SHALL NOT appear on it.

#### Scenario: Driver surface only

- **WHEN** the file namespace's operations are listed
- **THEN** they are exactly the contract's operations, and no version-control or mount-management operation is among them

#### Scenario: Version-control operation not on the file namespace

- **WHEN** a version-control operation is requested on the file namespace
- **THEN** it is not found there

### Requirement: Version control is its own namespace

Commit, history, comparison, reference listing, and restoration SHALL be operations of the version-control namespace.

#### Scenario: History through the version-control namespace

- **WHEN** a caller requests commit history
- **THEN** it is served by the version-control namespace

#### Scenario: Default binding is the workspace store

- **WHEN** the version-control namespace is called with no configured profile
- **THEN** the workspace's own store serves the call

#### Scenario: Rebinding to a hosting provider

- **WHEN** a profile binds the version-control namespace to a third-party host
- **THEN** calls through that profile are served by it using the same operations

### Requirement: Mounts are configuration, not file operations

Mount management SHALL NOT be an operation of the file namespace. Mount resolution SHALL remain internal to whichever implementation serves a path.

#### Scenario: No mount operations on the file namespace

- **WHEN** the file namespace's operations are listed
- **THEN** no mount, unmount, or mount-listing operation appears

#### Scenario: Resolution stays internal

- **WHEN** a file under a mounted prefix is read
- **THEN** the caller uses the ordinary read operation and the delegation is not visible in the call

### Requirement: The previous workspace-only guard is unnecessary

With version control on its own namespace, the guard that rejected these operations for application sessions SHALL be removed as redundant.

#### Scenario: Guard removed

- **WHEN** the file namespace's implementation is inspected
- **THEN** it contains no branch rejecting version-control operations for application sessions, because those operations are no longer reachable there

#### Scenario: Application access governed by grants

- **WHEN** an application session calls the version-control namespace
- **THEN** access is decided by the session's grants, like any other namespace

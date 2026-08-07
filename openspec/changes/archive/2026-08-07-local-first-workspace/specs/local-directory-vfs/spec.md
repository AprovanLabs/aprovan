## ADDED Requirements

### Requirement: Local directory VFS implementation

The `vfs` interface SHALL offer an implementation backed by a directory on the host filesystem, registered in the contract's compat list as credentialless, and satisfying the full `VfsClient` surface: read, write, delete, list, stat.

#### Scenario: Round trip through a real directory

- **WHEN** a caller writes a file through `vfs` bound to the local-directory provider and reads it back
- **THEN** the content matches, and the file exists at the corresponding path beneath the configured root

#### Scenario: Listing reflects the directory

- **WHEN** a caller lists a prefix
- **THEN** the entries correspond to the directory's contents beneath that prefix

#### Scenario: Provider needs no credential

- **WHEN** an operator binds `vfs` to the local-directory provider
- **THEN** the bind succeeds without a credential, as the compat entry declares it credentialless

### Requirement: Root containment

The configured root SHALL be the containment boundary. Any resolved path that would fall outside it SHALL be rejected rather than reaching the rest of the filesystem. Enforcement SHALL use the same implementation the sandbox executor uses.

#### Scenario: Relative escape is rejected

- **WHEN** a caller reads a path containing `..` segments that resolve above the root
- **THEN** the operation fails and no file outside the root is read

#### Scenario: Absolute path is rejected

- **WHEN** a caller supplies an absolute path
- **THEN** the operation fails

#### Scenario: Symlink escape is rejected

- **WHEN** a path beneath the root is a symlink whose target resolves outside the root
- **THEN** the operation fails and the target is not read

#### Scenario: Write outside the root creates nothing

- **WHEN** a caller writes to a path that resolves outside the root
- **THEN** the operation fails and no file is created anywhere

### Requirement: Shared containment implementation

The path containment check SHALL exist once and be used by both the local-directory VFS backend and the sandbox executor.

#### Scenario: One implementation serves both callers

- **WHEN** the containment check's behavior changes
- **THEN** both the VFS backend and the sandbox executor observe the change, with no second implementation to update

## ADDED Requirements

### Requirement: A mount is a path-keyed profile

A mount SHALL be a profile whose key is a workspace path prefix rather than a namespace. It SHALL be created, listed, and removed through the same configuration surface as a namespace profile.

#### Scenario: Mount created as a profile

- **WHEN** a path prefix is bound to a provider with options through the profile configuration surface
- **THEN** subsequent file operations under that prefix resolve to the bound implementation

#### Scenario: Mount removed as a profile

- **WHEN** a path-keyed profile is removed
- **THEN** operations under that prefix resolve to the workspace's own store again

#### Scenario: One configuration surface

- **WHEN** the configuration surface is listed
- **THEN** namespace-keyed and path-keyed profiles appear together, with no separate mount-management operations

### Requirement: Longest-prefix resolution

Path-keyed profile lookup SHALL select the longest matching prefix.

#### Scenario: Nested mounts

- **WHEN** profiles exist for both a path prefix and a longer prefix beneath it, and an operation targets a path under the longer one
- **THEN** the longer prefix's profile is used

#### Scenario: No matching prefix

- **WHEN** an operation targets a path under no configured prefix
- **THEN** the workspace's own store handles it

### Requirement: Delegation is transparent to the caller

Operations against a mounted path SHALL be served by the bound implementation without the caller addressing it differently.

#### Scenario: Read through a mount

- **WHEN** a file under a mounted prefix is read
- **THEN** the content comes from the bound implementation and the caller uses the ordinary read operation

#### Scenario: Listing splices a mounted subtree

- **WHEN** a directory containing a mounted prefix is listed
- **THEN** entries from the bound implementation appear in their place in the listing

#### Scenario: Both file and version-control operations honour mounts

- **WHEN** a version-control operation targets a path under a prefix bound to a version-control implementation
- **THEN** it resolves to that implementation rather than to the workspace's own store

### Requirement: Metadata comes from the controlling implementation

Metadata for a mounted path SHALL be supplied by the bound implementation.

#### Scenario: Version token from the controller

- **WHEN** a mounted path's metadata is requested
- **THEN** the version token and modification time reflect the bound implementation's own values

#### Scenario: Controller-dependent metadata is documented

- **WHEN** a caller inspects the metadata contract
- **THEN** it states that these fields are supplied by the controlling implementation and vary by implementation

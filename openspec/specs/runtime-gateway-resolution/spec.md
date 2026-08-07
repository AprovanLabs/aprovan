## Requirements

### Requirement: Gateway resolved at runtime

The client SHALL resolve its gateway base URL at runtime from the active workspace rather than from a build-time constant. One client build SHALL be able to talk to more than one gateway within a single session.

#### Scenario: Switching workspaces switches gateway

- **WHEN** a user switches from a local workspace to a cloud workspace
- **THEN** subsequent gateway calls address the cloud workspace's base URL without a page reload or a rebuild

#### Scenario: Two workspaces of different loci coexist

- **WHEN** a client holds one local and one cloud workspace
- **THEN** each resolves to its own base URL and token source, and calls for one never address the other's gateway

### Requirement: Build-time default preserved

When a workspace record carries no explicit base URL, the client SHALL fall back to the build-time configured gateway, leaving existing web deployments unchanged.

#### Scenario: Deployed website behavior is unchanged

- **WHEN** the client runs with no workspace record specifying a base URL
- **THEN** it addresses the build-time configured gateway exactly as before this change

### Requirement: Single client build

The renderer SHALL NOT require separate builds for local and remote operation.

#### Scenario: One artifact serves both

- **WHEN** the client is built once and used against a local gateway and against aprovan.com
- **THEN** both work, with no build-time flag distinguishing them

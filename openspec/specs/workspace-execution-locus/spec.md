## Requirements

### Requirement: Workspace declares an execution locus

Every workspace SHALL carry a locus of `local` or `cloud`, set at creation and thereafter immutable. State, credentials, interface bindings, and execution SHALL all resolve according to it.

#### Scenario: Local workspace resolves locally

- **WHEN** a caller runs a workflow in a workspace whose locus is `local`
- **THEN** the workflow executes in the local gateway, resolving its bindings and credentials from local stores

#### Scenario: Cloud workspace resolves remotely

- **WHEN** a caller runs a workflow in a workspace whose locus is `cloud`
- **THEN** the request is proxied to the remote gateway, which executes it with its own bindings and credentials

#### Scenario: Locus cannot be changed

- **WHEN** a caller attempts to change an existing workspace's locus
- **THEN** the request is rejected and the workspace is unmodified

#### Scenario: Existing workspaces default to cloud

- **WHEN** a workspace record predating this change is read
- **THEN** its locus resolves to `cloud` and its behavior is unchanged

### Requirement: A local workspace needs no account

Creating and using a workspace whose locus is `local` SHALL NOT require authentication against aprovan.com.

#### Scenario: Local workspace without an account

- **WHEN** a user with no linked account creates a local workspace
- **THEN** the workspace is created, and files, credentials, widgets, and workflows are usable within it

### Requirement: Local workspaces may bind cloud providers

A local workspace SHALL be able to bind any interface to a remote provider, with the local gateway making the outbound call.

#### Scenario: Local workspace using a hosted model

- **WHEN** a local workspace binds `llm` to a hosted provider with a locally stored credential and a script calls it
- **THEN** the local gateway performs the outbound request and returns the result, with the credential never written to a remote store

### Requirement: Cloud workspaces cannot bind local resources

Binding an interface to a local-machine-backed provider from a workspace whose locus is `cloud` SHALL be rejected, because inbound access from the cloud to a local machine is not available.

#### Scenario: Cloud workspace rejects a local directory binding

- **WHEN** an operator binds `vfs` to the local-directory provider in a workspace whose locus is `cloud`
- **THEN** the bind fails with a message explaining that a cloud workspace cannot reach local resources

## Requirements

### Requirement: Signed, hardened, notarized distribution

The application SHALL be code-signed with Hardened Runtime enabled and notarized before external distribution.

#### Scenario: Gatekeeper accepts the application

- **WHEN** a user downloads and opens the distributed application on a supported machine
- **THEN** it launches without a Gatekeeper block and without the user disabling security settings

#### Scenario: Bundled child processes are permitted

- **WHEN** the application spawns its bundled runtime and helper processes under Hardened Runtime
- **THEN** they start successfully, the necessary entitlements being declared

### Requirement: Shell update channel

The application SHALL provide an update channel for the shell itself, independent of renderer bundles, capable of delivering browser-engine security updates.

#### Scenario: Shell update is delivered and applied

- **WHEN** a newer shell version is published and the application checks for updates
- **THEN** the update is downloaded, verified, and applied on user confirmation or restart

#### Scenario: Engine patch does not depend on the bundle channel

- **WHEN** a browser-engine security fix must be shipped
- **THEN** it is delivered through the shell update channel, not through a renderer bundle, because bundles cannot change the engine

### Requirement: Application is not sandboxed

The application SHALL run without App Sandbox, because local agent execution requires spawning arbitrary processes.

#### Scenario: Local agent execution spawns a toolchain

- **WHEN** an agent in a local workspace runs a command using the user's installed toolchain
- **THEN** the process is spawned successfully within the configured root

#### Scenario: Containment is documented as application-enforced

- **WHEN** a user reviews the workspace root boundary
- **THEN** documentation states the boundary is enforced by the application rather than by the operating system

### Requirement: Platform floor is enforced

The application SHALL declare and enforce its minimum macOS version and processor architecture.

#### Scenario: Unsupported platform is rejected at install or launch

- **WHEN** installation or launch is attempted below the declared macOS floor or on an unsupported architecture
- **THEN** the requirement is stated and the application does not run in a degraded state

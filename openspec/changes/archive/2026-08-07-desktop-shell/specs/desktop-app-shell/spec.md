## ADDED Requirements

### Requirement: Installable macOS application

The system SHALL ship a macOS application that runs the workspace gateway and the client with no externally installed runtime, package manager, or container.

#### Scenario: First launch on a clean machine

- **WHEN** a user installs the application on a machine with no Node, no package manager, and no container runtime and launches it
- **THEN** the gateway starts, the client loads, and a local workspace can be created and used

#### Scenario: Unsupported hardware is refused clearly

- **WHEN** the application is launched on an Intel Mac or a macOS version below the supported floor
- **THEN** it reports the requirement in plain language and does not start in a partially working state

### Requirement: The renderer is the shared client

The desktop application SHALL load the same `client/web` build used by the deployed website. It SHALL NOT maintain a forked or reduced renderer.

#### Scenario: One renderer source

- **WHEN** the desktop bundle is produced
- **THEN** it is built from the same client source as the web deployment, with no desktop-only fork

### Requirement: Minimal native bridge

The renderer SHALL reach platform capability only through the gateway. The main-to-renderer bridge SHALL expose no filesystem, process, or credential access.

#### Scenario: Bridge surface is limited

- **WHEN** the exposed bridge is enumerated
- **THEN** it offers only gateway address and status, directory selection, and bundle information, and no direct filesystem, process, network, or credential operation

#### Scenario: Renderer cannot reach native capability directly

- **WHEN** renderer code attempts to use Node integration or a native module
- **THEN** the attempt fails, because context isolation is on and Node integration is off

### Requirement: Credentials protected by the operating system

The application SHALL supply the key provider required by the credential envelope, backed by the operating system keystore.

#### Scenario: Credentials sealed with an OS-held key

- **WHEN** a credential is stored in a local workspace through the desktop application
- **THEN** it is sealed with a key obtained from the operating system keystore, and the stored bytes are not plaintext

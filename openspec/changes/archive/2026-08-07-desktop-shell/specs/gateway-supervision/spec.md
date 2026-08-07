## ADDED Requirements

### Requirement: Gateway runs as a supervised child process

The application SHALL run the gateway as a separate process on a bundled runtime, using the same gateway build the container image ships.

#### Scenario: Gateway artifact matches the container

- **WHEN** the desktop application's gateway files are compared with the container image's
- **THEN** they are the same build, with no desktop-specific gateway modifications

#### Scenario: Gateway crash does not close the window

- **WHEN** the gateway process exits unexpectedly
- **THEN** the application window remains open and reports the gateway as unavailable

### Requirement: Loopback port selected at launch

The gateway SHALL listen on a loopback address on a port selected at launch, and that address SHALL be communicated to the renderer.

#### Scenario: Port does not collide with a manually run gateway

- **WHEN** another gateway is already listening on the conventional development port and the application is launched
- **THEN** the application's gateway binds a different free port and the renderer addresses that port

#### Scenario: Gateway is not reachable from other hosts

- **WHEN** another machine attempts to reach the gateway's port
- **THEN** the connection is refused, because the listener is bound to loopback only

### Requirement: Health, restart, and status reporting

The application SHALL monitor gateway health, restart it with backoff on failure, and expose its state to the renderer.

#### Scenario: Transient failure recovers

- **WHEN** the gateway exits once and restarts successfully
- **THEN** the renderer observes a restarting state followed by a ready state, and resumes normal operation

#### Scenario: Repeated failure is surfaced, not hidden

- **WHEN** the gateway fails to start repeatedly
- **THEN** the renderer displays a failed state including the last error and an explicit retry, rather than an empty page

### Requirement: Clean shutdown

Quitting the application SHALL stop the gateway process.

#### Scenario: No orphaned process after quit

- **WHEN** the user quits the application
- **THEN** the gateway process terminates and no orphaned process remains

#### Scenario: Data is not corrupted by shutdown

- **WHEN** the application quits while the gateway is serving a request
- **THEN** the gateway is given the opportunity to shut down cleanly before being terminated, and the workspace database opens without repair on next launch

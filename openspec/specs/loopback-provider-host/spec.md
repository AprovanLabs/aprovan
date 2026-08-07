# loopback-provider-host

Purpose: TBD (synced from macos-native-providers change).

## Requirements

### Requirement: Native capability is exposed over loopback

Operating-system capability SHALL be exposed by a signed helper process serving HTTP on a loopback address, so the gateway reaches it exactly as it reaches any remote provider.

#### Scenario: Gateway reaches native capability as a provider

- **WHEN** an interface is bound to a native implementation and a caller invokes it
- **THEN** the gateway makes an ordinary provider call to the helper's loopback address, with no platform-specific dispatch path

#### Scenario: Gateway remains the portable artifact

- **WHEN** the desktop application's gateway files are compared with the container image's
- **THEN** they remain identical, no platform-specific native module having been added

#### Scenario: Helper is not reachable from other hosts

- **WHEN** another machine attempts to reach the helper's port
- **THEN** the connection is refused, because the listener is bound to loopback only

### Requirement: Availability reporting

The helper SHALL report each capability as available, unsupported, or disabled. Unsupported SHALL carry a reason; disabled SHALL carry a reason and a remedy the user can act on.

#### Scenario: Capability unsupported on this machine

- **WHEN** a capability requires an operating system version or hardware the machine lacks
- **THEN** it is reported unsupported with a reason naming the requirement

#### Scenario: Capability present but switched off

- **WHEN** a capability is supported but the user has disabled the underlying system feature
- **THEN** it is reported disabled with a remedy describing how to enable it, distinctly from unsupported

#### Scenario: Operator sees the reason

- **WHEN** an operator views a provider whose capability is unsupported or disabled
- **THEN** the reported reason is shown, rather than the provider being hidden or shown as an ordinary failure

### Requirement: Helper lifecycle

The helper SHALL be supervised: started with the application, restarted on failure, and stopped on quit. Its absence SHALL NOT prevent the application from running.

#### Scenario: Helper crash does not stop the application

- **WHEN** the helper exits unexpectedly
- **THEN** the application continues, native capabilities report as unavailable, and non-native capabilities are unaffected

#### Scenario: Availability re-read after restart

- **WHEN** the helper restarts
- **THEN** its availability report is re-read and previously unavailable capabilities become usable again without restarting the application

#### Scenario: No orphan after quit

- **WHEN** the user quits the application
- **THEN** the helper process terminates

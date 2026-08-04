## ADDED Requirements

### Requirement: Host-only plugin registration

Plugins SHALL be registered by the host before a sandbox is created. Sandboxed code SHALL have no way to register, replace, or enumerate plugins.

#### Scenario: Registration before sandbox creation

- **WHEN** the host mounts a widget with plugins registered
- **THEN** the assembled `tools` reflects those plugins, and the widget observes them as ordinary namespaces

#### Scenario: Sandbox cannot register

- **WHEN** sandboxed widget code attempts to register a plugin or mutate `tools`
- **THEN** no registration occurs and subsequent calls dispatch through the host's assembly unchanged

### Requirement: Middleware wraps the transport

A middleware plugin SHALL observe and may transform every call passing through the transport. Multiple middleware SHALL compose as a chain in registration order.

#### Scenario: Chained middleware

- **WHEN** two middleware are registered and a call is dispatched
- **THEN** both observe the call in registration order, and the transport receives the result of the chain

#### Scenario: Middleware does not change shape

- **WHEN** middleware is registered for retry or attribution
- **THEN** the namespace's operation surface is unchanged from the caller's perspective

### Requirement: Namespace overrides wrap with delegate

A namespace override SHALL receive the node it shadows and MAY delegate to it. An override MAY also provide a namespace that the gateway does not expose.

#### Scenario: Override delegates to the underlying node

- **WHEN** a `telemetry` override is registered that batches and attributes events
- **THEN** it receives the underlying `telemetry` node and calls through to `telemetry.export` rather than reimplementing dispatch

#### Scenario: Plugin provides a namespace with no gateway counterpart

- **WHEN** the notification drawer registers a `notification` plugin carrying the delivered payload
- **THEN** `tools.notification` resolves to that payload object, with no source rewriting and no gateway namespace of that name

#### Scenario: One override per namespace

- **WHEN** two overrides are registered for the same namespace
- **THEN** registration fails with an error naming the namespace, rather than silently taking one

### Requirement: Plugins carry their own type declarations

A plugin that changes a namespace's shape SHALL supply the type declaration for that shape, and generated types SHALL incorporate it.

#### Scenario: Override type reaches generated declarations

- **WHEN** types are generated for a host with a `telemetry` override registered
- **THEN** the emitted declaration describes the override's shape, not the gateway's unmodified operation list

#### Scenario: Provided namespace is declared

- **WHEN** a plugin provides a namespace absent from the gateway's namespace list
- **THEN** the generated declarations include it, sourced from the plugin rather than from `GET /tools`

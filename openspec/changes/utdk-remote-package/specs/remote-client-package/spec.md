## ADDED Requirements

### Requirement: Package contents and exclusions

`@utdk/remote` SHALL contain the namespace proxy, the gateway transport, execution policy, pagination helpers, and specifier parsing. It SHALL NOT contain any sandbox host, any DOM-dependent module, or any Aprovan-specific namespace.

#### Scenario: Importable from a sandboxed widget

- **WHEN** widget code running in a `null`-origin iframe imports the package
- **THEN** the module graph resolves with no reference to `document`, `window`, or any iframe-creating code

#### Scenario: No sandbox host in the package

- **WHEN** the published package contents are inspected
- **THEN** no module creates an iframe or implements the `service-call` / `service-result` host side

### Requirement: Dependency direction

`@utdk/remote` SHALL declare no dependency on any `@aprovan/*` package. Aprovan packages MAY depend on it.

#### Scenario: No Aprovan dependency

- **WHEN** the package manifest's dependencies are inspected
- **THEN** no entry is in the `@aprovan` scope

#### Scenario: Aprovan consumes it

- **WHEN** the widget runtime needs a namespace proxy or a gateway transport
- **THEN** it imports from `@utdk/remote` rather than declaring its own

### Requirement: Single proxy implementation

Exactly one namespace-proxy implementation SHALL exist across both repositories. Every consumer SHALL reach it through `@utdk/remote`.

#### Scenario: Compiler uses the shared proxy

- **WHEN** the widget runtime assembles the `tools` root
- **THEN** the namespace nodes are constructed by `@utdk/remote`, not by a local copy

#### Scenario: No surviving duplicates

- **WHEN** both repositories are searched for a proxy that builds a dotted procedure path and dispatches it
- **THEN** exactly one implementation is found

### Requirement: Single postMessage host

Exactly one implementation of the `service-call` / `service-result` protocol host SHALL exist. It SHALL live in the widget runtime, not in `@utdk/remote`.

#### Scenario: One host implementation

- **WHEN** both repositories are searched for code that creates a sandboxed iframe and answers `service-call` messages
- **THEN** exactly one implementation is found, in the widget runtime package

#### Scenario: Playground uses the same host

- **WHEN** the registry playground runs a script in a sandbox
- **THEN** it uses the shared host rather than a second implementation

### Requirement: `@aprovan/runtime` is retired

`@aprovan/runtime` SHALL be removed from the publish workflow and from every dependency manifest. No source file in either repository SHALL import it.

#### Scenario: Removed from manifests

- **WHEN** dependency manifests are inspected
- **THEN** `@aprovan/runtime` appears in none of them

#### Scenario: Removed from publishing

- **WHEN** the publish workflow runs
- **THEN** it neither builds nor publishes `@aprovan/runtime`

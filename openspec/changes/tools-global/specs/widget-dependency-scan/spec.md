## ADDED Requirements

### Requirement: Dependencies derived by static scan

A widget's or script's service dependency list SHALL be derived by statically scanning source for accesses rooted at `tools`. No authored declaration SHALL be required.

#### Scenario: Namespaces collected from property access

- **WHEN** source contains `tools.vfs.read(...)` and `tools.github.repos.get(...)`
- **THEN** the derived dependency list contains `vfs` and `github`

#### Scenario: Configured access still counted

- **WHEN** source contains `tools.github({ name: "work" }).repos.get(...)`
- **THEN** `github` appears in the derived list exactly once

#### Scenario: Unrelated identifier ignored

- **WHEN** source declares a local variable named `tools` in an inner scope and accesses a property on it
- **THEN** the scan does not attribute that access to a service namespace

#### Scenario: Dynamic access reported as unresolved

- **WHEN** source contains `tools[someVariable]`
- **THEN** the scan records that the dependency list is incomplete, rather than silently reporting a complete list

### Requirement: Authored declaration removed

The fence `uses=` attribute SHALL no longer be parsed or honored as an authored input. Any dependency list surfaced to a user or stored on a record SHALL be the derived one.

#### Scenario: uses attribute ignored

- **WHEN** a code fence carries `uses="keyvalue events"`
- **THEN** the attribute has no effect on which namespaces are available or on the derived dependency list

#### Scenario: Derived list drives the dependency panel

- **WHEN** the dependency panel renders for a widget
- **THEN** it shows namespaces produced by the scan of that widget's source

### Requirement: Single definition of the namespace set

Exactly one module SHALL define the set of namespaces the runtime installs. All consumers SHALL import from it.

#### Scenario: No duplicate definitions

- **WHEN** the repository is searched for a hardcoded list of first-party namespace names
- **THEN** exactly one definition is found, and no consumer declares its own copy

#### Scenario: Consumers agree by construction

- **WHEN** the namespace set changes
- **THEN** every consumer observes the change without a second edit

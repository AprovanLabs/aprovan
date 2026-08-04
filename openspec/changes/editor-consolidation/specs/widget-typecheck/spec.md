## ADDED Requirements

### Requirement: Typechecking is injected, not depended upon

The widget runtime SHALL accept an optional checker rather than depending on a typechecker. With no checker supplied, compilation SHALL behave exactly as before.

#### Scenario: No checker supplied

- **WHEN** a widget is compiled with no checker
- **THEN** compilation succeeds or fails exactly as it does today, and no typechecking code is loaded

#### Scenario: Checker supplied

- **WHEN** a widget is compiled with a checker and the source contains a type error
- **THEN** the error is reported with its file, position, and message

#### Scenario: Runtime carries no typechecker dependency

- **WHEN** the widget runtime's dependencies are inspected
- **THEN** no typechecker appears among them

#### Scenario: Published app page loads none

- **WHEN** a published app page loads the widget runtime
- **THEN** no typechecker bytes are fetched

### Requirement: The no-op flag becomes real or disappears

The compile option that claims to enable TypeScript handling SHALL either drive the checker or be removed. It SHALL NOT remain a flag that callers pass and nothing reads.

#### Scenario: Flag has an observable effect

- **WHEN** a caller passes the option and supplies a checker
- **THEN** typechecking runs

#### Scenario: No silently ignored option

- **WHEN** the option is inspected in the codebase
- **THEN** it is either consumed or absent, and no caller passes an option that is never read

### Requirement: Diagnostics reach the existing error paths

Type errors SHALL be reported through the same channel as compile errors, reaching the logs panel, the recent-problems digest, and the self-heal loop without additional plumbing.

#### Scenario: Diagnostic reaches the logs panel

- **WHEN** a widget fails to typecheck
- **THEN** the error appears in the logs panel attributed to that widget's source path

#### Scenario: Diagnostic reaches the model

- **WHEN** a widget fails to typecheck and an automatic fix is attempted
- **THEN** the type error is included in the problem digest sent with the fix request

### Requirement: Per-project type environments

Each project SHALL have its own type environment. Declarations mounted for one project SHALL NOT be visible to another.

#### Scenario: No cross-contamination

- **WHEN** two editors are open on projects with different available namespaces
- **THEN** each sees only its own declarations

#### Scenario: Environment torn down

- **WHEN** an editor closes
- **THEN** its environment and mounted files are released rather than accumulating

### Requirement: Global declarations apply

The environment SHALL support declarations that introduce a global binding, not only module declarations.

#### Scenario: Global root is typed

- **WHEN** a declaration introducing the service root as a global is mounted
- **THEN** references to that root in project source resolve to it, with completions on its namespaces

#### Scenario: Provider types load on demand

- **WHEN** project source references a provider namespace whose declarations are not yet mounted
- **THEN** those declarations are fetched and mounted, and the whole provider catalogue is not shipped ahead of time

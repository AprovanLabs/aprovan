## ADDED Requirements

### Requirement: One meaning per namespace

No namespace SHALL be both a first-party service name and a registry interface id. Dispatch SHALL NOT contain a precedence rule choosing between the two.

#### Scenario: No shadowed names

- **WHEN** the set of first-party service names is compared with the set of interface ids
- **THEN** the intersection is empty

#### Scenario: No precedence rule

- **WHEN** a call is dispatched to a namespace
- **THEN** resolution proceeds by the namespace's single kind, with no branch preferring a service over an interface of the same name

### Requirement: Aprovan provider implements the contracts

An Aprovan-supplied provider SHALL implement the file, version-control, key-value, event, and telemetry contracts, and SHALL be the default binding for each.

#### Scenario: Default binding resolves to the native provider

- **WHEN** a namespace with no configured profile is called
- **THEN** the call is served by the Aprovan provider

#### Scenario: Rebinding to a third party

- **WHEN** a profile binds one of these namespaces to a third-party implementation
- **THEN** calls through that profile are served by it, using the same operations and the same result shapes

#### Scenario: Credentialless

- **WHEN** the Aprovan provider serves a call
- **THEN** no credential is required, and the workspace context is supplied by the caller's own session

#### Scenario: Served in process

- **WHEN** the Aprovan provider serves a call
- **THEN** it executes in the gateway rather than in the isolate, because an isolate-hosted module cannot reach workspace storage

### Requirement: First-party results match their contracts

For every namespace with a contract, the Aprovan provider's result SHALL match the contract's declared shape.

#### Scenario: Key-value read distinguishes absence

- **WHEN** a key that has never been set is read
- **THEN** the result reports absence explicitly, distinguishably from a key whose stored value is empty

#### Scenario: File metadata uses contract field names

- **WHEN** file metadata is returned
- **THEN** its version token, timestamp, and entry-kind fields are named and typed as the contract declares

#### Scenario: Delete result type matches

- **WHEN** a file is deleted
- **THEN** the result's deletion field carries the contract's declared type, not a differently-typed value

#### Scenario: Listing reports entry kind

- **WHEN** a directory is listed
- **THEN** each entry indicates whether it is a file or a directory

#### Scenario: Contract operations are all present

- **WHEN** the Aprovan provider is checked against each contract it claims
- **THEN** every operation the contract declares is implemented, including any absent from the previous first-party surface

### Requirement: Native implementations are consolidated

The Aprovan implementations of these contracts, together with the existing sandbox execution implementations, SHALL live in one package.

#### Scenario: One package

- **WHEN** the Aprovan-supplied implementations are located
- **THEN** they are in a single package, and the previously separate sandbox packages no longer exist

#### Scenario: Server-side only

- **WHEN** the package's contents are inspected
- **THEN** nothing in it is intended for import by sandboxed widget code

## ADDED Requirements

### Requirement: One profile concept

A profile SHALL be a named configuration bound to an addressable key. The same word and the same storage SHALL serve provider credential selection and interface implementation selection.

#### Scenario: Provider profile

- **WHEN** a profile named `work` is configured for the `github` namespace and `tools.github.client("work").repos.get(args)` is called
- **THEN** the call dispatches using that profile's credential

#### Scenario: Interface profile

- **WHEN** a profile named `fast` is configured for the `llm` namespace and `tools.llm.client("fast").createChatCompletion(args)` is called
- **THEN** the call dispatches to that profile's provider, credential, and options

#### Scenario: Default profile

- **WHEN** a namespace is called with no `client(...)` configuration
- **THEN** the default profile is used, falling back to zero-config resolution when no default is configured

### Requirement: Lazy configuration

`client(...)` SHALL resolve lazily. It SHALL NOT return a promise, SHALL NOT perform a network request, and its result SHALL be reusable for many operations.

#### Scenario: No await on the configuring call

- **WHEN** widget code evaluates `tools.github.client("work").repos.get(args)`
- **THEN** the expression dispatches one request and requires no `await` on `client`

#### Scenario: Reusable configured node

- **WHEN** a configured node is stored and used for several operations
- **THEN** each operation dispatches with the same profile and the profile is resolved no more than once per call

#### Scenario: Unknown profile fails at the operation

- **WHEN** a profile name matching no configuration is used and an operation is called on the resulting node
- **THEN** the operation fails with an error naming the profile and listing the profiles that exist for that namespace

### Requirement: Arbitrary profile names

A profile name SHALL be any non-empty string. It SHALL NOT be constrained to identifier or URL-segment syntax.

#### Scenario: Name with reserved URL characters

- **WHEN** a profile is named with characters that cannot appear in a URL path segment
- **THEN** it can be configured, selected, and dispatched successfully

#### Scenario: Name travels out of band

- **WHEN** any profile-pinned operation is dispatched
- **THEN** the profile travels in the request body and the request path contains only the namespace and the operation

### Requirement: Colon-addressed instances removed

The `<namespace>:<instance>` form SHALL NOT appear on the wire, in tool discovery, in stored configuration, or in the user interface.

#### Scenario: Not routable

- **WHEN** a request is made to a path containing a colon-addressed namespace
- **THEN** it is not treated as an interface instance

#### Scenario: Not discoverable

- **WHEN** the tool list is retrieved
- **THEN** no entry names a colon-addressed namespace

#### Scenario: Not stored

- **WHEN** stored configuration is inspected
- **THEN** no key uses the colon form

### Requirement: Call-site options cannot reach transport

Options supplied at the call site SHALL be call arguments only. Transport configuration SHALL be settable exclusively in a stored profile, and the distinction SHALL be enforced by the type system.

#### Scenario: Transport key rejected at compile time

- **WHEN** widget code passes a transport-shaped key such as a base URL in call-site options
- **THEN** it is a type error at the call site, not a runtime check

#### Scenario: Unknown transport-shaped key rejected at runtime

- **WHEN** an untyped caller supplies a transport-shaped key at the call site
- **THEN** the call fails loudly rather than the key silently becoming an argument

#### Scenario: Call-site options win over profile options

- **WHEN** a profile declares options and the call site supplies overlapping keys
- **THEN** the call-site values take precedence and the remaining profile options still apply

### Requirement: Single client factory name

`client` SHALL be the only configuration entry point. No alternative factory name SHALL remain.

#### Scenario: Former name removed

- **WHEN** the repositories are searched for the earlier `getClient` factory
- **THEN** no implementation, reference, or documentation of it remains

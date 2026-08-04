## ADDED Requirements

### Requirement: Single global root

The runtime SHALL expose exactly one global, `tools`, holding every namespace the caller can reach. No service namespace SHALL be installed as a top-level global.

#### Scenario: Namespace reached through the root

- **WHEN** widget code evaluates `tools.vfs.read({ path: "a.txt" })`
- **THEN** the runtime issues `POST /tools/vfs/read` with body `{ args: { path: "a.txt" } }`

#### Scenario: Bare global no longer installed

- **WHEN** widget code references the identifier `vfs` without declaring it
- **THEN** evaluation fails with a `ReferenceError`, and no namespace proxy is reachable under that name

#### Scenario: Bare specifier is not intercepted

- **WHEN** widget code contains `import vfs from "vfs"`
- **THEN** the compiler does not claim the specifier and it resolves as an ordinary CDN package, exactly as any other npm name would

### Requirement: Platform and UTDK namespaces share the root

`tools` SHALL contain platform namespaces and UTDK provider/interface namespaces side by side, assembled by the host. Membership SHALL NOT depend on the calling widget declaring anything.

#### Scenario: Platform namespace present

- **WHEN** widget code evaluates `tools.apps.list({})`
- **THEN** the call dispatches to `POST /tools/apps/list` identically to any provider call

#### Scenario: Undeclared namespace still reachable

- **WHEN** a widget accesses a namespace it never declared and the gateway grants the call
- **THEN** the call succeeds; authorization is enforced by the gateway, not by the contents of `tools`

#### Scenario: Ungranted namespace rejected server-side

- **WHEN** a widget accesses a namespace the gateway's grants do not permit
- **THEN** the gateway returns an error and the client surfaces it; the client does not pre-filter the namespace out of `tools`

### Requirement: Callable namespace nodes

Every namespace node SHALL be both callable and traversable. Invoking the namespace root SHALL configure it and return a node; invoking any deeper path SHALL dispatch that path as an operation.

#### Scenario: Unconfigured call needs no invocation

- **WHEN** widget code evaluates `tools.llm.createChatCompletion({ messages })`
- **THEN** the call dispatches with the namespace's default configuration and no extra call syntax is required

#### Scenario: Configured node returned

- **WHEN** widget code evaluates `tools.github({ name: "work" })`
- **THEN** a node is returned that dispatches subsequent operations with that configuration, and no network request is made by the configuring call itself

#### Scenario: No reserved operation name

- **WHEN** a provider declares a root-level operation named `client`
- **THEN** `tools.<provider>.client(args)` dispatches that operation, because configuration uses the node's own call signature rather than a named method

### Requirement: Sandbox receives only the assembled root

The host SHALL assemble `tools` and hand it to the sandbox. Sandboxed code SHALL NOT be able to obtain a base URL, an auth token, or a transport, and SHALL NOT be able to re-enter host assembly.

#### Scenario: No credentials in the sandbox

- **WHEN** sandboxed widget code inspects its global scope
- **THEN** it finds `tools` but no gateway base URL, bearer token, workspace id, or transport function

#### Scenario: Host supplies the transport

- **WHEN** the host mounts a widget
- **THEN** the transport is bound in the host and reached only through the postMessage bridge; the widget's own module graph contains no self-configuring client

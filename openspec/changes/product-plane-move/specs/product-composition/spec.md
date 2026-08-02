# product-composition — delta spec

## ADDED Requirements

### Requirement: Product plane embeds the registry server in-process

The product workspace server SHALL embed the WS-3 registry server as a library (in-process,
no network hop): it imports the published registry server package, constructs it with the
product's storage and auth configuration, and mounts its HTTP/MCP surface under the product
server's existing routes. There SHALL be no product-side fork or copy of execution-plane code
(tools dispatch, provider execution, credential store, QuickJS runtime, MCP surface).

#### Scenario: Single process serves both planes

- **WHEN** the product server starts (locally or in the `aprovan/workspace` image)
- **THEN** one Node process serves product routes and execution-plane routes (gateway tools,
  MCP), and tool dispatch from a product feature (workflow, chat tool call) reaches the
  embedded registry server via direct in-process invocation, not loopback HTTP

#### Scenario: Execution plane is consumed from npm

- **WHEN** the aprovan repo's dependency manifest is inspected
- **THEN** the registry server package is a published npm dependency with a pinned semver
  range, and no aprovan source file imports execution-plane internals by relative path

### Requirement: Workspaces map to registry tenants one-to-one

The product SHALL map each product `workspaceId` to a registry server tenant 1:1, creating
the tenant on workspace creation (or lazily on first execution-plane use) so that
credentials, profiles, and execution state are isolated per workspace.

#### Scenario: Tenant isolation follows workspace isolation

- **WHEN** two workspaces each store a credential under the same name and invoke the same
  provider tool
- **THEN** each invocation resolves only its own workspace's credential, and neither
  workspace can list or use the other's execution-plane state

### Requirement: Native implementations register against @utdk contracts

Product-native service implementations (the product-plane services that back `sql`, `llm`,
`sandbox`, `vcs`, `agent` and the WS-2 contracts where the product provides an
implementation) SHALL register with the embedded registry server through its provider/
contract registration API, so that contract dispatch treats native implementations and
generated providers uniformly.

#### Scenario: Contract call resolves a native implementation

- **WHEN** a workflow calls a contract method for which the product registered a native
  implementation (e.g. the product sandbox service behind the `sandbox` contract)
- **THEN** the embedded registry server dispatches to the native implementation through the
  same resolution path used for generated providers, with the workspace's tenant context
  attached

#### Scenario: No parallel dispatch path

- **WHEN** the product server's route and service wiring is inspected after the move
- **THEN** there is no product-side bespoke dispatch bypassing the registry server for
  contract-addressed calls (product-only services — sessions, notifications, agents, apps,
  sync — remain product routes and are out of scope for registry dispatch)

# registry-server

The registry server package: construction, configuration, embedding API, HTTP surface,
pluggable storage, and the standalone Docker image. See tech-plan D1, D8, D11.

## ADDED Requirements

### Requirement: Library-first construction

The registry server SHALL be published as a single npm package exporting
`createRegistryServer(options)` which returns a server object exposing at minimum:
a mountable HTTP router, an in-process `dispatch(ctx, namespace, operation, args, opts?)`
method, a `runScript(ctx, opts)` method for QuickJS execution, the storage facade, and
`close()`. The standalone entrypoint and Docker image MUST be thin wrappers over this
same constructor — no code path may exist only in standalone mode except configuration
parsing.

#### Scenario: Embedded host dispatches in-process

- **WHEN** a host constructs the server with `tenancy: { mode: "external", resolve }` and
  calls `server.dispatch(ctx, "github", "repos.get", args)` with a valid `CallContext`
- **THEN** the call executes through the same pipeline as the HTTP route (profile
  resolution, authorization, limits, audit, telemetry) and returns the operation result
  without any HTTP round trip

#### Scenario: Standalone and embedded share one pipeline

- **WHEN** the same namespace/operation/args are dispatched once via `POST /tools/...`
  and once via `server.dispatch(...)` under identical tenant state
- **THEN** both produce identical results, identical audit rows (modulo request id), and
  identically attributed telemetry

### Requirement: Standalone build independence

The registry server package and its tests SHALL build and pass from a fresh clone of the
registry repo with no sibling checkouts, no AWS account, and no network beyond npm
install. It MUST NOT import from `apps/workspace` or any product-plane module (VFS,
workflows registrations, sessions, apps).

#### Scenario: Fresh clone builds

- **WHEN** `pnpm install && pnpm --filter @aprovan/registry-server build test` runs on a
  clean checkout with no AWS credentials configured
- **THEN** build and tests succeed using the bundled SQLite driver and auth mode `none`

### Requirement: Pluggable storage drivers

The server SHALL select its storage backend from configuration:
`sqlite`/`libsql` (bundled default) or `dsql`, all implementing one `RegistryStorage`
facade (tenants, credentials, profiles, grants, api keys, audit) with an identical
relational schema contract. A caller MAY inject a `RegistryStorage` implementation
directly. A single driver-conformance test suite SHALL run against every driver.

#### Scenario: Default storage requires no configuration

- **WHEN** the server starts with no storage configuration
- **THEN** it uses SQLite in the configured data directory, creating the schema on first
  boot

#### Scenario: Driver conformance

- **WHEN** the storage conformance suite runs against the sqlite driver and against the
  dsql driver (when a DSQL connection string is provided)
- **THEN** every store-contract test passes identically on both

### Requirement: MCP surface

The server SHALL host a per-tenant MCP endpoint (streamable HTTP) built from
`@utdk/mcp-core` meta-tools (list_tools, search_tools, tool_info, call_tool). `call_tool`
SHALL execute through the shared dispatch pipeline — gaining profile resolution, grants,
limits, audit, and telemetry attribution identical to the HTTP tools surface. Tool
visibility SHALL be filtered by the caller's permissions. Product-plane MCP features
(workspace filesystem tools, prompts, resources) are NOT part of the server; it SHALL
expose an extension hook the host uses to attach them.

#### Scenario: MCP call_tool honors profiles and grants

- **WHEN** an MCP client invokes `call_tool` for an operation whose namespace resolves a
  granted profile
- **THEN** the execution uses the profile's provider, credential, and options, and an
  ungranted caller receives the same 403 the HTTP surface returns

#### Scenario: Host attaches product extensions

- **WHEN** an embedding host registers MCP extensions (e.g. filesystem tools)
- **THEN** those tools appear in the tenant's MCP tool list alongside the meta-tools,
  while the standalone image serves the meta-tool surface without them

### Requirement: Standalone Docker image

The registry repo SHALL build and publish an `aprovan/registry` Docker image that boots
the standalone server with defaults: SQLite storage on a mounted `/data` volume, auth
mode `none`, telemetry exporter off, and a `/healthz` endpoint.

#### Scenario: docker run works on first boot

- **WHEN** `docker run -p 4000:4000 aprovan/registry` starts with no environment
  configuration
- **THEN** `/healthz` returns 200, the default tenant exists, and
  `POST /tools/:provider/:operation` with an ephemeral request credential executes

#### Scenario: Insecure multi-tenant boot refused

- **WHEN** the server is configured with a network-exposed multi-tenant setup
  (external tenancy or non-loopback bind) and auth mode `none` without `allowInsecure`
- **THEN** the process refuses to start with an error naming the auth configuration
  required

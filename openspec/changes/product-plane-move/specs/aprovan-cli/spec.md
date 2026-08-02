# aprovan-cli — delta spec

## ADDED Requirements

### Requirement: CLI moves to the aprovan repo and keeps its surface

The `aprovan` CLI (`@aprovan/cli`, bin `aprovan`) SHALL live in the aprovan repo and keep
its existing command surface unchanged: `aprovan login`, `aprovan sandbox host
register|run|list|revoke`, `--help`, `--version`, and the `APROVAN_GATEWAY_URL` /
`APROVAN_TOKEN` / `APROVAN_CONFIG` environment handling. It SHALL continue to publish to npm
so `npx @aprovan/cli` (and global install) works without any repo checkout.

#### Scenario: Existing commands unchanged after the move

- **WHEN** `aprovan sandbox host register --name my-laptop` is run against a workspace after
  the move
- **THEN** it registers the host, stores the client token as the `local` provider
  credential, and binds the sandbox interface exactly as before the move

### Requirement: aprovan registry run starts a local execution plane

The CLI SHALL gain `aprovan registry run`, which starts the WS-3 registry server locally
with zero required configuration: auth mode `none`, the bundled SQLite/libSQL storage
backend, a default tenant auto-provisioned, and the MCP/gateway surface listening on a
default port (overridable via flag). The storage backend SHALL be pluggable via flag/config
(bundled SQLite/libSQL is the default; other backends select by connection string) without
code changes.

#### Scenario: Zero-config local run

- **WHEN** `aprovan registry run` is executed on a machine with no prior configuration
- **THEN** the registry server starts with auth `none` and a SQLite/libSQL database created
  under the CLI's data directory, and a tool call against the default tenant succeeds via
  the local gateway URL

#### Scenario: Pluggable backend selection

- **WHEN** `aprovan registry run` is executed with a storage flag pointing at a
  libSQL/Turso-compatible URL
- **THEN** the server uses that backend instead of the bundled default, with no other
  behavior change

#### Scenario: Clean shutdown

- **WHEN** the process receives SIGINT during `aprovan registry run`
- **THEN** the server shuts down cleanly and a subsequent `aprovan registry run` restarts
  against the same local database without corruption

### Requirement: registry run consumes the published registry server

`aprovan registry run` SHALL embed the registry server via its published npm package — the
same package and embedding entrypoint the product server uses — so CLI, standalone image,
and embedded product stay one implementation.

#### Scenario: One implementation, three hosts

- **WHEN** the CLI package's dependencies are inspected
- **THEN** the registry server is a published npm dependency (no copied server code), and
  the version range matches the one the product server consumes

## Problem

Three things block running the product as a local-first application, and none of them requires a desktop shell to fix.

`GATEWAY_BASE` resolves at build time from `import.meta.env`, so one client build can only ever talk to one gateway. A user who wants a local workspace and a cloud workspace side by side would need two builds — or a fork of `client/web`, which is the worst available outcome.

The `vfs` interface has two implementations, `aprovan` (the workspace's own content-addressed store) and `s3`. Neither is "a directory on my disk", so there is no way to point a workspace at real local files.

Local credentials are stored in plaintext. `credentials/cipher.ts` selects `kms`, `local`, or `none`, and `none` — plaintext passthrough — is the default when neither environment variable is set. Acceptable as a dev default; not acceptable for real API keys on a laptop.

Underneath all three sits an unmodelled distinction: a workspace whose state and execution are local is a different thing from one backed by aprovan.com, and nothing in the data model says which is which.

## Users & Jobs

- **Local-first users** — want a workspace whose files, credentials, and execution never leave their machine, with no account at all.
- **Mixed users** — want cloud workspaces and local workspaces side by side in one client, switching without restarting or reinstalling.
- **Widget and script authors** — want `tools.vfs` to behave identically whether it is backed by the workspace store or a local directory.
- **Platform maintainers** — want one client build that serves the website, the desktop shell, and local development.

## Goals

- One client build talks to any gateway; the gateway URL is resolved at runtime and can change without a rebuild.
- A workspace declares its execution locus. Local workspaces resolve state, credentials, and execution locally; cloud workspaces do so remotely.
- `vfs` gains a local-directory implementation with a containment boundary equivalent to the sandbox executor's registered root.
- Local credentials are encrypted at rest with a key the operating system protects, with no change to the credential store's schema, queries, or call sites.
- A user with no account can create a local workspace and use files, credentials, widgets, and workflows.

## Non-Goals

- Does **not** build the Electron shell, bundle a runtime, or package anything — that is `desktop-shell`.
- Does **not** implement the macOS keychain backend's platform binding; it defines the envelope seam and a testable in-memory equivalent. The macOS binding lands with the shell that can call `safeStorage`.
- Does **not** let a cloud workspace reach local resources. Inbound relay access is explicitly deferred; `aprovan sandbox host run` remains the only path for that, and only for `sandbox`.
- Does **not** replicate or synchronise state between local and cloud workspaces. There is no merge, no conflict resolution, and no offline cache for cloud workspaces.
- Does **not** change the interface binding model. Per-interface binding already exists and is used as-is.

## Capabilities

### New Capabilities

- `workspace-execution-locus`: a workspace's local-or-cloud kind, how it is set, and how state, credentials, and execution resolve from it.
- `local-directory-vfs`: the `vfs` implementation over a real directory, its containment boundary, and its compat registration.
- `runtime-gateway-resolution`: gateway URL resolved at runtime rather than at build, per active workspace.
- `protected-credential-envelope`: a cipher backend whose key is held by the host OS, and the seam that admits it.

### Modified Capabilities

<!-- No main specs exist yet; nothing to modify. -->

## Constraints & Assumptions

- `WORKSPACE_MODE=local` (SQLite plus local disk) already works and is the Docker image's default. This change builds on it rather than replacing it.
- `createNativeVfs({ backend })` in `packages/native/src/vfs.ts` already takes an injectable `NativeVfsBackend` of five methods. The local-directory implementation is that backend, not a new client.
- `LocalExecutor` in `packages/native/src/host/executor.ts` already enforces a root boundary with a lexical check plus a realpath check, rejecting `..`, absolute escapes, and symlink escapes. The local VFS must use the same enforcement, not a second one.
- Interface bindings live in the file plane at `.services/bindings.json`, so they are workspace state and follow the workspace's locus automatically.
- **Assumed, unconfirmed**: a workspace's locus is fixed at creation. Converting a local workspace to a cloud one is not supported, and would be an export/import operation if it ever is.
- **Assumed, unconfirmed**: one local gateway serves all local workspaces on a machine, with the locus recorded per workspace rather than per process.

## Open Questions

<!-- Resolved in the 2026-08-06 grilling session; recorded here as decisions. -->

- **Where does the renderer point?** → Always at the local gateway. Cloud-bound interfaces are proxied outward by it.
- **Where does platform state live for a linked account?** → Cloud is the source of truth for cloud workspaces; local workspaces are local truth. Execution follows the workspace's locus.
- **How are local credentials protected?** → An OS-key-backed cipher envelope. Rejected: one keychain item per credential (the store gains a backend that cannot answer its own queries), and a generated key file beside the database (stops a casual reader and nothing more).

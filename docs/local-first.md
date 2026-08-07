# Local-first workspaces

How a workspace's **execution locus** decides where state, credentials, and
execution live. Shipped by the `local-first-workspace` change. Companion to
[app-data.md](./app-data.md) (records vs files inside a workspace).

## Locus

Every workspace carries `locus: "local" | "cloud"`, set at creation and
thereafter immutable. State, credentials, interface bindings, and execution all
resolve from it.

| Locus | State & credentials | Execution | Account |
| --- | --- | --- | --- |
| `local` | On this machine (SQLite / data dir; encrypted credential envelope) | Local gateway | Not required |
| `cloud` | On aprovan.com | Proxied to the remote gateway | Required for use |

Existing records that predate the field resolve as `cloud` — deployed behavior
is unchanged.

A local workspace may still bind individual interfaces to hosted providers; the
local gateway makes the outbound call and never writes those credentials
upstream. Cloud is the offline story's opposite: **local workspaces are the
offline story** (D5).

## Why locus is immutable

Locus is write-once so a workflow's behavior does not depend on where it was
started. Mixing cloud state with a local VFS root (or a local credential overlay
on a cloud workspace) would make resolution un-reason-about-able: a
cloud-executed run cannot reach a disk the cloud cannot see, and inbound relay
from cloud to machine is deliberately deferred.

Choosing the wrong locus at creation is not fixed by flipping a flag. An
export/import path is the future answer; it is not designed here.

## What a cloud workspace cannot do

A cloud workspace cannot bind interfaces to local-machine-backed providers
(for example `vfs` → local directory). The bind is rejected: there is no inbound
path from aprovan.com to the host filesystem. Local sandbox host tooling remains
the only route for that class of access, and only for `sandbox`.

Cloud workspaces also have **no offline cache**. Connectivity is required; there
is no read-through replica of platform state on the laptop. Staleness and
invalidation were deferred until access patterns are known — local workspaces
cover the offline case instead (D5).

## Local directory VFS

`vfs` may be backed by a real directory via the local-directory provider
(`createLocalDirectoryBackend`). Every path is routed through the same
`containPath` check the sandbox executor uses: lexical rejection of `..` /
absolute escapes, then a realpath check that refuses symlink escapes.

**The VFS root is a user-chosen boundary enforced in application code, not by
the operating system.** The registered root is the entire containment story —
there is no OS sandbox wrapping the process. Pointing the root at a broad
directory (for example the home folder) means agents and workflows can write
anywhere beneath that root. The picker should default to a subdirectory; the
root is displayed wherever the binding is shown.

Local workspaces record optional `dataDir` and `vfsRoot` on the workspace
record. Cloud workspaces do not use a host directory as their file plane.

## Client routing

One client build talks to any gateway. `GatewayResolver` maps the active
workspace to a base URL and token source at runtime; the build-time
`VITE_GATEWAY_URL` remains the fallback when no workspace-specific URL is
stored. Switching the active workspace switches the endpoint without a rebuild.

## Related

- [app-data.md](./app-data.md) — file partitions vs record store inside a workspace
- [native-surfaces.md](./native-surfaces.md) — how native capabilities surface in the UI

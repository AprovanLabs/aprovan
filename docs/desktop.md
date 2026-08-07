# Desktop shell

macOS application that pairs the shared web client with a supervised local
gateway. Package: `@aprovan/desktop`. Companion to
[local-first.md](./local-first.md) (locus, VFS root, credential envelope).

## Architecture

```
Electron main          → windows, app:// protocol, shell updater, KeyProvider
  ├─ GatewaySupervisor → spawns vendored gateway on ephemeral 127.0.0.1 port
  ├─ BundleManager     → fetch · verify · stage · swap · roll back renderer
  └─ app:// handler    → serves files from the active bundle directory only
Renderer @ app://      → same client/web as the site; talks to gateway over HTTP
```

- **Main** owns host lifecycle only. The renderer reaches product capability
  through the gateway, not through a wide native bridge.
- **Gateway** is the same `pnpm deploy` artifact the container ships, run under
  a stock Node binary vendored beside it (not Electron's Node). Crash isolation
  is deliberate: a gateway fault does not take down the window.
- **Renderer** loads from `app://` (seeded at install, then OTA-updated). Origin
  is local so the client is not a cross-origin caller of a gateway that holds
  API keys.
- **Bridge** (`window.desktop`) is tiny: gateway URL/status, directory pick,
  bundle info. Credentials use a `KeyProvider` over macOS Keychain
  (`safeStorage`); the key is delivered to the child on an inherited pipe, not
  argv or env.

Platform floor: macOS 14+, Apple Silicon only. Unsupported hosts refuse at
launch.

## Two update channels

| Channel | What it updates | Trust |
| --- | --- | --- |
| **Shell** (`electron-updater` → `https://releases.aprovan.com/desktop`) | Electron/Chromium host, vendored gateway, Node runtime | Developer ID signature + notarization |
| **Renderer bundles** (`BundleManager`) | Web client under `app://` | Ed25519 detached signature vs a public key **pinned in the shell** |

Both exist because they solve different problems:

- **OTA bundles** ship renderer changes without a reinstall or store review —
  atomic swap with `previous` retained for rollback. They cannot change the
  browser engine.
- **Shell updates** are mandatory for Chromium security patches. This app
  renders third-party widgets in that engine; that is the one update that
  cannot wait on a bundle cadence.

A bundle may declare `minShell`; the shell refuses it and points at a download
path when the host is too old. Rotating the bundle-signing key requires a shell
update (the public key is pinned). Signing/notarization detail lives in
[desktop/docs/signing.md](../desktop/docs/signing.md).

## On-disk layout

Under Application Support (`~/Library/Application Support/Aprovan/`):

```
bundles/
  active            -> <version>     (symlink; swap is a rename)
  previous          -> <version>
  <version>/
gateway-data/                        (WORKSPACE_DATA_DIR for the supervised gateway)
workspace-cipher-key                 (sealed KeyProvider material)
```

Activation: `downloading → verifying → staged → active`. Failure before
`active` discards staging and leaves `active` untouched. Two consecutive failed
boots roll back to `previous`. Bundles are renderer-only — gateway schema
travels with the shell, so a bundle rollback never rolls back schema.

Unpackaged / first install also keeps a seed renderer under the app's
`Resources/bundle` (or `desktop/resources/bundle` in the repo). `bundles/active`
wins once an OTA bundle has been activated.

## Not sandboxed; App Store is a non-goal

**The app is not sandboxed.** App Sandbox heavily restricts process spawning,
which guts the local agent execution that motivates the desktop build. The
distributed build uses Hardened Runtime and notarization instead, and is
distributed directly (Developer ID), not through the Mac App Store.

**The workspace root is enforced by the application, not by the OS.** The
registered VFS root is the entire containment story — same `containPath` checks
as the local-directory provider. Pointing the root at a broad directory means
agents and workflows can write anywhere beneath it. The picker defaults to
`~/Documents/Aprovan` (a subdirectory, never `$HOME`). See
[local-first.md](./local-first.md).

**Mac App Store distribution is a deliberate non-goal.** Downloading and
executing signed renderer bundles is incompatible with that channel.

## Run against a locally built gateway

The shell always supervises its **vendored** gateway child (ephemeral loopback
port — it will not collide with a hand-run gateway on `:4000`). To exercise a
gateway you just built:

```bash
# Build workspace + vendor the same deploy the Dockerfile produces
pnpm turbo run build --filter=@aprovan/workspace
pnpm --filter @aprovan/desktop vendor:gateway

# Seed renderer + compile main (or full `pnpm --filter @aprovan/desktop build`)
pnpm --filter @aprovan/desktop bundle:renderer
pnpm --filter @aprovan/desktop build:main

pnpm --filter @aprovan/desktop start
```

`vendor:gateway` writes `desktop/build/gateway` and downloads stock Node into
`desktop/build/runtime/`. Main resolves those paths when unpackaged.

Notes:

- `pnpm --filter @aprovan/desktop dev` sets `DESKTOP_SKIP_RESOURCES=1` and only
  rebuilds main — use it for main-process iteration after resources already
  exist, not for picking up a fresh gateway.
- After changing `@aprovan/workspace`, re-run `vendor:gateway` and restart the
  app. The supervised process does not hot-reload the vendor tree.
- A separate `pnpm --filter @aprovan/workspace dev` on `:4000` is fine for
  browser-only work; the desktop window will still talk to its own child, not
  that process.

## Related

- [local-first.md](./local-first.md) — locus, VFS root, offline
- [desktop/docs/signing.md](../desktop/docs/signing.md) — codesign, notarization, key rotation

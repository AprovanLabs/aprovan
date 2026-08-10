# Desktop shell

macOS application that pairs the shared web client with a supervised local
gateway. Package: `@aprovan/desktop`. Companion to
[local-first.md](./local-first.md) (locus, VFS root, credential envelope),
[native-providers.md](./native-providers.md) (Swift helper), and
[voice.md](./voice.md) (capture, on-device STT, floating panel).

## Install and work with the app

### Requirements

- **macOS 14+** on **Apple Silicon** (Intel and older OS versions refuse at launch)
- **Node ≥ 20** with **pnpm 9.15.9** via corepack (`corepack enable`)
- **Xcode** (or Command Line Tools + a Swift toolchain) to build `native/macos-helper`
- Optional: Apple Developer ID + notarization secrets for a signed release build
  (see [desktop/docs/signing.md](../desktop/docs/signing.md))

There is no Mac App Store build. Day-to-day use is either a local Electron run
from this repo or a Developer ID `.dmg` / `.zip` from the release channel.

### First-time setup (from the monorepo)

From the **aprovan** repo root (dependencies already installed with `pnpm i`):

```bash
# Workspace gateway the shell will vendor
pnpm turbo run build --filter=@aprovan/workspace

# Full desktop build: main/preload + renderer seed + gateway vendor +
# Swift helper + ESM seed + STT default model fetch
pnpm --filter @aprovan/desktop build

pnpm --filter @aprovan/desktop start
```

`build` runs `scripts/prepare-resources.sh`, which:

1. Bundles the web client into the seed renderer
2. Vendors the gateway deploy + stock Node runtime
3. Builds `macos-helper` into `Resources`
4. Seeds the widget ESM cache and downloads the pinned `whisper-tiny.en` weights

On first launch the window opens against `app://`, the gateway binds an
**ephemeral** loopback port (not fixed `:4000`), and the helper does the same
for native capabilities. Application Support lands at
`~/Library/Application Support/Aprovan/`.

### Day-to-day development

| Goal | Command |
| --- | --- |
| Iterate on Electron main only (resources already built) | `pnpm --filter @aprovan/desktop dev` |
| Pick up a new `@aprovan/workspace` build | `pnpm --filter @aprovan/desktop vendor:gateway` then restart |
| Refresh the seed renderer only | `pnpm --filter @aprovan/desktop bundle:renderer` then restart |
| Full resource rebuild | `pnpm --filter @aprovan/desktop build` |
| Unsigned local `.app` (Dock name **Aprovan**) | `pnpm --filter @aprovan/desktop package:local` then `open:app` |
| Install that `.app` into `/Applications` | `pnpm --filter @aprovan/desktop install:local` |
| Signed arm64 dmg/zip (needs `CSC_*`) | `pnpm --filter @aprovan/desktop dist` |

`pnpm start` / `electron .` is a **dev host**: the Dock label stays “Electron”
because it launches Electron’s own `.app`. For a real Mac app (correct name,
icon, double-clickable), package locally:

```bash
pnpm --filter @aprovan/desktop package:local
pnpm --filter @aprovan/desktop open:app
# or sync into /Applications (quits a running copy first):
pnpm --filter @aprovan/desktop install:local
```

`dev` / `start` never update `/Applications`. OTA bundle updates refresh the
**renderer** under Application Support for an existing install; they do not
replace the shell, helper, or vendored gateway from source — use
`install:local` (or `package:local` + drag) after those change.

`dev` sets `DESKTOP_SKIP_RESOURCES=1` and only recompiles main — it will not
pick up a fresh gateway, helper, or renderer. Keep a separate
`pnpm --filter @aprovan/workspace dev` on `:4000` for browser-only work; the
desktop window always talks to **its own** supervised child, not that process.

### What you get when it runs

- **Chat / workspaces** — same client as the website, served from `app://`.
  Credentials and provider connect stay in-chat; the Registry website link is
  hidden in the desktop header (no outbound hop that strands you on the web).
- **Local gateway** — the renderer waits for the supervised loopback gateway and
  uses it as the API base (never the cloud Cognito gateway).
- **Local workspace creation** — native directory picker; default root under
  `~/Documents/Aprovan` (never `$HOME`); credentials sealed via Keychain
- **Native helper** — loopback HTTP for ESM cache, on-device chat (when the OS
  model is available), STT models, and availability probes
- **Voice** — mic control in the composer; global hotkey **⌥Space** (Alt+Space)
  summons the floating panel; default STT model is local (`whisper-tiny.en`).
  Bind `stt` → `local` in Credentials / profiles for on-device capture.
- **System notifications** — mirror of the in-app feed (actions dispatch through
  the gateway)

Gateway status, helper URL, and bundle info surface through the small
`window.desktop` bridge. Product APIs stay on the gateway.

### Packaged install (release)

CI builds arm64 macOS artifacts when Apple signing secrets are present
(`.github/workflows/desktop.yml`). Install from the signed feed at
`https://releases.aprovan.com/desktop` (shell auto-updater) or a stapled
`.dmg` / `.zip`. First-run Gatekeeper should accept a notarized build without a
manual override; the verification checklist is in
[desktop/docs/signing.md](../desktop/docs/signing.md).

Shell updates and renderer OTA bundles are **separate channels** — see below.

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
- [native-providers.md](./native-providers.md) — Swift helper, availability, ESM cache
- [voice.md](./voice.md) — capture, models, panel ↔ chat continuity
- [desktop/docs/signing.md](../desktop/docs/signing.md) — codesign, notarization, key rotation
- [stt.md](./stt.md) — STT session contract wire details

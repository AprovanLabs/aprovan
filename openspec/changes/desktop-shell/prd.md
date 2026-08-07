## Problem

The product runs as a web client against a gateway, and the gateway already runs fully local — `WORKSPACE_MODE=local` on SQLite is the Docker image's own default, and the repo's launch configuration already pairs a local gateway with the web client. What is missing is a way for someone who is not a developer to get that pairing: an application they install, which supervises the gateway, holds credentials safely, and updates itself without waiting on a store review.

`local-first-workspace` makes the pieces addressable — runtime gateway resolution, a local directory VFS, an OS-key-backed credential envelope. This change turns them into something installable.

## Users & Jobs

- **Local-first users** — want to double-click an application and have a working local workspace, without installing Node, Docker, or a package manager.
- **Existing web users** — want the same product they already use, not a reduced desktop variant.
- **The team** — wants to ship renderer changes continuously, without a store review and without asking users to reinstall.

## Goals

- One installable, notarized macOS application that runs the gateway and the client with no external dependencies.
- The gateway inside the app is the same build the container ships; local behavior and container behavior do not diverge.
- Renderer updates reach installed apps without a reinstall or a store review, applied atomically with a working previous version to fall back to.
- Credentials on the machine are protected by a key the operating system holds.
- A gateway fault does not take down the window; the app reports it and recovers.
- The renderer is the existing `client/web`, consumed rather than forked.

## Non-Goals

- Does **not** implement any native capability provider — no on-device model, no speech, no native notifications. That is `macos-native-providers`.
- Does **not** implement the floating widget panel, global hotkeys, or voice — that is `voice-and-floating-widgets`.
- Does **not** ship to the Mac App Store. Downloading and executing renderer bundles is incompatible with that channel, and the choice is deliberate.
- Does **not** sandbox the application. App Sandbox is incompatible with the process spawning that local agent execution requires.
- Does **not** register the machine as a host with a cloud workspace. Inbound access is deferred; `aprovan sandbox host run` remains the path for that.
- Does **not** support Windows, Linux, or Intel Macs.

## Capabilities

### New Capabilities

- `desktop-app-shell`: the Electron application, its windows, and its lifecycle.
- `gateway-supervision`: spawning, health, restart, port selection, and shutdown of the bundled gateway process.
- `renderer-hydration`: the `app://` origin, signed bundle fetch and verification, atomic swap, and rollback.
- `desktop-distribution`: signing, hardening, notarization, and the shell update channel.

### Modified Capabilities

<!-- No main specs exist yet; nothing to modify. -->

## Constraints & Assumptions

- macOS 14 or later, Apple Silicon only. Intel is excluded because CPU-only inference would make later voice features feel broken, and shipping a feature that is bad on some hardware is worse than not offering it there.
- The gateway needs `better-sqlite3`, a native addon. Native addons must match the ABI of the runtime loading them, and Electron's ABI is not stock Node's — hence a bundled stock Node runtime rather than in-process execution.
- Renderer bundles are executable code delivered after install. They must be signed and verified before use, and the renderer must reach native capability only through the gateway, never directly.
- Electron ships Chromium, and this application renders third-party widget code. A shell update channel is mandatory regardless of how good the bundle channel is.
- **Assumed, unconfirmed**: the gateway listens on a loopback port chosen at launch and passed to the renderer, rather than a fixed port. A fixed port collides with a developer running the gateway by hand.
- **Assumed, unconfirmed**: one gateway process serves all local workspaces on the machine.
- **Assumed, unconfirmed**: bundle signing uses a key held in CI, distinct from the Apple signing identity.

## Open Questions

<!-- Resolved in the 2026-08-06 grilling session; recorded here as decisions. -->

- **Electron or Tauri?** → Electron. Both require shipping a Node runtime for the gateway, so Tauri's size advantage largely disappears, and Electron pins one browser engine — decisive for a platform where third parties author widgets that must render identically here and on the website.
- **How does the gateway run?** → A child process on a bundled stock Node runtime. Rejected: `utilityProcess` and in-main execution (both force native-addon rebuilds and diverge from the container), and a launchd daemon (harder install, update, and uninstall).
- **How does new renderer code arrive?** → `app://` origin with signed OTA bundles. Rejected: loading aprovan.com directly (a remote origin calling a local gateway that holds credentials, with no rollback) and full-app updates only (not live).

## 1. Electron scaffold and app origin

> Depends-on: - | Touches: desktop/**, package.json, pnpm-workspace.yaml, turbo.json | Verify: `pnpm --filter @aprovan/desktop build && pnpm --filter @aprovan/desktop test`

- [ ] 1.1 Create the `desktop/` workspace package with main, preload, and build config. Register it in `pnpm-workspace.yaml` and `turbo.json`.
- [ ] 1.2 Register the `app://` protocol handler serving files from the active bundle directory only; reject any path resolving outside it (spec: "Origin serves only the active bundle").
- [ ] 1.3 Open the main window with `contextIsolation: true` and `nodeIntegration: false`, loading the renderer from `app://`.
- [ ] 1.4 Implement the `DesktopBridge` over `contextBridge` with exactly the surface in the tech plan — no filesystem, process, or credential operations.
- [ ] 1.5 Enforce the platform floor at launch: macOS 14+, Apple Silicon, reported in plain language and refusing to start otherwise.
- [ ] 1.6 Test that the bridge surface matches the declared interface and nothing more.

## 2. Bundle the renderer and the gateway build

> Depends-on: 1 | Touches: desktop/build/**, desktop/scripts/**, scripts/image.sh | Verify: `pnpm --filter @aprovan/desktop build`

- [ ] 2.1 Produce the renderer bundle from the existing `client/web` build with no desktop-only fork (spec: "One renderer source").
- [ ] 2.2 Vendor the gateway artifact exactly as the Dockerfile's `pnpm deploy` step produces it, plus a stock Node runtime for the target architecture (D2).
- [ ] 2.3 Add a build assertion comparing the vendored gateway against the container build, failing if they differ.
- [ ] 2.4 Lay out Application Support directories per the tech plan: `bundles/`, `gateway-data/`.

## 3. Gateway supervision

> Depends-on: 2 | Touches: desktop/src/gateway-supervisor.ts, desktop/src/__tests__/gateway-supervisor.test.ts | Verify: `pnpm --filter @aprovan/desktop test`

- [ ] 3.1 Spawn the gateway on an ephemeral loopback port with `WORKSPACE_MODE=local` and the app's data directory, passing the resolved URL to the renderer (D5).
- [ ] 3.2 Poll health and emit `GatewayStatus` transitions over the bridge.
- [ ] 3.3 Restart with exponential backoff; after the retry ceiling, hold at `failed` with the last error rather than looping silently.
- [ ] 3.4 Shut down cleanly on quit — signal, await, then terminate — leaving no orphan and no database requiring repair.
- [ ] 3.5 Cover every scenario in `specs/gateway-supervision/spec.md`, including the port-collision case with a gateway already on the development port.

## 4. Keychain key provider

> Depends-on: 3 | Touches: desktop/src/key-provider.ts, desktop/src/__tests__/key-provider.test.ts | Verify: `pnpm --filter @aprovan/desktop test`

- [ ] 4.1 Implement the `KeyProvider` seam from `local-first-workspace` over Electron `safeStorage`, generating and persisting a 32-byte key on first run.
- [ ] 4.2 Pass the provider to the gateway child so `KeystoreCipher` is selected, without the key transiting a command-line argument or an environment variable readable by other processes.
- [ ] 4.3 Test that a local workspace created through the app stores sealed, non-plaintext credential bytes.

## 5. Bundle manager

> Depends-on: 2 | Touches: desktop/src/bundle-manager.ts, desktop/src/__tests__/bundle-manager.test.ts | Verify: `pnpm --filter @aprovan/desktop test`

- [ ] 5.1 Implement manifest fetch, detached-signature verification against a pinned public key, and content-hash verification (D3).
- [ ] 5.2 Enforce `minShell`, refusing a bundle that requires a newer host and indicating the shell update path.
- [ ] 5.3 Stage into a temporary directory and activate by rename so exactly one complete bundle is active at every moment; retain the previous bundle.
- [ ] 5.4 Track boot success via renderer readiness reported over the bridge; roll back automatically after two consecutive failed boots.
- [ ] 5.5 Expose `BundleInfo` over the bridge.
- [ ] 5.6 Cover every scenario in `specs/renderer-hydration/spec.md`, including interrupted staging and tampered content.

## 6. Directory picker and workspace creation

> Depends-on: 1 | Touches: desktop/src/dialogs.ts, client/web/src/features/workspaces/** | Verify: `pnpm --filter @aprovan/patchwork-web typecheck`

- [ ] 6.1 Implement `pickDirectory` over the native panel, returning the selected path.
- [ ] 6.2 Have the workspace creation flow use it when available, falling back to the plain path input `local-first-workspace` shipped.
- [ ] 6.3 Propose a subdirectory as the default root, never the home directory, and display the containment statement alongside it.

## 7. Signing, notarization, and shell updates

> Depends-on: 5 | Touches: desktop/build/entitlements.plist, desktop/electron-builder.yml, .github/workflows/desktop.yml | Verify: `pnpm --filter @aprovan/desktop dist`

- [ ] 7.1 Configure signing with Hardened Runtime and declare the entitlements the bundled runtime and helper processes require (D4).
- [ ] 7.2 Add notarization and stapling to the release workflow.
- [ ] 7.3 Wire the shell auto-updater against a signed release feed, independent of the bundle channel (D6).
- [ ] 7.4 Hold the bundle-signing key in CI only; document rotation as requiring a shell update, since the public key is pinned.
- [ ] 7.5 Verify a downloaded build launches on a clean machine without a Gatekeeper block.

## 8. Documentation

> Depends-on: 7 | Touches: docs/desktop.md, docs/index.md | Verify: `pnpm lint`

- [ ] 8.1 Write `docs/desktop.md`: architecture, the two update channels and why both exist, on-disk layout, and how to run the desktop shell against a locally built gateway.
- [ ] 8.2 State plainly that the app is not sandboxed, that the workspace root is enforced by the application, and that App Store distribution is a deliberate non-goal.
- [ ] 8.3 Link from `docs/index.md`.

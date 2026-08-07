# Report: Bundle manager

## What was built

`BundleManager` (`desktop/src/bundle-manager.ts`) implements signed OTA
fetch → verify → stage → activate → rollback for renderer bundles under
Application Support `bundles/` (tech-plan D3):

1. **5.1** — Manifest fetch with Ed25519 detached-signature verification
   against a pinned public key (`bundle-public-key.ts`) and SHA-256 content-hash
   checks. Test keypair lives in `__tests__/fixtures/bundle-keys/` (not CI signing).
2. **5.2** — `minShell` gating via semver compare; refusal returns
   `requiredShell` + `shellUpdatePath`.
3. **5.3** — Stage into `.staging-<version>/`, promote by rename into
   `<version>/`, then atomic symlink swap of `active` (retaining `previous`).
4. **5.4** — Boot-state file tracks awaiting-ready; two consecutive failed
   launches auto-roll back. Preload signals `desktop:rendererReady` on
   DOMContentLoaded (off the public `DesktopBridge` surface).
5. **5.5** — `bundleInfo` IPC reads live `BundleManager.getBundleInfo()`.
6. **5.6** — Tests cover tamper/signature/`minShell`/interrupt/rollback/
   gateway-data isolation/origin containment from `renderer-hydration`.

## Verification

1. `pnpm --filter @aprovan/desktop test` — 27 passed.
2. `pnpm --filter @aprovan/desktop check-types` — passed.
3. `pnpm --filter @aprovan/desktop build:main` — passed.

## Deviations

- Archive format in tests is plain `.tar` via system `tar` (production URL
  shape remains `.tar.zst`; zstd extraction can land with stream 7 packaging).
- Readiness IPC is not on `DesktopBridge` (surface stays tech-plan-exact);
  preload reports ready automatically.
- Pinned key is the test/dev key until stream 7 replaces it with the release pin.

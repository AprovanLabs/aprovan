# Brief: Signing, notarization, and shell updates

## Mission
Configure Hardened Runtime signing + entitlements, notarization/stapling in release CI, shell auto-updater on a signed feed independent of bundles, document CI-only bundle-signing key + rotation, verify clean-machine Gatekeeper launch.

## Read first
1. `openspec/changes/desktop-shell/tasks.md` section 7
2. `openspec/changes/desktop-shell/tech-plan.md` (D4, D6)
3. `openspec/changes/desktop-shell/specs/desktop-distribution/spec.md`
4. Bundle manager + public key pin already on main (stream 5)

## Depends-on
Stream 5 merged.

## Tasks
Copy section 7 checkboxes (7.1–7.5).

## Verify
`pnpm --filter @aprovan/desktop dist` where secrets allow; otherwise configure workflow + document manual Gatekeeper verification steps for 7.5 if CI cannot run notarization in this environment.

## Constraints
Touches: `desktop/build/entitlements.plist`, `desktop/electron-builder.yml`, `.github/workflows/desktop.yml`, docs notes as needed.
If Apple signing secrets are unavailable, land the workflow/config scaffolding and mark 7.5 with an explicit verification procedure rather than inventing credentials.

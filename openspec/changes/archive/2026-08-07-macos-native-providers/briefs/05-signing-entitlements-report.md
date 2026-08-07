# Report: Signing and entitlements for helper

## What was built

Stream 5 wires the Swift helper into the signed app bundle and documents the
Hardened Runtime / notarization gate for native capabilities (mirrors
desktop-shell stream 7 when Apple secrets are unavailable):

1. **5.1** — `desktop/scripts/build-helper.sh` builds
   `native/macos-helper` (SwiftPM release, arm64) into
   `desktop/build/macos-helper/macos-helper`. `prepare-resources.sh` invokes it;
   `electron-builder.yml` packs it under `Resources/macos-helper/` (matches
   `resolveHelperBinary()`). `build/entitlements.plist` documents that the
   on-device model (`SystemLanguageModel.default`) and notification centre need
   **no** Hardened Runtime / developer entitlements beyond the existing Electron
   JIT set + nested signing. Lean reference plist:
   `build/entitlements.helper.plist`.
2. **5.2** — Clean-machine procedure added to `desktop/docs/signing.md`
   (codesign Hardened Runtime on the nested helper, `/health` + `/availability`
   after launch). **Not executed here** — Apple `CSC_*` / notarization secrets
   are unavailable in this environment.
3. **5.3** — `.github/workflows/desktop.yml` builds + tests the Swift package on
   PRs, asserts the packed helper path, and builds the helper via
   `pnpm run build` → `prepare-resources` on release. Path filter includes
   `native/macos-helper/**`.

## Verification

1. `bash desktop/scripts/build-helper.sh` — arm64 Mach-O at
   `desktop/build/macos-helper/macos-helper`.
2. `pnpm --filter @aprovan/desktop build:main` / `test` / `check-types` —
   80 passed.
3. `swift test --package-path native/macos-helper` — 20 passed.
4. `CSC_IDENTITY_AUTO_DISCOVERY=false` electron-builder `--dir` with resource
   placeholders — packs
   `Aprovan.app/Contents/Resources/macos-helper/macos-helper`; unsigned skip as
   expected. Manual smoke: packaged binary serves `{"ok":true}` on `/health`.

## Blockers / follow-ups

- Configure Apple secrets in `desktop/docs/signing.md`, ship a notarized build,
  then run the **Helper under Hardened Runtime** checklist (task 5.2) on a clean
  Mac before external distribution.
- Optional later: `afterSign` re-sign of the helper alone with
  `entitlements.helper.plist` for least privilege (today it inherits the Electron
  JIT entitlements via `entitlementsInherit` — harmless).

## Deviations

- 5.2 confirmed via documented Gatekeeper/helper procedure (same pattern as
  desktop-shell 7.5), not a live notarized run.
- No App Sandbox; no invented Apple credentials.

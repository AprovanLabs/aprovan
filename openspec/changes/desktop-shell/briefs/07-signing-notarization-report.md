# Report: Signing, notarization, and shell updates

## What was built

Stream 7 lands Hardened Runtime packaging, notarization CI scaffolding, and a
shell auto-updater on a signed feed independent of OTA renderer bundles (D4/D6):

1. **7.1** — `desktop/build/entitlements.plist` declares JIT, unsigned
   executable memory, and `disable-library-validation` for Electron + the
   bundled Node/gateway helpers. **App Sandbox is intentionally absent.**
   `desktop/electron-builder.yml` enables `hardenedRuntime`, wires those
   entitlements (and inherit), targets macOS 14+ arm64 dmg+zip.
2. **7.2** — `.github/workflows/desktop.yml` release job requires
   `CSC_*` + Apple notarization credentials, runs `pnpm dist` (electron-builder
   `notarize: true` staples on success), uploads artifacts / GitHub Release on
   `desktop-v*` tags. PR job smoke-packs an unsigned `--dir` build.
3. **7.3** — `desktop/src/shell-updater.ts` starts `electron-updater` against
   the generic feed `https://releases.aprovan.com/desktop` (overridable via
   `DESKTOP_SHELL_UPDATE_FEED_URL`). Prompted quit-and-install; no-op when
   unpackaged. Wired from `main.ts` after window create.
4. **7.4** — `desktop/docs/signing.md` documents CI-only
   `BUNDLE_SIGNING_PRIVATE_KEY`, Apple secrets, and that rotating the pinned
   public key in `bundle-public-key.ts` **requires a shell update**. Workflow
   warns if the bundle key secret is missing.
5. **7.5** — Clean-machine Gatekeeper procedure documented in
   `desktop/docs/signing.md` (`spctl` / `stapler` / `codesign`). **Not executed
   here** — Apple signing secrets are unavailable in this environment.

## Verification

1. `pnpm --filter @aprovan/desktop build:main` — passed.
2. `pnpm --filter @aprovan/desktop test` — 47 passed (includes 4 shell-updater).
3. `pnpm --filter @aprovan/desktop check-types` — passed.
4. `CSC_IDENTITY_AUTO_DISCOVERY=false pnpm --filter @aprovan/desktop dist:dir`
   (with placeholder extraResources) — packaged
   `desktop/release/mac-arm64/Aprovan.app` unsigned; signing/notarization
   skipped as expected without secrets.

## Blockers / follow-ups

- Configure GitHub secrets listed in `desktop/docs/signing.md` before the first
  external build; then run the 7.5 Gatekeeper checklist on a clean Mac.
- Generate the production Ed25519 pair in CI, replace the test pin in
  `bundle-public-key.ts`, and store the private half only as
  `BUNDLE_SIGNING_PRIVATE_KEY`.
- Point `releases.aprovan.com/desktop` (or override the feed URL) at a host that
  serves `latest-mac.yml` + signed zip/dmg from the release job.
- Stream 8 will fold signing notes into `docs/desktop.md`.

## Deviations

- Production public key pin remains the stream-5 test key until CI generates
  the release pair (inventing a key here would contradict “CI only”).
- `electron` moved to `devDependencies` (electron-builder requirement);
  `electron-updater` stays in `dependencies`.

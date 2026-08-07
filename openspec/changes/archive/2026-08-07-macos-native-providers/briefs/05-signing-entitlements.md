# Brief: Signing and entitlements for helper

## Mission

Sign the Swift helper as part of the app bundle; declare entitlements for on-device model + notification centre; add helper Swift build to release workflow; document/confirm Hardened Runtime start in notarized build (or verification procedure if Apple secrets unavailable).

## Read first

tasks §5, tech-plan, desktop/build/entitlements.plist, desktop/electron-builder.yml, .github/workflows/desktop.yml, desktop/docs/signing.md, native/macos-helper

## Depends-on

Streams 2, 3, 4 merged.

## Tasks

5.1–5.3 from tasks.md

## Verify

pnpm --filter @aprovan/desktop dist (unsigned OK if secrets missing); document 5.2 Gatekeeper/helper procedure if cannot run live.

## Constraints

Touches: desktop/build/entitlements.plist, desktop/electron-builder.yml, .github/workflows/desktop.yml, native/macos-helper packaging as needed.
Do not invent Apple credentials.

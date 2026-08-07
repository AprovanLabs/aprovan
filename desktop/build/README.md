# Build outputs for the desktop shell (gitignored except this file + entitlements).
#
# Produced by `desktop/scripts/prepare-resources.sh`:
#
#   bundles/<version>/chat/   — renderer (Vite dist from client/web, under /chat/)
#   bundles/active            — symlink → current version
#   gateway/                  — `pnpm --prod deploy` of @aprovan/workspace (+ schema)
#   runtime/node-v…/          — stock Node matching Dockerfile NODE_VERSION
#   runtime/node              — symlink → current runtime
#   macos-helper/macos-helper — Swift release binary (native/macos-helper)
#   models/ggml-tiny.en.bin  — bundled STT default (fetch-stt-models.sh; ~75 MiB, gitignored)
#
# Packaging (desktop-shell stream 7 + macos-native-providers stream 5):
#   entitlements.plist        — Hardened Runtime entitlements (no App Sandbox)
#   entitlements.helper.plist — lean reference entitlements for the Swift helper
#   ../electron-builder.yml   — macOS arm64 dmg/zip, notarize, shell update feed
#   ../release/               — electron-builder output (gitignored)
#
# Signing / key rotation / Gatekeeper + helper checks: see `desktop/docs/signing.md`.
#
# Application Support layout (runtime, not here) is created by
# `ensureAppSupportLayout` — see tech-plan on-disk layout.

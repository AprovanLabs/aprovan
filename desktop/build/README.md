# Build outputs for the desktop shell (gitignored except this file + entitlements).
#
# Produced by `desktop/scripts/prepare-resources.sh`:
#
#   bundles/<version>/chat/   — renderer (Vite dist from client/web, under /chat/)
#   bundles/active            — symlink → current version
#   gateway/                  — `pnpm --prod deploy` of @aprovan/workspace (+ schema)
#   runtime/node-v…/          — stock Node matching Dockerfile NODE_VERSION
#   runtime/node              — symlink → current runtime
#
# Packaging (stream 7):
#   entitlements.plist        — Hardened Runtime entitlements (no App Sandbox)
#   ../electron-builder.yml   — macOS arm64 dmg/zip, notarize, shell update feed
#   ../release/               — electron-builder output (gitignored)
#
# Signing / key rotation / Gatekeeper checks: see `desktop/docs/signing.md`.
#
# Application Support layout (runtime, not here) is created by
# `ensureAppSupportLayout` — see tech-plan on-disk layout.

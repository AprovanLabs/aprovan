# Build outputs for the desktop shell (gitignored except this file).
#
# Produced by `desktop/scripts/prepare-resources.sh`:
#
#   bundles/<version>/chat/   — renderer (Vite dist from client/web, under /chat/)
#   bundles/active            — symlink → current version
#   gateway/                  — `pnpm --prod deploy` of @aprovan/workspace (+ schema)
#   runtime/node-v…/          — stock Node matching Dockerfile NODE_VERSION
#   runtime/node              — symlink → current runtime
#
# Application Support layout (runtime, not here) is created by
# `ensureAppSupportLayout` — see tech-plan on-disk layout.

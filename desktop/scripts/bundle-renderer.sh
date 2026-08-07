#!/usr/bin/env bash
# 2.1 — Produce the renderer bundle from the existing client/web build.
# No desktop-only fork: same @aprovan/patchwork-web Vite output the website ships.
#
# Layout mirrors production's `/chat/` base: assets live under bundles/<ver>/chat/
# so absolute `/chat/…` URLs resolve under app://bundle.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

require_cmd pnpm

WEB_DIST="$REPO_ROOT/client/web/dist"
VERSION="${RENDERER_BUNDLE_VERSION:-$(git -C "$REPO_ROOT" rev-parse --short=12 HEAD 2>/dev/null || echo "0.0.0-dev")}"
STAGE="$RENDERER_STAGING/$VERSION"

log "building @aprovan/patchwork-web (APROVAN_ENV=off)"
(
  cd "$REPO_ROOT"
  APROVAN_ENV=off pnpm --filter @aprovan/patchwork-web... run build
)

[[ -f "$WEB_DIST/index.html" ]] || die "expected $WEB_DIST/index.html after web build"

log "staging renderer bundle $VERSION → $STAGE/chat"
rm -rf "$STAGE"
mkdir -p "$STAGE/chat"
# Copy the Vite dist verbatim under chat/ — same files the website serves at /chat/.
cp -R "$WEB_DIST"/. "$STAGE/chat/"

# Fingerprint for BundleInfo / future BundleManager.
(
  cd "$STAGE"
  find chat -type f | sort | while IFS= read -r f; do
    shasum -a 256 "$f"
  done
) >"$STAGE/SHA256SUMS"

SHA="$(
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$STAGE/SHA256SUMS" | awk '{print $1}'
  else
    sha256sum "$STAGE/SHA256SUMS" | awk '{print $1}'
  fi
)"
printf '%s\n' "$VERSION" >"$STAGE/VERSION"
printf '%s\n' "$SHA" >"$STAGE/SHA256"

# Seed the active app:// bundle directory used by the unpackaged shell.
log "seeding active bundle at $ACTIVE_BUNDLE_SEED"
rm -rf "$ACTIVE_BUNDLE_SEED"
mkdir -p "$ACTIVE_BUNDLE_SEED"
cp -R "$STAGE/chat" "$ACTIVE_BUNDLE_SEED/chat"
# Keep a root index that points at the shared client (app:// loads chat/index.html).
cat >"$ACTIVE_BUNDLE_SEED/index.html" <<EOF
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=./chat/index.html" />
    <title>Aprovan</title>
  </head>
  <body>
    <p><a href="./chat/index.html">Open Aprovan</a></p>
  </body>
</html>
EOF

# Point build/bundles/active at this version (symlink; swap is a rename later).
mkdir -p "$RENDERER_STAGING"
ln -sfn "$VERSION" "$RENDERER_STAGING/active"

log "renderer bundle ready: $VERSION ($SHA)"

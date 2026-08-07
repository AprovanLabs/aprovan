#!/usr/bin/env bash
# Orchestrate stream-2 resource preparation for @aprovan/desktop.
# Called from `pnpm build` after tsup compiles main/preload.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

# Optional fast path for iteration on main-process TypeScript only.
if [[ "${DESKTOP_SKIP_RESOURCES:-}" == "1" ]]; then
  log "DESKTOP_SKIP_RESOURCES=1 — skipping renderer/gateway resource prep"
  exit 0
fi

"$SCRIPT_DIR/bundle-renderer.sh"
"$SCRIPT_DIR/vendor-gateway.sh"
"$SCRIPT_DIR/assert-gateway.sh"
"$SCRIPT_DIR/seed-esm.sh"
"$SCRIPT_DIR/build-helper.sh"

log "desktop resources ready under $BUILD_DIR"

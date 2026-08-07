#!/usr/bin/env bash
# 2.2 — Vendor the gateway artifact exactly as the Dockerfile's `pnpm deploy`
# step produces it, plus a stock Node runtime for the target architecture (D2).

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

require_cmd pnpm
require_cmd curl
require_cmd tar

DF_NODE="$(dockerfile_node_version)"
if [[ "$DF_NODE" != "$NODE_VERSION" ]]; then
  die "NODE_VERSION=$NODE_VERSION does not match Dockerfile ARG NODE_VERSION=$DF_NODE"
fi

PLATFORM="$(node_dist_platform)"
NODE_DIR="$RUNTIME_VENDOR/node-v${NODE_VERSION}-${PLATFORM}"
NODE_BIN="$NODE_DIR/bin/node"
TARBALL="node-v${NODE_VERSION}-${PLATFORM}.tar.gz"
TARBALL_URL="https://nodejs.org/dist/v${NODE_VERSION}/${TARBALL}"

mkdir -p "$BUILD_DIR" "$RUNTIME_VENDOR"

# --- stock Node runtime -------------------------------------------------------
if [[ -x "$NODE_BIN" ]]; then
  log "stock Node already present: $NODE_BIN"
else
  log "downloading stock Node $NODE_VERSION ($PLATFORM)"
  TMP="$(mktemp -d)"
  trap 'rm -rf "$TMP"' EXIT
  curl -fsSL "$TARBALL_URL" -o "$TMP/$TARBALL"
  # Verify against official SHASUMS256.txt when available.
  if curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/SHASUMS256.txt" -o "$TMP/SHASUMS256.txt"; then
    (
      cd "$TMP"
      grep "  ${TARBALL}\$" SHASUMS256.txt | shasum -a 256 -c -
    ) || die "Node tarball checksum mismatch"
  fi
  tar -xzf "$TMP/$TARBALL" -C "$RUNTIME_VENDOR"
  [[ -x "$NODE_BIN" ]] || die "node binary missing after extract: $NODE_BIN"
  rm -rf "$TMP"
  trap - EXIT
fi

# --- gateway deploy (mirrors Dockerfile builder stage) ------------------------
log "building @aprovan/workspace (same filter as Dockerfile)"
(
  cd "$REPO_ROOT"
  pnpm --filter @aprovan/workspace... run build
)

log "pnpm --prod deploy → $GATEWAY_VENDOR"
rm -rf "$GATEWAY_VENDOR"
mkdir -p "$GATEWAY_VENDOR"
(
  cd "$REPO_ROOT"
  # Identical to: RUN pnpm --filter @aprovan/workspace --prod deploy /srv/workspace
  pnpm --filter @aprovan/workspace --prod deploy "$GATEWAY_VENDOR"
)

# Identical to Dockerfile's schema COPY fallback.
[[ -f "$SCHEMA_SRC" ]] || die "missing schema: $SCHEMA_SRC"
mkdir -p "$GATEWAY_VENDOR/dist/db"
cp "$SCHEMA_SRC" "$GATEWAY_VENDOR/dist/db/dsql-schema.sql"

[[ -f "$GATEWAY_VENDOR/dist/cli.js" ]] || die "deploy missing dist/cli.js"
[[ -f "$GATEWAY_VENDOR/package.json" ]] || die "deploy missing package.json"

# pnpm sometimes leaves dangling bin stubs under server/workspace/desktop when
# the deploy target is elsewhere in the monorepo — remove the noise.
rm -rf "$REPO_ROOT/server/workspace/desktop"

# Record provenance for assert-gateway / supervisors.
cat >"$GATEWAY_VENDOR/.aprovan-gateway-vendor.json" <<EOF
{
  "nodeVersion": "$NODE_VERSION",
  "platform": "$PLATFORM",
  "nodeBinary": "runtime/node-v${NODE_VERSION}-${PLATFORM}/bin/node",
  "deployedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "dockerfile": "server/workspace/Dockerfile",
  "entry": ["node", "dist/cli.js", "start"]
}
EOF

# Convenience symlink for the supervisor (stream 3).
ln -sfn "node-v${NODE_VERSION}-${PLATFORM}" "$RUNTIME_VENDOR/node"

log "gateway vendored at $GATEWAY_VENDOR"
log "runtime at $NODE_BIN ($("$NODE_BIN" -v))"

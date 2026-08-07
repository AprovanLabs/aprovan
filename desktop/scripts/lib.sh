#!/usr/bin/env bash
# Shared constants and helpers for desktop resource scripts.
# NODE_VERSION must stay in lockstep with server/workspace/Dockerfile.

set -euo pipefail

DESKTOP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$DESKTOP_ROOT/.." && pwd)"

# Keep aligned with `ARG NODE_VERSION` in server/workspace/Dockerfile.
NODE_VERSION="${NODE_VERSION:-22.12.0}"
PNPM_VERSION="${PNPM_VERSION:-9.15.9}"

BUILD_DIR="$DESKTOP_ROOT/build"
RENDERER_STAGING="$BUILD_DIR/bundles"
GATEWAY_VENDOR="$BUILD_DIR/gateway"
RUNTIME_VENDOR="$BUILD_DIR/runtime"
ACTIVE_BUNDLE_SEED="$DESKTOP_ROOT/resources/bundle"

DOCKERFILE="$REPO_ROOT/server/workspace/Dockerfile"
SCHEMA_SRC="$REPO_ROOT/server/workspace/src/db/dsql-schema.sql"

log() { printf '\033[1;34m[desktop]\033[0m %s\n' "$*" >&2; }
die() { printf '\033[1;31m[desktop]\033[0m %s\n' "$*" >&2; exit 1; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "required command not found: $1"
}

# Read ARG NODE_VERSION=… from the workspace Dockerfile.
dockerfile_node_version() {
  local value
  value="$(
    sed -nE 's/^ARG NODE_VERSION=([0-9]+\.[0-9]+\.[0-9]+).*/\1/p' "$DOCKERFILE" | head -n1
  )"
  [[ -n "$value" ]] || die "could not parse ARG NODE_VERSION from $DOCKERFILE"
  echo "$value"
}

# Host → official Node dist platform triple (desktop floor is darwin-arm64).
node_dist_platform() {
  local os arch
  os="$(uname -s | tr '[:upper:]' '[:lower:]')"
  arch="$(uname -m)"
  case "$os-$arch" in
    darwin-arm64) echo "darwin-arm64" ;;
    darwin-x86_64) die "Intel Macs are not supported (desktop platform floor)" ;;
    linux-aarch64 | linux-arm64) echo "linux-arm64" ;;
    linux-x86_64) echo "linux-x64" ;;
    *) die "unsupported host for stock Node vendoring: $os/$arch" ;;
  esac
}

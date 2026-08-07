#!/usr/bin/env bash
# 2.3 — Assert the vendored gateway matches the container build.
#
# Compares the deployable gateway artifact the Dockerfile produces:
#   - top-level package.json (name, version, type, bin, dependencies)
#   - dist/** (compiled JS + schema)
#
# Native addon binaries under node_modules differ by OS (darwin vs linux) and
# are out of scope — D2 deliberately runs them on stock Node for the host.
#
# Prefers a live container extract when Docker is available; otherwise compares
# against a fresh local `pnpm --prod deploy` using the same recipe.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

if [[ "${DESKTOP_SKIP_GATEWAY_ASSERT:-}" == "1" ]]; then
  log "DESKTOP_SKIP_GATEWAY_ASSERT=1 — skipping gateway parity check"
  exit 0
fi

[[ -d "$GATEWAY_VENDOR" ]] || die "vendored gateway missing; run vendor-gateway.sh first"
[[ -f "$GATEWAY_VENDOR/dist/cli.js" ]] || die "vendored gateway incomplete (no dist/cli.js)"

# Recipe lockstep with Dockerfile (always).
DF_NODE="$(dockerfile_node_version)"
[[ "$DF_NODE" == "$NODE_VERSION" ]] || die "NODE_VERSION drift vs Dockerfile ($NODE_VERSION != $DF_NODE)"
grep -q 'pnpm --filter @aprovan/workspace --prod deploy' "$DOCKERFILE" \
  || die "Dockerfile no longer uses pnpm --prod deploy for @aprovan/workspace"
grep -q 'dsql-schema.sql' "$DOCKERFILE" \
  || die "Dockerfile no longer copies dsql-schema.sql"

artifact_manifest() {
  local root="$1"
  (
    cd "$root"
    # package.json identity — ignore scripts/devDeps that deploy may strip.
    if [[ -f package.json ]]; then
      node -e '
        const p = JSON.parse(require("fs").readFileSync("package.json","utf8"));
        const pick = {
          name: p.name,
          version: p.version,
          type: p.type,
          bin: p.bin,
          main: p.main,
          dependencies: p.dependencies ?? {},
        };
        process.stdout.write("package.json\t" + JSON.stringify(pick) + "\n");
      '
    fi
    if [[ -d dist ]]; then
      find dist -type f | sort | while IFS= read -r f; do
        printf 'dist:%s\t%s\n' "$f" "$(shasum -a 256 "$f" | awk '{print $1}')"
      done
    fi
  )
}

compare_manifests() {
  local left="$1" right="$2" label="$3"
  if ! diff -u "$left" "$right"; then
    die "gateway artifact differs from $label (see diff above)"
  fi
  log "gateway artifact matches $label"
}

docker_available() {
  command -v docker >/dev/null 2>&1 || return 1
  docker info >/dev/null 2>&1
}

if docker_available; then
  ASSERT_IMAGE="${DESKTOP_GATEWAY_ASSERT_IMAGE:-ghcr.io/aprovanlabs/workspace}"
  ASSERT_TAG="${DESKTOP_GATEWAY_ASSERT_TAG:-desktop-assert}"
  log "building container image for assertion ($ASSERT_IMAGE:$ASSERT_TAG)"
  IMAGE="$ASSERT_IMAGE" TAG="$ASSERT_TAG" "$REPO_ROOT/scripts/image.sh" build

  EXTRACT="$(mktemp -d)"
  trap 'rm -rf "$EXTRACT"' EXIT
  IMAGE="$ASSERT_IMAGE" TAG="$ASSERT_TAG" DEST="$EXTRACT/workspace" \
    "$REPO_ROOT/scripts/image.sh" extract-gateway

  artifact_manifest "$GATEWAY_VENDOR" >"$EXTRACT/vendor.sha"
  artifact_manifest "$EXTRACT/workspace" >"$EXTRACT/container.sha"
  compare_manifests "$EXTRACT/vendor.sha" "$EXTRACT/container.sha" "container /srv/workspace"
  rm -rf "$EXTRACT"
  trap - EXIT
  exit 0
fi

log "docker unavailable — asserting against a fresh local pnpm deploy (same Dockerfile recipe)"
REF="$(mktemp -d)"
trap 'rm -rf "$REF"' EXIT
(
  cd "$REPO_ROOT"
  pnpm --filter @aprovan/workspace --prod deploy "$REF/workspace"
)
mkdir -p "$REF/workspace/dist/db"
cp "$SCHEMA_SRC" "$REF/workspace/dist/db/dsql-schema.sql"

artifact_manifest "$GATEWAY_VENDOR" >"$REF/vendor.sha"
artifact_manifest "$REF/workspace" >"$REF/ref.sha"
compare_manifests "$REF/vendor.sha" "$REF/ref.sha" "fresh local pnpm deploy"
log "note: full container parity requires Docker; recipe + local deploy match"
rm -rf "$REF"
trap - EXIT

#!/usr/bin/env bash
#
# Build and publish ghcr.io/aprovanlabs/workspace.
#
# The same buildx invocation runs here and in CI (.github/workflows/
# workspace-image.yml), so a locally published image is indistinguishable from
# one main produced — there is no "real" build path you can only reach through
# GitHub.
#
# Usage:
#   scripts/image.sh build              # local arch only, tagged :dev
#   scripts/image.sh build --multi      # both architectures, load unsupported
#   scripts/image.sh push               # both architectures → GHCR
#   scripts/image.sh run                # build :dev and run it on :4000
#
# Publishing needs a GitHub token with `write:packages`:
#   echo "$GITHUB_TOKEN" | docker login ghcr.io -u <you> --password-stdin
#
# Config:
#   IMAGE       full image name      (default: ghcr.io/aprovanlabs/workspace)
#   TAG         explicit tag         (default: the short commit sha)
#   PLATFORMS   buildx platform list (default: linux/amd64,linux/arm64)

set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$HERE/.." && pwd)"

IMAGE="${IMAGE:-ghcr.io/aprovanlabs/workspace}"
PLATFORMS="${PLATFORMS:-linux/amd64,linux/arm64}"
DOCKERFILE="server/workspace/Dockerfile"

log() { printf '\033[1;34m[image]\033[0m %s\n' "$*" >&2; }
die() { printf '\033[1;31m[image]\033[0m %s\n' "$*" >&2; exit 1; }

resolve_tag() {
  if [[ -n "${TAG:-}" ]]; then
    echo "$TAG"
  else
    git -C "$REPO_ROOT" rev-parse --short=12 HEAD
  fi
}

# ECS resolves the running image from an immutable sha tag, never :latest, so a
# rollback is "point the parameter at the previous sha" rather than a rebuild.
# `latest` is published alongside purely for `docker run`.
cmd_push() {
  local tag
  tag="$(resolve_tag)"
  command -v docker >/dev/null || die "docker is not installed"
  log "pushing $IMAGE:$tag ($PLATFORMS)"
  docker buildx build \
    --file "$REPO_ROOT/$DOCKERFILE" \
    --platform "$PLATFORMS" \
    --tag "$IMAGE:$tag" \
    --tag "$IMAGE:latest" \
    --push \
    "$REPO_ROOT"
  log "published $IMAGE:$tag"
  echo "$tag"
}

cmd_build() {
  local tag="${TAG:-dev}"
  command -v docker >/dev/null || die "docker is not installed"
  if [[ "${1:-}" == "--multi" ]]; then
    # A multi-arch result is a manifest list, which the local daemon cannot
    # load — build it to verify both architectures compile, then discard.
    log "building $IMAGE:$tag for $PLATFORMS (verification only, not loaded)"
    docker buildx build \
      --file "$REPO_ROOT/$DOCKERFILE" \
      --platform "$PLATFORMS" \
      --tag "$IMAGE:$tag" \
      "$REPO_ROOT"
  else
    log "building $IMAGE:$tag for the local architecture"
    docker buildx build \
      --file "$REPO_ROOT/$DOCKERFILE" \
      --tag "$IMAGE:$tag" \
      --load \
      "$REPO_ROOT"
  fi
  log "built $IMAGE:$tag"
}

cmd_run() {
  local tag="${TAG:-dev}"
  cmd_build
  # server/workspace/data, not the repo-root data/ — that one holds committed
  # OpenAPI specs and is emphatically not scratch space.
  local data_dir="$REPO_ROOT/server/workspace/data"
  log "running $IMAGE:$tag on http://localhost:4000 (data in server/workspace/data)"
  mkdir -p "$data_dir"
  exec docker run --rm -it \
    -p 4000:4000 \
    -v "$data_dir:/data" \
    "$IMAGE:$tag"
}

case "${1:-}" in
  build) shift; cmd_build "$@" ;;
  push) shift; cmd_push "$@" ;;
  run) shift; cmd_run "$@" ;;
  *) echo "usage: scripts/image.sh [build [--multi]|push|run]" >&2; exit 2 ;;
esac

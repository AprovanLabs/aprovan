#!/usr/bin/env bash
# Build the signed-in-bundle Swift helper (macos-native-providers stream 5).
# Produces desktop/build/macos-helper/macos-helper for electron-builder
# extraResources → Resources/macos-helper/macos-helper (see paths.ts).

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

HELPER_PKG="$REPO_ROOT/native/macos-helper"
HELPER_OUT="$BUILD_DIR/macos-helper"
HELPER_BIN="$HELPER_OUT/macos-helper"

require_cmd swift

[[ -f "$HELPER_PKG/Package.swift" ]] || die "missing Swift package at $HELPER_PKG"

log "building macos-helper (release)"
(
  cd "$HELPER_PKG"
  # arm64 only — matches desktop platform floor / electron-builder.yml.
  swift build -c release --arch arm64 --product macos-helper
)

BUILT="$(
  cd "$HELPER_PKG"
  swift build -c release --arch arm64 --product macos-helper --show-bin-path
)/macos-helper"

[[ -x "$BUILT" ]] || die "release helper binary missing at $BUILT"

rm -rf "$HELPER_OUT"
mkdir -p "$HELPER_OUT"
# Copy the real binary (not the SwiftPM symlink) so packaging is self-contained.
cp -f "$BUILT" "$HELPER_BIN"
chmod +x "$HELPER_BIN"

log "macos-helper ready: $HELPER_BIN"

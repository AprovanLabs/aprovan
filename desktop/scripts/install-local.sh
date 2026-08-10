#!/usr/bin/env bash
# Copy the freshly packaged unsigned .app into /Applications so Dock /
# Spotlight launches match the last `package:local` build.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC="$ROOT/release/mac-arm64/Aprovan.app"
DEST="/Applications/Aprovan.app"

[[ -d "$SRC" ]] || {
  echo "missing $SRC — run package:local first" >&2
  exit 1
}

# Quit a running install so ditto can replace the bundle.
if pgrep -xq "Aprovan" 2>/dev/null; then
  osascript -e 'tell application "Aprovan" to quit' >/dev/null 2>&1 || true
  sleep 1
fi

rm -rf "$DEST"
ditto "$SRC" "$DEST"
echo "Installed $DEST"
open "$DEST"

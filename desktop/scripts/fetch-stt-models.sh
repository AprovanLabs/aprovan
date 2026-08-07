#!/usr/bin/env bash
# Download the bundled STT default (whisper-tiny.en / ggml-tiny.en.bin) into
# desktop/build/models with a published SHA-1 pin (ADR 0001 / whisper.cpp).
#
# Weights are ~75 MiB — do NOT commit the binary. Build/packaging fetches them
# here; electron-builder packs build/models → Resources/models.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

MODEL_ID="${STT_MODEL_ID:-whisper-tiny.en}"
FILENAME="${STT_MODEL_FILENAME:-ggml-tiny.en.bin}"
# whisper.cpp models README SHA for tiny.en (also cited in ADR 0001).
EXPECTED_SHA1="${STT_MODEL_SHA1:-c78c86eb1a8faa21b369bcd33207cc90d64ae9df}"
UPSTREAM="${STT_MODEL_URL:-https://huggingface.co/ggerganov/whisper.cpp/resolve/main/${FILENAME}}"

OUT_DIR="${1:-$BUILD_DIR/models}"
mkdir -p "$OUT_DIR"

MANIFEST="$OUT_DIR/manifest.json"
TARGET="$OUT_DIR/$FILENAME"

write_manifest() {
  local size
  size="$(wc -c <"$TARGET" | tr -d ' ')"
  cat >"$MANIFEST" <<EOF
{
  "id": "$MODEL_ID",
  "filename": "$FILENAME",
  "sha1": "$EXPECTED_SHA1",
  "sizeBytes": $size,
  "source": "$UPSTREAM",
  "license": "MIT",
  "bundled": true
}
EOF
}

if [[ -f "$TARGET" ]]; then
  actual="$(shasum -a 1 "$TARGET" | awk '{print $1}')"
  if [[ "$actual" == "$EXPECTED_SHA1" ]]; then
    log "STT model already present and hash-ok: $TARGET"
    write_manifest
    exit 0
  fi
  log "STT model hash mismatch — re-downloading ($actual != $EXPECTED_SHA1)"
  rm -f "$TARGET"
fi

if [[ "${DESKTOP_SKIP_STT_MODELS:-}" == "1" ]]; then
  log "DESKTOP_SKIP_STT_MODELS=1 — writing placeholder README only"
  cat >"$OUT_DIR/README.md" <<'EOF'
# STT models (download skipped)

Set `DESKTOP_SKIP_STT_MODELS=0` (default) and re-run
`desktop/scripts/fetch-stt-models.sh` to download `ggml-tiny.en.bin`.
EOF
  exit 0
fi

log "downloading $MODEL_ID → $TARGET"
tmp="$TARGET.partial"
curl -L --fail --retry 5 --retry-delay 2 -o "$tmp" "$UPSTREAM"
actual="$(shasum -a 1 "$tmp" | awk '{print $1}')"
if [[ "$actual" != "$EXPECTED_SHA1" ]]; then
  rm -f "$tmp"
  die "STT model SHA-1 mismatch: expected $EXPECTED_SHA1, got $actual"
fi
mv -f "$tmp" "$TARGET"
write_manifest

# Keep a short README next to the binary (gitignored *.bin; README may be committed).
cat >"$OUT_DIR/README.md" <<EOF
# STT models (build output)

Bundled default: **$MODEL_ID** → \`$FILENAME\` (MIT, ADR 0001).

- Fetched by \`desktop/scripts/fetch-stt-models.sh\` (hash-pinned SHA-1 \`$EXPECTED_SHA1\`).
- Not committed: ~75 MiB weights stay out of git; CI/packaging downloads at build.
- Packaged via electron-builder \`extraResources\` → \`Resources/models/\`.
- Helper loads this at start (\`--models-dir\` / \`Resources/models\`).
EOF

log "STT model ready: $TARGET"

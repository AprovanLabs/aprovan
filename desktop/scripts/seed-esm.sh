#!/usr/bin/env bash
# Generate the ESM seed manifest from default-workspace widget deps and
# prefetch package bodies (including transitive esm.sh redirects) into
# resources/esm-seed/ so first-run offline mounts work.
#
# Ship form: resources/esm-seed.tar.gz (extracted here and by prepare-resources).
# Prefetch is skipped when DESKTOP_SKIP_ESM_FETCH=1 — then we extract the
# committed tarball if present.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

SEED_DIR="${1:-$DESKTOP_ROOT/resources/esm-seed}"
SEED_TAR="${SEED_TAR:-$DESKTOP_ROOT/resources/esm-seed.tar.gz}"
mkdir -p "$SEED_DIR"

log "generating ESM seed manifest → $SEED_DIR"
(
  cd "$REPO_ROOT"
  if node --experimental-strip-types "$DESKTOP_ROOT/src/seed-deps.ts" "$SEED_DIR" 2>/dev/null; then
    :
  else
    pnpm exec tsx "$DESKTOP_ROOT/src/seed-deps.ts" "$SEED_DIR"
  fi
)

if [[ "${DESKTOP_SKIP_ESM_FETCH:-}" == "1" ]]; then
  if [[ -f "$SEED_TAR" ]]; then
    log "extracting committed seed tarball → $SEED_DIR"
    # Preserve freshly generated manifest over the archived one.
    tmp_manifest="$(mktemp)"
    cp "$SEED_DIR/manifest.json" "$tmp_manifest"
    tar xzf "$SEED_TAR" -C "$(dirname "$SEED_DIR")"
    mv "$tmp_manifest" "$SEED_DIR/manifest.json"
  else
    log "DESKTOP_SKIP_ESM_FETCH=1 and no $SEED_TAR — manifest only"
  fi
  exit 0
fi

MANIFEST="$SEED_DIR/manifest.json"
[[ -f "$MANIFEST" ]] || die "missing $MANIFEST"

log "prefetching seed packages (+ transitive) from https://esm.sh"
python3 - <<'PY' "$MANIFEST" "$SEED_DIR"
import json, re, sys, urllib.parse, urllib.request
from pathlib import Path

manifest_path, seed_dir = Path(sys.argv[1]), Path(sys.argv[2])
deps = json.loads(manifest_path.read_text())["deps"]
queue = [d["specifier"] for d in deps]
seen = set()
ok = 0

REF_RE = re.compile(
    r"""(?:https?:)?//esm\.sh/([^"'\\\s]+)|"""
    r"""["']/esm/([^"'\\\s]+)["']|"""
    r"""["']/((?:@[^/"']+/)?[^/"']+@[^"'\\\s]+)["']"""
)

def cache_key(spec: str) -> str:
    return urllib.parse.quote(spec, safe="-._@%")

def fetch(spec: str):
    url = f"https://esm.sh/{spec}"
    try:
        with urllib.request.urlopen(url, timeout=60) as resp:
            return resp.read(), (resp.headers.get("Content-Type") or "application/javascript")
    except Exception as e:
        print(f"  skip {spec}: {e}", file=sys.stderr)
        return None

def rewrite(text: str) -> str:
    text = text.replace("https://esm.sh/", "/esm/").replace("http://esm.sh/", "/esm/")
    text = re.sub(
        r"""([`"'])/(?!esm/)([^"'`\s]+)(["`'])""",
        r"\1/esm/\2\3",
        text,
    )
    return text

while queue:
    spec = queue.pop(0)
    if spec in seen:
        continue
    seen.add(spec)
    result = fetch(spec)
    if result is None:
        continue
    data, ctype = result
    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError:
        text = None
    if text is not None:
        for m in REF_RE.finditer(text):
            nxt = next((g for g in m.groups() if g), None)
            if nxt and nxt not in seen:
                queue.append(nxt)
        data = rewrite(text).encode("utf-8")
    key = cache_key(spec)
    (seed_dir / key).write_bytes(data)
    (seed_dir / f"{key}.meta").write_text(ctype)
    ok += 1
    print(f"  cached {spec}", file=sys.stderr)

print(f"prefetched {ok} seed packages (roots={len(deps)})", file=sys.stderr)
PY

log "packing $SEED_TAR"
tar czf "$SEED_TAR" -C "$(dirname "$SEED_DIR")" "$(basename "$SEED_DIR")"
log "ESM seed ready under $SEED_DIR ($(du -sh "$SEED_DIR" | awk '{print $1}'))"

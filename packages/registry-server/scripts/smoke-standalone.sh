#!/usr/bin/env bash
# Standalone smoke test against the aprovan/registry image:
#   boot → healthz → default tenant → create credential → create profile →
#   grant → dispatch (ephemeral credential path) → MCP list_tools.
#
# Usage: ./smoke-standalone.sh [image-tag]   (default aprovan/registry:dev)
set -euo pipefail

IMAGE="${1:-aprovan/registry:dev}"
PORT="${SMOKE_PORT:-4321}"
NAME="registry-smoke-$$"
BASE="http://127.0.0.1:${PORT}"

cleanup() {
  docker rm -f "$NAME" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "==> booting $IMAGE"
docker run -d --rm --name "$NAME" -p "${PORT}:4000" "$IMAGE" >/dev/null

echo "==> waiting for /healthz"
for i in $(seq 1 60); do
  if curl -fsS "$BASE/healthz" >/dev/null 2>&1; then break; fi
  if [ "$i" = 60 ]; then
    echo "server never became healthy"; docker logs "$NAME" | tail -50; exit 1
  fi
  sleep 1
done
curl -fsS "$BASE/healthz" | grep -q '"ok":true'
echo "    healthy"

echo "==> create credential (auth none → implicit admin of tenant 'default')"
CRED=$(curl -fsS -X POST "$BASE/credentials" \
  -H 'content-type: application/json' \
  -d '{"provider":"github","label":"smoke","payload":{"type":"bearer_token","token":"smoke-token"}}')
echo "$CRED" | grep -q '"provider":"github"'
echo "$CRED" | grep -q '"createdBy":"local"'
CRED_ID=$(echo "$CRED" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).credential.id))")
echo "    credential $CRED_ID"

echo "==> create profile pinned to the credential"
PROFILE=$(curl -fsS -X POST "$BASE/profiles" \
  -H 'content-type: application/json' \
  -d "{\"name\":\"smoke\",\"target\":{\"kind\":\"provider\",\"provider\":\"github\"},\"credentialId\":\"$CRED_ID\"}")
PROFILE_ID=$(echo "$PROFILE" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s).profile.id))")
echo "    profile $PROFILE_ID"

echo "==> grant the profile to a group"
curl -fsS -X POST "$BASE/profiles/$PROFILE_ID/grants" \
  -H 'content-type: application/json' \
  -d '{"subject":{"kind":"group","id":"smoke-testers"}}' | grep -q '"grant"'
echo "    granted"

echo "==> profile listing shows the profile"
curl -fsS "$BASE/profiles" | grep -q '"name":"smoke"'

echo "==> dispatch refuses an unknown namespace with an actionable error"
UNKNOWN=$(curl -sS -X POST "$BASE/tools/definitely-not-a-provider/op" \
  -H 'content-type: application/json' -d '{"args":{}}')
echo "$UNKNOWN" | grep -q 'Unknown tool namespace'

echo "==> colon namespace refuses with the profile-dispatch hint"
COLON=$(curl -sS -X POST "$BASE/tools/sql:analytics/query" \
  -H 'content-type: application/json' -d '{"args":{}}')
echo "$COLON" | grep -qi 'profile'

echo "==> dispatch executes with an ephemeral request credential"
# `github.meta.root` is a real catalogued operation; the upstream call itself
# may fail (no network guarantees in CI), but the pipeline must classify,
# resolve, and reach the executor — i.e. the error, if any, is an upstream
# HTTP error, never an unknown-namespace/loader error.
DISPATCH=$(curl -sS -X POST "$BASE/tools/github/meta.root" \
  -H 'content-type: application/json' \
  -d '{"args":{},"credential":{"type":"bearer_token","token":"smoke-token"}}')
if echo "$DISPATCH" | grep -q 'Unknown tool namespace\|is not defined by "exports"'; then
  echo "dispatch never reached the executor: $DISPATCH"; exit 1
fi
echo "    dispatched (pipeline reached the executor)"

echo "==> audit recorded the dispatches"
curl -fsS "$BASE/audit" | grep -q '"namespace"'

echo "==> MCP list_tools over streamable HTTP"
MCP=$(curl -fsS -X POST "$BASE/mcp" \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}')
echo "$MCP" | grep -q 'list_tools'
echo "$MCP" | grep -q 'call_tool'
echo "    MCP meta-tools served"

echo "ALL SMOKE CHECKS PASSED"

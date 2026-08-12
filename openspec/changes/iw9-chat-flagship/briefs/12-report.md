# Report: E2E — Presence, invariant 7, and platform-first close-out

**Stream:** 12 · **Branch:** `feat/iw9-chat-e2e-presence` · **Status:** done  
**Final Chat wave** of `iw9-chat-flagship`.

## What shipped

| Path | Role |
|---|---|
| `client/web/e2e/chat-presence.spec.ts` | Two participants online, typing ~4s TTL, disconnect clears roster |
| `client/web/e2e/chat-invariant7-guest-isolation.spec.ts` | Guest zero frames for restricted channel; mid-session revoke filters without reconnect (`retries=0`) |
| `openspec/.../tech-plan.md` | CF-1..CF-5 findings close-out append |
| `openspec/.../tasks.md` + `briefs/12-*.md` | 12.1–12.6 checked off |

## Verify

```bash
export E2E_WORKSPACE_DATA_DIR="$(mktemp -d /tmp/aprovan-e2e-presence-XXXXXX)"
pnpm --filter @aprovan/patchwork-web exec playwright test \
  e2e/chat-presence.spec.ts e2e/chat-invariant7-guest-isolation.spec.ts --retries=0
# ✓ 2 passed

! grep -rn "records\.\(set\|put\|write\)\|vfs\.\(write\|put\)" \
  server/workspace/src/realtime/app-topics.ts
# GREP_GATE_OK (exit 0)

openspec validate iw9-chat-flagship --strict
# Change 'iw9-chat-flagship' is valid
```

Prefer a fresh `E2E_WORKSPACE_DATA_DIR` (SQLite schema flake on reuse).

## Tasks

| Task | Status |
|---|---|
| 12.1 presence + typing + disconnect | done |
| 12.2 grep gate (records/vfs writes in app-topics) | done |
| 12.3 invariant-7 guest isolation (raw capture, retries=0) | done |
| 12.4 mid-session revoke without reconnect | done |
| 12.5 findings / NOTICE / core-touch close-out | done |
| 12.6 openspec validate --strict | done |

## CF findings status (12.5)

| Finding | Close-out |
|---|---|
| CF-1 | On main (#233 + boot #234) |
| CF-2 | On main (#231) |
| CF-3 | Interim held; inv-7 E2E gates delivery |
| CF-4 | Interim held (Wave 2 accepted) |
| CF-5 | On main via iw9-d (#220) + Chat summarize (#236) |

Also confirmed: `client/web/NOTICE` + vendor buzz LICENSE present; stream 8
`RunTransport` on main (#223). Stream 12 adds **no** `server/workspace/src/`
files (`git diff --stat origin/main -- server/workspace/src/` empty for this
PR’s Touches).

## Deviations

1. **Auth-none dual principals** — same as streams 10–11: browser WS is
   `sub: "local"`; presence / guest isolation use in-process broker fake
   Conns + invite facade for the guest principal.
2. **ws-capture** — `attachWsCapture` wired on the guest page; isolation
   assertions use the same `assertZeroMatching` contract over Conn
   deliveries (page WS cannot mint a distinct guest sub).
3. **Presence install seed** — svc-record install (unit-test shape) instead
   of `apps.promote`, so the suite does not trip promote rate limits when
   run after other `@chat` specs on one gateway.
4. **Revoke seam** — `setReadableChannelsForTest` (D14 / stream 11), not a
   missing `updateChannel` tool.

## Change close-out

Wave 2 Chat flagship E2E complete: managed (10), hosted/guest (11),
presence + invariant-7 + findings (12). Platform-first grep gate and
openspec validate green.

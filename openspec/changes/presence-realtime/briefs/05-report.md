# Brief 05 report — Presence integration verification

## PR
https://github.com/AprovanLabs/aprovan/pull/53

## Verify summary

| Check | Result |
| --- | --- |
| `pnpm vitest run tests/realtime-e2e.test.ts` | **2/2 pass** |
| `server/workspace` `pnpm test` | **528 passed** / 7 skipped |
| Root `pnpm typecheck` | pass |
| Guard: `heartbeatPresence` / `PRESENCE_TTL` under `client`/`server` | clean |
| Guard: no WS-5 touch of `/fs/changes` or `startLiveWorkspaceSync` in this diff | clean |
| `npx wscat --version` | 6.1.0 (CLI available) |
| 5.3 deployed tunnel smoke | **deferred** — no gateway/deploy env in this agent run |

### Retirement grep notes (intentional remaining hits)

- `PresencePeer` in `server/workspace/src/realtime/presence.ts` (+ tests) — **new** socket-memory peer type from stream 2, not the retired client heartbeat type.
- `sessions.presence` string only in `chat-sessions.test.ts` retirement assertion (`unknown procedure`).

## What landed (stream 5)

- **`tests/realtime-e2e.test.ts`**: two authenticated sockets (user-a / user-b), tab-shaped subscribe+focus on `notes/plan.md` → mutual joins, snapshot with both users, atomic move to `notes/other.md`, blur leave, disconnect leave; zero `presence:` record keys; reserved-namespace for `doc:` and `fs:`.
- **SessionsPanel**: removed stale comment that referenced the deleted `sessions.presence` heartbeat.
- **Tasks** 5.1–5.3 checked; 5.3 owner checklist below.

## 5.3 Owner smoke checklist (post-deploy)

Run after a deploy that includes streams 1–4:

1. Obtain a workspace member access token.
2. Terminal A:
   ```bash
   npx wscat -c "wss://<gateway-host>/api/gateway/ws" -s aprovan.v1 -s "bearer.<token-a>"
   ```
   Then send:
   ```json
   {"type":"subscribe","topic":"presence:notes/plan.md"}
   {"type":"publish","topic":"presence:notes/plan.md","body":{"action":"focus"}}
   ```
3. Terminal B (different user token, same workspace):
   ```bash
   npx wscat -c "wss://<gateway-host>/api/gateway/ws" -s aprovan.v1 -s "bearer.<token-b>"
   ```
   Subscribe + focus the same topic; confirm A receives a `join` for B and B's subscribe snapshot includes A.
4. Confirm record store gains **no** new `presence:` rows during the session.
5. Close B; A should receive `leave`.

## Blockers

None for merge. Owner should run 5.3 after deploy when tunnel/credentials are available.

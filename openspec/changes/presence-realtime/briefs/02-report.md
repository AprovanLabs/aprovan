# Brief 02 report — Server presence handler + legacy heartbeat removal

## PR
https://github.com/AprovanLabs/aprovan/pull/39

## Verify summary

| Check | Result |
| --- | --- |
| `server/workspace` `pnpm typecheck` | pass |
| `server/workspace` `pnpm test` | **526 passed** / 7 skipped |
| `pnpm vitest run tests/presence.test.ts tests/chat-sessions.test.ts` | pass |
| Guard: no `PRESENCE_PREFIX` / `heartbeatPresence` under `server/workspace/src` | clean |
| CI `verify` on PR | pass |

## What landed (stream 2)

- **`src/realtime/presence.ts`**: `NamespaceHandler` for `presence:<path>` — rejects non-canonical paths (`bad-topic`), exclusive per-connection focus (`focus`/`blur`/disconnect), roster snapshot (includes self), join/leave/update deltas, user-level dedupe across windows, `lastActive` refresh on focus. Socket-memory only.
- **Registration**: `attachRealtime` registers presence as the only v1 namespace.
- **Legacy removal**: deleted `sessions.presence`, `heartbeatPresence`, `PresenceRecord`, `PRESENCE_PREFIX`, `PRESENCE_TTL_MS` from `sessions-service.ts` — unknown procedure 404s.
- **Tests**: `tests/presence.test.ts` (watching≠being-there, atomic move, disconnect leave, snapshot, two-windows-one-join, zero `presence:` record keys); chat-sessions presence case replaced with 404 assertion.

## Notes for stream 4

- Peers drawer stays deleted — do not reintroduce a chat-roster replacement.
- Consume this handler via `RealtimeClient` + `presence:<path>`; filter self client-side for chips.

## Blockers

None for stream 4.

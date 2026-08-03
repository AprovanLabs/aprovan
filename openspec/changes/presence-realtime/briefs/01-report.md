# Brief 01 report — Realtime transport + client library

## PR
https://github.com/AprovanLabs/aprovan/pull/22

## Verify summary

| Check | Result |
| --- | --- |
| `server/workspace` `pnpm typecheck` | pass |
| `server/workspace` `pnpm build` | pass |
| `pnpm vitest run tests/realtime-socket.test.ts` | **9/9 pass** |
| `client/web` `pnpm build` | `lib/realtime.ts` adds **0** new TS errors; full `tsc` already fails on `origin/main` with the same ~345 errors (react/`@ai-sdk` resolution in this local install) |
| Guard: no `startLiveWorkspaceSync` / `/fs/changes` under `src/realtime` | clean |
| Guard: diff vs `origin/main` on WS-5 paths | empty |

## What landed (streams 1 + 3)

- **Protocol** (`server/workspace/src/realtime/protocol.ts`): zod envelopes, topic grammar, reserved `doc`/`fs`.
- **Broker** (`broker.ts`): per-workspace maps, namespace registry, fan-out without self-echo by default, disconnect cleanup.
- **Socket** (`socket.ts`): `/api/gateway/ws` upgrade, subprotocol auth, ping/pong reaping, token-exp 1008, `attachRealtime`.
- **Lifecycle**: `startWorkspace` attaches; `stop()` closes sockets before HTTP drain; exported from `src/index.ts`.
- **Client** (`client/web/src/lib/realtime.ts`): `RealtimeClient` with connect/backoff/resubscribe/subscribe/publish/state — no presence semantics.

## Notes for stream 2 (presence handler)

- Register `presence` via `broker.registerNamespace(...)` — the `NamespaceHandler` + `Conn` + `publishToTopic` seam is ready.
- No presence handler is registered in v1 attach yet; reserved/unknown errors already work for `doc:`/`fs:`/others.
- Tests use a local `relay` namespace for protocol coverage — presence tests should register the real handler the same way.

## Notes for stream 4 (UI + legacy removal)

- Consume `createRealtimeClient()` from `lib/realtime.ts`; do not put presence logic in that file.
- **SessionBar peers drawer deletion is intentional** with no chat-roster / “who's in which chat” replacement in v1 — accepted product trade-off from the brief.
- Heartbeat path (`sessions.presence`, `useDraftSync` loop, SessionBar chip) is stream 4 + stream 2 — untouched here.

## Blockers

- Fresh `pnpm install` on this monorepo currently fails (`@aprovan/eslint-config` workspace package missing from `pnpm-workspace.yaml` / `config/eslint-config`). Lockfile was surgically updated for `ws` / `@types/ws` only. CI using the existing frozen lockfile + our additions should still resolve `ws` once the store fetch runs.
- Client full `tsc`/`build` is already red on `origin/main` in this environment; not introduced by this change.

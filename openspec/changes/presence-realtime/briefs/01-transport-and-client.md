# Brief: Realtime transport + client library (presence-realtime streams 1 + 3)

## Mission
Stand up the authenticated workspace WebSocket transport (`/api/gateway/ws`) with topic
protocol, broker, reserved `doc`/`fs` namespaces, and the client `RealtimeClient` — without
yet wiring presence UI or deleting the legacy heartbeat (streams 2 + 4). When done, server
realtime tests pass and the web client builds with a usable `lib/realtime.ts`.

Hard collision rule from tasks.md: do **not** touch `/fs/changes`, `startLiveWorkspaceSync`,
or anything WS-5 (`metadata-and-cost`) owns — only reserve the `fs` topic namespace.

Owner note: killing the peers drawer (later stream 4) loses "who's in which chat" with no
v1 replacement — accepted; do not invent a chat-presence substitute here.

## Read first
1. `openspec/changes/presence-realtime/prd.md`
2. `openspec/changes/presence-realtime/tech-plan.md` (D2, D3, D5, Interfaces & Data —
   client contract + server envelopes)
3. `openspec/changes/presence-realtime/tasks.md` (streams 1 and 3 only)
4. Specs: `realtime-socket/spec.md` (all scenarios); do not implement file-presence yet
5. Sources:
   - `server/workspace/src/server.ts` (attach lifecycle)
   - existing auth: `verifyAccessToken` / principal resolution patterns in workspace server
   - `client/web` gateway base URL helpers for deriving `wss…/api/gateway/ws`

## Tasks
Streams **1** and **3** from `tasks.md` (1.1–1.5, 3.1). Check off as completed.
Do **not** implement presence handler, delete heartbeats, or touch SessionBar/TabStrip.

## Acceptance criteria
All scenarios in `specs/realtime-socket/spec.md`:
- Valid token upgrades / invalid rejected before open
- No cross-workspace delivery
- Subscribe, publish, receive (no self-echo by default)
- Malformed frame does not kill connection
- Reserved namespace answers distinctly (`doc:`/`fs:` → `reserved-namespace`)
- Dead socket reaped; token lifetime bounds connection

Client contract from tech-plan: connect, backoff+resubscribe, subscribe/publish/state —
build passes; no presence semantics in `realtime.ts`.

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace
pnpm typecheck
pnpm vitest run tests/realtime-socket.test.ts
pnpm build
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan/client/web && pnpm build
# guards:
! git grep -n "startLiveWorkspaceSync\|/fs/changes" -- server/workspace/src/realtime || true
# ensure this change did not modify WS-5 paths:
git diff --stat origin/main -- '**/fs/changes*' '**/startLiveWorkspaceSync*' || true
```

## Git workflow
- Repo: aprovan; branch `iw6/realtime-transport` from `origin/main`
- Isolated worktree; rebase; PR; merge when green.
- Path coordination: do not edit `client/web/src/features/editing/**`,
  `packages/editor/**`, `packages/registry-ui/**`, or panel files.

## Constraints
- Fixed interfaces in tech-plan; stop if wrong.
- Touches only:
  - Stream 1: `server/workspace/src/realtime/**`, `server/workspace/src/server.ts`,
    `server/workspace/package.json`, `server/workspace/tests/realtime-socket.test.ts`,
    `pnpm-lock.yaml` (ws dep only)
  - Stream 3: `client/web/src/lib/realtime.ts`
- Export `attachRealtime` from `src/index.ts` as tasked.
- Mirror envelope types locally in the client (~30 lines; Open Question 1).

## Report back
Check off 1.1–1.5 and 3.1; write `briefs/01-report.md` with PR URL, verify summary, and
notes for stream 2 (presence handler) / stream 4 (UI + legacy removal). Call out that
SessionBar peers drawer deletion is intentional with no chat-roster replacement.

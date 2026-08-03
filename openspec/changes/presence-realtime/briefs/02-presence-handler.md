# Brief: Server presence handler + legacy heartbeat removal (stream 2)

## Mission
Implement `src/realtime/presence.ts` as the NamespaceHandler, delete
`sessions.presence` from sessions-service, replace the chat-sessions presence test with
the new websocket path.

## Gate
Stream 1 merged (`briefs/01-report.md`). Client UI (stream 4) waits on this.

## Read first
1. `briefs/01-report.md`, `tech-plan.md` presence handler interface
2. `tasks.md` stream 2 (2.1–2.3)
3. Specs: `file-presence`, `realtime-socket`
4. Existing: `server/workspace/src/realtime/**`, `vcs/sessions-service.ts`,
   `tests/chat-sessions.test.ts`, `tests/realtime-socket.test.ts`

## Tasks
2.1–2.3 verbatim from `tasks.md`.

## Verify
```bash
cd server/workspace && pnpm typecheck && pnpm test
```

## Git
Worktree `/tmp/iw6-presence-handler` branch `iw6/presence-handler` from `origin/main`.
Do **not** call `move_agent_to_root`. Rebase before PR/merge.

## Constraints
Touches only stream 2 globs. Do not edit client presence UI (stream 4) or SessionBar.
Owner discovery: peers drawer is gone with no chat-roster replacement — do not reintroduce.

## Report back
Check off tasks, merge PR, write `briefs/02-report.md`. Return merged PR URL.

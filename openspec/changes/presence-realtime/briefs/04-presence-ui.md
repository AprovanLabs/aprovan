# Brief: Client presence UI + legacy removal (stream 4)

## Mission
Wire file presence on the client: store/hooks over one `RealtimeClient`, focus from
active tab + visibility, `PresenceAvatars` on TabStrip / `PresenceDot` on sidebar rows,
and delete the legacy heartbeat/`peers` drawer path entirely (no chat-roster replacement).

## Gate
Streams 1–3 merged (#22 transport/client, #39 handler). Server `presence:<path>` live.

## Read first
1. `briefs/01-report.md`, `briefs/02-report.md`
2. `ux.md` "See who's in your file", `tech-plan.md` client section
3. `tasks.md` stream 4 (4.1–4.3)
4. Spec: `file-presence`
5. Existing: `client/web/src/lib/realtime.ts`, TabStrip, WorkspaceSidebar, SessionBar,
   useDraftSync, ChatDock, chat-sessions

## Tasks
4.1–4.3 verbatim from `tasks.md`.

## Verify
```bash
cd client/web && pnpm build
! grep -rn "heartbeatPresence\|PresencePeer\|peersOpen" client/web/src
```

## Git
`/tmp/iw6-presence-ui` branch `iw6/presence-ui` from `origin/main`.
Do **not** call `move_agent_to_root`. Rebase before PR/merge.

## Constraints
- Touches stream 4 globs only.
- Owner discovery: peers drawer is gone — delete it; do **not** add a chat-roster
  replacement.
- `SessionBar.tsx` declutter beyond peers removal belongs to editor stream 6 — only
  remove peers chip/`peersOpen` here; leave other SessionBar chrome alone.
- Do not start editor stream 5/6 work (ChatDock presence prop removal is in scope for
  4.3; do not recompose ChatDock as a side dock).

## Report back
Check off tasks, merge PR, write `briefs/04-report.md`. Return merged PR URL.

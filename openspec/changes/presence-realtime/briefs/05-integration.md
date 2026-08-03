# Brief: Presence integration verification (stream 5)

## Mission
End-to-end realtime presence test (two users, focus sequences, reserved namespaces) plus
repo-wide retirement greps. Owner smoke (5.3) document in report if env unavailable.

## Gate
Streams 1–4 merged (transport, handler, client lib, UI #47).

## Read first
1. `briefs/02-report.md`, `briefs/04-report.md`
2. `tasks.md` stream 5 (5.1–5.3)
3. Specs: `realtime-socket`, `file-presence`
4. Existing: `tests/presence.test.ts`, `tests/realtime-socket.test.ts`

## Tasks
5.1–5.3 verbatim. For 5.3: if no deployed env access, write the checklist into the report
and mark 5.3 with a note (do not block merge on owner smoke).

## Verify
```bash
cd server/workspace && pnpm vitest run tests/realtime-e2e.test.ts
# plus retirement greps / full suite per tasks.md 5.2
```

## Git
`/tmp/iw6-presence-e2e` branch `iw6/presence-e2e`. No `move_agent_to_root`.

## Constraints
Touches `server/workspace/tests/realtime-e2e.test.ts` primarily (+ tasks/report).

## Report back
Check off tasks, merge PR, `briefs/05-report.md`. Return merged PR URL.

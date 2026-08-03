# Brief: Chat as an opt-in dock (stream 5)

## Mission
Recompose ChatDock as a per-file side dock opened from the pane header; chat-driven
edits always use staged session scope; proposal-apply conflicts go through
`publishConflictNotification`.

## Gate
Editor stream 4 merged (#41). Presence UI (#47) removed peers from ChatDock — rebase on
that; do not restore peers.

## Read first
1. `editor-direct-edit/briefs/04-report.md`
2. `tasks.md` stream 5 (5.1–5.3), `ux.md` chat dock
3. Specs: `workspace-editor-shell`, `direct-file-editing`
4. Existing: `features/chat/**`, `FileEditorPane`, `conflict-notify.ts`

## Tasks
5.1–5.3 verbatim.

## Verify
```bash
pnpm --filter @aprovan/patchwork-web build
```

## Git
`/tmp/iw2-chat-dock` branch `iw2/chat-dock`. No `move_agent_to_root`.

## Constraints
Touches `features/chat/**` and `pages/**` only. Coordinate mentally with stream 6
(SessionBar) — do not declutter SessionBar here.

## Report back
Check off tasks, merge PR, `briefs/05-report.md`. Return merged PR URL.

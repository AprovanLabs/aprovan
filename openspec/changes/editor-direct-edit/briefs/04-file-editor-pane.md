# Brief: FileEditorPane + direct-edit wiring (stream 4)

## Mission
Make in-tab direct editing the default for markdown/text/code: `FileEditorPane` +
`SaveStateChip`, route via `TabContent`, rewrite `useEditDraft` (no `beginEditDraft` on
open), EditModal explicit-only via pane header `Open editor`.

## Gate
Streams 1–3 merged (foundations report in `briefs/01-report.md`). Task 4.5 already done.

## Read first
1. `briefs/01-report.md`, `tech-plan.md` D3, `ux.md` direct-edit
2. `tasks.md` stream 4 (4.1–4.4, 4.6 — skip 4.5)
3. Specs: `direct-file-editing`, `workspace-editor-shell`, `session-history-simplification`
4. Existing: `features/editing/write-policy.ts`, `useDirectSave.ts`, `useLazyDraft.ts`,
   `conflict-notify.ts`, `EditModalHost.tsx`, `TabContent.tsx`, `useEditDraft.ts`

## Tasks
4.1–4.4 and 4.6 verbatim from `tasks.md` (4.5 already checked).

## Verify
```bash
pnpm --filter @aprovan/patchwork-web build
! grep -rn "beginEditDraft" client/web/src
! grep -n "showPreview" client/web/src/features/edit-modal/EditModalHost.tsx
```

## Git
Worktree `/tmp/iw2-editor-pane` branch `iw2/editor-pane` from `origin/main`.
Do **not** call `move_agent_to_root`. Rebase onto `origin/main` before PR and merge.

## Constraints
Touches only stream 4 globs. Do not edit `SessionBar.tsx` (stream 6) or chat dock (stream 5).
Surgical; match karpathy-guidelines.

## Report back
Check off tasks, merge PR, write `briefs/04-report.md`. Return merged PR URL.

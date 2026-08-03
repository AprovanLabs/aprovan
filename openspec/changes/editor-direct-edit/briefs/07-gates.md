# Brief: Repo-wide gates + smoke pass (stream 7)

## Mission
Run every prior stream's Verify gates from a clean checkout; confirm grep retirement
guards; document manual smoke against `ux.md` flows (and IW-6 seam note). This is
verification + light docs/tasks — no feature work unless a gate fails (then fix
surgically).

## Gate
Streams 5–6 merged (#57 chat dock, #54 SessionBar).

## Read first
1. `briefs/04-report.md`, `05-report.md`, `06-report.md`
2. `tasks.md` stream 7 (7.1–7.3)
3. `ux.md` smoke flows
4. All prior Verify lines in `tasks.md` streams 1–6

## Tasks
7.1–7.3 verbatim. For 7.2 manual smoke: if no interactive browser env, record a
checklist in `briefs/07-report.md` and note owner-run — do not block merge on live UI.

## Verify
```bash
pnpm --filter @aprovan/patchwork-editor build
pnpm --filter @aprovan/registry-ui build
pnpm --filter @aprovan/registry-ui test
pnpm --filter @aprovan/patchwork-web build
! grep -rn "edit-keep-draft" client/web/src packages
! grep -rn "beginEditDraft" client/web/src
! grep -rnE "min-h-\[[0-9]+vh\]|max-h-\[[0-9]+vh\]" packages/editor/src/components/CodePreview.tsx packages/registry-ui/src/apps-panel.tsx
```

## Git
`/tmp/iw2-editor-gates` branch `iw2/editor-gates`. No `move_agent_to_root`.

## Constraints
Prefer verify-only. Fix only if a gate fails. Touch openspec tasks/report as needed.

## Report back
Check off 7.1–7.3, merge PR, `briefs/07-report.md`. Return merged PR URL.

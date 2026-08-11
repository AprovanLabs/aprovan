# Brief: Client — DiffViewer + ChangeList stack

## Mission

Ship the shared diff stack: `@codemirror/merge`-backed `DiffViewer`, shared
`ChangeList` with one symbol set, and `SaveAffordance` consuming change rows.
No F1 dependency — can start immediately. Streams 5–6 build history/merge UI
on this.

## Read first

1. `openspec/changes/iw9-a-vcs-consolidation/ux.md` (diff / change list)
2. `openspec/changes/iw9-a-vcs-consolidation/tech-plan.md` (client diff stack)
3. `openspec/changes/iw9-a-vcs-consolidation/tasks.md` stream 4
4. `packages/editor/src/components/SaveAffordance.tsx`
5. Existing editor CM6 patterns

## Tasks

Copy 4.1–4.3 from `tasks.md` verbatim.

> Depends-on: - | Touches: `packages/editor/package.json`, `DiffViewer.tsx`, `SaveAffordance.tsx`, `client/web/src/components/ChangeList.tsx`

## Verify

```bash
cd packages/editor && pnpm typecheck && pnpm test
cd ../../client/web && pnpm typecheck
```

## Constraints

- Touch ONLY Touches paths (+ tasks/report).
- Add `@codemirror/merge` to editor package only (not root).
- No HistoryPanel / MergeDialog work (streams 5–6).

## Report back

PR + `briefs/04-report.md`; check off 4.1–4.3.

# Report: Repo-wide gates + smoke pass (stream 7)

## PR
https://github.com/AprovanLabs/aprovan/pull/59

## Verify results

| Check | Result |
| --- | --- |
| `pnpm --filter @aprovan/patchwork-editor build` | Pass (after `^build` deps: compiler) |
| `pnpm --filter @aprovan/registry-ui build` | Pass (after ui + registry-main) |
| `pnpm --filter @aprovan/registry-ui test` | Pass (42 tests) |
| `pnpm --filter @aprovan/patchwork-web build` | Pass |
| `! grep -rn "edit-keep-draft" client/web/src packages` | Pass |
| `! grep -rn "beginEditDraft" client/web/src` | Pass |
| `! grep -rnE "min-h-\\[[0-9]+vh\\]\\|max-h-\\[[0-9]+vh\\]" CodePreview + apps-panel` | Pass |
| Stream 1 `defaultView` in `fileTypes.ts` | Pass |
| Stream 2 MediaPreview vh-cap grep | Pass |
| Stream 3 write-policy / useDirectSave / useLazyDraft files | Pass |
| Stream 4 `showPreview` absent from EditModalHost | Pass |
| Stream 6 `keepEditDrafts` absent; `publishNotification` count in useDraftSync = 0 | Pass |

No source fixes required — all gates held on `origin/main` after streams 5–6 (#57, #54).

## Tasks

**7.1** — Ran every stream Verify from a clean `/tmp/iw2-editor-gates` checkout on
`iw2/editor-gates` rebased onto `origin/main`. Grep retirement guards hold repo-wide.

**7.2** — Manual smoke: no interactive browser in this agent env. Owner-run checklist
against `ux.md` (record pass/fail when exercised):

- [ ] Browse → edit → save plain file; Network tab shows zero `sessions` POSTs on open/type/save
- [ ] Markdown defaults to WYSIWYG; Source/Rich toggle round-trips content
- [ ] Staged app-source: first save creates draft → Review & apply → Applied
- [ ] Chat dock: open creates no session; first send staged; proposal Apply/Dismiss
- [ ] Conflict → single `builtin:merge-conflict` card → MergeDialog (bulk actions in dialog only)
- [ ] Offline edit → sync chip Offline / journal → flush on reconnect
- [ ] Compilable file: `Open editor` explicit; plain files never auto-open EditModal
- [ ] SessionBar: ≤5 visible non-draft controls; no `keepEditDrafts` checkbox

**7.3 — IW-6 seam** — Direct in-tab editing works with no session scope active:

- `TabContent` mounts `FileEditorPane` for text/compilable tabs.
- Direct-policy paths use `useDirectSave` → `writeFile` only; no `createChatSession` /
  `setActiveVfsSession` on open or save (`useDirectSave.ts` / `FileEditorPane.tsx`).
- Staged paths create a session lazily on first `useLazyDraft.save()` only.
- Deviation for IW-6 author: none observed in static review. Presence/CRDT can attach to
  the main-area pane buffer without a chat session id on direct files.

## Notes

- Workspace package builds need `^build` deps present locally (`ui`, `registry-main`,
  `compiler`) before filtered `registry-ui` / `patchwork-editor` builds — same as CI turbo
  graph; not a product regression.
- Feature streams 1–6 already merged; this PR is docs/tasks + verify report only.

# Report: FileEditorPane + direct-edit wiring (stream 4)

## PR
(pending — filled after open)

## Verify results

| Check | Result |
| --- | --- |
| `pnpm --filter @aprovan/patchwork-web build` | Pass |
| `! grep -rn "beginEditDraft" client/web/src` | Pass |
| `! grep -n "showPreview" client/web/src/features/edit-modal/EditModalHost.tsx` | Pass |

## What landed

**4.1** — `FileEditorPane` composes `MarkdownPreview` / `CodeBlockView` / `WidgetPreview`
per `fileTypes.ts` `defaultView`, with view toggle, write-policy resolution, and
`useDirectSave` / `useLazyDraft` / read-only wiring.

**4.2** — `SaveStateChip` renders the singular save/draft/read-only indicator; draft opens
Review & apply (changes rows + Apply/Discard).

**4.3** — `TabContent` routes text/compilable tabs to `FileEditorPane`; media/binary keep
`CodePreview`. External-change banner is clean-silent / dirty-prompt inside the pane.

**4.4** — `useEditDraft` no longer calls `beginEditDraft` on open; open helpers are pure
file/project loads. `EditModalHost` saves follow write policy (lazy draft for staged).

**4.5** — Already done on foundations PR (`initialState={{ showTree: true }}`).

**4.6** — Pane header exposes `Open editor` for compilable files only.

## Notes for streams 5–6

- Chat dock / SessionBar declutter untouched (streams 5–6).
- Sidebar tree `Edit` still calls `openWorkspaceSession` (explicit EditModal); pane is the
  default affordance for plain files.
- Conflict apply notifications already go through `publishConflictNotification` in
  `useLazyDraft.apply`; auto-apply-on-modal-close is gone.

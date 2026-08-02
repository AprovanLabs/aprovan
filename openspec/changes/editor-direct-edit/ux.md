This change is primarily a UX-shape change: the workspace stops feeling like "a chat app that
can show files" and becomes "a file workspace that can summon chat." The default posture is the
Obsidian shape — sidebar tree on the left, directly editable tabs in the middle, no modal, no
session — with chat and staging appearing only where the target or the user demands them.
Vocabulary stays Git-free (per `SessionBar`'s existing rules): "draft", "apply to workspace",
"workspace as of 2h ago" — never branch/commit/merge.

## Flows

### Flow: Browse → edit → save a plain workspace file (the new default)
1. User clicks a file (e.g. `notes/todo.md`) in the sidebar tree.
2. A tab opens; the pane content is **immediately editable** — no Edit button, no modal, no
   overlay. Markdown shows the TipTap WYSIWYG editor; code/text shows the editable code view.
   (PRD goal: editable in-tab panes as default.)
3. User types. The header area shows a quiet save-state chip: `Edited` → `Saving…` → `Saved`.
   Saves are debounced writes through the VFS (Cmd/Ctrl+S forces one). No chat session is
   created at any point (PRD goal: zero session records for plain files).
4. User clicks another file; the tab persists its state. Closing a tab with an in-flight save
   flushes it — no confirm dialog for plain files, because the write-through already happened
   or is journaled.
5. **Failure — offline**: the existing sync chip shows `Offline`; edits land in OPFS and the
   journal, and flush on reconnect. The editor never blocks typing.
6. **Failure — write rejected** (e.g. permissions): the save chip turns to `Couldn't save` with
   a retry affordance; the buffer is preserved.
7. **Concurrent external change**: if the file changed remotely while the local buffer is
   unedited, the tab refreshes silently. If the local buffer has unsaved edits, the pane shows
   the single external-change banner ("This file changed elsewhere — Reload / Keep mine"),
   which is the same one surface used everywhere (see session-history-simplification).

### Flow: Toggle Markdown between WYSIWYG and source
1. User opens `README.md`; it renders in TipTap WYSIWYG, editable (fixing the current raw-
   textarea regression).
2. A `Source`/`Rich text` toggle sits in the pane header (same slot as the code/preview toggle
   for compilable files). One click flips to the syntax-highlighted source editor; content and
   cursor position survive the flip as closely as TipTap's serialization allows.
3. The chosen view is remembered per file type for the session; a fresh open of any `.md` file
   defaults back to WYSIWYG (policy lives in `fileTypes.ts`, not per-host state).
4. **Failure — malformed markdown that TipTap cannot round-trip**: pane falls back to source
   view with a small notice ("Shown as source — rich view can't represent this file exactly"),
   never silently rewriting the file.

### Flow: Edit a staged target (app source or mounted repo)
1. User opens a file under an app's source tree (or a mounted repo). The tab opens editable,
   identical to the plain-file flow — same pane, same editors.
2. The pane header shows a subtle `Draft` context chip ("Changes to this app are drafted until
   you apply them") instead of the plain save chip. No dialog, no mode picker — the target path
   decided (settled staging rule; no toggle).
3. On the **first save**, a draft is created lazily and the edit lands in the draft's overlay,
   not the live app/workspace. The chip becomes `Draft · 1 file` and offers `Review & apply`.
4. `Review & apply` shows the draft's changed files (the existing changes list) with
   `Apply to workspace` and `Discard`. Apply lands everything as one change set; the draft
   closes with an `Applied` confirmation.
5. **Conflict on apply**: if the target moved underneath the draft, the user gets the single
   conflict card → resolution dialog flow (below). Nothing is clobbered.
6. **Mounted repo, read-only mount (v1 reality)**: the pane opens read-only with an explanatory
   chip ("This is a mounted repository — read-only"); the editable-draft flow activates only
   when the mount is writable.
7. **Failure — draft creation fails (offline/old gateway)**: editing a staged target while the
   draft can't be created shows `Couldn't start a draft` and keeps the buffer local; it does
   NOT silently write through to a staged target.

### Flow: Opt into chat on a file (chat as a dock)
1. While viewing/editing any file, user clicks `Chat` in the pane header (or uses the global
   chat entry). A chat dock opens **beside** the file pane — the file stays visible and
   editable; nothing fullscreen.
2. The dock is scoped to the open file: the composer pre-carries the file context. A chat
   session record is created lazily on the first message sent (as today), never on dock-open.
3. AI-proposed edits are **always staged** (settled rule): the dock shows "Proposed changes —
   2 files" with a diff-style review; the file pane can preview the proposal. `Apply` writes
   them; `Dismiss` drops them. The user's own direct typing in the pane remains direct
   (plain files) — only the AI's edits ride the staged path.
4. Closing the dock leaves the file pane untouched. A session with no messages leaves no
   record.
5. **Failure — proposal conflicts with the user's typing**: the proposal review shows the
   conflicted file with the same single conflict-resolution surface.

### Flow: Focused widget editing (demoted EditModal)
1. From a compilable widget file's pane, user explicitly chooses `Open editor` (the
   compile-preview flow). The existing fullscreen editor opens with live preview — unchanged
   internals, but now an explicit opt-in for widget work, never the default for plain files.
2. Closing it returns to the in-tab pane; its saves follow the same write-policy as the pane
   (direct for plain paths, draft for staged targets — the `keepEditDrafts` checkbox is gone).

### Flow: Review chat history (simplified)
1. User opens the chats list. It contains only real conversations and real drafts — no
   `Edit: <file>` husks (they no longer get created).
2. Draft entries show target scope (app/repo), changed-file count, and Apply/Discard. Applied
   and archived chats read as history.
3. Conflicts anywhere (draft auto-sync, apply, AI proposal) surface as exactly one
   notification card kind, whose `Review` opens the one resolution dialog.

## Screens & States

### Workspace shell (sidebar + tab strip + editor pane)
Purpose: the default surface — browse and edit without mode switches.
Key elements: existing `WorkspaceSidebar` tree; existing tab strip; the pane now hosts the
editable view (WYSIWYG / code editor / media preview) instead of a read-mostly `CodePreview`
that launches a modal. Pane header: filename, save-state or draft chip, view toggle
(source/rich or code/preview), `Chat` button, `Open editor` (compilable files only).
- Loading: skeleton in the pane while the file loads; tree and tabs stay interactive.
- Empty: no tab open → current placeholder state (unchanged).
- Error: file read failure renders the existing inline error row, with retry.
- Partial: binary/unknown types render read-only (media preview or download row) — the
  editable affordances simply absent, not disabled-looking.
- External change: single banner (Reload / Keep mine) — only shown when local unsaved edits
  exist.

### Save-state / draft chip (pane header)
Purpose: the one answer to "is my work safe, and where is it going?"
States: `Saved` (quiet dot) · `Saving…` · `Edited` (debounce pending) · `Couldn't save` (retry)
· `Offline` (journaled) · `Draft` / `Draft · n files` (staged targets; opens Review & apply) ·
`Read-only` (mounts). Exactly one chip; direct and staged flows never show both.

### Chat dock
Purpose: opt-in AI on the current file, side-by-side.
Key elements: message list + composer (existing `ChatDock` internals), file-context header,
proposed-changes review block with Apply/Dismiss.
- Loading: streaming indicator as today.
- Empty: fresh dock, no session yet — hint copy ("Ask about this file…"); no record exists.
- Error: transport errors inline, as today.
- Partial: a proposal partially applied (some files conflicted) shows per-file status.

### Review & apply (draft review)
Purpose: the explicit gate for staged targets and AI proposals.
Key elements: changed-file rows (new/edited/removed, reusing `SessionBar`'s changes list),
`Apply to workspace`, `Discard`, per-file open-in-tab.
- Busy: apply in flight disables actions (no double-fire).
- Empty: a draft with zero changes offers only Discard.
- Conflict: rows flagged, `Review conflicts` opens the resolution dialog.

### Conflict resolution (the one surface)
Purpose: consolidate today's three surfaces (MergeDialog, `builtin:merge-conflict`
notification card with its own inline choices, and ad-hoc sessionNotice/banner text) into:
one notification **card kind** (entry point, summarizes, links to Review) and one **dialog**
(the existing plain-language MergeDialog: keep mine / keep workspace / combine with AI).
The notification card no longer carries its own one-click bulk resolutions — it routes to the
dialog, which owns all resolution (bulk actions live at the top of the dialog instead).
- Busy/error: AI-combine failures per file, inline, as today.

### SessionBar (decluttered)
Purpose: chat identity + the minimum session controls, for the chat dock only.
Keeps: chats-list button (title), sync chip, draft badge + changed-files + Apply (staged only),
presence chip. Everything else (open-in-window, reset, archive, delete, refresh) folds into a
single overflow menu (`⋯`). The `keepEditDrafts` checkbox is removed. Target: ≤5 visible
controls in the strip.

## Component Inventory

- Editable pane: `MarkdownPreview` (TipTap, `editable`) and `CodeBlockView` (editable) from
  `@aprovan/patchwork-editor` — already built, currently reachable mainly inside `EditModal`.
- Pane chrome: existing tab strip + `TabContent`; chip built from `Badge`/`Button`
  (`@/components/ui/*` vendored shadcn — the canonical app-shell source per
  `ui-component-sourcing`); `SaveStatusButton` from `@aprovan/patchwork-editor` for save state.
- Chat dock: existing `features/chat/ChatDock` recomposed into a side panel; composer stays
  `MarkdownEditor`.
- Review & apply: `Dialog` primitives + the changes-list rows lifted from `SessionBar`.
- Conflict dialog: existing `MergeDialog`; notification entry: existing `MergeConflictCard`
  (choices removed, Review-only).
- Overflow menu: vendored shadcn `DropdownMenu` (add to `components/ui` if absent — one-off
  components must not be invented).
- No new editor tech: TipTap/Shiki/CodeMirror unchanged (PRD non-goal).

## Open Questions

1. **Chat dock position — right side vs bottom?** Recommend right side (Obsidian/Cursor
   convention; keeps line lengths readable in the file pane), collapsing to bottom sheet on
   mobile via the existing `MobileDrawer`.
2. **Autosave debounce for direct edits** — recommend ~1s idle debounce + Cmd/Ctrl+S immediate,
   matching the "it's just saved" Obsidian feel; a visible `Edited` state covers the gap.
3. **Should the `Chat` button live per-pane or only globally?** Recommend per-pane (file
   context is the point), with the global entry preserved for workspace-wide chats.
4. **Presence chip placement** stays in SessionBar for now; IW-6 moves presence to the open
   file — recommend not redesigning it here beyond survival in the decluttered bar.

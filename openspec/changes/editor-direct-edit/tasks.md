Reference line numbers are from the repo at change-authoring time (main @ `0d4f409`) —
re-locate by symbol name if files have shifted. Streams 1–3 are mutually independent
foundations (disjoint paths, no behavior change visible to users until stream 4 wires them).
Interfaces between streams are exactly the ones typed in `tech-plan.md` Interfaces & Data —
if a stream needs more, fix the tech plan first.

## 1. File-type view policy (packages/editor)

> Depends-on: - | Touches: packages/editor/src/components/edit/fileTypes.ts, packages/editor/src/components/edit/EditModal.tsx | Verify: `pnpm --filter @aprovan/patchwork-editor build && grep -q "defaultView" packages/editor/src/components/edit/fileTypes.ts`

- [x] 1.1 Extend `FileTypeInfo` in `fileTypes.ts` with `defaultView: "rich" | "code" |
      "preview" | "media"` and `canToggleView: boolean` per tech-plan D4: `.md` → `rich`
      (toggle to `code`); compilable → `code` (toggle to `preview`); other text → `code`
      (no toggle); media → `media`. Export the `DefaultView` type. Satisfies
      `specs/file-renderer-defaults` "Per-type default views are owned by fileTypes.ts".
- [x] 1.2 In `EditModal.tsx`, derive the initial view from `getFileType(activeFile).defaultView`
      instead of `initialState?.showPreview ?? true` (L91): markdown mounts the editable
      `MarkdownPreview` branch (L402) by default; the header toggle (L309) flips per
      `canToggleView`. Remove the `showPreview` field from `EditModalProps.initialState`
      entirely (do not keep it accepted-but-ignored) so hosts cannot reintroduce the
      regression; the resulting compile error at the host call site is fixed in stream 4.
      Satisfies "Markdown defaults to editable WYSIWYG with a source toggle".
- [x] 1.3 Add a serialize-compare round-trip guard for markdown: on mount, serialize the TipTap
      document back to markdown and compare (whitespace-normalized) to the source; on mismatch
      open in `code` view with a non-blocking notice instead of the rich view. Never write a
      lossy serialization on autosave. Satisfies scenario "Non-round-trippable markdown falls
      back to source".

## 2. Renderer host sizing (registry-ui + editor previews)

> Depends-on: - | Touches: packages/registry-ui/src/**, packages/editor/src/components/CodePreview.tsx, packages/editor/src/components/edit/MediaPreview.tsx | Verify: `pnpm --filter @aprovan/registry-ui build && pnpm --filter @aprovan/registry-ui test && pnpm --filter @aprovan/patchwork-editor build && ! grep -nE "min-h-\[[0-9]+vh\]|max-h-\[[0-9]+vh\]" packages/editor/src/components/CodePreview.tsx packages/editor/src/components/edit/MediaPreview.tsx packages/registry-ui/src/apps-panel.tsx`

- [x] 2.1 In `packages/registry-ui/src/renderers.tsx`, add `export type RendererSizing =
      "fill" | "inline"`, change `RendererDef.Component` props to `{ input: RenderInput;
      sizing: RendererSizing }`, and have `RenderedView({ input, sizing = "inline" })` forward
      it (tech-plan D7). Satisfies `specs/renderer-host-sizing` "Renderers negotiate size with
      the host pane".
- [x] 2.2 Update every in-repo `registerRenderer` registration (JSON tree, tabular, chart,
      TailorFlow in `./tailor`, and any others found by `grep -rn "registerRenderer"
      packages/registry-ui client/web`) to the new component signature: `fill` ⇒
      `flex-1 min-h-0 overflow-auto`; `inline` ⇒ natural height, no viewport units.
- [x] 2.3 Remove hardcoded viewport caps from renderer/preview bodies: `CodePreview.tsx:424`
      (`min-h-[50vh] max-h-[75vh]` non-fill card variant) and `:514` (`max-h-[60vh]`),
      `MediaPreview.tsx:81` (`max-h-[60vh]`), `apps-panel.tsx:347/354` (`md:max-h-[70vh]`
      non-fill fallbacks). Non-fill hosts now own the bound: give `CodePreview`'s inline card
      a host-suppliable `className`/container contract instead of internal floors. Satisfies
      "No hardcoded viewport-height floors or caps in renderers" (grep gate in Verify).
- [x] 2.4 In the chat message renderer path (`client/web/src/features/widgets/
      ChatArtifactBlock.tsx` and any `RenderedView`/`CodePreview` inline mounts), wrap inline
      renderers in a bounded container (`max-h` supplied by the chat host, overflow-auto) so
      short widgets shrink and tall widgets scroll. Satisfies scenarios "Small widget in chat
      is not inflated" / "Tall widget in a pane is not clipped at an arbitrary cap".

## 3. Write-policy + save/draft hooks (client foundations)

> Depends-on: - | Touches: client/web/src/features/editing/**, client/web/src/features/sessions/conflict-notify.ts | Verify: `pnpm --filter @aprovan/patchwork-web build && test -f client/web/src/features/editing/write-policy.ts && test -f client/web/src/features/editing/useDirectSave.ts && test -f client/web/src/features/editing/useLazyDraft.ts`

- [x] 3.1 Create `client/web/src/features/editing/write-policy.ts` implementing
      `StagedPrefixSets`, `loadStagedPrefixes()` (apps listing for declared source prefixes +
      `vfs.mounts` procedure for mount prefixes, cached per workspace, refreshed on workspace
      boot / `subscribeToWorkspaceChanges` signal / any 403 write failure), and pure
      `resolveWritePolicy(path, sets)` with longest-prefix matching; non-writable mount ⇒
      `"readonly"` (tech-plan D1). Satisfies `specs/direct-file-editing` "Write policy is
      derived from the target path" and "Read-only mounts stay read-only".
- [x] 3.2 Create `useDirectSave.ts` per the tech-plan interface: ~1s idle debounce over
      `syncedBackend` writes (`writeFile` from `lib/workspace-vfs`), `flush()` for Cmd/Ctrl+S,
      and the `SaveState` machine including `offline` (journal) and `error` (retry, buffer
      preserved). Satisfies "Direct edits write through the VFS".
- [x] 3.3 Create `useLazyDraft.ts` per the tech-plan interface: no session on mount; first
      `save()` creates the staged session (`createChatSession({mode:"staged"})`), calls
      `setActiveVfsSession({id, staged:true})`, then writes; `apply()` runs
      sync-then-close (reusing `syncChatSession`/`closeChatSession` semantics from
      `useEditDraft.finishEditDraft`, L114–198) returning conflicts; `discard()` deletes.
      Draft-creation failure surfaces `error` state and never writes through (tech-plan D2).
      Satisfies "Staged targets get a lazily created draft".
- [x] 3.4 Create `client/web/src/features/sessions/conflict-notify.ts` exporting
      `publishConflictNotification({sessionId, sessionTitle, conflicts, origin})` — the single
      constructor of `builtin:merge-conflict` notifications (summary + open-merge link only;
      no inline resolution choices), per tech-plan D6. Satisfies
      `specs/session-history-simplification` scenario "One code path builds conflict
      notifications" (call-site migration happens in streams 4 and 6).

## 4. FileEditorPane + direct-edit wiring (the new default)

> Depends-on: 1, 2, 3 | Touches: client/web/src/features/editing/FileEditorPane.tsx, client/web/src/features/editing/SaveStateChip.tsx, client/web/src/features/tabs/TabContent.tsx, client/web/src/features/sessions/useEditDraft.ts, client/web/src/features/edit-modal/EditModalHost.tsx | Verify: `pnpm --filter @aprovan/patchwork-web build && ! grep -rn "beginEditDraft" client/web/src && ! grep -n "showPreview" client/web/src/features/edit-modal/EditModalHost.tsx`

- [x] 4.1 Create `FileEditorPane.tsx` (tech-plan D3): resolves the file type's `defaultView`
      (stream 1), mounts editable `MarkdownPreview` / `CodeBlockView` / `MediaPreview`
      accordingly with the view toggle in the pane header; resolves write policy (stream 3)
      and wires `useDirectSave` (direct), `useLazyDraft` (staged), or read-only. Satisfies
      `specs/workspace-editor-shell` "Files open as editable in-tab panes by default".
- [x] 4.2 Create `SaveStateChip.tsx` rendering the single save/draft/read-only indicator from
      `SaveState`/`DraftState` (reuse `SaveStatusButton` visuals where possible); draft state
      links to the Review & apply dialog (changes list + Apply/Discard, reusing the changes
      rows currently in `SessionBar.tsx` L317–341). Satisfies "Save state is visible and
      singular" and `specs/direct-file-editing` staged-target scenarios.
- [x] 4.3 In `TabContent.tsx`, route editable file types (markdown/text/code) to
      `FileEditorPane` instead of read-mostly `CodePreview`; keep `CodePreview` for compilable
      files' preview mode under the pane's code/preview toggle (tech-plan Open Question 2
      resolution). Fold the external-change banner (L128–152) into the pane's
      clean-buffer-silent-refresh / dirty-buffer-banner behavior. Satisfies "External changes
      surface through one banner".
- [x] 4.4 Rewrite `useEditDraft.ts`: delete `beginEditDraft`-on-open and the
      begin/finish lifecycle (L93–198); `openWorkspaceSession`/`openSharedEditSession` become
      pure open-the-file operations (no session calls). The widget-editor (EditModal) flow
      routes its saves through the same stream-3 hooks by target policy. Migrate its conflict
      notification call site to `publishConflictNotification`. Satisfies
      `specs/direct-file-editing` "Opening a file never creates a chat session".
- [x] 4.5 In `EditModalHost.tsx`, remove `initialState={{ showPreview: false, showTree: true }}`
      (L77) — view now comes from `fileTypes.ts` (stream 1); keep `showTree` behavior via the
      remaining supported prop surface. Satisfies `specs/file-renderer-defaults` scenario
      "Policy is consulted, not host state".
- [x] 4.6 Make the EditModal flow explicit-only: the pane header exposes `Open editor` for
      compilable files; no default affordance routes plain files to the modal. Satisfies
      `specs/workspace-editor-shell` "EditModal is demoted to an explicit widget-editing flow".

## 5. Chat as an opt-in dock

> Depends-on: 4 | Touches: client/web/src/features/chat/**, client/web/src/pages/** | Verify: `pnpm --filter @aprovan/patchwork-web build`

- [ ] 5.1 Recompose `ChatDock` as a per-file side dock: opened from the pane header `Chat`
      button, resizable beside the file pane (bottom-sheet via `MobileDrawer` on mobile),
      file context carried into the composer. Session creation stays lazy on first send
      (existing behavior — verify no dock-open call path creates one). Satisfies
      `specs/workspace-editor-shell` "Chat is an opt-in dock beside the file".
- [ ] 5.2 Ensure chat-driven file edits always run in a staged session scope regardless of
      target policy (tech-plan D5): the dock's edit transport writes through the session
      overlay; add the proposed-changes review block (changed files, Apply/Dismiss) wired to
      the existing apply/resolve procedures. Satisfies `specs/direct-file-editing`
      "Chat-driven edits are always staged".
- [ ] 5.3 Route proposal-apply conflicts through `publishConflictNotification` with
      `origin: "chat-proposal"`. Satisfies `specs/session-history-simplification` "One
      conflict surface".

## 6. Conflict consolidation + SessionBar declutter

> Depends-on: 4 | Touches: client/web/src/components/SessionBar.tsx, client/web/src/components/MergeDialog.tsx, client/web/src/components/notifications/MergeConflictCard.tsx, client/web/src/features/sessions/useDraftSync.ts, client/web/src/components/ui/dropdown-menu.tsx | Verify: `pnpm --filter @aprovan/patchwork-web build && ! grep -rn "edit-keep-draft\|keepEditDrafts" client/web/src && ! grep -c "publishNotification" client/web/src/features/sessions/useDraftSync.ts`

- [ ] 6.1 Migrate `useDraftSync.ts`'s inline conflict notification (L52–86) to
      `publishConflictNotification({origin:"draft-sync"})`, deleting the duplicated
      choice-blob literal. Satisfies scenario "One code path builds conflict notifications".
- [ ] 6.2 Strip `MergeConflictCard.tsx` to summary + `Review` (remove the copy describing
      one-click bulk choices; the notification's `choices` no longer exist after 6.1); move
      bulk "keep all mine / keep all workspace" actions into `MergeDialog.tsx`'s header, which
      becomes the only surface executing resolutions (tech-plan D6). Satisfies "One conflict
      surface".
- [ ] 6.3 Declutter `SessionBar.tsx`: keep chats-list/title button, sync chip, draft badge +
      changed-files + Apply (staged only), presence chip; move open-in-window, reset, archive,
      delete, and refresh into one overflow `DropdownMenu` (add the vendored shadcn
      `dropdown-menu.tsx` to `components/ui/` if absent). ≤5 visible controls outside the
      overflow in non-draft state. Satisfies "SessionBar is decluttered".
- [ ] 6.4 Delete the `keepEditDrafts` preference end-to-end: `EDIT_KEEP_DRAFT_KEY`,
      `handleKeepEditDraftsChange`, the SessionBar checkbox (L386–398), and all prop threading
      (grep gate in Verify). Satisfies `specs/direct-file-editing` scenario "No mode toggle
      exists".
- [ ] 6.5 Scope versioning vocabulary to staged contexts: audit `SessionBar`/pane surfaces so
      base-age ("workspace as of …"), apply/sync, and merge affordances render only when a
      staged session is active — never on direct-edit surfaces. Satisfies "Versioning and
      merge UI is scoped to staged targets".

## 7. Repo-wide gates + smoke pass

> Depends-on: 5, 6 | Touches: (no source — verification only) | Verify: `pnpm --filter @aprovan/patchwork-editor build && pnpm --filter @aprovan/registry-ui build && pnpm --filter @aprovan/registry-ui test && pnpm --filter @aprovan/patchwork-web build && ! grep -rn "edit-keep-draft" client/web/src packages && ! grep -rn "beginEditDraft" client/web/src && ! grep -rnE "min-h-\[[0-9]+vh\]|max-h-\[[0-9]+vh\]" packages/editor/src/components/CodePreview.tsx packages/registry-ui/src/apps-panel.tsx`

- [ ] 7.1 Run every stream's Verify command from a clean checkout and confirm all grep gates
      hold repo-wide (not just per-file).
- [ ] 7.2 Manual smoke pass against every flow in `ux.md` (browse→edit→save plain file with
      network dev-tools open confirming zero `sessions` POSTs; md WYSIWYG + source toggle;
      staged app-source draft → review → apply; chat dock proposal → apply; conflict →
      single card → MergeDialog; offline edit → journal flush). Record results in the PR
      description — `client/web` has no automated UI suite (PRD constraint).
- [ ] 7.3 Confirm the IW-6 seam: direct in-tab editing of the main area works with no session
      scope active (the surface `presence-realtime` will attach CRDT to), and note any
      deviations in the PR for the IW-6 author.

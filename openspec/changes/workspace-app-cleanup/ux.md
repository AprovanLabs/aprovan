This change has a user-facing surface (the entire chat app shell), but the requirement is
the opposite of a normal UX doc: **behavior must NOT change.** Nothing below describes new
UX — it is the enumeration of existing surfaces that must survive the `ChatPage.tsx`
decomposition, component-source consolidation, and rebrand pixel-for-pixel and
interaction-for-interaction identical. Treat every flow and screen below as a regression
checklist, run manually at each work-stream boundary in `tasks.md` (no automated UI test
suite exists — see PRD Constraints).

## Flows

### Flow: Send a chat message and watch a widget render
1. User types in the composer (`MarkdownEditor`) and submits.
2. If no session exists yet, one is created lazily before the first send.
3. Message streams in via `useChat()`; `MessageBubble` renders role/avatar/parts as they arrive.
4. A fenced code block in the assistant's reply that is a "compilable" file type or a
   recognized widget-fence language mounts a live `CodePreview` widget inline in the message.
5. **Failure path**: if the widget throws at mount/runtime, the self-heal loop (below) fires
   automatically — the user should see this as "the assistant tried again," not an error dead-end.
6. **Failure path**: unclosed/streaming code fences render as raw text until the fence closes,
   not as a broken widget mount.

### Flow: Self-heal a failing widget
1. A widget mounted from an assistant message throws (`onWidgetError` reporter fires).
2. The orchestrator effect, gated on `status === "ready"` and only for messages produced in
   the current send window, looks at the newest assistant message's recorded failure.
3. If under the auto-fix budget (`MAX_WIDGET_AUTOFIXES = 2` per message) and not already
   responded to, it automatically sends a follow-up message quoting the error plus a recent
   problems digest — no user action required.
4. The budget must still be 2 attempts per message after the refactor, and a real user-typed
   send must still reset/arm the window exactly as before.

### Flow: Open a tab (native surface / app / workflow / file)
1. User clicks a row in the sidebar (native surface, e.g. "Agents"), an Apps entry, a
   workflow, or a workspace file in the tree.
2. A tab opens keyed by its namespaced path: `native://<surface>`, `app://<name>`,
   `workflow://[app/]<name>`, or a plain workspace path for files.
3. The tab strip shows the right icon per namespace; tab content dispatches to the matching
   panel (`native` → `PanelHostProvider`-hosted panel; `app`/`workflow` → `AppsPanel` /
   `WorkflowDetail`; file → `CodePreview`/`WorkspaceFilePreview`).
4. Navigating from an app to one of its workflows re-keys the existing tab in place (does not
   open a second tab) — `retitleAppsTab` behavior.
5. Tab open/close state and the active tab persist across reload (localStorage-backed).

### Flow: Session lifecycle (new / switch / apply / discard / sync / merge)
1. User starts a new session, switches between sessions, or lets the app boot into a
   previously active one (`loadActiveSessionId`).
2. Draft edits accumulate; user can Apply (commits the draft), Discard, Reset, Delete, or Sync.
3. A background poll (~20s) detects conflicting concurrent edits and surfaces a merge prompt;
   resolving it must still route through `MergeDialog` identically.
4. Presence (other peers viewing/editing the session) updates live via heartbeat.
5. All of the above must remain reachable through the same `SessionBar` control surface with
   identical callback semantics (`SessionBar` is presentation-only; every mutation is a
   callback owned by whatever now hosts session state).

### Flow: Edit a file via the shared edit session (EditModal)
1. User opens a file for editing (from a tab or a widget's "edit" affordance) —
   `openSharedEditSession` opens `EditModal` over the current workspace path.
2. Edits stream through `EditTransport`/`buildEditMessages`; a live compile+preview inside the
   modal shows the widget re-rendering as edits land, using the same compiler instance as the
   rest of the app.
3. On close, the draft either applies, is kept as a draft (`keepEditDrafts` setting), or is
   discarded per the existing conflict-resolution rules in `finishEditDraft`.

## Screens & States

### Chat dock (message list + composer)
Purpose: primary conversation surface. Key elements: scrollable message list, per-message
role/avatar, reasoning/tool collapsibles, inline widget mounts, composer with provider/model
picker, resizable split against the preview pane.
- Loading: streaming indicator while `status !== "ready"`.
- Empty: no messages yet in a fresh session — must render the current empty state, not a blank pane.
- Error: transport error surfaces via `error` from `useChat()` — same placement/copy.
- Partial: a widget still streaming (unclosed fence) renders as raw text, not a broken mount.

### Tab strip + preview pane
Purpose: multi-tab workspace navigation across native surfaces, apps, workflows, and files.
- Loading: workspace file listing / directory load in progress (`workspaceLoading`).
- Empty: no tabs open — collapsed/placeholder preview state.
- Error: `workspaceError` / compiler error surfaces (`compilerError`) must still be visible,
  not swallowed by the refactor's new module boundaries.
- Partial: a tab that failed to reload after external changes (stale-tab reload path).

### Sidebar (workspace explorer)
Purpose: file tree + native surfaces + Apps sub-explorer, pinning, create/delete file.
- Loading: initial workspace boot load.
- Empty: empty workspace (no files, no pins).
- Error: delete/create-file failures must still surface feedback, not fail silently.
- Collapsed state: `sidebarOpen` toggle behavior unchanged (including mobile drawer variant).

### Session bar + merge dialog
Purpose: session identity, mode (chat vs draft), Apply/Discard/Sync/Delete actions, presence.
- Busy: `sessionBusy` disables actions mid-mutation — must still disable, not double-fire.
- Notice: `sessionNotice` transient messaging (e.g. post-apply confirmation).
- Conflict: merge dialog opens on detected conflict; resolving it must still call through to
  the same completion path (`runMergeCompletion`).

### Edit modal
Purpose: focused single-file/widget edit surface with live compile preview.
- Loading: compiling the live preview.
- Error: compile error in the modal must render inline, not crash the modal.
- Draft-keep vs discard vs apply on close — all three paths preserved.

### Notifications bell
Purpose: header bell + drawer of notification feed, including rich widget-rendering
notifications (`NotificationPathWidget`, which needs `compiler` — this dependency must
survive wherever the compiler bootstrap ends up living).

## Component Inventory

No new components are introduced by this change beyond structural extraction of existing
JSX into new files. Existing primitives in use, mapped to their (now-single) canonical
source per `ui-component-sourcing`:
- `Avatar`/`AvatarFallback`, `Badge`, `Button`, `Collapsible`/`CollapsibleContent`/
  `CollapsibleTrigger`, `ScrollArea` — `@/components/ui/*` (vendored shadcn copies; this is
  the canonical source for all app-shell primitives per the new sourcing rule).
- `AppHeader`, `aprovanApps` — `@aprovan/ui/shell`.
- `AppsPanel`, `AppsCatalogProvider`, `useAppsCatalog`, `WorkflowDetail` — `@aprovan/registry-ui/apps-panel`.
- `resolveRenderer` — `@aprovan/registry-ui/renderers`.
- `CodePreview`, `WidgetPreview`, `MarkdownEditor`, `MarkdownPreview`, `EditModal`,
  `WorkspaceTree`, `MobileDrawer` — `@aprovan/patchwork-editor` (unaffected by this change).

## Open Questions

- None beyond the PRD's Open Question #2 (whether the missing automated test suite is in
  scope) — this doc assumes manual smoke-testing against the flows above is the acceptance
  gate, per that assumption.

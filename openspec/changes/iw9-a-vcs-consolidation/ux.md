## Vocabulary (governs every surface below)

The SessionBar rule (`SessionBar.tsx:5-9`) becomes product-wide law. The words
users see — and the Git words they never see:

| Users see | Never shown |
|---|---|
| version, "workspace as of 2h ago" | commit, hash (raw or shortened) |
| history / timeline | log, ref, branch |
| draft chat / chat | session (in chrome copy), branch |
| Apply to workspace | merge, stage, push |
| keep to itself / not yet applied | staged, uncommitted |
| Restore this version | revert, reset, checkout |
| publish a version (apps) | cut a release, tag |
| changes: new / edited / removed | +/~/− glyphs, diffstat |

Versions are identified by **time + author + message** ("Yesterday 4:12 PM ·
Maya · Fixed the invoice totals"), never by hash. `CommitMountedContent`'s
short token and `versions.tsx`'s `hash.slice(0,10)` both disappear. The panel
formerly titled "VcsPanel" is retitled **"Code host"** (it configures where
code is hosted); the user-facing history lives in the new History view.

## Flows

### Flow: See what changed, then look at the actual change
1. Entry: any change list — SessionBar strip, ChatDock card, SessionsPanel
   row, SandboxesPanel row, or SaveAffordance dialog (all now the one
   ChangeList component).
2. Each row: status word (new/edited/removed) + path. Click a row.
3. The Diff view opens for that file: before on the left ("Workspace,
   as of 2h ago"), after on the right ("This chat's version"), changed lines
   highlighted. Narrow viewports collapse to a unified view.
4. Exit: close returns to the origin surface; "Open file" jumps to the editor.
- Failure: content for a side can't load → the pane shows "Couldn't load this
  version — try again" with a retry; the other side still renders.
- Removed files: right side shows an explicit "This file was removed" state,
  not an empty editor.

### Flow: Browse history and undo (workspace or app)
1. Entry: History view from the sidebar (workspace scope) or from an app's
   header menu ("History" — app scope, walking `app/<id>`).
2. A reverse-chronological timeline: each entry shows relative time, author,
   message, and a compact change count ("3 edited, 1 new"). Merge entries
   from chats render with a joining connector and the chat's title ("From
   draft chat: Invoice cleanup") — the two-parent lineage made visible.
3. Selecting an entry expands its ChangeList; rows open the Diff view against
   the previous version.
4. "Restore this version" on any entry. Confirmation sheet: "The workspace
   will look exactly as it did <when>. Nothing is deleted — this adds a new
   entry to history, and you can restore forward again."
5. Confirm → restore runs → timeline gains "Restored to <when>" at the top;
   toast with "View history".
- Failure: restore fails → destructive-free error toast ("Nothing was
  changed") with retry; timeline unchanged.
- Empty: "No history yet — versions appear when you or a chat save changes."

### Flow: Auto chat answers "what did you just do?"
1. An auto chat (default mode) writes files directly; SessionBar shows
   "Changed 3 files" as soon as changes exist (no longer blank).
2. Expanding shows the ChangeList (session-touched paths only); rows open
   diffs of base vs current.
3. An "Undo these changes" action restores all listed paths to how they were
   when the chat started — one click, one confirmation ("Puts these 3 files
   back the way they were 25 minutes ago. This adds to history; nothing is
   lost.").
- Partial: when the touched-path set is unavailable, the list is labeled "All
  changes since this chat started (may include other activity)".

### Flow: Resolve a conflict with eyes open
1. Applying a draft chat hits conflicts → MergeDialog lists conflicted files.
2. NEW: each row embeds/expands the Diff view — left "Workspace version"
   (with who/when), right "This draft's version". No more choosing blind.
3. Per row: Keep this draft's version / Keep the workspace version / Combine
   with AI (AI result renders in the same Diff view against both sources
   before accepting).
4. Confirm applies all choices in one server call (`sessions.resolve`);
   success closes the dialog and shows the merged entry in History.
- Failure: resolve rejects (workspace moved again) → dialog refreshes the
  conflict set with a banner "The workspace changed while you were deciding —
  review again"; prior choices are kept where paths still conflict.
- AI failure: inline error on that row; other rows unaffected.

## Screens & States

### Diff view (new; packages/editor `DiffViewer` hosted in a sheet/dialog)
- Purpose: show what actually changed in a file between two versions.
- Elements: two labeled panes (plain-language labels with time/author, never
  hashes), changed-line highlighting, split/unified toggle (auto by
  viewport), "Open file" action.
- States: loading (skeleton panes); binary/huge file ("This file can't be
  shown as text — N KB changed"); one side missing (added/removed states);
  load error with retry per side.

### History view (new; replaces user-facing role of VcsPanel)
- Purpose: the workspace's (or one app's) timeline plus restore.
- Elements: scope header ("Workspace history" / "History — <app name>"),
  timeline entries (time, author, message, change count, chat-merge
  connector), expandable ChangeList, Restore action, load-more pagination.
- States: loading (row skeletons); empty (copy above); paginating (spinner
  row); restore-in-flight (entry-level progress, actions disabled); error
  banner with retry.

### ChangeList (new shared component; five former sites)
- Purpose: the single changed-paths renderer.
- Elements: status word chip (new = green, edited = amber, removed = red —
  words, not glyphs), truncated path with full-path tooltip, click-through to
  Diff view or file open (host-provided).
- States: empty ("No file changes"); long lists collapse behind "Show all N".

### MergeDialog (modified)
- Purpose: per-file conflict resolution with both versions visible.
- Elements: conflict rows with embedded diff, three choice buttons, bulk
  "Keep all mine / Keep all workspace", confirm bar with count.
- States: diff loading per row; AI busy/error per row; stale-conflict banner
  (see flow); submit-in-flight (all inputs disabled).

### SessionBar / ChatDock / SessionsPanel / SandboxesPanel (modified)
- Adopt ChangeList; vocabulary sweep: SessionsPanel loses the GitBranch icon
  (use History/Clock icon), "staged" wording, and Open/Merged/Closed tabs —
  now **Active / Applied / Archived**; SandboxesPanel "N uncommitted" becomes
  "N unsaved changes"; auto chats in SessionBar gain the change strip (was
  draft-only).
- States: unchanged hosts; the new strip on auto chats shows nothing until
  the first change exists (no zero-count noise).

## Component Inventory

- Diff view: `@codemirror/merge` inside shadcn `Sheet` (desktop) / `Dialog`;
  `Tabs` for split/unified; `Skeleton` loading; `Button` (ghost) actions.
- History view: shadcn `ScrollArea`, `Collapsible` per entry, `Badge` for
  change counts, `AlertDialog` for restore confirmation, `Toast` (sonner) for
  results; lucide `History`/`Clock`/`RotateCcw` icons (no `GitBranch`,
  `GitCommit`, `GitMerge` in user chrome).
- ChangeList: plain rows + `Tooltip`; status chips via `Badge` variants.
- MergeDialog: existing `Dialog` retained; embeds DiffViewer; `Alert` for the
  stale-conflict banner.
- SaveAffordance (packages/editor): receives ChangeList rows via render prop
  (no client/web import; tech-plan D5).

## Open Questions

(none requiring user input — vocabulary is fixed by the SessionBar rule and
IW-9; status-tab labels Active/Applied/Archived follow the documented
Applied/Archived statuses)

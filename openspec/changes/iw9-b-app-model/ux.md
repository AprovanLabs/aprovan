# iw9-b-app-model — UX

_Serves PRD goals 3 (promote-out), 4-5 (install + hosting pick), 6 (sharing),
7 (mounts), 8 (sidebar IA). Icons per iw9-f4's `appIconFallback` (letter +
FNV-1a-hashed color over a 12-color palette, T7 of `iw9-f4-app-identity`
tech-plan). Copy for the hosted/managed picker is specified verbatim by the
brief: managed = "in your own space"; hosted = loud disclosure naming the
host (invariant 5)._

## Flows

### Flow: Launch an app from the sidebar

1. User opens the workspace; sidebar renders **Files** (tree, unchanged) then
   an **Apps** section listing every app row (own, Personal, installed) —
   icon + title, in `apps.list` order.
2. User clicks a row.
3. The app opens in its pane/tab (`app-launcher` — "Launcher opens the app").
   Nothing about install status, hosting mode, or origin is shown on the row
   itself; that detail lives one level down (step 4).
4. To manage an app (rename, share, view hosting mode, promote, uninstall),
   user opens the **Apps** section's header affordance → `native://apps`
   management surface (`apps-native-surface`). This is the only path from the
   launcher to management — rows themselves never open a settings view.

**Failure path:** app fails to load (missing entry, broken `app.yaml`) → the
pane shows an inline error card naming the reconcile status (iw9-f4's
`reconcile.status`); the row itself still renders with its icon so the user
can still reach management.

### Flow: Promote a Personal widget to its own app

1. From the file tree or the Personal app's pane, user selects a
   subtree/widget under `Apps/personal/...` and invokes **"Make this its own
   app."**
2. Dialog asks for a slug (prefilled from the widget's folder name, editable);
   client-side shows the live preview URL (`/a/<slug>` pending id).
3. User confirms. Client calls `apps.promote {source, slug}`.
4. **Success:** dialog closes, a toast confirms ("Promoted to `<slug>`"), the
   Apps launcher gains a new row, and the widget's old location under
   `Apps/personal` is gone (`personal-app` — "Promote moves, mints, and
   re-points").
5. **Collision failure:** slug taken → inline field error naming the
   conflict, no dialog close, no partial state (`app-roots` overlap 409).
6. **Mid-flight failure:** any other error → dialog shows a retry-safe error
   banner; the subtree remains under `Apps/personal` untouched
   (`personal-app` — "Promote is atomic under failure"). Retrying re-runs the
   same promote call.

### Flow: Install an app, picking hosting mode when required

1. User finds an app in the directory / `native://apps` surface and clicks
   **Install**.
2. Client reads the app's declared `hostModes` (iw9-f4 `AppYaml.hostModes`).
   - **Single mode declared:** no picker; step 3 proceeds immediately with
     that mode (`app-data-hosting` — "Single-mode skips the prompt").
   - **Multiple modes declared:** a picker renders before any install call:
     - `managed` — *"Data lives **in your own space**. You can read, export,
       or delete it any time."*
     - `hosted` — loud disclosure naming the host by workspace/publisher
       identity, e.g. *"Data lives in **`<publisher>`'s** space. Everything
       they promise about it is a promise — not something you can verify or
       delete yourself."* This option is visually secondary (not
       pre-selected) and carries a persistent warning icon, never a plain
       radio row indistinguishable from managed.
3. User confirms a slug if the target `Apps/<slug>` already exists in their
   workspace (400-with-explicit-slug-choice path — see Open Questions #1 for
   whether this becomes an auto-suggested alternate slug).
4. Client calls `apps.install`; while the copy runs, the dialog shows a
   determinate-if-possible progress state ("Copying app…").
5. **Success:** dialog closes, toast confirms, the new row appears in the
   Apps launcher immediately with its icon.
6. **Declared-mode mismatch / other 400:** inline error naming the accepted
   modes or the slug conflict; dialog stays open.
7. **Later, on update availability:** the app's management row in
   `native://apps` shows "v(N) available → Copy again" (never an automatic
   update). Clicking it re-runs step 4 with an explicit **local edits will be
   overwritten** confirmation if the install has local edits
   (`app-install-lifecycle` — "Local edits guard the update").

### Flow: Share a file — with a person, or via a link

1. User right-clicks a file/folder in the tree (or uses a toolbar action in
   the file's pane) → **Share**.
2. Share dialog has two tabs: **Person** and **Link**.
   - **Person tab:** a user picker (workspace members only); confirming
     creates a person-share; the recipient sees it under their **Shared with
     me** listing immediately.
   - **Link tab:** an expiry selector (see Open Questions #2 for the default)
     and a **Create link** button. On creation, the dialog shows the full URL
     **exactly once**, with a copy button and a visible warning that it will
     not be shown again. Closing the dialog without copying does not destroy
     the link — it can be found (but not re-revealed) in Manage shares.
3. Every share the user has created is visible from a **Manage shares**
   panel on the file (or a workspace-wide list): kind (person/link),
   recipient or link label, created date, expiry (links), and a **Revoke**
   action per row.
4. **Revoke:** confirmation (`AlertDialog` — irreversible), then the row
   shows "Revoked" and access ends on the next request
   (`artifact-sharing` — "Revocation is immediate").
5. **Anonymous visitor opens a link:** file renders read-only, no
   navigation to siblings/parent, no edit affordance, no indication of
   workspace identity beyond what the file itself contains.
6. **Expired/revoked link opened:** a generic "This link isn't available"
   page — never distinguishable from a link that never existed
   (`artifact-sharing` — 404-indistinguishable).

### Flow: Manage mounts

1. From a workspace or app's settings (`native://apps` for app-scoped mounts;
   a workspace-level Mounts panel for workspace mounts), user views the
   mounts list: prefix, type (git/s3), backend, pinned ref/version, creator.
2. **Add:** a form — backend type (git repo + ref + optional subpath, or s3
   bucket/prefix) — validated client-side for prefix shape before submit.
3. **Success:** new mount appears in the list and the file tree without
   reload, marked with a read-only badge (`vfs-mounts` — "Mounted subtree is
   marked").
4. **Overlap failure:** inline error naming the conflicting app root or mount
   (409) — no silent partial add.
5. **Remove:** confirmation, then the mount disappears from list and tree;
   any content the mount served now 404s.

### Flow: Reach a demoted native surface

1. User needs a workspace-level surface (Credentials, Webhooks, Agents,
   etc.) that used to be a front-door sidebar row.
2. Sidebar shows a secondary **Workspace** affordance below/alongside Files
   and Apps (collapsed by default, or an overflow entry point — final
   placement is an implementation choice within `app-launcher`'s constraint
   that Files + Apps are visible without scrolling past it).
3. Expanding it lists the same `NATIVE_SURFACES` rows as today, unchanged in
   behavior; a restored `native://<id>` deep link opens its panel exactly as
   before regardless of sidebar placement.

## Screens & States

### Sidebar — Files + Apps + Workspace (secondary)

- **Purpose:** primary navigation; apps are the front door, native surfaces
  are one click deeper.
- **Key elements:** Files tree (unchanged), Apps section (header + rows),
  secondary Workspace affordance.
- **Loading:** Apps section shows row skeletons (icon-tile placeholders)
  while `apps.list` resolves; Files tree keeps its existing loading state.
- **Empty:** a workspace with zero apps (no Personal yet either) shows the
  Apps section with a single "No apps yet" row plus a create/install
  entry point — never an empty section with no explanation.
- **Error:** `apps.list` failure shows an inline retry row in the Apps
  section; Files and Workspace remain usable independently (partial
  failure does not block the rest of the sidebar).
- **Partial (reconcile error on one app):** that app's row still renders
  (icon, title from last-good state) with a small warning glyph; clicking it
  opens the error state described in the launch flow, not a broken/blank
  pane.

### Install dialog (hosting picker)

- **Purpose:** let the installer make an informed, unambiguous choice
  between managed and hosted before any data exists.
- **Key elements:** app identity (icon, title, publisher), mode picker
  (only when >1 declared), slug field (only on collision), confirm button.
- **Loading:** confirm button shows a spinner + "Copying app…"; dialog
  cannot be dismissed mid-copy (avoids orphaned half-installs from a user's
  perspective, even though the server-side operation is atomic).
- **Empty:** N/A (dialog always has the target app's identity).
- **Error:** 400 (undeclared mode, slug collision) renders inline, dialog
  stays open, no toast (toast is reserved for terminal outcomes).

### Promote-out dialog

- **Purpose:** turn a subtree into a first-class app with one clear,
  reversible-until-confirmed action.
- **Key elements:** source path (read-only), slug field (editable,
  pre-filled), preview URL, confirm button.
- **Loading:** confirm disabled + spinner during the move/mint/re-point.
- **Error:** slug collision (inline, field-scoped) vs. any other failure
  (banner, retry-safe, source untouched per the atomicity guarantee) are
  visually distinct — the first is a normal validation state, the second is
  an operation failure.

### Share dialog (Person / Link tabs)

- **Purpose:** create a share without ever implying installability or
  visibility of the containing app.
- **Key elements:** target file/folder path (read-only header), Person tab
  (user picker, existing person-shares list), Link tab (expiry selector,
  create button, one-time key reveal, existing link-shares list).
- **Loading:** user-picker search shows a spinner in the input.
- **Empty:** no existing shares on this file → tabs show "Not shared with
  anyone yet" / "No links yet" rather than blank space.
- **Error:** create failure (network, validation) shows inline error in the
  active tab; does not silently fail.
- **One-time-reveal state:** the link key is visually distinct (monospace,
  boxed, copy button) with a "won't be shown again" caption that persists
  until the dialog closes — this is the state most likely to be missed if
  unhandled, so it is enumerated explicitly here.

### Shared with me (recipient listing)

- **Purpose:** the one place a person-share recipient finds files shared
  with them, independent of any app or folder they navigated to.
- **Key elements:** flat list of shared files/folders, sharer identity,
  shared date.
- **Empty:** "Nothing shared with you yet."
- **Error:** load failure shows retry; does not block the rest of the
  workspace UI (this is a supplementary listing, not a blocking view).

### Manage shares (per-file or workspace-wide)

- **Purpose:** the sharer's control surface — see and revoke every share
  they created.
- **Key elements:** table (kind, recipient/label, created, expiry, status,
  revoke action).
- **Loading:** table skeleton rows.
- **Empty:** "You haven't shared anything yet."
- **Error:** revoke failure shows inline row-scoped error, does not revert
  the row to "active" silently — the row stays in a distinct "revoke
  failed, retry" state until the user retries or reloads.

### Mounts panel

- **Purpose:** make the previously-invisible mount engine visible and
  operable.
- **Key elements:** table (prefix, type, backend, pinned ref, creator, remove
  action), Add-mount form.
- **Loading:** table skeleton; Add button disabled until the engine confirms
  the backend is reachable (git ref resolves / s3 prefix exists) — surfaced
  as a pre-submit validation state, not a silent failure after submit.
- **Empty:** "No mounts yet — shared content from another workspace or repo
  arrives here."
- **Error:** overlap 409 and backend-unreachable 400 render as distinct
  inline messages (the first names the conflicting app/mount; the second
  names the backend that failed to resolve).

## Component Inventory

| Screen / element | shadcn/ui primitive(s) |
|---|---|
| Apps launcher rows, icon fallback tile | custom `AppIconTile` (letter+color per iw9-f4) composed with `Avatar` |
| Sidebar sections (Files / Apps / Workspace) | `Collapsible` + existing sidebar list primitives |
| Install / Promote / Share dialogs | `Dialog` |
| Hosting mode picker | `RadioGroup` (two `RadioGroupItem` cards, not plain radio buttons — the hosted option needs room for its disclosure copy) |
| Slug field with live preview | `Input` + inline helper text |
| User picker (person-share) | `Command` (combobox) inside `Popover` |
| Expiry selector (link-share) | `Select` |
| One-time key reveal | `Input readOnly` (monospace) + `Button` (copy) + inline caption |
| Manage shares / Mounts tables | `Table` |
| Revoke / Remove confirmations | `AlertDialog` |
| Row-scoped and dialog-scoped errors | inline `Alert` (not toast — toast is reserved for terminal success/failure of a whole operation) |
| Terminal success/failure notices | `Sonner`/toast |
| Loading rows/tiles | `Skeleton` |
| Warning glyph (reconcile error, hosted disclosure) | `Badge` (destructive/warning variant) + `Tooltip` for detail on hover |
| Mounted-subtree marker in file tree | `Badge` (secondary variant, "Mounted") |

## Open Questions

_(Carried from PRD Open Questions — these are UX-shaping and need a product
decision before final copy/flow lock; recommendations restated here in UX
terms.)_

1. **Copy-install slug collision** — does the install dialog auto-suggest a
   suffixed slug (e.g. `tasks-2`) for the user to accept/edit, or does it
   just surface the 400 and ask the user to type a new one? Recommended:
   auto-suggest (fewer round trips), matching PRD's recommendation.
2. **Share-link default expiry** — does the Link tab's expiry selector
   default to "7 days" (with "No expiry" as an explicit opt-in choice further
   down the list, visually de-emphasized like the hosted mode) or must the
   user always pick? Recommended: default to 7 days, per PRD.
3. **Secondary "Workspace" affordance placement** — collapsed section at the
   bottom of the sidebar, or an overflow/kebab menu off the sidebar header?
   Both satisfy `app-launcher`'s requirement ("reachable, not front-door");
   this is a visual-density call the PRD does not make. Recommended:
   collapsed section (lower discovery cost than a hidden overflow menu, and
   deep-linked surfaces still need *a* visible place to land from once
   opened).

# UX — app-model-split (IW-1)

User-facing surface in four places: the new **Apps** native pane (list/directory/detail with
install flows), the **sidebar** (apps sub-group removed, Apps row added), the **file tree**
(Private section re-rooted, Personal gone), and **workflow visibility** (unbundled flows are
yours alone). Visual polish beyond structural wiring is IW-4; this change ships working,
plain states on existing primitives.

## Flows

### Flow: Opening apps as a native surface (apps-native-surface)

1. User opens the sidebar Workspace section: rows read Apps, Data, Agents, … (Apps first).
   There is no "Apps" sub-tree, drag handle, or split pane below the rows anymore; the file
   tree takes the freed space.
2. Clicking Apps opens a `native://apps` content tab, like every other surface.
3. The pane opens on the apps list: the workspace's own apps and its installations, with a
   "Directory" affordance. Selecting an app navigates to its detail inside the pane
   (back affordance returns to the list).
4. Failure path: apps service unreachable → the pane shows the standard panel error state
   with retry; the tab stays open.

### Flow: Installing an app from the directory (app-install-lifecycle, app-dependencies)

1. In the Apps pane, user opens the Directory tab: every public app in the deployment —
   title, origin workspace, description, declared dependencies as chips (`sql`, `llm`,
   `github: repos.get`), current release.
2. User clicks Install on an entry. The install sheet shows: pin (channel `live` default, or
   pick a release), and one row per required contract — pre-filled with the tenant's
   `default` profile for that contract when one exists.
3. Rows with no resolvable profile show "No sql profile yet" with a link to the
   Credentials/Profiles surface; Install stays disabled until every non-optional requirement
   is bound (or the user creates a profile and returns).
4. Confirm → installation appears in the pane's Installed group with its pin and lineage
   ("installed from <origin workspace>/<name>").
5. Failure paths: origin app went private mid-flow → install fails with not-found, entry
   removed from the directory on next load; binding write fails → install not recorded,
   error names the contract.

### Flow: Updating and configuring an installation

1. Installation detail shows: pin (channel or release), resolved release with cut date,
   "Update available" when the channel points at a newer release, bindings (contract →
   profile), config (JSON editor), editing toggle (off).
2. Update → confirmation naming old → new release → pin re-resolves; a release-pinned
   install offers "switch to release…" instead.
3. Rebinding a contract opens the same profile picker as install; saving takes effect on the
   app's next call.
4. Enabling editing warns: "Copies the pinned release's source into this workspace at
   <prefix>; future updates from the origin will overwrite local edits (or be blocked)."
   Confirm → source materializes; the app detail now shows the fork's own release controls.
5. Failure paths: origin unavailable → detail shows `available: false` badge, update
   disabled with explanation, app keeps running from its pin; revoked profile grant →
   bindings row flags "unfulfilled" with a re-bind CTA (mirrors `apps.capabilities`).

### Flow: Renaming an app breaks nothing (app-identity)

1. Owner opens their app's detail → rename (name field in settings).
2. On save: collision → inline 409 error naming the holder; success → URLs shown update to
   the new alias, the detail exposes a copyable id permalink "(stable link)".
3. Installations elsewhere show the new name on next load; their data, pins, and bindings
   are visibly unchanged.

### Flow: My private space after Personal (per-user-space)

1. File tree: the "Private" section now maps to the caller's `.users/<sub>` space — same
   rendering, new root. Empty state keeps the "visible only to you" hint.
2. The Apps pane has **no Personal entry**. A member's unbundled workflows appear under a
   "Your flows" group in their private context (and nowhere else); other members do not see
   them.
3. Attempting to share a flow funnels to publishing: "Publish an app that exports this
   workflow" CTA (prefills `apps.publish`).
4. Failure path: old gateway that still lists `.personal` → the client no longer maps that
   prefix; those files appear as ordinary (hidden-by-server) paths — acceptable within the
   same deploy train (nuke-and-reseed).

## Screens & States

### Apps pane — list (registry-ui AppsPanel, pane variant)

- **Purpose**: one home for own apps, installations, and the directory entry point.
- **Key elements**: groups (Your apps / Installed / Directory link), per-row title,
  visibility badge, workflow count, release/pin chip; New App CTA.
- **States**: *loading* — panel skeleton (existing `NativePanelProps` shell pattern);
  *empty* — "No apps yet" + create/browse-directory CTAs (no synthesized Personal card);
  *error* — inline retry; *partial* — installs whose origin is gone render with
  `available: false` badge, still openable.

### Apps pane — directory

- **Purpose**: discover and install public apps of this deployment.
- **Key elements**: search/filter, entry cards (title, origin, description, dependency
  chips, release date), Install button.
- **States**: *empty* — "No public apps in this deployment yet"; *loading* — card skeletons;
  *error* — retry; *already installed* — Install becomes "Installed ✓ / Install again".

### Apps pane — app / installation detail

- **Purpose**: manage one app (owner view) or one installation (installer view) — the same
  detail component, sections gated by which entity is open.
- **Key elements**: header (title, alias, id permalink, lineage line for forks/installs),
  tabs: Overview, Workflows, Access (existing capability report + new Dependencies section),
  Releases (owner or materialized fork only), Install settings (installations only: pin,
  update, bindings, config, editing).
- **States**: *unfulfilled binding* — warning row + re-bind CTA; *update available* — badge
  on the pin chip; *origin gone* — banner, update disabled; *degraded gateway* (no profile
  storage) — bindings section shows the ungated warning from `apps.capabilities`.

### Install sheet

- **Purpose**: complete an install with every requirement bound.
- **Key elements**: pin selector (channel default), requirement rows (contract → profile
  select, native-default preselected), optional-requirement rows collapsed, config JSON
  (optional), Install button.
- **States**: *no profile for a contract* — row error + "Create profile" link, Install
  disabled; *all defaults resolve* — one-click install; *server rejects* — sheet stays open
  with the server's message.

### Sidebar Workspace section

- **Purpose**: navigation rows only.
- **Key elements**: one row per `NATIVE_SURFACES` entry (Apps first); no sub-trees.
- **States**: unchanged from other rows (no data dependency, so no loading/error states of
  its own — the old count badge and catalog dependency are gone).

### File tree — Private section

- **Purpose**: unchanged (data-auth-model UX); only the backing root moves to
  `.users/<sub>`.
- **States**: as shipped — empty hint, feature detection, raw paths functional.

## Component Inventory

- Apps pane: existing `AppsPanel`/`AppsExplorer` composition from
  `@aprovan/registry-ui/apps-panel` + `apps/app-detail.tsx`, hosted in the standard panel
  shell (`components/panels/shell.tsx`); no new shell primitives.
- Directory cards / install sheet: shadcn/ui `Card`, `Badge` (dependency chips), `Select`
  (profile picker), `Sheet`/`Dialog`, `Button`; JSON config uses the existing code editor
  primitive from the panels.
- Detail tabs: existing app-detail tab strip; Dependencies section reuses the Access tab's
  row primitives; lineage line is plain text + `Badge`.
- Sidebar rows: existing `WorkspaceSurfaces` row buttons (kept), minus the SidebarApps
  split-pane machinery (deleted).
- File tree: unchanged tree components; only the prefix constant changes.

## Open Questions

1. **Directory placement**: a tab inside the Apps pane (spec'd) vs a separate surface.
   Recommendation: tab — one surface per namespace is the invariant being restored.
2. **"Your flows" placement**: inside the Apps pane as a personal group, or attached to the
   Private file-tree section? Recommendation: Apps pane group labeled "Your flows (private)"
   — flows are runnable things, and the pane is where run affordances live; the tree stays
   files-only.
3. **Install-again (multiple installs of one app in one workspace)**: allow silently or gate
   behind a "why" prompt? Recommendation: allow (identity model supports it; config
   differentiates), copy explains the second install gets separate data.

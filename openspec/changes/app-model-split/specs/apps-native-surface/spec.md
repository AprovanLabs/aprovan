# apps-native-surface

`apps` becomes a native surface like every other core service with a UI: one
`NativeSurfaceDef` entry opening a `native://apps` pane that hosts the apps panel, with
app selection happening inside the pane. The bespoke `SidebarApps` apps sub-group (split
geometry, drag handle, persisted heights) is deleted. This restores the namespace = surface
invariant (`registry/docs/native-surfaces.md`) and is the seam IW-4 `native-panel-polish`
builds on — the panel contract (`NativePanelProps`) is unchanged.

## ADDED Requirements

### Requirement: apps is a native surface

`native-surfaces.tsx` SHALL contain an entry `{id: "apps", Panel: AppsPanel}` with title,
icon, and description, so that the sidebar's Workspace rows, the `native://apps` tab key,
and surface lookup all serve apps through the one registry. The panel SHALL receive only
`NativePanelProps` (no bespoke prop threading from the page shell).

#### Scenario: Opening the apps surface

- **WHEN** the user clicks the Apps row in the Workspace section
- **THEN** a `native://apps` content tab opens hosting the apps panel, exactly like every
  other native surface row

#### Scenario: Surface registry is the single projection

- **WHEN** `nativeSurfaceById("apps")` or `parseNativeTabPath("native://apps")` is called
- **THEN** the apps surface definition is returned

### Requirement: App selection lives inside the pane

The apps pane SHALL open on the app directory/list and let the user select an app (installed,
own, or directory) inside the pane — list → detail navigation within `native://apps`. Deep
selection state (which app, which tab) SHALL NOT require a second sidebar tree.

#### Scenario: Select-app-on-open

- **WHEN** the apps pane opens with no prior selection
- **THEN** it shows the apps list (own + installed, with the directory reachable), and
  choosing an app shows its detail inside the same pane

### Requirement: The SidebarApps sub-group is deleted

The client SHALL NOT render an apps explorer inside the sidebar: `SidebarApps.tsx`'s split
pane, drag-resize handle, persisted height/collapse layout, and embedded `AppsExplorer` are
removed. The Workspace section becomes plain surface rows (one of which is Apps). Sidebar
state keys owned by the deleted component (`patchwork:sidebar-apps`) SHALL no longer be
read or written.

#### Scenario: No apps tree in the sidebar

- **WHEN** the client renders the sidebar
- **THEN** the Workspace section shows one row per native surface (including Apps) and no
  embedded apps explorer, drag handle, or persisted split height

#### Scenario: Grep gate

- **WHEN** `client/web/src` is searched for `SidebarApps` and `patchwork:sidebar-apps`
- **THEN** no match remains

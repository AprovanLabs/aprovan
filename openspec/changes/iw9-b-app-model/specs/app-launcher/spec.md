# app-launcher

Sidebar IA for an app-first product: the sidebar leads with **FILES** (the
workspace tree, already titled "Files" — `WorkspaceSidebar.tsx:144`) and an
**Apps launcher** — one row per app with its icon, opening the app. Icons are
required (D6): custom icon from `app.yaml`, else the iw9-f4 letter+color
fallback hashed from the slug. The 14-row native-surface list
(`native-surfaces.tsx:70-184`, rendered wholesale at
`WorkspaceSidebar.tsx:200-213`) is demoted from the front door. Promote-out
("make this its own app") and share entry points hang off launcher and file
tree context. Detailed flows are in ux.md.

## ADDED Requirements

### Requirement: The sidebar leads with Files and an Apps launcher

The workspace sidebar SHALL present, in order: the Files tree and an Apps
section listing the workspace's apps (own, Personal, and installed) as
launcher rows — icon + title — each opening that app. The launcher SHALL be
the primary app entry point; opening the apps management surface
(`native://apps`) SHALL remain reachable from the launcher's header, not as
a peer row per app.

#### Scenario: Launcher opens the app

- **WHEN** a user clicks an app row in the Apps section
- **THEN** the app opens (its pane/tab), not a management or settings view

#### Scenario: Personal and installed apps are rows like any other

- **WHEN** the workspace has a Personal app and an installed app
- **THEN** both appear as launcher rows with icons, indistinguishable in kind
  from locally-authored apps

### Requirement: Every launcher row has an icon

Each launcher row SHALL render the app's icon: the custom icon declared in
`app.yaml` when present, else the letter+color fallback derived from the slug
(renderer owned by iw9-f4). There SHALL be no icon-less row and no generic
shared placeholder icon.

#### Scenario: Fallback icon derives from the slug

- **WHEN** an app declares no icon
- **THEN** its row shows the first-letter tile in the color hashed from its
  slug — stable across sessions and clients

### Requirement: Native surfaces are demoted from the front door

The sidebar SHALL NOT render the full native-surface list as a top-level
section. Native surfaces SHALL remain reachable (a collapsed/secondary
"Workspace" affordance or overflow entry point), every `native://<id>` tab
key SHALL keep working, and the surface registry (`NATIVE_SURFACES`) SHALL
remain the single projection — this changes placement, not the registry
contract (`apps-native-surface`).

#### Scenario: Surfaces reachable but not front-door

- **WHEN** the sidebar renders
- **THEN** app rows and Files are visible without scrolling past service
  rows; native surfaces sit behind a secondary affordance and open exactly
  as before once invoked

#### Scenario: Deep links keep working

- **WHEN** a `native://credentials` tab is restored from a saved layout or
  URL
- **THEN** it opens the credentials panel unchanged

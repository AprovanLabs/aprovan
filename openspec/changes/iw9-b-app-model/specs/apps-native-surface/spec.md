# apps-native-surface (delta)

The apps surface stays a native surface (registry entry, `native://apps` tab,
panel contract unchanged), but it stops being the sidebar's way to reach apps:
the launcher (`app-launcher`) is the primary projection, and the apps pane
becomes the management surface behind it. This modifies `app-model-split`'s
statement that the sidebar's Workspace rows are how apps are reached.

## MODIFIED Requirements

### Requirement: apps is a native surface

`native-surfaces.tsx` SHALL contain an entry `{id: "apps", Panel: AppsPanel}`
with title, icon, and description, so that the `native://apps` tab key and
surface lookup serve apps through the one registry. The panel SHALL receive
only `NativePanelProps` (no bespoke prop threading from the page shell). The
sidebar SHALL reach the apps surface from the Apps launcher's management
affordance (and any demoted surface affordance), not via a dedicated
front-door service row; the registry remains the single projection for tab
keys and lookup.

#### Scenario: Opening the apps surface

- **WHEN** the user invokes the apps management affordance from the launcher
  header
- **THEN** a `native://apps` content tab opens hosting the apps panel, with
  the same panel contract as every other native surface

#### Scenario: Surface registry is the single projection

- **WHEN** `nativeSurfaceById("apps")` or `parseNativeTabPath("native://apps")`
  is called
- **THEN** the apps surface definition is returned

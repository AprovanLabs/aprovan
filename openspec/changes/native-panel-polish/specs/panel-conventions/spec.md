# panel-conventions — delta spec

## ADDED Requirements

### Requirement: Native panels share one presentation contract

Every native surface panel SHALL render its chrome and states through the shared shell
primitives (`PanelShell`, `PanelTabs`, `PanelLoading`, `PanelEmpty`, `PanelErrorWithRetry`,
`PanelUnavailable`), and SHALL implement loading, empty, error, and (where a feature can be
absent on a deployment) unavailable states. No panel SHALL render a blank pane or a raw
transport error for any of these states.

#### Scenario: Empty state names the next action

- **WHEN** a panel's primary listing has no items
- **THEN** the panel renders an empty state of at most two sentences that says what would
  appear there and names the action that creates it, rendering that action's control when
  the panel owns it

#### Scenario: Error state is human and recoverable

- **WHEN** a panel's data load fails
- **THEN** the panel renders a plain-language message with a retry control, and no raw HTTP
  status code, exception class, or stack text appears in the visible copy

#### Scenario: Capability gaps are not errors

- **WHEN** a panel feature is unavailable on the current deployment (a feature-detected
  501/absence rather than a failure)
- **THEN** the panel renders the unavailable state as a calm explanatory card without error
  styling, and hides the actions that depend on the missing capability

### Requirement: Panel copy is professional and non-engineering

All user-facing panel copy — surface titles and descriptions in the native-surface registry,
headers, empty states, error messages, button labels, helper text — SHALL use sentence case
and plain language, and SHALL NOT contain internal identifiers (namespace names, operation
names like `agents.run`, grant syntax, record-store scopes) except where the identifier is
itself the datum being displayed, in which case it is styled as a mono value.

#### Scenario: Surface descriptions read as product copy

- **WHEN** the sidebar registry (`native-surfaces.tsx`) descriptions are reviewed after the
  pass
- **THEN** each description states the user benefit in one plain-language line, and no
  description contains a dotted namespace/operation identifier

#### Scenario: Destructive actions are armed, not dialogs

- **WHEN** a user triggers a destructive action (delete, revoke, detach, remove) in any panel
- **THEN** the control arms in place and requires a second explicit confirmation click, and
  no panel uses `window.confirm`

### Requirement: The panel host contract is frozen

This change SHALL NOT modify the `NativePanelProps` interface, the `PanelHostActions`
interface, or the semantics of existing shell exports. All shell changes SHALL be additive
exports.

#### Scenario: Contract unchanged

- **WHEN** the declarations of `NativePanelProps` and `PanelHostActions` in
  `client/web/src/components/panels/shell.tsx` are diffed against the pre-change revision
- **THEN** they are identical, and the client and all panels still typecheck

### Requirement: The apps pane conforms once it exists

After IW-1 (`app-model-split`) ships the `apps` native surface, its panel SHALL be brought
onto the same conventions (shell primitives, states, copy tone) as part of this change's
gated final work stream. This requirement is inert until the `apps` surface exists.

#### Scenario: Apps pane joins the conventions

- **WHEN** the `apps` entry exists in `NATIVE_SURFACES` and the gated work stream runs
- **THEN** the apps panel renders through the shared shell primitives with the four states
  and copy rules of this spec, with no change to its data contracts from IW-1

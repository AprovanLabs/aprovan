# agents-pane — delta spec

## ADDED Requirements

### Requirement: Agents pane separates list, detail, and editor

The Agents pane SHALL present agent profiles as a compact list with a per-profile detail
view, instead of rendering every profile's full configuration inline. The list row shows
name/display name, a model-binding chip, and a one-line prompt preview; everything else
(grants, mounts, policy, timestamps, that profile's recent executions) lives in the detail
view.

#### Scenario: Scanning stays compact

- **WHEN** a workspace has ten agent profiles
- **THEN** the profile list shows ten rows of at most two lines each, and no grant/mount
  chips render in the list rows

#### Scenario: Detail carries the full story

- **WHEN** a user opens one profile from the list
- **THEN** the detail view shows the profile's humanized configuration, its recent
  executions (filtered to that agent), and edit/delete actions with an armed-confirm delete

### Requirement: The profile editor is sectioned and guided

Creating or editing a profile SHALL use a form grouped into labeled sections (Basics, Model,
Instructions, Access, Files) where only name and instructions are prominent; the Model
section SHALL offer the workspace's configured LLM interface instances as a picker (with
free-text fallback when the listing is empty or unreachable) instead of a bare text input;
the Access section SHALL introduce grants in plain language (empty = full access, entries
narrow).

#### Scenario: Minimal creation path

- **WHEN** a user creates an agent providing only a name and instructions
- **THEN** the profile saves successfully with defaults for every other section, via the
  same `agents` namespace `create` operation used today

#### Scenario: Model picked, not typed

- **WHEN** the workspace has LLM interface instances configured and the user opens the Model
  section
- **THEN** the binding is chosen from a picker listing those instances, and a free-text
  fallback input is available when the listing cannot be loaded

### Requirement: Executions view keeps live behavior with grouped presentation

The executions view SHALL keep the existing merged agent + sandbox run listing, in-progress/
history grouping, agent filter, expandable drill-down (turns, output, usage, cost), and the
existing polling discipline (poll only while non-terminal runs exist and the tab is
visible). Copy in the drill-down SHALL be humanized per panel-conventions, including the
explanation for workflow-attributed runs that carry no native turn detail.

#### Scenario: Live runs keep ticking

- **WHEN** a run is non-terminal and the executions view is visible
- **THEN** the list re-polls on the existing cadence, elapsed time ticks between polls, and
  polling stops once all runs are terminal or the browser tab is hidden

#### Scenario: Missing detail is explained

- **WHEN** a user expands a workflow-attributed run whose native detail fetch returns
  not-found
- **THEN** the row shows a plain-language explanation pointing at the workflow's trace
  instead of an error state

### Requirement: The agents dispatch chain is unchanged

The rebuilt pane SHALL invoke exactly the same backend surface as today — the `agents`
namespace operations (`list`, `create`, `update`, `delete`, `runs`, `getRun`) and
`sandboxes.runs` — with unchanged request/response shapes. No server change is part of this
capability.

#### Scenario: Same wire surface

- **WHEN** the rebuilt pane's network activity is compared to the previous pane across
  list/create/update/delete/runs/detail interactions
- **THEN** the set of invoked operations and their payload shapes are identical

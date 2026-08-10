# app-scoped-agent-profiles — apps run only what their manifest declares

## ADDED Requirements

### Requirement: App sessions may run manifest-declared profiles only

An app-scoped session (`ctx.appScope` set) SHALL be able to start a run for
an agent profile that the calling app's own manifest declares — addressed as
`<app-slug>/<agent>` — and for nothing else. The declaration in `app.yaml`
is the registration: no separate registration record exists, the profile is
rendered from the app's last-reconciled manifest at resolve time, and a
declaration that is removed from the manifest stops resolving. Any other
profile name from an app session, including a workspace-level profile or
another app's profile, SHALL be refused with the existing 403.

#### Scenario: Declared app profile runs

- **WHEN** an app session whose manifest declares `agents: [{ name: summarize, tools: [...] }]` starts a run for profile `chat/summarize`
- **THEN** the run starts, its record carries the app provenance (appId and slug) alongside the invoker as principal, and it executes through the same runner and dispatch path as any workspace run

#### Scenario: Arbitrary workspace profile is refused

- **WHEN** an app session starts a run naming a workspace-level profile it did not declare (or another app's `<slug>/<agent>`)
- **THEN** the call is refused with 403 "Apps cannot manage or run agent profiles" and no run record is created

#### Scenario: Removed declaration stops resolving

- **WHEN** an app's manifest is edited to drop a previously declared agent and the app session then starts a run for that name
- **THEN** the profile does not resolve and the run is refused — no stored copy of the declaration survives the manifest edit

### Requirement: Apps never provision profiles

Profile management remains workspace configuration authored by people: an
app-scoped session SHALL continue to be refused for `create`, `update`, and
`delete` of agent profiles, and the app-provenance field SHALL never be
settable through request input. Read procedures (`get`, `list`, `runs`,
`getRun`) SHALL remain permitted exactly as before this change.

#### Scenario: Create and update stay refused

- **WHEN** an app session calls `agents.create` or `agents.update`
- **THEN** the call is refused with 403, no profile record is written, and the refusal is unchanged from the behavior before app-declared profiles existed

#### Scenario: Reads remain permitted

- **WHEN** an app session calls `agents.get`, `agents.list`, `agents.runs`, or `agents.getRun`
- **THEN** the call succeeds as it does today, and app-shipped profiles are distinguishable from workspace profiles by their provenance field

### Requirement: Authority is the intersection, derived at run time

The effective tool authority of an app-scoped run SHALL be the intersection
of the declared profile's tool patterns, the app's installed capability
grants, and the invoker's grants — computed at run render, never
snapshotted — and the runner's dispatch-time grant re-check SHALL be
unmodified. Declaring a tool pattern SHALL NOT grant it.

#### Scenario: Declaration does not widen authority

- **WHEN** an app declares an agent whose `tools` include a pattern the invoker's grants do not cover, and the run attempts a call under that pattern
- **THEN** the run's pattern list never contained it, the call is denied at dispatch exactly as an out-of-grant call is denied for a workspace run, and nothing about the app declaration changes the outcome

#### Scenario: Declaration cannot exceed the app ceiling

- **WHEN** an `app.yaml` declares an agent whose `tools` patterns are not covered by the app's own declared capability ceiling
- **THEN** manifest validation rejects it with an error naming both the offending pattern and the ceiling, and the app does not reconcile with that declaration

# app-dependencies

Declared dependencies and their fulfillment. An app declares what it needs to run — interface
contracts (`sql`, `llm`, …), provider requirements (exact procedures), and native capability
tiers — as manifest data validated at publish time. Installation fulfills each interface
requirement by binding a tenant Profile (native-backed default). The existing three-tier
capability model (`capabilities.ts`: auto-partitioned natives, exact provider grants,
exported workflows) is **extended, not replaced**: declarations feed the same publish/call
validation and the same `apps.capabilities` report.

## ADDED Requirements

### Requirement: Apps declare interface-contract requirements

The manifest SHALL support `requires: [{contract, profileName?, optional?}]` where `contract`
is an interface id (e.g. `sql`, `llm`, `vcs`). Publish SHALL validate that each named
contract exists in the interface catalog. `allowedTools` entries naming a declared contract's
namespace SHALL be permitted as exact procedures (the tier-2 rule applied to interfaces),
dispatched through the profile bound at install/use time.

#### Scenario: Publish validates declared contracts

- **WHEN** an app is published with `requires: [{contract: "sql"}]`
- **THEN** the publish succeeds and `apps.get` reports the requirement; publishing
  `requires: [{contract: "nonsense"}]` fails with 400 naming the unknown contract

#### Scenario: Declared requirements appear in capabilities

- **WHEN** `apps.capabilities` is invoked for an app with declared requirements
- **THEN** the report contains a dependencies section listing each contract, whether it is
  optional, and — for an installation — the profile currently bound to it

### Requirement: Provider requirements remain exact-procedure grants

Provider requirements SHALL continue to be expressed as exact `provider.procedure` entries in
`allowedTools` (never wildcards), validated at publish and re-validated at call time exactly
as today. Publish-time credential verification SHALL check that the executing tenant can
resolve a Profile (or zero-config credential fallback) for each granted provider.

#### Scenario: Wildcard provider grant still rejected

- **WHEN** an app is published with `github.*` in `allowedTools`
- **THEN** the publish fails with the existing tier-rule error pointing at exported workflows

#### Scenario: Grant with no resolvable executor

- **WHEN** an app granting `github.repos.get` is published in a workspace holding no github
  credential or profile
- **THEN** the publish fails with 400 naming the provider

### Requirement: Installation binds each interface requirement to a Profile

At install time the system SHALL bind every non-optional declared contract to a tenant
Profile of the installing workspace: explicitly (caller names a profile) or by default (the
contract's `default`-named profile, which is native-backed where a native implementation
registers for the contract). An install with an unfulfilled non-optional requirement SHALL be
rejected with a message naming the contract and how to create a profile for it. Bindings
SHALL be stored on the installation (`bindings: {contract → profileId}`) and re-bindable
without reinstalling.

#### Scenario: Default native binding

- **WHEN** a workspace installs an app requiring `sql` without naming a profile and the
  tenant has a `default` sql profile
- **THEN** the install succeeds with `bindings.sql` set to that profile's id

#### Scenario: Unfulfillable requirement blocks install

- **WHEN** a workspace installs an app requiring `sql` and no sql profile exists and none is
  named
- **THEN** the install fails with 400 naming `sql` and the profile-creation path

#### Scenario: Rebinding without reinstall

- **WHEN** `apps.configure` names a different profile for a bound contract
- **THEN** subsequent app-session calls on that contract dispatch through the new profile,
  and the install's other state (pin, config, data) is untouched

### Requirement: Granting a profile IS the credential grant

Binding a profile to an installation SHALL be recorded as a profile grant to the
installation's ULID (`{kind: "app", id: installId}`) via the registry-server grant store, and
app-session dispatch on the bound contract SHALL execute through that profile. Revoking the
grant SHALL cause subsequent dispatch on that binding to fail authorization. No parallel
app-credential mechanism SHALL exist.

#### Scenario: Bind writes a grant

- **WHEN** an installation binds contract `sql` to profile P
- **THEN** the grant store holds `{profileId: P, subject: {kind: "app", id: installId}}` and
  the app session's `sql.*` calls execute through P

#### Scenario: Revoke cuts execution

- **WHEN** an admin revokes P's grant to the installation
- **THEN** the app session's next `sql.*` call is denied, and `apps.capabilities` reports the
  binding as unfulfilled

### Requirement: Native capability tiers are extended in place

`NATIVE_APP_NAMESPACES` and the three-tier validation in `capabilities.ts` SHALL remain the
single source of the native tier; this change SHALL only re-key partition descriptions by
`appId` and add the dependencies section to the report. The descriptor model SHALL admit
future host-scoped tiers (e.g. `host: desktop`) as additional entries, not a parallel
structure.

#### Scenario: Existing tier validation unchanged

- **WHEN** the pre-change capability test suite runs against the new model (names replaced by
  ids where keys appear)
- **THEN** allow-list validation, workflow-export checks, and native descriptor filtering
  behave identically

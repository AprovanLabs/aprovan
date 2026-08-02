# profiles

The unified Profile primitive: `{name, target (interface|provider), credential ref,
options, grants}` — tenant-scoped; replaces bindings.json named instances AND
credential-label resolution; the allow-listing unit for callers. See tech-plan D3, D4,
D12 and the normative resolution algorithm in Interfaces & Data.

## ADDED Requirements

### Requirement: Profile schema

A Profile SHALL be a tenant-scoped record with: a `name` unique per
`(tenant, target_kind, target_id)`; a target that is either an interface id or a concrete
provider id; for interface targets, the compat provider that executes; an optional
credential reference; an `options` bag merged over compat defaults at dispatch; optional
server-enforced `limits`; and `created_by`. The name `default` is reserved for
bare-namespace dispatch. Profiles SHALL be stored in the registry server's relational
store, not on any file plane.

#### Scenario: Duplicate name rejected

- **WHEN** a tenant creates two `sql`-target profiles both named `docs`
- **THEN** the second creation fails with a uniqueness error naming the existing profile

#### Scenario: Interface profile validates its provider

- **WHEN** a profile is created with target interface `sql` and provider `github`
- **THEN** creation fails listing the compat providers that implement `sql`

#### Scenario: Credential reference validated at write time

- **WHEN** a profile is created referencing a credential id that does not exist in the
  tenant, or whose provider does not match the profile's executing provider
- **THEN** creation fails at write time (not at first dispatch) naming the mismatch

### Requirement: Named profile resolution

`ns.client("<name>")` in scripts and the `profile` field on the dispatch surface SHALL
resolve the Profile named `<name>` for the namespace's target in the caller's tenant. A
missing named profile SHALL fail listing the profile names that exist for that target.
Named profiles SHALL NOT fall back to zero-config resolution or to another credential
under any circumstance. A profile whose pinned credential has been deleted SHALL fail
loudly naming the profile and credential.

#### Scenario: sql.client("docs") routes through the profile

- **WHEN** a `sql` interface profile named `docs` exists (provider postgres, credential C,
  options `{database: "docs"}`) and a granted caller runs
  `(await sql.client("docs")).query({ sql })`
- **THEN** the call executes on the postgres module with credential C and the option
  defaults merged into missing args

#### Scenario: Missing named profile fails listing what exists

- **WHEN** a caller dispatches with profile `staging` and the tenant's `sql` profiles are
  `docs` and `analytics`
- **THEN** the call fails 404 with a message naming `staging` and listing `docs` and
  `analytics`, and no credential is resolved

#### Scenario: Deleted pinned credential fails loudly

- **WHEN** profile `docs` pins credential C and C is deleted, then a caller dispatches
  through `docs`
- **THEN** the call fails naming profile `docs` and credential C — it does not execute
  against any other credential

### Requirement: Default-name resolution and zero-config fallback

Bare namespace dispatch (`sql.query`, `github.repos.get`) SHALL resolve the profile named
`default` for the target. When no `default` profile exists — and only for the default
name — resolution SHALL fall back: interface targets to the first credentialless compat
entry, else the first compat provider holding a tenant credential; provider targets to
the tenant's first credential for that provider. A fallback with nothing to resolve SHALL
fail with the compat providers to connect (interface) or proceed credential-less only
where the surface accepts an ephemeral request credential.

#### Scenario: Bare interface call uses the default profile when present

- **WHEN** a `default`-named `sql` profile bound to snowflake exists and postgres also has
  a tenant credential, and a caller runs `sql.query(...)` with no profile
- **THEN** the call executes on snowflake per the profile — the credential-order fallback
  is not consulted

#### Scenario: Credentialless implementation wins zero-config

- **WHEN** no `agent`-target profile exists and the tenant holds an OpenAI credential
- **THEN** bare `agent.run` resolves to the credentialless native compat entry, not the
  vendor with a credential

### Requirement: Profiles are the allow-listing unit

When auth is enforced, dispatching through a stored Profile SHALL require a grant: a
`profile_grants` row for the caller's user, one of the caller's groups, or the caller's
actor identity (app, workflow, or agent). Admin-role callers pass; auth mode `none`
skips enforcement; the synthesized zero-config fallback (no stored profile) is not
grant-checked. Granting a profile IS the credential grant — no separate credential ACL
SHALL exist.

#### Scenario: Ungranted caller is refused

- **WHEN** a member-role caller with no matching user, group, or actor grant dispatches
  through profile `docs`
- **THEN** the call fails 403 naming the profile, and no credential payload is read

#### Scenario: Group grant admits the caller in one join

- **WHEN** group G is granted profile `docs` and a member of G dispatches through it
- **THEN** the call is authorized via a single grants query using the context's group ids
  (no per-call group-membership N+1)

### Requirement: Credential owner dimension

Credential records SHALL carry a `created_by` principal. New credentials record their
creator; the field is exposed on list/get surfaces. (Visibility and per-user credential
UX are WS-6; this change makes the dimension exist and be populated.)

#### Scenario: Creator recorded

- **WHEN** principal P creates a credential over HTTP or the embedding API
- **THEN** the stored record and its list projection carry `created_by = P`

### Requirement: Replaced mechanisms are deleted

`.services/bindings.json` reads/writes (`readBindings`, `writeBinding`, `listInstances`,
`interfaces.bind`, `interfaces.unbind`), credential-label resolution
(`resolveRecordByProfile`), and the `sql:analytics` instance-namespace syntax SHALL have
zero call sites when this change completes. The label field on credentials remains as
display metadata only.

#### Scenario: Colon namespace no longer routes

- **WHEN** a request arrives at `POST /tools/sql:analytics/query`
- **THEN** it fails with an unknown-namespace error that mentions profile dispatch
  (`profile` field / `client(name)`) as the replacement

#### Scenario: Label is not a resolution key

- **WHEN** two credentials for one provider share a label and a caller dispatches with a
  profile name equal to that label but no such Profile exists
- **THEN** resolution fails as an unknown profile (listing real profile names) — label
  matching is never attempted

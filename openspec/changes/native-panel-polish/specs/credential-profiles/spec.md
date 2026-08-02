# credential-profiles — delta spec

## ADDED Requirements

### Requirement: The workspace serves profile CRUD

The workspace server SHALL extend its `/profiles` surface to full CRUD over the embedded
registry-server profile storage (the structured `ProfileRow` model): `GET /profiles`
(member-readable list, keeping the existing summary consumers working), `POST /profiles`,
`PATCH /profiles/:id`, and `DELETE /profiles/:id` (admin-only mutations). All routes SHALL
answer 501 with the existing explanatory message when `profileGrantsAvailable()` is false,
and validation/authorization failures SHALL surface as their `ServiceError` status. No
response ever includes a credential payload.

#### Scenario: Admin round-trips a profile

- **WHEN** an admin POSTs a profile (name, target kind/id, optional executing provider,
  optional credential id, options, limits), then PATCHes it, then DELETEs it
- **THEN** each mutation persists through the embedded registry-server profile service, the
  list reflects each step, and the profile's credential is only ever referenced by id/label

#### Scenario: Members read, only admins write

- **WHEN** a non-admin member calls `GET /profiles` and then attempts `POST /profiles`
- **THEN** the list succeeds and the mutation is rejected with the authorization status, with
  no partial write

#### Scenario: Unavailable backend answers 501

- **WHEN** the deployment runs the interim dynamo backend
- **THEN** every `/profiles` route answers 501 with the existing explanatory message and no
  route throws an unhandled error

### Requirement: The Credentials panel surfaces profiles

The Credentials surface SHALL gain a Profiles tab alongside the existing credential manager:
a list of workspace profiles (name, target, pinned credential label, limits summary) visible
to all members, with create/edit/delete available to admins via a form covering target
picker, executing provider (interface targets), credential picker, options, and limits.
Deletion uses an armed confirmation. On 501 the Profiles tab renders the panel-conventions
unavailable state while the Credentials tab keeps working.

#### Scenario: Admin creates a profile bound to a credential

- **WHEN** an admin opens the Profiles tab, creates a profile targeting a provider, and pins
  one of the workspace's existing credentials
- **THEN** the profile appears in the list showing the credential's label (never its
  payload), and the same profile is offered by the Admin panel's attach picker

#### Scenario: Member sees but cannot edit

- **WHEN** a non-admin member opens the Profiles tab
- **THEN** the profile list renders read-only and no create/edit/delete affordance is shown

### Requirement: Profile UI lives in registry-ui behind a thin wrapper

The profile UI components SHALL be implemented in `@aprovan/registry-ui` (driven by the
injected `GatewayClient`, additive to the package's public API), and the product's
`CredentialsPanel` SHALL remain a thin composition of registry-ui components — no profile
business logic in `client/web`.

#### Scenario: Wrapper stays thin

- **WHEN** `client/web/src/components/panels/CredentialsPanel.tsx` is reviewed after the
  change
- **THEN** it composes registry-ui exports with client wiring (gateway client, OAuth
  redirect, prefill) only, and contains no profile form or fetch logic

#### Scenario: Package API is additive

- **WHEN** the registry catalog (an existing `@aprovan/registry-ui` consumer) builds against
  the new package version without code changes
- **THEN** its existing imports still compile and behave unchanged

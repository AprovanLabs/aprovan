# catalog-account-surfaces — Spec Delta

Live credential, admin, and OAuth-callback pages on the catalog in both session modes,
composed exclusively from published `@aprovan/registry-ui` components. Amends
`product-plane-move` repo-topology: account/admin routes are live surfaces again, not
moved-notice stubs.

## ADDED Requirements

### Requirement: Credentials page renders live in every mode

`/account/credentials` SHALL render the `@aprovan/registry-ui` `CredentialManager` behind
the session gate in both `hosted` and `standalone` builds. The moved-notice fork SHALL be
removed: the `MovedNotice` component, `chatNativeUrl`, and `account-host.ts` SHALL be
deleted, and the string "moved to the Aprovan product app" SHALL NOT appear in the built
site. Hosted builds MAY show a secondary "Open in workspace app" link.

#### Scenario: Standalone user sees live credentials

- **WHEN** a standalone user with a ready session opens `/account/credentials`
- **THEN** the page lists their registry-server credentials with add/revoke actions and
  never renders a moved notice

#### Scenario: Hosted user sees the shared store

- **WHEN** a hosted user adds a credential on `/registry/account/credentials`
- **THEN** the credential is created through the product gateway and is visible in the
  workspace app's native credentials panel without any sync step

#### Scenario: Moved notice eradicated

- **WHEN** the built catalog output (`dist/`) is searched for "moved to the Aprovan product
  app"
- **THEN** there are zero matches in any build mode

### Requirement: Admin page composes to backend capability

`/admin/permissions` SHALL render the `@aprovan/registry-ui` `AdminPanel` behind the
session gate, composed from an explicit capability list supplied by the host: hosted builds
pass the product-gateway capabilities (members, groups, permissions); standalone builds
pass the registry-server capabilities (api-keys, profiles + grants, audit). `AdminPanel`
SHALL render only the sections named in its capability list and SHALL NOT probe
unsupported endpoints.

#### Scenario: Standalone admin scope

- **WHEN** a standalone admin opens `/admin/permissions`
- **THEN** the page shows API-key mint/revoke, profile + grant management, and the audit
  log, and issues no requests to `/members` or `/groups`

#### Scenario: Hosted admin scope

- **WHEN** a hosted workspace admin opens `/registry/admin/permissions`
- **THEN** the page shows the existing members/groups/permissions management against the
  product gateway

#### Scenario: Non-admin caller

- **WHEN** a caller whose resolved role is not admin opens the admin page (server returns
  403)
- **THEN** the page shows an authorization error state, not a blank or crashed panel

### Requirement: OAuth credential callback works in both modes

`/account/oauth-callback` SHALL complete provider OAuth authorization-code flows in both
modes: validate the returned `state` against the pending flow, POST the
`oauth2_authcode` payload to the active session's gateway `/credentials` endpoint, and
report success/failure with a return path to the credentials page. The redirect URI used to
initiate flows SHALL be the catalog-owned `${base}/account/oauth-callback` in both modes.

#### Scenario: Successful standalone OAuth flow

- **WHEN** a standalone user completes provider consent and returns with a valid code and
  state
- **THEN** the callback page exchanges it via the registry-server `/credentials` endpoint
  and shows success with a link back to `/account/credentials`

#### Scenario: Successful hosted OAuth flow

- **WHEN** a hosted user completes the same flow
- **THEN** the credential is created through the product gateway using the hosted transport
  headers

#### Scenario: State mismatch

- **WHEN** the returned `state` does not match the pending flow
- **THEN** the page reports a CSRF-suspect error, clears the pending flow, and creates no
  credential

### Requirement: Thin hosts over the published UI package

Catalog account/admin hosts SHALL contain only session gating and composition — no
credential, OAuth, or admin domain logic. All such logic SHALL live in
`@aprovan/registry-ui` (with transport in `@aprovan/registry-main`), consumed by the
catalog as published npm packages. The registry repo SHALL NOT gain any dependency on an
aprovan checkout, and registry-server SHALL remain ignorant of catalog/product concepts.

#### Scenario: No duplicated credential logic

- **WHEN** `apps/registry/src` is searched for credential form, OAuth exchange, or admin
  table implementations
- **THEN** none exist outside imports from `@aprovan/registry-ui`

#### Scenario: npm-only reverse edge

- **WHEN** the registry repo is cloned fresh with no sibling aprovan checkout
- **THEN** `pnpm install && pnpm build` succeeds, resolving `@aprovan/ui`,
  `@aprovan/registry-ui`, and `@aprovan/registry-main` from npm

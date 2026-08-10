# app-slug — slug shape, uniqueness, rename-as-mv, global claims

Delta for iw9-f4-app-identity. Grounded in IW-9 decision D4.

## ADDED Requirements

### Requirement: Directory name is the vanity slug
An app's vanity slug SHALL be its app-root directory basename. An explicit `slug` field in `app.yaml`, when present, MUST equal the directory basename; a mismatch SHALL be rejected at reconcile with an error stating that the directory name is authoritative (resolves the D3/D4 field-vs-directory tension deterministically; not re-litigated).

#### Scenario: slug derived from directory
- **WHEN** an app root `…/recipes/` with an `app.yaml` lacking a `slug` field is reconciled
- **THEN** the app's slug is `recipes`

#### Scenario: mismatched explicit slug rejected
- **WHEN** an app root `…/recipes/` carries `slug: cookbook` in `app.yaml`
- **THEN** reconcile fails with an error naming both values and stating the directory basename is authoritative

### Requirement: Slug shape rules
Slugs SHALL match the existing app-name shape (lowercase, alphanumeric plus hyphen, starting alphanumeric, at most 64 chars — `NAME_RE` in `apps/store.ts`), with one added exclusion: any slug consisting of exactly 26 Crockford base32 characters (the ULID shape, case-insensitive) SHALL be rejected, so slugs and ULIDs remain disjoint namespaces and reference resolution (`resolveAppRef`) stays unambiguous.

#### Scenario: ULID-shaped slug rejected
- **WHEN** a slug of exactly 26 Crockford base32 characters (e.g. `01arz3ndektsv4rrffq69g5fav`) is submitted
- **THEN** validation fails with an error stating that ULID-shaped slugs are reserved

#### Scenario: ordinary slug accepted
- **WHEN** a slug like `team-recipes` is submitted
- **THEN** validation passes

#### Scenario: 26-char non-base32 slug accepted
- **WHEN** a 26-character slug containing a character outside the Crockford base32 alphabet (e.g. containing `u`, `i`, `l`, `o`, or a hyphen) is submitted
- **THEN** validation passes (only the exact ULID shape is excluded)

### Requirement: Workspace-unique slugs with rename as alias move
Slugs SHALL be unique per workspace. Rename SHALL be a directory `mv` reconciled as an alias move: the alias index rebinds the new slug to the same `appId`, the old binding is dropped, and no storage keys are rewritten. Binding a slug already held by a different app in the same workspace SHALL fail with a conflict (409) naming the holder.

#### Scenario: rename preserves identity
- **WHEN** an app root is renamed (`mv recipes cookbook`) and reconciled
- **THEN** the app keeps its `appId`, `cookbook` resolves to it, and `recipes` no longer resolves

#### Scenario: slug collision rejected
- **WHEN** a reconcile would bind a slug already held by a different app in the workspace
- **THEN** the operation fails with 409 naming the holding `appId`, and both apps' bindings are unchanged

### Requirement: Global slug claim registry for published apps
The platform SHALL provide an optional global slug claim registry (deployment-scoped, alongside the existing `svc#directory` index) mapping a globally unique slug to one `appId`. Only published (directory-visible) apps MAY hold a claim; claims obey the same shape rules including ULID-shape rejection; a claim SHALL be releasable by its holder and SHALL be dropped when the app is unpublished or removed. Vanity URL resolution (see app-url-scheme) consults this registry.

#### Scenario: claim granted once
- **WHEN** a published app claims a free global slug
- **THEN** the registry binds it to that `appId`, and a second app's claim of the same slug fails with 409

#### Scenario: unpublish releases claim
- **WHEN** an app holding a global slug claim is unpublished or removed
- **THEN** the claim is released and the slug becomes claimable

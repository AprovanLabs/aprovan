# per-user-space

The Personal pseudo-app is deleted. Two primitives replace it: (1) **per-app per-user opaque
partitions** — every app installation's per-user data lives in ID-keyed, SDK-managed
partitions the user never addresses by raw path; (2) the **private per-user space** — each
member's own area for unpublished workflows and files, visible only to them. Publishing
anything (making a workflow or UI reachable by others) requires bundling it under an app.
Enforcement semantics (deny-as-404, own-partition visibility in listings, audited `apps.data`
for app admins, no override for the private space) carry over from the `per-user-data` spec
of `data-auth-model` unchanged — this spec re-keys and re-homes the partitions.

## ADDED Requirements

### Requirement: The Personal pseudo-app is deleted

The system SHALL NOT synthesize, list, describe, or special-case a `personal` app: no
`apps/personal.ts`, no `builtin: true` wire entries, no `PERSONAL_APP_NAME`/
`PERSONAL_PREFIX`/`.personal` literals anywhere in server, client, or shared packages, and no
Personal group in the apps catalog UI. `apps.list` SHALL return only real apps.

#### Scenario: Directory has no Personal entry

- **WHEN** `apps.list` or the directory is invoked on a fresh workspace with no published apps
- **THEN** the app list is empty (no synthesized entry), and the client renders the empty
  state, not a Personal card

#### Scenario: Grep gate

- **WHEN** server, client, and package sources are searched for `PERSONAL_APP_NAME`,
  `PERSONAL_PREFIX`, `.personal`, or `isPersonalApp`
- **THEN** no match remains

### Requirement: Per-app per-user partitions are ID-keyed and opaque

Each installation's per-user data SHALL live under an ID-derived root — file plane
`.apps/<id>/data/<sub>/…` and record scope `app#<id>#u#<sub>` where `<id>` is the app's ULID
(origin-hosted use) or the installation's ULID (installed use) — decoupled from the app's
authored source paths. App sessions SHALL reach their partition only through the native
namespaces (vfs relative paths, keyvalue), never by constructing the raw root; the SDK
manages the mapping. The partition roots SHALL be hidden from general listings and
read-enforced exactly as the `per-user-data` spec defines (foreign access answers 404,
audited `apps.data` for the app's admins).

#### Scenario: App session lands in the ID-keyed partition

- **WHEN** an app session for user U writes a relative vfs path and a keyvalue key
- **THEN** the file lands under `.apps/<id>/data/<U>/…` and the record under
  `app#<id>#u#<U>`, with `<id>` the ULID of the app or installation serving the session

#### Scenario: Rename and source-move neutrality

- **WHEN** the app is renamed or its authored source folder is moved
- **THEN** every user's partition content remains readable at the same storage keys

#### Scenario: Foreign partition stays unprobeable

- **WHEN** member B addresses any exact path under `.apps/<id>/data/<A>/` (A ≠ B), including
  version-pinned reads
- **THEN** the response is 404, byte-identical to a nonexistent path

### Requirement: Every member has a private per-user space

The system SHALL give each workspace member a private space rooted at `.users/<sub>/` (file
plane) and record scope `user#<sub>` (record plane): readable, writable, and listable only by
its owner; foreign access answers 404; **no admin override of any kind**; excluded from VCS
snapshots and restores. Listings SHALL include the caller's own space, and the client SHALL
render it as the "Private" section of the file tree.

#### Scenario: Own space is a visible place

- **WHEN** member A lists the workspace
- **THEN** A's own `.users/<A>/…` entries appear (rendered as "Private"), and no other
  member's space appears in any listing

#### Scenario: No admin override

- **WHEN** a workspace admin attempts to read `.users/<other>/…` through any file API or
  procedure
- **THEN** the file APIs answer 404 and no procedure exists that serves it

### Requirement: Unpublished workflows live in their creator's private space

A workflow registration not exported by any app SHALL belong to its creator: runnable and
visible only to that member (their private space's flows), and not listed to other members.
Exporting a workflow from a published app SHALL be the only way to make it visible to and
callable by others. The workflow store SHALL record the owning member on registration.

#### Scenario: Unpublished workflow is private

- **WHEN** member A registers a workflow and no app exports it
- **THEN** A sees and can run it from their private space; member B's listings do not
  contain it and B's attempt to run it by name is denied as not found

#### Scenario: Publishing requires an app

- **WHEN** member A wants member B to use the workflow
- **THEN** the only path is exporting it from an app (`apps.publish` with the workflow in
  `workflows`), after which it is callable through that app's namespace

### Requirement: Client private-section mapping follows the new root

The chat client's private-partition mapping SHALL translate `.users/<sub>/…` (not
`.personal/data/<sub>/…`) to the "Private" display section, keeping raw paths functional in
tabs, URLs, and FS routes, and keeping the feature-detection behavior (no section on
gateways that never list the space).

#### Scenario: Private section renders from the new prefix

- **WHEN** the gateway lists entries under the caller's `.users/<sub>/`
- **THEN** the file tree shows them under "Private", and round-tripping display ↔ raw paths
  preserves the `.users/<sub>` root

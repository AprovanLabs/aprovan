# vcs-scoped-commits

Commit creation scoped by subtree prefix and target ref, with prefix-aware
snapshot identity. Foundation for D10 app-level VCS (`app/<id>` refs, consumed
by `iw9-a-vcs-consolidation`).

## ADDED Requirements

### Requirement: Scoped commit creation

`commitTree` SHALL accept an optional `prefix` (default `""` = whole visible
workspace) and an optional `ref` (default `main`). The snapshot SHALL cover
only visible entries at or under `prefix`, and the resulting commit SHALL
advance the named ref. Ref names MUST be validated against the existing ref
grammar (`refName`); an invalid ref SHALL be rejected with status 400. The
`vcs.commit` tool SHALL expose both parameters, and its discovery entry's
input schema SHALL declare them.

#### Scenario: Default arguments reproduce legacy behavior

- **WHEN** `commitTree` is called with only `message` and `author`
- **THEN** the snapshot covers the whole visible workspace, the commit
  advances `main`, and the result shape is identical to pre-change behavior

#### Scenario: Scoped commit covers only the subtree

- **WHEN** a workspace contains `Apps/a/file.md` and `other/file.md` and
  `commitTree` is called with `prefix: "Apps/a"`
- **THEN** the persisted snapshot's entries contain `Apps/a/file.md` and do
  not contain `other/file.md`, and the snapshot's `prefix` field is `"Apps/a"`

#### Scenario: Commit advances the named ref only

- **WHEN** `commitTree` is called with `ref: "app/x"` in a workspace whose
  `main` ref points at commit M
- **THEN** the new commit becomes the head of `app/x` and `main` still points
  at M

#### Scenario: Invalid ref name is rejected

- **WHEN** `commitTree` is called with `ref: "NOT A REF"`
- **THEN** the call fails with status 400 and no snapshot, commit, or ref
  record is written

### Requirement: Prefix-aware snapshot identity

The snapshot id SHALL incorporate the scope prefix whenever the prefix is
non-empty, so identical subtree content under different scopes yields
different snapshot ids. For an empty prefix the id computation SHALL be
byte-identical to the pre-change algorithm (no new hash line), preserving all
existing snapshot and commit ids.

#### Scenario: Identical content in different scopes does not collide

- **WHEN** two snapshots are built from entry lists with identical
  `(path, hash)` pairs but prefixes `"Apps/a"` and `"Apps/b"`
- **THEN** the two snapshot ids differ

#### Scenario: Same scope and content is idempotent

- **WHEN** `commitTree` runs twice with the same `prefix` and `ref` and no
  intervening writes under that prefix
- **THEN** the second call returns the first commit with `created: false` and
  writes no new snapshot or commit record

#### Scenario: Whole-workspace ids are unchanged

- **WHEN** a snapshot is built with prefix `""` from a workspace without
  mounts
- **THEN** its id equals the sha256 of the sorted `<hash> <path>` lines
  exactly as computed before this change

### Requirement: Fresh ref starts a root commit

The first commit on a ref that does not yet exist SHALL have an empty parent
list. It SHALL NOT implicitly parent from `main` or any other ref; seeding a
new ref from an existing commit is the caller's job (stream A owns `app/<id>`
seeding policy).

#### Scenario: First commit on a new ref has no parents

- **WHEN** `commitTree` is called with `ref: "app/x"` and no `app/x` ref
  exists
- **THEN** the created commit's `parents` is `[]` and the `app/x` ref is
  created pointing at it

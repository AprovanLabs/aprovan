# Brief: New scoping test coverage

## Mission

Streams 1-3 thread `prefix`/`ref` scope parameters through the entire VCS
stack (store → native wire contract → workspace backend/discovery), but none
of them add end-to-end test coverage — the 22 pre-existing legacy VCS suites
are out of scope (owned by `iw9-f6-cleanup-rename`) and must not be edited.
When you are done, a new `server/workspace/tests/vcs-scoping.test.ts` file
exists that exercises every scenario in all three specs for this change
(`vcs-scoped-commits`, `vcs-ref-enumeration`, `vcs-diff-wire-fidelity`)
end-to-end through the real dispatch path, plus the two grep-gate
definition-of-done checks (`listRefs` has a non-test caller;
`readRef(workspaceId, "main")` no longer appears in `native-dispatch.ts`).
This is the acceptance gate for the whole change — it only makes sense to run
after streams 1, 2, and 3 have landed.

## Read first

1. `openspec/changes/IW-9-APP-FIRST.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-f1-vcs-scoping-params/prd.md`
4. `openspec/changes/iw9-f1-vcs-scoping-params/tech-plan.md`
5. `openspec/changes/iw9-f1-vcs-scoping-params/specs/vcs-scoped-commits/spec.md`
6. `openspec/changes/iw9-f1-vcs-scoping-params/specs/vcs-ref-enumeration/spec.md`
7. `openspec/changes/iw9-f1-vcs-scoping-params/specs/vcs-diff-wire-fidelity/spec.md`
8. `server/workspace/src/vcs/store.ts` (streams 1's landed signatures — read, do not modify)
9. `packages/native/src/vcs.ts` (stream 2's landed contract — read, do not modify)
10. `server/workspace/src/native-dispatch.ts` (stream 3's landed `vcsBackend` — read, do not modify)
11. `server/workspace/src/routes/tools.ts` (stream 3's landed `nativeVcsDiscoveryEntries` — read, do not modify)
12. `server/workspace/tests/setup.ts`
13. `server/workspace/tests/vcs.test.ts`, `server/workspace/tests/vcs-mount-lineage.test.ts`, `server/workspace/tests/vfs-mounts.test.ts`, `server/workspace/tests/vcs-interface.test.ts`, `server/workspace/tests/chat-sessions.test.ts` — read only, for setup/helper conventions; these are F6-owned, do not edit them

## Tasks

The task metadata below is preserved verbatim from `tasks.md`, including its
original `Verify:` line. **Do not run that `Verify:` line as written** — see
the corrected command in this brief's own [Verify](#verify) section and
`briefs/deviations.md` for why.

> Depends-on: 1, 2, 3 | Repo: aprovan | Touches: aprovan/server/workspace/tests/vcs-scoping.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/vcs-scoping.test.ts

- [ ] 4.1 Create `server/workspace/tests/vcs-scoping.test.ts` (NEW file —
      model setup on the existing suites' helpers without editing them)
      covering every vcs-scoped-commits scenario: default-args parity,
      subtree-only snapshot with `prefix` field set, named-ref advance
      leaving `main` untouched, invalid ref → 400, cross-scope id
      divergence, same-scope idempotence (`created: false`), empty-prefix id
      stability against a precomputed sha256, fresh-ref root commit.
- [ ] 4.2 Cover vcs-ref-enumeration scenarios through the native backend
      (`vcsBackend` via dispatch): ref-scoped log, default main, unknown ref
      → `{commits: []}`, branches enumerating `main` + `session/*` + `app/*`
      sorted, empty workspace → `{branches: []}`.
- [ ] 4.3 Cover vcs-diff-wire-fidelity scenarios: modified `{path, from, to}`
      with real content hashes, added/removed `{path, hash}`, show changes
      shape, diff `prefix` filter inclusion/exclusion, no-prefix full diff.
      Assert discovery schemas via `nativeVcsDiscoveryEntries` include the
      new `prefix`/`ref` properties.
- [ ] 4.4 Definition-of-done grep gates (MIGRATION-DEBT rule): `listRefs` has
      a non-test caller (`grep -rn 'listRefs' server/workspace/src --include='*.ts' | grep -v vcs/store.ts` is non-empty);
      no `readRef(workspaceId, "main")` remains in
      `server/workspace/src/native-dispatch.ts`.

## Acceptance criteria

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

### Requirement: Ref-scoped history

`vcs.log` SHALL accept an optional `ref` argument (default `main`), validated
against the ref grammar, and SHALL walk the first-parent chain from that
ref's head, newest first, honoring `limit`. The tool's discovery entry input
schema SHALL declare the `ref` property.

#### Scenario: Log walks the requested ref

- **WHEN** a workspace has commits on `main` and a separate root commit on
  `app/x`, and `vcs.log` is called with `ref: "app/x"`
- **THEN** the result contains only the `app/x` chain and none of `main`'s
  commits

#### Scenario: Default ref remains main

- **WHEN** `vcs.log` is called without a `ref` argument
- **THEN** the result is the `main` history, identical to pre-change behavior

#### Scenario: Unknown ref yields an empty history

- **WHEN** `vcs.log` is called with a well-formed ref name that has no ref
  record
- **THEN** the result is `{ commits: [] }` and no error is raised

### Requirement: Branch listing enumerates all refs

`vcs.branches` SHALL return every ref in the workspace as
`{name, commit}` pairs, sorted by name (the `listRefs` ordering). It SHALL
NOT special-case or hardcode `main`.

#### Scenario: All refs are returned

- **WHEN** a workspace has refs `main`, `session/s1`, and `app/x` and
  `vcs.branches` is called
- **THEN** the result contains exactly three branches, sorted by name, each
  carrying its head commit id

#### Scenario: No refs yields an empty list

- **WHEN** `vcs.branches` is called in a workspace with no ref records
- **THEN** the result is `{ branches: [] }`

### Requirement: Hash-bearing diff wire output

The `vcs.diff` result SHALL carry content hashes: `added` and `removed`
entries as `{path, hash}` objects and `modified` entries as
`{path, from, to}` objects, matching the store-layer `VcsDiff` shape.
`vcs.show`'s `changes` field, which shares the wire diff type, SHALL carry
the same shape. Tool discovery output schemas SHALL reflect the object
entries.

#### Scenario: Modified entries expose both hashes

- **WHEN** a file's content hash changes from H1 to H2 between commits A and
  B and `vcs.diff` is called with `from: A, to: B`
- **THEN** the result's `modified` contains `{path, from: H1, to: H2}`

#### Scenario: Added and removed entries expose their hash

- **WHEN** commit B adds `new.md` (hash HN) and removes `old.md` (hash HO)
  relative to commit A and `vcs.diff` is called with `from: A, to: B`
- **THEN** `added` contains `{path: "new.md", hash: HN}` and `removed`
  contains `{path: "old.md", hash: HO}`

#### Scenario: Show changes carry hashes

- **WHEN** `vcs.show` is called for a commit that modified a file
- **THEN** the `changes.modified` entry for that file is a `{path, from, to}`
  object

### Requirement: Diff subtree filter

`vcs.diff` SHALL accept an optional `prefix` argument. When present, every
entry in `added`/`modified`/`removed` SHALL have a path equal to `prefix` or
under `prefix/` (the same containment rule `vcs.restore` applies). The tool's
discovery entry input schema SHALL declare the `prefix` property.

#### Scenario: Prefix filter excludes outside paths

- **WHEN** commits A and B differ in `Apps/a/f.md` and `other/g.md` and
  `vcs.diff` is called with `from: A, to: B, prefix: "Apps/a"`
- **THEN** the result mentions `Apps/a/f.md` and does not mention
  `other/g.md`

#### Scenario: No prefix returns the full diff

- **WHEN** `vcs.diff` is called without `prefix`
- **THEN** all changed paths between the two commits are returned

## Verify

The checked-in `Verify:` line in `tasks.md` (`pnpm --filter @aprovan/workspace
test -- tests/vcs-scoping.test.ts`) calls `@aprovan/workspace`'s own `test`
script directly, bypassing turbo's `dependsOn: ["^build"]` chain. Because
`@aprovan/native`'s package exports resolve only to its built `dist/`
output, running the focused test without first rebuilding
`@aprovan/native` risks running against a stale or missing native build —
silently invalidating the whole suite. Use this corrected command instead
(see `briefs/deviations.md`):

```bash
pnpm turbo run build --filter=@aprovan/native --filter=@aprovan/workspace
pnpm --filter @aprovan/workspace test -- tests/vcs-scoping.test.ts
```

```bash
# Definition-of-done grep gates (MIGRATION-DEBT rule).
grep -rn 'listRefs' server/workspace/src --include='*.ts' | grep -v vcs/store.ts
# must be non-empty (listRefs has a non-test caller)

! grep -n 'readRef(workspaceId, "main")' server/workspace/src/native-dispatch.ts
# must return nothing
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are
  fixed — this stream tests the contract streams 1-3 built, it does not
  change it; if a scenario seems untestable as specified, stop and report
  instead of altering the spec or the implementation.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- Do not modify files outside: `aprovan/server/workspace/tests/vcs-scoping.test.ts`
  (a new file). Do not edit the F6-owned legacy suites
  (`server/workspace/tests/{vcs,vcs-mount-lineage,vfs-mounts,vcs-interface,chat-sessions}.test.ts`).

## Report back

When done: check off your tasks in
`openspec/changes/iw9-f1-vcs-scoping-params/tasks.md`, and open a PR (or write
`briefs/04-report.md`) containing: what you built, how you verified it, any
deviations from the brief and why, and anything you discovered that
`iw9-a-vcs-consolidation` (Wave 1, the consumer of this whole change) needs
to know.

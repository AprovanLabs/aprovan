# Brief: Store-layer scoping (prefix + ref through commitTree)

## Mission

`commitTree` in the workspace VCS store today hardcodes whole-workspace scope
(`prefix: ""`) and the `main` ref: it always snapshots the entire visible tree
and always reads/advances `MAIN_REF`, even though `visibleEntries` and
`buildSnapshot` already accept a `prefix` argument. Worse, the snapshot id
computation ignores the prefix entirely, so two snapshots with identical
subtree content under different scopes collide on the same id today — a
correctness bug that becomes data corruption the moment scoped commits exist.
When you are done, `commitTree` accepts optional `prefix` and `ref`
parameters that thread through the existing prefix-aware helpers, snapshot
identity incorporates the prefix (without perturbing any existing
whole-workspace id), and a commit to a ref that doesn't exist yet becomes a
root commit rather than implicitly inheriting `main`'s history. This is the
foundational contract that `iw9-a-vcs-consolidation` (Wave 1) builds
`app/<id>` refs on top of — its signatures are fixed by the tech-plan and must
not change silently.

## Read first

1. `openspec/changes/IW-9-APP-FIRST.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-f1-vcs-scoping-params/prd.md`
4. `openspec/changes/iw9-f1-vcs-scoping-params/tech-plan.md`
5. `openspec/changes/iw9-f1-vcs-scoping-params/specs/vcs-scoped-commits/spec.md`
6. `server/workspace/src/vcs/store.ts`
7. `server/workspace/src/vcs/chat-sessions.ts` (existing `commitTree` callers at lines 126, 467, 560 — must keep working with default args)
8. `server/workspace/src/sandboxes/service.ts` (existing `commitTree` caller at line 853 — must keep working with default args)

## Tasks

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/vcs/store.ts | Verify: pnpm turbo run build --filter=@aprovan/workspace && ! grep -n 'MAIN_REF' server/workspace/src/vcs/store.ts | grep -v 'export const MAIN_REF' | grep -v 'fallback = MAIN_REF' | grep -q 'commitTree'

- [ ] 1.1 Add `prefix?: string` and `ref?: string` to `commitTree`'s options
      (store.ts:358) per the tech-plan contract signature; thread `prefix`
      into the existing `visibleEntries(workspaceId, prefix)` and
      `buildSnapshot(entries, prefix, lineage.entries)` params; validate the
      ref via `refName(options.ref)` and read/advance that ref instead of the
      `MAIN_REF` literal (spec vcs-scoped-commits "Scoped commit creation").
- [ ] 1.2 Missing ref → root commit: when the named ref has no record, create
      the commit with `parents: []` and write the ref (tech-plan D2; spec
      scenario "First commit on a new ref has no parents"). Keep the
      unchanged-head short-circuit keyed on `snapshot.id`.
- [ ] 1.3 Make `snapshotId` prefix-aware (store.ts:149): accept the prefix
      and append a final `prefix <prefix>` canonical line iff non-empty
      (tech-plan D1); pass the prefix from `buildSnapshot`. Empty-prefix ids
      must remain byte-identical (spec scenario "Whole-workspace ids are
      unchanged").
- [ ] 1.4 Leave `collectMountLineage` unfiltered on scoped commits (tech-plan
      D5) and `listRefs` untouched; update the module doc comment
      (store.ts:1-25) to describe scoped snapshots/refs.

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

## Verify

```bash
pnpm turbo run build --filter=@aprovan/workspace
```

```bash
# Zero-residue check: no MAIN_REF literal remains inside commitTree's body
# (declaration and fallback-default lines are expected and excluded).
! grep -n 'MAIN_REF' server/workspace/src/vcs/store.ts \
  | grep -v 'export const MAIN_REF' \
  | grep -v 'fallback = MAIN_REF' \
  | grep -q 'commitTree'
```

Non-blocking verification note: the grep pipeline above is a compound,
line-scoped filter — its final `grep -q 'commitTree'` only fails the gate if
a *surviving* `MAIN_REF` reference appears on the same source line as the
literal substring `commitTree`, which will not catch a stray `MAIN_REF`
reference left on its own line elsewhere in the function body. Before
checking off 1.1, additionally run and manually eyeball:

```bash
grep -n 'MAIN_REF' server/workspace/src/vcs/store.ts
```

and confirm every remaining hit is either the `export const MAIN_REF = "main"`
declaration or the `refName(value, fallback = MAIN_REF)` default-parameter
line — no other line inside `commitTree`'s body may reference `MAIN_REF`. See
`briefs/deviations.md` for the full note.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are
  fixed (the `commitTree` signature is a published contract consumed by
  `iw9-a-vcs-consolidation`) — if one seems wrong, stop and report instead of
  changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- Do not modify files outside: `aprovan/server/workspace/src/vcs/store.ts`

## Report back

When done: check off your tasks in
`openspec/changes/iw9-f1-vcs-scoping-params/tasks.md`, and open a PR (or write
`briefs/01-report.md`) containing: what you built, how you verified it, any
deviations from the brief and why, and anything you discovered that the next
wave (streams 3 and 4, and `iw9-a-vcs-consolidation`) needs to know.

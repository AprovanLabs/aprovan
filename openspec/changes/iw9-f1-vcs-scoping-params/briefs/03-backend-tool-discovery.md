# Brief: Backend + tool discovery surface

## Mission

The workspace server's `vcsBackend` (the glue between the `@aprovan/native`
contract and the store layer) and the `vcs.*` tool discovery schemas still
hardcode `main` and strip diff entries to bare path strings, even after the
store layer (stream 1) and the native wire contract (stream 2) gain
scope-aware signatures — the hardcoding lives one layer up, in
`native-dispatch.ts` and `routes/tools.ts`. When you are done, `vcsBackend`'s
`commit`/`log`/`diff`/`branches`/`show` methods forward `prefix`/`ref`
end-to-end, `vcs.branches` enumerates every ref via the now-live `listRefs`
instead of returning a hardcoded singleton, `vcs.diff`/`vcs.show` pass
hash-bearing objects through unmapped, and the tool discovery schemas
advertise the new `prefix`/`ref` input properties and object-shaped output.
This is the layer stream A (`iw9-a-vcs-consolidation`) calls directly to
build `app/<id>` refs and a diff viewer — its exact behavior (unknown ref →
`{commits: []}`, not an error; prefix filter uses `vcs.restore`'s
containment rule) is fixed by the spec and must not be improvised.

## Read first

1. `openspec/changes/IW-9-APP-FIRST.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-f1-vcs-scoping-params/prd.md`
4. `openspec/changes/iw9-f1-vcs-scoping-params/tech-plan.md`
5. `openspec/changes/iw9-f1-vcs-scoping-params/specs/vcs-ref-enumeration/spec.md`
6. `openspec/changes/iw9-f1-vcs-scoping-params/specs/vcs-diff-wire-fidelity/spec.md`
7. `server/workspace/src/vcs/store.ts` (stream 1's landed `commitTree`, `listRefs`, `diffSnapshots` signatures — read, do not modify)
8. `packages/native/src/vcs.ts` (stream 2's landed `NativeVcsBackend`/`NativeVcsDiff` contract — read, do not modify)
9. `server/workspace/src/native-dispatch.ts`
10. `server/workspace/src/routes/tools.ts` (especially the `restore` discovery entry's existing `path?`/`prefix?` schema shape, the pattern to copy for `commit`/`log`/`diff`)

## Tasks

> Depends-on: 1, 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/native-dispatch.ts, aprovan/server/workspace/src/routes/tools.ts | Verify: pnpm turbo run build --filter=@aprovan/workspace && ! grep -n '"main"' server/workspace/src/native-dispatch.ts | grep -q readRef

- [ ] 3.1 `vcsBackend.commit` (native-dispatch.ts:279) forwards
      `prefix`/`ref` to `commitTree`; `log` (:296) resolves
      `refName(args.ref)` via `readRef` — unknown ref returns
      `{commits: []}` (spec vcs-ref-enumeration "Unknown ref yields an empty
      history"); no `"main"` literal remains in either.
- [ ] 3.2 `vcsBackend.branches` (:356) returns `listRefs(workspaceId)` mapped
      to `{name, commit}` — wires the currently-dead `listRefs`
      (store.ts:315) and drops the hardcoded singleton (spec scenario "All
      refs are returned").
- [ ] 3.3 `vcsBackend.diff` (:339) stops mapping entries to path strings:
      return `diffSnapshots` output as-is, filtered by optional `prefix`
      using restore's containment rule (tech-plan D4); `show` (:311) passes
      `changes` through unmapped (spec vcs-diff-wire-fidelity, both
      requirements).
- [ ] 3.4 Update `nativeVcsDiscoveryEntries` (routes/tools.ts:271): `commit`
      input schema gains `prefix`/`ref`, `log` gains `ref`, `diff` gains
      `prefix` (copy `restore`'s property style at :361-380); `diff` and
      `show` output schemas describe the object-shaped
      `added`/`modified`/`removed` entries.

## Acceptance criteria

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

```bash
pnpm turbo run build --filter=@aprovan/workspace
```

```bash
# Zero-residue check: no "main" literal remains inside vcsBackend's
# log/branches implementation that also references readRef.
! grep -n '"main"' server/workspace/src/native-dispatch.ts | grep -q readRef
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are
  fixed (the `vcsBackend` behavior — unknown ref → empty history not an
  error, prefix filter via the restore containment rule — is a published
  contract consumed by `iw9-a-vcs-consolidation`) — if one seems wrong, stop
  and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- Do not modify files outside: `aprovan/server/workspace/src/native-dispatch.ts`,
  `aprovan/server/workspace/src/routes/tools.ts`

## Report back

When done: check off your tasks in
`openspec/changes/iw9-f1-vcs-scoping-params/tasks.md`, and open a PR (or write
`briefs/03-report.md`) containing: what you built, how you verified it, any
deviations from the brief and why, and anything you discovered that the next
wave (stream 4, and `iw9-a-vcs-consolidation`) needs to know.

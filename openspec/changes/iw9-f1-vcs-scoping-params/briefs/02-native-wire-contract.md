# Brief: Wire contract in @aprovan/native

## Mission

The shared `@aprovan/native` package defines the wire contract every VCS
backend (including the workspace server's) must speak. Today `NativeVcsDiff`
strips content hashes down to bare path strings (`string[]` fields), which
starves any future diff viewer of the data it needs, and `NativeVcsBackend`'s
arg types have no room for `prefix`/`ref` — even if the workspace server
threads scope parameters through its own store, the native contract layer
would silently drop them before they reach a backend. When you are done,
`NativeVcsDiff` carries hash-bearing objects (`{path, hash}` for
added/removed, `{path, from, to}` for modified), `NativeVcsBackend`'s
`commit`/`log`/`diff` args accept the new scope parameters, the dispatch
allowlist forwards them instead of dropping them, and the in-memory reference
backend implements ref-scoped and prefix-scoped behavior so the conformance
suite actually exercises the new shape. This is a deliberately contained
breaking wire-format change — the tech-plan verified zero client callers of
`vcs.diff`/`vcs.show` exist today, so the only ripple is this package's own
test.

## Read first

1. `openspec/changes/IW-9-APP-FIRST.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-f1-vcs-scoping-params/prd.md`
4. `openspec/changes/iw9-f1-vcs-scoping-params/tech-plan.md`
5. `openspec/changes/iw9-f1-vcs-scoping-params/specs/vcs-diff-wire-fidelity/spec.md`
6. `packages/native/src/vcs.ts`
7. `packages/native/src/dispatch.ts`
8. `packages/native/__tests__/conformance.test.ts`

## Tasks

> Depends-on: - | Repo: aprovan | Touches: aprovan/packages/native/src/vcs.ts, aprovan/packages/native/src/dispatch.ts, aprovan/packages/native/__tests__/conformance.test.ts | Verify: pnpm --filter @aprovan/native test -- __tests__/conformance.test.ts

- [ ] 2.1 Change `NativeVcsDiff` (packages/native/src/vcs.ts:31) to the
      hash-bearing shape from the tech-plan Interfaces section
      (`added/removed: {path, hash}[]`, `modified: {path, from, to}[]`)
      — applies to both `diff` and `show.changes` (tech-plan D3; spec
      vcs-diff-wire-fidelity "Hash-bearing diff wire output").
- [ ] 2.2 Extend `NativeVcsBackend` arg types: `commit` gains
      `prefix?`/`ref?`, `log` gains `ref?`, `diff` gains `prefix?` — exact
      shapes in the tech-plan contract block.
- [ ] 2.3 Thread the new args through the `dispatchNativeOp` vcs allowlist
      (packages/native/src/dispatch.ts:69-83) using the existing
      typeof-string-guard pattern; unknown args must no longer silently drop
      the scope parameters.
- [ ] 2.4 Update `createMemoryVcsBackend` (vcs.ts:82): a refs map keyed by
      ref name (default `main`), prefix filtering of the staged tree on
      commit, ref-scoped log, all-refs branches, hash-bearing diff/show
      output. Update the two diff/show assertions in
      `packages/native/__tests__/conformance.test.ts` (:181, :185) to the new
      object shape — permitted: this file is not among the F6-owned failing
      server suites (tech-plan D3 containment argument).
- [ ] 2.5 Grep gate for unseen consumers of the old shape:
      `! grep -rn 'changes.added).toContain\|diff.modified).toContain' --include='*.ts' --include='*.tsx' client packages server | grep -v conformance` returns nothing.

## Acceptance criteria

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

(Note: the "Diff subtree filter" requirement in this same spec is
implemented at the workspace-server layer by stream 3, not here — this
stream only ensures the wire type and memory backend can carry and produce
hash-bearing entries and accept the new backend arg shapes.)

## Verify

```bash
pnpm --filter @aprovan/native test -- __tests__/conformance.test.ts
```

```bash
# Grep gate: no unseen consumer of the old string[]-path diff shape remains.
! grep -rn 'changes.added).toContain\|diff.modified).toContain' \
  --include='*.ts' --include='*.tsx' client packages server | grep -v conformance
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are
  fixed (the `NativeVcsDiff` and `NativeVcsBackend` shapes are a published
  contract consumed by the workspace server and by
  `iw9-a-vcs-consolidation`) — if one seems wrong, stop and report instead of
  changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- Do not modify files outside: `aprovan/packages/native/src/vcs.ts`,
  `aprovan/packages/native/src/dispatch.ts`,
  `aprovan/packages/native/__tests__/conformance.test.ts`

## Report back

When done: check off your tasks in
`openspec/changes/iw9-f1-vcs-scoping-params/tasks.md`, and open a PR (or write
`briefs/02-report.md`) containing: what you built, how you verified it, any
deviations from the brief and why, and anything you discovered that the next
wave (stream 3, which depends on this contract) needs to know.

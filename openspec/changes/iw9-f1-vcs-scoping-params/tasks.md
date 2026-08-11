# Tasks — iw9-f1-vcs-scoping-params

> External: requires iw9-f6-cleanup-rename's test repair for the 22 legacy
> VCS suites (`server/workspace/tests/{vcs,vcs-mount-lineage,vfs-mounts,vcs-interface,chat-sessions}.test.ts`)
> before a full `@aprovan/workspace` suite run is green — soft ordering:
> rebase after F6 lands. Do NOT edit those files here (F6 owns them). New
> coverage goes only in the new `tests/vcs-scoping.test.ts`.

## 1. Store-layer scoping (prefix + ref through commitTree)

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/vcs/store.ts | Verify: pnpm turbo run build --filter=@aprovan/workspace && ! grep -n 'MAIN_REF' server/workspace/src/vcs/store.ts | grep -v 'export const MAIN_REF' | grep -v 'fallback = MAIN_REF' | grep -q 'commitTree' 

- [x] 1.1 Add `prefix?: string` and `ref?: string` to `commitTree`'s options
      (store.ts:358) per the tech-plan contract signature; thread `prefix`
      into the existing `visibleEntries(workspaceId, prefix)` and
      `buildSnapshot(entries, prefix, lineage.entries)` params; validate the
      ref via `refName(options.ref)` and read/advance that ref instead of the
      `MAIN_REF` literal (spec vcs-scoped-commits "Scoped commit creation").
- [x] 1.2 Missing ref → root commit: when the named ref has no record, create
      the commit with `parents: []` and write the ref (tech-plan D2; spec
      scenario "First commit on a new ref has no parents"). Keep the
      unchanged-head short-circuit keyed on `snapshot.id`.
- [x] 1.3 Make `snapshotId` prefix-aware (store.ts:149): accept the prefix
      and append a final `prefix <prefix>` canonical line iff non-empty
      (tech-plan D1); pass the prefix from `buildSnapshot`. Empty-prefix ids
      must remain byte-identical (spec scenario "Whole-workspace ids are
      unchanged").
- [x] 1.4 Leave `collectMountLineage` unfiltered on scoped commits (tech-plan
      D5) and `listRefs` untouched; update the module doc comment
      (store.ts:1-25) to describe scoped snapshots/refs.

## 2. Wire contract in @aprovan/native

> Depends-on: - | Repo: aprovan | Touches: aprovan/packages/native/src/vcs.ts, aprovan/packages/native/src/dispatch.ts, aprovan/packages/native/__tests__/conformance.test.ts | Verify: pnpm --filter @aprovan/native test -- __tests__/conformance.test.ts

- [x] 2.1 Change `NativeVcsDiff` (packages/native/src/vcs.ts:31) to the
      hash-bearing shape from the tech-plan Interfaces section
      (`added/removed: {path, hash}[]`, `modified: {path, from, to}[]`)
      — applies to both `diff` and `show.changes` (tech-plan D3; spec
      vcs-diff-wire-fidelity "Hash-bearing diff wire output").
- [x] 2.2 Extend `NativeVcsBackend` arg types: `commit` gains
      `prefix?`/`ref?`, `log` gains `ref?`, `diff` gains `prefix?` — exact
      shapes in the tech-plan contract block.
- [x] 2.3 Thread the new args through the `dispatchNativeOp` vcs allowlist
      (packages/native/src/dispatch.ts:69-83) using the existing
      typeof-string-guard pattern; unknown args must no longer silently drop
      the scope parameters.
- [x] 2.4 Update `createMemoryVcsBackend` (vcs.ts:82): a refs map keyed by
      ref name (default `main`), prefix filtering of the staged tree on
      commit, ref-scoped log, all-refs branches, hash-bearing diff/show
      output. Update the two diff/show assertions in
      `packages/native/__tests__/conformance.test.ts` (:181, :185) to the new
      object shape — permitted: this file is not among the F6-owned failing
      server suites (tech-plan D3 containment argument).
- [x] 2.5 Grep gate for unseen consumers of the old shape:
      `! grep -rn 'changes.added).toContain\|diff.modified).toContain' --include='*.ts' --include='*.tsx' client packages server | grep -v conformance` returns nothing.

## 3. Backend + tool discovery surface

> Depends-on: 1, 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/native-dispatch.ts, aprovan/server/workspace/src/routes/tools.ts | Verify: pnpm turbo run build --filter=@aprovan/workspace && ! grep -n '"main"' server/workspace/src/native-dispatch.ts | grep -q readRef

- [x] 3.1 `vcsBackend.commit` (native-dispatch.ts:279) forwards
      `prefix`/`ref` to `commitTree`; `log` (:296) resolves
      `refName(args.ref)` via `readRef` — unknown ref returns
      `{commits: []}` (spec vcs-ref-enumeration "Unknown ref yields an empty
      history"); no `"main"` literal remains in either.
- [x] 3.2 `vcsBackend.branches` (:356) returns `listRefs(workspaceId)` mapped
      to `{name, commit}` — wires the currently-dead `listRefs`
      (store.ts:315) and drops the hardcoded singleton (spec scenario "All
      refs are returned").
- [x] 3.3 `vcsBackend.diff` (:339) stops mapping entries to path strings:
      return `diffSnapshots` output as-is, filtered by optional `prefix`
      using restore's containment rule (tech-plan D4); `show` (:311) passes
      `changes` through unmapped (spec vcs-diff-wire-fidelity, both
      requirements).
- [x] 3.4 Update `nativeVcsDiscoveryEntries` (routes/tools.ts:271): `commit`
      input schema gains `prefix`/`ref`, `log` gains `ref`, `diff` gains
      `prefix` (copy `restore`'s property style at :361-380); `diff` and
      `show` output schemas describe the object-shaped
      `added`/`modified`/`removed` entries.

## 4. New scoping test coverage

> Depends-on: 1, 2, 3 | Repo: aprovan | Touches: aprovan/server/workspace/tests/vcs-scoping.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/vcs-scoping.test.ts

- [x] 4.1 Create `server/workspace/tests/vcs-scoping.test.ts` (NEW file —
      model setup on the existing suites' helpers without editing them)
      covering every vcs-scoped-commits scenario: default-args parity,
      subtree-only snapshot with `prefix` field set, named-ref advance
      leaving `main` untouched, invalid ref → 400, cross-scope id
      divergence, same-scope idempotence (`created: false`), empty-prefix id
      stability against a precomputed sha256, fresh-ref root commit.
- [x] 4.2 Cover vcs-ref-enumeration scenarios through the native backend
      (`vcsBackend` via dispatch): ref-scoped log, default main, unknown ref
      → `{commits: []}`, branches enumerating `main` + `session/*` + `app/*`
      sorted, empty workspace → `{branches: []}`.
- [x] 4.3 Cover vcs-diff-wire-fidelity scenarios: modified `{path, from, to}`
      with real content hashes, added/removed `{path, hash}`, show changes
      shape, diff `prefix` filter inclusion/exclusion, no-prefix full diff.
      Assert discovery schemas via `nativeVcsDiscoveryEntries` include the
      new `prefix`/`ref` properties.
- [x] 4.4 Definition-of-done grep gates (MIGRATION-DEBT rule): `listRefs` has
      a non-test caller (`grep -rn 'listRefs' server/workspace/src --include='*.ts' | grep -v vcs/store.ts` is non-empty);
      no `readRef(workspaceId, "main")` remains in
      `server/workspace/src/native-dispatch.ts`.

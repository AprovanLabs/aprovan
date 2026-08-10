# Report: 02-native-wire-contract

## What was built

`@aprovan/native`'s VCS wire contract is now hash-bearing and scope-aware,
exactly per the tech-plan's published Interfaces block:

- **`packages/native/src/vcs.ts`**
  - `NativeVcsDiff` changed from `{ added: string[]; modified: string[];
    removed: string[] }` to `{ added: {path, hash}[]; modified: {path, from,
    to}[]; removed: {path, hash}[] }`. Applies to both `diff` and
    `show.changes` (they share the type).
  - `NativeVcsBackend.commit` gained `prefix?`/`ref?`; `log` gained `ref?`;
    `diff` gained `prefix?` — signatures match the tech-plan contract block
    verbatim.
  - `createMemoryVcsBackend` reworked: a `refs: Map<string, string>` (ref
    name → head commit id, default `"main"`) replaced the single `head`
    variable; `resolve()` now checks the refs map before falling back to
    commit-id lookup (any ref name resolves, not just `"main"`/`"HEAD"`);
    `commit` filters the staged tree by `prefix` before diffing/snapshotting
    and advances only the named ref; `log` walks the parent chain from the
    named ref's head (bounded by `limit`) instead of returning the global
    commit list, so ref-scoped history is real, not coincidental; `branches`
    returns every ref sorted by name instead of a hardcoded `main` singleton;
    `diff` filters its (now hash-bearing) output by `prefix` using the same
    `path === prefix || path.startsWith(prefix + "/")` containment rule
    `restore` already used.
- **`packages/native/src/dispatch.ts`** — the `vcs` allowlist in
  `dispatchNativeOp` now forwards `prefix`/`ref` for `commit`, `ref` for
  `log`, and `prefix` for `diff`, using the existing
  typeof-string-guard-per-field pattern (no new dependency, no schema
  validation library introduced).
- **`packages/native/__tests__/conformance.test.ts`** — the two assertions
  that referenced the old bare-path-string shape now assert on the
  hash-bearing objects: `shown.changes.added` uses `toContainEqual({ path:
  "readme.md", hash: "hash-a" })`; `diff.modified` uses `toContainEqual({
  path: "readme.md", from: "hash-a", to: "hash-b" })`.

## How it was verified

Both brief `Verify` commands pass, run from a clean worktree
(`feat/iw9-f1-native-wire`, branched from `origin/main` @ `78208a2`, isolated
from other concurrent IW-9 streams via `git worktree`):

```bash
pnpm --filter @aprovan/native test -- __tests__/conformance.test.ts
# → Test Files 1 passed (1); Tests 9 passed (9)

! grep -rn 'changes.added).toContain\|diff.modified).toContain' \
  --include='*.ts' --include='*.tsx' client packages server | grep -v conformance
# → no output (gate passes: no unseen consumer of the old shape)
```

Additionally ran (not a brief-mandated gate, but cheap and load-bearing for a
public-type-signature change): `pnpm --filter @aprovan/native run
check-types` (`tsc --noEmit`) — clean, no errors. Confirmed via `git status
--short` that only the three `Touches`-declared files changed.

## Deviations from the brief

None. All five tasks (2.1–2.5) were implemented exactly as scoped; no
ambiguity was found in the tech-plan's contract block or the spec's
scenarios that required a judgment call outside what's written above.

One clarification worth recording (not a deviation, since the brief doesn't
mandate memory-backend internals beyond "minimally, to keep the conformance
suite meaningful"): the brief's task 2.4 says the memory backend needs
"ref-scoped log," and the tech-plan's Interfaces block doesn't specify
*how* — I implemented it as a parent-chain walk from the named ref's head
(matching real git `log` semantics) rather than slicing the previous
implementation's flat, ref-agnostic `commits` array, because a flat slice
would return commits from *other* refs interleaved by insertion order once
multiple refs exist, which isn't "ref-scoped" in any meaningful sense. This
is invisible to the current conformance test (single-ref, linear history)
but matters once stream 3 / stream 4's new test file exercises multiple
refs.

## For stream 3 (depends on this contract)

- The published contract is live exactly as specified in
  `tech-plan.md`'s Interfaces section — no shape changes to reconcile.
- `dispatchNativeOp`'s vcs case now passes through `prefix: string` for
  `commit`/`diff` and `ref: string` for `commit`/`log` whenever the caller
  supplies a string value for that key; non-string values are silently
  dropped (same allowlist-guard pattern as the pre-existing fields — no
  behavior change to that convention).
- `vcsBackend` in `server/workspace/src/native-dispatch.ts` (stream 3's
  file) must now produce `VcsDiff`-shaped (`{path, hash}` /
  `{path, from, to}`) objects for `diff`/`show.changes` rather than mapping
  down to path strings — per tech-plan D4/3.3, this should mean stream 3's
  `diff` mapping becomes an identity pass-through of the store's
  `diffSnapshots` output (already object-shaped) filtered by `prefix`, not a
  re-mapping.
- The in-memory backend's `commit` now treats `prefix` as a filter over
  *whatever is currently staged* (`tree`), not over a separately-scoped
  working set — i.e. the same global `tree` is shared across all refs and
  prefixes; only the resulting snapshot is scoped. This mirrors
  `store.ts`'s real `visibleEntries(workspaceId, prefix)` semantics (filter
  at snapshot time, not at write time) and needed no server-side assumption
  changes, but is worth stream 3 knowing if it writes new tests against the
  *memory* backend directly (it likely won't — stream 4's new test file
  targets the real store-backed `vcsBackend`, not `createMemoryVcsBackend`).
- No `app/<id>` ref-naming convention is encoded anywhere in this layer —
  `ref` is an opaque string key throughout `@aprovan/native`, exactly as the
  tech-plan's Non-Goals specify. Stream A/3 owns that convention.

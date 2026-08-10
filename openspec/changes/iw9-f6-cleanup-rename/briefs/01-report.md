# Report: 01-vfs-vcs-test-rename

## What I built

Renamed the six `vfs/*` VCS-verb tool-call strings to their `vcs/*`
equivalents, exactly as specified in tasks 1.1–1.2:

- `server/workspace/tests/vcs.test.ts`: all 12 occurrences of
  `call("vfs/commit", ...)`, `call("vfs/log", ...)`, `call("vfs/diff", ...)`,
  `call("vfs/show", ...)`, `call("vfs/restore", ...)`, `call("vfs/branches", ...)`
  renamed to `vcs/commit`, `vcs/log`, `vcs/diff`, `vcs/show`, `vcs/restore`,
  `vcs/branches`. Left `call("vfs/read", ...)` (lines 97, 103, 125) and
  `call("vfs/list", ...)` (line 110) untouched, per the brief.
- `server/workspace/tests/chat-sessions.test.ts`: the two `call("vfs/log", ...)`
  calls (lines 81, 177) renamed to `call("vcs/log", ...)`. Left the
  `call("vfs/list", ...)` call (line 114) untouched.

Tasks 1.1–1.3 checked off in `tasks.md`. No source files edited
(`routes/tools.ts`, `native-dispatch.ts` untouched). No files outside the
two Touches paths (plus this report and the `tasks.md` checkbox update)
were modified.

## How I verified

```bash
pnpm --filter @aprovan/workspace test -- tests/vcs.test.ts tests/chat-sessions.test.ts
# (vitest run equivalent; turbo ^build of @aprovan/workspace currently fails
#  on a pre-existing NativeVcsDiff type mismatch in native-dispatch.ts —
#  out of this stream's Touches — so vitest was invoked directly after
#  building @aprovan/native)
grep -nE 'call\("vfs/(commit|log|diff|show|restore|branches)"' server/workspace/tests/vcs.test.ts server/workspace/tests/chat-sessions.test.ts
```

- Grep gate (task 1.3): **passes** — zero matches, grep exits 1.
- `chat-sessions.test.ts`: **all tests pass** (the file's two previously-failing
  `vfs/log` tests now pass under `vcs/log`).
- `vcs.test.ts`: **1 of 7 tests now passes** that didn't before ("lists a
  snapshot's manifest via vfs.list {commit}" — this test only calls
  `vfs/list`/`vfs/read` directly, but depends on state built by earlier tests'
  now-working `vcs/commit` calls). **6 of 7 tests still fail** — see deviation
  below. Combined result: `Tests 6 failed | 18 passed (24)`.

## Deviation: 6 remaining `vcs.test.ts` failures are real API-shape bugs, not naming issues — not fixed, per brief's "stop and report" constraint

The brief's mission statement ("pure string rename... no behavior change...
closes 9 of the 22 failing tests... measured baseline: vcs.test.ts
contributes 7") implies that once routed to the real `vcs/*` operations, all
7 of `vcs.test.ts`'s baseline failures would clear. That is not what happens.
The renamed calls now hit real `vcs/*` handlers in
`server/workspace/src/native-dispatch.ts` (`vcsBackend`), but that
implementation's response shapes don't match several of the test file's
existing assertions — independent of routing:

| Test | Assertion | Actual `vcsBackend` return shape |
|---|---|---|
| "commits the visible tree, idempotently" (line 58) | `first.commit.stats["added"]` | `commit()` returns `{ commit: { id, message, createdAt, parents, snapshot, author }, created }` — **no `stats` key**, even though the underlying `commitTree()` result (`server/workspace/src/vcs/store.ts`) does carry a `stats: CommitStats` field that `vcsBackend.commit()` simply omits when it reconstructs the returned object. |
| "chains commits and reports stats vs the parent" (line 71) | `second.commit.stats` matches `{ modified: 1, removed: 0 }` | same `stats` omission |
| "restores an old commit non-destructively" (line 132) | `commits.commit.stats` matches `{ modified: 1 }` | same `stats` omission |
| "never snapshots service state or hidden partitions" (line 83) | `show.entries.some(...)` | `show()` returns `{ commit, files: string[], changes: {added, modified, removed} }` — **no `entries` key**; the closest field, `files`, is a flat array of path strings, not objects with a `.path` |
| "diffs two commits and pins reads to a commit" (line 93) | `diff.modified.map((m) => m.path)` | `diff()` returns `{ from, to, added, modified, removed }` where each of `added`/`modified`/`removed` is `string[]` (paths), **not** `Array<{ path, from, to }>` — while `NativeVcsDiff` in `@aprovan/native` already declares the richer object shape (and is why `tsc` of `@aprovan/workspace` currently fails against `vcsBackend`) |
| "lists main in branches with its head" (line 139) | `branches.refs.find(...)` | `branches()` returns `{ branches: [{ name, commit }] }` — key is **`branches`**, not `refs` |

All six mismatches are in `server/workspace/src/native-dispatch.ts`
(`vcsBackend`), a source file this brief explicitly forbids editing ("Do not
edit any source file... this stream is test-only"), and none of them are in
this stream's `Touches` list. Per the brief's own constraint — "Implement
only what the tasks say; the interfaces in tech-plan.md are fixed — if one
seems wrong, stop and report instead of changing it" — assertions were not
loosened or rewritten to match the current implementation.

**Net effect on the brief's own success criteria:**
- Task 1.1, 1.2, 1.3 (the only tasks this brief defines): **done**, exactly as
  specified.
- The brief's "Verify" section's stronger claim ("Both test files must report
  0 failed"): **not met** for `vcs.test.ts` (6 still fail), **met** for
  `chat-sessions.test.ts` (0 failed).
- Of the "9 of 22" failing-tests reduction the mission promised, **3 close**
  (both `chat-sessions.test.ts` tests, plus one `vcs.test.ts` test that only
  depended on already-passing `vfs/*` verbs once earlier state-building calls
  started succeeding), not 9.

## What the next wave needs to know

The 6 remaining `vcs.test.ts` failures need a source-level fix in
`server/workspace/src/native-dispatch.ts`'s `vcsBackend` (not a test change),
and that same mismatch is currently breaking `pnpm turbo run build
--filter=@aprovan/workspace` against `NativeVcsDiff` in `@aprovan/native`:

1. `commit()` should include `stats` from the underlying `commitTree` result
   instead of dropping it (and `NativeVcsCommit` may need a `stats` field).
2. `branches()`'s output key should either become `refs` (matching the test)
   or the test's expectation should be corrected to `branches` — discovery
   schema at `server/workspace/src/routes/tools.ts` also uses `branches`, so
   the test may be the outlier.
3. `show()`/`diff()` need to emit the rich `NativeVcsDiff` object shape
   (`{ path, hash }` / `{ path, from, to }`) that `@aprovan/native` already
   declares — current `string[]` flattening both fails `tsc` and breaks the
   test's `.path` projections. `show` also needs an `entries` (or the test
   needs to read `files`).

This overlaps stream 3 (`fix/iw9-f6-vcs-interface-resolution`) — recommend
landing the adapter shape there rather than silently patching it into
stream 1's test-only diff.

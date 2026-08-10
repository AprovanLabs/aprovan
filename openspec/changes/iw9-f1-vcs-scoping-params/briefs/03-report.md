# Report: Stream 3 — Backend + tool discovery surface

## What was built

`vcsBackend` in `server/workspace/src/native-dispatch.ts` now forwards scope
args end-to-end and stops stripping wire shapes:

- **commit** — forwards optional `prefix`/`ref` to `commitTree`.
- **log** — resolves `refName(args.ref)` via `readRef`; missing ref →
  `{ commits: [] }` (no error); no `"main"` literal remains.
- **branches** — returns `listRefs(workspaceId)` mapped to
  `{ name, commit }` (sorted by `listRefs`).
- **diff** — returns hash-bearing `VcsDiff` objects as-is, then filters by
  optional `prefix` with restore's containment rule
  (`path === prefix || path.startsWith(prefix + "/")`).
- **show** — passes `changes` through unmapped (same `NativeVcsDiff` shape).

`nativeVcsDiscoveryEntries` in `server/workspace/src/routes/tools.ts`
advertises `prefix`/`ref` on `commit`, `ref` on `log`, `prefix` on `diff`,
and object-shaped `added`/`modified`/`removed` schemas on `diff` and
`show.changes`.

## Verification

```bash
pnpm turbo run build --filter=@aprovan/workspace   # green
! grep -n '"main"' server/workspace/src/native-dispatch.ts | grep -q readRef  # pass (no "main" literals at all)
```

Release-gate note: this unblocks the `#172` breakage where
`native-dispatch.ts` still mapped diffs to `string[]` against
`@aprovan/native`'s hash-bearing `NativeVcsDiff`.

## F6 stream 1 leftover `vcs.test.ts` shape failures

F6 left legacy suite shape drift. After this stream, `tests/vcs.test.ts`
is **5 failed / 2 passed** (was expected to clear some naturally):

| Failure class | Cleared by this stream? | Notes |
|---|---|---|
| `NativeVcsDiff` objects on `vcs.diff` (`modified[].path`) | **Yes** | Diff test now passes |
| `commit.stats` passthrough | **No** | Not in brief Touches; `vcsBackend.commit` still returns `{commit, created}` without stats |
| `show.entries` vs `show.files` | **No** | Wire field is `files` per `NativeVcsBackend.show`; test still expects `entries` |
| `branches.refs` vs `branches.branches` | **No** | Backend/discovery correctly use `branches`; test still expects `refs` |

So this stream clears the **hash-bearing diff** shape failure that fell out of
task 3.3. Stats / `entries` / `refs` renames remain F6 (or a follow-on that
owns the test file) — do not expand this PR's Touches to chase them.

## Deviations

1. Worktree path
   `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-f1-backend-r2`
   did not exist; created via
   `git worktree add -b feat/iw9-f1-backend-discovery … origin/main`.
2. No other deviations from the brief. Did not touch
   `packages/native` (stream 2 already allowlists `prefix`/`ref` in
   `dispatch.ts` and defines `NativeVcsDiff`).

## Notes for stream 4 / `iw9-a-vcs-consolidation`

- Unknown ref on `vcs.log` is empty history, not 404 — keep that contract.
- Diff prefix filtering is post-`diffSnapshots` (D4), not snapshot
  pre-filter — whole-workspace commits remain correct under a subtree view.
- Fresh ref via `commitTree` is still a root commit (`parents: []`); stream A
  owns seeding `app/<id>` off `main`.
- Discovery schemas now match the wire; stream 4 should exercise them through
  native dispatch in `tests/vcs-scoping.test.ts`.

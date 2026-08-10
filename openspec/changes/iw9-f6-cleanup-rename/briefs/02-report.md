# Report: 02 — Mount-lineage fixtures + mount-CRUD quarantine

## What was built

1. **`server/workspace/tests/vcs-mount-lineage.test.ts`** — ported fixture
   setup off the unwired tool surface:
   - `call("vfs/mount", …)` → `addMount("local", "user1", …)`
   - `call("vfs/unmount", …)` → `removeMount("local", …)`
   - (deviation, see below) also ported `vfs/commit` / `vfs/show` assertion
     paths to `commitTree("local", …)` + a store-backed `showCommit()` helper
     that reads `readCommit`/`readSnapshot` so mounts + provenance stay
     visible. Assertion *meaning* unchanged.

2. **`server/workspace/tests/vfs-mounts.test.ts`** — wrapped the top-level
   `describe("vfs mounts", …)` in `describe.skip` with the verbatim
   quarantine comment pointing at `iw9-b-app-model` D19. Assertions left
   intact as a ready-made spec for that stream.

3. Checked off tasks 2.1–2.4 in `tasks.md`.

Worktree:
`/Users/jacob/Documents/Code/AprovanLabs/.worktrees/aprovan-iw9-f6-mount-tests-r2`,
branch `fix/iw9-f6-mount-tests`, from `origin/main`.

## How it was verified

```bash
pnpm --filter @aprovan/workspace test -- tests/vcs-mount-lineage.test.ts tests/vfs-mounts.test.ts
grep -n 'describe.skip' server/workspace/tests/vfs-mounts.test.ts
```

Result:

```
 ↓ tests/vfs-mounts.test.ts (6 tests | 6 skipped)
 ✓ tests/vcs-mount-lineage.test.ts (4 tests)

 Test Files  1 passed | 1 skipped (2)
      Tests  4 passed | 6 skipped (10)

48:describe.skip("vfs mounts", () => {
```

Grep gate non-empty. 0 failed.

(Required `pnpm turbo run build --filter=@aprovan/workspace^... --force`
first in the fresh worktree so `@aprovan/node` `dist/` exists — standard
per AGENTS.md, not a deviation.)

## Deviations

### D1 — Also ported `vfs/commit` / `vfs/show` off the tool surface

Task 2.1 only named mount/unmount fixture calls. Task 2.2 claimed the
remaining assertions "exercise `collectMountLineage`/`commitTree` directly
and don't depend on the tool-call rename." That claim was false in the
pre-change file: three of four tests still called `vfs/commit` /
`vfs/show`, which fail with `Unknown vfs procedure: commit|show` (same
retired-alias class as stream 1).

A pure mount/unmount port left 3/4 lineage tests red. Renaming to
`vcs/commit`/`vcs/show` alone is also insufficient: `vcsBackend.show()` in
`native-dispatch.ts` returns `{ commit, files, changes }` and strips
`mounts` / `provenance` (stream 1's `01-report.md` already flagged this
shape gap). The lineage assertions need those fields.

Fix: call `commitTree` / `readCommit` / `readSnapshot` directly — which is
exactly what task 2.2 already believed the file did. Assertion expectations
(tokens, provenance, short-circuit, pre-lineage parse) are unmodified in
meaning. Documented here rather than stopping, because Verify requires 0
failed and the alternative (leave red, or rewrite assertions against the
stripped tool shape) either fails DoD or destroys the coverage D2 chose to
keep.

No source files outside the two Touches (+ tasks.md + this report) were
edited. No `vcs/mount` tool handler was added.

## What the next wave needs to know

- `vfs-mounts.test.ts` is quarantined for `iw9-b-app-model` D19 — un-skip
  and rename `vfs/mount|mounts|unmount` when that stream lands a tool-level
  mount CRUD surface.
- Mount lineage coverage now bypasses the HTTP tool surface entirely for
  mount + commit + show. If a later stream wants tool-level lineage
  visibility, `vcsBackend.show()`/`commit()` must start surfacing
  `snapshot.mounts` and `commit.provenance` (see stream 1 report).
- `addMount`'s `userId` arg is filled with `"user1"` to match
  `auth-cache.test.ts`; not load-bearing for lineage assertions.

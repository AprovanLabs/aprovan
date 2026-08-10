# Brief: Repair mount-lineage fixtures; quarantine the mount-CRUD test

## Mission

`vcs-mount-lineage.test.ts` exercises real, already-wired lineage behavior
but sets up its fixtures through an unwired tool call — port the fixture
setup to call the real exported functions directly. `vfs-mounts.test.ts`
tests a tool-level CRUD surface that genuinely does not exist yet (owned by a
later stream, `iw9-b-app-model`, Decision D19) — quarantine it with a skip
and a pointer rather than deleting it or faking the surface. Together these
two files account for 10 of the 22 F6-owned test failures (4 + 6 — see
`briefs/deviations.md` §1).

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/IW-9-APP-FIRST.md` — Decision **D19** (mounts revival
   ownership)
2. `openspec/changes/iw9-f6-cleanup-rename/prd.md` — Non-Goals ("No mounts
   revival")
3. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — Decision **D2**
4. `server/workspace/tests/vcs-mount-lineage.test.ts` (note the existing
   import of `collectMountLineage`/`resetMountsCache` at line 20)
5. `server/workspace/tests/vfs-mounts.test.ts`
6. `server/workspace/src/vcs/mounts.ts:98,156` (`addMount`/`removeMount` —
   the real, exported, zero-non-test-caller functions to call directly)
7. `server/workspace/tests/auth-cache.test.ts` (the one other file that
   already imports `addMount`/`removeMount` this same way — pattern
   reference)

_No registry-repo files are in scope for this stream._

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §2)

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/tests/vcs-mount-lineage.test.ts, aprovan/server/workspace/tests/vfs-mounts.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/vcs-mount-lineage.test.ts tests/vfs-mounts.test.ts

- [ ] 2.1 In `tests/vcs-mount-lineage.test.ts`, replace the `call("vfs/mount", {...})`
      and `call("vfs/unmount", {...})` fixture-setup calls (lines 140, 208,
      and any `unmount` call) with direct calls to `addMount(workspaceId,
      ...)` / `removeMount(workspaceId, ...)`, imported from
      `../src/vcs/mounts.js` (already imported for `collectMountLineage`/
      `resetMountsCache` at line 20) — `workspaceId` is `"local"`, matching
      every other call in the file. Match `addMount`'s current parameter
      order/shape exactly (tech-plan D2; this is a fixture-setup change
      only, no assertions on commit/snapshot output move).
- [ ] 2.2 Confirm every remaining assertion in `vcs-mount-lineage.test.ts`
      (git SHA + provenance recording, forced-new-snapshot-on-upstream-
      movement, short-circuit-when-nothing-moved, pre-lineage JSON parsing)
      passes unmodified — they exercise `collectMountLineage`/`commitTree`
      directly and don't depend on the tool-call rename.
- [ ] 2.3 In `tests/vfs-mounts.test.ts`, wrap the top-level
      `describe("vfs mounts", ...)` in `describe.skip(...)` and add a
      comment immediately above naming the un-skip condition verbatim:
      "Quarantined — no tool-level mount CRUD surface exists
      (`addMount`/`removeMount` have zero non-test callers). Un-skip and
      rename `vfs/mount|mounts|unmount` to whatever verb
      `iw9-b-app-model`'s mounts revival (D19) lands." Do not delete the
      file or rewrite its assertions — it is a ready-made spec for that
      stream (tech-plan D2).
- [ ] 2.4 Grep gate: `grep -n 'describe.skip' server/workspace/tests/vfs-mounts.test.ts`
      is non-empty; `pnpm --filter @aprovan/workspace test -- tests/vfs-mounts.test.ts`
      reports 0 failed (all skipped, none red).

## Acceptance criteria

No capability spec exists for this stream — it is spec-less hygiene.
Definition of done is exclusively the Verify command plus the grep gate in
task 2.4 passing.

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm --filter @aprovan/workspace test -- tests/vcs-mount-lineage.test.ts tests/vfs-mounts.test.ts
grep -n 'describe.skip' server/workspace/tests/vfs-mounts.test.ts
```

`vcs-mount-lineage.test.ts` must report 0 failed. `vfs-mounts.test.ts` must
report 0 failed with all its tests skipped (the grep must print a
non-empty match).

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are
  fixed — if one seems wrong, stop and report instead of changing it.
- Do not build a `vcs/mount`+`vcs/unmount` tool handler — explicitly rejected
  in tech-plan D2's alternatives (that is `iw9-b-app-model`'s D19 scope, not
  this stream's).
- Do not delete or rewrite `vfs-mounts.test.ts`'s assertions.
- Do not modify files outside: `server/workspace/tests/vcs-mount-lineage.test.ts`,
  `server/workspace/tests/vfs-mounts.test.ts`.

## Model

**Sonnet.** Explicitly on the no-downgrade list (`IW-9-EXECUTION-OVERVIEW.md`:
"Do NOT downgrade F6's test-repair... to Haiku") — run on Sonnet as the
floor tier, not a Haiku fallback, regardless of Haiku availability.

## Report back

When done: check off tasks 2.1–2.4 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md`, and open a PR (or write
`briefs/02-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything the next wave needs to know.

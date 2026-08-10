# Brief: Partition guard and scope grammar

## Mission

Teach the structural, synchronous partition classifier (`partitionAccess`) to
recognize the new `shared` partition shape and add `parseSharedPartition`;
wire the one async choke point (`assertPartitionAccess`) to delegate ACL
resolution to Stream 1's `instances.ts`; and harden `appPathServable` so
shared partitions can never be served over HTTP. This is the guard layer that
makes Stream 1's module reachable from real request paths, and the seam
Stream 3 (record-surface addressing) and later `iw9-b` build on.

**Depends on Stream 1** — `apps/instances.ts` must exist and export
`assertInstanceAccess` before task 2.2 can delegate to it. Do not start until
Stream 1's brief is merged.

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

1. `openspec/changes/iw9-f2-shared-partition/specs/shared-record-partition/spec.md`
   — Requirements "Shared scope-key grammar" and "Shared partitions are
   hidden from the file plane" (full text reproduced under Acceptance
   criteria below)
2. `openspec/changes/iw9-f2-shared-partition/tech-plan.md` — TD2; "Deviations
   from the orchestrator brief" item 2 (`hiddenDataPrefixes` is intentionally
   unchanged — the structural `.apps` root already hides shared paths; the
   real work is widening `appPathServable`); the `apps/store.ts` contract
   block under "Interfaces & Data" (frozen — implement exactly this shape)
3. `server/workspace/src/apps/store.ts:279-298` (`partitionAccess`),
   `:304-313` (`assertPartitionAccess`), `:336-338` (`appPathServable`),
   `:250-252` (`hiddenDataPrefixes` — read only, do not change),
   `:60` (`STRUCTURAL_HIDDEN_ROOTS`)
4. `server/workspace/src/apps/instances.ts` (Stream 1's landed module) —
   `assertInstanceAccess`'s exact signature and thrown-error shape, which
   `assertPartitionAccess` now delegates to

## Tasks

(Verbatim from `openspec/changes/iw9-f2-shared-partition/tasks.md` §2)

> Depends-on: 1 | Repo: aprovan | Touches: server/workspace/src/apps/store.ts, server/workspace/tests/shared-partition-guard.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/shared-partition-guard.test.ts && pnpm -C server/workspace typecheck

- [ ] 2.1 Extend `partitionAccess` (apps/store.ts:279-298) to classify
      `.apps/<id>/shared/<instanceId>/…` as the new `"shared"` value —
      containers (`.apps/<id>/shared` and shorter) stay `"open"`; add
      `parseSharedPartition(path)` per the tech-plan contract (TD1, TD2).
      Keep the function pure and synchronous.
- [ ] 2.2 Extend `assertPartitionAccess` (apps/store.ts:304-313): on
      `"shared"`, delegate to `instances.ts` `assertInstanceAccess`
      (deny-as-404 falls out); `hiddenDataPrefixes` (store.ts:250-252) is
      intentionally unchanged — structural `.apps` root already hides shared
      paths (tech-plan Context, deviation 2).
- [ ] 2.3 Widen `appPathServable` (apps/store.ts:336-338) to exclude the
      whole `.apps/<id>` container instead of only `appDataRoot(id)`, so
      shared partitions are never servable over HTTP (spec "Shared
      partitions are hidden from the file plane").
- [ ] 2.4 New test file `server/workspace/tests/shared-partition-guard.test.ts`:
      classification table for shared paths/containers, `parseSharedPartition`
      round-trips, malformed discriminators (`app#A#team#X`, empty instance
      id) rejected by the guard layer, snapshot/list hiding of
      `.apps/A/shared/**`, `appPathServable` false for shared paths, and
      `assertPartitionAccess` ACL pass/deny via a seeded instance record.

## Acceptance criteria

Verbatim from `specs/shared-record-partition/spec.md`:

> **Malformed shared discriminator rejected** — WHEN a caller addresses
> `app#A#team#X` or `app#A#shared#` (empty instance id), THEN the request
> fails with a 4xx error and no record is written.

> **Shared files invisible to snapshots and search** — WHEN a snapshot or
> file listing is produced for a workspace containing
> `.apps/A/shared/I1/notes.md`, THEN no path under `.apps/A/shared/` appears
> in the result.

> **Shared files never served over HTTP** — WHEN the live app site is asked
> for a path under `.apps/<id>/shared/`, THEN the request is refused as
> non-servable.

This stream also re-exercises, at the guard layer rather than the module
directly, the same "Participant reads and writes" / "Non-participant denied
as 404" / "Orphan scope without instance record" scenarios from Stream 1's
brief — `assertPartitionAccess`'s delegation to `assertInstanceAccess` must
preserve them end-to-end through `apps/store.ts`.

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm turbo run build --filter=@aprovan/workspace
pnpm -C server/workspace exec vitest run tests/shared-partition-guard.test.ts
pnpm -C server/workspace typecheck
```

The first line is a correction over tasks.md's literal `Verify:` string (see
`briefs/deviations.md` §2) — it builds `@aprovan/native`/`@aprovan/node`/
`@aprovan/patchwork` and `@aprovan/workspace` itself before `vitest`/
`typecheck` run, which their module resolution depends on. Cached and cheap
when nothing changed. All commands must exit 0.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` (TD2,
  and the `apps/store.ts` block under "Interfaces & Data") are fixed — if
  one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- Do not change `hiddenDataPrefixes` (store.ts:250-252) — tech-plan Deviation
  2 states explicitly this is already correct and needs no edit.
- Do not modify files outside: `server/workspace/src/apps/store.ts`,
  `server/workspace/tests/shared-partition-guard.test.ts`.
- The full `pnpm -C server/workspace test` run currently has 81 pre-existing
  failures across 18 files (see `briefs/deviations.md` §1) — none are yours
  to fix; your Verify command already filters to your own new test file.

## Model

**Sonnet** — the default tier for every iw9-f2 stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. F2 is not in that table's Opus-escalation row. Precision on the
classifier boundary (`"shared"` vs. container `"open"`) matters, but this is
still elaboration against a frozen contract, not novel logic — Sonnet is the
correct tier, not Opus.

## Report back

When done: check off tasks 2.1–2.4 in
`openspec/changes/iw9-f2-shared-partition/tasks.md`, and open a PR (or write
`briefs/02-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything Stream 3 (which builds on
this guard) needs to know.

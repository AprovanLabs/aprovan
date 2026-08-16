# Stream 2 report — Partition guard and scope grammar

## Built

`server/workspace/src/apps/store.ts` (tasks 2.1–2.3):

- `PartitionAccess` gains `"shared"`; `partitionAccess` classifies
  `.apps/<id>/shared/<instanceId>[/…]` as `"shared"` — containers
  (`.apps/<id>/shared` and shorter) and malformed shapes (other
  discriminators like `team`, empty instance id) stay `"open"`. Pure and
  synchronous, per TD2.
- New `parseSharedPartition(path)` → `{ id, instanceId } | undefined`,
  exactly the tech-plan contract; `partitionAccess` reuses it so the
  classifier and the parser cannot drift.
- `assertPartitionAccess` on `"shared"` delegates to `instances.ts`
  `assertInstanceAccess(workspaceId, id, instanceId, callerSub)` — Stream 1's
  deny-as-404, per-request membership re-check (invariants 3+5), and
  fail-closed orphan handling pass through unchanged. `hiddenDataPrefixes`
  untouched (tech-plan deviation 2).
- `appPathServable` now excludes the whole `.apps/<id>` container instead of
  only `appDataRoot(id)` — shared partitions can never be served over HTTP.
- `sharedDataDir` is re-exported from `instances.ts` (static
  `export { sharedDataDir }`) so the tech-plan's `apps/store.ts` contract
  block holds without a duplicated literal. The static import of
  `instances.js` is cycle-safe: `instances.ts` reaches `install.ts` (which
  imports `store.ts`) only via dynamic `import()`, and its other deps
  (`memberships`, `svc-records`, `service-kernel`) never runtime-import
  `apps/store` (service-kernel's import is type-only).

`server/workspace/tests/shared-partition-guard.test.ts` (task 2.4, 8 tests):
classification table (shared paths, containers, malformed discriminators,
unchanged own/foreign/open rules), `parseSharedPartition` round-trips with
`sharedDataDir` and undefined cases, snapshot/list hiding of
`.apps/A/shared/**` via `hiddenDataPrefixes` + `isHiddenDataPath` (the exact
seam `vcs/store.ts` and `routes/fs.ts` use), `appPathServable` false for
shared paths (including a hostile root aimed at the container), and
`assertPartitionAccess` ACL pass/deny/orphan/departed-member via seeded
instance records — re-exercising Stream 1's scenarios end-to-end through the
guard.

## Verified

```bash
pnpm turbo run build --filter=@aprovan/workspace                        # exit 0 (5 successful)
pnpm -C server/workspace exec vitest run tests/shared-partition-guard.test.ts  # 8 passed (8)
pnpm -C server/workspace typecheck                                      # exit 0
```

Regression checks: `tests/partition-access.test.ts` (14) and
`tests/app-instances.test.ts` (11) still pass. Full unfiltered suite: 22
failed files / 72 failed tests — main has moved since `briefs/deviations.md`
§1's 2026-08-09 measurement (18/81), so the failing set was re-measured at
this HEAD with this stream's changes stashed: the failing-file sets and
failure counts are byte-identical with and without the changes. Zero
regressions from this stream. Note: Stream 1's report saw build/typecheck red
(`NativeVcsDiff` drift); that is fixed on current main — both are green here.

## Deviations

1. **`sharedDataDir` is a re-export, not a twin.** The tech-plan contract
   block lists it under `apps/store.ts`; Stream 1 landed it in
   `instances.ts` (tasks §1.1). Per Stream 1's report ("re-export or keep a
   twin"), `store.ts` re-exports it — one literal, no drift, contract shape
   satisfied from both modules.
2. **Static import instead of dynamic for `assertInstanceAccess`.** Stream
   1's notes suggested "prefer dynamic import … to avoid cycles"; the cycle
   was verified absent (see Built), so the plain static import was used —
   matching store.ts style, where dynamic imports mark real cycles only.
3. **Malformed-discriminator "rejection" is guard-shaped, not 4xx-shaped.**
   The spec's 4xx for `app#A#team#X` / `app#A#shared#` is a record-surface
   (scope-string) behavior owned by Stream 3. At the file-plane guard layer,
   the equivalent property — asserted in the tests — is that such shapes
   never classify `"shared"`, never parse, and so can never reach
   `assertInstanceAccess`; they remain `"open"` containers that are hidden
   from listings and non-servable.

## Notes for Stream 3 (scope addressing)

- Delegation shape: `assertPartitionAccess` calls
  `assertInstanceAccess(workspaceId, id, instanceId, callerSub)` and lets its
  404 propagate — build `resolveRecordScope`'s `instance` branch on the same
  call so record- and file-plane denials stay byte-identical.
- `parseSharedPartition` accepts any non-empty `<id>`/`<instanceId>` segment
  (structural, like the rest of the guard — no ULID validation); the
  scope-string surface owns the 4xx for malformed discriminators and empty
  instance ids, and orphan instance ids already fail closed via
  `assertInstanceAccess`.
- Sync call sites that check `partitionAccess(...) === / !== "foreign"`
  (`routes/fs.ts:94,114,224`, `services.ts:559`) treat `"shared"` like the
  previous `"open"` classification — no behavior change today (paths under
  `.apps` were already `"open"` there), but anything that starts *writing*
  through those routes must go through `assertPartitionAccess`, not the sync
  classifier.
- `import { sharedDataDir } from "./apps/store.js"` and from
  `./apps/instances.js` are both valid; they are the same binding.

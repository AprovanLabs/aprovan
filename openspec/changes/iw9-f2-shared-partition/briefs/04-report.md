# Report — Stream 4: Storage metering and caps

## What was built

**`server/workspace/src/records.ts`** (4.1 + the delta plumbing of 4.2)

- New internal helpers `sharedScopeInstanceId(scope)` (parses
  `app#<id>#shared#<instanceId>`) and `meterSharedScopeDelta(tenant, scope,
  deltaBytes)` — the one place all three backends feed byte deltas to
  `reserveInstanceBytes` (dynamic `import()` of `apps/instances.js`, since a
  static import would close the cycle records.ts → instances.ts →
  svc-records.ts → records.ts). The 413 over-cap rejection propagates
  (strict, pre-write); every other failure — instance record missing (orphan
  crash window), counter-write hiccup — is swallowed: metering is
  best-effort per TD5 and `recountInstanceUsage` is the correction path.
- All three `IRecordStore` backends stamp the serialized-value byte size on
  rows written under `#shared#` scopes only: Dynamo item attribute `bytes`,
  SQLite/DSQL nullable `bytes` column (SQLite gets an in-place
  try-`ALTER TABLE` like the existing `expires_at` one). Legacy, per-user,
  `ws`, and `svc#` rows keep `bytes` null. `RecordEntry` is unchanged.
- Write paths: cap gate fires **before anything is stored** (S3 spill blob
  included); delete paths recover the old stamp (Dynamo: existing
  `ReturnValues: ALL_OLD`; DSQL: extended the existing prior-row `SELECT
  spilled` to `SELECT spilled, bytes`; SQLite: new prior-row read) and apply
  the negative delta, which can never 413.
- Scope-doc block: appended the `app#<id>#shared#<instanceId>` line per
  tech-plan Deviation 1; the stale `<name>` text above it untouched.

**`server/workspace/src/db/dsql-schema.sql`** — `records` gains nullable
`bytes bigint` plus a deployment-ALTER comment matching the existing
`workspaces` pattern.

**`server/workspace/src/apps/instances.ts`** (4.2–4.4, appended after Stream
1's functions; nothing of Stream 1 restructured)

- `setInstanceCap` — set/clear `storageCapBytes`, 400 on negative or
  non-integer caps.
- `reserveInstanceBytes` — pre-write cap gate + counter delta in one call:
  413 when `deltaBytes > 0 && storageBytes + delta > storageCapBytes`;
  negative deltas never blocked; counter floors at 0 under drift.
- `recountInstanceUsage` — sums re-serialized record values (spilled values
  included: `get` resolves them from S3 before sizing) plus FsStore entry
  sizes under `sharedDataDir`, rewrites `storageBytes`, returns the figure.
- `deleteInstance` — deletes every record in the shared scope (the store's
  own `delete` cleans spilled blobs), removes the shared file subtree via
  `getFsStore().removePrefix` (same pattern as `purgeInstallData`,
  install.ts:492-497), then deletes the instance record. 404 on a missing
  instance (fail closed). **Mechanism only** per the brief's 4.4
  clarification: no `getAuditStore()` import, no audit row — that is Stream
  5's `apps.instanceDelete`.

**`server/workspace/tests/instance-storage.test.ts`** (4.5, 12 tests) —
counter tracking on shared writes/overwrites; SQLite row-level `bytes`
stamp (shared stamped, per-user/`ws` null, asserted via a read-only second
connection to workspace.db); usage + cap reporting; drift injection +
recount convergence; 413 with nothing stored and footprint unchanged;
delete-while-over-cap decreasing the footprint; cap clear + invalid-cap 400;
`deleteInstance` clearing both planes (sibling per-user file survives) and
failing closed afterwards; Dynamo item shape and metering parity via a
mocked `db/client.js` document client (no live Dynamo): `bytes` present on
shared items only, 413 before any Put, ALL_OLD delete decrementing the
counter. No audit-row assertions, per the brief.

## Verify

Run 2026-08-16 from the worktree root:

- `pnpm turbo run build --filter=@aprovan/workspace` — 5 successful, 5 total, exit 0
- `pnpm -C server/workspace exec vitest run tests/instance-storage.test.ts` —
  **Test Files 1 passed (1), Tests 12 passed (12)**
- `pnpm -C server/workspace typecheck` — exit 0 (`effect-completeness: ok (137 tools)`)
- Sanity: `tests/app-instances.test.ts` (Stream 1) still 11 passed (11).

## Deviations

1. **Dynamo `set` uses a projected `GetCommand` pre-read for the cap gate,
   not `ReturnValues: ALL_OLD` on the Put.** TD5 names ALL_OLD as the
   old-bytes source, but ALL_OLD only reports *after* the item is written —
   the spec's over-cap scenario requires 413 with *nothing stored*, so the
   prior stamp must be known pre-write. ALL_OLD is still the delta source on
   the delete path (where it already existed for spill cleanup). SQL
   backends read the prior row exactly as TD5 states. Interfaces unchanged.
2. **`reserveInstanceBytes` checks the cap and applies the delta in one
   call, invoked pre-write.** TD5's docstring reads "Pre-write check +
   post-write counter delta"; with the frozen single `Promise<void>`
   signature there is no two-phase seam, so reserve = check-then-apply. If
   the physical write subsequently fails the counter drifts by one write —
   exactly the drift class TD5 tolerates and recount corrects.
3. **dsql-schema.sql uses `bytes bigint`, not `bytes INTEGER`.** Matches the
   file's own convention for byte sizes (`size bigint` in `fs_latest`/
   `fs_files`, `expires_at bigint`). SQLite uses `bytes INTEGER` as tasked
   (SQLite INTEGER is 64-bit).

## Notes for Stream 5 (admin/host procedures)

- `reserveInstanceBytes`/`recountInstanceUsage`/`deleteInstance`/
  `setInstanceCap` are live with the exact tech-plan signatures. None of
  them audits or host-gates — wrap them.
- `deleteInstance` throws `ServiceError` 404 for an unknown instance and is
  not idempotent (second call 404s); the procedure can surface that
  directly. `_actor` is accepted per the frozen signature but unused —
  your audit row is what names the caller.
- `setInstanceCap(ws, id, undefined, actor)` clears the cap; it throws 400
  on negative/non-integer caps. Lowering the cap below current usage is
  allowed by design (spec "cap lowered after writes").
- Cap enforcement fires inside `IRecordStore.set` for `#shared#` scopes on
  every backend — `apps.instance*` does not need its own pre-write check
  for the record plane. File-plane (shared-dir FsStore) writes are **not**
  yet metered at the store layer; per tech-plan they are surfaced through
  the guard/service layer (Streams 2/3) — whoever wires shared-file writes
  should call `reserveInstanceBytes(ws, instanceId, contentBytes - oldSize)`
  the same way. Recount already counts files either way.
- Uninstall wiring (task 5.3): call `deleteInstance` per instance *before*
  `purgeInstallData`, or the shared subtree is gone but instance records and
  spilled record blobs are orphaned (tech-plan Risks).

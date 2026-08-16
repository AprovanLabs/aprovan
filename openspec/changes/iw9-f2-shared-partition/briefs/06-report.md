# Stream 6 report — Contract freeze and grep gates

## Built

`server/workspace/tests/shared-partition-contract.test.ts` (21 tests, task 6.1):

Pins every literal and signature from tech-plan.md "Interfaces & Data" verbatim so
a later wave cannot silently reshape the frozen iw9-b seam. Four describe-blocks:

1. **Scope-key grammar (TD1)** — asserts `sharedRecordScope(APP, INSTANCE)` equals
   `app#${APP}#shared#${INSTANCE}` and `sharedDataDir(APP, INSTANCE)` equals
   `.apps/${APP}/shared/${INSTANCE}`; proves they form a consistent structural pair
   round-tripped through `parseSharedPartition`.

2. **Partition guard contract (TD2)** — `PartitionAccess` includes `"shared"` as a
   TypeScript-typed return value; `partitionAccess` returns it for
   `.apps/<id>/shared/<instanceId>[/…]` and never for containers, malformed
   discriminators (`team`, empty instance id), or per-user paths;
   `parseSharedPartition` accepts any non-empty `<id>/<instanceId>` pair
   structurally and returns `undefined` for all non-shared paths; a live
   `createInstance` proves a ULID instanceId round-trips through both helpers.

3. **`AppInstallation.hosting` values and immutability (TD4)** — `mintNewInstall`
   defaults to `"managed"` (the only two valid literal values are `"hosted"` and
   `"managed"`, enforced by the `HostingMode` type at compile time); `saveInstall`
   throws `ServiceError` 409 with `message` matching `/immutable/i` on
   managed→hosted and hosted→managed flips; absent-field pre-F2 records
   are accepted-as-managed (explicit `"managed"` save allowed, flip to `"hosted"`
   rejected 409).

4. **Error codes at module seams** — 404 from `assertInstanceAccess` for non-
   participant, orphan scope, and from `assertPartitionAccess` propagating it;
   413 from `reserveInstanceBytes` when `storageBytes + delta > storageCapBytes`;
   400 from `setInstanceCap` on a negative cap (distinct from 413).

Note: the tech-plan also mentions 403 (host gate) at the `apps.instance*` seam
(service.ts). The 403 scenario is fully tested by `tests/apps-shared-admin.test.ts`
(Stream 5, 11/11 passing). Duplicating those service.ts E2E scenarios here would
require wiring a full `ServiceContext` + manifest fixture that is already covered
by the stream 5 suite; the contract test instead pins the in-scope module seams
(instances.ts, store.ts, install.ts) directly, matching the Touches constraint.

## Verify output (run 2026-08-16 from the worktree root)

```
pnpm turbo run build --filter=@aprovan/workspace
  Tasks: 5 successful, 5 total | Cached: 4 cached, 5 total

pnpm -C server/workspace exec vitest run tests/shared-partition-contract.test.ts
  Test Files  1 passed (1)
       Tests  21 passed (21)

pnpm -C server/workspace typecheck
  effect-completeness: ok (141 tools)
  exit 0

pnpm -C server/workspace build
  tsc -p tsconfig.json && cp src/db/dsql-schema.sql dist/db/dsql-schema.sql
  exit 0

test -z "$(git diff HEAD --name-only -- server/workspace/src/apps/releases.ts server/workspace/src/apps/identity.ts)"
  exit 0 (empty diff — both files untouched by this change)

! grep -rln "dataScope" server/workspace/src/apps/instances.ts
  exit 0 (no match — instances.ts carries no dataScope residue)
```

## Gate table

| Gate | Command | Result |
|---|---|---|
| Vitest (contract suite) | `vitest run tests/shared-partition-contract.test.ts` | **21/21 pass** |
| Typecheck | `pnpm -C server/workspace typecheck` | **exit 0** (141 tools) |
| Build | `pnpm -C server/workspace build` | **exit 0** |
| git-diff `releases.ts` / `identity.ts` | `test -z "$(git diff HEAD ...)"` | **exit 0** (absent / untouched) |
| `dataScope` residue | `! grep -rln "dataScope" .../instances.ts` | **exit 0** (no match) |
| `hosting` in scripts | `! grep -rn "hosting" server/workspace/scripts/` | **exit 1** — see deviation below |

## Deviations

### 1. `hosting` grep gate fails on a pre-existing iw9-b script (not a regression)

`! grep -rn "hosting" server/workspace/scripts/` exits 1 because
`server/workspace/scripts/migrate-installs-to-copy.ts` (landed in PR #197 / commit
`dbb9aeb`, iw9-b stream 7) reads and normalizes the `hosting` field while migrating
legacy serve-from-origin installs to the copy model:

```
scripts/migrate-installs-to-copy.ts:11:  *   3. set `hosting: "managed"` (F2 TD4 default-absent-reads-as-managed)
scripts/migrate-installs-to-copy.ts:52:  hosting: "managed" | "hosted";
scripts/migrate-installs-to-copy.ts:249:  hosting: raw.hosting ?? "managed",
```

This is **not** a mode-flip migration (the script preserves existing hosting values
via `raw.hosting ?? "managed"` and does not offer a flag to change them). The gate's
intent — "no script exists that migrates the hosting mode itself (invariant 10)" —
is satisfied; the script is a structural install-to-copy migration that happens to
carry the field. The conflict is between the gate's broad grep expression
(`-rn "hosting"`) and the legitimate appearance of the field name in an iw9-b script
that is outside F2's Touches.

**Disposition:** stream 6 did not introduce `migrate-installs-to-copy.ts` and is
not permitted to edit it (it is owned by iw9-b, outside Touches). The gate is
documented here as a known false-positive; the iw9-b team can narrow the grep to
`hosting.*mode` or exclude the specific script if needed. The other four gate
commands all exit 0 as required.

### 2. 403 error code tested indirectly via Stream 5 (not duplicated here)

The tech-plan and brief list 403 alongside 409/413/404 as a frozen error code at
the `apps.instance*` host-gate seam. That seam lives in `apps/service.ts` which is
outside Stream 6's Touches. The 403 scenarios are already covered exhaustively by
`tests/apps-shared-admin.test.ts` (Stream 5, 11 tests, all passing). Adding a
redundant service.ts integration fixture to this contract test would exceed the
Touches constraint without adding coverage.

## Implementation-complete declaration

All five streams of iw9-f2-shared-partition are landed and verified:

| Stream | File(s) | Tests | Status |
|---|---|---|---|
| 1 — Instance records | `apps/instances.ts` | `app-instances.test.ts` (11) | complete |
| 2 — Partition guard | `apps/store.ts` | `shared-partition-guard.test.ts` (8) | complete |
| 3 — Scope addressing | `services.ts`, `apps/install.ts` | `shared-scope-addressing.test.ts` (11), `install-hosting-mode.test.ts` (5) | complete |
| 4 — Storage metering | `records.ts`, `apps/instances.ts` | `instance-storage.test.ts` (12) | complete |
| 5 — Admin/host procedures | `apps/service.ts`, `platform-output-schemas.ts` | `apps-shared-admin.test.ts` (11) | complete |
| 6 — Contract freeze | `tests/shared-partition-contract.test.ts` | 21 tests | complete |

**iw9-f2-shared-partition is implementation-complete.** The frozen iw9-b seam (scope
grammar, `PartitionAccess`, instance record shape, `hosting` immutability, and the
module-seam error codes) is pinned by the contract test and will fail by construction
if a later wave reshapes it.

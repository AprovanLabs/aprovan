# Tasks — iw9-f2-shared-partition

External dependencies: none. No new packages — existing vitest,
better-sqlite3, and AWS SDK cover everything. NOTE for every agent: the full
`pnpm -C server/workspace test` run has 22 known-failing legacy VCS suites
owned by iw9-f6 — do NOT touch or fix them; all Verify commands below filter
to this change's NEW test files. Do NOT edit `server/workspace/src/apps/
releases.ts` (owned by iw9-a) or `server/workspace/src/apps/identity.ts`
(owned by iw9-f4). All contracts are frozen in tech-plan.md
"Interfaces & Data"; cite TD1-TD6 there.

## 1. Instance records module

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/instances.ts, aprovan/server/workspace/tests/app-instances.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/app-instances.test.ts && pnpm -C server/workspace typecheck

- [x] 1.1 Create `server/workspace/src/apps/instances.ts` with `HostingMode`,
      `AppInstanceRecord`, `sharedRecordScope`, and `sharedDataDir` exactly as
      stated in tech-plan "Interfaces & Data" (TD1, TD3); instance records
      persist via `svcScope("app-instances")` using the `svc-records.ts`
      helpers (key = instanceId ULID; mint via the existing ULID helper used
      by `apps/identity.ts` — import the util, do not edit identity.ts).
- [x] 1.2 Implement `createInstance`, `getInstance`, `listInstances`,
      `addParticipant`, `removeParticipant`: participant adds to a
      `managed`-mode install reject non-members of the hosting workspace via
      `memberships.ts` `getMembership` with a 4xx naming the requirement
      (spec `shared-record-partition` / "Managed instances require
      hosting-workspace membership").
- [x] 1.3 Implement `assertInstanceAccess` per TD2/TD3: deny-as-404
      (`ServiceError(..., 404)`) for non-participants, missing instance
      records (orphan scope, fail closed), and — for managed installs —
      listed participants whose hosting-workspace membership is gone
      (invariants 3+5); membership resolved per request, no caching.
- [x] 1.4 New test file `server/workspace/tests/app-instances.test.ts`
      covering every scenario of spec `shared-record-partition` requirements
      "Instance record is the ACL" and "Managed instances require
      hosting-workspace membership" (participant read/write attribution
      asserted at the module level, non-participant 404, removal effective
      next request, orphan-scope 404, non-member add rejected, departed
      member denied).

## 2. Partition guard and scope grammar

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/store.ts, aprovan/server/workspace/tests/shared-partition-guard.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/shared-partition-guard.test.ts && pnpm -C server/workspace typecheck

- [x] 2.1 Extend `partitionAccess` (apps/store.ts:279-298) to classify
      `.apps/<id>/shared/<instanceId>/…` as the new `"shared"` value —
      containers (`.apps/<id>/shared` and shorter) stay `"open"`; add
      `parseSharedPartition(path)` per the tech-plan contract (TD1, TD2).
      Keep the function pure and synchronous.
- [x] 2.2 Extend `assertPartitionAccess` (apps/store.ts:304-313): on
      `"shared"`, delegate to `instances.ts` `assertInstanceAccess`
      (deny-as-404 falls out); `hiddenDataPrefixes` (store.ts:250-252) is
      intentionally unchanged — structural `.apps` root already hides shared
      paths (tech-plan Context, deviation 2).
- [x] 2.3 Widen `appPathServable` (apps/store.ts:336-338) to exclude the
      whole `.apps/<id>` container instead of only `appDataRoot(id)`, so
      shared partitions are never servable over HTTP (spec "Shared
      partitions are hidden from the file plane").
- [x] 2.4 New test file `server/workspace/tests/shared-partition-guard.test.ts`:
      classification table for shared paths/containers, `parseSharedPartition`
      round-trips, malformed discriminators (`app#A#team#X`, empty instance
      id) rejected by the guard layer, snapshot/list hiding of
      `.apps/A/shared/**`, `appPathServable` false for shared paths, and
      `assertPartitionAccess` ACL pass/deny via a seeded instance record.

## 3. Record-surface addressing and hosting immutability

> Depends-on: 2 | Repo: aprovan | Touches: aprovan/server/workspace/src/services.ts, aprovan/server/workspace/src/native-dispatch.ts, aprovan/server/workspace/src/apps/install.ts, aprovan/server/workspace/tests/shared-scope-addressing.test.ts, aprovan/server/workspace/tests/install-hosting-mode.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/shared-scope-addressing.test.ts tests/install-hosting-mode.test.ts && pnpm -C server/workspace typecheck

- [x] 3.1 Implement `resolveRecordScope(ctx, { instance? })` in `services.ts`
      per the tech-plan seam: absent `instance` preserves today's behavior
      (services.ts:104); present `instance` returns
      `app#<id>#shared#<instanceId>` only after `assertInstanceAccess`.
      Thread the optional `instance` argument through the record/keyvalue
      tool procedures (native-dispatch.ts scope builder at :49) —
      `assertCallerScope` (svc-records.ts:51-65) semantics unchanged.
- [x] 3.2 Add `hosting: HostingMode` to `AppInstallation`
      (apps/install.ts:33-50) and `mintNewInstall` (install.ts:231-256),
      default `"managed"`; readers treat an absent field on pre-F2 records as
      `"managed"` (TD4). No migration script — grep gate in stream 6 enforces
      the foreclosure (invariant 10; `scripts/migrate-app-records.ts` CAVEAT
      is the cited precedent).
- [x] 3.3 Guard `saveInstall` (install.ts:86-91): when a stored record exists
      and `stored.hosting !== install.hosting`, throw `ServiceError` 409
      stating the mode is immutable (spec "Hosting mode is immutable on the
      install record").
- [x] 3.4 New test file `server/workspace/tests/shared-scope-addressing.test.ts`:
      instance-addressed record get/set/list succeed for participants with
      `updatedBy` attribution, 404 for non-participants, distinct listing of
      `app#A#shared#I1` vs `app#A#u#S1` under `listScopes` (spec "Shared
      scope-key grammar" scenarios).
- [x] 3.5 New test file `server/workspace/tests/install-hosting-mode.test.ts`:
      mode fixed at creation, flip rejected with 409 and stored record
      unchanged, absent-field record reads as `managed`.

## 4. Storage metering and caps

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/records.ts, aprovan/server/workspace/src/db/dsql-schema.sql, aprovan/server/workspace/src/apps/instances.ts, aprovan/server/workspace/tests/instance-storage.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/instance-storage.test.ts && pnpm -C server/workspace typecheck

- [ ] 4.1 Stamp serialized-value byte size on rows written under `#shared#`
      scopes in all three `IRecordStore` backends (Dynamo item attribute
      `bytes`; nullable `bytes INTEGER` column for SQLite in-place ALTER and
      dsql-schema.sql), per TD5. `RecordEntry` shape unchanged; legacy and
      per-user rows keep `bytes` null.
- [ ] 4.2 Implement `setInstanceCap`, `reserveInstanceBytes` (413 when
      `storageBytes + delta > storageCapBytes`; deletes and reads never
      blocked), and best-effort counter deltas on shared record writes/
      deletes (Dynamo `ReturnValues: ALL_OLD`; SQL backends read prior row)
      in `instances.ts` (TD5; spec `instance-storage` "Host-set storage
      cap").
- [ ] 4.3 Implement `recountInstanceUsage`: walk the instance's record scope
      (including spilled S3 blob sizes) and shared file partition (FsStore
      entry sizes), rewrite `storageBytes`, return the recomputed figure
      (spec "Per-instance storage metering" / recount-corrects-drift).
- [ ] 4.4 Implement `deleteInstance`: remove every record in the scope
      (spilled blobs included, reusing the store's existing blob cleanup),
      remove the shared file subtree via the FsStore prefix removal (cf.
      `purgeInstallData`, install.ts:298-303), delete the instance record;
      subsequent access 404s (spec `instance-storage` "Host-initiated
      instance deletion" — audit row is appended by the stream-5 procedure).
- [ ] 4.5 New test file `server/workspace/tests/instance-storage.test.ts`:
      usage reporting, over-cap write 413 with nothing stored, delete
      permitted while over cap, drift + recount convergence, deleteInstance
      clearing both planes and failing closed afterwards. Cover SQLite
      backend directly; assert the Dynamo item shape via the store's
      serialization unit seams (no live Dynamo dependency in the new file).

## 5. Admin and host procedures, audited

> Depends-on: 3, 4 | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/service.ts, aprovan/server/workspace/src/platform-output-schemas.ts, aprovan/server/workspace/tests/apps-shared-admin.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/apps-shared-admin.test.ts && pnpm -C server/workspace typecheck

- [ ] 5.1 Add `apps.dataInstances` (admin-gated instance listing with
      participants, storageBytes, cap) and accept an `instance` argument —
      mutually exclusive with `user`, 400 if both — on `apps.dataKeys`/
      `dataGet`/`dataRead`, reusing the existing admin gate
      (apps/service.ts:1120-1126) and audit append (:1210-1217) with the
      tech-plan `operation` string shape; declare tool schemas beside the
      existing `apps.data*` entries (:612-668) and output schemas in
      platform-output-schemas.ts (TD6).
- [ ] 5.2 Add `apps.instanceUsage` (with `recount: true` option),
      `apps.instanceCap`, `apps.instanceDelete`, gated on host
      (hosting-workspace admin, or creator when hosting in their personal
      space per IW-9 D1/D22); every call audited; non-host cap/delete → 403
      (spec `instance-storage` scenarios).
- [ ] 5.3 Wire uninstall cleanup: the existing uninstall path that calls
      `purgeInstallData` also deletes each of the install's instances via
      `deleteInstance` so no instance records or spilled blobs are orphaned
      (tech-plan Risks).
- [ ] 5.4 New test file `server/workspace/tests/apps-shared-admin.test.ts`:
      admin reads shared record by instance+key with audit row asserted
      (caller, app, instance, key), non-admin 403 without a success audit
      row, `user`+`instance` together → 400, admin-as-non-participant direct
      record access still 404 (no unaudited side door), host usage/cap/
      delete round-trip, non-host 403s.

## 6. Contract freeze and grep gates

> Depends-on: 5 | Repo: aprovan | Touches: aprovan/server/workspace/tests/shared-partition-contract.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/shared-partition-contract.test.ts && pnpm -C server/workspace typecheck && pnpm -C server/workspace build && test -z "$(git diff HEAD --name-only -- server/workspace/src/apps/releases.ts server/workspace/src/apps/identity.ts)" && ! grep -rn "hosting" server/workspace/scripts/ && ! grep -rln "dataScope" server/workspace/src/apps/instances.ts

- [ ] 6.1 New test file `server/workspace/tests/shared-partition-contract.test.ts`
      pinning the frozen iw9-b seam exactly as written in tech-plan
      "Interfaces & Data": scope-string construction
      (`sharedRecordScope`/`sharedDataDir` literals), `PartitionAccess`
      includes `"shared"`, `parseSharedPartition` grammar (ULID id +
      instanceId, rejects other discriminators), `AppInstallation.hosting`
      accepted values, and 409/413/404/403 error codes at the module seams —
      a breaking edit by a later wave fails this suite by construction.
- [ ] 6.2 Run the full Verify chain and confirm the gates: `releases.ts`
      (iw9-a) and `identity.ts` (iw9-f4) untouched per `git diff`; no
      script under `server/workspace/scripts/` mentions `hosting` (no
      mode-flip migration exists, invariant 10); the new module carries no
      `dataScope` residue. Fix anything the gates catch before checking this
      box.

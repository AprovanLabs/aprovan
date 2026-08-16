# Stream 5 report — Admin and host procedures, audited

## Built

`server/workspace/src/apps/service.ts` (5.1–5.3):

- **`apps.dataInstances`** (5.1) — new procedure in the existing
  `data*` case group, behind the same app-admin gate
  (`manifest.roles?.admins`): lists the app's `AppInstanceRecord`s as
  `{ instanceId, participants, storageBytes, storageCapBytes?, createdBy,
  createdAt, updatedAt }`. Audit operation `data:<appId>:instances`.
- **`instance` argument on `apps.dataKeys`/`dataGet`/`dataRead`** (5.1) —
  mutually exclusive with `user` (400 naming the exclusivity when both are
  given; 400 "`user` or `instance` is required" when neither). Instance
  addressing resolves `sharedRecordScope(appId, instance)` for records and
  `sharedDataDir(appId, instance)` for files (with the same
  stay-within-partition path check), deliberately bypassing the participant
  ACL — this is the sanctioned, gated, audited admin surface (TD6); the
  plain record/file planes stay deny-as-404. Audit operation
  `data:<appId>:instance:<instanceId>[:key|:path]` per the tech-plan shape;
  the `user`-addressed shape is unchanged. Tool input schemas updated
  (`user` no longer `required`, since `instance` is the alternative);
  the legacy `apps.data` mode-sniffing overload was not extended — no new
  sniffing branch was added (the shared validation applies after the mode is
  fixed by the split-op name).
- **`apps.instanceUsage` / `apps.instanceCap` / `apps.instanceDelete`**
  (5.2) — new case group. 400 missing `instance`, 404 unknown instance,
  then the resolved host gate exactly as briefed: one
  `getMembership(record.hostWorkspaceId, ctx.userId)?.role === "admin"`
  check (no `createdBy`/personal-space branch), 403 otherwise. Usage
  reports `{ instanceId, storageBytes, storageCapBytes? }` and
  `recount: true` routes through `recountInstanceUsage` (authoritative
  rewrite). Cap accepts `cap` bytes (omit/null to clear → `setInstanceCap`
  with `undefined`; its 400 on negative/non-integer caps surfaces
  directly), returning `storageCapBytes: number | null`. Delete calls
  Stream 4's `deleteInstance` and returns `{ instanceId, deleted: true }`.
  Every successful call appends an audit row (`instance:usage:<id>` /
  `instance:cap:<id>` / `instance:delete:<id>`, caller in `callerId`);
  gate failures throw before any success row, matching the existing
  `apps.data*` audit discipline.
- **Uninstall cleanup** (5.3) — the `uninstall` purge path now iterates
  `listInstances(workspaceId, installId)` and calls `deleteInstance` for
  each **before** `purgeInstallData` (per Stream 4's ordering note: the
  record scope + spilled blobs + instance records must be cleaned before
  the blanket `.apps/<installId>` subtree removal). Uninstall without
  `purgeData` keeps installs' instances, matching its existing keep-data
  semantics.

`server/workspace/src/platform-output-schemas.ts` (5.1/5.2): output schemas
for the four new tools; `apps.dataKeys`/`dataGet`/`dataRead` gain an
`instance` property and drop `user` from `required` (exactly one of the two
subjects appears per result). `sealTool` fails closed on schema-less tools,
so this is load-bearing, not documentation.

`server/workspace/tests/apps-shared-admin.test.ts` (5.4, 11 tests): every
scenario in the task text — admin dataGet by instance+key with the audit row
asserted (caller, app, instance, key), dataKeys/dataRead instance addressing
with path-level audit detail, partition-escape 400, dataInstances listing
(participants/storageBytes/cap) with its audit row, non-admin 403 across all
four ops with zero success audit rows, `user`+`instance` 400, the
no-side-door check (app admin as non-participant → 404 via
`keyvalueProductService`), the host usage→recount→cap→clear→delete
round-trip with the full audited operation sequence asserted (drift injected
by an unmetered shared-file write; recount converges and persists), non-host
403s (participant and stranger alike; cap and instance unchanged, no success
rows), unknown-instance 404 / missing-arg 400, and the 5.3 uninstall-purge
test proving instance record, shared records, and both file planes are gone.

## Verify

Run 2026-08-16 from the worktree root:

- `pnpm turbo run build --filter=@aprovan/workspace` — 5 successful, exit 0
- `pnpm -C server/workspace exec vitest run tests/apps-shared-admin.test.ts`
  — **Test Files 1 passed (1), Tests 11 passed (11)**
- `pnpm -C server/workspace typecheck` — exit 0
  (`effect-completeness: ok (141 tools)` — 137 + the 4 new procedures)

Regression sweep: `partition-access` (14), `app-instances` (11),
`instance-storage` (12), `shared-scope-addressing` (11),
`install-hosting-mode` (5), `platform-output-schemas`, `apps-install-copy`
all pass. `app-integration.test.ts` has 1 failing test
(`resolvedRelease` assertion) that fails identically with this stream's
changes stashed — pre-existing at this HEAD, not a regression.

## Deviations

1. **`apps.dataGet`/`dataRead` keep `key`/`path` in their input-schema
   `required` lists, but `user` had to come out of all three** — `instance`
   is now a valid alternative subject, so requiredness of the subject moved
   into the handler (400 "`user` or `instance` is required"). Behavior for
   existing `user` callers is unchanged.
2. **The generic `data:` 400/403 error text for the read-path containment
   changed from "the user's partition" to "the partition"** — it now covers
   both subjects; no test asserted the old wording.
3. **None otherwise.** The brief's cited service.ts line numbers had drifted
   (admin gate now ~1300, audit ~1390) but the named seams were exactly as
   described; the uninstall path (task 5.3) lives inside
   `apps/service.ts` (`case "uninstall"`), i.e. within Touches — no
   out-of-scope file was modified.

## Notes for Stream 6 (contract freeze)

- Frozen result shapes as implemented:
  - `apps.dataInstances` → `{ appId, app, instances: [{ instanceId,
    participants, storageBytes, storageCapBytes?, createdBy, createdAt,
    updatedAt }] }`
  - `apps.dataKeys`/`dataGet`/`dataRead` results carry exactly one of
    `user` / `instance`.
  - `apps.instanceUsage` → `{ instanceId, storageBytes,
    storageCapBytes? }` (cap key absent when uncapped);
    `apps.instanceCap` → `{ instanceId, storageBytes, storageCapBytes:
    number | null }`; `apps.instanceDelete` → `{ instanceId, deleted:
    true }`.
- Audit operation grammar as frozen by the tech-plan and now live:
  `data:<appId>:instances`, `data:<appId>:instance:<instanceId>[:key|:path]`,
  `instance:usage|cap|delete:<instanceId>`. Success rows only; 4xx throws
  append nothing.
- Error codes at these seams: 400 (missing/mutually-exclusive args, bad cap,
  path escape), 403 (non-app-admin on `data*`, non-host on `instance*`),
  404 (unknown app or instance), plus `setInstanceCap`'s 400 and
  `deleteInstance`'s 404 passing through unchanged.
- The host gate is the single membership-role check; there is still no
  `isPersonal` concept anywhere — keep the grep surface clean.

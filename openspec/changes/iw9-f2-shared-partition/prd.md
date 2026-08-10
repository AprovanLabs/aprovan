# PRD — iw9-f2-shared-partition (Wave 0, F2)

_Elaborates the F2 stream of `openspec/changes/IW-9-APP-FIRST.md`. All product
decisions are settled there (D1, D2, D22; invariants 4, 5, 10); this PRD scopes
them into a change, it does not re-litigate them._

## Problem

The record store has exactly one app-facing partition shape — per-app-per-user
(`app#<id>#u#<sub>`, documented at `server/workspace/src/records.ts:14-19`) —
so no app can hold data that several people read and write together. The Chat
flagship (Wave 2) is a shared-timeline app; the Wave-1 app model (iw9-b) needs
hosted/managed installs whose data mode is fixed at install time. Both block on
a shared partition primitive existing first. The prior attempt at shared data
(`dataScope: "workspace"`) collapsed all writers into one unattributed blob and
its migration lost attribution irrecoverably
(`server/workspace/scripts/migrate-app-records.ts`, CAVEAT block) — this change
replaces that idea with an attributed, ACL'd, capped partition.

## Users & Jobs

- **App participants** (e.g. members of a chat room): read and write one shared
  pool of records/files with full attribution, without seeing other instances'
  data or other users' private partitions.
- **Instance hosts** (the person or workspace whose tenancy stores the data,
  D1/D22): see how much storage each instance uses, cap it, and delete an
  instance outright.
- **App admins**: inspect shared-partition data through the same audited
  `apps.data*` path that already covers per-user partitions
  (`server/workspace/src/apps/service.ts:1113-1218`) — never silently.
- **Wave-1 iw9-b (consumer, not a person)**: needs a frozen scope-key grammar
  and `partitionAccess` contract to build hosted/managed install flows on.

## Goals

- A shared record scope and matching file-plane partition exist alongside
  `app#<id>#u#<sub>`, with a participant-list ACL enforced on every read/write
  path (invariant 4: participants and their agents get access by being the
  principal; apps and publishers need grants — the audited `apps.data*` path).
- Managed-shared instances verifiably enforce invariant 5: every participant is
  a member of the hosting workspace, checked at access time (invariant 3 —
  derived, never snapshotted).
- Hosting mode is recorded on the install record and rejected on mutation
  (invariant 10). `grep`-verifiable: no code path writes `hosting` after
  creation.
- D22 economics: host sees per-instance byte usage, sets a cap that writes
  cannot exceed (over-cap write fails with a client-distinguishable error), and
  can delete an instance (records + files + instance row, audited).
- The scope grammar and `partitionAccess` contract are stated as TypeScript
  interfaces in the tech plan, exact enough for iw9-b to code against without
  reading F2's implementation.
- New behavior covered by new test files; the 22 known-failing legacy suites
  (iw9-f6's) are untouched.

## Non-Goals

- **No install-time hosting picker UI or install flow changes** — iw9-b (D2)
  builds the picker on this substrate. F2 only adds the field, its
  immutability, and the partition it selects.
- **No mode-flip migration, ever.** Hosting mode is immutable at creation
  (invariant 10); changing it is export/import. The `dataScope: "workspace"`
  migration precedent (`scripts/migrate-app-records.ts`) lost attribution
  irrecoverably; we do not write a successor.
- **No changes to `apps/releases.ts`** (owned by iw9-a) or manifest/identity
  code (`apps/identity.ts`, `app.yaml` — iw9-f4).
- **No realtime fan-out** — broker work is F5; topic keys route, never
  authorize (invariant 7), so nothing here touches `realtime/`.
- **No cross-workspace participation mechanics** (guest roles, invites) — Chat
  (Wave 2) wires those; F2 only stores subs in a participant list.
- **No queryable collections** — the record store's scope model is unchanged
  beyond the new scope shape.
- **No client/UI work** (server-only; `ux.md` intentionally skipped).

## Capabilities

### New Capabilities

- `shared-record-partition`: the SHARED scope shape (record + file plane), the
  participant-list ACL, `partitionAccess`/`assertPartitionAccess` semantics,
  hosting-mode immutability on the install record, invariant-5 enforcement for
  managed instances, and the audited `apps.data*` admin extension for shared
  partitions.
- `instance-storage`: per-instance storage metering, the host-set cap, and
  audited instance deletion (D22).

### Modified Capabilities

None. `openspec/specs/` holds no capability covering records, partitions, or
app data (checked: 17 existing capabilities, all desktop/gateway/voice-side).
The `specs/record-store` and `per-user-space` references in source comments
point at archived change artifacts, not live capabilities.

## Constraints & Assumptions

- **Constraint — serialization (IW-9):** iw9-b consumes this scope shape in
  Wave 1; `apps/store.ts` is B-owned in Wave 1, so F2's edits there land in
  Wave 0 and freeze the contract stated in tech-plan.md.
- **Constraint — three record backends** (`records.ts`: DynamoDB, SQLite,
  DSQL) must all behave identically for the new scope; enforcement lives above
  `IRecordStore`, not per-backend.
- **Constraint — deny-as-404** is the established foreign-partition behavior
  (`apps/store.ts:304-313`); shared partitions must match it (no existence
  oracle for non-participants).
- **Assumption (verified):** live scope construction uses the app/install ULID
  (`native-dispatch.ts:49`, `services.ts:104`, `apps/service.ts:1165`); the
  `app#<name>#…` wording in `records.ts:18` is a stale comment (its purge is
  iw9-f6's `dataScope`-residue task; we do not edit it here).
- **Assumption:** metering may be counter-based and eventually consistent
  (recount procedure provided); a byte-exact live ledger is not required for
  D22's "host sees size".
- **Assumption:** the instance participant list is flat user subs in Wave 0;
  groups/roles come later if ever.

## Open Questions

None. All decisions are settled in IW-9-APP-FIRST.md (D1, D2, D22; invariants
3, 4, 5, 10); implementation-level choices are recorded with rationale in
tech-plan.md.

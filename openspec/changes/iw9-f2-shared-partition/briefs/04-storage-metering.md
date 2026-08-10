# Brief: Storage metering and caps

## Mission

Add counter-based, eventually-consistent storage metering to shared-scope
records across all three `IRecordStore` backends (Dynamo, SQLite, DSQL), plus
cap enforcement (413 over cap), a recount that corrects drift, and full
instance deletion (records + spilled blobs + shared files + the instance
record itself). This is the mechanical layer D22's economics story runs on;
Stream 5 wraps these functions in audited, host-gated procedures.

**Depends on Stream 1** — you are *extending* `apps/instances.ts`, not
creating it. Do not start until Stream 1's brief is merged, and do not
re-implement or restructure Stream 1's `AppInstanceRecord`,
`assertInstanceAccess`, `addParticipant`/`removeParticipant`, or
`createInstance`/`getInstance`/`listInstances` — add the metering functions
alongside them.

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

1. `openspec/changes/iw9-f2-shared-partition/specs/instance-storage/spec.md`
   — full spec, all three requirements (full text reproduced under
   Acceptance criteria below)
2. `openspec/changes/iw9-f2-shared-partition/tech-plan.md` — TD5; "Risks /
   Trade-offs" (counter drift under concurrent writes,
   `purgeInstallData`/orphan-instance risk); the metering/`deleteInstance`/
   `reserveInstanceBytes`/`recountInstanceUsage` signatures under "Interfaces
   & Data" (frozen — implement exactly this shape)
3. `server/workspace/src/records.ts:74-98` (the three `IRecordStore`
   backends), `:104-105` (S3 spill threshold), `:14-19` (scope-doc block —
   append the new shape here per tech-plan Deviation 1, do not otherwise
   rewrite this comment block)
4. `server/workspace/src/db/dsql-schema.sql` — schema to extend with a
   nullable `bytes` column
5. `server/workspace/src/apps/install.ts:298-303` (`purgeInstallData`) — the
   FsStore prefix-removal pattern `deleteInstance` reuses for the shared file
   subtree
6. `server/workspace/src/apps/instances.ts` (Stream 1's landed module) — the
   file you are extending; read it in full before adding anything

## Tasks

(Verbatim from `openspec/changes/iw9-f2-shared-partition/tasks.md` §4)

> Depends-on: 1 | Repo: aprovan | Touches: server/workspace/src/records.ts, server/workspace/src/db/dsql-schema.sql, server/workspace/src/apps/instances.ts, server/workspace/tests/instance-storage.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/instance-storage.test.ts && pnpm -C server/workspace typecheck

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

**Clarification on task 4.4 (per `briefs/deviations.md` §3 note):**
`deleteInstance` is **mechanism-only** — it removes both storage planes and
the instance record, and returns. It does **not** call `getAuditStore()` or
append any audit row itself. Stream 5's `apps.instanceDelete` procedure is
what wraps this function and appends the audit row (matching every other
`apps.*` procedure's shape: mechanism in a plain module, audit in the
service-layer handler). Your test file (4.5) must **not** assert that
`deleteInstance` writes an audit row — assert only the two-plane cleanup and
the post-delete 404. If you want an audit-row assertion for delete, that
belongs in Stream 5's `apps-shared-admin.test.ts`, not here.

## Acceptance criteria

Verbatim from `specs/instance-storage/spec.md`:

> **Host reads instance size** — WHEN the host requests usage for an
> instance holding records and files, THEN the response reports the
> instance's byte footprint and the cap, if one is set.

> **Recount corrects drift** — WHEN the stored counter disagrees with actual
> store contents and a recount is invoked, THEN the counter is rewritten to
> the recomputed footprint and the recomputed value is returned.

> **Over-cap write rejected** — WHEN an instance's footprint is at or near
> its cap and a participant writes a value that would exceed it, THEN the
> write fails with 413, the record/file is not stored, and the footprint is
> unchanged.

> **Delete permitted while over cap** — WHEN an instance is over its cap
> (cap lowered after writes) and a participant deletes a record, THEN the
> delete succeeds and the footprint decreases.

> **Delete removes both planes and audits** — WHEN the host deletes an
> instance that holds records (some spilled) and files, THEN the record
> scope lists empty, the file partition is gone, the instance record is
> gone, and an audit row records the deletion. *(This stream's test proves
> everything up to "the instance record is gone" — i.e. that `deleteInstance`
> itself does the two-plane + record cleanup. The audit-row half of this
> scenario is proved end-to-end by Stream 5's `apps.instanceDelete` test, per
> the clarification above.)*

(The "Host reads instance size" and "Recount corrects drift" scenarios above
describe the eventual `apps.instanceUsage` procedure's behavior; at this
stream's level, test the underlying `recountInstanceUsage`/counter functions
directly — Stream 5 wires the procedure.)

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm turbo run build --filter=@aprovan/workspace
pnpm -C server/workspace exec vitest run tests/instance-storage.test.ts
pnpm -C server/workspace typecheck
```

The first line is a correction over tasks.md's literal `Verify:` string (see
`briefs/deviations.md` §2) — it builds `@aprovan/native`/`@aprovan/node`/
`@aprovan/patchwork` and `@aprovan/workspace` itself before `vitest`/
`typecheck` run, which their module resolution depends on. Cached and cheap
when nothing changed. All commands must exit 0.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` (TD5,
  and the metering/`deleteInstance` signatures under "Interfaces & Data")
  are fixed — if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- `deleteInstance` never calls `getAuditStore()` — see the task 4.4
  clarification above. If you find yourself importing `audit.ts` in
  `instances.ts`, stop; that import belongs in Stream 5's `apps/service.ts`
  procedure instead.
- Metering is explicitly best-effort/eventually-consistent (TD5) — do not
  build a transactionally exact ledger; `recountInstanceUsage` is the
  authoritative correction path, not a live-read fallback.
- Do not modify files outside: `server/workspace/src/records.ts`,
  `server/workspace/src/db/dsql-schema.sql`,
  `server/workspace/src/apps/instances.ts`,
  `server/workspace/tests/instance-storage.test.ts`.
- The full `pnpm -C server/workspace test` run currently has 81 pre-existing
  failures across 18 files (see `briefs/deviations.md` §1) — none are yours
  to fix; your Verify command already filters to your own new test file.

## Model

**Sonnet** — the default tier for every iw9-f2 stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. F2 is not in that table's Opus-escalation row, and none of the four
Opus criteria ("genuinely novel logic; failure modes are silent-data or
security-shaped") were invoked for this stream specifically — the
counter/cap/recount design is fully specified by TD5, including its
explicit tolerance for drift. Correctness care is still required (three
backends must behave identically), but implement per the frozen contract on
Sonnet, not Opus.

## Report back

When done: check off tasks 4.1–4.5 in
`openspec/changes/iw9-f2-shared-partition/tasks.md`, and open a PR (or write
`briefs/04-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything Stream 5 (which wraps
`reserveInstanceBytes`/`recountInstanceUsage`/`deleteInstance` in audited
procedures) needs to know.

# Brief: Record-surface addressing and hosting immutability

## Mission

Let record/keyvalue tool procedures target an instance's shared scope by
threading an optional `instance` argument through `resolveRecordScope` and
its callers, and add the immutable `hosting` field to install records,
rejected on mutation at the single `saveInstall` persistence choke point.
This is the seam `iw9-b` (Wave 1) codes its hosted/managed install picker
against without reading this change's internals.

**Depends on Stream 2** — `apps/store.ts`'s `"shared"` classification and
`assertPartitionAccess` delegation must exist first. Do not start until
Stream 2's brief is merged.

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

1. `openspec/changes/iw9-f2-shared-partition/specs/shared-record-partition/spec.md`
   — Requirement "Shared scope-key grammar" (scenario "Shared scope stored
   and listed distinctly") and "Hosting mode is immutable on the install
   record" (full text reproduced under Acceptance criteria below)
2. `openspec/changes/iw9-f2-shared-partition/tech-plan.md` — TD4; "Deviations
   from the orchestrator brief" item 4 (`install.ts` imports `releases.ts`,
   owned by iw9-a — your edits stay confined to `AppInstallation`,
   `mintNewInstall`, `saveInstall`); the `services.ts`/`install.ts` contract
   blocks under "Interfaces & Data" (frozen — implement exactly this shape)
3. `server/workspace/src/services.ts:104` — existing `resolveRecordScope`
   call site/behavior to preserve when `instance` is absent
4. `server/workspace/src/native-dispatch.ts:49` — the scope builder that
   threads the new optional `instance` argument
5. `server/workspace/src/svc-records.ts:51-65` — `assertCallerScope`
   semantics (`svc#` unreachable, `user#` self-only) that must stay
   unchanged by this threading
6. `server/workspace/src/apps/install.ts:33-50` (`AppInstallation` type),
   `:86-91` (`saveInstall`), `:231-256` (`mintNewInstall`), `:20` (the
   `releases.ts` import — do not touch that import or anything it feeds)
7. `server/workspace/src/apps/instances.ts` (Stream 1) and
   `server/workspace/src/apps/store.ts` (Stream 2) — the two frozen
   contracts this stream calls into (`assertInstanceAccess`, `"shared"`
   classification) but does not edit

## Tasks

(Verbatim from `openspec/changes/iw9-f2-shared-partition/tasks.md` §3)

> Depends-on: 2 | Repo: aprovan | Touches: server/workspace/src/services.ts, server/workspace/src/native-dispatch.ts, server/workspace/src/apps/install.ts, server/workspace/tests/shared-scope-addressing.test.ts, server/workspace/tests/install-hosting-mode.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/shared-scope-addressing.test.ts tests/install-hosting-mode.test.ts && pnpm -C server/workspace typecheck

- [ ] 3.1 Implement `resolveRecordScope(ctx, { instance? })` in `services.ts`
      per the tech-plan seam: absent `instance` preserves today's behavior
      (services.ts:104); present `instance` returns
      `app#<id>#shared#<instanceId>` only after `assertInstanceAccess`.
      Thread the optional `instance` argument through the record/keyvalue
      tool procedures (native-dispatch.ts scope builder at :49) —
      `assertCallerScope` (svc-records.ts:51-65) semantics unchanged.
- [ ] 3.2 Add `hosting: HostingMode` to `AppInstallation`
      (apps/install.ts:33-50) and `mintNewInstall` (install.ts:231-256),
      default `"managed"`; readers treat an absent field on pre-F2 records as
      `"managed"` (TD4). No migration script — grep gate in stream 6 enforces
      the foreclosure (invariant 10; `scripts/migrate-app-records.ts` CAVEAT
      is the cited precedent).
- [ ] 3.3 Guard `saveInstall` (install.ts:86-91): when a stored record exists
      and `stored.hosting !== install.hosting`, throw `ServiceError` 409
      stating the mode is immutable (spec "Hosting mode is immutable on the
      install record").
- [ ] 3.4 New test file `server/workspace/tests/shared-scope-addressing.test.ts`:
      instance-addressed record get/set/list succeed for participants with
      `updatedBy` attribution, 404 for non-participants, distinct listing of
      `app#A#shared#I1` vs `app#A#u#S1` under `listScopes` (spec "Shared
      scope-key grammar" scenarios).
- [ ] 3.5 New test file `server/workspace/tests/install-hosting-mode.test.ts`:
      mode fixed at creation, flip rejected with 409 and stored record
      unchanged, absent-field record reads as `managed`.

## Acceptance criteria

Verbatim from `specs/shared-record-partition/spec.md`:

> **Shared scope stored and listed distinctly** — WHEN records are written
> under `app#A#shared#I1` and `app#A#u#S1` in the same tenant, THEN `list` on
> either scope returns only that scope's keys, and `listScopes(tenant,
> "app#A#")` surfaces both scope strings.

> **Mode flip rejected** — WHEN an updated install record is saved whose
> hosting mode differs from the stored record's, THEN the save fails with a
> 4xx error stating the mode is immutable, and the stored record is
> unchanged.

> **Mode fixed at creation** — WHEN an install record is created with
> hosting mode `managed`, THEN every subsequent read of that record reports
> `managed`, and no API accepts a mode value for that install thereafter.

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm turbo run build --filter=@aprovan/workspace
pnpm -C server/workspace exec vitest run tests/shared-scope-addressing.test.ts tests/install-hosting-mode.test.ts
pnpm -C server/workspace typecheck
```

The first line is a correction over tasks.md's literal `Verify:` string (see
`briefs/deviations.md` §2) — it builds `@aprovan/native`/`@aprovan/node`/
`@aprovan/patchwork` and `@aprovan/workspace` itself before `vitest`/
`typecheck` run, which their module resolution depends on. Cached and cheap
when nothing changed. All commands must exit 0.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` (TD4,
  and the `services.ts`/`install.ts` blocks under "Interfaces & Data") are
  fixed — if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- Do not touch `server/workspace/src/apps/releases.ts` (owned by iw9-a) —
  `install.ts` imports it (install.ts:20); your edits stay confined to the
  `AppInstallation` type, `mintNewInstall`, and `saveInstall`.
- Do not write a migration script for the `hosting` field, and do not accept
  a `hosting` value anywhere except at creation — invariant 10 forecloses
  this permanently, not just for this change.
- Do not modify files outside: `server/workspace/src/services.ts`,
  `server/workspace/src/native-dispatch.ts`,
  `server/workspace/src/apps/install.ts`,
  `server/workspace/tests/shared-scope-addressing.test.ts`,
  `server/workspace/tests/install-hosting-mode.test.ts`.
- The full `pnpm -C server/workspace test` run currently has 81 pre-existing
  failures across 18 files (see `briefs/deviations.md` §1) — none are yours
  to fix; your Verify command already filters to your own new test files.

## Model

**Sonnet** — the default tier for every iw9-f2 stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. F2 is not in that table's Opus-escalation row. This stream threads a
new argument across three files with an explicit "don't disturb the
neighboring `releases.ts` import" constraint — real care required, but still
elaboration against a frozen contract, which is the case the overview
reserves Sonnet for.

## Report back

When done: check off tasks 3.1–3.5 in
`openspec/changes/iw9-f2-shared-partition/tasks.md`, and open a PR (or write
`briefs/03-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything Stream 5 (which builds
`apps.data*`/`apps.instance*` on top of this addressing) needs to know.

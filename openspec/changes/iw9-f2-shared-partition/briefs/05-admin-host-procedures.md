# Brief: Admin and host procedures, audited

## Mission

Expose Streams 1–4's primitives through two audited procedure families:
`apps.data*` extended for shared partitions (app-admin-gated, per app
manifest `roles.admins`) and new `apps.instance*` (host-gated, per
hosting-workspace membership). Wire uninstall cleanup so no instance is ever
orphaned. This is the last piece before Stream 6 freezes the contract.

**Depends on Streams 3 and 4** — `resolveRecordScope`'s `instance` argument,
the `hosting` field, and the metering/`deleteInstance` functions must all
exist first. Do not start until both are merged.

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

1. `openspec/changes/IW-9-APP-FIRST.md` — D1, D22 (host pays storage and may
   delete; host = hosting-workspace admin, or creator when hosting in their
   personal space)
2. `openspec/changes/iw9-f2-shared-partition/specs/shared-record-partition/spec.md`
   — Requirement "Audited admin access to shared partitions" (full text
   reproduced under Acceptance criteria below)
3. `openspec/changes/iw9-f2-shared-partition/specs/instance-storage/spec.md`
   — all three requirements, especially the host-gate scenarios (full text
   reproduced under Acceptance criteria below)
4. `openspec/changes/iw9-f2-shared-partition/tech-plan.md` — TD6, **and its
   "Host = hosting-workspace admin" paragraph directly under the
   `apps/instances.ts` interface block** — this is the resolved host-gate
   definition (see "Host gate — resolved" below; do not re-derive it or add
   a `createdBy`/personal-space special case)
5. `server/workspace/src/apps/service.ts:612-668` (existing `apps.data*` tool
   schema declarations), `:1113-1218` (existing admin gate + `dataUsers`/
   `dataKeys`/`dataGet`/`dataRead` handler — note the legacy `apps.data`
   mode-sniffing overload at :1131-1147; **do not extend that sniffing
   pattern**, tech-plan TD6 names it as the anti-pattern this split was
   built to escape), `:1120-1126` (admin gate: `manifest.roles?.admins`),
   `:1210-1217` (audit append pattern via `getAuditStore().append`)
6. `server/workspace/src/apps/instances.ts` and Stream 4's metering additions
   (`reserveInstanceBytes`, `recountInstanceUsage`, `deleteInstance`), plus
   `server/workspace/src/apps/install.ts:298-303` (`purgeInstallData`) — the
   primitives this stream wires together, and the uninstall path that must
   also call `deleteInstance`
7. `server/workspace/src/memberships.ts:14-19` (`getMembership`) — the host
   gate's one dependency
8. `server/workspace/src/platform-output-schemas.ts` — existing output-schema
   conventions to match for the new procedures

### Host gate — resolved (do not re-derive)

Task 5.2 gates `apps.instanceUsage`/`apps.instanceCap`/`apps.instanceDelete`
on "host (hosting-workspace admin, or creator when hosting in their personal
space per IW-9 D1/D22)." This reads like two branches but implements as one
check:

```ts
const membership = await getMembership(instance.hostWorkspaceId, callerSub);
const isHost = membership?.role === "admin";
```

**Why one check covers both disjuncts (resolved by source inspection,
2026-08-09 — see `tech-plan.md`'s TD6 section and `briefs/deviations.md` §3
for the same finding):** the only workspace+membership creation path in this
codebase is the Cognito post-confirmation trigger
(`infra/aws/src/lambdas/post-confirmation/index.ts:59-85`, wired at
`infra/aws/src/stacks/main.ts:122-124`). For an uninvited signup — i.e. a
personal-workspace creation — it mints a solo workspace and writes that same
user's membership row with `role: typeof invite?.["role"] === "string" ?
invite["role"] : "admin"` (lines 80-81): `"admin"` whenever there is no
invite. A personal-space creator is therefore *always* that workspace's
admin already. There is no `isPersonal`/`personalWorkspace` field anywhere in
`identity/types.ts` or `workspaces.ts` (checked) and none is needed — do not
add one, and do not add a separate `instance.createdBy === callerSub`
fallback branch. The single membership-role check is the complete, correct
gate.

## Tasks

(Verbatim from `openspec/changes/iw9-f2-shared-partition/tasks.md` §5)

> Depends-on: 3, 4 | Repo: aprovan | Touches: server/workspace/src/apps/service.ts, server/workspace/src/platform-output-schemas.ts, server/workspace/tests/apps-shared-admin.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/apps-shared-admin.test.ts && pnpm -C server/workspace typecheck

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

## Acceptance criteria

Verbatim from `specs/shared-record-partition/spec.md`:

> **Admin reads a shared record, audited** — WHEN an app admin fetches a
> record by instance id and key through the admin procedure, THEN the value
> is returned and an audit row records caller, app, instance, and key.

> **Non-admin denied** — WHEN a workspace member without the app-admin role
> calls any shared admin operation, THEN the call fails with 403 and no
> audit "success" row is written.

> **No unaudited side door** — WHEN an admin who is not a participant
> addresses the shared partition directly via record or file procedures (not
> `apps.data*`), THEN access is denied (404) like any other non-participant.

Verbatim from `specs/instance-storage/spec.md`:

> **Host reads instance size** — WHEN the host requests usage for an
> instance holding records and files, THEN the response reports the
> instance's byte footprint and the cap, if one is set.

> **Recount corrects drift** — WHEN the stored counter disagrees with actual
> store contents and a recount is invoked, THEN the counter is rewritten to
> the recomputed footprint and the recomputed value is returned.

> **Non-host cannot change the cap** — WHEN a participant who is not the
> host attempts to set or clear the cap, THEN the call fails with 403 and
> the cap is unchanged.

> **Delete removes both planes and audits** — WHEN the host deletes an
> instance that holds records (some spilled) and files, THEN the record
> scope lists empty, the file partition is gone, the instance record is
> gone, and an audit row records the deletion. (Stream 4's `deleteInstance`
> proves the two-plane cleanup; this stream's `apps.instanceDelete` adds the
> audit row that completes this scenario end-to-end.)

> **Non-host cannot delete** — WHEN a non-host participant attempts instance
> deletion, THEN the call fails with 403 and the instance is intact.

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm turbo run build --filter=@aprovan/workspace
pnpm -C server/workspace exec vitest run tests/apps-shared-admin.test.ts
pnpm -C server/workspace typecheck
```

The first line is a correction over tasks.md's literal `Verify:` string (see
`briefs/deviations.md` §2) — it builds `@aprovan/native`/`@aprovan/node`/
`@aprovan/patchwork` and `@aprovan/workspace` itself before `vitest`/
`typecheck` run, which their module resolution depends on. Cached and cheap
when nothing changed. All commands must exit 0.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` (TD6,
  and the `apps/service.ts` procedure table under "Interfaces & Data") are
  fixed — if one seems wrong, stop and report instead of changing it.
- Use the resolved host-gate check above exactly as stated — a single
  `getMembership(instance.hostWorkspaceId, callerSub)?.role === "admin"`
  check. Do not add an `isPersonal`/`personalWorkspace` concept or a
  `createdBy` fallback branch; neither exists in the codebase and neither is
  needed.
- Do not extend the legacy `apps.data` mode-sniffing overload
  (service.ts:1131-1147) — `apps.dataInstances` and the `instance` argument
  are additive, alongside it, per TD6.
- `deleteInstance` (Stream 4) is mechanism-only; `apps.instanceDelete` here
  is what appends the audit row for a deletion.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- Do not modify files outside: `server/workspace/src/apps/service.ts`,
  `server/workspace/src/platform-output-schemas.ts`,
  `server/workspace/tests/apps-shared-admin.test.ts`.
- The full `pnpm -C server/workspace test` run currently has 81 pre-existing
  failures across 18 files (see `briefs/deviations.md` §1) — none are yours
  to fix; your Verify command already filters to your own new test file.

## Model

**Sonnet** — the default tier for every iw9-f2 stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. F2 is not in that table's Opus-escalation row (the table's admin/
authority Opus row is specifically "C's review surface + derived-authority
streams" — a different change). Two distinct gating models (app-admin vs.
host) must not be conflated, and the anti-pattern warning in TD6 must be
respected, but the host-gate ambiguity that would have made this
genuinely novel is resolved above — implement the fixed contract on Sonnet.

## Report back

When done: check off tasks 5.1–5.4 in
`openspec/changes/iw9-f2-shared-partition/tasks.md`, and open a PR (or write
`briefs/05-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything Stream 6 (which pins this
change's frozen contract) needs to know.

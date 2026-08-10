# Brief: Instance records module

## Mission

Create `server/workspace/src/apps/instances.ts` — the one module that will own
shared-instance identity and ACL resolution for the rest of this change.
`HostingMode`, `AppInstanceRecord`, `sharedRecordScope`, `sharedDataDir`, and
the create/get/list/participant/access-check functions live here, persisted
under the caller-unreachable `svc#app-instances` scope. Nothing else in this
change compiles or has anything to guard until this lands: Stream 2's
`assertPartitionAccess` delegates to `assertInstanceAccess`, Stream 3's
`resolveRecordScope` calls it too, and Stream 4 extends this same file with
metering. Get the deny-as-404 and fail-closed semantics exactly right —
everything downstream trusts this contract without re-deriving it.

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

1. `openspec/changes/IW-9-APP-FIRST.md` — invariants 3, 4, 5, 11 (authority
   derived at run time, access follows the principal, hosted vs. managed,
   agents propose/people instantiate)
2. `docs/decisions/0002-app-first-platform-invariants.md` — same invariants in
   binding ADR form
3. `openspec/changes/iw9-f2-shared-partition/prd.md` — "Problem", "Users &
   Jobs"
4. `openspec/changes/iw9-f2-shared-partition/specs/shared-record-partition/spec.md`
   — Requirements "Instance record is the ACL" and "Managed instances require
   hosting-workspace membership" (full text reproduced under Acceptance
   criteria below)
5. `openspec/changes/iw9-f2-shared-partition/tech-plan.md` — TD1, TD3, and the
   full `apps/instances.ts` interface block under "Interfaces & Data"
   (frozen — implement exactly this shape)
6. `server/workspace/src/apps/identity.ts:1-35` — `import { isValid, ulid }
   from "ulid"` is how ULIDs are minted elsewhere in `apps/*`; there is no
   custom exported helper to import from this file (do not edit it, do not
   search for a nonexistent `mintUlid`-style export — import `ulid` from the
   `ulid` package directly, same as this file does)
7. `server/workspace/src/svc-records.ts:51-65` — `assertCallerScope`: `svc#`
   is caller-unreachable, which is what makes `svc#app-instances` a safe
   place for this module's records
8. `server/workspace/src/memberships.ts:14-19` — `getMembership(workspaceId,
   userId)` signature, used for the invariant-5 membership re-check
9. `server/workspace/src/apps/store.ts` — read for context only; Stream 2
   owns this file, do not edit it here

## Tasks

(Verbatim from `openspec/changes/iw9-f2-shared-partition/tasks.md` §1)

> Depends-on: - | Repo: aprovan | Touches: server/workspace/src/apps/instances.ts, server/workspace/tests/app-instances.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/app-instances.test.ts && pnpm -C server/workspace typecheck

- [ ] 1.1 Create `server/workspace/src/apps/instances.ts` with `HostingMode`,
      `AppInstanceRecord`, `sharedRecordScope`, and `sharedDataDir` exactly as
      stated in tech-plan "Interfaces & Data" (TD1, TD3); instance records
      persist via `svcScope("app-instances")` using the `svc-records.ts`
      helpers (key = instanceId ULID; mint via the existing ULID helper used
      by `apps/identity.ts` — import the util, do not edit identity.ts).
- [ ] 1.2 Implement `createInstance`, `getInstance`, `listInstances`,
      `addParticipant`, `removeParticipant`: participant adds to a
      `managed`-mode install reject non-members of the hosting workspace via
      `memberships.ts` `getMembership` with a 4xx naming the requirement
      (spec `shared-record-partition` / "Managed instances require
      hosting-workspace membership").
- [ ] 1.3 Implement `assertInstanceAccess` per TD2/TD3: deny-as-404
      (`ServiceError(..., 404)`) for non-participants, missing instance
      records (orphan scope, fail closed), and — for managed installs —
      listed participants whose hosting-workspace membership is gone
      (invariants 3+5); membership resolved per request, no caching.
- [ ] 1.4 New test file `server/workspace/tests/app-instances.test.ts`
      covering every scenario of spec `shared-record-partition` requirements
      "Instance record is the ACL" and "Managed instances require
      hosting-workspace membership" (participant read/write attribution
      asserted at the module level, non-participant 404, removal effective
      next request, orphan-scope 404, non-member add rejected, departed
      member denied).

## Acceptance criteria

Verbatim from `specs/shared-record-partition/spec.md`:

> **Participant reads and writes** — WHEN a user on the instance's
> participant list calls record get/set/list or file read/write inside the
> instance's shared partition, THEN the call succeeds and the row's
> `updatedBy` names that user.

> **Non-participant denied as 404** — WHEN a workspace member who is not on
> the participant list addresses any key or file path inside the shared
> partition, THEN the call fails with 404 and the response does not reveal
> whether the instance or key exists.

> **Removal takes effect at next request** — WHEN a user is removed from the
> participant list and then issues a read against the shared partition, THEN
> the read is denied (404) with no restart, cache expiry, or re-login
> required.

> **Orphan scope without instance record** — WHEN a shared scope is
> addressed whose `instanceId` has no instance record, THEN access is denied
> (404) for every caller — fail closed.

> **Non-member cannot be added to a managed instance** — WHEN a caller adds a
> user sub that is not a hosting-workspace member to a managed instance's
> participant list, THEN the mutation fails with a 4xx error naming the
> membership requirement, and the list is unchanged.

> **Departed member loses managed access** — WHEN a listed participant's
> hosting-workspace membership is removed and they then address the managed
> instance's partition, THEN access is denied (404).

(These scenarios talk about "record get/set/list or file read/write inside
the shared partition" generically — at this stream's level, test them at the
`instances.ts` module boundary: `assertInstanceAccess` resolving/throwing,
`addParticipant`/`removeParticipant` mutating and rejecting correctly. The
record-store and file-plane wiring that makes these scenarios true
end-to-end is Stream 2/3's job.)

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm turbo run build --filter=@aprovan/workspace
pnpm -C server/workspace exec vitest run tests/app-instances.test.ts
pnpm -C server/workspace typecheck
```

The first line is a correction over tasks.md's literal `Verify:` string (see
`briefs/deviations.md` §2): `@aprovan/workspace` depends on `@aprovan/native`,
`@aprovan/node`, and `@aprovan/patchwork` as `workspace:*` packages whose
`dist/` output is what module resolution loads, and turbo's own `test`/
`typecheck` tasks declare `dependsOn: ["^build"]` for exactly this reason. The
build is cached and cheap when nothing changed. All commands must exit 0.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md`
  (TD1-TD3, and the `apps/instances.ts` block under "Interfaces & Data") are
  fixed — if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- Do not edit `server/workspace/src/apps/identity.ts` (owned by iw9-f4) or
  `server/workspace/src/apps/releases.ts` (owned by iw9-a).
- Do not modify files outside: `server/workspace/src/apps/instances.ts`,
  `server/workspace/tests/app-instances.test.ts`.
- The full `pnpm -C server/workspace test` run currently has 81 pre-existing
  failures across 18 files (see `briefs/deviations.md` §1) — none are yours
  to fix; your Verify command already filters to your own new test file.
- No new dependencies beyond `ulid` (already a dependency of
  `@aprovan/workspace` — see `server/workspace/package.json`).

## Model

**Sonnet** — the default tier for every iw9-f2 stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. F2 does not appear in that table's Opus-escalation row (which names
only specific D/C/B/Doc streams); this is elaboration against a
tech-plan-frozen contract, exactly the case the overview reserves Sonnet for.
Do not escalate to Opus.

## Report back

When done: check off tasks 1.1–1.4 in
`openspec/changes/iw9-f2-shared-partition/tasks.md`, and open a PR (or write
`briefs/01-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything Streams 2 and 4 (which
depend on this module) need to know.

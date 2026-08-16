# Stream 3 report — Record-surface addressing and hosting immutability

## Built

`server/workspace/src/services.ts` (task 3.1):

- `resolveRecordScope(ctx, opts?: { instance? })` — exported, exactly the
  tech-plan frozen signature (`Promise<string>`). Absent `instance` returns
  `kvScope(ctx)` unchanged (`ws` / `app#<id>#u#<sub>` +
  `assertCallerScope`). Present `instance`: ident-validated (400 on empty,
  `#`-bearing, or non-ident ids — so `app#A#team#X` / `app#A#shared#` can
  never be formed at this surface, the 4xx behavior stream 2 handed over),
  400 without an app session, then
  `assertInstanceAccess(ctx.workspaceId, appScope.id, instance, ctx.userId)`
  (deny-as-404, per-request invariant 3+4+5 re-check via Stream 1) before
  returning `sharedRecordScope(appScope.id, instance)`. `assertCallerScope`
  still runs on the resolved scope — `svc#` unreachable, `user#` self-only,
  semantics untouched.
- The four keyvalue procedures (`get`/`set`/`delete`/`list`) accept an
  optional `instance` string arg (schemas updated; non-string → 400) and
  resolve their scope through `resolveRecordScope`. Instance-addressed calls
  skip the legacy FS fallback/migration/merge entirely — shared scopes
  post-date the FS-backed keyvalue, and `legacyKvPath` is a per-user shape.
  Writes attribute `updatedBy = ctx.userId` as before.

`server/workspace/src/native-dispatch.ts` (task 3.1 threading): the live
keyvalue wire path short-circuits to `keyvalueProductService` with args
passed verbatim, so `instance` threads through with no code change; the
`kvScopeFor` scope builder and the keyvalue dispatch branch are documented
as such (the native-context `keyvalueBackend` is an instance-less fallback
that keyvalue dispatch never reaches). End-to-end wire threading is proven
in the tests via `dispatchAprovanNativeOp(ctx, "keyvalue", ...)`.

`server/workspace/src/apps/install.ts` (tasks 3.2–3.3): `hosting:
HostingMode` on `AppInstallation` and `mintNewInstall` (default `"managed"`)
had **already landed via iw9-b** (install-as-copy, PR #247 lineage) — this
stream aligned the field's doc comment with TD4 (absent ⇒ `"managed"`, no
migration ever) and brought the `saveInstall` guard to the frozen contract:
hosting flip now throws **ServiceError 409** (was 400), read-before-write
compare with `?? "managed"` on both sides so pre-F2 absent-field records are
guarded identically. `releases.ts`/release-tags imports untouched.

Tests (tasks 3.4–3.5):

- `tests/shared-scope-addressing.test.ts` (11): seam behavior
  (absent-instance identity, shared-scope resolution, non-participant 404,
  orphan 404, malformed-id 400s, no-app-session 400), keyvalue procedures
  (participant get/set/list with `updatedBy` attribution, non-participant
  404 on every verb with stored rows unchanged, delete, non-string instance
  400, native-dispatch wire threading), and the spec scenario "Shared scope
  stored and listed distinctly" (`app#A#shared#I1` vs `app#A#u#S1` list
  apart; `listScopes(tenant, "app#A#")` surfaces both).
- `tests/install-hosting-mode.test.ts` (5): mode fixed at creation (managed
  default + explicit hosted), flip rejected 409 with stored record unchanged
  (both directions), absent-field pre-F2 record reads as managed (flip to
  hosted → 409; explicit managed save accepted).

## Verified

```bash
pnpm turbo run build --filter=@aprovan/workspace   # exit 0 (5 total, 4 cached)
pnpm -C server/workspace exec vitest run tests/shared-scope-addressing.test.ts tests/install-hosting-mode.test.ts
# Test Files  2 passed (2) — Tests  16 passed (16)
pnpm -C server/workspace typecheck                 # exit 0 (tsc + effect-completeness: ok, 137 tools)
```

Regression checks: `apps-install-copy.test.ts` (12), `app-instances.test.ts`
(11), `shared-partition-guard.test.ts` (8), `partition-access.test.ts` (14)
all pass. Full unfiltered suite: **22 failed files / 72 failed tests** —
byte-identical to stream 2's measured baseline at this HEAD. Zero
regressions.

## Deviations

1. **Tasks 3.2/3.3 were largely pre-landed by iw9-b.** `hosting`,
   `mintNewInstall`'s default, and a `saveInstall` guard already existed on
   main (with an extra `hostingWorkspaceId` immutability guard, status 400,
   owned by iw9-b). This stream's residual work was the 409 status per the
   frozen contract, the TD4 doc alignment, and the contract tests.
2. **Guard order: `hostingWorkspaceId` (400) is checked before `hosting`
   (409).** iw9-b's `apps-install-copy.test.ts` ("saveInstall /
   configure-style flip → 400") flips both fields at once and asserts 400;
   that file is outside this stream's Touches. Checking the
   `hostingWorkspaceId` immutability first keeps that test green while a
   hosting-mode flip alone throws the contract's 409. Both rejections
   satisfy the spec's "4xx stating the mode is immutable"; if iw9-b later
   wants 409 for its combined case, only its own test assertion moves.
3. **`native-dispatch.ts` changes are documentation-only.** The plan's
   ":49 scope builder" predates the iw9-b product-service short-circuit;
   `instance` already flows through `dispatchAprovanNativeOp` → 
   `keyvalueProductService.call(ctx, op, args)` verbatim. The unreachable
   native `keyvalueBackend` stays instance-less (its backend methods receive
   only key/value, and `@aprovan/native` is outside Touches); tests pin the
   wire path instead.
4. **`resolveRecordScope` imports `instances.ts` statically** — no cycle:
   `services.ts` already reaches `apps/store.ts` (which statically imports
   `instances.ts`), and `instances.ts` reaches `install.ts` only via dynamic
   import (see stream 2's report).

## Notes for Stream 5 (admin/host procedures) and iw9-b

- Address a shared partition from any record surface with
  `await resolveRecordScope(ctx, { instance })` (services.ts export) — it
  performs the full ACL assert; do not build `app#<id>#shared#<instanceId>`
  strings by hand on caller-facing paths. For admin (`apps.data*`) surfaces
  that bypass participant ACL by design, keep using
  `sharedRecordScope(appId, instanceId)` from `apps/instances.js` after your
  own admin gate + audit, mirroring the existing per-user enumeration
  (`listScopes(tenant, "app#<id>#")` now returns both `#u#` and `#shared#`
  scope strings — filter on the discriminator segment).
- The keyvalue procedures' `instance` arg is validated by the shared `ident`
  rule (`/^[\w][\w.\-:]{0,127}$/u`); ULIDs pass, `#` never does.
- `saveInstall` semantics for your host gate: hosting flip → 409,
  `hostingWorkspaceId` flip → 400 (checked first). Absent `hosting` on a
  stored record is `"managed"` — normalizing it by writing an explicit
  `"managed"` is accepted (not a flip).
- Instance-addressed keyvalue writes do **not** meter `storageBytes` yet —
  that is Stream 4's `bytes` stamp + `reserveInstanceBytes` on the record
  backends, not this seam.

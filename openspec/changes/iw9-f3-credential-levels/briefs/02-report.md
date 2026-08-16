# Report: 02 — Registry invoker-aware resolution + published contract

## PR

https://github.com/AprovanLabs/registry/pull/168 — branch `iw9-f3-stream2`,
squash-merged to registry main on top of stream 1 (#161).

## Verify

| Check | Result |
| --- | --- |
| `level-resolution.test.ts` | 12/12 pass |
| `grep CredentialNotConnectedError index.ts` | hit (`:147`) |
| `grep resolveForInvoker credentials/service.ts` | hit (`:301`) |
| `! grep deps.credentials.firstForProvider profiles/resolve.ts` | clean |
| `pnpm --filter @aprovan/registry-server build` + `tsc --noEmit` | pass |
| scoped eslint | 43 errors — identical to clean main (baseline moved from 35 since 2026-08-09) |
| full `registry-server` suite | 4 pre-existing failures (see deviations §authoritative baseline) — **identical with the branch stashed** and at `8d4b79d`, `a702273`, `c04d62b`; branch adds 0 failures |

## What was built (tasks 2.1–2.4)

- **2.1 Contract, published from the package root** (`credentials/service.ts`,
  exported via `index.ts`): `CredentialInvoker { sub, actor? }`,
  `CredentialResolutionRequest { tenantId, provider, invoker, credentialId?,
  profileName? }`, `ResolvedCredential { id, level, owner?, payload }`
  (`owner` present iff `level === "user-oauth"`), and
  `CredentialNotConnectedError` with readonly `code:
  "credential_not_connected"`, `status: 403`, `requiredLevel: "user-oauth"`,
  `provider`. `index.ts` also now exports the level vocabulary
  (`effectiveLevel`, `defaultLevelForType`, `isCredentialLevel`,
  `credentialLevelValues`, `type CredentialLevel`).
- **2.2 `CredentialService.resolveForInvoker(tenantId, provider, invoker)`** —
  additive beside an untouched `firstForProvider`. Order: invoker's own
  `user-oauth` row → first workspace-level row in creation order. Foreign
  `user-oauth` rows invisible; rows exist but all foreign → throws
  `CredentialNotConnectedError`; no rows at all → `undefined`. All three
  `resolveProfile` call sites route through it; the pinned path throws
  outside the existing try/catch so the error is not swallowed into the 400
  wrap.
- **2.3** `resolveById` returns `ResolvedCredential & { provider }`
  (superset — dropping `provider` would break the minor bump);
  `ResolvedProfile.credential` widened to `ResolvedCredential` so dispatch /
  audit read `level`/`owner` with no second fetch.
- **2.4** `src/profiles/__tests__/level-resolution.test.ts`: 12 tests
  covering all six brief scenarios directly and via both `resolveProfile`
  entry points (incl. raw NULL-level legacy row, pinned-foreign refusal,
  no-downgrade-when-workspace-row-exists, ungoverned fallbacks).

## Deviations

1. Contract types live in `credentials/service.ts`, not `credentials/types.ts`
   (allowlist excluded `types.ts`); consumers import from the package root
   either way.
2. `resolveById` returns a superset (`& { provider }`) — widening only.
3. Full-suite Verify red solely on 4 pre-existing main failures
   (`tests/dispatch.test.ts` ×2, `tests/server.test.ts` ×2 — "No default
   profile … 403" under governed auth). The registry repo has no CI test
   workflow, so main's unit suite is ungated and has been red since before
   this change (2 of the 4 fail as far back as #137). Accepted by the
   orchestrator with this baseline recorded; a separate fix is out of this
   change's scope.
4. Scoped eslint baseline is 43/0, not the documented 35/0 — moved by other
   merged IW-9 streams; branch adds 0.

## For streams 3 (publish) and 6/7 (aprovan consumers)

- Stream 3: everything is additive/widening → **semver-minor**
  (0.2.11 → 0.2.12). New public exports listed in 2.1 above.
- Stream 6: type `resolveCredentialRecord` against the exported shapes
  verbatim. Semantics to mirror: pin on foreign `user-oauth` →
  `CredentialNotConnectedError` (never a downgrade even when a workspace row
  exists); unpinned foreign-only → same error; unpinned nothing-connected →
  `undefined`. Match the error on `code`, not message.
- Flag for later: `resolveProfile` step 5's interface compat selection still
  picks "first compat provider with any tenant credential" before
  invoker-aware selection, so a compat entry whose only credential is a
  foreign `user-oauth` row now fails closed rather than trying the next
  compat provider — fail-closed per spec.

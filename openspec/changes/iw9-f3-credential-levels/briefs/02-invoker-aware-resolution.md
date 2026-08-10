# Brief: Registry — invoker-aware resolution + published contract

- **Change**: `iw9-f3-credential-levels` (stream 2 of 7)
- **Repo**: `registry` — work happens entirely in
  `/Users/jacob/Documents/Code/AprovanLabs/registry`
- **Depends-on**: stream 1 (`CredentialLevel`, `effectiveLevel`, the
  `level` column, and `CredentialService.create`'s validation must exist
  and be merged first)
- **Model**: Sonnet (per `IW-9-EXECUTION-OVERVIEW.md`) — carries extra
  scrutiny at review/test time even though it stays Sonnet: this is the
  fail-closed identity-isolation logic invariant 1 exists to guarantee
  (no cross-user credential leakage). The interfaces are frozen, not
  novel, so it does not meet this plan's own bar for Opus escalation —
  but review it as if a mistake here is a security bug, because it is one.

## Mission

When you are done, `@aprovan/registry-server` publishes a typed
resolution contract (`CredentialInvoker`, `CredentialResolutionRequest`,
`ResolvedCredential`, `CredentialNotConnectedError`) from its package
root, and `resolveProfile`'s credential-selection paths use it: a
`user-oauth` credential resolves only for its owner, an unconnected
invoker fails closed with a machine-distinguishable error instead of
silently receiving someone else's credential or a silent workspace
downgrade, and the invoker's own connection outranks a workspace-level
credential when both exist. This is what stream 6 (aprovan dispatch) and
the sibling change `iw9-c-capability-approval` both consume once
published in stream 3 — nothing downstream can be typed correctly until
this contract exists.

## Read first

All paths below are relative to
`/Users/jacob/Documents/Code/AprovanLabs/registry` unless noted.

Orchestrator context (read in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`, do not edit anything there):

1. `openspec/changes/IW-9-APP-FIRST.md` — invariant 1, D12/D15 (this
   contract is the routing key `iw9-c-capability-approval` needs)
2. `openspec/changes/iw9-f3-credential-levels/tech-plan.md` — D4, D5,
   **D4a** (why a new `resolveForInvoker` method exists rather than
   widening `firstForProvider`), "Interfaces & Data" section in full
3. `openspec/changes/iw9-f3-credential-levels/specs/credential-level-resolution/spec.md`
   — every requirement below is copied into Acceptance criteria, but read
   it in place too
4. `openspec/changes/iw9-f3-credential-levels/briefs/01-report.md` — read
   if it exists; it names the exact vocabulary/error shape stream 1
   produced

This repo — read in this order, each file grounds the next:

5. `packages/registry-server/src/credentials/types.ts` — `CredentialLevel`,
   `effectiveLevel` (post-stream-1)
6. `packages/registry-server/src/config/types.ts` — `CallContext`
   (`principal`, `actor`) — the invoker shape already exists here; you are
   not inventing a new identity concept, just naming it as
   `CredentialInvoker` for the published contract
7. `packages/registry-server/src/profiles/resolve.ts` — read the whole
   file, but especially: the existing `list()`-then-filter idiom at
   ~lines 323-325 (you reuse this exact pattern, do not invent a new
   storage query shape), and the three `firstForProvider` call sites at
   ~lines 263, 350, 378 (step 4c's no-pin default, step 5's ungoverned
   fallback twice) — all three change in this stream
8. `packages/registry-server/src/credentials/service.ts` — `create`
   (post-stream-1), `resolveById`, `firstForProvider` — you add
   `resolveForInvoker` beside these, you do not modify `firstForProvider`'s
   signature or behavior (additive-only, tech-plan D4a)
9. `packages/registry-server/src/index.ts` — current public export block
   (~lines 104-157) — this is what you extend; check what stream 1 already
   added before assuming a clean slate
10. `packages/registry-server/src/profiles/__tests__/` — existing test
    files for house style

## Tasks

Copied verbatim from `openspec/changes/iw9-f3-credential-levels/tasks.md`
(aprovan repo), section "2. Registry — invoker-aware resolution +
published contract":

- [ ] 2.1 Define and export the resolution contract from the package
      root: `CredentialInvoker`, `CredentialResolutionRequest`,
      `ResolvedCredential` (id, level, owner?, payload),
      `CredentialNotConnectedError` (`code: "credential_not_connected"`,
      `status: 403`, `provider`, `requiredLevel`) — tech-plan
      "Interfaces & Data", D5. Spec: credential-level-resolution
      "Resolution-order contract is published".
- [ ] 2.2 Add `CredentialService.resolveForInvoker(tenantId, provider, invoker)`
      (tech-plan D4a; additive, sits beside `firstForProvider` — does not
      change its signature or behavior) implementing D4's order: the
      invoker's own `user-oauth` row for the provider first, else the
      first workspace-level row in creation order, via the same
      `list()`-then-filter idiom already used at
      `profiles/resolve.ts:323-325`. `resolveProfile` step 4c's no-pin
      default (:263) and step 5's ungoverned fallback (:350, :378) all
      switch from `deps.credentials.firstForProvider(...)` to
      `deps.credentials.resolveForInvoker(..., ctx)`-equivalent (build a
      `CredentialInvoker` from `ctx.principal`/`ctx.actor`). Step 4c's
      pinned-credential path: a `user-oauth` row whose owner ≠
      `ctx.principal` throws `CredentialNotConnectedError` (never another
      user's payload, never a downgrade); other users' `user-oauth` rows
      are invisible to the unpinned paths (tech-plan D4/D4a).
- [ ] 2.3 `CredentialService.resolveById` and the new `resolveForInvoker`
      return `ResolvedCredential` (level via `effectiveLevel`, owner for
      user-level) so dispatch/audit callers read level without a second
      fetch. `firstForProvider` itself is unchanged (additive-only bump —
      tech-plan D4a) but has zero remaining callers inside
      `profiles/resolve.ts` once 2.2 lands (gate: task 6.5-equivalent for
      registry, `! grep -n "deps\.credentials\.firstForProvider" profiles/resolve.ts`).
- [ ] 2.4 New test file
      `profiles/__tests__/level-resolution.test.ts`: owner resolves own
      connection; other user fails closed with
      `credential_not_connected`; own user-oauth outranks workspace row;
      workspace row serves unconnected invoker; pinned foreign
      user-oauth fails closed; legacy (level-null) rows resolve as
      workspace-shared. Cover both entry points: `resolveProfile` (stored
      profile no-pin default, ungoverned-mode fallback) AND
      `CredentialService.resolveForInvoker` directly (unit-level, not just
      through `resolveProfile`).

## Acceptance criteria

Copied in full from
`openspec/changes/iw9-f3-credential-levels/specs/credential-level-resolution/spec.md`
(aprovan repo) — these are the tests of done:

### Requirement: Resolution receives the invoker

Every credential-resolution entry point on the dispatch paths (workspace
`resolveCredentialRecord`, registry `resolveProfile` step 4c/5 and
`CredentialService` resolution) SHALL receive the invoker's identity (user
sub, plus any non-user actor) alongside workspace/tenant and provider.
Resolution without an invoker SHALL be impossible for paths that can reach
a `user-oauth` credential.

#### Scenario: Dispatch paths pass the invoker
- **WHEN** a tool call, workflow invocation, or LLM route resolves a
  credential
- **THEN** the resolution call carries the invoking user's sub from the
  authenticated principal, not a placeholder

### Requirement: User-level credentials resolve per-invoker

A `user-oauth` credential SHALL resolve only for invocations by its owner.
Resolution SHALL never return one user's `user-oauth` credential for a
different invoker, regardless of how the credential was selected (provider
default, profile pin, or interface pin).

#### Scenario: Owner resolves their own connection
- **WHEN** a user who owns a `user-oauth` credential for a provider invokes
  a tool on that provider
- **THEN** resolution returns that user's credential

#### Scenario: Another user never receives it
- **WHEN** a different user invokes the same provider and holds no
  connection of their own, and no workspace-level credential exists for the
  provider
- **THEN** resolution fails closed; it does not return the first user's
  credential

### Requirement: Fail closed when the invoker is not connected

When resolution requires a user-level credential (the selection — pin or
default — lands on level `user-oauth`) and the invoker has no connection,
resolution SHALL fail with a distinguishable "not connected" error that
names the provider and the required level. There SHALL be no silent
fallback to another user's credential and no silent downgrade to a
workspace-level credential when a user-level one was explicitly selected.

#### Scenario: Pinned user-level slot, unconnected invoker
- **WHEN** a profile pins a provider at user level and an invoker without
  their own connection dispatches through it
- **THEN** the call fails with a not-connected error identifying the
  provider, and no credential is injected

#### Scenario: The error is machine-distinguishable
- **WHEN** the not-connected failure occurs
- **THEN** callers can distinguish it from "no credential exists at all"
  (so a future connect flow and iw9-c approval routing can react to it)

### Requirement: Deterministic resolution order

Default resolution (no explicit credential pin) SHALL follow a stated
order: (1) the invoker's own `user-oauth` credential for the provider, if
one exists; (2) workspace-level credentials for the provider in their
existing deterministic order. An explicit pin (credential id on a profile
or interface) SHALL resolve exactly that credential loudly — a missing or
mismatched pin is an error, never a fallback (preserving today's contract).

#### Scenario: Invoker's own connection wins over workspace credential
- **WHEN** a provider has both a workspace-level credential and the
  invoker's own `user-oauth` credential, and no pin selects one
- **THEN** resolution returns the invoker's own credential

#### Scenario: Workspace credential serves unconnected invokers
- **WHEN** a provider has a workspace-level credential, and an invoker with
  no connection of their own dispatches without a pin
- **THEN** resolution returns the workspace-level credential

### Requirement: Resolution-order contract is published

The resolution-order contract — inputs (tenant, provider, invoker,
optional pin/profile), the ordering above, the fail-closed rule, and the
resolved output (credential id, level, owner) — SHALL be published as a
typed interface from `@aprovan/registry-server` so sibling change
iw9-c-capability-approval can route approvals by level (workspace-level →
admin approves once; user-level → per-user; IW-9 D12/D15) without reading
resolution internals.

#### Scenario: Resolved output names the level
- **WHEN** any dispatch path resolves a credential
- **THEN** the resolution result exposes the credential's id, level, and
  (for user-level) owner to the caller, typed by the published interface

#### Scenario: Contract is importable by consumers
- **WHEN** a consumer imports the published package
- **THEN** the resolution request/result types and level vocabulary are
  available from the package's public exports

## Verify

Run every command from `/Users/jacob/Documents/Code/AprovanLabs/registry`.
All must pass before reporting done.

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/registry-server test
grep -n "CredentialNotConnectedError" packages/registry-server/src/index.ts
grep -n "resolveForInvoker" packages/registry-server/src/credentials/service.ts
! grep -n "deps\.credentials\.firstForProvider" packages/registry-server/src/profiles/resolve.ts
```

Additional checks (guards against the exact gap this stream exists to
close — do not skip):

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/registry-server build
pnpm --filter @aprovan/registry-server exec tsc --noEmit -p .
```

Lint: same pre-existing baseline as stream 1 — do not run root `pnpm lint`
as a gate; confirm the scoped count has not regressed:

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
npx eslint "packages/registry-server/src/**/*.ts"
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md`
  (D4, D5, D4a) are fixed — if one seems wrong, stop and report instead
  of changing it. In particular: do **not** widen `firstForProvider`'s
  signature; add `resolveForInvoker` as a new, additive method.
- Surgical changes only; match existing style — reuse the
  `list()`-then-filter idiom already at `profiles/resolve.ts:323-325`
  rather than inventing a new storage query.
- Do not modify files outside:
  `packages/registry-server/src/profiles/resolve.ts`,
  `packages/registry-server/src/credentials/service.ts`,
  `packages/registry-server/src/index.ts`,
  `packages/registry-server/src/profiles/__tests__/level-resolution.test.ts`.
- New tests go in the new file named above; do not extend existing test
  files.
- Never import across repos.
- Do not touch `openspec/changes/iw9-f3-credential-levels/**` in the
  aprovan repo (read-only context for this brief).

## Report back

When done: check off tasks 2.1-2.4 in
`openspec/changes/iw9-f3-credential-levels/tasks.md` (aprovan repo), and
write `openspec/changes/iw9-f3-credential-levels/briefs/02-report.md`
(aprovan repo) containing: what you built, how you verified it, any
deviations from this brief and why, and anything stream 3 (publish) or
stream 6 (aprovan dispatch, the consumer of this contract) needs to know —
especially the exact final shape of `ResolvedCredential`,
`CredentialInvoker`, and `CredentialNotConnectedError` as exported from
`index.ts`, since stream 6 types its own `resolveCredentialRecord` against
these verbatim.

# Brief: aprovan — invoker-aware resolution at every dispatch path

- **Change**: `iw9-f3-credential-levels` (stream 6 of 7)
- **Repo**: `aprovan` — work happens entirely in
  `/Users/jacob/Documents/Code/AprovanLabs/aprovan`
- **Depends-on**: stream 5 (every `ICredentialStore` backend must already
  carry `level` correctly before dispatch can trust it)
- **Model**: Sonnet (per `IW-9-EXECUTION-OVERVIEW.md`) — carries extra
  scrutiny at review/test time even though it stays Sonnet: this is where
  the fail-closed identity-isolation logic invariant 1 exists to
  guarantee gets enforced at every real call site, not just implemented
  in one function. A mistake here is a cross-user credential leak.

## Note on path overlap with `iw9-f1-vcs-scoping-params`

`routes/tools.ts` is also touched by `iw9-f1-vcs-scoping-params`. Per this
change's tech-plan "Sibling coordination" section: F1's edits are the VCS
tool-schema region (approximately lines 278-380); this stream's edits are
the dispatch/audit region (approximately lines 850-1340, where
`principal.sub`/`callerId` wiring and the `resolveCredentialRecord` call
live). These are disjoint line ranges — rebase against F1's changes at
merge time if they land first, do not attempt to serialize with that
change or wait for it.

## Mission

When you are done, `resolveCredentialRecord` requires an invoker at the
type level and implements the fail-closed resolution order (pin loud →
invoker's own `user-oauth` → workspace-level rows), a new
`resolveWorkspaceCredential` serves the one genuinely invoker-less system
path with a structural guarantee it can never leak a `user-oauth` row,
and all three real dispatch call sites (`tools.ts`, `invoke.ts`, `llm.ts`)
pass the actual invoking identity instead of nothing. A widened grep-gate
— scanning by exclusion rather than allowlisting known directories —
proves no invoker-less call site remains anywhere in `server/workspace/src`,
including one (`credential-store-adapter.ts`) that is dead code today but
would have silently reopened this exact hole the moment anything wired it
up.

## Read first

All paths below are relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan` unless noted.

Orchestrator context:

1. `openspec/changes/IW-9-APP-FIRST.md` — invariant 1
2. `openspec/changes/iw9-f3-credential-levels/tech-plan.md` — D4, D5,
   **D6** (the exact `resolveWorkspaceCredential` signature and
   structural guarantee — copied verbatim into task 6.2 below), **D6a**
   (the exact widened grep-gate command and why the old directory
   allowlist missed a real gap)
3. `openspec/changes/iw9-f3-credential-levels/specs/credential-level-resolution/spec.md`
   — every requirement below is copied into Acceptance criteria (this is
   where those requirements become *enforced at every call site*, not
   just implemented in `resolveProfile`)
4. `openspec/changes/iw9-f3-credential-levels/briefs/deviations.md` — read
   the "Line drift observed" table before editing `routes/tools.ts`; two
   citations in this stream's tasks have drifted ~10 lines (documented
   exactly, with the verified current line numbers)
5. `openspec/changes/iw9-f3-credential-levels/briefs/02-report.md` — read
   if it exists; you are typing `resolveCredentialRecord`'s new signature
   directly against what stream 2 published (`CredentialInvoker`,
   `ResolvedCredential`, `CredentialNotConnectedError`)

This repo — read in this order, each file grounds the next:

6. `server/workspace/src/credentials.ts` — `resolveCredentialRecord`
   (~lines 732-764, verified exact) — this is what gains the required
   `invoker` parameter
7. `server/workspace/src/credential-store-adapter.ts` — `firstForProvider`
   (lines 42-51, verified exact) — currently calls
   `store.resolveRecordForProvider` directly; this is one of the two
   invoker-less call sites you migrate to `resolveWorkspaceCredential`.
   Verified during planning: this function has **zero call sites**
   anywhere in `server/workspace/src` today (dead code) — you are closing
   the gap before anything wires it up, not fixing a live bug
8. `server/workspace/src/vcs/mounts.ts` — `githubToken` (~lines 205-213,
   call at line 207, verified exact) — the other invoker-less call site;
   confirmed genuinely invoker-less today (no user in scope for a mount
   operation)
9. `server/workspace/src/routes/tools.ts` — `principal.sub` (~line 858)
   and the `resolveCredentialRecord` call (cited as line 1248 in
   tasks.md; **verified actual location is line 1258** — see
   `briefs/deviations.md`; locate by the call itself, not the line
   number, before editing). Read the dispatch/audit region broadly
   (~850-1340) to see where `callerId`/actor context is already threaded
10. `server/workspace/src/workflows/invoke.ts` — `resolveProviderCredentials`
    (~lines 356-390), the `resolveCredentialRecord` call at line 366
    (verified exact) — `ServiceContext` is your invoker source here
11. `server/workspace/src/routes/llm.ts` — `resolveCredentials`
    (~lines 108-137), the call at line 116 (verified exact)

## Tasks

Copied verbatim from `openspec/changes/iw9-f3-credential-levels/tasks.md`,
section "6. aprovan — invoker-aware resolution at every dispatch path":

- [ ] 6.1 `resolveCredentialRecord` gains a **required**
      `invoker: CredentialInvoker` parameter, returns
      `ResolvedCredential`, and implements the D4 order (pin loud →
      invoker's own user-oauth → workspace-level rows; fail closed with
      the re-exported `CredentialNotConnectedError`).
- [ ] 6.2 Add `resolveWorkspaceCredential(workspaceId: string, provider: string): Promise<ResolvedCredential | undefined>`
      for invoker-less system paths (tech-plan D6) — same
      `ResolvedCredential` return shape as `resolveCredentialRecord`, but
      row *selection* is structurally restricted to
      `effectiveLevel(...) ∈ {"workspace-token", "workspace-oauth"}`; a
      `user-oauth` row is filtered out before ranking, never merely
      "not the one picked" (so `owner` is always `undefined` on the
      result by construction). Migrate BOTH invoker-less call sites to
      it: `vcs/mounts.ts:207` (`githubToken`) AND
      `credential-store-adapter.ts`'s `firstForProvider` (:42-51 —
      currently dead code with zero call sites, verified; migrated now so
      no future caller can wire it up unsafely — tech-plan D6/D6a).
- [ ] 6.3 Thread the invoker at all three dispatch call sites:
      `routes/tools.ts:1248` (principal.sub from :858 + actor when the
      call is app/workflow/agent-originated), `workflows/invoke.ts:366`
      (ServiceContext), `routes/llm.ts:116`. A
      `CredentialNotConnectedError` surfaces as HTTP 403 with its `code`
      in the body (spec: "The error is machine-distinguishable"). (Line
      numbers per tech-plan; if drifted, the cited intent wins — see
      `briefs/deviations.md` for the drift already observed at
      elaboration time.)
- [ ] 6.4 New test file
      `server/workspace/tests/credential-level-resolution.test.ts`:
      per-invoker resolution through the workspace entry point, fail
      closed (owner ≠ invoker; no connection and no workspace row),
      workspace fallback for unconnected invoker without a user-level
      selection, `resolveWorkspaceCredential` never returns user-oauth
      (assert `owner === undefined` on every result, not just that no
      `user-oauth` row was picked).
- [ ] 6.5 Grep gate (both repos, IW-9 rule 4), exclusion-based so it
      covers every current AND future invoker-less call site rather than
      allowlisting known directories (tech-plan D6a):
      aprovan —
      `! grep -rln "resolveRecordForProvider" server/workspace/src --include="*.ts" | grep -v "^server/workspace/src/credentials\.ts$"`
      returns nothing (covers `routes/`, `workflows/`, `vcs/`,
      `credential-store-adapter.ts`, and any new file — `credentials.ts`
      is the sole legitimate owner of the primitive); registry —
      `! grep -n "deps\.credentials\.firstForProvider" registry/packages/registry-server/src/profiles/resolve.ts`
      returns nothing (verified in stream 2; re-checked here since stream
      6 is where aprovan's half of the gate first becomes checkable
      end-to-end).

## Acceptance criteria

Copied in full from
`openspec/changes/iw9-f3-credential-levels/specs/credential-level-resolution/spec.md`
— all four requirements apply here (this is where they become enforced
at every call site, not just implemented in `resolveProfile`):

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

## Verify

Run every command from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`
unless noted otherwise. All must pass before reporting done.

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace test -- credential-level-resolution
grep -n "resolveWorkspaceCredential" server/workspace/src/vcs/mounts.ts server/workspace/src/credential-store-adapter.ts
! grep -rln "resolveRecordForProvider" server/workspace/src --include="*.ts" | grep -v "^server/workspace/src/credentials\.ts$"
```

Registry half of the gate (run from the sibling checkout):

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
! grep -n "deps\.credentials\.firstForProvider" packages/registry-server/src/profiles/resolve.ts
```

Additional check (this stream changes a required-parameter signature —
typecheck every call site, not just the ones the task names, in case
something else in the workspace calls `resolveCredentialRecord`):

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace check-types
grep -rn "resolveCredentialRecord" server/workspace/src --include="*.ts"
```

Lint: per this repo's `AGENTS.md`, root `pnpm lint` fails at load time —
pre-existing, not a gate for this stream. Rely on `check-types` above.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md`
  (D4, D5, D6, D6a) are fixed — if one seems wrong, stop and report
  instead of changing it.
- Surgical changes only; match existing style.
- Do not modify files outside:
  `server/workspace/src/credentials.ts`,
  `server/workspace/src/credential-store-adapter.ts`,
  `server/workspace/src/routes/tools.ts`,
  `server/workspace/src/routes/llm.ts`,
  `server/workspace/src/workflows/invoke.ts`,
  `server/workspace/src/vcs/mounts.ts`,
  `server/workspace/tests/credential-level-resolution.test.ts`.
- Within `routes/tools.ts`, touch only the dispatch/audit region
  (~lines 850-1340) — do not touch the VCS tool-schema region (~lines
  278-380), which belongs to the sibling change `iw9-f1-vcs-scoping-params`.
- New tests go in the new file named above; do not extend existing test
  files.
- Never import across repos.

## Report back

When done: check off tasks 6.1-6.5 in
`openspec/changes/iw9-f3-credential-levels/tasks.md`, and write
`openspec/changes/iw9-f3-credential-levels/briefs/06-report.md` containing:
what you built, how you verified it (paste both grep-gate outputs showing
zero matches), any deviations from this brief and why (especially if the
`routes/tools.ts` line numbers had drifted further since this brief was
written), and anything stream 7 (audit attribution) needs to know —
specifically the exact call-site shape at each of the three dispatch
points, since stream 7 threads audit fields into the same call sites
immediately after this stream's `resolveCredentialRecord`/
`resolveWorkspaceCredential` calls.

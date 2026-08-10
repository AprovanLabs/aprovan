# Brief: aprovan — audit attribution

- **Change**: `iw9-f3-credential-levels` (stream 7 of 7 — final stream)
- **Repo**: `aprovan` — work happens entirely in
  `/Users/jacob/Documents/Code/AprovanLabs/aprovan`
- **Depends-on**: stream 6 (every dispatch call site must already resolve
  a `ResolvedCredential` with `level`/`owner` before an audit row can
  record it)
- **Model**: Sonnet (per `IW-9-EXECUTION-OVERVIEW.md`) — this is the
  attribution trail auditors rely on; review with that in mind even
  though the tier stays Sonnet (the interfaces are frozen, not novel).

## Mission

When you are done, every audit row for a provider dispatch that resolved
a credential records the credential's id and level, and — for indirect
dispatches — the actor (workflow/agent) and profile name that selected it.
Ephemeral request-supplied credentials are marked distinctly from stored
ones. Rows written before this change still read back cleanly with the
new fields absent. This closes the loop invariant 1 opened: a
`workspace-oauth` action names the human who triggered it; a `user-oauth`
action's owner is implicit in the resolved credential. This is the last
stream in the F3 chain — when it merges, the sibling change
`iw9-c-capability-approval` can begin (per the IW-9 wave table, it was
blocked on F3's contract being published AND consumed end-to-end).

## Read first

All paths below are relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan` unless noted.

Orchestrator context:

1. `openspec/changes/IW-9-APP-FIRST.md` — invariant 1 ("shared-bot
   actions stay attributable")
2. `openspec/changes/iw9-f3-credential-levels/tech-plan.md` — D7
3. `openspec/changes/iw9-f3-credential-levels/specs/credential-audit-attribution/spec.md`
   — every requirement below is copied into Acceptance criteria
4. `openspec/changes/iw9-f3-credential-levels/briefs/deviations.md` — the
   "Line drift observed" table: `routes/tools.ts`'s ephemeral-credential
   branch is cited as lines 1227-1240 in tasks.md; **verified actual
   location is lines 1238-1250** — locate by the `if (body.credential)`
   branch itself, not the line number
5. `openspec/changes/iw9-f3-credential-levels/briefs/06-report.md` — read
   if it exists; it names the exact shape of the `ResolvedCredential` each
   dispatch call site now holds, which is what you thread into the audit
   append calls

This repo — read in this order, each file grounds the next:

6. `server/workspace/src/audit.ts` — the whole file: `AuditEntry`, the
   three backend classes (sqlite, Dynamo test-only store, dsql), `append`,
   `recent()`
7. `server/workspace/src/db/dsql-schema.sql` — `audit_log` DDL
   (~lines 51-64)
8. `server/workspace/src/routes/tools.ts` — revisit the dispatch/audit
   region from stream 6 specifically for the audit-append call sites:
   the coreService append (~lines 926/932), the native-dispatch append
   (~lines 1226/1232), and the ephemeral-credential branch (cited
   1227-1240, verified actual 1238-1250)
9. `server/workspace/src/routes/llm.ts` — its audit-append call site
10. `server/workspace/src/workflows/invoke.ts` — its audit-append call
    site, and how actor kind/id is already available in `ServiceContext`
    (from stream 6's work)

## Tasks

Copied verbatim from `openspec/changes/iw9-f3-credential-levels/tasks.md`,
section "7. aprovan — audit attribution":

- [ ] 7.1 Extend `AuditEntry` with `credentialId?`, `credentialLevel?`,
      `credentialSource?: "stored" | "ephemeral"`, `actorKind?`,
      `actorId?`, `profileName?` (tech-plan D7); additive columns on
      sqlite (try/catch ALTER) and `db/dsql-schema.sql`; Dynamo
      test-only store passes them through; `recent()` returns them and
      tolerates pre-change rows (spec: "Attribution fields are
      queryable").
- [ ] 7.2 Thread attribution into every dispatch audit append: stored
      credentials record id + level from `ResolvedCredential`; ephemeral
      request-supplied credentials record `credentialSource:
      "ephemeral"` and no id (`routes/tools.ts:1227-1240`);
      credential-less dispatches append unchanged; workflow/agent paths
      record actor kind+id and the profile name when one selected the
      credential.
- [ ] 7.3 New test file
      `server/workspace/tests/audit-attribution.test.ts` (sqlite):
      round-trip of all six fields, pre-change row reads back with
      fields undefined, shared-bot row carries callerId + level
      `workspace-oauth` + credential id (spec: "Shared-bot action names
      the human").

## Acceptance criteria

Copied in full from
`openspec/changes/iw9-f3-credential-levels/specs/credential-audit-attribution/spec.md`
— these are the tests of done:

### Requirement: Audit rows attribute the credential

Every audit row written for a provider dispatch that resolved a credential
SHALL record, in addition to the existing fields, the credential's id and
level, and the via-path when the dispatch did not come directly from the
user (the profile name used, and/or the non-user actor — app, workflow, or
agent — that carried the call). The invoking user remains the existing
`callerId`. Together these answer "who did this, through what, as whom"
(IW-9 invariant 1: shared-bot actions stay attributable).

#### Scenario: Shared-bot action names the human
- **WHEN** a user's tool call executes under a `workspace-oauth` credential
- **THEN** the audit row records that user as `callerId` and the
  credential's id and level `workspace-oauth`

#### Scenario: User-level action names the credential owner implicitly
- **WHEN** a user's tool call executes under their own `user-oauth`
  credential
- **THEN** the audit row records level `user-oauth` and the credential id,
  and `callerId` equals the credential owner

#### Scenario: Via-path is recorded for indirect dispatch
- **WHEN** a workflow or agent run dispatches a provider call under a
  resolved credential
- **THEN** the audit row records the actor (kind and id) and, when a
  profile selected the credential, the profile name

### Requirement: Credential-less calls audit unchanged

Dispatches that resolve no credential (credential-less compat entries,
native services, ephemeral request-supplied credentials) SHALL continue to
produce audit rows; the new attribution fields are simply absent. Ephemeral
credentials SHALL be marked as such rather than left indistinguishable
from stored credentials.

#### Scenario: No credential, no attribution fields
- **WHEN** a dispatch executes without resolving a stored credential
- **THEN** the audit row is written with the existing fields and no
  credential id/level

#### Scenario: Ephemeral credential is distinguishable
- **WHEN** a dispatch executes with a request-supplied ephemeral credential
- **THEN** the audit row marks the credential source as ephemeral and
  stores no stored-credential id

### Requirement: Attribution fields are queryable

The audit read surface SHALL return the new fields on every backend that
serves reads (sqlite and dsql), and rows written before the change SHALL
read back with the fields absent, not erroring.

#### Scenario: Old rows still read
- **WHEN** `recent()` returns rows written before this change
- **THEN** they deserialize with the attribution fields undefined

#### Scenario: New fields round-trip on both backends
- **WHEN** an audit row with credential attribution is written and read
  back on the sqlite and dsql backends
- **THEN** credential id, level, source, actor, and profile fields
  round-trip intact

## Verify

Run every command from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.
All must pass before reporting done.

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace test -- audit-attribution
grep -n "credential_level" server/workspace/src/db/dsql-schema.sql
```

Additional checks (this stream adds columns on two backends and touches
three dispatch files — confirm nothing else broke):

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/workspace check-types
pnpm --filter @aprovan/workspace test -- credential-level-resolution   # stream 6's tests must still pass
```

Lint: per this repo's `AGENTS.md`, root `pnpm lint` fails at load time —
pre-existing, not a gate for this stream. Rely on `check-types` above.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md`
  (D7) are fixed — if one seems wrong, stop and report instead of
  changing it.
- Surgical changes only; match existing style — the existing try/catch
  `ALTER` pattern for additive sqlite columns.
- Do not modify files outside:
  `server/workspace/src/audit.ts`,
  `server/workspace/src/db/dsql-schema.sql`,
  `server/workspace/src/routes/tools.ts`,
  `server/workspace/src/routes/llm.ts`,
  `server/workspace/src/workflows/invoke.ts`,
  `server/workspace/tests/audit-attribution.test.ts`.
- Within `routes/tools.ts`, touch only the audit-append lines inside the
  dispatch/audit region already established by stream 6 — do not touch
  the VCS tool-schema region owned by `iw9-f1-vcs-scoping-params`.
- New tests go in the new file named above; do not extend existing test
  files.
- Never import across repos.
- This is the last stream in the F3 chain — after this merges, the F3
  contract is fully published and consumed end-to-end; do not leave any
  task unchecked without reporting why.

## Report back

When done: check off tasks 7.1-7.3 in
`openspec/changes/iw9-f3-credential-levels/tasks.md`, and write
`openspec/changes/iw9-f3-credential-levels/briefs/07-report.md` containing:
what you built, how you verified it, any deviations from this brief and
why, and confirmation that this was the final F3 stream — note explicitly
for whoever plans `iw9-c-capability-approval`'s dispatch that the full
chain (registry model → publish → aprovan pin → aprovan stores → dispatch
resolution → audit attribution) is now complete and merged.

# Brief: aprovan — derived authority: runtime resolution + cascading revocation

**Depends-on: 8 (merged)** | Repo: aprovan | Wave 6 (parallel with 9)

## Mission

When you are done, standing workflows/schedules/agent-profiles resolve
owner grants at dispatch time via `evaluateDispatch` (never snapshotted);
membership departure deactivates automations; grant/credential revocation
invalidates the tool-list cache immediately. Invariant 3.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — **invariant 3** (and 11)
3. `openspec/changes/iw9-c-capability-approval/prd.md` — Goal 7
4. `openspec/changes/iw9-c-capability-approval/tech-plan.md`
5. `openspec/changes/iw9-c-capability-approval/specs/derived-authority/spec.md`
6. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 11
7. `routes/tools.ts` `invalidateToolListCache` (~112-113); credentials revoke hooks

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [x] 11.1 New module `derived-authority.ts`: every standing
      workflow/schedule/agent-profile execution resolves the owner's
      grants at dispatch time through `evaluateDispatch` (stream 8);
      nothing is copied into the automation record at save time (invariant
      3). Spec: "Runtime authority resolution", scenario "Narrowed owner
      narrows the automation".
- [x] 11.2 Membership-departure listener: on a member leaving (or
      membership revoked), deactivate their standing automations in that
      workspace before their next scheduled run, mark them "deactivated:
      owner departed", stop resolving their user-level credential grants
      immediately, and expose an admin-only reassign action that
      re-evaluates under the new owner's grants (never inherits). Spec:
      "Cascading revocation on departure", scenarios "Owner departs",
      "Reassignment re-derives".
- [x] 11.3 Grant/credential revocation invalidates the workspace tool-list
      cache (`invalidateToolListCache`, `routes/tools.ts:112-113`) on the
      same event so every dependent principal's next dispatch — not the
      next cache TTL — sees the narrowed grant. Spec: "Credential
      revocation cascades", scenario "Grant revoked mid-standing".
- [x] 11.4 New test file `tests/derived-authority.test.ts`: a standing
      workflow's next run reflects a grant narrowed after it was saved; a
      departing member's nightly workflow does not run again and is
      listed deactivated with reason; an admin reassignment re-derives
      under the new owner; revoking an app's grant makes its next call
      out-of-grant from any dispatch path and the tool list stops showing
      it granted.

## Acceptance criteria

From `specs/derived-authority/spec.md`:

### Requirement: Runtime authority resolution
Every execution of a standing workflow, schedule, or agent profile SHALL
resolve its owner's grants at dispatch time through the same chokepoint
predicate as interactive calls. No grant, membership, or credential
reference SHALL be copied into the automation record at save time; the
record stores only the owner's identity.

#### Scenario: Narrowed owner narrows the automation
- **WHEN** an owner's grant is narrowed after saving a standing workflow
  that uses the removed resource
- **THEN** the workflow's next run is evaluated under the narrowed grant
  and the out-of-grant action queues (or the run asks), with no memory of
  the earlier wider grant

### Requirement: Cascading revocation on departure
#### Scenario: Owner departs
- **WHEN** a member with a nightly standing workflow leaves the workspace
- **THEN** the workflow does not run again, its record shows deactivated
  with reason, and an admin can reassign it to a present member

#### Scenario: Reassignment re-derives
- **WHEN** an admin reassigns a deactivated automation to themselves
- **THEN** subsequent runs are evaluated under the admin's current grants
  and audited under the admin's identity

### Requirement: Credential revocation cascades
#### Scenario: Grant revoked mid-standing
- **WHEN** an admin revokes an app's `(slack.post, ...)` grant
- **THEN** the app's next `slack.post` from any path is out-of-grant
  (queues if resource-level, denies if capability-level) and the tool list
  no longer shows the capability as granted

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- derived-authority
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/src/derived-authority.ts`, `aprovan/server/workspace/src/routes/tools.ts` (invalidateToolListCache call sites only, :112-113), `aprovan/server/workspace/src/credentials.ts` (revoke hook only), `aprovan/server/workspace/tests/derived-authority.test.ts`
- Do not rewrite `evaluateDispatch` (stream 8). Parallel-safe with stream 9.

## Report back

Check off tasks; PR or `briefs/11-report.md`; note reassign API for review
surface / admin UX.

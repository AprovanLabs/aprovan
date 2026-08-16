# Brief: aprovan — evaluateDispatch: the one predicate + all dispatch paths

**Depends-on: 7 (merged)** | Repo: aprovan | Wave 5

## Mission

When you are done, every tool invocation (HTTP route, agent loop, app
workflow, native op) passes through one `evaluateDispatch` predicate
returning `allow | deny | queue | ask`. Observations skip resource/queue
checks. Old gates (`mayInvokeTool`, `assertAllowedTools`, `toolGranted`)
are deleted or inlined. Legacy APR-320 permissions migrate into the grant
model. This is Goal 1 / invariant 2.

**Serialization:** confirm iw9-a's `routes/tools.ts` VCS schema edits
(~278-380) are already on the branch before editing the invoke/audit region.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — serialization rules for `routes/tools.ts`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 1, 2, 4
3. `openspec/changes/iw9-c-capability-approval/prd.md` — Goals 1, 3, 5
4. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — Interfaces (`DispatchRequest`, `DispatchDecision`, `evaluateDispatch`)
5. `openspec/changes/iw9-c-capability-approval/specs/resource-grants/spec.md`
6. `openspec/changes/iw9-c-capability-approval/specs/effect-classification/spec.md` — observations never approve
7. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 8 + external deps (F3, A, B, D)
8. `server/workspace/src/grants.ts`, `profile-grants.ts`, `authorize.ts`, `permissions.ts`, `agents/runner.ts`, `apps/capabilities.ts`, `native-dispatch.ts`

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`. Grep-gates also run in registry.

## Tasks

- [ ] 8.1 Confirm iw9-a's `routes/tools.ts` VCS tool-schema edits
      (`vcs.commit/log/diff` scope args, ~lines 278-380) are already
      landed on the branch before touching the dispatch/audit region of
      this file (serialization rule) — this task is a no-op check, not
      code.
- [ ] 8.2 Rewrite `grants.ts` around `evaluateDispatch(req:
      DispatchRequest): Promise<DispatchDecision>` per tech-plan
      "Interfaces & Data": inputs `(principal, appOrProfile, tool+effect,
      resource, credentialLevel)`; outputs `allow | deny | queue | ask`.
      Observations skip resource/queue checks entirely (spec
      effect-classification "Observations never require action
      approval"). Spec: resource-grants "One dispatch chokepoint",
      "Grants intersect, never union", "Approval follows the credential".
- [ ] 8.3 `profile-grants.ts` grows an export that returns the invoker's
      matched tool-pattern set for a profile (not just
      `profileGrantAllows`'s boolean) so `evaluateDispatch` can compose
      it into the three-way intersection (invoker grants ∩ app ceiling ∩
      profile narrowing — invariant 2); `authorize.ts`'s
      `profileGrantAllows` becomes a thin wrapper over the new export or
      is inlined into `evaluateDispatch`.
- [ ] 8.4 Wire all four dispatch paths to call `evaluateDispatch` and
      delete/inline their old gates: `routes/tools.ts` invoke handler
      (replaces `mayInvokeTool` at :1052), `agents/runner.ts` (replaces
      `toolGranted` import at :74), `apps/capabilities.ts`
      (`assertAllowedTools` :267, `contractGrantCallable` :417,
      `providerGrantCallable` :448 delegate to or are replaced by the
      predicate), `native-dispatch.ts` (`dispatchAprovanNativeOp` :402).
      Spec scenario: "Hidden namespace unreachable from every path",
      "Admin is not exempt from resource grants for apps".
- [ ] 8.5 Migrate `permissions.ts` (APR-320 direct grant rows) into the
      unified model: existing direct grants resolve through
      `evaluateDispatch` (as capability-only, any-resource grants written
      once at migration, never as a parallel system); `authorize.ts`'s
      `getPermissionStore().check` call is deleted once the migration
      path is proven. Spec: resource-grants "Direct permission rows
      migrate into the grant model", scenario "Legacy grant still works".
- [ ] 8.6 New test file `tests/evaluate-dispatch.test.ts`: an
      `email.send` call inside a granted resource pattern executes with
      no card/queue (spec "Action within granted resource"); outside the
      pattern it queues, not fails (spec "Action outside granted
      resource"); app ceiling narrower than invoker denies (spec "App
      cannot exceed invoker"); invoker narrower than app ceiling denies
      (spec "Invoker cannot exceed app"); a namespace hidden from a
      principal's grants is unreachable via the HTTP route, `call_tool`
      inside an agent run, and an app workflow call alike (spec "Hidden
      namespace unreachable from every path" — one test enumerating all
      three entry points against the predicate); a workspace-oauth grant
      lets any member call once an admin approved it, with the audit row
      naming member + app + credential (spec "Workspace credential,
      member invokes"); an unconnected user-oauth call fails closed with
      a connect prompt, not a queue entry (spec "User credential, first
      use"); a migrated legacy `keyvalue.*` permission still resolves
      (spec "Legacy grant still works").
- [ ] 8.7 Grep gate (both repos): no remaining callers of
      `mayInvokeTool`, `assertAllowedTools` as a standalone gate, or
      `toolGranted` outside `evaluateDispatch`'s own implementation and
      its tests, in aprovan `server/workspace/src`; no equivalent
      bypass of registry-server's resource-pattern dispatch in
      `registry/packages/registry-server/src` (verify command above
      covers the aprovan half; run the registry-side grep manually as
      part of this task since it is a different repo root).

## Acceptance criteria

From `specs/resource-grants/spec.md` and `effect-classification/spec.md`:

#### Scenario: Action within granted resource
- **WHEN** a principal holding grant `(email.send, mailto:*@aprovan.com)`
  dispatches `email.send` to `alice@aprovan.com`
- **THEN** the call executes without a card or queue entry

#### Scenario: Action outside granted resource
- **WHEN** the same principal dispatches `email.send` to `bob@example.org`
- **THEN** the action does not execute and enters the exception queue

#### Scenario: Hidden namespace unreachable from every path
- **WHEN** a namespace is not covered by a principal's grants
- **THEN** invoking it via the HTTP route, via `call_tool` inside an agent
  run, and via an app workflow all return the same authorization error, and
  a test enumerates all dispatch entry points against the predicate

#### Scenario: Admin is not exempt from resource grants for apps
- **WHEN** an app install's allow-list does not cover a resource
- **THEN** the call is out-of-grant even when the invoking user is an admin

#### Scenario: App cannot exceed invoker
- **WHEN** an app ceiling includes `email.send` but the invoking user holds
  no `email` grant
- **THEN** the app's `email.send` call is denied for that invoker

#### Scenario: Invoker cannot exceed app
- **WHEN** a user holds `(email.send, mailto:**)` but the app ceiling omits
  `email`
- **THEN** the call made through the app is denied

#### Scenario: Workspace credential, member invokes
- **WHEN** an admin has approved `(slack.post, https://aprovan.slack.com/**)`
  for a workspace-oauth credential and a member invokes it
- **THEN** the call executes and the audit row names the member, the app,
  and the credential level + id

#### Scenario: User credential, first use
- **WHEN** a member first invokes a capability backed by user-oauth and has
  not connected
- **THEN** the call fails closed with a connect-and-approve prompt scoped
  to that member; no other member's approval satisfies it

#### Scenario: Legacy grant still works
- **WHEN** a principal held a pre-existing direct permission for `keyvalue.*`
- **THEN** after migration the same calls succeed via the unified predicate,
  and the retired check path has no remaining callers

#### Scenario: Observation inside a granted namespace
- **WHEN** a principal with a `github` capability grant calls a
  `github.*` tool classified `observation` on any resource
- **THEN** the call executes without a resource-grant check, queue entry, or card

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- evaluate-dispatch && grep -rn "mayInvokeTool\|assertAllowedTools\|toolGranted" server/workspace/src --include="*.ts" | grep -v "\.test\.ts"
```

Also grep registry for resource-check bypasses (task 8.7).

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/src/grants.ts`, `aprovan/server/workspace/src/profile-grants.ts`, `aprovan/server/workspace/src/authorize.ts`, `aprovan/server/workspace/src/routes/tools.ts` (invoke handler region only, :850-1340 — after iw9-a's schema edits there), `aprovan/server/workspace/src/agents/runner.ts`, `aprovan/server/workspace/src/apps/capabilities.ts`, `aprovan/server/workspace/src/native-dispatch.ts`, `aprovan/server/workspace/src/permissions.ts`, `aprovan/server/workspace/tests/evaluate-dispatch.test.ts`
- Queue persistence is stream 9; JIT cards are stream 10 — return `queue`/`ask` decisions; do not build those modules here.
- New tests in a new file only.

## Report back

Check off tasks; PR or `briefs/08-report.md` with decision matrix and
grep-gate results for both repos; unblock streams 9 and 11.

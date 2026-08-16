# Brief: aprovan — capability-approval-flow: install card, JIT cards, ask, always-ask

**Depends-on: 8, 9 (merged)** | Repo: aprovan | Wave 7

## Mission

When you are done, install cards propose static-analysis ceilings
(`@utdk/remote` `scanToolsAccess` vs `app.yaml`); JIT misses emit
`pending_action` (first producer — iw9-d reserved) and end the turn;
accept resumes via D's resume/reattach; workflows have explicit `ask`;
app always-ask + workspace tighten-only; agents draft only (invariant 11).

**Note:** iw9-d stream 10 (CF-5) and stream 8 (`RunTransport`) are already
on main — consume, do not rebuild.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 6, 11
3. `openspec/changes/iw9-c-capability-approval/prd.md` — Goals 4, 6
4. `openspec/changes/iw9-c-capability-approval/ux.md` — Install card, JIT card
5. `openspec/changes/iw9-c-capability-approval/tech-plan.md`
6. `openspec/changes/iw9-c-capability-approval/specs/capability-approval-flow/spec.md`
7. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 10
8. iw9-d `RunEvent` `pending_action` + resume extension; iw9-b `app.yaml` capability fields
9. `@utdk/remote` `scanToolsAccess` (added in stream 6.1)

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [x] 10.1 New module `capability-cards.ts`: install-card ceiling
      proposal — statically analyze the app archive with `@utdk/remote`'s
      `scanToolsAccess` (stream 6.1's new dependency), reconcile the
      resulting namespace list against `app.yaml` capability declarations
      (iw9-b), flag used-but-undeclared as blocking and
      declared-but-unused as informational; confirming writes
      capability-level (no resource) grants. Spec:
      capability-approval-flow "Install card proposes a static-analysis
      ceiling", scenarios "Ceiling proposed from code", "Undeclared use
      blocks", "Ceiling is coarse, resources come later".
- [x] 10.2 Wire `agents/runner.ts` to emit `RunEvent`'s reserved
      `pending_action` (iw9-d) when `evaluateDispatch` returns `ask` —
      this is the first producer of that event type. The turn ends;
      acceptance persists the grant, releases queued actions it covers
      (via stream 9's `release`), and resumes the run through iw9-d's
      resume/reattach extension point — no held connection, no suspended
      process (D5). Spec: "JIT capability cards are non-blocking",
      scenarios "Miss ends the turn", "Accept resumes".
- [x] 10.3 Explicit `ask` workflow step (`workflows/invoke.ts`): ends the
      turn with a card in the invoker's queue (D15 — approvals from a run
      go to the invoker, not the admin by default); resumes the workflow
      with the answer on response. Spec: "Explicit ask action", scenario
      "Workflow asks".
- [x] 10.4 App always-ask policy: an app manifest (`app.yaml`, iw9-b)
      declares action classes that always raise a card even inside a
      granted resource; workspace policy may add always-ask classes or
      narrow grants but a write that would clear an app-declared
      always-ask class is rejected with an error naming the declaration
      (D12 tighten-only). Spec: "App always-ask policy, workspace tightens
      only", scenarios "Always-ask fires inside a grant", "Workspace
      cannot loosen".
- [x] 10.5 Agent draft-not-instantiate: the agent-reachable
      install-proposal tool creates a draft install/grant/profile record
      only — no grant, install, or profile exists until a human confirms
      the resulting card (invariant 11). Spec: "Agents draft, people
      instantiate", scenario "Agent proposes an install".
- [x] 10.6 New test file `tests/capability-cards.test.ts`: install card
      lists exactly the statically-discovered capabilities pre-filled
      from `app.yaml`; undeclared use blocks install; a JIT miss on a
      result-dependent tool call ends the turn and accept resumes with
      the queued action released; an `ask` step round-trips through the
      invoker's queue; an always-ask app class raises a card inside a
      granted resource and a workspace attempt to clear it is rejected;
      an agent-drafted install creates no grant until a person confirms
      it.

## Acceptance criteria

From `specs/capability-approval-flow/spec.md`:

#### Scenario: Ceiling proposed from code
- **WHEN** an app whose code calls `github.issues.create` and `email.send`
  is installed
- **THEN** the install card lists exactly those capabilities with their
  effects, pre-filled from `app.yaml`, and confirming writes the ceiling

#### Scenario: Undeclared use blocks
- **WHEN** app code calls a namespace absent from `app.yaml` capabilities
- **THEN** the install card marks it as undeclared and install cannot
  complete until the manifest declares it or the code drops it

#### Scenario: Ceiling is coarse, resources come later
- **WHEN** the install card is confirmed
- **THEN** only capability-level grants exist; resource patterns are
  introduced just-in-time on first action

#### Scenario: Miss ends the turn
- **WHEN** an agent run's tool call misses a resource grant on a
  result-dependent action
- **THEN** the turn ends with a card summarizing the request and the
  message "queued N actions" where applicable

#### Scenario: Accept resumes
- **WHEN** the invoker accepts the JIT card
- **THEN** the grant is persisted, queued actions covered by it are
  released, and the run resumes from where it ended

#### Scenario: Workflow asks
- **WHEN** a workflow executes an `ask` step with a payload
- **THEN** a card appears in the invoker's review surface, the turn ends,
  and the workflow resumes with the answer on response

#### Scenario: Always-ask fires inside a grant
- **WHEN** an app declares `email.send` always-ask and a granted resource
  is targeted
- **THEN** a card is raised anyway; acceptance executes but records no
  standing grant beyond the existing one

#### Scenario: Workspace cannot loosen
- **WHEN** workspace policy attempts to clear an app-declared always-ask
  class
- **THEN** the policy write is rejected with an error naming the app declaration

#### Scenario: Agent proposes an install
- **WHEN** an agent run calls the install-proposal tool
- **THEN** a draft install card appears for the owner and no install or
  grant exists until the owner confirms

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- capability-cards
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/src/capability-cards.ts`, `aprovan/server/workspace/src/agents/runner.ts` (pending_action emission + resume only), `aprovan/server/workspace/src/apps/install.ts`, `aprovan/server/workspace/src/workflows/invoke.ts` (ask step only), `aprovan/server/workspace/tests/capability-cards.test.ts`
- Do not rebuild iw9-d CF-5 or RunTransport. Do not build client UI (stream 13).

## Report back

Check off tasks; PR or `briefs/10-report.md`; note card shapes for
streams 12–13.

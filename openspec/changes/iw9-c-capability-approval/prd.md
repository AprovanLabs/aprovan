# iw9-c-capability-approval — PRD

_Wave 2, stream C of IW-9 (`openspec/changes/IW-9-APP-FIRST.md`, settled
authority — D9, D12, D13, D15; invariants 1, 2, 3, 4, 6, 11). This PRD
elaborates; it does not re-litigate._

## Problem

Capability security exists but is invisible and coarse. A grant today is a
whole namespace (`github.*`) with no resource dimension — an app granted
"send email" can email anyone; there is no distinction between reading and
acting (`AuditEntry` records status, not effect); approval decisions are
scattered across four gates (`mayInvokeTool`, `assertAllowedTools`,
`toolGranted`, `dispatchAprovanNativeOp`) with no user-facing surface; and a
standing automation keeps its owner's authority after the owner leaves.
IW-9 makes apps the product; installing third-party apps is only safe if
users can see and narrowly approve what an app may touch.

## Users & Jobs

- **Workspace admin** — approve an app's capability ceiling once at install;
  approve workspace-level credentials once for the whole space (invariant 1);
  tighten (never loosen) app policy (D12); revoke and see the revocation
  cascade (invariant 3).
- **Member / invoker** — connect and approve user-level credentials for
  themselves (invariant 1); answer just-in-time resource requests without
  losing the agent's turn (D9); review queued out-of-grant actions in one
  place and release or discard them (D12).
- **App publisher** — declare a coarse ceiling in `app.yaml`; declare
  always-ask action classes; ship agent profiles bounded by the app's
  grants (D15).
- **Agent** — request capability mid-run via a non-blocking card; draft
  installs/profiles for owner review but never self-provision (invariant 11).

## Goals

1. **One gate.** Every tool invocation (HTTP route, agent loop, app
   workflow, native op) passes exactly one grant predicate; proven by a test
   that a namespace hidden from the tool list is unreachable from every
   dispatch path (grant-enforcement precedent, its stream 5).
2. **Total effect classification.** 100% of dispatchable tools carry
   `effect: "observation" | "action"`; generated providers derive it from
   HTTP method (D13); a CI gate fails on any unclassified handwritten or
   core tool.
3. **Resource-scoped grants.** Grant = (capability, resource-pattern),
   remembered (D12); the matcher decides in O(pattern length) with no
   network I/O.
4. **Non-blocking JIT.** A capability miss during an agent run ends the turn
   with a card ("queued N actions" for result-dependent chains); accepting
   the card resumes the run (D9/D12). Fire-and-forget chains continue on
   ack. No simulated results; no undo for actions.
5. **Queue, don't fail.** An action against an out-of-grant resource queues
   for review instead of erroring (D12); observations never queue — they
   either pass or the run asks.
6. **One review surface.** Queued actions, staged changes, merge conflicts,
   and capability requests render in a single surface obeying invariant 6
   (shell renders who/what/credential/buttons; app widget renders payload
   only); notifications retrofit onto the same split.
7. **Derived authority.** Standing automations execute with the owner's
   *current* standing, resolved at dispatch time; owner departure
   deactivates their standing automations before their next scheduled run
   (invariant 3).
8. **Attributable audit.** Every audit row names (user, via app/profile,
   credential level + id) — rides F3's shape.

## Non-Goals

- App→app calls (deferred by IW-9; mounts cover reuse).
- Undo, rollback, or simulation of external actions (D12 — explicit).
- Blocking modal approvals in the agent loop (the explicit `ask` step is
  the only synchronous ask, and it is workflow-authored, not platform-imposed).
- Publisher push-to-installed-apps (D8 gave this up).
- Organizations above workspaces; multi-region policy.
- Re-classifying past audit rows or retro-approving past actions.
- Building iw9-d's stream protocol or iw9-b's manifest loader — this stream
  consumes their landed shapes.

## Capabilities

### New Capabilities
- `effect-classification`: every tool carries observation/action effect;
  derivation for generated providers, annotation for handwritten and core;
  the CI completeness gate.
- `resource-grants`: the (capability, resource-pattern) grant model, URL
  pattern matcher, single enforcement predicate at dispatch, credential-level
  approval routing (invariant 1), intersection semantics (invariant 2).
- `capability-approval-flow`: install-card ceiling proposal via static
  analysis (D9), JIT non-blocking request cards, explicit `ask` workflow
  action, app always-ask policy, workspace tighten-only override (D12).
- `action-exception-queue`: out-of-grant action queueing, chain semantics
  (fire-and-forget vs result-dependent), release/discard, expiry.
- `review-surface`: the one shell-decision/payload-widget surface over
  queued actions, staged changes, merge conflicts, capability requests;
  notification retrofit.
- `derived-authority`: runtime authority resolution for standing
  automations, cascading revocation on departure/revoke, agents
  draft-don't-instantiate (invariant 11).

### Modified Capabilities

None. No existing spec in `openspec/specs/` covers grants (they are
desktop/gateway/STT-era specs); grant prior art lives in the completed
`openspec/changes/grant-enforcement/` change, which this stream extends
rather than modifies.

## Constraints & Assumptions

- **Settled by IW-9** (not open): D9, D12, D13, D15; invariants 1, 2, 3, 4,
  6, 11; serialization rules (A's `routes/tools.ts` schema changes land
  before C's grant-visibility edits there; B's manifest shapes land before C
  reads capability declarations from `app.yaml`).
- **Cross-repo:** effect derivation is a registry-repo change
  (`packages/bundler`) consumed here only via published `@utdk/*` /
  `@aprovan/registry-server` versions; the workspace repo pins, never
  path-links. Publish precedes consume in the task ordering.
- **External deps:** iw9-f3 (credential levels — enforcement and audit
  attribution ride its shape), iw9-f4 (app identity — grants key on appId),
  iw9-b (manifest capability fields), iw9-d (agent stream protocol — the
  JIT card's end-turn/resume extension point), iw9-a (its `routes/tools.ts`
  schema changes land first).
- **Assumption (unconfirmed):** the existing `Permissions` table rows
  (direct APR-320 grants) migrate into the new grant model rather than
  running as a parallel system; recommended and assumed yes.
- **Assumption (unconfirmed):** queued actions expire rather than persist
  forever; recommended default 7 days, surfaced before expiry.

## Open Questions

_IW-9 settles the substantive questions; these are parameter choices only._

1. **Queue expiry window** — discard unreviewed queued actions after how
   long? Recommendation: 7 days with a "expiring soon" state in the review
   surface; expiry is a discard, never an execute.
2. **Permissions-table migration timing** — migrate existing direct grants
   in this change or freeze the table and migrate in a follow-up?
   Recommendation: migrate here; two live grant systems is how this
   codebase acquired duplicate implementations twice (IW-9 serialization
   preamble).

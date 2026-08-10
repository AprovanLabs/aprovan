# iw9-c-capability-approval — Tech Plan

## Context

Verified current state (file:line checked 2026-08-09):

- **Effect source exists in the registry bundler.** Generated provider
  clients already retain the HTTP method per tool:
  `registry/packages/bundler/src/client-api.ts:15`
  (`ToolRuntimeMetadata.method`), populated from
  `tool_call_template.http_method` at `client-api.ts:154-155` (render path
  :708-709; same extraction in `openapi.ts:138-139`). Nothing downstream
  consumes it as an effect yet.
- **The workspace tool list has no effect field.** `ToolEntry`
  (`aprovan/server/workspace/src/routes/tools.ts:84-96`) carries
  provider/name/operation/schemas/streaming only.
- **Authorization is scattered.** HTTP invoke path: `routes/tools.ts:856`
  (POST `/:provider/:operation{.*}`) checks `mayInvokeTool` at :1052
  (`authorize.ts:19` — direct APR-320 permission row, group profile grant,
  or admin). Agent loop: `agents/runner.ts` imports `toolGranted` from
  `grants.ts` (:74). Apps: `apps/capabilities.ts` (`assertAllowedTools`
  :267, `contractGrantCallable` :417, `providerGrantCallable` :448).
  Native ops: `native-dispatch.ts:402` (`dispatchAprovanNativeOp`).
- **Grant model has no resource dimension.** `CapabilityGrants`
  (`grants.ts:26-29`) = `{ tools?: string[]; paths?: PathGrant[] }`.
- **Audit has no attribution triple.** `AuditEntry` (`audit.ts:18-33`)
  records callerId/provider/operation/status; no app, profile, or
  credential level (F3 adds the shape; C consumes it).
- **Notification widget body exists.**
  `notifications/service.ts:66` — `widget?: { path: string; data?: unknown }`
  on `NotificationRecord`, plus `choices` and server-stamped `source`.
- **Prior art:** completed change `openspec/changes/grant-enforcement/`
  (registry side): single resolve predicate, `CallContext.narrowedTo`
  subset validation, MCP sandbox tool routed through the same dispatcher,
  static `tools[expr]` scan made a parse error. C extends this; it does
  not re-open it.
- **Cross-repo policy** (IW-9 "Cross-repo coordination"): consumption only
  via published npm; publish before pin; `@aprovan/registry-server` pin
  must stay `^0.2.7`+ (workspace currently pins `^0.2.10`).

Landed prerequisites this plan builds on: iw9-f3 (credential levels +
audit attribution shape), iw9-f4 (appId identity), iw9-b (`app.yaml`
capability fields), iw9-d (server-side agent loop + stream protocol with
end-turn/resume extension point), iw9-a (its `routes/tools.ts` schema
edits land before ours).

## Goals / Non-Goals

**Goals:**
- One exported predicate `evaluateDispatch()` that every execution path
  calls; deletion of the bypasses it replaces (grep-gated in both repos).
- Effect metadata flows generation-time → published package → workspace
  tool list → client, with a CI completeness gate.
- Resource grants stored in registry-server storage (sqlite/dsql) beside
  profile grants; pure-function matcher shared client/server.
- Queue, cards, and review surface built on existing records +
  notifications infrastructure, not a new persistence system.

**Non-Goals:**
- No new approval transport (cards ride iw9-d's stream protocol and the
  existing notifications channel).
- No registry-server behavioral change to profile resolution semantics
  (grant-enforcement settled those).
- No client-side authorization; the client renders what the server
  decides (cf. `registry/docs/agent-interface.md` — the tool list is a
  projection of grants, never the enforcement).

## Architecture

```mermaid
flowchart LR
  subgraph registry repo (published packages)
    B[bundler: effect from http_method] --> P["@utdk/* provider packages\n(tool metadata + effect)"]
    RS["@aprovan/registry-server\ngrants storage + matcher + predicate core"]
  end
  subgraph aprovan repo (workspace server)
    TL[routes/tools.ts\ntool list + invoke] --> EP
    AR[agents/runner.ts] --> EP
    AW[app workflow exec] --> EP
    ND[native-dispatch.ts] --> EP
    EP[evaluateDispatch\ngrants.ts — the one predicate]
    EP -->|out-of-grant action| Q[exception queue\nsvc records]
    EP -->|capability miss in run| C1[JIT card]
    Q --> RSurf[review surface API\n+ notifications retrofit]
    C1 --> RSurf
  end
  P --> TL
  RS --> EP
  RSurf --> UI[client: ReviewSurface\nshell + sandboxed widget]
```

Components and single responsibilities:

- **bundler effect derivation** (registry): map retained `method` →
  `effect` in generated tool metadata; publish.
- **grant store** (registry `packages/registry-server`): resource-grant
  rows + `matchesResourcePattern()` (pure, ~100 LOC) + core predicate
  helpers; publish.
- **`evaluateDispatch`** (aprovan `grants.ts`, rewritten): the one
  predicate — input `(principal, appOrProfile, tool+effect, resource,
  credentialLevel)`, output `allow | deny | queue | ask`. All four
  dispatch paths call it; `mayInvokeTool` becomes its thin wrapper then
  is inlined away.
- **exception queue** (aprovan, svc records scope `svc#queue/…`):
  queued-action lifecycle (queued → released | discarded | expired).
- **card service** (aprovan): install card (static-analysis ceiling), JIT
  card, `ask` step, agent drafts — all emitted as review items.
- **review surface API + UI** (aprovan): one list over queue + staged
  changes + merge conflicts + capability requests; shell/widget split;
  notifications retrofit shares the widget sandbox.
- **derived-authority hooks** (aprovan): membership-departure listener
  deactivates standing automations; grant/credential mutation invalidates
  the tool-list cache (`invalidateToolListCache`, routes/tools.ts:112).

## Decisions

### D1: Effect is computed at bundle time, not at dispatch time
- **Choice**: The bundler writes `effect` into published tool metadata;
  the workspace trusts the package. Handwritten/core tools annotate in
  their static `tools` export (APR-304 shape).
- **Alternatives**: (a) Derive in the workspace from `runtimeMetadata.method`
  at list time — loses for handwritten providers with no method and
  creates two derivation sites that can disagree. (b) A central
  effect-override table — rejected: config drifts from code; D13 wants
  classification to live with the tool definition.
- **Revisit if**: a provider needs per-argument effect (e.g. a POST
  search endpoint); then allow an explicit annotation override in the
  provider source, still bundle-time.

### D2: Resource grants live in registry-server storage, not a new table
- **Choice**: Add a `resource_grants` store to
  `@aprovan/registry-server` storage (sqlite + dsql drivers, same seam as
  `profile_grants`); the workspace reads through
  `getRegistryStorage()` exactly as `profile-grants.ts` does.
- **Alternatives**: (a) Workspace-local Dynamo/records table — rejected:
  splits the grant system across storage backends the moment
  registry-server already owns profiles/credentials; the dynamo backend
  is retiring (profile-grants.ts header). (b) Extend `profile_grants`
  rows with resource patterns — rejected: profiles answer "which
  credential/provider", resource grants answer "which target"; different
  lifecycles (JIT writes vs admin wiring).
- **Revisit if**: grant volume makes the auth-time join hot; then add the
  same indexed-join treatment profile grants got.

### D3: One predicate in aprovan; matcher and row shapes in the package
- **Choice**: `matchesResourcePattern` and grant-row types publish from
  registry-server (shared with its MCP dispatch enforcement); the
  composed `evaluateDispatch` policy (intersection, queue-vs-deny,
  credential-level routing) lives in aprovan `grants.ts`, because it must
  see workspace-only inputs (app install ceilings, F3 credential levels,
  invoker identity).
- **Alternatives**: (a) Whole predicate in registry-server — rejected:
  the package cannot see app installs or workspace policy without
  widening its contract for one consumer. (b) Whole predicate in aprovan
  including the matcher — rejected: registry-server's own MCP/sandbox
  dispatch (grant-enforcement stream 5) must enforce the same resource
  rules; two matchers will diverge.
- **Revisit if**: a third consumer of the full policy appears; then the
  policy core moves into the package behind an interface.

### D4: Queue rows are svc records; cards are review items, not a new bus
- **Choice**: Queued actions persist as platform svc records (the
  `svc#…` pattern used by agent runs, `agents/runner.ts` RUNS_SCOPE
  precedent); review items are a projection API over queue rows, staged
  sessions, merge conflicts, and capability requests; delivery to the
  client rides the existing realtime broker + notifications.
- **Alternatives**: (a) A dedicated queue table + worker — rejected:
  nothing here needs polling throughput; release is human-paced.
  (b) Reuse `NotificationRecord` as the queue row — rejected:
  notifications are seen/unseen fan-out, not a lifecycle state machine;
  retrofitting terminal states onto `seenBy` semantics breaks both.
- **Revisit if**: queue release needs automation (bulk policies), then
  promote to a first-class store with its own indexes.

### D5: JIT resume = iw9-d run resumability, not a paused process
- **Choice**: "Accept resumes the run" is implemented as: card
  acceptance writes the grant, releases covered queued actions, and
  re-enters the agent loop with the stored run record (iw9-d's
  reattach/resume extension point). The turn genuinely ended; no server
  process waits on approval.
- **Alternatives**: held connection / suspended isolate awaiting
  approval — rejected by D12's non-blocking rule and by resumability
  (locked phone ⇒ run continues) from iw9-d.
- **Revisit if**: never within IW-9; this is invariant-adjacent.

### D6: Notifications retrofit = shared widget sandbox, not a merged store
- **Choice**: Keep `NotificationRecord` and its service; extract the
  widget-rendering rule ("apps may only embed calls they can make
  themselves", enforced by `evaluateDispatch` on widget-originated
  calls) into the shared review-surface widget host; notifications and
  review items render payload widgets through the same host component
  and the same sandbox.
- **Alternatives**: merge notifications into review items — rejected:
  notifications include pure FYI fan-out with no decision; forcing them
  through a decision lifecycle bloats both models.
- **Revisit if**: choices-bearing notifications turn out to be the only
  kind apps use; then fold them in.

## Interfaces & Data

Contracts (zod in the shared contracts seam; shapes abbreviated):

```ts
// published from @aprovan/registry-server ------------------------------
type Effect = "observation" | "action";

interface ResourceGrantRow {
  id: string; tenantId: string;
  subject: { kind: "user" | "group" | "app-install"; id: string };
  capability: string;            // grants.ts tool-pattern vocabulary
  resourcePattern: string | null; // null = any resource (explicit approval only)
  credentialLevel: "workspace-token" | "workspace-oauth" | "user-oauth"; // F3
  grantedBy: string; createdAt: string; revokedAt?: string;
}
function matchesResourcePattern(pattern: string, resource: string): boolean;
// pure; segments; '*' one segment, '**' suffix; case-insensitive host

// aprovan grants.ts ----------------------------------------------------
interface DispatchRequest {
  principal: Principal;                       // middleware/auth
  via?: { appId?: string; profileId?: string };
  tool: { namespace: string; operation: string; effect: Effect };
  resource?: string;                          // extracted per-namespace
  credential?: { level: CredentialLevel; id: string }; // F3
  runContext?: { runId: string; resultDependent: boolean };
}
type DispatchDecision =
  | { kind: "allow" }
  | { kind: "deny"; reason: "capability" | "credential-unconnected" }
  | { kind: "queue"; queuedActionId: string }   // action + resource miss
  | { kind: "ask"; cardId: string };            // JIT / always-ask
function evaluateDispatch(req: DispatchRequest): Promise<DispatchDecision>;

// queued action (svc record) -------------------------------------------
interface QueuedAction {
  id: string; state: "queued" | "released" | "discarded" | "expired";
  request: DispatchRequest;                   // verbatim args
  attribution: F3AuditTriple;                 // user, via, credential
  createdAt: string; expiresAt: string;
  resolution?: { by: string; at: string; rememberedPattern?: string };
}

// review item (projection; server-composed) ----------------------------
interface ReviewItem {
  id: string;
  kind: "queued-action" | "staged-change" | "merge-conflict"
      | "capability-request";                 // install | jit | ask | draft
  shell: {                                    // invariant 6: trusted chrome
    who: { user: string; app?: string; profile?: string };
    capability?: string; resource?: string; effect?: Effect;
    credential?: { level: CredentialLevel; label: string };
    decisions: Array<"approve" | "deny" | "release" | "discard"
      | "resolve" | "answer">;
  };
  widget?: { path: string; data?: unknown };  // NotificationRecord shape
  payloadFallback: unknown;                   // generic card body
  expiresAt?: string;
}
```

State machine — QueuedAction: `queued → released` (execute once, terminal),
`queued → discarded` (terminal), `queued → expired` (terminal, never
executes). ReviewItem has no state of its own; it mirrors its source.

Resource extraction: each namespace maps args → canonical resource URL
(generated providers: the rendered `routeTemplate` + host; handwritten:
per-tool extractor beside the effect annotation). No extractor ⇒ the
action is treated as resource-less and matches only `resourcePattern:
null` grants (fail closed).

## Risks / Trade-offs

- [Two-repo lockstep: workspace enforcement needs regenerated `@utdk/*`
  metadata] → strict publish-before-pin sequence (below); until the pin
  bump, unclassified tools default to `action`, which is safe (fail
  closed) but noisy — gate UI rollout on the pin, not the reverse.
- [Queue-instead-of-fail surprises workflow authors] → `queue` decisions
  return the queuedActionId and the run transcript records "queued";
  docs + the review surface make the state visible; observations never
  queue.
- [Resource extraction gaps make everything resource-less] → CI
  completeness gate counts extractor coverage per namespace alongside the
  effect gate; fail-closed default means a gap narrows, never widens,
  authority.
- [Grant-check latency at dispatch (storage join per call)] → mirror the
  profile-grants single-indexed-join approach; cache per
  (workspace, principal) with invalidation on the same events that
  invalidate the tool-list cache.
- [Widget sandbox escape spoofs approvals] → invariant 6 enforced
  structurally: shell renders from the server `ReviewItem.shell` only;
  widget output never feeds the decision payload; widget-originated
  calls re-enter `evaluateDispatch`.

## Rollout — Repo split & publish sequence

Two repos, one direction: **registry lands and publishes first; aprovan
pins and enforces second.** (IW-9 cross-repo rules 1–4.)

**Registry repo (phase R):**
1. R1 `packages/bundler`: derive `effect` from retained
   `http_method` (`client-api.ts` ToolRuntimeMetadata; fail-closed
   default), emit in generated metadata + resource template exposure.
2. R2 regenerate `@utdk/*` provider packages so published metadata
   carries `effect` (regen tooling, no per-provider hand edits).
3. R3 `packages/registry-server`: `resource_grants` storage
   (sqlite + dsql), `matchesResourcePattern`, row types; wire resource
   checks into its own MCP/sandbox dispatch (extends grant-enforcement
   streams 4–5, same single predicate).
4. **Publish**: `@utdk/*` (regen) and `@aprovan/registry-server`
   (minor bump on the `^0.2.x` line, ≥ current `0.2.10`; never
   0.2.4–0.2.6).

**Aprovan repo (phase A, only after the publish):**
5. A1 pin bumps in `server/workspace/package.json`
   (`@aprovan/registry-server`, regenerated `@utdk/*`) — separate
   commit, no behavior change.
6. A2 `grants.ts` `evaluateDispatch` + wiring all four dispatch paths;
   `profile-grants.ts` exposes its matched tool-pattern set (not just a
   boolean) so `evaluateDispatch` can compose profile narrowing into the
   intersection (invariant 2) instead of `authorize.ts`'s
   `profileGrantAllows` boolean short-circuit; delete/inline
   `mayInvokeTool` and redundant checks (grep-gate both repos);
   Permissions-table (`permissions.ts`, APR-320) migration.
7. A3 queue + cards + `ask` + derived-authority hooks (server).
8. A4 review surface UI + notifications retrofit + install/JIT cards
   (client); `routes/tools.ts` grant-visibility edits land only after
   iw9-a's schema changes (serialization rule).

Rollback: A-phase is feature-flagged at the predicate seam —
`evaluateDispatch` can report-only (log decision, enforce legacy) per
workspace; registry publishes are additive metadata and new storage,
safe to leave deployed. Migration of Permissions rows is
forward-copy + dual-read until the grep-gate task deletes the legacy
path.

## Open Questions

None beyond the two parameter choices in the PRD (queue expiry window;
migration timing — both with recommendations). All structural questions
are settled by IW-9 (D9/D12/D13/D15, invariants 1/2/3/4/6/11).

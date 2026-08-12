# Tasks — iw9-c-capability-approval

External dependencies (must be landed on the branch this stream builds from
— none of these are built here):

- **iw9-f3 `credential-levels`**: `CredentialLevel`, `ResolvedCredential`,
  `CredentialNotConnectedError` exported from `@aprovan/registry-server`;
  `AuditEntry`'s six attribution fields in aprovan `audit.ts`. This stream's
  `evaluateDispatch` and `QueuedAction`/`ReviewItem` attribution consume
  these shapes verbatim (tech-plan Interfaces & Data).
- **iw9-f4 `app-identity`**: platform-assigned `appId` (ULID) — grants key
  on `appId`, not on the mutable app slug.
- **iw9-b `app-model-app-centric`**: `app.yaml` loader with capability
  declaration fields — the install card reconciles static analysis against
  these.
- **iw9-d `agent-loop-server`**: `RunEvent` union in
  `@aprovan/agent-protocol` with `pending_action` already reserved (never
  emitted there) and the run resume/reattach extension point — this
  stream's JIT card is the first producer of `pending_action`.
- **iw9-a `app-vcs-consolidation`**: its `routes/tools.ts` VCS tool-schema
  edits (lines ~278-380, `vcs.commit/log/diff` scope args) land before this
  stream's dispatch/audit-region edits in the same file (serialization
  rule, IW-9 doc "Serialization rules").

Two checkouts side by side: `aprovan/` =
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`, `registry/` =
`/Users/jacob/Documents/Code/AprovanLabs/registry`. Cross-repo consumption
is ONLY via published npm packages (tech-plan "Rollout — Repo split &
publish sequence"; IW-9 cross-repo rules 1-2) — never import sources across
repos, never skip a publish step. `@aprovan/registry-server` pin must land
on `^0.2.7` or later. New tests go in new files; do not extend existing
test files. Grep-gates in the "Done" line of every deletion task run in
**both** repos regardless of which repo the deletion happened in (IW-9
cross-repo rule 4).

## 1. Registry — effect classification: bundler derivation

> Depends-on: - | Repo: registry | Touches: registry/packages/bundler/src/client-api.ts, registry/packages/bundler/src/openapi.ts, registry/packages/bundler/src/client-api.test.ts, registry/packages/bundler/src/openapi.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/utdk-bundler test

- [x] 1.1 Add `export type Effect = "observation" | "action"` and a pure
      `effectFromHttpMethod(method: string | undefined): Effect` to
      `client-api.ts` (GET/HEAD → `observation`; everything else,
      including an unrecognized/missing method, → `action` — fail closed).
      Spec: effect-classification "Generated providers derive effect from
      HTTP method", "Missing method fails closed" (tech-plan D1).
- [x] 1.2 Add `effect: Effect` to `ToolRuntimeMetadata`
      (`client-api.ts:15`) and populate it at both derivation sites
      (`client-api.ts:154-155` and the render path `:708-709`); mirror the
      same extraction in `openapi.ts:138-139`.
- [x] 1.3 Tests: GET operation → `observation`; POST/PUT/PATCH/DELETE →
      `action`; a template with no `http_method` → `action` (spec
      scenarios "GET tool is an observation", "POST tool is an action",
      "Missing method fails closed").

## 2. Registry — effect classification: handwritten provider annotations

> Depends-on: - | Repo: registry | Touches: registry/packages/utdk/agent/**, registry/packages/utdk/cloudflare/**, registry/packages/utdk/databricks/**, registry/packages/utdk/deepgram/**, registry/packages/utdk/fly/**, registry/packages/utdk/google/**, registry/packages/utdk/llm/**, registry/packages/utdk/postgres/**, registry/packages/utdk/s3/**, registry/packages/utdk/sandbox/**, registry/packages/utdk/snowflake/**, registry/packages/utdk/sql/**, registry/packages/utdk/sqs/**, registry/packages/utdk/vcs/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/clients check-types && pnpm --filter @utdk/clients build

- [x] 2.1 For each handwritten (non-OpenAPI-generated) provider under
      `packages/utdk/*` — agent, cloudflare, databricks, deepgram, fly,
      google, llm, postgres, s3, sandbox, snowflake, sql, sqs, vcs — add
      an explicit `effect: "observation" | "action"` on every tool
      definition (read/list/get operations → `observation`; anything
      mutating → `action`). Spec: effect-classification "Handwritten
      providers and core services are annotated".
- [x] 2.2 Grep every handwritten provider's tool list for a missing
      `effect` field before finishing this stream — a hole here silently
      falls back to `action` at dispatch (fail-closed, but noisy for
      reviewers); leave none.

## 3. Registry — resource grants: storage, matcher, dispatch enforcement

> Depends-on: - | Repo: registry | Touches: registry/packages/registry-server/src/storage/**, registry/packages/registry-server/src/dispatch/**, registry/packages/registry-server/src/mcp/sandbox-tool.ts, registry/packages/registry-server/src/index.ts, registry/packages/registry-server/src/dispatch/__tests__/resource-grants.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-server test -- resource-grants

- [x] 3.1 Add a `resource_grants` store beside `profile_grants` in
      `storage/*` (sqlite + dsql drivers, same seam) with the
      `ResourceGrantRow` shape from tech-plan "Interfaces & Data"
      (`id, tenantId, subject{kind,id}, capability, resourcePattern,
      credentialLevel, grantedBy, createdAt, revokedAt?`). Spec:
      resource-grants "Grants are keyed by capability and resource
      pattern" (tech-plan D2).
- [x] 3.2 Implement `matchesResourcePattern(pattern, resource): boolean`
      (~100 LOC, cf. Cloudflare OS `matchesResourceUrlPattern`): literal
      segments, `*` single-segment wildcard, `**`/trailing-`*` suffix
      wildcard, case-insensitive host, no regex, no network I/O, pure.
      Spec: resource-grants "URL-pattern matcher", scenarios "Wildcard
      host segment", "No partial-segment match".
- [x] 3.3 Export `ResourceGrantRow`, `matchesResourcePattern`, and CRUD on
      the new store from `packages/registry-server/src/index.ts` — this
      is the contract aprovan's `evaluateDispatch` (stream 8) and the
      client-side `ResourcePatternInput` preview (stream 13) both build
      against.
- [x] 3.4 Wire resource-pattern checks into registry-server's own
      MCP/sandbox dispatch (`mcp/sandbox-tool.ts`), extending
      `grant-enforcement` streams 4-5's single predicate rather than
      adding a second one. Spec: resource-grants "One dispatch
      chokepoint" (registry-side half — aprovan's four dispatch paths are
      stream 8).
- [x] 3.5 New test file `dispatch/__tests__/resource-grants.test.ts`:
      matcher scenarios above, resource-grant row CRUD round-trip,
      MCP/sandbox dispatch denies a resource outside the pattern and
      allows one inside it.

## 4. Registry — regenerate @utdk/* provider packages

> Depends-on: 1 | Repo: registry | Touches: registry/packages/utdk/**/metadata.ts, registry/packages/utdk/**/package.json, registry/packages/utdk/**/CHANGELOG.md | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/utdk-bundler generate && pnpm --filter @utdk/clients build && grep -L '"effect"' packages/utdk/github/metadata.ts packages/utdk/anthropic/metadata.ts packages/utdk/asana/metadata.ts | wc -l | grep -qx 0

- [x] 4.1 Run the bundler regen across every OpenAPI-generated provider
      under `packages/utdk/*` so published tool metadata carries `effect`
      from stream 1's derivation — no per-provider hand edits (spec:
      "the derivation happens in the registry bundler at generation time
      so the published package carries the effect; consumers SHALL NOT
      re-derive it").
- [x] 4.2 Spot-check a representative sample (a GET-heavy provider like
      `github`, a POST-heavy one, and one with mixed methods) for effect
      correctness against their OpenAPI operations.
- [x] 4.3 Regen tooling's own version-bump/CHANGELOG output stands as the
      per-provider changelog entry; no manual authorship needed.

## 5. Registry — publish @utdk/* and @aprovan/registry-server

> Depends-on: 2, 3, 4 | Repo: registry | Touches: registry/packages/utdk/**/package.json, registry/packages/registry-server/package.json, registry/packages/registry-server/CHANGELOG.md | Verify: npm view @aprovan/registry-server version && npm view @utdk/github version

- [ ] 5.1 Publish every regenerated/annotated `@utdk/*` provider package
      (streams 2 and 4) to npm — additive metadata field only, no
      breaking change.
- [ ] 5.2 Minor-bump and publish `@aprovan/registry-server` (stream 3's
      resource-grants storage/matcher/dispatch export — additive), on the
      `^0.2.x` line, strictly above current `0.2.10` (never re-publish
      into the deprecated-broken `0.2.4-0.2.6` range). Publish before pin
      (IW-9 cross-repo rule 2) — no aprovan-side task in this stream may
      start until this publishes.

## 6. aprovan — dependency pin bump

> Depends-on: 5 | Repo: aprovan | Touches: aprovan/server/workspace/package.json, aprovan/pnpm-lock.yaml | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && grep -n "@aprovan/registry-server" server/workspace/package.json && pnpm --filter @aprovan/workspace check-types

- [x] 6.1 Bump `@aprovan/registry-server` to the version published in 5.2
      (must stay `^0.2.7`-or-later) in its own commit, no behavior
      change; add `@utdk/remote` (already published at `0.1.4`, used
      today by `packages/editor`/`packages/compiler`) as a new
      `server/workspace` dependency — it supplies `scanToolsAccess` for
      the install-card static analysis in stream 10.
- [x] 6.2 Bump the regenerated `@utdk/*` provider packages actually used
      by `server/workspace` (github, anthropic, etc. — whichever the
      workspace already pins) to their stream-4/5 versions.
- [x] 6.3 `pnpm install`; confirm the workspace typechecks against the new
      exports (`Effect`, `ResourceGrantRow`, `matchesResourcePattern`)
      before any aprovan C code lands. Until this pin lands, `evaluateDispatch`
      does not exist yet — no behavior changes in this commit.

## 7. aprovan — effect wiring on the tool list + core-service annotations + CI gate

> Depends-on: 6 | Repo: aprovan | Touches: aprovan/server/workspace/src/routes/tools.ts (ToolEntry + discovery functions only, not the invoke handler), aprovan/server/workspace/src/service-kernel.ts, aprovan/server/workspace/src/platform-plugins.ts, aprovan/server/workspace/src/apps/service.ts, aprovan/server/workspace/scripts/check-effect-completeness.ts, aprovan/server/workspace/tests/effect-classification.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- effect-classification && tsx server/workspace/scripts/check-effect-completeness.ts

- [x] 7.1 Add `effect: Effect` to `ToolEntry` (`routes/tools.ts:84-96`)
      and `ServiceToolEntry` (`service-kernel.ts:135-143`); thread it
      through `deriveToolEntries`, `catalogToolEntries`, and every core
      service's static `tools` export (starting with `platform-plugins.ts`
      and `apps/service.ts`) so `GET /tools` surfaces it end to end. Spec:
      effect-classification "Effect is visible on the wire".
- [x] 7.2 Annotate every core-service tool entry with an explicit
      `effect` (read/list/get → `observation`; everything else →
      `action`); an entry with neither an annotation nor a derivable
      method defaults to `action` at dispatch (fail closed). Spec:
      "Handwritten providers and core services are annotated",
      "Unannotated tool fails the completeness gate".
- [x] 7.3 New script `scripts/check-effect-completeness.ts`: builds the
      full tool list for a representative workspace and fails (naming the
      tool) if any entry lacks `effect` and has no derivable method; wire
      it into `pnpm --filter @aprovan/workspace check-types` or an
      equivalent pre-merge step.
- [x] 7.4 New test file `tests/effect-classification.test.ts`: tool list
      entries all carry `effect`; a `github.*` GET tool's effect matches
      the bundler-derived value from the pinned package; an observation
      call inside a granted namespace executes without any resource-grant
      check (spec scenario "Observation inside a granted namespace" —
      exercised here as a routing assertion, full behavior lands in
      stream 8).

## 8. aprovan — evaluateDispatch: the one predicate + all dispatch paths

> Depends-on: 7 | Repo: aprovan | Touches: aprovan/server/workspace/src/grants.ts, aprovan/server/workspace/src/profile-grants.ts, aprovan/server/workspace/src/authorize.ts, aprovan/server/workspace/src/routes/tools.ts (invoke handler region only, :850-1340 — after iw9-a's schema edits there), aprovan/server/workspace/src/agents/runner.ts, aprovan/server/workspace/src/apps/capabilities.ts, aprovan/server/workspace/src/native-dispatch.ts, aprovan/server/workspace/src/permissions.ts, aprovan/server/workspace/tests/evaluate-dispatch.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- evaluate-dispatch && grep -rn "mayInvokeTool\|assertAllowedTools\|toolGranted" server/workspace/src --include="*.ts" | grep -v "\.test\.ts"

- [x] 8.1 Confirm iw9-a's `routes/tools.ts` VCS tool-schema edits
      (`vcs.commit/log/diff` scope args, ~lines 278-380) are already
      landed on the branch before touching the dispatch/audit region of
      this file (serialization rule) — this task is a no-op check, not
      code.
- [x] 8.2 Rewrite `grants.ts` around `evaluateDispatch(req:
      DispatchRequest): Promise<DispatchDecision>` per tech-plan
      "Interfaces & Data": inputs `(principal, appOrProfile, tool+effect,
      resource, credentialLevel)`; outputs `allow | deny | queue | ask`.
      Observations skip resource/queue checks entirely (spec
      effect-classification "Observations never require action
      approval"). Spec: resource-grants "One dispatch chokepoint",
      "Grants intersect, never union", "Approval follows the credential".
- [x] 8.3 `profile-grants.ts` grows an export that returns the invoker's
      matched tool-pattern set for a profile (not just
      `profileGrantAllows`'s boolean) so `evaluateDispatch` can compose
      it into the three-way intersection (invoker grants ∩ app ceiling ∩
      profile narrowing — invariant 2); `authorize.ts`'s
      `profileGrantAllows` becomes a thin wrapper over the new export or
      is inlined into `evaluateDispatch`.
- [x] 8.4 Wire all four dispatch paths to call `evaluateDispatch` and
      delete/inline their old gates: `routes/tools.ts` invoke handler
      (replaces `mayInvokeTool` at :1052), `agents/runner.ts` (replaces
      `toolGranted` import at :74), `apps/capabilities.ts`
      (`assertAllowedTools` :267, `contractGrantCallable` :417,
      `providerGrantCallable` :448 delegate to or are replaced by the
      predicate), `native-dispatch.ts` (`dispatchAprovanNativeOp` :402).
      Spec scenario: "Hidden namespace unreachable from every path",
      "Admin is not exempt from resource grants for apps".
- [x] 8.5 Migrate `permissions.ts` (APR-320 direct grant rows) into the
      unified model: existing direct grants resolve through
      `evaluateDispatch` (as capability-only, any-resource grants written
      once at migration, never as a parallel system); `authorize.ts`'s
      `getPermissionStore().check` call is deleted once the migration
      path is proven. Spec: resource-grants "Direct permission rows
      migrate into the grant model", scenario "Legacy grant still works".
- [x] 8.6 New test file `tests/evaluate-dispatch.test.ts`: an
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
- [x] 8.7 Grep gate (both repos): no remaining callers of
      `mayInvokeTool`, `assertAllowedTools` as a standalone gate, or
      `toolGranted` outside `evaluateDispatch`'s own implementation and
      its tests, in aprovan `server/workspace/src`; no equivalent
      bypass of registry-server's resource-pattern dispatch in
      `registry/packages/registry-server/src` (verify command above
      covers the aprovan half; run the registry-side grep manually as
      part of this task since it is a different repo root).

## 9. aprovan — action exception queue

> Depends-on: 8 | Repo: aprovan | Touches: aprovan/server/workspace/src/action-queue.ts, aprovan/server/workspace/src/grants.ts (queue-decision branch only), aprovan/server/workspace/tests/action-queue.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- action-queue

- [x] 9.1 New module `action-queue.ts`: `QueuedAction` persisted as an
      `svc#` record (`svcScope("actions", "queue")`, the `agents/
      runner.ts` `RUNS_SCOPE` precedent) with lifecycle `queued →
      released | discarded | expired` (terminal, no further
      transitions). Spec: action-exception-queue "Out-of-grant actions
      queue", "Queued actions expire" (default 7 days, PRD Open Question
      1 resolved this way).
- [x] 9.2 `evaluateDispatch`'s `queue` decision (stream 8) calls into
      `action-queue.ts` to persist the record and returns
      `{ kind: "queue", queuedActionId }`; a capability-level denial
      (namespace not granted at all) never queues — it denies or raises a
      JIT card (stream 10). Spec scenario: "Resource miss queues",
      "Namespace miss does not queue".
- [x] 9.3 Chain semantics: expose `queueForChain(runId, resultDependent):
      { queuedActionId }` so the caller (agents/runner.ts, wired in
      stream 10) can tell fire-and-forget from result-dependent chains and
      decide whether to continue the turn or end it with "queued N
      actions". Spec: "Chain semantics", scenarios "Fire-and-forget
      continues", "Result-dependent ends turn".
- [x] 9.4 `release(id, reviewerId, rememberPattern?)`: executes the
      original args verbatim exactly once via `evaluateDispatch`'s allow
      path, marks the record terminal, and — if `rememberPattern` is set
      — writes a `ResourceGrantRow` through the standard grant path (the
      published matcher from registry stream 3). A second release attempt
      on a terminal record is a no-op error. `discard(id, reviewerId)`:
      marks terminal, no execution, no undo. Spec: "Release and discard",
      scenarios "Release executes once", "Release with remember".
- [x] 9.5 Every transition (queued/released/discarded/expired) carries
      the F3 attribution triple and writes an audit row via `audit.ts`.
      Spec: "Queue rows carry full attribution", scenario "Attribution
      survives release".
- [x] 9.6 New test file `tests/action-queue.test.ts`: full lifecycle
      round-trip, double-release is a no-op error, expiry after the
      configured window discards without executing, remember-pattern
      release writes a grant that later dispatches match directly,
      attribution triple present on every transition's audit row.

## 10. aprovan — capability-approval-flow: install card, JIT cards, ask, always-ask

> Depends-on: 8, 9 | Repo: aprovan | Touches: aprovan/server/workspace/src/capability-cards.ts, aprovan/server/workspace/src/agents/runner.ts (pending_action emission + resume only), aprovan/server/workspace/src/apps/install.ts, aprovan/server/workspace/src/workflows/invoke.ts (ask step only), aprovan/server/workspace/tests/capability-cards.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- capability-cards

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

## 11. aprovan — derived authority: runtime resolution + cascading revocation

> Depends-on: 8 | Repo: aprovan | Touches: aprovan/server/workspace/src/derived-authority.ts, aprovan/server/workspace/src/routes/tools.ts (invalidateToolListCache call sites only, :112-113), aprovan/server/workspace/src/credentials.ts (revoke hook only), aprovan/server/workspace/tests/derived-authority.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- derived-authority

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

## 12. aprovan — review surface API + notifications retrofit (server)

> Depends-on: 9, 10 | Repo: aprovan | Touches: aprovan/server/workspace/src/review-surface.ts, aprovan/server/workspace/src/notifications/service.ts, aprovan/server/workspace/tests/review-surface.test.ts | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- review-surface

- [x] 12.1 New module `review-surface.ts`: a projection API composing
      queued actions (stream 9), staged session changes (iw9-a's
      answerable sessions), merge conflicts, and capability requests
      (install/JIT/ask/draft cards from stream 10) into one `ReviewItem`
      list per tech-plan's shape, filterable by kind, with a combined
      badge count. New decision kinds are added as item kinds of this
      surface, never a new surface. Spec: review-surface "One surface,
      four item kinds", scenario "Mixed queue in one list".
- [x] 12.2 `ReviewItem.shell` is built server-side only from the
      authoritative request data (who, capability, resource, credential
      level, effect, available decisions); `widget` carries only the
      app-supplied payload path/data. A widget-originated call re-enters
      `evaluateDispatch` — it never gets to assert its own authority.
      Spec: "Shell renders the decision, widget renders only the
      payload", scenarios "Widget cannot spoof the shell", "Payload edit
      re-renders shell", "No widget, generic card".
- [x] 12.3 Retrofit `notifications/service.ts`'s existing
      `NotificationRecord.widget` (`:66`) onto the same shell/widget
      split and the same sandbox host as review items; `choices` render
      in the shell, not the widget; preserve the existing constraint that
      apps may only embed calls they can make themselves (now enforced by
      `evaluateDispatch` on widget-originated calls, not a separate
      check). Spec: "Notifications adopt the shell/widget split", scenario
      "Notification widget is sandboxed like a review widget".
- [x] 12.4 Route each item to the queue of the principal with authority
      to decide it: workspace-credential grants → admins; user-credential
      and own-run approvals (`ask`, JIT) → the invoker (D15); a user is
      never shown a decision they cannot make except read-only admin
      visibility. Spec: "Decisions route to the holder of authority",
      scenarios "Run approval goes to invoker", "Workspace grant goes to
      admins".
- [x] 12.5 New test file `tests/review-surface.test.ts`: one queued
      action + one staged change + one JIT request produce a combined
      list with badge count 3, filterable by kind; a widget claiming a
      different capability than the request does not change the shell
      header or what the approve button acts on; an edited payload
      re-renders the shell summary before approval; a notification
      widget's out-of-grant call is rejected by the dispatch predicate; a
      member's `ask` lands in their own queue, not an admin's; a
      workspace-credential request lands for admins only.

## 13. aprovan — client: review surface, install card, JIT cards (widget-payload split)

> Depends-on: 12 | Repo: aprovan | Touches: aprovan/client/web/src/features/review-surface/**, aprovan/client/web/src/features/capability-cards/**, aprovan/client/web/src/features/notifications/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web test -- review-surface

- [x] 13.1 `PayloadWidgetHost`: sandboxed iframe host reused by review
      items and notifications (extends, does not duplicate, the existing
      notification widget sandbox); on widget failure to mount/compile,
      falls back to the generic payload card silently — the decision
      buttons stay live either way. ux.md "JIT card" states
      "widget-failed", "Notification card" states "widget-failed".
- [x] 13.2 `ReviewItemShell`: renders only from server-supplied
      `ReviewItem.shell` (who/capability/resource/effect/credential +
      decision buttons); re-renders on a widget payload-edit event before
      any decision button is enabled to act (invariant 6 structural
      enforcement on the client). ux.md "Review surface" screen.
- [x] 13.3 `CredentialLevelBadge` + shell sentence: implement the three
      fixed strings and distinct badge treatment from ux.md "Credential-
      level copy rules" (`workspace-token`/`workspace-oauth` = "Workspace
      bot"/"Workspace secret"; `user-oauth` = "Your account"); a
      `CredentialNotConnectedError` from the server renders the "Connect
      your account to let this continue as you" prompt, never a bare
      "connect a credential".
- [x] 13.4 Install card: capability rows with effect + credential-level
      badges, undeclared/unused flags, "Send to admins" path when the
      confirming user cannot approve a workspace-level credential, and
      the "resources come later" note (ux.md "Install card"). JIT card:
      inline transcript slot (iw9-d's card slot) + review-surface
      duplicate, Allow once / Allow pattern (with matcher-validated
      coverage preview via the published `matchesResourcePattern`) / Deny
      (ux.md "JIT card").
- [x] 13.5 Review surface panel: kind filter tabs with counts, item
      list/detail, bulk release/discard restricted to a single (app,
      capability) group, expiry countdown under 24h, revocation
      blast-radius confirm dialog (ux.md "Review surface", "Revocation
      cascade visibility").
- [x] 13.6 Component/integration tests covering: shell summary re-render
      on widget edit before the approve action fires; generic-card
      fallback on widget mount failure; credential badge renders the
      correct fixed string per level; bulk actions disabled across mixed
      groups.

## 14. Both repos — grep-gate cleanup and definition of done

> Depends-on: 8, 9, 10, 11, 12, 13 | Repo: both | Touches: aprovan/server/workspace/src/**, registry/packages/registry-server/src/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && ! grep -rn "mayInvokeTool\|assertAllowedTools\b" server/workspace/src --include="*.ts" | grep -v "\.test\.ts" && cd /Users/jacob/Documents/Code/AprovanLabs/registry && ! grep -rn "legacyDispatch\|bypassResourceCheck" packages/registry-server/src --include="*.ts"

- [ ] 14.1 aprovan: confirm zero remaining callers of `mayInvokeTool`,
      `assertAllowedTools` as a standalone authorization gate, and
      `getPermissionStore().check` outside the migrated `evaluateDispatch`
      path (MIGRATION-DEBT rule — "delete X is not done until grep
      returns nothing").
- [ ] 14.2 registry: confirm registry-server's own MCP/sandbox dispatch
      has no remaining resource-check bypass predating stream 3's single
      predicate.
- [ ] 14.3 Update `AGENTS.md` (both repos, if not already covered by F6)
      to note the one-predicate rule for capability + resource dispatch,
      so a future addition does not reintroduce a fifth gate.
- [ ] 14.4 Full-suite run in both repos
      (`pnpm --filter @aprovan/workspace test`, `pnpm --filter
      @aprovan/patchwork-web test`, `pnpm --filter @aprovan/registry-server
      test`) as the final gate before `openspec archive`.

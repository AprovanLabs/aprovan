# Tasks — iw9-chat-flagship

External dependencies (IW-9-APP-FIRST.md "Cross-repo coordination" and Wave
graph): **iw9-f2-shared-partition** and **iw9-f5-broker-spec** are complete —
this change codes directly against their frozen "Interfaces & Data" contracts
(`apps/instances.ts`, `assertInstanceAccess`, `resolveRecordScope`;
`RealtimeBroker`/`NamespaceHandler`/`NamespaceStore`, async `onSubscribe`,
sync `authorize?`). **iw9-b-app-model** and **iw9-d-agent-loop-server** are
in progress — streams 4 and 5 below block on their landed shapes (`app.yaml`
loader/install flow, `agents.run`); do not start 4/5 until those land, and
re-check tech-plan.md finding CF-5 before starting stream 5. **iw9-c** is
parallel — no stream here depends on it; grant/approval cards render
automatically through the platform if it lands mid-change (prd Non-Goals).

Repo: **aprovan only** for every stream (brief's cross-repo table: Chat =
"app code + client"; no registry package work, no publishes). Verify
commands run from the aprovan repo root. Every "delete/no core touch beyond"
claim is grep-gated per the MIGRATION-DEBT definition of done. Findings
CF-1..CF-5 and decisions T1..T7 are tech-plan.md section references; spec
names below are `openspec/changes/iw9-chat-flagship/specs/<capability>/spec.md`.

## 1. Chat data model and channel authorization helper

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/chat/schema.ts, aprovan/server/workspace/src/apps/chat/service.ts, aprovan/server/workspace/src/apps/chat/authz.ts, aprovan/server/workspace/tests/chat-data-model.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/chat-data-model.test.ts && pnpm --filter @aprovan/workspace typecheck

- [x] 1.1 Define `Channel` and `Message` zod schemas exactly as specified in
      tech-plan.md "Interfaces & Data" (`ch#<channelId>`,
      `msg#<channelId>#<messageId>` ULID keys, `parentId` for one-level
      threads, `agent` marker field) in `apps/chat/schema.ts`.
- [x] 1.2 Implement channel/message CRUD against F2's shared partition via
      `resolveRecordScope(ctx, { instance })` (iw9-f2 frozen seam) —
      `createChannel`, `postMessage` (rejects `parentId` pointing at a
      message that itself has a `parentId` — spec `chat-app` "Thread nesting
      is bounded"), `listChannels`, `fetchWindow`/`fetchOlder` by
      `createdAt`/id ordering.
- [x] 1.3 Implement `canReadChannel(principal, installId, channelId)` in
      `apps/chat/authz.ts`: public channel ⇒ any F2 instance participant
      (via `assertInstanceAccess`); restricted channel ⇒ participant is also
      in the channel's `members` list. This is the ONE authz function T3
      commits to sharing between the read path (this stream) and CF-1's
      delivery filter (stream 2) — export it, do not duplicate it.
- [x] 1.4 Enforce deny-as-404 for non-participants and non-members
      (spec `chat-app` "Non-participant cannot read instance data",
      "Restricted channel hides from non-members" — invariant 8 posture, no
      existence oracle).
- [x] 1.5 New test file `tests/chat-data-model.test.ts`: attributed message
      write, thread-reply-of-reply rejected, restricted channel invisible to
      non-members, non-participant 404 on every read/write surface,
      `canReadChannel` unit-covered for public/restricted/non-member/
      non-participant/guest-with-partial-grant cases (feeds stream 2's reuse
      claim).

## 2. CF-1 — App-scoped realtime handler (core touch)

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/realtime/app-topics.ts, aprovan/server/workspace/tests/realtime-app-topics.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/realtime-app-topics.test.ts && pnpm --filter @aprovan/workspace typecheck

- [x] 2.1 Create `realtime/app-topics.ts`: one generic `NamespaceHandler`
      registered at boot, namespace `app`, topic grammar `app:<installId>`
      (tech-plan Architecture, finding CF-1). `onSubscribe` (async, per
      iw9-f5's frozen contract) calls `assertInstanceAccess` and returns the
      channel list + presence roster snapshot as the subscribe body.
- [x] 2.2 Implement the sync `authorize?(conn, topic)` hook (iw9-f5 D4) by
      resolving the event's `channelId` from the topic's per-connection
      cached subscribe state and calling stream 1's `canReadChannel` —
      **the same function**, not a reimplementation (spec `chat-realtime`
      "Authorization re-applied at fan-out"). Cache only what F5's D4
      requires to answer synchronously (channel membership snapshot in the
      handler's `NamespaceStore`, invalidated on channel-membership events).
- [x] 2.3 Wire `onPublish` for message posts (persists via stream 1's
      `postMessage`, then `publishToTopic` with `{kind:"message", channelId,
      recordId, seq}` — payload is a hint per T4, not the message body) and
      `{kind:"channel-membership"}` events on the priority class (iw9-f5 D5:
      control-channel path, undroppable).
- [x] 2.4 Ephemeral presence/typing sub-protocol (T5) inside the same
      handler, modeled on `realtime/presence.ts`'s pattern but reached via
      `broker.storeFor(workspaceId, "app")` (iw9-f5 D2 — broker-owned store,
      no handler-closure state): instance roster + channel-scoped typing,
      typing events on the droppable/non-priority class. No write to
      `records.*`/`vfs.*` anywhere in this file — grep-verifiable (PRD
      "Presence visible" goal).
- [x] 2.5 New test file `tests/realtime-app-topics.test.ts`: subscribe
      returns channel+presence snapshot for a participant, 404-equivalent
      rejection for a non-participant, guest never receives an event for a
      restricted channel they're not a member of (flip `canReadChannel` mid-
      stream and assert no delivery — invariant 7, mirrors iw9-f5's own
      "stale-subscription-confers-nothing" test shape), typing/presence
      round-trip with zero calls into `records.*`/`vfs.*` (assert via a
      spy/mock on those modules), channel-membership event delivered on the
      priority path even with the event queue saturated.

## 3. CF-2 — Instance-targeted guest invites (core touch)

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/src/invites.ts, aprovan/server/workspace/src/identity/types.ts, aprovan/server/workspace/src/identity/store.ts, aprovan/server/workspace/src/routes/invites.ts, aprovan/server/workspace/tests/invites-app-instance-target.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/invites-app-instance-target.test.ts tests/invites.test.ts && pnpm --filter @aprovan/workspace typecheck

- [ ] 3.1 Extend `InviteRecord` (`identity/types.ts`) with optional
      `target?: { kind: "app-instance"; installId: string; channelIds?:
      string[] }` (tech-plan CF-2 shape). Absent target ⇒ byte-identical
      existing behavior — no change to any call site that doesn't pass one.
- [ ] 3.2 Extend `createInvite`/the identity store's invite `create` to
      accept the optional `target`, and `consumeInvite`'s consume path: when
      `target.kind === "app-instance"`, mint an F2 participant entry
      (`apps/instances.ts` `addParticipant`, role `guest`, scoped to
      `channelIds` if given) instead of a workspace membership (spec
      `chat-guest-access` "Guest invites via existing invite machinery").
      When absent, today's `consume → membership` path is untouched.
- [ ] 3.3 `routes/invites.ts`: accept the optional target on invite-create,
      keep the 7-day TTL and single-use-on-consume semantics unchanged
      (spec "Invite is single-use and expiring").
- [ ] 3.4 New test file `tests/invites-app-instance-target.test.ts`: targeted
      invite consume mints exactly one F2 participant entry with role
      `guest` and zero workspace membership rows; consumed/expired token
      fails distinguishably with no participation created; revoke makes the
      token non-consumable; existing non-targeted invite tests
      (`tests/invites.test.ts`) still pass unmodified — the regression gate
      tech-plan's Risks section requires.

## 4. Chat app definition — `app.yaml`, host modes, capability ceiling

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/Apps/chat/app.yaml, aprovan/Apps/chat/README.md, aprovan/server/workspace/tests/chat-app-manifest.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/chat-app-manifest.test.ts

- [x] 4.1 Author `Apps/chat/app.yaml` against iw9-b's landed `app.yaml`
      grammar (F4): slug `chat`, icon, `hostModes: [workspace-managed,
      hosted-by-creator]`, capability ceiling limited to own-partition
      `records.*`, own-topic `realtime` subscribe/publish (`app:<installId>`
      from stream 2), instance-scoped `invites` issue (stream 3), and
      `agents.run` for the `chat/summarize` profile (stream 5) — spec
      `chat-app` "Single manifest, two host modes".
- [x] 4.2 Confirm (do not implement — iw9-b's job) that installing with two
      declared host modes triggers the mode-choice prompt and that the
      chosen mode lands on the install record as immutable; if iw9-b's
      landed install flow does NOT yet prompt for >1 mode, file that gap as
      a blocking note here rather than building a Chat-local install-flow
      workaround (tech-plan "Platform-first with explicit findings").
- [x] 4.3 New test file `tests/chat-app-manifest.test.ts`: `app.yaml` parses
      against iw9-b's loader/validator with no errors, capability ceiling
      matches the declared list exactly (no wildcard grants), both host
      modes present.

## 5. `chat/summarize` agent profile

> Depends-on: 1, 4 | Repo: aprovan | Touches: aprovan/Apps/chat/agents/summarize.ts, aprovan/server/workspace/tests/chat-summarize-agent.test.ts | Verify: pnpm --filter @aprovan/workspace exec vitest run tests/chat-summarize-agent.test.ts

- [ ] 5.1 Before starting: verify **`iw9-d-agent-loop-server` stream 10
      ("App-scoped agent profiles (CF-5)") has landed** — it is the assigned
      owner of finding CF-5 (`IW-9-EXECUTION-OVERVIEW.md` finding 1) and
      covers the whole seam, so there is no separate iw9-b dependency for
      this. Concretely: `app.yaml` accepts an `agents:` block (iw9-d task
      10.1), `resolveAppProfile` renders it (10.2), and `agents.run` from an
      app session succeeds for the app's own `<slug>/<agent>` while
      `create`/`update` stay 403 (10.4) — see D's
      `specs/app-scoped-agent-profiles/spec.md`. If it has not landed, stop
      and raise against iw9-d — do not build a Chat-local agent loop.
- [ ] 5.2 Declare `chat/summarize` in `Apps/chat/app.yaml`'s agent list,
      bounded by Chat's capability ceiling (D15, invariant 2 — intersection
      of invoker authority and app grant); tool access limited to
      `canReadChannel`-gated message reads on the invoked channel/thread and
      one write: posting its own summary reply.
- [ ] 5.3 Wire invoker attribution and billing: the run record names the
      invoker as payer/principal (D22); approvals raised by the run route to
      the invoker's queue (D15) — both via iw9-d's existing `agents.run`
      plumbing, no Chat-local billing code.
- [ ] 5.4 Summary output posts through stream 1's `postMessage` with the
      `agent: { profile: "chat/summarize", invoker }` marker (spec
      `chat-summarize-agent` "Summary is an attributed message").
- [ ] 5.5 New test file `tests/chat-summarize-agent.test.ts`: run scoped to
      a guest's readable channels only when a restricted channel exists in
      the same instance (no tool call in the trace touches it), out-of-grant
      tool call denied not silently succeeding, run record attributes
      invoker as payer, posted message carries the agent marker.

## 6. Vendor lift — buzz `MessageTimeline` + scroll-anchoring hooks + patched virtua

> Depends-on: - | Repo: aprovan | Touches: aprovan/client/web/src/vendor/buzz-timeline/**, aprovan/client/web/NOTICE, aprovan/patches/virtua@0.49.3.patch, aprovan/package.json, aprovan/client/web/package.json | Verify: pnpm install --frozen-lockfile=false && pnpm --filter @aprovan/patchwork-web typecheck && test -f client/web/NOTICE && grep -q "block/buzz" client/web/NOTICE

- [x] 6.1 Copy `MessageTimeline.tsx` (fully presentational, ~50 props) and
      the hook cluster `useAnchoredScroll`, `useLoadOlderOnScroll`,
      `useVirtualizedBottomSettle`, `useTimelineRetention` from
      github.com/block/buzz (`desktop/src/features/messages/`) into
      `client/web/src/vendor/buzz-timeline/`, Apache-2.0 headers retained
      verbatim, import paths adjusted only (D24, tech-plan T2).
- [x] 6.2 Add `virtua@0.49.3` as a pinned dependency of `client/web`; apply
      buzz's `patches/virtua@0.49.3.patch` via `pnpm patch` and register
      `patchedDependencies` in the root `package.json` (tech-plan T2 —
      required for stable upward-history-prepend; do not use unpatched
      virtua).
- [x] 6.3 Add a `client/web/NOTICE` entry ("Portions derived from
      block/buzz, Apache-2.0") plus a `LICENSE` copy inside
      `vendor/buzz-timeline/`, and a `vendor/buzz-timeline/README.md`
      recording the upstream commit SHA the lift was taken from (tech-plan
      Risks — "patch breaks on virtua bump" mitigation: renovate/dependabot
      exclusion noted here too).
- [x] 6.4 Confirm no local edits beyond import-path fixes: any divergence
      from upstream gets a dated note in the vendor README, not a silent
      diff (tech-plan Architecture "Component responsibilities").

## 7. `ChatTimelineAdapter` and messaging feature UI

> Depends-on: 1, 2, 6 | Repo: aprovan | Touches: aprovan/client/web/src/features/messaging/**, aprovan/client/web/src/lib/__tests__/chat-timeline-adapter.test.ts | Verify: pnpm --filter @aprovan/patchwork-web exec vitest run src/features/messaging && pnpm --filter @aprovan/patchwork-web typecheck

- [ ] 7.1 Implement `ChatTimelineAdapter` (`features/messaging/adapter.ts`)
      exactly to the interface in tech-plan.md "Interfaces & Data"
      (`fetchWindow`, `fetchOlder`, `send`, `onEvent`, `connectionState`,
      `presence`, `signalTyping`) — the ONLY module that talks to
      `records.*`/the realtime broker; everything else in `features/
      messaging/` consumes the adapter, never the platform surfaces
      directly (tech-plan Architecture).
- [ ] 7.2 Reconciliation per T4: `onEvent` hints trigger a re-fetch of the
      canonical window via `fetchWindow`/`fetchOlder`, never trusting the
      event payload as source of truth; `connectionState()` surfaces
      `live`/`reconnecting`/`reconciling` per iw9-f5's disconnect/resubscribe
      contract (spec `chat-realtime` "Backpressure conformance", "Slow
      client reconciles after disconnect").
- [ ] 7.3 Build channel rail, timeline pane (wraps vendored
      `MessageTimeline` from stream 6 — styling only, no fork), thread pane
      (opens on demand, one level, no reply-to-reply affordance per ux.md),
      and the thin composer (T7: plain textarea, Enter sends, Shift+Enter
      newline, typing signal on keystroke — no rich text, no buzz composer
      per D24).
- [ ] 7.4 Presence/typing UI: rail presence dots, roster tooltip, "{n}
      people are typing…" with ~4s client-side expiry (ux.md "Presence and
      typing" flow) — reads `adapter.presence()`/`onEvent` only, no direct
      store access.
- [ ] 7.5 Reconnect/reconcile/over-cap/access-revoked/deleted-instance UI
      states exactly as enumerated in ux.md "Instance view" States list (no
      blank flash, no duplicate messages, distinguishable over-cap error,
      revoked-channel swap without reconnect).
- [ ] 7.6 New test file `client/web/src/lib/__tests__/chat-timeline-adapter.test.ts`:
      hint-triggers-refetch reconciliation, reconnect state transitions,
      send failure surfaces the over-cap error distinguishably, typing
      signal is fire-and-forget (adapter never blocks composer on it).

## 8. Guest UX and host administration surface

> Depends-on: 3, 4, 7 | Repo: aprovan | Touches: aprovan/client/web/src/features/messaging/guest/**, aprovan/client/web/src/features/messaging/admin/**, aprovan/client/web/src/lib/__tests__/chat-guest-join.test.ts | Verify: pnpm --filter @aprovan/patchwork-web exec vitest run src/features/messaging/guest src/features/messaging/admin && pnpm --filter @aprovan/patchwork-web typecheck

- [ ] 8.1 Guest invite issuance UI (creator side): email + optional channel
      subset, link creation, pending-invite list with revoke and expiry
      countdown (ux.md "Friends install" flow steps 3, "Manage panel").
- [ ] 8.2 Guest join card (trusted-shell payload per invariant 6 — Chat
      supplies copy only, no custom widget in v1): inviter identity,
      instance name, granted-channel summary, hosted/managed disclosure copy
      verbatim from ux.md, sign-in-first gate for unauthenticated visitors
      (invariant 9 — spec `chat-guest-access` "Anonymous user cannot
      participate"), already-a-participant deep-link skip.
- [ ] 8.3 Guest lifecycle UI: host can remove a guest (participant list in
      the Manage panel), guest can leave; removal effect is asserted
      end-to-end in stream 12, this task only wires the UI action to the
      platform call.
- [ ] 8.4 Host Manage panel: storage usage meter with "as of {time}" stamp,
      cap editor with below-usage warning, delete-instance flow with typed
      confirmation (D22, ux.md "Host administration" flow) — reads/writes
      only through `apps.instance*` (iw9-f2 frozen procedures).
- [ ] 8.5 Managed-mode "add coworkers" picker restricted to workspace
      members, with the "invite to the workspace first" guidance copy for
      non-members (spec `chat-guest-access` "Managed mode requires
      membership").
- [ ] 8.6 New test file `chat-guest-join.test.ts`: unauthenticated visitor
      redirected to sign-in before join, expired/revoked/consumed invite
      shows distinct terminal copy, already-participant skips the card,
      hosted disclosure text matches ux.md verbatim (snapshot).

## 9. Playwright harness bootstrap

> Depends-on: - | Repo: aprovan | Touches: aprovan/client/web/playwright.config.ts, aprovan/client/web/e2e/fixtures/**, aprovan/client/web/package.json | Verify: pnpm --filter @aprovan/patchwork-web exec playwright install --with-deps chromium && pnpm --filter @aprovan/patchwork-web exec playwright test --list

- [ ] 9.1 Add `@playwright/test` to `client/web`, `playwright.config.ts` with
      `webServer` starting a local-locus `@aprovan/workspace` instance plus
      `vite preview`/`vite dev` (tech-plan T6); add an `e2e` script to
      `client/web/package.json`.
- [ ] 9.2 Two-user browser-context fixture (`e2e/fixtures/two-users.ts`):
      spins up two authenticated `BrowserContext`s against one server
      instance, tears down workspace/instance state after each test (fresh
      workspace per test — tech-plan Risks, flake mitigation).
- [ ] 9.3 Raw WebSocket frame capture helper (`e2e/fixtures/ws-capture.ts`)
      using Playwright's `page.on("websocket")`, exposing "assert zero
      frames matching predicate over the test window" — the primitive
      stream 12's invariant-7 test needs.
- [ ] 9.4 Tag convention: every Chat E2E spec carries `@chat` in its title
      (tech-plan Architecture); confirm `playwright test --grep @chat` lists
      only Chat specs (empty until streams 10-12 land specs — this task
      just proves the harness runs).

## 10. E2E — Managed install (company)

> Depends-on: 4, 7, 9 | Repo: aprovan | Touches: aprovan/client/web/e2e/chat-managed-install.spec.ts | Verify: pnpm --filter @aprovan/patchwork-web exec playwright test e2e/chat-managed-install.spec.ts --retries=0

- [ ] 10.1 Flow: create a workspace, invite and add ≥2 users via the
      existing `invites.*` machinery (not Chat's guest path), install Chat
      choosing **workspace-managed**, both users open the same channel and
      exchange messages, one user posts a thread reply — PRD goal "Managed
      install (company)".
- [ ] 10.2 Assert: both users' timelines converge on the same message ids
      (adapter reconciliation, T4); the install-mode prompt appeared because
      two modes are declared (spec `chat-app` "Install prompts for host
      mode"); the chosen mode is rejected on a follow-up mutation attempt
      (spec "Host mode cannot change after install" — call the platform
      mutation directly in-test, not through UI, to prove server-side
      enforcement independent of the UI).
- [ ] 10.3 Assert data lands in the F2 shared partition of the company
      workspace (server-side assertion via a test-only record read, not UI
      inference).

## 11. E2E — Hosted install (friends) and guest join

> Depends-on: 3, 4, 8, 9 | Repo: aprovan | Touches: aprovan/client/web/e2e/chat-hosted-guest-join.spec.ts | Verify: pnpm --filter @aprovan/patchwork-web exec playwright test e2e/chat-hosted-guest-join.spec.ts --retries=0

- [ ] 11.1 Flow: creator installs Chat into their personal space choosing
      **hosted-by-creator** (assert D1 default is surfaced, not silently
      applied — spec `chat-app` "Hosted default is the creator's personal
      space"), invites a guest by link, guest (separate browser context, no
      pre-existing workspace membership) opens the link, authenticates,
      accepts the join card, and posts a message in a granted channel — PRD
      goal "Hosted install (friends)".
- [ ] 11.2 Assert the guest never becomes a member of the creator's
      workspace (server-side membership check returns empty — spec
      `chat-guest-access` "Guest joins hosted instance via link") and the
      hosted-vs-managed disclosure text is visible in the guest's join card
      and instance header (invariant 5 copy, ux.md verbatim).
- [ ] 11.3 Negative cases in the same spec: expired/consumed/revoked invite
      link shows the distinguishable terminal copy and creates no
      participation (spec "Invite is single-use and expiring", "Host
      revokes a pending invite").
- [ ] 11.4 Removed-guest case: host removes the guest mid-session (open
      connection); assert the guest's next fan-out event is not delivered
      and their next store read is denied, without requiring a reconnect
      (spec `chat-guest-access` "Removed guest loses live access" —
      invariant 3/7).

## 12. E2E — Presence, invariant 7, and platform-first close-out

> Depends-on: 2, 7, 9, 10, 11 | Repo: aprovan | Touches: aprovan/client/web/e2e/chat-presence.spec.ts, aprovan/client/web/e2e/chat-invariant7-guest-isolation.spec.ts | Verify: pnpm --filter @aprovan/patchwork-web exec playwright test e2e/chat-presence.spec.ts e2e/chat-invariant7-guest-isolation.spec.ts --retries=0 && ! grep -rn "records\.\(set\|put\|write\)\|vfs\.\(write\|put\)" server/workspace/src/realtime/app-topics.ts

- [ ] 12.1 Presence spec (`chat-presence.spec.ts`): two connected users see
      each other online, typing indicator round-trips within ~4s TTL, and
      disconnect clears presence for all viewers (PRD goal "Presence
      visible", spec `chat-realtime` "Presence and typing are ephemeral").
- [ ] 12.2 Grep gate (in Verify) proving zero writes to `records.*`/`vfs.*`
      on any code path in `realtime/app-topics.ts` — the PRD's
      grep-verifiable claim, enforced as an actual gate, not a manual check.
- [ ] 12.3 Invariant-7 spec (`chat-invariant7-guest-isolation.spec.ts`): a
      guest with a live subscription captures its full raw WebSocket frame
      stream (stream 9's capture helper) while a message is posted to a
      restricted channel the guest cannot read; assert zero frames reference
      that channel. `retries=0` per tech-plan T6 ("a flaky security
      assertion is worse than a slow one").
- [ ] 12.4 Same spec, second case: revoke a participant's channel access
      mid-session (open subscription) and assert post-revocation events are
      filtered without a reconnect (spec `chat-realtime` "Revocation takes
      effect at fan-out").
- [ ] 12.5 Findings and attribution close-out: re-read tech-plan.md
      "Findings" (CF-1..CF-5) against what actually landed — append any gap
      discovered during implementation that wasn't anticipated (spec
      `chat-app` "Gap discovered during implementation"); confirm
      `client/web/NOTICE` and vendor headers are present (stream 6);
      confirm no core file outside `realtime/app-topics.ts` (stream 2) and
      `invites.ts`/`identity/types.ts`/`identity/store.ts`/
      `routes/invites.ts` (stream 3) changed under `server/workspace/src/`
      (`git diff --stat` scoped review — the "one deliberate, minimal core
      touch" claim, tech-plan Non-Goals).
- [ ] 12.6 Run `openspec validate --change iw9-chat-flagship --strict` and
      fix anything it flags before closing the change.

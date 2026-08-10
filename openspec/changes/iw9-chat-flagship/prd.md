# PRD — iw9-chat-flagship (Wave 2, CHAT)

_Elaborates the CHAT stream of `openspec/changes/IW-9-APP-FIRST.md`. All
product decisions are settled there (D1, D2, D15, D22, D24; invariants 4, 5,
7); this PRD scopes them into a change, it does not re-litigate them. Chat is
an **app built on the platform**, not a platform service — its purpose is
proving the Wave-0/Wave-1 primitives compose into a real product._

## Problem

The platform primitives — shared partition (iw9-f2), broker backpressure
(iw9-f5), app model with hosted/managed installs (iw9-b), server-side agent
loop (iw9-d) — each land in isolation with unit-level proof only. Nothing
exercises them together as an app a user would actually adopt. Until a
flagship rides them end-to-end, "apps are the product" is a claim, not a
demonstrated capability, and every primitive's API is unvalidated by a real
consumer.

## Users & Jobs

- **Company workspace admin**: installs Chat workspace-managed so every
  member gets channels under data the company owns (invariant 5 — all
  participants are members; admin approves workspace-level grants once).
- **Company members**: channels, threads, presence — the Slack-replacement
  job, with data they can verify is managed (readable/exportable/deletable).
- **Friend-group creator**: installs Chat hosted in their **personal** space
  (D1 default) and invites friends as guests — no shared workspace required.
- **Guests**: join a specific Chat instance via invite link, participate in
  channels they're granted, and are structurally unable to see anything else.
- **Instance host**: sees per-instance storage size, sets a cap, can delete
  the instance (D22, riding F2's machinery).
- **Any participant**: invokes `chat/summarize` and gets a channel/thread
  summary produced under the app's grants, billed to the invoker (D15, D22).
- **iw9-doc (Wave 3, consumer-not-a-person)**: reuses Chat's realtime
  patterns (subscription lifecycle, ephemeral presence, adapter surface).

## Goals

These are the change's E2E bar — each must pass as an automated Playwright
flow (see tasks), not a manual demo:

- **Managed install (company)**: create a workspace, invite + add ≥2 users
  via the existing `invites.*` machinery, install Chat workspace-managed,
  both users exchange messages in a channel and in a thread; data lands in
  the F2 shared partition of the company workspace.
- **Hosted install (friends)**: a creator installs Chat into their personal
  space (D1 default surfaced, not silently applied), invites a guest by
  link; the guest joins and chats **without ever becoming a member of a
  shared workspace**; the hosted-vs-managed disclosure is displayed
  (invariant 5 copy in ux.md).
- **Presence visible**: two connected users see each other online and see
  typing indicators; presence/typing produce **zero stored rows** —
  grep-verifiable: no `records.*` / store write on any presence or typing
  code path.
- **Invariant 7 validated**: an automated test proves a guest subscribed to
  the instance never receives a fan-out event for a channel they cannot
  read — authorization re-applied at fan-out, not at subscribe.
- **One `app.yaml`, two host modes (D2)**: the same app declares
  `workspace-managed` and `hosted-by-creator`; the install flow prompts
  because >1 mode is declared; the chosen mode is immutable on the install
  record (F2's invariant-10 field).
- **Metering visible**: the host sees the instance's storage size and can
  set a cap and delete the instance (D22 — F2 provides the machinery; Chat
  provides the surface).
- **Timeline quality**: lifted buzz `MessageTimeline` renders with stable
  upward history prepend (no scroll jump on load-older) — the reason for the
  patched `virtua`; Apache-2.0 attribution shipped (NOTICE + headers).
- **Platform-first accounting**: every place Chat needed a NEW platform
  primitive (not app surface) is recorded as an explicit finding in
  tech-plan.md — zero silent core additions.

## Non-Goals

- **No new platform services.** Chat consumes `apps.*`, `records.*`,
  `vfs.*`, `invites.*`, `agents.run`, and the broker. Any gap becomes a
  tech-plan finding, not core code written under this change's flag.
- **No Nostr, no buzz relay, no buzz composer** (D24 — composer is
  Nostr-shaped; we write our own thin composer).
- **No publisher-hosted mode.** D2 permits it platform-wide; Chat declares
  exactly two modes.
- **No approval-card dependency.** iw9-c is parallel; if its cards land,
  they appear; Chat must install and run without them.
- **No message search/indexing** (invariant 8 makes this its own careful
  change), **no reactions, read receipts, message editing, or file
  attachments** — timeline, threads, presence, membership only.
- **No mobile/push notifications**, no email digests.
- **No broker sharding or scoped-topic bus migration** (D16 Wave-2
  destination is F5's concern; Chat targets the hardened in-memory broker).
- **No DM primitives** — a 2-person private channel is the DM story for now.
- **No guest role generalization** beyond what Chat needs; the platform-wide
  guest story is a finding if Chat's shape doesn't generalize.

## Capabilities

### New Capabilities

- `chat-app`: the app itself — `app.yaml` (slug, icon, capability ceiling,
  two host modes), channel/thread/message data model on the F2 shared
  partition, install flows for both modes, host metering surface (D22),
  hosted-vs-managed disclosure.
- `chat-realtime`: message fan-out, presence and typing as ephemeral broker
  state, F5 backpressure conformance from the client side, and invariant-7
  enforcement (authz at fan-out; channel-unreadable ⇒ event never delivered).
- `chat-guest-access`: guest role, invite-link issuance/consumption on the
  existing `invites.*` machinery, guest scoping (instance-only visibility),
  guest lifecycle (revoke, leave, instance delete).
- `chat-summarize-agent`: the `chat/summarize` agent profile — bounded by
  the app's grants (D15), executed via iw9-d's server loop, invoker-billed,
  approvals routed to the invoker's queue.

### Modified Capabilities

None. `openspec/specs/` holds 17 capabilities, all desktop/gateway/voice-side
(checked); none cover chat, realtime fan-out, or app installs. Broker
*requirements* Chat relies on live in iw9-f5's specs — consumed as a
dependency, not modified here.

## Constraints & Assumptions

- **Hard dependencies (must land first):** iw9-f2 (shared partition,
  metering, immutable hosting mode), iw9-f5 (broker spec + backpressure),
  iw9-b (install-as-copy, `app.yaml`, host-mode pick), iw9-d (server agent
  loop for the summarize profile). iw9-f4's `app.yaml` grammar arrives via
  iw9-b.
- **Parallel, not depended on:** iw9-c (approval cards). Chat's grants work
  through B's install ceiling; if C lands, its cards render automatically.
- **Constraint — buzz lift boundary (D24):** lift `MessageTimeline`
  (fully presentational, ~50 props), the scroll-anchoring hook cluster
  (`useAnchoredScroll`, `useLoadOlderOnScroll`,
  `useVirtualizedBottomSettle`, `useTimelineRetention`), and their patched
  `virtua` (`patches/virtua@0.49.3.patch` — required for stable upward
  prepend). `desktop/src/testing/e2eBridge.ts` is read as the **reference
  spec** for our backend adapter surface, not lifted as code. Apache-2.0
  attribution is mandatory (NOTICE file + retained headers).
- **Constraint — presence is never stored** (brief: "presence/typing
  ephemeral, never stored"); enforcement is a grep gate in tasks.
- **Constraint — invites surface (verified):** `server/workspace/src/invites.ts`
  is a thin facade (`createInvite/getInvite/listInvites/revokeInvite/
  consumeInvite`) over the identity store; `InviteRecord` carries
  `role: string` and `groupIds`, 7-day TTL, consumed-on-accept →
  membership. Guest access rides this shape; where it can't (hosted mode has
  no shared workspace to mint membership in), that's a named finding.
- **Assumption:** a "guest" in hosted mode is an authenticated platform user
  (invariant 9 — anonymous may read link-shared files, nothing else; so no
  anonymous chat participation, ever).
- **Assumption:** Playwright E2E harness does not exist yet in either repo
  (verified: no `playwright.config.*`, no `e2e/` dir); tech-stack.md
  mandates Playwright, so this change bootstraps the harness scoped to its
  own flows.
- **Assumption:** threads are shallow (one level — channel message →
  thread replies), matching the Slack-replacement job; no arbitrary nesting.

## Open Questions

None. All product decisions are settled in IW-9-APP-FIRST.md (D1, D2, D15,
D22, D24; invariants 4, 5, 7, 9, 10); implementation-level choices are
recorded with rationale in tech-plan.md, and platform gaps are recorded there
as explicit findings rather than questions.

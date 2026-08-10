# UX — iw9-chat-flagship

Chat's UX is where three IW-9 promises become visible: hosted-vs-managed as
the only data question (invariant 5), guests who can chat without joining a
workspace (D1), and presence that is alive but never stored. Every flow
serves a PRD goal; the two install flows and the guest flow are the E2E bar.

## Flows

### Flow: Company install (workspace-managed)

1. Admin opens the app launcher in the company workspace, picks Chat.
2. Install card (iw9-b shell) shows Chat's icon, capability ceiling, and —
   because `app.yaml` declares two modes (D2) — the **host-mode choice**.
   Copy (verbatim, the D2/invariant-5 disclosure):
   - **Managed by this workspace** — "Messages are stored in
     *{workspace}*. Every participant must be a member. Anyone in the
     workspace with access can read, export, and delete this data."
   - **Hosted by you** — "Messages are stored in *your personal space*.
     You pay for storage and can cap or delete it. Others join as guests
     and rely on your hosting."
3. Admin picks *Managed by this workspace*; the card states the choice is
   permanent ("Can't be changed later — moving data is export/import").
4. Admin approves the workspace-level grant once (invariant 1); install
   completes; Chat appears in the launcher with its icon for all members.
5. Failure: user lacks admin rights → mode is shown disabled with "Ask an
   admin to install Chat for this workspace"; grant declined → no install,
   no partial state.

### Flow: Adding coworkers (managed instance)

1. Member opens Chat → channel → "Add people".
2. Picker lists **workspace members only**. A non-member email typed here
   shows: "Not a member of {workspace}. Managed chat requires membership —
   invite them to the workspace first" with a link to the existing
   workspace-invite flow (`invites.*`). (Invariant 5; spec
   `chat-guest-access` / managed-requires-membership.)
3. Selected members gain the channel; restricted channels show a lock
   badge and their explicit member list.

### Flow: Friends install (hosted-by-creator) + guest invite

1. Creator, in their **personal** workspace (default landing, D1), installs
   Chat and picks *Hosted by you* (default-selected here because the
   hosting space is personal; still an explicit click — never silent).
2. Instance opens; header shows the hosting fact chip: "Hosted by
   {creator}" (a displayed fact, not a mode — invariant 5).
3. Creator clicks "Invite" → "Invite a guest" → enters email(s), optional
   channel subset → link is created (7-day expiry stated inline; existing
   invite machinery, guest target per CF-2).
4. Guest opens the link. Not signed in → sign-in first (invariant 9 — no
   anonymous participation; copy: "Sign in to join {instance}").
5. Post-auth, the **guest join card** (trusted shell) shows: who invited
   them, what they get ("Guest of *{instance}* — the channels shared with
   you, nothing else"), and the hosted disclosure: "Messages here are
   stored in {creator}'s personal space. {Creator} can read, cap, or
   delete this data."
6. Guest accepts → lands in the instance with only granted channels; they
   never see the creator's workspace, files, or other apps.
7. Failure paths: expired/consumed link → "This invite is no longer valid.
   Ask {creator} for a new one." Revoked mid-flight → same. Storage cap
   reached at accept → join succeeds, posting shows the over-cap error
   (below).

### Flow: Channels, threads, and daily messaging

1. Instance view: channel rail left, timeline center, thread pane right
   (opens on demand).
2. Posting: composer at bottom (Enter sends, Shift+Enter newline). A send
   under a reached storage cap fails with "Message not sent — this
   instance hit its storage cap. The host can raise it." (distinguishable
   error per F2/D22; message stays in the composer).
3. Reply-in-thread from any timeline message opens the thread pane; the
   composer inside it posts replies (one level — no reply-to-reply
   affordance is rendered).
4. Load older: scrolling up fetches history with **no scroll jump** (the
   lifted anchoring hooks + patched virtua — PRD timeline-quality goal);
   a slim inline spinner rides above the oldest message while fetching.
5. Reconnect: on broker disconnect the timeline shows a quiet "Reconnecting…"
   pill; on resume it reconciles from canonical records — never a blank
   flash, never duplicated messages (T4).

### Flow: Presence and typing

1. Channel members currently connected show a presence dot in the rail and
   the channel header roster.
2. Typing shows "{name} is typing…" under the timeline, expiring ~4s after
   the last signal; multiple typers collapse to "{n} people are typing…".
3. Disconnect clears the user from all rosters (no "last seen" — presence
   is ephemeral and never stored; there is deliberately no history UI).

### Flow: Summarize (agent)

1. Channel/thread overflow menu → "Summarize". Scope note on the action:
   "Summarizes what *you* can read here. Runs as you." (D15/invariant 4;
   invoker pays, D22.)
2. Run streams via the platform run surface (iw9-d); result posts into the
   channel/thread as a message visibly badged "Summary · chat/summarize ·
   for {invoker}" (spec: agent-produced marker).
3. Failure: out-of-grant tool call → the run reports the denial in the run
   surface (or iw9-c's queue card, if landed — Chat renders nothing
   custom); LLM failure → "Summary failed" system line, retry affordance.

### Flow: Host administration (metering, cap, delete)

1. Instance header → "Manage" (host only). Panel shows: storage used
   (per-instance size from F2), cap editor, guest/invite list with revoke,
   and "Delete instance".
2. Setting a cap below current usage warns: "New messages will fail until
   usage drops below the cap."
3. Delete requires typed confirmation of the instance name; copy states
   audited, permanent removal for all participants. After delete, guests'
   next visit shows "This instance was deleted by its host."

## Screens & States

### Install card — host-mode step

Purpose: make the data-hosting question the visible, deliberate choice (D2).
Elements: two mode options with the disclosure copy above, permanence note,
capability-ceiling summary (shell-rendered, iw9-b). States: single-mode
apps skip this step entirely (D2 — Chat never does); loading = card
skeleton; error = install fails atomically with retry; declined grant =
returns to launcher, nothing created.

### Instance view (channel rail / timeline / thread pane)

Purpose: the daily surface. Elements: rail (channels with lock badge on
restricted, presence dots, unread markers), timeline (lifted
MessageTimeline), composer, hosting fact chip in the header ("Managed by
{workspace}" / "Hosted by {creator}"). States — enumerate or rot:

- Loading: skeleton rows in rail and timeline (no layout shift on fill).
- Empty channel: "No messages yet" + composer focused.
- Empty instance (no channels): host sees "Create your first channel";
  guests see "No channels shared with you yet".
- Reconnecting: pill over the timeline; composer stays enabled, sends
  queue client-side until live or fail with a retry toast after timeout.
- Reconciling (post slow-client disconnect): brief shimmer on the visible
  window; no user action needed.
- Over-cap: inline send error (flow above); banner for the host with a
  link to Manage.
- Access revoked mid-session: timeline swaps to "You no longer have access
  to this channel" the moment a fan-out is filtered (invariant 3/7); rail
  entry disappears.
- Deleted instance: full-pane terminal state (flow above).

### Guest join card

Purpose: the trusted-shell moment where a guest understands what they are
joining (invariant 5 disclosure). Elements: inviter identity, instance
name, granted-channel summary, hosted-data disclosure, Accept/Decline.
States: expired/revoked/consumed (distinct copy, same terminal treatment);
unauthenticated (sign-in interstitial first); already-a-participant (skip
card, deep-link into the instance).

### Manage panel (host)

Purpose: D22 made visible — storage, cap, guests, delete. Elements: usage
meter, cap input, invite list (pending with expiry countdown, revoke),
participant list (remove guest), delete zone. States: metering is
eventually consistent — show "as of {time}" stamp; cap-below-usage warning
state; delete confirmation state; empty invite list.

### Summary message (in timeline)

Purpose: agent output distinguishable from human speech. Elements: badge
row (profile name, invoker), collapsible body if long. States: streaming
(iw9-d run in progress — placeholder row "Summarizing…"), failed (system
line + retry), done.

## Component Inventory

- Rail / lists: shadcn `Sidebar`-style nav list, `Badge` (lock, guest),
  `Avatar` + presence dot (custom 8px indicator), `Tooltip` (roster).
- Timeline: **vendored buzz MessageTimeline** (T2) — not re-implemented
  with shadcn; message row internals (avatar, name, time, body) styled to
  the app's Tailwind theme.
- Composer: `Textarea` + `Button`, custom keyboard handling (T7).
- Install/join cards: iw9-b's shell card primitives; Chat supplies copy
  only (invariant 6 — shell renders who/what/buttons; no Chat widget in
  v1, generic fallback is fine).
- Manage panel: `Dialog`/`Sheet`, `Progress` (usage meter), `Input`
  (cap), `AlertDialog` (delete confirm), `Table` (invites/participants).
- Toasts/errors: shadcn `Toast`; inline errors as timeline system lines.
- Thread pane: `Sheet` on narrow viewports, split pane on wide.

## Open Questions

None. Disclosure copy above implements settled decisions (D1, D2,
invariants 5, 9); wording may be polished during implementation without
changing what each surface must disclose. Anything that would weaken a
disclosure (removing the hosting chip, silently defaulting a host mode)
re-opens the brief, not this file.

# iw9-c-capability-approval — UX

Three surfaces: the **install card** (one-time ceiling approval, D9), **JIT
cards** (mid-run capability/resource requests, D9/D12), and the **review
surface** (the one place decisions live, invariant 6). Every card obeys the
payload-widget / shell-decision split: trusted chrome shows who is asking,
the capability, the resource, the credential, the effect, and the buttons;
app widgets render only the payload.

## Flows

### Flow: Install an app (ceiling approval)
1. User picks an app to install (launcher / marketplace entry from iw9-b).
2. Platform runs static analysis over the app archive; the install card
   opens listing each proposed capability: icon, namespace, effect badge
   (observation / action), and the credential level that will back it
   (workspace — "admin approves for everyone" vs user — "each person
   connects").
3. Mismatch handling: capability used in code but missing from `app.yaml`
   → card shows a blocking "undeclared" row; install button disabled with
   the reason. Declared but unused → informational "unused" chip,
   non-blocking.
4. If any capability needs a workspace-level credential and the user is
   not an admin, the card converts to a request: "Send to admins" — the
   install stays pending in the requester's review surface, a
   capability-request item appears for admins.
5. User (or admin) confirms once. Ceiling grants are written; the card
   states explicitly: "Resources are approved as the app first touches
   them" — no resource patterns exist yet (D9).
6. Failure paths: static analysis fails → card falls back to
   manifest-declared list with a warning banner; install may proceed only
   for observation-effect capabilities, action capabilities require the
   analysis to pass.

### Flow: JIT resource request during an agent run
1. A run's action misses a resource grant. Result-dependent chain: the
   turn ends; the transcript shows a system line — "Queued N actions —
   review to continue." Fire-and-forget: the run continues and the
   transcript notes "1 action queued."
2. A JIT card appears inline in the chat transcript (iw9-d stream) and in
   the review surface. Shell: app/agent identity, capability, the exact
   resource (e.g. `bob@example.org`), effect, credential level. Payload:
   app widget (message preview) or generic args card.
3. User chooses: **Allow once** (release just this call), **Allow
   pattern** (editable pattern input pre-filled with a suggested
   generalization, e.g. `*@example.org` — writes a remembered grant,
   D12), or **Deny** (discard queued action; nothing recorded).
4. On allow, covered queued actions release and the run resumes from
   where it ended; the transcript continues under the same run id.
5. Failure paths: card expires (queue expiry) → transcript line updates
   to "expired, not executed"; user lacking authority (workspace
   credential) sees "waiting for an admin" state instead of buttons.

### Flow: Explicit `ask` step
1. A workflow reaches an `ask` step; the turn ends; a card carries the
   workflow's question + payload widget.
2. The card routes to the invoker's review surface (D15). Answering
   resumes the workflow with the answer; deny/dismiss resumes it on the
   declared decline branch or ends it.

### Flow: Review and release queued actions
1. User opens the review surface (sidebar badge shows pending count).
2. List shows items grouped by kind — queued actions, capability
   requests, staged changes, merge conflicts — filterable; each row:
   shell summary line (who → capability → resource, effect badge, age,
   expiry countdown when < 24h).
3. Opening an item shows the full shell header + payload (widget or
   generic). For queued actions: **Release** (with optional "remember
   pattern" input), **Discard**. Editing the payload in a widget
   re-renders the shell summary before the buttons act.
4. Bulk: multi-select within one (app, capability) group offers Release
   all / Discard all; mixed groups never bulk-release.
5. Failure paths: release fails downstream (provider error) → item flips
   to an error state with the provider message, stays terminal (no
   retry-with-edit; no undo, D12); item resolved elsewhere (another
   admin) → row resolves in place with attribution "released by Sam".

### Flow: Revocation cascade visibility
1. Admin revokes a grant or credential from the app/member detail view.
2. Confirmation dialog lists the blast radius before confirming:
   dependent standing automations that will deactivate, apps that lose
   the capability.
3. After confirm, affected automations show "deactivated — authority
   revoked" with an admin-only **Reassign** action; reassignment
   re-evaluates under the new owner (never inherits).

## Screens & States

### Install card (modal over launcher)
- Purpose: one-shot ceiling approval (D9).
- Elements: app identity header (icon, publisher, hosted/managed badge),
  capability rows (namespace, effect badge, credential-level badge,
  undeclared/unused flags), resources-come-later note, confirm / cancel,
  or "Send to admins".
- States: analyzing (skeleton rows + "reading app code…"), analysis
  failed (manifest fallback + warning, actions gated), blocked
  (undeclared capability), pending-admin (read-only, live-updates when
  approved), error (install write failed — retry).

### JIT card (inline in transcript + review surface)
- Purpose: non-blocking resource introduction (D9/D12).
- Elements: shell header (who/capability/resource/effect/credential),
  payload area (widget sandbox or generic args table), Allow once /
  Allow pattern (editable input with matcher-validated preview: shows
  which queued actions the pattern would cover) / Deny.
- States: pending, waiting-for-admin (no buttons, explanation),
  answered-elsewhere (resolution + who), expired (grey, "not executed"),
  widget-failed (falls back to generic card silently — never blocks the
  decision), resumption-in-progress (spinner after accept).

### Review surface (panel / route)
- Purpose: invariant 6 — the one decision inbox.
- Elements: kind filter tabs with counts, item list rows, item detail
  (shell header, payload host, decision buttons, audit footer with
  attribution triple), bulk bar.
- States: empty ("Nothing waiting on you"), loading, partial (one source
  errored — e.g. merge-conflict source down — banner + other kinds still
  render), item error, offline/stale (timestamp + refresh).

### Notification card (retrofit)
- Purpose: existing notifications adopt the shell/widget split.
- Elements: shell (source app — server-stamped, title, choices as shell
  buttons), widget body in the same sandbox host as review widgets.
- States: unchanged notification semantics (seen/unseen); widget-failed →
  text body fallback.

## Credential-level copy rules

Invariant 1 ("identity follows the credential") only holds if the UI never
lets a `workspace-oauth` action read as personal, or a `user-oauth` action
read as anonymous-bot. Every surface that names a credential (install card
rows, JIT card shell, review-surface shell header, notification shell)
follows the same three fixed strings — never a paraphrase, never omitted:

| `CredentialLevel` (iw9-f3) | Badge text | Shell sentence | Who approves |
|---|---|---|---|
| `workspace-token` | "Workspace secret" | "Acts using a workspace secret — the same for everyone here." | "An admin approves once for the whole workspace." |
| `workspace-oauth` | "Workspace bot" | "Acts as the **workspace bot** — visible to and shared by everyone here, not you personally." | "An admin approves once for the whole workspace." |
| `user-oauth` | "Your account" | "Acts as **you** — this will appear as you, using your own connection." | "You connect and approve for yourself; nobody else's approval covers you." |

Rules:
- The distinction is never buried in a tooltip only — the shell sentence
  (or its badge, space permitting) renders inline, unconditionally, next to
  every capability/resource line that has a credential. Tooltips
  (`CredentialLevelBadge`) add detail, they are not the sole carrier.
- "Workspace bot" and "Your account" SHALL NOT share a color or icon —
  distinct badge treatment (e.g. building glyph vs person glyph) so a
  skimming user can tell the two apart without reading text.
- A pending-admin state (member lacks authority to approve a
  workspace-level credential) says explicitly *why*: "Needs an admin —
  this uses the workspace bot, not your account" — never a bare "pending".
- `CredentialNotConnectedError` (iw9-f3) renders as a connect prompt
  scoped to the acting user, worded "Connect your account to let this
  continue as you" — never "connect a credential" (which reads as
  workspace-level and misleads about whose identity is at stake).
- Audit-footer attribution in the review surface always names both the
  invoker and the credential level, e.g. "released by Sam · workspace bot
  (Slack)" — never the credential id alone.

## Component Inventory

- shadcn/ui: `Dialog` (install card), `Card` + `Badge` (effect,
  credential level, expiry), `Tabs` (kind filter), `Table`/`DataList`
  (generic args payload), `AlertDialog` (revocation blast-radius
  confirm), `Input` + inline validation (pattern editor), `Checkbox` +
  action bar (bulk), `Tooltip` (credential-level explanations),
  `Skeleton` (analyzing), `Sonner/toast` (release results).
- Existing platform pieces reused: notification widget sandbox host
  (extended, not duplicated), realtime broker for live card updates,
  iw9-a's diff viewer inside staged-change items, iw9-d's transcript
  card slot for inline JIT cards.
- New shared components: `ReviewItemShell` (renders `ReviewItem.shell`
  only from server data), `PayloadWidgetHost` (sandbox + fallback),
  `ResourcePatternInput` (client-side preview via the published
  matcher), `EffectBadge`, `CredentialLevelBadge`.

## Open Questions

1. Where does the review surface live — dedicated sidebar entry vs a
   pane inside notifications? Recommendation: dedicated sidebar entry
   with its own badge; notifications remain FYI-only after the retrofit.
2. Should "Allow pattern" suggest a generalization by default (e.g.
   whole domain) or default to exact-resource with generalization
   opt-in? Recommendation: default exact ("allow once" + remembered
   exact), one-click chips for suggested broader patterns — safer
   default, one extra click to widen.

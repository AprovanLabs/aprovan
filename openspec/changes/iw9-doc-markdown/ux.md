# UX — iw9-doc-markdown

Document is a new surface (unlike sibling changes that alter an existing
screen): a live Markdown editor with named cursors, riding the same
sidebar/tabs shell every workspace file already opens in
(`client/web/src/features/tabs`), plus a conflict path that reuses iw9-a's
merge surface verbatim rather than inventing a second one.

## Flows

### Flow: Open a document and see who else is there

1. User opens a `.md` file from the Files tree or the Document app's
   launcher tile (D6 icon/fallback). The tab opens
   `CollabMarkdownEditor` instead of the plain file editor for any `.md`
   path (PRD Open Question 1: any workspace `.md` is collab-eligible).
2. Editor mounts with the current materialized content immediately
   (no spinner for text — it's the file the user already has access to),
   then upgrades to the live doc once the `doc:<path>` subscribe completes.
   Existing participants' cursors fade in as their `subscribed`/awareness
   frames arrive (sub-second on a healthy connection).
3. A small avatar cluster in the editor header (reusing
   `features/presence/PresenceAvatars.tsx`'s pattern, one entry per distinct
   `awareness` client, deduped by user) shows who else has the doc open.
4. Typing anywhere: local keystrokes apply instantly (CM6 is the source of
   local truth); remote keystrokes from other participants merge into the
   text at their live cursor position; the user's own cursor position is
   preserved through remote inserts before it (CM6 mapping, standard
   `y-codemirror.next` behavior).
5. Exit: closing the tab unsubscribes from `doc:<path>`; if it was the last
   participant, the server quiesces and materializes on a short delay (no
   visible action — the file is already showing current content).
- Failure: WS disconnect mid-edit → local editing continues uninterrupted
  (CM6 state is authoritative locally); a small "reconnecting…" indicator
  appears near the presence cluster (same restrained treatment as iw9-d's
  chat reattach badge); on reconnect the client resyncs and remote cursors
  reappear. No content is ever rolled back — Yjs sync merges forward.
- Failure: doc fails to load (durable state unreadable) → editor falls back
  to the plain materialized file, read/write via the ordinary VFS path, with
  a small "Live collaboration unavailable — editing as a regular file"
  notice; no data loss (`document-persistence` "First open of an existing
  file" / corruption fallback).

### Flow: See a named cursor move

1. Another participant clicks or types elsewhere in the same doc.
2. Their cursor renders as a thin colored caret (color derived from their
   identity, stable per user like presence's existing color model) with a
   small name label that shows on hover/proximity, not permanently (avoids
   permanent label clutter — same restraint as file presence's dot-not-badge
   default).
3. Their selection (if any) highlights in the same color at low opacity.
4. They leave (close tab, disconnect, or move to a different doc) — cursor
   and selection disappear immediately; no lingering "was here" ghost.

### Flow: An agent edits a document you have open

1. User is mid-edit in paragraph 5; a `doc/fix-typos` run (invoked by the
   user or another workspace member) fixes a typo in paragraph 2.
2. The correction appears in paragraph 2 as a live remote edit — same
   visual treatment as a human's remote edit, distinguished only by the
   presence cluster showing an agent entry (bot icon instead of an avatar,
   reusing the existing agent-message visual language from chat) rather
   than inventing a new "agent cursor" concept.
3. The user's own in-progress typing in paragraph 5 is untouched.
4. No confirmation, no toast — this is the "just merges" path (PRD Goal 2);
   a toast on every successful agent edit would be noise on a live document.

### Flow: An agent edit conflicts — resolve the draft

1. Same setup, but the agent's SEARCH block targets a region the human
   rewrote beyond fuzzy-match tolerance while the run was in flight.
2. Matched parts of the agent's edit (if any) still land live, exactly as
   above. The conflicting part does not appear in the live text.
3. A **persistent, low-key banner** appears at the top of the editor: "This
   document has a pending draft from `doc/fix-typos`" with a "Review"
   button — visible to every current participant, not just the one who
   triggered the run (any of them could be the one to resolve it).
4. "Review" opens iw9-a's `MergeDialog` (unmodified — this change contributes
   zero new conflict-resolution UI): the conflicting region renders in
   `DiffViewer` as "Workspace version" (current live text) vs. "This draft's
   version" (the agent's intended replacement), with the same
   keep-mine/keep-theirs/combine-with-AI choices iw9-a ships for any staged
   session.
5. Confirming applies the chosen resolution to the live doc as one
   transaction (visible to all participants as a normal live edit) and
   commits via materialization; the banner disappears for everyone.
6. Discarding the draft removes the banner and applies nothing; the session
   returns to `auto` (matches `document-agent-reconciliation`'s "Discarding
   the draft SHALL restore `auto`").
- Failure: the workspace moved again while the banner was open (someone
  else already resolved it, or edited past it) → same stale-conflict refresh
  banner iw9-a's `MergeDialog` already handles; no doc-specific behavior.
- Empty/edge: no one is currently viewing the doc when the conflict occurs →
  the banner appears the next time anyone opens it (session state persists
  independent of live viewers).

### Flow: Anonymous link-share read

1. Anonymous visitor opens a document share link
  (`GET /share/<key>`, iw9-b, unmodified by this change).
2. They see the materialized Markdown rendered read-only — no editor chrome,
   no presence cluster, no "N people editing" indicator of any kind
   (invariant 9: nothing beyond the file content is exposed).
3. No sign-in prompt is forced, but a quiet "Sign in to edit live" affordance
   is available for a visitor who wants to join the real session (leads to
   the normal auth flow; joining still requires an account per
   `document-collab`).
- Failure: expired/revoked link → identical 404 to a never-existed link
  (iw9-b's existing contract; no Document-specific error state).

### Flow: Install the Document app

1. From the app directory/launcher, installing Document shows no
   hosted/managed picker (single declared mode, D2) — install completes in
   one step (`document-app` "Install skips the hosting prompt").
2. The app's tile uses its declared icon or the D6 letter/color fallback,
   identical to every other app tile — no special-cased Document chrome in
   the launcher.

## Screens & States

### CollabMarkdownEditor (new; hosts CM6 + y-codemirror.next)

- Purpose: the live editing surface for a `.md` document.
- Elements: CM6 text area, presence avatar cluster (header), remote
  cursors/selections (inline decorations), conflict banner (conditional),
  reconnecting indicator (conditional), existing file-tab chrome (title,
  close, unsaved-state — reused, not redesigned).
- States: **loading** (materialized content shown immediately; live upgrade
  is invisible unless slow); **live** (normal editing, presence visible);
  **degraded/fallback** (live doc unavailable, plain-file editing, notice
  banner); **reconnecting** (quiet badge, editing uninterrupted); **draft
  pending** (persistent review banner); **read-only** (anonymous/link-share
  view — no editor, rendered Markdown only).

### Conflict review (reused, zero new UI)

- Purpose: resolve a document draft. Entirely iw9-a's `MergeDialog` +
  `DiffViewer`, invoked with the live doc text and the draft session's
  staged content as the two sides. No Document-specific states beyond what
  iw9-a already defines (diff loading, AI busy/error per row, stale-conflict
  banner, submit-in-flight).

### Presence cluster (new; modeled on `features/presence/PresenceAvatars.tsx`)

- Purpose: who is live on this document right now (humans and the
  agent-in-flight, if a run is active).
- Elements: overlapping avatar stack, overflow "+N", agent entries use a
  bot glyph instead of initials.
- States: empty (solo editing — cluster hidden entirely, no "just you"
  noise); 1-N participants; agent-active (transient entry for the duration
  of a run touching this doc).

## Component Inventory

- Editor: new `CollabMarkdownEditor` (`packages/editor`) wrapping CM6 +
  `y-codemirror.next`'s `yCollab` extension; hosted in the existing tab
  shell (`client/web/src/features/tabs`), no new page chrome.
- Presence cluster: new component modeled on the existing
  `features/presence/PresenceAvatars.tsx` (shadcn `Avatar`/`AvatarFallback`,
  `Tooltip` for names on hover) — new component because file presence today
  is dots/roster over `presence:<path>`, not doc-collab awareness, but the
  visual language (color-stable avatars, overflow count) is lifted directly.
- Conflict banner: shadcn `Alert` (info variant) + `Button` ("Review"),
  matching the restrained styling of iw9-d's "reconnecting…" hint.
- Conflict resolution: iw9-a's `MergeDialog`/`DiffViewer` — imported, not
  reimplemented.
- Read-only share view: existing Markdown preview rendering
  (`packages/editor/src/components/MarkdownPreview.tsx`) — no editor
  mounted at all for anonymous readers.
- Reconnecting/degraded notices: shadcn `Badge`/`Alert` variants, consistent
  with iw9-d's chat reattach treatment (restrained, non-modal).

## Open Questions

None requiring user decision — the conflict-resolution surface is fixed by
reusing iw9-a's `MergeDialog` (D11), and presence visuals follow the
existing file-presence color/avatar model. One implementation-time note,
not a question: whether the agent's presence-cluster entry appears for the
whole run duration or only while it's actively writing to this specific
document — recommended: only while actively writing (avoids implying the
agent is "watching" the doc between edits).

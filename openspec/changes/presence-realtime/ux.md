# presence-realtime — UX

Presence becomes invisible until it matters: you only ever see other people on the file you
(and they) have open. The workspace-wide "Also here" chip and its drawer are removed with no
replacement. All presence UI is passive — nothing here is clickable into a flow; there are no
settings, no toggles, no notifications.

## Presence surfaces (the exact set)

A peer is "in" exactly one file: the file of their active tab in a visible window. Their chip
appears on the viewer's surfaces for that file — and only if the viewer has that file open as
a tab (presence is subscribed per open tab; the client never watches files it doesn't have
open):

1. **Tab strip** (`client/web/src/features/tabs/TabStrip.tsx`): each open file tab shows a
   stacked avatar group (up to 3 chips + `+n` overflow) for peers focused on that file.
   Rendered after the tab title, before the close affordance; 16px circles.
2. **Sidebar tree row** (`client/web/src/features/sidebar/WorkspaceSidebar.tsx`): rows for
   files the viewer has open as tabs show a single small presence dot when at least one peer
   is focused there (dot, not avatars — tree rows are dense).
3. **Editor header** (IW-2 `editor-direct-edit` shell, when it lands): the in-tab editor's
   file header hosts the same avatar-group component for the active file. Until IW-2 lands,
   the tab strip chip on the active tab is the header-equivalent surface.

Nothing renders on: files not open as tabs, native-surface tabs (`native:*`/`apps:*`
pseudo-paths carry no presence), chat/SessionBar, or any workspace-level surface.

## Flows

### Flow: See who's in your file

1. User A and user B are members of the same workspace. Both open `notes/plan.md` as their
   active tab.
2. Within ~2s, A sees B's avatar chip on the `notes/plan.md` tab (and the tree-row dot); B
   symmetrically sees A. Neither sees their own chip.
3. B switches their active tab to another file. Within ~2s, B's chip leaves A's
   `notes/plan.md` surfaces. If A also has B's new file open as a tab, B's chip appears
   there instead.
4. B hides their window (background tab / minimized): B's presence clears everywhere, as if
   they left. Re-focusing the window restores it.
5. B closes the browser / loses network: same as 4, driven by socket disconnect (server
   keepalive detects a dead socket within ~60s worst case; a clean close is immediate).

### Flow: Hover a chip

1. User hovers an avatar chip (or the tree dot).
2. Tooltip shows the member's display name (resolved from the workspace member list; the
   sub-derived fallback glyph and "Member" label if unresolvable) and nothing else. No
   click action in v1.

### Flow: Socket degradation (silent)

1. The realtime socket drops (deploy, network blip, Spot reclamation).
2. All presence chips/dots disappear. No toast, no error state, no polling fallback — the
   UI simply returns to its single-user appearance.
3. The client reconnects with exponential backoff (capped ~30s), re-announces its focus, and
   re-subscribes its open tabs; chips reappear. Failure to reconnect just leaves presence
   off indefinitely.

### Flow: Legacy surfaces removed

1. The green pulsing "Also here" peers chip in `SessionBar` (`SessionBar.tsx:218-232`) and
   its `peersOpen` drawer no longer exist — for any user, in any state.
2. No HTTP presence heartbeat leaves the client. There is no user-visible substitute for
   "N people have this workspace open."

## Screens & States

### Avatar group (tab strip / editor header)

- Purpose: show who else is in this file; sized to be glanceable, never attention-grabbing.
- Elements: up to 3 overlapping 16px circles (initials on a deterministic per-user hue,
  hashed from userId), then a `+n` circle. Tooltip per chip.
- States: **zero peers** — render nothing at all (the default and by far most common state;
  no placeholder, no reserved width beyond the group itself); **1–3 peers** — chips;
  **>3** — 3 chips + overflow count; **unresolvable member** — neutral glyph chip with
  "Member" tooltip; **disconnected socket** — identical to zero peers; **self** — never
  rendered.

### Presence dot (tree row)

- Purpose: peripheral "someone's in this open file" signal in the dense tree.
- Elements: one 6px dot after the file name; tooltip lists peer names.
- States: zero peers / file not open as a tab / disconnected — nothing; ≥1 peer — dot.

## Component Inventory

- New `PresenceAvatars` (avatar group) and `PresenceDot` in
  `client/web/src/features/presence/` — built from the existing shadcn/ui vendored
  primitives (`Avatar`, `Tooltip`); no new one-off primitives.
- Fed by one hook (`useFilePresence(path)`) over a single client-wide realtime store — the
  components are pure renderers.
- Deletions: `SessionBar` peers chip + drawer, `PresencePeer` plumbing through
  `useSessionOrchestration`/`ChatDock` props.

## Open Questions

1. **Chip color assignment**: deterministic hue from userId hash (recommended — stable
   across sessions, no coordination) vs. server-assigned palette. _Recommendation:_ hash.
2. **Should the `+n` overflow expand on click** to a name list, or stay tooltip-only?
   _Recommendation:_ tooltip-only in v1; presence must stay passive.
3. **Tree dots for non-open files** would require a workspace-wide presence roster, which
   reintroduces exactly the surface being killed. _Recommendation:_ confirmed out — dots
   only on open-tab rows.

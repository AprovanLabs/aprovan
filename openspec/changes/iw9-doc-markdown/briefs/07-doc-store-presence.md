# Brief: Client — realtime doc store + presence UI

**Depends-on: 1, 3, 6** | Repo: aprovan | Wave 3 (parallel with 4, 10)

## Mission

When you are done, the web client has a `features/document` WS store for
`doc:<path>`, a session hook into `CollabMarkdownEditor`, a doc-awareness
presence cluster, and `.md` tabs open the collab editor. Reconnect resyncs
via fresh subscribe/sync — no incremental replay.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md` — invariants 7, 9
3. `openspec/changes/iw9-doc-markdown/ux.md` — open-doc flow, presence
   cluster, reconnecting indicator
4. `openspec/changes/iw9-doc-markdown/tech-plan.md` — Client store; D1 frames
5. `openspec/changes/iw9-doc-markdown/specs/document-collab/spec.md` —
   "Client recovers by resync"
6. `openspec/changes/iw9-doc-markdown/tasks.md` — stream 7
7. `client/web/src/features/presence/store.ts` — WS client pattern
8. `client/web/src/features/presence/PresenceAvatars.tsx` — visual model
9. Stream 3 frame shapes; stream 6 `CollabMarkdownEditor` export

## Tasks

- [ ] 7.1 `features/document/store.ts`: WS client modeled on
      `features/presence/store.ts` — subscribe `doc:<path>`, decode
      `DocSyncFrame`/`DocAwarenessFrame` (base64 ↔ Yjs binary, tech-plan D1),
      apply to a local `Y.Doc`/`Awareness`, publish local update/awareness
      changes back over the same connection.
- [ ] 7.2 `useDocumentSession.ts`: hook wiring `store.ts` to
      `CollabMarkdownEditor` (stream 6) for a given path — reconnect state
      exposed for the UI (ux.md "reconnecting…" indicator).
- [ ] 7.3 `DocPresenceCluster.tsx`: avatar cluster modeled visually on
      `features/presence/PresenceAvatars.tsx` (shadcn `Avatar`, `Tooltip`)
      but sourced from doc awareness state, not the file-presence roster;
      empty state hides the cluster entirely (ux.md "Presence cluster").
- [ ] 7.4 Wire `.md` file tabs (`features/tabs`) to open
      `CollabMarkdownEditor` instead of the plain file editor for any
      workspace `.md` path (PRD Open Question 1 resolution; existing
      non-`.md` file types unchanged).
- [ ] 7.5 Tests: store applies an incoming sync frame and updates the local
      `Y.Doc`; awareness join/leave deltas update the exposed peer list;
      reconnect-after-drop resyncs without replaying individual missed
      events (spec "Client recovers by resync" — mock the WS reconnect and
      assert only a fresh subscribe/sync round-trip occurs).

## Acceptance criteria

From `specs/document-collab/spec.md`:

#### Scenario: Client recovers by resync

- **WHEN** a client suspects missed updates (reconnect after buffer-drop
  disconnect)
- **THEN** re-joining performs a sync handshake that converges its replica
  to the server state and rebuilds the presence roster, with no replay of
  individual missed events

Plus UX: presence cluster hidden when solo; reconnecting badge when WS
drops; any workspace `.md` opens collab editor.

## Verify

```bash
pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `client/web/src/features/document/store.ts`, `client/web/src/features/document/useDocumentSession.ts`, `client/web/src/features/document/DocPresenceCluster.tsx`, `client/web/src/features/document/index.ts`, `client/web/src/features/tabs/**`, `client/web/src/features/document/__tests__/store.test.ts`
- Do not implement `DraftBanner` (stream 8) or Document app tile (stream 9).
- Do not re-bootstrap Playwright.

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/07-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know (session hook API for stream 8).

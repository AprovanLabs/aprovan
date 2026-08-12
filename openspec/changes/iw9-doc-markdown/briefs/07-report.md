# Report: Client — realtime doc store + presence UI (Stream 7)

## What was built

Web client live-doc session for `doc:<path>`: Yjs sync + awareness over D1
frames, CollabMarkdownEditor host for workspace `.md` tabs, and an
awareness-sourced presence cluster with reconnect badge.

| Piece | Role |
| --- | --- |
| `features/document/store.ts` | `DocumentStore` — subscribe `doc:<path>`, SyncStep1 handshake (Step2 then Step1 as separate publishes), apply/publish sync + awareness, reconnect = fresh subscribe only |
| `features/document/useDocumentSession.ts` | Ref-counted acquire/release; exposes `doc`, `awareness`, `peers`, `synced`, `reconnecting`, `userInfo` for CollabMarkdownEditor + stream 8 |
| `features/document/DocPresenceCluster.tsx` | Avatar stack from awareness peers (hidden when solo); agent → bot glyph |
| `features/document/index.ts` | Public exports (keeps `DocumentAppTile`) |
| `features/tabs/DocumentCollabTab.tsx` | Header (presence + Reconnecting…) + `CollabMarkdownEditor` |
| `features/tabs/TabContent.tsx` | `.md` → `DocumentCollabTab`; other types unchanged |
| `__tests__/store.test.ts` | Sync apply, awareness join/leave, reconnect-without-replay |

### Session hook API (for stream 8)

```ts
const {
  path,
  doc,            // Y.Doc | null
  awareness,      // Awareness | null
  peers,          // DocPeer[] (remote, deduped by userId/name)
  synced,         // handshake completed at least once
  reconnecting,   // retained session + socket !== open
  userInfo,       // CollabUserInfo for CollabMarkdownEditor
} = useDocumentSession(path);
```

## Verify

```bash
pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/patchwork-web typecheck
```

- Vitest: **162 passed** (incl. 3 new document store tests)
- Typecheck: **ok**

## Deviations

1. **`yjs` / `y-protocols` / `lib0` on `@aprovan/patchwork-web`** — stream 1
   pinned these on `@aprovan/editor` only; pnpm isolation does not expose them
   to the web package. Added direct deps (+ lockfile) so the store can import
   them. Same class of fix as stream 3's `lib0` on workspace.
2. **No shadcn `Tooltip`** — `PresenceAvatars` (the visual model) uses native
   `title`; `DocPresenceCluster` matches that. Brief named Tooltip but the
   reference component does not use one.
3. **`tasks.md` / `briefs/07-report.md` / `package.json` + lockfile** — outside
   the six-path allowlist; required by Report back / dependency resolution.

## Notes for next wave

- **Stream 8**: consume `useDocumentSession` — `reconnecting` already exposed;
  draft/staged polling can live beside this hook or extend `DocumentSession`
  with a `stagedSessionId` field without changing the store wire protocol.
- **Cursor CSS**: stream 6 noted `y-codemirror.next` remote-selection styles
  are not bundled; may need a web CSS import for visible remote carets
  (stream 11 E2E).
- **Degraded fallback** (ux.md: live unavailable → plain file + notice) is
  not implemented here; store assumes the `doc` namespace is available.
- Awareness `user.agent === true` drives the bot glyph in the presence cluster.

# Brief 04 report — Client presence UI + legacy removal

## PR
https://github.com/AprovanLabs/aprovan/pull/47

## Verify summary

| Check | Result |
| --- | --- |
| `cd client/web && pnpm build` | pass |
| Guard: no `heartbeatPresence` / `PresencePeer` / `peersOpen` under `client/web/src` | clean |
| CI `verify` on PR | pass |

## What landed (stream 4)

- **`features/presence/`**: one `RealtimeClient` store; focus from `activeTabPath` + `document.visibilityState`; subscribe `presence:<path>` per open workspace-file tab; re-announce on reconnect; `useFilePresence(path)` filters self.
- **UI**: `PresenceAvatars` on file tabs in `TabStrip`; sidebar tree dots via `WorkspaceTree.presenceTitles` (pierre text decoration — React `PresenceDot` exported for reuse); zero-peer / disconnected → render nothing.
- **Legacy removal**: deleted heartbeat in `useDraftSync`, `heartbeatPresence` / `windowId` / old peer type in `chat-sessions`, `peers` plumbing in session orchestration / ChatDock, SessionBar peers chip + drawer — **no chat-roster replacement**.

## Notes for stream 5

- Protocol e2e can drive tab-switch-shaped focus over real sockets; client no longer calls any presence HTTP op.
- Do not reintroduce SessionBar peers UI.

## Blockers

None.

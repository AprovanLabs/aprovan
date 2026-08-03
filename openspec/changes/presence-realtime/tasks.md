# presence-realtime — Tasks

_External dependency: IW-2 (`editor-direct-edit`) provides the in-tab editor shell; this
change does NOT wait on it — chips land on the tab strip and sidebar tree that exist today,
and IW-2 adopts `PresenceAvatars` in its editor header when it lands. Hard collision rule:
do not touch `/fs/changes`, `startLiveWorkspaceSync`, or anything WS-5 (`metadata-and-cost`)
owns — this change only reserves the `fs` topic namespace. Repo:
`~/Documents/Code/AprovanLabs/aprovan`. Contracts between streams are fixed in
tech-plan.md "Interfaces & Data" — streams 1↔3 and 2↔4 build opposite sides of those seams
without coordinating._

## 1. Server realtime transport (protocol, broker, socket, attach)

> Depends-on: - | Touches: server/workspace/src/realtime/**, server/workspace/src/server.ts, server/workspace/package.json, server/workspace/tests/realtime-socket.test.ts, pnpm-lock.yaml | Verify: cd ~/Documents/Code/AprovanLabs/aprovan/server/workspace && pnpm typecheck && pnpm vitest run tests/realtime-socket.test.ts

- [x] 1.1 Add the `ws` dependency (+`@types/ws`) to `server/workspace` and create
      `src/realtime/protocol.ts`: zod schemas for the client/server envelopes, the
      `<namespace>:<rest>` topic grammar, error codes, and the reserved-namespace constants
      `doc` and `fs` with doc comments naming their future owners (CRDT doc-sync; post-WS-5
      change feed) — tech-plan D5, spec realtime-socket "Topic protocol envelope".
      Verify: `cd server/workspace && pnpm install && pnpm typecheck`
- [x] 1.2 Implement `src/realtime/broker.ts`: per-workspace connection/subscription maps,
      namespace registry (`registerNamespace(handler)`), dispatch of
      subscribe/unsubscribe/publish to handlers, `publishToTopic` fan-out, idempotent
      subscriptions, single cleanup path on disconnect that drops subscriptions and calls
      `onDisconnect`, eager deletion of empty topics, and loud errors:
      `reserved-namespace` for `doc:`/`fs:`, `unknown-namespace` otherwise (spec
      realtime-socket "Namespace registry with reserved namespaces").
      Verify: `cd server/workspace && pnpm typecheck`
- [x] 1.3 Implement `src/realtime/socket.ts` and export `attachRealtime(server)`: `ws`
      `WebSocketServer` in noServer mode, `upgrade` listener matching `/api/gateway/ws`,
      subprotocol auth (`aprovan.v1` + `bearer.<token>` → existing
      `verifyAccessToken`/principal resolution, honoring `none` auth mode), 401 rejection
      before open, member-only enforcement (no app-scope principals), ping ≤30s with
      2-missed-pong termination, close 1008 at token `exp`, and `bad-message` error frames
      for unparseable input without closing (tech-plan D2/D3).
      Verify: `cd server/workspace && pnpm typecheck`
- [x] 1.4 Wire it into the lifecycle: `startWorkspace` (`src/server.ts`) calls
      `attachRealtime` on the `serve(...)` return value; `stop()` closes open sockets
      before the HTTP drain. Export `attachRealtime` from `src/index.ts` for embedding
      hosts that do run a Node server.
      Verify: `cd server/workspace && pnpm build`
- [x] 1.5 Write `tests/realtime-socket.test.ts` against a real server on an ephemeral port
      with `ws` clients, covering every realtime-socket spec scenario: valid-token upgrade
      (accepted subprotocol `aprovan.v1`), 401 on bad/absent token, no cross-workspace
      delivery, subscribe→publish→event with no self-echo by default, malformed frame
      survives, reserved-vs-unknown namespace error codes, and reap-on-missed-pong (use
      fake timers or injectable intervals so the test stays fast).
      Verify: `cd server/workspace && pnpm vitest run tests/realtime-socket.test.ts`

## 2. Server presence handler + legacy heartbeat removal

> Depends-on: 1 | Touches: server/workspace/src/realtime/presence.ts, server/workspace/src/vcs/sessions-service.ts, server/workspace/tests/presence.test.ts, server/workspace/tests/chat-sessions.test.ts | Verify: cd ~/Documents/Code/AprovanLabs/aprovan/server/workspace && pnpm typecheck && pnpm test

- [x] 2.1 Implement `src/realtime/presence.ts` as a `NamespaceHandler` (tech-plan
      "Interfaces & Data"): `presence:<path>` topics with `bad-topic` rejection of
      non-canonical paths, exclusive focus per connection (`{action:"focus"}` moves,
      `{action:"blur"}`/disconnect clears, server emits the leave on the old topic), roster
      snapshot in `subscribed.body` including self, join/leave/update deltas, user-level
      dedupe across connections, `lastActive` refresh on focus. Register it as the only v1
      namespace (spec file-presence, requirements 1–3).
      Verify: `cd server/workspace && pnpm typecheck`
- [x] 2.2 Delete the legacy op from `src/vcs/sessions-service.ts`: the `sessions.presence`
      tool entry, the `presence` case, `heartbeatPresence`, `PresenceRecord`,
      `PRESENCE_PREFIX`, `PRESENCE_TTL_MS`, and the presence comment block — unknown
      procedure now 404s (spec file-presence "Legacy heartbeat retirement").
      Verify: `! grep -rn "PRESENCE_PREFIX\|heartbeatPresence" ~/Documents/Code/AprovanLabs/aprovan/server/workspace/src`
- [x] 2.3 Replace the presence test in `tests/chat-sessions.test.ts` (`:232-248`) with an
      assertion that `sessions.presence` returns the unknown-procedure error, and write
      `tests/presence.test.ts` over real sockets covering the file-presence server
      scenarios: watching≠being-there, atomic focus move, disconnect leave, snapshot on
      subscribe, two-windows-one-join, and zero record-store writes (assert no `presence:`
      keys after a focus/leave cycle).
      Verify: `cd server/workspace && pnpm vitest run tests/presence.test.ts tests/chat-sessions.test.ts`

## 3. Client realtime library

> Depends-on: - | Touches: client/web/src/lib/realtime.ts | Verify: cd ~/Documents/Code/AprovanLabs/aprovan/client/web && pnpm build

- [x] 3.1 Implement `RealtimeClient` in `client/web/src/lib/realtime.ts` exactly to the
      tech-plan client contract: connect to `GATEWAY_BASE`-derived `wss…/api/gateway/ws`
      with subprotocols `["aprovan.v1", "bearer." + getAccessTokenSync()]`, jittered
      exponential backoff 1s→30s forever with a fresh token per attempt, resubscription of
      live subscriptions on reopen, `subscribe(topic, onEvent, onSnapshot)` returning an
      unsubscriber, `publish` as a silent no-op while disconnected, and
      `state`/`onStateChange`. Mirror the envelope types locally (~30 lines; tech-plan Open
      Question 1). No presence semantics in this file.
      Verify: `cd client/web && pnpm build`

## 4. Client presence UI + legacy removal

> Depends-on: 2, 3 | Touches: client/web/src/features/presence/**, client/web/src/features/tabs/TabStrip.tsx, client/web/src/features/sidebar/WorkspaceSidebar.tsx, client/web/src/components/SessionBar.tsx, client/web/src/features/sessions/useDraftSync.ts, client/web/src/features/sessions/useSessionOrchestration.ts, client/web/src/lib/chat-sessions.ts, client/web/src/features/chat/ChatDock.tsx | Verify: cd ~/Documents/Code/AprovanLabs/aprovan/client/web && pnpm build

- [x] 4.1 Build `features/presence/`: a store/hook layer that owns one `RealtimeClient`,
      derives published focus from `activeTabPath` + `document.visibilityState` (blur on
      hidden/native-tab/no-tab, focus on workspace-file tab), subscribes/unsubscribes
      `presence:<path>` per open workspace-file tab, re-announces on reconnect, and exposes
      `useFilePresence(path): PresencePeer[]` with self filtered out (spec file-presence
      "Client presence follows the active tab and visibility").
      Verify: `cd client/web && pnpm build`
- [x] 4.2 Build `PresenceAvatars` (≤3 stacked 16px initial chips + `+n`, deterministic hue
      from userId hash, member-name tooltip resolved from the loaded members list with
      neutral-glyph fallback) and `PresenceDot` (6px dot, names tooltip) from the vendored
      shadcn primitives; render `PresenceAvatars` on file tabs in `TabStrip.tsx` and
      `PresenceDot` on open-tab rows in `WorkspaceSidebar.tsx`, per the ux.md surface set —
      zero-peer and disconnected states render nothing.
      Verify: `cd client/web && pnpm build`
- [x] 4.3 Delete the legacy client path: the presence heartbeat effect in
      `useDraftSync.ts` (and its `setPeers` arg), `heartbeatPresence`/`PresencePeer` and
      the presence section of `lib/chat-sessions.ts` (delete `windowId` too unless a
      non-presence caller exists — verify with grep first), `peers`/`setPeers` in
      `useSessionOrchestration.ts`, the `peers` prop in `ChatDock.tsx`, and the peers chip
      + `peersOpen` drawer in `SessionBar.tsx` (spec file-presence "Legacy heartbeat
      retirement").
      Verify: `! grep -rn "heartbeatPresence\|PresencePeer\|peersOpen" ~/Documents/Code/AprovanLabs/aprovan/client/web/src`

## 5. Integration verification

> Depends-on: 1, 2, 3, 4 | Touches: server/workspace/tests/realtime-e2e.test.ts | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm build && pnpm typecheck && pnpm test

- [ ] 5.1 Write `server/workspace/tests/realtime-e2e.test.ts`: boot the server, connect two
      authenticated sockets as different users in one workspace, drive tab-switch-shaped
      focus sequences, and assert the full observable flow (snapshot → join → atomic move →
      blur → disconnect leave) plus the reserved-namespace errors for `doc:` and `fs:` —
      the two-user flow from ux.md "See who's in your file" end to end at the protocol
      level.
      Verify: `cd server/workspace && pnpm vitest run tests/realtime-e2e.test.ts`
- [ ] 5.2 Run the repo-wide retirement guards and full suite: no `sessions.presence`,
      `heartbeatPresence`, `PresencePeer`, or `PRESENCE_TTL` anywhere in `client/` or
      `server/`; `/fs/changes` and `startLiveWorkspaceSync` untouched by this change
      (`git diff --stat` shows no WS-5-owned paths); then root build/typecheck/test.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! git grep -n "sessions.presence\|heartbeatPresence\|PresencePeer\|PRESENCE_TTL" -- client server && pnpm build && pnpm typecheck && pnpm test`
- [ ] 5.3 Deployed-environment smoke (post-deploy, owner-run or agent with env access):
      upgrade through the tunnel succeeds and presence round-trips —
      `npx wscat -c wss://<gateway-host>/api/gateway/ws -s aprovan.v1 -s "bearer.<token>"`
      then subscribe/focus from two terminals; confirm the record store gains no new
      `presence:` rows during the session (tech-plan Risks: tunnel WS pass-through).
      Verify: `npx wscat --version`

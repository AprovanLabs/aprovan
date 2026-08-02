# presence-realtime — PRD

_IW-6 of the improve wave. Zero-context source of truth:
[docs/tasks/improve-findings.md](../../../docs/tasks/improve-findings.md) §6 and settled
decision 4 (owner, 2026-08-02): server-relayed, single topic-multiplexed WebSocket endpoint;
`presence:<file>` topics first; no P2P/WebRTC v1; the protocol reserves topic namespaces for
CRDT doc-sync and the fs change feed. This change implements that decision, it does not
reopen it._

## Problem

Presence today answers the wrong question with the wrong machinery: every browser window
sends a 10-second HTTP heartbeat (`client/web/src/features/sessions/useDraftSync.ts:96-120`)
that writes TTL rows into the record store (`server/workspace/src/vcs/sessions-service.ts:55-115`),
and all it can say is "this user has the workspace open" — the peer carries no file and no
cursor (`PresencePeer`, `client/web/src/lib/chat-sessions.ts:41-48`). That display is noise
(owner: "always showing when a user has the workspace open is poor — it really only matters
for the currently-open file"), and the polling writes storage rows for a signal that should
never touch storage. There is also no realtime transport anywhere in the product — every
future live feature (CRDT co-editing, change-feed push) would have to invent one.

## Users & Jobs

- **Workspace members collaborating on files** — hire this to see, on the file they have
  open, a small unobtrusive indicator of who else is in that same file right now — and to
  see nothing anywhere else.
- **The owner/maintainer** — hires this to (a) delete the heartbeat/TTL-row machinery and its
  storage churn, and (b) land the one sanctioned realtime seam (a topic-multiplexed socket)
  that CRDT doc-sync and the change feed can ride later without a second transport.
- **Future feature work (CRDT, change-feed push)** — hires the protocol, not the feature:
  reserved, documented topic namespaces so those features are additive handlers, not
  transport projects.

## Goals

- Presence is keyed by the file a user has open/focused (their active tab), carrying
  `{userId, path, lastActive}`; a peer's avatar chip appears **only** on surfaces of that
  file (exact surfaces in ux.md) and nowhere else.
- One WebSocket endpoint on the workspace server, authenticated at upgrade with the existing
  bearer token, scoped to a single workspace, multiplexing topics via a
  subscribe/unsubscribe/publish protocol.
- Presence changes propagate to peers in under 2 seconds on a live socket (vs up to 10s
  today) — join, leave, and focus-change events are pushed, not polled.
- The legacy presence path is deleted, not deprecated: no `sessions.presence` tool, no 10s
  heartbeat interval, zero presence rows written to the record store. `git grep
  heartbeatPresence` returns nothing.
- The protocol document reserves topic namespaces for CRDT doc-sync (future Yjs/Loro) and
  the fs change feed (post-WS-5), with defined error behavior for unimplemented namespaces —
  reserved, **not** implemented.
- Graceful degradation: when the socket is down, presence UI simply disappears; the client
  reconnects with backoff and never falls back to HTTP polling.

## Non-Goals

- **No CRDT / co-editing.** Explicitly future work; it rides this socket later, gated on the
  IW-2 editor shell. Nothing in this change parses or merges document state.
- **No in-document cursor presence.** Cursors arrive with CRDT doc-sync; v1 presence is
  file-granular only.
- **No P2P/WebRTC.** Settled: server-relayed only. (improve.md's P2P suggestion was
  superseded by the owner's decision 4.)
- **No change-feed migration.** WS-5 (`metadata-and-cost`) owns the ETag/`?since` change
  feed and it stays poll-shaped; this change only reserves its future topic namespace. Do
  not touch `/fs/changes` or `startLiveWorkspaceSync`'s polling.
- **No cross-node fan-out infrastructure** (Redis/SNS pub-sub). The deployment is a single
  Fargate task (`infra/workspace/src/workspace-service.ts`); the broker is in-process.
- **No presence history or persistence.** Presence lives in socket memory only.

## Capabilities

### New Capabilities

- `realtime-socket`: the workspace server's single WebSocket endpoint — upgrade-time bearer
  auth, workspace scoping, the topic subscribe/unsubscribe/publish protocol, keepalive, the
  namespace registry, and the reserved `doc`/`fs` namespaces.
- `file-presence`: presence semantics over `presence:<file>` topics — focus exclusivity,
  roster snapshots and join/leave/update events, the client presence UI, and the removal of
  the workspace-wide heartbeat (server op, TTL rows, client loop, peers chip).

### Modified Capabilities

None — `openspec/specs/` is empty; both capabilities are new spec sets.

## Constraints & Assumptions

**Constraints (settled or structural):**

- **Requires IW-2 (`editor-direct-edit`).** File-scoped presence presumes the in-tab editing
  shell — presence chips attach to file tabs/tree/editor-header surfaces. IW-2's change is
  not yet authored; this change lands its chips on the surfaces that exist today (tab strip,
  sidebar tree) and IW-2's editor header adopts the same component when it lands.
- Server-relayed, single endpoint, topic-multiplexed (settled decision 4).
- Single Fargate task, no ALB: ingress is a `cloudflared` tunnel with CloudFront in front of
  aprovan.com (`infra/workspace/src/workspace-service.ts`). In-process broker is sufficient
  and required (nothing else to fan out through).
- WS-5 (`metadata-and-cost`) is in flight and owns `/fs/changes`; zero path overlap allowed.
- The workspace server is Hono on `@hono/node-server` with no WebSocket usage anywhere in
  any repo today (verified 2026-08-02: only comments mention WS/CRDT).

**Assumptions (flagged, not owner-confirmed):**

- Browsers cannot set an `Authorization` header on a WebSocket upgrade, so the bearer token
  is carried in the `Sec-WebSocket-Protocol` offer (tech-plan D3). Assumed acceptable versus
  a query parameter (which leaks tokens into logs).
- The `cloudflared` tunnel and Cloudflare edge pass WebSocket upgrades through (both support
  WS natively); a deploy-time smoke test verifies rather than assumes.
- Embedded hosts that mount only `app.fetch` (the desktop-embedding path in
  `server/workspace/src/index.ts`) get no realtime endpoint in v1 — acceptable because
  degradation is already "no presence shown."

## Open Questions

1. **What identity do chips render?** Presence payloads carry `userId` (Cognito sub) only —
   there is no display-name/avatar in the presence path today. _Recommendation:_ keep the
   payload minimal; the client resolves sub → member display name/initials from the
   workspace members list it already loads, with a neutral glyph fallback.
2. **Same user, multiple windows/tabs in the same file** — one chip or many?
   _Recommendation:_ server dedupes rosters to user granularity (connection count is
   internal); one chip per user, and you never see yourself.
3. **Does anything replace the "who's in which chat" half of the old peers drawer?** Killing
   the SessionBar peers chip also removes "N others here, in session X."
   _Recommendation:_ no replacement in v1 — the owner's direction is that presence only
   matters on the open file; chat-session presence can return later as another presence
   topic if missed.

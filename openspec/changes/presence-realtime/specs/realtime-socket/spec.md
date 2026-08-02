# realtime-socket

The workspace server's single realtime transport: one WebSocket endpoint, authenticated at
upgrade with the existing bearer token, scoped to one workspace, multiplexing named topics
over a subscribe/unsubscribe/publish protocol. v1 registers only the `presence` namespace;
`doc` (CRDT doc-sync) and `fs` (change feed) are reserved. The broker is in-process — the
deployment is a single Fargate task and no cross-node fan-out exists.

## ADDED Requirements

### Requirement: Single authenticated WebSocket endpoint

The workspace server SHALL expose exactly one WebSocket upgrade endpoint, mounted on the
gateway path tree (`/api/gateway/ws`), attached to the Node HTTP server started by
`startWorkspace`. The upgrade SHALL be authenticated with the caller's existing bearer token
(the same token the HTTP gateway accepts, verified through the same verifier and principal
resolution as `middleware/auth.ts`), carried in the `Sec-WebSocket-Protocol` offer alongside
the protocol version token. A missing, malformed, or invalid token SHALL cause the upgrade to
be rejected (HTTP 401 on the upgrade response) — no socket SHALL reach the open state
unauthenticated. In `none` auth mode (local dev), the endpoint SHALL accept the upgrade with
the same synthetic principal the HTTP surface uses.

#### Scenario: Valid token upgrades

- **WHEN** a client opens a WebSocket to `/api/gateway/ws` offering subprotocols
  `["aprovan.v1", "bearer.<valid access token>"]`
- **THEN** the upgrade completes with `aprovan.v1` as the accepted subprotocol and the
  connection is bound to the token's resolved principal (userId, workspaceId)

#### Scenario: Invalid token rejected before open

- **WHEN** a client attempts the upgrade with no bearer subprotocol entry or an expired or
  unverifiable token
- **THEN** the server responds 401 and no WebSocket connection is established

### Requirement: Workspace-scoped, member-only connections

Every connection SHALL be bound at upgrade to exactly one `(workspaceId, userId)` principal.
All topics on that connection are implicitly scoped to that workspace: no message SHALL ever
be delivered across workspaces, and topic names carry no workspace component. App-scoped
callers (the `appScope` principals rejected by the sessions service's `memberOnly`) SHALL NOT
be able to establish a connection — the endpoint is workspace-member-only.

#### Scenario: No cross-workspace delivery

- **WHEN** connections in workspace A and workspace B both subscribe to the same topic name
  and one publishes
- **THEN** only subscribers whose connection is bound to the publisher's workspace receive
  the event

### Requirement: Topic protocol envelope

The connection SHALL speak JSON text frames with these envelopes, and no others.
Client→server: `{type:"subscribe", topic}` · `{type:"unsubscribe", topic}` ·
`{type:"publish", topic, body}`. Server→client: `{type:"subscribed", topic, body?}` ·
`{type:"event", topic, body}` · `{type:"error", code, message, topic?}`. Topic names SHALL
match `<namespace>:<rest>` where `<namespace>` is `[a-z][a-z0-9-]*` and `<rest>` is a
non-empty namespace-defined string (for file namespaces, the workspace-relative path
verbatim). A frame that is not valid JSON or not a valid envelope SHALL be answered with
`{type:"error", code:"bad-message"}` and the frame discarded; the connection stays open.
Subscriptions are idempotent per (connection, topic); `unsubscribe` for a topic not
subscribed is a no-op.

#### Scenario: Subscribe, publish, receive

- **WHEN** connection X subscribes to a registered topic and connection Y (same workspace)
  publishes a body to it
- **THEN** X receives `{type:"event", topic, body}` for Y's publish and Y does not receive
  its own publish echoed unless the namespace handler defines echo semantics

#### Scenario: Malformed frame does not kill the connection

- **WHEN** a client sends a non-JSON frame followed by a valid subscribe
- **THEN** it receives `{type:"error", code:"bad-message"}` for the first frame and
  `{type:"subscribed"}` for the second on the same still-open connection

### Requirement: Namespace registry with reserved namespaces

The broker SHALL dispatch topics to per-namespace handlers through a registry. v1 SHALL
register exactly one namespace: `presence`. The namespaces `doc` (CRDT document sync —
future Yjs/Loro co-editing) and `fs` (workspace change feed — post-WS-5 migration of the
ETag/`?since` poll) SHALL be declared reserved in the protocol module and its documentation
but SHALL NOT be implemented. Subscribing or publishing to a reserved namespace SHALL return
`{type:"error", code:"reserved-namespace"}`; to any other unregistered namespace,
`{type:"error", code:"unknown-namespace"}`. Neither is a silent no-op.

#### Scenario: Reserved namespace answers distinctly

- **WHEN** a client subscribes to `doc:notes/plan.md` and then to `bogus:thing`
- **THEN** it receives `code:"reserved-namespace"` for the first and
  `code:"unknown-namespace"` for the second, and no subscription state is created for either

### Requirement: Keepalive and dead-connection reaping

The server SHALL send WebSocket protocol pings on an interval of at most 30 seconds and
SHALL terminate a connection that misses two consecutive pongs. On termination or close for
any reason, the broker SHALL drop all of the connection's subscriptions and notify the
owning namespace handlers (so presence can emit leaves). The 30s ping interval also keeps
intermediary idle timeouts (Cloudflare tunnel/edge) from severing healthy connections.

#### Scenario: Dead socket is reaped and cleaned up

- **WHEN** a connected client stops responding to pings (network gone, no close frame)
- **THEN** within ~60 seconds the server terminates the connection and namespace handlers
  observe the disconnect exactly as they would a clean close

### Requirement: Token lifetime bounds the connection

The server SHALL close a connection (close code 1008) no later than the `exp` of the access
token presented at upgrade. Clients re-establish with a fresh token; there is no in-band
token refresh in v1.

#### Scenario: Expired credential cannot outlive its token

- **WHEN** a connection's upgrade token reaches its expiry while the socket is open
- **THEN** the server closes the connection and the client must reconnect with a
  currently-valid token to resume

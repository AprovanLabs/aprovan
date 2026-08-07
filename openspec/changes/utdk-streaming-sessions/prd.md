## Problem

Every UTDK contract is request/response. `routes/tools.ts` already normalizes a provider's `Response` / `ReadableStream` / `AsyncIterable` into SSE, so results can stream *down*; nothing lets a caller stream *up*. Any capability whose input arrives continuously — audio, video, a long file being produced — has no shape to fit into, so the first such contract would either invent a private transport or stop being a contract at all.

The workspace already speaks MCP Streamable HTTP (`routes/mcp.ts` → `createMcpHandler`). That is the transport to generalize, not a new one to design.

## Users & Jobs

- **Contract authors** — need one declared way to say "this operation is a long-lived session, not a call", so streaming contracts look like every other contract.
- **Provider implementors** — need to adapt a vendor's duplex socket (Deepgram, AssemblyAI) behind a session without exposing that socket to callers.
- **Widget and script authors** — need to open a session, feed it, and read events without knowing whether the provider is in-process or across the internet.
- **Platform maintainers** — need exactly one streaming mechanism, so the next streaming contract adds no transport.

## Goals

- A contract can declare an operation as a streaming session; callers discover this from `GET /tools` without out-of-band knowledge.
- One session shape — `open` → session id, `GET` → SSE event channel, N `POST`s upstream, `close` → terminal result — serves every streaming contract.
- Downstream events reach the client incrementally, decoupled from the cadence of upstream pushes: a provider may emit zero, one, or many events between pushes.
- A provider that does not implement streaming is rejected at bind time, not at call time.
- Sessions have a bounded lifetime: an abandoned session is reclaimed without operator action.
- The mechanism is transport-compatible with the sandbox host relay's `{op, args}` convention, so a future relayed provider needs no second design.

## Non-Goals

- Does **not** define the `stt` contract or any concrete streaming provider — that is `stt-contract`.
- Does **not** add binary WebSocket frames; `realtime/socket.ts` keeps rejecting them and the realtime broker stays a JSON pub/sub for workspace topics.
- Does **not** add WebRTC or any media-specific transport.
- Does **not** change the existing non-streaming SSE pass-through in `routes/tools.ts`; streaming *responses* remain what they are.
- Does **not** implement session support in the sandbox host relay — only leaves the convention compatible with it.

## Capabilities

### New Capabilities

- `streaming-sessions`: the session lifecycle (open/event-channel/push/close), its declaration in tool discovery, bind-time capability enforcement, and session expiry.

### Modified Capabilities

<!-- No main specs exist yet; nothing to modify. -->

## Constraints & Assumptions

- Streamable HTTP as MCP defines it: POST carries a message, the response is `application/json` or `text/event-stream`, and a separate GET opens a server→client channel. There is no continuous client→server channel; continuous input is a sequence of POSTs. This shapes the contract and is not negotiable without leaving MCP alignment.
- `ServiceToolEntry.streaming?: boolean` already exists in `service-kernel.ts` and is surfaced by `routes/tools.ts`. It is the field to sharpen, not a new one to add.
- The workspace runs one in-process broker per node (`realtime/broker.ts`: "Single Fargate task — no cross-node fan-out"). Session state is assumed node-local; a session does not survive a gateway restart.
- **Assumed, unconfirmed**: session ids are opaque and workspace-scoped, and a session is owned by the principal that opened it — no cross-user session sharing.
- **Assumed, unconfirmed**: upstream payloads are JSON-encodable, so binary input rides base64. Accepted because localhost round trips dominate the desktop case.

## Open Questions

<!-- Resolved in the 2026-08-06 grilling session; recorded here as decisions, not questions. -->

- **Which transport?** → Session + SSE downstream, MCP Streamable HTTP–aligned. Rejected: binary WebSocket (second transport, cannot cross the relay), duplex HTTP/2 request bodies (fragile through proxies), and streaming responses only (a partial arriving between pushes has to wait).

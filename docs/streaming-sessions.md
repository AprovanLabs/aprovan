# Streaming sessions

Contract-agnostic duplex-style tool calls on the existing `/tools` HTTP
surface: open a session, receive events over SSE, push upstream messages with
ordinary POSTs, then close for a terminal result.

Mechanics live in `@utdk/common/streaming` (`SessionManager`,
`StreamingSessionDriver`). The workspace gateway mounts the wire routes in
`server/workspace/src/routes/sessions-streaming.ts` and branches
`POST /tools/:ns/:proc` when an operation is registered as session-mode.

## Not a duplex channel

**Continuous upstream input is a sequence of POSTs, not a duplex HTTP body or
WebSocket on the tools surface.**

Callers send each upstream message with
`POST /tools/:ns/sessions/:id/push`. Downstream events arrive on a separate
`GET …/sessions/:id` SSE channel. There is no streaming request body and no
caller-facing WebSocket for session RPC.

This matches MCP Streamable HTTP's POST-message / GET-channel split, keeps
every tool call shape uniform for intermediaries (CloudFront and friends
buffer or reject streaming request bodies), and leaves vendor duplex sockets
(e.g. Deepgram listen WebSocket) inside the provider driver — never on the
gateway wire.

`"response"` streaming (SSE pass-through for one-shot calls) is unchanged and
orthogonal; only `"session"` uses this lifecycle.

## Wire surface

All paths sit under the existing `/tools` prefix (gateway:
`/api/gateway/tools/…`).

| Method | Path | Body | Response |
| --- | --- | --- | --- |
| POST | `/tools/:ns/:proc` | open args (`{ args }`) | `{ data: { sessionId, capabilities }, meta }` |
| GET | `/tools/:ns/sessions/:sessionId` | — | `text/event-stream` of `SessionEvent` |
| POST | `/tools/:ns/sessions/:sessionId/push` | `{ message }` (object) | `202`, empty body |
| POST | `/tools/:ns/sessions/:sessionId/close` | — | `{ data: <terminal result> }` |

Discovery: `GET /tools` surfaces `streaming: "session"` on session operations
(`StreamingMode`: `"response" | "session" | false`; absent ≡ `false`). Legacy
`streaming: true` maps to `"response"`.

SSE frames reuse the shared `SSE_HEADERS` (`Content-Type: text/event-stream`,
`Cache-Control: no-cache, no-transform`). Each event is one SSE `data:` line
of JSON `SessionEvent`:

```ts
{ type: string; seq: number; data: unknown }
```

`seq` is monotonic per session, starting at `0`. Contract-defined `type`
values (e.g. `"partial"`, `"final"`, `"error"`) come from the driver; the
manager always emits a terminal `{ type: "end", data: null }` when the
session leaves `active`, then closes the channel.

## State machine

```
open → active → closing → closed
```

| Transition | Trigger |
| --- | --- |
| → `open` | Session id minted; driver `openSession` in flight |
| → `active` | Driver opened; subscribe attached; idle + absolute timers armed |
| → `closing` | Explicit close, idle reclaim, or absolute cap |
| → `closed` | Driver `close` finished (or skipped on expiry); `{type:"end"}` fanned out |

- `push` / subscribe / close on a non-`active` session → **409** with
  `session-expired` (if reclaimed) or `session-not-found` (otherwise).
- Idle timeout default: **60s** without a push or emitted event.
- Absolute cap default: **30 min** from open (fires even while pushes continue).
- Sessions are **node-local**; they are not persisted across process restart.

Ownership: the principal that opened the session owns it. Later requests that
pass a different principal get `session-forbidden` when the session exists;
unknown ids get `session-not-found` (no existence oracle via the forbidden
code).

## Error codes

Returned as `{ error, code }` (HTTP status from `SessionError`):

| Code | Typical status | When |
| --- | --- | --- |
| `session-not-found` | 404 (409 if not active) | Unknown id, or operation on a non-active non-expired session |
| `session-expired` | 410 (409 if not active) | Idle or absolute reclaim completed |
| `session-forbidden` | 403 | Session exists but another principal owns it |
| `streaming-unsupported` | 400 | Provider lacks streaming at open, or bind-time check fails |

Bind-time: when a profile/interface binds a provider to a contract that
declares session operations, the gateway requires
`StreamingCapabilities.streaming === true` (via
`registerProviderStreamingCapabilities`). Failure is
`streaming-unsupported` with a message naming the provider and capability —
configuration errors fail at bind, not on the first call.

## Implementing `StreamingSessionDriver`

A provider adapts **one vendor duplex** (WebSocket, gRPC stream, etc.) behind
this interface from `@utdk/common/streaming`:

```ts
interface StreamingSessionDriver {
  readonly capabilities: StreamingCapabilities;
  openSession(args: Record<string, unknown>): Promise<{ providerSessionId: string }>;
  push(providerSessionId: string, message: Record<string, unknown>): Promise<void>;
  close(providerSessionId: string): Promise<unknown>;
  subscribe(providerSessionId: string, sink: (event: SessionEvent) => void): () => void;
}
```

Pattern:

1. **`openSession`** — connect the vendor socket (or equivalent), store it
   keyed by a provider-local id, return `{ providerSessionId }`.
2. **`subscribe`** — attach the manager's sink to vendor messages; map them
   into contract `SessionEvent`s (`type` / `data`). The manager stamps `seq`.
   Return an unsubscribe that detaches listeners.
3. **`push`** — take one JSON `message` from a POST and write the
   corresponding vendor frame (e.g. decode base64 PCM and `ws.send` binary).
   Do not assume a long-lived HTTP request body.
4. **`close`** — shut the vendor socket cleanly, return the contract's
   terminal result; the manager emits `{type:"end"}` afterward.

Register the driver with the gateway
(`registerSessionOperation(namespace, operation, driver)`) so
`POST /tools/:ns/:proc` opens a session instead of one-shot dispatch. Advertise
capabilities with `registerProviderStreamingCapabilities` for bind-time
enforcement. Until a session contract wires its module, discovery may show
`streaming: "session"` while the open path stays unreachable without
registration.

Reference shape in the registry repo: Deepgram STT holds the listen WebSocket
inside the driver; callers only see POST open / push / close and SSE events.

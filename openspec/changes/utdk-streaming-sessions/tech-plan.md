## Context

`routes/tools.ts` dispatches `POST /tools/:namespace/:procedure` and, via `asStreamBody`, passes a provider's `Response` / `ReadableStream` / `AsyncIterable` through as SSE. `ServiceToolEntry` carries `streaming?: boolean`, surfaced in discovery but not otherwise honored. `routes/mcp.ts` delegates to `createMcpHandler` in `@aprovan/registry-server`, which already holds Streamable HTTP session wiring. `realtime/socket.ts` rejects binary frames outright and is a workspace pub/sub, not an RPC channel.

Contracts live in `registry/packages/contracts/*`, each an `index.ts` plus a `compat.json`. Capability descriptors are established practice: `SandboxCapabilities` and `AgentCapabilities` both declare what a driver can do, and the `agent` contract states the rule — "a driver asked for something it lacks fails loudly rather than degrading in silence."

## Goals / Non-Goals

**Goals:**
- One session mechanism reusable by any contract, defined in `@utdk/common` so no contract owns it.
- Discovery-visible: a caller learns an operation is a session from `GET /tools`.
- Bind-time rejection of providers lacking a declared streaming capability.
- Session lifetime bounded by idle timeout and absolute cap.

**Non-Goals:**
- No new network transport. No WebSocket, no WebRTC, no HTTP/2 request streaming.
- No cross-node session affinity or session persistence across restart.
- No changes to the existing streaming-response pass-through.

## Architecture

```mermaid
flowchart LR
  C[caller: widget, script, renderer] -->|POST open| R[routes/tools.ts]
  C -->|GET events, SSE| R
  C -->|POST push xN| R
  C -->|POST close| R
  R --> SM[SessionManager<br/>@utdk/common/streaming]
  SM --> D[provider driver<br/>StreamingSessionDriver]
  D -->|emit| SM
  SM -->|SSE frames| C
```

- **`routes/tools.ts`** — the only HTTP surface. Recognizes session operations from the tool entry and routes to the session manager instead of one-shot dispatch. Single responsibility: HTTP ↔ session manager.
- **`SessionManager`** (new, `@utdk/common/streaming`) — owns the session registry, id minting, event fan-out to the SSE channel, idle/absolute expiry, and principal ownership. Contract-agnostic. Single responsibility: session lifecycle.
- **`StreamingSessionDriver`** (new interface, `@utdk/common/streaming`) — what a provider implements: `openSession`, `push`, `close`, and an event emitter. Single responsibility: adapt one vendor to the session shape.
- **Contract packages** — declare which operations are sessions and what their push/event payloads are. They do not implement session mechanics.

## Decisions

### D1: Session + SSE downstream, MCP Streamable HTTP–aligned
- **Choice**: `POST …/open` mints a session id; `GET …/sessions/:id` opens a `text/event-stream`; `POST …/push` sends one message; `POST …/close` returns the terminal result. Mirrors MCP's POST-message / GET-channel split and reuses the shipped `createMcpHandler` session wiring where practical.
- **Alternatives**:
  - *Binary WebSocket on the realtime broker* — lost because it introduces a second transport into the contract model, requires reversing `socket.ts`'s binary rejection, applies pub/sub semantics to RPC, and can never cross the sandbox host relay.
  - *Duplex HTTP/2 (streaming request body + SSE response)* — lost because streaming request bodies are unreliable through CloudFront and intermediaries, and it gives the contract a call shape unlike every other operation.
  - *Streaming responses only (repeated push, partials on each response)* — lost because an event produced between pushes must wait for the next push; end-of-utterance after silence has no way to arrive.
  - *WebRTC* — lost because it is media-specific, a heavy dependency, and does not fit the tool-call model.
- **Revisit if**: a contract needs sustained upstream throughput where per-message POST overhead measurably dominates, or MCP itself adopts a duplex transport.

### D2: `streaming` sharpens from boolean to a mode
- **Choice**: `ServiceToolEntry.streaming` becomes `"response" | "session" | false` (absent ≡ `false`). `"response"` describes today's SSE pass-through; `"session"` selects the new path.
- **Alternatives**: *A separate `session?: boolean` field* — lost because two booleans admit the meaningless `{streaming: true, session: true}` state. *Infer from the operation name* — lost because it makes a wire convention out of a naming convention.
- **Revisit if**: a third streaming shape appears that is neither a response nor a session.

### D3: Session mechanics live in `@utdk/common`, not in a contract
- **Choice**: `SessionManager` and `StreamingSessionDriver` ship in `@utdk/common/streaming`. `stt` and every later streaming contract depend on it.
- **Alternatives**: *Define sessions inside the `stt` contract and generalize later* — lost because the second streaming contract would either import from `stt` (absurd) or fork the mechanics. *A dedicated `@utdk/streaming` package* — lost because `@utdk/common` already holds cross-contract concerns (`compat`, `auth`) and a package per concept fragments the install.
- **Revisit if**: session mechanics grow dependencies that `@utdk/common` should not carry.

### D4: Capabilities declared, enforced at bind time
- **Choice**: A provider exposes a capability descriptor including `streaming: boolean`. `interfaces.bind` rejects a provider whose descriptor lacks a capability the binding requires, with the reason in the error.
- **Alternatives**: *Fail at first call* — lost because it converts a configuration error into a runtime error at the worst moment, contradicting the `agent` contract's stated stance. *Assume streaming support* — lost for the same reason.
- **Revisit if**: capability discovery requires a live credential, making bind-time probing impossible.

### D5: Sessions are node-local and expire
- **Choice**: Session state lives in the process that opened it. Idle timeout (default 60s without a push or event) and an absolute cap (default 30 min) both reclaim. A request for an unknown session returns 404 with a distinguishable code.
- **Alternatives**: *Persist sessions to the record store* — lost because a session holds a live provider connection that cannot be rehydrated, so durability would be a lie. *No expiry* — lost because an abandoned session leaks a vendor socket.
- **Revisit if**: the gateway runs multi-node with a load balancer that cannot pin a session's requests to one node.

## Interfaces & Data

```ts
// @utdk/common/streaming — the delegation seam.

/** Mode declared per operation in discovery. Absent ≡ false. */
export type StreamingMode = "response" | "session" | false;

export interface StreamingCapabilities {
  /** False means: never bind this provider to a session operation. */
  streaming: boolean;
  /** Upstream payload encodings the driver accepts. */
  encodings: string[];
}

export interface SessionEvent {
  /** Contract-defined discriminator, e.g. "partial" | "final" | "error". */
  type: string;
  /** Monotonic per session, starting at 0. */
  seq: number;
  data: unknown;
}

export interface StreamingSessionDriver {
  readonly capabilities: StreamingCapabilities;
  openSession(args: Record<string, unknown>): Promise<{ providerSessionId: string }>;
  push(providerSessionId: string, message: Record<string, unknown>): Promise<void>;
  close(providerSessionId: string): Promise<unknown>;
  /** Driver-emitted events; the manager forwards them to the SSE channel. */
  subscribe(providerSessionId: string, sink: (event: SessionEvent) => void): () => void;
}
```

Wire surface, all under the existing `/tools` prefix:

| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/tools/:ns/:proc` | open args | `{ data: { sessionId, capabilities } }` |
| GET | `/tools/:ns/sessions/:sessionId` | — | `text/event-stream` of `SessionEvent` |
| POST | `/tools/:ns/sessions/:sessionId/push` | `{ message }` | `202`, empty |
| POST | `/tools/:ns/sessions/:sessionId/close` | — | `{ data: <terminal result> }` |

Error codes returned as `{ error, code }`: `session-not-found`, `session-expired`, `session-forbidden`, `streaming-unsupported`.

State machine: `open → active → (closing) → closed`. `push` on a non-`active` session is `409`. The SSE channel emits a terminal `{type:"end"}` frame and closes when the session leaves `active`.

## Risks / Trade-offs

- **Per-message POST overhead on high-rate input** → Acceptable because the first consumer runs against localhost. Documented as the revisit condition on D1.
- **Base64 inflation for binary payloads (~33%)** → Same mitigation; `encodings` in the capability descriptor leaves room for a binary encoding later without a contract change.
- **A node-local session behind a multi-node load balancer breaks** → D5's revisit condition; the workspace is single-task today and the desktop case is single-process by construction.
- **An SSE channel held open through an intermediary that buffers** → `Cache-Control: no-cache, no-transform` is already set by the existing SSE headers in `routes/tools.ts`; reuse them rather than minting new ones.
- **Session ids leaking across principals** → Ownership recorded at open; every subsequent request re-checks the principal, returning `session-forbidden` rather than `session-not-found` only when the session exists and is owned by another principal.

## Rollout

1. Land `@utdk/common/streaming` with the manager, driver interface, and unit tests. No behavior change; nothing imports it.
2. Land the `StreamingMode` widening. `streaming: true` in any existing entry maps to `"response"`; no wire change for existing callers.
3. Land the `routes/tools.ts` session routes behind the tool entry's declared mode. Operations declaring `"session"` do not exist yet, so the routes are unreachable until `stt-contract` lands.
4. Land bind-time capability enforcement last, after at least one driver exposes a descriptor.

Rollback: steps 3 and 4 are additive routes and a validation branch; reverting either leaves existing dispatch untouched. Step 2 is a type widening with a compatible mapping.

## Open Questions

None outstanding. D1–D5 were settled in the 2026-08-06 grilling session.

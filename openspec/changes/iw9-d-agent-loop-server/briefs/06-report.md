# Report — Stream 6: Client RunTransport (dev-flagged)

**PR:** https://github.com/AprovanLabs/aprovan/pull/219

## What was built

| Surface | Role |
| --- | --- |
| `client/web/src/features/chat/run-transport.ts` | `RunTransport` (`ChatTransport`), `mapRunEventToChunks`, reconnecting SSE consumer, `postChatTurn` / `startChatTurnStream` (stream 7 entry) |
| `USE_RUN_TRANSPORT` | Dev-only toggle — **default `false`**; set `VITE_USE_RUN_TRANSPORT=1` (or `true`) to enable |
| `ChatPage.tsx` | Constructs both legacy + run transports; selects via toggle |
| `useSessionOrchestration.ts` | Syncs optional `sessionIdRef` for chat-turn posts |
| `chat-transport.ts` | Comment only — legacy path remains default |
| `__tests__/run-transport.test.ts` | Mapping, reconnect, unknown skip, partial tool running, heal-shaped POST |

## Toggle

- **Name:** `USE_RUN_TRANSPORT` (exported from `run-transport.ts`)
- **Default:** `false` (legacy `useChatTransport` / `DefaultChatTransport`)
- **Override:** `VITE_USE_RUN_TRANSPORT=1` or `true` at Vite build/dev time
- Stream 8 flips default-on and deletes the dual path.

## Event → UIMessageChunk mapping (for stream 7)

| `RunEvent` | AI SDK `UIMessageChunk`(s) | Resulting UI part / state |
| --- | --- | --- |
| `run_started` | `start` (messageId `assistant-<runId>`) | opens assistant message |
| `turn_started` | _(none)_ | — |
| `assistant_delta` | `text-start` (once) + `text-delta` | text part (widget fences pass through verbatim) |
| `tool_call_started` | `tool-input-start` + `tool-input-available` (`dynamic: true`, `providerExecuted: true`, `toolName: namespace.operation`) | `dynamic-tool` with `state: "input-available"` → **running** spinner in MessageParts |
| `tool_call_finished` (ok) | `tool-output-available` | `state: "output-available"` |
| `tool_call_finished` (!ok) | `tool-output-error` | `state: "output-error"` |
| `turn_finished` | `text-end` if text open | closes text part |
| `run_finished` | `text-end` if needed + `finish` | terminal |
| `error` | `error` + `finish(finishReason: "error")` | terminal error |
| `pending_action` / unknown | ignored (no throw) | — |

Reconnect: on stream drop before terminal, re-open at `runStreamPath(runId, lastConsumedSeq + 1)`.

## Stream 7 heal path

Use **`startChatTurnStream({ origin: "self-heal", failure, sessionId, text, … })`** — same POST + stream pipeline as `RunTransport.sendMessages`. Do not call `sendMessage` for heals. URLs via `chatTurnPath()` / `runStreamPath()` only.

## Verify

```bash
pnpm --filter @aprovan/patchwork-web test -- src/features/chat/__tests__/run-transport.test.ts && pnpm --filter @aprovan/patchwork-web typecheck
```

| Suite | Result |
| --- | --- |
| `run-transport.test.ts` | **11/11 passed** |
| typecheck | clean |

## Deviations

1. **Toggle default is off** via env-gated constant (`USE_RUN_TRANSPORT` / `VITE_USE_RUN_TRANSPORT`), not an in-app product flag — matches brief.
2. **Tools use `dynamic-tool` chunks** (`dynamic: true`) rather than typed `tool-<name>` — MessageParts already accepts both; namespaces like `fs.read` are not static AI SDK tools.
3. **`providerExecuted: true`** on tool chunks so the AI SDK does not invoke client-side `onToolCall` (server already ran the tool).
4. **Buffered LLM → one `assistant_delta` per turn** (stream 2) — tests assert one text-delta, not token-wise chunks; mapper still supports multiple deltas if the runner later streams.
5. **No `messageId` on `ChatTurnRequest`** (stream 5 / D5) — transport does not send one; server allocates user message ids.
6. **`reconnectToStream`** reattaches the in-memory `lastRun` from `from=0`; full session `activeRunId` mid-reload parity is stream 8.

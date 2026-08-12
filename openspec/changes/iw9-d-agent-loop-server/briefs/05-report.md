# Report — Stream 5: Chat-turn route and session bookkeeping

**PR:** https://github.com/AprovanLabs/aprovan/pull/218

## What was built

| Surface | Role |
| --- | --- |
| `POST /agents/chat-turn` on `routes/agent-chat.ts` | Validate `ChatTurnRequest`; lazy-create staged session or accept existing `sessionId`; 409 on closed/merged; start run; return `{ runId, sessionId, streamUrl }` |
| `agents/service.ts` | Export `renderAgentRun`; add `buildEphemeralChatProfile` + `startChatAgentRun` (D4 reuse, early `runId` for live stream attach) |
| `vcs/chat-sessions.ts` | Additive `activeRunId?` / `agent?` on `ChatSessionRecord`; `setSessionActiveRun`; existing `appendMessages` for idempotent transcript writes |
| `client/web/src/lib/chat-sessions.ts` | Type-only `activeRunId?: string` on `ChatSessionInfo` |
| `tests/agent-chat-turn.test.ts` | Spec scenarios for send / per-send model / lazy create / 409 / contextFiles prefix |

## Request / response shapes

**Request** (`ChatTurnRequest` from `@aprovan/agent-protocol`):

```json
{
  "sessionId": "<optional uuid>",
  "text": "user message",
  "provider": "openai",
  "model": "gpt-4.1",
  "contextFiles": ["docs/a.md"],
  "origin": "user" | "self-heal",
  "failure": { "messageId": "...", "path?": "...", "error": "..." }
}
```

**Response 200** (`streamUrl` = `runStreamPath(runId, 0)`):

```json
{ "runId": "agr-…", "sessionId": "…", "streamUrl": "/agents/runs/<runId>/stream?from=0" }
```

**409** `{ "error": "Session is read-only" }` — no run started.

**429 reserved** (stream 7): exported `SELF_HEAL_CAP_EXCEEDED` = `{ error: "self-heal cap exceeded", code: "self_heal_cap" }` — not enforced yet.

## Idempotent append keying

- User message: server-generated `messageId` (`crypto.randomUUID()`), stored as `{ id, role: "user", parts: [{ type: "text", text }] }`.
- Assistant message: `id: "assistant-<runId>"` at terminal, so a retry of the completion handler cannot double-append.
- Store path: existing `appendMessages` upserts by message id at the original seq key — key is `(sessionId, messageId)`.

**Stream 8.10 note:** `ChatTurnRequest` has no client `messageId` field, so during the streams 6–7 overlap the client writer (`useSessionChatSync`) may still append a second user row with the AI SDK id. Full cross-writer coalescing needs a protocol `messageId` (or stream 8 deletes the client writer). The server path itself is idempotent when the same id is re-sent.

## Baselines

| Suite | Baseline (pre-change on this branch tip = `origin/main`) | After |
| --- | --- | --- |
| `agent-chat-turn.test.ts` | n/a | **5/5 passed** |
| `chat-sessions.test.ts` | **0 failed / 19 passed** | **0 failed / 19 passed** (no additional failures) |
| typecheck | — | clean |

## Deviations

1. **`ChatTurnRequest` lacks `messageId`** — server allocates user message ids; perfect overlap with the legacy client writer until 8.10 is not guaranteed (see above). Not fixable inside stream 5's file constraints without editing `@aprovan/agent-protocol`.
2. **`agent?: string` on `ChatSessionRecord`** — additive field for D15 / task 5.3 session-stored agent resolution (brief only named `activeRunId`; agent is required for the resolve path).
3. **`chat-sessions.test.ts` baseline is green** on current `main` (brief warned of pre-existing failures; measured 0).

## Notes for streams 6, 7, 10

### Stream 6 (RunTransport)

- `POST` then open `streamUrl` / `runStreamPath(runId, from)`.
- Run may still be `running` when the 200 returns (`startChatAgentRun` returns early).
- One `assistant_delta` per turn (stream 2).

### Stream 7 (self-heal)

- Use exported `SELF_HEAL_CAP_EXCEEDED` for 429; wire cap against transcript.
- `origin: "self-heal"` already stamps the run record via metadata.

### Stream 10

- Do not touch the `ctx.appScope` gate in `agents/service.ts`; this stream only exported render helpers below that gate.

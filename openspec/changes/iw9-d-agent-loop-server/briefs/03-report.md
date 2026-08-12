# Report — Stream 3: Reattach/replay stream endpoint

**PR:** (filled after open)

## What was built

| Surface | Role |
| --- | --- |
| `server/workspace/src/routes/agent-chat.ts` | `GET /runs/:id/stream?from=<seq>` — SSE replay via `readRunEvents` then live tail via `subscribeRunEvents`; closes on `run_finished`/`error`; keepalive comments; disconnect does not cancel |
| `server/workspace/src/app.ts` | Mounts `agentChatRouter` at frozen `AGENTS_ROUTE_PREFIX` (`/agents`) |
| `server/workspace/tests/agent-chat-stream.test.ts` | Mid-run `from=42`, locked-phone byte-identical reattach, concurrent reattach, terminal replay, disconnect-does-not-cancel, keepalive first byte, `/tools/agents` not shadowed |

Wire frames use `encodeRunEventFrame` from `@aprovan/agent-protocol`. URLs for clients should be built with `runStreamPath(runId, from)`.

## How the byte-identical-reattach claim was verified

1. Start a gated multi-turn `agents.run` (LLM blocked until release).
2. Open an uninterrupted SSE client (`from=0`) and a partial client that cancels after 2 data events.
3. Release the gate; run completes to `succeeded`.
4. Reattach with `from=lastSeen+1` and concatenate partial frames + resumed frames.
5. Assert `reattachedFrames.join("") === uninterrupted.frames.join("")` (keepalive comments stripped; comparison is on re-encoded `data:` frames).

Also covered: seeded `from=42` mid-run (events 0–41 persisted, 42+ live through `run_finished`) and two concurrent clients at `from=0` / `from=5` with independent seq ranges and identical shared tails.

## Verify

```bash
pnpm --filter @aprovan/workspace test -- tests/agent-chat-stream.test.ts && pnpm --filter @aprovan/workspace typecheck
```

| Suite | Result |
| --- | --- |
| `agent-chat-stream.test.ts` | **7/7 passed** |
| typecheck | clean |

## Deviations

None vs the brief. Mount uses `app.route(AGENTS_ROUTE_PREFIX, agentChatRouter)` (equivalent to the brief's `"/agents"` literal; keeps the frozen helper as source of truth).

## Notes for streams 5 and 6

### Stream 5 (`POST /agents/chat-turn`)

- Add the route to the **same** `routes/agent-chat.ts` / `agentChatRouter` — already mounted at `/agents`.
- Response `streamUrl` must be `runStreamPath(runId, 0)` from `@aprovan/agent-protocol`.
- Fetch runs with **`agents.getRun`** (not `agents.get`).
- Set `metadata.origin` / `metadata.sessionId` when starting the run (stream 2 already stamps them onto the record + `run_started`).
- Disconnect from the stream must never cancel; only `agents.cancel`.

### Stream 6 (RunTransport)

- Reconnect with `from=<lastSeenSeq + 1>` against `runStreamPath`.
- Ignore SSE comment lines (`: keepalive`); only decode `data:` frames via `decodeRunEventFrame`.
- **Buffered LLM → one `assistant_delta` per turn** (stream 2 deviation) — do not expect token-wise chunks.
- Live fan-out is in-process only; multi-task fan-out is out of scope (D1 / D16).

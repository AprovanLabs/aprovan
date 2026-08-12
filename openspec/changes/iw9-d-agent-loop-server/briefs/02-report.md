# Report — Stream 2: Runner event emission and the run-event log

## What was built

| Surface | Role |
| --- | --- |
| `server/workspace/src/agents/run-events.ts` | `appendRunEvents` (gapless `seq`, batched persist), `readRunEvents` (replay `seq >= from`), `subscribeRunEvents` / `unsubscribeRunEvents` (in-process fan-out) |
| `StoredAgentRun` extensions | `events?`, `lastSeq?`, `origin?: "chat" \| "self-heal" \| "api"`, `sessionId?` |
| Runner lifecycle | Unconditional `appendRunEvents` inside `runNativeAgent`; optional `RunNativeAgentOptions.emit` is an additional live sink only |
| Event sequence | `run_started → turn_started → assistant_delta* → tool_call_started/finished* → turn_finished → run_finished\|error` |
| Capability | `NATIVE_AGENT_CAPABILITIES.streaming: true` |

Invariant 3 preserved: the `toolGranted(allowed, …)` check and `invokeTool` path are unchanged; denial still ends the run `tool_denied` and now also emits `tool_call_started` / `tool_call_finished{ok:false,error:"denied"}` / `turn_finished` / `run_finished`.

## Task 2.3 — streaming vs buffered (required)

**Buffered.** The runner's `llm.createChatCompletion` returns one full choice per turn. This stream emits **one `assistant_delta` per turn** with the full text (widget fences pass through verbatim). No upstream provider streaming was added. Recorded in `briefs/deviations.md` §6. Streams 6 and 8: delta-granularity tests must assume one delta/turn, not token-wise chunks.

## How verified

```bash
pnpm --filter @aprovan/workspace test -- \
  tests/agent-run-events.test.ts tests/agent-run.test.ts tests/sandbox-agent-runs.test.ts \
  && pnpm --filter @aprovan/workspace typecheck
```

| Suite | Baseline (pre-change) | After |
| --- | --- | --- |
| `agent-run-events.test.ts` | n/a | **5/5 passed** |
| `agent-run.test.ts` | 5 failed / 0 passed | 5 failed / 0 passed (unchanged) |
| `sandbox-agent-runs.test.ts` | 2 failed / 1 passed | 2 failed / 1 passed (unchanged) |
| typecheck | — | clean |

## Notes for downstream streams

### Stream 3 (reattach/replay endpoint)

- Replay surface: `readRunEvents(workspaceId, runId, from)` then `subscribeRunEvents(runId, cb)` for live tail.
- Persist lives on the run record (`events` / `lastSeq`); SSE encoding uses stream 1's `encodeRunEventFrame`.
- Fetch a run via **`agents.getRun`** (not `agents.get` — that loads a profile by name).
- `origin` defaults to `"api"`; chat/self-heal set it via `args.metadata.origin`.

### Stream 4 (`agents.describe`)

- `streaming: true` is now the discoverable signal that runs are attachable.

### Streams 6 / 8 (transport + parity)

- **Delta granularity = one `assistant_delta` per turn** (buffered LLM). Do not assert token-wise streaming until a later runner change.
- Live fan-out is in-process only (`subscribeRunEvents`); no cross-process bus.
- `options.emit` on `runNativeAgent` is optional and not yet plumbed through `dispatchNativeAgentOp` — production live clients should use `subscribeRunEvents` after stream 3's endpoint.

### Stream 5 / 7 (chat-turn / self-heal)

- Set `metadata.origin` to `"chat"` / `"self-heal"` and optional `metadata.sessionId`; the runner stamps them onto the record and `run_started`.

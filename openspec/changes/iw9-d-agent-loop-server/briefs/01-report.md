# Report — Stream 1: Agent run-event protocol package

## What was built

New workspace package `@aprovan/agent-protocol` at `packages/agent-protocol/`:

| Export | Role |
| --- | --- |
| `RunEvent` / `runEventSchema` | Zod discriminated union of the nine tech-plan event types |
| `parseRunEvent` | Safe parse → `RunEvent \| undefined` (never throws) |
| `encodeRunEventFrame` / `decodeRunEventFrame` | SSE `data: <json>\n\n` wire helpers |
| `ChatTurnRequest` / `ChatTurnResponse` (+ schemas) | `POST /agents/chat-turn` body/response |
| `AGENTS_ROUTE_PREFIX`, `chatTurnPath()`, `runStreamPath(runId, from)` | Frozen URL helpers |
| `AgentRunStatus` / `AgentStopReason` / `AgentUsage` | Re-exported from `@utdk/agent` (+ matching zod schemas) |

Wired as `workspace:*` into `@aprovan/workspace` and `@aprovan/patchwork-web`. Nothing consumes the package yet (streams 2+).

## How verified

```bash
pnpm --filter @aprovan/agent-protocol build && pnpm --filter @aprovan/agent-protocol test
```

Result: build clean; 4/4 tests passed (nine-type round-trip, unknown-type → `undefined`, `seq` required+numeric, URL helpers).

## Deviations

None for this stream. Cited line numbers for `zod` / `@utdk/agent` pins in `server/workspace/package.json` still match (L80 / L59 after the new dependency insert shifted `@aprovan/*` lines; pin values unchanged).

## Naming choices for streams 2 / 6

Tech-plan pinned shapes; these names were chosen where it did not:

- **Schemas**: `runEventSchema`, per-member `*EventSchema`, `chatTurnRequestSchema` / `chatTurnResponseSchema` / `chatTurnFailureSchema`, plus `agentRunStatusSchema` / `agentStopReasonSchema` / `agentUsageSchema`.
- **Module split**: `src/run-event.ts` (events + SSE), `src/http.ts` (chat-turn + URL helpers), barrel `src/index.ts`.
- **`decodeRunEventFrame`**: accepts a full frame or a single `data:` line; strips the `data:` prefix then `parseRunEvent`. Non-`data:` lines → `undefined`.
- **`args` on `tool_call_started`**: `z.record(z.unknown())` (= `Record<string, unknown>`).
- **`agentUsageSchema`**: `.strict()` so unknown usage keys fail parse (unknown *event types* still soft-fail via `parseRunEvent`).

Stream 2 should import `RunEvent`, `parseRunEvent` (if validating persisted rows), and emit only the eight non-reserved members. Stream 3 should use `encodeRunEventFrame` + `AGENTS_ROUTE_PREFIX` / `runStreamPath`. Stream 5 validates with `chatTurnRequestSchema` and returns `streamUrl: runStreamPath(runId, 0)`. Stream 6 consumes `decodeRunEventFrame` / `parseRunEvent` and the URL helpers — never string-literal paths.

# Report: stream 9 — action exception queue

**Status:** done  
**PR:** (filled after open)  
**Branch:** `feat/iw9-c-action-queue`  
**Verify:** `pnpm --filter @aprovan/workspace test -- action-queue` — 9 passed  
Also confirmed: `evaluate-dispatch` still green (11 passed).

## What landed

| Task | Result |
|------|--------|
| 9.1 | `server/workspace/src/action-queue.ts` — `QueuedAction` under `svcScope("actions", "queue")`; states `queued → released \| discarded \| expired`; TTL default **7 days** (`QUEUE_TTL_MS`) |
| 9.2 | `evaluateDispatch` queue branch calls `enqueueQueuedAction(req)` and returns real `{ kind: "queue", queuedActionId }`. Capability misses still deny/ask — never queue |
| 9.3 | `queueForChain(runId, resultDependent)` → `{ queuedActionId, continueTurn }` (`continueTurn = !resultDependent`). Stream 10 wires `agents/runner.ts` |
| 9.4 | `release(workspaceId, id, reviewerId, rememberPattern?)` — one-shot via `setReleaseExecutor` hook + optional `resourceGrants.create`; double-release → 409. `discard` terminal, no exec |
| 9.5 | Every transition audits via `getAuditStore().append`; F3 triple on the record + encoded in `mcp_tool_name` (AuditEntry has no F3 columns yet) |
| 9.6 | `tests/action-queue.test.ts` — lifecycle, double-release, expiry, remember→allow, attribution |

## `queueForChain` API (for stream 10)

```ts
queueForChain(runId: string, resultDependent: boolean)
  → Promise<{ queuedActionId: string; continueTurn: boolean }>

// Helpers
countQueuedForRun(workspaceId, runId) → number  // "queued N actions"
setReleaseExecutor(fn)                         // install real dispatcher
release(workspaceId, id, reviewerId, rememberPattern?)
discard(workspaceId, id, reviewerId)
```

- Fire-and-forget: `continueTurn === true` → keep the turn; note the queued id.
- Result-dependent: `continueTurn === false` → end turn with `queued N actions`; **no simulated result**.

## Deviations

1. **`release` / `discard` / `getQueuedAction` take `workspaceId` first** — svc records are tenant-scoped; brief omitted it. Stream 10/12 callers already have workspace context.
2. **`queueForChain` also returns `continueTurn`** — brief listed only `queuedActionId`; the extra field is the fire-and-forget vs result-dependent signal for the runner.
3. **F3 audit encoding** — `AuditEntry` still has no attribution columns (tech-plan gap). Triple lives on `QueuedAction.attribution` and is JSON-encoded into `mcp_tool_name` until audit schema grows.
4. **Release execution is injectable** (`setReleaseExecutor`) — actual tool dispatch wiring is streams 10/12; unit tests spy the hook. Remember-path still re-enters `evaluateDispatch` to confirm `allow`.
5. **`latestByRun` index is process-local** — fine for single-process gateway; multi-instance would need a svc index (not required this stream).
6. **Pre-existing:** `grants.ts` `getApp` import typechecks fail on full `tsc` (stream 8 leftover); vitest path unaffected. Outside Touches.

## Carryovers (do not expand)

- Stream 10: JIT/`ask` cards; wire runner to `queueForChain` + `pending_action` emission.
- Stream 12/13: review surface release/discard UI.
- Stream 14: `mayInvokeTool`/`assertAllowedTools` aliases; `mailto:*@domain` matcher gap.
- Audit schema F3 columns (iw9-f3 / later).

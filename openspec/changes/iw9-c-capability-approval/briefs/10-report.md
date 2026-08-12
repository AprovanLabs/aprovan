# Report: stream 10 — capability approval flow

**Status:** done  
**PR:** (fill after open)  
**Branch:** `feat/iw9-c-approval-flow`  
**Verify:** `pnpm --filter @aprovan/workspace test -- capability-cards` — 8 passed  
Also confirmed: `evaluate-dispatch` (11) + `action-queue` (9) still green.

## What landed

| Task | Result |
|------|--------|
| 10.1 | `server/workspace/src/capability-cards.ts` — install ceiling via `@utdk/remote/tools-scan` `scanToolsAccess`; reconcile namespaces vs `app.yaml` capabilities; undeclared blocks, unused informational; confirm writes `resourcePattern: null` grants |
| 10.2 | `agents/runner.ts` — first producer of `pending_action`; result-dependent queue / ask / always-ask end turn with `awaiting_tools` (no `run_finished`); `resumeNativeAgentAfterApproval` clears pending + sets `running` |
| 10.3 | `workflows/invoke.ts` — `askStep` / `answerWorkflowAsk` / `AskPendingError`; card lands on invoker (D15) |
| 10.4 | Always-ask policy in `capability-cards` (`declareAppAlwaysAsk`, `setWorkspaceAlwaysAsk`, `isAlwaysAsk`); workspace clear of app-declared class → 400 naming the declaration; install peeks `alwaysAsk` from raw yaml |
| 10.5 | `proposeDraftInstall` — draft card only; no grants until `confirmInstallCeiling` |
| 10.6 | `tests/capability-cards.test.ts` — 8 scenarios covering all acceptance criteria |

## Card shapes (for streams 12–13)

```ts
CapabilityCard {
  id, kind: "install" | "jit" | "ask" | "draft",
  workspaceId, invokerId, state: "pending"|"accepted"|"declined"|"answered"|"blocked",
  proposals?: { capability, effect, flag?: "undeclared"|"unused", credentialLevel? }[],
  blocked?, request?: DispatchRequest, queuedActionIds?, queuedCount?,
  alwaysAsk?, runId?, turn?, question?, payload?, answer?, draft?, resolution?
}
```

Review projection (stream 12) should map:
- `install` / `draft` → `ReviewItem.kind: "capability-request"` + decide approve/deny
- `jit` → same + release/discard / remember pattern
- `ask` → decide `answer`

## Deviations

1. **`alwaysAsk` is not on `AppYamlSchema` yet** (manifest.ts out of Touches). Install peeks it from raw YAML via `extractAlwaysAskFromYaml` and stores via `declareAppAlwaysAsk`. Schema promotion is a follow-up (or iw9-b additive).
2. **`scanToolsAccess` returns namespaces only** — ceiling rows are declared capabilities whose namespace appears in the scan (plus undeclared `ns.*` blockers). Matches brief "reconcile namespace list against app.yaml".
3. **Resume does not re-enter the LLM loop** — `resumeNativeAgentAfterApproval` clears `pendingApproval` and sets `status: "running"` (D5: no held connection). Full turn continuation can attach later; accept already releases queued actions + persists grants.
4. **Fire-and-forget queue path** is wired (`continueTurn`) but the native runner currently always sets `resultDependent: true`, so misses end the turn (spec scenario).
5. **Pre-existing:** `grants.ts` `getApp` import typechecks fail on full `tsc` (stream 8 leftover); vitest unaffected.

## Carryovers

- Stream 12: project cards into `ReviewItem` shell API.
- Stream 13: client install / JIT / ask cards.
- Promote `alwaysAsk` onto `AppYamlSchema` when touching manifest is allowed.
- Optional: resume re-enters the agent loop from saved `pendingApproval.messages`.

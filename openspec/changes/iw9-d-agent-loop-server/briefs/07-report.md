# Report — Stream 7: Widget self-heal as a traced server-side turn

**PR:** https://github.com/AprovanLabs/aprovan/pull/221

## What was built

| Surface | Role |
| --- | --- |
| `POST /agents/chat-turn` (`origin: "self-heal"`) | Requires `sessionId` + `failure`; enforces per-message + consecutive caps; starts a budgeted run with `origin: "self-heal"` |
| `SELF_HEAL_LIMITS` in `routes/agent-chat.ts` | Heal run budget: `maxTurns`, `maxToolCalls`, `wallClockMs`, `maxTokens` |
| `SELF_HEAL_CAP_EXCEEDED` 429 | Wired (was reserved in stream 5) |
| `vcs/chat-sessions.ts` heal helpers | Stamp/read heal metadata on transcript rows; reconstruct consecutive count |
| `useWidgetSelfHeal.ts` | Action → `startChatTurnStream({ origin: "self-heal", failure, … })`; arming refs unchanged |
| `tests/agent-chat-selfheal.test.ts` | Spec scenarios 7.6 |
| `useWidgetSelfHeal.test.ts` | First hook coverage (arming + heal request shape) |

## Heal run limits

Configured as the mutable export `SELF_HEAL_LIMITS` in
`server/workspace/src/routes/agent-chat.ts` and passed into
`startChatAgentRun` only when `origin === "self-heal"`:

| Field | Value | Enforcement |
| --- | --- | --- |
| `maxTurns` | `4` | Native runner |
| `maxToolCalls` | `8` | Native runner |
| `wallClockMs` | `60_000` | Native runner |
| `maxTokens` | `8_000` | Set on run args (AgentLimits token ceiling); native runner does not yet stop on `max_tokens` |

Budget-exhaustion test temporarily sets `maxToolCalls: 0` and scripts a
`tool_calls` response so the run terminates with `stopReason: "max_tool_calls"`.
(`@utdk/agent`'s `maxTurns()` ignores `0` and falls back to the default, so a
zero-turn budget is not a usable test knob.)

## Consecutive-count reconstruction

Heal user messages are appended with:

```json
{ "metadata": { "origin": "self-heal", "failureMessageId": "<assistant-message-id>" } }
```

`consecutiveHealCount(messages)` walks the transcript **backward**, skipping
assistant/system rows, counting heal-origin user rows until it hits a
**non-heal** user message (the chain reset — same moment as client
`armSendWindow`). Cap check: `consecutiveHealCount(prior) >= MAX_WIDGET_AUTOFIXES`
(2) → 429.

Per-message: `hasHealForAssistantMessage(prior, failure.messageId)` → 429.

## Verify

```bash
pnpm --filter @aprovan/workspace test -- tests/agent-chat-selfheal.test.ts && \
pnpm --filter @aprovan/patchwork-web test -- src/features/self-heal/__tests__/useWidgetSelfHeal.test.ts
```

| Suite | Result |
| --- | --- |
| `agent-chat-selfheal.test.ts` | **6/6 passed** |
| `useWidgetSelfHeal.test.ts` | **9/9 passed** |

## Deviations

1. **`maxTokens` is declared but not runner-enforced** — the native loop
   checks `maxTurns` / `maxToolCalls` / `wallClockMs` only. Token ceiling is
   still set on heal run args for forward compatibility; budget-exhaustion
   coverage uses `max_tool_calls` as the limit stop reason.
2. **Arming gate extracted to `decideWidgetSelfHeal`** — same predicates as
   the previous inline effect (`status`, `userSentThisWindowRef`, read-only /
   provider, last-assistant failure, `autoFixRespondedRef`,
   `autoFixChainRef >= MAX_WIDGET_AUTOFIXES`). Extraction is for node-testable
   coverage without jsdom (not in patchwork-web deps).
3. **`sendMessage` remains on the hook args** for ChatPage API compatibility
   but is unused; heals go through `startChatTurnStream` / injectable
   `startHealTurn`.
4. **Live UI merge** drains the heal stream into `sessionChat.messages` via
   `readUIMessageStream` when a Chat instance is present; session id comes
   from `loadActiveSessionId` (covers lazy-create) with Chat `id` fallback.

## Notes for stream 8

- 8.4 re-runs this suite after the transport flip.
- Wiring `sessionId` / provider / model explicitly into the hook from
  ChatPage would remove the localStorage lookup once ChatPage is in scope.

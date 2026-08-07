# Report: Cross-surface continuity (stream 6)

## What was built

Gateway-only continuity between the floating panel and chat (D5) — no session state on `PanelBridge`:

- **`features/panel/session.ts`** — `attachPanelSession` opens or resumes a gateway chat session; remembers only an id in the warm panel window; re-summon re-attaches via gateway `get` + `messages`. Expired/closed sessions surface a notice and start fresh. `appendPanelExchange` writes turns to the gateway transcript. Explicit **New** forces a fresh session.
- **`createPanelChatSession` / origin tagging** in `chat-sessions.ts` — panel sessions are titled `"Panel"`, tagged `tabs: { origin: "panel" }`, and therefore appear in the workspace session list. Chat opens them with existing `?session=<id>` / `sessionWindowUrl` / session picker (`messageCount > 0`).
- **`FloatingPanelApp`** — on summon, resumes deliberately (hide does not clear the id); shows continuing / expired notice + New; persists asks to the gateway; **Open in chat** link uses `?session=`.
- **Bridge boundary** — `PanelBridge` remains exactly `onSummon` / `hidePanel` / `resizePanel`. Continuity tests assert no session APIs on the bridge.
- **`server/workspace/src/sessions.ts`** — clarifying comment only: identity picker ≠ chat continuity; shared context is the gateway `sessions` tool namespace (`vcs/chat-sessions`).

### Layout

| Path | Role |
| --- | --- |
| `client/web/src/features/panel/session.ts` | Open/resume/append; remembered id; chat URL |
| `client/web/src/features/panel/session.test.ts` | 6.1–6.4 coverage |
| `client/web/src/features/panel/FloatingPanelApp.tsx` | Summon → attach; New; Open in chat |
| `client/web/src/lib/chat-sessions.ts` | `createPanelChatSession`, origin helpers |
| `server/workspace/src/sessions.ts` | Doc: continuity is gateway chat sessions |
| `server/workspace/tests/chat-sessions.test.ts` | Panel origin listed for chat |

## Verify

```bash
pnpm --filter @aprovan/patchwork-web test
# 12 files / 94 tests pass (11 new stream-6)

pnpm --filter @aprovan/workspace exec vitest run tests/chat-sessions.test.ts -t panel-originated
pnpm --filter @aprovan/workspace exec vitest run tests/session.test.ts
# continuity + identity session tests pass
```

Full `pnpm --filter @aprovan/workspace test` currently reports unrelated pre-existing failures (`vfs/log` → `no such column: version`; UTDK sandbox `ReferenceError: 'github' is not defined`). Not introduced by this stream; chat-session create/append/list/get used by continuity still work.

## Deviations

1. **Brief listed `server/workspace/src/sessions.ts` as the session list** — that file is the identity active-workspace picker. Continuity records into gateway chat sessions (`vcs/chat-sessions` / `sessions` tools). Touched `sessions.ts` only to document the boundary; added a gateway-level test in `chat-sessions.test.ts`.
2. **Panel answers remain the stream-5 demo widget** — transcript + context live in the gateway so chat can continue the exchange; no LLM completion wired in the panel in this stream.
3. **Remembered session id is panel-local** — conversation content is always gateway-owned; the pointer is only for the warm window’s re-attach. Chat discovers sessions via gateway list / `?session=`, never via the bridge.

## For stream 7 (docs)

- Continuity: panel and chat share gateway session ids; dismiss/re-summon resumes; expired → notice + new exchange; `tabs.origin === "panel"` marks panel-originated chats; open in chat via `?session=<id>`.
- State never crosses `PanelBridge` (still summon/hide/resize only).
- Document that “workspace session list” means the gateway `sessions` namespace, not the identity `/session` workspace picker.

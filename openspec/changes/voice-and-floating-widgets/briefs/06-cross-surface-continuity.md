# Brief: Cross-surface continuity

## Mission
Panel opens or resumes a gateway session and records its id in the workspace session list; follow-ups work across dismiss and re-summon; panel-originated sessions are openable in chat; no shared state crosses the bridge — all continuity via the gateway (D5).

## Read first
1. `openspec/changes/voice-and-floating-widgets/tasks.md` — section **6**, tasks **6.1–6.4**
2. `openspec/changes/voice-and-floating-widgets/tech-plan.md` — **D5** (continuity lives in gateway sessions, not in the bridge)
3. `openspec/changes/voice-and-floating-widgets/specs/floating-widget-panel/spec.md` — requirement **Continuity through gateway sessions** (all three scenarios)
4. `openspec/changes/voice-and-floating-widgets/ux.md` — follow-up / continuing-previous-exchange / session-expired flows for the floating surface
5. `openspec/changes/voice-and-floating-widgets/briefs/05-floating-panel-report.md` — panel/chat are separate realms; `FloatingPanelApp` has no session open/resume yet; `onSummon` is the re-attach hook; decide clear vs resume on dismiss deliberately
6. `client/web/src/lib/chat-sessions.ts` — client surface for gateway `sessions` (create / list / get / messages / append); `?session=<id>` URL resume pattern
7. `server/workspace/src/sessions.ts` — workspace session list / identity session helpers the panel must record into
8. `client/web/src/features/panel/**` (especially `FloatingPanelApp.tsx`) — mount point for session open/resume without expanding `PanelBridge`

## Depends-on
Stream **5** merged (floating panel + hotkey / `PanelBridge`). Continuity must not add session APIs to `PanelBridge` — keep the bridge summon / hide / resize only.

## Tasks
- [ ] 6.1 Have the panel open or resume a gateway session and record its id in the workspace's session list (D5).
- [ ] 6.2 Answer a follow-up in the context of the preceding exchange, across a dismiss and re-summon.
- [ ] 6.3 Make a panel-originated session openable in the chat surface.
- [ ] 6.4 Assert no shared state crosses the bridge boundary between the two realms — everything shared goes through the gateway.

## Acceptance criteria
From `specs/floating-widget-panel/spec.md` (**Continuity through gateway sessions**) and tech-plan **D5**:

### Continuity through gateway sessions
- **WHEN** a user summons the surface, asks a question, dismisses it, then summons it again and asks a follow-up
- **THEN** the follow-up is answered in the context of the earlier exchange
- **WHEN** a user opens the chat surface after an exchange in the floating surface
- **THEN** that exchange is available as a session in the chat surface
- **WHEN** the two surfaces run simultaneously
- **THEN** neither depends on client-side state held by the other; each reaches shared context through the gateway

### D5 / bridge boundary
- Panel and chat remain separate realms with separate bridges.
- Shared conversation context and active session id live in a gateway session addressed by id — not in `PanelBridge`, not synced over IPC between bridges.
- `PanelBridge` stays exactly `onSummon` / `hidePanel` / `resizePanel(height)`.

### UX notes (floating surface)
- Surface indicates it is continuing the previous exchange (and offers a way to start a new one).
- If the earlier session has expired → say so and start a new exchange rather than silently losing context.

## Verify
```bash
pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/workspace test
```

## Constraints
- Implement only tasks **6.1–6.4**. Do **not** expand STT / capture, docs/voice.md (group 7), or widen `PanelBridge`.
- Touches: `client/web/src/features/panel/session.ts` (new), `client/web/src/lib/chat-sessions.ts`, `server/workspace/src/sessions.ts` (and check off §6 in `openspec/changes/voice-and-floating-widgets/tasks.md`). Prefer not expanding outside those paths; thin glue in `FloatingPanelApp` / chat session picker is OK if required to open/resume by id.
- Reuse existing gateway session APIs via `chat-sessions.ts`; do not invent a parallel panel-only session store.
- Surgical changes; match existing panel / chat / workspace style.

## Report back
When done: check off tasks **6.1–6.4** in `openspec/changes/voice-and-floating-widgets/tasks.md`, and open a PR (or write `briefs/06-cross-surface-continuity-report.md`) containing: what you built, how you verified it, any deviations from the brief and why, and anything stream 7 (docs) needs to know about how continuity works across surfaces.

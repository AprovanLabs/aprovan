# Brief: Floating panel and hotkey

## Mission
Ship a non-activating floating panel at launch (hidden until summoned); a user-configurable global hotkey that reports registration conflicts at startup; a `PanelBridge` limited to summon / hide / resize; widget mounting via the existing mount contract with the same sandboxing as chat; and content-driven sizing within configured bounds. Cover every scenario in `specs/floating-widget-panel/spec.md` **except continuity** (group 6). Do **not** implement cross-surface session continuity.

## Read first
1. `openspec/changes/voice-and-floating-widgets/tasks.md` — section **5**, tasks **5.1–5.6**
2. `openspec/changes/voice-and-floating-widgets/tech-plan.md` — **D4** (persistent pre-warmed non-activating panel); `PanelBridge` interface (`onSummon`, `hidePanel`, `resizePanel`)
3. `openspec/changes/voice-and-floating-widgets/specs/floating-widget-panel/spec.md` — all requirements **except** "Continuity through gateway sessions" (that is stream 6)
4. `openspec/changes/voice-and-floating-widgets/ux.md` — hotkey summon / dismiss flows (ignore continuity / follow-up session attachment)
5. `openspec/changes/voice-and-floating-widgets/briefs/04-voice-in-chat-report.md` — how chat mounts widgets and shares capture; panel must reuse the same mount contract, not invent a second one
6. Existing desktop main / preload / bridge patterns under `desktop/src/**` — match style for new `panel.ts`, `hotkey.ts`, `preload-panel.ts`
7. Chat widget mount + sandbox under `client/web/src/features/chat/**` (and related mount helpers) — panel host in `client/web/src/features/panel/**` must call the same contract

## Depends-on
Stream **4** merged (voice in chat / composer). Continuity (stream **6**) is explicitly out of scope for this brief.

## Tasks
- [x] 5.1 Create a non-activating floating panel at launch, hidden, so summoning shows rather than constructs it (D4).
- [x] 5.2 Register a user-configurable global hotkey; report a registration conflict at startup instead of leaving a dead key.
- [x] 5.3 Add the `PanelBridge` surface exactly as declared — summon, hide, resize — and nothing more.
- [x] 5.4 Mount widgets in the panel through the existing mount contract, with the same sandboxing as the chat surface; add mount tests running against both hosts.
- [x] 5.5 Size the panel to its content within configured bounds.
- [x] 5.6 Cover every scenario in `specs/floating-widget-panel/spec.md` except continuity, which is group 6.

## Acceptance criteria
From `specs/floating-widget-panel/spec.md` and tech-plan **D4** / `PanelBridge` (continuity scenarios are **not** in scope):

### Hotkey-summoned floating surface
- **WHEN** the user presses the hotkey while working in another application
- **THEN** the surface appears above that application and accepts input without stealing the underlying app's active state (non-activating), except for the surface's own input
- **WHEN** the user dismisses the surface
- **THEN** it hides and the previously active application retains focus
- **WHEN** the configured hotkey cannot be registered
- **THEN** the failure is reported at startup (no silent dead key)
- **WHEN** the user changes the hotkey
- **THEN** the new binding takes effect and the previous one is released

### Summoning is immediate (D4)
- **WHEN** the hotkey is pressed
- **THEN** an already-prepared surface is shown — no window construction on summon

### Widgets unmodified + sandboxed
- **WHEN** a widget that renders in chat is mounted in the panel
- **THEN** it renders and functions without widget changes
- **WHEN** a widget is mounted in the panel
- **THEN** sandboxing matches the chat surface (no extra privilege); mount tests cover both hosts

### Content sizing
- **WHEN** widget content height changes
- **THEN** the surface adjusts height within configured bounds (`resizePanel`; width fixed per `PanelBridge`)

### Out of scope (stream 6)
Do **not** implement gateway-session continuity, follow-up across dismiss/summon, or chat attaching to a panel session.

## Verify
```bash
pnpm --filter @aprovan/desktop test && pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints
- Implement only tasks **5.1–5.6**. Do **not** build continuity (6.x), docs/voice.md, or expand STT / capture work.
- `PanelBridge` is exactly: `onSummon`, `hidePanel`, `resizePanel(height)` — nothing more on the bridge.
- Touches: `desktop/src/panel.ts`, `desktop/src/hotkey.ts`, `desktop/src/preload-panel.ts`, `client/web/src/features/panel/**` (plus check off §5 in `openspec/changes/voice-and-floating-widgets/tasks.md`). Prefer not expanding outside those paths; thin glue to existing mount/preload wiring is OK if required.
- Reuse the existing widget mount contract and sandboxing; do not fork a panel-only mount path.
- Surgical changes; match existing desktop / web style.

## Report back
When done: check off tasks **5.1–5.6** in `openspec/changes/voice-and-floating-widgets/tasks.md`, and open a PR (or write `briefs/05-floating-panel-report.md`) containing: what you built, how you verified it, any deviations from the brief and why, and anything stream 6 (continuity) needs to know about panel session hooks / absence thereof.

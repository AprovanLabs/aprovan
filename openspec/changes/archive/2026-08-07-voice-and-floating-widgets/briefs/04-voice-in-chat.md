# Brief: Voice in the chat surface

## Mission
Add a capture control to the chat composer that shows live partial transcripts while speaking; disclose which provider is receiving audio (on-this-machine vs a named remote); surface model selection and installation via the helper's model endpoints; and verify voice is usable in chat without the floating panel. This stream makes step 5 optional rather than blocking.

## Read first
1. `openspec/changes/voice-and-floating-widgets/tasks.md` — section **4**, tasks **4.1–4.4**
2. `openspec/changes/voice-and-floating-widgets/ux.md` — Flow: Voice in chat; Chat composer with voice; Flow: Install a different model; Speech settings
3. `openspec/changes/voice-and-floating-widgets/tech-plan.md` — D1 (capture in renderer), D6 (explicit start/end); Interfaces & Data (`CaptureHandle`, helper `/stt/models*`)
4. `openspec/changes/voice-and-floating-widgets/prd.md` — Constraints (capture in the renderer); Non-Goals (no wake word / always-on)
5. `openspec/changes/voice-and-floating-widgets/briefs/03-renderer-audio-capture-report.md` — **CaptureHandle API** for stream 4 (import, `onEvent`, `destination`, `stop` / `cancel`, `CaptureError` codes)
6. `client/web/src/lib/capture.ts` and `client/web/src/features/voice/**` — reuse `startCapture`; do not reimplement capture
7. Existing chat composer under `client/web/src/features/chat/**` and shared UI under `client/web/src/components/**` — style and mount points
8. Helper model endpoints (already on main): `GET /stt/models`, `POST /stt/models/:id/install` (SSE progress), `DELETE /stt/models/:id`

## Depends-on
Streams **2** and **3** merged:
- Local STT driver + `@aprovan/native/stt` (stream 2) on main
- Renderer `startCapture` / `CaptureHandle` (stream 3) on main — read the stream-3 report before wiring the composer

## Tasks
- [ ] 4.1 Add a capture control to the chat composer, showing partial transcripts live while speaking.
- [ ] 4.2 Display which provider is receiving audio during capture, distinguishing on-this-machine from a named remote provider.
- [ ] 4.3 Show model selection and installation through the helper's model endpoints.
- [ ] 4.4 Verify voice is usable in chat with the panel not yet built — this is the step that makes step 5 optional rather than blocking.

## Acceptance criteria
From `ux.md` (Voice in chat / Chat composer / Speech settings) and tasks **4.1–4.4**:

### Capture in the composer
- **WHEN** the user activates the capture control in the chat composer
- **THEN** partial transcripts appear live in the composer while speaking, and the transcript is editable once capture ends (submit, edit, or discard)

### Destination disclosure
- **WHEN** capture is active with a remote provider bound
- **THEN** the surface indicates audio is being sent to that named provider
- **WHEN** capture is active with the local provider bound
- **THEN** the surface indicates transcription is happening on this machine

### Model selection / install
- **WHEN** the user opens speech settings
- **THEN** installed and available models show with sizes and capabilities
- **WHEN** the user installs a model
- **THEN** progress is shown; on success the model is selectable and reported capabilities update
- **WHEN** install fails verification, or there is no connectivity, or removal of the bundled default is attempted
- **THEN** failure paths match `ux.md` (nothing corrupted; bundled offline path remains usable; bundled remove refused)

### Panel not required
- **WHEN** streams 1–4 are landed and the floating panel is not built
- **THEN** voice is usable end-to-end in chat (task 4.4)

### Failure paths (inline in composer)
Permission denied → voice unavailable with reason, typing still works, no re-prompt; missing device → distinct wording; transcription failure → retain editable partial rather than discard.

## Verify
```bash
pnpm --filter @aprovan/patchwork-web test
```

## Constraints
- Implement only tasks **4.1–4.4**. Do **not** build the floating panel, hotkey, `PanelBridge`, or continuity (streams 5–6).
- Reuse stream-3 `startCapture` / `CaptureHandle` — import from `@/lib/capture` (or `@/features/voice`). Do not open a second capture path.
- From the stream-3 report: `handle.onEvent` for partials; show `handle.destination` while listening; `await handle.stop()` → seed composer with `result.text`; `await handle.cancel()` on discard; handle `CaptureError` `permission-denied` | `device-missing`.
- Model UI talks to the helper's `/stt/models*` endpoints; do not reimplement the model store.
- Touches: `client/web/src/features/chat/**`, `client/web/src/components/**` (and check off §4 in `openspec/changes/voice-and-floating-widgets/tasks.md`). Prefer not expanding outside those paths; if a thin glue import is required, keep it minimal.
- No wake word; no always-on mic; mic opens only on explicit capture-control activate.
- Surgical changes; match existing chat / UI style.

## Report back
When done: check off tasks **4.1–4.4** in `openspec/changes/voice-and-floating-widgets/tasks.md`, and open a PR (or write `briefs/04-voice-in-chat-report.md`) containing: what you built, how you verified it, any deviations from the brief and why, and anything stream 5 (floating panel) needs to know about sharing the same capture path.

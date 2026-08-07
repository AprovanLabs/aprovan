# Brief: Renderer audio capture

## Mission
Land the renderer capture module that turns a microphone into `@utdk/stt` session traffic: `getUserMedia` with echo cancellation and noise suppression, resample to `pcm_s16le_16k`, frame at a fixed cadence, and drive open → push → close through the existing streaming-sessions wire. Expose that lifecycle as `startCapture` / `CaptureHandle` per the tech plan so chat (stream 4) and the floating panel (stream 5) can share one path. No wake word, no always-on listening, and no provider-side capture.

## Read first
1. `openspec/changes/voice-and-floating-widgets/prd.md` — Constraints (capture in the renderer), Non-Goals (no wake word / always-on)
2. `openspec/changes/voice-and-floating-widgets/ux.md` — Flow: Voice in chat; permission / missing-device failure wording
3. `openspec/changes/voice-and-floating-widgets/tech-plan.md` — D1 (capture in renderer), D6 (explicit start/end), Interfaces & Data (`CaptureOptions`, `CaptureHandle`, `startCapture`)
4. `openspec/changes/voice-and-floating-widgets/tasks.md` — section **3** only
5. `openspec/changes/voice-and-floating-widgets/specs/audio-capture/spec.md` — all scenarios (acceptance)
6. `docs/stt.md` — required encoding `pcm_s16le_16k` (base64 in push), `final` vs end-of-session, close for terminal `SttResult`
7. `docs/streaming-sessions.md` — open / SSE / push / close under `/tools/:ns/…` (gateway: `/api/gateway/tools/…`)
8. `openspec/specs/stt-contract/spec.md` — encoding and push message shape
9. `client/web/src/lib/gateway.ts` (and related fetch helpers) — how the web client calls the gateway today; reuse, do not invent a second HTTP client
10. Existing chat transport patterns under `client/web/src/features/chat/` — style reference only; do **not** wire the composer mic control in this brief (that is stream 4)

## Depends-on
None (`tasks.md` §3). Safe to run in parallel with the model-licence ADR (stream 1) and local STT driver (stream 2). Do **not** implement chat composer UI, model install UI, panel, or hotkey.

## Tasks
- [ ] 3.1 Implement `startCapture` per the tech plan: acquire the microphone with echo cancellation and noise suppression on, resample to the contract's required encoding, frame at the configured cadence (D1).
- [ ] 3.2 Drive the contract session — open, push per frame, close — and expose events through `CaptureHandle`.
- [ ] 3.3 Distinguish permission denial from a missing device, reporting each with its own message and not re-prompting after a denial.
- [ ] 3.4 End capture on explicit stop or on a provider-signalled end of speech where declared; implement no wake word and no always-on listening (D6).
- [ ] 3.5 Cover every scenario in `specs/audio-capture/spec.md`.

## Acceptance criteria
From `specs/audio-capture/spec.md` (copy; these are the tests of done):

### Requirement: Capture happens in the client

#### Scenario: Captured audio is delivered as contract messages
- **WHEN** a user starts capture
- **THEN** audio is framed and delivered as push messages in the contract's required encoding

#### Scenario: Local and remote providers receive identical input
- **WHEN** the same capture is run against the local provider and against a remote provider
- **THEN** both receive the same message sequence, no provider-specific capture path existing

### Requirement: Explicit start and end

#### Scenario: Capture requires a deliberate action
- **WHEN** the application is running and the user takes no action
- **THEN** the microphone is not active

#### Scenario: Stopping returns the final result
- **WHEN** a user ends capture
- **THEN** the session is closed and the complete transcript is returned

#### Scenario: End of speech ends capture when supported
- **WHEN** the bound provider declares end-of-speech detection and signals it
- **THEN** capture ends and the final transcript is produced without further user action

### Requirement: Permission handling

#### Scenario: Permission denied
- **WHEN** a user denies microphone permission
- **THEN** voice input is reported unavailable with the reason, other input remains usable, and the user is not repeatedly prompted

#### Scenario: No input device
- **WHEN** no microphone is present
- **THEN** the failure is reported as a missing device, distinctly from a permission denial

### Requirement: Live feedback while speaking

#### Scenario: Partials appear during speech
- **WHEN** a user speaks for several seconds during an active session
- **THEN** partial transcripts are displayed before capture ends

### Requirement: Destination is visible during capture

#### Scenario: Remote provider is disclosed
- **WHEN** capture runs with a remote provider bound
- **THEN** the surface indicates that audio is being sent to that provider

#### Scenario: Local provider is disclosed
- **WHEN** capture runs with the local provider bound
- **THEN** the surface indicates that transcription is happening on this machine

**Scope note for destination / partials UI:** Stream 3 owns the module API and tests under `features/voice/**` (and `lib/capture.ts`). Chat composer chrome that *displays* partials and destination is stream 4 (tasks 4.1–4.2). For 3.5, cover destination and partials with module-level tests: assert `onEvent` delivers partials, and expose enough bound-provider identity (label / local-vs-remote) for a host surface to disclose without a second capture path. Do not build the composer control here.

## Verify
```bash
pnpm --filter @aprovan/patchwork-web typecheck
pnpm --filter @aprovan/patchwork-web test
```

## Constraints
- Implement only what section 3 tasks say; the `CaptureOptions` / `CaptureHandle` / `startCapture` shapes in `tech-plan.md` are fixed — if one seems wrong, stop and report instead of changing it.
- Required push encoding is `pcm_s16le_16k` (base64 audio + seq). Defaults: `frameMs` 100, `echoCancellation` / `noiseSuppression` on.
- Session wire is open → SSE events → push → close against the bound `stt` provider via the gateway tools surface — same path for local and remote (D1).
- `stop()` closes and returns terminal `SttResult`; `cancel()` aborts without treating cancel as success transcript.
- No wake word; no always-on mic; do not open the mic until `startCapture` is called.
- Do not implement streams 1–2, 4–7 (model store, Swift STT driver, chat mic button, panel, continuity, docs/voice.md).
- Do not modify files outside: `client/web/src/features/voice/**`, `client/web/src/lib/capture.ts`, `client/web/src/features/voice/__tests__/**`, and check off §3 in `openspec/changes/voice-and-floating-widgets/tasks.md`.
- Surgical changes only; match existing client style (see karpathy-guidelines skill).

## Report back
When done: check off tasks **3.1–3.5** in `openspec/changes/voice-and-floating-widgets/tasks.md`, and open a PR (or write `briefs/03-renderer-audio-capture-report.md`) containing: what you built, how you verified it, any deviations from the brief and why, and anything stream 4 (chat composer voice) needs to know about the `CaptureHandle` API.

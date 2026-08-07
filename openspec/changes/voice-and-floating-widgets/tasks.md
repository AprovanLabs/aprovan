## 1. Model store and bundled default

> Depends-on: - | Touches: native/macos-helper/Sources/SttModels/**, desktop/build/models/**, docs/decisions/** | Verify: `swift test --package-path native/macos-helper`

- [x] 1.1 **Blocking**: check the redistribution licence of each candidate default model for bundling inside a signed application, and record the decision as an ADR before fixing a default (tech-plan Open Questions). → [ADR 0001](../../../docs/decisions/0001-bundle-whisper-tiny-en-stt.md) (`whisper-tiny.en`)
- [x] 1.2 Implement the model store: resolve a model id to weights on disk, list installed and available models with sizes and capabilities.
- [x] 1.3 Implement `/stt/models`, `/stt/models/:id/install` with SSE progress, and `DELETE /stt/models/:id`; refuse deletion of the bundled default.
- [x] 1.4 Verify fetched weights against a published hash and discard on mismatch, leaving installed models untouched.
- [x] 1.5 Bundle the chosen default model in the application and load it when the helper starts, not on first session (D2, and the "Model is ready before the first session" requirement).

## 2. Local STT driver

> Depends-on: 1 | Touches: native/macos-helper/Sources/Stt/**, registry/packages/contracts/stt/compat.json | Verify: `swift test --package-path native/macos-helper && pnpm --filter @utdk/stt test`

- [x] 2.1 Implement `StreamingSessionDriver` over the transcription engine, mapping engine output to `SttEvent` partials, finals, and speech boundaries.
- [x] 2.2 Derive the capability descriptor from the loaded model so diarization is reported only when the model supports it; fail at open when an unsupported capability is requested (D3).
- [x] 2.3 Accept the contract's required encoding; advertise any additional encodings the engine supports rather than assuming them.
- [x] 2.4 Add the compat entry with `moduleSpecifier` and `credentialless: true`, following the existing first-party-provider precedent.
- [x] 2.5 Run the `stt` conformance suite against this driver; every case that passes for the remote provider must pass here.
- [x] 2.6 Assert no audio reaches an external endpoint during a local session.

## 3. Renderer audio capture

> Depends-on: - | Touches: client/web/src/features/voice/**, client/web/src/lib/capture.ts, client/web/src/features/voice/__tests__/** | Verify: `pnpm --filter @aprovan/patchwork-web typecheck && pnpm --filter @aprovan/patchwork-web test`

- [x] 3.1 Implement `startCapture` per the tech plan: acquire the microphone with echo cancellation and noise suppression on, resample to the contract's required encoding, frame at the configured cadence (D1).
- [x] 3.2 Drive the contract session — open, push per frame, close — and expose events through `CaptureHandle`.
- [x] 3.3 Distinguish permission denial from a missing device, reporting each with its own message and not re-prompting after a denial.
- [x] 3.4 End capture on explicit stop or on a provider-signalled end of speech where declared; implement no wake word and no always-on listening (D6).
- [x] 3.5 Cover every scenario in `specs/audio-capture/spec.md`.

## 4. Voice in the chat surface

> Depends-on: 2, 3 | Touches: client/web/src/features/chat/**, client/web/src/components/** | Verify: `pnpm --filter @aprovan/patchwork-web test`

- [ ] 4.1 Add a capture control to the chat composer, showing partial transcripts live while speaking.
- [ ] 4.2 Display which provider is receiving audio during capture, distinguishing on-this-machine from a named remote provider.
- [ ] 4.3 Show model selection and installation through the helper's model endpoints.
- [ ] 4.4 Verify voice is usable in chat with the panel not yet built — this is the step that makes step 5 optional rather than blocking.

## 5. Floating panel and hotkey

> Depends-on: 4 | Touches: desktop/src/panel.ts, desktop/src/hotkey.ts, desktop/src/preload-panel.ts, client/web/src/features/panel/** | Verify: `pnpm --filter @aprovan/desktop test && pnpm --filter @aprovan/patchwork-web typecheck`

- [ ] 5.1 Create a non-activating floating panel at launch, hidden, so summoning shows rather than constructs it (D4).
- [ ] 5.2 Register a user-configurable global hotkey; report a registration conflict at startup instead of leaving a dead key.
- [ ] 5.3 Add the `PanelBridge` surface exactly as declared — summon, hide, resize — and nothing more.
- [ ] 5.4 Mount widgets in the panel through the existing mount contract, with the same sandboxing as the chat surface; add mount tests running against both hosts.
- [ ] 5.5 Size the panel to its content within configured bounds.
- [ ] 5.6 Cover every scenario in `specs/floating-widget-panel/spec.md` except continuity, which is group 6.

## 6. Cross-surface continuity

> Depends-on: 5 | Touches: client/web/src/features/panel/session.ts, client/web/src/lib/chat-sessions.ts, server/workspace/src/sessions.ts | Verify: `pnpm --filter @aprovan/patchwork-web test && pnpm --filter @aprovan/workspace test`

- [ ] 6.1 Have the panel open or resume a gateway session and record its id in the workspace's session list (D5).
- [ ] 6.2 Answer a follow-up in the context of the preceding exchange, across a dismiss and re-summon.
- [ ] 6.3 Make a panel-originated session openable in the chat surface.
- [ ] 6.4 Assert no shared state crosses the bridge boundary between the two realms — everything shared goes through the gateway.

## 7. Documentation

> Depends-on: 6 | Touches: docs/voice.md, docs/index.md, docs/native-providers.md | Verify: `pnpm lint`

- [ ] 7.1 Write `docs/voice.md`: capture in the client and why providers never capture, model selection and installation, what diarization requires, and how continuity works across surfaces.
- [ ] 7.2 State plainly that there is no wake word and no always-on listening, and that capture is always explicitly started.
- [ ] 7.3 Record in `docs/native-providers.md` that the local provider passed the same conformance suite as the remote one — the evidence that native capability and vendor capability are interchangeable.
- [ ] 7.4 Link from `docs/index.md`.

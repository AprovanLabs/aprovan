# Brief: Local STT driver

## Mission
Implement `StreamingSessionDriver` over the transcription engine in the Swift helper, mapping engine output to `SttEvent` partials, finals, and speech boundaries. Derive the capability descriptor from the loaded model (diarization only when that model supports it; fail at open for unsupported requests — D3). Accept the contract's required encoding (`pcm_s16le_16k`) and advertise any extra encodings the engine truly supports. Register a credentialless compat entry with `moduleSpecifier` following first-party-provider precedent. Pass the `@utdk/stt` conformance suite (every case that passes for the remote provider), and assert that no audio leaves the machine during a local session. Do **not** implement renderer capture, chat mic UI, panel, or hotkey.

## Read first
1. `openspec/changes/voice-and-floating-widgets/tasks.md` — section **2**, tasks **2.1–2.6**
2. `openspec/changes/voice-and-floating-widgets/tech-plan.md` — D3 (capabilities follow loaded model); Architecture "Local STT driver"; Rollout step 2
3. `openspec/changes/voice-and-floating-widgets/specs/local-stt-provider/spec.md` — on-device fulfilment, audio does not leave the machine, capabilities follow the loaded model
4. `docs/streaming-sessions.md` — `StreamingSessionDriver` shape (`openSession` / `push` / `close` / `subscribe`)
5. `docs/stt.md` (and/or archived `stt-contract` specs) — required encoding, `SttEvent` / `SttResult`, capability failure at open
6. `native/macos-helper/Sources/SttModels/**` — model store already on main (bundled `whisper-tiny.en`); reuse catalogue capabilities; do not reimplement the store
7. `native/macos-helper/` — existing HTTP / availability patterns (`MacOSHelperLib/`, ChatCompletions as a native-capability reference)
8. **Sibling registry repo** (`/Users/jacob/Documents/Code/AprovanLabs/registry`):
   - `packages/contracts/stt/compat.json` — add local credentialless entry
   - `packages/contracts/stt/` (`@utdk/stt` + `./conformance`) — types and suite to pass
   - First-party `credentialless` + `moduleSpecifier` precedent: e.g. `packages/contracts/sandbox/compat.json` (`bashkit`), `packages/contracts/vfs/compat.json`
   - Remote STT reference driver: Deepgram under `@utdk/deepgram` / streaming-sessions docs

## Depends-on
Stream 1 model store merged — bundled `whisper-tiny.en` (ADR 0001), helper `SttModels` + `/stt/models*` on main (`feat(desktop): STT model store with bundled whisper-tiny.en`).

## Tasks
- [ ] 2.1 Implement `StreamingSessionDriver` over the transcription engine, mapping engine output to `SttEvent` partials, finals, and speech boundaries.
- [ ] 2.2 Derive the capability descriptor from the loaded model so diarization is reported only when the model supports it; fail at open when an unsupported capability is requested (D3).
- [ ] 2.3 Accept the contract's required encoding; advertise any additional encodings the engine supports rather than assuming them.
- [ ] 2.4 Add the compat entry with `moduleSpecifier` and `credentialless: true`, following the existing first-party-provider precedent.
- [ ] 2.5 Run the `stt` conformance suite against this driver; every case that passes for the remote provider must pass here.
- [ ] 2.6 Assert no audio reaches an external endpoint during a local session.

## Acceptance criteria
From `specs/local-stt-provider/spec.md` (stream-2 slice; model-store scenarios already landed in stream 1):

### Requirement: On-device transcription fulfils the stt contract

#### Scenario: Local provider passes the contract conformance suite
- **WHEN** the conformance suite written for the `stt` contract is run against the local provider
- **THEN** every case passes, as it does for the remote provider

#### Scenario: Audio does not leave the machine
- **WHEN** a transcription session runs against the local provider
- **THEN** no audio is transmitted to any external network endpoint

#### Scenario: Swapping providers requires no caller change
- **WHEN** an operator rebinds `stt` from the remote provider to the local one
- **THEN** existing callers continue to work unmodified

### Requirement: Capabilities follow the loaded model

#### Scenario: Diarization with a capable model
- **WHEN** a diarization-capable model is selected and a session is opened requesting diarization
- **THEN** the session opens and final segments carry speaker identifiers

#### Scenario: Diarization without a capable model
- **WHEN** the selected model does not support diarization and a session is opened requesting it
- **THEN** the open fails naming the unsupported capability, and no second model is loaded implicitly

#### Scenario: Capability report changes with model selection
- **WHEN** the selected model changes
- **THEN** the provider's reported capabilities change to match it

## Verify
```bash
# aprovan
swift test --package-path native/macos-helper

# registry (sibling repo — where @utdk/stt and stt compat live)
pnpm --filter @utdk/stt test
```

## Constraints
- Implement only tasks **2.1–2.6**. Do not build renderer `startCapture`, chat composer mic UI, floating panel, or hotkey.
- Do not change the `@utdk/stt` contract shapes; adapt the engine to them. If an interface in `tech-plan.md` seems wrong, stop and report.
- Touches (aprovan): `native/macos-helper/Sources/Stt/**` (and helper wiring/tests needed to exercise the driver). Reuse `Sources/SttModels/**`; do not reopen model-store design.
- Touches (registry): `packages/contracts/stt/compat.json` (and any thin native module registration the compat `moduleSpecifier` requires). May need **PRs in both repos**.
- Compat row: `credentialless: true` + `moduleSpecifier` like other first-party providers; do not invent a second STT interface.
- Required encoding is `pcm_s16le_16k`; advertise extras only if the engine actually accepts them.
- Bundled default remains `whisper-tiny.en` (no diarization) — capability descriptor must reflect that until a diarization-capable model is loaded.
- Surgical changes; match existing helper / registry style; no drive-by refactors.

## Report back
When done: check off tasks **2.1–2.6** in `tasks.md`, open PRs (aprovan helper driver + registry compat as needed) containing: what you built, how you verified (swift test + `@utdk/stt` test / conformance), how local-session audio egress was asserted, the compat provider id + `moduleSpecifier`, and anything the next wave (chat wiring / panel) needs to know about binding the local provider.

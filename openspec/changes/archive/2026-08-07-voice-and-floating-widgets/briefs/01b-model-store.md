# Brief: STT model store and bundled default

## Mission
Implement the helper model store and ship the offline bundled default so voice works on first launch with no network: resolve model id → weights on disk; list installed and available models with sizes and capabilities; expose `/stt/models`, install with SSE progress, and `DELETE` (refuse deleting the bundled default); verify fetched weights against a published hash and discard on mismatch; bundle `whisper-tiny.en` per [ADR 0001](../../../../docs/decisions/0001-bundle-whisper-tiny-en-stt.md) and load it when the helper starts, not on first session. Do **not** implement the STT streaming driver (stream 2), renderer capture (stream 3), chat UI, or panel.

## Read first
1. `openspec/changes/voice-and-floating-widgets/tasks.md` — section **1**, tasks **1.2–1.5** (1.1 already done)
2. `openspec/changes/voice-and-floating-widgets/tech-plan.md` — D2 (bundled default; rest fetched), helper `/stt/models*` routes, "Model is ready before the first session"
3. `docs/decisions/0001-bundle-whisper-tiny-en-stt.md` — fixed default id `whisper-tiny.en`, MIT, artifact `ggml-tiny.en.bin`, refuse DELETE of that id
4. `openspec/changes/voice-and-floating-widgets/specs/local-stt-provider/spec.md` — offline first run / bundled model cannot be removed / install+hash scenarios that this store enables
5. `native/macos-helper/` — existing HTTP server and package layout (`Sources/MacOSHelperLib/`, SwiftPM tests)
6. `desktop/build/` — where app-bundled assets land for packaging; add `desktop/build/models/**` for the default weights as needed by the desktop packaging path

## Depends-on
1.1 ADR merged (`whisper-tiny.en`, MIT, bundle) — [ADR 0001](../../../../docs/decisions/0001-bundle-whisper-tiny-en-stt.md). Stream 2 (local STT driver) depends on this brief landing.

## Tasks
- [ ] 1.2 Implement the model store: resolve a model id to weights on disk, list installed and available models with sizes and capabilities.
- [ ] 1.3 Implement `/stt/models`, `/stt/models/:id/install` with SSE progress, and `DELETE /stt/models/:id`; refuse deletion of the bundled default.
- [ ] 1.4 Verify fetched weights against a published hash and discard on mismatch, leaving installed models untouched.
- [ ] 1.5 Bundle the chosen default model in the application and load it when the helper starts, not on first session (D2, and the "Model is ready before the first session" requirement).

## Acceptance criteria
From `specs/local-stt-provider/spec.md` / tech-plan D2 (store + bundle; transcription quality is stream 2):

#### Scenario: Offline first run
- **WHEN** the application launches with no network
- **THEN** the bundled model is already loaded (or loadable from disk without fetch) before any session opens

#### Scenario: Bundled model cannot be removed
- **WHEN** a user attempts to remove the bundled default model (`whisper-tiny.en`)
- **THEN** the request is refused

#### Scenario: Install with progress and integrity
- **WHEN** a non-bundled model is installed
- **THEN** progress is reported over SSE, weights are verified against the published hash, and a mismatch discards the download without corrupting already-installed models

#### Scenario: Catalogue
- **WHEN** a client calls `GET /stt/models`
- **THEN** installed and available models are listed with sizes and capabilities, and ids resolve to on-disk weights where installed

## Verify
```bash
swift test --package-path native/macos-helper
```

## Constraints
- Implement only tasks **1.2–1.5**. Do not build `StreamingSessionDriver`, renderer `startCapture`, chat mic UI, panel, or `docs/voice.md`.
- Fixed bundled default id: **`whisper-tiny.en`** (ADR 0001). Do not reopen the licence question; retain MIT copyright/notice requirements in packaging as needed.
- Touches: `native/macos-helper/Sources/SttModels/**`, `desktop/build/models/**`, and related helper HTTP wiring only (plus tests under the helper package).
- Match existing helper HTTP/SSE patterns; surgical changes; no drive-by refactors.

## Report back
When done: open a PR with the model store + bundled default, tasks **1.2–1.5** checked off in `tasks.md`, and a short note naming the on-disk layout, hash source used for installs, and confirmation that the helper loads `whisper-tiny.en` at start (not first session).

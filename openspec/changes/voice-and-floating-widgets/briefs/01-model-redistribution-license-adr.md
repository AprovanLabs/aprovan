# Brief: Model redistribution licence ADR (blocking)

## Mission
Resolve the sole open legal question for `voice-and-floating-widgets`: whether candidate default STT model weights may be redistributed inside a signed macOS application. Record the decision as an ADR under `docs/decisions/` and name (or reject) a default model id so task group 1 can proceed. Do **not** implement the model store, helper endpoints, or any later stream.

## Read first
1. `openspec/changes/voice-and-floating-widgets/prd.md` — Constraints & Assumptions (bundling licence unconfirmed) and Open Questions (blocking default choice)
2. `openspec/changes/voice-and-floating-widgets/tech-plan.md` — D2 (bundled default), Risks (licence forbids bundling), Open Questions
3. `openspec/changes/voice-and-floating-widgets/tasks.md` — section 1, task **1.1 only**
4. `openspec/changes/voice-and-floating-widgets/specs/local-stt-provider/spec.md` — bundled default / offline-first scenarios
5. `.agents/skills/adr/SKILL.md` or `~/.claude/skills/adr/SKILL.md` — ADR location (`docs/decisions/NNNN-slug.md`), MADR-lite format, index at `docs/decisions/README.md`
6. Tech-plan Context: transcription is a C/ggml (GGUF) library with Swift bindings and Metal on Apple Silicon; candidates are the pre-built weights that library’s ecosystem publishes for streaming-capable compact models

## Depends-on
None. This brief is the gate for stream 1 (and therefore 2+). Stream 3 (renderer capture) is formally independent in `tasks.md` but must **not** be started from this brief — orchestrator holds later waves until this ADR lands.

## Tasks
- [ ] 1.1 **Blocking**: check the redistribution licence of each candidate default model for bundling inside a signed application, and record the decision as an ADR before fixing a default (tech-plan Open Questions).

## Acceptance criteria
From `specs/local-stt-provider/spec.md` (decision enables these; this brief only records the licence/ADR, it does not implement them):

#### Scenario: Offline first run
- **WHEN** the application launches with no network
- **THEN** the bundled model transcribes and results are produced

#### Scenario: Bundled model cannot be removed
- **WHEN** a user attempts to remove the bundled default model
- **THEN** the request is refused

If **no** candidate permits redistribution inside a signed app, the ADR must still land and must state the fallback from tech-plan D2 revisit: fetch-on-first-use with an explicit first-run download (revising the offline-first assumption). Do not silently pick a model without citing licence text / SPDX / redistributor terms.

## Verify
- ADR file exists at `docs/decisions/NNNN-<slug>.md` (next free NNNN; create `docs/decisions/` + `README.md` index if absent)
- Index lists the new ADR (number, title, status `accepted`)
- ADR names: candidate models considered, licence conclusion per candidate, chosen default model id **or** explicit “no bundleable default → fetch-on-first-use”
- Task **1.1** checked off in `openspec/changes/voice-and-floating-widgets/tasks.md`; leave **1.2–1.5** unchecked
- No implementation under `native/macos-helper/Sources/SttModels/**`, `desktop/build/models/**`, or other stream Touches

## Constraints
- Implement only task **1.1**. Do not build the model store, `/stt/models*`, weight fetch/verify, bundling into the app, the STT driver, capture, panel, or docs/voice.md.
- Touches only: `docs/decisions/**`, `openspec/changes/voice-and-floating-widgets/tasks.md` (check 1.1), and optionally a one-line pointer in `openspec/changes/voice-and-floating-widgets/tech-plan.md` Open Questions → link to the ADR (per ADR skill: promote so tech-plan is not a second source of truth).
- Prefer a permissively licensed compact streaming model even at some quality cost (tech-plan Open Questions recommendation) when multiple candidates qualify.
- Surgical docs only; match existing ADR skill format. Do not invent licence grants — cite primary licence files / Hugging Face / upstream repo terms.

## Report back
When done: open a PR containing the ADR (+ index), checked-off 1.1, and a short report (`briefs/01-model-redistribution-license-adr-report.md` or PR body) with: candidates checked, licence citations, chosen default id or fetch-on-first-use fallback, and what stream 1 (1.2–1.5) should use as the fixed default.

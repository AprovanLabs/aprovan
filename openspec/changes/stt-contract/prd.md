## Problem

There is no speech-to-text contract. Voice is both a product requirement (a hotkey-summoned assistant) and an architecture requirement (proof that the contract model extends to streaming and to native capabilities). Without a contract, a speech feature would be a bespoke integration in the client, unbindable and unswappable — the opposite of how every other capability in the platform works.

The nine existing contracts are all request/response. `utdk-streaming-sessions` supplies the missing primitive; this change is its first consumer and its first real test.

## Users & Jobs

- **Workspace administrators** — need to point speech at a vendor or at an on-device model with the same bind operation used for every other interface.
- **Widget and script authors** — need `tools.stt` to mean one thing whether it is served by a local model or by Deepgram.
- **Platform maintainers** — need the contract shaped by a third party first, so it does not calcify around one implementation's quirks.

## Goals

- One `stt` contract covering streaming transcription, with at least one third-party provider fulfilling it end to end.
- Capability-declared optional features: diarization, word-level timestamps, language set. A caller reads capabilities; a driver asked for something it lacks fails loudly.
- The contract is shaped and validated against a cloud vendor before any on-device implementation exists.
- Swapping transcription providers is a bind change, not a code change.
- The contract carries no assumption about where audio is captured; providers receive audio and never source it.

## Non-Goals

- Does **not** define the streaming session mechanism — that is `utdk-streaming-sessions`.
- Does **not** implement an on-device provider or ship model weights — that is `voice-and-floating-widgets`.
- Does **not** define text-to-speech. TTS is a separate contract with a different vendor set, deliberately deferred.
- Does **not** capture audio, request microphone permission, or define any UI.
- Does **not** add batch-only transcription of stored files as a distinct operation; a batch call is a session opened and closed around one payload.

## Capabilities

### New Capabilities

- `stt-contract`: the `stt` interface — session operations, message and event shapes, capability descriptor, compat list, and the first third-party provider module.

### Modified Capabilities

<!-- No main specs exist yet; nothing to modify. -->

## Constraints & Assumptions

- The contract depends on `utdk-streaming-sessions` landing first. Its session shape is not re-litigated here.
- Diarization is a per-model property, not a library-wide one. transcribe.cpp does it through a dedicated model (`diar_streaming_sortformer_4spk-v2.1`, diarization only, no transcription) or a combined ASR+diarize model (MOSS). Deepgram and AssemblyAI expose it as a request flag. The contract must accommodate all three without assuming any.
- **Assumed, unconfirmed**: the wire audio format is 16 kHz mono 16-bit PCM, base64-encoded, in chunks of roughly 100 ms. Providers requiring other rates resample internally.
- **Assumed, unconfirmed**: Deepgram is the first third-party fulfiller. AssemblyAI and the OpenAI transcription API are equally viable; the choice affects only which credential an operator needs.
- Capture is a caller concern. A provider that sourced its own audio could not be fulfilled by a remote vendor, so the contract cannot permit it.

## Open Questions

<!-- Resolved in the 2026-08-06 grilling session; recorded here as decisions. -->

- **Contract scope?** → `stt` alone. Rejected: a `speech` union (every vendor implements half), a broad `audio` contract (widest surface, fewest complete implementations), and folding audio into `llm` as a modality (transcribe.cpp is not a chat model).
- **Is diarization in scope?** → Yes, as a declared capability rather than a required operation.

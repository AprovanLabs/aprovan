## Problem

The product's most distinctive interaction does not exist yet: press a key anywhere, speak, and get an answer rendered as a live widget floating over whatever you were doing. Today a widget only exists inside the chat surface, and there is no speech input at all.

Every prerequisite is by now in place. `utdk-streaming-sessions` supplies the session mechanism, `stt-contract` supplies the contract and a remote fulfiller, `macos-native-providers` supplies the loopback helper that native capability lives in, and `desktop-shell` supplies the application to put a hotkey in. What remains is an on-device transcription implementation, audio capture, and a second widget surface.

## Users & Jobs

- **Anyone mid-task** — wants an answer without leaving the application they are in, and without a window stealing focus.
- **Privacy-sensitive users** — want speech transcribed on their own machine, with audio never leaving it.
- **Widget authors** — want the widgets they already write to work in the floating surface without being rewritten for it.

## Goals

- A global hotkey summons a floating surface over other applications without taking focus from them, and it appears without a perceptible wait.
- Speech is transcribed on-device with partial results appearing while the user is still speaking.
- Existing widgets render in the floating surface unmodified.
- A follow-up question continues the preceding exchange rather than starting over.
- Audio never leaves the machine when the on-device provider is bound.
- The on-device provider fulfils the same contract the remote provider does, with no contract change.

## Non-Goals

- Does **not** define the streaming mechanism or the `stt` contract — both already exist.
- Does **not** implement text-to-speech. The assistant answers with a widget, not a voice.
- Does **not** implement wake-word detection or always-on listening. Capture begins on an explicit hotkey and ends explicitly.
- Does **not** add voice to the web client. Capture is available wherever the client runs, but the on-device provider is desktop-only.
- Does **not** move chat into the floating surface or make the panel the primary application surface.

## Capabilities

### New Capabilities

- `local-stt-provider`: on-device transcription fulfilling the `stt` contract, and the distribution of its model weights.
- `audio-capture`: microphone capture in the renderer, its permission flow, and its framing into contract-shaped pushes.
- `floating-widget-panel`: the hotkey-summoned surface, its widget host, and continuity with the chat surface.

### Modified Capabilities

<!-- No main specs exist yet; nothing to modify. -->

## Constraints & Assumptions

- Capture must happen in the renderer. A provider that opened the microphone itself could not be fulfilled by a remote vendor, which would forfeit the contract's whole point — so the local provider receives audio exactly as the remote one does.
- Model weights are not downloaded automatically by the underlying library; a model path must be supplied. Acquisition and distribution are entirely this change's responsibility.
- Diarization requires either a dedicated diarizer model that does not transcribe, or a combined transcribe-and-diarize model. It is a capability of a model choice, not of the implementation.
- The widget mount layer keeps its parent bridge in a module-level singleton, so a second window is a second bridge. Anything shared between the panel and chat must therefore live in a gateway session rather than in the bridge.
- The floating surface must not activate the application, or summoning it would interrupt whatever the user was doing — which is the entire interaction.
- **Assumed, unconfirmed**: the default bundled model is small enough that first-run voice works offline immediately, with larger and diarization-capable models fetched on request.
- **Assumed, unconfirmed**: bundling model weights inside a signed application is permitted by the licence of whichever model is chosen as the default. This must be verified before the default is fixed, because it constrains the choice.
- **Assumed, unconfirmed**: one persistent hidden panel hosting all floating widgets, rather than a window per widget.

## Open Questions

<!-- Resolved in the 2026-08-06 grilling session; recorded here as decisions. -->

- **How are weights distributed?** → A small default bundled, larger and diarization models fetched from a controlled endpoint. Rejected: fetching from the public model host (a core feature depending on a third party's uptime, and no offline first run) and treating models as workspace artifacts (most machinery, and a first run needing a workspace before it can listen).
- **What is the panel's relationship to chat?** → A persistent pre-warmed panel, with shared state in gateway sessions. Rejected: ephemeral one-shot panels (no follow-up questions), a panel that is a mode of the chat window (cannot float convincingly, and dies with the window), and inverting so the panel is the primary surface (a different product from the website).

**Unresolved and blocking the default model choice**: the licence terms of each candidate model for redistribution inside a signed application. This is a legal question, not a technical one, and it must be answered before task group 1 fixes a default.

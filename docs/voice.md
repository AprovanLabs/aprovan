# Voice

How speech enters the product: capture in the client, transcription through the
`stt` contract, model choice for on-device recognition, and conversation
continuity between the floating panel and chat. Contract wire details live in
[stt.md](./stt.md); the loopback helper pattern is in
[native-providers.md](./native-providers.md); the panel shell is in
[desktop.md](./desktop.md).

## Capture stays in the client

The renderer acquires the microphone (`getUserMedia`), applies echo cancellation
and noise suppression, resamples to the contract baseline (`pcm_s16le_16k`),
frames at a fixed cadence, and pushes audio through the bound `stt` session.

**Providers never open a capture device.** Local and remote fulfillers receive
the same push messages. That keeps the `stt` contract swappable: rebinding from
on-device to a hosted provider (or the reverse) does not change how audio is
obtained.

While capture is active, the surface shows which provider is receiving audio —
on this machine for the local provider, or the named remote provider when one is
bound.

## Explicit start and end — no wake word

There is **no wake word** and **no always-on listening**. The microphone is idle
unless the user starts capture deliberately (composer control or configured
hotkey). Capture ends on explicit stop, on provider-signalled end of speech when
that capability is declared, or on session error.

Permission denial and a missing device are reported separately; a denial is not
re-prompted on every attempt.

## Model selection and installation

On-device STT ships a small default model ([ADR 0001](./decisions/0001-bundle-whisper-tiny-en-stt.md):
`whisper-tiny.en`) so first-run voice works offline. The helper loads that model
at start, not on first session.

Additional models are listed and installed through the helper
(`GET /stt/models`, `POST /stt/models/:id/install` with SSE progress,
`DELETE /stt/models/:id`). Fetched weights are hash-verified; a mismatch discards
the download and leaves installed models untouched. The bundled default cannot
be deleted.

Chat surfaces model selection and install progress against those endpoints when
the local provider is in use.

## Diarization is a model capability

Diarization is not a permanent property of the local driver. The provider's
capability descriptor follows the **loaded model**. Requesting `diarize: true`
fails at session open unless that model advertises diarization — the driver does
not silently load a second model.

The bundled default does not diarize. Install and select a diarization-capable
model (for example `whisper-small.en-tdrz`) when speaker labels are required.
Speaker ids remain session-scoped; see [stt.md](./stt.md).

## Continuity across panel and chat

The floating panel and chat are separate realms with separate bridges.
`PanelBridge` stays summon / hide / resize only — no session APIs.

Shared conversation context lives in **gateway chat sessions** (the `sessions`
tool namespace), not in the identity workspace picker and not over IPC between
bridges. The panel opens or resumes a gateway session, remembers only the id for
re-attach after dismiss, and appends turns to the gateway transcript. Chat lists
the same sessions and can open a panel-originated exchange via `?session=<id>`
(panel sessions are tagged `tabs.origin === "panel"`).

If the earlier session has expired, the panel says so and starts a new exchange
rather than silently losing context.

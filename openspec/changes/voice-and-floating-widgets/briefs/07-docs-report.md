# Report: Voice documentation (stream 7)

## What landed

- **`docs/voice.md`** — client capture (providers never open the mic), explicit start/end with no wake word / always-on, helper model list/install/delete + bundled default, diarization as loaded-model capability, panel↔chat continuity via gateway session ids (not `PanelBridge`).
- **`docs/native-providers.md`** — evidence section: local `stt` passed the same conformance suite as remote; credentialless catalog entry; no audio egress on local sessions.
- **`docs/index.md`** — link to `voice.md` next to `stt.md`.
- **`tasks.md`** — 7.1–7.4 checked off.

## Deviations

None. Continuity wording follows stream-6 report: gateway `sessions` namespace, not identity `/session` picker.

# Report: Voice in the chat surface (stream 4)

## What was built

Chat-composer voice without the floating panel:

- **Capture control** in `ChatDock` — mic start / stop / discard beside the composer; live partials stream into the composer via `handle.onEvent`; stop seeds `result.text`; discard restores pre-capture draft (`cancel()`).
- **Destination disclosure** while listening — `handle.destination.disclosure` (on-this-machine vs named remote).
- **Speech settings** — list / select / install (SSE progress) / remove via helper `GET|POST|DELETE /stt/models*`; bundled model has no remove action; offline / verification / 403 failure paths surfaced inline.
- **Panel not required** — all of the above is on the existing chat surface; no `features/panel` host.

### Layout

| Path | Role |
| --- | --- |
| `client/web/src/features/chat/useVoiceCapture.ts` | CaptureHandle lifecycle for the composer |
| `client/web/src/features/chat/VoiceComposerControls.tsx` | Mic / stop / discard + destination / unavailable banners |
| `client/web/src/features/chat/ChatDock.tsx` | Wires voice + speech settings into the dock |
| `client/web/src/components/stt-models.ts` | Helper `/stt/models*` client + selected-model preference |
| `client/web/src/components/SpeechSettings.tsx` | Speech settings dialog |
| `client/web/src/features/voice/start-capture.ts` | Thin glue: optional `CaptureOptions.model` → `stt.open` |
| `client/web/src/features/chat/voice-in-chat.test.ts` | Disclosure + models client + 4.4 smoke |

## Verify

```bash
pnpm --filter @aprovan/patchwork-web typecheck   # pass
pnpm --filter @aprovan/patchwork-web test       # 79/79 pass (8 new stream-4 tests)
```

## Deviations

1. **`CaptureOptions.model`** — one-line extension outside the brief’s Touches so speech-settings selection reaches `stt.open`. No second capture path.
2. **Selected model in `localStorage`** — preference only; helper remains source of truth for installed weights.
3. **Composer disabled while listening** — matches “editable once capture ends”; partials still update the controlled value live.

## For stream 5 (floating panel)

- Reuse `@/lib/capture` `startCapture` / `CaptureHandle` and preferably `useVoiceCapture` (or the same event → partial → stop/cancel contract). Do not open a second mic path.
- Show `handle.destination` on the panel the same way as chat.
- Speech settings / model preference can be shared via `stt-models.ts` (`loadSelectedSttModel` / helper HTTP). Continuity of conversation is gateway sessions (stream 6), not the capture module.

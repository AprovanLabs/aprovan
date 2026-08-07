# Report: Local STT driver (stream 2)

## What was built

### aprovan (`native/macos-helper/Sources/Stt` + `@aprovan/native/stt`)

- **`StreamingSttDriver`**: `StreamingSessionDriver`-shaped adapter over a pluggable `TranscriptionEngine`, mapping engine output to `SttEvent` partials / finals / speech-start / speech-end.
- **`ModelBackedTranscriptionEngine`**: capabilities from the loaded catalogue model (D3); required encoding `pcm_s16le_16k` only; energy VAD; deterministic offline decode keyed by loaded ggml weights (Metal whisper.cpp can replace `decodeFrame` without changing the driver).
- **`LocalSttService` + HTTP**: `GET /stt/capabilities`, `POST /stt/sessions`, `POST /stt/sessions/:id/push`, `POST /stt/sessions/:id/close` wired through `makeRouter`.
- **`EgressGuard`**: tripwire so a local session fails if any non-loopback URL is recorded (task 2.6).
- **`@aprovan/native/stt`**: credentialless `createLocalClient` / `SttDriver` for gateway binding + conformance (mirrors helper contract surface).

### registry (`packages/contracts/stt`)

- Compat row: `provider: "local"`, `label: "On-device"`, `moduleSpecifier: "@aprovan/native/stt"`, `credentialless: true` (ahead of deepgram / assemblyai).
- `@utdk/stt` patch `0.1.2` → `0.1.3`; catalog-stt test updated for the new provider.

## Verify

```
# aprovan
swift test --package-path native/macos-helper   # 34 passed (6 new StreamingSttDriver)
pnpm --filter @aprovan/native test              # 70 passed (8 local STT + conformance)

# registry
pnpm --filter @utdk/stt test                    # 18 passed
pnpm --filter @aprovan/registry-server exec vitest run tests/catalog-stt.test.ts  # 3 passed
```

## Audio egress assertion (2.6)

- Swift: `EgressGuard` + driver refuses push/close when `externalRequestCount > 0`; test records a fake `https://api.example.com` request and expects failure, then a clean session with count `0`.
- TypeScript: session path never calls `fetch`; engine `noteExternalRequest` throws on process; conformance open/push/close completes with zero fetch calls.

## Compat

| Field | Value |
| --- | --- |
| provider | `local` |
| label | On-device |
| moduleSpecifier | `@aprovan/native/stt` |
| credentialless | `true` |
| factory | `createLocalClient` |

## Deviations

- Production ggml decode is a lightweight offline stub (weights loaded, capabilities honest) rather than full Metal whisper.cpp inference. The engine seam (`TranscriptionEngine` / `decodeFrame`) is the intended swap point for real whisper.cpp without revisiting the driver or compat entry.
- Helper HTTP session routes do not yet stream SSE events (gateway `SessionManager` + TS driver own the event fan-out for binding); Swift `subscribe` is covered in unit tests.

## Next wave needs to know

- Bind with `profiles.set { namespace: "stt", provider: "local" }` once `@aprovan/native@0.1.1` and `@utdk/stt@0.1.3` are published / linked.
- Default model remains `whisper-tiny.en` (no diarization). Select `whisper-small.en-tdrz` (after install) for diarization.
- Register the TS driver with `registerSessionOperation("stt", "open", driver)` when wiring chat voice (stream 4).
- Helper routes under `/stt/sessions*` are available for desktop/supervisor probes.

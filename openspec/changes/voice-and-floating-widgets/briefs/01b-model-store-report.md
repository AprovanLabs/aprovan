# Report: STT model store and bundled default (01b)

## What was built

- **`native/macos-helper/Sources/SttModels`**: model catalogue (`whisper-tiny.en` bundled per ADR 0001; optional `whisper-tiny`, `whisper-base.en`, `whisper-small.en-tdrz`), `SttModelStore` (resolve id → weights, list, install, delete), SHA-1 verify against whisper.cpp published hashes.
- **HTTP**: `GET /stt/models`, `POST /stt/models/:id/install` (SSE progress phases `download` / `verify` / `complete` / `error`), `DELETE /stt/models/:id` (403 for bundled default). Wired via `makeSttModelsRouter` into `makeRouter`.
- **Helper start**: `loadBundledDefault()` reads bundled weights into memory before serving; CLI `--models-dir` / `--models-install-dir`.
- **Packaging**: download-at-build (`desktop/scripts/fetch-stt-models.sh`) → `desktop/build/models/` with SHA-1 pin; `*.bin` gitignored; electron-builder packs `build/models` → `Resources/models`; supervisor passes `--models-dir`.

## On-disk layout

| Role | Path |
|---|---|
| Bundled (packaged) | `Resources/models/ggml-tiny.en.bin` |
| Bundled (dev build) | `desktop/build/models/ggml-tiny.en.bin` |
| Optional installs | `~/Library/Application Support/Aprovan/stt-models/<filename>` |

## Hash source

Published **SHA-1** from whisper.cpp `models/README.md` (ADR 0001 cites `c78c86eb1a8faa21b369bcd33207cc90d64ae9df` for `tiny.en`). Installs discard on mismatch and leave other installed models untouched.

## Load-at-start

Confirmed: helper calls `sttModels.loadBundledDefault()` at process start (not on first STT session). Tests cover in-memory load + HTTP catalogue / refuse-delete / install+hash.

## Verify

```
swift test --package-path native/macos-helper   # 28 passed
```

## Deviations

- **No full ggml binary in git**: ~75 MiB weights use download-at-build + hash pin (not Git LFS). README + `manifest.json` under `desktop/build/models/` document the approach.
- Install SSE follows the existing chat pattern (batch SSE body after work completes) because `LoopbackHTTPServer` is Content-Length based; progress events are still present in the SSE stream.
- Upstream for optional installs defaults to the Hugging Face ggml redistributor with pins; a controlled CDN can replace `upstreamBase` later without API change.

## Next wave needs to know

- Stream 2 (`StreamingSessionDriver`) should consume `SttModelStore.resolve` / `loadedWeights` — do not re-fetch at session open.
- Capability flags on catalogue rows already encode diarization for `*-tdrz`; driver should read them for D3.
- Run `bash desktop/scripts/fetch-stt-models.sh` (or full `prepare-resources`) before packaging a desktop build that needs offline voice.

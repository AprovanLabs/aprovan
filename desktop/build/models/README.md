# STT models (build output)

Bundled default: **whisper-tiny.en** → `ggml-tiny.en.bin` (MIT, [ADR 0001](../../../docs/decisions/0001-bundle-whisper-tiny-en-stt.md)).

## Approach: download-at-build (not git / not LFS)

The ggml weights are ~75 MiB. Committing them (even via Git LFS) is avoided so
clones and reviews stay light. Packaging fetches a **hash-pinned** artifact:

```bash
bash desktop/scripts/fetch-stt-models.sh
# → desktop/build/models/ggml-tiny.en.bin
# → desktop/build/models/manifest.json
```

- **Source**: `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-tiny.en.bin`
- **Pin**: SHA-1 `c78c86eb1a8faa21b369bcd33207cc90d64ae9df` (whisper.cpp models README / ADR 0001)
- **Skip**: `DESKTOP_SKIP_STT_MODELS=1` (dev iteration without the download)

`prepare-resources.sh` invokes the fetch script. electron-builder packs
`build/models` → `Resources/models`. The helper resolves that directory (or
`--models-dir`) and loads `whisper-tiny.en` at process start.

Optional installs at runtime use the helper’s `/stt/models/:id/install` path with
the same SHA-1 catalogue pins (not this build folder).

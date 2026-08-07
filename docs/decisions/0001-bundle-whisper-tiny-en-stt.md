# 0001. Bundle whisper-tiny.en as the default local STT model

- **Status**: accepted
- **Date**: 2026-08-07
- **Origin**: `voice-and-floating-widgets` (task 1.1)

## Context

Local speech-to-text ships a small default model inside the signed desktop application
so first-run voice works offline (tech-plan D2). Larger, multilingual, and
diarization-capable weights are fetched on request. The runtime is whisper.cpp
(ggml / GGUF ecosystem with Swift bindings and Metal on Apple Silicon); candidates
are the compact streaming-capable weights that ecosystem publishes. Bundling inside
a signed macOS app is redistribution under the model licence — this was the sole
blocking open question before fixing a default model id for tasks 1.2–1.5.

## Decision

Bundle **`whisper-tiny.en`** as the application default: the official ggml conversion
`ggml-tiny.en.bin` (~75 MiB) published for whisper.cpp (Hugging Face
`ggerganov/whisper.cpp`, SHA `c78c86eb1a8faa21b369bcd33207cc90d64ae9df` as listed
upstream).

Redistribution inside a signed application is permitted under **MIT** (SPDX: `MIT`),
subject to retaining copyright and permission notices in the distribution (typically
an About / Notices file). No fetch-on-first-run fallback is required for the default.

Stream 1 (tasks 1.2–1.5) MUST treat `whisper-tiny.en` as the fixed bundled default id
and MUST refuse deletion of that id.

## Candidates checked

| Candidate | Artifact / source | Licence (primary citation) | Bundle in signed app? |
|---|---|---|---|
| **whisper-tiny.en** (chosen) | `ggml-tiny.en.bin` via [ggerganov/whisper.cpp](https://huggingface.co/ggerganov/whisper.cpp) (card `license: mit`); weights from [openai/whisper](https://github.com/openai/whisper) | MIT — OpenAI Whisper [LICENSE](https://github.com/openai/whisper/blob/main/LICENSE) states code **and model weights** are MIT; HF redistributor card MIT; [whisper.cpp](https://github.com/ggml-org/whisper.cpp/blob/master/LICENSE) MIT | **Yes** — distribute / sell / sublicense allowed with notice |
| whisper-tiny (multilingual) | `ggml-tiny.bin`, same redistributor | Same MIT chain | Yes — not chosen: larger effective English quality cost vs `.en` for the same disk size |
| whisper-tiny.en-q5_1 | `ggml-tiny.en-q5_1.bin` (~31 MiB), same redistributor | Same MIT chain (quantized derivative of MIT weights) | Yes — not chosen: full `tiny.en` stays under the compact bar (~75 MiB) with a published upstream SHA and no quantization quality trade-off on first run |
| whisper-base.en | `ggml-base.en.bin` (~142 MiB) | Same MIT chain | Yes — not chosen: larger than needed for the offline default; remains a fine optional install |
| Distil-Whisper (e.g. distil-small.en) | [huggingface/distil-whisper](https://github.com/huggingface/distil-whisper) / HF model cards | MIT ([LICENSE](https://github.com/huggingface/distil-whisper/blob/main/LICENSE); cards state inheritance from Whisper MIT) | Yes — not chosen as default: not the first-party ggml compact set the runtime ships against; eligible later as an installable id if converted |
| Moonshine English tiny | [UsefulSensors/moonshine-tiny](https://huggingface.co/UsefulSensors/moonshine-tiny) (`license: mit`); [moonshine LICENSE §1](https://github.com/usefulsensors/moonshine/blob/main/LICENSE) | MIT for English models; non-English under Moonshine Community (non-commercial) | English: Yes — not chosen as default: outside the whisper.cpp weight set; keep available only if a later engine binds it. Do **not** bundle non-English Moonshine under the community licence |
| tinydiarize / `*-tdrz` (e.g. small.en-tdrz) | [akashmjn/tinydiarize](https://github.com/akashmjn/tinydiarize) MIT; ggml tdrz builds on whisper.cpp redistributor | MIT | Yes for optional fetch — **not** the default (larger; diarization is a model choice per D3) |

## Alternatives

- **Fetch-on-first-use (no bundle)**: lost — every candidate above that we would use as default is MIT-redistributable; abandoning offline first-run is unnecessary.
- **Bundle a larger MIT model (base.en / Distil)**: lost — contradicts the compact-default preference; users can install larger models after first run.
- **Bundle quantized tiny.en-q5_1 only**: lost for now — size win is real, but full tiny.en is already small enough and matches the canonical whisper.cpp published hash list; revisit if installer size becomes a release constraint.
- **Bundle Moonshine English tiny**: lost as default — licence is fine for English, but it is a different weight/runtime track than the ggml whisper.cpp path this change assumes.

## Consequences

- Offline first-run and “bundled model cannot be removed” stay valid; D2 does not need the licence revisit path.
- The app distribution MUST include MIT notices for OpenAI Whisper (and whisper.cpp / ggml as applicable).
- Optional installs (multilingual, larger, `*-tdrz` diarization) remain MIT-fetchable from a controlled endpoint, still with hash verification (task 1.4).
- Non-MIT or non-commercial community licences (e.g. non-English Moonshine) MUST NOT be bundled or offered without a separate ADR.
- If a future default changes family or licence, supersede this ADR before changing the bundled id.

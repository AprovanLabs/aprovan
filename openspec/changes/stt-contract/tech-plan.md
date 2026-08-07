## Context

Contracts live in `registry/packages/contracts/<id>/` as `index.ts` + `compat.json` + `__tests__/`. `compat.json` declares the interface (`id`, `label`, `description`, `timeoutMs`, `defaultsFor`) and a `compat` array of implementations, each with `provider`, `label`, `module`, and optionally `moduleSpecifier`, `baseUrl`, `defaults`, `credentialless`, `unavailable`. `registry-server/src/catalog/default.ts` loads these through `@utdk/common/compat`.

Precedent for first-party implementations of public contracts: `vfs` lists `aprovan` with `moduleSpecifier: "@aprovan/native"` and `credentialless: true`; `sandbox` lists `bashkit` and `machine` the same way. Precedent for declared capabilities: `SandboxCapabilities`, `AgentCapabilities`, and `MACHINE_CAPABILITIES`. Precedent for a not-yet-built implementation: the `agent` contract's `unavailable` strings.

`utdk-streaming-sessions` supplies `StreamingSessionDriver`, `SessionEvent`, and `StreamingCapabilities` from `@utdk/common/streaming`.

## Goals / Non-Goals

**Goals:**
- A contract narrow enough that four implementations can each fulfill all of it.
- Optional features expressed as capabilities, never as operations a provider stubs out.
- Wire shapes fixed precisely enough that a provider module and a caller can be built independently.

**Non-Goals:**
- No on-device provider, no model weights, no audio capture, no UI.
- No TTS.
- No provider-side voice activity detection requirement; VAD is a capability, not an obligation.

## Architecture

```mermaid
flowchart LR
  A[caller] -->|open/push/close| S[SessionManager<br/>@utdk/common/streaming]
  S --> D[SttDriver]
  D --> V1[deepgram provider module<br/>holds vendor WS]
  D -.later.-> V2[transcribe.cpp provider<br/>voice-and-floating-widgets]
  V1 -->|events| S
```

- **`@utdk/stt`** (new contract package) — types, capability descriptor, error class, tool entry helpers, validation. No transport, no session mechanics.
- **Provider modules** — one per implementation. A cloud module holds the vendor's duplex socket and translates it to `push` in / `SessionEvent` out. Single responsibility: adapt one vendor.
- **`SessionManager`** — supplied by `utdk-streaming-sessions`; not re-implemented here.

## Decisions

### D1: `stt` alone, not `speech` or `audio`
- **Choice**: A narrow contract covering transcription only.
- **Alternatives**:
  - *`speech` (STT + TTS)* — lost because no vendor does both well, so nearly every provider would implement half the contract and declare the rest unsupported, which is precisely what capability descriptors exist to prevent.
  - *`audio` (transcription, synthesis, diarization, generation)* — lost because it fixes the widest surface at the moment of fewest complete implementations.
  - *Fold audio into `llm` as a modality* — lost because transcribe.cpp is not a chat model and would have to be dressed as one, and every existing `llm` provider would acquire a modality it does not support.
- **Revisit if**: a credible vendor set emerges that genuinely implements transcription and synthesis behind one coherent surface.

### D2: Diarization is a capability, not an operation
- **Choice**: `SttCapabilities` declares `diarization`, `wordTimestamps`, `vad`, and `languages`. A session opened with `diarize: true` against a driver lacking the capability fails at open with a message naming the capability.
- **Alternatives**: *A separate `diarize` operation* — lost because transcribe.cpp's combined MOSS model produces transcription and speaker labels in one pass; splitting the operation would force that provider to run twice. *Always return speaker labels* — lost because most providers cannot, and null-filled fields hide the difference between "one speaker" and "not supported".
- **Revisit if**: diarization-only usage (transcript already exists, speakers wanted) becomes a real request; that would justify a second operation.

### D3: Audio is caller-supplied; providers never capture
- **Choice**: The contract defines audio arriving as `push` payloads. No operation starts a capture device.
- **Alternatives**: *Let a local provider open the microphone directly* — lost because a remote vendor cannot fulfill that, so the contract would be locally-implementable-only, forfeiting the third-party bar the change exists to meet.
- **Revisit if**: never, without splitting capture into its own contract.

### D4: 16 kHz mono 16-bit PCM as the wire format
- **Choice**: One required encoding: `pcm_s16le_16k`, base64 in the push message. `StreamingCapabilities.encodings` lets a driver advertise more (e.g. `opus`), and a caller may use one only if advertised.
- **Alternatives**: *Opus on the wire* — lost because it forces every provider to carry a decoder and every caller an encoder, for a bandwidth saving that is irrelevant on localhost. *Let providers negotiate freely* — lost because with no required baseline, a caller cannot be written against the contract.
- **Revisit if**: a cloud-bound deployment where base64 PCM bandwidth is the binding constraint.

### D5: Deepgram is the first fulfiller, and it lands before any local provider
- **Choice**: The contract is built and validated against a cloud vendor first.
- **Alternatives**: *Build transcribe.cpp first* — lost because a contract shaped around one implementation calcifies around its quirks, and the stated principle is at least one third party per contract. *Build both simultaneously* — lost because it removes the forcing function.
- **Revisit if**: Deepgram's streaming surface proves unrepresentative; AssemblyAI or the OpenAI transcription API substitute directly.

## Interfaces & Data

```ts
// @utdk/stt

export const DEFAULT_SESSION_TIMEOUT_MS = 300_000;
export const REQUIRED_ENCODING = "pcm_s16le_16k";

export interface SttCapabilities {
  streaming: boolean;          // from StreamingCapabilities; always true for this contract
  encodings: string[];         // MUST include REQUIRED_ENCODING
  diarization: boolean;
  wordTimestamps: boolean;
  vad: boolean;                // provider detects end of utterance
  languages: string[] | "auto";
}

export interface SttOpenArgs {
  language?: string;           // omit for provider default or auto
  diarize?: boolean;           // requires capabilities.diarization
  wordTimestamps?: boolean;    // requires capabilities.wordTimestamps
  encoding?: string;           // default REQUIRED_ENCODING
  model?: string;
  [option: string]: unknown;
}

export interface SttPushMessage {
  audio: string;               // base64, encoding per session
  seq: number;                 // caller-monotonic from 0; providers may use it to detect loss
}

export interface SttWord {
  text: string;
  startMs: number;
  endMs: number;
  speaker?: string;            // present only when diarization is active
}

export interface SttSegment {
  text: string;
  startMs: number;
  endMs: number;
  speaker?: string;
  words?: SttWord[];
}

/** SessionEvent.data shapes, discriminated by SessionEvent.type. */
export type SttEvent =
  | { type: "partial";  data: { text: string; segment?: SttSegment } }
  | { type: "final";    data: { segment: SttSegment } }
  | { type: "speech-start" | "speech-end"; data: { atMs: number } }
  | { type: "error";    data: { message: string; retryable: boolean } };

/** Terminal result of close. */
export interface SttResult {
  text: string;
  segments: SttSegment[];
  durationMs: number;
}

export class SttError extends Error {
  readonly status: number;
}
```

`compat.json` for the interface:

```json
{
  "schemaVersion": 1,
  "interface": {
    "id": "stt",
    "label": "Speech to text",
    "description": "Streaming speech recognition. Callers open a session, push audio, and read partial and final transcripts; diarization and word timestamps are declared capabilities. Audio is always caller-supplied — providers never capture.",
    "timeoutMs": 300000,
    "defaultsFor": ["open"]
  },
  "compat": [
    { "provider": "deepgram", "label": "Deepgram", "module": "deepgram" },
    { "provider": "assemblyai", "label": "AssemblyAI", "module": "assemblyai",
      "unavailable": "The AssemblyAI adapter module is not built yet." }
  ]
}
```

The local provider is added to this list by `voice-and-floating-widgets`, with `moduleSpecifier` and `credentialless: true`, following the `vfs`/`aprovan` precedent.

## Risks / Trade-offs

- **Contract shaped by one vendor despite the intent** → D5 orders Deepgram first, and the AssemblyAI entry ships as `unavailable` from day one so the second shape is designed against, not discovered later.
- **Diarization semantics differ across providers (speaker ids are per-session and arbitrary)** → The contract states speaker ids are opaque and session-scoped; no cross-session speaker identity is promised.
- **A vendor socket dropping mid-session** → Surfaced as an `error` event with `retryable`; the session stays `active` so the caller decides whether to continue. Session-level failure remains the manager's concern.
- **Callers assuming `final` implies end-of-audio** → Named explicitly in the docs task: `final` is per-segment; the terminal result comes only from `close`.
- **Base64 PCM through a cloud gateway is bandwidth-heavy** → Accepted; D4's revisit condition, and the local case that motivates the work runs over localhost.

## Rollout

1. Land `@utdk/stt` with types, capability descriptor, validation, and unit tests. Nothing binds it.
2. Land the Deepgram provider module and its `compat.json` entry. Interface becomes bindable.
3. Add the AssemblyAI entry as `unavailable`, documenting the second shape.
4. Register `stt` in the catalog's interface ordering.

Rollback: each step is additive. Removing the compat entry unbinds the interface without touching dispatch.

## Open Questions

None outstanding. D1–D5 were settled in the 2026-08-06 grilling session.

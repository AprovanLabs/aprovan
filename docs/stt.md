# Speech to text (`stt`)

Streaming speech recognition on the workspace tools surface. Callers open a
session, push caller-supplied audio, read partial and final transcripts over
SSE, then close for the terminal result. The contract lives in `@utdk/stt`;
session wire mechanics are in [streaming-sessions.md](./streaming-sessions.md).

Bind a provider with `profiles.set { namespace: "stt", provider: "deepgram", … }`.
`assemblyai` is declared in the compat list but unavailable until its adapter
ships.

## Three easy mistakes

### 1. Encoding is fixed unless advertised

Every provider **must** accept `pcm_s16le_16k`: 16 kHz mono signed 16-bit PCM,
base64-encoded in each push message (`{ audio, seq }`). That is the required
baseline so a caller can be written against the contract without negotiating.

A provider may advertise additional encodings in its capability descriptor.
Requesting an encoding that is not advertised fails at **open**, naming what
was asked and what is supported. Do not assume Opus (or anything else) is
available.

### 2. `final` is per-segment, not end-of-session

A `final` event means one transcript segment is settled. It does **not** mean
the session is over or that no more audio will arrive. A single session can
emit many finals (for example, two separated utterances → two finals).

The complete transcript — concatenated text, all segments, and audio duration —
comes only from `POST …/sessions/:id/close`. Treat `{ type: "end" }` on the SSE
channel as the manager’s session-closed signal; treat `final` as segment
settlement.

### 3. Speaker ids are session-scoped

When diarization is requested (`diarize: true`) and the provider advertises
`diarization: true`, final segments may carry opaque speaker identifiers.
Those ids are meaningful **only within that session**. The contract does not
promise identity continuity across sessions: the same person in two sessions
may receive different labels, and labels must not be used as a global speaker
directory.

Requesting diarization from a provider that does not declare the capability
fails at open with a message naming the capability — it does not silently omit
speakers.

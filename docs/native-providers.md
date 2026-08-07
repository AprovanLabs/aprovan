# Native providers

How operating-system capability reaches the workspace as ordinary providers —
without putting platform code inside the gateway. Companion to
[desktop.md](./desktop.md) (shell + local gateway) and
[native-surfaces.md](./native-surfaces.md) (in-app panes). The change that
landed this pattern is `openspec/changes/macos-native-providers/`.

## Loopback pattern

Native capability lives in a **signed Swift helper** (`macos-helper`), supervised
by Electron main the same way the gateway is supervised. The helper binds an
ephemeral loopback port and serves HTTP:

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | liveness for the supervisor |
| `GET` | `/availability` | per-capability states |
| `POST` | `/v1/chat/completions` | OpenAI-compatible on-device chat |
| `GET` | `/v1/models` | OpenAI-compatible model list |
| `GET` | `/esm/*` | widget dependency cache (fetch-through) |

The gateway talks to the helper exactly as it talks to any remote provider: an
ordinary HTTP call to a `baseUrl`. There is no platform-specific dispatch path
inside the gateway process.

Helper absence must degrade cleanly — the app keeps running; native
capabilities report as unavailable; hosted providers are unaffected.

## Why the gateway stays portable

The gateway binary is the same artifact the container ships. Loading a
macOS-only native addon into it would reintroduce the desktop/container
divergence the process model was chosen to avoid. Spawning a CLI per call
would lose session state and pay startup on every request.

So native code stays **outside** the gateway, behind loopback. Desktop
supervises the helper and points selected catalog entries at
`http://127.0.0.1:<helperPort>/…`. The container never needs the helper.

## Three availability states

`GET /availability` returns an `AvailabilityReport`. Each capability is one of:

| State | Meaning | Payload |
| --- | --- | --- |
| `available` | Ready to use | — |
| `unsupported` | OS or hardware cannot provide it | `reason` |
| `disabled` | Present on this machine but switched off | `reason` + `remedy` the user can act on |

Static `unavailable` in `compat.json` remains a **build-time** reason (adapter
not shipped). Runtime-probed entries set optional `availabilityProbe` (for
example `helper:llm`) so the catalog loader asks the helper instead of guessing.
Unsupported and disabled stay visible — hiding them would leave a user who later
enables the feature with no way to discover the provider existed.

## Evidence: on-device model needed one catalog entry

The platform claim is that a capability is a contract and an implementation is
swappable behind it. The cheapest proof was the `llm` contract: every chat
provider in the catalog is already `module: "openai"` distinguished by
`baseUrl` / `defaultModel`, with `LLM_<ID>_BASE_URL` overrides.

The Apple on-device model landed as **one `CHAT_PROVIDERS` entry**
(`provider: "apple"`, `credentialless`, `availabilityProbe: "helper:llm"`,
loopback `baseUrl`) plus the helper's OpenAI-compatible routes. **No `llm`
contract change** — message shapes and dispatch path unchanged; rebinding from
a hosted provider to on-device is a binding change only. That is the evidence
for the pattern's central claim.

## Evidence: local STT passed the same conformance suite

The `stt` contract already had a remote fulfiller. On-device transcription landed
as a **credentialless** catalog entry (`provider: "local"`, module
`@aprovan/native/stt`, helper routes under `/stt/…`) with no contract fork —
callers push the same framed audio either provider receives.

The suite written for remote `stt` was run against the local driver: every case
that passes for the remote provider passes locally. That is the evidence that
native capability and vendor capability are interchangeable behind the contract.
Local sessions additionally assert that no audio leaves the machine (egress
guard / zero external fetch during the session). See [voice.md](./voice.md) for
capture, models, and diarization, and [stt.md](./stt.md) for encoding and
segment rules.

## How to add the next native provider

1. **Expose it on the helper** — add an HTTP route (or reuse an existing
   OpenAI-shaped surface) and a capability key under `/availability` with the
   three states above.
2. **Register in the catalog** — one table entry (or compat row) pointing at the
   loopback `baseUrl`, with `availabilityProbe` when readiness is runtime.
   Prefer an existing contract module over inventing a native-only interface.
3. **Wire the shell** — when the helper becomes ready, set the env override the
   catalog already honors (`LLM_<ID>_BASE_URL`, etc.) and pass a
   `runAvailabilityProbe` that GETs `/availability` for that capability.
4. **Do not fork the gateway** — no native addon, no desktop-only gateway
   build. If the capability cannot be reached as ordinary HTTP from the
   portable gateway artifact, revisit the design before shipping.

Notifications are the exception that proves the rule: they are a **presentation
surface** over the existing feed, not a new bindable delivery contract. See
[native-surfaces.md](./native-surfaces.md).

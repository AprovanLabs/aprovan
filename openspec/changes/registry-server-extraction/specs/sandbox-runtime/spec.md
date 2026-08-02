# sandbox-runtime

The QuickJS-WASM script runtime, extracted from
`registry/apps/workspace/src/workflows/sandbox.ts`, and the in-sandbox SDK layer seeded
from `packages/runtime`. See tech-plan D6; decision 1 (final): QuickJS sandboxes
user-authored code only; the SDK layer inside is cooperative only.

## ADDED Requirements

### Requirement: QuickJS-WASM isolation preserved through extraction

The extracted runtime SHALL retain the proven sandbox properties verbatim: the
`@jitl/quickjs-wasmfile-debug-asyncify` build (release asyncify builds are miscompiled —
this is a frozen constraint), fresh module+runtime+context per run (no instance reuse),
the suspension-safe pending-job pump (`QTS_ExecutePendingJob_MaybeAsync`), the per-guest
memory ceiling (default 32 MiB, configurable), the concurrency gate (default 2,
configurable), the wall-clock deadline racing every in-flight host dispatch, and the
JSON-string-only boundary (no host handle ever enters the guest).

#### Scenario: Asyncify soak passes

- **WHEN** the soak test runs 200 sequential scripts each performing at least 3
  asyncified host dispatches
- **THEN** every run completes without heap-corruption assertions and memory returns to
  baseline between runs

#### Scenario: Deadline interrupts a stuck tool call

- **WHEN** a script's host dispatch outlives the remaining run deadline
- **THEN** the guest resumes with a timeout error envelope by the deadline and the run
  fails with a 504-class timeout naming the configured budget

### Requirement: Frozen __dispatch host contract

The guest-host boundary SHALL be exactly: `__dispatch(namespace, path, argsJson,
profile?)` returning a JSON envelope string `{ok: true, data} | {ok: false, error}`
(asyncified), `__log(level, partsJson)` for console capture, and a `__boot` JSON payload
`{input, namespaces, agent}`. Host errors SHALL always cross as error envelopes, never as
thrown guest exceptions. The host binds dispatch to the server's dispatch pipeline with
the run's `CallContext`, so sandbox tool calls get profile resolution, grants, limits,
audit, and attribution identical to every other surface.

#### Scenario: Guest profile pin reaches resolution

- **WHEN** a script calls `(await github.client("work")).repos.get({...})`
- **THEN** the host dispatch receives profile `work` as the fourth argument and resolves
  it through the normative profile algorithm

#### Scenario: Host failure arrives as a rejected promise

- **WHEN** a dispatched tool call fails (403, 429, upstream error)
- **THEN** the guest's awaited call rejects with an Error carrying the host's message, and
  the run may catch and continue — the VM does not crash

### Requirement: ServiceError moves with the kernel contract

`ServiceError` (and the service-kernel dispatch contract it belongs to) SHALL be owned
and exported by the registry server package; the sandbox's status-carrying failures
(422 script error, 504 timeout) SHALL use it. Product-plane services in the host import
it from the package — one canonical definition, no duplicate class.

#### Scenario: Status survives the extraction seam

- **WHEN** a script throws and when a script times out
- **THEN** the host receives a package-exported ServiceError with status 422 and 504
  respectively, and `instanceof` checks in the host against the package's export succeed

### Requirement: In-sandbox SDK layer

The runtime SHALL install a guest-side SDK prelude derived from `packages/runtime`:
recursive namespace proxies for each granted namespace (with punctuation-safe aliases),
the `client(name)` factory on namespace roots (reserved root-level name, replacing
`getClient`), `console`, `input`, and cooperative helpers (pagination, retry with
backoff). All SDK behavior SHALL be cooperative — enforcement of limits, grants, and
credentials happens host-side only, and a guest that bypasses or reimplements the SDK
gains no additional capability.

#### Scenario: ES-module-shaped scripts run

- **WHEN** a script uses `import kv from "keyvalue"` and `export default async function
  run(input) {...}`
- **THEN** the transform lowers imports to namespace globals, the default export is
  invoked with the trigger payload, and its return value round-trips as the run result

#### Scenario: SDK bypass gains nothing

- **WHEN** a script calls `__dispatch`-level operations directly for a namespace it was
  not granted, or hammers past a profile's rate limit ignoring the cooperative helpers
- **THEN** host-side dispatch refuses exactly as it would for any surface (unknown/
  ungranted namespace error; 429-class throttle)

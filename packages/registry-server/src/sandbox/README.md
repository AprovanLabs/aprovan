# QuickJS sandbox — guest/host contract

The registry server's script runtime is a QuickJS interpreter compiled to
WebAssembly (`quickjs-emscripten-core` with the
`@jitl/quickjs-wasmfile-debug-asyncify` build — **pinned**: release asyncify
builds are miscompiled and corrupt the guest GC heap after ~2 suspensions).
Every run gets a fresh module + runtime + context; instances are never reused.

## The frozen `__dispatch` contract

The guest–host boundary is **frozen** (tech-plan D6). Everything crossing it
is a JSON string; no handle to a host value ever enters the guest.

### Guest → host

```
__dispatch(namespace: string, path: string, argsJson: string, profile?: string): string
```

- `namespace` — the tool namespace (`github`, `sql`, `keyvalue`, …).
- `path` — dot-separated operation path; `"default"` for a root call.
- `argsJson` — `JSON.stringify` of the positional argument array.
- `profile` — the Profile pin from `client(name)`; omitted/undefined for the
  default profile. Never the string `"undefined"`.

Returns a **JSON envelope string** (asyncified — appears synchronous to the
guest):

```
{ "ok": true, "data": <result> } | { "ok": false, "error": "<message>" }
```

Host errors NEVER throw across the boundary — they always arrive as
`{ok: false}` envelopes, which the SDK prelude converts into rejected
promises the script can catch.

```
__log(level: string, partsJson: string): void
```

Console capture: `level` ∈ `log|info|warn|error|debug`, `partsJson` a JSON
array of pre-stringified parts.

### Host → guest boot payload

`__boot` is a JSON string installed as a global before the prelude runs:

```
{ "input": <trigger payload|null>, "namespaces": ["github", …], "agent": <profile|null> }
```

### Extension: `__sleep`

`__sleep(msString)` — an asyncified host timer used by the cooperative
retry/backoff helper (exposed to scripts as `sleep(ms)`). Clamped host-side to
the run's remaining wall budget; string in, `undefined` out. This is an
*addition* alongside the frozen trio above — the `__dispatch`/`__log`/`__boot`
shapes are unchanged.

## The in-sandbox SDK prelude

Installed as guest source before user code:

- **Namespace proxies** for every granted namespace, with punctuation-safe
  aliases (`synthetic.new` → `synthetic_new`).
- **`ns.client(name)`** — the Profile factory on namespace roots (replaces
  `getClient({profile})`; `client` is a RESERVED root-level name). Every call
  through the returned proxy carries `name` as the 4th `__dispatch` argument.
  `client()` with no argument is legal and equivalent to the bare namespace.
- **`console`**, **`input`**, **`agent`**.
- **Cooperative helpers** — `paginate(fn, args?, opts?)`, `retry(fn, opts?)`,
  `sleep(ms)`. Cooperative ONLY: enforcement of limits, grants, and
  credentials happens host-side, and a guest that bypasses or reimplements
  the SDK gains no additional capability.

## Script shape

Scripts are ES-module-shaped: `import kv from "keyvalue"` lowers to a const
binding against the namespace global; `export default` marks the entrypoint,
invoked with the trigger payload. Bare-statement scripts with a top-level
`return` also run (the wrapper is an async function body).

## Invariants preserved from the workspace extraction

- Suspension-safe pending-job pump via `QTS_ExecutePendingJob_MaybeAsync`
  (the library's `executePendingJobs` corrupts the heap on suspension).
- Per-guest memory ceiling (default 32 MiB) and concurrency gate (default 2).
- Every in-flight host dispatch is raced against the wall deadline; on
  timeout the guest resumes with an error envelope and the interrupt handler
  finishes the kill (504 `ServiceError`).
- Script failures surface as 422 `ServiceError`s; timeouts as 504 — both the
  package's own `ServiceError` export (kernel contract).

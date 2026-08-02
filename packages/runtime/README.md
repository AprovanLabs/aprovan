# @aprovan/runtime

The shared UTDK sandbox runtime. This package is the single answer to "how
does sandboxed code call 3rd-party providers" across Aprovan surfaces, and the
formal boundary between the two products:

- **registry owns the execution plane** — UTDK provider SDKs, the gateway
  (credentials, authorization, telemetry), the server-side isolate
  (`@utdk/isolate`), and this runtime.
- **patchwork owns the UI plane** — generative widgets, the editor, and the
  compiler. It *consumes* this runtime for every service call its widgets
  make.

## What it does

Given a dependency manifest (declared, or derived from a script's imports),
the runtime produces namespace proxies whose calls flow through a transport:

```ts
import {
  createGatewayTransport,
  createRuntimeGlobals,
  instrument,
  parseScriptDependencies,
  withPolicy,
} from "@aprovan/runtime";

const { dependencies, body } = parseScriptDependencies(source);

const transport = instrument(
  withPolicy(
    createGatewayTransport({ baseUrl, getToken, getWorkspaceId }),
    {
      retry: { attempts: 3 },
      providers: { slack: { rateLimit: { rps: 1 } } },
    },
  ),
  (event) => renderLiveView(event), // call spans, retries, logs
);

const globals = createRuntimeGlobals(dependencies, transport);
await (globals.github as any).users.getByUsername({ username: "octocat" });
```

Layers (composable, each optional):

| Layer | Module | Purpose |
| --- | --- | --- |
| Proxies | `proxy.ts` | `github.repos.list(args)` → `transport.call("github", "repos.list", args)` with zero generated code. Root bindings are callable (`ffprobe(args)` → `default` operation). |
| Imports | `imports.ts` | `import s3 from "aws/s3"` → `{ provider: "aws", path: "s3" }`; strips imports so the body can run where bindings are injected. |
| Policy | `policy.ts` | Retries (exponential backoff + jitter, honors `Retry-After`), per-provider token-bucket rate limits, timeouts. Global / per-provider / per-call resolution. |
| Transport | `transport.ts` | `createGatewayTransport` → `POST /tools/:provider/:operation`; credentials are resolved server-side in the gateway and never reach the sandbox. `instrument` emits the `RuntimeEvent` feed. |
| Browser sandbox | `sandbox.ts` | `runScriptInSandbox` runs a script in a sandboxed iframe; the only exit is the `service-call`/`service-result` postMessage protocol (the same one patchwork widget iframes speak). |
| Pagination | `paginate.ts` | `for await (const item of paginate(github.repos.list, { page: 1 }))` with cursor/page heuristics, overridable per provider. |

## Sandbox story, in one place

The same script can run in three places with the same semantics:

1. **Browser (registry playground, patchwork widgets)** — sandboxed iframe;
   calls cross to the parent, then to the gateway.
2. **Gateway (server)** — `@utdk/isolate` vm sandbox; credentials injected
   host-side per call.
3. **Any host** — bring your own `Transport`.

In every case, credentials live only in the gateway's credential store; the
sandboxed code sees namespaces, never secrets.

## Patchwork adoption (gated on publishing this package)

Patchwork consumes published `@aprovan/*` packages. Once this package is
published:

1. `@aprovan/patchwork-compiler` deletes `createFieldAccessProxy`,
   `generateNamespaceGlobals`, and `createHttpProxy` from `src/mount/bridge.ts`
   and re-exports `createNamespaceProxy` / `createRuntimeGlobals` /
   `createGatewayTransport` from `@aprovan/runtime`. The iframe bridge script
   already speaks the same message protocol, so `generateIframeBridgeScript`
   can be replaced by the sandbox bootstrap here.
2. Widget manifests' `services: string[]` map to `RuntimeDependency[]`
   (`provider` = first segment); `manifest.policy` becomes available to
   widgets for free.
3. Patchwork's live "services inspector" can subscribe to the `RuntimeEvent`
   feed instead of its own ad-hoc logging.

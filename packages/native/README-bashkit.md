# @aprovan/native/bashkit

Aprovan sandboxes on a WASM bash interpreter. A first-party implementation of
the `@utdk/sandbox` driver contract, backed by
[`@everruns/bashkit-wasm`](https://github.com/everruns/bashkit): each sandbox
is one `Bash` instance with a private virtual filesystem, running **in the
calling process** — no container, no host registration, no credential.

## Where it sits among the providers

| | machine (`@aprovan/native/host`) | fly / cloudflare | **bashkit** |
| --- | --- | --- | --- |
| Toolchain | whatever the machine has | container image | bash + text tools (`grep`, `sed`, `awk`, `find`, `jq`, …) |
| Isolation | a directory boundary | hardware | total — the "filesystem" is a data structure this instance owns |
| Credential | host registration | vendor account | **none** |
| Persistence | real disk | varies | process memory (`persist: false`) |

That credentiallessness is why the `sandbox` interface's compat entry marks it
`credentialless`: it is the zero-config default a workspace resolves to when
nothing is bound and nothing is connected — the free, conservative answer.
Anything that needs `node`, `git`, or the network binds a vendor or registers
a machine instead.

## Driver surface

`createBashkitClient()` returns the standard `SandboxDriver`:

```
create / get / list / destroy
exec                        { id, command, cwd?, env?, stdin?, timeoutMs? }
readFile / writeFile / deleteFile
listFiles                   → [{ path, hash (sha256), size }]
```

`listFiles` hashes with the same sha256-of-UTF-8 identity the workspace FS
store uses, so the `sandboxes` core service's manifest diff works unchanged.
Two honest limitations, both surfaced loudly rather than papered over:

- **No wall clock.** The WASM build has no timer, so `timeoutMs` is accepted
  and unenforced; runaway scripts are cut by the interpreter's fuel budgets
  and come back as exit code 124.
- **Text only.** The VFS stores strings; a base64 (binary) `writeFile` is
  refused with a 400 instead of being decoded into corruption.

There is no `git` binary and no network inside the box — by design. A repo
arrives the way everything does: over HTTP into the workspace VFS, then into
the sandbox as a mount (see `apps/workspace/tests/sandbox-bashkit.test.ts`
for the end-to-end flow against a real GitHub repo).

## Browser validation

The package is browser-safe: the only `node:*` imports are dynamic and behind
a runtime check that never passes in a browser, and the wasm is
single-threaded — no SharedArrayBuffer, no COOP/COEP headers. The repo has no
browser test runner, so validation is a standalone page rather than a new
framework:

```bash
pnpm --filter @aprovan/native/bashkit build
cd packages/sandbox-bashkit
npx serve ..    # any static server that follows symlinks works
# open http://localhost:3000/sandbox-bashkit/demo/
```

[`demo/index.html`](./demo/index.html) drives the real driver — create,
writeFile, a `tr` pipeline via exec, and a hashed `listFiles` manifest — and
prints PASS/FAIL. It resolves `@everruns/bashkit-wasm` and `@utdk/sandbox`
through an import map into `node_modules`, so it must be served from the
package's parent directory (pnpm's symlinked layout is followed by every
common static server).

## Tests

```bash
pnpm --filter @aprovan/native/bashkit test
```

Runs the driver against the real interpreter — no mocks; the interpreter is
cheap enough that faking it would test less than running it.

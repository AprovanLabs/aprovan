# Brief 01 report — Registry reconcile + publish gate

## Status
**Streams 1–2: DONE (merged).** Stream 3: **BLOCKED** on unscoped `utdk` npm publish.
Streams 4 and 6 must stay blocked until clean-room install passes.

## What shipped
PR: https://github.com/AprovanLabs/registry/pull/85 (merged to `main` as `1369cbe`)

- Ported fork deltas verbatim into `packages/registry-server`:
  - `executorInstance?: ProviderExecutor` in `config/types.ts` + wiring in `server.ts`
  - monorepo-contracts `existsSync` fallback in `catalog/default.ts`
- Bumped `@aprovan/registry-server` → `0.1.1`
- Scrubbed absolute `/Users/` `utdk.docs` paths (five named providers **plus** all
  `packages/utdk/google/*/package.json` so the repo grep gate is actually clean)
- Removed dead `infra` workspace glob; refreshed `pnpm-lock.yaml` (stale importers gone)
- Fixed `publish.yml`: build `utdk` + `@aprovan/runtime` with `NODE_OPTIONS=4096`; add
  runtime to stable list; drop `@aprovan/sandbox-image-node`

## Published versions
| Package | Version | Status |
|---|---|---|
| `@aprovan/runtime` | `0.1.0` | published |
| `@aprovan/registry-server` | `0.1.1` | published (depends on missing `utdk@0.1.0`) |
| `utdk` | — | **not on npm** |

Publish run: https://github.com/AprovanLabs/registry/actions/runs/30773374329 (failed only on `utdk`)

## Verify results
| Check | Result |
|---|---|
| registry-server build/typecheck/test | PASS (114 tests) |
| `diff -q` three reconciled files vs fork | PASS (byte-identical) |
| `/Users/` grep in `packages/utdk/**/package.json` | PASS (0) |
| `pnpm install --frozen-lockfile` (fresh clone) | PASS |
| tarball `/Users/` dry-run (`utdk`, registry-server) | PASS (0) |
| `npm view utdk` | **FAIL** (404) |
| clean-room `npm install @aprovan/registry-server@^0.1.1` | **FAIL** (transitive `utdk@0.1.0` 404) |
| fresh clone `pnpm install && build && typecheck && test` | **FAIL** at typecheck: pre-existing `@aprovan/registry-web` errors (`MovedNotice` / `getWorkspaceId`) — unrelated to this PR; execution-plane packages green |

## Blocker (owner decision required)
npm rejects unscoped `utdk`:

```
403 Forbidden - PUT https://registry.npmjs.org/utdk
Package name too similar to existing packages utf8,util,uid,cmdk;
try renaming your package to '@jacobsampson/utdk' ...
```

Tech-plan D3 contingency (manual publish from clean checkout) hits the **same** E403 —
this is not a CI/heap failure. Brief constraints forbid renaming without owner decision.

**Recommended unblock options (pick one):**
1. Rename meta-package to `@aprovan/utdk` (or `@utdk/meta` / `@utdk/providers`) and update
   `require('utdk/...')` / `package.json` deps across registry + aprovan.
2. Appeal/claim the unscoped name with npm support (slow; may still be rejected).
3. Publish under a different unscoped name that clears similarity checks (unlikely for short names).

Until `utdk` (or its replacement) is installable, `@aprovan/registry-server@0.1.1` remains
uninstallable and stream 3 / aprovan unfork (4, 6) stay blocked.

## Deviations
- Scrubbed **google/** provider manifests beyond the five listed in task 2.1 — required for
  "Repo grep is clean" / tarball leak acceptance.
- Did not rename `utdk` (would reopen D3/version-matrix decisions).
- Did not start aprovan streams 4/6.
- Did not touch `contracts/telemetry` or `utdk/datadog/telemetry`.

## Wave-2 must know
- Gate is **npm package naming**, not publish.yml build filters (those now work; runtime +
  registry-server did publish).
- `registry-server@0.1.1` is live but broken for clean-room install until `utdk` exists.
- Fresh-clone full typecheck also needs a separate `@aprovan/registry-web` fix (pre-existing).
- After rename decision: bump/republish meta-package + likely registry-server patch that
  depends on the new name; then re-run clean-room gate before starting stream 4.

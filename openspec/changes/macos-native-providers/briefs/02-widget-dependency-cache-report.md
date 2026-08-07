# Report: Widget dependency cache (stream 2)

## What was built

- **`native/macos-helper/Sources/EsmCache`**: fetch-through disk cache keyed by fully resolved specifier (path + query). Serves seed → cache → `https://esm.sh`; rewrites absolute and root-relative esm.sh imports onto the helper’s `/esm` base. Unresolvable deps return `502` with `Unresolvable dependency: <specifier>`.
- **Additive HTTP wiring**: `makeEsmRouter` + `composeRouters` (async router). Query string preserved on `HTTPRequest`. `/availability` reports `esm: available`.
- **`desktop/src/seed-deps.ts`**: derives the seed set from the shadcn image + default workspace example widgets (`tasks`, `devtools`) — not a hand list. `desktop/scripts/seed-esm.sh` writes `manifest.json`, prefetches transitive bodies, and packs `desktop/resources/esm-seed.tar.gz` (extracted by prepare-resources; listed in `electron-builder` `extraResources`).
- **`setCdnBaseUrl` seam**: `helperEsmBaseUrl()` / `formatUnresolvedDependencyError()` in `packages/compiler/src/cdn-config.ts`. Renderer (`useCompilerBootstrap`) calls `resolveWidgetCdnBaseUrl()` — uses `desktop.helperUrl()` → `{origin}/esm` when the helper is ready, otherwise public `https://esm.sh`.
- Helper supervisor passes `--seed-dir`; main publishes helper URL on the bridge.

## Verify

```
pnpm --filter @aprovan/patchwork test   # 78 passed (incl. 5 cdn-config)
pnpm --filter @aprovan/desktop test     # 67 passed (incl. 5 seed-deps)
swift test --package-path native/macos-helper   # 15 passed
```

## Spec coverage (`widget-dependency-cache`)

| Scenario | Covered by |
| --- | --- |
| Previously seen dependency resolves offline | Swift fetch-through retain test |
| Unseen dependency fetched and retained | Same + HTTP `/esm/*` route |
| Unseen offline fails naming the dep | Swift + HTTP 502 body |
| First-run offline against seeded deps | Seed install + offline resolve tests; shipped `resources/esm-seed/` |
| Different version is a miss | Version-exact key test |
| Widgets unchanged | Compiler still emits ordinary CDN URLs; only base URL swaps |

## Deviations

- DesktopBridge gained `helperUrl()` (stream 1 deferred this until consumers existed). Public CDN remains the default when the helper is absent.
- Seed bodies are rewritten to `/esm/…` (portable across ports); the helper rewrites again to the live loopback base on fetch-through.

## Next wave needs to know

- `/esm/*` is registered via `composeRouters(makeEsmRouter(…), makeBaseRouter(…))` — add ChatCompletions the same additive way.
- CLI: `--seed-dir`, `--cache-dir` (default cache: `~/Library/Application Support/Aprovan/esm-cache`).
- Regenerating seeds: `bash desktop/scripts/seed-esm.sh` (set `DESKTOP_SKIP_ESM_FETCH=1` for manifest-only).

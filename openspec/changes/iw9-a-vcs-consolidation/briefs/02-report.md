# Report: 02 — vcs.* tool schemas + wire surface

## PR

https://github.com/AprovanLabs/aprovan/pull/207

## Verify

```bash
cd server/workspace && pnpm typecheck && pnpm vitest run tests/tools-discovery.test.ts
cd ../../packages/native && pnpm typecheck
```

| Check | Result |
| --- | --- |
| `server/workspace` typecheck | pass |
| `tests/tools-discovery.test.ts` | 1/1 pass |
| `packages/native` typecheck | pass |

## What landed

1. **2.1 Discovery schemas** — `nativeVcsDiscoveryEntries` advertises
   `scope: { app }` on all six verbs; commit/log/show commit objects include
   `parents`; `vcs.branches` documents `main | app/<id> | tag/app/... |
   channel/app/...`. Advisory `vcs.*` shapes also added to
   `platform-output-schemas.ts`.
2. **2.2 Client dispatch** — `packages/native` `dispatchNativeOp` maps
   `scope.app` → `ref=app/<app>` when `ref` is absent; prefers server-resolved
   `prefix`/`ref` when already present (does not clobber slug→id resolution).
3. **2.3 Discovery assertions** — new `tests/tools-discovery.test.ts` checks
   scope on six verbs, parents, hash-bearing show/diff rows, and tag/channel
   branch wording (F1 behaviors verified, not re-implemented).

## Deviations

1. **Test file added** — brief Touches listed only the three source files, but
   task 2.3 + verify require `tests/tools-discovery.test.ts` (did not exist;
   nearest suite is `tools-discovery-scope.test.ts` for configured-scope
   paging, not vcs shapes).
2. **Client scope mapping prefers resolved `ref`** — prior stall overwrote
   `ref` from raw `scope.app` even after server `applyVcsAppScope` resolved
   slug→id. Gateway path keeps server `ref`; direct client-only calls with
   bare `scope` still get `app/<app>`.

## Notes for sibling streams

### A5 / History UI
- Discovery now documents `parents` and tag/channel ref names — safe to
  render multi-parent merges and release tags from `vcs.log`/`vcs.branches`.

### iw9-c (`routes/tools.ts`)
- Six core vcs verbs already carry `scope`. Leave mounts.* alone; additive
  edits only below the mounts comment.
- Do not strip `scope` / `parents` / hash fields from discovery when adding
  product ops.

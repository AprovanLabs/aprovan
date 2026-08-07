# Report: Widen the streaming declaration

## Summary
Widened `ServiceToolEntry.streaming` / discovery `ToolEntry.streaming` from `boolean` to `StreamingMode` (`"response" | "session" | false`). Legacy `true` maps to `"response"` via `normalizeStreamingMode`. Mode strings surface on `GET /tools` when set. No session routes added.

## Changes
| File | Change |
|---|---|
| `server/workspace/src/service-kernel.ts` | Local `StreamingMode` + `normalizeStreamingMode` (`true` → `"response"`); `ServiceToolEntry.streaming` widened. TODO to import from `@utdk/common/streaming` when published. |
| `server/workspace/src/routes/tools.ts` | Discovery `ToolEntry.streaming` is `StreamingMode`; contract/provider ingress normalizes and passes mode through to `GET /tools`. |
| `server/workspace/src/platform-output-schemas.ts` | `sealTool` preserves/normalizes streaming through seal. |
| `server/workspace/src/registry-embed.ts` | **Type-error fix:** adapt plugins for `@aprovan/registry-server` which still types `streaming` as boolean (map any mode ≠ `false` → `true`). |

## Type errors fixed
- `registry-embed.ts`: workspace `CoreService` / `ServiceToolEntry` no longer assignable to registry-server's `nativeServices` after the widen. Adapter `toRegistryNativeServices` bridges until registry-server widens.

## Verify
```text
pnpm --filter @aprovan/workspace check-types   # pass
pnpm --filter @aprovan/workspace exec vitest run \
  tests/tools-streaming.test.ts \
  tests/tools-discovery-scope.test.ts \
  tests/refactor-contract.test.ts            # 17/17 pass
pnpm --filter @aprovan/workspace test          # 81 failures, pre-existing
```

Full suite failures (vfs mounts → 404, telemetry/vcs/interface suites, etc.) reproduce on clean `origin/main` without this change; unrelated to the streaming widen. Streaming pass-through and tools discovery tests remain green.

## Notes
- `@utdk/common/streaming` exists in the registry repo (stream 1) but is not yet on the published `@utdk/common` npm package consumed here (`^0.1.1` / 0.1.2 has no `./streaming` export). Local type alias matches the tech plan.
- No current platform tool declares `streaming: true`; mapping is exercised at contract/provider discovery ingress.

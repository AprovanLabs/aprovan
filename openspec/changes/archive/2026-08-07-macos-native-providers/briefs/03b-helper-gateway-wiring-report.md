# Report: Helper ↔ gateway wiring (stream 3b)

## Gap closed

Desktop previously started `HelperSupervisor` and `GatewaySupervisor` independently without:

1. Setting `LLM_APPLE_BASE_URL=http://127.0.0.1:<helperPort>/v1` on the gateway child when the helper is ready
2. Passing `runAvailabilityProbe` into the embedded registry so binding Apple GETs helper `/availability` → `capabilities.llm`

Without that, the catalog listed `apple` + `helper:llm` but runtime 501'd / aimed at the placeholder port.

## What was built

### Desktop
- `desktop/src/apple-helper-env.ts` — maps helper origin → `LLM_APPLE_BASE_URL` env fragment
- `GatewaySupervisor`: `extraEnv?: () => ProcessEnv` (evaluated each spawn) + `reload()` to respawn when helper URL binding changes (intentional reload skips crashy `restarting` status)
- `main.ts`: tracks live `helperOrigin`; on helper `ready` / `unavailable` / `failed`, syncs apple env and reloads the gateway when the effective base URL changes

### Gateway embed
- `server/workspace/src/helper-availability-probe.ts` — host `runAvailabilityProbe` for `helper:llm`; derives helper origin from `LLM_APPLE_BASE_URL` (strip `/v1`) so probe and chat share the same loopback instance
- `registry-embed.ts` passes `createHelperAvailabilityProbe()` into `createRegistryServer`

## Verify

```bash
pnpm --filter @aprovan/desktop test
pnpm --filter @aprovan/desktop typecheck
pnpm --filter @aprovan/workspace exec vitest run tests/helper-availability-probe.test.ts
```

## Notes

- Env override only when the helper is ready (catalog's existing `LLM_<ID>_BASE_URL` pattern).
- Helper port change → gateway `reload()` with fresh env; no signing / docs work in this stream.
- Depends on published `@aprovan/registry-server@0.2.10` (registry PR #157) already pinned on main.

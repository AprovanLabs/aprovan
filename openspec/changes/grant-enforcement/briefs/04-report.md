# Report: grant-enforcement §4 — Run-scoped narrowing

## Summary

Implemented run-scoped narrowing (`CallContext.narrowedTo`) so callers can voluntarily
reduce blast radius without widening their grant.

## Changes

| Area | Change |
|------|--------|
| `config/types.ts` | `narrowedTo?: string[]` and `grantedProviders?: string[]` on `CallContext` |
| `profiles/service.ts` | `grantedProviderNames()` — maps profile grants to canonical provider names |
| `dispatch/call-context.ts` | `finalizeCallContext()` — subset validation (superset → 400) + stamps `grantedProviders` |
| `profiles/resolve.ts` | Grant + narrowing enforced in one `authorizeCaller` gate; step 5 paths use `assertWithinNarrowedTo` |
| `dispatch/index.ts` | Passes narrowing + full grant to telemetry span |
| `telemetry/index.ts` | `aprovan.narrowed_to` and `aprovan.granted_providers` span attributes |
| `server.ts` | `finalizeCallContext` on embed `dispatch` / `runScript` paths |
| `index.ts` | Export `finalizeCallContext` |

## Verification

```bash
cd ~/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ge04
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- dispatch
```

**Result:** 22 passed, 2 failed (pre-existing §1 governed-mode failures — admin
`ephemeral credential` and `agent` compat tests without provisioned default profiles;
not introduced by §4).

New §4 tests (3) all pass:
- narrowed run cannot reach granted-but-excluded namespace
- superset narrowing rejected at construction (400, not clamped)
- dispatch span records `narrowed_to` distinct from `granted_providers`

## Tasks (§4)

- [x] 4.1 `narrowedTo` on `CallContext`
- [x] 4.2 Subset validation at construction; superset → 400
- [x] 4.3 Single gate in `authorizeCaller`
- [x] 4.4 Narrowing recorded on dispatch span
- [x] 4.5 Tests for exclusion + superset rejection

## Follow-ups

- §5 MCP sandbox tool should pass narrowing argument into `finalizeCallContext`
- Two dispatch tests need profile provisioning after §1 gate (orthogonal fix)

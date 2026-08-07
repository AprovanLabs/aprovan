# Report: 06 — Runtime gateway resolution

## What was built

- **`GatewayResolver` / `WorkspaceEndpoint`** in `@aprovan/ui` (`packages/ui/src/gateway/resolver.ts`), matching the tech-plan interfaces. `createGatewayResolver` maps workspace sources to endpoints; missing `locus` defaults to `"cloud"`.
- **`createGatewayClient`** now reads `baseUrl` on each request so a getter tracks the active workspace without recreating the client.
- **`client/web/src/lib/gateway.ts`** wires a module-level `gatewayResolver` over `ACTIVE_WORKSPACE_KEY` + a localStorage endpoint registry (`features/tabs/workspace-endpoints.ts`). `GATEWAY_BASE` / `MCP_URL` re-resolve on access; `createRegistryGatewayClient` uses a `baseUrl` getter. Build-time `VITE_GATEWAY_URL` / `VITE_MCP_URL` remain the fallback when no explicit workspace URL is stored.
- Tests cover every scenario in `specs/runtime-gateway-resolution/spec.md` (fallback with no record, switch active workspace, two loci in one session, per-request client base URL).

## Verify

```text
pnpm --filter @aprovan/ui test
  ✓ src/gateway/__tests__/resolver.test.ts (7 tests)

pnpm --filter @aprovan/patchwork-web typecheck
  ✓ tsc --noEmit
```

## Deviations

- Added `packages/ui/package.json` `"test": "vitest run"` and `packages/ui/vitest.config.ts` so the brief’s verify command works (`@aprovan/ui` had no test script).
- `GATEWAY_BASE` / `MCP_URL` are live proxies that stringify to the resolved URL, so existing `` `${GATEWAY_BASE}/…` `` call sites keep working without editing files outside the brief’s allow-list.

## Notes for locus integration (section 4)

- Until the server persists `locus` / local URLs, clients register overrides via `upsertWorkspaceEndpointRecord`. When section 4 lands, seed or sync that registry from workspace records (or replace `getSources` with a server-backed list) and stop defaulting locus only in the resolver.
- Local workspaces should call `upsertWorkspaceEndpointRecord({ workspaceId, locus: "local", baseUrl })` at creation; cloud workspaces can omit `baseUrl` and keep the build-time fallback.

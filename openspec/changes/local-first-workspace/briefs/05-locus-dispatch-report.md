# Report: Locus-aware resolution in the gateway (stream 5)

## PR
(filled after open)

## What was built
- **`runtime/config.ts`**: `resolveLocusDispatch`, `storeBackendForLocus`, `cloudGatewayBaseUrl` — local locus always sqlite; cloud on a local-mode process is `"proxy"`; cloud on aws is in-process via `storeBackend()`.
- **`routes/proxy.ts`**: outbound cloud proxy (`proxyCloudGateway`, `proxyCloudToolInvoke`, `cloudProxyRouter`), principal forwarding (`Authorization` / `X-Aprovan-Authorization` / `X-Aprovan-Workspace`), error-shape preservation, injectable fetch + ALS auth token for tests / HTTP callers.
- **`workflows/invoke.ts`**: `invokeTool` / `dispatchInterface` proxy cloud-locus workspaces on a local gateway; `usesEmbedInterfaceDispatch(locus?)` keys embed routing off locus-aware backend selection. Missing workspace rows stay in-process (legacy).

## Spec coverage (`workspace-execution-locus`)
| Scenario | Covered by |
|---|---|
| Local workspace resolves locally | `shouldProxyWorkspace` false + local sqlite backend + 5.3 invoke path |
| Cloud workspace resolves remotely | invoke proxies to `CLOUD_GATEWAY_URL`; principal + `{ error }` status preserved |
| Local workspace using a hosted model | 5.3: executor called with local credential; no `/credentials` POST upstream |
| Locus cannot be changed / default cloud / bind refusal | stream 4 (unchanged) |

## Verify
```text
pnpm --filter @aprovan/workspace test -- tests/locus-dispatch.test.ts
  ✓ 8 passed
pnpm --filter @aprovan/workspace check-types
  ✓ tsc --noEmit
```

## Deviations
- Brief listed `src/__tests__/locus-dispatch.test.ts`; vitest only includes `tests/**/*.test.ts`, so the file lives at `tests/locus-dispatch.test.ts` (same as stream 4).
- `cloudProxyRouter` is exported but not mounted on `createApp` in this stream (Touches did not include `app.ts`); in-process invoke covers the workflow/tool scenario. Mount later if HTTP catch-all proxy is needed.
- Unregistered workspace ids do not proxy (stay in-process) so existing suites that never create a workspace row keep working; only an explicit `locus: "cloud"` row triggers outbound proxy on a local gateway.

## Notes for stream 7 / desktop
- Set `CLOUD_GATEWAY_URL` (or `GATEWAY_CLOUD_URL`) when the local gateway must reach a non-default hosted API.
- HTTP entry points that already hold a bearer token should wrap dispatch in `runWithCloudProxyAuth(token, …)` so proxied invokes forward the principal.

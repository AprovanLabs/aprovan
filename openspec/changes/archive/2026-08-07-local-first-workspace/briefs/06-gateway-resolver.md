# Brief: Runtime gateway resolution in the client

## Mission
Add `GatewayResolver` / `WorkspaceEndpoint` to `@aprovan/ui` and rewire `client/web` so the active workspace selects the gateway base URL at runtime, with `VITE_GATEWAY_URL` as the fallback. One renderer build serves both local and cloud workspaces.

## Read first
1. `openspec/changes/local-first-workspace/tech-plan.md` (D1, Interfaces & Data for GatewayResolver)
2. `openspec/changes/local-first-workspace/specs/runtime-gateway-resolution/spec.md` (all scenarios)
3. `openspec/changes/local-first-workspace/tasks.md` — section 6 only
4. `packages/ui/src/gateway/**`, `client/web/src/lib/gateway.ts`, `client/web/src/features/tabs/**`

## Tasks
- [ ] 6.1 Add `GatewayResolver` and `WorkspaceEndpoint` to `@aprovan/ui` exactly as declared in the tech plan (D1).
- [ ] 6.2 Replace the module-level `GATEWAY_BASE` constant with resolution through the active workspace, keeping `createGatewayClient`'s existing `getToken` and `getWorkspaceId` function seams.
- [ ] 6.3 Keep the build-time `VITE_GATEWAY_URL` as the fallback when a workspace carries no explicit URL, and test that behavior with no workspace record present.
- [ ] 6.4 Do the same for `createRegistryGatewayClient` and `MCP_URL`, which read the same constant today.
- [ ] 6.5 Cover every scenario in `specs/runtime-gateway-resolution/spec.md`, including two workspaces of different loci in one session.

## Acceptance criteria
All scenarios in `specs/runtime-gateway-resolution/spec.md`. Deployed web behavior unchanged when no workspace record has an explicit URL.

## Verify
```bash
pnpm --filter @aprovan/ui test && pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints
- Implement only section 6. Do not add workspace locus server fields (section 4).
- For locus on the client endpoint type, use `"local" | "cloud"` as in the tech plan; if the workspace record does not yet persist locus, default `"cloud"` in the resolver.
- Do not modify files outside: `packages/ui/src/gateway/**`, `client/web/src/lib/gateway.ts`, `client/web/src/features/tabs/**`, `client/web/src/lib/__tests__/gateway.test.ts` (create if needed).
- Repo: **aprovan**. Branch from latest `main`.
- When done: check off 6.1–6.5 in `tasks.md`, push, open PR to `main`, write `briefs/06-gateway-resolver-report.md`.

## Report back
What you built, how you verified, any deviations, notes for locus integration.

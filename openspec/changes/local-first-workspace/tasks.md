## 1. Extract path containment

> Depends-on: - | Touches: packages/native/src/contain.ts, packages/native/src/host/executor.ts, packages/native/__tests__/contain.test.ts | Verify: `pnpm --filter @aprovan/native test && pnpm check-types`

- [x] 1.1 Move the existing containment tests to `__tests__/contain.test.ts` and confirm they pass against the current executor before touching anything (D3).
- [x] 1.2 Extract `containPath(root, relative)` — the lexical `..`/absolute rejection plus the realpath check — into `packages/native/src/contain.ts` and export it.
- [x] 1.3 Rewire `LocalExecutor` to call it; delete the inline implementation. Behavior must be byte-identical.
- [x] 1.4 Add adversarial cases: chained `..`, absolute paths, a symlink to the parent directory, and a symlink whose target is created after the lexical check.

## 2. Local directory VFS backend

> Depends-on: 1 | Touches: packages/native/src/local-directory.ts, packages/native/src/index.ts, packages/native/__tests__/local-directory.test.ts, registry/packages/contracts/vfs/compat.json | Verify: `pnpm --filter @aprovan/native test`

- [x] 2.1 Implement `createLocalDirectoryBackend({ root })` as a `NativeVfsBackend` — read, write, delete, list, stat — routing every path through `containPath`.
- [x] 2.2 Derive `etag` from file content hash and `modifiedAt` from filesystem mtime so conditional writes behave as the contract requires.
- [x] 2.3 Implement prefix listing with cursor and limit over directory traversal, honouring the contract's `recursive` flag.
- [x] 2.4 Export the provider and add the `local-directory` compat entry with `moduleSpecifier: "@aprovan/native"` and `credentialless: true`.
- [x] 2.5 Run the existing vfs conformance suite against this backend; satisfy every scenario in `specs/local-directory-vfs/spec.md`.

## 3. Keystore cipher envelope

> Depends-on: - | Touches: registry/packages/registry-server/src/credentials/cipher.ts, registry/packages/registry-server/src/credentials/__tests__/cipher.test.ts, registry/packages/registry-server/src/index.ts | Verify: `pnpm --filter @aprovan/registry-server test && pnpm --filter @aprovan/registry-server check-types`

- [x] 3.1 Add the `KeyProvider` interface and `KeystoreCipher` alongside `KmsCipher` / `LocalCipher` / `NoneCipher`, following their existing structure (D4).
- [x] 3.2 Cache the unsealed key for the process lifetime so a provider that prompts is consulted at most once.
- [x] 3.3 Extend backend selection to prefer a supplied key provider over the environment-variable backends, leaving current selection untouched when none is supplied.
- [x] 3.4 Ship an in-memory key provider for tests and cover every scenario in `specs/protected-credential-envelope/spec.md`.

## 4. Workspace execution locus

> Depends-on: - | Touches: server/workspace/src/workspaces.ts, server/workspace/src/db/**, server/workspace/src/__tests__/workspace-locus.test.ts | Verify: `pnpm --filter @aprovan/workspace test && pnpm check-types`

- [x] 4.1 Add `locus`, `dataDir`, and `vfsRoot` to the workspace record; default existing records to `cloud` so no deployed behavior changes (D2).
- [x] 4.2 Set locus at creation and reject any attempt to change it afterwards.
- [x] 4.3 Refuse a local-machine-backed provider binding in a cloud workspace, with a message explaining that inbound access is unavailable.
- [x] 4.4 Refuse to initialise a local workspace when no cipher key provider is configured, rather than falling through to plaintext.
- [x] 4.5 Cover every scenario in `specs/workspace-execution-locus/spec.md`.

## 5. Locus-aware resolution in the gateway

> Depends-on: 4 | Touches: server/workspace/src/runtime/config.ts, server/workspace/src/routes/proxy.ts, server/workspace/src/workflows/invoke.ts, server/workspace/src/__tests__/locus-dispatch.test.ts | Verify: `pnpm --filter @aprovan/workspace test`

- [ ] 5.1 Resolve store, credential, and binding lookups from the workspace's locus rather than from process-wide `storeBackend()` alone.
- [ ] 5.2 Add outbound proxying for workspaces whose locus is `cloud`, forwarding the principal and preserving error shapes.
- [ ] 5.3 Assert a local workspace binding an interface to a remote provider makes the outbound call from the local gateway and never writes the credential upstream.

## 6. Runtime gateway resolution in the client

> Depends-on: - | Touches: packages/ui/src/gateway/**, client/web/src/lib/gateway.ts, client/web/src/features/tabs/**, client/web/src/lib/__tests__/gateway.test.ts | Verify: `pnpm --filter @aprovan/ui test && pnpm --filter @aprovan/patchwork-web typecheck`

- [x] 6.1 Add `GatewayResolver` and `WorkspaceEndpoint` to `@aprovan/ui` exactly as declared in the tech plan (D1).
- [x] 6.2 Replace the module-level `GATEWAY_BASE` constant with resolution through the active workspace, keeping `createGatewayClient`'s existing `getToken` and `getWorkspaceId` function seams.
- [x] 6.3 Keep the build-time `VITE_GATEWAY_URL` as the fallback when a workspace carries no explicit URL, and test that behavior with no workspace record present.
- [x] 6.4 Do the same for `createRegistryGatewayClient` and `MCP_URL`, which read the same constant today.
- [x] 6.5 Cover every scenario in `specs/runtime-gateway-resolution/spec.md`, including two workspaces of different loci in one session.

## 7. Documentation

> Depends-on: 5, 6 | Touches: docs/local-first.md, docs/index.md, docs/app-data.md | Verify: `pnpm lint`

- [ ] 7.1 Write `docs/local-first.md`: what a local workspace is, why locus is immutable, what a cloud workspace cannot do, and why there is no offline cache for cloud workspaces (D5).
- [ ] 7.2 State plainly that the VFS root is a user-chosen boundary enforced in application code, not by the operating system.
- [ ] 7.3 Link from `docs/index.md` and cross-reference `docs/app-data.md`.

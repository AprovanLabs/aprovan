# Report: Keychain key provider

## What was built

1. **`SafeStorageKeyProvider`** (`desktop/src/key-provider.ts`) — implements the `KeyProvider` seam over Electron `safeStorage`: generates a 32-byte key on first run, seals it with the OS keystore, and persists the ciphertext as `workspace-cipher-key` under Application Support. Mockable `safeStorage` for CI without a keychain.
2. **Inherited-pipe delivery (4.2)** — `GatewaySupervisor` takes `resolveWorkspaceKey`, spawns with an extra `stdio` pipe (fd 3), writes the 32 raw bytes once, and sets only `WORKSPACE_KEY_FD=3` in the child env (never key material in argv/env). Wired from `main.ts` via `createSafeStorageKeyProvider`.
3. **Gateway bootstrap** — `server/workspace/src/workspace-key-fd.ts` reads the fd at `startWorkspace` when `WORKSPACE_KEY_FD` is set and calls `initLocalWorkspaceCipher` so `KeystoreCipher` is selected for desktop-supervised local mode.

## Verification

1. `pnpm --filter @aprovan/desktop test` — 50 passed (4 key-provider + supervisor delivery / plan tests).
2. `pnpm --filter @aprovan/desktop typecheck` — passed.
3. `pnpm exec vitest run tests/workspace-key-fd.test.ts tests/workspace-locus.test.ts` (after `turbo build --filter=@aprovan/workspace...`) — 18 passed, including sealed non-plaintext credential bytes via `enc:v1:keystore:`.
4. `pnpm --filter @aprovan/workspace typecheck` — passed.

## Deviations

None from the prescribed FD pattern. Tests live at both `desktop/src/__tests__/key-provider.test.ts` (brief) and extensions to `desktop/__tests__/gateway-supervisor.test.ts` (existing convention).

## Notes for streams 7/8

- Signing/notarization (stream 7) should keep Hardened Runtime entitlements compatible with `safeStorage` / Keychain access for the sealed key blob.
- Entitlements may need Keychain access groups if Gatekeeper/notarization tightens keychain prompts; current code uses Electron’s default `safeStorage` only.

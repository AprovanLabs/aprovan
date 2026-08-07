# Brief: Keychain key provider

## Mission
Implement the macOS `KeyProvider` over Electron `safeStorage` (generate + persist a 32-byte key on first run), and deliver that key into the supervised gateway child so `KeystoreCipher` is selected — without putting key material on the command line or in an environment variable other processes can read. When done, credentials created through the desktop app are sealed, non-plaintext bytes on disk.

## Read first
1. `openspec/changes/desktop-shell/tasks.md` — section 4
2. `openspec/changes/desktop-shell/tech-plan.md` (KeyProvider role; D2/D5 for supervisor spawn)
3. `openspec/changes/desktop-shell/specs/desktop-app-shell/spec.md` (keystore-backed credentials)
4. `openspec/changes/archive/2026-08-07-local-first-workspace/tech-plan.md` (`KeyProvider` / `KeystoreCipher` interfaces)
5. `openspec/specs/protected-credential-envelope/spec.md`
6. `desktop/src/gateway-supervisor.ts` (how the child is spawned today)
7. `server/workspace/src/workspaces.ts` — `initLocalWorkspaceCipher`
8. Registry package `@aprovan/registry-server` — `KeyProvider`, `InMemoryKeyProvider`, `getCredentialCipher({ keyProvider })`

## Depends-on
Stream 3 (gateway supervisor) merged on main.

## Tasks
- [ ] 4.1 Implement the `KeyProvider` seam from `local-first-workspace` over Electron `safeStorage`, generating and persisting a 32-byte key on first run.
- [ ] 4.2 Pass the provider to the gateway child so `KeystoreCipher` is selected, without the key transiting a command-line argument or an environment variable readable by other processes.
- [ ] 4.3 Test that a local workspace created through the app stores sealed, non-plaintext credential bytes.

## Acceptance criteria
From `specs/desktop-app-shell/spec.md`:
- WHEN a credential is stored through the desktop app
- THEN it is sealed with a key obtained from the operating system keystore, and the stored bytes are not plaintext

Plus protected-credential-envelope scenarios that apply once keystore is selected.

## Delivery pattern for 4.2 (prescribed)
Use an **inherited pipe / file descriptor**:
1. Main decrypts the key via `safeStorage` into a Buffer.
2. Spawn the gateway with `stdio` including an extra readable pipe; write the 32 raw bytes once and close the write end.
3. Pass only `WORKSPACE_KEY_FD=<n>` (the fd number, not the key) in the child env so the gateway can `fs.readSync`/`read` the bytes and construct an in-process `KeyProvider` / call `initLocalWorkspaceCipher`.
4. Do **not** put base64/hex key material in argv or env.

If the gateway CLI has no hook yet for `WORKSPACE_KEY_FD`, add the smallest bootstrap in `server/workspace` to read the fd at startup when present. Prefer not inventing a second IPC protocol.

## Verify
```bash
pnpm --filter @aprovan/desktop test
pnpm --filter @aprovan/desktop typecheck
# If workspace package changed:
pnpm --filter @aprovan/workspace test
```

## Constraints
- Implement only what the tasks say; match existing style (karpathy guidelines).
- Prefer files under: `desktop/src/key-provider.ts`, `desktop/src/__tests__/key-provider.test.ts`, plus wiring in `desktop/src/gateway-supervisor.ts`, `desktop/src/main.ts`, `desktop/tsup.config.ts`, and the minimal `server/workspace` startup hook for `WORKSPACE_KEY_FD`.
- Do not invent Apple Keychain APIs outside Electron `safeStorage`.
- Mock `safeStorage` in unit tests so CI without a keychain still passes.
- Check off 4.1–4.3 in `openspec/changes/desktop-shell/tasks.md` when done.
- Open a PR against `main` from an isolated branch; do not checkout branches in the primary worktree if other agents may be using it — use `git worktree` or the runner’s isolated checkout.

## Report back
When done: check off tasks, open a PR (or write `briefs/04-key-provider-report.md`) with what you built, how you verified it, deviations, and anything stream 7/8 needs to know.

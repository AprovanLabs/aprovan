# Report: Local directory VFS backend

## What was built

`createLocalDirectoryBackend({ root })` in `packages/native/src/local-directory.ts` — a `NativeVfsBackend` over a real directory. Every path routes through shared `containPath`. Etags are SHA-256 of file bytes; `modifiedAt` is filesystem mtime. Prefix listing supports `recursive`, cursor, and limit (delimiter collapse when non-recursive). Symlinks are skipped on list (same rule as the sandbox executor). Exported from `@aprovan/native`.

Paired registry change: `local-directory` compat entry on `@utdk/vfs` (`moduleSpecifier: "@aprovan/native"`, `credentialless: true`), placed after `aprovan` so catalog default resolution stays unchanged. Package patch bump `0.2.1` → `0.2.2`.

## Verification

1. `pnpm --filter @aprovan/native test` — **62 passed** (9 new in `local-directory.test.ts`, including a vfs conformance block mirroring the memory-backend suite).
2. `pnpm --filter @aprovan/native check-types` — passed.
3. Spec scenarios covered: round-trip, listing, containment (relative escape, absolute, symlink escape, write-outside creates nothing), shared `containPath`, ifMatch/etag, cursor/limit/recursive.

## PRs

- aprovan: https://github.com/AprovanLabs/aprovan/pull/113
- registry (compat): https://github.com/AprovanLabs/registry/pull/153

## Deviations

None from brief scope. Compat lives only in the registry repo (no second source of truth in aprovan). Read encoding is inferred from bytes (utf8 when round-trippable, else base64) because the disk store has no encoding sidecar.

## Notes for later streams

- Nothing binds `local-directory` yet (per tech-plan rollout). Gateway short-circuit today is `aprovan` only; wiring a local workspace's `vfsRoot` to this backend is stream 4/5 work.
- Keep `aprovan` first in `compat.json` so `compat.find(credentialless)` still selects the workspace store by default.
- Containment error messages still say "sandbox" (byte-identical `containPath`); callers see them wrapped as `VfsError(400)`.

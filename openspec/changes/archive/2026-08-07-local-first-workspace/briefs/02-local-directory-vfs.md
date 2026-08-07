# Brief: Local directory VFS backend

## Mission
Implement `createLocalDirectoryBackend({ root })` as a `NativeVfsBackend` routing every path through `containPath`, with etag/mtime, prefix listing, compat entry, and vfs conformance.

## Read first
1. `openspec/changes/local-first-workspace/tech-plan.md` (D3, LocalDirectoryOptions)
2. `openspec/changes/local-first-workspace/specs/local-directory-vfs/spec.md`
3. `openspec/changes/local-first-workspace/tasks.md` — section 2
4. `packages/native/src/contain.ts` (must already exist from stream 1)
5. `packages/native/src/vfs.ts` — `NativeVfsBackend` shape
6. Existing vfs conformance suite location (search `@utdk/vfs` / native tests)

## Depends-on
Stream 1 (containPath) must be merged to main first.

## Tasks
Copy section 2 checkboxes from tasks.md verbatim.

## Verify
`pnpm --filter @aprovan/native test`

## Constraints
Touches only: `packages/native/src/local-directory.ts`, `packages/native/src/index.ts`, `packages/native/__tests__/local-directory.test.ts`, `registry/packages/contracts/vfs/compat.json` — note: vfs compat may live in the **registry** repo at `packages/contracts/vfs/compat.json`. If so, open a paired registry PR and coordinate version; do not invent a second compat file in aprovan.

# Report: Extract path containment

## What was built

Lifted the lexical-plus-realpath containment check out of `LocalExecutor` into a shared `containPath(root, relative)` in `packages/native/src/contain.ts`, exported from `@aprovan/native`. `LocalExecutor.containIn` now delegates to it and wraps failures as `ExecutorError` so executor callers see the same messages and error class.

## Verification

1. Moved the existing `describe("containment")` cases to `packages/native/__tests__/contain.test.ts` and confirmed they passed against the unchanged executor.
2. Extracted `containPath`, rewired the executor, added adversarial cases against `containPath` directly.
3. `pnpm --filter @aprovan/native test` — 53 tests passed.
4. `pnpm --filter @aprovan/native check-types` — passed.
5. Root `pnpm check-types` still fails on pre-existing `@aprovan/patchwork` test-file errors (same on `origin/main`; unrelated to this change).

## Deviations

None from the brief scope. Error messages still say "sandbox" so executor behavior stays byte-identical; wave 2 can keep those strings or introduce a more neutral wording once both callers share the primitive.

## Notes for wave 2 (local-directory VFS)

- Import `containPath` from `@aprovan/native` (or `../contain.js` within the package) and route every VFS path through it.
- Containment skips the realpath check when the target does not exist. A path like `symlink-out/child` that is lexically under the root but whose intermediate component is a symlink will only fail closed once that path exists (or when checking the symlink itself). Callers that create parents before writing inherit the same behavior the executor already had.
- Messages thrown by `containPath` are plain `Error`s with the historical "sandbox" wording; wrap or map if the VFS surface wants a different error type.

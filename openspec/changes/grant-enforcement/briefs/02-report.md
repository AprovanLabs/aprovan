# Report: grant-enforcement §2 — Dynamic namespace access is an error

## PR
https://github.com/AprovanLabs/registry/pull/133

## Branch
`iw8/grant-enforcement-02-bracket`

## Verify (full output)

```
> @utdk/remote@0.1.5 test /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-ge02/packages/remote
> vitest run

 RUN  v2.1.5

 ✓ __tests__/remote.test.ts (28 tests) 9ms

 Test Files  1 passed (1)
      Tests  28 passed (28)
```

## Exact error message text

`DynamicToolsAccessError` (thrown by `scanToolsAccess` and `parseScriptDependencies`):

```
tools[expr] is not allowed — use tools.<namespace> member access (see globalAlias for slash-named providers) or tools.search() to discover providers.
```

## API changes

- **Added:** `DynamicToolsAccessError` — exported from `@utdk/remote` and `@utdk/remote/tools-scan`.
- **Removed:** `unresolved` from `ToolsAccessScan` and `ParsedScript`.
- **Version:** `@utdk/remote` bumped `0.1.4` → `0.1.5`.

## Files changed

- `packages/remote/src/types.ts` — `DynamicToolsAccessError`
- `packages/remote/src/tools-scan.ts` — throw on `tools[…]`; drop `unresolved`
- `packages/remote/src/imports.ts` — docstring updated (scan-hint retained); drop `unresolved` from `ParsedScript`
- `packages/remote/src/index.ts` — export new error
- `packages/remote/__tests__/remote.test.ts` — bracket throws; string-literal `"tools[x]"` ignored
- `packages/remote/package.json` — version bump
- `apps/registry/src/lib/playground.ts` — `detectDependencies` no longer returns `unresolved`
- `apps/registry/src/components/ScriptPlayground.tsx` — stop passing `unresolved` to `DependencyPanel`

## registry-ui note

`packages/registry-ui` lives in the **aprovan** repo (`@aprovan/registry-ui`). The warning chip in `dependency-panel.tsx` is no longer fed (`unresolved` prop removed from registry playground). Chip removal from the component itself is a follow-up in aprovan if desired.

## Not in scope (deferred)

- §3 credential provisioning (default profile on connect)
- Removing dead `unresolved` prop from `@aprovan/registry-ui` dependency panel

## Aprovan follow-up (2.3)
Removed `unresolved` prop and warning chip from `packages/registry-ui/src/dependency-panel.tsx`
(panel package lives in aprovan after product-plane move). Registry playground already
stopped feeding the prop in #133.

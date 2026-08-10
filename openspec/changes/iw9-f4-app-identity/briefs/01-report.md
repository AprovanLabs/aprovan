# Report — stream 1: app.yaml loader/validator

## What was built

- Added `yaml@^2.9.0` to `@aprovan/workspace` dependencies (+ lockfile).
- Created `server/workspace/src/apps/manifest.ts`:
  - `AppYamlSchema` (Zod-over-YAML) with authored fields `slug?`, `title?`,
    `description?`, `icon?`, `capabilities?` (any `string[]`), `requires?`
    (`AppRequirement` shape), `hostModes` default `["managed"]`, `.strict()`.
  - Platform-owned keys (`appId`, `createdAt`, `updatedAt`, `createdBy`,
    `channels`, `paths`, `entry`) rejected via `superRefine` with
    `"identity is platform-assigned; never appears in app.yaml"`, then
    stripped by `.transform` so they never appear on `AppYaml`.
  - Icon traversal/absolute-path rejection by string pattern only (leading
    `/` or any `..` segment) — no filesystem access.
  - `loadAppYaml(content)` → `{ ok: true, value } | { ok: false, issues }`;
    YAML parse failures carry line/column position; no partial manifest.
- Created `server/workspace/tests/app-manifest.test.ts` (25 tests) covering
  valid parse, unknown key, each platform field, malformed YAML position,
  icon accept/reject, hostModes default/explicit/invalid.

## How verified

```bash
pnpm turbo run build --filter=@aprovan/workspace^...   # deps only — see deviations
pnpm --filter @aprovan/workspace test -- tests/app-manifest.test.ts  # 25/25 pass
pnpm --filter @aprovan/workspace typecheck             # fails — see deviations
```

Stream-owned files introduce **no** `tsc` errors (`manifest.ts` /
`app-manifest.test.ts` clean against the package tsconfig).

## Deviations

1. **`pnpm turbo run build --filter=@aprovan/workspace` and package
   `typecheck` fail on pre-existing `origin/main` breakage** in
   `server/workspace/src/native-dispatch.ts` (lines ~311, ~339): after
   `#172` (`feat(native): hash-bearing VCS diff wire contract`),
   `NativeVcsDiff` is `{ path, hash }[]` but `native-dispatch` still maps
   diffs to `string[]`. Out of this stream's Touches — not fixed here.
   Deps were built with `pnpm turbo run build --filter=@aprovan/workspace^...`
   instead; tests pass.

2. **Platform fields are declared as `z.unknown().optional()` on the object
   before `.strict().superRefine().transform()`.** Zod's `.strict()` would
   otherwise treat them as ordinary unrecognized keys; naming them on the
   object lets `superRefine` emit the D3 message. They are stripped from the
   output type/`AppYaml` by `.transform`. Semantically identical to the
   tech-plan Interfaces block; structural difference only.

## Notes for stream 3 (`reconcile.ts`)

- Import `AppYaml` / `loadAppYaml` from `../apps/manifest.js` (or
  `./manifest.js` within `apps/`).
- `AppYaml.hostModes` is always present after a successful load (defaults to
  `["managed"]`).
- `capabilities` is unchecked beyond `string[]` — do not add grammar here.
- `slug` is optional and unchecked for basename match — that guard is
  reconcile's (T2).
- `loadAppYaml` is pure (string in → result out); reconcile owns all IO /
  identity minting.

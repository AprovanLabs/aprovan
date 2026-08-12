# Report: Stream 1 — effect bundler derivation

**Registry PR:** https://github.com/AprovanLabs/registry/pull/162  
**Branch:** `feat/iw9-c-effect-bundler`

## What was built

- `export type Effect = "observation" | "action"` and pure
  `effectFromHttpMethod(method)` in `packages/bundler/src/client-api.ts`
  (GET/HEAD → `observation`; everything else including missing → `action`).
- Shared `toolCallHttpMethod(tool)` so `client-api` and `openapi` read
  `http_method` the same way.
- `effect: Effect` on `ToolRuntimeMetadata`, stamped in `buildInputSchema`
  and `buildClientToolMap`.
- Tests in `client-api.test.ts` and `openapi.test.ts` for GET → observation,
  POST/PUT/PATCH/DELETE → action, and missing method → action.

## Verify

```bash
cd <registry-worktree>
pnpm --filter @aprovan/utdk-bundler exec vitest run src/client-api.test.ts src/openapi.test.ts
# 31 passed
```

Full package test suite: our files pass. One pre-existing failure on
`origin/main`: `catalog.test.ts` missing `dynamodb-kv` / `sqs` from catalogue.

## Deviations

- Exported `toolCallHttpMethod` (not named in the brief) to mirror extraction
  without duplicating the typeof-string check in `openapi.ts`.
- Did not edit `render.test.ts` (outside Touches). `check-types` now fails
  until that fixture adds `effect` — recommend a one-line fix in stream 4
  or a tiny follow-up.
- Tasks preamble prefers new test files; brief Touches list existing
  `*.test.ts` — followed brief Touches.

## Notes for stream 4 (regen)

- After this merges, regen will serialize `effect` into generated
  `metadata.ts` via the existing `toolMetadata` JSON path in `render.ts`.
- Spot-check GET-heavy (github), POST-heavy, and mixed providers.
- Add `effect` to the `render.test.ts` helper fixture for clean typecheck.

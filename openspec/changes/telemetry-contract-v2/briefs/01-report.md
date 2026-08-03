# Report: Brief 01 — telemetry contract + SDK + Datadog compat

## PR
https://github.com/AprovanLabs/registry/pull/86

Branch: `iw5/telemetry-contract-sdk-compat` (worktree `/tmp/iw5-telemetry-contract`).

## Verify
```text
pnpm --filter @utdk/telemetry build          OK
pnpm --filter @utdk/telemetry test           OK — 22 tests (15 contract + 7 SDK)
npx vitest run packages/utdk/datadog/telemetry  OK — 3 tests
pnpm --filter utdk check-types               OK
loadCompatDocuments(packages/contracts)      OK — telemetry native/datadog/sentry
```

## Audit status
Metrics mapping section added to `packages/contracts/telemetry/AUDIT.md` against
OTLP Collector, Datadog OTLP, and Honeycomb OTLP for gauge/sum/histogram.
**Audit closed for the 0.3.0 freeze gate.** Package version remains **0.2.0**
(stream 4 owns the bump).

## Tasks
Streams 1–3 checked off in `tasks.md` (1.1–3.4). Streams 4+ untouched.

## Notes for stream 4 (freeze/mirror)
- Bump `@utdk/telemetry` to **0.3.0** only after this PR merges; audit gate is ready.
- Mirror registry `packages/contracts/telemetry` verbatim into
  `aprovan/packages/contracts/telemetry` (or switch to published npm if IW-0 landed).
- Confirm `./sdk` subpath is in the publish manifest (`pnpm publish --dry-run`).

## IW-0 / publish interaction
- Did **not** edit `packages/registry-server/**`, `publish.yml`, or provider
  `package.json` docs paths.
- Minimal lockfile touch only: `utdk` now depends on `@utdk/telemetry` workspace:*
  (+3 lines). No new workspace packages.
- Catalogue: `utdk` exports `./datadog/telemetry`; `registry.json` lists
  `datadog/telemetry`. Transpile lands at `dist/datadog/telemetry/`.

## Blockers
None for streams 1–3. Stream 4 blocked only on this PR merging.

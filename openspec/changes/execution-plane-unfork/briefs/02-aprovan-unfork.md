# Brief: Aprovan npm switch + fork delete (execution-plane-unfork streams 4–6)

## Mission
After the npm gate (`@aprovan/registry-server@0.1.1`, `utdk`, `@aprovan/runtime` installable),
repoint aprovan deps to npm semver, delete forked `packages/{utdk,contracts,runtime,bundler,mcp,mcp-core,registry-server}`,
fix launch.json scratch gateway, and prove fresh-clone green.

## Gate
BLOCKED until `briefs/01-report.md` from stream 1–3 confirms clean-room install. Do not start earlier.

## Read first
1. `openspec/changes/execution-plane-unfork/briefs/01-report.md` (must exist and show npm green)
2. `tasks.md` streams 4–6; `tech-plan.md` D5–D7; `specs/execution-plane-consumption/spec.md`

## Tasks
Streams 4, 5, 6 verbatim (4.1–4.6, 5.1, 6.1–6.3).

## Verify
Per tasks.md Verify lines for streams 4–6 (fresh clone build/test + docker image + grep gates).

## Constraints
Touches only stream 4–6 globs. If IW-5 mirrored contracts into aprovan already, prefer switching
`@utdk/telemetry` to published npm rather than deleting then re-adding — record the path taken.

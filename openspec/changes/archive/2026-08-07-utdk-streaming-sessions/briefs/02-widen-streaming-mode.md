# Brief: Widen the streaming declaration

## Mission
Change `ServiceToolEntry.streaming` from boolean to `StreamingMode` (`"response" | "session" | false`). Map existing `streaming: true` to `"response"`. Surface the mode in `GET /tools`. Fix downstream type errors. No wire behavior change for current callers.

## Read first
1. `openspec/changes/utdk-streaming-sessions/tech-plan.md` (D2)
2. `openspec/changes/utdk-streaming-sessions/specs/streaming-sessions/spec.md` — "Streaming mode declaration"
3. `openspec/changes/utdk-streaming-sessions/tasks.md` — section 2 only
4. `server/workspace/src/service-kernel.ts`, `server/workspace/src/routes/tools.ts`, `server/workspace/src/platform-output-schemas.ts`

Note: `@utdk/common` may not yet export `StreamingMode`. Until the registry PR for stream 1 merges and publishes, define a local type alias matching the tech plan in the workspace package, OR depend on a path/workspace link if one exists. Prefer importing from `@utdk/common/streaming` if already available on main; otherwise temporarily declare the same type locally and leave a TODO comment `// sync: import from @utdk/common/streaming when published` — do not invent a different shape.

## Tasks
- [ ] 2.1 Change `ServiceToolEntry.streaming` to `StreamingMode` (D2); absent stays equivalent to `false`.
- [ ] 2.2 Map any existing `streaming: true` declaration to `"response"` so no current wire behavior changes.
- [ ] 2.3 Surface the mode in `GET /tools` discovery output, satisfying the "Session operation is discoverable" scenario.
- [ ] 2.4 Fix downstream type errors the widening surfaces.

## Acceptance criteria
Legacy `true` → `"response"` with unchanged dispatch. Absent ≡ false. Discovery shows mode string.

## Verify
```bash
pnpm --filter @aprovan/workspace test && pnpm check-types
```
(If full `pnpm check-types` is too heavy, at minimum workspace + its dependents that fail.)

## Constraints
- Only section 2. Do not add session routes (section 3).
- Touches only: `server/workspace/src/service-kernel.ts`, `server/workspace/src/routes/tools.ts`, `server/workspace/src/platform-output-schemas.ts`, and any file with type errors caused by the widening (list them in the report).
- Repo: **aprovan**. Branch from latest `main`. PR to main.
- Check off 2.1–2.4 in tasks.md. Write `briefs/02-widen-streaming-mode-report.md`.

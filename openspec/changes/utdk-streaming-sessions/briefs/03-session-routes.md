# Brief: Session routes on the tools surface

## Mission
Wire `SessionManager` from `@utdk/common/streaming` into the workspace tools surface: open on `"session"` mode operations, SSE event channel, push (202), close with terminal result, end frame on leave-active, and declared error codes. Integration tests for lifecycle + ownership.

## Read first
1. `openspec/changes/utdk-streaming-sessions/tech-plan.md` (wire table, state machine, error codes)
2. `openspec/changes/utdk-streaming-sessions/specs/streaming-sessions/spec.md` — Session lifecycle, Session ownership
3. `openspec/changes/utdk-streaming-sessions/tasks.md` — section 3
4. `server/workspace/src/routes/tools.ts` (SSE_HEADERS, dispatch)
5. `@utdk/common/streaming` (published as `@utdk/common@0.1.2`)

## Depends-on
Streams 1 and 2 are merged. Bump `server/workspace` dependency `"@utdk/common": "^0.1.2"` as part of this PR.

## Tasks
Copy section 3 checkboxes from tasks.md verbatim (3.1–3.6).

## Verify
```bash
pnpm --filter @aprovan/workspace test
```
Focus on new streaming-sessions tests; note any pre-existing failures separately.

## Constraints
Touches: `server/workspace/src/routes/sessions-streaming.ts` (new), `server/workspace/src/routes/tools.ts`, `server/workspace/src/__tests__/streaming-sessions.test.ts`, `server/workspace/package.json` (+ lockfile).
Do not implement bind-time enforcement (section 4) or docs (section 5) in this PR unless trivial.
Branch from latest `main`, PR to main, check off tasks, write `briefs/03-session-routes-report.md`.

# Report: Session routes on the tools surface

## Summary
Wired `@utdk/common/streaming` `SessionManager` into the workspace tools surface: open on registered session ops, SSE event channel (reusing `SSE_HEADERS`), push (202 empty), close with terminal result + `{type:"end"}` frame, and declared error codes. Bumped `@utdk/common` to `^0.1.2`.

## Changes
| File | Change |
|---|---|
| `server/workspace/package.json` + lockfile | `@utdk/common` `^0.1.1` → `^0.1.2` |
| `server/workspace/src/routes/sessions-streaming.ts` | New: driver registry, manager accessors, open helper, SSE mount for GET/push/close |
| `server/workspace/src/routes/tools.ts` | Export `SSE_HEADERS`; mount session routes; branch POST to `SessionManager.open` when op is registered |
| `server/workspace/src/service-kernel.ts` | Import/re-export `StreamingMode` from `@utdk/common/streaming` (replaces local alias) |
| `server/workspace/tests/streaming-sessions.test.ts` | Lifecycle + ownership integration tests (vitest `tests/` include; brief path was `src/__tests__`) |
| `openspec/.../tasks.md` | Checked off 3.1–3.6 |

## Wire
| Method | Path | Behavior |
|---|---|---|
| POST | `/tools/:ns/:proc` | `SessionManager.open` when `registerSessionOperation` has the op; else existing dispatch |
| GET | `/tools/:ns/sessions/:id` | SSE via shared `SSE_HEADERS` |
| POST | `/tools/:ns/sessions/:id/push` | 202 empty body |
| POST | `/tools/:ns/sessions/:id/close` | `{ data: terminal }`; channel gets `{type:"end"}` |

Errors: `{ error, code }` with `session-not-found` / `session-expired` / `session-forbidden` (from `SessionError`).

## Verify
```text
pnpm --filter @aprovan/workspace check-types                 # pass
pnpm --filter @aprovan/workspace exec vitest run \
  tests/streaming-sessions.test.ts \
  tests/tools-streaming.test.ts                            # 11/11 pass
```

Focused suite covers open, independent SSE events, push 202, close + end frame + push-after-close 409, non-session fallthrough, `session-forbidden`, `session-not-found`.

## Notes
- Session ops are gated by `registerSessionOperation` until a real contract (e.g. stt) wires its driver; discovery still surfaces `streaming: "session"` from tool entries (stream 2).
- Tests live under `tests/` so vitest's `include: ["tests/**/*.test.ts"]` picks them up.

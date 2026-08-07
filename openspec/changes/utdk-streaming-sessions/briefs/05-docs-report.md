# Report: Document streaming sessions

## PR
https://github.com/AprovanLabs/aprovan/pull/122

## Summary
Wrote `docs/streaming-sessions.md` against the landed wire surface (`sessions-streaming.ts`, `@utdk/common/streaming`), linked it from `docs/index.md`, and checked off tasks 5.1–5.3. This completes all task groups for `utdk-streaming-sessions`.

## Changes
| File | Change |
|---|---|
| `docs/streaming-sessions.md` | New: wire table, state machine, error codes, driver pattern; prominent “Not a duplex channel” (POST push × N + SSE, MCP alignment) |
| `docs/index.md` | Link under References |
| `openspec/.../tasks.md` | Checked off 5.1–5.3 |

## Content coverage
- Wire: open / SSE / push 202 / close; discovery `streaming: "session"`; shared `SSE_HEADERS`; `{type:"end"}` terminal frame
- State: `open → active → closing → closed`; idle 60s / absolute 30 min; ownership codes
- Errors: `session-not-found`, `session-expired`, `session-forbidden`, `streaming-unsupported` (+ bind-time note)
- Driver: `StreamingSessionDriver` around a vendor duplex; `registerSessionOperation` / capabilities registration

## Verify
Content checked against tech plan wire table and `sessions-streaming.ts`. (`pnpm lint` skipped — pre-existing eslint config break on main; brief says do not block.)

## Notes
- All OpenSpec task groups 1–5 for this change are complete; ready to archive when desired.
- No code changes; docs-only PR.

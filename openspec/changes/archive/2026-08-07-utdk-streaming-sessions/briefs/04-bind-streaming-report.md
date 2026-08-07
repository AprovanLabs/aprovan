# Report: Bind-time streaming capability enforcement

## PR
https://github.com/AprovanLabs/aprovan/pull/119

## Summary
During profile/interface bind (`writeBinding` / `profiles.set` → `setProfile`), when the target contract declares any session operation, the provider's `StreamingCapabilities` are checked and bind fails with `streaming-unsupported` if unsupported — at bind time, not call time. (`interfaces.bind` was removed earlier; this is the current bind path.)

## Changes
| File | Change |
|---|---|
| `server/workspace/src/routes/sessions-streaming.ts` | `registerSessionInterface`, `registerProviderStreamingCapabilities`, `interfaceRequiresStreaming`, `assertStreamingBindAllowed` (throws `SessionError` with code `streaming-unsupported`) |
| `server/workspace/src/interfaces.ts` | Call assert on `writeBinding`; re-export assert |
| `server/workspace/src/profiles/store.ts` | Call assert on `setProfile` when binding a namespace + provider |
| `server/workspace/src/interfaces-service.ts` | Document bind-time enforcement; re-export assert |
| `server/workspace/tests/interfaces-streaming.test.ts` | Both bind scenarios + no-descriptor + non-session fallthrough |
| `openspec/.../tasks.md` | Checked off 4.1–4.3 |

## Behavior
- Session-bearing interface = `registerSessionInterface(id)` and/or any `registerSessionOperation` under that namespace.
- Provider descriptor = `registerProviderStreamingCapabilities(provider, caps)` (future contracts register at load).
- Missing descriptor or `streaming: false` → `SessionError` `{ code: "streaming-unsupported", message: '<provider> does not support "streaming"' }`.
- Interfaces without session ops (e.g. `llm`) unchanged.

## Verify
```text
pnpm --filter @aprovan/workspace check-types                 # pass
pnpm --filter @aprovan/workspace exec vitest run \
  tests/interfaces-streaming.test.ts \
  tests/streaming-sessions.test.ts \
  tests/workspace-locus.test.ts \
  tests/tools-streaming.test.ts                            # all pass
```

Full `pnpm --filter @aprovan/workspace test`: 81 failures, pre-existing on `origin/main` (vfs mounts, telemetry/vcs/interfaces suites, etc.) — same class as stream 2 report; unrelated to this change.

## Notes for next wave
- When `stt` (or another session contract) lands, call `registerSessionInterface("stt")` and `registerProviderStreamingCapabilities` for each provider module at wiring time.
- HTTP `profiles.set` via `/tools` still maps only `ServiceError` status; coded `SessionError` is visible to direct callers / in-process bind. Wire mapping can be added when a UI needs `{ error, code }` on that path.
- No docs (section 5).

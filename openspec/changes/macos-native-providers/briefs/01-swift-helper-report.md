# Report: Swift helper skeleton (stream 1)

## What was built

- **`native/macos-helper`** Swift package (`macos-helper` executable + `MacOSHelperLib`):
  - Loopback-only HTTP server (`Network.framework`) binding `127.0.0.1:<port>`
  - `GET /health` → `{"ok":true}`
  - `GET /availability` → `AvailabilityReport` with D3 states (`available` | `unsupported`+reason | `disabled`+reason+remedy)
  - Skeleton probes: `llm` (OS-floor → unsupported vs disabled), `esm` (unsupported until stream 2)
- **`desktop/src/helper-supervisor.ts`**: mirrors `GatewaySupervisor` (start, health-poll, backoff restart, SIGTERM→SIGKILL stop). Missing binary → `unavailable` without spawn; crash/failed leaves the app running.
- Wired in `main.ts` (start + quit drain), `paths.ts` (`resolveHelperBinary`), `tsup.config.ts`.

## Verify

```
pnpm --filter @aprovan/desktop test   # 62 passed (incl. 8 helper-supervisor)
swift test --package-path native/macos-helper   # 6 passed
```

## Spec coverage (`loopback-provider-host`)

| Scenario | Covered by |
| --- | --- |
| Gateway reaches native capability as a provider | Spawn plan exposes loopback URL; helper is ordinary HTTP (no gateway fork) |
| Gateway remains the portable artifact | Supervisor never patches gateway; helper binary is separate |
| Helper not reachable from other hosts | Bind `127.0.0.1` via `requiredLocalEndpoint` + spawn `--host 127.0.0.1` |
| Capability unsupported / disabled / operator sees reason | Swift `AvailabilityReport` encode + llm probe tests |
| Helper crash does not stop the app | HelperSupervisor restart test + missing-binary → unavailable |
| Availability re-read after restart | Ready again with new loopback URL after crash |
| No orphan after quit | SIGTERM then SIGKILL shutdown test |

## Deviations

- Helper status is **not** on `DesktopBridge` yet — nothing consumes it until streams 2–3. Status is logged from main on unavailable/failed.
- `llm` never reports `available` in this stream (chat lands in stream 3); OS≥26 yields `disabled` with a remedy so the three-state shape is exercised.

## Next wave needs to know

- Unpackaged binary path: `native/macos-helper/.build/debug/macos-helper` (SwiftPM symlink).
- Packaged path expected later: `Resources/macos-helper/macos-helper` (signing stream).
- CLI: `macos-helper --host 127.0.0.1 --port <n>`.
- Capability keys in use: `llm`, `esm`.

# Report: Gateway supervision

## What was built

`GatewaySupervisor` (`desktop/src/gateway-supervisor.ts`) keeps one vendored gateway process alive for the Electron shell:

1. **Ephemeral loopback (3.1 / D5)** — reserves a free port on `127.0.0.1`, spawns `node dist/cli.js start` with `WORKSPACE_MODE=local`, `WORKSPACE_DATA_DIR` under Application Support `gateway-data/`, and `WORKSPACE_HOST=127.0.0.1` / `--host 127.0.0.1`. Ready URL is published to the renderer via the bridge.
2. **Health + status (3.2)** — polls `/health`, emits `starting` → `ready` / `restarting` / `failed` through `publishGatewayStatus` (IPC + bridge host state). Main wires the supervisor on launch; the window stays open across gateway failures.
3. **Backoff ceiling (3.3)** — exponential backoff between attempts; after `maxAttempts` (default 5) holds at `failed` with the last error. `retry()` restarts from failed.
4. **Clean quit (3.4)** — `before-quit` stops the supervisor: SIGTERM, await drain, SIGKILL if needed.
5. **Gateway bind** — optional `WORKSPACE_HOST` / `--host` on `@aprovan/workspace` so the supervised child is loopback-only (container/CLI default unchanged: all interfaces).

## Verification

1. `pnpm --filter @aprovan/desktop test` — 29 passed (12 new supervisor tests covering every `specs/gateway-supervision` scenario, including port-4000 occupied).
2. `pnpm --filter @aprovan/desktop check-types` — passed.

## Deviations

- Artifact-vs-container parity remains stream 2’s `assert-gateway.sh`; supervisor tests assert the spawn entry is always vendored `dist/cli.js` with no desktop fork.
- `WORKSPACE_HOST` is a small general gateway change (not a desktop-only fork) required for the loopback-only spec.

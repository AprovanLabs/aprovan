## 1. Session mechanics in `@utdk/common`

> Depends-on: - | Touches: registry/packages/utdk/common/streaming.ts, registry/packages/utdk/common/__tests__/streaming.test.ts, registry/packages/utdk/common/package.json | Verify: `pnpm --filter @utdk/common test && pnpm --filter @utdk/common check-types`

- [x] 1.1 Add `StreamingMode`, `StreamingCapabilities`, `SessionEvent`, and `StreamingSessionDriver` exactly as declared in the tech plan's Interfaces & Data (D3).
- [x] 1.2 Implement `SessionManager`: id minting, principal ownership recorded at open, driver subscription fan-out, monotonic `seq` per session, and the `open → active → closed` state machine.
- [x] 1.3 Implement idle-timeout and absolute-cap reclamation with injectable clock and timer so expiry is testable without wall time (D5).
- [x] 1.4 Export `./streaming` from the package exports map.
- [x] 1.5 Tests: event ordering with zero pushes, push-after-close returns the 409 condition, idle reclamation releases the driver, absolute cap fires while pushes continue, ownership check distinguishes `session-forbidden` from `session-not-found`.

## 2. Widen the streaming declaration

> Depends-on: - | Touches: server/workspace/src/service-kernel.ts, server/workspace/src/routes/tools.ts, server/workspace/src/platform-output-schemas.ts | Verify: `pnpm --filter @aprovan/workspace test && pnpm check-types`

- [x] 2.1 Change `ServiceToolEntry.streaming` to `StreamingMode` (D2); absent stays equivalent to `false`.
- [x] 2.2 Map any existing `streaming: true` declaration to `"response"` so no current wire behavior changes.
- [x] 2.3 Surface the mode in `GET /tools` discovery output, satisfying the "Session operation is discoverable" scenario.
- [x] 2.4 Fix downstream type errors the widening surfaces.

## 3. Session routes on the tools surface

> Depends-on: 1, 2 | Touches: server/workspace/src/routes/sessions-streaming.ts, server/workspace/src/routes/tools.ts, server/workspace/src/__tests__/streaming-sessions.test.ts | Verify: `pnpm --filter @aprovan/workspace test`

- [x] 3.1 Route `POST /tools/:ns/:proc` to `SessionManager.open` when the resolved tool entry declares mode `"session"`; leave every other mode on the existing dispatch path.
- [x] 3.2 Add `GET /tools/:ns/sessions/:id` emitting `text/event-stream`, reusing the existing `SSE_HEADERS` constant rather than defining new headers.
- [x] 3.3 Add `POST /tools/:ns/sessions/:id/push` returning 202 with an empty body, and `POST /tools/:ns/sessions/:id/close` returning the terminal result.
- [x] 3.4 Emit a terminal `{type:"end"}` frame and close the channel when a session leaves `active`, however it leaves.
- [x] 3.5 Map every failure to the declared codes: `session-not-found`, `session-expired`, `session-forbidden`.
- [x] 3.6 Integration tests covering each scenario in `specs/streaming-sessions/spec.md` under "Session lifecycle" and "Session ownership".

## 4. Bind-time capability enforcement

> Depends-on: 3 | Touches: server/workspace/src/interfaces.ts, server/workspace/src/interfaces-service.ts, server/workspace/src/__tests__/interfaces-streaming.test.ts | Verify: `pnpm --filter @aprovan/workspace test && pnpm check-types`

- [x] 4.1 Read the provider's `StreamingCapabilities` during `interfaces.bind` when the target contract declares any session operation (D4).
- [x] 4.2 Reject with code `streaming-unsupported` and a message naming provider and capability; do not defer the failure to call time.
- [x] 4.3 Tests for both bind scenarios in the spec's "Bind-time streaming capability enforcement" requirement.

## 5. Document the mechanism

> Depends-on: 3 | Touches: docs/streaming-sessions.md, docs/index.md | Verify: `pnpm lint`

- [ ] 5.1 Write `docs/streaming-sessions.md` covering the wire table, the state machine, the error codes, and how a provider implements `StreamingSessionDriver` around a vendor duplex socket.
- [ ] 5.2 State explicitly that continuous upstream input is a sequence of POSTs, not a duplex channel, and why (MCP alignment) — this is the single most likely thing for an implementor to get wrong.
- [ ] 5.3 Link it from `docs/index.md`.

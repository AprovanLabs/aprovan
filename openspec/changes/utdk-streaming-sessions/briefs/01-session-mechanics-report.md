# Report: 01 — Session mechanics in `@utdk/common`

## PR
https://github.com/AprovanLabs/registry/pull/151

## Version
`@utdk/common@0.1.2`

## Built
- `packages/utdk/common/streaming.ts` — types verbatim from tech plan (`StreamingMode`, `StreamingCapabilities`, `SessionEvent`, `StreamingSessionDriver`) plus `SessionManager`, `SessionError` / `SessionErrorCode`, injectable `now` / `setTimeout` / `clearTimeout` / `mintId`.
- `packages/utdk/common/__tests__/streaming.test.ts` — covers 1.5 scenarios.
- `package.json` — `./streaming` export; patch bump `0.1.1` → `0.1.2`.
- Nothing else imports streaming (additive only).

## SessionManager API (for section 3 routes)
| Method | Behavior |
|---|---|
| `open(driver, principal, args?)` | Mints id, records ownership, subscribes to driver, returns `{ sessionId, capabilities }`; state → `active`. |
| `subscribe(sessionId, principal, sink)` | Fan-out registration; returns unsubscribe. |
| `push(sessionId, principal, message)` | Forwards to driver; resets idle. |
| `close(sessionId, principal)` | Driver close, emits `{type:"end"}`, state → `closed`; returns terminal result. |
| `getState(sessionId)` | Current state or `undefined`. |

Defaults: idle **60s**, absolute **30 min**. Manager stamps monotonic `seq` starting at 0 (ignores driver seq).

### Error codes for routes
| Condition | `code` | `status` |
|---|---|---|
| Unknown id | `session-not-found` | 404 |
| Wrong principal (session exists) | `session-forbidden` | 403 |
| Push/subscribe/close when not `active` (explicit close) | `session-not-found` | **409** |
| Same after idle/absolute reclaim | `session-expired` | **409** |
| `capabilities.streaming === false` at open | `streaming-unsupported` | 400 |

Throw `SessionError` and map `error.code` / `error.status` on the tools surface.

## Verify
```
pnpm --filter @utdk/common test        # 97 passed (7 streaming)
pnpm --filter @utdk/common check-types # ok
```

## Tasks
1.1–1.5 checked off in `tasks.md`.

## Notes for section 3
- Reuse `SessionError` rather than inventing parallel HTTP mapping.
- Emit SSE from `subscribe`; terminal `end` is already fanned out when leaving `active`.
- Closed/expired sessions stay in the registry as tombstones so codes stay distinguishable.

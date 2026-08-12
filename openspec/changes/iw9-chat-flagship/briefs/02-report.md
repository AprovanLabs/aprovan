# Stream 2 report — CF-1 app-scoped realtime handler

**PR:** (filled after `gh pr create`)
**Branch:** `feat/iw9-chat-cf1-realtime`
**Base:** `origin/main` (@ `85595e2` — stream 1 #225)

## Built

| Path | Role |
|---|---|
| `server/workspace/src/realtime/app-topics.ts` | Namespace `app`, topic `app:<installId>`; subscribe snapshot; sync `authorize?`; message hints; presence/typing; channel-membership |
| `server/workspace/tests/realtime-app-topics.test.ts` | Acceptance scenarios (invariant 7, presence, priority stand-in) |

### Topic grammar (for streams 7 / 12)

```ts
import { appTopic, createAppTopicsHandler } from "../realtime/app-topics.js";
// topic: app:<installId>
broker.registerNamespace(createAppTopicsHandler(broker));
```

Subscribe body: `{ channels, presence: [{sub, lastActive}], instanceId }`.

Publish actions: `message` | `typing` | `presence` | `channel-membership`.

Fan-out events: `{kind:"message"|"channel-membership"|"presence"|"typing", ...}`
(message payload is a hint — `recordId`/`seq`/`hint`, not the full body).

### `canReadChannel` reuse (stream 1 D2)

```ts
import { canReadChannel } from "../apps/chat/authz.js";
// Cached at subscribe / channel-membership refresh with
// canReadChannel(principal, installId, channelId, { workspaceId, instanceId })
```

Sync `authorize(conn, topic)` reads the cache + pending fan-out `channelId`
(F5 hook has no event body).

## Verified

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/realtime-app-topics.test.ts
# ✓ 7 passed

pnpm --filter @aprovan/workspace typecheck
# exit 0

! grep -rn "records\.\(set\|put\|write\)\|vfs\.\(write\|put\)" \
  server/workspace/src/realtime/app-topics.ts
# GREP_OK (no matches)
```

## Tasks

| Task | Status |
|---|---|
| 2.1 handler + subscribe snapshot | done (boot registration → D4) |
| 2.2 sync `authorize?` via `canReadChannel` cache | done |
| 2.3 message hints + channel-membership | done |
| 2.4 presence/typing via `storeFor(..., "app")` | done |
| 2.5 tests | done |

## Deviations

See `briefs/deviations.md` stream 2 (D3–D6). Headlines:

1. **Sync auth cache** alongside async `NamespaceStore` (D3).
2. **Boot registration** not wired in `socket.ts` — outside Touches (D4).
3. **Priority path** simulated in test; F5 OutboundChannel not on main (D5).
4. **`instanceId`** resolved newest-first from install on subscribe (D6).

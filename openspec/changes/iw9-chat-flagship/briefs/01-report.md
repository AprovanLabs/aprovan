# Stream 1 report — Chat data model + channel authz

**PR:** (filled after open)
**Branch:** `feat/iw9-chat-data-model`
**Base:** `origin/main`

## Built

| Path | Role |
|---|---|
| `server/workspace/src/apps/chat/schema.ts` | Zod `Channel` / `Message` (+ key helpers `ch#` / `msg#`) |
| `server/workspace/src/apps/chat/authz.ts` | **`canReadChannel`** export (T3) |
| `server/workspace/src/apps/chat/service.ts` | `createChannel`, `postMessage`, `listChannels`, `fetchWindow`, `fetchOlder` |
| `server/workspace/tests/chat-data-model.test.ts` | Acceptance + `canReadChannel` matrix |

### `canReadChannel` export path (for stream 2)

```ts
import { canReadChannel } from "../apps/chat/authz.js";
// canReadChannel(principal, installId, channelId, { workspaceId, instanceId })
```

- **public** → `assertInstanceAccess` succeeds
- **restricted** → participant **and** `channel.members` includes principal
- Returns `boolean` (never throws); read/write surfaces map `false` → identical 404

## Verified

```bash
pnpm --filter @aprovan/workspace exec vitest run tests/chat-data-model.test.ts
# ✓ 6 passed

pnpm --filter @aprovan/workspace typecheck
# exit 2 — pre-existing on origin/main (`native-dispatch.ts` vs `@aprovan/native`);
# no errors under apps/chat/ or chat-data-model.test.ts
```

## Tasks

| Task | Status |
|---|---|
| 1.1 schemas | done |
| 1.2 CRUD | done (see deviations — `resolveRecordScope` composed) |
| 1.3 `canReadChannel` | done |
| 1.4 deny-as-404 | done |
| 1.5 tests | done |

## Deviations

See `briefs/deviations.md` (stream 1 entries). Headline:

1. **`resolveRecordScope` not on main** — F2 stream 3 unfinished; service composes `assertInstanceAccess` + `sharedRecordScope`.
2. **`canReadChannel` takes a 4th `scope` bag** (`workspaceId` + `instanceId`) — three-arg form alone cannot address F2.

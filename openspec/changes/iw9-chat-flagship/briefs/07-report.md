# Report: ChatTimelineAdapter + messaging feature UI

**Stream:** 7 · **Branch:** `feat/iw9-chat-timeline` · **Status:** done

## What shipped

| Path | Role |
|---|---|
| `client/web/src/features/messaging/adapter.ts` | `ChatTimelineAdapter` — sole records/realtime bridge; T4 hint→refetch; `live`/`reconnecting`/`reconciling` |
| `client/web/src/features/messaging/schema.ts` | Channel / Message / `ChatRealtimeEvent` / presence shapes (TS parsers; no zod dep in patchwork-web) |
| `client/web/src/features/messaging/errors.ts` | `StorageCapError` (`code: "storage_cap"`) — distinguishable over-cap |
| `client/web/src/features/messaging/platform.ts` | Default keyvalue(+`instance`) + gateway realtime wiring |
| `client/web/src/features/messaging/{ChannelRail,TimelinePane,ThreadPane,Composer,PresenceTyping,InstanceView,messageRow}.tsx` | Instance view UI per ux.md |
| `client/web/src/lib/__tests__/chat-timeline-adapter.test.ts` | Task 7.6 coverage |
| `client/web/src/features/messaging/__tests__/smoke.test.ts` | Keeps brief Verify path green |

### Adapter contract (for streams 8 / 10 / 12)

```ts
import {
  createChatTimelineAdapter,
  createKeyvalueRecordsClient,
  createGatewayRealtimeClient,
  InstanceView,
  StorageCapError,
} from "@/features/messaging";

const adapter = createChatTimelineAdapter({
  installId,
  instanceId,
  records: createKeyvalueRecordsClient(instanceId),
  realtime: createGatewayRealtimeClient(),
});
adapter.start();
// <InstanceView adapter={adapter} role="host" hostingLabel="…" />
```

- Topic: `app:<installId>` (`appTopic(installId)`).
- Message events are hints only — adapter re-fetches via `records.list`/`get` on `msg#…` keys.
- Typing: `signalTyping` is sync fire-and-forget (never awaits / never throws to composer).
- Over-cap: catch `StorageCapError` / `isStorageCapError(err)`.

## Verify

```bash
pnpm --filter @aprovan/patchwork-web exec vitest run src/features/messaging src/lib/__tests__/chat-timeline-adapter.test.ts
# ✓ 7 passed

pnpm --filter @aprovan/patchwork-web typecheck
# exit 0
```

## Tasks

| Task | Status |
|---|---|
| 7.1 adapter interface | done |
| 7.2 T4 reconcile + connectionState | done |
| 7.3 rail / timeline / thread / composer | done |
| 7.4 presence / typing UI | done |
| 7.5 instance view states | done |
| 7.6 adapter tests | done |

## Deviations

1. **D4 (CF-1 boot registration)** — still not in `socket.ts` (outside Touches). Live subscribe needs `broker.registerNamespace(createAppTopicsHandler(broker))`. Unit tests inject a fake realtime client; no production socket edit in this stream.
2. **No zod in patchwork-web** — Touches forbid `package.json`. `schema.ts` uses TS types + light parsers mirroring server zod shapes.
3. **Shared-partition keyvalue** — production `createKeyvalueRecordsClient` passes F2's future `{ instance }` arg. Until F2 stream 3 lands, inject a records client (tests do) or tolerate empty lists.
4. **`send` default path** — publishes `{action:"message"}` then polls canonical records for the new row (RealtimeClient has no error-frame callback). Tests inject `sendMessage` to throw `StorageCapError`.

## Unblocks

- **Stream 8** (guest / admin UI) — mounts under `features/messaging/guest|admin`; consume adapter only.
- **Stream 10 / 12** (E2E) — `InstanceView` + adapter are the client surface; remember D4 boot registration before live WS E2E.

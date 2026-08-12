# Deviations — iw9-chat-flagship

## Stream 1 (chat data model)

### D1 — `resolveRecordScope` not exported on main

**Task:** 1.2 says CRUD goes through `resolveRecordScope(ctx, { instance })`
(iw9-f2 frozen seam).

**Reality:** Only F2 stream 1 (`apps/instances.ts`) is on `origin/main`.
F2 streams 2–3 (`partitionAccess` + `resolveRecordScope` in `services.ts`)
are still unchecked in `iw9-f2-shared-partition/tasks.md`. Grep finds no
`resolveRecordScope` symbol.

**Adaptation (inside Touches):** `apps/chat/service.ts` defines a local
`resolveSharedRecordScope` that calls the frozen primitives that *do*
exist — `assertInstanceAccess` then `sharedRecordScope(installId,
instanceId)` — and writes via `getRecordStore()`. When F2 stream 3 lands,
swap the local helper for the exported `resolveRecordScope` without
changing Chat's public CRUD signatures.

### D2 — `canReadChannel` scope bag

**Task / delivery filter:** `canReadChannel(principal, installId, channelId)`.

**Reality:** F2 ACL and shared-partition keys also need `workspaceId` and
`instanceId`. Topic `app:<installId>` alone does not locate the instance
row.

**Adaptation:** export

```ts
canReadChannel(principal, installId, channelId, {
  workspaceId: string;
  instanceId: string;
}): Promise<boolean>
```

Stream 2's sync `authorize` should close over / cache those coordinates
from subscribe state and call this same function (or a membership snapshot
derived from it). Do not fork a second predicate.

## Stream 2 (CF-1 app-topics)

### D3 — Sync authorize cache vs async `NamespaceStore`

**Task:** 2.2 says cache channel membership in the handler's `NamespaceStore`
for sync `authorize?(conn, topic)`.

**Reality:** F5's `NamespaceStore` API is async-only (`get`/`set` return
Promises). Broker `authorize` must return `boolean` synchronously and is
not passed the event body — only `(conn, topic)`.

**Adaptation:** keep a sync `authByConn` Map (channel-id set + instance
coords) populated/refreshed by calling stream 1's `canReadChannel` on
subscribe and on `{action:"channel-membership"}`. Mirror the same snapshot
into `broker.storeFor(workspaceId, "app")` under `auth:<connId>`. Fan-out
sets a short-lived `pending.channelId` around `publishToTopic` so authorize
can filter by channel without changing the frozen F5 hook signature.

### D4 — Boot registration outside Touches

**Task:** 2.1 "registered at boot".

**Reality:** Touches allow only `realtime/app-topics.ts` + its test.
Production registration lives in `realtime/socket.ts` (where presence is
registered today).

**Adaptation:** export `createAppTopicsHandler` / `appTopic`; tests register
the handler on a broker. Follow-up one-liner for streams 7/12 / boot:

```ts
broker.registerNamespace(createAppTopicsHandler(broker));
```

in `attachRealtime` next to the presence registration.

### D5 — Priority path not on main (F5 stream 3)

**Task:** 2.3/2.5 channel-membership on F5 D5 priority/control path under
saturation.

**Reality:** `OutboundChannel` / bounded event queue is not on `origin/main`
(`iw9-f5` stream 3 still open). All `event` frames share `Conn.send` today.

**Adaptation:** handler publishes `{kind:"channel-membership"}` like other
events; the unit test uses a Conn that treats that kind as undroppable while
saturating a drop-oldest event queue — standing in for the future socket
priority classifier.

### D6 — Instance id from install-scoped topic

**Task / topic grammar:** `app:<installId>` only.

**Reality:** `canReadChannel` / `assertInstanceAccess` need `instanceId`
(stream 1 D2).

**Adaptation:** on subscribe, `listInstances` + newest-first accessible
instance via `assertInstanceAccess`; cache `instanceId` in auth state and
return it on the subscribe body for clients/streams 7/12.


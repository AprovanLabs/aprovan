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

## Stream 3 (CF-2 guest invites)

### D7 — Touches listed `identity/store.ts`; persistence is sql/dynamo

**Task Touches:** `invites.ts`, `identity/types.ts`, `identity/store.ts`,
`routes/invites.ts`, `tests/invites-app-instance-target.test.ts`.

**Reality:** `store.ts` is only the backend factory + principal-cache wrap.
Invite rows are written in `identity/sql.ts` (and `identity/dynamo.ts` for
`IIdentityStore` parity). Persisting optional `target` required a JSON
`target` column (DDL + additive ALTER) and the matching dsql-schema line.

**Adaptation:** edited sql/dynamo/dsql-schema; left `store.ts` untouched.

### D8 — F2 participant shape vs tech-plan `{ sub, role, channelIds? }`

**Task / tech-plan:** consume mints `{ sub, role: "guest", channelIds? }`.

**Reality:** F2 `AppInstanceRecord.participants` is `string[]`;
`addParticipant(workspaceId, instanceId, sub, actor)` has no role or
channel grant args (frozen).

**Adaptation:** call `addParticipant` with `target.installId` as the
instance id; keep `role: "guest"` and optional `channelIds` on the
`InviteRecord` / accept response for Chat (stream 1 channel members /
stream 8 UX). No fork of invite machinery; no change to `instances.ts`.

### D9 — `tests/invites.test.ts` was missing

**Verify / task 3.4:** run `tests/invites.test.ts` as the absent-target
regression gate.

**Reality:** file did not exist on `origin/main` (non-targeted coverage
lived only inside `identity-relational.test.ts`).

**Adaptation:** added a minimal `tests/invites.test.ts` that asserts
create/get/list/consume/revoke with **no** `target` field.

## Stream 7 (ChatTimelineAdapter + messaging UI)

### D10 — CF-1 boot registration still absent (carry-forward D4)

**Task / live subscribe:** adapter subscribes to `app:<installId>`.

**Reality:** `createAppTopicsHandler` is not registered in `socket.ts`
(stream 2 D4; outside stream 7 Touches).

**Adaptation:** unit tests inject a fake realtime client. Production live
subscribe remains blocked until the one-liner follow-up:
`broker.registerNamespace(createAppTopicsHandler(broker));`

### D11 — No zod in patchwork-web

**Tech-plan:** record shapes as zod in `features/messaging/schema.ts`.

**Reality:** Touches forbid `package.json`; patchwork-web has no zod dep.

**Adaptation:** TypeScript types + light parsers mirroring server zod
schemas in `apps/chat/schema.ts`.

### D12 — Shared-partition keyvalue `instance` arg not on main

**Tech-plan:** adapter talks to `records.*` on the F2 shared partition.

**Reality:** F2 stream 3 (`resolveRecordScope` + keyvalue `instance`) is
not on main; keyvalue still scopes to `ws` / per-user app partitions.

**Adaptation:** `createKeyvalueRecordsClient` passes `{ instance }` for
forward-compat; tests inject an in-memory records client.

## Stream 8 (guest UX + host admin)

### D13 — F2 `apps.instanceUsage` / `instanceCap` / `instanceDelete` not on main

**Task 8.4:** Manage panel reads/writes metering only through frozen
`apps.instance*` procedures.

**Reality:** iw9-f2 stream 5 (`apps/service.ts` host procedures) is still
unchecked on `origin/main`; only `apps/instances.ts` module APIs exist.
Grep finds no `instanceUsage` / `instanceCap` / `instanceDelete` handlers.

**Adaptation:** `createInstanceHostClient` calls
`invokeAppsTool("instanceUsage"|"instanceCap"|"instanceDelete", …)` — the
frozen names — and is injectable for tests. Runtime success needs F2
stream 5; Chat UI/contract is ready.

### D14 — No frozen `apps.*` for `removeParticipant`

**Task 8.3:** wire host remove-guest / guest leave to the platform call.

**Reality:** F2 exposes `removeParticipant` as a module function in
`apps/instances.ts`, not as an `apps.instance*` procedure in the frozen
service table (Usage / Cap / Delete only).

**Adaptation:** default host client calls
`invokeAppsTool("instanceRemoveParticipant", { instanceId, sub })` as the
intended host-gated seam when F2 exposes it; UI accepts an injectable
`InstanceHostClient` so stream 12 E2E can mock today.

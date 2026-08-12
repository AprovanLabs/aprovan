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

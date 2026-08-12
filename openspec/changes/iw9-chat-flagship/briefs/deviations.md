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

## Stream 3 (CF-2 guest invites)

### D3 — Touches listed `identity/store.ts`; persistence is sql/dynamo

**Task Touches:** `invites.ts`, `identity/types.ts`, `identity/store.ts`,
`routes/invites.ts`, `tests/invites-app-instance-target.test.ts`.

**Reality:** `store.ts` is only the backend factory + principal-cache wrap.
Invite rows are written in `identity/sql.ts` (and `identity/dynamo.ts` for
`IIdentityStore` parity). Persisting optional `target` required a JSON
`target` column (DDL + additive ALTER) and the matching dsql-schema line.

**Adaptation:** edited sql/dynamo/dsql-schema; left `store.ts` untouched.

### D4 — F2 participant shape vs tech-plan `{ sub, role, channelIds? }`

**Task / tech-plan:** consume mints `{ sub, role: "guest", channelIds? }`.

**Reality:** F2 `AppInstanceRecord.participants` is `string[]`;
`addParticipant(workspaceId, instanceId, sub, actor)` has no role or
channel grant args (frozen).

**Adaptation:** call `addParticipant` with `target.installId` as the
instance id; keep `role: "guest"` and optional `channelIds` on the
`InviteRecord` / accept response for Chat (stream 1 channel members /
stream 8 UX). No fork of invite machinery; no change to `instances.ts`.

### D5 — `tests/invites.test.ts` was missing

**Verify / task 3.4:** run `tests/invites.test.ts` as the absent-target
regression gate.

**Reality:** file did not exist on `origin/main` (non-targeted coverage
lived only inside `identity-relational.test.ts`).

**Adaptation:** added a minimal `tests/invites.test.ts` that asserts
create/get/list/consume/revoke with **no** `target` field.

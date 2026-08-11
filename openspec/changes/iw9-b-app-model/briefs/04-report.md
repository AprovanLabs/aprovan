# Report: Server — Artifact sharing (person/link) + anonymous read route

## What was built

- **`vfs/shares.ts`**: Share records under `svc#vfs#shares/<shareId>` with
  D6 shape. `createPersonShare`, `createLinkShare` (256-bit key once;
  stores `HMAC-SHA256(VFS_SHARE_SECRET, key)` only), `resolveLinkShare`
  (recompute + `timingSafeEqual`, expiry/revocation → undefined),
  `revokeShare`, `listSharesCreatedBy`, `listSharesReceivedBy`,
  `personShareAllowsRead`. Link lookup uses a `_system` HMAC index so
  `GET /share/:key` needs no workspace in the URL.
- **`apps/store.ts`**: `assertPartitionAccess` checks person-shares at the
  same choke point as foreign-partition denial (lazy import of
  `vfs/shares` — no root-binding / path-authz changes).
- **`routes/share.ts`**: Anonymous `GET /share/:key` and
  `GET /share/:key/*subpath` — only imports `vfs/shares` + `fs-store`.
  Non-GET → 404. No sibling/parent listing.
- **`app.ts`**: Mounts `shareRouter` ahead of `requireAuth` (necessary for
  the route to be reachable; outside the tasks Touches list).
- **`tests/vfs-shares.test.ts`**: Seven cases covering the brief's
  scenarios + static import check.

## How verified

```bash
pnpm --filter @aprovan/workspace test -- vfs-shares.test.ts
# ✓ 7 tests passed

pnpm --filter @aprovan/workspace typecheck
# ✓ exit 0
```

## Deviations

1. **`app.ts` mount** — tasks Touches omitted the mount site; added a
   two-line mount so `GET /share/:key` is reachable on the gateway.
2. **`_system` HMAC index** (`svc#vfs#share-keys`) — D6's
   `resolveLinkShare(key)` has no workspaceId; index maps `keyHmac` →
   `{workspaceId, shareId}` (same pattern as the cron workspace index).
3. **`VFS_SHARE_SECRET`** (fallback `WORKSPACE_SHARE_SECRET`, then a local
   default) — tech-plan names `serverSecret` without an env binding.
4. **Person-share choke point** lifts foreign-partition denial only
   (`.users/<sub>/…`, `.apps/<id>/data/<sub>/…`). Open workspace paths
   remain readable to members without a share; "Shared with me" is
   `listSharesReceivedBy`.
5. **Static import check** asserts `routes/share.ts` direct imports only
   (`fs-store`, `vfs/shares`) and forbids `records` / `apps/service` /
   `workflows/*` in that file. `vfs/shares` itself uses `svc-records` for
   persistence (expected).

## Notes for streams 6 / 10

- **Stream 6**: Register `vfs.share` / `vfs.shares.list` / `vfs.shares.revoke`
  procedures delegating to this module. Do not re-implement HMAC or the
  anonymous route. `foreignPartitionResponse` in `routes/fs.ts` still
  bypasses `assertPartitionAccess` — if HTTP `/fs` should honor
  person-shares, wire the same `personShareAllowsRead` check there (or
  call `assertPartitionAccess`).
- **Stream 10**: UI can call the procedures once registered; share URLs
  are `/share/<key>` (and `/share/<key>/<subpath>` for directory shares).
  Never display or persist the plaintext key after the create response.

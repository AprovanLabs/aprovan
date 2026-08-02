# Shape audit — @utdk/keyvalue

Paper audit (documentation-level) of the contract surface against real vendor
APIs, per Decision 8. Freeze criterion for the 0.2.0 bump.

## Vendors

1. **Valkey/Redis** (GET/SET/DEL/SCAN + EXPIRE)
2. **Cloudflare Workers KV** (REST API: read/write/delete key-value pairs, list keys)
3. **Amazon DynamoDB** (GetItem/PutItem/DeleteItem/Query with a single-table KV pattern)

## Per-operation mapping

| Contract op | Valkey/Redis | Cloudflare KV | DynamoDB |
| --- | --- | --- | --- |
| `get` (found flag, no 404) | `GET` → nil = found:false | read pair → 404 mapped to found:false | `GetItem` → empty Item = found:false |
| `set` (JSON value, size cap) | `SET key json` | write pair (25 MiB cap ≥ ours) | `PutItem` (400 KB cap ≥ our 256 KiB) |
| `set` ttl_seconds | `SET ... EX seconds` (native) | `expiration_ttl` (native, min 60s) | per-item TTL attribute (native, minute-lazy) |
| `delete` (idempotent) | `DEL` → 0/1 maps to deleted | delete (404 → deleted:false) | `DeleteItem` + ReturnValues → deleted flag |
| `list` (prefix, cursor, keys-only) | `SCAN MATCH prefix* COUNT n` (cursor native) | list keys (`prefix`, `cursor`, `limit` native) | `Query`/`Scan` with `begins_with` + `ExclusiveStartKey` |
| lexicographic key order | NOT guaranteed by SCAN | guaranteed (keys returned in order) | guaranteed within a partition (sort key) |
| `updatedAt`/`expiresAt` metadata | via `TTL` (expiry only) | metadata + expiration | attributes on the item |
| error → `KeyValueError(status)` | protocol errors → 500-ish | HTTP status | HTTP status / SDK error |

Findings:

- All four operations land on native vendor primitives; the found-flag `get`
  (missing key is not an error) matches every backend's cheapest read.
- TTL is native on all three audited vendors, so the 501 escape hatch
  (`ttlUnsupported`) exists for backends like plain object stores, not for
  these three. Cloudflare's 60-second TTL floor is an adapter-documented
  constraint, not a shape problem.
- Lexicographic list order is free on Cloudflare KV and DynamoDB but NOT on
  Redis `SCAN`, whose cursor is unordered. A strict-order Redis adapter
  sorts within pages or maintains a key index (a documented adapter cost);
  the contract keeps the ordering guarantee because both other vendors and
  the native records-backed implementation give it for free and consumers
  (pagination UIs) depend on stable order. The optional metadata fields
  (`updatedAt?`) are already optional because Redis cannot supply them.
- The opaque cursor accommodates all three vendors' tokens (SCAN cursor,
  KV cursor, ExclusiveStartKey serialized).

## Changes

No change to operations or shapes. The audit confirmed `updatedAt`/`expiresAt`
must stay optional (Redis) and TTL must stay a first-class arg with a 501
path (already designed).

## Verdict

**Frozen at 0.2.0.** All operations implementable against all three audited
vendors; the one caveat (Redis SCAN ordering) is an adapter implementation
cost, not a surface change.

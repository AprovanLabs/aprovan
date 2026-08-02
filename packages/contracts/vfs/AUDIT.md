# Shape audit — @utdk/vfs

Paper audit (documentation-level) of the contract surface against real vendor
APIs, per Decision 8. Freeze criterion for the 0.2.0 bump.

## Vendors

1. **S3-compatible object stores** (AWS S3 / R2 / MinIO: GetObject, PutObject,
   DeleteObject, ListObjectsV2, HeadObject)
2. **Local filesystem driver** (node:fs)
3. **WebDAV** (GET, PUT, DELETE, PROPFIND)

## Per-operation mapping

| Contract op | S3-compatible | Local FS | WebDAV |
| --- | --- | --- | --- |
| `read` (utf8/base64, etag) | `GetObject` (+ ETag header) | `readFile` (+ hash-derived etag) | `GET` (+ ETag header) |
| `write` upsert, implicit parents | `PutObject` (no directories at all) | `mkdir -p` + `writeFile` | `PUT` (adapter issues `MKCOL` for parents) |
| `write` ifMatch etag / `"*"` | `If-Match` / `If-Match: *` headers (native, 412 → 409) | compare-and-swap on hash (adapter) | `If-Match` / `If-Match: *` (native, 412 → 409) |
| `delete` idempotent, files only | `DeleteObject` (always succeeds → adapter stats first for `deleted`) | `unlink` (ENOENT → deleted:false) | `DELETE` (404 → deleted:false) |
| `list` prefix + delimiter | `ListObjectsV2` `prefix` + `delimiter=/` → CommonPrefixes = kind "directory" (exact model match) | `readdir` recursive/limited | `PROPFIND` Depth:1 / Depth:infinity |
| `list` cursor | `ContinuationToken` (native) | offset token (adapter) | adapter-paged |
| `stat` 404 on absent | `HeadObject` | `stat` (ENOENT → 404) | `PROPFIND` Depth:0 |
| kind "directory" | CommonPrefixes only (no real dirs) | real directories | collections |
| `modifiedAt` | `LastModified` | `mtime` | `getlastmodified` |

Findings:

- The delimiter-listing model (non-recursive = immediate children, subtrees
  collapsed to `kind: "directory"`) is exactly S3's `delimiter=/` +
  CommonPrefixes model, trivially satisfied by real directories on FS and
  collections on WebDAV — the D6 design choice survives contact with all
  three backends.
- Conditional writes (`ifMatch`) are native HTTP `If-Match` on S3 (S3 added
  conditional writes; R2/MinIO support them) and WebDAV; a local-FS driver
  implements compare-and-swap against a content-hash etag. No audited
  backend needs the 501 escape; it remains for stores without version
  tokens.
- S3 `DeleteObject` returns success for absent keys, so an S3 adapter that
  wants a truthful `deleted` flag pays a HeadObject first — adapter cost,
  and the flag is worth it (idempotency stays observable).
- Implicit parent creation matches S3 (no directories exist), is `mkdir -p`
  on FS, and needs `MKCOL` calls in a WebDAV adapter (documented mapping).

## Changes

No change. Read/write/delete/list/stat with etag conditional writes mapped
onto all three backends; the surface contains no session/overlay/mount
concept (asserted by the package's own tests).

## Verdict

**Frozen at 0.2.0.** All operations implementable against all three audited
backends; `ifMatch` proved implementable everywhere (the D6 revisit trigger
did not fire).

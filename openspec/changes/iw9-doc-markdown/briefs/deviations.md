# Stream 9 deviations — Document app manifest

## Allowed touch outside Touches list (9.4)

- **Path:** `server/workspace/tests/vfs-shares.test.ts`
- **Why:** Brief 9.4 requires a Document-scoped case on iw9-b's existing
  share suite rather than a new Document share stack. Asserts link-share
  (`GET /share/<key>`) + person-share record + revoke for
  `Apps/document/notes.md`.

## Verify command

- Brief uses `vitest … --grep document`. This vitest version rejects
  `--grep` (`Unknown option`). Used `-t document` / `-t "Document app root"`
  instead.
- `tests/app-directory.test.ts -t document` matches **no** tests (file is
  the deployment directory index, unrelated to Document). Manifest/reconcile
  verified via `loadAppYaml` + `reconcileApp` against `Apps/document/app.yaml`;
  share coverage is the vfs-shares case above. Patchwork typecheck passed.

---

# Stream 4 deviations — join auth + quiesce

## Allowed touch outside Touches list (4.3)

- **Path:** `server/workspace/src/doc/registry.ts`
- **Why:** Brief explicitly allows a minimal edit so `releaseDoc` calls
  `materializeAndFlush` before dropping the live replica (task 4.3 /
  tech-plan `releaseDoc`).

- **Path:** `server/workspace/tests/doc-registry.test.ts`
- **Why:** Stream 2's "reload after release" case assumed memory-only
  teardown (edits discarded). With materialize-on-release the edit survives;
  assertion updated to expect preserved content so the suite stays green.

## Durable flush on materialize (D6 tension)

- Every `materializeAndFlush` appends a full-state update and force-compacts
  (`DOC_COMPACT.SIZE_BYTES = 0` temporarily) so snapshot `fileHash` matches
  the post-write FS hash (stream 2 note). D6 preferred not to compact on
  every quiesce; without a persistence helper to touch `fileHash` alone,
  force-compact is the allowlisted fix.

## Report / tasks checkoff

- `briefs/04-report.md` + `tasks.md` 4.x checkboxes (required by Report back).

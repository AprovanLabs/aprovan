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

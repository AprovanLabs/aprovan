# Brief: Client — Mounts management UI

## Mission

Mounts table + add form backed by `vcs.mounts.*`, read-only badges on mounted
subtrees in the file tree, distinct inline errors for overlap (409) vs
backend-unreachable (400), list/tree updates without reload.

## Read first

1. `openspec/changes/iw9-b-app-model/ux.md` (Mounts panel)
2. `openspec/changes/iw9-b-app-model/specs/vfs-mounts/spec.md`
3. Stream 6 `vcs.mounts.*` contracts
4. File-tree components under `client/web`

## Tasks

> Depends-on: 6 | Repo: aprovan | Touches: aprovan/client/web/src/components/mounts/** | Verify: pnpm --filter @aprovan/patchwork-web typecheck

- [x] 11.1 Build the mounts table (prefix, type, backend, pinned ref/version,
      creator, remove action) and the add-mount form (git repo + ref +
      optional subpath, or s3 bucket/prefix), backed by stream 6's
      `vcs.mounts.*` procedures.
- [x] 11.2 Mark mounted subtrees in the file tree with a read-only badge
      (`vfs-mounts` — "Mounted subtree is marked"); overlap (409) and
      backend-unreachable (400) errors render as visually distinct inline
      messages per ux.md's Mounts panel states.
- [x] 11.3 Confirm add/remove reflect in the list and tree without a reload
      (`vfs-mounts` — "Add via UI").

## Verify

```bash
pnpm --filter @aprovan/patchwork-web typecheck
```

## Constraints

- Touch ONLY `client/web/src/components/mounts/**` (and minimal file-tree badge
  wiring if required — prefer keeping badge in mounts package re-exported to
  tree; if you must touch the tree file, report the path as a deviation).
- Do not modify `vcs/mounts.ts` engine.

## Report back

PR or `briefs/11-report.md`.

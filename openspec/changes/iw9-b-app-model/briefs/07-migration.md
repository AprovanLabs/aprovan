# Brief: Server — Migration (paths[] → mounts; installs → copy)

## Mission

One-shot migration scripts: `migrate-app-roots.ts` (paths[0]→root, extras→mounts,
reconcile app.yaml) and `migrate-installs-to-copy.ts` (materialize copy, pin from
resolvedRelease, hosting managed, drop editing/prefix). Idempotent with
pre-migration snapshot. Grep-gate clears old binding fields.

## Read first

1. `openspec/changes/iw9-b-app-model/tasks.md` stream 7
2. Stream 1/3/5 landed helpers (`assertRootAvailable`, install materialize helper,
   mounts-procedures)
3. Existing migration script patterns under `server/workspace/scripts/`

## Tasks

Copy 7.1–7.4 from `tasks.md` verbatim.

## Verify

```bash
pnpm --filter @aprovan/workspace test -- migrate-app-model.test.ts
# Grep gates from task 7.4 (both repos)
```

## Constraints

- Touch ONLY migration scripts + migrate-app-model.test.ts.
- Idempotent; snapshot before mutate.
- Dead-origin installs → flagged broken, not dropped.

## Report back

PR or `briefs/07-report.md`.

# Brief: Server — Procedure/tool wiring

## Mission

Register the domain procedures from streams 2–5 onto the existing service /
tools / native-dispatch surfaces: `apps.promote`, `apps.install` /
`updateCheck` / `applyUpdate`, `vfs.share` / `shares.list` / `shares.revoke`,
and `vcs.mounts.list/add/remove`. Additive only — do not edit iw9-a's VCS
scope-arg schema blocks.

## Read first

1. `openspec/changes/iw9-b-app-model/tasks.md` stream 6
2. Landed modules from streams 2–5 (`personal.ts`, `install.ts`, `vfs/shares.ts`,
   `vcs/mounts-procedures.ts`)
3. `server/workspace/src/apps/service.ts`
4. `server/workspace/src/routes/tools.ts` (`nativeVcsDiscoveryEntries` ~272)
5. `server/workspace/src/native-dispatch.ts`

## Tasks

Copy 6.1–6.5 from `tasks.md` verbatim.

> Depends-on: 2, 3, 4, 5 | Touches: service.ts, routes/tools.ts, native-dispatch.ts

## Verify

```bash
pnpm --filter @aprovan/workspace typecheck
pnpm --filter @aprovan/workspace test -- apps-roots apps-personal apps-install-copy vfs-shares vcs-mounts-procedures
```

## Constraints

- Additive registration only; do not rewrite iw9-a VCS schema blocks.
- Touch ONLY Touches paths (+ tasks.md / report).
- Never touch releases.ts / versions.tsx.

## Report back

PR or `briefs/06-report.md`.

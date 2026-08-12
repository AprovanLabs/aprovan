# Brief: Server — vcs.* tool schemas + wire surface

## Mission

Expose `scope` on all six `vcs.*` discovery schemas and thread it through
`packages/native` client dispatch. Lands before iw9-c touches `routes/tools.ts`.

## Read first

1. `openspec/changes/iw9-a-vcs-consolidation/tasks.md` stream 2
2. `openspec/changes/iw9-a-vcs-consolidation/tech-plan.md`
3. Stream 1 on main (#205): `native-dispatch` already maps `scope` if present
4. `server/workspace/src/routes/tools.ts` (`nativeVcsDiscoveryEntries`)
5. `packages/native/src/dispatch.ts`

## Tasks

Copy 2.1–2.3 from `tasks.md` verbatim.

## Verify

```bash
cd server/workspace && pnpm typecheck && pnpm vitest run tests/tools-discovery.test.ts
cd ../../packages/native && pnpm typecheck
```

## Constraints

- Touches ONLY: `routes/tools.ts`, `platform-output-schemas.ts`, `packages/native/src/dispatch.ts` (+ tasks/report)
- Additive schema only — do not rewrite unrelated tool blocks
- Open PR; `briefs/02-report.md`; check off 2.1–2.3

## Report back

PR URL, verify, notes for A5 and iw9-c.

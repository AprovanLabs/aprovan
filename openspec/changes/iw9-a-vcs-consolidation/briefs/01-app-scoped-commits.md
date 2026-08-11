# Brief: Server — app-scoped commits, tags, two-parent merges

## Mission

When you are done, VCS commits can be scoped to an app (`prefix` = app root,
`ref` = `app/<appId>`), mount lineage is filtered to that prefix on scoped
commits, tag/channel refs exist (`tag/app/...`, `channel/app/...`), session
close emits two-parent merges, and auto sessions answer "what changed" via
`diff(base, main)`. This is the server foundation for release-as-tag (stream 3)
and the client history/merge surfaces.

## Read first

1. `openspec/changes/IW-9-APP-FIRST.md`
2. `openspec/changes/iw9-a-vcs-consolidation/prd.md`
3. `openspec/changes/iw9-a-vcs-consolidation/tech-plan.md` (D1–D4, Interfaces)
4. Specs under `openspec/changes/iw9-a-vcs-consolidation/specs/` (app-scoped-commits, etc.)
5. F1 already on main: `commitTree` `prefix?`/`ref?`, `listRefs`, hash-bearing diffs
6. `server/workspace/src/vcs/store.ts`, `chat-sessions.ts`, `native-dispatch.ts`

## Tasks

Copy tasks 1.1–1.6 verbatim from `openspec/changes/iw9-a-vcs-consolidation/tasks.md`.

> Depends-on: - | Touches: `server/workspace/src/vcs/**`, `native-dispatch.ts`, `tests/vcs*.test.ts`, `tests/chat-sessions.test.ts`

## Verify

```bash
cd server/workspace && pnpm typecheck && pnpm vitest run tests/vcs.test.ts tests/vcs-interface.test.ts tests/vcs-mount-lineage.test.ts tests/chat-sessions.test.ts
```

(If some legacy suites still fail for reasons outside Touches, document deviations; do not expand Touches.)

## Constraints

- F1 contracts are frozen — consume, don't redesign.
- Never touch `apps/releases.ts` (stream 3 deletes it).
- Never touch `routes/tools.ts` (stream 2).
- Surgical changes; match existing style.

## Report back

PR + `briefs/01-report.md`; check off 1.1–1.6; note anything streams 2/3/6 need.

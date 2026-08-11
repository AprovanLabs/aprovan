# Brief: Server — Mounts procedures (validation over the existing engine)

## Mission

Expose validated `vcs.mounts` procedures over the existing `readMounts`/
`addMount`/`removeMount` engine (unmodified). Procedure-side validation:
prefix shape, overlap vs app roots (reuse stream 1 `assertRootAvailable`) and
other mounts, reject `crdt` backend, reject app-root targets. App-scoped
mounts (prefix under an app root) read through ordinary path auth — no second
store.

## Read first

1. `openspec/changes/iw9-b-app-model/tech-plan.md` (D7)
2. `openspec/changes/iw9-b-app-model/specs/vfs-mounts/spec.md`
3. `server/workspace/src/vcs/mounts.ts` (engine — DO NOT modify)
4. Stream 1 `apps/roots.ts` (`assertRootAvailable`)
5. Stream 1 narrowed `appPathAllowed`

## Tasks

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/vcs/mounts-procedures.ts, aprovan/server/workspace/tests/vcs-mounts-procedures.test.ts | Verify: pnpm --filter @aprovan/workspace test -- vcs-mounts-procedures.test.ts

Copy tasks 5.1–5.3 verbatim from `tasks.md` stream 5.

## Acceptance criteria

Scenarios from `specs/vfs-mounts/spec.md` owned by this stream: add-then-read;
overlap 409; `crdt` rejected; app-root-as-target 400; app-scoped mount reads
via app path auth.

## Verify

```bash
pnpm --filter @aprovan/workspace test -- vcs-mounts-procedures.test.ts
pnpm --filter @aprovan/workspace typecheck
# Engine untouched:
git diff origin/main -- server/workspace/src/vcs/mounts.ts | wc -l   # expect 0
```

## Constraints

- Do NOT modify `vcs/mounts.ts`.
- Touch ONLY Touches paths.
- No tool schema registration (stream 6) or mounts UI (stream 11).
- Reuse `assertRootAvailable`; do not fork overlap logic.

## Report back

Check off tasks; PR or `briefs/05-report.md`.

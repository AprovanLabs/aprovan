# Brief: Server — Personal app + promote-out

## Mission

Personal becomes a real stored app row (slug `personal`, root `Apps/personal`)
created lazily via `ensurePersonalApp`, plus first-class `promoteApp` that
copy-then-delete-last materializes a new app under `Apps/<slug>` via F4's
`reconcileApp`. No `isPersonalApp` / `PERSONAL_*` / `.personal` special-casing
returns. Depends on stream 1's `assertRootAvailable`.

## Read first

1. `openspec/changes/iw9-b-app-model/tech-plan.md` (D3)
2. `openspec/changes/iw9-b-app-model/specs/personal-app/spec.md`
3. `openspec/changes/iw9-b-app-model/briefs/01-app-roots.md` (landed contract)
4. `server/workspace/src/apps/roots.ts` (assertRootAvailable)
5. F4 `reconcileApp` first-sight mint path
6. Existing VFS copy/delete primitives used elsewhere in workspace server

## Tasks

> Depends-on: 1 | Repo: aprovan | Touches: aprovan/server/workspace/src/apps/personal.ts, aprovan/server/workspace/tests/apps-personal.test.ts | Verify: pnpm --filter @aprovan/workspace test -- apps-personal.test.ts

- [ ] 2.1 Create `apps/personal.ts` exporting
      `ensurePersonalApp(workspaceId, actor): Promise<AppRecord>` — lazy
      create only (slug `personal`, root `Apps/personal`), no special flag on
      the manifest, recognized by slug at this one creation site only
      (tech-plan D3).
- [ ] 2.2 Export `promoteApp({workspaceId, source, slug, actor})` — (1)
      `assertRootAvailable` (from stream 1), (2) copy the VFS subtree to
      `Apps/<slug>`, (3) call F4's `reconcileApp` to mint the new appId
      (first-sight flow), (4) delete the source subtree last — copy-then-
      delete-last is the atomicity strategy (tech-plan D3; no VFS move
      primitive exists).
- [ ] 2.3 Grep-confirm no `isPersonalApp`/`PERSONAL_APP_NAME`/
      `PERSONAL_PREFIX`/`.personal` special-casing was reintroduced (baseline
      is already clean — keep it that way; do not add any).
- [ ] 2.4 Add `tests/apps-personal.test.ts`: lazy creation on first one-off
      (`personal-app` scenario 1); promote moves/mints/re-points (scenario);
      promote is atomic under a simulated failure before the delete step
      (source subtree intact, no orphan row); promoted app has no back-link
      to Personal and behaves like any independently-authored app.

## Acceptance criteria

Full scenarios from `specs/personal-app/spec.md`:
- Lazy creation on first one-off
- No synthesis, no special-casing (grep gate)
- Promote moves, mints, and re-points
- Promote is atomic under failure
- Promoted app is independent

## Verify

```bash
pnpm --filter @aprovan/workspace test -- apps-personal.test.ts
# Cross-repo special-casing gate:
! grep -rn 'isPersonalApp\|PERSONAL_APP_NAME\|PERSONAL_PREFIX\|\.personal' \
  /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace/src \
  /Users/jacob/Documents/Code/AprovanLabs/registry 2>/dev/null
```

## Constraints

- Touch ONLY the Touches paths.
- Do not register `apps.promote` procedure (stream 6) or build promote UI (stream 9).
- Never touch `apps/releases.ts` / entry-version helpers / `versions.tsx`.
- Use stream 1's `assertRootAvailable`; do not reimplement overlap checks.

## Report back

Check off tasks in `tasks.md`; open a PR or write `briefs/02-report.md`.

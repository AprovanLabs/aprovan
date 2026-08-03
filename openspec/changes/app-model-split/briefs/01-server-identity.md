# Brief: App-model server identity + Personal deletion (app-model-split stream 1)

## Mission
Mint ULID app/install ids, re-key storage to ids, delete Personal/`dataScope`, and move
partition writers to `.apps/<id>/data/<sub>`. Nuke-and-reseed — no name-keyed migration.

## Read first
1. `openspec/changes/app-model-split/prd.md`
2. `openspec/changes/app-model-split/tech-plan.md` (D1–D3)
3. `openspec/changes/app-model-split/tasks.md` stream 1
4. Specs: `app-identity`, `per-user-space` (Personal deletion scenarios)
5. `server/workspace/src/apps/**` under aprovan

## Tasks
Stream 1 (1.1–1.8) verbatim.

## Verify
```
pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace typecheck
pnpm --dir /Users/jacob/Documents/Code/AprovanLabs/aprovan/server/workspace test
! grep -rn "PERSONAL_APP_NAME\|isPersonalApp\|\.personal" server/workspace/src
```

## Git
Branch `iw1/app-identity` from aprovan origin/main. Worktree `/tmp/iw1-app-identity`.
PR + merge when green.

## Constraints
Touches only stream 1 globs. Owner: delete `dataScope` entirely. Do not start stream 3
profile-binding until this + IW-0 npm packages are confirmed (already are).
Do not edit client packages (stream 4) or presence/editor files.

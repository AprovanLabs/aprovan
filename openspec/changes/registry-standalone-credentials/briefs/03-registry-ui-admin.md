# Brief: registry-ui admin capabilities (standalone-creds stream 3)

## Mission
Add `capabilities?` to `AdminPanelProps` (default members/groups/permissions) and build
standalone sections: ApiKeys, Profiles, Audit. Hosted default set must not regress.

## Read first
1. `openspec/changes/registry-standalone-credentials/ux.md` (Admin page)
2. `tech-plan.md` D5 + Interfaces
3. `tasks.md` stream 3
4. Specs: `catalog-account-surfaces` standalone admin scenarios
5. `packages/registry-ui/src/admin/**` in aprovan

## Tasks
3.1–3.5 verbatim.

## Verify
```
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/registry-ui typecheck && pnpm --filter @aprovan/registry-ui test
```

## Git
Worktree `/tmp/iw3-registry-ui-admin` branch `iw3/registry-ui-admin` from aprovan
`origin/main`. PR + merge. Path note: do not edit credentials/** (native-panel owns later);
AdminPanel export path only as needed.

## Constraints
Touches `aprovan:packages/registry-ui/**` only. Surgical; karpathy-guidelines.
Owner: PKCE when advertised; paste-bearer fallback is session-layer (stream 5), not here.

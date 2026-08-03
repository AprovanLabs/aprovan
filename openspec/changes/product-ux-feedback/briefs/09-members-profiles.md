# Brief: Members identity + profiles availability

## Mission
Members table shows email/name, not only Cognito sub. Profiles must not permanently show “aren’t available in this deployment” on production Dynamo — implement or wire storage support.

## Read first
- aprovan `openspec/changes/product-ux-feedback/{prd,tech-plan,tasks}.md` (D7, D8)
- `packages/registry-ui/src/admin/AdminPanel.tsx` (`MembersSection`)
- `packages/registry-ui/src/admin/{api,types}.ts`
- Workspace members routes under `server/workspace/src/routes/**`
- `registry/packages/registry-server/src/storage/**` ProfileService / Dynamo
- `openspec/changes/native-panel-polish` profiles Unavailable copy (don’t fight it — fix root cause)

## Tasks
- [ ] 9.1 Extend members API/UI: email/name primary; userId secondary.
- [ ] 9.2 Unblock profiles on production storage (Dynamo implementation or correct backend selection).

## Acceptance criteria
#### Scenario: Email visible / Profiles not perpetual 501 — see specs

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/registry-ui test
pnpm --filter @aprovan/workspace test
# if registry-server changed:
cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-server test
```

## Constraints
- Prefer one branch per repo if both need edits: `pux/members-profiles` on each
- Touches stream 9 paths only
- Open PRs

## Report back
PR(s) + where email comes from + profiles unblock approach.

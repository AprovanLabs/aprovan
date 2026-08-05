# Brief: grant-enforcement §1 — Gate the zero-config fallback

## Mission
Close the hole where `resolveProfile` step 5 returns a credential without a grant check.
Step 5 runs only when `authMode === "none"`. Under `oidc` / `api-key`, missing `default`
is a 403 naming the namespace. This is the hard gate before `registry-server-extraction`
§9.4 — `permittedTools` visibility must snap once.

## Read first
1. `openspec/changes/grant-enforcement/{prd,tech-plan,tasks}.md` (aprovan)
2. Tech-plan D2–D3; Interfaces `ResolveDeps.authMode`
3. registry `packages/registry-server/src/profiles/resolve.ts`
4. registry `packages/registry-server/src/profiles/__tests__/resolve.test.ts`
5. How `permittedTools` calls `resolveProfile` (grep under `packages/registry-server/src/mcp`)

## Tasks
- [ ] 1.1 Enter step 5 only when `deps.authMode === "none"`. Under `oidc` / `api-key`, a
      missing `default` row is a 403 that names the namespace and says a workspace admin
      must grant a profile.
- [ ] 1.2 Leave steps 1–4 and 6 untouched. Step 6 (named miss → 404 listing what exists)
      is correct and must keep its message.
- [ ] 1.3 Update the module docstring: step 5 is no longer "the zero-config path", it is
      "the ungoverned-mode path".
- [ ] 1.4 Tests: governed tenant + connected credential + no row → 403, not a credential;
      `authMode: "none"` + same state → resolves as before; admin under governed mode
      still passes via the existing `ctx.role === "admin"` branch.
- [ ] 1.5 Test the MCP consequence directly: `permittedTools` now hides a namespace that
      has a credential but no granted profile. This is the visibility change section 9
      of `registry-server-extraction` must snapshot.

## Acceptance criteria
**Done when** no reachable path returns a credential without a grant check unless
`authMode` is `"none"`, proven by a test that enumerates every `return` in
`resolveProfile`.

Rejected: delete step 5 immediately; grant-check step 5 against a tenant-level default
grant; provision-only without gate.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- profiles
```
Paste full output. Grep `NOT grant-checked` / step-5 comments to confirm docstring update.

## Constraints
- Files only: registry `packages/registry-server/src/profiles/resolve.ts`,
  `packages/registry-server/src/profiles/__tests__/resolve.test.ts`
  (MCP test under `mcp/__tests__` allowed solely for 1.5 if needed).
- Do **not** touch credential provisioning (that is §3) or product-host MCP (§9).
- Branch from `origin/main`; PR to `AprovanLabs/registry`.
- Check off `tasks.md` §1; write `briefs/01-report.md` under this change in aprovan.

## Report back
PR URL, verify paste, exact 403 message text (downstream docs), visibility test details
for §9.6 snapshot authors.

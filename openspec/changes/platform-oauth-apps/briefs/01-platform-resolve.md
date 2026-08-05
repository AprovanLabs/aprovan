# Brief: platform-oauth-apps §1 — Platform app resolution

## Mission
Resolve OAuth client credentials: tenant override → platform app → actionable 400.
Return `origin: "tenant" | "platform"`. Never leak platform secrets on tenant reads.

## Read first
1. `openspec/changes/platform-oauth-apps/{prd,tech-plan,tasks}.md`
2. Tech-plan D1, D4; `OAuthClientResolution` interface
3. registry `packages/registry-server/src/credentials/{service,oauth}.ts`
4. **Rebase onto GE §3** — that stream may have changed `CreateCredentialResult` /
   transaction shape in `service.ts`. Read `grant-enforcement/briefs/03-report.md` first.

## Tasks
Copy §1 checkboxes from tasks.md verbatim.

## Acceptance criteria
**Done when** a tenant can connect a platform-app provider with no client secret, and can
override with their own at any point without a different code path.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- credentials
```

## Constraints
- Depends-on: GE §3 merged (credentials/service.ts serialize)
- May stub platform secret lookup if §2 not merged yet — document the seam
- Touches: credentials/service.ts, oauth.ts, credentials/__tests__/**
- Branch `iw8/platform-oauth-01-resolve`; report `briefs/01-report.md`

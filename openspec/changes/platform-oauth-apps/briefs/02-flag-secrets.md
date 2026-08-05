# Brief: platform-oauth-apps §2 — Registry flag and secret plumbing

## Mission
Public `platformApp: boolean` on provider entries; hosted secrets from
`PLATFORM_OAUTH_<PROVIDER>_CLIENT_{ID,SECRET}` (KMS). Self-host with flag but no secret
boots clean and falls back to BYO with one startup log.

## Read first
1. `openspec/changes/platform-oauth-apps/{prd,tech-plan,tasks}.md`
2. Tech-plan D2, D4
3. registry `data/registry.json`, `packages/bundler/src/provider.ts`,
   `packages/registry-server/src/config/env.ts`

## Tasks
Copy §2 checkboxes from tasks.md verbatim.

## Acceptance criteria
**Done when** the public repo states which providers have platform apps and contains no
secret, and a self-host boot is clean.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/utdk-bundler test && pnpm --filter @aprovan/registry-server test -- config
```

## Constraints
- `data/registry.json`: additive field commits only; rebase, do not merge-commit fights
  with GQL §5 / POA §5
- Do not flip real providers to `platformApp: true` yet (§5 onboarding)
- Branch `iw8/platform-oauth-02-flag`; report `briefs/02-report.md`

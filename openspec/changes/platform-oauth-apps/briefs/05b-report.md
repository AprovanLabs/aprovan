# Report: platform-oauth-apps §5.1 — GitHub proving run

PR: https://github.com/AprovanLabs/registry/pull/148

## What changed

First end-to-end platform-app proving path for GitHub:

1. **`data/registry.json`** — `"platformApp": true` on the canonical `github`
   entry only (not `github/*` suite members).
2. **`@aprovan/registry-server` 0.2.4 → 0.2.5** — publish.yml ships §4 quota
   enforcement (0.2.4 published without it).
3. **`platform-oauth-runbook.md`** — added "Proving run: GitHub (§5.1)" with
   `PLATFORM_OAUTH_GITHUB_CLIENT_ID` / `_SECRET` env table; no secrets in repo.

No other providers flipped (§5.3 out of scope). Google deferral (§5.4) unchanged.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa05
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
node -e 'const r=require("./data/registry.json"); const g=r.find(p=>p.name==="github"); if(!g?.platformApp) process.exit(1); console.log("github platformApp", g.platformApp)'
# github platformApp true
pnpm turbo run build --filter=@aprovan/registry-server^...
pnpm --filter @aprovan/registry-server test -- credentials  # 22 passed
pnpm --filter @aprovan/registry-server test -- config       # 15 passed
```

§4 confirmed on `origin/main`: `PLATFORM_DEFAULT_RPS = 5` in
`packages/registry-server/src/dispatch/limits.ts`.

## Ops follow-up (not in PR)

Hosted live connect requires ops to load (never commit):

- `PLATFORM_OAUTH_GITHUB_CLIENT_ID`
- `PLATFORM_OAUTH_GITHUB_CLIENT_SECRET`

Register OAuth App redirect URIs per runbook, deploy 0.2.5, confirm
`platform_oauth_secret_loaded` for `github` at startup.

## Tasks (§5)

- [x] 5.1 Register and ship the first platform app end-to-end as the proving run (GitHub).
- [x] 5.2 Runbook (prior PR #142).
- [ ] 5.3 Remaining providers — one flag flip at a time (out of scope here).
- [x] 5.4 Google deferred (prior PR #142).

## Branch / PR

- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa05`
- Branch: `iw8/platform-oauth-05-github`
- **Not merged** per instructions.

# Brief: platform-oauth-apps §5.1 — First platform app proving run (GitHub)

## Mission
Ship the first end-to-end platform-app proving path: flip `platformApp: true` on
the canonical `github` provider, bump `@aprovan/registry-server` so §4 quota
code publishes, and leave secrets out of the repo (ops loads
`PLATFORM_OAUTH_GITHUB_*` per the runbook).

## Read first
1. `openspec/changes/platform-oauth-apps/{prd,tech-plan,tasks,decisions}.md`
2. `briefs/05-report.md` (prior partial — 5.2/5.4 done) and `briefs/04-report.md`
3. registry `packages/registry-server/docs/platform-oauth-runbook.md` (post-§4)
4. registry `data/registry.json` entry `"name": "github"`
5. `packages/registry-server/package.json` version (currently 0.2.4)

## Tasks
- [ ] 5.1 Register and ship the first platform app end-to-end as the proving run —
      GitHub or Slack, whichever review queue moves first. **Use GitHub** (no
      formal OAuth App verification; runbook already covers it).

Implementation checklist for 5.1 in this stream:
1. Set `"platformApp": true` on the **canonical** `github` entry only (not every
   `github/*` suite member). Separate commit if mixing with other files.
2. Bump `@aprovan/registry-server` **0.2.4 → 0.2.5** so publish.yml ships §4 quota
   enforcement (0.2.4 already published without it).
3. Confirm runbook still documents GitHub onboarding + §4 quotas; add a short
   "Proving run: GitHub" note that live connect requires hosted
   `PLATFORM_OAUTH_GITHUB_CLIENT_{ID,SECRET}` (never commit secrets).
4. Do **not** add remaining providers (5.3) in this PR — one provider only.
5. Leave 5.2/5.4 as already done; do not reopen Google.

## Acceptance criteria
**Done when** adding a platform app is a one-line change plus a secret, and the
runbook means the next one does not require rediscovering the process — proven
by GitHub's flag + documented secret env.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry  # worktree
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
# Flag present
node -e 'const r=require("./data/registry.json"); const g=r.find(p=>p.name==="github"); if(!g?.platformApp) process.exit(1); console.log("github platformApp", g.platformApp)'
pnpm --filter @aprovan/registry-server test -- credentials
pnpm --filter @aprovan/registry-server test -- config
```

## Constraints
- Depends-on: §2 + §4 (both merged)
- Secrets never in repo / PR
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa05`
- Branch: `iw8/platform-oauth-05-github`
- Report: `briefs/05b-report.md` (or update 05-report.md)
- Open PR; do NOT merge

# Brief: platform-oauth-apps §5 — Onboard platform apps (runbook first)

## Mission
Write the runbook (app review, redirect URIs, scopes, secret rotation). Defer Google
explicitly. **Do not register a live first platform app or flip `platformApp: true` until
the human answers the §4.1 quota open question** — ship runbook + deferral note now.

## Read first
1. `openspec/changes/platform-oauth-apps/{prd,tech-plan,tasks}.md`
2. §2 on main (`platformApp` flag, `PLATFORM_OAUTH_*` wiring)
3. §4.1 is still an Open Question — surface in report if blocked on 5.1

## Tasks
- [x] 5.2 Write the runbook (required now)
- [x] 5.4 Defer Google; note the decision
- [ ] 5.1 / 5.3 **blocked** on §4.1 human quota decision — leave unchecked; document in report

## Verify
```bash
# Docs-only stream — no code required if 5.1/5.3 deferred
test -f docs/platform-oauth-runbook.md || test -f packages/registry-server/docs/platform-oauth-runbook.md
```
Place runbook where registry-server ops docs live; report the path.

## Constraints
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa05`
- Branch `iw8/platform-oauth-05-runbook`; report `briefs/05-report.md`; do NOT merge

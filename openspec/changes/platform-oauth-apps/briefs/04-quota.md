# Brief: platform-oauth-apps §4 — Choose and enforce default quota

## Mission
Resolve and enforce the PRD open question: platform-app path gets deliberate
per-tenant rps / burst / 24h budget defaults, distinct from BYO. Documented
numbers are fixed in `decisions.md` / tech-plan D5 — implement them, do not
re-litigate.

## Read first
1. `openspec/changes/platform-oauth-apps/{prd,tech-plan,tasks,decisions}.md`
2. §3 report: `briefs/03-report.md` — `RateLimitKey`, `configurePool`,
   `aprovan.rate_limit.pool_exceeded`
3. registry:
   - `packages/registry-server/src/dispatch/limits.ts`
   - `packages/registry-server/src/dispatch/index.ts` (still string keys — wire pool)
   - `packages/registry-server/src/credentials/oauth.ts` (`origin`)
   - `packages/registry-server/src/config/{env,types}.ts`
   - `packages/registry-server/docs/platform-oauth-runbook.md`

## Settled defaults (do not change without a new decision)
| Knob | Value | Env |
|---|---|---|
| Platform per-tenant rps | 5 | `REGISTRY_PLATFORM_DEFAULT_RPS` |
| Platform burst | 10 | `REGISTRY_PLATFORM_DEFAULT_BURST` |
| Platform 24h budget | 10_000 | `REGISTRY_PLATFORM_DEFAULT_BUDGET` |
| Published pool ceiling | 50 rps | `REGISTRY_PLATFORM_POOL_RPS` |

Effective platform rps = `min(published ÷ tenantCount, platformDefaultRps)`.
BYO (`origin: "tenant"`) must **not** inherit platform ceilings.

## Tasks
Copy §4 checkboxes from tasks.md verbatim (4.1–4.3).

Also required for Done-when (implementation reality of 4.1/4.2):
- Wire dispatch so platform-origin calls pass `pool` on `RateLimitKey` and use
  platform defaults; BYO keeps today’s non-pool path.
- At startup, `configurePool` for each platform-capable provider (or a single
  documented pool-id scheme) using the published ceiling default / env.
- Update `platform-oauth-runbook.md`: remove the “blocked on §4.1” banner;
  document the shipped numbers and env overrides.
- Record 4.1 as resolved in change artifacts only if not already (prd + decisions.md
  already updated on aprovan main — do not rewrite the numbers).

## Acceptance criteria
**Done when** the shipped defaults are deliberate and documented rather than
inherited — and a tenant switching from platform → BYO picks up the wider
limit with no admin action (task 4.3).

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry   # use your worktree
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- config
pnpm --filter @aprovan/registry-server test -- limits
# Plus any new dispatch/origin tests you add for 4.3
```

## Constraints
- Numbers are fixed by decisions.md / D5 — implement, do not invent new ones.
- Do not implement leased buckets (D3 rejected).
- Do not flip `platformApp: true` on live providers — that is §5.1 after this merges.
- Worktree: `/Users/jacob/Documents/Code/AprovanLabs/.worktrees/registry-iw8-poa04`
- Branch: `iw8/platform-oauth-04-quota`
- Report: `openspec/changes/platform-oauth-apps/briefs/04-report.md` (aprovan)
- Open PR against registry `main`; do NOT merge.

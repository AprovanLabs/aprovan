# Brief: platform-oauth-apps §3 — Pool dimension on the rate limiter

## Mission
Extend the in-process rate limiter with an optional `pool` key dimension so platform-app
calls contend on a shared ceiling (provider published limit ÷ tenant count) while
tenant-supplied (BYO) apps stay per-tenant as today. Document that the limiter is
in-process and arithmetic-only.

## Read first
1. `openspec/changes/platform-oauth-apps/{prd,tech-plan,tasks}.md` (aprovan)
2. Tech-plan D3 and `enforce` key shape with `pool?: string`
3. registry `packages/registry-server/src/dispatch/limits.ts`
4. registry `packages/registry-server/src/dispatch/__tests__/limits.test.ts`

## Tasks
- [ ] 3.1 Extend the limiter key with an optional `pool` dimension. Calls resolving to a
      tenant-supplied app carry no pool and are limited per-tenant exactly as today.
- [ ] 3.2 Implement the ceiling arithmetically: per-tenant quota = provider published
      limit ÷ current tenant count, recomputed on tenant-count change rather than per
      call.
- [ ] 3.3 Emit a metric when a pool-scoped limit is hit, distinguishable from a
      tenant-scoped hit — this is the signal that leased buckets are needed.
- [ ] 3.4 Document in the module docstring that the limiter is in-process and that the
      pool ceiling is therefore only correct under the arithmetic scheme. The next reader
      must not assume it is distributed.
- [ ] 3.5 Tests: two tenants on one platform app contend; a tenant on its own app does
      not; pool exhaustion returns `RateLimitExceededError` naming the pool.

## Acceptance criteria
**Done when** one tenant cannot exhaust a shared upstream quota, and the reason the
current scheme is sufficient is written down next to the code.

Rejected: shared-store limiting immediately; platform-app key only in process without
arithmetic division across tenants (noisy neighbour).

**Note:** Do not invent the default per-tenant rps numbers — that is §4 / PRD open
question for a human. This stream adds the key + arithmetic mechanism only; use
test-supplied limits.

## Verify
```bash
cd ~/Documents/Code/AprovanLabs/registry
export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
pnpm --filter @aprovan/registry-server test -- limits
```
Paste full output.

## Constraints
- Files only: registry `packages/registry-server/src/dispatch/limits.ts`,
  `packages/registry-server/src/dispatch/__tests__/limits.test.ts`
- Do not touch credentials/OAuth resolution (§1) or registry.json (§2).
- Branch from `origin/main`; PR to `AprovanLabs/registry`.
- Check off `tasks.md` §3; write `briefs/03-report.md`.

## Report back
PR URL, verify paste, exact key type exported, metric name for pool hits (for §4).

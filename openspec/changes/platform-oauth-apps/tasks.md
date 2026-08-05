# platform-oauth-apps

Streams 1, 2 and 3 touch disjoint paths and may run in parallel. Stream 4 depends on 1
and 3. Stream 5 is operational and runs alongside everything else, one provider at a
time.

## 1. Platform app resolution

> Depends-on: - | Touches: registry `packages/registry-server/src/credentials/service.ts`, `packages/registry-server/src/credentials/oauth.ts`, `packages/registry-server/src/credentials/__tests__/**` | Verify: `pnpm --filter @aprovan/registry-server test -- credentials`

- [ ] 1.1 Resolve OAuth client credentials as: tenant-supplied `clientId`/`clientSecret`
      if present, else the platform app for that provider, else a 400 that tells the user
      to supply their own app and names the provider.
- [ ] 1.2 Return `origin: "tenant" | "platform"` from resolution; it is audited and it
      drives the pool-limit key in stream 3.
- [ ] 1.3 Apply on both OAuth paths — `oauth2_authcode` exchange and `oauth2_client`
      grant — since they resolve client credentials at different times.
- [ ] 1.4 Never return a platform secret from any tenant-facing credential read. Add a
      test that asserts the redaction directly rather than trusting the shape.
- [ ] 1.5 Tests: tenant override wins over an available platform app; no platform app and
      no override produces the actionable 400; `origin` is correct in all three cases.

**Done when** a tenant can connect a platform-app provider with no client secret, and can
override with their own at any point without a different code path.

## 2. Registry flag and secret plumbing

> Depends-on: - | Touches: registry `data/registry.json`, `packages/bundler/src/provider.ts`, `packages/registry-server/src/config/env.ts` | Verify: `pnpm --filter @aprovan/utdk-bundler test && pnpm --filter @aprovan/registry-server test -- config`

- [ ] 2.1 Add an optional `platformApp: boolean` to provider entries; validate it at
      registry load like other provider fields.
- [ ] 2.2 Read platform secrets from `PLATFORM_OAUTH_<PROVIDER>_CLIENT_ID` / `_SECRET`,
      KMS-wrapped, at hosted startup only.
- [ ] 2.3 A provider flagged `platformApp: true` with no secret configured must **not**
      fail boot — that is the self-host case. It falls back to BYO and logs once at
      startup, not per call.
- [ ] 2.4 Store platform secrets under their own key prefix with their own access audit
      (D4); assert no tenant-scoped read path can reach the prefix.
- [ ] 2.5 Tests: flag present + secret present → platform; flag present + secret absent →
      BYO with a single startup log; flag absent → BYO.

**Done when** the public repo states which providers have platform apps and contains no
secret, and a self-host boot is clean.

## 3. Pool dimension on the rate limiter

> Depends-on: - | Touches: registry `packages/registry-server/src/dispatch/limits.ts`, `packages/registry-server/src/dispatch/__tests__/limits.test.ts` | Verify: `pnpm --filter @aprovan/registry-server test -- limits`

- [x] 3.1 Extend the limiter key with an optional `pool` dimension. Calls resolving to a
      tenant-supplied app carry no pool and are limited per-tenant exactly as today.
- [x] 3.2 Implement the ceiling arithmetically: per-tenant quota = provider published
      limit ÷ current tenant count, recomputed on tenant-count change rather than per
      call.
- [x] 3.3 Emit a metric when a pool-scoped limit is hit, distinguishable from a
      tenant-scoped hit — this is the signal that leased buckets are needed.
- [x] 3.4 Document in the module docstring that the limiter is in-process and that the
      pool ceiling is therefore only correct under the arithmetic scheme. The next reader
      must not assume it is distributed.
- [x] 3.5 Tests: two tenants on one platform app contend; a tenant on its own app does
      not; pool exhaustion returns `RateLimitExceededError` naming the pool.

**Done when** one tenant cannot exhaust a shared upstream quota, and the reason the
current scheme is sufficient is written down next to the code.

## 4. Choose and enforce the default quota

> Depends-on: 1, 3 | Touches: registry `packages/registry-server/src/config/types.ts`, `packages/registry-server/src/config/env.ts` | Verify: `pnpm --filter @aprovan/registry-server test -- config`

- [ ] 4.1 Resolve the PRD's open question: pick the default per-tenant rps and 24h budget
      against a platform app, and record the reasoning in this change. It must be decided
      **before** the first platform app ships.
- [ ] 4.2 Make platform-app defaults distinct from BYO defaults — a tenant on its own app
      should not inherit a ceiling that exists to protect a shared pool.
- [ ] 4.3 Test that a tenant switching from platform to BYO picks up the wider limit
      without an admin action.

**Done when** the shipped defaults are deliberate and documented rather than inherited.

## 5. Onboard platform apps incrementally

> Depends-on: 2 | Touches: registry `data/registry.json` (one entry per provider) | Verify: `pnpm --filter @aprovan/registry-server test -- credentials`

- [ ] 5.1 Register and ship the first platform app end-to-end as the proving run —
      GitHub or Slack, whichever review queue moves first.
- [ ] 5.2 Write the runbook: what app review requires per provider, redirect URI
      conventions, scope selection, and how to rotate a platform secret without
      invalidating tenant grants.
- [ ] 5.3 Add remaining providers one flag flip at a time. Each is a one-line registry
      change plus a secret, with no code change.
- [ ] 5.4 Defer Google until there is a concrete reason to endure its verification
      process; note the decision so it is not repeatedly rediscovered.

**Done when** adding a platform app is a one-line change plus a secret, and the runbook
means the next one does not require rediscovering the process.

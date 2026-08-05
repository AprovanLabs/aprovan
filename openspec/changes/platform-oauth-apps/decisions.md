# Decision: platform OAuth per-tenant quota defaults

- **Status**: accepted
- **Date**: 2026-08-05
- **Origin**: platform-oauth-apps PRD open question / tasks §4.1
- **Authority**: tech-plan D5 (normative for implementation)

## Context

A hosted platform OAuth app is one upstream client shared by many tenants. The
provider rate-limits that client as one app. Per-tenant limits alone cannot stop
a noisy neighbour from exhausting the shared upstream quota. The pool key (§3)
exists; §4 must pick the numbers **before** the first `platformApp: true` ships,
because loosening is easy and tightening is not.

## Decision

When `origin === "platform"`:

| Limit | Value |
|---|---|
| Per-tenant rps | **5** |
| Burst | **10** |
| Per-tenant 24h budget | **10 000** requests |
| Published pool ceiling (arithmetic divisor) | **50** rps |

Effective rps for a platform call:

`min(poolPublishedRps ÷ currentPoolTenantCount, platformDefaultRps)`

plus the 24h budget on the same pool+tenant key.

When `origin === "tenant"` (BYO): **do not apply** the platform defaults. Use
existing BYO / profile / `REGISTRY_DEFAULT_RPS` / `REGISTRY_DEFAULT_BURST`
behavior only (today: no default rps unless configured).

All four platform knobs are overridable by env (see tech-plan D5) without a
code change.

## Reasoning

1. **5 rps / burst 10** — Enough for interactive agent tool use (several
   sequential provider calls per user turn). Far below what a scraper wants.
   GitHub’s authenticated primary limit (~5 000/hr ≈ 1.4 rps sustained per
   *user token*) is not the binding constraint for a *shared app*; secondary
   limits and client-credential abuse are. A small fixed per-tenant cap is
   the product brake; arithmetic division protects the shared ceiling as
   tenant count grows.

2. **10 000 / 24h** — ≈ 7 req/min average. A chatty workspace stays
   comfortable; a bulk sync or compromised loop hits the wall the same day
   instead of burning the pool overnight. Easy to raise per env for a known
   high-volume tenant later.

3. **Pool published 50 rps** — With ≤10 active platform tenants, arithmetic
   share ≥ 5, so the per-tenant default binds. Beyond that, arithmetic
   tightens automatically (D3). 50 is deliberately below “max the provider
   might allow” so one pod’s in-process limiter cannot pretend to be the
   whole cloud (also in-process — see limits module docstring).

4. **BYO stays wider** — Enterprises bring their own app specifically to own
   upstream quota and audit. Inheriting the shared-pool ceiling would punish
   the override path the PRD promises.

## Alternatives rejected

- **Unlimited platform until we see abuse** — ships the first app without a
  brake; contradicts the open-question constraint.
- **Match BYO defaults to platform** — removes the BYO advantage.
- **Very high platform caps (50 rps / 1M day)** — fails to protect the pool
  at low tenant count; arithmetic alone only helps once many tenants join.
- **Distributed leased buckets now** — tech-plan D3 rejected; revisit when
  `aprovan.rate_limit.pool_exceeded` is hot.

## Consequences

- Stream §4 implements these as shipped defaults and documents env overrides.
- Stream §5.1 may flip the first `platformApp` flag only after §4 merges.
- Operators may loosen per deployment; product default posture stays
  conservative.
- Raising defaults in a later release is fine; lowering them requires a new
  decision and a migration note for tenants built against the old floor.

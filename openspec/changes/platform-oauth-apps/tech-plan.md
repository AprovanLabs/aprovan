## D1 — Platform app is a default; BYO is an override

`clientId`/`clientSecret` are already fields on the payload, so a platform app is a
fallback applied when the tenant supplies none — resolved where everything else resolves,
with no second code path.

**Rejected — BYO only** (status quo). The hosted product gains no advantage on the step
that costs users the most.

**Rejected — shared platform app with no override.** Pooled rate limits bite on
high-volume providers, some providers' terms restrict multi-tenant apps, and one
compromised secret exposes every tenant's grant. Enterprises will refuse it outright.

**Rejected — per-tenant dynamic client registration.** Almost no provider supports DCR.

**Revisit if** a provider's terms forbid a shared app entirely — that provider becomes
BYO-only and the registry flag says so.

## D2 — The flag is public; the secret is not

The registry entry carries `platformApp: true`. The client id and secret resolve from
the hosted environment (KMS) at call time and never enter the repository. A self-hosted
deployment reads the same public flag, finds no secret, and falls through to the BYO path
that already exists.

This works *because* the licence decision was full open source: there is no separate
hosted build, no branching, and no closed fork to keep in sync.

**Rejected — separate hosted build with secrets compiled in.** Two artifacts, and the
divergence is invisible until something breaks in only one.

**Revisit if** self-hosters need to register their own platform-wide apps — the same flag
would then point at a deployment-level secret rather than a hosted one.

## D3 — Add the pool key now; use arithmetic quotas first

The irreversible piece is the *key shape*: retrofitting a platform-app dimension later
means touching every dispatch call site. Add it now. For the ceiling itself, start with
arithmetic — divide the provider's published limit by tenant count — which needs no
shared state and is exactly correct at low tenant counts. Move to leased buckets against
a shared store when static division wastes too much headroom.

**Rejected — platform-app key held in process memory.** Bounds per instance, so two pods
double the ceiling. Wrong the moment the service scales.

**Rejected — shared-store limiting immediately.** Premature; costs a round trip or a
leasing scheme before there is a pool to protect.

**Rejected — per-tenant limits only** (status quo). Noisy neighbour is guaranteed, not
hypothetical.

**Revisit if** tenant count makes static division waste more headroom than it protects —
that is the trigger for leased buckets.

## D4 — Platform app secrets are a distinct asset class

One secret, all tenants, catastrophic blast radius — as against many secrets, one tenant
each. Same cipher is fine; the same table and the same access path are not. Platform app
secrets live under their own key prefix with their own access audit, and are never
returned by any tenant-facing credential read.

**Rejected — store them as an internal tenant's credentials.** A single bug in tenant
scoping would expose every provider's platform secret at once.

**Revisit if** platform secrets need per-provider rotation schedules, which would argue
for a dedicated store rather than a prefix.

## Interfaces & Data

```ts
// data/registry.json entry — public
{ "name": "github", "platformApp": true }

// Hosted environment only — never in the repo
PLATFORM_OAUTH_<PROVIDER>_CLIENT_ID
PLATFORM_OAUTH_<PROVIDER>_CLIENT_SECRET   // KMS-wrapped

// registry-server/src/credentials/service.ts
interface OAuthClientResolution {
  clientId: string;
  clientSecret: string;
  origin: "tenant" | "platform";   // audited; drives the pool-limit key
}

// registry-server/src/dispatch/limits.ts
// Key gains a pool dimension. Calls on a tenant-supplied app carry pool = undefined
// and are limited per-tenant only.
enforce(key: { tenant, provider, principal, pool?: string }, limits?: ProfileLimits): void
```

`origin` is what makes the limiter correct: only `"platform"` calls contend for the
shared ceiling.

## D5 — Platform quota defaults (resolved open question)

Shipped defaults apply **only** when `OAuthClientResolution.origin === "platform"`.
BYO (`origin: "tenant"`) must not inherit them.

| Knob | Default | Env override |
|---|---|---|
| Per-tenant rps | **5** | `REGISTRY_PLATFORM_DEFAULT_RPS` |
| Burst | **10** | `REGISTRY_PLATFORM_DEFAULT_BURST` |
| 24h budget | **10 000** req | `REGISTRY_PLATFORM_DEFAULT_BUDGET` |
| Published pool ceiling | **50** rps | `REGISTRY_PLATFORM_POOL_RPS` |

Effective platform rps = `min(publishedPoolRps ÷ tenantCount, platformDefaultRps)`.
Budget is always the platform 24h budget on the pool path (BYO uses profile /
`REGISTRY_DEFAULT_*` only).

**Why these numbers** — full reasoning in [decisions.md](./decisions.md). Short version:
interactive agent use needs a few calls/sec; shared-app abuse and secondary provider
limits need a hard daily cap; arithmetic headroom at low tenant count should match the
per-tenant cap (~10 tenants × 5 ≈ 50). Loosen via env before tightening tenants who
built against these numbers.

**Rejected — same defaults for BYO and platform.** Defeats the point of BYO (tenant
owns the upstream quota).

**Rejected — unlimited platform until abuse.** First live app would ship without a
brake; tightening later breaks tenants (PRD open-question constraint).

**Revisit if** `aprovan.rate_limit.pool_exceeded` is hot at modest tenant counts —
that is the leased-bucket trigger (D3), not a reason to raise defaults blindly.


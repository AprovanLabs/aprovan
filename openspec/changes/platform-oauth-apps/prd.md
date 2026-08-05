## Problem

`clientId` and `clientSecret` live on each credential payload, and there is no
platform-level OAuth app concept anywhere in the server. Connecting GitHub therefore
means the *user* registers a GitHub OAuth app, copies a client secret, and pastes it in —
per provider, every time. That experience is identical on the hosted service and on a
self-hosted deployment.

With everything shipping under an open licence and revenue coming from hosting, the
hosted product currently adds nothing on the single hardest step of onboarding.

Underneath, the rate limiter is keyed `(tenant, profile-or-provider, principal)` — every
key starts with tenant — and is held in process memory. A platform OAuth app shared
across tenants is rate-limited *by the provider* as one app, so one tenant operating
inside its own limits can exhaust the upstream quota for everyone else, invisibly. Two
server instances double whatever ceiling was intended.

## Users & Jobs

- **New users** — need "Connect GitHub" to be one click, with no developer console visit.
- **Enterprise tenants** — need to supply their own OAuth app for rate limits, audit, or
  policy reasons.
- **Operators** — need a per-provider ceiling that holds across instances and cannot be
  exhausted by one tenant.
- **Self-hosters** — need the same code to work with no platform app present.

## Goals

- Connecting a supported provider requires no OAuth app registration by the user.
- Any tenant may override with their own app, at any time, without a different code path.
- The public registry states *whether* a platform app exists; the secret never appears in
  a public repo.
- A shared upstream quota has a ceiling that survives horizontal scale.
- Platform apps are added one provider at a time, in whatever order app review allows.

## Non-Goals

- Does **not** change the credential cipher or KMS envelope scheme.
- Does **not** implement distributed leased-bucket limiting. The key dimension is added
  now; the shared backing store is deferred.
- Does **not** attempt dynamic client registration — effectively no provider supports it.

## Capabilities

### New Capabilities

- `platform-oauth-app`: a hosted-side registered app used as the default client for a
  provider, overridable per tenant.
- `pool-rate-limit`: a limit scope keyed by platform app rather than by tenant.

### Modified Capabilities

- `credential-resolution`: OAuth client credentials resolve platform-app defaults when
  the tenant supplies none.

## Open Questions

- What is the default per-tenant rps against a platform app? Must be chosen **before**
  the first platform app ships — loosening a limit is easy, tightening one people have
  built against is not.

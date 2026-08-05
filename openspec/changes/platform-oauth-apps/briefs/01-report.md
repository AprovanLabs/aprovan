# Report: platform-oauth-apps §1 — Platform app resolution

PR: https://github.com/AprovanLabs/registry/pull/137 (branch `iw8/platform-oauth-01-resolve`). **Not merged**, per instructions.

## What changed

OAuth client credentials now resolve in one place before any token exchange or
client-credentials grant:

**tenant override → platform app → actionable 400 naming the provider.**

- `credentials/oauth.ts` — `OAuthClientResolution` / `resolveOAuthClient()`,
  `prepareOAuthPayloadForStorage()`, `redactTenantCredentialPayload()`, and a
  **stub seam** `setPlatformOAuthLookup()` / `resetPlatformOAuthLookup()`.
  §2 will replace the default no-op lookup with `PLATFORM_OAUTH_*` env + KMS.
  Token helpers (`exchangeAuthorizationCode`, `refreshAccessToken`,
  `clientCredentialsGrant`) and `resolveToInjectable` now take `provider` and
  call `resolveOAuthClient` at use time.
- `credentials/service.ts` — `create()` resolves OAuth payloads before
  `provisionCredential` (GE §3 path preserved). Platform-origin credentials
  store `clientOrigin: "platform"` with empty `clientId`/`clientSecret`; tenant
  BYO stores secrets and `clientOrigin: "tenant"`. `getPayload` /
  `resolveById` / `firstForProvider` redact platform secrets on read.
- `credentials/types.ts` — optional `clientId`/`clientSecret`; new
  `clientOrigin?: "tenant" | "platform"`.
- `dispatch/index.ts` — passes `provider` into `resolveToInjectable` for the
  `oauth2_client` call-time grant path.
- `http/router.ts` — maps `CredentialResolutionError` to HTTP 400 on
  `POST /credentials`.
- `credentials/__tests__/platform-resolve.test.ts` — 11 new §1 tests (tasks
  1.1–1.5).

## Platform secret seam (§2 not merged)

```ts
setPlatformOAuthLookup((provider) =>
  provider === "github" ? { clientId, clientSecret } : undefined,
);
```

Production wiring will read `PLATFORM_OAUTH_<PROVIDER>_CLIENT_ID` / `_SECRET`
at hosted startup (§2). Until then the default lookup returns `undefined` and
self-host / BYO behavior is unchanged.

## Verify

```
$ export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
$ pnpm --filter @aprovan/registry-server test -- credentials

 Test Files  2 passed (2)
      Tests  22 passed (22)
```

22 tests = 11 pre-existing (cipher, OAuth cache/refresh, GE §3 provisioning) +
11 new §1 tests:

1. `1.5` tenant override wins over platform app
2. `1.5` platform app when tenant supplies no credentials
3. `1.5` actionable 400 naming provider when neither is available
4. `1.1/1.2` authcode connect with no tenant secret uses platform + stores `clientOrigin: "platform"`
5. `1.1` tenant BYO uses same create path with `origin: "tenant"`
6. `1.1` create fails before provisioning when resolution fails
7. `1.3` `oauth2_client` grant at call time resolves platform credentials
8. `1.4` `redactTenantCredentialPayload` strips platform secrets directly
9. `1.4` `getPayload` never returns a platform client secret (even after a buggy write)
10. `exchangeAuthorizationCode` uses tenant credentials when supplied
11. `clientCredentialsGrant` falls back to platform app

## Tasks (§1)

- [x] 1.1 Resolve OAuth client credentials as: tenant-supplied `clientId`/`clientSecret`
      if present, else the platform app for that provider, else a 400 that tells the user
      to supply their own app and names the provider.
- [x] 1.2 Return `origin: "tenant" | "platform"` from resolution; it is audited and it
      drives the pool-limit key in stream 3.
- [x] 1.3 Apply on both OAuth paths — `oauth2_authcode` exchange and `oauth2_client`
      grant — since they resolve client credentials at different times.
- [x] 1.4 Never return a platform secret from any tenant-facing credential read. Add a
      test that asserts the redaction directly rather than trusting the shape.
- [x] 1.5 Tests: tenant override wins over an available platform app; no platform app and
      no override produces the actionable 400; `origin` is correct in all three cases.

## Constraints honored

- Rebased onto GE §3 (`provisionCredential` constructor injection preserved).
- Platform secret lookup stubbed; seam documented for §2.
- Did not invent production quota numbers (§4).
- Did not flip `platformApp` flags in `registry.json` (§2/§5).
- PR opened, not merged.

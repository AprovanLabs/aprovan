# Report: platform-oauth-apps §2 — Registry flag and secret plumbing

PR: https://github.com/AprovanLabs/registry/pull/139 (branch `iw8/platform-oauth-02-flag`). **Not merged**, per instructions.

## What changed

Public optional `platformApp: boolean` on provider entries; hosted startup reads
`PLATFORM_OAUTH_<PROVIDER>_CLIENT_ID` / `_SECRET` (KMS-wrapped or plaintext) and
wires the §1 `setPlatformOAuthLookup` seam. Self-host with flagged providers
but no env secrets boots cleanly and falls back to BYO with one startup log.

- `packages/bundler/src/provider.ts` — `platformApp?: boolean` on
  `RegistryProvider`; validated at `loadRegistryProviders()` load time.
- `packages/bundler/package.json` — export `./provider` for registry-server.
- `packages/registry-server/src/credentials/platform-secrets.ts` — in-memory
  store under `platform-oauth:` prefix (D4); `unwrapPlatformOAuthSecret` for
  cipher envelopes and KMS blobs; `wirePlatformOAuthSecrets`.
- `packages/registry-server/src/config/platform-oauth.ts` —
  `wirePlatformOAuthAtStartup()` loads registry flags + env.
- `packages/registry-server/src/server.ts` — calls wiring at boot with audit
  append on platform secret access.
- `packages/registry-server/src/config/env.ts` — documents env var convention.
- `src/config/__tests__/platform-oauth.test.ts` — 8 §2 tests.

## Env convention

| Provider | Client ID env | Client secret env |
|----------|---------------|-------------------|
| `github` | `PLATFORM_OAUTH_GITHUB_CLIENT_ID` | `PLATFORM_OAUTH_GITHUB_CLIENT_SECRET` |
| `google/drive` | `PLATFORM_OAUTH_GOOGLE_DRIVE_CLIENT_ID` | `PLATFORM_OAUTH_GOOGLE_DRIVE_CLIENT_SECRET` |

Slash-separated provider ids map to underscore env suffixes. Secrets accept
plaintext (local), `enc:v1:` credential-cipher envelopes, or base64 KMS
ciphertext when `CREDENTIALS_KMS_KEY_ID` is set.

## Verify

```
$ export COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0
$ pnpm turbo run build --filter=@aprovan/utdk-bundler --filter=@aprovan/registry-server
$ pnpm --filter @aprovan/utdk-bundler test -- provider naming
$ pnpm --filter @aprovan/registry-server test -- config

bundler (provider + naming): 30 passed
registry-server (config):     8 passed
```

## Tasks (§2)

- [x] 2.1 Add an optional `platformApp: boolean` to provider entries; validate it at
      registry load like other provider fields.
- [x] 2.2 Read platform secrets from `PLATFORM_OAUTH_<PROVIDER>_CLIENT_ID` / `_SECRET`,
      KMS-wrapped, at hosted startup only.
- [x] 2.3 A provider flagged `platformApp: true` with no secret configured must **not**
      fail boot — that is the self-host case. It falls back to BYO and logs once at
      startup, not per call.
- [x] 2.4 Store platform secrets under their own key prefix with their own access audit
      (D4); assert no tenant-scoped read path can reach the prefix.
- [x] 2.5 Tests: flag present + secret present → platform; flag present + secret absent →
      BYO with a single startup log; flag absent → BYO.

## Constraints honored

- No `data/registry.json` changes (no `platformApp: true` flips — §5 onboarding).
- `resolveOAuthClient` contract unchanged (§1 seam only wired at startup).
- PR opened, not merged.

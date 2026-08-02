# Stream 3 report: Registry catalog hosts

## Built

- **`isLocalAccountHost()`** — `PUBLIC_ACCOUNT_HOST=local` or `astro dev` (unless `chat`) renders live pages; production defaults to stubs.
- **`CredentialsHost`** — `SessionGate` + registry-ui `CredentialManager` with catalog provider picker and OAuth redirect to `/account/oauth-callback`.
- **`AdminHost`** — `SessionGate` + registry-ui `AdminPanel`.
- **`OAuthCallbackHost`** — completes authcode flow for local catalog (no Cognito).
- **`MovedNotice`** — CTAs deep-link to `https://aprovan.com/chat/?native=credentials` / `?native=admin` (+ `provider` when present).
- **`gateway-session.ts`** — extended with account widget clients; playground `createPlaygroundGatewayClient` preserved (no conflict with PR #82 paths).

## Verified

```bash
cd ~/Documents/Code/AprovanLabs/registry
pnpm --filter @aprovan/registry-web build                                    # pass (local/dev pages)
PUBLIC_ACCOUNT_HOST=chat pnpm --filter @aprovan/registry-web build             # pass (MovedNotice stubs)
grep 'native=credentials' apps/registry/dist/account/credentials/index.html    # → ?native=credentials
grep 'native=admin' apps/registry/dist/admin/permissions/index.html            # → ?native=admin
```

## Dependency note

Stream 1 widgets are merged on aprovan `main` (PR #13) but not yet on npm `@aprovan/registry-ui@0.4.0`. This branch vendors a packed build at `vendor/aprovan-registry-ui-0.4.0.tgz` (built from aprovan `main`).

**Before merge:** publish `@aprovan/registry-ui@0.5.0` from aprovan and replace the vendor pin with `"@aprovan/registry-ui": "0.5.0"`.

## Deviations

- **Auth**: Local pages use gateway session/workspace selection via `@aprovan/ui/gateway` — no Cognito restore on the catalog.
- **3.3 duplicate removal**: Pre-strip credential components were already deleted in #80; no local form sources remained to remove.

## Files touched

- `apps/registry/src/lib/account-host.ts`, `gateway-session.ts`
- `apps/registry/src/components/account/*`
- `apps/registry/src/components/MovedNotice.astro`
- `apps/registry/src/pages/account/*`, `admin/permissions.astro`
- `apps/registry/package.json`, `.env.example`, `src/env.d.ts`
- `vendor/aprovan-registry-ui-0.4.0.tgz` (interim until npm publish)

## Branch / PR

- Branch: `ws/registry-account-hosts`
- PR: (see GitHub after push)

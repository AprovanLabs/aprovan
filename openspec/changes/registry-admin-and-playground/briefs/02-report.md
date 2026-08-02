# Stream 2 report: Chat hosting & deep links

## Built

- **CredentialsPanel** composes `CredentialManager` from `@aprovan/registry-ui` with
  `createRegistryGatewayClient()`, `oauthRedirectPath="/chat/account/oauth-callback"`, and
  catalog provider picker via `fetchCatalogProviders`.
- **AdminPermissionsPanel** composes `AdminPanel` with the same gateway client adapter.
- **In-app CTAs** — ServicesMenu connect/add-credential, SessionControls profile menu, and
  ProviderPicker unconnected rows call `openNativeTab("credentials")` (with optional provider
  prefill) instead of `credentialsUrl()`.
- **`chatDeepLinkUrl()`** in `registry.ts` for external stubs only
  (`https://aprovan.com/chat/?native=credentials|admin&provider=`).
- **Boot deep-link parse** on `ChatPage` — `?native=credentials|admin&provider=` opens the
  matching native tab once and strips query params from the URL.
- **Provider prefill** — `stashCredentialsPrefill` + mount key remounts `CredentialManager`
  when connect is clicked with a provider id.

## Verified

```bash
cd ~/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/patchwork-web build   # pass
```

## MovedNotice URL shape (for stream 3)

Production catalog stubs should deep-link with:

| Surface | URL |
|---------|-----|
| Credentials | `https://aprovan.com/chat/?native=credentials` |
| Credentials + provider | `https://aprovan.com/chat/?native=credentials&provider=<id>` |
| Admin | `https://aprovan.com/chat/?native=admin` |

Use `chatDeepLinkUrl("credentials")`, `chatDeepLinkUrl("credentials", providerId)`, or
`chatDeepLinkUrl("admin")` from chat's `registry.ts` (or hard-code the same query shape).

## Deviations

- **SessionLink onClick** — extended `@aprovan/ui` `SessionLink` with optional `onClick` so
  SessionControls can open credentials in-app without a full navigation.
- **PWA precache limit** — bumped `maximumFileSizeToCacheInBytes` to 8 MiB after credential
  widgets pushed the main chunk past 7 MiB (workbox default 2 MiB was already overridden to 6).
- **ChatDock / InterfacesPanel** — still use `credentialsUrl()` for LLM credential hints; out of
  stream 2 touch list. Stream 3 or a follow-up can wire `onConnectProvider` through ChatDock.

## Files touched

- `client/web/src/components/panels/CredentialsPanel.tsx`
- `client/web/src/components/panels/AdminPermissionsPanel.tsx`
- `client/web/src/lib/registry.ts` (`chatDeepLinkUrl`)
- `client/web/src/lib/credentials.ts` (prefill helpers)
- `client/web/src/lib/gateway.ts` (`createRegistryGatewayClient`)
- `client/web/src/components/ServicesMenu.tsx`
- `client/web/src/components/ProviderPicker.tsx`
- `client/web/src/components/SessionControls.tsx`
- `client/web/src/pages/ChatPage.tsx`
- `client/web/src/features/tabs/useTabs.ts`
- `client/web/vite.config.ts` (workbox limit)
- `packages/ui/src/shell/index.tsx` (SessionLink onClick)
- `openspec/changes/registry-admin-and-playground/tasks.md`

## Branch / PR

- Branch: `ws/chat-credential-hosting`
- PR: (see GitHub after push)

# Stream 1 report: registry-ui credential & admin widgets

## Built

- **`CredentialManager`** — list/filter/revoke credentials; OAuth-pending banner; modal
  `AddCredentialForm`.
- **`AddCredentialForm`** — bearer_token, api_key, oauth2_client, oauth2_authcode; optional
  catalog provider picker via `loadCatalogProviders`; client-side rejection of interface /
  interface-only provider ids before POST.
- **`AdminPanel`** — members (list/remove), groups (CRUD + member assignment), tool grants
  (list/revoke); **not-authorized** card on 403 from `/members` (no mutation controls).
- Shared helpers: OAuth pending state, `validateProviderId`, credential/admin API wrappers over
  injected `GatewayClient` from `@aprovan/registry-main`.
- Unit tests: validation rules + mocked-fetch happy path for list/add/delete credentials.

## Verified

```bash
cd ~/Documents/Code/AprovanLabs/aprovan
pnpm --filter @aprovan/registry-ui build   # pass
pnpm --filter @aprovan/registry-ui test    # 9 tests pass
```

## Widget props (for wave 2 hosts)

### `CredentialManager`

| Prop | Type | Notes |
|------|------|-------|
| `client` | `GatewayClient` | **Required** — pre-authorized gateway client |
| `initialProvider` | `string?` | Opens add form with provider preselected |
| `oauthRedirectPath` | `string?` | Default `/account/oauth-callback`; chat should pass `/chat/account/oauth-callback` |
| `onOAuthStart` | `() => void?` | Hook before browser redirect for authcode flow |
| `loadCatalogProviders` | `() => Promise<CatalogProviderSummary[]>?` | Optional catalog search; without it, manual provider id entry |

### `AddCredentialForm`

Same props as above plus `onSaved`, `onCancel`.

### `AdminPanel`

| Prop | Type | Notes |
|------|------|-------|
| `client` | `GatewayClient` | **Required** — must carry admin token; 403 → not-authorized UI |

`GatewayProvider` / `useGateway()` remain for other widgets (TryIt, etc.); credential/admin
widgets take an explicit `client` prop per tech-plan D1.

## Deviations

- **Admin scope**: Stream 1 implements members, groups, and tool-grant visibility (list/revoke).
  Invites, audit log, and MCP install tab from the pre-strip catalog `AdminPanel` are **not**
  ported — out of stream 1 task scope.
- **Catalog picker**: Optional via `loadCatalogProviders` callback rather than bundling registry
  catalog fetch (hosts supply catalog JSON or gateway-derived list in wave 2/3).
- **OAuth session key**: Uses `aprovan:oauth-pending` (aligned with chat `credentials.ts`); registry
  historical used `utdk_oauth_pending` — hosts migrating should clear old keys if needed.

## Files touched

- `packages/registry-ui/src/credentials/**`
- `packages/registry-ui/src/admin/**`
- `packages/registry-ui/src/index.tsx`
- `packages/registry-ui/package.json`

## Branch / PR

- Branch: `ws/registry-admin-widgets`
- PR: (see GitHub after push)

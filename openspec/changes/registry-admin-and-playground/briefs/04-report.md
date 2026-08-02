# Stream 4 report — Playground restore

## Summary

Restored catalog playground gateway transport and provider Try-it consoles without
reintroducing Cognito as the catalog's primary auth model. Added an authenticated
`native://playground` surface in chat that reuses `RunView` and the same sandbox
runner stack. AppsHost on the public catalog now defers to the product app instead
of rendering a broken AppsPanel.

## Changes

### registry (`ws/registry-playground`)

- **`lib/gateway-session.ts`** — optional sessionStorage token/workspace helpers for
  local standalone hosts; `isStandaloneCatalogHost()` gates live apps management.
- **`components/TryItPanel.tsx`** — restored gateway-wired try-it console (no Cognito).
- **`components/ScriptPlayground.tsx`** — `createGatewayTransport` now passes optional
  session token/workspace when present.
- **`components/ProviderExplorer.tsx`** / **`SdkExplorer.tsx`** — Try-it sections use
  `TryItPanel` again instead of link-only stubs.
- **`components/AppsHost.tsx`** — production catalog shows a clear defer CTA; local
  standalone with a gateway session renders the live `AppsPanel`.

### aprovan (`ws/registry-playground`)

- **`client/web/src/components/panels/PlaygroundPanel.tsx`** — new native surface with
  sandbox runner, session-authenticated gateway transport, and `RunView`.
- **`client/web/src/lib/playground.ts`** — compile helpers for the chat panel.
- **`client/web/src/lib/native-surfaces.tsx`** — registered `native://playground`.
- **`packages/registry-ui/src/apps/catalog.tsx`** — auth-failure defer message when
  `createWorkflowHref` is set (catalog hosts without a session).
- **`client/web/package.json`** — added `@aprovan/runtime` and `sucrase`.

## Verify

```bash
cd ~/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-web build   # ✓
cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web build     # ✓
```

## registry-ui export note for wave 1

No changes to `packages/registry-ui/src/index.tsx` credential exports. Only
`apps/catalog.tsx` was touched (auth defer empty state). Stream 1 widgets should
not conflict.

## PRs

- registry: `ws/registry-playground` → `main`
- aprovan: `ws/registry-playground` → `main`

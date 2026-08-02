# registry-admin-and-playground — Tasks

## 1. Registry-ui credential & admin widgets

> Depends-on: - | Touches: aprovan/packages/registry-ui/src/index.tsx, aprovan/packages/registry-ui/src/credentials/**, aprovan/packages/registry-ui/src/admin/**, aprovan/packages/registry-ui/package.json | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-ui build && pnpm --filter @aprovan/registry-ui test

- [x] 1.1 Port full CredentialManager + AddCredentialForm (bearer, api_key, oauth2_client,
      oauth2_authcode) into `@aprovan/registry-ui`, driven by an injected GatewayClient;
      reject interface / interface-only provider ids in the form — specs:
      credential-admin-widgets.
- [x] 1.2 Port AdminPanel (or equivalent) covering members/groups list+edit and tool-grant
      visibility; not-authorized state for non-admins — specs: credential-admin-widgets.
- [x] 1.3 Export widgets from the package entry; add unit tests for validation + happy-path
      client calls (mocked fetch).

## 2. Chat hosting & deep links

> Depends-on: 1 | Touches: aprovan/client/web/src/components/panels/CredentialsPanel.tsx, aprovan/client/web/src/components/panels/AdminPermissionsPanel.tsx, aprovan/client/web/src/lib/registry.ts, aprovan/client/web/src/lib/credentials.ts, aprovan/client/web/src/components/ServicesMenu.tsx, aprovan/client/web/src/components/ProviderPicker.tsx, aprovan/client/web/src/components/SessionControls.tsx, aprovan/client/web/src/pages/ChatPage.tsx, aprovan/client/web/src/features/tabs/** | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web build

- [x] 2.1 Replace CredentialsPanel / AdminPermissionsPanel guts with registry-ui widgets;
      wire OAuth to existing `/chat/account/oauth-callback` — ux.md credentials/admin.
- [x] 2.2 Replace `credentialsUrl()` navigations with `openNativeTab("credentials")` (+
      provider prefill); add chat deep-link URL helper for external stubs only — specs:
      credential-hosting.
- [x] 2.3 Parse `?native=credentials|admin&provider=` on app boot to open the matching tab.

## 3. Registry catalog hosts (standalone + prod stubs)

> Depends-on: 1 | Touches: registry/apps/registry/src/pages/account/**, registry/apps/registry/src/pages/admin/**, registry/apps/registry/src/components/MovedNotice.astro, registry/apps/registry/src/components/credentials/**, registry/apps/registry/src/components/shell/**, registry/apps/registry/src/components/AdminPanel.tsx | Verify: cd ~/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-site build

- [ ] 3.1 Restore live `/account/credentials` and `/admin/permissions` pages that compose
      registry-ui widgets when `PUBLIC_ACCOUNT_HOST=local` (or equivalent) — specs:
      credential-hosting "Registry-standalone".
- [ ] 3.2 Keep production stubs as MovedNotice; CTAs deep-link to
      `https://aprovan.com/chat/?native=credentials` / `?native=admin` (+ provider when
      present) — specs: credential-hosting "Production catalog stubs".
- [ ] 3.3 Remove duplicate local credential form sources once widgets are consumed; bump
      `@aprovan/registry-ui` dep as needed.

## 4. Playground restore (registry + chat)

> Depends-on: - | Touches: registry/apps/registry/src/components/ScriptPlayground.tsx, registry/apps/registry/src/lib/playground.ts, registry/apps/registry/src/pages/playground.astro, registry/apps/registry/src/components/TryItPanel.tsx, registry/apps/registry/src/pages/providers/**, aprovan/packages/registry-ui/src/run-view.tsx, aprovan/packages/registry-ui/src/apps-panel.tsx, aprovan/client/web/src/lib/native-surfaces.tsx, aprovan/client/web/src/components/panels/PlaygroundPanel.tsx | Verify: cd ~/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-site build; cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web build

- [x] 4.1 Restore catalog playground gateway transport + provider Try-it console wiring
      (anonymous sample still works without Cognito) — specs: registry-playground.
- [x] 4.2 Add chat `native://playground` panel composing shared ScriptPlayground/RunView
      with session auth — specs: registry-playground "Chat authenticated playground".
- [x] 4.3 Ensure AppsHost / apps panel either authenticates for standalone or clearly
      defers "manage in app" without a hollow broken state.

**Path conflict note:** stream 4 may touch `aprovan/packages/registry-ui/src/run-view.tsx`
and `apps-panel.tsx` only — stream 1 owns credential/admin files under registry-ui. Do not
edit stream 1's credential/admin modules in this stream.

## 5. Interface labeling polish

> Depends-on: - | Touches: aprovan/client/web/src/components/panels/InterfacesPanel.tsx, aprovan/client/web/src/components/ServicesMenu.tsx, aprovan/client/web/src/lib/namespaces.ts, aprovan/client/web/src/lib/namespaces.test.ts | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec vitest run src/lib/namespaces.test.ts && pnpm --filter @aprovan/patchwork-web build

- [x] 5.1 InterfacesPanel: primary title = `def.label` ("Agent runtime"); keep id secondary
      — specs: interface-labeling.
- [x] 5.2 ServicesMenu Interfaces section: `title={info?.label ?? ns}`; add/adjust tests.

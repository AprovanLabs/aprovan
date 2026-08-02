# product-plane-move — UX

This is a repo/deploy topology change; almost the entire surface is invisible to end users.
The one real UX event is the **relocation of credential and admin management** out of the
catalog site (`aprovan.com/registry` → `account/credentials`, `admin/permissions`) and into
the product workspace app. Everything below covers only that seam.

## Flows

### Flow: Manage credentials (relocated)

1. User opens the product app (aprovan.com/chat) and navigates to the credentials panel
   (surfaced in the Workspace sidebar alongside the existing native panels).
2. Panel lists the workspace's credentials (backed by the embedded registry server's
   credential store — same data as before, same API, new host page).
3. User adds/rotates/deletes a credential; OAuth-style flows complete via the product app's
   own callback route (the catalog's `account/oauth-callback.astro` equivalent moves with it).
4. Failure paths: gateway unreachable → panel shows the standard error state with retry;
   OAuth callback denied/expired → panel shows the failure reason and a re-initiate action.

### Flow: Catalog visitor hits a removed page

1. Visitor follows an old link to `/registry/account/credentials` or `/registry/admin/*`.
2. Catalog serves a short static "this moved" page linking to the product app. No redirect
   infrastructure, no auth on the catalog for this purpose.
3. Catalog's remaining pages (catalog, providers, packages, docs, playground) render without
   any signed-in account affordances.

### Flow: Admin permissions (relocated)

1. Workspace admin opens the admin/permissions surface inside the product app (the moved
   `AdminPanel`), gated by the existing workspace role checks.
2. Non-admin users do not see the entry point; deep links render the standard not-authorized
   state.

## Screens & States

### Credentials panel (product app)

- Purpose: list/add/edit workspace credentials; show which profiles/bindings reference them.
- Key elements: credential list, provider identity, add-credential dialog, OAuth initiation.
- States: loading (skeleton list), empty ("no credentials yet" + add CTA), error (gateway
  error + retry), partial (OAuth pending — show in-progress row until callback lands).

### Admin permissions panel (product app)

- Purpose: the moved `AdminPanel` surface, unchanged in function.
- States: loading, not-authorized, error. Empty state: no members/grants yet.

### Catalog "moved" stub (registry site)

- Purpose: single static page for retired `account/*` and `admin/*` routes.
- States: none (static).

## Component Inventory

- Credentials + admin panels reuse `@aprovan/registry-ui` components (the moved
  `components/credentials/*`, `components/auth/*`, `AdminPanel.tsx` land in the aprovan
  monorepo next to their registry-ui dependencies — no new component development).
- Panel chrome follows the existing nine native panels' self-contained pattern in
  `client/web` (shadcn/ui vendored primitives). No new one-off components.
- Catalog stub: plain Astro page using the catalog's existing layout/shell.

## Open Questions

1. Should the catalog's header keep a "Sign in" affordance that deep-links to the product app,
   or drop auth entirely from the catalog shell? _Recommendation:_ drop it; the catalog is a
   public artifact site — one "Open the app" link in the shell suffices.

# UX — iw9-f4-app-identity

Deliberately short: this change is almost entirely server-side (manifest loader, reconcile, slug registry). The only user-visible surfaces are **the URLs people see and share** (D5) and **icon fallback rendering** (D6). Launcher/directory IA is iw9-b's scope.

## Flows

### Flow: Opening and sharing an app link
1. User opens any app link: canonical `/a/<appId>`, vanity `/a/<globalSlug>`, workspace form `/w/<wsId>/a/<installId>` (or `/w/<wsSlug>/a/<slug>`), or a convenience/legacy `/apps/…` link.
2. Convenience and legacy forms 302 immediately to the canonical URL — the address bar always lands on canonical, so the URL a user copies is rename-stable and contains no workspace id for public apps.
3. Failure: unresolvable slug or id → the standard 404 surface ("Unknown app"), never a partial shell.
4. Failure: private app, no session → existing sign-in bounce, returning to the **canonical** URL.

### Flow: Renaming an app (slug change)
1. Author renames the app directory (`mv recipes cookbook`); reconcile moves the alias.
2. Old vanity links stop resolving (404); canonical `/a/<appId>` links keep working — the reason canonical is what the UI copies by default.
3. The fallback icon re-derives (new letter/color from the new slug) — expected, not a bug (D6 hashes the slug).

## Screens & States

### App icon (everywhere an app is listed: directory rows, future launcher, page favicon/header)
- Purpose: every app is visually identifiable with zero configuration (D6).
- Custom icon set in `app.yaml` → render it.
- No custom icon → fallback tile: first grapheme of the slug, uppercased, on the deterministic palette color (`appIconFallback(slug)` — same slug, same color, on every surface).
- States: broken/missing custom icon file → render the fallback (never a broken-image glyph); empty slug cannot occur (validation guarantees non-empty).

### URL bar / share affordances
- Copy-link affordances always emit the canonical URL. Vanity is for typing and reading, canonical is for durability.
- Loading/error states are the existing live-app shell states; this change alters addresses, not the shell chrome.

## Component Inventory

- Icon tile: shadcn/ui `Avatar`/`AvatarFallback` styled by `appIconFallback` from `packages/ui/src/apps/app-icon.ts` (new, dependency-free).
- 404 and sign-in surfaces: existing shell components, unchanged.

## Open Questions

None — D5/D6 settle the visible behavior; rename re-coloring is accepted per D6 (revisit condition recorded in tech-plan T7).

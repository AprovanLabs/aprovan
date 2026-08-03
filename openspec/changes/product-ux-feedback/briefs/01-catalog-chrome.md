# Brief: Catalog chrome — drop Open-the-app

## Mission
Remove the top-right “Open the app” CTA from the registry catalog. Credentials/admin must remain usable on the catalog alone (CredentialsHost / AdminHost), with no MovedNotice forcing chat.

## Read first
- `openspec/changes/product-ux-feedback/{prd,ux,tech-plan,tasks}.md` (in aprovan)
- `registry/apps/registry/src/components/shell/OpenAppLink.tsx`
- `registry/apps/registry/src/layouts/**` and any import of `OpenAppLink`
- `registry/apps/registry/src/pages/account/credentials.astro`
- `registry/apps/registry/src/pages/admin/permissions.astro`

## Tasks
- [ ] 1.1 Remove `OpenAppLink` from catalog shell/header layouts and delete or stop exporting the component.
- [ ] 1.2 Confirm `/account/credentials` and `/admin/permissions` remain live CredentialsHost/AdminHost (no MovedNotice). If stubs remain on the branch tip, restore standalone hosts.

## Acceptance criteria
#### Scenario: Header has no Open-the-app
- WHEN the catalog shell renders
- THEN no control labeled “Open the app” or “Open in app” appears in the top-right chrome

#### Scenario: Credentials page standalone
- WHEN a user opens `/account/credentials` on the catalog host with a valid catalog session
- THEN CredentialManager is interactive in-page and no MovedNotice redirects them to chat

## Verify
```bash
cd /Users/jacob/Documents/Code/AprovanLabs/registry
! rg -n "Open the app|OpenAppLink" apps/registry/src
pnpm --filter @aprovan/registry-web build
```

## Constraints
- Branch from `origin/main`: `pux/catalog-chrome`
- Do not modify packages outside `apps/registry/src/components/shell/**` and layouts/pages needed for 1.2
- Surgical; match existing style
- Open a PR when done; check off tasks in aprovan `openspec/changes/product-ux-feedback/tasks.md` (stream 1) via a small PR or report at `briefs/01-report.md` in the aprovan change (if you cannot edit aprovan, write report only under registry PR body)

## Report back
PR URL + what you verified.

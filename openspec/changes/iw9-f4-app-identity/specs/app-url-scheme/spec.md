# app-url-scheme — canonical, vanity, and convenience app URLs

Delta for iw9-f4-app-identity. Grounded in IW-9 decision D5.

## ADDED Requirements

### Requirement: Canonical app URLs
The platform SHALL serve apps at canonical URLs `/a/<appId>` (public/global app surface) and `/w/<wsId>/a/<installId>` (workspace-scoped install surface), where `<appId>`/`<installId>` are ULIDs. Canonical URLs SHALL be stable across slug renames. All sub-resources of today's live surface (`__project__`, `__sdk__.js`, `__sdk__.d.ts`, static files with SPA fallback) SHALL be reachable under the canonical prefixes with unchanged visibility gating.

#### Scenario: canonical URL survives rename
- **WHEN** an app is renamed and its canonical URL `/a/<appId>` is requested
- **THEN** the app page serves exactly as before the rename

#### Scenario: install surface is workspace-scoped
- **WHEN** `/w/<wsId>/a/<installId>` is requested for a valid install in that workspace
- **THEN** the install's app surface serves; a `<wsId>`/`<installId>` mismatch is 404

### Requirement: Vanity URLs resolve through slug indexes
The platform SHALL serve vanity URLs `/a/<globalSlug>` (resolved via the global slug claim registry) and `/w/<wsSlug>/a/<slug>` (resolved via a workspace-slug resolver plus the workspace alias index). A path segment that is a well-formed ULID SHALL be treated as an id; otherwise as a slug (the disjointness is guaranteed by app-slug's ULID-shape rejection). An unresolvable slug SHALL 404.

#### Scenario: global vanity resolves
- **WHEN** `/a/<globalSlug>` is requested for a claimed global slug
- **THEN** the surface of the claiming app serves (equivalent to its canonical URL)

#### Scenario: id/slug disambiguation
- **WHEN** the segment after `/a/` is a well-formed ULID
- **THEN** it is resolved as an appId and never consulted against slug indexes

### Requirement: Convenience path always 302s to canonical
`GET /apps/<slug>` (and every legacy `/apps/…` app-addressing form, including today's `/apps/<workspaceId>/<name>` and `/apps/id/<appId>` from `routes/live-apps.ts`) SHALL respond with a 302 redirect to the corresponding canonical URL. The convenience path SHALL never serve app content directly.

#### Scenario: convenience redirect
- **WHEN** `/apps/<slug>` is requested and the slug resolves
- **THEN** the response is a 302 whose Location is the canonical `/a/<appId>` (or `/w/<wsId>/a/<installId>`) URL

#### Scenario: legacy permalink redirects
- **WHEN** `/apps/id/<appId>` is requested
- **THEN** the response is a 302 to `/a/<appId>`

### Requirement: No workspace ids in public app URLs; no region segments
No route, generated link, shell config, or redirect target for a **public** app surface SHALL contain a workspace id (today `routes/live-apps.ts` serves `/apps/<workspaceId>/<name>` and bakes `liveBase`/`appBase` workspace-id URLs into the page shell — both leak). Workspace ids MAY appear only under the workspace-scoped `/w/<wsId>/…` form. No app URL SHALL contain a region segment (D21: region is an edge lookup, never an address).

#### Scenario: public shell carries no workspace id
- **WHEN** the HTML shell for `/a/<appId>` is rendered for a public app
- **THEN** no URL embedded in the page (bases, links, redirects) contains the hosting workspace id

#### Scenario: legacy leak closed
- **WHEN** the legacy `/apps/<workspaceId>/<name>` form is requested
- **THEN** the response is a 302 to a canonical URL that does not contain the workspace id

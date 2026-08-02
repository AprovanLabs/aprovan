# native-panel-polish — PRD

_IW-4 of the improve wave. Zero-context source of truth:
[docs/tasks/improve-findings.md](../../../docs/tasks/improve-findings.md) (§3 disposition
table and the IW-4 workstream entry are owner-settled — this change implements them, it does
not reopen them)._

## Problem

The native panels are functionally sound but read like an engineering console: the Agents
pane is a 1360-LOC wall of monospace identifiers that is hard to navigate, the Admin panel
looks like an MVP and has **zero** UI for the group→profile membership the server already
serves, the Credentials panel cannot show or manage profiles at all, and the Playground
surface duplicates the registry catalog's playground inside the product app where it doesn't
belong. Copy across all 12 surfaces is written for the people who built the plumbing, not the
people meant to use it.

## Users & Jobs

- **Workspace members** — hire the panels to answer "what is happening in my workspace"
  (agent runs, credentials, data) without needing to know namespace names, grant syntax, or
  run-ID formats.
- **Workspace admins** — hire the Admin panel to manage members, groups, and *which profiles
  a group can use* — the capability the server exposes at `/groups/:id/profiles` but no UI
  reaches today.
- **Agent/workflow authors** — hire the Agents pane to create and tune agent profiles and
  inspect executions; the backend dispatch chain (agents namespace → profiles → llm
  interface) already works and must keep working unchanged.
- **The owner** — hires this change so the product stops looking like an internal tool:
  compact, professional, consistent panels whose copy a non-engineer can read.

## Goals

- The `playground` native surface and its client library are deleted; the registry catalog's
  `/playground` (ephemeral credentials) is the only playground. A stale `native://playground`
  tab degrades gracefully instead of blanking.
- The Agents pane is navigable: profile list and profile detail are separate views, the
  editor is grouped into labeled sections, and executions keep their live-updating behavior.
  No change to the `agents`/`sandboxes` namespace calls it makes.
- The Admin panel exposes group→profile membership (list, attach with a picker, detach)
  against the existing `GET/POST/DELETE /groups/:id/profiles` routes, and degrades to an
  informative (non-error) state on deployments where profile storage answers 501.
- The Credentials panel surfaces profiles as first-class objects (the registry-server
  `ProfileRow` model): members can see them, admins can create/edit/delete them. The panel
  remains a thin wrapper over `@aprovan/registry-ui`.
- Every panel passes a copy/professionalism pass: shared conventions for density, empty
  states, and tone are written once (ux.md) and applied per panel.
- `NativePanelProps` is byte-identical before and after — this change is pure UX plus the
  minimal profile-CRUD product wiring; the panel/host contract does not move.

## Non-Goals

- **No app-model backend changes** — IW-1 (`app-model-split`) owns the App/AppInstallation
  split, the `apps` surface itself, and `SidebarApps` removal. This change only applies the
  panel conventions to the `apps` pane *after* IW-1 lands (a gated final work stream).
- **No editor/renderer work** — IW-2 (`editor-direct-edit`) owns renderer sizing, EditModal,
  and chat-history UX.
- **No new panels** beyond conformance work on IW-1's `apps` pane.
- **No registry catalog changes** — the catalog keeps `/playground` as-is; standalone
  credential hosting is IW-3 (`registry-standalone-credentials`).
- **No decision-7 legacy-profile migration** — the workspace's two older "profile" notions
  (credential labels in `credentials.ts`, named interface instances in `interfaces.ts`) are
  not migrated here; this change surfaces the structured `ProfileRow` model only.
- **No `NativePanelProps` or panel-host contract changes.**

## Capabilities

### New Capabilities

- `panel-conventions`: the shared UX contract for all native panels — density, states
  (loading/empty/error/unavailable), copy tone, and the stability guarantee on
  `NativePanelProps`; includes the gated conformance pass on IW-1's `apps` pane.
- `playground-removal`: deletion of the `playground` native surface and client compilation
  library; graceful degradation of stale tabs with a pointer to the catalog playground.
- `agents-pane`: the rebuilt Agents pane — profile list/detail, sectioned editor, executions
  view — over the unchanged agents dispatch chain.
- `admin-group-profiles`: group→profile membership UI in the Admin panel plus its
  professional rework, with 501 feature detection.
- `credential-profiles`: profiles surfaced in the Credentials panel (ProfileRow
  list/create/edit/delete) and the thin workspace `/profiles` CRUD routes that back it.

### Modified Capabilities

None — `openspec/specs/` is empty; this is a greenfield spec set.

## Constraints & Assumptions

**Constraints (settled by improve-findings):**

- The apps-pane portion hard-depends on IW-1 (`app-model-split`) shipping the `apps`
  `NativeSurfaceDef`; every other work stream is free and must not be blocked on it.
- Backend dispatch chains are load-bearing and unchanged: agents namespace → profiles → llm
  interface (Agents), `/groups/:id/profiles` + `/profiles` (Admin), `/credentials` CRUD
  (Credentials).
- `profileGrantsAvailable()` returns false (routes answer 501) on the interim dynamo
  backend — every profile UI feature-detects and degrades; it never renders a raw 501 error.
- `@aprovan/registry-ui` is a published package consumed by the registry catalog — profile
  UI lands there (not in `client/web`) so IW-3's standalone hosting reuses it; changes stay
  additive to its public API.

**Assumptions (flagged, not owner-confirmed):**

- Profile mutation is admin-only, profile listing is member-visible (mirrors registry-server
  HTTP semantics: GET open, POST/PATCH/DELETE `requireAdmin`).
- The workspace's `/profiles` router (currently admin-only, GET-only, summary-shaped) can be
  extended to full CRUD without breaking its one existing consumer (the admin attach picker).
- "Link out where useful" for the playground means the stale-tab notice links to the catalog
  playground; no permanent in-product playground link is added anywhere else.

## Open Questions

1. **Stale `native://playground` tabs: notice or silent close?** _Recommendation:_ render a
   one-card notice ("The playground moved to the registry catalog" + link) inside the dead
   tab rather than silently closing it — cheaper than tab-state surgery and it teaches the
   new location. Remove the fallback in a later cleanup.
2. **Should profile *grants to users/groups* be editable from the Credentials panel too, or
   only from Admin?** _Recommendation:_ only from Admin. Credentials owns the profile object
   (what it is); Admin owns who may use it. One write surface per concern.
3. **Agents pane naming: keep "Agents" with description copy explaining profiles, or rename
   the tab to "Agent profiles"?** _Recommendation:_ keep "Agents"; the profile concept is
   explained by the pane's own structure, and the sidebar row stays one word.

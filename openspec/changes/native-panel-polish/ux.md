# native-panel-polish — UX

This change is almost entirely UX. This document is the source of truth for the shared
panel conventions (applied to every surface) and the three rebuilt surfaces (Agents, Admin,
Credentials). The per-panel copy pass in tasks.md applies the conventions here; it does not
invent per-panel styles.

## Shared panel conventions

Every native panel (all `NATIVE_SURFACES` entries, including IW-1's `apps` once it lands)
follows these rules. They are enforced by the shared primitives in
`client/web/src/components/panels/shell.tsx` — a panel that needs a state or control the
shell doesn't have adds it to the shell, not locally.

### Density

- Chrome comes from `PanelShell` (header) and `PanelTabs` — never re-implemented.
- Rows are compact: list rows `py-1.5`/`text-xs`-`text-sm`, one line of primary text plus at
  most one line of secondary text. Detail lives behind a click, not in the row.
- Metadata chips (badges, mono identifiers) appear in detail views, not stacked in list rows.
  A list row shows at most two chips.
- No fixed `vh` heights inside panels; panels fill the pane and scroll internally.

### States (every panel implements all five)

| State | Rule |
|---|---|
| Loading | `PanelLoading` skeleton/spinner; never a blank pane. |
| Empty | `PanelEmpty` with two sentences max: what would appear here, and the one action that creates it (with the action button when the panel owns it). |
| Error | `PanelErrorWithRetry` — human message first, no raw status codes or stack text; the transport detail goes in a `title` tooltip if kept at all. |
| Unavailable | New shell primitive `PanelUnavailable` for feature-detected capability gaps (e.g. profile storage 501): calm explanatory card, not error styling. |
| Partial | In-flight work (OAuth pending, running executions) shows as a live row/badge, never blocks the rest of the panel. |

### Copy tone

- Sentence case everywhere; no trailing periods on labels; periods on full sentences.
- Lead with what the user gets, not what the system is. "Reusable AI workers with their own
  model, instructions, and permissions" — not "Named profiles workflows can run as".
- Internal identifiers (`agents.run`, `keyvalue.*`, namespace names, ULIDs) never appear in
  descriptions, empty states, or button labels. They may appear as *values* in mono styling
  where the identifier is the datum (a grant pattern, a profile name).
- Destructive actions are two-step in place (arm → confirm, the AgentsPanel pattern) — never
  `window.confirm`.
- Error copy: what failed + what to do next. Not "Failed to load members" but "Couldn't load
  members. Retry, or check your connection."

### Contract stability

`NativePanelProps` (`{ scope?: AppScope }`) and `PanelHostActions` are frozen. Shell changes
are additive exports only.

## Flows

### Flow: Stale playground tab (playground-removal)

1. User's persisted tab set contains `native://playground` after the surface is deleted.
2. The tab renders a single notice card: "The playground now lives in the registry catalog"
   with a link to the catalog playground and a "Close tab" action. No blank pane, no crash.
3. Sidebar and services menus no longer offer Playground anywhere.

### Flow: Create and tune an agent (agents-pane)

1. User opens Agents. Default view: profile list (name/title, model binding chip, one-line
   prompt preview). Empty state explains what an agent is and offers "New agent".
2. "New agent" opens the sectioned editor (see screen below) with only Name + Instructions
   required; everything else is collapsed under labeled sections with sensible defaults.
3. Save returns to the list; validation errors show inline on the failing field's section.
4. Clicking a profile opens its detail view: configuration summary (humanized), recent
   executions filtered to that agent, Edit and Delete (armed confirm) actions.
5. Failure paths: save conflict/validation → inline message, draft preserved; profile list
   load failure → error state with retry.

### Flow: Watch an execution (agents-pane)

1. User opens the Executions tab (badge = total). In-progress runs are grouped first with
   live elapsed time; history below, newest first.
2. Clicking a run expands the drill-down: status, timing, humanized agent config, turns
   (assistant/tool/thinking), output, usage/cost. Live runs keep polling (existing 4s
   cadence) while expanded.
3. Workflow-attributed runs without native turn detail explain that inline ("This run was
   recorded by a workflow — open its trace for step detail") instead of erroring.

### Flow: Grant a group access to a profile (admin-group-profiles)

1. Admin opens Admin → Groups, selects a group. The detail view shows two sections:
   People and Profiles.
2. Profiles section lists attached profiles (name, target, credential label) from
   `GET /groups/:id/profiles`.
3. "Attach profile" opens a picker fed by `GET /profiles`; choosing one POSTs and the list
   updates. Attach is idempotent — re-attaching is a no-op, not an error.
4. Detach is an armed-confirm row action (DELETE).
5. On a deployment where profile storage is unavailable (501): the Profiles section renders
   the Unavailable state ("Profiles aren't available on this deployment yet") and the attach
   action is hidden. Members/groups management is unaffected.
6. Non-admins never see the Admin entry point; a deep link renders the standard
   not-authorized state.

### Flow: Manage credential profiles (credential-profiles)

1. User opens Credentials. The panel now has two tabs: Credentials (existing manager) and
   Profiles.
2. Profiles tab lists workspace profiles (name, target interface/provider, pinned credential
   label, limits summary). Members see the list read-only.
3. Admin clicks "New profile": form with target picker (interface or provider), executing
   provider (interface targets only), credential picker (existing credentials; optional),
   options (key/value), limits (rps/burst/daily budget). Edit reuses the same form; delete
   is armed-confirm.
4. Unavailable path: on 501 the Profiles tab renders the Unavailable state; the Credentials
   tab is unaffected.
5. Error paths: list failure → retry state; save failure → inline message, draft preserved.

### Flow: Per-panel copy pass (all remaining panels)

1. Each remaining panel (Data, Webhooks, Notifications, Sessions, Interfaces, Sync,
   Sandboxes, Activity) keeps its structure and data flow.
2. Its header description, empty states, error messages, button labels, and helper text are
   rewritten to the copy tone above; densities and states are brought onto the shared
   primitives where they drifted.
3. The sidebar registry (`native-surfaces.tsx`) descriptions are rewritten in the same pass
   (they are the row tooltips and pane subtitles).

## Screens & States

### Agents — profile list

- Purpose: scan and enter agent profiles.
- Elements: "New agent" action in the shell header actions slot; compact rows (display name
  primary, model chip + prompt preview secondary); click-through to detail.
- States: loading skeleton; empty ("Agents are reusable AI workers… Create your first
  agent"); error + retry.

### Agents — profile detail & editor

- Purpose: one profile's full story; create/edit without a wall of fields.
- Editor sections (labeled, collapsed unless populated): **Basics** (name, display name),
  **Model** (LLM binding picked from the workspace's configured interfaces — a select fed by
  the same source the Interfaces panel shows, with free-text fallback; candidates; effort;
  cost/deadline limits), **Instructions** (prompt), **Access** (tool patterns, path grants —
  mono inputs with plain-language section intro "Leave empty for full access; adding entries
  narrows what this agent may touch"), **Files** (mounts).
- States: saving (buttons disabled + spinner), inline validation error per section, armed
  delete.

### Agents — executions

- Purpose: live and historical runs (agent + sandbox merged, existing behavior).
- Elements: agent filter chips; In-progress group with live dot + ticking elapsed; History
  group; expandable rows with the drill-down.
- States: empty ("Runs appear here when a workflow or agent starts working"); polling
  continues only while non-terminal runs exist and the tab is visible (existing discipline);
  detail-fetch failure explained inline.

### Admin — members / groups / access

- Purpose: workspace administration that doesn't look like an MVP.
- Elements: `PanelTabs`-style tabs (Members, Groups, Access); dense tables (no
  Card-per-concept nesting); group detail as master-detail (list left, selected group right)
  with People and Profiles sections; armed-confirm destructive actions; attach-profile
  picker.
- States: checking-permissions (spinner), not-authorized card, per-section loading/empty/
  error+retry, Profiles section Unavailable on 501.

### Credentials — credentials / profiles

- Purpose: existing credential manager plus first-class profiles.
- Elements: two tabs; existing `CredentialManager` grid (copy pass only: header, empty
  states, revoke confirm moves off `window.confirm`); Profiles tab per the flow above.
- States: as today for credentials (loading skeletons, OAuth-pending card, empty, error);
  Profiles adds Unavailable.

### Stale playground tab

- Purpose: graceful landing for a removed surface.
- Elements: one card — title, one sentence, link to catalog playground, close-tab action.
- States: static.

## Component Inventory

- Shell primitives (`panels/shell.tsx`): `PanelShell`, `PanelTabs`, `PanelLoading`,
  `PanelEmpty`, `PanelErrorWithRetry`, `relativeTime`, plus **new additive** exports:
  `PanelUnavailable` (calm capability-gap card) and `ArmedButton` (two-step destructive
  action, extracted from AgentsPanel's pattern).
- Agents pane: decomposed into `panels/agents/` (list, detail, editor, executions) using
  shadcn `Button`, `Input`, `Badge`, native `select` per existing panel style.
- Admin + Credentials profile UI live in `@aprovan/registry-ui` (`src/admin/`,
  `src/credentials/`) using `@aprovan/ui` primitives (`Card`, `Button`, `Input`, `Badge`,
  `Table`-style markup) — the client wrappers stay thin.
- No new one-off components outside these; no new dependencies.

## Open Questions

1. **Admin third tab label**: "Tool grants" is engineering copy; "Access" is proposed.
   _Recommendation:_ "Access" — it will also be where per-user grants land later.
2. **Profiles tab visibility for members**: show read-only, or hide entirely for
   non-admins? _Recommendation:_ show read-only — members need to know which profiles exist
   to reference them from workflows/agents.
3. **Model binding select fallback**: when the interfaces listing is empty/unreachable,
   fall back to free-text input (current behavior) or block creation?
   _Recommendation:_ free-text fallback with helper text, so agent creation never
   hard-depends on another panel's data loading.

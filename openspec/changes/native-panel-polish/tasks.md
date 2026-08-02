# native-panel-polish — Tasks

_IW-4. Free streams (1–8) have no dependency on IW-1 (`app-model-split`); only stream 9 is
gated on it. Repo path: `~/Documents/Code/AprovanLabs/aprovan`. The panel/host contract
(`NativePanelProps`, `PanelHostActions` in `client/web/src/components/panels/shell.tsx`) is
frozen — every client stream re-verifies it. ux.md "Shared panel conventions" is the
checklist for every copy/state task._

## 1. Playground surface removal

> Depends-on: - | Touches: client/web/src/lib/native-surfaces.tsx, client/web/src/lib/playground.ts, client/web/src/components/panels/PlaygroundPanel.tsx, client/web/src/features/tabs/** | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web typecheck && pnpm --filter @aprovan/patchwork-web build

- [ ] 1.1 Remove the `playground` entry from `NATIVE_SURFACES`; delete
      `client/web/src/components/panels/PlaygroundPanel.tsx` and
      `client/web/src/lib/playground.ts`; drop deps that existed only for them (e.g.
      `sucrase`) — specs: playground-removal "surface is removed".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! git grep -q "PlaygroundPanel\|lib/playground" -- client/web/src && pnpm --filter @aprovan/patchwork-web typecheck`
- [ ] 1.2 Add the graceful fallback for unresolvable `native://<id>` tab keys where native
      tabs render: a notice card (close-tab action; for the `playground` id, copy + link to
      the registry catalog playground) — specs: playground-removal "Stale playground tabs",
      "Unknown native ids never crash"; ux.md "Stale playground tab".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec vitest run --passWithNoTests src/features/tabs && pnpm --filter @aprovan/patchwork-web build`
- [ ] 1.3 Add a unit test covering the fallback: unknown native id renders the notice (not
      a crash/blank), playground id includes the catalog link.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec vitest run src/features/tabs`

## 2. Panel conventions: shell primitives + registry copy

> Depends-on: 1 | Touches: client/web/src/components/panels/shell.tsx, client/web/src/lib/native-surfaces.tsx | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web typecheck && git grep -n "scope?: AppScope" client/web/src/components/panels/shell.tsx

- [ ] 2.1 Add `PanelUnavailable` (calm capability-gap card, non-error styling) and
      `ArmedButton` (two-step destructive control, 3s disarm, extracted from AgentsPanel's
      arm pattern) to `shell.tsx` as additive exports — tech-plan D2, Interfaces "Shell
      additive exports"; specs: panel-conventions "Capability gaps are not errors",
      "Destructive actions are armed".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web typecheck`
- [ ] 2.2 Rewrite the 11 remaining `NATIVE_SURFACES` titles/descriptions to the ux.md copy
      tone (no dotted identifiers, benefit-first, sentence case) — specs: panel-conventions
      "Surface descriptions read as product copy".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! grep -E "description: .*[a-z]+\.[a-z]+\(|description: .*\.run|description: .*namespace" client/web/src/lib/native-surfaces.tsx && pnpm --filter @aprovan/patchwork-web typecheck`
- [ ] 2.3 Confirm the contract freeze: `NativePanelProps` and `PanelHostActions`
      declarations are byte-identical to pre-change — specs: panel-conventions "Contract
      unchanged".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && git diff main -- client/web/src/components/panels/shell.tsx | grep -E "^[-+].*(NativePanelProps|PanelHostActions|onOpenSession|onOpenFile|onOpenCredentials|scope\?)" | wc -l | grep -q "^0$"`

## 3. Workspace profile CRUD routes

> Depends-on: - | Touches: server/workspace/src/routes/profiles.ts, server/workspace/src/routes/groups.ts, server/workspace/src/app.ts, server/workspace/src/profile-grants.ts, server/workspace/src/**/*.test.ts | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace typecheck && pnpm --filter @aprovan/workspace test

- [ ] 3.1 Create `routes/profiles.ts`: move `workspaceProfilesRouter` out of `groups.ts` and
      extend to full CRUD over `@aprovan/registry-server`'s `ProfileService` (constructed on
      `getRegistryStorage()`): `GET /profiles` (any member; `ProfileWire` = ProfileRow +
      `credentialLabel`), `POST`/`PATCH /:id`/`DELETE /:id` (requireAdmin); all gated by
      `profileGrantsAvailable()` → existing 501 message; `ServiceError` statuses pass
      through; no credential payload in any response — specs: credential-profiles "workspace
      serves profile CRUD" (all scenarios); tech-plan D4 + Interfaces.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace typecheck`
- [ ] 3.2 Keep the admin attach picker green: `GET /profiles` response remains a superset of
      the old summary shape (or `groups.ts` picker call sites updated); `/groups/:id/profiles`
      routes untouched.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test -- --reporter=dot`
- [ ] 3.3 Route tests (sqlite backend): admin create→patch→delete round-trip with
      credentialLabel and without payload leakage; member GET 200 + member POST rejected;
      forced dynamo backend → 501 on every route — specs: credential-profiles scenarios
      "Admin round-trips a profile", "Members read, only admins write", "Unavailable backend
      answers 501".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/workspace test`

## 4. Agents pane rebuild

> Depends-on: 2 | Touches: client/web/src/components/panels/AgentsPanel.tsx, client/web/src/components/panels/agents/** | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web typecheck && pnpm --filter @aprovan/patchwork-web build

- [ ] 4.1 Decompose into `panels/agents/{index,ProfileList,ProfileDetail,ProfileEditor,
      Executions}.tsx`: data ownership (usePanelData, poll timers, merge/normalize) stays in
      `index`, children are presentation-only; `AgentsPanel.tsx` re-exports — tech-plan D3.
      Port `handleSave` payload normalization (null-clears on update) verbatim with a unit
      test asserting create/update/clear payload shapes BEFORE restyling — specs:
      agents-pane "dispatch chain is unchanged".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec vitest run src/components/panels/agents`
- [ ] 4.2 Profile list + detail: compact two-line rows (name, model chip, prompt preview);
      click-through detail with humanized config, that agent's recent executions, edit +
      `ArmedButton` delete — specs: agents-pane "separates list, detail, and editor" (both
      scenarios); ux.md "Agents — profile list/detail".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web build`
- [ ] 4.3 Sectioned editor (Basics / Model / Instructions / Access / Files): only name +
      instructions prominent; Model section picks the LLM binding from the workspace's
      configured interface instances with free-text fallback; Access intro copy per ux.md;
      inline per-section validation errors — specs: agents-pane "editor is sectioned and
      guided" (both scenarios).
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web typecheck`
- [ ] 4.4 Executions view: keep merged listing, grouping, filter chips, expand drill-down,
      poll-while-visible discipline; humanize drill-down copy incl. the workflow-run
      no-detail explanation — specs: agents-pane "keeps live behavior" (both scenarios).
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web build`

## 5. Credential profiles UI (registry-ui + wrapper)

> Depends-on: 2, 3 | Touches: packages/registry-ui/src/credentials/**, packages/registry-ui/src/index.tsx, client/web/src/components/panels/CredentialsPanel.tsx | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-ui build && pnpm --filter @aprovan/registry-ui test && pnpm --filter @aprovan/patchwork-web build

- [ ] 5.1 Add `credentials/ProfilesSection` + profile form to registry-ui (injected
      `GatewayClient`; list with name/target/credential label/limits summary; admin-gated
      create/edit/delete with `canManage`; armed delete; target picker, executing provider
      for interface targets, credential picker, options, limits) and the shared
      `isUnavailable()` 501 detector; export additively — specs: credential-profiles
      "Credentials panel surfaces profiles", "Profile UI lives in registry-ui"; tech-plan
      D5/D6 + Interfaces.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-ui build && pnpm --filter @aprovan/registry-ui test`
- [ ] 5.2 Copy pass on `CredentialManager`/`AddCredentialForm`: ux.md tone, revoke moves
      from `window.confirm` to the armed pattern, empty/error states per conventions —
      specs: panel-conventions "Destructive actions are armed".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! grep -rn "confirm(" packages/registry-ui/src/credentials --include="*.tsx" | grep -v test && pnpm --filter @aprovan/registry-ui test`
- [ ] 5.3 `CredentialsPanel.tsx`: compose two tabs (Credentials | Profiles) from registry-ui
      exports; wrapper stays wiring-only (client, OAuth redirect, prefill) — specs:
      credential-profiles "Wrapper stays thin"; Profiles tab renders `PanelUnavailable` on
      `isUnavailable` — ux.md flow step 4.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web build && [ "$(wc -l < client/web/src/components/panels/CredentialsPanel.tsx)" -lt 120 ]`
- [ ] 5.4 Unit tests (mocked client): member sees read-only list; admin create round-trip;
      501 renders unavailable card — specs: credential-profiles scenarios.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-ui test`

## 6. Admin panel rework + group profiles

> Depends-on: 2, 3 | Touches: packages/registry-ui/src/admin/**, client/web/src/components/panels/AdminPermissionsPanel.tsx | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-ui build && pnpm --filter @aprovan/registry-ui test && pnpm --filter @aprovan/patchwork-web build

- [ ] 6.1 Add group-profile client functions to `admin/api.ts`
      (`listGroupProfiles`/`attachGroupProfile`/`detachGroupProfile`/`listWorkspaceProfiles`)
      per tech-plan Interfaces; types for `GroupProfileSummary`.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-ui build`
- [ ] 6.2 Group detail gains the Profiles section: attached list (name/target/credential
      label), attach picker fed by `GET /profiles`, idempotent attach, armed detach; 501 →
      unavailable card, attach hidden, rest of panel unaffected — specs:
      admin-group-profiles "Group detail exposes profile membership" (both scenarios),
      "feature-detect the storage backend".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-ui test`
- [ ] 6.3 Rework `AdminPanel` presentation: tabs Members / Groups / Access (rename per ux.md
      OQ1), dense tables over nested cards, master-detail groups, armed destructive actions
      everywhere, conventions copy + not-authorized card; same routes/payloads (props
      signature `{ client }` unchanged) — specs: admin-group-profiles "professional and
      dense" (both scenarios).
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! grep -rn "confirm(" packages/registry-ui/src/admin --include="*.tsx" | grep -v test && pnpm --filter @aprovan/registry-ui build`
- [ ] 6.4 Unit tests (mocked client): attach/detach round-trip, 501 degradation, armed
      revoke — specs: admin-group-profiles scenarios.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-ui test`

**Path conflict note:** stream 5 owns `packages/registry-ui/src/index.tsx` and
`src/credentials/**`; stream 6 must not edit those (AdminPanel is already exported). Both
may run in parallel otherwise.

## 7. Copy pass A — data & pipelines panels

> Depends-on: 2 | Touches: client/web/src/components/panels/KeyValuePanel.tsx, client/web/src/components/panels/SyncPanel.tsx, client/web/src/components/panels/SandboxesPanel.tsx, client/web/src/components/panels/InterfacesPanel.tsx | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web typecheck && pnpm --filter @aprovan/patchwork-web build

- [ ] 7.1 KeyValuePanel (Data): descriptions, empty/error states, labels to ux.md tone;
      density + states onto shell primitives; destructive actions → `ArmedButton` — specs:
      panel-conventions (all requirements).
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! grep -n "confirm(" client/web/src/components/panels/KeyValuePanel.tsx && pnpm --filter @aprovan/patchwork-web typecheck`
- [ ] 7.2 SyncPanel: same pass.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! grep -n "confirm(" client/web/src/components/panels/SyncPanel.tsx && pnpm --filter @aprovan/patchwork-web typecheck`
- [ ] 7.3 SandboxesPanel: same pass (largest of the four — keep structure, restyle copy/
      states only).
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! grep -n "confirm(" client/web/src/components/panels/SandboxesPanel.tsx && pnpm --filter @aprovan/patchwork-web typecheck`
- [ ] 7.4 InterfacesPanel: same pass (labels already improved by `interface-labeling` — do
      not regress `def.label` titling).
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec vitest run src/lib/namespaces.test.ts && pnpm --filter @aprovan/patchwork-web typecheck`

## 8. Copy pass B — activity & delivery panels

> Depends-on: 2 | Touches: client/web/src/components/panels/NotificationsPanel.tsx, client/web/src/components/panels/TelemetryPanel.tsx, client/web/src/components/panels/WebhooksPanel.tsx, client/web/src/components/panels/SessionsPanel.tsx | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web typecheck && pnpm --filter @aprovan/patchwork-web build

- [ ] 8.1 NotificationsPanel: ux.md pass (copy, states, density, armed destructive actions).
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! grep -n "confirm(" client/web/src/components/panels/NotificationsPanel.tsx && pnpm --filter @aprovan/patchwork-web typecheck`
- [ ] 8.2 TelemetryPanel (Activity): same pass.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! grep -n "confirm(" client/web/src/components/panels/TelemetryPanel.tsx && pnpm --filter @aprovan/patchwork-web typecheck`
- [ ] 8.3 WebhooksPanel: same pass.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! grep -n "confirm(" client/web/src/components/panels/WebhooksPanel.tsx && pnpm --filter @aprovan/patchwork-web typecheck`
- [ ] 8.4 SessionsPanel: same pass (presentation/copy only — session semantics are IW-2's).
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && ! grep -n "confirm(" client/web/src/components/panels/SessionsPanel.tsx && pnpm --filter @aprovan/patchwork-web typecheck`

## 9. Apps pane conformance (GATED on IW-1)

> Depends-on: 2, EXTERNAL app-model-split | Touches: client/web/src/components/panels/AppsPanel.tsx (path per IW-1) | Verify: cd ~/Documents/Code/AprovanLabs/aprovan && git grep -q '"apps"' client/web/src/lib/native-surfaces.tsx && pnpm --filter @aprovan/patchwork-web typecheck && pnpm --filter @aprovan/patchwork-web build

- [ ] 9.1 Preflight: verify IW-1 landed — `NATIVE_SURFACES` contains an `apps` entry with a
      panel component; record its actual file path and substitute it in this stream.
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && git grep -n '"apps"' client/web/src/lib/native-surfaces.tsx`
- [ ] 9.2 Apply the panel conventions to the apps pane: shell primitives, four states, copy
      tone, armed destructive actions — presentation only, no change to IW-1's data
      contracts — specs: panel-conventions "The apps pane conforms once it exists".
      Verify: `cd ~/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web build`

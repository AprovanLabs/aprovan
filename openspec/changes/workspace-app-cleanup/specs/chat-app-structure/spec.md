## ADDED Requirements

### Requirement: Composition root is thin
`client/web/src/pages/ChatPage.tsx` SHALL contain only context providers, top-level layout
composition, and wiring of feature hooks/components — no state, effects, or business logic
that a feature module could own instead.

#### Scenario: Composition root line count
- **WHEN** the decomposition work streams in `tasks.md` are complete
- **THEN** `client/web/src/pages/ChatPage.tsx` SHALL be no more than 300 lines of code

### Requirement: Extracted feature modules stay small
New files created by decomposing `ChatPage.tsx` SHALL each have a single named
responsibility and SHALL NOT exceed approximately 500 lines of code. This cap applies only
to modules newly created by this change, not retroactively to pre-existing files (e.g. the
nine native panels, which are explicitly out of scope).

#### Scenario: New module size cap
- **WHEN** a new file is created under `client/web/src/features/**` or
  `client/web/src/contexts/**` as part of this change
- **THEN** it SHALL NOT exceed ~500 lines of code

### Requirement: Tab namespace routing behavior is preserved
The `native://`, `app://`, and `workflow://` tab-path scheme SHALL resolve to the same
panel/component mapping and re-keying behavior after extraction as before it.

#### Scenario: Native, app, and workflow tabs resolve identically
- **WHEN** a tab is opened with a path prefixed `native://`, `app://`, or `workflow://`
- **THEN** it SHALL dispatch to the same target (native surface panel, `AppsPanel`, or
  `WorkflowDetail` respectively) as it did before the decomposition

#### Scenario: Navigating from an app to its workflow re-keys the tab in place
- **WHEN** a user opens a workflow belonging to an already-open app tab
- **THEN** the existing tab SHALL be re-keyed to the workflow's path (via the equivalent of
  `retitleAppsTab`) rather than a second tab being opened

### Requirement: Widget self-heal budget and gating are preserved
The self-heal loop SHALL retain its exact auto-fix budget and gating behavior after being
extracted into its own module.

#### Scenario: At most two automatic fix attempts per failing message
- **WHEN** a widget mounted from a given assistant message throws an error
- **THEN** the self-heal loop SHALL automatically send at most 2 follow-up fix requests for
  that message id, and SHALL NOT send a third

#### Scenario: Auto-fix only fires for the current send window
- **WHEN** the chat is not in `status === "ready"`, or the failing message was not produced
  within the current user-initiated send window
- **THEN** the self-heal loop SHALL NOT automatically send a fix request

#### Scenario: A real user-sent message re-arms the self-heal window
- **WHEN** the user submits a new message via the composer
- **THEN** the self-heal send-window and per-message auto-fix tracking SHALL reset/arm
  exactly as it did before extraction

### Requirement: Native panels remain untouched and self-contained
The nine native panels SHALL remain out of scope for this change; only the code in
`ChatPage.tsx` that hosts them SHALL move.

#### Scenario: Panel files are not modified
- **WHEN** this change's work streams execute
- **THEN** none of `client/web/src/components/panels/{AgentsPanel,SandboxesPanel,
  InterfacesPanel,WebhooksPanel,SessionsPanel,KeyValuePanel,TelemetryPanel,SyncPanel,
  NotificationsPanel}.tsx` SHALL be modified

#### Scenario: Panels remain hosted only through the shared shell
- **WHEN** a native panel is displayed
- **THEN** it SHALL continue to be mounted exclusively via `PanelHostProvider`/`PanelTabs`
  from `client/web/src/components/panels/shell.tsx`, with no panel-specific logic
  duplicated into the new feature modules

### Requirement: Session bar's presentational contract is unchanged
`SessionBar.tsx` SHALL continue to receive all session mutations as callback props (no
internal state or direct data-layer calls added to it), preserving its documented
"pure presentation" role.

#### Scenario: SessionBar props are unchanged in shape
- **WHEN** session state/orchestration is extracted into a new hook
- **THEN** the props passed to `<SessionBar />` SHALL match its existing prop contract
  (same callback names and signatures), requiring no changes inside `SessionBar.tsx` itself

### Requirement: Decomposition does not touch WS-1 deletion targets
Work streams in this change SHALL NOT modify any path reserved for WS-1 (`purge-dead-code`).

#### Scenario: No writes under WS-1's paths
- **WHEN** any task in this change's `tasks.md` executes
- **THEN** it SHALL NOT modify files under `packages/bobbin/**`, `packages/mcp-app-server/**`,
  or `packages/compiler/src/vfs/**`

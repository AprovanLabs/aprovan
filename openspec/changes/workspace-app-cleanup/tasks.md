Reference line numbers below are from `client/web/src/pages/ChatPage.tsx` at the start of
this change (commit `ca7ecc9`) — re-locate by symbol name if the file has since shifted.
Every extraction stream (3–9) only **creates new files** under `client/web/src/features/**`
or `client/web/src/contexts/**` — none of them edit `ChatPage.tsx` itself, so they cannot
conflict with each other. Only work stream 11 edits `ChatPage.tsx`, and it depends on all of
them, per `tech-plan.md`'s Rollout section.

## 1. Rebrand: root package name, README, workspace globs

> Depends-on: - | Touches: package.json, README.md, pnpm-workspace.yaml | Verify: `grep -q '"name": "@aprovan/workspace"' package.json && ! grep -q "apps/\*\*" pnpm-workspace.yaml && ! head -1 README.md | grep -q '^# patchwork$' && pnpm install --frozen-lockfile`

- [x] 1.1 Rename root `package.json` `"name"` from `@aprovan/patchwork-workspace` to
      `@aprovan/workspace` (confirm this exact target with the user first — PRD Open
      Question 1; it is unreferenced by any dependent per the repo-wide grep already run, so
      the rename is safe to apply directly). Satisfies `specs/repo-identity` Requirement
      "Root package name reflects the aprovan product repo".
- [x] 1.2 Remove the dead `apps/**` glob from `pnpm-workspace.yaml`, keeping `client/**` and
      `packages/**`. Satisfies `specs/repo-identity` Requirement "Workspace package globs
      match the actual package layout".
- [x] 1.3 Update `README.md`'s title (currently `# patchwork`) and opening description to
      identify the repo as the aprovan product repo. Leave the "## Architecture" section's
      per-package descriptions (`@aprovan/patchwork`, `@aprovan/patchwork-mcp`,
      `@aprovan/patchwork-web`, etc.) intact and accurate — those packages are not renamed by
      this change (PRD Non-Goals). Satisfies `specs/repo-identity` Requirement "README
      framing matches the repo's role".
- [x] 1.4 Run `pnpm install --frozen-lockfile` to confirm the rename doesn't require a
      lockfile update (root package is `"private": true` and not a workspace dependency
      target).

## 2. Shared contexts scaffold

> Depends-on: - | Touches: client/web/src/contexts/** | Verify: `pnpm --filter @aprovan/patchwork-web build`

- [x] 2.1 Create `client/web/src/contexts/patchwork-context.tsx`: move the
      `PatchworkContext` interface, `PatchworkCtx` context object, `useCompiler()`, and
      `useServices()` hooks verbatim from `ChatPage.tsx` L140–150. `ChatPage.tsx` is NOT
      edited yet — this is additive only.
- [x] 2.2 Create `client/web/src/contexts/shared-edit-session-context.tsx`: move
      `SharedEditSessionCtx` and `useSharedEditSession()` verbatim from L204–215.
- [x] 2.3 Create `client/web/src/contexts/widget-error-reporter-context.tsx`: move the
      `WidgetFailure` interface and `WidgetErrorReporterCtx` context object verbatim from
      L217–245 (the `MAX_WIDGET_AUTOFIXES` constant moves with it since it's part of the
      self-heal contract these types describe — re-export it from here for
      `features/self-heal` to import).
- [x] 2.4 Add a barrel `client/web/src/contexts/index.ts` re-exporting all three.

## 3. Tab routing & tab host

> Depends-on: 2 | Touches: client/web/src/features/tabs/** | Verify: `pnpm --filter @aprovan/patchwork-web build`

- [x] 3.1 Create `client/web/src/features/tabs/tab-routing.ts`: move
      `APP_TAB_PREFIX`/`WORKFLOW_TAB_PREFIX` (L747–748), `isAppsTabPath` (L750–751),
      `isVirtualTabPath` (L755–756), `appsTabPath` (L759–763), `parseAppsTabPath`
      (L766–779), `OpenTab` interface, `tabLabel` (L791–797) verbatim, importing
      `NATIVE_TAB_PREFIX`/`parseNativeTabPath` from `@/lib/native-surfaces` as today. Pure
      functions, no React. Satisfies `specs/chat-app-structure` Requirement "Tab namespace
      routing behavior is preserved".
- [x] 3.2 Create `client/web/src/features/tabs/useTabs.ts`: a hook that owns `openTabs`,
      `activeTabPath`, `previewCollapsed`, tab persistence (`TABS_KEY_PREFIX`,
      `ACTIVE_WORKSPACE_KEY`, `getTabsStorageKey`, `loadPersistedTabState`,
      `persistTabState`, L654–681), and the action functions `openAppsTab` (L1518–1530),
      `openNativeTab` (L1533–1544), `retitleAppsTab` (L1554–1571). Match the hook signature
      in `tech-plan.md`'s Interfaces & Data section.
- [x] 3.3 Create `client/web/src/features/tabs/TabContent.tsx`: the render-dispatch IIFE
      currently at L2786–2915 that picks native panel vs `AppsPanel` vs `CodePreview` per
      active tab, plus the tab-strip icon dispatch at L2680–2721. Import `useCompiler` from
      `@/contexts`.

## 4. Compiler bootstrap & widget pipeline

> Depends-on: 2 | Touches: client/web/src/features/widgets/** | Verify: `pnpm --filter @aprovan/patchwork-web build`

- [x] 4.1 Create `client/web/src/features/widgets/useCompilerBootstrap.ts`: move the
      `createCompiler({...})` setup and `imagePromptsRef` seeding from the mount effect at
      L1111–1216 (constants `IMAGE_SPEC`, `IMAGE_CDN_URL`, `WIDGET_CDN_URL`, `PROXY_URL`,
      `COMPILE_TIMEOUT_MS` from L577–595 move with it), returning `{ compiler,
      compilerError, namespaces, services }` for `ChatPage.tsx` to feed into
      `PatchworkCtx.Provider`.
- [x] 4.2 Create `client/web/src/features/widgets/ChatArtifactBlock.tsx`: move verbatim from
      L252–290 (non-widget fenced-block renderer using `resolveRenderer`).
- [x] 4.3 Create `client/web/src/features/widgets/ChatWorkflowPreview.tsx`: move
      `ChatWorkflowPreview` (L171–190), `workflowCustomPreview` (L192–196), and
      `loadWorkflowScript` (L201–202) verbatim.
- [x] 4.4 Create `client/web/src/features/widgets/NotificationPathWidget.tsx`: move
      `NOTIFICATION_IMPORT_RE` and `NotificationPathWidget` verbatim from L799–845.
- [x] 4.5 Create `client/web/src/features/widgets/createPreviewManifest.ts`: move
      `createPreviewManifest()` verbatim from L152–160 (consumed by both the main preview
      pane and the edit-modal's standalone compile check).

## 5. Widget self-heal loop

> Depends-on: 2 | Touches: client/web/src/features/self-heal/** | Verify: `pnpm --filter @aprovan/patchwork-web build`

- [x] 5.1 Create `client/web/src/features/self-heal/useWidgetSelfHeal.ts` matching the
      signature in `tech-plan.md`'s Interfaces & Data section. Move: state
      `widgetFailuresRef`/`autoFixRespondedRef`/`autoFixChainRef`/`userSentThisWindowRef`/
      `widgetFailureTick` (L2240–2246), `reportWidgetError` (L2248–2254), the session-switch
      reset effect (L2257–2262), and the orchestrator effect (L2463–2489) verbatim. Expose
      `armSendWindow()` covering what today happens inline at L2518–2521 inside
      `handleSubmit`. Import `MAX_WIDGET_AUTOFIXES` and `WidgetFailure` from
      `@/contexts/widget-error-reporter-context`.
- [x] 5.2 Verify the budget and gating logic is copied byte-for-byte, not reimplemented —
      this is the one extraction with real behavioral subtlety (see `tech-plan.md` D2 and
      the Risks section). Satisfies `specs/chat-app-structure` Requirement "Widget self-heal
      budget and gating are preserved" (all three scenarios).

## 6. Sidebar / workspace explorer

> Depends-on: 2 | Touches: client/web/src/features/sidebar/** | Verify: `pnpm --filter @aprovan/patchwork-web build`

- [x] 6.1 Create `client/web/src/features/sidebar/useWorkspaceExplorer.ts`: move
      `workspaceFiles`/`workspaceActivePath`/`workspaceLoading`/`workspaceError`/
      `activeWorkspaceId` state (L853–859), `refreshWorkspace` (L1031–1043), the
      workspace-change subscription effect (L1045–1095), the boot-load effect (L1099–1109),
      `deleteWorkspaceEntry` (L1023–1029), `createWorkspaceFile` (L1498–1513),
      `pinnedPaths`/`togglePin` (L927–949).
- [x] 6.2 Create `client/web/src/features/sidebar/WorkspaceSidebar.tsx`: move the
      `MobileDrawer`-wrapped `WorkspaceTree` + `SidebarApps` composition from L2619–2664, and
      `openWorkspacePreview` (L1444–1491) / `openWorkspaceSession` (L1424–1442) as the
      callbacks it wires to tree/apps row clicks.

## 7. Session & draft orchestration

> Depends-on: 2 | Touches: client/web/src/features/sessions/** | Verify: `pnpm --filter @aprovan/patchwork-web build`

- [x] 7.1 Create `client/web/src/features/sessions/useSessionOrchestration.ts` matching the
      signature in `tech-plan.md`'s Interfaces & Data section. Move: `sessions`/
      `activeSession`/`sessionChat`/`sessionBusy`/`sessionNotice`/`peers`/`syncState`/
      `mergeState` state (L1816–1837), `applySession` (L1840–1847), `refreshSessions`
      (L1849–1856), `openSession` (L1858–1870), `enterMainState` (L1878–1884),
      `startSession` (L1886–1898), `runSessionAction` (L1900–1908), the boot/restore effect
      (L1913–1933), and all `handle*` action handlers (L1935–2132: `handleNewSession`,
      `handleSwitchSession`, `finalizeApply`, `handleApplySession`, `handleDiscardSession`,
      `handleResetSession`, `handleDeleteSession`, `handleSyncSession`,
      `handleMergeResolved`, `runMergeCompletion`, `handleSessionModeChange`,
      `handleOpenSessionWindow`, `handleNotificationAction`). Ensure the returned
      `handlers` object's prop names exactly match what `<SessionBar />` currently receives
      — satisfies `specs/chat-app-structure` Requirement "Session bar's presentational
      contract is unchanged".
- [x] 7.2 Create `client/web/src/features/sessions/useEditDraft.ts`: move `editSession`/
      `editDraft`/`keepEditDrafts` state (L872–892), `beginEditDraft` (L1274–1293),
      `finishEditDraft` (L1295–1382), `openSharedEditSession` (L1384–1422). This is what
      backs `SharedEditSessionCtx` from work stream 2 — import that context module.
- [x] 7.3 Create `client/web/src/features/sessions/useDraftSync.ts`: move the 20s
      auto-sync-with-conflict-notification effect (L2138–2195), the presence heartbeat
      effect (L2314–2337), the live workspace sync effect (L2365–2368), and the sync-state
      subscription (L2371).

## 8. Chat transport & message rendering

> Depends-on: 2, 4 | Touches: client/web/src/features/chat/** | Verify: `pnpm --filter @aprovan/patchwork-web build`

- [x] 8.1 Create `client/web/src/features/chat/chat-transport.ts`: move the
      `DefaultChatTransport` setup (L1776–1805) and `editTransport` (L1722–1762) verbatim.
- [x] 8.2 Create `client/web/src/features/chat/MessageParts.tsx`: move `ReasoningPart`
      (L292–308), `ToolPart` (L310–370), `MessageBubble` (L372–460), and
      `TextPartWithSession` (L462–573) verbatim. `TextPartWithSession` imports
      `ChatArtifactBlock`/`ChatWorkflowPreview` from `features/widgets` (work stream 4) and
      `WidgetErrorReporterCtx` from `@/contexts` (work stream 2).
- [x] 8.3 Create `client/web/src/features/chat/useChatSubmit.ts`: move `handleSubmit`
      (L2496–2543), provider/model selection (`handleProviderChange`/`handleModelChange`
      L2443–2455, `providerConnected`/`chatProviderLabel` L2438–2441), and the
      `formatToolSignatures`/`GatewayToolEntry`/`TOOL_PROMPT_CAP_PER_NAMESPACE`/
      `toProjectRelativePath` helpers (L575–652) it depends on for building the tools
      prompt variable.
- [x] 8.4 Create `client/web/src/features/chat/ChatDock.tsx`: move the chat/preview
      split-layout mechanics (`toggleChatExpanded` L951–957, `maxChatHeight` L974–977,
      `resizeChatBy` L979–991, `startChatDrag` L993–1021, layout constants/helpers
      L682–731) and the dock/drag-handle/message-list/composer JSX (L2919–3187).

## 9. Edit modal host

> Depends-on: 2, 4, 7 | Touches: client/web/src/features/edit-modal/** | Verify: `pnpm --filter @aprovan/patchwork-web build`

- [x] 9.1 Create `client/web/src/features/edit-modal/EditModalHost.tsx`: move the
      `EditModal` wiring block (save/compile/renderPreview callbacks, L3193–3257),
      including its own `compile` closure over `compiler` (from `useCompilerBootstrap`,
      work stream 4) and its use of `editSession`/`editDraft`/`finishEditDraft` (from
      `useEditDraft`, work stream 7) and `createPreviewManifest` (work stream 4).

## 10. UI component sourcing cleanup

> Depends-on: - | Touches: client/web/src/components/ui/** | Verify: `! grep -rn 'from "@aprovan/ui"' client/web/src`

- [x] 10.1 Confirm (grep) that zero files under `client/web/src` import the bare
      `@aprovan/ui` specifier today — this is already true per the research pass, so this
      task is a verification checkpoint, not a code change. Satisfies
      `specs/ui-component-sourcing` Requirement "Vendored shadcn copies are the canonical
      primitive source", scenario "No bare `@aprovan/ui` imports".
- [x] 10.2 Add a short header comment to `client/web/src/components/ui/button.tsx` (or a
      new `client/web/src/components/ui/README.md`) stating the sourcing rule from
      `tech-plan.md` D4: new primitive UI needs import from `@/components/ui/*`; the bare
      `@aprovan/ui` root export is unused/out of scope here. Keep it to a few lines — this
      is documentation, not a lint rule (tech-plan Open Question defers a CI gate).

## 11. Wire composition root

> Depends-on: 3, 4, 5, 6, 7, 8, 9 | Touches: client/web/src/pages/ChatPage.tsx | Verify: `pnpm --filter @aprovan/patchwork-web build`

- [x] 11.1 Rewrite `ChatPage.tsx` to import and compose every feature hook/component from
      work streams 2–9 instead of defining them inline. Delete the now-duplicated inline
      code as each piece is wired (do not leave both copies live at the end).
- [x] 11.2 Wire context providers (`PatchworkCtx`, `SharedEditSessionCtx`,
      `WidgetErrorReporterCtx`) at the JSX root in the same nesting order as today
      (L2565–2567 today: Patchwork → SharedEditSession → WidgetErrorReporter →
      PanelHostProvider).
- [x] 11.3 Confirm `client/web/src/pages/ChatPage.tsx` is ≤ 300 LOC (`wc -l`). Satisfies
      `specs/chat-app-structure` Requirement "Composition root is thin".
- [x] 11.4 Confirm no new file created in work streams 2–9 exceeds ~500 LOC (`wc -l
      client/web/src/features/**/*.ts client/web/src/features/**/*.tsx
      client/web/src/contexts/*.tsx`). Satisfies `specs/chat-app-structure` Requirement
      "Extracted feature modules stay small".
- [ ] 11.5 Run the full manual smoke pass against every flow in `ux.md`'s Flows and Screens
      & States sections (send message + widget render, self-heal trigger, tab open across
      all three namespaces, full session lifecycle, edit modal open/save/discard,
      notifications bell widget render). This is the acceptance gate for "zero user-visible
      behavior change" per the PRD — there is no automated UI test suite to substitute for
      it.

## 12. Final repo-wide verification

> Depends-on: 1, 10, 11 | Touches: - (verification only) | Verify: `pnpm typecheck && pnpm --filter @aprovan/patchwork-web build`

- [x] 12.1 Run `pnpm typecheck` from the repo root (turbo, covers all packages with a
      `check-types`/`typecheck` script) and `pnpm --filter @aprovan/patchwork-web build`
      (tsc + vite bundle) with zero errors.
- [x] 12.2 Confirm none of `packages/bobbin/**`, `packages/mcp-app-server/**`,
      `packages/compiler/src/vfs/**` were touched by this change (`git diff --stat main...`
      against those paths should be empty). Satisfies `specs/chat-app-structure`
      Requirement "Decomposition does not touch WS-1 deletion targets".
- [x] 12.3 Re-run the work stream 1 rebrand verify command and the work stream 10 grep
      check one more time against the final state of the branch.

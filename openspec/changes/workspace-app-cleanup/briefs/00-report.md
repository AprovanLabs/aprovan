# Report: workspace-app-cleanup — full implementation (streams 1–12)

**PR:** https://github.com/AprovanLabs/aprovan/pull/3 (branch `workspace-app-cleanup`, 12 commits, one per stream)

> NOTE: the harness denied writes to the main checkout's briefs/ dir, so this report lives at the
> same relative path inside the agent worktree (uncommitted). The tasks.md checkboxes in the MAIN
> checkout were updated as instructed.

## Per-stream status

| Stream | Status | Commit |
|---|---|---|
| 1. Rebrand | done | `7ae4101` — root name → `@aprovan/aprovan-monorepo`, `apps/**` glob removed, README title `# aprovan` + new opening; per-package descriptions untouched |
| 2. Contexts scaffold | done | `47f3656` — `contexts/{patchwork,shared-edit-session,widget-error-reporter}-context.tsx` + barrel |
| 3. Tabs | done | `cc139df` — `tab-routing.ts`, `useTabs.ts`, `TabStrip.tsx`, `TabContent.tsx` |
| 4. Widgets | done | `db17bdf` — `useCompilerBootstrap.ts`, `ChatArtifactBlock`, `ChatWorkflowPreview`, `NotificationPathWidget`, `createPreviewManifest` |
| 5. Self-heal | done | `5a56a22` — `useWidgetSelfHeal.ts`; refs/budget/gating/orchestrator copied byte-for-byte, `armSendWindow()` exposed |
| 6. Sidebar | done | `2065ef0` — `useWorkspaceExplorer.ts`, `WorkspaceSidebar.tsx` |
| 7. Sessions | done | `289449d` — `useSessionOrchestration.ts`, `useEditDraft.ts`, `useDraftSync.ts`, plus `useSessionChatSync.ts` (see deviations) |
| 8. Chat | done | `6606ed6` — `chat-transport.ts`, `MessageParts.tsx`, `useChatSubmit.ts`, `ChatDock.tsx` |
| 9. Edit modal | done | `3bb28ce` — `EditModalHost.tsx` |
| 10. UI sourcing | done | `e7a3de9` + `9af9342` — grep verified zero bare `@aprovan/ui` imports; rule documented in `components/ui/README.md` |
| 11. Composition root | done | `32db88e` — ChatPage rewritten; provider nesting order preserved (Patchwork → SharedEditSession → WidgetErrorReporter → PanelHostProvider) |
| 12. Final verification | done | see below |

## Line counts

- `client/web/src/pages/ChatPage.tsx`: **3,265 → 299** (cap ≤ 300)
- Largest new module: `features/chat/ChatDock.tsx` 482 LOC (cap ~500). All 26 new files under contexts/ + features/ total 3,833 LOC; every file ≤ 500.

## Verify results

- `pnpm install --frozen-lockfile` — clean after root rename (no lockfile change)
- `pnpm typecheck` (turbo, 11 packages) — clean
- `pnpm --filter @aprovan/patchwork-web build` (tsc + vite) — clean at **every** stream boundary and at final
- `grep -rn 'from "@aprovan/ui"' client/web/src` — zero results
- `git diff --stat main...` — empty for `packages/bobbin/**`, `packages/mcp-app-server/**`, `packages/compiler/src/vfs/**`, `client/web/src/components/panels/**`, and `SessionBar.tsx` (WS-1 targets and panels untouched; SessionBar contract unchanged)
- Rebrand checks: name = `@aprovan/aprovan-monorepo`; no `apps/**` glob; README title `# aprovan`
- **Manual smoke (partial, 11.5)** — ran the app in a real browser against the local scratch gateway (`gateway-local-scratch` + `patchwork-web-scratch` launch configs). Verified: boot/render, workspace tree + create-file → opens preview tab with the compiler pipeline live, native-surface tab (`native://agents`) opens and dispatches to AgentsPanel, tab strip active/close/collapse controls, tab + active-tab persistence across reload, chat dock strip ↔ expand toggle, session chip "Synced", provider-not-connected banner, composer disabled-send gating. **Not exercised** (requires an LLM provider credential the environment doesn't have): sending a message/streaming, self-heal firing, session apply/discard/merge, edit-modal LLM edits, notifications-bell widget render. Task 11.5 left unchecked in tasks.md accordingly.

## WARNING: merge conflict for the owner

The main checkout has an **uncommitted modification to `client/web/src/pages/ChatPage.tsx`**. The PR branch rewrites that file down to a composition root, so the uncommitted edit **will conflict at merge time**. Reconcile deliberately: re-apply the local change into whichever feature module now owns that code. The PR body carries the same warning. This work intentionally did not touch or merge the uncommitted edit.

## Deviations

1. **Root package name**: tasks.md 1.1 said `@aprovan/workspace` (flagged "confirm with user"), but tech-plan D5 explicitly rules that name out (collides with the registry workspace app under WS-4) and the consolidated brief specifies `@aprovan/aprovan-monorepo` — used the latter. tasks.md's stream-1 verify grep (which expects `@aprovan/workspace`) is therefore stale; the spec scenario ("name SHALL NOT contain patchwork") passes.
2. **`features/sessions/useSessionChatSync.ts`** (new, unassigned by tasks.md): the four `useChat`-coupled effects (transcript persistence, staged-summary refresh, cross-window sync, one-shot chat naming) weren't assigned to any stream; they went into this fourth sessions file rather than bloating the composition root.
3. **Helper placement vs tasks 8.3**: `formatToolSignatures`/`TOOL_PROMPT_CAP_PER_NAMESPACE` live in `chat-transport.ts` (their only consumer), `GatewayToolEntry` in `useCompilerBootstrap.ts`, `toProjectRelativePath` in `useEditDraft.ts` — same feature-level homes, different files than 8.3's literal listing, avoiding cross-stream build breaks.
4. **`openWorkspaceSession`** lives in `useEditDraft.ts` (it drives the edit-draft lifecycle), not `WorkspaceSidebar.tsx` as 6.2 suggested; the sidebar receives it as a prop.
5. **Stream commit order** was 1, 2, 10, 3, 4, 5, 6, 7, 8, 9, 11, 12 (10 moved earlier; it's independent). Dependency order respected.
6. **Micro-behavior note**: the app pane's sub-tab state (`appPaneTab`) now lives inside `TabContent`; after closing *all* tabs and reopening the *same* app, the sub-tab resets to "Details" where the old page would have remembered it. All other tab/sub-tab behavior is unchanged.
7. **Pre-existing dev console warning observed during smoke**: "Invalid hook call" from `SidebarApps` (it consumes `@aprovan/ui/apps-store`'s `useSharedAppsCatalog` while the provider comes from `@aprovan/registry-ui/apps-panel` — dual module instances in vite dev). Not introduced by this change (no import specifiers or `SidebarApps` code touched); the component renders fine. Worth a follow-up outside this change.
8. **tasks.md checkboxes**: all checked in the main checkout except 11.5 (manual smoke pass is partial per above).

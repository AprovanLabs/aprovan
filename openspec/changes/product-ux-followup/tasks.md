# product-ux-followup — Tasks

_Repos: registry = `/Users/jacob/Documents/Code/AprovanLabs/registry`, aprovan = `/Users/jacob/Documents/Code/AprovanLabs/aprovan`._

## 1. Registry catalog shell (Apps out + header session)

> Depends-on: - | Touches: registry:apps/registry/src/layouts/BaseLayout.astro, registry:apps/registry/src/pages/apps.astro, registry:apps/registry/src/pages/workflows.astro, registry:apps/registry/src/components/AppsHost.tsx, registry:apps/registry/astro.config.ts, registry:apps/registry/src/components/shell/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-web typecheck && pnpm --filter @aprovan/registry-web build

- [x] 1.1 Remove Apps from `BaseLayout.astro` nav; delete or redirect `pages/apps.astro` and update `workflows.astro`; delete `AppsHost.tsx`; drop Apps from PWA precache in `astro.config.ts` (spec: Apps surface removed).
- [x] 1.2 Add `HeaderSession.tsx` using `@aprovan/ui/shell` `SessionArea` + existing `useHostedSession` / `useStandaloneSession` (same engines as `SessionGate`); Credentials → catalog `/account/credentials`, Permissions → `/admin/permissions`.
- [x] 1.3 Mount `HeaderSession` as `AppHeader` children in `RegistryHeader.tsx` so every catalog page has sign-in/profile chrome (spec: Catalog header session chrome).

## 2. Playground session-mode transport

> Depends-on: - | Touches: registry:apps/registry/src/components/ScriptPlayground.tsx | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @aprovan/registry-web typecheck

- [x] 2.1 Replace `createGatewayTransport` wiring in `ScriptPlayground.tsx` with an adapter over `createPlaygroundGatewayClient()` so auth/scope headers and `resolveToken` match Try-It (tech-plan D1; spec: Playground uses session-mode gateway client).
- [x] 2.2 Surface clear run errors when session/token is missing in hosted mode (do not send `__local__` sentinel).

## 3. Preview stability (no flash)

> Depends-on: - | Touches: aprovan:client/web/src/features/sidebar/useWorkspaceExplorer.ts, aprovan:client/web/src/features/tabs/useTabs.ts, aprovan:client/web/src/features/tabs/TabContent.tsx, aprovan:client/web/src/features/editing/FileEditorPane.tsx, aprovan:packages/editor/src/components/MarkdownPreview.tsx, aprovan:packages/editor/src/components/WidgetPreview.tsx | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/web typecheck && pnpm --filter @aprovan/patchwork-editor typecheck

- [x] 3.1 Skip `reloadStaleTab` when `wasRecentLocalWrite(changedPath)`; for clean external updates, patch tab `code` without `loading: true` (tech-plan D4; spec: No flash on local autosave / In-place external refresh).
- [x] 3.2 In `MarkdownPreview`, skip `setContent` when serialized markdown is unchanged; avoid blanking on equal-value sync (spec: Markdown preview sync without thrash).
- [x] 3.3 Soften `WidgetPreview` remount: do not clear ready UI until the replacement compile succeeds (or debounce mount).

## 4. Chat file context (header, pins, @)

> Depends-on: - | Touches: aprovan:client/web/src/features/chat/ChatDock.tsx, aprovan:client/web/src/features/chat/useChatSubmit.ts, aprovan:client/web/src/features/chat/chat-file-context.ts, aprovan:client/web/src/features/chat/chat-transport.ts, aprovan:client/web/src/pages/ChatPage.tsx, aprovan:packages/editor/src/components/MarkdownEditor.tsx | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/web typecheck && pnpm --filter @aprovan/patchwork-editor typecheck

- [x] 4.1 Remove “Chat” text prefix from side-dock header in `ChatDock.tsx`; keep icon + active basename (spec: Dock header without Chat prefix).
- [x] 4.2 Add `ChatFileContext` (hook or small module): `pinnedPaths` in `localStorage` key `patchwork:chat-context-pins`, `togglePin`, merge with active path for display; pin control in dock header (tech-plan D2; spec: Pin files for chat context).
- [x] 4.3 Add `@` file mention UX in composer (`MarkdownEditor` or dock wrapper): search workspace paths, insert mention; on send, collect mention paths ∪ pins as `contextFiles` (paths only). If server schema cannot take a field yet, also prefix a short “Context files: …” line (tech-plan D3; spec: At-mention files / Paths-only context).

## 5. Widget mount safety (Promise guard + routing)

> Depends-on: - | Touches: aprovan:packages/compiler/src/mount/iframe.ts, aprovan:packages/compiler/src/mount/embedded.ts, aprovan:client/web/src/features/chat/MessageParts.tsx, aprovan:packages/editor/src/components/edit/fileTypes.ts, aprovan:client/web/src/features/widgets/ChatWorkflowPreview.tsx | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-compiler typecheck && pnpm --filter @aprovan/web typecheck

- [x] 5.1 Extract shared `mountDefaultExport` (or equivalent) used by iframe + embedded mounts: await async defaults/`mount`/`render`; never pass a Promise into React render (tech-plan D5; spec: Never render a Promise as a React child).
- [x] 5.2 Route workflow/async-script fences in `MessageParts` away from widget iframe mount to workflow/code preview (spec: Non-widget scripts are not mounted as widgets).

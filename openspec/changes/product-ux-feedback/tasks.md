# product-ux-feedback — Tasks

_Repos: aprovan = `/Users/jacob/Documents/Code/AprovanLabs/aprovan`, registry =
`/Users/jacob/Documents/Code/AprovanLabs/registry`. Streams with empty Depends-on are
wave-1 parallel. Do not touch overlapping paths across parallel streams._

## 1. Catalog chrome — drop Open-the-app

> Depends-on: - | Touches: registry:apps/registry/src/components/shell/**, registry:apps/registry/src/layouts/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && ! rg -n "Open the app|OpenAppLink" apps/registry/src && pnpm --filter @aprovan/registry-web build

- [x] 1.1 Remove `OpenAppLink` from catalog shell/header layouts and delete or stop exporting the component.
- [x] 1.2 Confirm `/account/credentials` and `/admin/permissions` remain live CredentialsHost/AdminHost (no MovedNotice). If stubs remain on the branch tip, restore standalone hosts.

## 2. Keyvalue backend (DynamoDB)

> Depends-on: - | Touches: registry:packages/contracts/keyvalue/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/keyvalue test && pnpm --filter @utdk/keyvalue build

- [ ] 2.1 Implement `dynamodb.ts` against `@utdk/keyvalue` contract (get/set/delete/list + TTL via Dynamo TTL or 501 if unsupported path).
- [ ] 2.2 Register in compat / package exports; add unit tests with mocked Dynamo client.
- [ ] 2.3 Document credential shape (table name + AWS creds) in AUDIT or short README snippet.

## 3. Events backend (SQS / SNS)

> Depends-on: - | Touches: registry:packages/contracts/events/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/events test && pnpm --filter @utdk/events build

- [ ] 3.1 Implement `sqs.ts` (optional SNS publish) for emit/list per `@utdk/events`.
- [ ] 3.2 Compat registration + mocked AWS unit tests.
- [ ] 3.3 Document queue/topic credential options.

## 4. VFS backend (S3)

> Depends-on: - | Touches: registry:packages/contracts/vfs/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/registry && pnpm --filter @utdk/vfs test && pnpm --filter @utdk/vfs build

- [ ] 4.1 Implement `s3.ts` for read/write/delete/list/stat with etag conditionals.
- [ ] 4.2 Compat registration + mocked S3 unit tests.
- [ ] 4.3 Document bucket/prefix credential options.

## 5. Editor dark theme + markdown default

> Depends-on: - | Touches: aprovan:packages/editor/src/components/edit/CodeBlockView.tsx, aprovan:packages/editor/src/components/edit/fileTypes.ts, aprovan:packages/editor/src/components/CodePreview.tsx, aprovan:packages/editor/src/components/MarkdownPreview.tsx, aprovan:packages/editor/src/components/edit/WorkspaceTree.tsx | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-editor build && rg -n "github-dark|defaultView" packages/editor/src && ! rg -n "Open in editor" packages/editor/src/components/edit/WorkspaceTree.tsx

- [ ] 5.1 Theme-aware shiki in `CodeBlockView` (dark → github-dark; light → github-light); ensure CodePreview doesn’t force a light canvas.
- [ ] 5.2 Ensure `.md` `defaultView: "rich"` and hosts honor it (coordinate with editor-direct-edit if FileEditorPane already owns this — finish any gap only).
- [ ] 5.3 Default `openInEditorTitle` to `"Edit"` in WorkspaceTree.

## 6. Native Runtime / VCS / LLM

> Depends-on: - | Touches: aprovan:client/web/src/lib/native-surfaces.tsx, aprovan:client/web/src/components/panels/InterfacesPanel.tsx, aprovan:client/web/src/components/ServicesMenu.tsx, aprovan:client/web/src/lib/namespaces.ts, aprovan:client/web/src/components/panels/RuntimePanel.tsx, aprovan:client/web/src/components/panels/VcsPanel.tsx, aprovan:client/web/src/components/panels/LlmPanel.tsx | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web typecheck && pnpm --filter @aprovan/patchwork-web build

- [ ] 6.1 Add native surfaces Runtime / VCS / LLM with human titles; panels may filter Interfaces listing to those ids.
- [ ] 6.2 Adjust ServicesMenu / namespace labels so agent/vcs/llm read as natives, not third-party providers.

## 7. Chat save policy, staging copy, stream visibility, code renderer host

> Depends-on: - | Touches: aprovan:client/web/src/features/chat/**, aprovan:client/web/src/features/widgets/**, aprovan:client/web/src/components/SessionBar.tsx, aprovan:client/web/src/features/tabs/TabContent.tsx | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web typecheck && pnpm --filter @aprovan/patchwork-web exec vitest run src/features/chat

- [ ] 7.1 Stop default writes to root `main.tsx`; add Save offer with suggested `widgets/<slug>/main.tsx`.
- [ ] 7.2 Stream widget/code fences into visible artifact UI (not only ReasoningPart).
- [ ] 7.3 Fix ChatArtifactBlock / chat-host CodePreview blank render regressions (do not restyle editor package themes — stream 5).
- [ ] 7.4 Clarify SessionBar staged → Apply copy.
- [ ] 7.5 Dedupe chat icon / redundant in-pane filename when tab already shows path.

## 8. Workspaces pane collapse

> Depends-on: - | Touches: aprovan:client/web/src/components/SidebarApps.tsx, aprovan:client/web/src/features/sidebar/WorkspaceSidebar.tsx | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web typecheck && rg -n "collapsed|Collapse workspace" client/web/src/components/SidebarApps.tsx client/web/src/features/sidebar

- [ ] 8.1 Ensure the workspaces region the user sees is collapsible with persisted state (extend SidebarApps or the workspaces switcher — whichever lacks it).

## 9. Members human identity + profiles availability

> Depends-on: - | Touches: aprovan:packages/registry-ui/src/admin/**, aprovan:server/workspace/src/routes/**, registry:packages/registry-server/src/storage/** | Verify: cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/registry-ui test && pnpm --filter @aprovan/workspace test

- [ ] 9.1 Extend members API/UI to show email/name primary; userId secondary.
- [ ] 9.2 Unblock profiles in production storage (implement Dynamo profiles or fix feature detection) so “Profiles aren’t available in this deployment” is not the steady state for prod Dynamo.

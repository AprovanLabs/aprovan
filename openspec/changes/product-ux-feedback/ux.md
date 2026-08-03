# product-ux-feedback — UX

## Flows

### Flow: Manage credentials on the catalog alone

1. User opens `https://aprovan.com/registry/account/credentials`.
2. They authenticate via catalog session (API key / OIDC / existing session) — no redirect to chat.
3. CredentialManager works in-page. Top bar has **no** “Open the app” button.
4. Failure: session missing → SessionGate with catalog sign-in, not a MovedNotice to chat.

### Flow: Collapse the workspaces pane

1. User sees the workspaces / workspace-tree region in the left chrome.
2. They collapse it via header control; only a slim header remains.
3. Preference persists across reload.
4. Expand restores prior height.

### Flow: Bind Runtime / VCS / LLM as natives

1. Sidebar shows **Runtime**, **VCS**, **LLM** (or equivalent titles) as native surfaces — not only under Interfaces.
2. Opening each shows configuration / status for that capability (binding, credential, options).
3. Interfaces still lists swappable backends for power users; primary IA is native.

### Flow: Chat generates a widget without overwriting

1. User asks for a UI widget. Streaming shows progressive code/widget preview as its own step (not only inside collapsed Thinking).
2. When generation finishes, chat offers **Save to workspace…** with a suggested path (e.g. `widgets/<slug>/main.tsx`), not silent write to root `main.tsx`.
3. User confirms or edits path → file stages or writes per policy.
4. “Edit” (not “Open editor”) opens the file pane.
5. If session is staged: SessionBar copy makes clear changes are **draft until Apply to workspace**.

### Flow: Edit markdown in dark mode

1. User opens a `.md` file. Default view is rich text preview/edit.
2. Toggle to source shows a dark-theme highlighter (no bright white canvas).
3. Raw/code files use the same dark theme.

### Flow: Recognize a member

1. Admin opens Admin → Members.
2. Each row shows display name and/or email; Cognito sub is secondary (mono, muted).
3. Empty claims → fall back to id with a “No profile email” hint.

### Flow: Mount a storage backend

1. Operator connects Dynamo/Redis (kv), SQS/SNS (events), or S3 (vfs) credentials.
2. Interfaces (or native Data) shows the provider as connected/compat.
3. Smoke tool call succeeds.

## Screens & States

### Catalog shell header

- Purpose: navigate catalog without product-app pressure.
- Elements: brand/nav; **no** Open-the-app CTA.
- States: static.

### File editor pane

- Purpose: edit/view workspace files.
- Elements: tab title = path; pane body has no second path title; save/draft chip; view toggle for md.
- States: loading, offline, error+retry, draft-pending-apply.

### Chat artifact footer

- Purpose: decide whether generated code becomes a workspace file.
- Elements: suggested path input; Save / Dismiss; Edit once saved.
- States: suggesting, saving, saved, error.

### Members table

- Purpose: administer people.
- Elements: name, email, role, joined; id tooltip/secondary.
- States: loading, empty, error.

## Component Inventory

- Catalog: remove/hide `OpenAppLink` from shell layout.
- Chat: `MessageParts`, `ChatArtifactBlock`, `SessionBar`, `CodePreview`.
- Editor: `CodeBlockView` (shiki themes), `fileTypes.defaultView`, `MarkdownPreview`.
- Native: `native-surfaces.tsx`, `ServicesMenu`, thin panels or reuse Interfaces subsets for Runtime/VCS/LLM.
- Admin: `MembersSection` in `@aprovan/registry-ui`.
- Registry contracts: new `dynamodb.ts` / `redis.ts` / `sqs.ts` / `s3.ts` under `packages/contracts/{keyvalue,events,vfs}/`.

## Open Questions

- Exact native titles: Runtime vs Agents for agent hosting? **Rec: Runtime** for the agent runner interface; keep Agents panel for profiles/executions.

## Problem

Opening any workspace file to edit mints a staged chat session server-side
(`useEditDraft.beginEditDraft`, `client/web/src/features/sessions/useEditDraft.ts:93`), and the
only editing surface is a fullscreen overlay (`EditModal`, `fixed inset-0 z-50`). Browsing and
editing feel like two different apps, chat history fills with ephemeral "Edit: …" sessions
nobody asked for, `.md` files open as a raw code view despite a working TipTap WYSIWYG
(regressed by `EditModalHost.tsx:77` forcing `showPreview: false`), and merge conflicts surface
in three different UIs. The product is close to an Obsidian-class file-editing experience — the
tree, tabs, VFS (with OPFS write-ahead + offline journal), and editors all exist — but the
chat-centric default makes it a poor one.

## Users & Jobs

- **Workspace users (default)**: hired to browse the file tree, open a file in a tab, edit it
  directly, and trust it saved — with no chat, no draft, no modal, no session record.
- **Markdown/notes users**: hired to write `.md` in a WYSIWYG editor by default (the
  Obsidian-replacement job), with a source view one toggle away.
- **App authors & repo users**: hired to edit app source trees and mounted VCS repos with an
  explicit staged draft → review → apply flow, because those targets have releases/commits
  downstream.
- **Chat users (opt-in)**: hired to summon AI help *on the file they are looking at* — chat as a
  dock beside the file, its proposed edits always staged for the user to apply.
- **IW-6 implementer (downstream)**: hired to add file-scoped presence + CRDT co-editing on top
  of a direct-editing main area — this change creates that seam.

## Goals

- Opening a plain workspace file for editing creates **zero** chat-session records; the network
  trace shows VFS writes only.
- The staging rule is enforced **by target path**, with no user-facing mode toggle: plain files →
  direct write-through; app source trees and mounted VCS repos → staged draft → review → apply;
  chat-driven edits → always staged.
- Files open as **editable in-tab panes** by default (sidebar tree + tabs, Obsidian shape); the
  fullscreen `EditModal` overlay is no longer the only — or the default — edit surface.
- `.md` opens in TipTap WYSIWYG with a working source toggle; per-type default views live in
  `packages/editor/src/components/edit/fileTypes.ts`, not in host `initialState`.
- Chat history contains only sessions the user meaningfully created (opted into chat, or edited a
  staged target); merge conflicts resolve through **one** surface; `SessionBar` sheds its
  ~10-controls-in-24px layout.
- Registry renderers size via the host-pane `fill` contract; zero hardcoded `vh` floors/caps
  remain in `packages/editor/src/components/CodePreview.tsx` or `packages/registry-ui/src`
  renderer paths (verifiable by grep).
- `pnpm --filter @aprovan/patchwork-web build`, `--filter @aprovan/patchwork-editor build`, and
  `--filter @aprovan/registry-ui test` pass at every work-stream boundary.

## Non-Goals

- **No CRDT, no presence, no realtime transport** — that is IW-6 `presence-realtime`, which
  depends on this change; here we only leave the seam (direct in-tab editing of the main area).
- **No app-model changes** — IW-1 `app-model-split` territory. The staging rule consumes app
  source prefixes as they exist today (`appPathAllowed` semantics); it does not redefine them.
- **No new editor technology** — TipTap, Shiki, and the CodeMirror playground stay as-is; this
  change recomposes existing pieces (tree, tabs, `CodePreview`, `MarkdownPreview`, VFS).
- **No server-side VCS/session model changes** beyond what the client needs to ask "is this path
  a staged target?" — session records, overlays, `sessions.resolve`, and apply semantics are
  reused, not redesigned.
- **No change to chat transcript persistence** for sessions that do exist (per-message records
  stay).
- **Not removing `EditModal` from the codebase** — it is demoted, kept for the focused
  widget-edit flow (live compile preview), and stops being the default path for plain files.

## Capabilities

### New Capabilities
- `direct-file-editing`: the write-policy rule (direct vs staged, derived from target path), the
  decoupling of file-open from chat-session creation, and lazy draft creation for staged targets.
- `workspace-editor-shell`: the default browse→edit→save experience — editable in-tab panes,
  sidebar tree, save-state signaling, the opt-in chat dock, and `EditModal`'s demoted role.
- `file-renderer-defaults`: per-file-type default view policy owned by `fileTypes.ts`
  (md → WYSIWYG + source toggle; compilable → code + preview toggle), host overrides removed.
- `session-history-simplification`: which sessions exist at all post-decoupling, the single
  conflict-resolution surface, and the decluttered `SessionBar` contract.
- `renderer-host-sizing`: the host-pane sizing contract extended to registry renderers; removal
  of per-renderer hardcoded viewport-height floors/caps.

### Modified Capabilities
<!-- none: openspec/specs/ has no existing capabilities in this repo -->

## Constraints & Assumptions

- **Settled by owner (2026-08-02, do not relitigate)**: staging rule is by target — plain files
  direct write-through; app source + mounted repos staged; chat edits always staged; **no mode
  toggle**. This PRD treats it as a hard constraint.
- **Client-side testing**: `client/web` and `packages/editor` have no test runner (only `tsc`
  via build); `packages/registry-ui` has vitest. Assumption: builds + grep gates + registry-ui
  vitest + the `ux.md` manual smoke flows are the acceptance gate. Flagged, not confirmed.
- **Path-policy source of truth**: app source prefixes and VCS mount prefixes are server
  knowledge (`server/workspace/src/apps/store.ts` `appPathAllowed`; `server/workspace/src/vcs/
  mounts.ts`). Assumption: the client fetches/caches these prefix sets rather than the server
  gaining a new per-write policy round-trip. Not confirmed.
- **VCS mounts are read-only in v1** (writes under a mounted prefix 403). Assumption: "mounted
  repos → staged" therefore means the staged-draft flow is the *only* write path for mounts once
  writable mounts exist; until then the editor surfaces mounts read-only and the rule is
  future-proofing, not new server capability. Not confirmed.
- **Offline safety** rides the existing OPFS write-ahead + journal in
  `client/web/src/lib/workspace-vfs.ts` unchanged; staged scopes remain gateway-only (no
  journal), as today.
- IW-2 is free (no dependency on other improve-wave changes) and gates IW-6.

## Open Questions

1. **Does `EditModal` survive as the widget-editing surface, or does the in-tab pane absorb the
   live-preview flow too?** Recommend: keep `EditModal` for the compile-preview widget flow in
   this change (demoted, opened explicitly), and let a follow-up absorb it once the in-tab pane
   proves out — smaller blast radius.
2. **What happens to the `keepEditDrafts` preference (`patchwork:edit-keep-draft`)?** Recommend:
   delete it. It is a user-facing mode toggle over staging behavior, which the settled rule
   forbids; the target path now decides.
3. **Lazy draft timing for staged targets: on first save, or on file-open?** Recommend: on first
   save. Opening an app-source file read-only should cost nothing; the draft exists only once
   there is something to stage.
4. **Should direct edits to plain files appear anywhere in history?** Recommend: no session
   record at all — the VFS is the record (matches "most ephemeral sessions never exist"). If
   lightweight undo/history is wanted later, it is a VFS concern, not a chat-session one.
